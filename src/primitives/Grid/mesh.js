import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import Mesh from "../../mesh/Mesh.js";
import createGridGeometry from "../Grid/geometry.js";

export default function createGridMesh ( xDivisions = 10, yDivisions = 10, heightFn ) {
	let geometry = createGridGeometry( xDivisions, yDivisions, heightFn );
	xDivisions+=2;
	yDivisions+=2;
	let { triangles, lines, points, name } = createGridMesh.options;
	let mesh = new Mesh( geometry );
	if ( triangles ) {
		let length = 6 * ( xDivisions ) * ( yDivisions ) ;
		let data = length < ( 1 << 8 ) ?
		new Uint8Array( length ) : length < ( 1 << 16 ) ?
		new Uint16Array( length ) : 
		new Uint32Array( length );

		let i = 0;
		for ( let x = 0; x < xDivisions - 1; x++ ) {
			let thisRow = x * yDivisions;
			let nextRow = ( x + 1 ) * yDivisions;
			for ( let y = 0; y < yDivisions - 1; y++ ) {
				let yWrap = ( y % ( yDivisions - 1 ) ) + 1;

				data[ i++ ] = thisRow + y;

				data[ i++ ] = nextRow + y;
				data[ i++ ] = thisRow + yWrap;
				data[ i++ ] = thisRow + yWrap;
				data[ i++ ] = nextRow + y;

				data[ i++ ] = nextRow + yWrap;
			}
		}
		mesh.createElement( "triangles", data, GL.TRIANGLES, GL.DYNAMIC_DRAW	);
	}
	return mesh;
}

Properties( createGridMesh, {
	options : {
		triangles : true,
		lines : false,
		points : false
	}
});