import { Properties, E, C, W } from "../utilities/PropertyDescriptors.js";

import vec4 from "./vec4.js";

export default class quat4 {
	constructor ( x = 0, y = 0, z = 0, w = 1 ) {
		this[ 0 ] = x;
		this[ 1 ] = y;
		this[ 2 ] = z;
		this[ 3 ] = w;
	}
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	}

	static set ( outV4, inV4 ) {
		return quat4.prototype.set.call( outV4, inV4 );
	}
	static setValues ( outV4, x, y, z, w ) {
		return quat4.prototype.setValues.call( outV4, x, y, z, w );
	}
	
	static identity ( outV4 ) {
		return quat4.prototype.identity.call( outV4 );
	}
	static multiply ( outV4, inV4 ) {
		return quat4.prototype.multiply.call( outV4, inV4 );
	}
	static normalize ( outV4 ) {
		return quat4.prototype.normalize.call( outV4 );
	}
	static axisAngle ( outV4, inAxisV3, inAngleS ) {
		return quat4.prototype.axisAngle.call( outV4, inAxisV3, inAngleS );
	}
	static conjugate ( outV4 ) {
		return quat4.prototype.conjugate.call( outV4 );
	}
}
const CACHE_QUAT4 = new quat4;
Properties( quat4.prototype, {
	length : 4,

	set ( inV4 ) {
		this[ 0 ] = inV4[ 0 ];
		this[ 1 ] = inV4[ 1 ];
		this[ 2 ] = inV4[ 2 ];
		this[ 3 ] = inV4[ 3 ];
		return this;
	},
	setValues ( x, y, z, w ) {
		this[ 0 ] = x;
		this[ 1 ] = y;
		this[ 2 ] = z;
		this[ 3 ] = w;
		return this;
	},
	
	identity ( ) {
		this[ 0 ] = 0;
		this[ 1 ] = 0;
		this[ 2 ] = 0;
		this[ 3 ] = 1;
		return this;
	},
	multiply ( qA, qB = CACHE_QUAT4.copy( this ) ) {
		this[ 0 ]	= qB[ 0 ] * qA[ 3 ] 
					+ qB[ 3 ] * qA[ 0 ]
					+ qB[ 1 ] * qA[ 2 ]
					- qB[ 2 ] * qA[ 1 ]
					;
		this[ 1 ] 	= qB[ 1 ] * qA[ 3 ]
					+ qB[ 3 ] * qA[ 1 ]
					+ qB[ 2 ] * qA[ 0 ]
					- qB[ 0 ] * qA[ 2 ]
					;
		this[ 2 ] 	= qB[ 2 ] * qA[ 3 ]
					+ qB[ 3 ] * qA[ 2 ]
					+ qB[ 0 ] * qA[ 1 ]
					- qB[ 1 ] * qA[ 0 ]
					;
		this[ 3 ]	= qB[ 3 ] * qA[ 3 ]
					- qB[ 3 ] * qA[ 0 ]
					- qB[ 1 ] * qA[ 1 ]
					- qB[ 2 ] * qA[ 2 ]
					;
		return this;
	},
	normalize ( ) {
		let l = vec4.prototype.getLength.call( this );
		if( l === 0 ) return quat4.identity( this );
		else return quat4.multiplyScalar( this, 1 / l );
	},
	conjugate ( ) {
		this[ 0 ] *= -1;
		this[ 1 ] *= -1;
		this[ 2 ] *= -1;
		return this;
	},
	axisAngle ( inAxisV3, inAngleS ) {
		let a = inAngleS * .5;
		let s = Math.sin( a );
		let c = Math.cos( a );

		this[ 0 ] = inAxisV3[ 0 ] * s;
		this[ 1 ] = inAxisV3[ 1 ] * s;
		this[ 2 ] = inAxisV3[ 2 ] * s;
		this[ 3 ] = c;

		return this;
	}
});	