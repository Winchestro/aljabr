define( [
    "../utilities/PropertyDescriptors",
    "../math/vec3"
], function module (
    def,
    vec3
){
    "use strict";

    class Face {
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

    return Face;
});