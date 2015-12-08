#ifdef GL_ES
    precision mediump float;
    precision mediump int;
#endif

uniform vec2 resolution;
uniform float time;
uniform sampler2D hashTexture;

float hash ( in float index );
float align ( in float a, in float b );
float smooth ( in float t );

float noise ( in float uv, in float frequency );
float noise ( in vec2 uv, in float frequency );
float noise ( in vec3 uv, in float frequency );

float noiseLinear ( in float uv, in float frequency );
float noiseLinear ( in vec2 uv, in float frequency );
float noiseLinear ( in vec3 uv, in float frequency );

float noiseSmooth ( in float uv, in float frequency );
float noiseSmooth ( in vec2 uv, in float frequency );
float noiseSmooth ( in vec3 uv, in float frequency );

float perlin ( in float uv, in float frequency );
float perlin ( in vec2 uv, in float frequency );

struct Gradient1D {
    float g0;
    float g1;
} gradient1D = Gradient1D(
     1.0, 
    -1.0
);
struct Gradient2D {
    vec2 g0;
    vec2 g1;
    vec2 g2;
    vec2 g3;
    vec2 g4;
    vec2 g5;
    vec2 g6;
    vec2 g7;
} gradient2D = Gradient2D(
    vec2(  1.0,  0.0 ),
    vec2( -1.0,  0.0 ),
    vec2(  0.0,  1.0 ),
    vec2(  0.0, -1.0 ),

    normalize( vec2(  1.0,  1.0 ) ),
    normalize( vec2( -1.0,  1.0 ) ),
    normalize( vec2(  1.0, -1.0 ) ),
    normalize( vec2( -1.0, -1.0 ) )
);


float SQRT_TWO = sqrt( 2. );
float texelSize = 4. / resolution.x;
float texelBias = .0625 * texelSize;

void main ( void ) {
    float t = ( 1. + sin( time / 50. ) ) * .5;
    float uv1 = gl_FragCoord.x / resolution.x;
    vec2 uv2 = gl_FragCoord.xy / resolution.xx;
    vec3 uv3 = vec3( gl_FragCoord.xy / resolution.xx, t );
    gl_FragColor = vec4( vec3( .5 * ( 1. + perlin( uv2,
        .1 + .1 * abs( sin( time * .1 ) )
    ) ) ), 1. );
}

float noise ( in float uv, in float frequency ) {
    uv *= frequency;
    return hash( uv );
}

float noise ( in vec2 uv, in float frequency ) {
    uv *= frequency;

    float x = hash( uv.x );
    float y = hash( align( x, 256. ) + uv.y );
    return y;
}

float noise ( in vec3 uv, in float frequency ) {
    uv *= frequency;
    float x = hash( uv.x );
    float y = hash( align( x, 256. ) + uv.y );
    float z = hash( y + uv.z );
    return z;
}

float noiseLinear ( in float uv, in float frequency ) {
    uv *= frequency;    
    float xA = hash( uv );
    float xB = hash( uv + texelSize - texelBias );
    float xT = fract( uv / texelSize );
    return mix( xA, xB, xT );
}

float noiseLinear ( in vec2 uv, in float frequency ) {
    uv *= frequency;

    float xT = fract( uv.x / texelSize );
    float yT = fract( uv.y / texelSize );

    float xA = uv.x;
    float yA = uv.y;
    float xB = uv.x + texelSize - texelBias;
    float yB = uv.y + texelSize - texelBias;

    float x0 = hash( xA );
    float x1 = hash( xB );

    float h00 = hash( align( x0, 256. ) + yA );
    float h10 = hash( align( x1, 256. ) + yA );
    float h01 = hash( align( x0, 256. ) + yB );
    float h11 = hash( align( x1, 256. ) + yB );

    return mix( 
        mix( h00, h10, xT ),
        mix( h01, h11, xT ),
    yT );
}

