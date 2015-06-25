import { Properties, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class vec2 {

	constructor ( x, y ) {
		this[ 0 ] = x || 0;
		this[ 1 ] = y || 0;
	}
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	}

	static set ( outV2, inV2 ) {
		return vec2.prototype.set.call( outV2, inV2 );
	}
	static setValues ( outV2, x, y ) {
		return vec2.prototype.setValues.call( outV2, x, y );
	}
	

	static add ( outV2, inV2 ) {
		return vec2.prototype.add.call( outV2, inV2 );
	}
	static sub ( outV2, inV2 ) {
		return vec2.prototype.sub.call( outV2, inV2 );
	}
	static multiply ( outV2, inV2 ) {
		return vec2.prototype.multiply.call( outV2, inV2 );
	}
	static divide ( outV2, inV2 ) {
		return vec2.prototype.divide.call( outV2, inV2 );
	}

	static dot ( vA, vB ) { 
		return vA[ 0 ] * vB[ 0 ] + vA[ 1 ] * vB[ 1 ]; 
	}
	static addScalar ( outV2, inS ) {
		return vec2.prototype.addScalar.call( outV2, inS );
	}
	static multiplyScalar ( outV2, inS ) {
		return vec2.prototype.multiplyScalar.call( outV2, inS );
	}

	static lerp ( outV2, inV, inS ) {
		return vec2.prototype.lerp.call( outV2, inV, inS );
	}
	static normalize ( outV2 ) {
		return vec2.prototype.normalize.call( outV2 );
	}

	static getLength ( inV2 ) {
		return vec2.prototype.getLength.call( inV2 );
	}
	static getLengthSq ( inV2 ) {
		return vec2.prototype.getLengthSq.call( inV2 );
	}
	static getLengthManhattan ( inV2 ) {
		return vec2.prototype.getLengthManhattan.call( inV2 );
	}
}
Properties( vec2.prototype, {
	length : 2,

	set ( vA ) {
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		return this;	
	},
	setValues ( x, y ) {
		this[ 0 ] = x;
		this[ 1 ] = y;
		return this;
	},
	

	add ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] + vB[ 0 ];
		this[ 1 ] = vA[ 1 ] + vB[ 1 ];
		return this;
	},
	sub ( vA, vB = this ) {
		this[ 0 ] = vB[ 0 ] - vA[ 0 ];
		this[ 1 ] = vB[ 1 ] - vA[ 1 ];
		return this;
	},
	multiply ( vA, vB = this ) {
		let v = this;
		
		
		v[ 0 ] = vA[ 0 ] * vB[ 0 ];
		v[ 1 ] = vA[ 1 ] * vB[ 1 ];
			
		return this;
	},
	divide ( vA, vB = this ) {
		let v = this;
		
		
		v[ 0 ] = vA[ 0 ] / vB[ 0 ];
		v[ 1 ] = vA[ 1 ] / vB[ 1 ];
			
		return this;
	},

	dot ( vA ) {
		return vec2.dot( this, vA );
	},
	addScalar ( s ) {
		this[ 0 ] += s;
		this[ 1 ] += s;
		return this;
	},
	multiplyScalar ( s ) {
		this[ 0 ] *= s;
		this[ 1 ] *= s;
		return this;
	},

	lerp ( inV2, alpha ) {
		this[ 0 ] += ( inV2[ 0 ] - this[ 0 ] ) * alpha;
		this[ 1 ] += ( inV2[ 1 ] - this[ 1 ] ) * alpha;
		return this;
	},
	normalize ( ) {
		let length = vec2.getLength( this );
		if ( length === 0 ) return this;
		else return vec2.multiplyScalar( this, 1 / length );
	},

	getLength ( ) {
		return Math.sqrt( this[ 0 ] * this[ 0 ] + this[ 1 ] * this[ 1 ] );	
	},
	getLengthSq ( ) {
		return this[ 0 ] * this[ 0 ] + this[ 1 ] * this[ 1 ];	
	},
	getLengthManhattan ( ) {
		return Math.abs( this[ 0 ] ) + Math.abs( this[ 1 ] );
	}
});