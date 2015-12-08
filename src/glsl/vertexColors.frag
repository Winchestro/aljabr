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
    int frame;
    float deltaTime;
};
uniform Scene scene;

struct Material {
    vec4 ambient;
};
uniform Material material;

uniform sampler2D tex0;

void main ( void ) {

    //vec4 texture0 = texture2D( tex0, v_texCoord );
    gl_FragColor = v_color * material.ambient;
    

}