float noiseLinear ( in vec3 uv, in float frequency ) {
    uv *= frequency;

    float xT = fract( uv.x / texelSize );
    float yT = fract( uv.y / texelSize );
    float zT = fract( uv.z / texelSize );

    float xA = uv.x;
    float yA = uv.y;
    float zA = uv.z;

    float xB = uv.x + texelSize - texelBias;
    float yB = uv.y + texelSize - texelBias;
    float zB = uv.z + texelSize - texelBias;

    float h0 = hash( xA );

    float h1 = hash( xB );

    float h00 = hash( align( h0, 256. ) + yA );
    float h10 = hash( align( h1, 256. ) + yA );

    float h01 = hash( align( h0, 256. ) + yB );
    float h11 = hash( align( h1, 256. ) + yB );

    float h000 = hash( align( h00, 256. ) + zA );
    float h100 = hash( align( h10, 256. ) + zA );
    float h010 = hash( align( h01, 256. ) + zA );
    float h110 = hash( align( h11, 256. ) + zA );
    float h001 = hash( align( h00, 256. ) + zB );
    float h101 = hash( align( h10, 256. ) + zB );
    float h011 = hash( align( h01, 256. ) + zB );
    float h111 = hash( align( h11, 256. ) + zB );

    return mix( 
        mix( 
            mix( h000, h100, xT ),
            mix( h010, h110, xT ), 
        yT ),
        mix( 
            mix( h001, h101, xT ), 
            mix( h011, h111, xT ), 
        yT ),
    zT );
}

float noiseSmooth ( in float uv, in float frequency ) {
    uv *= frequency;    
    float xA = hash( uv );
    float xB = hash( uv + texelSize - texelBias );
    float xT = smooth( fract( uv / texelSize ) );
    return mix( xA, xB, xT );
}

float noiseSmooth ( in vec2 uv, in float frequency ) {
    uv *= frequency;

    float xT = smooth( fract( uv.x / texelSize ) );
    float yT = smooth( fract( uv.y / texelSize ) );

    float xA = uv.x;
    float yA = uv.y;
    float xB = uv.x + texelSize - texelBias;
    float yB = uv.y + texelSize - texelBias;

    float x0 = hash( xA );
    float x1 = hash( xB );

    float h00 = hash( align( x0, 256. ) + yA );
    float h10 = hash( align( x1, 256. ) + yA );
    float h01 = hash( align( x0, 256. ) + yB );
    float h11 = hash( align( x1, 256. ) + yB );

    return mix( 
        mix( h00, h10, xT ),
        mix( h01, h11, xT ),
    yT );
}

float noiseSmooth ( in vec3 uv, in float frequency ) {
    uv *= frequency;

    float xT = smooth( fract( uv.x / texelSize ) );
    float yT = smooth( fract( uv.y / texelSize ) );
    float zT = smooth( fract( uv.z / texelSize ) );

    float xA = uv.x;
    float yA = uv.y;
    float zA = uv.z;

    float xB = uv.x + texelSize - texelBias;
    float yB = uv.y + texelSize - texelBias;
    float zB = uv.z + texelSize - texelBias;

    float h0 = hash( xA );

    float h1 = hash( xB );

    float h00 = hash( align( h0, 256. ) + yA );
    float h10 = hash( align( h1, 256. ) + yA );

    float h01 = hash( align( h0, 256. ) + yB );
    float h11 = hash( align( h1, 256. ) + yB );

    float h000 = hash( align( h00, 256. ) + zA );
    float h100 = hash( align( h10, 256. ) + zA );
    float h010 = hash( align( h01, 256. ) + zA );
    float h110 = hash( align( h11, 256. ) + zA );
    float h001 = hash( align( h00, 256. ) + zB );
    float h101 = hash( align( h10, 256. ) + zB );
    float h011 = hash( align( h01, 256. ) + zB );
    float h111 = hash( align( h11, 256. ) + zB );

    return mix( 
        mix( 
            mix( h000, h100, xT ),
            mix( h010, h110, xT ), 
        yT ),
        mix( 
            mix( h001, h101, xT ), 
            mix( h011, h111, xT ), 
        yT ),
    zT );
}

float perlin ( in float uv, in float frequency ) {
    uv *= frequency;
    float tX0 = fract( uv / texelSize );
    float tX1 = tX0 - 1.0;

    float xA = hash( uv );
    float xB = hash( uv + texelSize - texelBias );

    float g0;
    float g1;
    if ( xA > .5 ) g0 = gradient1D.g0;
    else g0 = gradient1D.g1;
    
    if ( xB > .5 ) g1 = gradient1D.g0;
    else g1 = gradient1D.g1;
    
    float v0 = g0 * tX0;
    float v1 = g1 * tX1;

    float t = smooth( tX0 );
    return 2. * mix( v0, v1, t );
}

