define ( [
	"../utilities/PropertyDescriptors",

	"../webgl/Context",
	"../webgl/VertexArrayObject",
	"../webgl/AttributeLocation",
	
	"../mesh/VertexAttribute",
	"../mesh/VertexAttributeGroup",
	"../mesh/Drawable",
	"../mesh/VertexList"
], function module (
	def,
	
	gl,
	VertexArrayObject,
	AttributeLocation,

	VertexAttribute,
	VertexAttributeGroup,
	Drawable,
	VertexList
) {
	"use strict";
	/*
		Drastically simplify vbo, geometry, attributes, vertexlist, interleaved arry

		into one data structure "vertexBuffer", which is a pool allocator for
		vertices, initialized with a pool size and a vertex structure. It's always an
		interleaved array. It's also a list of all currently used vertices.

		It can't be used to draw itself, only when referenced by an indexBuffer.

		I'm basically removing drawArrays and force all vertices into an
		interleaved structure.

		"indexBuffer"
		

	*/
	class Geometry {
		constructor ( ) {
			def.Properties( this, {
				length : 0,
				bindings : new VertexArrayObject
			}, def.CONFIGURABLE );
		}
		use ( ) {
			this.bindings.use();
			return this;
		}
		unbind ( ) {
			this.bindings.unbind();
			return this;
		}
		clearCache ( ) {
			delete this.vertexCount;
			return this;
		}
		draw ( material, offset, count ) {
			if ( offset === undefined ) offset = 0;
			if ( count === undefined ) count = this.vertexCount;

			this.use();
			material.use();
			gl.drawArrays( this.drawType, offset, count );
			
			return this; 
		}
		createVertexList ( maxLength ) {
			if ( maxLength === undefined ) maxLength = this.vertexCount;

			return new VertexList( this, maxLength );
		}
		
		createVertexAttribute ( byteLength, length, usage ) {
			let attr = new VertexAttribute( structure );
			if ( length ) attr.allocate( byteLength, usage );
			this.attachVertexAttribute( attr );
			return attr;
		}
		attachVertexAttribute ( attribute, location ) {
			let vao = this.bindings;
			if ( location === undefined ) location = new AttributeLocation( vao.getNextFreeSlot() );

			let size = attribute.size;
			let vertexBuffer = attribute.vertexBuffer;

			location.setSize( size );
			vao.addVertexBinding( location, vertexBuffer );

			this[ this.length ] = attribute;
			def.Property( this, "length", this.length + 1, def.CONFIGURABLE );
			this.clearCache();
			return this;
		}
		createVertexAttributeGroup ( structure, length, usage ) {
			let attr = new VertexAttributeGroup( structure );
			if ( length ) attr.allocate( length * attr.view.BYTES_PER_ELEMENT, usage );
			this.attachVertexAttributeGroup( attr );
			
			return attr;
		}
		attachVertexAttributeGroup( attributeGroup ) {
			let vao = this.bindings;

			let structure = attributeGroup.view.structure;
			let stride = attributeGroup.view.BYTES_PER_ELEMENT;
			let vertexBuffer = attributeGroup.vertexBuffer;
			
			for ( let key in structure ) {
				let attribute = structure[ key ];
				let location = attribute.location ? attribute.location : new AttributeLocation( vao.getNextFreeSlot() );
				let offset = attribute.byteOffset;
				let size = attribute.length;
				location.setSize( size ).setStride( stride ).setOffset( offset ).setFloatVector( attribute, size );

				vao.addVertexBinding( key, location, vertexBuffer );
			};

			this[ this.length ] = attributeGroup;
			def.Property( this, "length", this.length + 1, def.CONFIGURABLE );
			this.clearCache();
			return this;
		}
		get vertexCount ( ) {
			let max = 0;
			for ( let attr in this ) {
				let view = this[ attr ].view;
				if ( view !== undefined ) {
					let length = view.length || view.maxLength;
					
					if ( length > max ) max = length;
				}
			}
			def.Property( this, "vertexCount", max, def.CONFIGURABLE );
			return max;
		}
	}

	def.Properties( Geometry.prototype, {
		[ Symbol.iterator ] : [][ Symbol.iterator ],
		drawType : gl.POINTS
	}, def.CONFIGURABLE );

	def.Mixin( Geometry.prototype, Drawable.prototype );

	return Geometry;
});