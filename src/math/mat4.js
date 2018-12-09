import def from "../utilities/PropertyDescriptors.js";

import mat3 from "../math/mat3.js";

import vec3 from "../math/vec3.js";
import vec4 from "../math/vec4.js";



const _0_0_ =  0; const _0_1_ =  1; const _0_2_ =  2; const _0_3_ = 3; 
const _1_0_ =  4; const _1_1_ =  5; const _1_2_ =  6; const _1_3_ = 7;
const _2_0_ =  8; const _2_1_ =  9; const _2_2_ = 10; const _2_3_ = 11;
const _3_0_ = 12; const _3_1_ = 13; const _3_2_ = 14; const _3_3_ = 15;
                  
const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const sqrt = Math.sqrt;
const abs = Math.abs;
const EPSILON = Number.EPSILON;
/*

    method conventions:
    methods never allocate any objects
    methods are always static per default, the class member methods are just calling their static counterparts
    methods prefer a values-suffixed implementation if reasonable
    methods working with arraylike complex datatypes, always treat their references as if they were arrays so they can be called on any generic arraylike

    create prefix : all methods allocating new objects have a create prefix
    make prefix : method turns entire matrix into a matrix of a certain kind, loosing any other information it may contain
    set prefix : method sets certain parts of a matrix, leaving other information it may contain intact
    values suffix : method expects complex data types to be spread out and expressed as scalars so they can be called without allocating a new object

    arguments conventions:
    static methods always expect their out-prefixed argument first
    in binary operator methods expect the order of operators reversed ( B, A ), omitting A defaults to "this" / "out" to be the A operator
    reference type arguments always have in or out prefix
    in prefix : reference is read only
    out prefix : reference is written to ( and may be read from )

    reference type arguments always qualify the data type they are interpreted as.
    value type arguments have no prefix
 */
export default class mat4 extends Float32Array {
    constructor ( buffer, byteOffset ) {
        if ( buffer instanceof ArrayBuffer ) super( buffer, byteOffset, 16 );
        else super( 16 );
        mat4.makeIdentity( this );
    }

    set        (           in_mat4 ) { return mat4.set( this, in_mat4 ); }
    static set ( out_mat4, in_mat4 ) {
        out_mat4[_0_0_] = in_mat4[_0_0_];
        out_mat4[_0_1_] = in_mat4[_0_1_];
        out_mat4[_0_2_] = in_mat4[_0_2_];
        out_mat4[_0_3_] = in_mat4[_0_3_];
        out_mat4[_1_0_] = in_mat4[_1_0_];
        out_mat4[_1_1_] = in_mat4[_1_1_];
        out_mat4[_1_2_] = in_mat4[_1_2_];
        out_mat4[_1_3_] = in_mat4[_1_3_];
        out_mat4[_2_0_] = in_mat4[_2_0_];
        out_mat4[_2_1_] = in_mat4[_2_1_];
        out_mat4[_2_2_] = in_mat4[_2_2_];
        out_mat4[_2_3_] = in_mat4[_2_3_];
        out_mat4[_3_0_] = in_mat4[_3_0_];
        out_mat4[_3_1_] = in_mat4[_3_1_];
        out_mat4[_3_2_] = in_mat4[_3_2_];
        out_mat4[_3_3_] = in_mat4[_3_3_];
        return out_mat4;
    }
    
    setValues        (            _00,_01,_02,_03,  _10,_11,_12,_13,  _20,_21,_22,_23,  _30,_31,_32,_33 ) { return mat4.setValues( this, _00,_01,_02,_03,  _10,_11,_12,_13,  _20,_21,_22,_23,  _30,_31,_32,_33 ); }
    static setValues ( out_mat4,  _00,_01,_02,_03,  _10,_11,_12,_13,  _20,_21,_22,_23,  _30,_31,_32,_33 ) {
        out_mat4[_0_0_] = _00;
        out_mat4[_0_1_] = _01;
        out_mat4[_0_2_] = _02;
        out_mat4[_0_3_] = _03;
        out_mat4[_1_0_] = _10;
        out_mat4[_1_1_] = _11;
        out_mat4[_1_2_] = _12;
        out_mat4[_1_3_] = _13;
        out_mat4[_2_0_] = _20;
        out_mat4[_2_1_] = _21;
        out_mat4[_2_2_] = _22;
        out_mat4[_2_3_] = _23;
        out_mat4[_3_0_] = _30;
        out_mat4[_3_1_] = _31;
        out_mat4[_3_2_] = _32;
        out_mat4[_3_3_] = _33;
        return out_mat4;
    }

    transpose        (           in_mat4 ) { return mat4.transpose( this, in_mat4 ); }
    static transpose ( out_mat4, in_mat4 ) {
        if ( in_mat4 === undefined ) in_mat4 = out_mat4;
        out_mat4[_0_0_] = in_mat4[_0_0_];
        out_mat4[_0_1_] = in_mat4[_1_0_];
        out_mat4[_0_2_] = in_mat4[_2_0_];
        out_mat4[_0_3_] = in_mat4[_3_0_];
        out_mat4[_1_0_] = in_mat4[_0_1_];
        out_mat4[_1_1_] = in_mat4[_1_1_];
        out_mat4[_1_2_] = in_mat4[_2_1_];
        out_mat4[_1_3_] = in_mat4[_3_1_];
        out_mat4[_2_0_] = in_mat4[_0_2_];
        out_mat4[_2_1_] = in_mat4[_1_2_];
        out_mat4[_2_2_] = in_mat4[_2_2_];
        out_mat4[_2_3_] = in_mat4[_3_2_];
        out_mat4[_3_0_] = in_mat4[_0_3_];
        out_mat4[_3_1_] = in_mat4[_1_3_];
        out_mat4[_3_2_] = in_mat4[_2_3_];
        out_mat4[_3_3_] = in_mat4[_3_3_];
        return out_mat4;
    }

