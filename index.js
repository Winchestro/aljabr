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

var directionalLight;
var pointLight;

var material;
var waterMaterial;
var edgeMaterial;
var textMaterial;
var scene;
var camera;
var lights;

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
    
    "../../lib/Javascript-Voronoi" : {
        "rhill-voronoi-core" : "Voronoi"
    },
    /*
    "../../lib/noisejs" : {
        "perlin" : "noise"
    },*/
    "../../lib/proc-noise-node/lib" : {
        "proc-noise" : "Perlin"
    },

    /*
    gui : {
        gui : "GUI"
    }*/
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

    //gui = new GUI;

    //gui.appendChild( gl.canvas );

    
    document.body.appendChild( gl.canvas );
    gl.setPixelRatio();
    
    camera = new Camera.Perspective( 0.1, 1000 );
    scene = camera.scene;

    
    directionalLight = new Light({
        position        : new vec4( 1,1,1,0 ),
        attenuation     : new vec3( 2, 1, 0.025 ),
        color           : new vec3( 1 ),
        direction       : new vec3( 0 ),
        exponent        : 2,
        innerCutoff     : 0.1,
        outerCutoff     : 5.9
    });

    pointLight = new Light({
        position        : new vec4( 1,1,1,1 ),
        attenuation     : new vec3( 2, 1, 0.025 ),
        color           : new vec3( 1 ),
        direction       : new vec3( 0 ),
        exponent        : 2,
        innerCutoff     : 0.1,
        outerCutoff     : 5.9
    });

    camera.scene.lights.push( directionalLight );
    //scene.lights.push( pointLight );
    
    camera.transform
        .translate( 0, 0, -10 )
        .rotate( -Math.PI / 4, 1, 0, 0 )
    ;
    camera.scene.addChild( "frustum", new Frustum.Mesh( camera, 5 ) );
    material = new Material.Phong;
    waterMaterial = new Material.Phong;

    //material.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA );
    
    material.offset.enable().setFill( 1, 0 );

    waterMaterial.depth.disableWrite();
    waterMaterial.alpha.enable().setFunc( Alpha.FN_SRC_COLOR , Alpha.FN_ONE_MINUS_DST_COLOR, Alpha.FN_SRC_ALPHA, Alpha.FN_DST_ALPHA );
    waterMaterial.offset.enable().setFill( 1, 0 );


    edgeMaterial = new Material.VertexColors;
    
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
    const NOISE_SCALE = 0.04;
    const NOISE_EXPONENT = 2;
    diagram = createSmooth( 1000, bbox, 4 );
    
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
            } while ( scaledNoise( x, y, NOISE_SCALE, NOISE_EXPONENT ) < Math.random() );
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
        targetVertex.color.setValues( .3,.5,.8, .6 );
        targetVertex.normal.setValues( 0,0,1 );
        targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ),  .5 * ( 1 + sourceVertex.y ) );
        //createIndexLabel( cells, i, "c_"+i/*faceIndices.join(" / ")*/, 2 );
        
    }

    let faceIndices = [];
    for ( let i = 0; i < diagram.cells.length; i++ ) {
        let cell = diagram.cells[ i ];

        
        for ( let halfedge of cell.halfedges ) {
            faceIndices.unshift( halfedge.getStartpoint().id );
        }

        let face = cells.createFace.apply( cells, faceIndices );

        let sourceVertex = diagram.cells[ i ].site;
        let targetVertex = tris.vertices[ i ];

        face.site = targetVertex;
        
        let z = scaledNoise( sourceVertex.x, sourceVertex.y, NOISE_SCALE, NOISE_EXPONENT );
        /*
        let g;
        ( z > 0 ) ? g = ( z + .5 ) * 0.75 : g = 0;
        let b;
        ( z < 0 ) ? b = 1 : b = 0;
        */
        let g = Math.max( z, -.25 ) + .75 - Math.min( z, 0 );
        let w = Math.max( z +.25, .5 ); 


        //let b = Math.min( z, 0 ) + .5;
        //console.log( z );

        targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, /*( z  > 0 ) ? z * 10 : 0*/ z * 10 );
        targetVertex.color.setValues( w, g, w, 1 );
        //targetVertex.normal.setValues( 0, 0, 1 );
        targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ), .5 * ( 1 + sourceVertex.y ) );
        //createIndexLabel( tris, i, "t_"+i/*faceIndices.join(" / ")*/, 2 );
        //createIndexLabel( tris, i, faceIndices.join(" / "), 3 );
        faceIndices.length = 0;
        
    }

    //cells.alignHalfedges();


    for ( let i = 0; i < cells.vertices.length; i++ ) {
        let vertex = cells.vertices[ i ];
        
        for ( let face of vertex.faces() ) {
            faceIndices.push( face.site.index );
        }

        //console.log( faceIndices.length, i );
        //createIndexLabel( cells, i, faceIndices.join(" / "), 5 );
        if ( faceIndices.length === 3 ) {
            
            let face = tris.createFace.apply( tris, faceIndices );
            face.vertex = vertex;
            
            let vertices = tris.vertices.dereference( faceIndices );

            let v0 = vec3.sub( new vec3, vertices[ 0 ].position, vertices[ 1 ].position );
            let v1 = vec3.sub( new vec3, vertices[ 2 ].position, vertices[ 0 ].position );

            let faceNormal = v0.cross( v1 );

            face.normal = faceNormal;
            

        }

        
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

    
    cells
        .addChild( "points", cells.vertices.createElement( material ), 0 )
        .addChild( "normals", cells.createNormalMesh( edgeMaterial, 5 ), 0 )
        .addChild( "lines", cells.edges.createElement( edgeMaterial ), 0 )
        .addChild( "triangles", cells.faces.createElement( waterMaterial ), 0 )
    ;
    cells.points.visible = false;
    cells.lines.visible = false;
    cells.normals.visible = false;

    camera.scene.addChild( "delaunay", tris );
    camera.scene.addChild( "voronoi", cells );
    //scene.children.push( tris );
    //scene.children.push( cells );

    
    
    
    
    tris
        .addChild( "points", tris.vertices.createElement( material ), 0 )
        .addChild( "lines", tris.edges.createElement( edgeMaterial ), 0 )
        .addChild( "normals", tris.createNormalMesh( edgeMaterial, 5 ), 0 )
        .addChild( "triangles", tris.faces.createElement( material ), 0 )
    ;

    tris.points.visible = false;
    tris.normals.visible = false;
    tris.lines.visible = false;


    function scaledNoise( x, y, scale, exponent ) {
        let n = ( perlin.noise( x * scale, y * scale ) - .5 ) * 2;
        return  n;
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
        scale       : new vec3( 11 ),
        transform   : new mat4().makeTranslation( 0, 0, 0 )
    }, 21, 21, 100 );

    //console.profileEnd( "create grid mesh" );

    grid
        .addChild( "triangles", grid.faces.createElement( material ) )
        .addChild( "lines", grid.edges.createElement( edgeMaterial ) )
    ;
    grid.triangles.visible = false;
    grid.visible = false;

    camera.scene.addChild( "grid", grid );
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
    //new HttpSourceProgram( "./src/glsl/phong", setupPhong );
    
    //gui.inspect( tris );
    //gui.inspect( cells );
    //gui.inspect( scene );

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
                    camera.transform[ 14 ] =  -delta;
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

        camera.transform.translate( 0,0, -delta * 5 );
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
        update();
        redraw();
    }
    function update ( ) {
        if ( pressedKeys.has( KEY_W ) ) camera.transform[ 13 ]--;
        if ( pressedKeys.has( KEY_S ) ) camera.transform[ 13 ]++;
        if ( pressedKeys.has( KEY_A ) ) camera.transform[ 12 ]++; 
        if ( pressedKeys.has( KEY_D ) ) camera.transform[ 12 ]--;
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
        pointer.setValues( e.clientX, e.clientY );
        pointerMovement.sub( pointer, pointerPrevious );

        //console.log( e, e.clientX, e.clientY );
        mouse[ 0 ] = ( pointer[ 0 ] / innerWidth * 2 ) - 1;
        mouse[ 1 ] = ( pointer[ 1 ] / innerHeight * 2 ) - 1;
        mouse[ 2 ] = -1;

        //console.log( mouse );
        //scene.camera.project( mouse );
        //console.log( mouse );
        //sphere.transform.setTranslation( mouse[ 0 ], mouse[ 1 ], mouse[ 2 ] );
        if ( dragging ) {
            //let movementX = e.movementX;
            //let movementY = downY - e.clientY;
            
            camera.transform.rotateZ( pointerMovement[ 0 ] / 100 );
            
        } else {
            directionalLight.position[ 0 ] = Math.sin( mouse[ 0 ] / 2 * Math.PI );
            directionalLight.position[ 1 ] = -Math.sin( mouse[ 1 ] / 2 * Math.PI );
            /*
            scene.lights[0].position.setValues(
                (.5 - e.x  / innerWidth ) * -20,
                (.5 - e.y  / innerHeight ) * 20, 
                7,
                0
            );
*/
        }
        pointerPrevious.setValues( e.clientX, e.clientY );
    }
    function handleScale( ) {
        gl.canvas.width = innerWidth;
        gl.canvas.height = innerHeight;
        gl.viewport( 0, 0, innerWidth, innerHeight );

        camera.aspect = innerWidth / innerHeight;
        camera.updateProjection();
    }

    

    handleScale();
    loop();
  

    
}