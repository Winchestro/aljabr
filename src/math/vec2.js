define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";
    const _x_ = 0;
    const _y_ = 1;

    class vec2 {

        constructor ( x, y ) {
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;

            this[_x_] = x;
            this[_y_] = y;
        }
        *[Symbol.iterator] ( ) {
            let index = 0;
            while ( index < this.length ) yield this[ index++ ];
        }

        
        dot ( vA ) {
            return this[_x_] * vA[_x_]
                 + this[_y_] * vA[_y_]; 
        }
        static dot ( inV2, vA ) {
            return vec2.prototype.dot.call( inV2, vA );
        }

        set ( vA ) {
            this[_x_] = vA[_x_];
            this[_y_] = vA[_y_];
            return this;    
        }
        static set ( outV2, vA ) {
            return vec2.prototype.set.call( outV2, vA );
        } 

        setValues ( x, y ) {
            this[_x_] = x;
            this[_y_] = y;
            return this;
        }
        static setValues ( outV2, x, y ) {
            return vec2.prototype.setValues.call( outV2, x, y );
        }
        
        add ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] + vB[_x_];
            this[_y_] = vA[_y_] + vB[_y_];
            return this;
        }
        static add ( outV2, vA, vB ) {
            return vec2.prototype.add.call( outV2, vA, vB );
        }

        sub ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vB[_x_] - vA[_x_];
            this[_y_] = vB[_y_] - vA[_y_];
            return this;
        }
        static sub ( outV2, vA, vB ) {
            return vec2.prototype.sub.call( outV2, vA, vB );
        }

        multiply ( vA, vB ) {
            if ( vB === undefined ) vB = this;
                
            this[_x_] = vA[_x_] * vB[_x_];
            this[_y_] = vA[_y_] * vB[_y_];
                
            return this;
        }
        static multiply ( outV2, vA, vB ) {
            return vec2.prototype.multiply.call( outV2, vA, vB );
        }

        divide ( vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vB[_x_] / vA[_x_];
            this[_y_] = vB[_y_] / vA[_y_];
                
            return this;
        }
        static divide ( outV2, vA, vB ) {
            return vec2.prototype.divide.call( outV2, vA, vB );
        }

        addScalar ( s ) {
            this[_x_] += s;
            this[_y_] += s;
            return this;
        }
        static addScalar ( outV2, s ) {
            return vec2.prototype.addScalar.call( outV2, s );
        }

        multiplyScalar ( s ) {
            this[_x_] *= s;
            this[_y_] *= s;
            return this;
        }
        static multiplyScalar ( outV2, s ) {
            return vec2.prototype.multiplyScalar.call( outV2, s );
        }

        lerp ( s, vA, vB ) {
            if ( vB === undefined ) vB = this;

            this[_x_] = vA[_x_] + ( vB[_x_] - vA[_x_] ) * s;
            this[_y_] = vA[_y_] + ( vB[_y_] - vA[_y_] ) * s;
            return this;
        }
        static lerp ( outV2, s, vA, vB ) {
            return vec2.prototype.lerp.call( outV2, s, vA, vB );
        }

        normalize ( ) {
            let length = vec2.prototype.getLength.call( this );
            if ( length === 0 ) return this;
            else return vec2.prototype.multiplyScalar.call( this, 1 / length );
        }
        static normalize ( outV2 ) {
            return vec2.prototype.normalize.call( outV2 );
        } 

        getLength ( ) {
            return Math.sqrt(
                  this[_x_] * this[_x_]
                + this[_y_] * this[_y_]
            );  
        }
        static getLength ( inV2 ) {
            return vec2.prototype.getLength.call( inV2 );
        }

        getLengthSq ( ) {
            return this[_x_] * this[_x_]
                 + this[_y_] * this[_y_];   
        }
        static getLengthSq ( inV2 ) {
            return vec2.prototype.getLengthSq.call( inV2 );
        }

        getLengthManhattan ( ) {
            return Math.abs( this[_x_] )
                 + Math.abs( this[_y_] );
        }
        static getLengthManhattan ( inV2 ) {
            return vec2.prototype.getLengthManhattan.call( inV2 );
        }
    }

    def.Properties( vec2.prototype, {
        length : 2,
        splice : [].splice,
        toString : function ( ) {
            return "["+this[0]+","+this[1]+"]"
        }
    });
    
    return vec2;

});