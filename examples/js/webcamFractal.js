require([
    "../../src/webgl/Context"
], function main (
    gl
) {
    "use strict";


    gl.clearColor( 0.1, 0.0, 0.1, 1. );
    let vs = new Shader.Vertex().setShaderSource(`
        attribute vec2 position;

        void main ( ) {

            gl_Position = vec4( position, 0., 1. );

        }
    `).compile(); if ( !vs.getCompileStatus ) console.warn( vs.getInfoLog );



    let fs = new Shader.Fragment().setShaderSource(`
        precision mediump float;

        uniform vec2 viewport;
        uniform sampler2D tex;

        void main ( ) {
            vec2 uv = gl_FragCoord.xy / viewport;

            uv.x = abs( uv.x - .5 ) + .5;

            vec4 texel = texture2D( tex, uv );

            gl_FragColor = texel;
        }

    `).compile(); if ( !fs.getCompileStatus ) console.warn( fs.getInfoLog );

    let program = new Program().attachShader( fs ).attachShader( vs ).link().validate().use();
    let uniforms = program.getActiveUniforms;

    uniforms.viewport.setValues( innerWidth / 2, innerHeight / 2 );


    navigator.webkitGetUserMedia({ video : true }, function ( stream ) {
        video.src = URL.createObjectURL( stream );
        video.oncanplay = function ( ) {
            tex.allocateImage2D( video );
            
            loop();
        }
    }, console.error.bind( console ));
    let fsq = new BufferObject.Vertex().bind().allocate( new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
    ]));
    gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( 0 );

    
    
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    let tex = new Texture().bind();
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

    function loop ( ) {
        requestAnimationFrame( loop );

        //gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        tex.updateImage2D( video ); 
        gl.drawArrays( gl.TRIANGLES, 0, 6 );
    };

    
});