    invert        (           in_mat4 ) { return mat4.invert( this, in_mat4 ); }
    static invert ( out_mat4, in_mat4 ) {
        if ( out_mat4 === undefined ) in_mat4 = mat4.transpose( CACHE_MAT4, out_mat4 );
        else                          in_mat4 = mat4.transpose( CACHE_MAT4, in_mat4 );
        
        out_mat4[_0_0_] = in_mat4[_1_2_] * in_mat4[_2_3_] * in_mat4[_3_1_]
                        - in_mat4[_1_3_] * in_mat4[_2_2_] * in_mat4[_3_1_]
                        + in_mat4[_1_3_] * in_mat4[_2_1_] * in_mat4[_3_2_]
                        - in_mat4[_1_1_] * in_mat4[_2_3_] * in_mat4[_3_2_]
                        - in_mat4[_1_2_] * in_mat4[_2_1_] * in_mat4[_3_3_]
                        + in_mat4[_1_1_] * in_mat4[_2_2_] * in_mat4[_3_3_];

        out_mat4[_1_0_] = in_mat4[_0_3_] * in_mat4[_2_2_] * in_mat4[_3_1_]
                        - in_mat4[_0_2_] * in_mat4[_2_3_] * in_mat4[_3_1_]
                        - in_mat4[_0_3_] * in_mat4[_2_1_] * in_mat4[_3_2_]
                        + in_mat4[_0_1_] * in_mat4[_2_3_] * in_mat4[_3_2_]
                        + in_mat4[_0_2_] * in_mat4[_2_1_] * in_mat4[_3_3_]
                        - in_mat4[_0_1_] * in_mat4[_2_2_] * in_mat4[_3_3_];

        out_mat4[_2_0_] = in_mat4[_0_2_] * in_mat4[_1_3_] * in_mat4[_3_1_]
                        - in_mat4[_0_3_] * in_mat4[_1_2_] * in_mat4[_3_1_]
                        + in_mat4[_0_3_] * in_mat4[_1_1_] * in_mat4[_3_2_]
                        - in_mat4[_0_1_] * in_mat4[_1_3_] * in_mat4[_3_2_]
                        - in_mat4[_0_2_] * in_mat4[_1_1_] * in_mat4[_3_3_]
                        + in_mat4[_0_1_] * in_mat4[_1_2_] * in_mat4[_3_3_];

        out_mat4[_3_0_] = in_mat4[_0_3_] * in_mat4[_1_2_] * in_mat4[_2_1_]
                        - in_mat4[_0_2_] * in_mat4[_1_3_] * in_mat4[_2_1_]
                        - in_mat4[_0_3_] * in_mat4[_1_1_] * in_mat4[_2_2_]
                        + in_mat4[_0_1_] * in_mat4[_1_3_] * in_mat4[_2_2_]
                        + in_mat4[_0_2_] * in_mat4[_1_1_] * in_mat4[_2_3_]
                        - in_mat4[_0_1_] * in_mat4[_1_2_] * in_mat4[_2_3_];

        out_mat4[_0_1_] = in_mat4[_1_3_] * in_mat4[_2_2_] * in_mat4[_3_0_]
                        - in_mat4[_1_2_] * in_mat4[_2_3_] * in_mat4[_3_0_]
                        - in_mat4[_1_3_] * in_mat4[_2_0_] * in_mat4[_3_2_]
                        + in_mat4[_1_0_] * in_mat4[_2_3_] * in_mat4[_3_2_]
                        + in_mat4[_1_2_] * in_mat4[_2_0_] * in_mat4[_3_3_]
                        - in_mat4[_1_0_] * in_mat4[_2_2_] * in_mat4[_3_3_];

        out_mat4[_1_1_] = in_mat4[_0_2_] * in_mat4[_2_3_] * in_mat4[_3_0_]
                        - in_mat4[_0_3_] * in_mat4[_2_2_] * in_mat4[_3_0_]
                        + in_mat4[_0_3_] * in_mat4[_2_0_] * in_mat4[_3_2_]
                        - in_mat4[_0_0_] * in_mat4[_2_3_] * in_mat4[_3_2_]
                        - in_mat4[_0_2_] * in_mat4[_2_0_] * in_mat4[_3_3_]
                        + in_mat4[_0_0_] * in_mat4[_2_2_] * in_mat4[_3_3_];

        out_mat4[_2_1_] = in_mat4[_0_3_] * in_mat4[_1_2_] * in_mat4[_3_0_]
                        - in_mat4[_0_2_] * in_mat4[_1_3_] * in_mat4[_3_0_]
                        - in_mat4[_0_3_] * in_mat4[_1_0_] * in_mat4[_3_2_]
                        + in_mat4[_0_0_] * in_mat4[_1_3_] * in_mat4[_3_2_]
                        + in_mat4[_0_2_] * in_mat4[_1_0_] * in_mat4[_3_3_]
                        - in_mat4[_0_0_] * in_mat4[_1_2_] * in_mat4[_3_3_];

        out_mat4[_3_1_] = in_mat4[_0_2_] * in_mat4[_1_3_] * in_mat4[_2_0_]
                        - in_mat4[_0_3_] * in_mat4[_1_2_] * in_mat4[_2_0_]
                        + in_mat4[_0_3_] * in_mat4[_1_0_] * in_mat4[_2_2_]
                        - in_mat4[_0_0_] * in_mat4[_1_3_] * in_mat4[_2_2_]
                        - in_mat4[_0_2_] * in_mat4[_1_0_] * in_mat4[_2_3_]
                        + in_mat4[_0_0_] * in_mat4[_1_2_] * in_mat4[_2_3_];

        out_mat4[_0_2_] = in_mat4[_1_1_] * in_mat4[_2_3_] * in_mat4[_3_0_]
                        - in_mat4[_1_3_] * in_mat4[_2_1_] * in_mat4[_3_0_]
                        + in_mat4[_1_3_] * in_mat4[_2_0_] * in_mat4[_3_1_]
                        - in_mat4[_1_0_] * in_mat4[_2_3_] * in_mat4[_3_1_]
                        - in_mat4[_1_1_] * in_mat4[_2_0_] * in_mat4[_3_3_]
                        + in_mat4[_1_0_] * in_mat4[_2_1_] * in_mat4[_3_3_];

        out_mat4[_1_2_] = in_mat4[_0_3_] * in_mat4[_2_1_] * in_mat4[_3_0_]
                        - in_mat4[_0_1_] * in_mat4[_2_3_] * in_mat4[_3_0_]
                        - in_mat4[_0_3_] * in_mat4[_2_0_] * in_mat4[_3_1_]
                        + in_mat4[_0_0_] * in_mat4[_2_3_] * in_mat4[_3_1_]
                        + in_mat4[_0_1_] * in_mat4[_2_0_] * in_mat4[_3_3_]
                        - in_mat4[_0_0_] * in_mat4[_2_1_] * in_mat4[_3_3_];

        out_mat4[_2_2_] = in_mat4[_0_1_] * in_mat4[_1_3_] * in_mat4[_3_0_]
                        - in_mat4[_0_3_] * in_mat4[_1_1_] * in_mat4[_3_0_]
                        + in_mat4[_0_3_] * in_mat4[_1_0_] * in_mat4[_3_1_]
                        - in_mat4[_0_0_] * in_mat4[_1_3_] * in_mat4[_3_1_]
                        - in_mat4[_0_1_] * in_mat4[_1_0_] * in_mat4[_3_3_]
                        + in_mat4[_0_0_] * in_mat4[_1_1_] * in_mat4[_3_3_];

        out_mat4[_3_2_] = in_mat4[_0_3_] * in_mat4[_1_1_] * in_mat4[_2_0_]
                        - in_mat4[_0_1_] * in_mat4[_1_3_] * in_mat4[_2_0_]
                        - in_mat4[_0_3_] * in_mat4[_1_0_] * in_mat4[_2_1_]
                        + in_mat4[_0_0_] * in_mat4[_1_3_] * in_mat4[_2_1_]
                        + in_mat4[_0_1_] * in_mat4[_1_0_] * in_mat4[_2_3_]
                        - in_mat4[_0_0_] * in_mat4[_1_1_] * in_mat4[_2_3_];

        out_mat4[_0_3_] = in_mat4[_1_2_] * in_mat4[_2_1_] * in_mat4[_3_0_]
                        - in_mat4[_1_1_] * in_mat4[_2_2_] * in_mat4[_3_0_]
                        - in_mat4[_1_2_] * in_mat4[_2_0_] * in_mat4[_3_1_]
                        + in_mat4[_1_0_] * in_mat4[_2_2_] * in_mat4[_3_1_]
                        + in_mat4[_1_1_] * in_mat4[_2_0_] * in_mat4[_3_2_]
                        - in_mat4[_1_0_] * in_mat4[_2_1_] * in_mat4[_3_2_];

        out_mat4[_1_3_] = in_mat4[_0_1_] * in_mat4[_2_2_] * in_mat4[_3_0_]
                        - in_mat4[_0_2_] * in_mat4[_2_1_] * in_mat4[_3_0_]
                        + in_mat4[_0_2_] * in_mat4[_2_0_] * in_mat4[_3_1_]
                        - in_mat4[_0_0_] * in_mat4[_2_2_] * in_mat4[_3_1_]
                        - in_mat4[_0_1_] * in_mat4[_2_0_] * in_mat4[_3_2_]
                        + in_mat4[_0_0_] * in_mat4[_2_1_] * in_mat4[_3_2_];

        out_mat4[_2_3_] = in_mat4[_0_2_] * in_mat4[_1_1_] * in_mat4[_3_0_]
                        - in_mat4[_0_1_] * in_mat4[_1_2_] * in_mat4[_3_0_]
                        - in_mat4[_0_2_] * in_mat4[_1_0_] * in_mat4[_3_1_]
                        + in_mat4[_0_0_] * in_mat4[_1_2_] * in_mat4[_3_1_]
                        + in_mat4[_0_1_] * in_mat4[_1_0_] * in_mat4[_3_2_]
                        - in_mat4[_0_0_] * in_mat4[_1_1_] * in_mat4[_3_2_];

        out_mat4[_3_3_] = in_mat4[_0_1_] * in_mat4[_1_2_] * in_mat4[_2_0_]
                        - in_mat4[_0_2_] * in_mat4[_1_1_] * in_mat4[_2_0_]
                        + in_mat4[_0_2_] * in_mat4[_1_0_] * in_mat4[_2_1_]
                        - in_mat4[_0_0_] * in_mat4[_1_2_] * in_mat4[_2_1_]
                        - in_mat4[_0_1_] * in_mat4[_1_0_] * in_mat4[_2_2_]
                        + in_mat4[_0_0_] * in_mat4[_1_1_] * in_mat4[_2_2_];
          
        let determinant = in_mat4[_0_0_] * out_mat4[_0_0_]
                        + in_mat4[_1_0_] * out_mat4[_1_0_]
                        + in_mat4[_2_0_] * out_mat4[_2_0_]
                        + in_mat4[_3_0_] * out_mat4[_3_0_];
        
        if( abs( determinant ) < EPSILON ) return mat4.makeIdentity( out_mat4 );
        else return mat4.multiplyScalar( out_mat4, 1 / determinant );
    }

