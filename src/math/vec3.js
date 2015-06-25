import { Properties, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class vec3 {
	constructor ( x, y, z ) {
		this[ 0 ] = x || 0;
		this[ 1 ] = y || 0;
		this[ 2 ] = z || 0;
	}
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	}

	static set ( outV3, inV3 ) {
		return vec3.prototype.set.call( outV3, inV3 );
	}
	static setValues ( outV3, x, y, z ) {
		return vec3.prototype.setValues.call( outV3, x, y, z );
	}
	

	static add ( outV3, inV3 ) {
		return vec3.prototype.add.call( outV3, inV3 );
	}
	static sub ( outV3, inV3 ) {
		return vec3.prototype.sub.call( outV3, inV3 );
	}
	static multiply ( outV3, inV3 ) {
		return vec3.prototype.multiply.call( outV3, inV3 );
	}
	static divide ( outV3, inV3 ) {
		return vec3.prototype.divide.call( outV3, inV3 );
	}

	static cross ( outV3, inV3 ) {
		return vec3.prototype.cross.call( outV3, inV3 );
	}
	static dot ( vA, vB ) {
		return s = vA[ 0 ] * vB[ 0 ] + vA[ 1 ] * vB[ 1 ] + vA[ 2 ] * vB[ 2 ];
	}
	static addScalar ( outV3, inS ) {
		return vec3.prototype.addScalar.call( outV3, inS );
	}
	static multiplyScalar ( outV3, inS ) {
		return vec3.prototype.multiplyScalar.call( outV3, inS );
	}

	static lerp ( outV3, inV3, inS ) {
		return vec3.prototype.lerp.call( outV3, inV3, inS );
	}
	static normalize ( outV3 ) {
		return vec3.prototype.normalize.call( outV3 );
	}
	static applyQuat4 ( outV3, inQ4 ) {
		return vec3.prototype.applyQuat4.call( outV3, inQ4 );
	}

	static getLength ( inV3 ) {
		return vec3.prototype.getLength.call( inV3 );
	}
	static getLengthSq ( inV3 ) {
		return vec3.prototype.getLengthSq.call( inV3 );
	}
	static getLengthManhattan ( inV3 ) {
		return vec3.prototype.getLengthManhattan.call( inV3 );
	}
}
const CACHE_VEC3 = new vec3;
Properties( vec3.prototype, {
	length : 3,

	set ( vA ) {
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		this[ 2 ] = vA[ 2 ];
		return this;	
	},
	setValues ( x, y, z ) {	
		this[ 0 ] = x;
		this[ 1 ] = y;
		this[ 2 ] = z;	
		return this;
	},
	

	add ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] + vB[ 0 ];
		this[ 1 ] = vA[ 1 ] + vB[ 1 ];
		this[ 2 ] = vA[ 2 ] + vB[ 2 ];
		return this;
	},
	sub ( vA, vB = this ) {
		this[ 0 ] = vB[ 0 ] - vA[ 0 ];
		this[ 1 ] = vB[ 1 ] - vA[ 1 ];
		this[ 2 ] = vB[ 2 ] - vA[ 2 ];
		return this;
	},
	multiply ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] * vB[ 0 ];
		this[ 1 ] = vA[ 1 ] * vB[ 1 ];
		this[ 2 ] = vA[ 2 ] * vB[ 2 ];
		return this;
	},
	divide ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] / vB[ 0 ];
		this[ 1 ] = vA[ 1 ] / vB[ 1 ];
		this[ 2 ] = vA[ 2 ] / vB[ 2 ];
		return this;
	},

	dot ( inV3A, inV3B = this ) {
		return vec3.dot ( inV3A, inV3B );
	},
	cross ( inV3A, inV3B = CACHE_VEC3.copy( this ) ) {
		let vA = inV3A;
		let vB = inV3B;

		this[ 0 ] = vA[ 1 ] * vB[ 2 ] - vA[ 2 ] * vB[ 1 ];
		this[ 1 ] = vA[ 2 ] * vB[ 0 ] - vA[ 0 ] * vB[ 2 ];
		this[ 2 ] = vA[ 0 ] * vB[ 1 ] - vA[ 1 ] * vB[ 0 ];	
		return this;
	},
	addScalar ( inS, inV3 = this ) {
		this[ 0 ] = inV3[ 0 ] + inS;
		this[ 1 ] = inV3[ 1 ] + inS;
		this[ 2 ] = inV3[ 2 ] + inS;
		return this
	},
	multiplyScalar ( inS, inV3 = this ) {
		this[ 0 ] = inV3[ 0 ] * inS;
		this[ 1 ] = inV3[ 1 ] * inS;
		this[ 2 ] = inV3[ 2 ] * inS;
		return this
	},


	lerp ( inV3A, inS, inV3B = this ) {
		let vA = inV3A;
		let vB = inV3B;
		let alpha = inS;

		this[ 0 ] += ( vA[ 0 ] - vB[ 0 ] ) * alpha;
		this[ 1 ] += ( vA[ 1 ] - vB[ 1 ] ) * alpha;
		this[ 2 ] += ( vA[ 2 ] - vB[ 2 ] ) * alpha;
		return this;
	},
	normalize ( ) {
		let length = vec3.getLength( this );
		if ( length === 0 ) return this;
		else return vec3.multiplyScalar( this, 1 / length );
	},
	applyQuat4 ( inQ4, inV3 = CACHE_VEC3.copy( this ) ) {
		let q = inQ4;
		let v = inV3;

		let x = q[ 3 ] * v[ 0 ] + q[ 1 ] * v[ 2 ] - q[ 2 ] * v[ 1 ];
		let y = q[ 3 ] * v[ 1 ] + q[ 2 ] * v[ 0 ] - q[ 0 ] * v[ 2 ];
		let z = q[ 3 ] * v[ 2 ] + q[ 0 ] * v[ 1 ] - q[ 1 ] * v[ 0 ];
		let w = q[ 0 ] * v[ 0 ] - q[ 1 ] * v[ 1 ] - q[ 2 ] * v[ 2 ];

		this[ 0 ] = x * q[ 3 ] + w * -q[ 0 ] + y * -q[ 2 ] - z * -q[ 1 ];
		this[ 1 ] = y * q[ 3 ] + w * -q[ 1 ] + z * -q[ 0 ] - x * -q[ 2 ];
		this[ 2 ] = z * q[ 3 ] + w * -q[ 2 ] + x * -q[ 1 ] - y * -q[ 0 ];
		
		return this;
	},
	
	getLength ( ) {
		return Math.sqrt(
			this[ 0 ] * this[ 0 ] +
			this[ 1 ] * this[ 1 ] +
			this[ 2 ] * this[ 2 ]
		);	
	},
	getLengthSq ( ) {
		return ( 
			this[ 0 ] * this[ 0 ] +
			this[ 1 ] * this[ 1 ] +
			this[ 2 ] * this[ 2 ]
		);
	},
	getLengthManhattan ( ) {
		return (
			Math.abs( this[ 0 ] ) +
			Math.abs( this[ 1 ] ) +
			Math.abs( this[ 2 ] )
		);
	}
});
Properties( vec3, {
	UP 		: new vec3(  0,  1,  0 ),
	DOWN 	: new vec3(  0, -1,  0 ),
	RIGHT 	: new vec3(  1,  0,  0 ),
	LEFT 	: new vec3( -1,  0,  0 ),
	AHEAD 	: new vec3(  0,  0,  1 ),
	BACK 	: new vec3(  0,  0, -1 ),
});