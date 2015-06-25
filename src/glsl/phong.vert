#ifdef GL_ES
	precision mediump float;
	precision mediump int;
#endif

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 texCoord;

struct Mesh {
	mat4 transform;
	vec3 scale;
};

uniform Mesh mesh;

struct Camera {
	mat4 transform;
	mat4 projection;
};

uniform Camera camera;

varying vec3 v_color;
varying vec2 v_texCoord;
varying vec4 v_worldVertex;
varying vec3 v_viewVector;
varying vec3 v_normal;
varying mat3 v_modelMatrix;

void main ( void ) {
	v_worldVertex = mesh.transform * vec4( position * mesh.scale, 1. );
	
	vec4 viewVertex = camera.transform * v_worldVertex;
	gl_Position = camera.projection * viewVertex ;
	gl_PointSize = ( -gl_Position.z + 2. ) * 2. + 8.;
	
	v_modelMatrix = mat3( mesh.transform );
	v_color = color;
	v_texCoord = texCoord;
	v_normal = normalize(  mat3( mesh.transform ) * normal );
	v_viewVector = normalize( -viewVertex.xyz );
}