    add        (           in_mat4_B, in_mat4_A ) { return mat4.add( this, inM4A, inM4B ); }
    static add ( out_mat4, in_mat4_B, in_mat4_A ) {
        if ( in_mat4_A === undefined ) in_mat4_A = mat4.set( CACHE_MAT4, out_mat4 );

        out_mat4[_0_0_] = in_mat4_A[_0_0_] + in_mat4_B[_0_0_];
        out_mat4[_0_1_] = in_mat4_A[_0_1_] + in_mat4_B[_0_1_];
        out_mat4[_0_2_] = in_mat4_A[_0_2_] + in_mat4_B[_0_2_];
        out_mat4[_0_3_] = in_mat4_A[_0_3_] + in_mat4_B[_0_3_];
        out_mat4[_1_0_] = in_mat4_A[_1_0_] + in_mat4_B[_1_0_];
        out_mat4[_1_1_] = in_mat4_A[_1_1_] + in_mat4_B[_1_1_];
        out_mat4[_1_2_] = in_mat4_A[_1_2_] + in_mat4_B[_1_2_];
        out_mat4[_1_3_] = in_mat4_A[_1_3_] + in_mat4_B[_1_3_];
        out_mat4[_2_0_] = in_mat4_A[_2_0_] + in_mat4_B[_2_0_];
        out_mat4[_2_1_] = in_mat4_A[_2_1_] + in_mat4_B[_2_1_];
        out_mat4[_2_2_] = in_mat4_A[_2_2_] + in_mat4_B[_2_2_];
        out_mat4[_2_3_] = in_mat4_A[_2_3_] + in_mat4_B[_2_3_];
        out_mat4[_3_0_] = in_mat4_A[_3_0_] + in_mat4_B[_3_0_];
        out_mat4[_3_1_] = in_mat4_A[_3_1_] + in_mat4_B[_3_1_];
        out_mat4[_3_2_] = in_mat4_A[_3_2_] + in_mat4_B[_3_2_];
        out_mat4[_3_3_] = in_mat4_A[_3_3_] + in_mat4_B[_3_3_];
        return out_mat4;
    }

