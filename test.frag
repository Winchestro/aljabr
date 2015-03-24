precision mediump float;
precision mediump int;

varying vec4 v_color;
varying vec2 v_texCoord;

uniform float time;
uniform sampler2D tex0;
/*builtin variables
	vec4 gl_FragCoord
	vec2 gl_PointCoord
	bool gl_FrontFacing
	vec4 gl_FragColor
	vec4 gl_FragData[ gl_MaxDrawBuffers ]
*/
void main ( void ) {

	vec4 t = texture2D( tex0, v_texCoord );
	vec2 s = ( gl_PointCoord.xy - .5 ) * 2. / sqrt( 2. );

	float dist = 1.-sqrt( s.x * s.x + s.y * s.y );
	gl_FragColor = v_color * dist;
}