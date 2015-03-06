import { Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";

export default class Vector {
	constructor ( ) {
		this.length = 0;
		[].push.apply( this, arguments );
		Object.defineProperty( this, "length", { value : arguments.length } );
	}
	*[Symbol.iterator] ( ) {
		let index = 0;
		while ( index < this.length ) yield this[ index++ ];
	};
	static clone ( vA ) {
		return new Vector( vA );
	}
}
Properties( Vector.prototype, {
	splice : [].splice,
	clone ( ) {
		return new this.constructor().set( this );
	},
	set ( vA ) {
		for ( var i in vA ) this[ i ] = vA[ i ];
	},
	add ( vA ) {
		for ( var i in vA ) this[ i ] += vA[ i ];
		return this;
	},
	sub ( vA ) {
		for ( var i in vA ) this[ i ] -= vA[ i ];
		return this;
	},
	multiply ( vA ) {
		for ( var i in vA ) this[ i ] *= vA[ i ];
		return this;
	},
	multiplyScalar ( s ) {
		for ( var i in this ) this[ i ] *= s;
		return this;
	},
	lerp ( vA, s ) {
		for ( var i in this ) this[ i ] += ( vA[ i ] - this[ i ] ) * s;
		return this;
	},
	dot ( vA ) {
		return [].reduce.call( this, function ( p, c, i ) {
			return p += c * vA[ i ];
		}, 0 );
	},
	normalize ( ) {
		const l = this.vectorLength;
		if( l === 0 ) return this;
		else this.multiplyScalar( 1 / l );
		return this;
	}
});
Getters( Vector.prototype, {
	getLength ( ) {
		return Math.sqrt( this.getLengthSq );	
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


export class vec2 extends Vector {
	constructor ( x, y ) {
		Object.defineProperty ( this, "length", { value : 2 } );
		this[ 0 ] = x || 0;
		this[ 1 ] = y || 0;
	}
	static copy ( vA ) {
		return new vec2().set( vA );
	}
	static add ( vA, vB ) {
		return new vec2().add( vA, vB );
	}
	static sub (vA, vB ) {
		return new vec2().sub( vA, vB );
	}
	static multiply ( vA, vB ) {
		return new vec2().multiply( vA, vB );
	}
	static dot (vA, vB ) {
		return vA[ 0 ] * vB[ 0 ] + vA[ 1 ] * vB[ 1 ];
	}
}
Properties( vec2.prototype, {
	add ( vA, vB = this ) {
		let v = this;

		v[ 0 ] = vA[ 0 ] + vB[ 0 ];
		v[ 1 ] = vA[ 1 ] + vB[ 1 ];
		
		return this;
	},
	sub ( vA, vB = this ) {
		let v = this;
		
		v[ 0 ] = vB[ 0 ] - vA[ 0 ];
		v[ 1 ] = vB[ 1 ] - vA[ 1 ];
		
		return this;
	},
	multiply ( vA, vB = this ) {
		let v = this;
		
		
		v[ 0 ] = vA[ 0 ] * vB[ 0 ];
		v[ 1 ] = vA[ 1 ] * vB[ 1 ];
			
		return this;
	},
	dot ( vA ) {
		return vec2.dot( this, vA );
	}	
});


export class vec3 extends Vector {
	constructor ( x, y, z ) {
		Object.defineProperty( this, "length", { value : 3 } );
		this[ 0 ] = x || 0;
		this[ 1 ] = y || 0;
		this[ 2 ] = z || 0;
	}
	
	static clone ( vA ) 		{ return new vec3().set( vA ); }
	static add ( vA, vB ) 		{ return new vec3().add( vA, vB ); }
	static sub ( vA, vB ) 		{ return new vec3().sub( vA, vB ); }
	static multiply ( vA, vB ) 	{ return new vec3().multiply( vA, vB ); }
	static cross ( vA, vB ) 	{ return new vec3().cross( vA, vB ); }
	static dot ( vA, vB ) {
		return s = vA[ 0 ] * vB[ 0 ] + vA[ 1 ] * vB[ 1 ] + vA[ 2 ] * vB[ 2 ];
	}
}
Properties( vec3.prototype, {
	set ( vA ) {	
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		this[ 2 ] = vA[ 2 ];	
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
	cross ( vA, vB = vec3.copy(this) ) {
		this[ 0 ] = vA[ 1 ] * vB[ 2 ] - vA[ 2 ] * vB[ 1 ];
		this[ 1 ] = vA[ 2 ] * vB[ 0 ] - vA[ 0 ] * vB[ 2 ];
		this[ 2 ] = vA[ 0 ] * vB[ 1 ] - vA[ 1 ] * vB[ 0 ];	
		return this;
	},
	applyQuat4 ( q ) {
		let x = q[ 3 ] * v[ 0 ] + q[ 1 ] * v[ 2 ] - q[ 2 ] * v[ 1 ];
		let y = q[ 3 ] * v[ 1 ] + q[ 2 ] * v[ 0 ] - q[ 0 ] * v[ 2 ];
		let z = q[ 3 ] * v[ 2 ] + q[ 0 ] * v[ 1 ] - q[ 1 ] * v[ 0 ];
		let w = q[ 0 ] * v[ 0 ] - q[ 1 ] * v[ 1 ] - q[ 2 ] * v[ 2 ];

		this[ 0 ] = x * q[ 3 ] + w * -q[ 0 ] + y * -q[ 2 ] - z * -q[ 1 ];
		this[ 1 ] = y * q[ 3 ] + w * -q[ 1 ] + z * -q[ 0 ] - x * -q[ 2 ];
		this[ 2 ] = z * q[ 3 ] + w * -q[ 2 ] + x * -q[ 1 ] - y * -q[ 0 ];
		
		return this;
	},
	dot ( vA ) {
		return vec3.dot ( this, vA );
	}
});

export class vec4 extends Vector {
	constructor ( x, y, z, w ) {
		Object.defineProperty ( this, "length", { value : 4 } );
		this[ 0 ] = x || 0;
		this[ 1 ] = y || 0;
		this[ 2 ] = z || 0;
		this[ 3 ] = w || 0;
	}
	
	static clone ( vA ) { return new vec4().copy( vA ); }
	static add ( vA, vB ) { return new vec4().add( vA, vB ); }
	static sub ( vA, vB ) { return new vec4().sub( vA, vB); }
	static multiply ( vA, vB ) { return new vec4().multiply( vA, vB ); }
	static dot ( vA, vB ) {
		return vA[ 0 ] * vB[ 0 ] + vA[ 1 ] * vB[ 1 ] + vA[ 2 ] * vB[ 2 ] + vA[ 3 ] * vB[ 3 ];
	}
}
Properties( vec4.prototype, {
	set ( vA ) {
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		this[ 2 ] = vA[ 2 ];
		this[ 3 ] = vA[ 3 ];
		return this;
	},
	add ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] + vB[ 0 ];
		this[ 1 ] = vA[ 1 ] + vB[ 1 ];
		this[ 2 ] = vA[ 2 ] + vB[ 2 ];
		this[ 3 ] = vA[ 3 ] + vB[ 3 ];
		return this;
	},
	sub ( vA, vB = this ) {
		this[ 0 ] = vB[ 0 ] - vA[ 0 ];
		this[ 1 ] = vB[ 1 ] - vA[ 1 ];
		this[ 2 ] = vB[ 2 ] - vA[ 2 ];
		this[ 3 ] = vB[ 3 ] - vA[ 3 ];
		return this;
	},
	multiply ( vA, vB = this ) {
		this[ 0 ] = vA[ 0 ] * vB[ 0 ];
		this[ 1 ] = vA[ 1 ] * vB[ 1 ];
		this[ 2 ] = vA[ 2 ] * vB[ 2 ];
		this[ 3 ] = vA[ 3 ] * vB[ 3 ];
		return this;
	},
	copy ( vA ) {
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		this[ 2 ] = vA[ 2 ];
		this[ 3 ] = vA[ 3 ];
		
		return this;
	},
	dot ( vB ) {
		return vec4.dot( this, vB );
	}
});
	
export class quat4 extends Vector {
	constructor ( x = 0, y = 0, z = 0, w = 1 ) {
		Object.defineProperty ( this, "length", { value : 4 } );
		this[ 0 ] = x;
		this[ 1 ] = y;
		this[ 2 ] = z;
		this[ 3 ] = w;
	}
	
	static clone ( vA ) { return new quat4().set( vA ); }
	static axisAngle ( axis, angle ) { return new quat4().axisAngle( axis, angle ); }
	static multiply ( qA, qB ) { return new quat4().multiply( qA, qB ); }
}
Properties( quat4.prototype, {
	set ( vA ) {
		this[ 0 ] = vA[ 0 ];
		this[ 1 ] = vA[ 1 ];
		this[ 2 ] = vA[ 2 ];
		this[ 3 ] = vA[ 3 ];
		return this;
	},
	identity ( ) {
		this[ 0 ] = 0;
		this[ 1 ] = 0;
		this[ 2 ] = 0;
		this[ 3 ] = 1;
		return this;
	},
	multiply ( qA, qB = quat4.clone(this) ) {
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
		let l = this.getLength;
		if( l === 0 ) return this.identity();
		else return this.multiplyScalar( 1 / l );
	},
	conjugate ( ) {
		this[ 0 ] *= -1;
		this[ 1 ] *= -1;
		this[ 2 ] *= -1;
		return this;
	},
	axisAngle ( v3Axis, sAngle ) {
		let a = sAngle * .5;
		let s = Math.sin( a );
		let c = Math.cos( a );

		this[ 0 ] = v3Axis[ 0 ] * s;
		this[ 1 ] = v3Axis[ 1 ] * s;
		this[ 2 ] = v3Axis[ 2 ] * s;
		this[ 3 ] = c;

		return this;
	}
});	

[ "x", "y", "z", "w" ].map( function ( ex, x, a ) {
	var getter = "return this["+x+"];";
	var setter = "this["+x+"] = v;";
	if ( x < 2 ) $( vec2, a[x], getter, setter );
	if ( x < 3 ) $( vec3, a[x], getter, setter );
	$( vec4, a[x], getter, setter );
	$( quat4, a[x], getter, setter );
	/* 	swizzle is super expensive to set up until ES6 Proxies -> 
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
	*/
	function $( constructor, property, getter, setter ) {
		Object.defineProperty( constructor.prototype, property, {
			get : new Function( getter ),
			set : new Function( "v",setter )
		} );
	}
} );
	
	