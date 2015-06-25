import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";
import { mat2, mat3, mat4, vec2, vec3, vec4, quat4 } from "../math/math.js";
import "../webgl/UniformLocation.js";

export default class Uniform {
	static create( info, location ) {
		let uniform =  new ( TYPES.get( info.type ) );
		
		Property( uniform, "location", location, E );
		
		return uniform;
	}
}
Properties( Uniform.prototype, {
	instantiate ( ) {
		let o = Object.create( this );
		Property( o, "value", this.value, E | C | W );
		return o;
	}
} );

class UniformVector { }
Properties( UniformVector.prototype, {
	instantiate ( ) {
		let o = Object.create( this );
		Property( o, "value", this.value.clone(), E | C );
		return o;
	}
} );

class UniformFloat extends Uniform {
	constructor ( ) {
		super();
		Property( this, "value", 0.0, E | W );
	}
}
Properties( UniformFloat.prototype, {
	setValues ( f ) {
		if ( f !== undefined ) this.value =  f;
		this.location.set1f( f );
	},
	set ( f ) {
		if ( f !== undefined ) this.value =  f;
		this.location.set1f( f );
	}
});

class UniformFloatVec2 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new vec2, E );
	}
}
Properties( UniformFloatVec2.prototype, {
	setValues ( x, y ) {
		if ( x !== undefined ) this.value.set( arguments );
		this.location.set2f( this.value );
		return this;
	},
	set ( vA ) {
		if ( vA !== undefined ) this.value.set( vA );
		this.location.set2f( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec2, vec2 );

class UniformFloatVec3 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new vec3, E );
	}
}
Properties( UniformFloatVec3.prototype, {
	setValues ( x, y, z ) {
		if ( x !== undefined ) this.value.set( arguments );
		this.location.set3f( this.value );
		return this;
	},
	set ( vA ) {
		if ( vA !== undefined ) this.value.set( vA );
		this.location.set3f( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec3, vec3 );

class UniformFloatVec4 extends UniformVector {
	constructor ( ) { 
		super();
		Property( this, "value", new vec4, E );
	}
}
Properties( UniformFloatVec4.prototype, {
	setValues ( x, y, z, w ) {
		if( arguments.length ) this.value.set( arguments );
		this.location.set4f( this.value );
		return this;
	},
	set ( vA ) {
		if( vA !== undefined ) this.value.set( vA );
		this.location.set4f( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec4, vec4 );

class UniformFloatMat2 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new Float32Array( 4 ), E );
	}
}
Properties( UniformFloatMat2.prototype, {
	setValues ( ) {
		if ( arguments.length ) this.value.set( arguments );
		this.location.setMat2( this.value );
		return this;
	},
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat2( this.value );
		return this;
	}
});
createDelegates( UniformFloatMat2, mat2 );

class UniformFloatMat3 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new Float32Array( 9 ), E );
	}
}
Properties( UniformFloatMat3.prototype, {
	setValues ( ) {
		if ( arguments.length ) this.value.set( arguments );
		this.location.setMat3( this.value );
		return this;
	},
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat3( this.value );
		return this;
	}
});
createDelegates( UniformFloatMat3, mat3 );

class UniformFloatMat4 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new Float32Array( 16 ), E );
	}
}
Properties( UniformFloatMat4.prototype, {
	setValues ( ) {
		if ( arguments.length ) this.value.set( arguments );
		this.location.setMat4( this.value );
		return this;
	},
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat4( this.value );
		return this;
	}
});
createDelegates( UniformFloatMat4, mat4 );

class UniformInt extends Uniform {
	constructor ( ) {
		super();
		Property( this, "value", 0, E | W );
	}
}
Properties( UniformInt.prototype, {
	setValues ( i ) {
		if ( i !== undefined ) this.value = i;
		this.location.set1i( i );
		return this;
	},
	set ( i ) {
		if ( i !== undefined ) this.value = i;
		this.location.set1i( i );
		return this;
	}
});

class UniformIntVec2 extends UniformVector {
	constructor ( ) {
		super(); 
		Property( this, "value", new vec2, E );
	}
}
Properties( UniformIntVec2.prototype, {
	setValues ( x, y ) {
		if ( x !== undefined ) this.value.set( arguments );
		this.location.set2i( this.value );
		return this;
	},
	set ( vA ) {
		if ( vA !== undefined ) this.value.set( vA );
		this.location.set2i( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec2, vec2 );

class UniformIntVec3 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new vec3, E );
	}
}
Properties( UniformIntVec3.prototype, {
	setValues ( x, y, z ) {
		if ( x !== undefined ) this.value.set( arguments );
		this.location.set3i( this.value );
		return this;
	},
	set ( vA ) {
		if ( vA !== undefined ) this.value.set( vA );
		this.location.set3i( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec3, vec3 );

class UniformIntVec4 extends UniformVector {
	constructor ( ) {
		super();
		Property( this, "value", new vec4, E );
	}
}
Properties( UniformIntVec4.prototype, {
	setValues ( x, y, z, w ) {
		if ( x !== undefined ) this.value.set( arguments );
		this.location.set4i( this.value );
		return this;
	},
	set ( vA ) {
		if ( vA !== undefined ) this.value.set( vA );
		this.location.set4i( this.value );
		return this;
	}
});
createDelegates( UniformFloatVec4, vec4 );

class UniformTexture2D extends UniformInt {
}

class UniformTextureCubeMap extends Uniform {

}


const TYPES = new Map( [
	[ GL.FLOAT,				UniformFloat ],
	[ GL.FLOAT_VEC2,		UniformFloatVec2 ],
	[ GL.FLOAT_VEC3,		UniformFloatVec3 ],
	[ GL.FLOAT_VEC4,		UniformFloatVec4 ],
	[ GL.FLOAT_MAT2,		UniformFloatMat2 ],
	[ GL.FLOAT_MAT3,		UniformFloatMat3 ],
	[ GL.FLOAT_MAT4,		UniformFloatMat4 ],
	[ GL.INT,				UniformInt ],
	[ GL.INT_VEC2,			UniformIntVec2 ],
	[ GL.INT_VEC3,			UniformIntVec3 ],
	[ GL.INT_VEC4,			UniformIntVec4 ],
	[ GL.SAMPLER_2D,		UniformTexture2D ],
	[ GL.SAMPLER_CUBE,		UniformTextureCubeMap ]
] );



export class UniformStruct extends Uniform {
	*[ Symbol.iterator ] ( ) {
		let properties = Object.getOwnPropertyNames( this );
		let index = 0;
		while ( index < properties.length )	yield this[ properties[ index++ ] ];
	}
}

Properties( UniformStruct.prototype, {
	set ( object ) {
		for ( let property in this ) {
			//console.log( property );
			if ( object && property in object ) this[ property ].set( object[ property ] );
			else this[ property ].set();
		}
		return this;
	},
	instantiate ( ) {
		let instance =  Object.create( this );
		for ( let property in this ) instance[ property ] = this[ property ].instantiate();
		return instance;
	}
});

export class UniformArray extends UniformStruct {

}

function createDelegates ( uniform, delegate ) {
	for ( let method of Object.getOwnPropertyNames( delegate.prototype ) )
	if ( uniform.prototype[ method ] === undefined ) Property( uniform.prototype, method, new Function(`
		${ delegate.name }.prototype.${ method }.apply( this.value, arguments );
		this.set();
		return this;
	`), C );
}