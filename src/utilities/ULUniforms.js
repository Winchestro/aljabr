import { vec2, vec3, vec4 }	from "../math/MLVector";
import { mat2, mat3, mat4 } from "../math/MLMatrix";
import { Properties, Getters, Setters, GetterSetters, E, C,	W } from "./ULPropertyDescriptors";
import { GL } from "../GLContext";


export class Uniform {
	static create( info, location ) {
		let uniform =  new ( TYPES.get( info.type ) );
		
		Properties( uniform, { location }, E );
		
		return uniform;
	}
}
Properties( Uniform.prototype, {
	instantiate ( ) {
		let o = Object.create( this );
		Properties( o, { value : this.value }, E | C | W );
		return o;
	}
} );

class UniformVector { }
Properties( UniformVector.prototype, {
	instantiate ( ) {
		let o = Object.create( this );
		Properties( o, { value : this.value.clone() }, E | C );
		return o;
	}
} );

class UniformFloat extends Uniform {
	constructor ( ) {
		Properties( this, { value : 0.0 }, E | W );
	}
}
Properties( UniformFloat.prototype, {
	set ( f ) {
		if ( f !== undefined ) this.value =  f;
		this.location.set1f( f );
	}
});

class UniformFloatVec2 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new vec2 }, E );
	}
}
Properties( UniformFloatVec2.prototype, {
	set ( f ) {
		if ( f !== undefined ) this.value.set( f );
		this.location.set2f( this.value );
		return this;
	}
});

class UniformFloatVec3 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new vec3 }, E );
	}
}
Properties( UniformFloatVec3.prototype, {
	set ( f ) {
		if ( f !== undefined ) this.value.set( f );
		this.location.set3f( this.value );
		return this;
	}
});

class UniformFloatVec4 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new vec4 }, E );
	}
}
Properties( UniformFloatVec4.prototype, {
	set ( f ) {
		if( f !== undefined ) this.value.set( f );
		this.location.set4f( this.value );
		return this;
	}
});

class UniformFloatMat2 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new mat2 }, E );
	}
}
Properties( UniformFloatMat2.prototype, {
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat2( this.value );
		return this;
	}
});

class UniformFloatMat3 extends UniformVector {
	constructor ( ) {
		Properties( this, { value : new mat3 }, E );
	}
}
Properties( UniformFloatMat3.prototype, {
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat3( this.value );
		return this;
	}
});

class UniformFloatMat4 extends UniformVector {
	constructor ( ) {
		Properties( this, { value : new mat4 }, E );
	}
}
Properties( UniformFloatMat4.prototype, {
	set ( m ) {
		if ( m !== undefined ) this.value.set( m );
		this.location.setMat4( this.value );
		return this;
	}
});

class UniformInt extends Uniform {
	constructor ( ) { 
		Properties( this, { value : 0 }, E | W );
	}
}
Properties( UniformInt.prototype, {
	set ( i ) {
		if ( i !== undefined ) this.value = i;
		this.location.set1i( i );
		return this;
	}
});

class UniformIntVec2 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new vec2 }, E );
	}
}
Properties( UniformIntVec2.prototype, {
	set ( i ) {
		if ( i !== undefined ) this.value.set( i );
		this.location.set2i( this.value );
		return this;
	}
});

class UniformIntVec3 extends UniformVector {
	constructor ( ) {
		Properties( this, { value : new vec3 }, E );
	}
}
Properties( UniformIntVec3.prototype, {
	set ( i ) {
		if ( i !== undefined ) this.value.set( i );
		this.location.set3i( this.value );
		return this;
	}
});

class UniformIntVec4 extends UniformVector {
	constructor ( ) { 
		Properties( this, { value : new vec4 }, E );
	}
}
Properties( UniformIntVec4.prototype, {
	set ( i ) {
		if ( i !== undefined ) this.value.set( i );
		this.location.set4i( this.value );
		return this;
	}
});

class UniformTexture2D extends Uniform {
	constructor ( ) { }
}

class UniformTextureCubeMap extends Uniform {
	constructor ( ) { }
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
