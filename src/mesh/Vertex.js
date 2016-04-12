define( [
    "../utilities/PropertyDescriptors",
    "../kernel/Float32Array"
], function module (
    def,
    Float32Array
){
    "use strict"; 
    const EDGE = { halfedgeA : null, halfedgeB : null };

    class Vertex {
        constructor ( index, buffer, structure ) {
            if ( buffer !== undefined && structure !== undefined ) this.createViews( index, buffer, structure );
            
            def.Property( this, "index", index );
            def.Property( this, "outgoingHalfedge", null, def.WRITABLE );
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
        /* Deprecated
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
        */
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

