import def from "../utilities/PropertyDescriptors.js";
import Float32Array from "../kernel/Float32Array.js";
import Plane from "../math/Plane.js";
import vec2 from "../math/vec2.js";
import vec3 from "../math/vec3.js";
import vec4 from "../math/vec4.js";
import BufferObject from "../webgl/BufferObject.js";
import VertexList from "../mesh/VertexList.js";
import VertexColors from "../material/VertexColors.js";

const CACHE_VEC3 = new vec3;

export default class Frustum {
	constructor ( xOffset, yOffset, zOffset ) {
		if ( xOffset === undefined ) xOffset = 0;
		if ( yOffset === undefined ) yOffset = xOffset;
		if ( zOffset === undefined ) zOffset = xOffset;

		const vertexCount = 8;
		const dimensions = 3;
		
		//super( vertexCount * dimensions );

		let vertices = new VertexList;
		vertices.allocateItems( vertexCount ).createItems();

		//console.log( vertices );



		def.Properties( this, {
			vertices,
			xOffset,
			yOffset,
			zOffset
		}, def.WRITABLE );
	}

	setOffset ( xOffset, yOffset, zOffset ) {
		if ( xOffset === undefined ) xOffset = 0;
		if ( yOffset === undefined ) yOffset = xOffset;
		if ( zOffset === undefined ) zOffset = xOffset;

		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.zOffset = zOffset;

		return this;
	}

	update ( camera ) {
		let width = camera.viewport.width;
		let height = camera.viewport.height;
		let far = camera.far;
		let near = camera.near;
		let depth = far - near;
		
		let xOffset = this.xOffset;
		let yOffset = this.yOffset;
		let zOffset = this.zOffset;
		let useOffset = xOffset !== 0 || yOffset !== 0 || zOffset !== 0;

		if ( useOffset ) camera.updateProjection( near + zOffset, far - zOffset );


		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, yOffset, 1 ) );
		/* top left far */
		this.vertices[ 0 ].position.set( CACHE_VEC3 );
		
		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, height - yOffset, 1 ) );
		/* bottom left far */
		this.vertices[ 1 ].position.set( CACHE_VEC3 );

		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset , height - yOffset, 1 ) );
		/* bottom right far */
		this.vertices[ 2 ].position.set( CACHE_VEC3 );

		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset, yOffset, 1 ) );
		/* top right  far */
		this.vertices[ 3 ].position.set( CACHE_VEC3 );

		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, yOffset, 0 ) );
		/* top left near */
		this.vertices[ 4 ].position.set( CACHE_VEC3 );
		
		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( xOffset, height - yOffset, 0 ) );
		/* bottom left near */
		this.vertices[ 5 ].position.set( CACHE_VEC3 );

		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset , height - yOffset, 0 ) );
		/* bottom right near */
		this.vertices[ 6 ].position.set( CACHE_VEC3 );

		camera.unprojectFromScreenCoordinates( CACHE_VEC3.setValues( width - xOffset, yOffset, 0 ) );
		/* top right near */
		this.vertices[ 7 ].position.set( CACHE_VEC3 );

		if ( useOffset ) camera.updateProjection( near, far );

		return this;
	}

	createMesh (  ) {
		return new FrustumMesh( this );
	}
}

class FrustumMesh {
	constructor ( frustum ) {
		

		//let vertexBuffer = new BufferObject.Vertex( frustum, gl.DYNAMIC_DRAW );
		
		let colorBuffer = new BufferObject.Vertex( new Float32Array([
			1, 1, 1, 1,
			.05, .1, .25, 1,
			.05, .1, .25, 1,
			1, 1, 1, 1,
			
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,
			1, 0, 0, 1,
		]), gl.STATIC_DRAW );

		let lines = new BufferObject.Index( new Uint8Array([
			0, 1,
			1, 2,
			2, 3,
			3, 0,

			4, 5,
			5, 6,
			6, 7,
			7, 4,
		]), gl.STATIC_DRAW );

		let triangles = new BufferObject.Index( new Uint8Array([
			0, 1, 2,
			2, 3, 0,

			4, 5, 6,
			6, 7, 4,

		]), gl.STATIC_DRAW );

		let material = new VertexColors;


		def.Properties( this, {
			frustum,
			colorBuffer,
			lines,
			triangles,
			material,
		}, def.CONFIGURABLE );

		def.Properties( this, {
			visible : true
		}, def.WRITABLE );

		def.Properties( this.triangles, {
			visible : true
		}, def.WRITABLE );

		def.Properties( this.lines, {
			visible : true
		}, def.WRITABLE );
			
	}

	update ( camera, scene, lights, partentMesh ) {
		this.frustum.update( camera );
		//this.vertexBuffer.bind().update( this.frustum );
		//this.frustum.vertices.update();
		
		//console.log( this.frustum.vertices );
	}

	draw ( camera, scene, lights, partentMesh ) {

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
				uniforms.scale.value.setValues( 1, 1, 1 );
				uniforms.scale.set( uniforms.scale.value );
				
			}
			if ( uniforms.transform ) {
				uniforms.transform.value.makeIdentity();
				uniforms.transform.set( uniforms.transform.value );
				
			}
		}
		

		this.frustum.vertices.bind();

		this.colorBuffer.bind();
		gl.enableVertexAttribArray( 1 );
		gl.vertexAttribPointer( 1, 4, gl.FLOAT, false, 0, 0 );
		
		if ( this.triangles.visible ) {
			this.triangles.bind();
			gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0 );
			camera.drawCalls++;
		}
		if ( this.lines.visible ) {
			this.lines.bind();
			gl.drawElements( gl.LINES, 16, gl.UNSIGNED_BYTE, 0 );
			camera.drawCalls++;
		}
	}


}