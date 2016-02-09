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

    const CACHE_A = new mat4;
    const CACHE_B = new mat4;

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
            let inp = new vec4;
            inp[ 0 ] = outV3[ 0 ];
            inp[ 1 ] = outV3[ 1 ];
            inp[ 2 ] = outV3[ 2 ];
            inp[ 3 ] = 1;

            

            CACHE_A.set( this.transform ).invert().multiply( this.projection );
            console.log( inp, CACHE_A );
            inp.multiplyMat4( CACHE_A );
            console.log( inp, CACHE_A );
            
            vec3.set( outV3, inp );

            console.log( outV3 );
            outV3[ 0 ] = ( outV3[ 0 ] + 1 ) / 2;
            outV3[ 1 ] = ( outV3[ 1 ] + 1 ) / 2;
            outV3[ 2 ] = ( outV3[ 2 ] + 1 ) / 2;
            console.log( outV3 );
            outV3[ 0 ] = outV3[ 0 ] * gl.canvas.clientWidth + gl.canvas.clientLeft;
            outV3[ 1 ] = outV3[ 1 ] * gl.canvas.clientHeight + gl.canvas.clientTop;
            console.log( outV3 );

            s.left = outV3[ 0 ]|0 + "px";
            s.top = outV3[ 1 ]|0 + "px";

            return outV3;
        }
        unproject ( outV3 ) {

            let inp = [ outV3[ 0 ], outV3[ 1 ], outV3[ 2 ], 1.0 ];

            inp[ 0 ] = ( inp[ 0 ] - gl.canvas.clientLeft ) / gl.canvas.clientWidth;
            inp[ 1 ] = ( inp[ 0 ] - gl.canvas.clientTop ) / gl.canvas.clientHeight;

            inp[ 0 ] = inp[ 0 ] * 2 - 1;
            inp[ 1 ] = inp[ 1 ] * 2 - 1;
            inp[ 2 ] = inp[ 2 ] * 2 - 1;

            CACHE_A.set( this.transform ).multiply( this.projection ).invert();

            vec4.multiplyMat4( inp, CACHE_A );

            inp[ 0 ] /= inp[ 3 ];
            inp[ 1 ] /= inp[ 3 ];
            inp[ 2 ] /= inp[ 3 ];
            

            
            /*
            //console.log(CACHE_MAT4);
            vec3.applyProjection( outV3, CACHE_B );

            s.left = ( ( outV3[ 0 ] + 1 ) / 2 * gl.canvas.width )|0 + "px";
            s.top = ( ( outV3[ 1 ] + 1 ) / 2 * gl.canvas.height )|0 + "px";

            console.log( s.left, s.top );
            return outV3;
            */

            vec3.set( outV3, inp );

            console.log( outV3 );
            return outV3;
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