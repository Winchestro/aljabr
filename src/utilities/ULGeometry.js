import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { VertexAttribute, VertexAttributeGroup } from "../utilities/ULGeometryAttributes";
import { gl, GL } from "../webgl/GLContext";
import VertexArrayObject from "../webgl/GLVertexArrayObject";
import AttributeLocation from "../webgl/GLAttributeLocation";
import Material from "../utilities/ULMaterial";
import Draw from "../webgl/GLDraw";
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
const DEFAULT_MATERIAL = new Material;

export default class Geometry {
	constructor ( material = DEFAULT_MATERIAL ) {
		Properties( this, { bindings : new VertexArrayObject, material } );
	}
	static Cube( name = "cube", x1 = 1, x2 = -1, y1 = x1, y2 = x2, z1 = x1, z2 = x2 ) {
		let { structure, colorIterator, usage } = Geometry.Cube.options;
		let geometry = new Geometry;
		
		geometry.createVertexAttributeGroup( name, structure, 8, usage );

		let attribute = geometry[ name ];
		let vertex = attribute.view;
		let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
		let { position, color, normal, texCoord } = attribute.data.structure;
		
		if ( position ) {
			let offset = position.offset / vertex.BYTES_PER_ELEMENT;
			let i = offset;
			vertex[ i                        ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
			vertex[ i =  1 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
			vertex[ i =  2 * stride + offset ] = x1; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
			vertex[ i =  3 * stride + offset ] = x1; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
			
			vertex[ i =  4 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z2;
			vertex[ i =  5 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z2;
			vertex[ i =  6 * stride + offset ] = x2; vertex[ ++i ] = y1; vertex[ ++i ] = z1;
			vertex[ i =  7 * stride + offset ] = x2; vertex[ ++i ] = y2; vertex[ ++i ] = z1;
		}
		if ( color ) {
			let offset = color.offset / vertex.BYTES_PER_ELEMENT;
			let max = 7 * stride + offset + color.type.length;
			for ( let i = offset; i < max; i += stride ) {
				colorIterator( vertex, i );
			}
		}
		if ( texCoord ) {
		}
		if ( normal ) {
		}

		attribute.set();
		return geometry;
		
	}
	static Sphere ( name = "sphere", longitude = 10, latitude = 10, radius = 1 ) {
		let { structure, colorIterator, usage } = Geometry.Sphere.options;
		let { PI, sin, cos } = Math;
		
		let geometry = new Geometry;
		
		geometry.createVertexAttributeGroup( name, structure, longitude * latitude, usage );

		let attribute = geometry[ name ];
		let vertex = attribute.view;
		let stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;


		let { position, color, texCoord, normal } = attribute.data.structure;

		for ( let lat = 1; lat <= ( latitude + 1 ); lat++ ) {
			let theta = lat * PI / ( latitude + 1 );
			let sinTheta = sin( theta );
			let cosTheta = cos( theta );

			for ( let lon = 0; lon <= longitude; lon++ ) {
				let phi = lon * 2 * PI / longitude;
				let sinPhi = sin( phi );
				let cosPhi = cos( phi );
				let index = ( ( lat - 1 ) * longitude + lon ) * stride;
				let x = cosPhi * sinTheta;
				let y = cosTheta;
				let z = sinPhi * sinTheta;
				if ( position ) {
					let offset = position.offset / vertex.BYTES_PER_ELEMENT;
					let i = index + offset;
					vertex[ i     ] = x;
					vertex[ i + 1 ] = y;
					vertex[ i + 2 ] = z;
				}
				if ( color ) {
					let offset = color.offset / vertex.BYTES_PER_ELEMENT;
					colorIterator( vertex, index + offset, lat / latitude, lon / longitude );
				}
				if ( normal ) {
					let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
					let i = index + offset;
					vertex[ i     ] = x;
					vertex[ i + 1 ] = y;
					vertex[ i + 2 ] = z;
				}
				if ( texCoord ) {
					let offset = normal.offset / vertex.BYTES_PER_ELEMENT;
					let i = index + offset;
					vertex[ i     ] = 1 - lon / longitude;
					vertex[ i + 1 ] = lat / latitude;
				}

			}

		}
		attribute.set();
		return geometry;
	}
	static Polygon ( name = "polygon", sides = 7, r = 1, x = 0, y = 0 ) {
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
		
		for ( let i = 1; i < sides + 1; i++ ) {
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
Properties( Geometry.Cube, {
	options : {
		structure : {
			position : { type : new Float32Array( [ 0, 0, 0 ] ) },
			color : 	{ type : new Float32Array( [ 0, 1, 0, 1 ] ) },
			normal : 	{ type : new Float32Array( [ 1, 1, 1 ] ) },
			texCoord :	{ type : new Float32Array( [ 0, 0 ] ) }
		},
		colorIterator ( data, offset ) {
			data[ offset     ] = Math.random(); 
			data[ offset + 1 ] = Math.random(); 
			data[ offset + 2 ] = Math.random(); 
			data[ offset + 3 ] = 1;
		},
		usage : GL.DYNAMIC_DRAW
	}
});
Properties( Geometry.Sphere, {
	options : {
		structure : {
			position : { type : new Float32Array( [ 0, 0, 0 ] ) },
			color : 	{ type : new Float32Array( [ 0, 1, 0, 1 ] ) },
			normal : 	{ type : new Float32Array( [ 1, 1, 1 ] ) },
			texCoord :	{ type : new Float32Array( [ 0, 0 ] ) }
		},
		colorIterator ( data, offset, latitude, longitude ) {
			data[ offset     ] = latitude; 
			data[ offset + 1 ] = .1 * Math.random(); 
			data[ offset + 2 ] = 1-latitude; 
			data[ offset + 3 ] = 1;
		},
		usage : GL.DYNAMIC_DRAW
	}
});

Properties( Geometry.prototype, {
	use ( ) {
		this.bindings.use();
		return this;
	},
	unbind ( ) {
		this.bindings.unbind();
		return this;
	},
	draw ( offset = 0, count = this.getLength ) {
		this.use();
		this.material.use();
		gl.drawArrays( GL.POINTS, offset, count );
		return this; 
	},
	createVertexAttributeGroup ( name, structure, length, usage ) {
		let attr = new VertexAttributeGroup( name, structure );
		if ( length ) attr.allocate( length, usage );
		return this.attachVertexAttributeGroup( attr );
	},
	createVertexAttribute ( name, structure, length, usage ) {
		let attr = new VertexAttribute( name, structure );
		if ( length ) attr.allocate( length, usage );
		return this.attachVertexAttribute( attr );
	},
	attachVertexAttribute ( attribute, location ) {
		let vao = this.bindings;
		if ( location === undefined ) location = new AttributeLocation( vao.getNextFreeSlot() );

		let size = attribute.size;
		let buffer = attribute.buffer;

		location.setSize( size );
		vao.addVertexBinding( location, buffer );
		Properties( this, { [ name ] : attribute }, C );
		return this;
	},
	attachVertexAttributeGroup( attributeGroup ) {
		let vao = this.bindings;
		let name = attributeGroup.name;
		let structure = attributeGroup.data.structure;
		let stride = attributeGroup.data.stride;
		let buffer = attributeGroup.buffer;
		
		for ( let property in structure ) {
			let member = structure[ property ];
			let location = member.location ? member.location : new AttributeLocation( vao.getNextFreeSlot() );
			let offset = member.offset;
			let defaultValue = member.type;
			let size = defaultValue.length;
			location.setSize( size ).setStride( stride ).setOffset( offset ).setFloatVector( defaultValue, size );

			vao.addVertexBinding( location, buffer );
			
		};
		this[ name ] = attributeGroup;
		return this;
	},
	/*
	createVertexView ( offset, size, filter ) {
		return new VertexView( this, offset, size, filter );
	}
	*/
} );
Getters( Geometry.prototype, {
	getLength ( ) {	
		let max = 0;
		for ( let attr in this ) {
			let data = this[ attr ].data;
			if ( data !== undefined ) {
				let length = data.length || data.maxLength;
				
				if ( length > max ) max = length;
			}
		}
		Property( this, "getLength", max, C );
		return max;
	
	}
} );
/*
class VertexView {
	constructor ( geometry, offset = 0, length = 1, filter ) {
		Properties( this, { geometry, offset, length }, C );
		if( filter === undefined ) {
			for ( var property in geometry ) {
				console.log( geometry[ property ] );
			}
		} else {
			for ( var property in geometry ) {
				if( filter[ property ] ) {

				} 
			}
		}
	}
}
Properties( VertexView.prototype, {
	splice : [].splice
});
*/