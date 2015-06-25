import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";


export default class Face {
	constructor ( halfedge ) {
		Property( this, "halfedge", halfedge, C );
	}
	setHalfedge( halfedge ) {
		Property( this, "halfedge", halfedge, C );
		return this;
	}
	*vertices ( ) {
		let currentHalfedge = this.halfedge;
		do {
			yield currentHalfedge.toVertex;
			currentHalfedge = currentHalfedge.next;
		} while ( currentHalfedge !== this.halfedge );
	}
	*halfedges ( ) {
		let currentHalfedge = this.halfedge;
		do {
			yield currentHalfedge;
			currentHalfedge = currentHalfedge.next;
		} while ( currentHalfedge !== this.halfedge );
	}
	*edges ( ) {
		let currentHalfedge = this.halfedge;
		let edge = { halfedgeA : null, halfedgeB : null };
		do {
			edge.halfedgeA = currentHalfedge;
			edge.halfedgeB = currentHalfedge.opposite;
			yield edge;
			currentHalfedge = currentHalfedge.next;
		} while ( currentHalfedge !== this.halfedge );
	}
	
}
Face.prototype[ Symbol.iterator ] = function* (  ) {
	let currentHalfedge = this.halfedge;
	do {
		yield currentHalfedge.opposite.face;
		currentHalfedge = currentHalfedge.next;
	} while ( currentHalfedge !== this.halfedge );
}