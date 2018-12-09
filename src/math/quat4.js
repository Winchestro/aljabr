import vec4 from "../math/vec4.js";

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

export default class quat extends Float32Array {
    constructor ( buffer, byteOffset ) {
        if ( buffer instanceof ArrayBuffer ) super( buffer, byteOffset, 4 );
        else super( 4 );
        quat.makeIdentity( this );            
    }

    set ( in_quat ) { return quat.set( this, in_quat ); }
    static set ( out_quat, in_quat ) {
        out_quat[_x_] = in_quat[_x_];
        out_quat[_y_] = in_quat[_y_];
        out_quat[_z_] = in_quat[_z_];
        out_quat[_w_] = in_quat[_w_];
        return out_quat;
    }

    setValues ( x, y, z, w ) { return quat.setValues( this, x, y, z, w ); }
    static setValues ( out_quat, x, y, z, w ) {
        out_quat[_x_] = x;
        out_quat[_y_] = y;
        out_quat[_z_] = z;
        out_quat[_w_] = w;
        return out_quat;
    }
    
    makeIdentity ( ) { return quat.makeIdentity( this ); }
    static makeIdentity ( out_quat ) {
        out_quat[_x_] = 0;
        out_quat[_y_] = 0;
        out_quat[_z_] = 0;
        out_quat[_w_] = 1;
        return out_quat;
    }

    multiply ( in_quat_B, in_quat_A ) { return quat.multiply( this, in_quat_B, in_quat_A ); }
    static multiply ( out_quat, in_quat_B, in_quat_A ) {
        if ( in_quat_A === undefined ) in_quat_A = quat.set( CACHE_QUAT, out_quat );

        out_quat[_x_] = in_quat_A[_x_] * in_quat_B[_w_] + in_quat_A[_w_] * in_quat_B[_x_] + in_quat_A[_y_] * in_quat_B[_z_] - in_quat_A[_z_] * in_quat_B[_y_];
        out_quat[_y_] = in_quat_A[_y_] * in_quat_B[_w_] + in_quat_A[_w_] * in_quat_B[_y_] + in_quat_A[_z_] * in_quat_B[_x_] - in_quat_A[_x_] * in_quat_B[_z_];
        out_quat[_z_] = in_quat_A[_z_] * in_quat_B[_w_] + in_quat_A[_w_] * in_quat_B[_z_] + in_quat_A[_x_] * in_quat_B[_y_] - in_quat_A[_y_] * in_quat_B[_x_];
        out_quat[_w_] = in_quat_A[_w_] * in_quat_B[_w_] - in_quat_A[_w_] * in_quat_B[_x_] - in_quat_A[_y_] * in_quat_B[_y_] - in_quat_A[_z_] * in_quat_B[_z_];
        return out_quat;
    }

    normalize ( ) { return quat.normalize( this ); }
    static normalize ( out_quat ) {
        let l = vec4.getLength( out_quat );
        if( l === 0 ) return quat4.makeIdentity( out_quat );
        else return quat4.multiplyScalar( out_quat, 1 / l );
    }

    conjugate ( ) { return quat.conjugate( this ); }
    static conjugate ( out_quat ) {
        out_quat[_x_] *= -1;
        out_quat[_y_] *= -1;
        out_quat[_z_] *= -1;
        return out_quat;
    }

    makeAxisAngle ( in_vec3_axis, angle ) { return quat.makeAxisAngle( this, in_vec3_axis, angle ); }
    static makeAxisAngle ( out_quat, in_vec3_axis, angle ) {
        let a = angle * .5;
        let s = Math.sin( a );
        let c = Math.cos( a );

        this[_x_] = in_vec3_axis[_x_] * s;
        this[_y_] = in_vec3_axis[_y_] * s;
        this[_z_] = in_vec3_axis[_z_] * s;
        this[_w_] = c;

        return this;
    }
}

const CACHE_QUAT = new quat;