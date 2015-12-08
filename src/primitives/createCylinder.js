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

    function createCylinder ( uniforms, xDivisions, yDivisions ) {
        if ( xDivisions === undefined ) xDivisions = 20;
        if ( yDivisions === undefined ) yDivisions = 20;

        let options                 = createCylinder.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let usage               = options.usage;
            let preallocateVertices = options.preallocateVertices;
        
        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            xDivisions * yDivisions + preallocateVertices,
            usage
        ));

        let vertices    = mesh.vertices;
        let index       = 0;

        for ( let currentY = 0; currentY < yDivisions; currentY++ ) {
            

            let phi = currentY / yDivisions * -2 * Math.PI;
                let sinPhi = Math.sin( phi );
                let cosPhi = Math.cos( phi );

            let x = cosPhi;
            let y = sinPhi;


            for ( let currentX = 0; currentX < xDivisions; currentX++ ) {

                let z = ( currentX / ( xDivisions - 1 ) * 2 ) - 1;

                let vertex          = vertices[ index ];
                    let position    = vertex.position;
                    let color       = vertex.color;
                    let normal      = vertex.normal;
                    let uv          = vertex.uv;

                

                if ( position ) position.setValues( x, y, z );
                if ( normal ) normal.setValues( x, y, 0 );
                if ( color ) {
                    if ( currentX === 0 || currentX === xDivisions - 1 ) color.setValues( .5, currentX / (xDivisions - 1), .5, 1 );
                    else color.setValues( Math.random(), Math.random(), Math.random(), 1 );
                }
                index++;
            }
        }

        vertices.update();

        let pole = new Array( yDivisions  );

        for ( let y = 0; y < yDivisions; y++ ) {
            pole[ y ] = y * xDivisions;
        }
        mesh.createFace.apply( mesh, pole );

        let max = yDivisions * xDivisions - 1;

        for ( let y = 0; y < yDivisions; y++ ) {
            
            pole[ y ] = max - y * xDivisions;
        }
        //console.log( pole );
        mesh.createFace.apply( mesh, pole );
        
        for ( let y = 0; y < yDivisions; y++ ) {
            let thisCol = y * xDivisions;
            let nextCol = ( ( y + 1 ) % yDivisions ) * xDivisions;

            for ( let x = 0; x < xDivisions - 1; x++ ) {
                let thisRow = x;
                let nextRow = x + 1;
                mesh.createFace(
                    thisCol + thisRow,
                    thisCol + nextRow,
                    nextCol + nextRow,
                    nextCol + thisRow
                );
            }
        }
        //mesh.createFace( 0, 1, xDivisions + 1, xDivisions + 0 );
        //mesh.createFace( 1, 2, xDivisions + 2, xDivisions + 1 );
        /*
        for ( let currentY = 0; currentY < yDivisions; currentY++ ) {
            let thisCol = currentY * xDivisions;
            let nextCol = ( ( currentY + 1 ) % xDivisions ) * xDivisions;

            for ( let currentX = 0; currentX < xDivisions; currentX++ ) {
                
                let thisRow = currentX;
                let nextRow = ( currentX + 1 ) % xDivisions;
                mesh.createFace(
                    thisRow + nextCol,
                    thisRow + thisCol,
                    nextRow + thisCol,
                    nextRow + nextCol
                );
            }
        }
        */
        return mesh;

    }

    def.Properties( createCylinder, {
        options : {
            structure : {
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 ),
                normal      : new Float32Array( 3 ),
                uv          : new Float32Array( 2 )
            },
            usage : gl.STATIC_DRAW,
            preallocateVertices : 0,
            colorFn : function colorFn ( color, longitude, latitude ) {
                color.setValues(
                    latitude,
                    ( longitude + 1 ) * .5,
                    1. - latitude,
                    1
                );
            },
            heightFn : null
        }
    });

    return createCylinder;
});