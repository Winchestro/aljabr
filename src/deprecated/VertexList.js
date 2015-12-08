define ( [
	"../utilities/PropertyDescriptors",
	"../utilities/allocateUint",
	"../webgl/Context",
	"../kernel/PoolAllocator",
	"../mesh/Vertex",
	"../mesh/ElementAttribute"
], function module (
	def,
	allocateUint,
	gl,
	PoolAllocator,
	Vertex,
	ElementAttribute
){
	"use strict";

	class VertexList extends PoolAllocator {
		constructor ( geometry, initialLength ) {
			if ( initialLength === undefined ) initialLength = 0;

			super();

			for ( let i = 0; i < initialLength; i++ ) this.push(
				new Vertex( geometry, i )
			);
		}
		createNormalDrawable ( length, buffer ) {
			return new ElementAttribute(
				this.createNormalGeometry( length ),
				this.getNormalData( buffer )
			).setDrawType( gl.LINES );
		}
		createNormalMesh ( length ) {
			if ( length === undefined ) length = 1;
			
			let geometry = new Geometry;
			let attribute = geometry.createVertexAttributeGroup({
				position 	: new Float32Array( 3 ),
				color 		: new Float32Array( 4 ),
				normal 		: new Float32Array( 3 )
			},	this.length * 2, gl.STATIC_DRAW );

			let buffer = attribute.createVertexView();
			let offset = 0;

			this.forEach( function ( vertex, index ) {
				// first vertex is on the base
				buffer[ offset++ ] = vertex.position[ 0 ];
				buffer[ offset++ ] = vertex.position[ 1 ];
				buffer[ offset++ ] = vertex.position[ 2 ];
				buffer[ offset++ ] = vertex.color[ 0 ];
				buffer[ offset++ ] = vertex.color[ 1 ];
				buffer[ offset++ ] = vertex.color[ 2 ];
				buffer[ offset++ ] = 1;
				buffer[ offset++ ] = vertex.normal[ 0 ];
				buffer[ offset++ ] = vertex.normal[ 1 ];
				buffer[ offset++ ] = vertex.normal[ 2 ];

				// second vertex points at the normal
				buffer[ offset++ ] = vertex.position[ 0 ] + vertex.normal[ 0 ] * length;
				buffer[ offset++ ] = vertex.position[ 1 ] + vertex.normal[ 1 ] * length;
				buffer[ offset++ ] = vertex.position[ 2 ] + vertex.normal[ 2 ] * length;
				buffer[ offset++ ] = 0;
				buffer[ offset++ ] = 0;
				buffer[ offset++ ] = 0;
				buffer[ offset++ ] = 0;
				buffer[ offset++ ] = vertex.normal[ 0 ];
				buffer[ offset++ ] = vertex.normal[ 1 ];
				buffer[ offset++ ] = vertex.normal[ 2 ];

			});
			attribute.update();
			return geometry;
		}
		dereference ( indexData, fromIndex, toIndex ) {
			if ( fromIndex === undefined ) fromIndex = 0;
			if ( toIndex === undefined ) toIndex = indexData.length;

			for ( let index = fromIndex; index < toIndex; index++ ) {
				indexData[ index ] = this[ indexData[ index ] ];
			}
			
			return indexData;
		}
		getNormalData ( buffer ) {
			let size = this.length * 2;
			if ( buffer === undefined ) buffer = allocateUint( size );
			for ( let offset = 0; offset < size; ) {
				buffer[ offset ] = offset++;
				buffer[ offset ] = offset++;
			}
			return buffer;
		}
	}

	return VertexList;
});