import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import GeometryPrimitiveOptions from "../GeometryPrimitiveOptions.js";
import Geometry from "../../mesh/Geometry.js";

export default function createCube8Geometry ( x1 = 1, x2 = -1, y1 = x1, y2 = x2, z1 = x1, z2 = x2 ) {
	let { structure, colorFn, usage, preallocateVertices } = createCube8Geometry.options;
	let geometry = new Geometry;
	
	let attribute = geometry.createVertexAttributeGroup(
		structure,
		8 + preallocateVertices,
		usage
	);

	let vertex = attribute.view;
	let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
	let { position, color, normal, texCoord } = attribute.data.structure;
	
	if ( position ) {
		let offset = position.offset / vertex.BYTES_PER_ELEMENT;
		let i = offset;
		vertex[ i                        ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
		vertex[ i =  1 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
		vertex[ i =  2 * stride + offset ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
		vertex[ i =  3 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
		
		vertex[ i =  4 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
		vertex[ i =  5 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
		vertex[ i =  6 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
		vertex[ i =  7 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
	}
	if ( color ) {
		let offset = color.offset / vertex.BYTES_PER_ELEMENT;
		let max = 7 * stride + offset + color.type.length;
		for ( let i = offset; i < max; i += stride ) {
			colorFn( vertex, i );
		}
	}
	if ( texCoord ) {
	}
	if ( normal ) {
		let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
		let i = offset;
		vertex[ i                        ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
		vertex[ i =  1 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
		vertex[ i =  2 * stride + offset ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
		vertex[ i =  3 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
		
		vertex[ i =  4 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
		vertex[ i =  5 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
		vertex[ i =  6 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
		vertex[ i =  7 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
	}

	attribute.update();
	return geometry;
}
Properties( createCube8Geometry, {
	options : new GeometryPrimitiveOptions (
		function colorFn ( data, offset ) {
			data[ offset     ] = Math.random(); 
			data[ offset + 1 ] = Math.random(); 
			data[ offset + 2 ] = Math.random(); 
		}
	),
});

