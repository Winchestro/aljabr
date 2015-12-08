define ( [
    "../utilities/PropertyDescriptors",
    "../utilities/allocateUint",
    "../webgl/Context",
    "../webgl/AttributeLocation",
    "../mesh/Vertex",
    "../mesh/Element"
], function module (
    def,
    allocateUint,
    gl,
    AttributeLocation,
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
    class VertexList {
        constructor ( structure, maxLength, usage ) {
            if ( usage === undefined ) usage = gl.STATIC_DRAW;

            let stride = 0;
            for ( let view in structure ) stride += structure[ view ].byteLength;

            let byteOffset = 0;
            let index = 0;
            let arrayBuffer = new ArrayBuffer( stride * maxLength );
            let vertexBuffer = new VertexBuffer( gl.ARRAY_BUFFER )
                .bind()
                .allocate( stride * maxLength, usage );

            def.Property( this, "length", 0, def.WRITABLE );

            for ( let index = 0; index < maxLength; index++ ) {
                let vertex = new Vertex( index );
                this.push( vertex );
                //this[ index ] = vertex;
                //def.Property( this, index, vertex, def.CONFIGURABLE );
            }
            
            let vertexStructure = {};

            for ( let attributeName in structure ) {
                let attribute = structure[ attributeName ];

                let length = attribute.length;
                let offset = byteOffset;

                let location = new AttributeLocation( index, length, byteOffset, stride );

                //location.enable();

                byteOffset += structure[ attributeName ].byteLength;

                def.Property( vertexStructure, attributeName, location, def.CONFIGURABLE | def.ENUMERABLE );
                
                for ( let index = 0; index < maxLength; index++ ) {
                    this[ index ][ attributeName ] = new Float32Array(
                        arrayBuffer,
                        index * stride + offset,
                        length
                    );
                    /*def.Property( this[ index ], attributeName, new Float32Array(
                        arrayBuffer,
                        index * stride + offset,
                        length
                    ), def.ENUMERABLE );*/
                }


                index++;
                
            }

            def.Property( arrayBuffer, "target", vertexBuffer, def.CONFIGURABLE );
            def.Properties( this, {
                structure           : vertexStructure,
                buffer              : arrayBuffer,
                BYTES_PER_ELEMENT   : stride,
            }, def.CONFIGURABLE );
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