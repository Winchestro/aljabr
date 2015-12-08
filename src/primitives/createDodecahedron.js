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

    function createDodecahedron ( uniforms ) {
        let options                 = createDodecahedron.options;
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


        mesh.vertices.update();

        return mesh;
    }

    def.Properties( createDodecahedron, {
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

    return createDodecahedron;
});