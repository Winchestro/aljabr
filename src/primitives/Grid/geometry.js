import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import GeometryPrimitiveOptions from "../GeometryPrimitiveOptions.js";
import Geometry from "../../mesh/Geometry.js";

export default function createGridGeometry ( xdivisions = 20, ydivisions = 20, heightFn ) {
	xdivisions+=2;
	ydivisions+=2;
	let { structure, colorFn, usage, name, preallocateVertices } = createGridGeometry.options;
	let geometry = new Geometry;
	geometry.createVertexAttributeGroup(
		name,
		structure,
		( xdivisions ) * ( ydivisions ) + preallocateVertices,
		usage
	);

	let attribute = geometry[ name ];
	let vertex = attribute.view;
	let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
	let { position, color, normal, texCoord } = attribute.data.structure;
	
	let index = 0;
	
	for ( let xx = 0; xx < xdivisions; xx++ ) {
		for ( let yy = 0; yy < ydivisions; yy++ ) {
			let x = xx / ( xdivisions - 1 ) * 2. - 1.0;
			let y = yy / ( ydivisions - 1 ) * 2. - 1.0;
			let z = heightFn ? heightFn( x, y ) : 0;
			if ( position ) {
				let offset = position.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i++ ] = x;
				vertex[ i++ ] = y;
				vertex[ i++ ] = z;
			}
			if ( color ) {
				let offset = color.offset / vertex.BYTES_PER_ELEMENT;
				colorFn( vertex, index + offset, x, y, z );
			}
			if ( normal && !heightFn ) {
				let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i++ ] = 0;
				vertex[ i++ ] = 0;
				vertex[ i++ ] = 1;
			}
			if ( texCoord ) {
				let offset = texCoord.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i++ ] = xx / ( xdivisions - 1 );
				vertex[ i++ ] = yy / ( ydivisions - 1 );
			}
			index += stride;
		}
	}
	attribute.set();
	return geometry;
}


Properties( createGridGeometry, {
	options : new GeometryPrimitiveOptions (
		function colorFn ( data, offset, x, y ) {
			data[ offset     ] = x; 
			data[ offset + 1 ] = y; 
			data[ offset + 2 ] = 1; 
		}
	),
});