#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

struct Mesh {
    mat4 transform;
    vec3 scale;
};

struct Camera {
    mat4 transform;
    mat4 projection;
};

attribute vec3 position;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

uniform Mesh mesh;
uniform Camera camera;

varying vec4 v_color;
varying vec2 v_texCoord;
varying vec4 v_worldVertex;
varying vec3 v_viewVector;
varying mat3 v_modelMatrix;

void main ( void ) {
    v_worldVertex = mesh.transform * vec4( position * mesh.scale, 1. );
    
    vec4 viewVertex = camera.transform * v_worldVertex;
    
    gl_Position = camera.projection * viewVertex ;
    gl_PointSize = 10.;
    
    v_modelMatrix = mat3( mesh.transform );
    v_color = color;
    v_texCoord = texCoord;
    v_viewVector = normalize( -viewVertex.xyz );
}