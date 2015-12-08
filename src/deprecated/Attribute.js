define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../webgl/VertexBuffer",
	"../material/Material",
	"../kernel/InterleavedArray"
], function module (
	def,
	gl,
	VertexBuffer,
	Material,
	InterleavedArray
) {
	"use strict";
	
	class Attribute {
		constructor( vertexBuffer, view ) {
			
			def.Properties( this, {
				vertexBuffer,
				view
			}, def.CONFIGURABLE );
		}
		allocate ( byteLength, viewConstructor, usage ) {
			if ( usage === undefined ) usage = gl.STATIC_DRAW;

			let arrayBuffer = this.vertexBuffer.createStorage( byteLength, usage );
			
			def.Property( this, "view", new viewConstructor( arrayBuffer ), def.CONFIGURABLE );
			return this;
		}
		setArrayBuffer ( arrayBuffer ) {
			def.Property( this, "view", arrayBuffer, def.CONFIGURABLE );
			return this;
		}
		update ( view, offset ) {
			if ( offset === undefined ) offset = view.byteOffset;
			
			if ( view !== undefined ) this.view.set( view );

			this.vertexBuffer.data( this.view, offset );
			return this;
		}
		resize ( length, usage ) {
			if ( usage === undefined ) usage = gl.STATIC_DRAW;

			let oldData = length < this.view.length ? this.view.subarray( 0, length ) : this.view; 

			def.Property( this, "view", new oldData.constructor( length ), def.CONFIGURABLE );
			this.view.set( oldData );

			this.vertexBuffer.data( this.view.byteLength, usage );
			return this;
		}
		createView ( start, count ) {
			if ( start === undefined ) start = 0;
			if ( count === undefined ) count = this.view.length;

			return this.view.subarray( start, count ); 
		}
	}

	return Attribute;
});