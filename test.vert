precision mediump float;
precision mediump int;

attribute vec3 position;
attribute vec2 texCoord;
attribute vec4 color;


uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 modelScale;

varying vec4 v_color;
varying vec2 v_texCoord;

void main ( void ) {
	vec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );
	vec4 viewVertex = viewMatrix * worldVertex;
	vec4 pos = projectionMatrix * viewVertex ;
	gl_Position = pos;
	gl_PointSize = ( -pos.z + 2. ) * 2. + 5.;
	v_color = color;
	v_texCoord = texCoord;
}