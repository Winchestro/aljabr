define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../mesh/FaceList",
    "../mesh/EdgeList",
    "../mesh/VertexList",
    "../mesh/Renderable",
    "../mesh/Element"
], function module (
    def,
    gl,
    FaceList,
    EdgeList,
    VertexList,
    Renderable,
    Element
){
    "use strict";


    class Mesh extends Renderable {
        constructor ( uniforms, children ) {
            super( children );

            class MeshVertexList extends VertexList {};
            def.Property( MeshVertexList.prototype, "mesh", this );


            class MeshEdgeList extends EdgeList {};
            def.Property( MeshEdgeList.prototype, "mesh", this );
            
            class MeshFaceList extends FaceList {};
            def.Property( MeshFaceList.prototype, "mesh", this );

            

            def.Properties( this, {
                MeshVertexList,
                MeshEdgeList,
                MeshFaceList
            });

            

            if ( uniforms ) def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
            
            def.Properties( this, {
                vertices : new MeshVertexList,
                faces : new MeshFaceList,
                edges : new MeshEdgeList
            }, def.CONFIGURABLE );

            def.Property( this, "visible", true, def.WRITABLE );
            
        }

        clearSelections ( ) {
            this.vertices.selection.clear();
            this.edges.selection.clear();
            this.faces.selection.clear();
            return this;
        }

        setVertices ( vertexList ) {
            def.Property( this, "vertices", vertexList, def.CONFIGURABLE );
            return this.vertexList;
        }

        update ( camera, scene, lights, partentMesh ) {
            for ( let drawable of this.children ) drawable.update( camera, scene, lights, this );
        }

        draw ( camera, scene, lights, partentMesh ) {
            if ( !this.visible ) return;
            if ( partentMesh ) partentMesh.vertices.unbind();
            this.vertices.bind();
            
            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].push( this[ element ] );
            }

            for ( let drawable of this.children ) drawable.draw( camera, scene, lights, this );

            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].pop();
            }

            this.vertices.unbind();
            if ( partentMesh ) partentMesh.vertices.bind();
        }
        // start todo : maybe refactor those methods
        createFaceFromVertices ( ) {
            let halfedges = this.edges.createEdgeLoopFromVertices.apply( this.edges, arguments );
            let face = this.faces.createFromHalfedgeLoop.apply( this.faces, halfedges );
            return face;
        }

        createFace ( ) {
            let vertices = this.vertices.dereference( arguments );
            let halfedges = this.edges.createEdgeLoopFromVertices.apply( this.edges, vertices );
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

            return this;
        }
        // end todo

        createPointElement ( material ) {
            this.addChild( "points", this.vertices.createElement( material ) );
            return this;
        }
        updatePointElement ( ) {
            this.points.allocateBuffer( this.vertices.getData( this.points.view ) );
            return this;
        }

        createLineElement ( material ) {
            this.addChild( "lines", this.edges.createElement( material ) );
            return this;
        }
        updateLineElement ( ) {
            this.lines.allocateBuffer( this.edges.getData( this.lines.view ) );
            return this;    
        }


        createTriangleElement ( material ) {
            this.addChild( "triangles", this.faces.createElement( material ) );
            return this;
        }
        updateTriangleElement ( ) {
            this.triangles.allocateBuffer( this.faces.getData( this.triangles.view ) );
            return this;    
        }

        createNormalElement ( material, normalLength ) {
            if ( normalLength === undefined ) normalLength = 5;
            
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
            vertices.allocateVBO();

            
            let buffer = allocateUint( size );
            for ( let offset = 0; offset < size; ) {
                buffer[ offset ] = offset++;
                buffer[ offset ] = offset++;
            }

            let normalElement = new Element( material, undefined, gl.LINES ).allocateBuffer(
                buffer
            )

            mesh.children.push( normalElement );
            this.addChild( "normals", mesh, material );
            //def.Properties( mesh, this, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
            return this;
        }

    }

    def.Properties( Mesh.prototype, {
        ondraw : null
      
    }, def.WRITABLE );

    return Mesh;
});