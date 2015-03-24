import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";

export default class AttributeLocation {
 	constructor ( index, info ) {
		this.index = index;
		if( info ) this.info = info;
	}
	updateActiveInfo ( program ) {
		//active infos are only needed if you choose to not process unused vertex buffers
		this.info = program.getActiveAttrib( this.index );
		return this;
	}
	setFloat ( f1, f2, f3, f4 ) {
		f4 !== undefined ?	gl.vertexAttrib4f( this.index, f1, f2, f3, f4 ) :
		f3 !== undefined ?	gl.vertexAttrib3f( this.index, f1, f2, f3 ) :
		f2 !== undefined ?	gl.vertexAttrib2f( this.index, f1, f2 ) :
		f1 !== undefined ?	gl.vertexAttrib1f( this.index, f1 ) :
							console.warn( "setFloat expects 1-4 arguments" );
		return this;
	}
	setFloatVector ( v, size = 4 ) {
		switch ( size ) {
			case 4 : gl.vertexAttrib4fv( this, v ); break;
			case 3 : gl.vertexAttrib3fv( this, v ); break;
			case 2 : gl.vertexAttrib2fv( this, v ); break;
			case 1 : gl.vertexAttrib1fv( this, v ); break;
			default: console.warn("setFloatVector expects size 1-4"); break;
		}
		return this;
	}
	enable ( ) {
		//this.applyPointer( );
		gl.enableVertexAttribArray( this.index );
		return this;
	}
	disable ( ) {
		gl.disableVertexAttribArray( this.index );
		return this;
	}
	setSize ( size, offset, stride, type, normalized ) {
		Object.defineProperty( this, "size", { value : size, enumerable : true, configurable : true } );
		return this;
	}
	setStride ( stride ) {
		Object.defineProperty( this, "stride", { value : stride, enumerable : true, configurable : true } );
		return this;
	}
	setOffset ( offset ) {
		Object.defineProperty( this, "offset", { value : offset, enumerable : true, configurable : true } );
		return this;
	}
	setType ( type ) {
		Object.defineProperty( this, "type", { value : type, enumerable : true, configurable : true } );
		return this;
	}
	setNormalized ( normalized ) {
		Object.defineProperty( this, "normalized", { value : normalized, enumerable : true, configurable : true, writeable : true } );
		return this;
	}
	setPointer ( size = 4, offset = 0, stride = 0, type = GL.FLOAT, normalized = false ) {
		gl.vertexAttribPointer(
			this.index,
			size,
			type,
			normalized,
			stride,
			offset
		);
		return this;
	}
	applyPointer ( ) {
		gl.vertexAttribPointer(
			this.index,
			this.size,
			this.type,
			this.normalized,
			this.stride,
			this.offset
		);
		return this;
	}
};

Getters( AttributeLocation.prototype, {
	getCurrentVertexAtrrib 	(){ return gl.getVertexAttrib( this.index, gl.CURRENT_VERTEX_ATTRIB ); },
	getBuffer				(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING ); },
	getEnabled				(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_ENABLED ); },
	getSize					(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_SIZE ); },
	getStride				(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_STRIDE ); },
	getNormalized			(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED ); },
	getType					(){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_TYPE ); },
	getOffset				(){ return gl.getVertexAttribOffset( this.index, gl.VERTEX_ATTRIB_ARRAY_POINTER ); },
	getTypeFlag				(){ return gl.flags[ this.getType ]; },
});

Properties( AttributeLocation.prototype, {
	size : 4, 
	offset : 0,
	stride : 0,
	type : GL.FLOAT,
	normalized : false
}, E );