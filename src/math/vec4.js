define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";

    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    class vec4 {
        constructor ( x, y, z, w ) {
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;
            if ( w === undefined ) w = x;
            
            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;
            this[_w_] = w;
        }
        *[Symbol.iterator] ( ) {
            let index = 0;
            while ( index < this.length ) yield this[ index++ ];
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

    def.Properties( vec4.prototype, {
        length : 4,
        splice : [].splice,
        toString : function ( ) {
            return "["+this[0]+","+this[1]+","+this[2]+","+this[3]+"]"
        }
    });
    
    return vec4;
});