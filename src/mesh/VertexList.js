define ( [
    "../utilities/PropertyDescriptors",
    "../kernel/allocateUint",
    "../kernel/ArrayBuffer",
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
    gl,
    AttributeLocation,
    BufferObject,
    Vertex,
    VertexStructure,
    Element
) {
    "use strict";

    class VertexList {
        constructor ( structure, maxLength, usage ) {
            if ( usage === undefined ) usage = gl.STATIC_DRAW;

            let vertexStructure = new VertexStructure( structure );
            let stride = vertexStructure.stride;
            
            let vertexBuffer = new BufferObject.Vertex().bind().allocate( stride * maxLength, usage );
            let arrayBuffer = new ArrayBuffer( stride * maxLength, vertexBuffer );

            def.Property( this, "length", 0, def.WRITABLE );

            for ( let index = 0; index < maxLength; index++ ) {
                let vertex = new Vertex( index, arrayBuffer, vertexStructure );
                this.push( vertex );
            }

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

            //vbo.bind().allocate( newByteLength, usage );

            for ( let index = 0; index < oldLength; index++ ) {
                this[ index ].createViews( index, newBuffer, this.structure );
            }

            for ( let index = oldLength; index < newLength; index++ ) {
                this.push( new Vertex( index, newBuffer, this.structure ) );
            }


            let sourceView = new Float32Array( oldBuffer );
            let targetView = new Float32Array( newBuffer );

            targetView.set( sourceView );

            vbo.bind().allocate( sourceView, usage );

            def.Property( this, "buffer", newBuffer, def.CONFIGURABLE );

            return this;
        }

        update ( ) {
            this.buffer.update( );
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