import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

import Face from "../graph/Face.js";
import Halfedge from "../graph/Halfedge.js";
import Vertex from "../graph/Vertex.js";

import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import { Drawable, DisplayList } from "../mesh/Drawable.js";
import { TriangleElementAttribute, LineElementAttribute } from "../mesh/GeometryAttributes.js";

import { allocateUint } from "../utilities/misc.js";
/*
	A Graph wraps Geometries and Attributes and stores additional connectivity information.
	The graph is a drawable, and can be attached to drawables.

	If you just want to display something and not generate or modify it or query a lot of
	connectivity information, you probably won't need a graph at all and may want
	to save the overhead of using one and just use ElementAttributes.
*/

export class EdgeList extends Array {
	constructor ( halfedgeA = [], halfedgeB = [] ) {
		super ( );
		Properties( this, { halfedgeA, halfedgeB }, C | E );
	}
	forEach ( iterator ) {
		let index = 0;
		let listA = this.halfedgeA;
		let listB = this.halfedgeB;

		while ( index < listA.length || index < listB.lenght ) {
			let halfedgeA = listA[ index ];
			let halfedgeB = listB[ index ];

			if ( halfedgeA && halfedgeB ) iterator( halfedgeA, halfedgeB, index );
			index++;
		}
	}
	push ( halfedgeA, halfedgeB ) {
		if ( halfedgeB === undefined ) {
			// In case B isn't supplied it searches through every halfedgeA trying to find a
			// matching halfedge to make an edge.

			for ( let index = 0; index < this.halfedgeA.length; index++ ) {
				let halfedge = this.halfedgeA[ index ];
				let toVertex = halfedge.toVertex;
				let fromVertex = halfedge.prev.toVertex;

				if ( fromVertex === halfedgeA.toVertex && toVertex === halfedgeA.prev.toVertex ) {
					halfedgeB = this.halfedgeA[ index ];

					halfedgeB.setOpposite( halfedgeA );
					halfedgeA.setOpposite( halfedgeB );

					this.halfedgeB[ index ] = halfedgeA;
					return this;
				}
			}

		}
		this.halfedgeA.push( halfedgeA );
		this.halfedgeB.push( halfedgeB );
		return this;
	}
	get length ( ) {
		return Math.max( this.halfedgeA.length, this.halfedgeB.length );
	}
	set length ( n ) {
		this.halfedgeA.length = n;
		this.halfedgeB.length = n;
	}
}

export default class Graph extends Mesh {
	constructor ( geometry = new Geometry, indexData = [], vertices = [], edges = new EdgeList, faces = [] ) {
		super();
		Properties( this, {
			geometry,
			vertices,
			faces,
			edges
		}, C );

		this.makeVerticesFromGeometry();
		this.makeFacesFromIndexData( indexData );
	}
}
Properties( Graph.prototype, {
	makeVerticesFromGeometry ( geometry = this.geometry, start = 0, count = geometry.getVertexCount ) {
		for ( let index = start; index < count; index++ ) {
			this.vertices.push( new Vertex( geometry, index ) );
		}
		return this;
	},
	makeEdgeFromVertices ( vertexA, vertexB ) {
		let halfedgeA = vertexA.createHalfedgeTo( vertexB );
		let halfedgeB = vertexB.createHalfedgeTo( vertexA );

		halfedgeA.setOpposite( halfedgeB );
		halfedgeB.setOpposite( halfedgeA );

		this.edges.push( halfedgeA, halfedgeB );
		return this;
	},
	makeEdgesFromIndexData ( data ) {
		if ( this.edges.length ) this.edges.length = 0;

		for ( let i = 0; i < data.length; i += 2 ) {
			let vertexA = this.vertices[ data[ i + 0 ] ];
			let vertexB = this.vertices[ data[ i + 1 ] ];
			this.makeEdgeFromVertices( vertexA, vertexB );
		}

		return this;
	},
	makeEdgeFromFace ( face ) {

	},
	makeFaceFromVertices ( vertexA, vertexB, vertexC ) {
		let halfedgeA = vertexA.createHalfedgeTo( vertexB );
		let halfedgeB = vertexB.createHalfedgeTo( vertexC );
		let halfedgeC = vertexC.createHalfedgeTo( vertexA );

		halfedgeA.setNext( halfedgeB ).setPrevious( halfedgeC );
		halfedgeB.setNext( halfedgeC ).setPrevious( halfedgeA );
		halfedgeC.setNext( halfedgeA ).setPrevious( halfedgeB );

		this.edges.push( halfedgeA );
		this.edges.push( halfedgeB );
		this.edges.push( halfedgeC );
		this.makeFaceFromHalfedges( halfedgeA, halfedgeB, halfedgeC );
		return this;
	},
	makeFaceFromHalfedges( halfedgeA, halfedgeB, halfedgeC ) {
		let face = new Face( halfedgeA );

		halfedgeA.setFace( face );
		halfedgeB.setFace( face );
		halfedgeC.setFace( face );

		this.faces.push( face );

		return this;
	},
	makeFacesFromIndexData( data ) {
		if ( this.faces.length ) this.faces.length = 0;
		if ( this.edges.length ) this.edges.length = 0;

		for ( let i = 0; i < data.length; i+=3 ) {
			let vertexA = this.vertices[ data[ i + 0 ] ];
			let vertexB = this.vertices[ data[ i + 1 ] ];
			let vertexC = this.vertices[ data[ i + 2 ] ];
			this.makeFaceFromVertices( vertexA, vertexB, vertexC );
		}
		return this;
	},
	createEdgeDrawable ( ) {
		return new LineElementAttribute( this.geometry, this.getEdgeData() );
	},
	createFaceDrawable ( ) {
		return new TriangleElementAttribute( this.geometry, this.getFaceData() );
	},
	getEdgeData ( data ) {
		if ( data === undefined ) data = allocateUint( this.edges.length * 2 );
		this.edges.forEach( function ( halfedgeA, halfedgeB, index ) {
			data[ index * 2 + 0 ] = halfedgeA.toVertex.index;
			data[ index * 2 + 1 ] = halfedgeB.toVertex.index;
		});
		return data;
	},
	getFaceData ( data ) {
		if ( data === undefined ) data = allocateUint( this.faces.length * 3 );
		this.faces.forEach( function ( face, index ) {
			let halfedge = face.halfedge;
			data[ index * 3 + 0 ] = halfedge.toVertex.index;
			data[ index * 3 + 1 ] = halfedge.next.toVertex.index;
			data[ index * 3 + 2 ] = halfedge.prev.toVertex.index;
		});
		return data;
	},
	updateEdgeDrawable( index ) {
		let attr = this[ index ];
		if ( this.edges.length !== attr.length ) attr.allocateBuffer( this.getEdgeData() );
		else attr.update( this.getEdgeData( attr.data ) );
		return this;
	},
	updateFaceDrawable( index ) {
		let attr = this[ index ];
		if ( this.faces.length !== attr.length ) attr.allocateBuffer( this.getFaceData() );
		else attr.update( this.getFaceData( attr.data ) );
		return this;
	}
});

Properties( Graph.prototype, {
	Vertex,
	Halfedge,
	Face
}, C | W );