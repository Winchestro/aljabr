define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";

    const _0_0_ = 0; const _1_0_ = 3; const _2_0_ = 6;
    const _0_1_ = 1; const _1_1_ = 4; const _2_1_ = 7;
    const _0_2_ = 2; const _1_2_ = 5; const _2_2_ = 8;
    
    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

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

        transpose        (         ) { return mat3.transpose( this ); }
        static transpose ( in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.set( CACHE_MAT3, in_mat3 );
            
            out_mat3[_0_0_] = out_mat3[_0_0_];
            out_mat3[_0_1_] = out_mat3[_1_0_];
            out_mat3[_0_2_] = out_mat3[_2_0_];
            out_mat3[_1_0_] = out_mat3[_0_1_];
            out_mat3[_1_1_] = out_mat3[_1_1_];
            out_mat3[_1_2_] = out_mat3[_2_1_];
            out_mat3[_2_0_] = out_mat3[_0_2_];
            out_mat3[_2_1_] = out_mat3[_1_2_];
            out_mat3[_2_2_] = out_mat3[_2_2_];
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

            out_mat3[_0_0_] = in_mat3_A[_0_0_] * in_mat3_B[_0_0_] + in_mat3_A[_0_1_] * in_mat3_B[_1_0_] + in_mat3_A[_0_2_] * in_mat3_B[_2_0_];
            out_mat3[_0_1_] = in_mat3_A[_0_0_] * in_mat3_B[_0_1_] + in_mat3_A[_0_1_] * in_mat3_B[_1_1_] + in_mat3_A[_0_2_] * in_mat3_B[_2_1_];
            out_mat3[_0_2_] = in_mat3_A[_0_0_] * in_mat3_B[_0_2_] + in_mat3_A[_0_1_] * in_mat3_B[_1_2_] + in_mat3_A[_0_2_] * in_mat3_B[_2_2_];
            out_mat3[_1_0_] = in_mat3_A[_1_0_] * in_mat3_B[_0_0_] + in_mat3_A[_1_1_] * in_mat3_B[_1_0_] + in_mat3_A[_1_2_] * in_mat3_B[_2_0_];
            out_mat3[_1_1_] = in_mat3_A[_1_0_] * in_mat3_B[_0_1_] + in_mat3_A[_1_1_] * in_mat3_B[_1_1_] + in_mat3_A[_1_2_] * in_mat3_B[_2_1_];
            out_mat3[_1_2_] = in_mat3_A[_1_0_] * in_mat3_B[_0_2_] + in_mat3_A[_1_1_] * in_mat3_B[_1_2_] + in_mat3_A[_1_2_] * in_mat3_B[_2_2_];
            out_mat3[_2_0_] = in_mat3_A[_2_0_] * in_mat3_B[_0_0_] + in_mat3_A[_2_1_] * in_mat3_B[_1_0_] + in_mat3_A[_2_2_] * in_mat3_B[_2_0_];
            out_mat3[_2_1_] = in_mat3_A[_2_0_] * in_mat3_B[_0_1_] + in_mat3_A[_2_1_] * in_mat3_B[_1_1_] + in_mat3_A[_2_2_] * in_mat3_B[_2_1_];
            out_mat3[_2_2_] = in_mat3_A[_2_0_] * in_mat3_B[_0_2_] + in_mat3_A[_2_1_] * in_mat3_B[_1_2_] + in_mat3_A[_2_2_] * in_mat3_B[_2_2_];
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
        
        makeTranslation              (           in_vec3 ) { return mat3.makeTranslationValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
        makeTranslationValues        (           x, y, z ) { return mat3.makeTranslationValues( this,     x,            y,            z            ); }
        static makeTranslation       ( out_mat3, in_vec3 ) { return mat3.makeTranslationValues( out_mat3, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
        static makeTranslationValues ( out_mat3, x, y, z ) {
            out_mat3[_0_0_] = 1;
            out_mat3[_0_1_] = 0;
            out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = 0;
            out_mat3[_1_1_] = 1;
            out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = x;
            out_mat3[_2_1_] = y;
            out_mat3[_2_2_] = z;
            return out_mat3;
        }

        makeScale              (           in_vec3 ) { return mat3.makeScaleValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
        makeScaleValues        (           x, y, z ) { return mat3.makeScaleValues( this,     x,            y,            z ); }
        static makeScale       ( out_mat3, in_vec3 ) { return mat3.makeScaleValues( out_mat3, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
        static makeScaleValues ( out_mat3, x, y, z ) {
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;

            out_mat3[_0_0_] = x;
            out_mat3[_0_1_] = 0;
            out_mat3[_0_2_] = 0;
            out_mat3[_1_0_] = 0;
            out_mat3[_1_1_] = y;
            out_mat3[_1_2_] = 0;
            out_mat3[_2_0_] = 0;
            out_mat3[_2_1_] = 0;
            out_mat3[_2_2_] = z;
            return out_mat3;
        }
    }


    def.Properties( mat3, {
        _00 : 0, _01 : 1, _02 : 2,
        _10 : 3, _11 : 4, _12 : 5,
        _20 : 6, _21 : 7, _22 : 8
    });

    const CACHE_MAT3 = new mat3;

    return mat3;
});