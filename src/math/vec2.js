define( [
    "../utilities/PropertyDescriptors",
    "../kernel/ArrayBuffer",
    "../math/mat3",
    "../math/vec3"
], function module (
    def,
    ArrayBuffer,
    mat3,
    vec3
) {
    "use strict";
    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    class vec2 extends Float64Array {

        constructor ( x, y ) {
            if ( x instanceof ArrayBuffer ) {
                super( x, y, 2 );
            } else {

                super( 2 );
                if ( x === undefined ) x = 0;
                if ( y === undefined ) y = x;
                
                this[_x_] = x;
                this[_y_] = y;
            }
        }
        
        dot ( inV2B ) { return vec2.dot( this, inV2B ); }
        static dot ( inV2B, inV2A ) {
            return inV2A[_x_] * inV2B[_x_]
                 + inV2A[_y_] * inV2B[_y_]; 
        }
        
        set ( inV2 ) { return vec2.set( this, inV2 ); }
        static set ( outV2, inV2 ) {
            outV2[_x_] = inV2[_x_];
            outV2[_y_] = inV2[_y_];
            return outV2;
        }
        
        setValues ( x, y ) { return vec2.setValues( this, x, y ); }
        static setValues ( outV2, x, y ) {
            outV2[_x_] = x;
            outV2[_y_] = y;
            return outV2;
        }
        
        add ( inV2B, inV2A ) { return vec2.add( this, inV2B, inV2A ); }
        static add ( outV2, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] + inV2B[_x_];
            outV2[_y_] = inV2A[_y_] + inV2B[_y_];
            return outV2;
        }
        
        sub ( inV2B, inV2A ) { return vec2.sub( this, inV2B, inV2A ); }
        static sub ( outV2, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] - inV2B[_x_];
            outV2[_y_] = inV2A[_y_] - inV2B[_y_];
            return outV2;
        }
        
        multiply ( inV2B, inV2A ) { return vec2.multiply( this, inV2B, inV2A ); }
        static multiply ( outV2, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;
                
            outV2[_x_] = inV2A[_x_] * inV2B[_x_];
            outV2[_y_] = inV2A[_y_] * inV2B[_y_];
                
            return outV2;
        }

        multiplyValues        (        x, y, inV2A ) { return vec2.multiplyValues( this, x, y, inV2A ); }
        static multiplyValues ( outV2, x, y, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

                
            outV2[_x_] = inV2A[_x_] * x;
            outV2[_y_] = inV2A[_y_] * y;
                
            return outV2;
        }


        
        divide ( inV2B, inV2A ) { return vec2.divide( this, inV2B, inV2A ); }
        static divide ( outV2, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] / inV2B[_x_];
            outV2[_y_] = inV2A[_y_] / inV2B[_y_];
                
            return outV2;
        }
        
        addScalar ( s, in_vec2 ) { return vec2.addScalar( this, s, in_vec2 ); }
        static addScalar ( out_vec2, s, in_vec2 ) {
            if ( in_vec2 === undefined ) in_vec2 = out_vec2;

            out_vec2[_x_] = in_vec2[_x_] + s;
            out_vec2[_y_] = in_vec2[_y_] + s;
            return out_vec2;
        }
        
        multiplyScalar        (           s, in_vec2 ) { return vec2.multiplyScalar( this, s, in_vec2 ); }
        static multiplyScalar ( out_vec2, s, in_vec2 ) {
            if ( in_vec2 === undefined ) in_vec2 = out_vec2;

            out_vec2[_x_] = in_vec2[_x_] * s;
            out_vec2[_y_] = in_vec2[_y_] * s;
            return out_vec2;
        }

        multiplyMat3        (           in_mat3, in_vec3 ) { return vec2.multiplyMat3( this, in_mat3, in_vec3 ); }
        static multiplyMat3 ( out_vec2, in_mat3, in_vec3 ) {
            if ( in_vec3 === undefined ) in_vec3 = vec3.setValues( CACHE_VEC3, out_vec2[_x_], out_vec2[_y_], 0 );
            else                         in_vec3 = vec3.set( CACHE_VEC3, in_vec3 );

            out_vec2[_x_] = in_vec3[_x_] * in_mat3[ 0 ] + in_vec3[_y_] * in_mat3[ 3 ];
            out_vec2[_y_] = in_vec3[_x_] * in_mat3[ 1 ] + in_vec3[_y_] * in_mat3[ 4 ];
           

            return out_vec2;
        }
        
        lerp ( alpha, inV2B, inV2A ) { return vec2.lerp( this, alpha, inV2B, inV2A ); }
        static lerp ( outV2, alpha, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] + ( inV2B[_x_] - inV2A[_x_] ) * alpha;
            outV2[_y_] = inV2A[_y_] + ( inV2B[_y_] - inV2A[_y_] ) * alpha;
            return this;
        }

        getTranslationMat3        (           in_mat3 ) { return vec2.getTranslationMat3( this, in_mat3 ); }
        static getTranslationMat3 ( out_vec2, in_mat3 ) {
            out_vec2[_x_] = in_mat3[ mat3._20 ];
            out_vec2[_y_] = in_mat3[ mat3._21 ];

            return out_vec2;
        }

        getScaleMat3        (           in_mat3 ) { return vec2.getScaleMat3( this, in_mat3 ); }
        static getScaleMat3 ( out_vec2, in_mat3 ) {
            out_vec2[_x_] = in_mat3[ mat3._00 ];
            out_vec2[_y_] = in_mat3[ mat3._11 ];

            return out_vec2;
        }
        
        normalize ( ) { return vec2.normalize( this ); }
        static normalize ( outV2 ) {
            let length = vec2.getLength( outV2 );
            if ( length === 0 ) return outV2;
            else return vec2.multiplyScalar( outV2, 1 / length );
        }
        
        getLength ( ) { return vec2.getLength( this ); }
        static getLength ( inV2 ) {
            return Math.sqrt(
                  inV2[_x_] * inV2[_x_]
                + inV2[_y_] * inV2[_y_]
            );  
        }
        
        getLengthSq ( ) { return vec2.getLengthSq( this ); }
        static getLengthSq ( inV2 ) {
            return inV2[_x_] * inV2[_x_]
                 + inV2[_y_] * inV2[_y_];   
        }
        
        getLengthManhattan ( ) { return vec2.getLengthManhattan( this ); }
        static getLengthManhattan ( inV2 ) {
            return Math.abs( inV2[_x_] )
                 + Math.abs( inV2[_y_] );
        }
        
    }

    const CACHE_VEC3 = new vec3;

    return vec2;

});