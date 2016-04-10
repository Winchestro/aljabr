const startTime = Date.now();
const args = [];



var directionalLight;
var pointLight;

var material;
var waterMaterial;
var edgeMaterial;
var textMaterial;
var scene;
var camera;
var lights;

var debug;
var point;
var glyphAtlas;
var text;
var quad;
var gui;

var library = {
    utilities : {
        PropertyDescriptors : "def",
        GlyphAtlas : "",
    },
    resource : {
        Resource : "",
        HttpSourceProgram : ""
    },
    scene : {
        Camera : "",
        Frustum : "",
        Light : "",
        Scene : ""
    },
    webgl : {
        ActiveInfo : "",
        AttributeLocation : "",
        AttributeList : "",
        Bindings : "",
        Capabilities : "",
        Context : "gl",
        Draw : "",
        Extensions : "",
        Framebuffer : "",
        Program : "",
        Renderbuffer : "",
        Shader : "",
        Texture : "",
        Uniform : "",
        UniformArray : "",
        UniformLocation : "",
        UniformList : "",
        UniformStruct : "",
        VertexArrayObject : "",
        BufferObject : "",
        Viewport : "",
        Alpha : "",
        CullFace : "",
        DepthTest : "",
        Multisample : "",
        PolygonOffset : "",
        ScissorTest : "",
        StencilTest : "",
        TextureUnit : ""
    },   
    material : {
        VertexColors : "",
        Phong : "",
        Material : "",
    },
    kernel : {
        InterleavedArray : "",
        PoolAllocator : "",
        ArrayBuffer : "",
        Float32Array : "",
        Float64Array : "",
        Int8Array : "",
        Int16Array : "",
        Int32Array : "",
        Uint8Array : "",
        Uint16Array : "",
        Uint32Array : "",
        allocateUint : ""
    },
    mesh : {
        Mesh : "",
        EdgeList : "",
        FaceList : "",
        VertexList : "",
        Face : "",
        Halfedge : "",
        Vertex : "",
        Element : ""
    },
    math : {
        mat4 : "",
        mat3 : "",
        mat2 : "",
        vec4 : "",
        vec3 : "",
        vec2 : "",
        quat4 : "",
        lerp : ""
    },
    primitives : {
        createCube : "",
        createGrid : "",
        createUVSphere : "",
        createCylinder : "",
        createTetrahedron : "",
        createBipyramid : "",
        createIcosahedron : ""
    },
    "gl-matrix/dist"  : {
        "gl-matrix-min" : "glMatrix"
    }
    
};

void function setup ( ) {
    var dependencies = [];
    for ( var folder in library ) {
        for ( var file in library[ folder ] ) {
            dependencies.push( `./src/${ folder }/${ file }` );
            args.push( library[ folder ][ file ] || file );
        }
    }

    dependencies.push( "page/js/VoronoiMesh" );
    args.push( "VoronoiMesh" );

    eval( main.toString().replace( "$$dependencies", args.toString() ) );



    define( dependencies, main );
}.call( );

