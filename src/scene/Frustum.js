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
		constructor ( camera, xOffset, yOffset, zOffset ) {
			if ( xOffset === undefined ) xOffset = 0;
			if ( yOffset === undefined ) yOffset = xOffset;
			if ( zOffset === undefined ) zOffset = xOffset;
			
			const vertexCount = 8;
			const dimensions = 3;
			
			super( vertexCount * dimensions );

			def.Properties( this, {
				xOffset,
				yOffset,
				zOffset
			}, def.CONFIGURABLE );

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
			
			
			let xOffset = this.xOffset;
			let yOffset = this.yOffset;
			let zOffset = this.zOffset;
			let useOffset = xOffset !== 0 && yOffset !== 0 && zOffset !== 0;


			if ( useOffset ) camera.updateProjection( near + zOffset, far - zOffset, fov, aspect );
			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, yOffset, 1 ) );
			/* top left far */
			this[  0 ] = CACHE_VEC3[ 0 ];
			this[  1 ] = CACHE_VEC3[ 1 ];
			this[  2 ] = CACHE_VEC3[ 2 ];
			
			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, height - yOffset, 1 ) );
			/* bottom left far */
			this[  3 ] = CACHE_VEC3[ 0 ];
			this[  4 ] = CACHE_VEC3[ 1 ];
			this[  5 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset , height - yOffset, 1 ) );
			/* bottom right far */
			this[  6 ] = CACHE_VEC3[ 0 ];
			this[  7 ] = CACHE_VEC3[ 1 ];
			this[  8 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset, yOffset, 1 ) );
			/* top right  far */
			this[  9 ] = CACHE_VEC3[ 0 ];
			this[ 10 ] = CACHE_VEC3[ 1 ];
			this[ 11 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, yOffset, 0 ) );
			/* top left near */
			this[ 12 ] = CACHE_VEC3[ 0 ];
			this[ 13 ] = CACHE_VEC3[ 1 ];
			this[ 14 ] = CACHE_VEC3[ 2 ];
			
			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, height - yOffset, 0 ) );
			/* bottom left near */
			this[ 15 ] = CACHE_VEC3[ 0 ];
			this[ 16 ] = CACHE_VEC3[ 1 ];
			this[ 17 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset , height - yOffset, 0 ) );
			/* bottom right near */
			this[ 18 ] = CACHE_VEC3[ 0 ];
			this[ 19 ] = CACHE_VEC3[ 1 ];
			this[ 20 ] = CACHE_VEC3[ 2 ];

			camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset, yOffset, 0 ) );
			/* top right near */
			this[ 21 ] = CACHE_VEC3[ 0 ];
			this[ 22 ] = CACHE_VEC3[ 1 ];
			this[ 23 ] = CACHE_VEC3[ 2 ];



			if ( useOffset ) camera.updateProjection( near, far, fov, aspect );
			//console.log( CACHE_VEC3 );
			if( this.vertexBuffer ) this.vertexBuffer.bind().update( this );
		}
	}
	
	class FrustumMesh extends Frustum {
		constructor ( camera, xOffset, yOffset, zOffset ) {
			super ( camera, xOffset, yOffset, zOffset );

			let vertexBuffer = new BufferObject.Vertex( this, gl.DYNAMIC_DRAW );
			
			let colorBuffer = new BufferObject.Vertex( new Float32Array([
				1, 1, 1, 1,
				0, 0, .25, 1,
				0, .25, 0, 1,
				1, 1, 1, 1,
				
				1, 0, 0, 1,
				1, 0, 0, 1,
				1, 0, 0, 1,
				1, 0, 0, 1,
			]), gl.STATIC_DRAW );

			let lineBuffer = new BufferObject.Index( new Uint8Array([
				0, 1,
				1, 2,
				2, 3,
				3, 0,

				4, 5,
				5, 6,
				6, 7,
				7, 4,
			]), gl.STATIC_DRAW );

			let triangleBuffer = new BufferObject.Index( new Uint8Array([
				0, 1, 2,
				2, 3, 0
			]), gl.STATIC_DRAW );

			let material = new VertexColors;

			material.alpha.enable().setFunc( Alpha.FN_SRC_COLOR , Alpha.FN_ONE_MINUS_DST_COLOR, Alpha.FN_SRC_ALPHA, Alpha.FN_DST_ALPHA );
    		
    		def.Properties( this, {
				vertexBuffer,
				colorBuffer,
				lineBuffer,
				triangleBuffer,
				material,
			}, def.CONFIGURABLE );

			def.Properties( this, {
				visible : true
			}, def.WRITABLE );
		}
		draw ( camera, scene, lights, partentMesh ) {
			this.update( camera );
			if ( !this.visible ) return this;
			if ( !this.material.program.getLinkStatus ) return this;

			
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

			gl.drawElements( gl.LINES, 16, gl.UNSIGNED_BYTE, 0 );
		}
	}

	def.Property( Frustum, "Mesh", FrustumMesh );

	return Frustum;
});