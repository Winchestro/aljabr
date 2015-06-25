#ifdef GL_ES
	precision mediump float;
	precision mediump int;
#endif

varying vec3 v_color;
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

struct Light {
	vec3 position;
	vec3 attenuation;
	vec3 direction;
	vec3 color;
	float outerCutoff;
	float innerCutoff;
	float exponent;
};
uniform Light light[ MAX_LIGHTS ];

struct Material {
	vec3 ambient;
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
	Material M = material;
	vec3 normal = normalize( v_normal );
/*
	vec3 normal = normalize( v_viewVector *  texture2D( normalMap, v_texCoord ).rgb );
	vec3 specular = texture2D( tex0, v_texCoord ).rgb;
	float shininess = /*texture2D( tex0, v_texCoord ).a;
	vec4 diffuse = vec4(texture2D( tex0, v_texCoord ).rgb, 1. );
*/
	
	vec3 specular = M.specular;
	float shininess = M.shininess;
	vec4 diffuse = M.diffuse;
	
	M.specular = vec3( 0. );
	M.shininess = 50.;
	M.ambient = vec3( .2 );
	M.diffuse = vec4( 3.5 );
	
	vec3 color = M.ambient;
	for ( int i = 0; i < MAX_LIGHTS; ++i ) {
		Light L = light[ i ];
		
		L.position.z = 2.;
		L.attenuation = vec3( 2.0, 0.0, 0.1 );
		L.direction = vec3( 0.0, 0.0, 0.0 );
		L.color = vec3( 1.0, 1.0, 1.0 );
		L.outerCutoff = 1.8;
		L.innerCutoff = .1;
		L.exponent = 2.;
		
		if ( i >= scene.usedLights ) break;
		vec3 lightVec = normalize( L.position - v_worldVertex.xyz );
		float l = dot( normal, lightVec );
		if ( l > 0.0 ) {
			float spotlight = 1.0;
			
			if ( ( L.direction.x != 0.0 ) || ( L.direction.y != 0.0 ) || ( L.direction.z != 0.0 ) ) {
				
				spotlight = max( -dot( lightVec, L.direction ), 0.0 );
				float spotlightFade = clamp( ( L.outerCutoff - spotlight ) / ( L.outerCutoff - L.innerCutoff ), 0.0, 1.0 );
				spotlight = pow( spotlight * spotlightFade, L.exponent );
			}
			
			vec3 r = -normalize( reflect( lightVec, normal ) );
			float s = pow( max( dot( r, v_viewVector ), 0. ), M.shininess );

			float d = distance( v_worldVertex.xyz, light[ i ].position );
			float a = 1.0 / ( L.attenuation[ 0 ] + ( L.attenuation[ 1 ] * d ) + ( L.attenuation[ 2 ] * d * d ) );
			color += (
				( M.diffuse.xyz * l ) + ( specular * s )
			) * L.color * a * spotlight;
		}
	}

	//vec4 texture0 = texture2D( tex0, v_texCoord );
	//vec2 center = ( gl_PointCoord.xy - .5 ) * 2.;
	//float s = ( 1. - dot( center, center ) ) * sqrt( 2. );
	
	gl_FragColor = clamp( vec4( color * v_color , material.diffuse.w ), 0.0, 1.0 );// * texture0;
}