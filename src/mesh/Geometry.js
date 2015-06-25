import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { VertexAttribute, VertexAttributeGroup } from "../mesh/GeometryAttributes.js";
import { gl, GL } from "../webgl/Context.js";
import VertexArrayObject from "../webgl/VertexArrayObject.js";
import AttributeLocation from "../webgl/AttributeLocation.js";
import Material from "../mesh/Material.js";
import { Drawable, DisplayList } from "../mesh/Drawable.js";

/*
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
]);*/


export default class Geometry extends Drawable {
	constructor ( ) {
		super();
		Properties( this, {
			bindings : new VertexArrayObject,
		}, C );
	}

}


Properties( Geometry.prototype, {
	use ( ) {
		this.bindings.use();
		return this;
	},
	unbind ( ) {
		this.bindings.unbind();
		return this;
	},
	clearCache ( ) {
		delete this.getVertexCount;
		return this;
	},
	draw ( offset = 0, count = this.getVertexCount ) {
		this.use();
		this.material.use();
		gl.drawArrays( GL.POINTS, offset, count );
		
		return this; 
	},
	
	createVertexAttributeGroup ( structure, length, usage ) {
		let attr = new VertexAttributeGroup( structure );
		if ( length ) attr.allocate( length, usage );
		this.attachVertexAttributeGroup( attr );
		
		return attr;
	},
	createVertexAttribute ( structure, length, usage ) {
		let attr = new VertexAttribute( structure );
		if ( length ) attr.allocate( length, usage );
		this.attachVertexAttribute( attr );

		return attr;
	},
	attachVertexAttribute ( attribute, location ) {
		let vao = this.bindings;
		if ( location === undefined ) location = new AttributeLocation( vao.getNextFreeSlot() );
		


		let size = attribute.size;
		let buffer = attribute.buffer;

		location.setSize( size );
		vao.addVertexBinding( location, buffer );
		Property( this, this.length - 1, attribute, C | E );
		Property( this, "length", this.length, C );
		this.clearCache();
		return this;
	},
	attachVertexAttributeGroup( attributeGroup ) {
		let vao = this.bindings;
		Property( this, "length", this.length + 1, C );

		let structure = attributeGroup.data.structure;
		let stride = attributeGroup.data.stride;
		let buffer = attributeGroup.buffer;
		
		for ( let key in structure ) {
			let attribute = structure[ key ];
			let location = attribute.location ? attribute.location : new AttributeLocation( vao.getNextFreeSlot() );
			let offset = attribute.offset;
			let defaultValue = attribute.type;
			let size = defaultValue.length;
			location.setSize( size ).setStride( stride ).setOffset( offset ).setFloatVector( defaultValue, size );

			vao.addVertexBinding( location, buffer );
			
		};
		Property( this, this.length - 1, attributeGroup, C | E );
		Property( this, "length", this.length, C );
		this.clearCache();
		return this;
	},

} );
Getters( Geometry.prototype, {
	getVertexCount ( ) {	
		let max = 0;
		for ( let attr in this ) {
			let data = this[ attr ].data;
			if ( data !== undefined ) {
				let length = data.length || data.maxLength;
				
				if ( length > max ) max = length;
			}
		}
		Property( this, "getVertexCount", max, C );
		return max;
	
	}
} );

Properties( Geometry.prototype, {
	length : 0,
}, C );
Geometry.prototype[ Symbol.iterator ] = [][ Symbol.iterator ];