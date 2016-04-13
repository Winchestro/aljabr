/*pointLight = new Light({
        position        : new vec4( 1,1,1,1 ),
        attenuation     : new vec3( 2, 1, 0.025 ),
        color           : new vec3( 1 ),
        direction       : new vec3( 0 ),
        exponent        : 2,
        innerCutoff     : 0.1,
        outerCutoff     : 5.9
    });*/
/*
    point = new Mesh({
        scale : new vec3( 1 ),
        transform : new mat4
    }, new VertexList({
        position : new Float32Array( 3 ),
        color : new Float32Array( 4 )
    }, 1, gl.STATIC_DRAW ));

    point.vertices[ 0 ].color.update( 1,0,0,1 );

    point.addChild( "point", point.vertices.createElement( edgeMaterial ) );
    scene.addChild( "point", point );

    debug = new Mesh({
        scale : new vec3( 15 ),
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
    
*/
    //glyphAtlas = new GlyphAtlas("24px Helvetica");
    //textMaterial = glyphAtlas.material;
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