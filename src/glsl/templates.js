// TODO: shader template library 

function VertexColors ( ) {
    return gl.createProgram().attachShader( Shader.Vertex(`
        #ifdef GL_ES
            precision mediump float;
            precision mediump int;
        #endif

        attribute vec3 position;
        attribute vec2 texCoord;
        attribute vec4 color;


        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 projectionMatrix;
        uniform vec3 modelScale;

        varying vec4 v_color;
        varying vec2 v_texCoord;

        void main ( void ) {
            vec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );
            vec4 viewVertex = viewMatrix * worldVertex;
            vec4 pos = projectionMatrix * viewVertex ;
            gl_Position = pos;
            gl_PointSize = -pos.z  + 6.;
            v_color = color;
            v_texCoord = texCoord;
        }
    `)).attachShader( Shader.Fragment(`
        precision mediump float;
        precision mediump int;

        varying vec4 v_color;
        varying vec2 v_texCoord;

        uniform float time;
        uniform sampler2D tex0;

        void main ( void ) {
            vec4 t = texture2D( tex0, v_texCoord );
            
            gl_FragColor = v_color;
        }
    `)).link().use();
}
function Phong ( ) {
    return gl.createProgram().attachShader( Shader.Vertex(`
        #ifdef GL_ES
            precision mediump float;
            precision mediump int;
        #endif

        attribute vec3 position;
        attribute vec3 color;
        attribute vec3 normal;
        attribute vec2 texCoord;

        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 projectionMatrix;
        uniform vec3 modelScale;

        varying vec3 v_color;
        varying vec2 v_texCoord;
        varying vec4 v_worldVertex;
        varying vec3 v_viewVector;
        varying vec3 v_normal;
        varying mat3 v_modelMatrix;

        void main ( void ) {
            v_worldVertex = modelMatrix * vec4( position * modelScale, 1. );
            
            vec4 viewVertex = viewMatrix * v_worldVertex;
            gl_Position = projectionMatrix * viewVertex ;
            gl_PointSize = ( -gl_Position.z + 2. ) * 2. + 8.;
            
            v_modelMatrix = mat3( modelMatrix );    
            v_color = color;
            v_texCoord = texCoord;
            v_normal = normalize(  mat3( modelMatrix ) * normal );
            v_viewVector = normalize( -viewVertex.xyz );
        }
    `)).attachShader( Shader.Fragment(`
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
            /*
            M.specular = vec3( 0. );
            M.shininess = 50.;
            M.ambient = vec3( .2 );
            M.diffuse = vec4( .8 );
            */
            vec3 color = M.ambient;
            for ( int i = 0; i < MAX_LIGHTS; ++i ) {
                Light L = light[ i ];
                
                L.position.z = 1.;
                L.attenuation = vec3( 2., .0, .001 );
                L.direction = vec3( 0. );
                L.color = vec3( 1.,1.,1. );
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

            vec4 texture0 = texture2D( tex0, v_texCoord * 4. );
            vec2 center = ( gl_PointCoord.xy - .5 ) * 2.;
            float s = ( 1. - dot( center, center ) ) * sqrt( 2. );
            
            gl_FragColor = clamp( vec4( color * v_color , material.diffuse.w ), 0.0, 1.0 );// * texture0;
        }
    `)).link().use();
}