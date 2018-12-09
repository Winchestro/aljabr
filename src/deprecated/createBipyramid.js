import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import Mesh from "../mesh/Mesh.js";

export default function createBipyramid ( uniforms, divisions ) {
    if ( divisions === undefined ) divisions = 4;

    let options                 = createBipyramid.options;
        let structure           = options.structure;
        let colorFn             = options.colorFn;
        let usage               = options.usage;
        let preallocateVertices = options.preallocateVertices;
    
    let mesh = new Mesh( uniforms, new VertexList(
        structure,
        2 + divisions + preallocateVertices,
        usage
    ));

    let position    = structure.position;
    let color       = structure.color;
    let normal      = structure.normal;
    let uv          = structure.uv;

    let vertices    = mesh.vertices;

    let TOP_VERTEX = 0;
    let BOT_VERTEX = 1;

    if ( position ) {
        vertices[ TOP_VERTEX ].position.setValues( 0, 0,  1 );
        vertices[ BOT_VERTEX ].position.setValues( 0, 0, -1 );
    }
    if ( normal ) {
        vertices[ TOP_VERTEX ].normal.setValues( 0, 0,  1 );
        vertices[ BOT_VERTEX ].normal.setValues( 0, 0, -1 );
    }

    if ( color ) {
        vertices[ TOP_VERTEX ].color.setValues( 0, 0, 1, 1 );
        vertices[ BOT_VERTEX ].color.setValues( 0, 0, 0, 1 );
    }

    for ( let i = 0; i < divisions; i++ ) {
        let phi = i / divisions * -2 * Math.PI;
            let sinPhi = Math.sin( phi );
            let cosPhi = Math.cos( phi );

        let vertex = vertices[ i + 2 ];
            let position = vertex.position;
            let color = vertex.color;
            let normal = vertex.normal;
            let uv = vertex.uv;

        if ( position ) position.setValues( sinPhi, cosPhi, 0 );
        if ( color ) color.setValues( Math.random(), Math.random(), Math.random(), 1 );
        if ( normal ) normal.setValues( sinPhi, cosPhi, 0 );


    }

    /*
    if ( position ) {
        vertices[ 0 ].position.setValues(  0,  0,  1 );
        vertices[ 1 ].position.setValues(  1,  1,  0 );
        vertices[ 2 ].position.setValues( -1,  1,  0 );
        vertices[ 3 ].position.setValues(  1, -1,  0 );
        vertices[ 4 ].position.setValues( -1, -1,  0 );
        vertices[ 5 ].position.setValues(  0,  0, -1 ); 
    }

    if ( normal ) {
        vertices[ 0 ].normal.setValues(  0,  0,  1 );
        vertices[ 1 ].normal.setValues(  1,  1,  0 );
        vertices[ 2 ].normal.setValues( -1,  1,  0 );
        vertices[ 3 ].normal.setValues(  1, -1,  0 );
        vertices[ 4 ].normal.setValues( -1, -1,  0 );
        vertices[ 5 ].normal.setValues(  0,  0, -1 );   
    }

    if ( color ) {
        vertices[ 0 ].color.setValues(  .5, .5,  1, 1 );
        vertices[ 1 ].color.setValues(   1,  1, .5, 1 );
        vertices[ 2 ].color.setValues(   0,  1, .5, 1 );
        vertices[ 3 ].color.setValues(   1,  0, .5, 1 );
        vertices[ 4 ].color.setValues(   0,  0, .5, 1 );
        vertices[ 5 ].color.setValues(  .5, .5, .5, 1 );    

    }
    */
    /*
    mesh.createFace( 0, 1, 2 );
    mesh.createFace( 0, 3, 1 );
    mesh.createFace( 0, 4, 3 );
    mesh.createFace( 0, 2, 4 );
    
    mesh.createFace( 5, 2, 1 );
    mesh.createFace( 5, 1, 3 );
    mesh.createFace( 5, 3, 4 );
    mesh.createFace( 5, 4, 2 );
    */
    vertices.update();

    for ( let i = 2; i < ( divisions + 2 ); i++ ) {

        mesh.createFace( TOP_VERTEX, i, ( ( i - 1 ) % ( divisions ) ) + 2 );

        mesh.createFace( BOT_VERTEX, ( ( i - 1 ) % ( divisions ) ) + 2 , i );


    }

    return mesh;
}

def.Properties( createBipyramid, {
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