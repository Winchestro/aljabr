#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

struct Mesh {
    mat4 transform;
    vec2 scale;
};

struct Camera {
    int frame;
    mat4 transform;
    mat4 projection;
    mat4 transformInverse;
    mat4 projectionInverse;
};

attribute vec2 position;
attribute vec2 texCoord;

uniform Mesh mesh;
uniform Camera camera;

varying vec2 v_texCoord;


void main ( void ) {

    vec4 worldVertex = vec4( position * mesh.scale, 1., 2. );
    
    mat4 transform = camera.transformInverse * mesh.transform;

    transform[0][0] = 1.;
    
    transform[1][1] = 1.;
    transform[2][2] = 1.;

    transform[0][1] = 0.;
    transform[0][2] = 0.;

    transform[1][0] = 0.;
    transform[1][2] = 0.;

    transform[2][1] = 0.;
    transform[2][0] = 0.;

    vec4 viewVertex = transform * worldVertex;
    
    gl_Position = camera.projection * viewVertex ;
    /*
    
*/

    v_texCoord = texCoord;
}