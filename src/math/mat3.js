define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";

    const _0_0_ = 0; const _0_1_ = 1; const _0_2_ = 2;
    const _1_0_ = 3; const _1_1_ = 4; const _1_2_ = 5;
    const _2_0_ = 6; const _2_1_ = 7; const _2_2_ = 8;
    
    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    const abs = Math.abs;
    const sin = Math.sin;
    const cos = Math.cos;
    const EPSILON = Math.EPSILON;

    class mat3 extends Float32Array {
        constructor ( buffer, byteOffset ) {
            if ( buffer instanceof ArrayBuffer ) super( buffer, byteOffset, 9 );
            else super( 9 );

            mat3.makeIdentity( this );
        }
        
        set        (           in_mat3 ) { return mat3.set( in_mat3 ); }
        static set ( out_mat3, in_mat3 ) {
            out_mat3[_0_0_] = in_mat3[_0_0_];
            out_mat3[_0_1_] = in_mat3[_0_1_];
            out_mat3[_0_2_] = in_mat3[_0_2_];
            out_mat3[_1_0_] = in_mat3[_1_0_];
            out_mat3[_1_1_] = in_mat3[_1_1_];
            out_mat3[_1_2_] = in_mat3[_1_2_];
            out_mat3[_2_0_] = in_mat3[_2_0_];
            out_mat3[_2_1_] = in_mat3[_2_1_];
            out_mat3[_2_2_] = in_mat3[_2_2_];
            return out_mat3;
        }


        setValues ( _00,_01,_02,  _10,_11,_12,  _20,_21,_22 ) { return mat3.setValues( this,  _00,_01,_02,  _10,_11,_12,  _20,_21,_22 ); }
        static setValues ( out_mat3, _00,_01,_02,  _10,_11,_12,  _20,_21,_22 ) {
            out_mat3[_0_0_] = _00;
            out_mat3[_0_1_] = _01;
            out_mat3[_0_2_] = _02;
            out_mat3[_1_0_] = _10;
            out_mat3[_1_1_] = _11;
            out_mat3[_1_2_] = _12;
            out_mat3[_2_0_] = _20;
            out_mat3[_2_1_] = _21;
            out_mat3[_2_2_] = _22;
            return out_mat3;
        }


        transpose        (           in_mat3 ) { return mat3.transpose( this, in_mat3 ); }
        static transpose ( out_mat3, in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.set( CACHE_MAT3, out_mat3 );
            
            out_mat3[_0_0_] = in_mat3[_0_0_];
            out_mat3[_0_1_] = in_mat3[_1_0_];
            out_mat3[_0_2_] = in_mat3[_2_0_];
            out_mat3[_1_0_] = in_mat3[_0_1_];
            out_mat3[_1_1_] = in_mat3[_1_1_];
            out_mat3[_1_2_] = in_mat3[_2_1_];
            out_mat3[_2_0_] = in_mat3[_0_2_];
            out_mat3[_2_1_] = in_mat3[_1_2_];
            out_mat3[_2_2_] = in_mat3[_2_2_];
            return out_mat3;
        }

        add        (           in_mat3_B, in_mat3_A ) { return mat3.add( this, in_mat3_B, in_mat3_A ); }
        static add ( out_mat3, in_mat3_B, in_mat3_A ) {
            if ( in_mat3_A === undefined ) in_mat3_A = out_mat3;

            out_mat3[_0_0_] = in_mat3_A[_0_0_] + in_mat3_B[_0_0_];
            out_mat3[_0_1_] = in_mat3_A[_0_1_] + in_mat3_B[_0_1_];
            out_mat3[_0_2_] = in_mat3_A[_0_2_] + in_mat3_B[_0_2_];
            out_mat3[_1_0_] = in_mat3_A[_1_0_] + in_mat3_B[_1_0_];
            out_mat3[_1_1_] = in_mat3_A[_1_1_] + in_mat3_B[_1_1_];
            out_mat3[_1_2_] = in_mat3_A[_1_2_] + in_mat3_B[_1_2_];
            out_mat3[_2_0_] = in_mat3_A[_2_0_] + in_mat3_B[_2_0_];
            out_mat3[_2_1_] = in_mat3_A[_2_1_] + in_mat3_B[_2_1_];
            out_mat3[_2_2_] = in_mat3_A[_2_2_] + in_mat3_B[_2_2_];
            return out_mat3;
        }

        multiply        (           in_mat3_B, in_mat3_A ) { return mat3.multiply( this, in_mat3_B, in_mat3_A ); }
        static multiply ( out_mat3, in_mat3_B, in_mat3_A ) {
            if ( in_mat3_A === undefined ) in_mat3_A = mat3.set( CACHE_MAT3, out_mat3 );

            out_mat3[_0_0_] = in_mat3_A[_0_0_] * in_mat3_B[_0_0_]
                            + in_mat3_A[_0_1_] * in_mat3_B[_1_0_]
                            + in_mat3_A[_0_2_] * in_mat3_B[_2_0_];
            out_mat3[_0_1_] = in_mat3_A[_0_0_] * in_mat3_B[_0_1_]
                            + in_mat3_A[_0_1_] * in_mat3_B[_1_1_]
                            + in_mat3_A[_0_2_] * in_mat3_B[_2_1_];
            out_mat3[_0_2_] = in_mat3_A[_0_0_] * in_mat3_B[_0_2_]
                            + in_mat3_A[_0_1_] * in_mat3_B[_1_2_]
                            + in_mat3_A[_0_2_] * in_mat3_B[_2_2_];
            out_mat3[_1_0_] = in_mat3_A[_1_0_] * in_mat3_B[_0_0_]
                            + in_mat3_A[_1_1_] * in_mat3_B[_1_0_]
                            + in_mat3_A[_1_2_] * in_mat3_B[_2_0_];
            out_mat3[_1_1_] = in_mat3_A[_1_0_] * in_mat3_B[_0_1_]
                            + in_mat3_A[_1_1_] * in_mat3_B[_1_1_]
                            + in_mat3_A[_1_2_] * in_mat3_B[_2_1_];
            out_mat3[_1_2_] = in_mat3_A[_1_0_] * in_mat3_B[_0_2_]
                            + in_mat3_A[_1_1_] * in_mat3_B[_1_2_]
                            + in_mat3_A[_1_2_] * in_mat3_B[_2_2_];
            out_mat3[_2_0_] = in_mat3_A[_2_0_] * in_mat3_B[_0_0_]
                            + in_mat3_A[_2_1_] * in_mat3_B[_1_0_]
                            + in_mat3_A[_2_2_] * in_mat3_B[_2_0_];
            out_mat3[_2_1_] = in_mat3_A[_2_0_] * in_mat3_B[_0_1_]
                            + in_mat3_A[_2_1_] * in_mat3_B[_1_1_]
                            + in_mat3_A[_2_2_] * in_mat3_B[_2_1_];
            out_mat3[_2_2_] = in_mat3_A[_2_0_] * in_mat3_B[_0_2_]
                            + in_mat3_A[_2_1_] * in_mat3_B[_1_2_]
                            + in_mat3_A[_2_2_] * in_mat3_B[_2_2_];
            return out_mat3;
        }



        addScalar        (           s, in_mat3 ) { return mat3.addScalar( this, s, in_mat3 ); }
        static addScalar ( out_mat3, s, in_mat3 ) {
            if ( in_mat3 === undefined ) inM3 = out_mat3;

            out_mat3[_0_0_] = in_mat3[_0_0_] + s;
            out_mat3[_0_1_] = in_mat3[_0_1_] + s;
            out_mat3[_0_2_] = in_mat3[_0_2_] + s;
            out_mat3[_1_0_] = in_mat3[_1_0_] + s;
            out_mat3[_1_1_] = in_mat3[_1_1_] + s;
            out_mat3[_1_2_] = in_mat3[_1_2_] + s;
            out_mat3[_2_0_] = in_mat3[_2_0_] + s;
            out_mat3[_2_1_] = in_mat3[_2_1_] + s;
            out_mat3[_2_2_] = in_mat3[_2_2_] + s;
            return out_mat3;
        }

        multiplyScalar        (           s, in_mat3 ) { return mat3.multiplyScalar( this, s, in_mat3 ); }
        static multiplyScalar ( out_mat3, s, in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = out_mat3;

            out_mat3[_0_0_] = in_mat3[_0_0_] * s;
            out_mat3[_0_1_] = in_mat3[_0_1_] * s;
            out_mat3[_0_2_] = in_mat3[_0_2_] * s;
            out_mat3[_1_0_] = in_mat3[_1_0_] * s;
            out_mat3[_1_1_] = in_mat3[_1_1_] * s;
            out_mat3[_1_2_] = in_mat3[_1_2_] * s;
            out_mat3[_2_0_] = in_mat3[_2_0_] * s;
            out_mat3[_2_1_] = in_mat3[_2_1_] * s;
            out_mat3[_2_2_] = in_mat3[_2_2_] * s;
            return out_mat3;
        }

        invert        (           in_mat3 ) { return mat3.invert( this, in_mat3 ); }
        static invert ( out_mat3, in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.transpose( CACHE_MAT3, out_mat3 );
            else                         in_mat3 = mat3.transpose( CACHE_MAT3, in_mat3 );
            
            out_mat3[_0_0_] = in_mat3[_2_2_] * in_mat3[_1_1_] - in_mat3[_1_2_] * in_mat3[_2_1_];
            out_mat3[_0_1_] = in_mat3[_2_0_] * in_mat3[_1_2_] - in_mat3[_2_2_] * in_mat3[_1_0_];
            out_mat3[_0_2_] = in_mat3[_2_1_] * in_mat3[_1_0_] - in_mat3[_2_0_] * in_mat3[_1_1_];
            out_mat3[_1_0_] = in_mat3[_2_1_] * in_mat3[_0_2_] - in_mat3[_2_2_] * in_mat3[_0_1_];
            out_mat3[_1_1_] = in_mat3[_2_2_] * in_mat3[_0_0_] - in_mat3[_2_0_] * in_mat3[_0_2_];
            out_mat3[_1_2_] = in_mat3[_2_0_] * in_mat3[_0_1_] - in_mat3[_2_1_] * in_mat3[_0_0_];
            out_mat3[_2_0_] = in_mat3[_1_2_] * in_mat3[_0_1_] - in_mat3[_1_1_] * in_mat3[_0_2_];
            out_mat3[_2_1_] = in_mat3[_1_0_] * in_mat3[_0_2_] - in_mat3[_0_0_] * in_mat3[_1_2_];
            out_mat3[_2_2_] = in_mat3[_1_1_] * in_mat3[_0_0_] - in_mat3[_1_0_] * in_mat3[_0_1_];

            let determinant = in_mat3[_0_0_] * out_mat3[_0_0_]
                            + in_mat3[_1_0_] * out_mat3[_1_0_]
                            + in_mat3[_2_0_] * out_mat3[_2_0_];
            
            if( abs( determinant ) < EPSILON ) return mat3.makeIdentity( out_mat3 );
            else return mat3.multiplyScalar( out_mat3, 1 / determinant );
        }

        translate              (           in_vec2, in_mat3 ) { return mat3.translateValues( this,     in_vec2[_x_], in_vec2[_y_], in_mat3 ); }
        translateValues        (           x, y,    in_mat3 ) { return mat3.translateValues( this,     x,            y,            in_mat3 ); }
        static translate       ( out_mat3, in_vec2, in_mat3 ) { return mat3.translateValues( out_mat3, in_vec2[_x_], in_vec2[_y_], in_mat3 ); }
        static translateValues ( out_mat3, x, y,    in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.set( CACHE_MAT3, out_mat3 );

            out_mat3[_0_0_] = in_mat3[_0_0_];
            out_mat3[_0_1_] = in_mat3[_0_1_];
            out_mat3[_0_2_] = in_mat3[_0_2_];
            out_mat3[_1_0_] = in_mat3[_1_0_];
            out_mat3[_1_1_] = in_mat3[_1_1_];
            out_mat3[_1_2_] = in_mat3[_1_2_];

            out_mat3[_2_0_] = in_mat3[_0_0_] * x + in_mat3[_1_0_] * y + in_mat3[_2_0_];
            out_mat3[_2_1_] = in_mat3[_0_1_] * x + in_mat3[_1_1_] * y + in_mat3[_2_1_];
            out_mat3[_2_2_] = in_mat3[_0_2_] * x + in_mat3[_1_2_] * y + in_mat3[_2_2_];

            return out_mat3;
        }

    

        rotate        (           rad, in_mat3 ) { return mat3.rotate( this, rad, in_mat3 ); }
        static rotate ( out_mat3, rad, in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.set( CACHE_MAT3, out_mat3 );

            let s = sin( rad );
            let c = cos( rad );

            out_mat3[_0_0_] = c * in_mat3[_0_0_] + s * in_mat3[_1_0_];
            out_mat3[_0_1_] = c * in_mat3[_0_1_] + s * in_mat3[_1_1_];
            out_mat3[_0_2_] = c * in_mat3[_0_2_] + s * in_mat3[_1_2_];
            out_mat3[_1_0_] = c * in_mat3[_1_0_] - s * in_mat3[_0_0_];
            out_mat3[_1_1_] = c * in_mat3[_1_1_] - s * in_mat3[_0_1_];
            out_mat3[_1_2_] = c * in_mat3[_1_2_] - s * in_mat3[_0_2_];
            out_mat3[_2_0_] =     in_mat3[_2_0_];
            out_mat3[_2_1_] =     in_mat3[_2_1_];
            out_mat3[_2_2_] =     in_mat3[_2_2_];


            return out_mat3;
        }

        scale              (           in_vec2, in_mat3 ) { return mat3.scaleValues( this,     in_vec2[_x_], in_vec2[_y_], in_mat3 ); }
        scaleValues        (           x, y,    in_mat3 ) { return mat3.scaleValues( this,     x,            y,            in_mat3 ); }
        static scale       ( out_mat3, in_vec2, in_mat3 ) { return mat3.scaleValues( out_mat3, in_vec2[_x_], in_vec2[_y_], in_mat3 ); }
        static scaleValues ( out_mat3, x, y,    in_mat3 ) {
            if ( y === undefined ) y = x;
            if ( in_mat3 === undefined ) in_mat3 = out_mat3;
            
            out_mat3[_0_0_] = in_mat3[_0_0_] * x;
            out_mat3[_0_1_] = in_mat3[_0_1_] * x;
            out_mat3[_0_2_] = in_mat3[_0_2_] * x;
            out_mat3[_1_0_] = in_mat3[_1_0_] * y;
            out_mat3[_1_1_] = in_mat3[_1_1_] * y;
            out_mat3[_1_2_] = in_mat3[_1_2_] * y;
            out_mat3[_2_0_] = in_mat3[_2_0_];
            out_mat3[_2_1_] = in_mat3[_2_1_];
            out_mat3[_2_2_] = in_mat3[_2_2_];
            
            

            return out_mat3;
        }

        setTranslation              (           in_vec2 ) { return mat3.setTranslationValues( this,     in_vec2[_x_], in_vec2[_y_] ); }
        setTranslationValues        (           x, y    ) { return mat3.setTranslationValues( this,     x,            y            ); }
        static setTranslation       ( out_mat3, in_vec2 ) { return mat3.setTranslationValues( out_mat3, in_vec2[_x_], in_vec2[_y_] ); }
        static setTranslationValues ( out_mat3, x, y    ) {
            out_mat3[_2_0_] = x;
            out_mat3[_2_1_] = y;

            return out_mat3;
        }

        setScale              (           in_vec2 ) { return mat3.setScaleValues( this,     in_vec2[_x_], in_vec2[_y_] ); }
        setScaleValues        (           x, y    ) { return mat3.setScaleValues( this,     x,            y            ); }
        static setScale       ( out_mat3, in_vec2 ) { return mat3.setScaleValues( out_mat3, in_vec2[_x_], in_vec2[_y_] ); }
        static setScaleValues ( out_mat3, x, y    ) {
            if ( y === undefined ) y = x;

            out_mat3[_0_0_] = x;
            out_mat3[_1_1_] = y;

            return out_mat3;
        }
        //maybe put those on vec2 instead
        /*
        getTranslation              ( out_vec2          ) { return mat3.getTranslation( out_vec2, this ); }
        static getTranslation       ( out_vec2, in_mat3 ) {
            out_vec2[_x_] = in_mat3[_2_0_];
            out_vec2[_y_] = in_mat3[_2_1_];

            return out_vec2;
        }

        getScale              ( out_vec2          ) { return mat3.getScale( out_vec2, this ); }
        static getScale       ( out_vec2, in_mat3 ) {
            out_vec2[_x_] = in_mat3[_0_0_];
            out_vec2[_y_] = in_mat3[_1_1_];

            return out_vec2;
        }*/

        makeIdentity (  ) { return mat3.makeIdentity( this ); }
        static makeIdentity ( out_mat3 ) {
            out_mat3[_0_0_] = 1;
            out_mat3[_0_1_] = 0;
            out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = 0;
            out_mat3[_1_1_] = 1;
            out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = 0;
            out_mat3[_2_1_] = 0;
            out_mat3[_2_2_] = 1;
            return out_mat3;
        }
        
        makeTranslation              (           in_vec2 ) { return mat3.makeTranslationValues( this,     in_vec2[_x_], in_vec2[_y_] ); }
        makeTranslationValues        (           x, y    ) { return mat3.makeTranslationValues( this,     x,            y            ); }
        static makeTranslation       ( out_mat3, in_vec2 ) { return mat3.makeTranslationValues( out_mat3, in_vec2[_x_], in_vec2[_y_] ); }
        static makeTranslationValues ( out_mat3, x, y    ) {
           
            out_mat3[_0_0_] = 1;  out_mat3[_0_1_] = 0;  out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = 0;  out_mat3[_1_1_] = 1;  out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = x;  out_mat3[_2_1_] = y;  out_mat3[_2_2_] = 1;
            return out_mat3;
        }

        makeRotation        (           rad ) { return mat3.makeRotation( this, rad ); }
        static makeRotation ( out_mat3, rad ) {
            let s = sin( rad );
            let c = cos( rad );
            out_mat3[_0_0_] = c;  out_mat3[_0_1_] = s;  out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = -s; out_mat3[_1_1_] = c;  out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = 0;  out_mat3[_2_1_] = 0;  out_mat3[_2_2_] = 1;
            return out_mat3;
        }

        makeScale              (           in_vec2 ) { return mat3.makeScaleValues( this,     in_vec2[_x_], in_vec2[_y_] ); }
        makeScaleValues        (           x, y    ) { return mat3.makeScaleValues( this,     x,            y            ); }
        static makeScale       ( out_mat3, in_vec2 ) { return mat3.makeScaleValues( out_mat3, in_vec2[_x_], in_vec2[_y_] ); }
        static makeScaleValues ( out_mat3, x, y    ) {
            if ( y === undefined ) y = x;

            out_mat3[_0_0_] = x;  out_mat3[_0_1_] = 0;  out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = 0;  out_mat3[_1_1_] = y;  out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = 0;  out_mat3[_2_1_] = 0;  out_mat3[_2_2_] = 1;
            return out_mat3;
        }

        
    }


    def.Properties( mat3, {
        _00 : _0_0_, _01 : _0_1_, _02 : _0_2_,
        _10 : _1_0_, _11 : _1_1_, _12 : _1_2_,
        _20 : _2_0_, _21 : _2_1_, _22 : _2_1_
    });

    const CACHE_MAT3 = new mat3;

    return mat3;
});