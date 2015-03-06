import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./ULPropertyDescriptors";

export class InterleavedFloat32 {
	constructor ( ) {
		let structure = readStructure( arguments );
		let stride = readOffsets( structure );
		
		Properties( this, {	structure, stride } );
	}
	*[Symbol.iterator] ( ) {
		let i = 0;
		let max = Math.max( this.maxLength, this.length );
		while( i < max ) {
			let n = this[ i ];
			if ( n !== undefined ) yield n;
			i++;
		}
	}
}

Properties( InterleavedFloat32.prototype, {
	allocate ( length ) {
		if( this.length ) this.disposeVertexViews();
		Object.defineProperties( this, {
			buffer : { value : new ArrayBuffer( this.stride * length ), configurable : true },
			maxLength : { value : length, configurable : true }
		});
		return this;
	},
	expand ( lenght ) {
		if( !length ) return;
		if( this.length ) this.disposeVertexViews();
		let newLength = this.maxLength + length;
		let newBuffer = new ArrayBuffer( this.stride * newLength );
		new Float32Array( newBuffer ).set( new Float32Array( this.buffer ) );
		Object.defineProperties( this, {
			buffer : { value : newBuffer, configurable : true },
			maxLength : { value : newLength, configurable : true }
		});
		return this;
	},
	disposeVertexViews ( start = 0, end = this.length ) {
		for ( var i = start; i < end; i++ ) {
			delete this[ i ];
		}
		Object.defineProperty( this, "length", { value : 0, configurable : true } );
		return this;
	},
	createVertexViews ( start = 0, end = this.maxLength ) {
		for ( var i = start; i < end; i++ ) 
		{
			this[ i ] = new Float32Array( this.buffer, this.stride * i, this.stride / 4 );
		}
		Object.defineProperty( this, "length", { value : Math.max( this.length||0, end ), configurable : true } );
		return this;
	}
});

function readOffsets(structure){
	let offsets = [ 0 ];
	for ( let i in structure ) {
		offsets.push( offsets.reduce( (p,c)=> p+c ) + structure[ i ].type.byteLength );
		structure[ i ].offset = offsets[ i ];
	}
	return offsets.pop();
}
function readStructure( args ) {
	let structure = [];
	for ( let i in args ) {
		if( args[ i ].BYTES_PER_ELEMENT ) structure[ i ] = {
			type : args[ i ]
		}
		else if ( args[ i ].type.BYTES_PER_ELEMENT ) structure[ i ] = args[ i ];
	}
	return structure;
}