    multiply        (           in_mat4_B, in_mat4_A ) { return mat4.multiply( this, in_mat4_B, in_mat4_A ); }
    static multiply ( out_mat4, in_mat4_B, in_mat4_A ) {
        if ( in_mat4_A === undefined ) in_mat4_A = mat4.set( CACHE_MAT4, out_mat4 );

        out_mat4[_0_0_] = in_mat4_A[_0_0_] * in_mat4_B[_0_0_]
                        + in_mat4_A[_0_1_] * in_mat4_B[_1_0_]
                        + in_mat4_A[_0_2_] * in_mat4_B[_2_0_]
                        + in_mat4_A[_0_3_] * in_mat4_B[_3_0_];
        out_mat4[_0_1_] = in_mat4_A[_0_0_] * in_mat4_B[_0_1_]
                        + in_mat4_A[_0_1_] * in_mat4_B[_1_1_]
                        + in_mat4_A[_0_2_] * in_mat4_B[_2_1_]
                        + in_mat4_A[_0_3_] * in_mat4_B[_3_1_];
        out_mat4[_0_2_] = in_mat4_A[_0_0_] * in_mat4_B[_0_2_]
                        + in_mat4_A[_0_1_] * in_mat4_B[_1_2_]
                        + in_mat4_A[_0_2_] * in_mat4_B[_2_2_]
                        + in_mat4_A[_0_3_] * in_mat4_B[_3_2_];
        out_mat4[_0_3_] = in_mat4_A[_0_0_] * in_mat4_B[_0_3_]
                        + in_mat4_A[_0_1_] * in_mat4_B[_1_3_]
                        + in_mat4_A[_0_2_] * in_mat4_B[_2_3_]
                        + in_mat4_A[_0_3_] * in_mat4_B[_3_3_];
        out_mat4[_1_0_] = in_mat4_A[_1_0_] * in_mat4_B[_0_0_]
                        + in_mat4_A[_1_1_] * in_mat4_B[_1_0_]
                        + in_mat4_A[_1_2_] * in_mat4_B[_2_0_]
                        + in_mat4_A[_1_3_] * in_mat4_B[_3_0_];
        out_mat4[_1_1_] = in_mat4_A[_1_0_] * in_mat4_B[_0_1_]
                        + in_mat4_A[_1_1_] * in_mat4_B[_1_1_]
                        + in_mat4_A[_1_2_] * in_mat4_B[_2_1_]
                        + in_mat4_A[_1_3_] * in_mat4_B[_3_1_];
        out_mat4[_1_2_] = in_mat4_A[_1_0_] * in_mat4_B[_0_2_]
                        + in_mat4_A[_1_1_] * in_mat4_B[_1_2_]
                        + in_mat4_A[_1_2_] * in_mat4_B[_2_2_]
                        + in_mat4_A[_1_3_] * in_mat4_B[_3_2_];
        out_mat4[_1_3_] = in_mat4_A[_1_0_] * in_mat4_B[_0_3_]
                        + in_mat4_A[_1_1_] * in_mat4_B[_1_3_]
                        + in_mat4_A[_1_2_] * in_mat4_B[_2_3_]
                        + in_mat4_A[_1_3_] * in_mat4_B[_3_3_];
        out_mat4[_2_0_] = in_mat4_A[_2_0_] * in_mat4_B[_0_0_]
                        + in_mat4_A[_2_1_] * in_mat4_B[_1_0_]
                        + in_mat4_A[_2_2_] * in_mat4_B[_2_0_]
                        + in_mat4_A[_2_3_] * in_mat4_B[_3_0_];
        out_mat4[_2_1_] = in_mat4_A[_2_0_] * in_mat4_B[_0_1_]
                        + in_mat4_A[_2_1_] * in_mat4_B[_1_1_]
                        + in_mat4_A[_2_2_] * in_mat4_B[_2_1_]
                        + in_mat4_A[_2_3_] * in_mat4_B[_3_1_];
        out_mat4[_2_2_] = in_mat4_A[_2_0_] * in_mat4_B[_0_2_]
                        + in_mat4_A[_2_1_] * in_mat4_B[_1_2_]
                        + in_mat4_A[_2_2_] * in_mat4_B[_2_2_]
                        + in_mat4_A[_2_3_] * in_mat4_B[_3_2_];
        out_mat4[_2_3_] = in_mat4_A[_2_0_] * in_mat4_B[_0_3_]
                        + in_mat4_A[_2_1_] * in_mat4_B[_1_3_]
                        + in_mat4_A[_2_2_] * in_mat4_B[_2_3_]
                        + in_mat4_A[_2_3_] * in_mat4_B[_3_3_];
        out_mat4[_3_0_] = in_mat4_A[_3_0_] * in_mat4_B[_0_0_]
                        + in_mat4_A[_3_1_] * in_mat4_B[_1_0_]
                        + in_mat4_A[_3_2_] * in_mat4_B[_2_0_]
                        + in_mat4_A[_3_3_] * in_mat4_B[_3_0_];
        out_mat4[_3_1_] = in_mat4_A[_3_0_] * in_mat4_B[_0_1_]
                        + in_mat4_A[_3_1_] * in_mat4_B[_1_1_]
                        + in_mat4_A[_3_2_] * in_mat4_B[_2_1_]
                        + in_mat4_A[_3_3_] * in_mat4_B[_3_1_];
        out_mat4[_3_2_] = in_mat4_A[_3_0_] * in_mat4_B[_0_2_]
                        + in_mat4_A[_3_1_] * in_mat4_B[_1_2_]
                        + in_mat4_A[_3_2_] * in_mat4_B[_2_2_]
                        + in_mat4_A[_3_3_] * in_mat4_B[_3_2_];
        out_mat4[_3_3_] = in_mat4_A[_3_0_] * in_mat4_B[_0_3_]
                        + in_mat4_A[_3_1_] * in_mat4_B[_1_3_]
                        + in_mat4_A[_3_2_] * in_mat4_B[_2_3_]
                        + in_mat4_A[_3_3_] * in_mat4_B[_3_3_];

        return out_mat4;
    }

    addScalar        (           s ) { return mat4.addScalar( this, s ); }
    static addScalar ( out_mat4, s ) {
        out_mat4[_0_0_] += s;
        out_mat4[_0_1_] += s;
        out_mat4[_0_2_] += s;
        out_mat4[_0_3_] += s;
        out_mat4[_1_0_] += s;
        out_mat4[_1_1_] += s;
        out_mat4[_1_2_] += s;
        out_mat4[_1_3_] += s;
        out_mat4[_2_0_] += s;
        out_mat4[_2_1_] += s;
        out_mat4[_2_2_] += s;
        out_mat4[_2_3_] += s;
        out_mat4[_3_0_] += s;
        out_mat4[_3_1_] += s;
        out_mat4[_3_2_] += s;
        out_mat4[_3_3_] += s;
        return out_mat4;
    }

    multiplyScalar        (           s ) { return mat4.multiplyScalar( this, s ); }
    static multiplyScalar ( out_mat4, s ) {
        out_mat4[_0_0_] *= s;
        out_mat4[_0_1_] *= s;
        out_mat4[_0_2_] *= s;
        out_mat4[_0_3_] *= s;
        out_mat4[_1_0_] *= s;
        out_mat4[_1_1_] *= s;
        out_mat4[_1_2_] *= s;
        out_mat4[_1_3_] *= s;
        out_mat4[_2_0_] *= s;
        out_mat4[_2_1_] *= s;
        out_mat4[_2_2_] *= s;
        out_mat4[_2_3_] *= s;
        out_mat4[_3_0_] *= s;
        out_mat4[_3_1_] *= s;
        out_mat4[_3_2_] *= s;
        out_mat4[_3_3_] *= s;
        return out_mat4;
    }

