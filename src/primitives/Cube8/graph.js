import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import Mesh from "../../mesh/Mesh.js";
import Geometry from "../../mesh/Geometry.js";
import Graph from "../../graph/Graph.js";

import createCube8Geometry from "../Cube8/geometry.js";

export default function createCube8Graph ( ) {
	let geometry = createCube8Geometry();
	/*
	let graph = new Graph( geometry, [
		0, 1, 2, 	2, 1, 3,
		2, 3, 4, 	4, 3, 5,
		4, 5, 6, 	6, 5, 7,
		6, 7, 0, 	0, 7, 1,
		0, 2, 4, 	4, 6, 0,
		5, 3, 1, 	1, 7, 5
	] );
	*/
	let graph = new Graph( geometry, [
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
	]);

	// add drawing instructions for the graph
	//graph.addAttribute( "triangles", new TriangleElementAttribute( geometry, new Uint16Array([0,1,2,2,1,3]) ) );
	//graph.addAttribute( "lines", new LineElementAttribute( geometry, new Uint16Array ) );
	graph.addDrawable( graph.geometry );
	graph.addDrawable( graph.createEdgeDrawable( ) );
	graph.addDrawable( graph.createFaceDrawable( ) );
	//graph.addDrawable( graph.createFaceDrawable( ) );
	


	console.log( graph );

	return graph;
	//var halfedge = new Halfedge();
	// push to vertex, reference to outgoing halfedge
	// push to face, reference to any own halfedge
}