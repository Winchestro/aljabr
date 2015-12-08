define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
    "use strict";

    class Face {
        constructor ( halfedge, length ) {
            this.halfedge = halfedge;
            this.length = length;
            /*
            def.Properties( this, {
                halfedge,
                length
            }, def.CONFIGURABLE );
            */
        }
        /*
        setHalfedge( halfedge ) {
            //def.Property( this, "halfedge", halfedge, def.CONFIGURABLE );
            this.halfedge = halfedge;
            return this;
        }
        setLength( length ) {
            //def.Property( this, "length", length, def.CONFIGURABLE );
            this.length = length;
            return this;
        }
        */

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