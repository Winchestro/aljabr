precision mediump float;

attribute vec3 Vertex;
attribute vec2 Uv;

uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

varying vec2 texCoords;

void main(void){
	gl_Position = projection*model*view*vec4(Vertex,1.);
	texCoords = Uv;
}