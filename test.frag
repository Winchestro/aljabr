precision mediump float;

uniform sampler2D tex0;

varying vec2 texCoords;

void main(void){
	gl_FragColor = texture2D(tex0,texCoords);
}