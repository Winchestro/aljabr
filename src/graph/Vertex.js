import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import Halfedge from "../graph/Halfedge.js";

export default class Vertex {
	constructor ( geometry, index ) {
		for ( let attribute in geometry ) geometry[ attribute ].createVertexAttributeViews( this, index );
			Property( this, "index", index );
	}
	
}

Properties( Vertex.prototype, {
	
	addAttributeBuffer ( name, buffer ) {
		Property( this, name, buffer, C | E );
		return this;
	},
	setOutgoingHalfedge( out ) {
		Property( this, "out", out, C );
		return this;
	},
	createHalfedgeTo ( vertex ) {
		let halfedge = new Halfedge( vertex );
		
		if ( !this.out ) this.setOutgoingHalfedge( halfedge );
		return halfedge;
	},
	*outHalfedges ( ) {
		let currentHalfedge = this.out;
		do {
			//console.log( currentHalfedge );
			yield currentHalfedge;
			currentHalfedge = currentHalfedge.opposite.next;
		} while ( currentHalfedge !== this.out );
	},
	*inHalfedges ( ) {
		let currentHalfedge = this.out;
		do {
			yield currentHalfedge.opposite;
			currentHalfedge = currentHalfedge.opposite.next;
		} while ( currentHalfedge !== this.out );
	},
	*edges ( ) {
		let currentHalfedge = this.out;
		let edge = { halfedgeA : null, halfedgeB : null };
		do {
			edge.halfedgeA = currentHalfedge;
			edge.halfedgeB = currentHalfedge.opposite;
			yield edge;
			currentHalfedge = currentHalfedge.opposite.next;
		} while ( currentHalfedge !== this.out );
	},
	*faces ( ) {
		let currentHalfedge = this.out;
		do {
			yield currentHalfedge.face;
			currentHalfedge = currentHalfedge.opposite.next;
		} while ( currentHalfedge !== this.out );
	}
});

Vertex.prototype[ Symbol.iterator ] = function* ( ) {
	let currentHalfedge = this.out;
	do {
		yield currentHalfedge.toVertex;
		currentHalfedge = currentHalfedge.opposite.next;
	} while ( currentHalfedge !== this.out );
}
/*
export class Vertex {
	constructor ( out ) {
		this.out = out;
	}
	createEdgeBetween ( vertex, halfedges ) {
		let halfedgeA = new Halfedge( this );
		let halfedgeB = new Halfedge( vertex );
		halfedgeA.setOpposite( halfedgeB );
		halfedgeB.setOpposite( halfedgeA );

		if ( !this.out ) this.out = halfedgeB;
		if ( !vertex.out ) vertex.out = halfedgeA;

		halfedges.push( halfedgeA );
		return this;
	}
}
*/
