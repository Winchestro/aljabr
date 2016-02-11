define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../math/vec2",
	"../math/vec3",
	"../math/vec4",
	"../webgl/BufferObject",
	"../material/VertexColors",
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
			let vertexCount = 8;
			let elementCount = 3;
			super( vertexCount * elementCount );

            //let vertexBuffer = new BufferObject.Vertex().bind().allocate( vertexCount * this.BYTES_PER_ELEMENT, gl.STATIC_DRAW );

			if ( camera !== undefined ) this.update( camera );
			

		}

		update ( camera ) {
			let width = gl.canvas.clientWidth;
			let height = gl.canvas.clientHeight;
			let far = camera.far;
			let near = camera.near;
			let fov = camera.fov;
			let aspect = camera.aspect;
			
			let depth = far - near;
			
			let xOffset = 5;
			let yOffset = 5;
			let zOffset = 5;

			camera.updateProjection( near + zOffset, far - zOffset, fov, aspect );
			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, yOffset, 1 ) );
			/* top left */
			this[  0 ] = CACHE_VEC3[ 0 ];
			this[  1 ] = CACHE_VEC3[ 1 ];
			this[  2 ] = CACHE_VEC3[ 2 ];
			
			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, height - yOffset, 1 ) );
			/* bottom left */
			this[  3 ] = CACHE_VEC3[ 0 ];
			this[  4 ] = CACHE_VEC3[ 1 ];
			this[  5 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset , height - yOffset, 1 ) );
			/* bottom right */
			this[  6 ] = CACHE_VEC3[ 0 ];
			this[  7 ] = CACHE_VEC3[ 1 ];
			this[  8 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset, yOffset, 1 ) );
			/* top right */
			this[  9 ] = CACHE_VEC3[ 0 ];
			this[ 10 ] = CACHE_VEC3[ 1 ];
			this[ 11 ] = CACHE_VEC3[ 2 ];


			camera.updateProjection( near, far, fov, aspect );
			//console.log( CACHE_VEC3 );
			if( this.vertexBuffer ) this.vertexBuffer.bind().update( this );
		}

		setupDraw ( ) {
			let vertexBuffer = new BufferObject.Vertex().bind().allocate( this.byteLength ).update( this );

			let colorBuffer = new BufferObject.Vertex().bind().allocate( 4 * 4 * this.BYTES_PER_ELEMENT ).update( new Float32Array([
				1, 1, 1, 1,
				0, 0, .25, 1,
				0, .25, 0, 1,
				1, 1, 1, 1,
			]));

			let lineBuffer = new BufferObject.Index().bind().allocate( 8 ).update( new Uint8Array([
				0, 1,
				1, 2,
				2, 3,
				3, 0
			]));

			let triangleBuffer = new BufferObject.Index().bind().allocate( 6 ).update( new Uint8Array([
				0, 1, 2,
				2, 3, 0
			]));

			let material = new VertexColors;

			material.alpha.enable().setFunc( Alpha.FN_SRC_COLOR , Alpha.FN_ONE_MINUS_DST_COLOR, Alpha.FN_SRC_ALPHA, Alpha.FN_DST_ALPHA );
    

			def.Properties( this, {
				vertexBuffer,
				colorBuffer,
				lineBuffer,
				triangleBuffer,
				material
			}, def.CONFIGURABLE );

			def.Properties( this, {
				visible : true
			}, def.WRITABLE );

		}
		drawOverride ( scene, camera, lights, partentMesh ) {
			if ( !this.visible ) return this;
			if ( !this.material.program.getLinkStatus ) return this;

			this.update( camera );
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
			gl.enableVertexAttribArray( 0 ); 
			gl.vertexAttribPointer( 0, 3, gl.FLOAT, false, 0, 0 );
			
			
			//gl.vertexAttrib4f( 1, .25, .8, 1, .25 );
			this.colorBuffer.bind();
			gl.enableVertexAttribArray( 1 );
			gl.vertexAttribPointer( 1, 4, gl.FLOAT, false, 0, 0 );
			
				
			this.triangleBuffer.bind();

			gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0 );
			
			this.lineBuffer.bind();

			gl.drawElements( gl.LINES, 8, gl.UNSIGNED_BYTE, 0 );
		}

		draw ( ) {
			if ( !this.hasOwnProperty( "draw" ) ) {
				this.setupDraw();
				def.Property( this, "draw", this.drawOverride, def.CONFIGURABLE );
			}
		}
		

		get width ( ) {
			return Math.abs( this.left - this.right );
		}

		get height ( ) {
			return Math.abs( this.top - this.bottom );
		}
	}
	

	return Frustum;
});