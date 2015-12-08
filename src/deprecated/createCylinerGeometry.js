import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import GeometryPrimitiveOptions from "../GeometryPrimitiveOptions.js";
import Geometry from "../../mesh/Geometry.js";

export default function createCylinderGeometry ( divisions = 20 ) {
	let { structure, colorFn, usage, name, preallocateVertices } = createCylinderGeometry.options;
	let geometry = new Geometry().createVertexAttributeGroup(
		name,
		structure,
		xdivisions * ydivisions + preallocateVertices,
		usage
	);
	let attribute = geometry[ name ];
	let vertex = attribute.view;
	let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
	let { position, color, normal, texCoord } = attribute.data.structure;

	if ( position ) {
		let offset = position.offset / vertex.BYTES_PER_ELEMENT;
		vertex[ offset + 0 ] = 0;
		vertex[ offset + 1 ] = 1;
		vertex[ offset + 2 ] = 0;
		offset +=  divisions * stride;
		vertex[ offset + 0 ] = 0;
		vertex[ offset + 1 ] = -1;
		vertex[ offset + 2 ] = 0;
	}
	if ( color ) {
		let offset = color.offset / vertex.BYTES_PER_ELEMENT;
		colorFn( vertex, offset, 0 );
		offset +=  divisions * stride;
		colorFn( vertex, offset, 1 );
	}
}