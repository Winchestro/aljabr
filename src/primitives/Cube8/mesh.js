import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import Mesh from "../../mesh/Mesh.js";
import createCube8Geometry from "../Cube8/geometry.js";

export default function createCube8Mesh ( x1 = 1, x2 = -1, y1 = x1, y2 = x2, z1 = x1, z2 = x2 ) {
	let geometry = createCube8Geometry( x1, x2, y1, y2, z1, z2 );
	let vertex = new VertexPtr( geometry );
	let { triangles, lines, points } = createCube8Mesh.options;

	let v = [
		vertex.pointTo( 0 ),
		vertex.pointTo( 1 ),
		vertex.pointTo( 2 ),
		vertex.pointTo( 3 ),
		vertex.pointTo( 4 ),
		vertex.pointTo( 5 ),
		vertex.pointTo( 6 ),
		vertex.pointTo( 7 )
	];
	let f = [
		new Face( v[ 2 ], v[ 0 ], v[ 3 ] ), //0
		new Face( v[ 3 ], v[ 0 ], v[ 1 ] ), //1
		new Face( v[ 5 ], v[ 3 ], v[ 7 ] ), //2
		new Face( v[ 7 ], v[ 3 ], v[ 1 ] ), //3
		new Face( v[ 6 ], v[ 7 ], v[ 0 ] ), //4
		new Face( v[ 0 ], v[ 7 ], v[ 1 ] ), //5
		new Face( v[ 4 ], v[ 6 ], v[ 2 ] ), //6
		new Face( v[ 2 ], v[ 6 ], v[ 0 ] ), //7
		new Face( v[ 4 ], v[ 5 ], v[ 6 ] ), //8
		new Face( v[ 6 ], v[ 5 ], v[ 7 ] ), //9
		new Face( v[ 4 ], v[ 2 ], v[ 5 ] ), //10
		new Face( v[ 5 ], v[ 2 ], v[ 3 ] )  //11
	];

	v[ 0 ].hEdge = f[  4 ].hEdgeA;
	v[ 1 ].hEdge = f[  1 ].hEdgeA;
	v[ 2 ].hEdge = f[  6 ].hEdgeA;
	v[ 3 ].hEdge = f[  0 ].hEdgeA;
	v[ 4 ].hEdge = f[  6 ].hEdgeB;
	v[ 5 ].hEdge = f[ 10 ].hEdgeA;
	v[ 6 ].hEdge = f[  8 ].hEdgeA;
	v[ 7 ].hEdge = f[  2 ].hEdgeA;

	f[  0 ].setEdges( f[ 11 ].hEdgeC, f[  7 ].hEdgeA, f[  1 ].hEdgeB );
	f[  1 ].setEdges( f[  3 ].hEdgeC, f[  0 ].hEdgeC, f[  5 ].hEdgeA );
	f[  2 ].setEdges( f[  9 ].hEdgeC, f[ 11 ].hEdgeA, f[  3 ].hEdgeB );
	f[  3 ].setEdges( f[  5 ].hEdgeC, f[  2 ].hEdgeC, f[  1 ].hEdgeA );
	f[  4 ].setEdges( f[  7 ].hEdgeC, f[  9 ].hEdgeA, f[  5 ].hEdgeB );
	f[  5 ].setEdges( f[  1 ].hEdgeC, f[  4 ].hEdgeC, f[  3 ].hEdgeA );

	f[  6 ].setEdges( f[ 10 ].hEdgeB, f[  8 ].hEdgeA, f[  7 ].hEdgeB );
	f[  7 ].setEdges( f[  0 ].hEdgeB, f[  6 ].hEdgeC, f[  4 ].hEdgeA );
	f[  8 ].setEdges( f[  6 ].hEdgeB, f[ 10 ].hEdgeA, f[  9 ].hEdgeB );
	f[  9 ].setEdges( f[  4 ].hEdgeB, f[  8 ].hEdgeC, f[  2 ].hEdgeA );
	f[ 10 ].setEdges( f[  8 ].hEdgeB, f[  6 ].hEdgeA, f[ 11 ].hEdgeB );
	f[ 11 ].setEdges( f[  2 ].hEdgeB, f[ 10 ].hEdgeC, f[  0 ].hEdgeA );

	let mesh = new Mesh( geometry, f, v );
	if ( triangles ) mesh.createElement(
		"triangles",
		new Uint8Array([
			2, 0, 3,
			3, 0, 1,
			5, 3, 7,
			7, 3, 1,
			6, 7, 0,
			0, 7, 1,
			4, 6, 2,
			2, 6, 0,
			4, 5, 6,
			6, 5, 7,
			4, 2, 5,
			5, 2, 3
		]),
		GL.TRIANGLES,
		GL.DYNAMIC_DRAW
	);
	if ( lines ) mesh.createElement(
		"lines",
		new Uint8Array([
			0,1, 2,3,
			2,0, 3,1,
			0,6, 1,7,
			2,4, 3,5,
			4,5, 6,7,
			4,6, 5,7
		]),
		GL.LINES,
		GL.DYNAMIC_DRAW
	);
	if ( points ) mesh.createElement(
		"points",
		new Uint8Array([ 0, 1, 2, 3, 4, 5, 6, 7 ] ),
		GL.POINTS,
		GL.DYNAMIC_DRAW
	);
	//console.log( f, v );
	return mesh;
}

Properties( Cube8, {
	options : {
		triangles : true,
		lines : true,
		points : false
	},
});


