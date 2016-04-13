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
    
    
};

void function setup ( ) {
    var dependencies = [];
    for ( var folder in library ) {
        for ( var file in library[ folder ] ) {
            dependencies.push( `./src/${ folder }/${ file }` );
            args.push( library[ folder ][ file ] || file );
        }
    }

    dependencies.push( "examples/js/VoronoiMesh" );
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
    

    camera = new Camera.Orthographic( -2000, 2000, .1 );
    
    
    camera.frustum.setOffset( 5 );
    camera.createFrustumMesh();
    
    camera.transform.rotate( Math.PI / 4, 0, 0, 1 );

    camera.zoom = .8;
    camera.viewTarget = new vec3;
    camera.position.setValues( 5, 5, 5 );
    
    scene = camera.scene;

    
    directionalLight = new Light.Directional;

    

    scene.lights.push( directionalLight );
    //scene.lights.push( pointLight );
    
    
    scene.addChild( "voronoi", new VoronoiMesh );

    let edgeMaterial = scene.voronoi.edgeMaterial;
    let surfaceMaterial = scene.voronoi.landMaterial;

    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 1, 0, 0, 1 );
    }
    let gridXY = createGrid( {
        scale       : new vec3( 11 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    }, 21, 21, 100 );

    gridXY.addChild( "lines", gridXY.vertices.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridXY", gridXY );
    
    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 0, 1, 0, 1 );
    }
    let gridXZ = createGrid( {
        scale       : new vec3( 11 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 ).rotateY( Math.PI / 2 )
    }, 21, 21, 100 );

    gridXZ.addChild( "lines", gridXZ.vertices.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridXZ", gridXZ );
    
    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 0, 0, 1, 1 );
    }
    let gridYZ = createGrid( {
        scale       : new vec3( 11 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 ).rotateX( Math.PI / 2 )
    }, 21, 21, 100 );

    gridYZ.addChild( "lines", gridYZ.vertices.createElement( edgeMaterial ) );

    camera.scene.addChild( "gridYZ", gridYZ );
    

    
    gl.clearColor( .1,.1,.1, 1 );


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

        camera.zoom -= delta * .01;
    });

    let pressedKeys = new Set;
    const KEY_W = "W".charCodeAt( 0 );
    const KEY_A = "A".charCodeAt( 0 );
    const KEY_S = "S".charCodeAt( 0 );
    const KEY_D = "D".charCodeAt( 0 );

    const KEY_SPACE = 32;
    const KEY_SHIFT = 16;

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
    
    let strafe = new vec3;
    let forward = new vec3;
    let upward = new vec3;

    function update ( ) {
        if ( camera.viewTarget ) camera.viewTarget.setValues( mouse[ 0 ] * 100, -mouse[ 1 ] * 100, -50 );
        
        let speed = 5;


        if ( pressedKeys.has( KEY_W ) ) camera.position.add( forward.set( camera.direction ).multiplyScalar( -speed ) );
        if ( pressedKeys.has( KEY_S ) ) camera.position.add( forward.set( camera.direction ).multiplyScalar( speed ) );
        if ( pressedKeys.has( KEY_D ) ) camera.position.add( strafe.cross( camera.direction, vec3.UP ).normalize().multiplyScalar( -speed ) );
        if ( pressedKeys.has( KEY_A ) ) camera.position.add( strafe.cross( camera.direction, vec3.UP ).normalize().multiplyScalar( speed ) ); 
        if ( pressedKeys.has( KEY_SPACE ) ) camera.position.add( upward.cross( strafe.cross( camera.direction, vec3.UP ), camera.direction ).multiplyScalar( speed ) );
        if ( pressedKeys.has( KEY_SHIFT ) ) camera.position.add( upward.cross( strafe.cross( camera.direction, vec3.UP ), camera.direction ).multiplyScalar( -speed ) );

        camera.update();
    }
    function redraw ( ) {
        
        camera.draw();
    }

    var pointer = new vec2;
    var pointerMovement = new vec2;
    var pointerPrevious = new vec2;
    

    function handleMouseMove ( e ) {
        pointer.setValues( e.clientX, e.clientY );
        pointerMovement.sub( pointer, pointerPrevious );

        mouse[ 0 ] = ( pointer[ 0 ] / innerWidth * 2 ) - 1;
        mouse[ 1 ] = ( pointer[ 1 ] / innerHeight * 2 ) - 1;
        mouse[ 2 ] = 0;

        if ( dragging ) {
            
        } else {
            directionalLight.position[ 0 ] = Math.sin( mouse[ 0 ] / 2 * Math.PI );
            directionalLight.position[ 1 ] = -Math.sin( mouse[ 1 ] / 2 * Math.PI );

        }
        pointerPrevious.setValues( e.clientX, e.clientY );
    }
    function handleScale( ) {
        gl.canvas.width = innerWidth;
        gl.canvas.height = innerHeight;
       
        camera.updateViewport( 0, 0, innerWidth, innerHeight );
    }

    

    handleScale();
    loop();
  
  
    
}
   