import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";
import Buffer from "../webgl/VertexBuffer.js";
import Draw from "../webgl/Draw.js";

import InterleavedArray from "../mesh/InterleavedArray.js";
import Material from "../mesh/Material.js";

class Attribute {
	constructor( buffer, data ) {
		Properties( this, { buffer, data }, C );
	}
	allocateBytes ( byteLength, usage = Attribute.STATIC ) {
		// allocate a new storage, then use update to write to it
		this.buffer.data( byteLength, usage );
		return this;
	}
	allocateBuffer ( data, usage = Attribute.DYNAMIC ) {
		// allocate a new storage from an existing buffer, then optionally use update to write to it.
		Property( this, "data", data, C );
		this.buffer.data( data, usage );
		return this;
	}
	update ( data = this.data, offset = data.byteOffset ) {
		/*
			There are different strategies to update buffers.
			
			1. Use allocate, then pass buffer and optionally offset to write it to without keeping a reference. 
			That's good for data you want to write but not read, like static data.

			2. Use buffer, then make changes to that buffer and call update without args.
			It will just update the whole buffer. Good for frequent read/write ops.

			3. Use buffer, create a view from it, make changes to a certain range and
			call update with just this bufferView. This will only update the bufferView.
			Good for frequent partial read/write ops.

			Edge case : You may want to preallocate a buffer, then use a smaller buffer
			for partial read/write ops. In this case you have to track that buffer yourself.

		*/
		this.buffer.subData( data, offset );
		return this;
	}
	resize ( length, usage = Attribute.STREAM ) {
		let oldData = length < this.data.length ? this.data.subarray( 0, length ) : this.data; 

		this.data = new oldData.constructor( length );
		this.data.set( oldData );

		this.buffer.data( this.data.byteLength, usage );
		return this;
	}
	createView ( start = 0, count = this.data.length ){
		return this.data.subarray( start, count ); 
	}
}

export class VertexAttribute extends Attribute {
	constructor ( structure ) {
		super( new Buffer.Vertex, structure.type ? structure.type : structure );
	}
}
Properties( Attribute, {
	STATIC 	: GL.STATIC_DRAW,
	DYNAMIC : GL.DYNAMIC_DRAW,
	STREAM 	: GL.STREAM_DRAW
});

export class ElementAttribute extends Attribute {
	constructor( geometry, data ) {
		super( new Buffer.Index, data );
		Property( this, "geometry", geometry, C );
		if ( data ) {
			this.allocateBuffer( data ).setDataType();
		}
	}
}

Properties( ElementAttribute.prototype, {
	drawType : GL.TRIANGLES,
	dataType : GL.UNSIGNED_SHORT,
	material : Material.DEFAULT,
	setGeometry ( geometry ) {
		Property( this, "geometry", geometry, C );
		return this;
	},
	setMaterial ( material ) {
		Property( this, "material", material, C );
		return this;
	},
	setDrawType ( drawType ) {
		Property( this, "drawType", drawType, C );
		return this;
	},
	setDataType ( dataType = this.getDataType ) {
		Property( this, "dataType", dataType, C );
		return this;
	},
	draw ( offset = 0, count = this.length ) {
		this.geometry.use();
		this.material.use();
		this.buffer.bind();
		gl.drawElements( this.drawType, count, this.dataType, offset );
		return this;
	}
});
Getters( ElementAttribute.prototype, {
	length ( ) {
		if ( this.data ) return this.data.length
		else return 0;
	},
	getDataType ( ) {
		return ElementAttribute.DATA_TYPES[ this.data.constructor.name ];
	}
});

Properties( ElementAttribute, {
	TRIANGLES : GL.TRIANGLES,
	LINES : GL.LINES,
	POINTS : GL.POINTS,

	DATA_TYPES : {
		Uint8Array : GL.UNSIGNED_BYTE,
		Uint16Array : GL.UNSIGNED_SHORT,
		Uint32Array : GL.UNSIGNED_INT
	}
});


export class LineElementAttribute extends ElementAttribute {
	constructor( geometry, data ) {
		super ( geometry, data );
	}
}

Properties( LineElementAttribute.prototype, {
	drawType : GL.LINES
});

export class TriangleElementAttribute extends ElementAttribute {
	constructor( geometry, data ) {
		super ( geometry, data );
	}	
}

Properties( TriangleElementAttribute, {
	drawType : GL.TRIANGLES
});


export class VertexAttributeGroup extends Attribute {
	constructor ( structure ) {
		super( new Buffer.Vertex, new InterleavedArray( structure ) );
		
	}
	allocate ( lengthOrData, usage = GL.STATIC_DRAW ) {
		if ( isNaN( lengthOrData ) ) {
			let data = lengthOrData;
			this.data.allocate( data.length );
			this.view = new this.data.type( this.data.buffer );
			this.view.set( data );
			this.buffer.data( this.view, usage );
		}
		else {
			let length = lengthOrData;
			this.data.allocate( length );
			this.view = new this.data.type( this.data.buffer );
			this.buffer.data( this.view.byteLength, usage );
		}
		return this;
	}
	resize ( length, usage = GL.STATIC_DRAW ) {
		this.data.resize( length );
		this.view = new this.data.type( this.data.buffer );
		this.buffer.data( this.view.byteLength, usage );
		return this;
	}
	createVertexView ( start = 0, length = 1 ) {
		let max = this.data.maxLength;
		if ( start < 0 ) 	start = max + start;
		if ( start >= max ) start = start % max;
		let size 	= this.data.type.BYTES_PER_ELEMENT;
		let stride 	= this.data.stride;
		let buffer 	= this.data.buffer;

		return new this.data.type(
			buffer,
			start * stride,
			length * stride / size
		);
	}
	createVertexAttributeViews ( vertex, index ) {
		let structure = this.data.structure;
		let buffer = this.data.buffer;
		let stride = this.data.stride;
		let size = this.data.type.BYTES_PER_ELEMENT;

		for ( let attributeName in structure ) {
			let attribute = structure[ attributeName ];
			let offset = attribute.offset;
			let length = attribute.type.length;

			vertex.addAttributeBuffer( attributeName, new this.data.type(
				buffer,
				index * stride + offset,
				length
			));
		}
		return vertex;
	}

	update ( bufferView = this.view, offset = bufferView.byteOffset ) {
		this.buffer.subData( bufferView, offset, length );
		return this;
	}
}

