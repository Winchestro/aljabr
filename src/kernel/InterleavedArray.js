import def from "../utilities/PropertyDescriptors.js";

export default class InterleavedArray {
    constructor ( structure ) {
        let byteLength = 0;
        for ( let view in structure ) byteLength += structure[ view ].byteLength;

        let byteOffset = 0;
        let arrayBuffer = new ArrayBuffer( byteLength );
        for ( let view in structure ) {
            let bufferView = new structure[ view ].constructor(
                arrayBuffer,
                byteOffset,
                structure[ view ].length
            );
            bufferView.set( structure[ view ] );
            byteOffset += structure[ view ].byteLength;

            def.Property( structure, view, bufferView, def.CONFIGURABLE | def.ENUMERABLE );
        }

        def.Properties( this, {
            structure,
            BYTES_PER_ELEMENT : byteLength,
            arrayBuffer
        }, def.CONFIGURABLE );
    }

    setArrayBuffer ( arrayBuffer ) {
        def.Property( this, "arrayBuffer", arrayBuffer, def.CONFIGURABLE );
        return this;
    }
    allocateBytes ( byteLength ) {
        let arrayBuffer = new ArrayBuffer( byteLength );
        this.setArrayBuffer( arrayBuffer );
        return this;
    }
    allocateElements ( length ) {
        let arrayBuffer = new ArrayBuffer( length * this.BYTES_PER_ELEMENT );
        this.setArrayBuffer( arrayBuffer );
        return this;
    }

    get byteLength ( ) {
        return this.arrayBuffer.byteLength;
    }
    get length ( ) {
        return this.arrayBuffer.byteLength / this.BYTES_PER_ELEMENT
    }
}

def.Properties( InterleavedArray.prototype, {
    byteOffset : 0,
    splice : [].splice
});

/*
function readOffsets ( structure ) {
    let offsets = [ 0 ];
    let i = 0;
    for ( let property in structure ) {
        offsets.push( offsets[ i ] + structure[ property ].byteLength );
        structure[ property ].offset = offsets[ i ];
        i++;
    }
    return offsets.pop();
}

function readStructureType ( structure ) {
    let type;
    for ( var property in structure ) {
        if ( type === undefined ) type = structure[ property ].constructor;
        else if ( type.name !== structure[ property ].constructor.name ) console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type.");
    }
    return type;
}
function readStructure( args ) {
let structure = [];
let type = null;
for ( let i in args ) {
    if( args[ i ].BYTES_PER_ELEMENT ) { 
        structure[ i ] = { type : args[ i ] };
        if ( type === null ) type = args[ i ].constructor;
        else if ( type.name !== args[ i ].constructor.name ) console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type.");
    }
    else if ( args[ i ].type.BYTES_PER_ELEMENT ) {
        if ( type === null ) type = args[ i ].type.constructor;
        else if ( type.name !== args[ i ].type.constructor.name ) console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type."); 
        structure[ i ] = args[ i ];
    }
}
Properties( structure, { type } );
return structure;
}
*/