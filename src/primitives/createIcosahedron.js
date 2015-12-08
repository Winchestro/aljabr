define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../mesh/Mesh",
], function module (
    def,
    gl,
    Mesh
){  
    "use strict";

    function createIcosahedron ( uniforms ) {
        let options                 = createIcosahedron.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let usage               = options.usage;
        
        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            12,
            usage
        ));

        let position    = structure.position;
        let color       = structure.color;
        let normal      = structure.normal;
        let uv          = structure.uv;

        let vertices    = mesh.vertices;

        let GOLDEN_RATIO = ( 1 + Math.sqrt( 5 ) ) / 2;
        let VERTEX_INSET = 1 / GOLDEN_RATIO;

        vertices[ 0 ].position.setValues( 0,  VERTEX_INSET,  1 );
        vertices[ 1 ].position.setValues( 0, -VERTEX_INSET,  1 );
        vertices[ 2 ].position.setValues( 0, -VERTEX_INSET, -1 );
        vertices[ 3 ].position.setValues( 0,  VERTEX_INSET, -1 );

        vertices[ 4 ].position.setValues(  VERTEX_INSET,  1, 0 );
        vertices[ 5 ].position.setValues( -VERTEX_INSET,  1, 0 );
        vertices[ 6 ].position.setValues( -VERTEX_INSET, -1, 0 );
        vertices[ 7 ].position.setValues(  VERTEX_INSET, -1, 0 );

        vertices[  8 ].position.setValues(  1, 0,  VERTEX_INSET  );
        vertices[  9 ].position.setValues(  1, 0, -VERTEX_INSET  );
        vertices[ 10 ].position.setValues( -1, 0, -VERTEX_INSET  );
        vertices[ 11 ].position.setValues( -1, 0,  VERTEX_INSET  );

        vertices[ 0 ].color.setValues( 1, 0, 0, 1 );
        vertices[ 1 ].color.setValues( 1, 0, 0, 1 );
        vertices[ 2 ].color.setValues( 1, 0, 0, 1 );
        vertices[ 3 ].color.setValues( 1, 0, 0, 1 );

        vertices[ 4 ].color.setValues( 0, 1, 0, 1 );
        vertices[ 5 ].color.setValues( 0, 1, 0, 1 );
        vertices[ 6 ].color.setValues( 0, 1, 0, 1 );
        vertices[ 7 ].color.setValues( 0, 1, 0, 1 );

        vertices[ 8 ].color.setValues( 0, 0, 1, 1 );
        vertices[ 9 ].color.setValues( 0, 0, 1, 1 );
        vertices[ 10 ].color.setValues( 0, 0, 1, 1 );
        vertices[ 11 ].color.setValues( 0, 0, 1, 1 );

        //mesh.createFace( 0, 1, 2, 3 );
        //mesh.createFace( 4, 5, 6, 7 );
        //mesh.createFace( 8, 9, 10, 11 );



        mesh.createFace( 8, 4, 0 );
        mesh.createFace( 4, 5, 0 );
        mesh.createFace( 5, 11, 0 );

        mesh.createFace( 1, 8, 0 );
        mesh.createFace( 11, 1, 0 );

        mesh.createFace( 11, 6, 1 );
        mesh.createFace( 6, 7, 1 );
        mesh.createFace( 7, 8, 1 );

        mesh.createFace(  9, 8, 7 );
        mesh.createFace( 9, 7, 2 );
        mesh.createFace( 7, 6, 2 );
        mesh.createFace( 6, 10, 2 );
        mesh.createFace( 11, 10, 6 );

        mesh.createFace( 3, 2, 10 );
        mesh.createFace( 2, 3,  9 );

        mesh.createFace( 3, 10, 5 );
        mesh.createFace( 10, 11, 5 );

        mesh.createFace(  5, 4, 3 );

        mesh.createFace( 4, 9, 3 );
        mesh.createFace( 4, 8, 9 );

        mesh.vertices.update();

        return mesh;
    }

    def.Properties( createIcosahedron, {
        options : {
            structure : {
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 ),
                normal      : new Float32Array( 3 ),
                uv          : new Float32Array( 2 )
            },
            usage : gl.STATIC_DRAW
        }
    });

    return createIcosahedron;
});