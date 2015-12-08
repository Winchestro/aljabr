define( [
	"../utilities/PropertyDescriptors",
	"../primitives/GeometryPrimitiveOptions",
	"../mesh/Geometry",
	"../math/vec3"
], function module (
	def,
	GeometryPrimitiveOptions,
	Geometry,
	vec3
) {
	"use strict";

	function createCube8Geometry ( x1, x2, y1, y2, z1, z2 ) {
		if ( x1 === undefined ) x1 = 1;
		if ( y1 === undefined ) y1 = x1;
		if ( z1 === undefined ) z1 = x1;

		if ( x2 === undefined ) x2 = -1;
		if ( y2 === undefined ) y2 = x2;
		if ( z2 === undefined ) z2 = x2;
		
		let geometry 				= new Geometry;
		let options 				= createCube8Geometry.options;
			let struct 				= options.structure;
			let colorFn 			= options.colorFn;
			let usage 				= options.usage;
			let preallocateVertices	= options.preallocateVertices;
		
		let attribute 				= geometry.createVertexAttributeGroup(
			struct,
			8 + preallocateVertices,
			usage
		);
		let view = new Float32Array( attribute.view.buffer );
		
		let stride = attribute.view.BYTES_PER_ELEMENT / view.BYTES_PER_ELEMENT;
		
		let structure = attribute.view.structure;
			let position = structure.position;
			let color = structure.color;
			let normal = structure.normal;
			let texCoord = structure.texCoord;

		
		if ( position ) {
			let offset = position.byteOffset / view.BYTES_PER_ELEMENT;
			let i = offset;
			view[ i                        ] = x1; view[ ++i ] = y1; view[ ++i ] = z1;
			view[ i =  1 * stride + offset ] = x1; view[ ++i ] = y2; view[ ++i ] = z1;
			view[ i =  2 * stride + offset ] = x1; view[ ++i ] = y2; view[ ++i ] = z2;
			view[ i =  3 * stride + offset ] = x1; view[ ++i ] = y1; view[ ++i ] = z2;
			
			view[ i =  4 * stride + offset ] = x2; view[ ++i ] = y1; view[ ++i ] = z2;
			view[ i =  5 * stride + offset ] = x2; view[ ++i ] = y2; view[ ++i ] = z2;
			view[ i =  6 * stride + offset ] = x2; view[ ++i ] = y2; view[ ++i ] = z1;
			view[ i =  7 * stride + offset ] = x2; view[ ++i ] = y1; view[ ++i ] = z1;
		}
		if ( color ) {
			let offset = color.byteOffset / view.BYTES_PER_ELEMENT;
			let max = 7 * stride + offset + color.length;
			for ( let i = offset; i < max; i += stride ) {
				colorFn( view, i );
			}
		}
		if ( texCoord ) {
		}

		let n1 = new vec3( x1, y1, z1 ).normalize();
		let n2 = new vec3( x2, y2, z2 ).normalize();
		if ( normal ) {
			let offset = normal.byteOffset / view.BYTES_PER_ELEMENT;
			let i = offset;

			view[ i                        ] = n1[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n1[ 2 ];
			view[ i =  1 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n1[ 2 ];
			view[ i =  2 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n2[ 2 ];
			view[ i =  3 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n2[ 2 ];
			view[ i =  4 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n2[ 2 ];
			view[ i =  5 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n2[ 2 ];
			view[ i =  6 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n1[ 2 ];
			view[ i =  7 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n1[ 2 ];
		}

		view.update();
		return geometry;
	}

	def.Properties( createCube8Geometry, {
		options : new GeometryPrimitiveOptions (
			function colorFn ( view, offset ) {
				view[ offset     ] = Math.random() * .5 + .25; 
				view[ offset + 1 ] = Math.random() * .5 + .25; 
				view[ offset + 2 ] = Math.random() * .5 + .25; 
			}
		),
	});

	return createCube8Geometry;
});