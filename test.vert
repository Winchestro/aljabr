precision mediump float;

attribute vec2 Vertex;
attribute vec4 Colors;


varying vec4 color;

void main(void){
	gl_Position = vec4(Vertex*.95,0,1);
	color = Colors;
} 