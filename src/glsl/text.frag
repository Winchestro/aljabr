#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

varying vec2 v_texCoord;

struct Material {
    vec4 color;
};

uniform Material material;
uniform sampler2D tex0;

void main ( void ) {
    vec4 texture0 = texture2D( tex0, v_texCoord );
    gl_FragColor = texture0 * material.color;
}