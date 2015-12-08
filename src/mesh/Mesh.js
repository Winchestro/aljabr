define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../mesh/FaceList",
    "../mesh/EdgeList",
    "../mesh/VertexList"
], function module (
    def,
    gl,
    FaceList,
    EdgeList,
    VertexList
){
    "use strict";


    class Mesh {
        constructor ( uniforms, vertices, edges, faces, children ) {
            if ( edges === undefined ) edges = new EdgeList;
            if ( faces === undefined ) faces = new FaceList;
            if ( children === undefined ) children = [];
            if ( uniforms ) def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );


            def.Properties( this, {
                vertices,
                faces,
                edges,
                children
            }, def.CONFIGURABLE );

            
            
        }

        draw ( scene, camera, lights, partentMesh ) {
            if ( partentMesh ) partentMesh.vertices.unbind();
            this.vertices.bind();
            
            
            if ( this.ondraw ) this.ondraw();

            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].push( this[ element ] );
            }

            for ( var i = 0; i < this.children.length; i++) {
                this.children[ i ].draw( scene, camera, lights, this );
            }
            

            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].pop();
            }

            this.vertices.unbind();
            if ( partentMesh ) partentMesh.vertices.bind();
        }
        
        createNormalMesh ( material, normalLength ) {
            if ( normalLength === undefined ) normalLength = 1;
            
            let size = this.vertices.length * 2;

            let vertices = new VertexList({
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 )
            }, size );
            let mesh = new Mesh( null, vertices );
            
            //let buffer = new Float32Array( vertices.buffer );
        

            for ( let index = 0; index < this.vertices.length; index++ ) {
                let sourceVertex = this.vertices[ index ];

                let baseVertex = vertices[ index * 2 ];

                baseVertex.position.set( sourceVertex.position );
                baseVertex.color.set( sourceVertex.color );

                let normalVertex = vertices[ index * 2 + 1 ];
                const _x_ = 0;
                const _y_ = 1;
                const _z_ = 2;

                normalVertex.position.setValues(
                    sourceVertex.position[_x_] + sourceVertex.normal[_x_] * normalLength,
                    sourceVertex.position[_y_] + sourceVertex.normal[_y_] * normalLength,
                    sourceVertex.position[_z_] + sourceVertex.normal[_z_] * normalLength
                );
                normalVertex.color.set( sourceVertex.color );
            };
            vertices.update();

            
            let buffer = allocateUint( size );
            for ( let offset = 0; offset < size; ) {
                buffer[ offset ] = offset++;
                buffer[ offset ] = offset++;
            }

            let normalElement = new Element( material, undefined, gl.LINES ).allocateBuffer(
                buffer
            )

            mesh.children.push( normalElement );
            //def.Properties( mesh, this, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
            return mesh;
        }


        createFace ( ) {

            let vertices = this.vertices.dereference( arguments );
            //create corresponding halfedges from vertices
            let halfedges = this.edges.createEdgeLoopFromVertices.apply( this.edges, vertices );

            //create face from the halfedge loop
            let face = this.faces.createFromHalfedgeLoop.apply( this.faces, halfedges );

            return face;
        }
        mergeVertices ( ) {
            let vertices = this.vertices.dereference( arguments );


            
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


            /*
                set opposite halfedge

            */

            /*
                set outgoing halfedge on all vertices to the same halfedge, identifying
                them as one vertex. 

                This has to be an open halfedge if there is one to make iteration over
                open halfedges by following outgoing halfedges possible.
            */
            

            return this;
        }
        
        alignHalfedges ( ) {
            for ( let vertex of this.vertices ) {
                vertex.rotateOutgoingHalfedgeRight();
            }
        }   
        
        
    }

    def.Properties( Mesh.prototype, {
        ondraw : null,
        EdgeList,
        FaceList
    }, def.WRITABLE );

    return Mesh;
});