float perlin ( in vec2 uv, in float frequency ) {
    uv *= frequency;

    float tx0 = fract( uv.x / texelSize );
    float tx1 = tx0 - 1.0;
    
    float ty0 = fract( uv.y / texelSize );
    float ty1 = ty0 - 1.0;

    float xA = uv.x;
    float xB = uv.x + texelSize - texelBias;
    
    float yA = uv.y;
    float yB = uv.y + texelSize - texelBias;    

    float h0 = hash( xA );
    float h1 = hash( xB );

    float h00 = hash( align( h0, 256. ) + yA );
    float h10 = hash( align( h1, 256. ) + yA );
    float h01 = hash( align( h0, 256. ) + yB );
    float h11 = hash( align( h1, 256. ) + yB );

    vec2 g00, g10, g01, g11;

    if      ( h00 > 7. / 8. )   g00 = gradient2D.g0;
    else if ( h00 > 6. / 8. )   g00 = gradient2D.g1;
    else if ( h00 > 5. / 8. )   g00 = gradient2D.g2;
    else if ( h00 > 4. / 8. )   g00 = gradient2D.g3;
    else if ( h00 > 3. / 8. )   g00 = gradient2D.g4;
    else if ( h00 > 2. / 8. )   g00 = gradient2D.g5;
    else if ( h00 > 1. / 8. )   g00 = gradient2D.g6;
    else                        g00 = gradient2D.g7;

    if      ( h10 > 7. / 8. )   g10 = gradient2D.g0;
    else if ( h10 > 6. / 8. )   g10 = gradient2D.g1;
    else if ( h10 > 5. / 8. )   g10 = gradient2D.g2;
    else if ( h10 > 4. / 8. )   g10 = gradient2D.g3;
    else if ( h10 > 3. / 8. )   g10 = gradient2D.g4;
    else if ( h10 > 2. / 8. )   g10 = gradient2D.g5;
    else if ( h10 > 1. / 8. )   g10 = gradient2D.g6;
    else                        g10 = gradient2D.g7;

    if      ( h01 > 7. / 8. )   g01 = gradient2D.g0;
    else if ( h01 > 6. / 8. )   g01 = gradient2D.g1;
    else if ( h01 > 5. / 8. )   g01 = gradient2D.g2;
    else if ( h01 > 4. / 8. )   g01 = gradient2D.g3;
    else if ( h01 > 3. / 8. )   g01 = gradient2D.g4;
    else if ( h01 > 2. / 8. )   g01 = gradient2D.g5;
    else if ( h01 > 1. / 8. )   g01 = gradient2D.g6;
    else                        g01 = gradient2D.g7;

    if      ( h11 > 7. / 8. )   g11 = gradient2D.g0;
    else if ( h11 > 6. / 8. )   g11 = gradient2D.g1;
    else if ( h11 > 5. / 8. )   g11 = gradient2D.g2;
    else if ( h11 > 4. / 8. )   g11 = gradient2D.g3;
    else if ( h11 > 3. / 8. )   g11 = gradient2D.g4;
    else if ( h11 > 2. / 8. )   g11 = gradient2D.g5;
    else if ( h11 > 1. / 8. )   g11 = gradient2D.g6;
    else                        g11 = gradient2D.g7;

    float v00 = dot( g00, vec2( tx0, ty0 ) );
    float v10 = dot( g10, vec2( tx1, ty0 ) );
    float v01 = dot( g01, vec2( tx0, ty1 ) );
    float v11 = dot( g11, vec2( tx1, ty1 ) );

    float tx = smooth( tx0 );
    float ty = smooth( ty0 );
    //return v00;
    return SQRT_TWO * mix(
        mix( v00, v10, tx ),
        mix( v01, v11, tx ),
    ty );
}


float smooth( in float t ) {
    return t * t * t * ( t * ( t * 6.0 - 15.0 ) + 10.0 );
}

float align( in float a, in float b ) {
    return floor( a * b ) / b;
}

float hash ( in float index ) {
    return texture2D( hashTexture, vec2( index , 0.5 ) ).a;
}
/*
float hash ( in float indexA, in float indexB ) {
    return texture2D( hashTexture, vec2( index )
}
*/