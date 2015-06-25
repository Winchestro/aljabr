import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import GeometryPrimitiveOptions from "../GeometryPrimitiveOptions.js";
import Geometry from "../../mesh/Geometry.js";

export default function createUVSphereGeometry ( longitude = 10, latitude = 10 ) {
	latitude -= 1;
	let { structure, colorFn, usage, preallocateVertices } = createUVSphereGeometry.options;
	let { PI, sin, cos } = Math;
	let geometry = new Geometry;
	
	geometry.createVertexAttributeGroup(
		structure,
		( 1 + longitude ) * ( latitude ) + preallocateVertices,
		usage
	);

	let attribute = geometry[ 0 ];
	let vertex = attribute.view;
	let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;


	let { position, color, texCoord, normal } = attribute.data.structure;
	//Place top and bottom vertex manually ( deprecated )
	/*
		if ( position ) {
			let offset = position.offset / vertex.BYTES_PER_ELEMENT;
			vertex[ offset + 0 ] = 0;
			vertex[ offset + 1 ] = 1;
			vertex[ offset + 2 ] = 0;
			offset +=  ( longitude * latitude + 1 ) * stride;
			vertex[ offset + 0 ] = 0;
			vertex[ offset + 1 ] = -1;
			vertex[ offset + 2 ] = 0;
		}
		if ( color ) {
			let offset = color.offset / vertex.BYTES_PER_ELEMENT;
			colorFn( vertex, offset, 1, 0 );
			offset +=  ( longitude * latitude + 1 ) * stride;
			colorFn( vertex, offset, 0, 1 );
		}
		if ( normal ) {
			let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
			vertex[ offset + 0 ] = 0;
			vertex[ offset + 1 ] = 1;
			vertex[ offset + 2 ] = 0;
			offset +=  ( longitude * latitude + 1 ) * stride;
			vertex[ offset + 0 ] = 0;
			vertex[ offset + 1 ] = -1;
			vertex[ offset + 2 ] = 0;
		}
		if ( texCoord ) {
			let offset = texCoord.offset / vertex.BYTES_PER_ELEMENT;
			vertex[ offset + 0 ] = 1;
			vertex[ offset + 1 ] = 0;
			offset +=  ( longitude * latitude + 1 ) * stride;
			vertex[ offset + 0 ] = 0;
			vertex[ offset + 1 ] = 1;
		}
	*/
	
	for ( let lat = 1; lat < latitude; lat++ ) {
		let theta = lat * PI / latitude;
		let sinTheta = sin( theta );
		let cosTheta = cos( theta );

		for ( let lon = 0; lon <= longitude; lon++ ) {
			let phi = lon * 2 * PI / longitude;
			let sinPhi = sin( phi );
			let cosPhi = cos( phi );
			let index = ( lat * ( longitude + 1 ) + lon ) * stride;
			let x = cosPhi * sinTheta;
			let y = cosTheta;
			let z = sinPhi * sinTheta;
			if ( position ) {
				let offset = position.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i     ] = x;
				vertex[ i + 1 ] = y;
				vertex[ i + 2 ] = z;
			}
			if ( color ) {
				let offset = color.offset / vertex.BYTES_PER_ELEMENT;
				colorFn( vertex, index + offset, sinPhi, lat / latitude );
			}
			if ( normal ) {
				let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i     ] = x;
				vertex[ i + 1 ] = y;
				vertex[ i + 2 ] = z;
			}
			if ( texCoord ) {
				let offset = texCoord.offset / vertex.BYTES_PER_ELEMENT;
				let i = index + offset;
				vertex[ i     ] = 1.- lon / ( longitude  );
				vertex[ i + 1 ] = lat / latitude;
			}

		}
	}
	for ( let lon = 0; lon <= longitude; lon++ ) {
		let UP = lon % 2;
		let index = lon * stride;
		if ( position ) {
			let offset = position.offset / vertex.BYTES_PER_ELEMENT;
			let i = index + offset;
			vertex[ i     ] = 0;
			vertex[ i + 1 ] = UP ? 1 : -1;
			vertex[ i + 2 ] = 0;
		}
		if ( color ) {
			let offset = color.offset / vertex.BYTES_PER_ELEMENT;
			colorFn( vertex, index + offset, UP ? 1 : 0, UP ? 0 : 1 );
		}
		if ( normal ) {
			let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
			let i = index + offset;
			vertex[ i     ] = 0;
			vertex[ i + 1 ] = UP ? 1 : -1;
			vertex[ i + 2 ] = 0;
		}

		if ( texCoord ) {
			let offset = texCoord.offset / vertex.BYTES_PER_ELEMENT;
			let i = index + offset;
			vertex[ i     ] = 1. - ( lon + -UP * .5 ) / longitude;
			vertex[ i + 1 ] = UP ? 0 : 1;
		}
	}
	attribute.set();
	return geometry;
}
Properties( createUVSphereGeometry, {
	options : new GeometryPrimitiveOptions (
		function ( data, offset, longitude, latitude ) {
			data[ offset     ] = latitude; 
			data[ offset + 1 ] =  ( longitude + 1 ) * .5;
			data[ offset + 2 ] = 1. - latitude; 
		}
	),
});