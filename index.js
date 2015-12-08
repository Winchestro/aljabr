const startTime = Date.now();
const args = [];

var cube;
var grid;
var sphere;
var cylinder;
var tetrahedron;
var bipyramid;
var icosahedron;
var diagram;
var cells;
var tris;

var material;
var edgeMaterial;
var textMaterial;
var scene;
var camera;
var lights;

var glyphAtlas;
var text;
var quad;

var library = {
    utilities : {
        allocateUint : "",
        PropertyDescriptors : "def",
        Resource : "",
        GlyphAtlas : "",
    },
    scene : {
        Camera : "",
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
        VertexBuffer : "",
        Viewport : ""
    },
    
    material : {
        Alpha : "",
        CullFace : "",
        DepthTest : "",
        Material : "",
        Multisample : "",
        PolygonOffset : "",
        ScissorTest : "",
        StencilTest : "",
        TextureUnit : ""
    },
    kernel : {
        InterleavedArray : "",
        PoolAllocator : "",
        VBOArrayBuffer : ""
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

    "../../lib/Javascript-Voronoi" : {
        "rhill-voronoi-core" : "Voronoi"
    },
    /*
    "../../lib/noisejs" : {
        "perlin" : "noise"
    },*/
    "../../lib/proc-noise-node/lib" : {
        "proc-noise" : "Perlin"
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

    eval( main.toString().replace( "$$dependencies", args.toString() ) );
    define( dependencies, main );
}.call( );

function main ( $$dependencies ) {
    "use strict";
    let perlin = new Perlin;
    // export as globals for debugging
    for ( let library in args ) def.Property( window, args[ library ], arguments[ library ] );




    document.body.appendChild( gl.canvas );
    
    gl.setPixelRatio();
    

    scene = new Scene;
    scene.lights.push( new Light({
        position        : new vec3( 0 ),
        attenuation     : new vec3( 2, 1, 0.025 ),
        color           : new vec3( 1 ),
        direction       : new vec3( 0 ),
        exponent        : 2,
        innerCutoff     : 0.1,
        outerCutoff     : 5.9
    }));

    scene.camera.transform
    .translate( 0, 0, -10 )
    .rotate( -Math.PI / 4, 1,0,0 )
    ;

    material = new Material({
        shininess   : 1.0,
        ambient     : new vec4( .75,.75,.75, 1.0 ),
        diffuse     : new vec4( .5, .5, .5, 1 ),
        specular    : new vec3( 1.0 )
    });
    material.depth.enable().enableWrite();
    //material.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA )
    material.cullFace.enable();
    material.offset.enable().setFill( 1, 0 );

    edgeMaterial = new Material({
        ambient     : new vec4( 1, 1, 1, 1 )
    });
    edgeMaterial.depth.enable().enableWrite();
    /*
    let cubeImg = new Image;
    let cubeTex = new Texture;

    cubeImg.src = "./page/assets/cubemap_cloudy_text_cube.jpg";

    cubeImg.onload = function ( ) {
        material.textures.setActiveTextureUnit( 0 ).setUnpackFlipY( true );
        material.textures[ 0 ] = cubeTex;
        cubeTex
            .bind()
            .image2D( cubeImg )
            .setWrapS( gl.CLAMP_TO_EDGE )
            .setWrapT( gl.CLAMP_TO_EDGE )
            .setMinFilter( gl.NEAREST )
            .setMagFilter( gl.NEAREST )
        ;
    };
    */
    
    //edgeMaterial.cullFace.enable();
    
    
    glyphAtlas = new GlyphAtlas("24px Helvetica");
    
    textMaterial = glyphAtlas.material;
    //console.profile( "create grid mesh" );
    let bbox = { xl: -100, xr: 100, yt: -100, yb: 100 };

    diagram = createSmooth( 5000, bbox, 4 );
    
    function createSmooth ( numSites, bbox, steps ) {
        var sites = [];
        var voronoi = new Voronoi();
        var width = bbox.xr - bbox.xl;
        var height = bbox.yb - bbox.yt;

        for ( var i = 0; i < numSites; i++ ) {
            var x, y;
            do {
                x = Math.random() * width - width * .5;
                y = Math.random() * height - height * .5;
            } while ( scaledNoise( x, y, 0.04 ) < Math.random() );
            sites.push({
                x : x,
                y : y
            });
        }

        let diagram = voronoi.compute( sites, bbox );
    
        while( steps ) {
            sites.length = 0;
            diagram.cells.forEach( function ( cell ) {
                var avgX = cell.halfedges.reduce(
                    function ( p, c ) { return p + c.edge.va.x + c.edge.vb.x }
                    ,0
                ) / 2 / cell.halfedges.length;
                var avgY = cell.halfedges.reduce(
                    function ( p, c ) { return p + c.edge.va.y + c.edge.vb.y }
                    ,0
                ) / 2 / cell.halfedges.length;
                cell.site.x = avgX;
                cell.site.y = avgY;
                sites.push( cell.site );
            })
            voronoi.recycle( diagram );
            diagram = voronoi.compute( sites, bbox );
            steps--;
        }
        return diagram;
    }


    cells = new Mesh({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    }, new VertexList({
        position    : new Float32Array( 3 ),
        color       : new Float32Array( 4 ),
        normal      : new Float32Array( 3 ),
        uv          : new Float32Array( 2 )
    }, diagram.vertices.length,  gl.STATIC_DRAW ));

    tris = new Mesh({
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    }, new VertexList({
        position    : new Float32Array( 3 ),
        color       : new Float32Array( 4 ),
        normal      : new Float32Array( 3 ),
        uv          : new Float32Array( 2 )
    }, diagram.cells.length,  gl.STATIC_DRAW ));

    for ( let i = 0; i < diagram.vertices.length; i++ ) {
        let sourceVertex = diagram.vertices[ i ];
        
        sourceVertex.id = i;
        let targetVertex = cells.vertices[ i ];
      
        targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, 0 );
        targetVertex.color.setValues( 1,1,1, 1 );
        targetVertex.normal.setValues( 0,0,1 );
        targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ),  .5 * ( 1 + sourceVertex.y ) );
        //createIndexLabel( cells, i, "c_"+i/*faceIndices.join(" / ")*/, 2 );
        
    }

    let faceIndices = [];
    for ( let i = 0; i < diagram.cells.length; i++ ) {
        let cell = diagram.cells[ i ];

        
        for ( let halfedge of cell.halfedges ) {
            let toVertex = halfedge.getStartpoint();
//            toVertex.out = halfedge;
            faceIndices.unshift( toVertex.id );

        }
        let face = cells.createFace.apply( cells, faceIndices );

        let sourceVertex = diagram.cells[ i ].site;
        let targetVertex = tris.vertices[ i ];

        face.site = targetVertex;
        
        let z = scaledNoise( sourceVertex.x, sourceVertex.y, .04 );
        
        let g;
        ( z > 0 ) ? g = ( z + .5 ) * 0.75 : g = 0;
        let b;
        ( z < 0 ) ? b = 1 : b = 0;
        //console.log( z );

        targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, ( z  > 0 ) ? z * 10 : 0 );
        targetVertex.color.setValues( 0, g, b, 1 );
        //targetVertex.normal.setValues( 0, 0, 1 );
        targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ), .5 * ( 1 + sourceVertex.y ) );
        //createIndexLabel( tris, i, "t_"+i/*faceIndices.join(" / ")*/, 2 );
        //createIndexLabel( tris, i, faceIndices.join(" / "), 3 );
        faceIndices.length = 0;
        
    }

    //cells.alignHalfedges();


    for ( let i = 0; i < cells.vertices.length; i++ ) {
        let vertex = cells.vertices[ i ];
        //vertex.rotateOutgoingHalfedgeRight();
        for ( let face of vertex.faces() ) {
            faceIndices.push( face.site.index );
        }

        //console.log( faceIndices.length, i );
        
        if ( faceIndices.length === 3 ) {
            
            let face = tris.createFace.apply( tris, faceIndices );
            face.vertex = vertex;
            
            let vertices = tris.vertices.dereference( faceIndices );

            let v0 = vec3.sub( new vec3, vertices[ 0 ].position, vertices[ 1 ].position );
            let v1 = vec3.sub( new vec3, vertices[ 2 ].position, vertices[ 0 ].position );

            let faceNormal = v0.cross( v1 );

            face.normal = faceNormal;
            

        }

        //createIndexLabel( cells, i, faceIndices.join(" / "), 3 );
        faceIndices.length = 0;
    }

    let normal = new vec3;
    for ( let vertex of tris.vertices ) {

        let count = 0;

        for ( let face of vertex.faces() ) {
            if ( face.normal ) {
                count++;
                normal.add( face.normal );
            }
        }  
        normal.divideScalar( count ).normalize();
        
        vertex.normal.set( normal );

        normal.setValues( 0,0,0 );
    }

    cells.vertices.update();
    tris.vertices.update();

    //cells.children.unshift( cells.vertices.createElement( material ) );
    cells.children.unshift( cells.edges.createElement( edgeMaterial ));
    //cells.children.unshift( cells.faces.createElement( material ) );
    scene.children.push( tris );
    //scene.children.push( cells );

    //tris.children.unshift( tris.vertices.createElement( material ));
    
    tris.children.unshift( tris.edges.createElement( edgeMaterial ));
    tris.children.unshift( tris.createNormalMesh( edgeMaterial ) );
    tris.children.unshift( tris.faces.createElement( material ) );
        

    function scaledNoise( x, y, scale ) {
        return ( perlin.noise( x * scale, y * scale ) - .5 ) * 2;
    }

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

    }
    createGrid.options.colorFn = function ( color, x, y ) {
        return color.setValues( 0, x, y, 1 );
    }
    grid = createGrid( {
        scale       : new vec3( 1 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    }, 0, 0, 100 );

    //console.profileEnd( "create grid mesh" );

    grid.children.push( grid.faces.createElement( material ) );
    grid.children.push( grid.edges.createElement( edgeMaterial ) );
    //scene.children.push( grid );
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


    //console.log( scene );
    //console.log( cube );
    
    //scene.children.push( grid.createNormalMesh( edgeMaterial, 1 ));

    
    

    //uniforms = material.program.getActiveUniforms;

    
    
    //edgeMaterial.alpha.enable().setFunc( gl.SRC_ALPHA, gl.DST_ALPHA );

    gl.clearColor( .1,.1,.1, 1 );
    Program.HttpSource( "./src/glsl/phong", setupPhong );
    Program.HttpSource( "./src/glsl/vertexColors", setupVertexColors );
    Program.HttpSource( "./src/glsl/text", setupText );
    
    


    addEventListener( "resize", handleScale );
    addEventListener( "mousemove", handleMouseMove );
    
    var dragging = false;

    addEventListener( "mousedown", function ( e ) {
        dragging = true;
    });

    addEventListener( "mouseup", function ( ) {
        dragging = false;
    });

    addEventListener( "wheel", function ( e ) {
        let delta = e.wheelDeltaY / Math.abs( e.wheelDeltaY );

        scene.camera.transform.translate( 0,0, -delta * 5 );
    });

    let pressedKeys = new Set;
    const KEY_W = 87;
    const KEY_A = 65;
    const KEY_S = 83;
    const KEY_D = 68;
    
    addEventListener( "keydown", function ( e ) {
        pressedKeys.add( e.keyCode );
    });
    addEventListener( "keyup", function ( e ) {
        pressedKeys.delete( e.keyCode );
    });
    let mouse = new vec3;

    
    function loop ( ) {
        requestAnimationFrame( loop );
        if ( pressedKeys.has( KEY_W ) ) scene.camera.transform[ 13 ]--;
        if ( pressedKeys.has( KEY_S ) ) scene.camera.transform[ 13 ]++;
        if ( pressedKeys.has( KEY_A ) ) scene.camera.transform[ 12 ]++; 
        if ( pressedKeys.has( KEY_D ) ) scene.camera.transform[ 12 ]--;
       
        redraw();
    }
    function redraw ( ) {
        //log.clear();
        gl.clear( gl.COLOR_BUFFER_BIT  | gl.DEPTH_BUFFER_BIT );
        scene.draw();
    }

    
    function handleMouseMove ( e ) {
        mouse[ 0 ] = ( e.clientX / innerWidth * 2 ) - 1;
        mouse[ 1 ] = (-e.clientY / innerHeight * 2 ) - 1;
        mouse[ 2 ] = -1;

        //console.log( mouse );
        //scene.camera.project( mouse );
        //console.log( mouse );
        //sphere.transform.setTranslation( mouse[ 0 ], mouse[ 1 ], mouse[ 2 ] );
        if ( dragging ) {
            //let movementX = e.movementX;
            //let movementY = downY - e.clientY;
            
            scene.camera.transform.rotateZ( e.movementX / 100 );
            
        } else {
            scene.lights[0].position.setValues(
                (.5 - e.x  / innerWidth ) * -20,
                (.5 - e.y  / innerHeight ) * 20, 
                7
            );
        }
    }
    function handleScale( ) {
        gl.canvas.width = innerWidth;
        gl.canvas.height = innerHeight;
        gl.viewport( 0, 0, innerWidth, innerHeight );

        scene.camera.aspect = innerWidth / innerHeight;
        scene.camera.updateProjection();
    }
    let phongReady = false;
    let vertexColorsReady = false;
    let textReady = false;

    
    function setupVertexColors ( program ) {
        edgeMaterial.setProgram( program );
        program.bind
        vertexColorsReady = true;

        if ( phongReady && textReady ) {
            handleScale();
            loop();
        }
    }

    function setupPhong ( program ) {
        material.setProgram( program );
        
        phongReady = true;

        if ( vertexColorsReady && textReady ) {
            handleScale();
            loop();
        }
    }

    function setupText ( program ) {
        textMaterial.setProgram( program );

        textReady = true;

        if ( phongReady && vertexColorsReady ) {
            handleScale();
            loop();
        }
    }
    
}