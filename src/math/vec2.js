define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";
    const _x_ = 0;
    const _y_ = 1;

    class vec2 extends Float32Array {

        constructor ( x, y ) {
            super( 2 );

            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;

            this[_x_] = x;
            this[_y_] = y;
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
        
        divide ( inV2B, inV2A ) { return vec2.divide( this, inV2B, inV2A ); }
        static divide ( outV2, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] / inV2B[_x_];
            outV2[_y_] = inV2A[_y_] / inV2B[_y_];
                
            return outV2;
        }
        
        addScalar ( s ) { return vec2.addScalar( this, s ); }
        static addScalar ( outV2, s ) {
            outV2[_x_] += s;
            outV2[_y_] += s;
            return outV2;
        }
        
        multiplyScalar ( s ) { return vec2.multiplyScalar( this, s ); }
        static multiplyScalar ( outV2, s ) {
            outV2[_x_] *= s;
            outV2[_y_] *= s;
            return outV2;
        }
        
        lerp ( alpha, inV2B, inV2A ) { return vec2.lerp( this, alpha, inV2B, inV2A ); }
        static lerp ( outV2, alpha, inV2B, inV2A ) {
            if ( inV2A === undefined ) inV2A = outV2;

            outV2[_x_] = inV2A[_x_] + ( inV2B[_x_] - inV2A[_x_] ) * alpha;
            outV2[_y_] = inV2A[_y_] + ( inV2B[_y_] - inV2A[_y_] ) * alpha;
            return this;
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

    
    return vec2;

});