import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class Halfedge {
	constructor ( toVertex, opposite, next, prev, face ) {
		Properties( this, {
			toVertex,
			face,
			next,
			prev,
			opposite
		}, C );
	}
	setVertex ( toVertex ) {
		Property( this, "toVertex", toVertex, C );
		return this;
	}
	setFace ( face ) {
		Property( this, "face", face, C );
		return this;
	}
	setNext ( nextHalfedge ) {
		Property( this, "next", nextHalfedge, C );
		return this;
	}
	setPrevious ( previousHalfedge ) {
		Property( this, "prev", previousHalfedge, C );
		return this;
	}
	setOpposite ( oppositeHalfedge ) {
		Property( this, "opposite", oppositeHalfedge, C );
		return this;
	}

}