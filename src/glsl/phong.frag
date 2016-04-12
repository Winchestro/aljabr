/*
    builtins
    
    vec4 gl_FragCoord
    vec2 gl_PointCoord
    bool gl_FrontFacing
    vec4 gl_FragColor
    vec4 gl_FragData[ gl_MaxDrawBuffers ]
*/

#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

#define MAX_LIGHTS 4

struct Scene {
    int usedLights;
    float deltaTime;
};

struct Light {
    vec4 position;
    vec3 attenuation;
    vec3 direction;
    vec3 color;
    float outerCutoff;
    float innerCutoff;
    float exponent;
};

struct Material {
    vec4 ambient;
    vec4 diffuse;
    vec3 specular;
    float shininess;
};

uniform Scene scene;
uniform Light lights[ MAX_LIGHTS ];
uniform Material material;

varying vec4 v_color;
varying vec2 v_texCoord;
varying vec4 v_worldVertex;
varying vec3 v_viewVector;
varying vec3 v_normal;
varying mat3 v_modelMatrix;

vec3 applyLight ( vec3 color, Light light, Material material, vec3 worldVertex, vec3 viewVector, vec3 normal );

void main ( void ) {
    vec3 worldVertex = v_worldVertex.xyw;
    vec3 viewVector = v_viewVector;
    vec3 normal = v_normal;
    vec3 vertexColor = v_color.rgb;

    float vertexAlpha = v_color.a;
    float ambientAlpha = material.ambient.a;

    vec3 color = material.ambient.rgb;
    
    for ( int i = 0; i < MAX_LIGHTS; ++i ) {
        if ( i >= scene.usedLights ) break;

        color = applyLight( color, lights[ i ], material, worldVertex, viewVector, normal );
    }
   
    gl_FragColor = clamp( vec4( color * vertexColor, ambientAlpha * vertexAlpha ), 0.0, 1.0 );
}

vec3 applyLight ( vec3 color, Light light, Material material, vec3 worldVertex, vec3 viewVector, vec3 normal ) {
    
    if ( light.position.w == 0.0 ) {
        //vec3 lightVec = normalize( light.position.xyz - worldVertex );

        float intensity = dot( normal, normalize( light.position.xyz ) );

        color += max( intensity * material.diffuse.rgb, material.ambient.rgb );
    } else {
        vec3 lightVec = normalize( light.position.xyz - worldVertex );
        float l = dot( normal, lightVec );
        if ( l > 0.0 ) {
            float spotlight = 1.0;
            
            if ( ( light.direction.x != 0.0 ) || ( light.direction.y != 0.0 ) || ( light.direction.z != 0.0 ) ) {
                
                spotlight = max( -dot( lightVec, light.direction ), 0.0 );
                float spotlightFade = clamp( ( light.outerCutoff - spotlight ) / ( light.outerCutoff - light.innerCutoff ), 0.0, 1.0 );
                spotlight = pow( spotlight * spotlightFade, light.exponent );
            }
            
            vec3 r = -normalize( reflect( lightVec, normal ) );
            float s = pow( max( dot( r, viewVector ), 0. ), material.shininess );

            float d = distance( worldVertex, light.position.xyz );
            float a = 1.0 / ( light.attenuation.x + ( light.attenuation.y * d ) + ( light.attenuation.z * d * d ) );
            color += (
                ( material.diffuse.xyz * l ) + ( material.specular * s )
            ) * light.color * a * spotlight;
        }
    }
    return color;
}