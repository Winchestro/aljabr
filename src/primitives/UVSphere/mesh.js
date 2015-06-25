import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import Mesh from "../../mesh/Mesh.js";
import createUVSphereGeometry from "../UVSphere/geometry.js";

export default function createUVSphereMesh ( longitude = 10, latitude = 10) {
	let geometry = createUVSphereGeometry( longitude, latitude );
	latitude -= 1;
	let { triangles, lines, points } = createUVSphereMesh.options;
	let mesh = new Mesh;
	if ( triangles ) {
		let length = 6 * ( latitude - 1 ) * longitude;
		let data = allocateUint( length );

		let i = 0;
		let nextRow = longitude + 1;
		for ( let lon = 0; lon < longitude; lon++ ) {
			let thisCol = lon;
			let nextCol = lon + 1;
			
			let center = lon + 1 - ( lon % 2 );
			data[ i++ ] = nextRow + thisCol;
			data[ i++ ] = center;
			data[ i++ ] = nextRow + nextCol;
		}
		for ( let lat = 1; lat < ( latitude - 1 ); lat++ ) {
			let thisRow = lat * ( longitude + 1 );
			let nextRow = ( lat + 1 ) * ( longitude + 1 );
			for ( let lon = 0; lon < longitude; lon++ ) {
				let thisCol = lon;
				let nextCol = lon + 1;
				data[ i++ ] = thisRow + thisCol;
				data[ i++ ] = thisRow + nextCol;
				data[ i++ ] = nextRow + thisCol;

				data[ i++ ] = nextRow + thisCol;
				data[ i++ ] = thisRow + nextCol;
				data[ i++ ] = nextRow + nextCol;
			}
		}
		let thisRow = lat * ( longitude + 1 );
		for ( let lon = 0; lon < longitude; lon++ ) {
			let thisCol = lon;
			let nextCol = lon + 1;
			let center = lon + ( lon % 2 );
			data[ i++ ] = thisRow + thisCol;
			data[ i++ ] = thisRow + nextCol;
			data[ i++ ] = center;
		}
		
		mesh.setElement( "triangles", new ElementAttribute( geometry ).allocateBuffer( data ) );
	}

	//console.log( f, v );
	return mesh;
}

Properties( createUVSphereMesh, {
	options : {
		triangles : true,
		lines : false,
		points : false
	}
});