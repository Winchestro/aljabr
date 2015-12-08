#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

varying vec4 v_color;
varying vec2 v_texCoord;
varying vec4 v_worldVertex;
varying vec3 v_viewVector;
varying vec3 v_normal;
varying mat3 v_modelMatrix;

#define MAX_LIGHTS 4

struct Scene {
    int frame;
    int usedLights;
    float deltaTime;
};
uniform Scene scene;

struct Lights {
    vec3 position;
    vec3 attenuation;
    vec3 direction;
    vec3 color;
    float outerCutoff;
    float innerCutoff;
    float exponent;
};
uniform Lights lights[ MAX_LIGHTS ];

struct Material {
    vec4 ambient;
    vec4 diffuse;
    vec3 specular;
    float shininess;
};
uniform Material material;

uniform sampler2D tex0;
uniform sampler2D normalMap;
/*builtin variables
    vec4 gl_FragCoord
    vec2 gl_PointCoord
    bool gl_FrontFacing
    vec4 gl_FragColor
    vec4 gl_FragData[ gl_MaxDrawBuffers ]
*/
void main ( void ) {
    //vec3 normal = normalize( v_normal );
    
    vec3 specular = material.specular;
    float shininess = material.shininess;
    vec4 diffuse = material.diffuse;

    vec3 color = material.ambient.rgb;
    for ( int i = 0; i < MAX_LIGHTS; ++i ) {
        if ( i >= scene.usedLights ) break;

        Lights light = lights[ i ];

        vec3 lightVec = normalize( light.position - v_worldVertex.xyz );
        float l = dot( v_normal, lightVec );
        if ( l > 0.0 ) {
            float spotlight = 1.0;
            
            if ( ( light.direction.x != 0.0 ) || ( light.direction.y != 0.0 ) || ( light.direction.z != 0.0 ) ) {
                
                spotlight = max( -dot( lightVec, light.direction ), 0.0 );
                float spotlightFade = clamp( ( light.outerCutoff - spotlight ) / ( light.outerCutoff - light.innerCutoff ), 0.0, 1.0 );
                spotlight = pow( spotlight * spotlightFade, light.exponent );
            }
            
            vec3 r = -normalize( reflect( lightVec, v_normal ) );
            float s = pow( max( dot( r, v_viewVector ), 0. ), material.shininess );

            float d = distance( v_worldVertex.xyz, light.position );
            float a = 1.0 / ( light.attenuation.x + ( light.attenuation.y * d ) + ( light.attenuation.z * d * d ) );
            color += (
                ( material.diffuse.xyz * l ) + ( specular * s )
            ) * light.color * a * spotlight;
        }
    }
    //float t = ( sin( scene.deltaTime * 0.005 ) + 1.0 ) * .5;
    //vec4 texture0 = texture2D( tex0, v_texCoord );
    gl_FragColor = clamp( vec4( color * v_color.rgb /* texture0.rgb*/ , material.ambient.a * v_color.a ), 0.0, 1.0 );
    

}