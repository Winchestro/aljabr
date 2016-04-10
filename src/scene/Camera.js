define( [
    "../utilities/PropertyDescriptors",
    "../gl-matrix/dist/gl-matrix-min",
    "../webgl/Context",
    "../webgl/Viewport",
    "../math/mat4",
    "../math/vec3",
    "../math/vec4",
    "../scene/Scene",
    "../scene/Frustum"
], function module (
    def,
    glMatrix,
    gl,
    Viewport,
    mat4,
    vec3,
    vec4,
    Scene,
    Frustum
){
    "use strict";

    const CACHE_VEC4 = new vec4;

    const EYE = new vec3;
    const TARGET = new vec3;

    const UP = new vec3( 0, 0, 1 );
    const CACHE_INV_TRANSFORM_MAT4 = new mat4;
    const CACHE_INV_PROJECTION_MAT4 = new mat4;

    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    class Camera {
        constructor ( uniforms, scene, target, frustum, viewport ) {
            if ( uniforms === undefined ) uniforms = {};
            
            if ( uniforms.projection === undefined ) uniforms.projection = new mat4;
            if ( uniforms.projectionInverse === undefined ) uniforms.projectionInverse = new mat4;
            if ( uniforms.transform === undefined ) uniforms.transform = new mat4;
            if ( uniforms.transformInverse === undefined ) uniforms.transformInverse = new mat4;
            if ( uniforms.frame === undefined ) uniforms.frame = 0;

            if ( scene === undefined ) scene = new Scene;
            

            if ( target === undefined ) target = null;
            if ( frustum === undefined ) frustum = new Frustum;
            if ( viewport === undefined ) viewport = new Viewport;

            def.Properties( this, {
                scene,
                frustum,
                position : new vec3,
                farCenter : new vec3,
                nearCenter : new vec3,
                lookDirection : new vec3,
                viewport,
                target,
                drawCalls : 0
            }, def.WRITABLE | def.CONFIGURABLE );

            def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        }
        project ( outV3 ) {
            vec4.set( CACHE_VEC4, outV3[_x_], outV3[_y_], outV3[_z_], 1 );
            vec4.transformMat4( CACHE_VEC4, CACHE_VEC4, this.transformInverse );
            vec4.transformMat4( CACHE_VEC4, CACHE_VEC4, this.projection );

            let inverseW = 1 / CACHE_VEC4[_w_];
            
            CACHE_VEC4[_x_] *= inverseW;
            CACHE_VEC4[_y_] *= inverseW;
            CACHE_VEC4[_z_] *= inverseW;
            
            outV3[_x_] = CACHE_VEC4[_x_];
            outV3[_y_] = CACHE_VEC4[_y_];

            return outV3;
        }
        projectToScreenCoordinates ( outV3 ) {
            return toScreenCoordinates( this.project( outV3 ) );
        }
        unproject ( outV3 ) {
            vec4.set( CACHE_VEC4, outV3[_x_], outV3[_y_], outV3[_z_], 1 );
            vec4.transformMat4( CACHE_VEC4, CACHE_VEC4, this.projectionInverse );
            vec4.transformMat4( CACHE_VEC4, CACHE_VEC4, this.transform );
            
            let inverseW = 1 / CACHE_VEC4[_w_];

            outV3[_x_] = CACHE_VEC4[_x_] * inverseW;
            outV3[_y_] = CACHE_VEC4[_y_] * inverseW;
            outV3[_z_] = CACHE_VEC4[_z_] * inverseW;

            return outV3;
        }
        unprojectFromScreenCoordinates( outV3 ) {
            return this.unproject( toNormalizedDeviceCoordinates( outV3 ) );
        }
        update ( ) {
            //mat4.invert( this.transformInverse, this.transform );
            mat4.invert( this.projectionInverse, this.projection );
            

            this.unproject( vec3.set( this.nearCenter, 0, 0, 0 ) );
            this.unproject( vec3.set( this.farCenter, 0, 0, 1 ) );
            
            vec3.sub( this.lookDirection, this.farCenter, this.nearCenter );
            vec3.normalize( this.lookDirection, this.lookDirection );

            vec3.set( this.position, this.transform[ 12 ], this.transform[ 13 ], this.transform[ 14 ] );
            this.scene.update( this );
        }
        draw ( ) {
            gl.bindFramebuffer( gl.FRAMEBUFFER, this.target );
            gl.clear( gl.COLOR_BUFFER_BIT  | gl.DEPTH_BUFFER_BIT );
            this.drawCalls = 0;
            this.frame++;
            
            this.scene.draw( this );
        }

        
        createFrustumMesh ( ) {
            return this.scene.addChild( "frustum", this.frustum.createMesh() );
        }
    }
 
    class Perspective extends Camera {
        constructor( near, far, fov, aspect, uniforms, scene, target, frustum ) {
            if ( near === undefined ) near = 0.1;
            if ( far === undefined ) far = 1000;
            if ( fov === undefined ) fov = Math.PI / 3;
            if ( aspect === undefined ) aspect = gl.canvas.width / gl.canvas.height;

            super( uniforms, scene, target, frustum );
            
            mat4.perspective( this.projection, fov, aspect, near, far );
            
            def.Properties( this, {
                near,
                far,
                fov,
                aspect
            }, def.WRITABLE );
        }

        updateProjection ( near, far, fov, aspect ) {
            if ( near === undefined ) near = this.near;
            else this.near = near;

            if ( far === undefined ) far = this.far;
            else this.far = far;

            if ( fov === undefined ) fov = this.fov;
            else this.fov = fov;

            if ( aspect === undefined ) aspect = this.aspect;
            else this.aspect = aspect;

            mat4.perspective( this.projection, fov, aspect, near, far );
            return this;
        }
        
        
    }

    class Orthographic extends Camera {
        constructor ( left, right, bottom, top, near, far, uniforms, scene, target ) {
            if ( near === undefined ) near = 0.1;
            if ( far === undefined ) far = 10;
            if ( left === undefined ) left = -15;
            if ( right === undefined ) right = 15;
            if ( bottom === undefined ) bottom = -15;
            if ( top === undefined ) top = 15;

            super( uniforms, scene, target );

            mat4.ortho( this.projection, left, right, bottom, top, near, far );

            def.Properties( this, {
                near,
                far,
                top,
                bottom,
                left,
                right
            }, def.WRITABLE );
        }

        updateProjection( left, right, bottom, top, near, far ) {
            if ( left === undefined ) left = this.left;
            else this.left = left;

            if ( right === undefined ) right = this.right;
            else this.right = right;

            if ( bottom === undefined ) bottom = this.bottom;
            else this.bottom = bottom;

            if ( top === undefined ) top = this.top;
            else this.top = top;

            if ( near === undefined ) near = this.near;
            else this.near = near;

            if ( far === undefined ) far = this.far;
            else this.far = far;

            mat4.ortho( this.projection, left, right, bottom, top, near, far );
            return this;
        }
    }

    function toScreenCoordinates ( outV2 ) {
        outV2[_x_] = ( outV2[_x_] + 1 ) / 2 * gl.canvas.clientWidth;
        outV2[_y_] = ( -outV2[_y_] + 1 ) / 2 * gl.canvas.clientHeight;

        return outV2;
    }

    function toNormalizedDeviceCoordinates ( outV2 ) {
        outV2[_x_] = outV2[_x_] / gl.canvas.clientWidth * 2 - 1;
        outV2[_y_] = -( outV2[_y_] / gl.canvas.clientHeight * 2 - 1 );

        return outV2;
    }

    def.Properties( Camera, {
        Perspective,
        Orthographic
    }, def.CONFIGURABLE );

    return Camera;
});