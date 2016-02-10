define ( [
	"bower_components/aljabr/src/utilities/PropertyDescriptors",
	"bower_components/aljabr/src/webgl/Context",
	"bower_components/aljabr/src/math/vec2",
	"bower_components/aljabr/src/math/vec3",
	"bower_components/aljabr/src/math/vec4",
	"bower_components/aljabr/src/webgl/BufferObject",
	"bower_components/aljabr/src/material/VertexColors",
], function module (
	def,
	gl,
	vec2,
	vec3,
	vec4,
	BufferObject,
	VertexColors
) {
	"use strict";

	const CACHE_VEC3 = new vec3;

	class Frustum extends Float32Array {
		constructor ( camera ) {
			let vertexCount = 4;
			let elementCount = 3;
			super( vertexCount * elementCount );

            //let vertexBuffer = new BufferObject.Vertex().bind().allocate( vertexCount * this.BYTES_PER_ELEMENT, gl.STATIC_DRAW );

			if ( camera !== undefined ) this.update( camera );
			
		}

		update ( camera ) {
			CACHE_VEC3.setValues( 0, 0, 1 );

			camera.unprojectFromScreenCoordinates( CACHE_VEC3 );

			this.left = CACHE_VEC3[ 0 ];
			this.bottom = CACHE_VEC3[ 1 ];
			this.near = CACHE_VEC3[ 2 ];
			console.log( CACHE_VEC3 );

			CACHE_VEC3.setValues( gl.canvas.clientWidth, gl.canvas.clientHeight, 1 );

			camera.unprojectFromScreenCoordinates( CACHE_VEC3 );

			this.right = CACHE_VEC3[ 0 ];
			this.top = CACHE_VEC3[ 1 ];

			console.log( CACHE_VEC3 );
			if( this.vertexBuffer ) this.vertexBuffer.bind().update( this );
		}

		setupDraw ( ) {
			let vertexBuffer = new BufferObject.Vertex().bind().allocate( this.byteLength ).update( this );
			let colorBuffer = new BufferObject.Vertex().bind().allocate( this.length * Float32Array.BYTES_PER_ELEMENT * 4 ).update( new Float32Array([
				0, 0, 0, 1,
				1, 0, 0, 1,
				0, 1, 0, 1,
				0, 0, 1, 1
			]));

			let lineBuffer = new BufferObject.Index().bind().allocate( 8 ).update( new Uint8Array([
				0, 1,
				1, 2,
				2, 3,
				3, 0
			]));

			let triangleBuffer = new BufferObject.Index().bind().allocate( 6 ).update( new Uint8Array([
				0, 2, 1,
				2, 0, 3
			]));

			let material = new VertexColors;


			def.Properties( this, {
				vertexBuffer,
				colorBuffer,
				lineBuffer,
				triangleBuffer,
				material
			}, def.CONFIGURABLE );

		}

		draw ( ) {
			if ( !this.hasOwnProperty( "draw" ) ) {
				this.setupDraw();
				def.Property( this, "draw", draw, def.CONFIGURABLE );
			}
		}
		

		get width ( ) {
			return Math.abs( this.left - this.right );
		}

		get height ( ) {
			return Math.abs( this.top - this.bottom );
		}
	}

	def.GetterSetters( Frustum.prototype, {
		left : getLeft,
		right : getRight,
		top : getTop,
		bottom : getBottom,
		near : getNear,
		far : getFar
	},{
		left : setLeft,
		right : setRight,
		top : setTop,
		bottom : setBottom,
		near : setNear,
		far : setFar
	}, def.CONFIGURABLE );


	/*
			[  0 ] left
			[  1 ] top
			[  2 ] front

			[  3 ] left
			[  4 ] bottom
			[  5 ] front

			[  6 ] right
			[  7 ] bottom
			[  8 ] front

			[  9 ] right
			[ 10 ] top
			[ 11 ] front
			*/

	function getLeft ( ) {
		return this[ 0 ];
	}
	function setLeft ( value ) {
		this[ 0 ] = value;
		this[ 3 ] = value;

		return this[ 0 ];
	}

	function getBottom ( ) {
		return this[ 4 ];
	}
	function setBottom ( value ) {
		this[ 4 ] = value;
		return this[ 7 ] = value;
	}

	function getRight ( ) {
		return this[ 6 ];
	}
	function setRight ( value ) {
		this[ 6 ] = value;
		return this[ 9 ] = value;
	}

	function getTop ( ) {
		return this[ 1 ];
	}
	function setTop ( value ) {
		this[ 1 ] = value;
		return this[ 10 ] = value;
	
	}

	function getNear ( ) {
		return this[ 2 ];
	}

	function setNear ( value ) {
		this[  2 ] = value;
		this[  5 ] = value;
		this[  8 ] = value;
		return this[ 11 ] = value;
	}

	function getFar ( ) {

	}

	function setFar ( value ) {

	}

	function draw ( scene, camera, lights, partentMesh ) {
		if ( !this.material.program.getLinkStatus ) return;
		this.material.use();

		let uniforms;

		uniforms = this.material.program.getActiveUniforms.scene;
		if ( uniforms ) uniforms.set( scene );

		uniforms = this.material.program.getActiveUniforms.camera;
		if ( uniforms ) uniforms.set( camera );
		
		uniforms = this.material.program.getActiveUniforms.mesh;
		if ( uniforms ) {
			if ( uniforms.scale ) {
				uniforms.scale.setValues( 1, 1, 1 ).set();
				
			}
			if ( uniforms.transform ) {
				uniforms.transform.makeIdentity().set();
				
			}
		}
		

		this.vertexBuffer.bind();
		gl.vertexAttribPointer( 0, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( 0 ); 
		
		this.colorBuffer.bind();
		gl.vertexAttribPointer( 1, 4, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( 1 );
		
			
		this.triangleBuffer.bind();

		gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0 );
		
		this.lineBuffer.bind();

		gl.drawElements( gl.LINES, 8, gl.UNSIGNED_BYTE, 0 );
	}

	return Frustum;
});