define ( [
    "../utilities/PropertyDescriptors",
    "../kernel/allocateUint",
    "../kernel/ArrayBuffer",
    "../kernel/PoolAllocator",
    "../webgl/Context",
    "../webgl/AttributeLocation",
    "../webgl/BufferObject",
    "../mesh/Vertex",
    "../mesh/VertexStructure",
    "../mesh/Element"
], function module (
    def,
    allocateUint,
    ArrayBuffer,
    PoolAllocator,
    gl,
    AttributeLocation,
    BufferObject,
    Vertex,
    VertexStructure,
    Element
) {
    "use strict";

    const DEFAULT_STRUCTURE = new VertexStructure({
        position    : new Float32Array( 3 ),
        color       : new Float32Array( 4 ),
        normal      : new Float32Array( 3 ),
        uv          : new Float32Array( 2 )
    });

    class VertexList extends PoolAllocator {
        constructor (  ) {
            super();
            let structure = this.VertexStructure;
            let BYTES_PER_ELEMENT = structure.stride;
            
            let buffer = new ArrayBuffer( 0 );

            class ListVertex extends Vertex {};
            def.Property( ListVertex.prototype, "list", this );
            

            def.Properties( this, {
                selection : new Set,
                ListVertex,
                structure,
                buffer,
                BYTES_PER_ELEMENT,
            }, def.CONFIGURABLE );
        }

        createItems ( count ) {
            if ( count === undefined ) count = this.pool.length;
            while ( count-- ) this.createItem();
        }
        
        createItem ( outgoingHalfedge ) {
            if ( outgoingHalfedge === undefined ) outgoingHalfedge = null;
            
            // experimental dynamic growth. buffer dynamically doubles in size. slower than pre-allocating in most cases
            if ( !this.pool.length ) this.allocateItems( this.maxLength );

            // todo - vertex order should be irrelevant, should pop rather than dequeue
            let vertex = this.pool.shift();
            
            vertex.outgoingHalfedge = outgoingHalfedge;
            this.selection.add( vertex );
            this.push( vertex );
            return vertex;
        }

        setVertexStructure ( structureDescription ) {
            let structure = new VertexStructure( structureDescription );
            let BYTES_PER_ELEMENT = structure.stride;

            def.Properties( this, {
                structure,
                BYTES_PER_ELEMENT
            }, def.CONFIGURABLE );
        }

        static setDefaultVertexStructure ( structureDescription ) {

            def.Property( VertexList.prototype, "VertexStructure", new VertexStructure( structureDescription ), def.CONFIGURABLE );
        }

        allocateVBO ( usage ) {
            if ( usage === undefined ) {
                if ( this.buffer.target ) usage = this.buffer.target.usage;
                else usage = gl.STATIC_DRAW;
            }
            if ( this.buffer.target ) this.buffer.target.bind().allocate( this.buffer, usage );
            else this.buffer.setTarget( new BufferObject.Vertex().bind().allocate( this.buffer, usage ) );

            return this;
        }

        allocateItems ( length ) {
            let oldLength = this.maxLength;
            let newLength = oldLength + length;

            let newByteLength = this.BYTES_PER_ELEMENT * newLength;
            
            let oldBuffer = this.buffer;
            let newBuffer = new ArrayBuffer( newByteLength );
            def.Property( this, "buffer", newBuffer, def.CONFIGURABLE );


            for ( let index = 0; index < oldLength; index++ ) this[ index ].createViews( index, newBuffer, this.structure );
            for ( let index = oldLength; index < newLength; index++ ) this.pool.push( new this.ListVertex( index, newBuffer, this.structure ) );
            
            this.copyArrayBuffer( oldBuffer );

            let vbo = oldBuffer.target;
            if ( vbo ) {
                newBuffer.setTarget( vbo );
                vbo.bind().allocate( newBuffer, vbo.usage );

            }
            
            

            return this;
        }

        updateVBO ( ) {
            this.buffer.update( );
            return this;
        }

        copyArrayBuffer ( sourceBuffer ) {
            let targetBuffer = this.buffer;

            let sourceView = new Float32Array( sourceBuffer );
            let targetView = new Float32Array( targetBuffer );

            targetView.set( sourceView );
            return this;
        }

        bind ( ) {
            if ( this.buffer.target ) {
                this.buffer.target.bind( );
                for ( var locationName in this.structure ) this.structure[ locationName ].enable();
            }
            return this;
        }

        unbind ( ) {
            for ( var locationName in this.structure ) this.structure[ locationName ].disable();
            //this.buffer.target.unbind( );
            return this;
        }

        *[ Symbol.iterator ] ( ) {
            let i = -1;
            let max = this.length - 1;
            while ( i++ < max ) yield this[ i ];
        }

        join ( vertices ) {
            
            let openHalfedge = null;
            for ( let vertex of vertices ) {
                if ( !vertex.outgoingHalfedge.oppositeHalfedge ) openHalfedge = vertex.outgoingHalfedge;
            }
            
            if ( !openHalfedge ) openHalfedge = vertices[ 0 ].outgoingHalfedge;

            for ( let vertex of vertices ) {
                vertex.outgoingHalfedge = openHalfedge;
            }

            return this;
        }
        
        createElement ( material, uniforms, usage, buffer ) {
            return new Element( material, uniforms, gl.POINTS ).allocateBuffer( this.getData( buffer ), usage );
        }

        getData ( buffer ) {
            if ( buffer === undefined ) buffer = allocateUint( this.length );
            
            for ( let index = 0; index < this.length; index++ ) {
                buffer[ index ] = index;
            };
            return buffer;
        }
        
        dereference ( indexData, fromIndex, toIndex ) {
            if ( fromIndex === undefined ) fromIndex = 0;
            if ( toIndex === undefined ) toIndex = indexData.length;

            for ( let index = fromIndex; index < toIndex; index++ ) {
                let vertex = this[ indexData[ index ] ];
                if ( vertex === undefined ) throw new ReferenceError("index out of bounds:" + indexData[ index ] );
                indexData[ index ] = vertex;
            }
            
            return indexData;
        }

        get byteLength ( ) {
            return this.buffer.byteLength;
        }

        get maxLength ( ) {
            return this.length + this.pool.length;
        }
    }

    def.Properties( VertexList.prototype, {
        VertexStructure : DEFAULT_STRUCTURE,
        splice : [].splice,
        push : [].push,
        forEach : [].forEach
        
    }, def.CONFIGURABLE );

    return VertexList;
});