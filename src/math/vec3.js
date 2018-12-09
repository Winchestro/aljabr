import def from "../utilities/PropertyDescriptors.js";
import ArrayBuffer from "../kernel/ArrayBuffer.js";
import ClientFloat32Array from "../kernel/Float32Array.js";

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

const _0_0_ =  0; const _0_1_ =  1; const _0_2_ =  2; const _0_3_ = 3; 
const _1_0_ =  4; const _1_1_ =  5; const _1_2_ =  6; const _1_3_ = 7;
const _2_0_ =  8; const _2_1_ =  9; const _2_2_ = 10; const _2_3_ = 11;
const _3_0_ = 12; const _3_1_ = 13; const _3_2_ = 14; const _3_3_ = 15;

export default class vec3 extends ClientFloat32Array {
    constructor ( x, y, z ) {
        if ( x instanceof ArrayBuffer ) {
            super( x, y, 3 );
        } else {

            super( 3 );
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;
            
            this[_x_] = x;
            this[_y_] = y;
            this[_z_] = z;
        }

    }

    set ( in_vec3 ) { return vec3.set( this, in_vec3 ); }
    static set ( out_vec3, in_vec3 ) {
        out_vec3[_x_] = in_vec3[_x_];
        out_vec3[_y_] = in_vec3[_y_];
        out_vec3[_z_] = in_vec3[_z_];
        return out_vec3;
    }
    

    setValues ( x, y, z ) { return vec3.setValues( this, x, y, z ); }
    static setValues ( out_vec3, x, y, z ) { 
        out_vec3[_x_] = x;
        out_vec3[_y_] = y;
        out_vec3[_z_] = z;  
        return out_vec3;
    }
    

    add ( in_vec3_B, in_vec3_A ) { return vec3.add( this, in_vec3_B, in_vec3_A ); }
    static add ( out_vec3, in_vec3_B, in_vec3_A ) {
        if ( in_vec3_A === undefined ) in_vec3_A = out_vec3;

        out_vec3[_x_] = in_vec3_A[_x_] + in_vec3_B[_x_];
        out_vec3[_y_] = in_vec3_A[_y_] + in_vec3_B[_y_];
        out_vec3[_z_] = in_vec3_A[_z_] + in_vec3_B[_z_];
        return out_vec3;
    }
    

    addValues( x, y, z ) { return vec3.addValues( this, x, y, z ); }
    static addValues ( out_vec3, x, y, z, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = out_vec3;

        out_vec3[_x_] = in_vec3[_x_] + x;
        out_vec3[_y_] = in_vec3[_y_] + y;
        out_vec3[_z_] = in_vec3[_z_] + z;
        return out_vec3;
    }
    

    addScalar ( s, in_vec3 ) { return vec3.addScalar( this, s, in_vec3 ); }
    static addScalar ( out_vec3, inS, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = out_vec3;

        out_vec3[_x_] = in_vec3[_x_] + s;
        out_vec3[_y_] = in_vec3[_y_] + s;
        out_vec3[_z_] = in_vec3[_z_] + s;
        return out_vec3;
    }
    

    sub ( in_vec3_B, in_vec3_A ) { return vec3.sub( this, in_vec3_B, in_vec3_A ); }
    static sub ( out_vec3, in_vec3_B, in_vec3_A ) {
        if ( in_vec3_A === undefined ) in_vec3_A = out_vec3;

        out_vec3[_x_] = in_vec3_A[_x_] - in_vec3_B[_x_];
        out_vec3[_y_] = in_vec3_A[_y_] - in_vec3_B[_y_];
        out_vec3[_z_] = in_vec3_A[_z_] - in_vec3_B[_z_];
        return out_vec3;
    }
    

    multiply ( in_vec3_B, in_vec3_A ) { return vec3.multiply( this, in_vec3_B, in_vec3_A ); }
    static multiply ( out_vec3, in_vec3_B, in_vec3_A ) {
        if ( in_vec3_A === undefined ) in_vec3_A = out_vec3;

        out_vec3[_x_] = in_vec3_A[_x_] * in_vec3_B[_x_];
        out_vec3[_y_] = in_vec3_A[_y_] * in_vec3_B[_y_];
        out_vec3[_z_] = in_vec3_A[_z_] * in_vec3_B[_z_];
        return out_vec3;
    }

