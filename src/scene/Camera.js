define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../math/mat4",
    "../math/vec3"
], function module (
    def,
    gl,
    mat4,
    vec3
){
    "use strict";

    const CACHE_MAT4 = new mat4;


    class Camera {
        constructor ( projection, transform, uniforms ) {
            if ( projection === undefined ) projection = new mat4;
            if ( transform === undefined ) transform = new mat4;

            def.Properties( this, {
                projection,
                transform
            }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

            def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        }
        project ( outV3 ) {
            CACHE_MAT4.set( this.transform ).invert().multiply( this.projection );
            
            
            return vec3.applyProjection( outV3, CACHE_MAT4 );
        }
        unproject ( outV3 ) {
            
            CACHE_MAT4.set( this.projection ).invert().multiply( this.transform );
            
            //console.log(CACHE_MAT4);
            return vec3.applyProjection( outV3, CACHE_MAT4 );
        }
    } 

    class Perspective extends Camera {
        constructor( near, far, fov, aspect ) {
            if ( near === undefined ) near = 0.1;
            if ( far === undefined ) far = 1000.0;
            if ( fov === undefined ) fov = Math.PI / 3;
            if ( aspect === undefined ) aspect = gl.canvas.width / gl.canvas.height;

            super(
                new mat4().makePerspective( aspect, fov, near, far ),
                new mat4
            );

            def.Properties( this, {
                near,
                far,
                fov,
                aspect
            }, def.WRITABLE );
        }
        updateProjection ( ) {
            this.projection.makePerspective( this.aspect, this.fov, this.near, this.far );
            return this;
        }
        
    }

    class Orthographic extends Camera {
        constructor ( left, right, bottom, top, near, far ) {
            if ( near === undefined ) near = 0.1;
            if ( far === undefined ) far = 10;
            if ( left === undefined ) left = -15;
            if ( right === undefined ) right = 15;
            if ( bottom === undefined ) bottom = -15;
            if ( top === undefined ) top = 15;

            super( 
                new mat4().makeOrthographic( left, right, top, bottom, near, far ),
                new mat4
            );

        }

    }

    def.Properties( Camera, {
        Perspective,
        Orthographic
    }, def.CONFIGURABLE );

    return Camera;
});