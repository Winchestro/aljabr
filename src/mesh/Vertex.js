define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
    "use strict"; 
    const EDGE = { halfedgeA : null, halfedgeB : null };

    class Vertex {
        constructor ( index, buffer, structure ) {
            if ( buffer !== undefined && structure !== undefined ) this.createViews( index, buffer, structure );
            
            this.index = index;
            this.outgoingHalfedge = null;
        }
        createViews( index, buffer, structure ) {
            for ( let attributeName in structure ) {
                let location = structure[ attributeName ];

                this[ attributeName ] = new Float32Array(
                    buffer,
                    index * location.stride + location.offset,
                    location.size
                );
            }
        }

        rotateOutgoingHalfedgeRight ( ) {
            let currentHalfedge = this.outgoingHalfedge;
            let startHalfedge = currentHalfedge;
            while (
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.rightOutgoingHalfedge )
                && currentHalfedge !== startHalfedge
            ) {
                this.outgoingHalfedge = currentHalfedge;
            }
        }
        rotateOutgoingHalfedgeLeft ( ) {
            let currentHalfedge = this.outgoingHalfedge;
            while (
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.leftOutgoingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge
            ) {
                this.outgoingHalfedge = currentHalfedge;
            }
        }
        *[ Symbol.iterator ] ( ) {
            //TODO : Implement vertex splitting, vertex iterator
        }
        
        *outgoingHalfedges ( ) {
            let currentHalfedge = this.outgoingHalfedge;

            if ( currentHalfedge ) yield currentHalfedge;

            while ( 
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.rightOutgoingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge
            ) yield currentHalfedge;
        }
        *incomingHalfedges ( ) {
            let currentHalfedge = this.outgoingHalfedge && this.outgoingHalfedge.previousHalfedge;

            if ( currentHalfedge ) yield currentHalfedge;

            while ( 
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.leftIncomingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge.previousHalfedge
            ) yield currentHalfedge;
        }

        *outgoingVertices ( ) {
            let currentHalfedge = this.outgoingHalfedge;

            if ( currentHalfedge ) yield currentHalfedge.toVertex;

            while ( 
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.leftOutgoingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge
            ) yield currentHalfedge.toVertex;
        }
        *incomingVertices ( ) {
            let currentHalfedge = this.outgoingHalfedge && this.outgoingHalfedge.previousHalfedge;

            if ( currentHalfedge ) yield currentHalfedge.toVertex;

            while ( 
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.leftIncomingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge.previousHalfedge
            ) yield currentHalfedge.toVertex;
        }

        *faces ( ) {
            let currentHalfedge = this.outgoingHalfedge;

            if ( currentHalfedge ) yield currentHalfedge.face;

            while ( 
                currentHalfedge
                && ( currentHalfedge = currentHalfedge.leftOutgoingHalfedge )
                && currentHalfedge !== this.outgoingHalfedge
            ) yield currentHalfedge.face;
        }
    }


    return Vertex;
});

