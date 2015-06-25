import { Properties, E, C, W } from "../utilities/PropertyDescriptors.js";

import mat3 from "./mat3.js";
import vec4 from "./vec4.js";
import vec3 from "./vec3.js";

const _0_0_ = 0; const _1_0_ = 4; const _2_0_ =  8; const _3_0_ = 12;
const _0_1_ = 1; const _1_1_ = 5; const _2_1_ =  9; const _3_1_ = 13;
const _0_2_ = 2; const _1_2_ = 6; const _2_2_ = 10; const _3_2_ = 14;
const _0_3_ = 3; const _1_3_ = 7; const _2_3_ = 11; const _3_3_ = 15;

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

export default class mat4 { 
	constructor ( ) {
		if ( arguments.length === 16 ) this.set( arguments );
		else this.makeIdentity();
	}
	static set ( outM4, inM4 ) {
		return mat4.prototype.set.call( outM4, inM4 ); 
	}
	static setValues ( outM4, inS_0_0, inS_0_1, inS_0_2, inS_0_3, inS_1_0, inS_1_1, inS_1_2, inS_1_3, inS_2_0, inS_2_1, inS_2_2, inS_2_3, inS_3_0, inS_3_1, inS_3_2, inS_3_3 ) {
		return mat4.prototype.setValues.call( outM4, inS_0_0, inS_0_1, inS_0_2, inS_0_3, inS_1_0, inS_1_1, inS_1_2, inS_1_3, inS_2_0, inS_2_1, inS_2_2, inS_2_3, inS_3_0, inS_3_1, inS_3_2, inS_3_3 );
	}

	static add ( outM4, inM4 ) {
		return mat4.prototype.add.call( outM4, inM4 );
	}
	static sub ( outM4, inM4 ) {
		return mat4.prototype.sub.call( outM4, inM4 );
	}
	static multiply ( outM4, inM4 ) {
		return mat4.prototype.multiply.call( outM4, inM4 );
	}
	static divide ( outM4, inM4 ) {
		return mat4.prototype.divide.call( outM4, inM4 );
	}

	static addScalar ( outM4, inS ) {
		return mat4.prototype.addScalar.call( outM4, inS );
	}
	static multiplyScalar ( outM4, inS ) {
		return mat4.prototype.multiplyScalar.call( outM4, inS );
	}

	static lookAt ( outM4, eye, target, up ) {
		return mat4.prototype.lookAt.call( outM4, eye, target, up );
	}

	static makeIdentity ( outM4 ) {
		return mat4.prototype.makeIdentity.call( outM4 );
	}
	static makeFrustum ( outM4, left, right, bottom, top, near, far ) {
		return mat4.prototype.makeFrustum.call( outM4, left, right, bottom, top, near, far );
	}
	static makeOrthographic ( outM4, left, right, bottom, top, near, far ) {
		return mat4.prototype.makeOrthographic.call( outM4, left, right, bottom, top, near, far );
	}
	static makePerspective ( outM4, aspect, fov, near, far ) {
		return mat4.prototype.makePerspective.call( outM4, aspect, fov, near, far );
	}
	static makeTranslation ( outM4, inS_x, inS_y, inS_z ) {
		return mat4.prototype.makeTranslation.call( outM4, inS_x, inS_y, inS_z );
	}
	static makeScale ( outM4, inS_x, inS_y, inS_z ) {
		return mat4.prototype.makeScale.call( outM4, inS_x, inS_y, inS_z );
	}
	static makeRotationX ( outM4, inS_rad ) {
		return mat4.prototype.makeRotationX.call( outM4, inS_rad );
	}
	static makeRotationY ( outM4, inS_rad ) {
		return mat4.prototype.makeRotationY.call( outM4, inS_rad );
	}
	static makeRotationZ ( outM4, inS_rad ) {
		return mat4.prototype.makeRotationZ.call( outM4, inS_rad );
	}
	static makeRotationQuat4 ( outM4, inQuat4_rotation ) {
		return mat4.prototype.makeRotationQuat4.call( outM4, inQuat4_rotation );
	}
}


