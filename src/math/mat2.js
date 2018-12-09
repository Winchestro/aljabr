import def from "../utilities/PropertyDescriptors.js";

const _0_0_ = 0; const _0_1_ = 1;
const _1_0_ = 2; const _1_1_ = 3;

export default class mat2 extends Float32Array {
    constructor ( buffer, byteLength ) {
        if ( buffer instanceof ArrayBuffer ) super( buffer, byteLength, 4 );
        else super( 4 );
        
        mat2.makeIdentity( this );
    }
    
    set ( in_mat2 ) { return mat2.set( this, in_mat2 ); }
    static set ( out_mat2, in_mat2 ) {
        out_mat2[_0_0_] = in_mat2[_0_0_];
        out_mat2[_0_1_] = in_mat2[_0_1_];
        out_mat2[_1_0_] = in_mat2[_1_0_];
        out_mat2[_1_1_] = in_mat2[_1_1_];
        return outM2;
    }

    setValues ( _00,_01, _10,_11 ) { return mat2.setValues( this, _00,_01, _10,_11 ); }
    static setValues ( out_mat2, _00,_01, _10,_11 ) {
        out_mat2[_0_0_] = _00;
        out_mat2[_0_1_] = _01;
        out_mat2[_1_0_] = _10;
        out_mat2[_1_1_] = _11;
        return out_mat2;
    }

    transpose ( ) { return mat2.transpose( this ); }
    static transpose ( out_mat2, in_mat2 ) {
        if ( in_mat2 === undefined ) in_mat2 = mat2.set( CACHE_MAT2, out_mat2 );

        out_mat2[_0_0_] = in_mat2[_0_0_];
        out_mat2[_0_1_] = in_mat2[_1_0_];
        out_mat2[_1_0_] = in_mat2[_0_1_];
        out_mat2[_1_1_] = in_mat2[_1_1_];
        return out_mat2;
    }

    add ( in_mat2 ) { return mat2.add( this, in_mat2 ); }
    static add ( out_mat2, in_mat2_B, in_mat2_A ) {
        if ( in_mat2_A === undefined ) in_mat2_A = mat2.set( CACHE_MAT2, out_mat2 );

        out_mat2[_0_0_] = in_mat2_A[_0_0_] + in_mat2_B[_0_0_]; 
        out_mat2[_0_1_] = in_mat2_A[_0_1_] + in_mat2_B[_0_1_];
        out_mat2[_1_0_] = in_mat2_A[_1_0_] + in_mat2_B[_1_0_]; 
        out_mat2[_1_1_] = in_mat2_A[_1_1_] + in_mat2_B[_1_1_];
        return out_mat2;
    }

    multiply ( in_mat2_B, in_mat2_A ) { return mat2.multiply( this, in_mat2_B, in_mat2_A ); }
    static multiply ( out_mat2, in_mat2_B, in_mat2_A ) {
        if ( in_mat2_A === undefined ) in_mat2_A = mat.set(  CACHE_MAT2, out_mat2 );

        out_mat2[_0_0_] = in_mat2_A[_0_0_] * in_mat2_B[_0_0_] + in_mat2_A[_0_1_] * in_mat2_B[_1_0_];
        out_mat2[_0_1_] = in_mat2_A[_0_0_] * in_mat2_B[_0_1_] + in_mat2_A[_0_1_] * in_mat2_B[_1_1_];
        out_mat2[_1_0_] = in_mat2_A[_1_0_] * in_mat2_B[_0_0_] + in_mat2_A[_1_1_] * in_mat2_B[_1_0_];
        out_mat2[_1_1_] = in_mat2_A[_1_0_] * in_mat2_B[_0_1_] + in_mat2_A[_1_1_] * in_mat2_B[_1_1_];
        return out_mat2;
    }

    addScalar ( s, in_mat2 ) { return mat2.addScalar( this, s, in_mat2 ); }
    static addScalar ( out_mat2, s, in_mat2 ) {
        if ( in_mat2 === undefined ) in_mat2 = out_mat2;

        out_mat2[_0_0_] = in_mat2[_0_0_] + s;
        out_mat2[_0_1_] = in_mat2[_0_1_] + s;
        out_mat2[_1_0_] = in_mat2[_1_0_] + s; 
        out_mat2[_1_1_] = in_mat2[_1_1_] + s;
        return out_mat2;
    }

    multiplyScalar ( s, in_mat2 ) { return mat2.multiplyScalar( this, s, in_mat2 );}
    static multiplyScalar ( out_mat2, s, in_mat2 ) {
        if ( in_mat2 === undefined ) in_mat2 = out_mat2;

        out_mat2[_0_0_] = in_mat2[_0_0_] * s;
        out_mat2[_0_1_] = in_mat2[_0_1_] * s;
        out_mat2[_1_0_] = in_mat2[_1_0_] * s;
        out_mat2[_1_1_] = in_mat2[_1_1_] * s;
        return out_mat2;
    }

    makeIdentity ( ) { return mat2.makeIdentity( this ); }
    static makeIdentity ( out_mat2 ) {
        out_mat2[_0_0_] = 1;
        out_mat2[_0_1_] = 0;
        out_mat2[_1_0_] = 0;
        out_mat2[_1_1_] = 1;   
        return out_mat2;
    }
}
    
const CACHE_MAT2 = new mat2;