import Buffer from "../GLVertexbuffer";
import VertexArrayObject from "../GLVertexArrayObject";
import AttributeLocation from "../GLAttributeLocation";
import { InterleavedFloat32 } from "./ULInterleavedArrays";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./ULPropertyDescriptors";

const GL = WebGLRenderingContext.prototype;
const TYPEDEF = new Map([
	[ "Int8Array", GL.BYTE ],
	[ "Uint8ClampedArray", GL.UNSIGNED_BYTE ],
	[ "Uint8Array", GL.UNSIGNED_BYTE ],
	[ "Int16Array", GL.SHORT ],
	[ "Uint16Array", GL.UNSIGNED_SHORT ],
	[ "Int32Array", GL.INT ],
	[ "Uint32Array", GL.UNSIGNED_INT ],
	[ "Float32Array", GL.FLOAT ],
	[ "Float64Array", GL.FLOAT ]
]);

const VAO_NAME = "bindings";
const INDEX_NAME = "index";

export default class Geometry {
	use ( ) {
		if( this[ VAO_NAME ] ) this[ VAO_NAME ].use();
		return this;
	}
	unbind ( ) {
		if( this[ VAO_NAME ] ) this[ VAO_NAME ].unbind();
		return this;
	}
	createIndex ( data, usage ) {
		let buffer 	= new Buffer.Index;
		let attr 	= new AttributeIndex( data, buffer, usage );
		let vao 	= getOrCreate( this, VAO_NAME, VertexArrayObject );
		
		this.index 	= attr;
		
		vao.setIndexBinding( buffer );
		
		return this;
	}
	addAttributeGroup ( name, structure, length ) {
		let data 	= new InterleavedFloat32( ...structure );
		let buffer 	= new Buffer.Vertex;
		let vao 	= getOrCreate( this, VAO_NAME, VertexArrayObject );
		let attr 	= new AttributeGroup( data, buffer ).setPointers( vao );
		
		this[ name ] = attr;
		if( length ) attr.allocate( length );
		
		return this;
	}
	addAttribute ( name, structure ) {
		let data 	= structure.type ? structure.type : structure;
		let buffer 	= new Buffer.Vertex;
		let vao 	= getOrCreate( this, "bindings", VertexArrayObject );
		let attr 	= new Attribute( structure, buffer ).setPointer( vao );

		this[ name ] = attr;

		return this;
	}
	static Polygon2D ( sides = 7, r = 1, x = 0, y = 0 ) {
		let positions = 2;
		let colors = 3;
		let stride = positions + colors;
		let geometry = new Geometry().addAttributeGroup( "dynamic", [ 
			new Float32Array( positions ),
			new Float32Array( colors )
		], sides + 1 );

		let v = geometry.dynamic.view;
		let e = new Uint32Array( 3 * sides );

		v.set( [ x, y,  0, 1, 1 ] )
		
		for ( let i = 1; i < sides + 1; i++ ) 
		{
			let a = Math.PI * 2 * i / sides;
			v.set( [
				Math.sin( a ) * r + x, 
				Math.cos( a ) * r + y,
				
				.0,
				Math.random(),
				.5
			], i * stride );
			

			let offset 	= ( i - 1 ) * 3;
			let center 	= 0;
			let next = ( i % sides ) + 1;

			if ( i % 2 ) e.set( [ 
				i,
				next,
				center 
			], offset );
			else e.set( [
				center,
				i,
				next 
			], offset );	
			
		}
		
		geometry.dynamic.update();
		geometry.createIndex( e );
		return geometry;
	}
}
function getOrCreate ( instance, name, constructor, isEnumerable = false, isWritable = false, isConfigurable = false ) {
	return instance[ name ] ? instance[ name ] : Object.defineProperty( instance, name, {
		value : new constructor,
		enumerable : isEnumerable,
		writable : isWritable,
		configurable : isConfigurable
	} )[ name ];
}

class BufferAttribute {
	constructor ( defaultValue, buffer ) {
		this.defaultValue = defaultValue;
		this.buffer = buffer;
	}
}

class AttributeIndex extends BufferAttribute {
	constructor ( data, buffer, usage ) {
		this.data = data;
		this.buffer = buffer;
		buffer.data( data, usage );
	}
}
// TODO
class Attribute extends BufferAttribute {
	set ( data, offset = 0 ) {
		let constructor = this.defaultValue.constructor;
		if( data.byteLength === undefined ) data = new constructor(data);
		if( this.data )
		{
			if( data.length <= this.data.length )
			{
			//	let location = this.location;
			//	let elementOffset = location.size * offset;
			//	let byteOffset = elementOffset * data.BYTES_PER_ELEMENT;
			//	this.data.set( data, elementOffset );
				buffer.bufferSubData( this.data, byteOffset );
			}
			else
			{
				this.data = new constructor( data.buffer );
				buffer.bufferData( this.data, GL.STATIC_DRAW );
			}
		}
		else 
		{

			this.data = data;
			buffer.bufferData( this.data, GL.STATIC_DRAW );
		}
		return this;
	}
	setPointer ( vao ) {
		// TODO
	}
}
class AttributeGroup extends BufferAttribute {
	constructor ( data, buffer ) {
		this.buffer = buffer;
		this.data = data;
		this.view = null;
	}
	allocate ( length, usage = GL.DYNAMIC_DRAW ) {
		this.data.allocate( length );
		this.view = new Float32Array( this.data.buffer );
		this.buffer.data( this.view.byteLength, usage );
		return this;
	}
	setPointers( vao ) {
		let structure = this.data.structure;
		let stride = this.data.stride;
		structure.forEach( e => {
			//let slot = vao.getNextFreeSlot();
			let location = e.location;
			let offset = e.offset;
			let size = e.type.length;
			if ( !location ) location = new AttributeLocation( vao.getNextFreeSlot() );
			location.setSize( size ).setStride( stride ).setOffset( offset ).setFloatVector( e.type, size );

			vao.addVertexBinding( location, this.buffer );
			
		} );
		return this;
	}
	createVertexView( vertices = this.data.maxLength, offset = 0 ){
		let size = Float32Array.BYTES_PER_ELEMENT;
		return new Float32Array(
			this.data.buffer,
			offset * this.data.stride,
			vertices * this.data.stride / size
		);
	}
	update( bufferView = this.view ) {
		this.buffer.subData( bufferView, bufferView.byteOffset );
		return this;
	}
}