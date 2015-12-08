define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
    "use strict";

    class Halfedge {
        constructor ( toVertex, oppositeHalfedge, nextHalfedge, previousHalfedge, face ) {
            this.toVertex = toVertex;
            this.oppositeHalfedge = oppositeHalfedge;
            this.nextHalfedge = nextHalfedge;
            this.previousHalfedge = previousHalfedge;
            this.oppositeHalfedge = oppositeHalfedge;
        }

        get toIndex ( ) {
            if ( this.toVertex ) {
                return this.toVertex.index;
            }
        }
        get fromVertex ( ) {
            if ( this.previousHalfedge && this.previousHalfedge.toVertex ) {
                return this.previousHalfedge.toVertex;
            }
        }

        get fromIndex ( ) {
            let fromVertex = this.fromVertex;
            if ( fromVertex ) {
                return fromVertex.index;
            }
            
        }

        get leftOutgoingHalfedge ( ) {
            if ( this.previousHalfedge && this.previousHalfedge.oppositeHalfedge ) {
                return this.previousHalfedge.oppositeHalfedge;
            }
        }
        
        get rightOutgoingHalfedge ( ) {
            if ( this.oppositeHalfedge && this.oppositeHalfedge.nextHalfedge ) {
                return this.oppositeHalfedge.nextHalfedge;
            }
        }

        get leftIncomingHalfedge ( ) {
            if ( this.oppositeHalfedge && this.oppositeHalfedge.previousHalfedge ) {
                return this.oppositeHalfedge.previousHalfedge;
            }
        }
        get rightIncomingHalfedge ( ) {
            if ( this.nextHalfedge && this.nextHalfedge.oppositeHalfedge ) {
                return this.nextHalfedge.oppositeHalfedge;
            }   
        }
    }

    return Halfedge;
});