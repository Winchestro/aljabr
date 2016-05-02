#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

varying vec4 v_color;
varying vec2 v_texCoord;
varying vec4 v_worldVertex;
varying vec3 v_viewVector;
varying mat3 v_modelMatrix;

#define MAX_LIGHTS 4

struct Scene {
    float deltaTime;
};
uniform Scene scene;

struct Material {
    vec4 ambient;
};
uniform Material material;

uniform sampler2D tex0;

void main ( void ) {

    gl_FragColor = v_color * material.ambient;
    
    vec2 center = gl_PointCoord - .5;
    float dist_squared = dot( center, center );
    
  	if ( dist_squared > 0.25 ) discard;
    gl_FragColor = v_color * material.ambient;
    //gl_FragColor = vec4( vec3( dist_squared ), 1.0 );

}