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

        set ( inV3 ) {
            this[_x_] = inV3[_x_];
            this[_y_] = inV3[_y_];
            this[_z_] = inV3[_z_];
            return this;
        }
        static set ( outV3, inV3 ) {
            return vec3.prototype.set.call( outV3, inV3 );
        }

        setValues ( x, y, z ) { 
            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;  
            return this;
        }
        static setValues ( outV3, x, y, z ) {
            return vec3.prototype.setValues.call( outV3, x, y, z );
        }

        add ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] + vB[_x_];
            this[_y_] = vA[_y_] + vB[_y_];
            this[_z_] = vA[_z_] + vB[_z_];
            return this;
        }
        static add ( outV3, vA, vB ) {
            return vec3.prototype.add.call( outV3, vA, vB );
        }

        sub ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vB[_x_] - vA[_x_];
            this[_y_] = vB[_y_] - vA[_y_];
            this[_z_] = vB[_z_] - vA[_z_];
            return this;
        }
        static sub ( outV3, vA, vB ) {
            return vec3.prototype.sub.call( outV3, vA, vB );
        }

        multiply ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] * vB[_x_];
            this[_y_] = vA[_y_] * vB[_y_];
            this[_z_] = vA[_z_] * vB[_z_];
            return this;
        }
        static multiply ( outV3, vA, vB ) {
            return vec3.prototype.multiply.call( outV3, vA, vB );
        }

        divide ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] / vB[_x_];
            this[_y_] = vA[_y_] / vB[_y_];
            this[_z_] = vA[_z_] / vB[_z_];
            return this;
        }
        static divide ( outV3, vA, vB ) {
            return vec3.prototype.divide.call( outV3, vA, vB );
        }

        dot ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            return s = vA[_x_] * vB[_x_]
                     + vA[_y_] * vB[_y_]
                     + vA[_z_] * vB[_z_];
        }
        static dot ( vA, vB ) {
            return vec3.prototype.dot.call( vA, vB );
        }

        cross ( vA, vB ) {
            if ( vB === undefined ) vB = CACHE_VEC3.set( this );

            this[_x_] = vA[_y_] * vB[_z_] - vA[_z_] * vB[_y_];
            this[_y_] = vA[_z_] * vB[_x_] - vA[_x_] * vB[_z_];
            this[_z_] = vA[_x_] * vB[_y_] - vA[_y_] * vB[_x_];  
            return this;
        }
        static cross ( outV3, vA, vB ) {
            return vec3.prototype.cross.call( outV3, vA, vB );
        }

        addScalar ( inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = this;

            this[_x_] = inV3[_x_] + inS;
            this[_y_] = inV3[_y_] + inS;
            this[_z_] = inV3[_z_] + inS;
            return this
        }
        static addScalar ( outV3, inS, inV3 ) {
            return vec3.prototype.addScalar.call( outV3, inS, inV3 );
        }

        multiplyScalar ( inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = this;

            this[_x_] = inV3[_x_] * inS;
            this[_y_] = inV3[_y_] * inS;
            this[_z_] = inV3[_z_] * inS;
            return this
        }
        static multiplyScalar ( outV3, inS, inV3 ) {
            return vec3.prototype.multiplyScalar.call( outV3, inS, inV3 );
        }

        multiplyMat3 ( inM3, inV3 ) {
            if ( inV3 === undefined ) inV3 = this;

            let x = this[_x_];
            let y = this[_y_];
            let z = this[_z_];

            this[_x_] = x * inM3[ 0 ] + y * inM3[ 3 ] + z * inM3[ 6 ];
            this[_y_] = x * inM3[ 1 ] + y * inM3[ 4 ] + z * inM3[ 7 ];
            this[_z_] = x * inM3[ 2 ] + y * inM3[ 5 ] + z * inM3[ 9 ];

            return this;
        }
        static multiplyMat3 ( outV3, inM3, inV3 ) {
            return vec3.prototype.multiplyMat3.call( outV3, inM3, inV3 );
        }

        divideScalar ( inS, inV3 ) {
            if ( inV3 === undefined ) inV3 = this;

            this[_x_] = inV3[_x_] / inS;
            this[_y_] = inV3[_y_] / inS;
            this[_z_] = inV3[_z_] / inS;
            return this
        }
        static divideScalar ( outV3, inS, inV3 ) {
            return vec3.prototype.divideScalar.call( outV3, inS, inV3 );
        }

        lerp ( s, vA, vB ) {
            if ( vB === undefined ) vB = this;
            let alpha = s;

            this[_x_] = vA[_x_] + ( vB[_x_] - vA[_x_] ) * alpha;
            this[_y_] = vA[_y_] + ( vB[_y_] - vA[_y_] ) * alpha;
            this[_z_] = vA[_z_] + ( vB[_z_] - vA[_z_] ) * alpha;
            return this;
        }
        static lerp ( outV3, s, vA, vB ) {
            return vec3.prototype.lerp.call( outV3, s, vA, vB );
        }

        normalize ( ) {
            let length = vec3.prototype.getLength.call( this );
            if ( length === 0 ) return this;
            else return vec3.prototype.multiplyScalar.call( this, 1 / length );
        }
        static normalize ( outV3 ) {
            return vec3.prototype.normalize.call( outV3 );
        } 

        multiplyQuat4 ( inQ4, inV3 ) {
            if ( inV3 === undefined ) inV3 = CACHE_VEC3.set( this );

            let q = inQ4;
            let v = inV3;

            let x = q[_w_] * v[_x_] + q[_y_] * v[_z_] - q[_z_] * v[_y_];
            let y = q[_w_] * v[_y_] + q[_z_] * v[_x_] - q[_x_] * v[_z_];
            let z = q[_w_] * v[_z_] + q[_x_] * v[_y_] - q[_y_] * v[_x_];
            let w = q[_x_] * v[_x_] - q[_y_] * v[_y_] - q[_z_] * v[_z_];

            this[_x_] = x * q[_w_] + w * -q[_x_] + y * -q[_z_] - z * -q[_y_];
            this[_y_] = y * q[_w_] + w * -q[_y_] + z * -q[_x_] - x * -q[_z_];
            this[_z_] = z * q[_w_] + w * -q[_z_] + x * -q[_y_] - y * -q[_x_];
            
            return this;
        }
        static multiplyQuat4 ( outV3, inQ4, inV3 ) {
            return vec3.prototype.applyQuat4.call( outV3, inQ4, inV3 );
        }

        applyProjection ( m ) {
            let x = this[_x_];
            let y = this[_y_];
            let z = this[_z_];

            let d = 1 / ( m[_0_3_] * x + m[_1_3_] * y + m[_2_3_] * z + m[_3_3_] );
            this[_x_] = ( m[_0_0_] * x + m[_1_0_] * y + m[_2_0_] * z + m[_3_0_] ) * d;
            this[_y_] = ( m[_0_1_] * x + m[_1_1_] * y + m[_2_1_] * z + m[_3_1_] ) * d;
            this[_z_] = ( m[_0_2_] * x + m[_1_2_] * y + m[_2_2_] * z + m[_3_2_] ) * d;

            return this;
        }
        
        static applyProjection ( outV3, inM4 ) {
            return vec3.prototype.applyProjection.call( outV3, inM4 );
        }

        getLength ( ) {
            return Math.sqrt(
                this[_x_] * this[_x_] +
                this[_y_] * this[_y_] +
                this[_z_] * this[_z_]
            );  
        }
        static getLength ( inV3 ) {
            return vec3.prototype.getLength.call( inV3 );
        }

        getLengthSq ( ) {
            return ( 
                this[_x_] * this[_x_] +
                this[_y_] * this[_y_] +
                this[_z_] * this[_z_]
            );
        }
        static getLengthSq ( inV3 ) {
            return vec3.prototype.getLengthSq.call( inV3 );
        }

        getLengthManhattan ( ) {
            return (
                Math.abs( this[_x_] ) +
                Math.abs( this[_y_] ) +
                Math.abs( this[_z_] )
            );
        }
        static getLengthManhattan ( inV3 ) {
            return vec3.prototype.getLengthManhattan.call( inV3 );
        }
    }
    

    const CACHE_VEC3 = new vec3

    
    def.Properties( vec3, {
        UP      : new vec3(  0,  1,  0 ),
        DOWN    : new vec3(  0, -1,  0 ),
        RIGHT   : new vec3(  1,  0,  0 ),
        LEFT    : new vec3( -1,  0,  0 ),
        AHEAD   : new vec3(  0,  0,  1 ),
        BACK    : new vec3(  0,  0, -1 )
    }, def.CONFIGURABLE );

    return vec3;

});