define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../webgl/VertexBuffer",
	"../material/Material",
	"../kernel/InterleavedArray",
	"../mesh/Attribute",
	"../mesh/Drawable"
], function module (
	def,
	gl,
	VertexBuffer,
	Material,
	InterleavedArray,
	Attribute,
	Drawable
) {
	"use strict";
	
	class ElementAttribute extends Attribute {
		constructor( geometry, data ) {
			super( VertexBuffer.Index(), data );
			def.Property( this, "geometry", geometry, def.CONFIGURABLE );
			
			if ( data ) this.allocate( data.byteLength, data.constructor ).update( data );
		}
		setGeometry ( geometry ) {
			def.Property( this, "geometry", geometry, def.CONFIGURABLE );
			return this;
		}
		
		draw ( material, offset, count ) {
			if ( offset === undefined ) offset = 0;
			if ( count === undefined ) count = this.length;

			this.geometry.use();
			this.buffer.bind();
			gl.drawElements( this.drawType, count, this.dataType, offset );
			return this;
		}
		get length ( ) {
			if ( this.data ) return this.data.length
			else return 0;
		}
		get dataType ( ) {
			let length = this.data.length;
			let dataType = 	length < ( 1 << 8 ) ? 	gl.UNSIGNED_BYTE : 
							length < ( 1 << 16 ) ? 	gl.UNSIGNED_SHORT : 
													gl.UNSIGNED_INT;
			
			return dataType;
		}
		get dataTypeString ( ) {
			return gl.strings[ this.dataType ];
		}
	}
	def.Properties( ElementAttribute.prototype, {
		drawType : gl.TRIANLES
	}, def.CONFIGURABLE );

	def.Mixin( ElementAttribute.prototype, Drawable.prototype );

	return ElementAttribute;
});