Properties( mat4.prototype, {
	length : 16,
	splice : [].splice,
	set ( inM4 ) {
		this[_0_0_] = inM4[_0_0_];
		this[_0_1_] = inM4[_0_1_];
		this[_0_2_] = inM4[_0_2_];
		this[_0_3_] = inM4[_0_3_];
		this[_1_0_] = inM4[_1_0_];
		this[_1_1_] = inM4[_1_1_];
		this[_1_2_] = inM4[_1_2_];
		this[_1_3_] = inM4[_1_3_];
		this[_2_0_] = inM4[_2_0_];
		this[_2_1_] = inM4[_2_1_];
		this[_2_2_] = inM4[_2_2_];
		this[_2_3_] = inM4[_2_3_];
		this[_3_0_] = inM4[_3_0_];
		this[_3_1_] = inM4[_3_1_];
		this[_3_2_] = inM4[_3_2_];
		this[_3_3_] = inM4[_3_3_];
		
		return this;
	},
	setValues ( inS_0_0, inS_0_1, inS_0_2, inS_0_3, inS_1_0, inS_1_1, inS_1_2, inS_1_3, inS_2_0, inS_2_1, inS_2_2, inS_2_3, inS_3_0, inS_3_1, inS_3_2, inS_3_3 ) {
		this[_0_0_] = inS_0_0;
		this[_0_1_] = inS_0_1;
		this[_0_2_] = inS_0_2;
		this[_0_3_] = inS_0_3;
		this[_1_0_] = inS_1_0;
		this[_1_1_] = inS_1_1;
		this[_1_2_] = inS_1_2;
		this[_1_3_] = inS_1_3;
		this[_2_0_] = inS_2_0;
		this[_2_1_] = inS_2_1;
		this[_2_2_] = inS_2_2;
		this[_2_3_] = inS_2_3;
		this[_3_0_] = inS_3_0;
		this[_3_1_] = inS_3_1;
		this[_3_2_] = inS_3_2;
		this[_3_3_] = inS_3_3;
		return this;
	},
	
	transpose ( inM4A = this ) {
		let a = inM4A;

		this[_0_0_] = a[_0_0_];
		this[_0_1_] = a[_1_0_];
		this[_0_2_] = a[_2_0_];
		this[_0_3_] = a[_3_0_];
		this[_1_0_] = a[_0_1_];
		this[_1_1_] = a[_1_1_];
		this[_1_2_] = a[_2_1_];
		this[_1_3_] = a[_3_1_];
		this[_2_0_] = a[_0_2_];
		this[_2_1_] = a[_1_2_];
		this[_2_2_] = a[_2_2_];
		this[_2_3_] = a[_3_2_];
		this[_3_0_] = a[_0_3_];
		this[_3_1_] = a[_1_3_];
		this[_3_2_] = a[_2_3_];
		this[_3_3_] = a[_3_3_];

		return this;
	},
	invert ( inM4A = CACHE_MAT4.transpose( this ) ) {
		let m = this;
		let a = inM4A;
			
		m[_0_0_] = a[_1_2_] * a[_2_3_] * a[_3_1_]
				 - a[_1_3_] * a[_2_2_] * a[_3_1_]
				 + a[_1_3_] * a[_2_1_] * a[_3_2_]
				 - a[_1_1_] * a[_2_3_] * a[_3_2_]
				 - a[_1_2_] * a[_2_1_] * a[_3_3_]
				 + a[_1_1_] * a[_2_2_] * a[_3_3_];

		m[_1_0_] = a[_0_3_] * a[_2_2_] * a[_3_1_]
				 - a[_0_2_] * a[_2_3_] * a[_3_1_]
				 - a[_0_3_] * a[_2_1_] * a[_3_2_]
				 + a[_0_1_] * a[_2_3_] * a[_3_2_]
				 + a[_0_2_] * a[_2_1_] * a[_3_3_]
				 - a[_0_1_] * a[_2_2_] * a[_3_3_];

		m[_2_0_] = a[_0_2_] * a[_1_3_] * a[_3_1_]
				 - a[_0_3_] * a[_1_2_] * a[_3_1_]
				 + a[_0_3_] * a[_1_1_] * a[_3_2_]
				 - a[_0_1_] * a[_1_3_] * a[_3_2_]
				 - a[_0_2_] * a[_1_1_] * a[_3_3_]
				 + a[_0_1_] * a[_1_2_] * a[_3_3_];

		m[_3_0_] = a[_0_3_] * a[_1_2_] * a[_2_1_]
				 - a[_0_2_] * a[_1_3_] * a[_2_1_]
				 - a[_0_3_] * a[_1_1_] * a[_2_2_]
				 + a[_0_1_] * a[_1_3_] * a[_2_2_]
				 + a[_0_2_] * a[_1_1_] * a[_2_3_]
				 - a[_0_1_] * a[_1_2_] * a[_2_3_];

		m[_0_1_] = a[_1_3_] * a[_2_2_] * a[_3_0_]
				 - a[_1_2_] * a[_2_3_] * a[_3_0_]
				 - a[_1_3_] * a[_2_0_] * a[_3_2_]
				 + a[_1_0_] * a[_2_3_] * a[_3_2_]
				 + a[_1_2_] * a[_2_0_] * a[_3_3_]
				 - a[_1_0_] * a[_2_2_] * a[_3_3_];

		m[_1_1_] = a[_0_2_] * a[_2_3_] * a[_3_0_]
				 - a[_0_3_] * a[_2_2_] * a[_3_0_]
				 + a[_0_3_] * a[_2_0_] * a[_3_2_]
				 - a[_0_0_] * a[_2_3_] * a[_3_2_]
				 - a[_0_2_] * a[_2_0_] * a[_3_3_]
				 + a[_0_0_] * a[_2_2_] * a[_3_3_];

		m[_2_1_] = a[_0_3_] * a[_1_2_] * a[_3_0_]
				 - a[_0_2_] * a[_1_3_] * a[_3_0_]
				 - a[_0_3_] * a[_1_0_] * a[_3_2_]
				 + a[_0_0_] * a[_1_3_] * a[_3_2_]
				 + a[_0_2_] * a[_1_0_] * a[_3_3_]
				 - a[_0_0_] * a[_1_2_] * a[_3_3_];

		m[_3_1_] = a[_0_2_] * a[_1_3_] * a[_2_0_]
				 - a[_0_3_] * a[_1_2_] * a[_2_0_]
				 + a[_0_3_] * a[_1_0_] * a[_2_2_]
				 - a[_0_0_] * a[_1_3_] * a[_2_2_]
				 - a[_0_2_] * a[_1_0_] * a[_2_3_]
				 + a[_0_0_] * a[_1_2_] * a[_2_3_];

		m[_0_2_] = a[_1_1_] * a[_2_3_] * a[_3_0_]
				 - a[_1_3_] * a[_2_1_] * a[_3_0_]
				 + a[_1_3_] * a[_2_0_] * a[_3_1_]
				 - a[_1_0_] * a[_2_3_] * a[_3_1_]
				 - a[_1_1_] * a[_2_0_] * a[_3_3_]
				 + a[_1_0_] * a[_2_1_] * a[_3_3_];

		m[_1_2_] = a[_0_3_] * a[_2_1_] * a[_3_0_]
				 - a[_0_1_] * a[_2_3_] * a[_3_0_]
				 - a[_0_3_] * a[_2_0_] * a[_3_1_]
				 + a[_0_0_] * a[_2_3_] * a[_3_1_]
				 + a[_0_1_] * a[_2_0_] * a[_3_3_]
				 - a[_0_0_] * a[_2_1_] * a[_3_3_];

		m[_2_2_] = a[_0_1_] * a[_1_3_] * a[_3_0_]
				 - a[_0_3_] * a[_1_1_] * a[_3_0_]
				 + a[_0_3_] * a[_1_0_] * a[_3_1_]
				 - a[_0_0_] * a[_1_3_] * a[_3_1_]
				 - a[_0_1_] * a[_1_0_] * a[_3_3_]
				 + a[_0_0_] * a[_1_1_] * a[_3_3_];

		m[_3_2_] = a[_0_3_] * a[_1_1_] * a[_2_0_]
				 - a[_0_1_] * a[_1_3_] * a[_2_0_]
				 - a[_0_3_] * a[_1_0_] * a[_2_1_]
				 + a[_0_0_] * a[_1_3_] * a[_2_1_]
				 + a[_0_1_] * a[_1_0_] * a[_2_3_]
				 - a[_0_0_] * a[_1_1_] * a[_2_3_];

		m[_0_3_] = a[_1_2_] * a[_2_1_] * a[_3_0_]
				 - a[_1_1_] * a[_2_2_] * a[_3_0_]
				 - a[_1_2_] * a[_2_0_] * a[_3_1_]
				 + a[_1_0_] * a[_2_2_] * a[_3_1_]
				 + a[_1_1_] * a[_2_0_] * a[_3_2_]
				 - a[_1_0_] * a[_2_1_] * a[_3_2_];

		m[_1_3_] = a[_0_1_] * a[_2_2_] * a[_3_0_]
				 - a[_0_2_] * a[_2_1_] * a[_3_0_]
				 + a[_0_2_] * a[_2_0_] * a[_3_1_]
				 - a[_0_0_] * a[_2_2_] * a[_3_1_]
				 - a[_0_1_] * a[_2_0_] * a[_3_2_]
				 + a[_0_0_] * a[_2_1_] * a[_3_2_];

		m[_2_3_] = a[_0_2_] * a[_1_1_] * a[_3_0_]
				 - a[_0_1_] * a[_1_2_] * a[_3_0_]
				 - a[_0_2_] * a[_1_0_] * a[_3_1_]
				 + a[_0_0_] * a[_1_2_] * a[_3_1_]
				 + a[_0_1_] * a[_1_0_] * a[_3_2_]
				 - a[_0_0_] * a[_1_1_] * a[_3_2_];

		m[_3_3_] = a[_0_1_] * a[_1_2_] * a[_2_0_]
				 - a[_0_2_] * a[_1_1_] * a[_2_0_]
				 + a[_0_2_] * a[_1_0_] * a[_2_1_]
				 - a[_0_0_] * a[_1_2_] * a[_2_1_]
				 - a[_0_1_] * a[_1_0_] * a[_2_2_]
				 + a[_0_0_] * a[_1_1_] * a[_2_2_];
		  
		
		let determinant = a[_0_0_] * m[_0_0_]
						+ a[_1_0_] * m[_1_0_]
						+ a[_2_0_] * m[_2_0_]
						+ a[_3_0_] * m[_3_0_];
		
		if( Math.abs( determinant ) < Number.EPSILON ) return mat4.makeIdentity( this );
		else return mat4.multiplyScalar( this, 1 / determinant );
	},

	add ( inM4A, inM4B = this ) {
		let a = inM4A;
		let b = inM4B;

		this[_0_0_] = a[_0_0_] + b[_0_0_];
		this[_0_1_] = a[_0_1_] + b[_0_1_];
		this[_0_2_] = a[_0_2_] + b[_0_2_];
		this[_0_3_] = a[_0_3_] + b[_0_3_];
		this[_1_0_] = a[_1_0_] + b[_1_0_];
		this[_1_1_] = a[_1_1_] + b[_1_1_];
		this[_1_2_] = a[_1_2_] + b[_1_2_];
		this[_1_3_] = a[_1_3_] + b[_1_3_];
		this[_2_0_] = a[_2_0_] + b[_2_0_];
		this[_2_1_] = a[_2_1_] + b[_2_1_];
		this[_2_2_] = a[_2_2_] + b[_2_2_];
		this[_2_3_] = a[_2_3_] + b[_2_3_];
		this[_3_0_] = a[_3_0_] + b[_3_0_];
		this[_3_1_] = a[_3_1_] + b[_3_1_];
		this[_3_2_] = a[_3_2_] + b[_3_2_];
		this[_3_3_] = a[_3_3_] + b[_3_3_];
		
		return this;
	},
	multiply ( inM4A, inM4B = this  ) {
		let a = inM4A;
		let b = inM4B
		
		this[_0_0_] = a[_0_0_] * b[_0_0_] + a[_0_1_] * b[_1_0_] + a[_0_2_] * b[_2_0_] + a[_0_3_] * b[_3_0_];
		this[_0_1_] = a[_0_0_] * b[_0_1_] + a[_0_1_] * b[_1_1_] + a[_0_2_] * b[_2_1_] + a[_0_3_] * b[_3_1_];
		this[_0_2_] = a[_0_0_] * b[_0_2_] + a[_0_1_] * b[_1_2_] + a[_0_2_] * b[_2_2_] + a[_0_3_] * b[_3_2_];
		this[_0_3_] = a[_0_0_] * b[_0_3_] + a[_0_1_] * b[_1_3_] + a[_0_2_] * b[_2_3_] + a[_0_3_] * b[_3_3_];
		this[_1_0_] = a[_1_0_] * b[_0_0_] + a[_1_1_] * b[_1_0_] + a[_1_2_] * b[_2_0_] + a[_1_3_] * b[_3_0_];
		this[_1_1_] = a[_1_0_] * b[_0_1_] + a[_1_1_] * b[_1_1_] + a[_1_2_] * b[_2_1_] + a[_1_3_] * b[_3_1_];
		this[_1_2_] = a[_1_0_] * b[_0_2_] + a[_1_1_] * b[_1_2_] + a[_1_2_] * b[_2_2_] + a[_1_3_] * b[_3_2_];
		this[_1_3_] = a[_1_0_] * b[_0_3_] + a[_1_1_] * b[_1_3_] + a[_1_2_] * b[_2_3_] + a[_1_3_] * b[_3_3_];
		this[_2_0_] = a[_2_0_] * b[_0_0_] + a[_2_1_] * b[_1_0_] + a[_2_2_] * b[_2_0_] + a[_2_3_] * b[_3_0_];
		this[_2_1_] = a[_2_0_] * b[_0_1_] + a[_2_1_] * b[_1_1_] + a[_2_2_] * b[_2_1_] + a[_2_3_] * b[_3_1_];
		this[_2_2_] = a[_2_0_] * b[_0_2_] + a[_2_1_] * b[_1_2_] + a[_2_2_] * b[_2_2_] + a[_2_3_] * b[_3_2_];
		this[_2_3_] = a[_2_0_] * b[_0_3_] + a[_2_1_] * b[_1_3_] + a[_2_2_] * b[_2_3_] + a[_2_3_] * b[_3_3_];		
		this[_3_0_] = a[_3_0_] * b[_0_0_] + a[_3_1_] * b[_1_0_] + a[_3_2_] * b[_2_0_] + a[_3_3_] * b[_3_0_];
		this[_3_1_] = a[_3_0_] * b[_0_1_] + a[_3_1_] * b[_1_1_] + a[_3_2_] * b[_2_1_] + a[_3_3_] * b[_3_1_];
		this[_3_2_] = a[_3_0_] * b[_0_2_] + a[_3_1_] * b[_1_2_] + a[_3_2_] * b[_2_2_] + a[_3_3_] * b[_3_2_];
		this[_3_3_] = a[_3_0_] * b[_0_3_] + a[_3_1_] * b[_1_3_] + a[_3_2_] * b[_2_3_] + a[_3_3_] * b[_3_3_];
		
		return this;
	},

	
	

	addScalar ( inS ) {
		this[_0_0_] += inS; this[_0_1_] += inS; this[_0_2_] += inS; this[_0_3_] += inS;
		this[_1_0_] += inS; this[_1_1_] += inS; this[_1_2_] += inS; this[_1_3_] += inS;
		this[_2_0_] += inS; this[_2_1_] += inS; this[_2_2_] += inS; this[_2_3_] += inS;
		this[_3_0_] += inS; this[_3_1_] += inS; this[_3_2_] += inS; this[_3_3_] += inS;
		
		return this;
	},
	multiplyScalar ( inS ) {
		this[_0_0_] *= inS; this[_0_1_] *= inS; this[_0_2_] *= inS; this[_0_3_] *= inS;
		this[_1_0_] *= inS; this[_1_1_] *= inS; this[_1_2_] *= inS; this[_1_3_] *= inS;
		this[_2_0_] *= inS; this[_2_1_] *= inS; this[_2_2_] *= inS; this[_2_3_] *= inS;
		this[_3_0_] *= inS; this[_3_1_] *= inS; this[_3_2_] *= inS; this[_3_3_] *= inS;
		
		return this;
	},
	
	determinant ( ) {

		let a1 	= this[_0_0_] * this[_1_1_] - this[_0_1_] * this[_1_0_];
		let a2	= this[_0_0_] * this[_1_2_] - this[_0_2_] * this[_1_0_];
		let a3	= this[_0_0_] * this[_1_3_] - this[_0_3_] * this[_1_0_];
		let a4	= this[_0_1_] * this[_1_2_] - this[_0_2_] * this[_1_1_];
		let a5	= this[_0_1_] * this[_1_3_] - this[_0_3_] * this[_1_1_];
		let a6	= this[_0_2_] * this[_1_3_] - this[_0_3_] * this[_1_2_];

		let b1	= this[_2_2_] * this[_3_3_] - this[_2_3_] * this[_3_2_];
		let b2	= this[_2_1_] * this[_3_3_] - this[_2_3_] * this[_3_1_];
		let b3	= this[_2_1_] + this[_3_2_] - this[_2_2_] + this[_3_1_];
		let b4	= this[_2_0_] + this[_3_3_] - this[_2_3_] + this[_3_0_];
		let b5	= this[_2_0_] + this[_3_2_] - this[_2_2_] + this[_3_0_];
		let b6	= this[_2_0_] + this[_3_1_] - this[_2_1_] + this[_3_0_];

		return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
	},
	lookAt ( inV3_eye, inV3_target, inV3_up ) {
		let z = CACHE_VEC3_Z.sub( inV3_eye, inV3_target ).normalize();

		if ( z.getLength() === 0 ) z = z.set( inV3_up );

		let x = CACHE_VEC3_X.cross( inV3_up, z ).normalize();
		
		if( x.getLength() === 0 ) {
			z[_x_] += 0.0001;
			x = x.cross( inV3_up, z ).normalize();
		}

		let y = CACHE_VEC3_Y.cross( z, x );

		this[_0_0_] = x[ 0 ]; this[_0_1_] = x[ 1 ]; this[_0_2_] = x[ 2 ];
		this[_1_0_] = y[ 0 ]; this[_1_1_] = y[ 1 ]; this[_1_2_] = y[ 2 ];
		this[_2_0_] = z[ 0 ]; this[_2_1_] = z[ 1 ]; this[_2_2_] = z[ 2 ];
		
		return this;
	},

	makeIdentity ( ) {
		this[_0_0_] = 1;
		this[_0_1_] = 0;
		this[_0_2_] = 0;
		this[_0_3_] = 0;
		this[_1_0_] = 0;
		this[_1_1_] = 1;
		this[_1_2_] = 0;
		this[_1_3_] = 0;
		this[_2_0_] = 0;
		this[_2_1_] = 0;
		this[_2_2_] = 1;
		this[_2_3_] = 0;
		this[_3_0_] = 0;
		this[_3_1_] = 0;
		this[_3_2_] = 0;
		this[_3_3_] = 1;

		return this;
	},
	makeFrustum ( inS_left, inS_right, inS_bottom, inS_top, inS_near, inS_far ) {
		let x = 2 * inS_near / ( inS_right - inS_left );
		let y = 2 * inS_near / ( inS_top - inS_bottom );
		
		let a = ( inS_right + inS_left ) / ( inS_right - inS_left );
		let b = ( inS_top + inS_bottom ) / ( inS_top - inS_bottom );
		let c = -( inS_far + inS_near ) / ( inS_far - inS_near );
		let d = - 2 * inS_far * inS_near / ( inS_far - inS_near );
		
		this[_0_0_] = x; this[_0_1_] = 0; this[_0_2_] = 0; this[_0_3_] = 0;
		this[_1_0_] = 0; this[_1_1_] = y; this[_1_2_] = 0; this[_1_3_] = 0;
		this[_2_0_] = a; this[_2_1_] = b; this[_2_2_] = c; this[_2_3_] = 1;
		this[_3_0_] = 0; this[_3_1_] = 0; this[_3_2_] = d; this[_3_3_] = 0;
		return this;
	},
	makeOrthographic ( left, right, bottom, top, near, far ) {
		let w = right - left;
		let h = top - bottom;
		let d = far - near;

		let x = ( left + right ) / -w;
		let y = ( top + bottom ) / -h;
		let z = ( near + far ) 	 / -d;

		w =  2 / w;
		h =  2 / h;
		d = -2 / d;

		this[_0_0_] = w; this[_0_1_] = 0; this[_0_2_] = 0; this[_0_3_] = 0;
		this[_1_0_] = 0; this[_1_1_] = h; this[_1_2_] = 0; this[_1_3_] = 0;
		this[_2_0_] = 0; this[_2_1_] = 0; this[_2_2_] = d; this[_2_3_] = 0;
		this[_3_0_] = x; this[_3_1_] = y; this[_3_2_] = z; this[_3_3_] = 1;
		return this;
	},
	makePerspective ( aspect, fov, near, far ) {
		let y = 1.0 / Math.tan( fov / 2 );
		let nf = 1 / ( near - far );
		let x = y / aspect;
		let z = ( far + near ) * nf;
		let d = ( 2 * far * near ) * nf;

		this[_0_0_] = x; this[_0_1_] = 0; this[_0_2_] = 0; this[_0_3_] = 0;
		this[_1_0_] = 0; this[_1_1_] = y; this[_1_2_] = 0; this[_1_3_] = 0;
		this[_2_0_] = 0; this[_2_1_] = 0; this[_2_2_] = z; this[_2_3_] = -1;
		this[_3_0_] = 0; this[_3_1_] = 0; this[_3_2_] = d; this[_3_3_] = 0;
		return this;
	},

	translate ( x = 0, y = 0, z = 0 ) {
		let m = this;
		let a = CACHE_MAT4.set( this );

	 	m[_3_0_]	= a[_0_0_] * x
					+ a[_1_0_] * y
					+ a[_2_0_] * z
					+ a[_3_0_];

		m[_3_1_]	= a[_0_1_] * x
					+ a[_1_1_] * y
					+ a[_2_1_] * z
					+ a[_3_1_];

		m[_3_2_]	= a[_0_2_] * x
					+ a[_1_2_] * y
					+ a[_2_2_] * z
					+ a[_3_2_];

		m[_3_3_] = a[_0_3_] * x
					+ a[_1_3_] * y
					+ a[_2_3_] * z
					+ a[_3_3_];

		return this;
	},
	scale ( x = 1, y = x, z = x ) {
		let m = this;

		m[_0_0_] *= x; m[_0_1_] *= x; m[_0_2_] *= x; m[_0_3_] *= x;
		m[_1_0_] *= y; m[_1_1_] *= y; m[_1_2_] *= y; m[_1_3_] *= y;
		m[_2_0_] *= z; m[_2_1_] *= z; m[_2_2_] *= z; m[_2_3_] *= z;

		return this;
	},
	rotate ( rad = 0, x = 0, y = 0, z = 0 ) {
		let length = Math.sqrt( x * x + y * y + z * z );
		
		if ( Math.abs( length ) < Number.EPSILON ) return mat4.makeIdentity( this );

		let s = Math.sin( rad );
		let c = Math.cos( rad );
		let t = 1 - c;

		length = 1 / length;
		x *= length;
		y *= length;
		z *= length;

		let r = CACHE_MAT3;
		r[ 0 ] = x * x * t + c;		r[ 1 ] = x * y * t + z * s; r[ 2 ] = x * z * t - y * s;
		r[ 3 ] = y * x * t - z * s;	r[ 4 ] = y * y * t + c;		r[ 5 ] = y * z * t + x * s;
		r[ 6 ] = z * x * t + y * s;	r[ 7 ] = z * y * t - x * s;	r[ 8 ] = z * z * t + c;


		let a = CACHE_MAT4.set( this );
		let m = this;
		
		m[_0_0_] = r[ 0 ] * a[_0_0_]
				 + r[ 1 ] * a[_1_0_]
				 + r[ 2 ] * a[_2_0_];

		m[_0_1_] = r[ 0 ] * a[_0_1_]
				 + r[ 1 ] * a[_1_1_]
				 + r[ 2 ] * a[_2_1_];

		m[_0_2_] = r[ 0 ] * a[_0_2_]
				 + r[ 1 ] * a[_1_2_]
				 + r[ 2 ] * a[_2_2_];

		m[_0_3_] = r[ 0 ] * a[_0_3_]
				 + r[ 1 ] * a[_1_3_]
				 + r[ 2 ] * a[_2_3_];

		m[_1_0_] = r[ 3 ] * a[_0_0_]
				 + r[ 4 ] * a[_1_0_]
				 + r[ 5 ] * a[_2_0_];

		m[_1_1_] = r[ 3 ] * a[_0_1_]
				 + r[ 4 ] * a[_1_1_]
				 + r[ 5 ] * a[_2_1_];

		m[_1_2_] = r[ 3 ] * a[_0_2_]
				 + r[ 4 ] * a[_1_2_]
				 + r[ 5 ] * a[_2_2_];

		m[_1_3_] = r[ 3 ] * a[_0_3_]
				 + r[ 4 ] * a[_1_3_]
				 + r[ 5 ] * a[_2_3_];

		m[_2_0_] = r[ 6 ] * a[_0_0_]
				 + r[ 7 ] * a[_1_0_]
				 + r[ 8 ] * a[_2_0_];

		m[_2_1_] = r[ 6 ] * a[_0_1_]
				 + r[ 7 ] * a[_1_1_]
				 + r[ 8 ] * a[_2_1_];

		m[_2_2_] = r[ 6 ] * a[_0_2_]
				 + r[ 7 ] * a[_1_2_]
				 + r[ 8 ] * a[_2_2_];

		m[_2_3_] = r[ 6 ] * a[_0_3_]
				 + r[ 7 ] * a[_1_3_]
				 + r[ 8 ] * a[_2_3_];
		
		return this;
	},
	rotateX ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m1 = CACHE_VEC4A.set( m[ 1 ] );
		let m2 = CACHE_VEC4B.set( m[ 2 ] );

		m[_1_0_] = m1[ 0 ] * c + m2[ 0 ] * s;
		m[_1_1_] = m1[ 1 ] * c + m2[ 1 ] * s;
		m[_1_2_] = m1[ 2 ] * c + m2[ 2 ] * s;
		m[_1_3_] = m1[ 3 ] * c + m2[ 3 ] * s;

		m[_2_0_] = m2[ 0 ] * c - m1[ 0 ] * s;
		m[_2_1_] = m2[ 1 ] * c - m1[ 1 ] * s;
		m[_2_2_] = m2[ 2 ] * c - m1[ 2 ] * s;
		m[_2_3_] = m2[ 3 ] * c - m1[ 3 ] * s;

		return this;
	},
	rotateY ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m0 = CACHE_VEC4A.set( m[ 0 ] );
		let m2 = CACHE_VEC4B.set( m[ 2 ] );

		m[_2_0_] = m0[ 0 ] * c + m2[ 0 ] * s;
		m[_2_1_] = m0[ 1 ] * c + m2[ 1 ] * s;
		m[_2_2_] = m0[ 2 ] * c + m2[ 2 ] * s;
		m[_2_3_] = m0[ 3 ] * c + m2[ 3 ] * s;

		m[_0_0_] = m2[ 0 ] * c - m0[ 0 ] * s;
		m[_0_1_] = m2[ 1 ] * c - m0[ 1 ] * s;
		m[_0_2_] = m2[ 2 ] * c - m0[ 2 ] * s;
		m[_0_3_] = m2[ 3 ] * c - m0[ 3 ] * s;

		return this;
	},
	rotateZ ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m0 = CACHE_VEC4A.set( m[ 0 ] );
		let m2 = CACHE_VEC4B.set( m[ 1 ] );

		m[_0_0_] = m0[ 0 ] * c + m2[ 0 ] * s;
		m[_0_1_] = m0[ 1 ] * c + m2[ 1 ] * s;
		m[_0_2_] = m0[ 2 ] * c + m2[ 2 ] * s;
		m[_0_3_] = m0[ 3 ] * c + m2[ 3 ] * s;

		m[_1_0_] = m2[ 0 ] * c - m0[ 0 ] * s;
		m[_1_1_] = m2[ 1 ] * c - m0[ 1 ] * s;
		m[_1_2_] = m2[ 2 ] * c - m0[ 2 ] * s;
		m[_1_3_] = m2[ 3 ] * c - m0[ 3 ] * s;

		return this;
	},
	rotateQuat4 ( quat ) {
		let two = CACHE_VEC4.set( quat ).multiplyScalar( 2 );
		let m = this;

		let xx = quat[_x_] * two[_x_], xy = quat[_x_] * two[_y_], xz = quat[_x_] * two[_z_];
		let yy = quat[_y_] * two[_y_], yz = quat[_y_] * two[_z_], zz = quat[_z_] * two[_z_];
		let wx = quat[_w_] * two[_x_], wy = quat[_w_] * two[_y_], wz = quat[_w_] * two[_z_];

		m[_0_0_] = 1 - (yy + zz);
		m[_0_1_] = xy + wz;
		m[_0_2_] = xz - wy;

		m[_1_0_] = xy - wz;
		m[_1_1_] = 1 - (xx + zz);
		m[_1_2_] = yz + wx;

		m[_2_0_] = xz + wy;
		m[_2_1_] = yz-wx;
		m[_2_2_] = 1 - (xx + yy);

		return this;
	},

	makeTranslation ( x = 0, y = 0, z = 0 ) {
		let m = this;
		m[_0_0_] = 1; 	m[_0_1_] = 0; 	m[_0_2_] = 0; 	m[_0_3_] = 0;
		m[_1_0_] = 0; 	m[_1_1_] = 1; 	m[_1_2_] = 0; 	m[_1_3_] = 0;
		m[_2_0_] = 0; 	m[_2_1_] = 0; 	m[_2_2_] = 1; 	m[_2_3_] = 0;
		m[_3_0_] = x;	m[_3_1_] = y;	m[_3_2_] = z;	m[_3_3_] = 1;
		return this;
	},
	makeScale ( x = 1, y = x, z = x ) {
		let m = this;
		m[_0_0_] = x; 	m[_0_1_] = 0; 	m[_0_2_] = 0; 	m[_0_3_] = 0;
		m[_1_0_] = 0; 	m[_1_1_] = y; 	m[_1_2_] = 0; 	m[_1_3_] = 0;
		m[_2_0_] = 0; 	m[_2_1_] = 0; 	m[_2_2_] = z; 	m[_2_3_] = 0;
		m[_3_0_] = 0;	m[_3_1_] = 0;	m[_3_2_] = 0;	m[_3_3_] = 1;
		return this;
	},
	makeRotation ( rad, x, y, z ) {
		
		let s = Math.sin( rad );
		let c = Math.cos( rad );
		let t = 1 - c;
		let length = Math.sqrt( x * x + y * y + z * z );

		if ( length < Number.EPSILON ) return this.makeIdentity();

		length = 1 / length;
		x *= length;
		y *= length;
		z *= length;

		let r = CACHE_MAT3;

		r[ 0 ] = x * x * t + c; 	r[ 1 ] = x * y * t + z * s; r[ 2 ] = x * z * t - y * s;
		r[ 3 ] = y * x * t - z * s;	r[ 4 ] = y * y * t + c;		r[ 5 ] = y * z * t + x * s;
		r[ 6 ] = z * x * t + y * s;	r[ 7 ] = z * y * t - x * s;	r[ 8 ] = z * z * t + c;
		
		let m = this;

		m[_0_0_] = r[ 0 ]; 	m[_0_1_] = r[ 1 ]; 	m[_0_2_] = r[ 2 ]; 	m[_0_3_] = 0;
		m[_1_0_] = r[ 3 ]; 	m[_1_1_] = r[ 4 ]; 	m[_1_2_] = r[ 5 ]; 	m[_1_3_] = 0;
		m[_2_0_] = r[ 6 ]; 	m[_2_1_] = r[ 7 ]; 	m[_2_2_] = r[ 8 ]; 	m[_2_3_] = 0;
		m[_3_0_] = 0;		m[_3_1_] = 0;		m[_3_2_] = 0;		m[_3_3_] = 1;
		
		return this;
	},
	makeRotationX ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;

		m[_0_0_] = 1; 	m[_0_1_] = 0; 	m[_0_2_] = 0; 	m[_0_3_] = 0;
		m[_1_0_] = 0; 	m[_1_1_] = c; 	m[_1_2_] = -s; 	m[_1_3_] = 0;
		m[_2_0_] = 0; 	m[_2_1_] = s; 	m[_2_2_] = c; 	m[_2_3_] = 0;
		m[_3_0_] = 0;	m[_3_1_] = 0;	m[_3_2_] = 0;	m[_3_3_] = 1;
		
		return this;
	},
	makeRotationY ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		m[_0_0_] = c; 	m[_0_1_] = 0; 	m[_0_2_] = s; 	m[_0_3_] = 0;
		m[_1_0_] = 0; 	m[_1_1_] = 1; 	m[_1_2_] = 0; 	m[_1_3_] = 0;
		m[_2_0_] = -s; 	m[_2_1_] = 0; 	m[_2_2_] = c; 	m[_2_3_] = 0;
		m[_3_0_] = 0;	m[_3_1_] = 0;	m[_3_2_] = 0;	m[_3_3_] = 1;
		
		return this;
	},
	makeRotationZ ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		m[_0_0_] = c; 	m[_0_1_] = -s; 	m[_0_2_] = 0; 	m[_0_3_] = 0;
		m[_1_0_] = s; 	m[_1_1_] = c; 	m[_1_2_] = 0; 	m[_1_3_] = 0;
		m[_2_0_] = 0; 	m[_2_1_] = 0; 	m[_2_2_] = 1; 	m[_2_3_] = 0;
		m[_3_0_] = 0;	m[_3_1_] = 0;	m[_3_2_] = 0;	m[_3_3_] = 1;
		
		return this;
	},
	makeRotationQuat4 ( quat ) {
		let two = CACHE_VEC4.set( quat ).multiplyScalar( 2 );
		
		let xx = quat[_x_] * two[_x_], xy = quat[_x_] * two[_y_], xz = quat[_x_] * two[_z_];
		let yy = quat[_y_] * two[_y_], yz = quat[_y_] * two[_z_], zz = quat[_z_] * two[_z_];
		let wx = quat[_w_] * two[_x_], wy = quat[_w_] * two[_y_], wz = quat[_w_] * two[_z_];

		let m = this;
		
		m[_0_0_] = 1 - (yy + zz); 	m[_0_1_] = xy + wz; 		m[_0_2_] = xz - wy; 		m[_0_3_] = 0;
		m[_1_0_] = xy - wz; 		m[_1_1_] = 1 - (xx + zz); 	m[_1_2_] = yz + wx; 		m[_1_3_] = 0;
		m[_2_0_] = xz + wy; 		m[_2_1_] = yz-wx; 			m[_2_2_] = 1 - (xx + yy); 	m[_2_3_] = 0;
		m[_3_0_] = 0;				m[_3_1_] = 0;				m[_3_2_] = 0;				m[_3_3_] = 1;
		
		return this;
	}
});

const CACHE_MAT3 = new mat3;
const CACHE_MAT4 = new mat4;

const CACHE_VEC4 = new vec4;
const CACHE_VEC4A = new vec4;
const CACHE_VEC4B = new vec4;

const CACHE_VEC3_X = new vec3;
const CACHE_VEC3_Y = new vec3
const CACHE_VEC3_Z = new vec3;