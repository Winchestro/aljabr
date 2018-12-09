import def from "../utilities/PropertyDescriptors.js";
import allocateUint from "../kernel/allocateUint.js";
import Renderable from "../mesh/Renderable.js";
import Element from "../mesh/Element.js";
import Geometry from "../mesh/Geometry.js";
/*
    Big Mesh Refactoring


    A mesh is a collection of everything related to updating and rendering a specific entity in the scene.

    The mesh interface has 4 methods : bind, unbind, update and draw.
    
    bind : drawing started or resumed
    unbind : drawing finished or paused
    update : done before any drawing starts
    draw : the drawing

    Context-sensitive : A Redinering context for this class is required at instantiation and runtime.

    Ideally all Context-Insensitive functionality should be refactored into a new class, like "geometry".
    This way it can be instantiated and used outside of rendering context ( like a server or worker thread ).

    

*/   

export default class Mesh extends Renderable {
    constructor ( geometry, uniforms, children ) {
        super( children );
        

        if ( uniforms ) def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        
        def.Properties( this, {
            geometry
        }, def.CONFIGURABLE );

        def.Property( this, "visible", true, def.WRITABLE );
        
    }

    bind ( ) {
        this.geometry.vertices.bind( );
    }

    unbind ( ) {
        this.geometry.vertices.unbind();
    }

    update ( camera, scene, lights, partentMesh ) {
        for ( let drawable of this.children ) drawable.update( camera, scene, lights, this );
    }

    draw ( camera, scene, lights, partentMesh ) {
        if ( !this.visible ) return;
        if ( partentMesh ) partentMesh.unbind();
        this.bind();
        
        for ( var element in scene.stacks ) {
            if ( this[ element ] ) scene.stacks[ element ].push( this[ element ] );
        }

        for ( let drawable of this.children ) drawable.draw( camera, scene, lights, this );

        for ( var element in scene.stacks ) {
            if ( this[ element ] ) scene.stacks[ element ].pop();
        }

        this.unbind();
        if ( partentMesh ) partentMesh.bind();
    }
    // start todo : maybe refactor those methods
    createFaceFromVertices ( ...vertices ) {
        let halfedges = this.geometry.edges.createEdgeLoopFromVertices.apply( this.geometry.edges, vertices );
        let face = this.geometry.faces.createFromHalfedgeLoop.apply( this.geometry.faces, halfedges );
        return face;
    }

    createFace ( ...vertexPtr ) {
        let vertices = this.geometry.vertices.dereference( vertexPtr );
        let halfedges = this.geometry.edges.createEdgeLoopFromVertices.apply( this.geometry.edges, vertices );
        let face = this.geometry.faces.createFromHalfedgeLoop.apply( this.geometry.faces, halfedges );

        return face;
    }
    mergeVertices ( ...vertexPtr ) {
        let vertices = this.geometry.vertices.dereference( vertexPtr );

        for ( let vertexA of vertices ) {
            for ( let vertexB of vertices ) {
                if ( vertexA.outgoingHalfedge !== vertexB.outgoingHalfedge ) {

                    for ( let incoming of vertexA.incomingHalfedges() ) {
                        for ( let outgoing of vertexB.outgoingHalfedges() ) {

                            if ( incoming.fromVertex.outgoingHalfedge === outgoing.toVertex.outgoingHalfedge && incoming.oppositeHalfedge !== outgoing ) {
                                this.geometry.edges.join( incoming, outgoing );
                            }
                        }
                    }
                }
            }
        }
        
        this.geometry.vertices.join( vertices );

        return this;
    }

    

    createPointElement ( material, uniforms, usage, buffer ) {
        this.addChild( "points", new Element.Points( material, uniforms ).allocateBuffer( this.geometry.vertices.getData( buffer ), usage ) );
        return this;
    }
    updatePointElement ( ) {
        this.points.allocateBuffer( this.geometry.vertices.getData( this.points.view ) );
        return this;
    }

    createLineElement ( material, uniforms, usage, buffer ) {
        this.addChild( "lines", new Element.Lines( material, uniforms ).allocateBuffer( this.geometry.edges.getData( buffer ), usage ) );
        return this;
    }
    updateLineElement ( ) {
        this.lines.allocateBuffer( this.geometry.edges.getData( this.lines.view ) );
        return this;    
    }


    createTriangleElement ( material, uniforms, usage, buffer ) {
        this.addChild( "triangles", new Element.Triangles( material, uniforms ).allocateBuffer( this.geometry.faces.getData( buffer ), usage ) );
        return this;
    }
    updateTriangleElement ( ) {
        this.triangles.allocateBuffer( this.geometry.faces.getData( this.triangles.view ) );
        return this;    
    }

    createNormalElement ( material, normalLength ) {
        if ( normalLength === undefined ) normalLength = 5;
        
        let size = this.geometry.vertices.length * 2;

        
        let geometry = new Geometry({
            position    : new Float32Array( 3 ),
            color       : new Float32Array( 4 )
        });

        let vertices = geometry.vertices;

        vertices.allocateItems( size ).createItems();
        
        //let buffer = new Float32Array( vertices.buffer );
        //console.log( vertices );

        for ( let index = 0, sourceVertex; sourceVertex = this.geometry.vertices[ index ]; index++ ) {
            
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
        vertices.allocateTarget();

        
        let buffer = allocateUint( size );
        for ( let offset = 0; offset < size; ) {
            buffer[ offset ] = offset++;
            buffer[ offset ] = offset++;
        }

        let normalElement = new Element( material, undefined, gl.LINES ).allocateBuffer(
            buffer
        )

        let mesh = new Mesh( geometry );
        mesh.children.push( normalElement );
        this.addChild( "normals", mesh );
        //def.Properties( mesh, this, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        return this;
    }

}

def.Properties( Mesh.prototype, {
    ondraw : null
  
}, def.WRITABLE );