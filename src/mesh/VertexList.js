define ( [
    "../utilities/PropertyDescriptors",
    "../utilities/allocateUint",
    "../webgl/Context",
    "../webgl/AttributeLocation",
    "../webgl/BufferObject",
    "../mesh/Vertex",
    "../mesh/Element"
], function module (
    def,
    allocateUint,
    gl,
    AttributeLocation,
    BufferObject,
    Vertex,
    Element
) {
    "use strict";
    /*
        Drastically simplify vbo, geometry, attributes, vertexlist, interleaved arry

        into one data structure "vertexList", which is a pool allocator for
        vertices, initialized with a pool size and a vertex structure. It's always an
        interleaved array. It's also a list of all currently used vertices.

        It can't be used to draw itself, only when referenced by a mesh.

        I'm basically removing drawArrays and force all vertices into an
        interleaved structure.

        Drawable Elements can be derrived from the corresponding primitives [ vetices, lines, faces ];

        An element stores no connectivity information, but stores a reference to the mesh it was derrived from

        The mesh stores connectivity information, 
    */

    class VertexStructure {
        constructor ( structure ) {
            let stride = VertexStructure.computeStride( structure );
            let byteOffset = 0;
            let index = 0;
            for ( let attributeName in structure ) {
                let attribute = structure[ attributeName ];

                let length = attribute.length;
                let location = new AttributeLocation( index, length, byteOffset, stride );

                def.Property( this, attributeName, location, def.CONFIGURABLE | def.ENUMERABLE );

                byteOffset += structure[ attributeName ].byteLength;
                index++;
            }

            def.Property( this, "stride", stride, def.CONFIGURABLE );

        } 
        static computeStride ( structure ) {
            let stride = 0;
            for ( let view in structure ) stride += structure[ view ].byteLength;

            return stride;
        }

    }

    class VertexList {
        constructor ( structure, maxLength, usage ) {
            if ( usage === undefined ) usage = gl.STATIC_DRAW;

            let vertexStructure = new VertexStructure( structure );
            let stride = vertexStructure.stride;

            let arrayBuffer = new ArrayBuffer( stride * maxLength );
            let vertexBuffer = new BufferObject.Vertex().bind().allocate( stride * maxLength, usage );

            def.Property( this, "length", 0, def.WRITABLE );

            for ( let index = 0; index < maxLength; index++ ) {
                let vertex = new Vertex( index, arrayBuffer, vertexStructure );
                this.push( vertex );
            }

            def.Property( arrayBuffer, "target", vertexBuffer, def.CONFIGURABLE );
            def.Properties( this, {
                structure           : vertexStructure,
                buffer              : arrayBuffer,
                BYTES_PER_ELEMENT   : stride,
            }, def.CONFIGURABLE );
        }



        allocate ( length, usage ) {
            let oldLength = this.length;
            let newLength = oldLength + length;

            let newByteLength = this.BYTES_PER_ELEMENT * newLength;
            
            let oldBuffer = this.buffer;
            let newBuffer = new ArrayBuffer( newByteLength );
            let vbo = this.buffer.target;

            if ( usage === undefined ) usage = this.buffer.target.usage;

            def.Property( newBuffer, "target", vbo, def.CONFIGURABLE );

            vbo.bind().allocate( newByteLength, usage );

            for ( let index = 0; index < oldLength; index++ ) {
                this[ index ].createViews( index, newBuffer, this.structure );
            }

            for ( let index = oldLength; index < newLength; index++ ) {
                this.push( new Vertex( index, newBuffer, this.structure ) );
            }


            let sourceView = new Float32Array( oldBuffer );
            let targetView = new Float32Array( newBuffer );

            targetView.set( sourceView );

            vbo.update( sourceView );

            def.Property( this, "buffer", newBuffer, def.CONFIGURABLE );

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
        bind ( ) {
            this.buffer.target.bind( );
            for ( var locationName in this.structure ) this.structure[ locationName ].enable();
            return this;
        }

        unbind ( ) {
            for ( var locationName in this.structure ) this.structure[ locationName ].disable();
            //this.buffer.target.unbind( );
            return this;
        }

        update ( ) {
            this.buffer.target.update( this.buffer );
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
    }

    def.Properties( VertexList.prototype, {
        
        splice : [].splice,
        push : [].push,
        forEach : [].forEach
        
    }, def.CONFIGURABLE );

    return VertexList;
});