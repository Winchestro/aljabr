define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../webgl/VertexBuffer",
	"../material/Material",
	"../kernel/InterleavedArray",
	"../mesh/Attribute"
], function module (
	def,
	gl,
	VertexBuffer,
	Material,
	InterleavedArray,
	Attribute
) {
	"use strict";

	class VertexAttributeGroup extends Attribute {
		constructor ( structure ) {
			super( VertexBuffer.Vertex(), new InterleavedArray( structure ) );
		}
		allocate ( byteLength, usage ) {
			if ( usage === undefined ) usage = Attribute.STATIC_DRAW;

			let storage = this.vertexBuffer.createStorage( byteLength, usage );
			//console.dir( storage );
			this.view.setArrayBuffer( storage );
			return this;
		}
		update ( arrayBuffer, offset ) {
			if ( arrayBuffer === undefined ) arrayBuffer = this.view.buffer;
			if ( offset === undefined ) offset = arrayBuffer.byteOffset;

			this.vertexBuffer.data( arrayBuffer, offset );
			return this;
		}
		createVertexView ( start, length ) {
			if ( start === undefined ) start = 0;
			if ( length === undefined ) length = this.view.length - start;

			let size 	= Float32Array.BYTES_PER_ELEMENT;
			let stride 	= this.view.BYTES_PER_ELEMENT;
			let arrayBuffer 	= this.view.buffer;

			return new Float32Array(
				arrayBuffer,
				start * stride,
				length * stride / size
			);
		}
		createVertexAttributeViews ( vertex, index ) {
			let structure = this.view.structure;
			let arrayBuffer = this.view.buffer;
			let stride = this.view.BYTES_PER_ELEMENT;

			for ( let attributeName in structure ) {
				let attribute = structure[ attributeName ];
				let offset = attribute.byteOffset;
				let length = attribute.length;

				vertex.addAttributeBuffer( attributeName, new attribute.constructor(
					arrayBuffer,
					index * stride + offset,
					length
				));
			}
			return this;
		}	
	}

	return VertexAttributeGroup;
});