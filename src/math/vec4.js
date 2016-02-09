define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";

    const _0_0_ =  0; const _0_1_ =  1; const _0_2_ =  2; const _0_3_ = 3; 
    const _1_0_ =  4; const _1_1_ =  5; const _1_2_ =  6; const _1_3_ = 7;
    const _2_0_ =  8; const _2_1_ =  9; const _2_2_ = 10; const _2_3_ = 11;
    const _3_0_ = 12; const _3_1_ = 13; const _3_2_ = 14; const _3_3_ = 15;

    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    class vec4 extends Float32Array {
        constructor ( x, y, z, w ) {
            super( 4 );
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;
            if ( w === undefined ) w = x;
            
            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;
            this[_w_] = w;
        }

        set ( inV4 ) {
            this[_x_] = inV4[_x_];
            this[_y_] = inV4[_y_];
            this[_z_] = inV4[_z_];
            this[_w_] = inV4[_w_];
            return this;    
        }
        static set ( outV4, inV4 ) {
            vec4.prototype.set.call( outV4, inV4 );
        }

        setValues ( x, y, z, w ) {
            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;
            this[_w_] = w;
            return this;
        }
        static setValues ( outV4, x, y, z, w ) {
            return vec4.prototype.setValues.call( outV4, x, y, z, w );
        }
        
        add ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] + vB[_x_];
            this[_y_] = vA[_y_] + vB[_y_];
            this[_z_] = vA[_z_] + vB[_z_];
            this[_w_] = vA[_w_] + vB[_w_];
            return this;
        }
        static add ( outV4, vA, vB ) {
            return vec4.prototype.add.call( outV4, vA, vB );
        }

        sub ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vB[_x_] - vA[_x_];
            this[_y_] = vB[_y_] - vA[_y_];
            this[_z_] = vB[_z_] - vA[_z_];
            this[_w_] = vB[_w_] - vA[_w_];
            return this;
        }
        static sub ( outV4, vA, vB ) {
            return vec4.prototype.sub.call( outV4, vA, vB );
        }

        multiply ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] * vB[_x_];
            this[_y_] = vA[_y_] * vB[_y_];
            this[_z_] = vA[_z_] * vB[_z_];
            this[_w_] = vA[_w_] * vB[_w_];
            return this;
        }
        static multiply ( outV4, vA, vB ) {
            return vec4.prototype.multiply.call( outV4, vA, vB );
        }

        divide ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] / vB[_x_];
            this[_y_] = vA[_y_] / vB[_y_];
            this[_z_] = vA[_z_] / vB[_z_];
            this[_w_] = vA[_w_] / vB[_w_];
            return this;
        }
        static divide ( outV4, vA, vB ) {
            return vec4.prototype.divide.call( outV4, vA, vB );
        }

        dot ( vA ) {
            return ( this[_x_] * vA[_x_]
                   + this[_y_] * vA[_y_]
                   + this[_z_] * vA[_z_]
                   + this[_w_] * vA[_w_]
            );
        }
        static dot ( vA, vB ) {
            return vec4.prototype.dot.call( vA, vB );
        }

        addScalar ( s, vA ) {
            if ( vA === undefined ) vA = this;

            this[_x_] = vA[_x_] + s;
            this[_y_] = vA[_y_] + s;
            this[_z_] = vA[_z_] + s;
            this[_w_] = vA[_w_] + s;
            return this
        }
        static addScalar ( outV4, s, vA ) {
            return vec4.prototype.addScalar.call( outV4, s, vA );
        }

        multiplyScalar ( s, vA ) {
            if ( vA === undefined ) vA = this;

            this[_x_] = vA[_x_] * s;
            this[_y_] = vA[_y_] * s;
            this[_z_] = vA[_z_] * s;
            this[_w_] = vA[_w_] * s;
            return this
        }
        static multiplyScalar ( outV4, s, vA ) {
            return vec4.prototype.multiplyScalar.call( outV4, s, vA );
        }

        multiplyMat4 ( inM4, inV4 ) {
            if ( inV4 === undefined ) inV4 = this;

            let x = this[_x_];
            let y = this[_y_];
            let z = this[_z_];
            let w = this[_w_];

            this[_x_] = x * inM4[_0_0_] + y * inM4[_1_0_] + z * inM4[_2_0_] + w * inM4[_3_0_];
            this[_y_] = x * inM4[_0_1_] + y * inM4[_1_1_] + z * inM4[_2_1_] + w * inM4[_3_1_];
            this[_z_] = x * inM4[_0_2_] + y * inM4[_1_2_] + z * inM4[_2_2_] + w * inM4[_3_2_];
            this[_w_] = x * inM4[_0_3_] + y * inM4[_1_3_] + z * inM4[_2_3_] + w * inM4[_3_3_];

            return this;
        }
        static multiplyMat4 ( outV4, inM4, inV4 ) {
            return vec4.prototype.multiplyMat4.call( outV4, inM4, inV4 );
        }

        lerp ( sAlpha, vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] + ( vB[_x_] - vA[_x_] ) * sAlpha;
            this[_y_] = vA[_y_] + ( vB[_y_] - vA[_y_] ) * sAlpha;
            this[_z_] = vA[_z_] + ( vB[_z_] - vA[_z_] ) * sAlpha;
            this[_w_] = vA[_w_] + ( vB[_w_] - vA[_w_] ) * sAlpha;
            return this;
        }
        static lerp ( outV4, sAlpha, vA, vB ) {
            return vec4.prototype.lerp.call( outV4, sAlpha, vA, vB );
        }

        normalize ( ) {
            let length = vec4.getLength( this );
            if ( length === 0 ) return this;
            else return vec4.multiplyScalar( this, 1 / length );
        }
        static normalize ( inV4 ) {
            return vec4.prototype.normalize.call( inV4 );
        } 

        getLength ( ) {
            return Math.sqrt(
                this[_x_] * this[_x_] +
                this[_y_] * this[_y_] +
                this[_z_] * this[_z_] +
                this[_w_] * this[_w_]
            );  
        }
        static getLength ( inV4 ) {
            return vec4.prototype.getLength.call( inV4 );
        }

        getLengthSq ( ) {
            return (
                this[_x_] * this[_x_] + 
                this[_y_] * this[_y_] + 
                this[_z_] * this[_z_] + 
                this[_w_] * this[_w_]
            );
        }
        static getLengthSq ( inV4 ) {
            return vec4.prototype.getLengthSq.call( inV4 );
        }

        getLengthManhattan ( ) {
            return ( 
                Math.abs( this[_x_] ) + 
                Math.abs( this[_y_] ) + 
                Math.abs( this[_z_] ) + 
                Math.abs( this[_w_] )
            );
        }
        static getLengthManhattan ( inV4 ) {
            return vec4.prototype.getLengthManhattan.call( inV4 );
        }
    }
    
    return vec4;
});