    determinant        (         ) { return mat4.determinant( this ); }
    static determinant ( in_mat4 ) {
        let a1  = in_mat4[_0_0_] * in_mat4[_1_1_] - in_mat4[_0_1_] * in_mat4[_1_0_];
        let a2  = in_mat4[_0_0_] * in_mat4[_1_2_] - in_mat4[_0_2_] * in_mat4[_1_0_];
        let a3  = in_mat4[_0_0_] * in_mat4[_1_3_] - in_mat4[_0_3_] * in_mat4[_1_0_];
        let a4  = in_mat4[_0_1_] * in_mat4[_1_2_] - in_mat4[_0_2_] * in_mat4[_1_1_];
        let a5  = in_mat4[_0_1_] * in_mat4[_1_3_] - in_mat4[_0_3_] * in_mat4[_1_1_];
        let a6  = in_mat4[_0_2_] * in_mat4[_1_3_] - in_mat4[_0_3_] * in_mat4[_1_2_];
        let b1  = in_mat4[_2_2_] * in_mat4[_3_3_] - in_mat4[_2_3_] * in_mat4[_3_2_];
        let b2  = in_mat4[_2_1_] * in_mat4[_3_3_] - in_mat4[_2_3_] * in_mat4[_3_1_];
        let b3  = in_mat4[_2_1_] + in_mat4[_3_2_] - in_mat4[_2_2_] + in_mat4[_3_1_];
        let b4  = in_mat4[_2_0_] + in_mat4[_3_3_] - in_mat4[_2_3_] + in_mat4[_3_0_];
        let b5  = in_mat4[_2_0_] + in_mat4[_3_2_] - in_mat4[_2_2_] + in_mat4[_3_0_];
        let b6  = in_mat4[_2_0_] + in_mat4[_3_1_] - in_mat4[_2_1_] + in_mat4[_3_0_];
        return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
    }
    
