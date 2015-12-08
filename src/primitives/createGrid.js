define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../mesh/Mesh",
    "../math/vec3"
], function module (
    def,
    gl,
    Mesh,
    vec3
){
    "use strict";

    function createGrid ( uniforms, xDivisions, yDivisions, x1, x2, y1, y2 ) {
        if ( xDivisions === undefined ) xDivisions = 10;
        if ( yDivisions === undefined ) yDivisions = 10;
        if ( x1 === undefined ) x1 = 1;
        if ( x2 === undefined ) x2 = -x1;
        if ( y1 === undefined ) y1 = x1;
        if ( y2 === undefined ) y2 = x2;

        xDivisions+=2;
        yDivisions+=2;

        let options                 = createGrid.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let heightFn            = options.heightFn;
            let usage               = options.usage;
            let preallocateVertices = options.preallocateVertices;

        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            ( xDivisions ) * ( yDivisions ) + preallocateVertices,
            usage
        ));
        //console.log( mesh.vertices.structure );

        let vertices    = mesh.vertices;
        let position    = structure.position;
        let color       = structure.color;
        let normal      = structure.normal;
        let uv          = structure.uv;

        let index = 0;
        //a + ( b - a ) * alpha;
        
        for ( let xx = 0; xx < xDivisions; xx++ ) {
            for ( let yy = 0; yy < yDivisions; yy++ ) {
                let xAlpha = xx / ( xDivisions - 1 );
                let yAlpha = yy / ( yDivisions - 1 );
                let x = x1 + ( x2 - x1 ) * xAlpha;
                let y = y1 + ( y2 - y1 ) * yAlpha;
                let z = heightFn ? heightFn( x, y ) : 0;

                if ( position ) {
                    vertices[ index ].position.setValues( x, y, z );
                }
                if ( color ) {
                    colorFn( vertices[ index ].color, xAlpha, yAlpha, z );
                }
                if ( normal ) {
                    vertices[ index ].normal.setValues( 0, 0, 1 );
                }
                if ( uv ) {
                    vertices[ index ].uv.setValues(
                        xx / ( xDivisions - 1 ),
                        yy / ( yDivisions - 1 )
                    );
                }
                index++;
            }
        }
        
        vertices.update();

        for ( let x = 0; x < xDivisions - 1; x++ ) {
            let thisRow = x * yDivisions;
            let nextRow = ( x + 1 ) * yDivisions;
            for ( let y = 0; y < yDivisions - 1; y++ ) {
                let yWrap = ( y % ( yDivisions - 1 ) ) + 1;

                mesh.createFace( thisRow + y, nextRow + y, nextRow + yWrap, thisRow + yWrap );
            }
        }

        
        return mesh;
    }

    def.Properties( createGrid, {
        options : {
            structure : {
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 ),
                normal      : new Float32Array( 3 ),
                uv          : new Float32Array( 2 )
            },
            usage : gl.STATIC_DRAW,
            preallocateVertices : 0,
            colorFn : function colorFn ( view, x, y, z ) {
                view[ 0 ] = x * .5 + .25;
                view[ 1 ] = y * .5 + .25;
                view[ 2 ] = z * .5 + .25;
                view[ 3 ] = 1;
            },
            heightFn : null
        }
    });

    return createGrid;
});