    multiplyValues ( x, y, z, in_vec3_A ) { return vec3.multiplyValues( this, x, y, z, in_vec3_A ); }
    static multiplyValues ( out_vec3, x, y, z, in_vec3_A ) {
        if ( in_vec3_A === undefined ) in_vec3_A = out_vec3;

        out_vec3[_x_] = in_vec3_A[_x_] * x;
        out_vec3[_y_] = in_vec3_A[_y_] * y;
        out_vec3[_z_] = in_vec3_A[_z_] * z;
        return out_vec3;
    }
    

    multiplyScalar ( s, in_vec3 ) { return vec3.multiplyScalar( this, s, in_vec3 ); }
    static multiplyScalar ( out_vec3, s, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = out_vec3;

        out_vec3[_x_] = in_vec3[_x_] * s;
        out_vec3[_y_] = in_vec3[_y_] * s;
        out_vec3[_z_] = in_vec3[_z_] * s;
        return out_vec3;
    }
    

    multiplyMat3 ( in_mat3, in_vec3 ) { return vec3.multiplyMat3( this, in_mat3, in_vec3 ); }
    static multiplyMat3 ( out_vec3, in_mat3, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = vec3.set( CACHE_VEC3, out_vec3 );
        else                         in_vec3 = vec3.set( CACHE_VEC3, in_vec3 );

        out_vec3[_x_] = in_vec3[_x_] * in_mat3[ 0 ] + in_vec3[_y_] * in_mat3[ 3 ] + in_vec3[_z_] * in_mat3[ 6 ];
        out_vec3[_y_] = in_vec3[_x_] * in_mat3[ 1 ] + in_vec3[_y_] * in_mat3[ 4 ] + in_vec3[_z_] * in_mat3[ 7 ];
        out_vec3[_z_] = in_vec3[_x_] * in_mat3[ 2 ] + in_vec3[_y_] * in_mat3[ 5 ] + in_vec3[_z_] * in_mat3[ 9 ];

        return out_vec3;
    }
    
    divide ( vA, vB ) { return vec3.divide( this, vA, vB ); }
    static divide ( out_vec3, vA, vB ) {
        if ( vB === undefined ) vB = out_vec3;

        out_vec3[_x_] = vA[_x_] / vB[_x_];
        out_vec3[_y_] = vA[_y_] / vB[_y_];
        out_vec3[_z_] = vA[_z_] / vB[_z_];
        return this;
    }

    divideScalar ( s, in_vec3 ) { return vec3.divideScalar( this, s, in_vec3 ); }
    static divideScalar ( out_vec3, s, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = out_vec3;

        out_vec3[_x_] = in_vec3[_x_] / s;
        out_vec3[_y_] = in_vec3[_y_] / s;
        out_vec3[_z_] = in_vec3[_z_] / s;
        return out_vec3
    }
    
    dot ( vB ) { return vec3.dot( this, vB ); }
    static dot ( vA, vB ) {
        return (   vA[_x_] * vB[_x_]
                 + vA[_y_] * vB[_y_]
                 + vA[_z_] * vB[_z_]
        );
    }
    
    cross ( vA, vB ) { return vec3.cross( this, vA, vB ); }
    static cross ( out_vec3, vA, vB ) {
        if ( vB === undefined ) vB = CACHE_VEC3.set( out_vec3 );

        out_vec3[_x_] = vA[_y_] * vB[_z_] - vA[_z_] * vB[_y_];
        out_vec3[_y_] = vA[_z_] * vB[_x_] - vA[_x_] * vB[_z_];
        out_vec3[_z_] = vA[_x_] * vB[_y_] - vA[_y_] * vB[_x_];  
        return out_vec3;
    }
    