    translate              (           in_vec3, in_mat4 ) { return mat4.translateValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    translateValues        (           x, y, z, in_mat4 ) { return mat4.translateValues( this,     x,            y,            z,            in_mat4 ); }
    static translate       ( out_mat4, in_vec3, in_mat4 ) { return mat4.translateValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    static translateValues ( out_mat4, x, y, z, in_mat4 ) {
        if ( in_mat4 === undefined ) in_mat4 = mat4.set( CACHE_MAT4, out_mat4 );

        out_mat4[_3_0_] = in_mat4[_0_0_] * x + in_mat4[_1_0_] * y + in_mat4[_2_0_] * z + in_mat4[_3_0_];
        out_mat4[_3_1_] = in_mat4[_0_1_] * x + in_mat4[_1_1_] * y + in_mat4[_2_1_] * z + in_mat4[_3_1_];
        out_mat4[_3_2_] = in_mat4[_0_2_] * x + in_mat4[_1_2_] * y + in_mat4[_2_2_] * z + in_mat4[_3_2_];
        out_mat4[_3_3_] = in_mat4[_0_3_] * x + in_mat4[_1_3_] * y + in_mat4[_2_3_] * z + in_mat4[_3_3_];

        return out_mat4;
    }

    scale              (           in_vec3, in_mat4 ) { return mat4.scaleValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    scaleValues        (           x, y, z, in_mat4 ) { return mat4.scaleValues( this,     x,            y,            z,            in_mat4 ); }
    static scale       ( out_mat4, in_vec3, in_mat4 ) { return mat4.scaleValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    static scaleValues ( out_mat4, x, y, z, in_mat4 ) {
        if ( y === undefined ) y = x;
        if ( z === undefined ) z = x;
        if ( in_mat4 === undefined ) in_mat4 = out_mat4;
        
        out_mat4[_0_0_] = in_mat4[_0_0_] * x;
        out_mat4[_0_1_] = in_mat4[_0_1_] * x;
        out_mat4[_0_2_] = in_mat4[_0_2_] * x;
        out_mat4[_0_3_] = in_mat4[_0_3_] * x;
        out_mat4[_1_0_] = in_mat4[_1_0_] * y;
        out_mat4[_1_1_] = in_mat4[_1_1_] * y;
        out_mat4[_1_2_] = in_mat4[_1_2_] * y;
        out_mat4[_1_3_] = in_mat4[_1_3_] * y;
        out_mat4[_2_0_] = in_mat4[_2_0_] * z;
        out_mat4[_2_1_] = in_mat4[_2_1_] * z;
        out_mat4[_2_2_] = in_mat4[_2_2_] * z;
        out_mat4[_2_3_] = in_mat4[_2_3_] * z;
        return out_mat4;
    }

    rotate              (           rad, in_vec3, in_mat4 ) { return mat4.rotateValues( this,     rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    rotateValues        (           rad, x, y, z, in_mat4 ) { return mat4.rotateValues( this,     rad, x,            y,            z,            in_mat4 ); }
    static rotate       ( out_mat4, rad, in_vec3, in_mat4 ) { return mat4.rotateValues( out_mat4, rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_], in_mat4 ); }
    static rotateValues ( out_mat4, rad, x, y, z, in_mat4 ) {
        if ( in_mat4 === undefined ) in_mat4 = mat4.set( CACHE_MAT4, out_mat4 );

        let length = sqrt( x * x + y * y + z * z );
        
        if ( abs( length ) < EPSILON ) return mat4.makeIdentity( out_mat4 );

        let s = sin( rad );
        let c = cos( rad );
        let t = 1 - c;

        length = 1 / length;
        x *= length;
        y *= length;
        z *= length;
        

        let r00 = x * x * t + c;     let r01 = x * y * t + z * s; let r02 = x * z * t - y * s;
        let r10 = y * x * t - z * s; let r11 = y * y * t + c;     let r12 = y * z * t + x * s;
        let r20 = z * x * t + y * s; let r21 = z * y * t - x * s; let r22 = z * z * t + c;

        
        
        out_mat4[_0_0_] = r00 * in_mat4[_0_0_] + r01 * in_mat4[_1_0_] + r02 * in_mat4[_2_0_];
        out_mat4[_0_1_] = r00 * in_mat4[_0_1_] + r01 * in_mat4[_1_1_] + r02 * in_mat4[_2_1_];
        out_mat4[_0_2_] = r00 * in_mat4[_0_2_] + r01 * in_mat4[_1_2_] + r02 * in_mat4[_2_2_];
        out_mat4[_0_3_] = r00 * in_mat4[_0_3_] + r01 * in_mat4[_1_3_] + r02 * in_mat4[_2_3_];
        out_mat4[_1_0_] = r10 * in_mat4[_0_0_] + r11 * in_mat4[_1_0_] + r12 * in_mat4[_2_0_];
        out_mat4[_1_1_] = r10 * in_mat4[_0_1_] + r11 * in_mat4[_1_1_] + r12 * in_mat4[_2_1_];
        out_mat4[_1_2_] = r10 * in_mat4[_0_2_] + r11 * in_mat4[_1_2_] + r12 * in_mat4[_2_2_];
        out_mat4[_1_3_] = r10 * in_mat4[_0_3_] + r11 * in_mat4[_1_3_] + r12 * in_mat4[_2_3_];
        out_mat4[_2_0_] = r20 * in_mat4[_0_0_] + r21 * in_mat4[_1_0_] + r22 * in_mat4[_2_0_];
        out_mat4[_2_1_] = r20 * in_mat4[_0_1_] + r21 * in_mat4[_1_1_] + r22 * in_mat4[_2_1_];
        out_mat4[_2_2_] = r20 * in_mat4[_0_2_] + r21 * in_mat4[_1_2_] + r22 * in_mat4[_2_2_];
        out_mat4[_2_3_] = r20 * in_mat4[_0_3_] + r21 * in_mat4[_1_3_] + r22 * in_mat4[_2_3_];
        return out_mat4;
    }

    rotateX        (           rad ) { return mat4.rotateX( this, rad ); }
    static rotateX ( out_mat4, rad ) {
        let c = cos( rad );
        let s = sin( rad );
        
        let v1 = CACHE_VEC4_A.setValues( out_mat4[_1_0_], out_mat4[_1_1_], out_mat4[_1_2_], out_mat4[_1_3_] );
        let v2 = CACHE_VEC4_B.setValues( out_mat4[_2_0_], out_mat4[_2_1_], out_mat4[_2_2_], out_mat4[_2_3_] );

        out_mat4[_1_0_] = v1[_x_] * c + v2[_x_] * s;
        out_mat4[_1_1_] = v1[_y_] * c + v2[_y_] * s;
        out_mat4[_1_2_] = v1[_z_] * c + v2[_z_] * s;
        out_mat4[_1_3_] = v1[_w_] * c + v2[_w_] * s;
        out_mat4[_2_0_] = v2[_x_] * c - v1[_x_] * s;
        out_mat4[_2_1_] = v2[_y_] * c - v1[_y_] * s;
        out_mat4[_2_2_] = v2[_z_] * c - v1[_z_] * s;
        out_mat4[_2_3_] = v2[_w_] * c - v1[_w_] * s;
        return out_mat4;
    }

    rotateY        (           rad ) { return mat4.rotateY( this, rad ); }
    static rotateY ( out_mat4, rad ) {
        let c = cos( rad );
        let s = sin( rad );
        
        let v0 = CACHE_VEC4_A.setValues( out_mat4[_0_0_], out_mat4[_0_1_], out_mat4[_0_2_], out_mat4[_0_3_] );
        let v2 = CACHE_VEC4_B.setValues( out_mat4[_2_0_], out_mat4[_2_1_], out_mat4[_2_2_], out_mat4[_2_3_] );

        out_mat4[_2_0_] = v2[_x_] * c + v0[_x_] * s;
        out_mat4[_2_1_] = v2[_y_] * c + v0[_y_] * s;
        out_mat4[_2_2_] = v2[_z_] * c + v0[_z_] * s;
        out_mat4[_2_3_] = v2[_w_] * c + v0[_w_] * s;
        out_mat4[_0_0_] = v0[_x_] * c - v2[_x_] * s;
        out_mat4[_0_1_] = v0[_y_] * c - v2[_y_] * s;
        out_mat4[_0_2_] = v0[_z_] * c - v2[_z_] * s;
        out_mat4[_0_3_] = v0[_w_] * c - v2[_w_] * s;
        return out_mat4;
    }

    rotateZ        (           rad ) { return mat4.rotateZ( this, rad ); }
    static rotateZ ( out_mat4, rad ) {
        let c = cos( rad );
        let s = sin( rad );
        
        let v0 = vec4.setValues( CACHE_VEC4_A, out_mat4[_0_0_], out_mat4[_0_1_], out_mat4[_0_2_], out_mat4[_0_3_] );
        let v1 = vec4.setValues( CACHE_VEC4_B, out_mat4[_1_0_], out_mat4[_1_1_], out_mat4[_1_2_], out_mat4[_1_3_] );

        out_mat4[_0_0_] = v0[_x_] * c + v1[_x_] * s;
        out_mat4[_0_1_] = v0[_y_] * c + v1[_y_] * s;
        out_mat4[_0_2_] = v0[_z_] * c + v1[_z_] * s;
        out_mat4[_0_3_] = v0[_w_] * c + v1[_w_] * s;
        out_mat4[_1_0_] = v1[_x_] * c - v0[_x_] * s;
        out_mat4[_1_1_] = v1[_y_] * c - v0[_y_] * s;
        out_mat4[_1_2_] = v1[_z_] * c - v0[_z_] * s;
        out_mat4[_1_3_] = v1[_w_] * c - v0[_w_] * s;
        return out_mat4;
    }

    rotateQuat4        (           in_quat ) { return mat4.rotateQuat4( this, in_quat ); }
    static rotateQuat4 ( out_mat4, in_quat ) {
        let two = vec4.multiplyScalar( vec4.set( CACHE_VEC4, in_quat ), 2 );
        
        let xx = in_quat[_x_] * two[_x_], xy = in_quat[_x_] * two[_y_], xz = in_quat[_x_] * two[_z_];
        let yy = in_quat[_y_] * two[_y_], yz = in_quat[_y_] * two[_z_], zz = in_quat[_z_] * two[_z_];
        let wx = in_quat[_w_] * two[_x_], wy = in_quat[_w_] * two[_y_], wz = in_quat[_w_] * two[_z_];

        out_mat4[_0_0_] = 1 - (yy + zz);
        out_mat4[_0_1_] = xy + wz;
        out_mat4[_0_2_] = xz - wy;
        out_mat4[_1_0_] = xy - wz;
        out_mat4[_1_1_] = 1 - (xx + zz);
        out_mat4[_1_2_] = yz + wx;
        out_mat4[_2_0_] = xz + wy;
        out_mat4[_2_1_] = yz-wx;
        out_mat4[_2_2_] = 1 - (xx + yy);

        return out_mat4;
    }

    setTranslation              (           in_vec3 ) { return mat4.setTranslationValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    setTranslationValues        (           x, y, z ) { return mat4.setTranslationValues( this,     x,            y,            z            ); }
    static setTranslation       ( out_mat4, in_vec3 ) { return mat4.setTranslationValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static setTranslationValues ( out_mat4, x, y, z ) {
        out_mat4[_3_0_] = x;
        out_mat4[_3_1_] = y;
        out_mat4[_3_2_] = z;
        return out_mat4;
    }

    setRotation              (           rad, in_vec3 ) { return mat4.setRotationValues( this,     rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    setRotationValues        (           rad, x, y, z ) { return mat4.setRotationValues( this,     rad, x,            y,            z            ); }
    static setRotation       ( out_mat4, rad, in_vec3 ) { return mat4.setRotationValues( out_mat4, rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static setRotationValues ( out_mat4, rad, x, y, z ) {
        let s = sin( rad );
        let c = cos( rad );
        let t = 1 - c;
        let length = sqrt( x * x + y * y + z * z );

        if ( length < EPSILON ) return mat4.makeIdentity( out_mat4 );

        length = 1 / length;
        x *= length;
        y *= length;
        z *= length;

        
        let r00 = x * x * t + c;     let r01 = x * y * t + z * s; let r02 = x * z * t - y * s;
        let r10 = y * x * t - z * s; let r11 = y * y * t + c;     let r12 = y * z * t + x * s;
        let r20 = z * x * t + y * s; let r21 = z * y * t - x * s; let r22 = z * z * t + c;
        
        
        out_mat4[_0_0_] = r00; out_mat4[_0_1_] = r01; out_mat4[_0_2_] = r02;
        out_mat4[_1_0_] = r10; out_mat4[_1_1_] = r11; out_mat4[_1_2_] = r12;
        out_mat4[_2_0_] = r20; out_mat4[_2_1_] = r21; out_mat4[_2_2_] = r22;

        return out_mat4;
    }

    setScale              (           in_vec3 ) { return mat4.setScaleValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    setScaleValues        (           x, y, z ) { return mat4.setScaleValues( this,     x,            y,            z            ); }
    static setScale       ( out_mat4, in_vec3 ) { return mat4.setScaleValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static setScaleValues ( out_mat4, x, y, z ) {
        if ( y === undefined ) y = x;
        if ( z === undefined ) z = x;
        
        out_mat4[_0_0_] = x;
        out_mat4[_1_1_] = y;
        out_mat4[_2_2_] = z;
        return out_mat4;
    }

    makeIdentity        (          ) { return mat4.makeIdentity( this ); }
    static makeIdentity ( out_mat4 ) {
        out_mat4[_0_0_] = 1; out_mat4[_0_1_] = 0; out_mat4[_0_2_] = 0; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0; out_mat4[_1_1_] = 1; out_mat4[_1_2_] = 0; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = 0; out_mat4[_2_1_] = 0; out_mat4[_2_2_] = 1; out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = 0; out_mat4[_3_1_] = 0; out_mat4[_3_2_] = 0; out_mat4[_3_3_] = 1;
        return out_mat4;
    }
    
    makeLookAt        (           in_vec3_eye, in_vec3_target, in_vec3_up ) { return mat4.makeLookAt( this, in_vec3_eye, in_vec3_target, in_vec3_up ); }
    static makeLookAt ( out_mat4, in_vec3_eye, in_vec3_target, in_vec3_up ) {
        let z = CACHE_VEC3_Z.set( in_vec3_eye ).sub( in_vec3_target ).normalize();
        let x = CACHE_VEC3_X.set( z ).cross( in_vec3_up ).normalize();
        let y = CACHE_VEC3_Y.set( x ).cross( z );
        
        out_mat4[_0_0_] =  x[_x_]; out_mat4[_0_1_] =  y[_x_]; out_mat4[_0_2_] = z[_x_]; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] =  x[_y_]; out_mat4[_1_1_] =  y[_y_]; out_mat4[_1_2_] = z[_y_]; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] =  x[_z_]; out_mat4[_2_1_] =  y[_z_]; out_mat4[_2_2_] = z[_z_]; out_mat4[_2_3_] = 0;
        
        out_mat4[_3_0_] = -x.dot( in_vec3_eye );
        out_mat4[_3_1_] = -y.dot( in_vec3_eye );
        out_mat4[_3_2_] = -z.dot( in_vec3_eye );
        out_mat4[_3_3_] = 1;
            
        return out_mat4;
    }

    makeFrustum        (           left, right, bottom, top, near, far ) { return mat4.makeFrustum( this, left, right, bottom, top, near, far ); }
    static makeFrustum ( out_mat4, left, right, bottom, top, near, far ) {
        let x = 2 * near / ( right - left );
        let y = 2 * near / ( top - bottom );
        
        let a = ( right + left ) / ( right - left );
        let b = ( top + bottom ) / ( top - bottom );
        let c = -( far + near ) / ( far - near );
        let d = - 2 * far * near / ( far - near );
        
        out_mat4[_0_0_] = x; out_mat4[_0_1_] = 0; out_mat4[_0_2_] = 0; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0; out_mat4[_1_1_] = y; out_mat4[_1_2_] = 0; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = a; out_mat4[_2_1_] = b; out_mat4[_2_2_] = c; out_mat4[_2_3_] = 1;
        out_mat4[_3_0_] = 0; out_mat4[_3_1_] = 0; out_mat4[_3_2_] = d; out_mat4[_3_3_] = 0;
        return out_mat4;
    }

    makeOrthographic        (           left, right, bottom, top, near, far ) { return mat4.makeOrthographic( this, left, right, bottom, top, near, far ); }
    static makeOrthographic ( out_mat4, left, right, bottom, top, near, far ) {
        let lr = 1 / ( right - left );
        let bt = 1 / ( top - bottom );
        let nf = 1 / ( far - near );

        let x =  ( left + right ) *  -lr;
        let y =  ( top + bottom ) *  -bt;
        let z =  ( near + far )   *  -nf;

        let w =  2 * lr;
        let h =  2 * bt;
        let d = -2 * nf;

        out_mat4[_0_0_] = w; out_mat4[_0_1_] = 0; out_mat4[_0_2_] = 0; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0; out_mat4[_1_1_] = h; out_mat4[_1_2_] = 0; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = 0; out_mat4[_2_1_] = 0; out_mat4[_2_2_] = d; out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = x; out_mat4[_3_1_] = y; out_mat4[_3_2_] = z; out_mat4[_3_3_] = 1;
        return out_mat4;
    }

    makePerspective        (           aspect, fov, near, far ) { return mat4.makePerspective( this, aspect, fov, near, far ); }
    static makePerspective ( out_mat4, aspect, fov, near, far ) {
        let y = 1.0 / tan( fov / 2 );
        let nf = 1 / ( near - far );
        let x = y / aspect;
        let z = ( far + near ) * nf;
        let d = ( 2 * far * near ) * nf;

        out_mat4[_0_0_] = x; out_mat4[_0_1_] = 0; out_mat4[_0_2_] = 0; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0; out_mat4[_1_1_] = y; out_mat4[_1_2_] = 0; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = 0; out_mat4[_2_1_] = 0; out_mat4[_2_2_] = z; out_mat4[_2_3_] = -1;
        out_mat4[_3_0_] = 0; out_mat4[_3_1_] = 0; out_mat4[_3_2_] = d; out_mat4[_3_3_] = 0;
        return out_mat4;
    }

    makeTranslation              (           in_vec3 ) { return mat4.makeTranslationValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    makeTranslationValues        (           x, y, z ) { return mat4.makeTranslationValues( this,     x,            y,            z            ); }
    static makeTranslation       ( out_mat4, in_vec3 ) { return mat4.makeTranslationValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static makeTranslationValues ( out_mat4, x, y, z ) {
        out_mat4[_0_0_] = 1;  out_mat4[_0_1_] = 0;  out_mat4[_0_2_] = 0;  out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0;  out_mat4[_1_1_] = 1;  out_mat4[_1_2_] = 0;  out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = 0;  out_mat4[_2_1_] = 0;  out_mat4[_2_2_] = 1;  out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = x;  out_mat4[_3_1_] = y;  out_mat4[_3_2_] = z;  out_mat4[_3_3_] = 1;
        return out_mat4;
    }

    makeScale              (           in_vec3 ) { return mat4.makeScaleValues( this,     in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    makeScaleValues        (           x, y, z ) { return mat4.makeScaleValues( this,     x,            y,            z            ); }
    static makeScale       ( out_mat4, in_vec3 ) { return mat4.makeScaleValues( out_mat4, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static makeScaleValues ( out_mat4, x, y, z ) {
        if ( y === undefined ) y = x;
        if ( z === undefined ) z = x;

        out_mat4[_0_0_] = x;  out_mat4[_0_1_] = 0;  out_mat4[_0_2_] = 0;  out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = 0;  out_mat4[_1_1_] = y;  out_mat4[_1_2_] = 0;  out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = 0;  out_mat4[_2_1_] = 0;  out_mat4[_2_2_] = z;  out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = 0;  out_mat4[_3_1_] = 0;  out_mat4[_3_2_] = 0;  out_mat4[_3_3_] = 1;
        return out_mat4;
    }

    makeRotation              (           rad, in_vec3 ) { return mat4.makeRotationValues( this,     rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    makeRotationValues        (           rad, x, y, z ) { return mat4.makeRotationValues( this,     rad, x,            y,            z            ); }
    static makeRotation       ( out_mat4, rad, in_vec3 ) { return mat4.makeRotationValues( out_mat4, rad, in_vec3[_x_], in_vec3[_y_], in_vec3[_z_] ); }
    static makeRotationValues ( out_mat4, rad, x, y, z ) {
        let s = sin( rad );
        let c = cos( rad );
        let t = 1 - c;
        let length = sqrt( x * x + y * y + z * z );

        if ( length < EPSILON ) return mat4.makeIdentity( out_mat4 );

        length = 1 / length;
        x *= length;
        y *= length;
        z *= length;

        let r00 = x * x * t + c;     let r01 = x * y * t + z * s; let r02 = x * z * t - y * s;
        let r10 = y * x * t - z * s; let r11 = y * y * t + c;     let r12 = y * z * t + x * s;
        let r20 = z * x * t + y * s; let r21 = z * y * t - x * s; let r22 = z * z * t + c;
        
        out_mat4[_0_0_] = r00; out_mat4[_0_1_] = r01; out_mat4[_0_2_] = r02; out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = r10; out_mat4[_1_1_] = r11; out_mat4[_1_2_] = r12; out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = r20; out_mat4[_2_1_] = r21; out_mat4[_2_2_] = r22; out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = 0;   out_mat4[_3_1_] = 0;   out_mat4[_3_2_] = 0;   out_mat4[_3_3_] = 1;

        return out_mat4;
    }

    makeRotationQuat              (           in_quat    ) { return mat4.makeRotationQuat4Values( this,     in_quat[_x_], in_quat[_y_], in_quat[_z_], in_quat[_w_] ); }
    makeRotationQuatValues        (           x, y, z, w ) { return mat4.makeRotationQuat4Values( this,     x,            y,            z,            w            ); }
    static makeRotationQuat       ( out_mat4, in_quat    ) { return mat4.makeRotationQuat4Values( out_mat4, in_quat[_x_], in_quat[_y_], in_quat[_z_], in_quat[_w_] ); }
    static makeRotationQuatValues ( out_mat4, x, y, z, w ) {
        let x2 = 2 * x; 
        let y2 = 2 * y;
        let z2 = 2 * z;
        let w2 = 2 * w;
        
        let xx = x * x2; let xy = x * y2; let xz = x * z2;
        let yy = y * y2; let yz = y * z2; let zz = z * z2;
        let wx = w * x2; let wy = w * y2; let wz = w * z2;

        out_mat4[_0_0_] = 1 - ( yy + zz ); out_mat4[_0_1_] = xy + wz;         out_mat4[_0_2_] = xz - wy;         out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = xy - wz;         out_mat4[_1_1_] = 1 - (xx + zz);   out_mat4[_1_2_] = yz + wx;         out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = xz + wy;         out_mat4[_2_1_] = yz-wx;           out_mat4[_2_2_] = 1 - (xx + yy);   out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = 0;               out_mat4[_3_1_] = 0;               out_mat4[_3_2_] = 0;               out_mat4[_3_3_] = 1;
        return out_mat4;
    }

    makeRotationQuatTranslation        (           in_quat, in_vec3 ) { return mat4.makeRotationQuatTranslation( in_quat, in_vec3 ); }
    static makeRotationQuatTranslation ( out_mat4, in_quat, in_vec3 ) {
        let x = in_quat[_x_];
        let y = in_quat[_y_];
        let z = in_quat[_z_];
        let w = in_quat[_w_];

        let x2 = 2 * x;
        let y2 = 2 * y;
        let z2 = 2 * z;
        let w2 = 2 * w;
        
        let xx = x * x2; let xy = x * y2; let xz = x * z2;
        let yy = y * y2; let yz = y * z2; let zz = z * z2;
        let wx = w * x2; let wy = w * y2; let wz = w * z2;

        out_mat4[_0_0_] = 1 - ( yy + zz ); out_mat4[_0_1_] = xy + wz;         out_mat4[_0_2_] = xz - wy;         out_mat4[_0_3_] = 0;
        out_mat4[_1_0_] = xy - wz;         out_mat4[_1_1_] = 1 - (xx + zz);   out_mat4[_1_2_] = yz + wx;         out_mat4[_1_3_] = 0;
        out_mat4[_2_0_] = xz + wy;         out_mat4[_2_1_] = yz-wx;           out_mat4[_2_2_] = 1 - (xx + yy);   out_mat4[_2_3_] = 0;
        out_mat4[_3_0_] = in_vec3[_x_];    out_mat4[_3_1_] = in_vec3[_y_];    out_mat4[_3_2_] = in_vec3[_z_];    out_mat4[_3_3_] = 1;
        return out_mat4;   
    }
}


const CACHE_MAT3 = new mat3;
const CACHE_MAT4 = new mat4;



const CACHE_VEC4 = new vec4;
const CACHE_VEC4_A = new vec4;
const CACHE_VEC4_B = new vec4;

const CACHE_VEC3 = new vec3;
const CACHE_VEC3_EYE = new vec3;
const CACHE_VEC3_TARGET = new vec3;

const CACHE_VEC3_X = new vec3;
const CACHE_VEC3_Y = new vec3;
const CACHE_VEC3_Z = new vec3;
