define( [
    "../utilities/PropertyDescriptors",

], function module (
    def
) {
    "use strict";
    
    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;
    
    const _0_0_ =  0; const _0_1_ =  1; const _0_2_ =  2; const _0_3_ = 3; 
    const _1_0_ =  4; const _1_1_ =  5; const _1_2_ =  6; const _1_3_ = 7;
    const _2_0_ =  8; const _2_1_ =  9; const _2_2_ = 10; const _2_3_ = 11;
    const _3_0_ = 12; const _3_1_ = 13; const _3_2_ = 14; const _3_3_ = 15;

    class vec3 extends Float32Array {
        constructor ( x, y, z ) {
            super( 3 );

            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;

            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;
        }

        set ( inV3 ) { return vec3.set( this, inV3 ); }
        static set ( outV3, inV3 ) {
            outV3[_x_] = inV3[_x_];
            outV3[_y_] = inV3[_y_];
            outV3[_z_] = inV3[_z_];
            return outV3;
        }
        

        setValues ( x, y, z ) { return vec3.setValues( this, x, y, z ); }
        static setValues ( outV3, x, y, z ) { 
            outV3[_x_] = x;
            outV3[_y_] = y;
            outV3[_z_] = z;  
            return outV3;
        }
        

        add ( vA, vB ) { return vec3.add( this, vA, vB ); }
        static add ( outV3, vA, vB ) {
            if ( vB === undefined ) vB = outV3;

            outV3[_x_] = vA[_x_] + vB[_x_];
            outV3[_y_] = vA[_y_] + vB[_y_];
            outV3[_z_] = vA[_z_] + vB[_z_];
            return outV3;
        }
        

        addValues( x, y, z ) { return vec3.addValues( this, x, y, z ); }
        static addValues ( outV3, x, y, z ) {
            outV3[_x_] += x;
            outV3[_y_] += y;
            outV3[_z_] += z;
            return outV3;
        }
        

        addScalar ( inS, inV3 ) { return vec3.addScalar( this, inS, inV3 ); }
        static addScalar ( outV3, inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = outV3;

            outV3[_x_] = inV3[_x_] + inS;
            outV3[_y_] = inV3[_y_] + inS;
            outV3[_z_] = inV3[_z_] + inS;
            return outV3;
        }
        

        sub ( vA, vB ) { return vec3.sub( this, vA, vB ); }
        static sub ( outV3, vA, vB ) {
            if ( vB === undefined ) vB = outV3;

            outV3[_x_] = vB[_x_] - vA[_x_];
            outV3[_y_] = vB[_y_] - vA[_y_];
            outV3[_z_] = vB[_z_] - vA[_z_];
            return outV3;
        }
        

        multiply ( vA, vB ) { return vec3.multiply( this, vA, vB ); }
        static multiply ( outV3, vA, vB ) {
            if ( vB === undefined ) vB = outV3;

            outV3[_x_] = vA[_x_] * vB[_x_];
            outV3[_y_] = vA[_y_] * vB[_y_];
            outV3[_z_] = vA[_z_] * vB[_z_];
            return outV3;
        }
        

        multiplyScalar ( inS, inV3 ) { return vec3.multiplyScalar( this, inS, inV3 ); }
        static multiplyScalar ( outV3, inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = outV3;

            outV3[_x_] = inV3[_x_] * inS;
            outV3[_y_] = inV3[_y_] * inS;
            outV3[_z_] = inV3[_z_] * inS;
            return outV3;
        }
        

        multiplyMat3 ( inM3, inV3 ) { return vec3.multiplyMat3( this, inM3, inV3 ); }
        static multiplyMat3 ( outV3, inM3, inV3 ) {
            if ( inV3 === undefined ) inV3 = outV3;

            let x = outV3[_x_];
            let y = outV3[_y_];
            let z = outV3[_z_];

            outV3[_x_] = x * inM3[ 0 ] + y * inM3[ 3 ] + z * inM3[ 6 ];
            outV3[_y_] = x * inM3[ 1 ] + y * inM3[ 4 ] + z * inM3[ 7 ];
            outV3[_z_] = x * inM3[ 2 ] + y * inM3[ 5 ] + z * inM3[ 9 ];

            return outV3;
        }
        
        divide ( vA, vB ) { return vec3.divide( this, vA, vB ); }
        static divide ( outV3, vA, vB ) {
            if ( vB === undefined ) vB = outV3;

            outV3[_x_] = vA[_x_] / vB[_x_];
            outV3[_y_] = vA[_y_] / vB[_y_];
            outV3[_z_] = vA[_z_] / vB[_z_];
            return this;
        }

        divideScalar ( inS, inV3 ) { return vec3.divideScalar( this, inS, inV3 ); }
        static divideScalar ( outV3, inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = outV3;

            outV3[_x_] = inV3[_x_] / inS;
            outV3[_y_] = inV3[_y_] / inS;
            outV3[_z_] = inV3[_z_] / inS;
            return outV3
        }
        
        dot ( vB ) { return vec3.dot( this, vB ); }
        static dot ( vA, vB ) {
            return (   vA[_x_] * vB[_x_]
                     + vA[_y_] * vB[_y_]
                     + vA[_z_] * vB[_z_]
            );
        }
        
        cross ( vA, vB ) { return vec3.cross( this, vA, vB ); }
        static cross ( outV3, vA, vB ) {
            if ( vB === undefined ) vB = CACHE_VEC3.set( outV3 );

            outV3[_x_] = vA[_y_] * vB[_z_] - vA[_z_] * vB[_y_];
            outV3[_y_] = vA[_z_] * vB[_x_] - vA[_x_] * vB[_z_];
            outV3[_z_] = vA[_x_] * vB[_y_] - vA[_y_] * vB[_x_];  
            return outV3;
        }
        
        
        
        lerp ( s, vA, vB ) { return vec3.lerp( this, s, vA, vB ); }
        static lerp ( outV3, s, vA, vB ) {
            if ( vB === undefined ) vB = outV3;
            let alpha = s;

            outV3[_x_] = vA[_x_] + ( vB[_x_] - vA[_x_] ) * alpha;
            outV3[_y_] = vA[_y_] + ( vB[_y_] - vA[_y_] ) * alpha;
            outV3[_z_] = vA[_z_] + ( vB[_z_] - vA[_z_] ) * alpha;
            return outV3;
        }
        
        normalize ( ) { return vec3.normalize( this ); } 
        static normalize ( outV3 ) {
            let length = vec3.getLength( outV3 );
            if ( length === 0 ) return outV3;
            else return vec3.multiplyScalar( outV3, 1 / length );
        }
        
        multiplyQuat4 ( inQ4, inV3 ) { return vec3.applyQuat4( this, inQ4, inV3 ); }
        static multiplyQuat4 ( outV3, inQ4, inV3 ) {
            if ( inV3 === undefined ) inV3 = CACHE_VEC3.set( outV3 );

            let q = inQ4;
            let v = inV3;

            let x = q[_w_] * v[_x_] + q[_y_] * v[_z_] - q[_z_] * v[_y_];
            let y = q[_w_] * v[_y_] + q[_z_] * v[_x_] - q[_x_] * v[_z_];
            let z = q[_w_] * v[_z_] + q[_x_] * v[_y_] - q[_y_] * v[_x_];
            let w = q[_x_] * v[_x_] - q[_y_] * v[_y_] - q[_z_] * v[_z_];

            outV3[_x_] = x * q[_w_] + w * -q[_x_] + y * -q[_z_] - z * -q[_y_];
            outV3[_y_] = y * q[_w_] + w * -q[_y_] + z * -q[_x_] - x * -q[_z_];
            outV3[_z_] = z * q[_w_] + w * -q[_z_] + x * -q[_y_] - y * -q[_x_];
            
            return outV3;
        }
        
        applyProjection ( inM4 ) { return vec3.applyProjection( this, inM4 ); }
        static applyProjection ( outV3, m ) {
            let x = outV3[_x_];
            let y = outV3[_y_];
            let z = outV3[_z_];

            let d = 1 / ( m[_0_3_] * x + m[_1_3_] * y + m[_2_3_] * z + m[_3_3_] );
            outV3[_x_] = ( m[_0_0_] * x + m[_1_0_] * y + m[_2_0_] * z + m[_3_0_] ) * d;
            outV3[_y_] = ( m[_0_1_] * x + m[_1_1_] * y + m[_2_1_] * z + m[_3_1_] ) * d;
            outV3[_z_] = ( m[_0_2_] * x + m[_1_2_] * y + m[_2_2_] * z + m[_3_2_] ) * d;

            /*

            let d = 1 / ( m[_3_0_] * x + m[_3_1_] * y + m[_3_2_] * z + m[_3_3_] );
            
            this[_x_] = ( m[_0_0_] * x + m[_0_1_] * y + m[_0_2_] * z + m[_0_3_] ) * d;
            this[_y_] = ( m[_1_0_] * x + m[_1_1_] * y + m[_1_2_] * z + m[_1_3_] ) * d;
            this[_z_] = ( m[_2_0_] * x + m[_2_1_] * y + m[_2_2_] * z + m[_2_3_] ) * d;
            */
            
            return outV3;
        }
        
        getLength ( ) { return vec3.getLength( this ); }
        static getLength ( inV3 ) {
            return Math.sqrt(
                inV3[_x_] * inV3[_x_] +
                inV3[_y_] * inV3[_y_] +
                inV3[_z_] * inV3[_z_]
            );  
        }
        
        getLengthSq ( ) { return vec3.getLengthSq( this ); }
        static getLengthSq ( inV3 ) {
            return ( 
                inV3[_x_] * inV3[_x_] +
                inV3[_y_] * inV3[_y_] +
                inV3[_z_] * inV3[_z_]
            );
        }
        
        getLengthManhattan ( ) { return vec3.getLengthManhattan( this ); }
        static getLengthManhattan ( inV3 ) {
            return (
                Math.abs( inV3[_x_] ) +
                Math.abs( inV3[_y_] ) +
                Math.abs( inV3[_z_] )
            );
        }
        
    }
    

    const CACHE_VEC3 = new vec3

    
    def.Properties( vec3, {
        UP      : new vec3(  0,  0,  1 ),
        DOWN    : new vec3(  0,  0, -1 ),
        RIGHT   : new vec3(  1,  0,  0 ),
        LEFT    : new vec3( -1,  0,  0 ),
        FORWARD : new vec3(  0,  1,  0 ),
        BACKWARD: new vec3(  0, -1,  0 )
    }, def.CONFIGURABLE );

    return vec3;

});