    lerp ( alpha, vA, vB ) { return vec3.lerp( this, alpha, vA, vB ); }
    static lerp ( out_vec3, alpha, vA, vB ) {
        if ( vB === undefined ) vB = out_vec3;
        

        out_vec3[_x_] = vA[_x_] + ( vB[_x_] - vA[_x_] ) * alpha;
        out_vec3[_y_] = vA[_y_] + ( vB[_y_] - vA[_y_] ) * alpha;
        out_vec3[_z_] = vA[_z_] + ( vB[_z_] - vA[_z_] ) * alpha;
        return out_vec3;
    }
    
    normalize ( ) { return vec3.normalize( this ); } 
    static normalize ( out_vec3 ) {
        let length = vec3.getLength( out_vec3 );
        if ( length === 0 ) return out_vec3;
        else return vec3.multiplyScalar( out_vec3, 1 / length );
    }
    
    multiplyQuat ( in_quat, in_vec3 ) { return vec3.applyQuat( this, in_quat, in_vec3 ); }
    static multiplyQuat4 ( out_vec3, in_quat, in_vec3 ) {
        if ( in_vec3 === undefined ) in_vec3 = vec3.set( CACHE_VEC3, out_vec3 );

        let x = in_quat[_w_] * in_vec3[_x_] + in_quat[_y_] * in_vec3[_z_] - in_quat[_z_] * in_vec3[_y_];
        let y = in_quat[_w_] * in_vec3[_y_] + in_quat[_z_] * in_vec3[_x_] - in_quat[_x_] * in_vec3[_z_];
        let z = in_quat[_w_] * in_vec3[_z_] + in_quat[_x_] * in_vec3[_y_] - in_quat[_y_] * in_vec3[_x_];
        let w = in_quat[_x_] * in_vec3[_x_] - in_quat[_y_] * in_vec3[_y_] - in_quat[_z_] * in_vec3[_z_];

        out_vec3[_x_] = x * in_quat[_w_] + w * -in_quat[_x_] + y * -in_quat[_z_] - z * -in_quat[_y_];
        out_vec3[_y_] = y * in_quat[_w_] + w * -in_quat[_y_] + z * -in_quat[_x_] - x * -in_quat[_z_];
        out_vec3[_z_] = z * in_quat[_w_] + w * -in_quat[_z_] + x * -in_quat[_y_] - y * -in_quat[_x_];
        return out_vec3;
    }
    
    applyProjection ( in_mat4 ) { return vec3.applyProjection( this, in_mat4 ); }
    static applyProjection ( out_vec3, in_mat4 ) {
        let x = out_vec3[_x_];
        let y = out_vec3[_y_];
        let z = out_vec3[_z_];

        let d = 1 / ( in_mat4[_0_3_] * x + in_mat4[_1_3_] * y + in_mat4[_2_3_] * z + in_mat4[_3_3_] );
        out_vec3[_x_] = ( in_mat4[_0_0_] * x + in_mat4[_1_0_] * y + in_mat4[_2_0_] * z + in_mat4[_3_0_] ) * d;
        out_vec3[_y_] = ( in_mat4[_0_1_] * x + in_mat4[_1_1_] * y + in_mat4[_2_1_] * z + in_mat4[_3_1_] ) * d;
        out_vec3[_z_] = ( in_mat4[_0_2_] * x + in_mat4[_1_2_] * y + in_mat4[_2_2_] * z + in_mat4[_3_2_] ) * d;
        return out_vec3;
    }
    
    getLength ( ) { return vec3.getLength( this ); }
    static getLength ( in_vec3 ) {
        return Math.sqrt(
            in_vec3[_x_] * in_vec3[_x_] +
            in_vec3[_y_] * in_vec3[_y_] +
            in_vec3[_z_] * in_vec3[_z_]
        );  
    }
    
    getLengthSq ( ) { return vec3.getLengthSq( this ); }
    static getLengthSq ( in_vec3 ) {
        return ( 
            in_vec3[_x_] * in_vec3[_x_] +
            in_vec3[_y_] * in_vec3[_y_] +
            in_vec3[_z_] * in_vec3[_z_]
        );
    }
    
    getLengthManhattan ( ) { return vec3.getLengthManhattan( this ); }
    static getLengthManhattan ( in_vec3 ) {
        return (
            Math.abs( in_vec3[_x_] ) +
            Math.abs( in_vec3[_y_] ) +
            Math.abs( in_vec3[_z_] )
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