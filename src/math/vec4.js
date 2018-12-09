import def from "../utilities/PropertyDescriptors.js";
import ArrayBuffer from "../kernel/ArrayBuffer.js";
import ClientFloat32Array from "../kernel/Float32Array.js";

const _0_0_ =  0; const _0_1_ =  1; const _0_2_ =  2; const _0_3_ = 3; 
const _1_0_ =  4; const _1_1_ =  5; const _1_2_ =  6; const _1_3_ = 7;
const _2_0_ =  8; const _2_1_ =  9; const _2_2_ = 10; const _2_3_ = 11;
const _3_0_ = 12; const _3_1_ = 13; const _3_2_ = 14; const _3_3_ = 15;

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

export default class vec4 extends ClientFloat32Array {
    constructor ( x, y, z, w ) {
        if ( x instanceof ArrayBuffer ) {
            super( x, y, 4 );
        } else {

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
    }

    set ( in_vec4 ) { return vec4.set( this, in_vec4 ); }
    static set ( out_vec4, in_vec4 ) {
        out_vec4[_x_] = in_vec4[_x_];
        out_vec4[_y_] = in_vec4[_y_];
        out_vec4[_z_] = in_vec4[_z_];
        out_vec4[_w_] = in_vec4[_w_];
        return out_vec4;
    }
    
    setValues ( x, y, z, w ) { return vec4.setValues( this, x, y, z, w ); }
    static setValues ( out_vec4, x, y, z, w ) {
        out_vec4[_x_] = x;
        out_vec4[_y_] = y;
        out_vec4[_z_] = z;
        out_vec4[_w_] = w;
        return out_vec4;
    }
    
    add ( in_vec4_B, in_vec4_A ) { return vec4.add( this, in_vec4_B, in_vec4_A ); }
    static add ( out_vec4, in_vec4_B, in_vec4_A ) {
        if ( in_vec4_A === undefined ) in_vec4_A = out_vec4;

        out_vec4[_x_] = in_vec4_A[_x_] + in_vec4_B[_x_];
        out_vec4[_y_] = in_vec4_A[_y_] + in_vec4_B[_y_];
        out_vec4[_z_] = in_vec4_A[_z_] + in_vec4_B[_z_];
        out_vec4[_w_] = in_vec4_A[_w_] + in_vec4_B[_w_];
        return out_vec4;
    }

    addValues( x, y, z, w ) { return vec4.addValues( this, x, y, z, w ); }
    static addValues ( out_vec4, x, y, z, w, in_vec4 ) {
        if ( in_vec4 === undefined ) in_vec4 = out_vec4;

        out_vec4[_x_] = in_vec4[_x_] + x;
        out_vec4[_y_] = in_vec4[_y_] + y;
        out_vec4[_z_] = in_vec4[_z_] + z;
        out_vec4[_w_] = in_vec4[_w_] + w;
        return out_vec4;
    }
    
    sub ( in_vec4_B, in_vec4_A ) { return vec4.sub( this, in_vec4_B, in_vec4_A ); }
    static sub ( out_vec4, in_vec4_B, in_vec4_A ) {
        if ( in_vec4_A === undefined ) in_vec4_A = out_vec4;

        out_vec4[_x_] = in_vec4_A[_x_] - in_vec4_B[_x_];
        out_vec4[_y_] = in_vec4_A[_y_] - in_vec4_B[_y_];
        out_vec4[_z_] = in_vec4_A[_z_] - in_vec4_B[_z_];
        out_vec4[_w_] = in_vec4_A[_w_] - in_vec4_B[_w_];
        return out_vec4;
    }
    
    multiply ( in_vec4_B, in_vec4_A ) { return vec4.multiply( this, in_vec4_B, in_vec4_A ); }
    static multiply ( out_vec4, in_vec4_B, in_vec4_A ) {
        if ( in_vec4_A === undefined ) in_vec4_A = out_vec4;

        out_vec4[_x_] = in_vec4_A[_x_] * in_vec4_B[_x_];
        out_vec4[_y_] = in_vec4_A[_y_] * in_vec4_B[_y_];
        out_vec4[_z_] = in_vec4_A[_z_] * in_vec4_B[_z_];
        out_vec4[_w_] = in_vec4_A[_w_] * in_vec4_B[_w_];
        return out_vec4;
    }
    
    divide ( in_vec4_B, in_vec4_A ) { return vec4.divide( this, in_vec4_B, in_vec4_A ); }
    static divide ( out_vec4, in_vec4_B, in_vec4_A ) {
        if ( in_vec4_A === undefined ) in_vec4_A = out_vec4;

        out_vec4[_x_] = in_vec4_A[_x_] / in_vec4_B[_x_];
        out_vec4[_y_] = in_vec4_A[_y_] / in_vec4_B[_y_];
        out_vec4[_z_] = in_vec4_A[_z_] / in_vec4_B[_z_];
        out_vec4[_w_] = in_vec4_A[_w_] / in_vec4_B[_w_];
        return out_vec4;
    }
    
    dot ( in_vec4 ) { return vec4.dot( this, in_vec4 ); }
    static dot ( in_vec4_B, in_vec4_A ) {
        return ( in_vec4_A[_x_] * in_vec4_B[_x_]
               + in_vec4_A[_y_] * in_vec4_B[_y_]
               + in_vec4_A[_z_] * in_vec4_B[_z_]
               + in_vec4_A[_w_] * in_vec4_B[_w_]
        );
    }
    
    addScalar ( s, in_vec4 ) { return vec4.addScalar( this, s, in_vec4 ); }
    static addScalar ( out_vec4, s, in_vec4 ) {
        if ( in_vec4 === undefined ) in_vec4 = out_vec4;

        out_vec4[_x_] = in_vec4[_x_] + s;
        out_vec4[_y_] = in_vec4[_y_] + s;
        out_vec4[_z_] = in_vec4[_z_] + s;
        out_vec4[_w_] = in_vec4[_w_] + s;
        return out_vec4;
    }
    
    multiplyScalar ( s, in_vec4 ) { return vec4.multiplyScalar( this, s, in_vec4 ); }
    static multiplyScalar ( out_vec4, s, in_vec4 ) {
        if ( in_vec4 === undefined ) in_vec4 = out_vec4;

        out_vec4[_x_] = in_vec4[_x_] * s;
        out_vec4[_y_] = in_vec4[_y_] * s;
        out_vec4[_z_] = in_vec4[_z_] * s;
        out_vec4[_w_] = in_vec4[_w_] * s;
        return out_vec4;
    }
    
    multiplyMat4 ( in_mat4, in_vec4 ) { return vec4.multiplyMat4( this, in_mat4, in_vec4 ); }
    static multiplyMat4 ( out_vec4, in_mat4, in_vec4 ) {
        if ( in_vec4 === undefined ) in_vec4 = out_vec4;

        let x = out_vec4[_x_];
        let y = out_vec4[_y_];
        let z = out_vec4[_z_];
        let w = out_vec4[_w_];

        out_vec4[_x_] = x * in_mat4[_0_0_] + y * in_mat4[_1_0_] + z * in_mat4[_2_0_] + w * in_mat4[_3_0_];
        out_vec4[_y_] = x * in_mat4[_0_1_] + y * in_mat4[_1_1_] + z * in_mat4[_2_1_] + w * in_mat4[_3_1_];
        out_vec4[_z_] = x * in_mat4[_0_2_] + y * in_mat4[_1_2_] + z * in_mat4[_2_2_] + w * in_mat4[_3_2_];
        out_vec4[_w_] = x * in_mat4[_0_3_] + y * in_mat4[_1_3_] + z * in_mat4[_2_3_] + w * in_mat4[_3_3_];

        return out_vec4;
    }
    
    lerp ( alpha, in_vec4_B, in_vec4_A ) { return vec4.lerp( this, alpha, in_vec4_B, in_vec4_A ); }
    static lerp ( out_vec4, alpha, in_vec4_B, in_vec4_A ) {
        if ( in_vec4_A === undefined ) in_vec4_A = out_vec4;

        out_vec4[_x_] = in_vec4_A[_x_] + ( in_vec4_B[_x_] - in_vec4_A[_x_] ) * alpha;
        out_vec4[_y_] = in_vec4_A[_y_] + ( in_vec4_B[_y_] - in_vec4_A[_y_] ) * alpha;
        out_vec4[_z_] = in_vec4_A[_z_] + ( in_vec4_B[_z_] - in_vec4_A[_z_] ) * alpha;
        out_vec4[_w_] = in_vec4_A[_w_] + ( in_vec4_B[_w_] - in_vec4_A[_w_] ) * alpha;
        return out_vec4;
    }
    
    normalize ( ) { return vec4.normalize( this ); } 
    static normalize ( out_vec4 ) {
        let length = vec4.getLength( out_vec4 );
        if ( length === 0 ) return out_vec4;
        else return vec4.multiplyScalar( out_vec4, 1 / length );
    }
    
    getLength ( ) { return vec4.getLength( this ); }
    static getLength ( in_vec4 ) {
        return Math.sqrt(
            in_vec4[_x_] * in_vec4[_x_] +
            in_vec4[_y_] * in_vec4[_y_] +
            in_vec4[_z_] * in_vec4[_z_] +
            in_vec4[_w_] * in_vec4[_w_]
        );
    }
    
    getLengthSq ( ) { return vec4.getLengthSquared( this ); }
    static getLengthSquared ( in_vec4 ) {
        return (
            in_vec4[_x_] * in_vec4[_x_] + 
            in_vec4[_y_] * in_vec4[_y_] + 
            in_vec4[_z_] * in_vec4[_z_] + 
            in_vec4[_w_] * in_vec4[_w_]
        );
    }
}