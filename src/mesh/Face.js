import def from "../utilities/PropertyDescriptors.js";
import vec3 from "../math/vec3.js";

let NORMAL_V1 = new vec3;
let NORMAL_V2 = new vec3;

export default class Face {
    constructor ( halfedge, length, normal ) {
        this.halfedge = halfedge;
        this.normal = new vec3;
        this.length = length;
    }

    destroy ( ) {
        this.list.destroyItem( this );
    }

    extrude ( ) {
        
    }

    computeNormal ( ) {
        //TODO: what about non-coplanar faces with more than 3 vertices?
        
        let v0 = this.halfedge.toVertex;
        let v1 = this.halfedge.nextHalfedge.toVertex;
        let v2 = this.halfedge.nextHalfedge.nextHalfedge.toVertex;

        vec3.sub( NORMAL_V1, v0.position, v1.position );
        vec3.sub( NORMAL_V2, v2.position, v0.position );

        this.normal.cross( NORMAL_V2, NORMAL_V1 );

        return this;
    }

    *[ Symbol.iterator ] (  ) {
        let currentHalfedge = this.halfedge;
        do {
            yield currentHalfedge.oppositeHalfedge.face;
            currentHalfedge = currentHalfedge.nextHalfedge;
        } while ( currentHalfedge !== this.halfedge );
    }
    *vertices ( ) {
        let currentHalfedge = this.halfedge;
        do {
            yield currentHalfedge.toVertex;
            currentHalfedge = currentHalfedge.nextHalfedge;
        } while ( currentHalfedge !== this.halfedge );
    }
    *halfedges ( ) {
        let currentHalfedge = this.halfedge;
        do {
            yield currentHalfedge;
            currentHalfedge = currentHalfedge.nextHalfedge;
        } while ( currentHalfedge !== this.halfedge );
    }
    *edges ( ) {
        let currentHalfedge = this.halfedge;
        let edge = { halfedgeA : null, halfedgeB : null };
        do {
            edge.halfedgeA = currentHalfedge;
            edge.halfedgeB = currentHalfedge.oppositeHalfedge;
            yield edge;
            currentHalfedge = currentHalfedge.nextHalfedge;
        } while ( currentHalfedge !== this.halfedge );
    }   
}