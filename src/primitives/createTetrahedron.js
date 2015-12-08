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

    function createTetrahedron ( uniforms ) {
        let options                 = createTetrahedron.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let usage               = options.usage;
            let preallocateVertices = options.preallocateVertices;
        
        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            4 + preallocateVertices,
            usage
        ));

        let position    = structure.position;
        let color       = structure.color;
        let normal      = structure.normal;
        let uv          = structure.uv;

        let vertices    = mesh.vertices;

        if ( position ) {
            vertices[ 0 ].position.setValues(  1,  1,  1 );
            vertices[ 1 ].position.setValues(  1, -1, -1 );
            vertices[ 2 ].position.setValues( -1,  1, -1 );
            vertices[ 3 ].position.setValues( -1, -1,  1 ); 
        }

        if ( normal ) {
            vertices[ 0 ].normal.setValues(  1,  1,  1 );
            vertices[ 1 ].normal.setValues(  1, -1, -1 );
            vertices[ 2 ].normal.setValues( -1,  1, -1 );
            vertices[ 3 ].normal.setValues( -1, -1,  1 );   
        }

        if ( color ) {
            vertices[ 0 ].color.setValues(  1,  1,  1, 1 );
            vertices[ 1 ].color.setValues(  1,  0,  0, 1 );
            vertices[ 2 ].color.setValues(  0,  1,  0, 1 );
            vertices[ 3 ].color.setValues(  0,  0,  1, 1 );

        }

        mesh.createFace( 0, 1, 2 );
        mesh.createFace( 1, 0, 3 );
        mesh.createFace( 2, 1, 3 );
        mesh.createFace( 3, 0, 2 );
        vertices.update();

        return mesh;
    }

    def.Properties( createTetrahedron, {
        options : {
            structure : {
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 ),
                normal      : new Float32Array( 3 ),
                uv          : new Float32Array( 2 )
            },
            usage : gl.STATIC_DRAW,
            preallocateVertices : 0
        }
    });

    return createTetrahedron;
});