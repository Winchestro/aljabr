const startTime = Date.now();
const args = [];

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
        VertexColorsPoint : "",
        Material : "",
    },
    kernel : {
        InterleavedArray : "",
        PoolAllocator : "",
/*        ArrayBuffer : "",
        Float32Array : "",
        Float64Array : "",
        Int8Array : "",
        Int16Array : "",
        Int32Array : "",
        Uint8Array : "",
        Uint16Array : "",
        Uint32Array : "",*/
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

    const APP = {
        pressedKeys : new Set,
        KEY_W : "W".charCodeAt( 0 ),
        KEY_A : "A".charCodeAt( 0 ),
        KEY_S : "S".charCodeAt( 0 ),
        KEY_D : "D".charCodeAt( 0 ),
        KEY_Q : "Q".charCodeAt( 0 ),
        KEY_E : "E".charCodeAt( 0 ),
        KEY_X : "X".charCodeAt( 0 ),
        KEY_Y : "Y".charCodeAt( 0 ),
        KEY_V : "V".charCodeAt( 0 ),
        KEY_SPACE : 32,
        KEY_SHIFT : 16,
        
        dragging : false,
        mouse : new vec3,
        pointer : new vec3,
        pointerMovement : new vec3,
        pointerPrevious : new vec3,
        strafe : new vec3,
        forward : new vec3,
        upward : new vec3,

        handleEvent ( event ) {
            switch ( event.type ) {
                case "keydown" : 
                    this.pressedKeys.add( event.keyCode );
                    if ( event.keyCode === APP.KEY_Y ) loop();
                break;
                case "keyup" :
                    this.pressedKeys.delete( event.keyCode );
                break;
                case "mousedown" :
                    this.dragging = true;
                break;
                case "mouseup" : 
                    this.dragging = false;
                break;
                case "mousemove" : 
                    let dragging = this.dragging;
                    let mouse = this.mouse;
                    let pointer = this.pointer;
                    let pointerMovement = this.pointerMovement;
                    let pointerPrevious = this.pointerPrevious;
                    let light = this.light;

                    pointer.setValues( event.clientX, event.clientY );
                    pointerMovement.sub( pointer, pointerPrevious );

                    mouse[ 0 ] = ( pointer[ 0 ] / innerWidth * 2 ) - 1;
                    mouse[ 1 ] = ( pointer[ 1 ] / innerHeight * 2 ) - 1;
                    mouse[ 2 ] = 0;

                    if ( dragging ) {
                        
                    } else {
                        light.position[ 0 ] = Math.sin( mouse[ 0 ] / 2 * Math.PI );
                        light.position[ 1 ] = -Math.sin( mouse[ 1 ] / 2 * Math.PI );

                    }
                    pointerPrevious.setValues( event.clientX, event.clientY );
                break;
                case "wheel" :
                    let delta = event.wheelDeltaY / Math.abs( event.wheelDeltaY );
                    
                    this.camera.position.add( this.forward.set( this.camera.direction ).multiplyScalar( delta * 10 ) );
                    //camera.zoom -= delta * .01;
                break;
                case "resize" :
                    gl.canvas.width = innerWidth;
                    gl.canvas.height = innerHeight;
                    
                    this.camera.updateViewport( 0, 0, innerWidth, innerHeight );
                break;
            }
        },
        initialize ( ) {
            document.body.appendChild( gl.canvas );
            gl.canvas.width = innerWidth;
            gl.canvas.height = innerHeight;

            gl.setPixelRatio( 1 );
            gl.clearColor( .0,.0,.0, 1 );

            //camera = new Camera.Orthographic( -2000, 2000, .1 );
            let camera = window.camera = new Camera.Perspective( .1, 4000 );
            let scene = window.scene = camera.scene;
            let light = new Light.Directional;

            camera.updateViewport( 0, 0, innerWidth, innerHeight );
            //camera.frustum.setOffset( 5 );
            //camera.createFrustumMesh();

            camera.transform.rotateValues( Math.PI / 4, 0, 0, 1 );
            camera.zoom = .8;
            camera.viewTarget = new vec3;
            camera.position.setValues( 0, 250, 500 );


            scene.lights.push( light );
            //scene.lights.push( pointLight );
            console.time("voronoi mesh gen")
            let voronoi = window.voronoi = new VoronoiMesh( 10000, 3 );
            console.timeEnd("voronoi mesh gen")
            let renderMesh = window.renderMesh = voronoi.renderMesh;
            scene.addChild( "voronoi", voronoi );



            voronoi.scale.setValues( 10,10,10 );

            renderMesh.triangles.material.offset.setFill( 5, 1 );
            
            /*
            let edgeMaterial = voronoi.edgeMaterial;
            let surfaceMaterial = voronoi.landMaterial;

            createGrid.options.colorFn = function ( color, x, y ) {
                return color.setValues( 1, 0, 0, 1 );
            }
            let gridXY = createGrid( 21, 21, 100 );
            gridXY.createLineElement( edgeMaterial );
            scene.addChild( "gridXY", gridXY );

            createGrid.options.colorFn = function ( color, x, y ) {
                return color.setValues( 0, 1, 0, 1 );
            }
            let gridXZ = createGrid( 21, 21, 100 );
            gridXY.createLineElement( edgeMaterial );
            scene.addChild( "gridXZ", gridXZ );

            createGrid.options.colorFn = function ( color, x, y ) {
                return color.setValues( 0, 0, 1, 1 );
            }
            let gridYZ = createGrid( 21, 21, 100 );
            
            gridYZ.createLineElement( edgeMaterial );
            scene.addChild( "gridYZ", gridYZ );
            delete createGrid.options.colorFn;
            */


            gl.canvas.addEventListener( "mousemove", this );
            gl.canvas.addEventListener( "wheel", this );
            window.addEventListener( "keydown", this );
            window.addEventListener( "keyup", this );
            window.addEventListener( "resize", this );
            
            def.Properties( this, {
                camera,
                scene,
                light
            });

            this.loop();
        },
        loop ( ) {
            if ( !APP.pressedKeys.has( APP.KEY_X ) ) requestAnimationFrame( APP.loop );
            APP.update();
            APP.redraw();
        },
        update ( ) {
            let speed = 5;
            let forward = this.forward;
            let upward = this.upward;
            let strafe = this.strafe;
            let camera = this.camera;
            let position = camera.position;
            let direction = camera.direction;
            let viewTarget = camera.viewTarget;
            let pressedKeys = this.pressedKeys;
            let mouse = this.mouse;

            const UP = vec3.UP;

            //if ( viewTarget ) viewTarget.setValues( mouse[ 0 ] * 1000, -mouse[ 1 ] * 1000, -50 );

            forward.multiplyValues( 1,1,0, direction ).normalize().multiplyScalar( speed );
            strafe.cross( direction, UP ).normalize().multiplyScalar( speed );
            upward.cross( strafe, direction ).normalize().multiplyScalar( speed );

            if ( pressedKeys.has( APP.KEY_W ) ) {
                camera.position.add( forward ); 
                camera.viewTarget.add( forward );
            }
            else if ( pressedKeys.has( APP.KEY_S ) ) {
                forward.multiplyScalar( -1 );
                camera.position.add( forward );
                camera.viewTarget.add( forward );
                forward.multiplyScalar( -1 );
            }
            if ( pressedKeys.has( APP.KEY_D ) ) {
                camera.position.add( strafe );
                camera.viewTarget.add( strafe );
            }
            else if ( pressedKeys.has( APP.KEY_A ) ) {
                strafe.multiplyScalar( -1 );
                position.add( strafe ); 
                viewTarget.add( strafe );
                strafe.multiplyScalar( -1 );
            }
            if ( pressedKeys.has( APP.KEY_Q ) ) position.add( strafe );
            else if ( pressedKeys.has( APP.KEY_E ) ) {
                strafe.multiplyScalar( -1 );
                position.add( strafe );
                strafe.multiplyScalar( -1 );
            }
            if ( pressedKeys.has( APP.KEY_SPACE ) ) position.add( upward );
            else if ( pressedKeys.has( APP.KEY_SHIFT ) ) {
                upward.multiplyScalar( -1 );
                position.add( upward );
            }

            camera.update();
        },
        redraw ( ) {
            APP.camera.draw();
        }
    };

    APP.initialize();
}