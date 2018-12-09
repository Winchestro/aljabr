import def from "../utilities/PropertyDescriptors.js";
import FaceList from "../mesh/FaceList.js";
import EdgeList from "../mesh/EdgeList.js";
import VertexList from "../mesh/VertexList.js";
//TODO : Figure out how to handle loading contextless vertexlist in modules

export default class Geometry {
    constructor ( structure ) {

        def.Properties( this, {
            vertices : new VertexList( structure ),
            faces : new FaceList,
            edges : new EdgeList
        }, def.CONFIGURABLE );
    }

    setVertices ( vertexList ) {
        def.Property( this, "vertices", vertexList, def.CONFIGURABLE );
        return this;
    }

    createFaceFromVertices ( ...vertices ) {
        let halfedges = this.edges.createEdgeLoopFromVertices.apply( this.edges, vertices );
        let face = this.faces.createFromHalfedgeLoop.apply( this.faces, halfedges );
        return face;
    }

    createFace ( ...vertexIDs ) {
        let vertices = this.vertices.dereference( vertexIDs );
        let halfedges = this.edges.createEdgeLoopFromVertices.apply( this.edges, vertices );
        let face = this.faces.createFromHalfedgeLoop.apply( this.faces, halfedges );

        return face;
    }

    computeFaceNormals ( ) {
        for ( let face of this.faces ) {
            face.computeNormal();
        }
    }

    computeVertexNormals ( ) {
        for ( let vertex of this.vertices ) {

            vertex.normal.setValues( 0, 0, 0 );
            let count = 0;

            for ( let face of vertex.faces() ) {
                vertex.normal.add( face.normal );
                count++;
            }

            vertex.normal.divideScalar( count ).normalize();



        }

    }

    mergeVertices ( ...vertexIDs ) {
        let vertices = this.vertices.dereference( vertexIDs );

        for ( let vertexA of vertices ) {
            for ( let vertexB of vertices ) {
                if ( vertexA.outgoingHalfedge !== vertexB.outgoingHalfedge ) {

                    for ( let incoming of vertexA.incomingHalfedges() ) {
                        for ( let outgoing of vertexB.outgoingHalfedges() ) {

                            if ( incoming.fromVertex.outgoingHalfedge === outgoing.toVertex.outgoingHalfedge && incoming.oppositeHalfedge !== outgoing ) {
                                this.edges.join( incoming, outgoing );
                            }
                        }
                    }
                }
            }
        }
        
        this.vertices.join( vertices );

        return this;
    }

}