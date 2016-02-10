define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../math/mat4",
    "../math/vec3",
    "../math/vec4"
], function module (
    def,
    gl,
    mat4,
    vec3,
    vec4
){
    "use strict";

    const CACHE_VEC4 = new vec4;
    const CACHE_INV_TRANSFORM_MAT4 = new mat4;
    const CACHE_INV_PROJECTION_MAT4 = new mat4;

    /*
    let test = document.createElement( "div" );
    let s = test.style;
    s.width = "5px";
    s.height = "5px";
    s.position = "absolute";
    s.left ="0px";
    s.top = "0px";
    s.background = "red";
    s.zIndex = "5";
    document.body.style.overflow = "hidden";

    document.body.appendChild( test );
    */
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
            CACHE_VEC4[ 0 ] = outV3[ 0 ];
            CACHE_VEC4[ 1 ] = outV3[ 1 ];
            CACHE_VEC4[ 2 ] = outV3[ 2 ];
            CACHE_VEC4[ 3 ] = 1;

            CACHE_VEC4.multiplyMat4( this.transform ).multiplyMat4( this.projection );

            let inverseW = 1 / CACHE_VEC4[ 3 ];
            
            CACHE_VEC4[ 0 ] *= inverseW;
            CACHE_VEC4[ 1 ] *= inverseW;
            CACHE_VEC4[ 2 ] *= inverseW;
            
            outV3[ 0 ] = CACHE_VEC4[ 0 ];
            outV3[ 1 ] = CACHE_VEC4[ 1 ];

            return outV3;
        }

        projectToScreenCoordinates ( outV3 ) {
            return toScreenCoordinates( this.project( outV3 ) );
        }

        unproject ( outV3 ) {
            CACHE_VEC4[ 0 ] = outV3[ 0 ];
            CACHE_VEC4[ 1 ] = outV3[ 1 ];
            CACHE_VEC4[ 2 ] = outV3[ 2 ];
            CACHE_VEC4[ 3 ] = 1;

            CACHE_INV_TRANSFORM_MAT4.set( this.transform ).invert();
            CACHE_INV_PROJECTION_MAT4.set( this.projection ).invert();

            CACHE_VEC4.multiplyMat4( CACHE_INV_PROJECTION_MAT4 ).multiplyMat4( CACHE_INV_TRANSFORM_MAT4 );
            
            let inverseW = 1 / CACHE_VEC4[ 3 ];

            outV3[ 0 ] = CACHE_VEC4[ 0 ] * inverseW;
            outV3[ 1 ] = CACHE_VEC4[ 1 ] * inverseW;
            outV3[ 2 ] = CACHE_VEC4[ 2 ] * inverseW;

            return outV3;
        }

        unprojectFromScreenCoordinates( outV3 ) {
            return this.unproject( toNormalizedDeviceCoordinates( outV3 ) );
        }
    } 

    class Perspective extends Camera {
        constructor( near, far, fov, aspect ) {
            if ( near === undefined ) near = 0.00001;
            if ( far === undefined ) far = 5;
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

    function toScreenCoordinates ( outV2 ) {
        outV2[ 0 ] = ( outV2[ 0 ] + 1 ) / 2 * gl.canvas.clientWidth;
        outV2[ 1 ] = ( -outV2[ 1 ] + 1 ) / 2 * gl.canvas.clientHeight;

        return outV2;
    }

    function toNormalizedDeviceCoordinates ( outV2 ) {
        outV2[ 0 ] = outV2[ 0 ] / gl.canvas.clientWidth * 2 - 1;
        outV2[ 1 ] = -( outV2[ 1 ] / gl.canvas.clientHeight * 2 - 1 );

        return outV2;
    }

    def.Properties( Camera, {
        Perspective,
        Orthographic
    }, def.CONFIGURABLE );

    return Camera;
});