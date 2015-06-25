#ifdef GL_ES
	precision mediump float;
	precision mediump int;
#endif

attribute vec2 position;

void main ( void ) {
	gl_Position = vec4( position, 0., 1. );
}