function main ( $$dependencies ) {
    "use strict";
    
    // export as globals for debugging
    for ( let library in args ) def.Property( window, args[ library ], arguments[ library ] );

    
    document.body.appendChild( gl.canvas );
    
    gl.setPixelRatio( 1 );
    /*
    gl.clearColor( 0.1, 0.0, 0.1, 1. );
    window.vs = new Shader.Vertex().setShaderSource(`
        attribute vec2 position;

        void main ( ) {

            gl_Position = vec4( position, 0., 1. );

        }
    `).compile(); if ( !vs.getCompileStatus ) console.warn( vs.getInfoLog );



    window.fs = new Shader.Fragment().setShaderSource(`
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

    window.program = new Program().attachShader( fs ).attachShader( vs ).link().validate().use();
    window.uniforms = program.getActiveUniforms;

    uniforms.viewport.setValues( innerWidth / 2, innerHeight / 2 );


    navigator.webkitGetUserMedia({ video : true }, function ( stream ) {
        video.src = URL.createObjectURL( stream );
        video.oncanplay = function ( ) {
            tex.allocateImage2D( video );
            
            loop();
        }
    }, console.error.bind( console ));
    window.fsq = new BufferObject.Vertex().bind().allocate( new Float32Array([
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
    //gl.disable( gl.CULL_FACE );

    function loop ( ) {
        requestAnimationFrame( loop );

        //gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        tex.updateImage2D( video ); 
        gl.drawArrays( gl.TRIANGLES, 0, 6 );
    };

    
    */
    let transform = new mat4;
    let lookAt = new mat4;

    camera = new Camera.Perspective( 1, 1000 );
    camera.frustum.setOffset( 5 );
    camera.createFrustumMesh();
    //camera.scene.frustum.lines.visible = false;
    //camera = new Camera.Orthographic( 0, 10, 0, 10, 1, 10 );
    //
    mat4.translate( camera.transform, camera.transform, [ 5, 5, 100 ] );
    scene = camera.scene;

    
    directionalLight = new Light.Directional;

    scene.lights.push( directionalLight );

    mat4.translate( transform, transform, [ 0, 0, 2 ] );
    
    scene.addChild( "voronoi", new VoronoiMesh );

    let edgeMaterial = scene.voronoi.triangulation.lines.material;
    let surfaceMaterial = scene.voronoi.triangulation.triangles.material;

    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 1, 0, 0, 1 );
    }
    let gridXY = createGrid( {
        scale       : new vec3( 11, 11, 11 ),
        transform   : new mat4
    }, 21, 21, 100 );

    gridXY.addChild( "lines", gridXY.edges.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridXY", gridXY );
    
    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 0, 1, 0, 1 );
    }

    
    
    let gridXZ = createGrid( {
        scale       : new vec3( 11,11,11 ),
        transform   : new mat4
    }, 21, 21, 100 );
    mat4.rotateY( gridXZ.transform, gridXZ.transform, Math.PI / 2 );

    gridXZ.addChild( "lines", gridXZ.edges.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridXZ", gridXZ );
    
    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 0, 0, 1, 1 );
    }
    let gridYZ = createGrid( {
        scale       : new vec3( 11,11,11 ),
        transform   : new mat4
    }, 21, 21, 100 );
    mat4.rotateX( gridYZ.transform, gridYZ.transform, Math.PI / 2 )

    gridYZ.addChild( "lines", gridYZ.edges.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridYZ", gridYZ );
    
    point = new Mesh({
        scale : new vec3( 1,1,1 ),
        transform : new mat4
    }, new VertexList({
        position : new Float32Array( 3 ),
        color : new Float32Array( 4 )
    }, 1, gl.STATIC_DRAW ));

    point.vertices[ 0 ].color.update( 1,0,0,1 );

    point.addChild( "point", point.vertices.createElement( edgeMaterial ) );
    scene.addChild( "point", point );

    debug = new Mesh({
        scale : new vec3( 15,15,15 ),
        transform : point.transform
    }, new VertexList({
        position : new Float32Array( 3 ),
        color : new Float32Array( 4 )
    }, 6, gl.STATIC_DRAW ));

    debug.vertices[ 0 ].position.setValues( 0,0,0 );
    debug.vertices[ 2 ].position.setValues( 0,0,0 );
    debug.vertices[ 4 ].position.setValues( 0,0,0 );

    debug.vertices[ 1 ].position.setValues( 1,0,0 );
    debug.vertices[ 3 ].position.setValues( 0,1,0 );
    debug.vertices[ 5 ].position.setValues( 0,0,1 );

    debug.vertices[ 0 ].color.setValues( 1,0,0,1 );
    debug.vertices[ 1 ].color.setValues( 1,0,0,1 );

    debug.vertices[ 2 ].color.setValues( 0,1,0,1 );
    debug.vertices[ 3 ].color.setValues( 0,1,0,1 );

    debug.vertices[ 4 ].color.setValues( 0,0,1,1 );
    debug.vertices[ 5 ].color.setValues( 0,0,1,1 );

    debug.vertices.update();

    debug.addChild( "lines", new Element( edgeMaterial, undefined, gl.LINES ).allocateBuffer( [ 0,1,2,3,4,5 ] )  );
    scene.addChild( "debugCross", debug );
    

    //glyphAtlas = new GlyphAtlas("24px Helvetica");
    //textMaterial = glyphAtlas.material;

    
    gl.clearColor( .1,.0,.1, 1 );


    addEventListener( "resize", handleScale );
    addEventListener( "mousemove", handleMouseMove );
    var dragging = false;

    var touchAstart = new vec2;
    var touchBstart = new vec2;
    var touchApos = new vec2;
    var touchBpos = new vec2;
    var touchTransformOrigin = new vec2;
    
    gl.canvas.addEventListener( "touchstart", function ( event ) {
        if ( event.touches.length === 1 ) {
            dragging = true;
            event.target.focus( event.target );
            if ( event.target === gl.canvas ) {
                handleMouseMove( event.touches[ 0 ] );
                event.preventDefault();
            }
        } else {
            touchAstart.setValues( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY );
            touchBstart.setValues( event.touches[ 1 ].clientX, event.touches[ 1 ].clientY );
            dragging = false;

        }
    });
    gl.canvas.addEventListener( "touchmove", function ( event ) {
        if ( event.target === gl.canvas ) {
            switch ( event.touches.length ) {
                case 1 : {
                    handleMouseMove( event.touches[ 0 ] );
                } break;
                case 2 : {
                    touchApos.setValues( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY );
                    touchBpos.setValues( event.touches[ 1 ].clientX, event.touches[ 1 ].clientY );
                    let distanceA = Math.sqrt( Math.pow( touchAstart[ 0 ] - touchBstart[ 0 ], 2 ), Math.pow( touchAstart[ 1 ] - touchBstart[ 1 ], 2 ) );
                    let distanceB = Math.sqrt( Math.pow( touchApos[ 0 ] - touchBpos[ 0 ], 2 ), Math.pow( touchApos[ 1 ] - touchBpos[ 1 ], 2 ) );
                    let delta = distanceA - distanceB;
                    //scene.camera.transform[ 12 ] = touchTransformOrigin[ 0 ] + ( touchApos[ 0 ] + touchBpos[ 0 ] ) * .5;
                    //scene.camera.transform[ 13 ] = touchTransformOrigin[ 1 ] + ( touchApos[ 1 ] + touchBpos[ 1 ] ) * .5;
                    transform[ 14 ] =  -delta;
                    //console.log( distanceA, distanceB, delta );
                }
            }
        }
    });

    gl.canvas.addEventListener( "touchend", function ( event ) {
        if ( event.touches.length === 0 ) dragging = false;
        else if ( event.touches.length ===  2 ) {
            touchTransformOrigin.setValues( ( touchApos[ 0 ] + touchBpos[ 0 ] ) * .5, ( touchApos[ 1 ] + touchBpos[ 1 ] ) * .5 );
        }
    });

    

    gl.canvas.addEventListener( "mousedown", function ( e ) {
        dragging = true;
    });

    gl.canvas.addEventListener( "mouseup", function ( ) {
        dragging = false;
    });

    gl.canvas.addEventListener( "wheel", function ( e ) {
        let delta = e.wheelDeltaY / Math.abs( e.wheelDeltaY );

        mat4.translate( camera.transform, camera.transform, [ 0, delta * 25, 0 ] );
    });

    let pressedKeys = new Set;
    const KEY_W = "W".charCodeAt( 0 );
    const KEY_A = "A".charCodeAt( 0 );
    const KEY_S = "S".charCodeAt( 0 );
    const KEY_D = "D".charCodeAt( 0 );
    const KEY_X = "X".charCodeAt( 0 );
    const KEY_Y = "Y".charCodeAt( 0 );
    const KEY_V = "V".charCodeAt( 0 );

    addEventListener( "keydown", function ( e ) {
        pressedKeys.add( e.keyCode );
        if ( e.keyCode === KEY_Y ) loop();
    });
    addEventListener( "keyup", function ( e ) {
        pressedKeys.delete( e.keyCode );
    });
    let mouse = new vec3;

    
    function loop ( ) {
        if ( !pressedKeys.has( KEY_X ) ) requestAnimationFrame( loop );
        update();
        redraw();
    }

    let lookVector = new vec3;

    /*
        lookAt ( xPos, yPos, zPos ) {
            
            let eye = CACHE_VEC3_EYE.setValues( this[_3_0_], this[_3_1_], this[_3_2_] );
            let target = CACHE_VEC3_TARGET.setValues( xPos, yPos, zPos );
            let up = vec3.DOWN;

            let z = CACHE_VEC3_Z.set( target ).sub( eye ).normalize();
            let x = CACHE_VEC3_X.set( up ).cross( z ).normalize();
            let y = CACHE_VEC3_Y.set( z ).cross( x );
            //console.log( x );
            //console.log( y );
            //console.log( z );



            let m = this;
                m[_0_0_] = x[_x_]; m[_0_1_] = y[_x_]; m[_0_2_] = z[_x_];
                m[_1_0_] = x[_y_]; m[_1_1_] = y[_y_]; m[_1_2_] = z[_y_];
                m[_2_0_] = x[_z_]; m[_2_1_] = y[_z_]; m[_2_2_] = z[_z_];
                
            return this;
        }

     */
    
    window.temp = new mat4;

    window.eye = new vec3( 0, 0, 10 );
    let target = new vec3;
    let rotation = new quat4;
    let up = vec3.UP;

    let x = new vec3;
    let y = new vec3;
    let z = new vec3;

    function update ( ) {
        //vec3.copy( eye, camera.position );
        vec3.set( target, mouse[ 0 ] * 100, -mouse[ 1 ] * 100, 10 );
        if ( !pressedKeys.has( KEY_V ) ) {

            mat4.lookAt( temp, eye, target, up );
            debug.vertices[ 1 ].position.setValues( temp[ 0 ], temp[ 4 ], temp[ 8 ] );
            debug.vertices[ 3 ].position.setValues( temp[ 1 ], temp[ 5 ], temp[ 9 ] );
            debug.vertices[ 5 ].position.setValues( temp[ 2 ], temp[ 6 ], temp[ 10 ] );
            debug.vertices.update();
            
        }

        let speed = 5;
        //mat4.fromTranslation( camera.transform, eye );
        mat4.lookAt( camera.transformInverse, eye, target, up );
        //mat4.translate( camera.transform, camera.transform, eye );

        //mat4.fromTranslation( point.transform, eye );
        

        if ( pressedKeys.has( KEY_W ) ) vec3.add( eye, eye, [ 0, 0, -speed ] );
        if ( pressedKeys.has( KEY_S ) ) vec3.add( eye, eye, [ 0, 0, speed ] );
        if ( pressedKeys.has( KEY_D ) ) vec3.add( eye, eye, [ speed, 0, 0 ] );
        if ( pressedKeys.has( KEY_A ) ) vec3.add( eye, eye, [ -speed, 0, 0 ] );
        camera.update();
        
    }
    function redraw ( ) {
        //log.clear();
        
        camera.draw();
    }

    var pointer = new vec2;
    var pointerMovement = new vec2;
    var pointerPrevious = new vec2;
    

    function handleMouseMove ( e ) {
        vec2.set( pointer, e.clientX, e.clientY );
        vec2.sub( pointerMovement, pointer, pointerPrevious );
        

        //console.log( e, e.clientX, e.clientY );
        mouse[ 0 ] = ( pointer[ 0 ] / innerWidth * 2 ) - 1;
        mouse[ 1 ] = ( pointer[ 1 ] / innerHeight * 2 ) - 1;
        mouse[ 2 ] = 0;

        //console.log( mouse );
        //scene.camera.project( mouse );
        //console.log( mouse );
        //sphere.transform.setTranslation( mouse[ 0 ], mouse[ 1 ], mouse[ 2 ] );
        if ( dragging ) {
            //let movementX = e.movementX;
            //let movementY = downY - e.clientY;
            //transform.rotateX( pointerMovement[ 1 ] / 100 );
           // transform.rotateY( pointerMovement[ 0 ] / 100 );
            
            
        } else {
            directionalLight.position[ 0 ] = Math.sin( mouse[ 0 ] / 2 * Math.PI );
            directionalLight.position[ 1 ] = -Math.sin( mouse[ 1 ] / 2 * Math.PI );

        }
        vec2.set( pointerPrevious, e.clientX, e.clientY );
    }
    function handleScale( ) {
        gl.canvas.width = innerWidth;
        gl.canvas.height = innerHeight;

        camera.viewport.setDimensions( 0, 0, innerWidth, innerHeight );
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjection();
    }

    

    handleScale();
    loop();
  
  
    
}
    /*
    function createIndexLabel ( parent, index, label, offset ) {
        if ( !label ) return;
        let text = glyphAtlas.createTextMesh( label, {
            scale       : new vec3( 8 ),
            transform   : new mat4().makeTranslation(
                parent.vertices[ index ].position[0] + parent.vertices[ index ].normal[0] * offset,
                parent.vertices[ index ].position[1] + parent.vertices[ index ].normal[1] * offset,
                parent.vertices[ index ].position[2] + parent.vertices[ index ].normal[2] * offset
            )
        });

        text.children.push( text.faces.createElement( textMaterial ) );
        parent.children.push( text );

    }*/

   


    /*
    cube = createCube({
        scale       : new vec3( 2 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    });
    
    //cube.children.push( cube.vertices.createElement( material ) );
    cube.children.push( cube.faces.createElement( material ) );
    cube.children.push( cube.edges.createElement( edgeMaterial ) );
    scene.children.push( cube.createNormalMesh( edgeMaterial, .5 ));

    cube.ondraw = function ( ) {
        this.transform.rotateY( Math.PI * 2 / ( 60 * 20 ) );
    }
    scene.children.push( cube );

    
    
    tetrahedron = createTetrahedron({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( 10, 10, 0 )
    });
    
    //tetrahedron.children.push( tetrahedron.vertices.createElement( material ) );
    tetrahedron.children.push( tetrahedron.faces.createElement( material ) );
    tetrahedron.children.push( tetrahedron.edges.createElement( edgeMaterial ) );
    
    tetrahedron.ondraw = function () {
        this.transform.rotateZ( Math.PI * 2 / ( 60 * 5 ) );
    }
    //scene.children.push( tetrahedron.createNormalMesh( edgeMaterial, .1 ));
    scene.children.push( tetrahedron );
    
    bipyramid = createBipyramid({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( -10, 10, 0 )
    }, 4 );
    
    //bipyramid.children.push( bipyramid.vertices.createElement( material ) );
    bipyramid.children.push( bipyramid.faces.createElement( material ) );
    bipyramid.children.push( bipyramid.edges.createElement( edgeMaterial ) );
    
    bipyramid.ondraw = function ( ) {
        this.transform.rotateZ( Math.PI * 2 / ( 60 * 5 ) );
    }
       

    scene.children.push( bipyramid );

    icosahedron = createIcosahedron({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( -20, 10, 0 )
    }, 12 );
    
    icosahedron.ondraw = function ( ) {
        this.transform.rotateZ( Math.PI * 2 / ( 60 * 5 ) );
    }


    //icosahedron.children.push( icosahedron.vertices.createElement( material ) );
    icosahedron.children.push( icosahedron.faces.createElement( material ) );
    icosahedron.children.push( icosahedron.edges.createElement( edgeMaterial ) );
    

    scene.children.push( icosahedron.createNormalMesh( edgeMaterial, .1 ));
    scene.children.push( icosahedron );

    let sphereDivisions = 20;
    
    sphere = createUVSphere({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( 0, 10, 0 )
    }, 20, 20 );
    //sphere.children.push( sphere.vertices.createElement( material ) );
    sphere.children.push( sphere.faces.createElement( material ) );
    sphere.children.push( sphere.edges.createElement( edgeMaterial ) );
    //scene.children.push( sphere.createNormalMesh( edgeMaterial, 0.10 ));
    
    sphere.ondraw = function ( ) {
        this.transform.rotateY( Math.PI * 2 / ( 60 * 5 ) );
    }
    scene.children.push( sphere );

    cylinder = createCylinder({
        scale       : new vec3( .25 ),
        transform   : new mat4().makeTranslation( 3, 0, 0 )
    }, 12, 16 );
    //cylinder.children.push( cylinder.vertices.createElement( material ) );
    cylinder.children.push( cylinder.faces.createElement( material ) );
    cylinder.children.push( cylinder.edges.createElement( edgeMaterial ) );
    
    cylinder.ondraw = function ( ) {
        this.transform.rotateX( -Math.PI * 2 / ( 60 * 5 ) );
    }
    //scene.children.push( cylinder.createNormalMesh( edgeMaterial, .1 ) );
    sphere.children.push( cylinder );
    
    
    

    
    
    text = glyphAtlas.createTextMesh( "Icosahedron", {
        scale       : new vec3( 12 ),
        transform   : new mat4().makeTranslation( 0, 0, 2 )
    });

    text.children.push( text.faces.createElement( textMaterial ) );
    icosahedron.children.push( text );

    text = glyphAtlas.createTextMesh( "Tetrahedron", {
        scale       : new vec3( 12 ),
        transform   : new mat4().makeTranslation( 0, 0, 2 )
    });

    text.children.push( text.faces.createElement( textMaterial ) );
    tetrahedron.children.push( text );

    text = glyphAtlas.createTextMesh( "Octahedron", {
        scale       : new vec3( 12 ),
        transform   : new mat4().makeTranslation( 0, 0, 2 )
    });

    text.children.push( text.faces.createElement( textMaterial ) );
    bipyramid.children.push( text );
    */
    //scene.children.push( grid );