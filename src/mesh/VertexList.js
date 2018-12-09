import def from "../utilities/PropertyDescriptors.js";
import allocateUint from "../kernel/allocateUint.js";
import ArrayBuffer from "../kernel/ArrayBuffer.js";
import PoolAllocator from "../kernel/PoolAllocator.js";
import Vertex from "../mesh/Vertex.js";
import VertexStructure from "../mesh/VertexStructure.js";
import BufferObject from "../webgl/BufferObject.js";

const STATIC_DRAW = 0x88E4;

const DEFAULT_STRUCTURE = new VertexStructure({
    position    : new Float32Array( 3 ),
    color       : new Float32Array( 4 ),
    normal      : new Float32Array( 3 ),
    uv          : new Float32Array( 2 )
});

export default class VertexList extends PoolAllocator {
    constructor ( structure ) {
        super();
        
        if ( structure === undefined ) structure = this.VertexStructure;
        else structure = new VertexStructure( structure );

        let BYTES_PER_ELEMENT = structure.stride;
        
        let buffer = new ArrayBuffer( 0 );

        def.Properties( this, {
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
        if  ( outgoingHalfedge === undefined ) outgoingHalfedge = null;
        // experimental dynamic growth. buffer dynamically doubles in size. slower than pre-allocating in most cases
        if ( !this.pool.length ) this.allocateItems( this.maxLength||1 );

        // todo - vertex order should be irrelevant, should pop rather than dequeue
        let vertex = this.pool.shift();
        
        vertex.outgoingHalfedge = outgoingHalfedge;
        
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

    static setVertexStructure ( structureDescription ) {
        def.Property( VertexList.prototype, "VertexStructure", new VertexStructure( structureDescription ), def.CONFIGURABLE );
    }

    static useDefaultVertexStructure ( ) {
        def.Property( VertexList.prototype, "VertexStructure", DEFAULT_STRUCTURE, def.CONFIGURABLE );
    }

    
    copyArrayBuffer ( sourceBuffer ) {
        let targetBuffer = this.buffer;

        let sourceView = new Float32Array( sourceBuffer );
        let targetView = new Float32Array( targetBuffer );

        targetView.set( sourceView );
        return this;
    }

    bind ( ) {
        // pull out
        if ( this.buffer.target ) {
            this.buffer.target.bind( );
            for ( var locationName in this.structure ) {
                
                this.structure[ locationName ].enable();
            }
        }
        return this;
    }

    unbind ( ) {
        // pull out
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

    

    
    allocateTarget ( usage ) {
        let target = this.buffer.target;

        if ( usage === undefined ) {
            if ( target ) usage = oldTarget.usage;
            else usage = STATIC_DRAW;
        }

        if ( !target ) target = new BufferObject.Vertex;

        this.buffer.allocateTarget( usage, target );

        /*if ( this.buffer.target ) this.buffer.target.bind().allocate( this.buffer, usage );
        else this.buffer.setTarget( new BufferObject.Vertex().bind().allocate( this.buffer, usage ) );*/

        return this;
    }
   
    allocateItems ( length ) {
        let oldLength = this.maxLength;
        let newLength = oldLength + length;
        let newByteLength = this.BYTES_PER_ELEMENT * newLength;
        
        let oldBuffer = this.buffer;
        let newBuffer = new ArrayBuffer( newByteLength );
        let oldTarget = oldBuffer.target;
        
        def.Property( this, "buffer", newBuffer, def.CONFIGURABLE );


        for ( let index = 0; index < oldLength; index++ ) this[ index ].createViews( index, newBuffer, this.structure );
        for ( let index = oldLength; index < newLength; index++ ) this.pool.push( new Vertex( index, newBuffer, this.structure ) );
        
        this.copyArrayBuffer( oldBuffer );
        if ( oldTarget ) newBuffer.allocateTarget( oldTarget.usage, oldTarget );

        return this;
    }

    updateTarget ( ) {
        this.buffer.update( );
        return this;
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