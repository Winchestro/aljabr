import { Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class Vector {
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	}
	static set ( outV, ...args ) {
		return Vector.prototype.set.call( outV, ...args );
	}
	static copy ( outV, inV ) {
		return Vector.prototype.copy.call( outV, inV );
	}

	static add ( outV, inV ) {
		return Vector.prototype.add.call( outV, inV );
	}
	static sub ( outV, inV ) {
		return Vector.prototype.sub.call( outV, inV );
	}
	static multiply ( outV, inV ) {
		return Vector.prototype.multiply.call( outV, inV );
	}
	static divide ( outV, inV ) {
		return Vector.prototype.divide.call( outV, inV );
	}

	static dot ( outV, inV ) {
		return Vector.prototype.dot.call( outV, inV );
	}
	static addScalar ( outV, inS ) {
		return Vector.prototype.addScalar.call( outV, inS );
	}
	static multiplyScalar ( outV, inS ) {
		return Vector.prototype.multiplyScalar.call( outV, inS );
	}

	static lerp ( outV, inV, inS ) {
		return Vector.prototype.lerp.call( outV, inV, inS );
	}
	static normalize ( outV ) {
		return Vector.prototype.normalize.call( outV );
	}
	
	static getLength ( inV ) {
		return Vector.prototype.getLength.call( inV );
	}
	static getLengthSq ( inV ) {
		return Vector.prototype.getLengthSq.call( inV );
	}
	static getLengthManhattan ( inV ) {
		return Vector.prototype.getLengthManhattan.call( inV );
	}
}
Properties( Vector.prototype, {
	splice : [].splice,

	set ( ...values ) {
		for ( let i in values ) this[ i ] = values[ i ];
	},
	copy ( vA ) {
		for ( let i in vA ) this[ i ] = vA[ i ];
	},

	add ( vA ) {
		for ( let i in vA ) this[ i ] += vA[ i ];
		return this;
	},
	sub ( vA ) {
		for ( let i in vA ) this[ i ] -= vA[ i ];
		return this;
	},
	multiply ( vA ) {
		for ( let i in vA ) this[ i ] *= vA[ i ];
		return this;
	},
	divide ( vA ) {
		for ( let i in vA ) this[ i ] /= vA[ i ];
		return this;
	},

	dot ( vA ) {
		return [].reduce.call( this, function ( p, c, i ) {
			return p += c * vA[ i ];
		}, 0 );
	},
	addScalar ( s ) {
		for ( let i in this ) this[ i ] += s;
		return this;
	},
	multiplyScalar ( s ) {
		for ( let i in this ) this[ i ] *= s;
		return this;
	},
	
	lerp ( vA, s ) {
		for ( let i in this ) this[ i ] += ( vA[ i ] - this[ i ] ) * s;
		return this;
	},
	normalize ( ) {
		const length = Vector.getLength( this );
		if( length === 0 ) return this;
		else Vector.multiplyScalar( this, 1 / l );
		return this;
	},

	getLength ( ) {
		return Math.sqrt( Vector.getLengthSq( this ) );	
	},
	getLengthSq ( ) {
		return [].reduce.call( this, function ( p, c ) { 
			return p += c * c
		}, 0 );	
	},
	getLengthManhattan ( ) {
		return [].reduce.call( this, function ( p, c ) {
			return p += Math.abs( c );
		}, 0 );
	}
});

/*
	[ "x", "y", "z", "w" ].map( function ( ex, x, a ) {
		var getter = "return this["+x+"];";
		var setter = "this["+x+"] = v;";
		if ( x < 2 ) $( vec2, a[x], getter, setter );
		if ( x < 3 ) $( vec3, a[x], getter, setter );
		$( vec4, a[x], getter, setter );
		$( quat4, a[x], getter, setter );
		 	swizzle is super expensive to set up until ES6 Proxies -> 
			7ms to define one property (ok)
			200-1000ms to define all combinations. (unaccaptable)
			with Proxies this won't be a problem any more

		return a.map(function(ey,y){
			var getter = "return new this.vec2(this["+x+"],this["+y+"]);";
			var setter = "this["+x+"]=v[0];this["+y+"]=v[1];";
			if(x<2&&y<2)$(vec2,a[x]+a[y],getter,setter);
			if(x<3&&y<3)$(vec3,a[x]+a[y],getter,setter);
			$(vec4,a[x]+a[y],getter,setter);        
			return a.map(function(ez,z){
				var getter = "return new this.vec3(this["+x+"],this["+y+"],this["+z+"]);";
				var setter = "this["+x+"]=v[0];this["+y+"]=v[1];this["+z+"]=v[2];";
				if(x<2&&y<2&&z<2)$(vec2,a[x]+a[y]+a[z],getter,setter);
				if(x<3&&y<3&&z<3)$(vec3,a[x]+a[y]+a[z],getter,setter);
				$(vec4,a[x]+a[y]+a[z],getter,setter);
				return a.map(function(ew,w){
					var getter = "return new this.vec4(this["+x+"],this["+y+"],this["+z+"],this["+w+"]);";
					var setter = "this["+x+"]=v[0];this["+y+"]=v[1];this["+z+"]=v[2];this["+w+"]=v[3];";
					if(x<2&&y<2&&z<2&&w<2)$(vec2,a[x]+a[y]+a[z]+a[w],getter,setter);
					if(x<3&&y<3&&z<3&&w<3)$(vec3,a[x]+a[y]+a[z]+a[w],getter,setter);
					$(vec4,a[x]+a[y]+a[z]+a[w],getter,setter);
				})
			})
		})
		
		function $( constructor, property, getter, setter ) {
			Object.defineProperty( constructor.prototype, property, {
				get : new Function( getter ),
				set : new Function( "v",setter )
			} );
		}
	} );
*/