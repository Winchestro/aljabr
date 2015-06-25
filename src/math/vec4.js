import { Properties, E, C, W } from "../utilities/PropertyDescriptors.js";

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;

export default class vec4 {
	constructor ( sX, sY, sZ, sW ) {
		this[_x_] = sX || 0;
		this[_y_] = sY || 0;
		this[_z_] = sZ || 0;
		this[_w_] = sW || 0;
	}
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	}

	static set ( outV4, inV4 ) {
		return vec4.prototype.set.call( outV4, inV4 );
	}
	static setValues ( outV4, sX, sY, sZ, sW ) {
		return vec4.prototype.setValues.call( outV4, sX, sY, sZ, sW );
	}
	

	static add ( outV4, inV4 ) {
		return vec4.prototype.add.call( outV4, inV4 );
	}
	static sub ( outV4, inV4 ) {
		return vec4.prototype.sub.call( outV4, inV4);
	}
	static multiply ( outV4, inV4 ) {
		return vec4.prototype.multiply.call( outV4, inV4 );
	}
	static divide ( outV4, inV4 ) {
		return vec4.prototype.divide.call( outV4, inV4 );
	}

	static dot ( inV4_A, inV4_B ) {
		return ( inV4_A[_x_] * inV4_B[_x_]
			   + inV4_A[_y_] * inV4_B[_y_]
			   + inV4_A[_z_] * inV4_B[_z_]
			   + inV4_A[_w_] * inV4_B[_w_]
		);
	}
	static addScalar ( outV4, inS ) {
		return vec4.prototype.addScalar.call( outV4, inS );
	}
	static multiplyScalar ( outV4, inS ) {
		return vec4.prototype.multiplyScalar.call( outV4, inS );
	}

	static lerp ( outV4, inV4, inS ) {
		return vec4.prototype.lerp.call( outV4, inV4, inS );
	}
	static normalize ( outV4 ) {
		return vec4.prototype.normalize.call( outV4 );
	}

	static getLength ( inV4 ) {
		return vec4.prototype.getLength.call( inV4 );
	}
	static getLengthSq ( inV4 ) {
		return vec4.prototype.getLengthSq.call( inV4 );
	}
	static getLengthManhattan ( inV4 ) {
		return vec4.prototype.getLengthManhattan.call( inV4 );
	}
}
Properties( vec4.prototype, {
	length : 4,

	set ( inV4 ) {
		this[_x_] = inV4[_x_];
		this[_y_] = inV4[_y_];
		this[_z_] = inV4[_z_];
		this[_w_] = inV4[_w_];
		return this;	
	},
	setValues ( sX, sY, sZ, sW ) {
		this[_x_] = sX;
		this[_y_] = sY;
		this[_z_] = sZ;
		this[_w_] = sW;
		return this;
	},
	

	add ( inV4_A, inV4_B = this ) {
		this[_x_] = inV4_A[_x_] + inV4_B[_x_];
		this[_y_] = inV4_A[_y_] + inV4_B[_y_];
		this[_z_] = inV4_A[_z_] + inV4_B[_z_];
		this[_w_] = inV4_A[_w_] + inV4_B[_w_];
		return this;
	},
	sub ( inV4_A, inV4_B = this ) {
		this[_x_] = inV4_B[_x_] - inV4_A[_x_];
		this[_y_] = inV4_B[_y_] - inV4_A[_y_];
		this[_z_] = inV4_B[_z_] - inV4_A[_z_];
		this[_w_] = inV4_B[_w_] - inV4_A[_w_];
		return this;
	},
	multiply ( inV4_A, inV4_B = this ) {
		this[_x_] = inV4_A[_x_] * inV4_B[_x_];
		this[_y_] = inV4_A[_y_] * inV4_B[_y_];
		this[_z_] = inV4_A[_z_] * inV4_B[_z_];
		this[_w_] = inV4_A[_w_] * inV4_B[_w_];
		return this;
	},
	divide ( inV4_A, inV4_B = this ) {
		this[_x_] = inV4_A[_x_] / inV4_B[_x_];
		this[_y_] = inV4_A[_y_] / inV4_B[_y_];
		this[_z_] = inV4_A[_z_] / inV4_B[_z_];
		this[_w_] = inV4_A[_w_] / inV4_B[_w_];
		return this;
	},

	dot ( inV4 ) {
		return vec4.dot( this, inV4 );
	},
	addScalar ( s, inV4 = this ) {
		this[_x_] = inV4[_x_] + s;
		this[_y_] = inV4[_y_] + s;
		this[_z_] = inV4[_z_] + s;
		this[_w_] = inV4[_w_] + s;
		return this
	},
	multiplyScalar ( s, inV4 = this ) {
		this[_x_] = inV4[_x_] * s;
		this[_y_] = inV4[_y_] * s;
		this[_z_] = inV4[_z_] * s;
		this[_w_] = inV4[_w_] * s;
		return this
	},

	lerp ( inV4_A, sAlpha, inV4_B = this ) {
		this[_x_] = ( inV4_A[_x_] - inV4_B[_x_] ) * sAlpha;
		this[_y_] = ( inV4_A[_y_] - inV4_B[_y_] ) * sAlpha;
		this[_z_] = ( inV4_A[_z_] - inV4_B[_z_] ) * sAlpha;
		this[_w_] = ( inV4_A[_w_] - inV4_B[_w_] ) * sAlpha;
		return this;
	},
	normalize ( ) {
		let length = vec4.getLength( this );
		if ( length === 0 ) return this;
		else return vec4.multiplyScalar( this, 1 / length );
	},

	getLength ( ) {
		return Math.sqrt(
			this[_x_] * this[_x_] +
			this[_y_] * this[_y_] +
			this[_z_] * this[_z_] +
			this[_w_] * this[_w_]
		);	
	},
	getLengthSq ( ) {
		return (
			this[_x_] * this[_x_] + 
			this[_y_] * this[_y_] + 
			this[_z_] * this[_z_] + 
			this[_w_] * this[_w_]
		);
	},
	getLengthManhattan ( ) {
		return ( 
			Math.abs( this[_x_] ) + 
			Math.abs( this[_y_] ) + 
			Math.abs( this[_z_] ) + 
			Math.abs( this[_w_] )
		);
	},
});