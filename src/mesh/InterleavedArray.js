import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class InterleavedArray {
	constructor ( structure ) {
		let type = readStructureType( structure );
		let stride = readOffsets( structure );

		Properties( this, {	structure, stride, type } );
	}
	/*
	*[Symbol.iterator] ( ) {
		let i = 0;
		let max = Math.max( this.maxLength, this.length );
		while( i < max ) {
			let n = this[ i ];
			if ( n !== undefined ) yield n;
			i++;
		}
	}
	*/
}

Properties( InterleavedArray.prototype, {
	allocate ( maxLength = 0 ) {
		if( this.length ) this.disposeViews();
		
		let buffer = new ArrayBuffer( this.stride * maxLength )

		Properties( this, { buffer, maxLength }, C );

		return this;
	},
	expand ( lenght = 0 ) {
		if( this.length ) this.disposeViews();
		
		let maxLength = this.maxLength + length;
		let buffer = new ArrayBuffer( this.stride * maxLength );
		
		new this.type( buffer ).set( new this.type( this.buffer ) );
		
		Properties( this, { buffer, maxLength }, C );
		
		return this;
	},
	/*
	disposeViews ( start = 0, end = this.length ) {
		for ( let i = start; i < end; i++ ) delete this[ i ];

		Properties( this, { length : 0 }, C );
		
		return this;
	},
	createViews ( start = 0, end = this.maxLength ) {
		for ( let i = start; i < end; i++ ) this[ i ] = new this.type(
			this.buffer,
			this.stride * i,
			this.stride / this.type.BYTES_PER_ELEMENT
		);
		
		Properties( this, { length : Math.max( this.length || 0, end ) }, C );	
		return this;
	}
	*/
});



function readOffsets ( structure ) {
	let offsets = [ 0 ];
	let i = 0;
	for ( let property in structure ) {
		offsets.push( offsets[ i ] + structure[ property ].type.byteLength );
		structure[ property ].offset = offsets[ i ];
		i++;
	}
	return offsets.pop();
}
function readStructureType ( structure ) {
	let type;
	for ( var property in structure ) {
		if ( type === undefined ) type = structure[ property ].type.constructor;
		else if ( type.name !== structure[ property ].type.constructor.name ) console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type.");
	}
	return type;
}
/*
function readStructure( args ) {
	let structure = [];
	let type = null;
	for ( let i in args ) {
		if( args[ i ].BYTES_PER_ELEMENT ) { 
			structure[ i ] = { type : args[ i ]	};
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