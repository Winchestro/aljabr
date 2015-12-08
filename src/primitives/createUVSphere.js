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

    function createUVSphere ( uniforms, longitudeDivisions, latitudeDivisions, radius, centerX, centerY ) {
        if ( longitudeDivisions === undefined ) longitudeDivisions = 10;
        if ( latitudeDivisions === undefined ) latitudeDivisions = longitudeDivisions;
        
        if ( radius === undefined ) radius = 1;

        if ( centerX === undefined ) centerX = 0;
        if ( centerY === undefined ) centerY = centerX;

        let options                 = createUVSphere.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let heightFn            = options.heightFn;
            let usage               = options.usage;
            let preallocateVertices = options.preallocateVertices;
        
        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            ( longitudeDivisions ) * ( latitudeDivisions ) + preallocateVertices,
            usage
        ));

        let position    = structure.position;
        let color       = structure.color;
        let normal      = structure.normal;
        let uv          = structure.uv;

        let vertices    = mesh.vertices;

        const PI = Math.PI;
        const sin = Math.sin;
        const cos = Math.cos;
    
        let index = 0;
/*
        for ( let longitude = 0; longitude <= longitudeDivisions; longitude++ ) {
            let UP = longitude % 2;
            let vertex = vertices[ index ];
            let position = vertex.position;
            let color = vertex.color;
            let normal = vertex.normal;
            let uv = vertex.uv;

            if ( position ) position.setValues(
                0,
                UP ? 1 * radius : -1 * radius,
                0
            );

            if ( color ) colorFn( color, UP ? 1 : 0, UP ? 0 : 1 );
            
            if ( normal ) normal.setValues(
                0,
                UP ? 1 : -1,
                0
            );

            if ( uv ) uv.setValues(
                1. - ( longitude + -UP * .5 ) / longitudeDivisions,
                UP ? 0 : 1
            );
        
            index++;
        }
*/

        for ( let latitude = 0.5; latitude < latitudeDivisions; latitude++ ) {
            let theta = latitude / latitudeDivisions * PI;
            let sinTheta = sin( theta );
            let cosTheta = cos( theta );
            
            for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
                
                let phi = longitude / longitudeDivisions * -2 * PI;
                let sinPhi = sin( phi );
                let cosPhi = cos( phi );
                
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                let vertex = vertices[ index ];
                let position = vertex.position;
                let color = vertex.color;
                let normal = vertex.normal;
                let uv = vertex.uv;

                if ( position ) position.setValues(
                    x,
                    y,
                    z
                );
                if ( color ) colorFn(
                    color,
                    sinPhi,
                    latitude / latitudeDivisions
                );
                if ( normal ) normal.setValues(
                    x,
                    y,
                    z
                );
                if ( uv ) uv.setValues(
                    1.- longitude / longitudeDivisions,
                    latitude / latitudeDivisions
                );
                index++;

            }
        }

        
    
        vertices.update();

        let pole = new Array( longitudeDivisions  );

        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            pole[ longitude ] = longitude;
        }
        mesh.createFace.apply( mesh, pole );

        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            let max = longitudeDivisions * latitudeDivisions - 1;
            pole[ longitude ] = max - longitude;
        }
        //console.log( pole );
        mesh.createFace.apply( mesh, pole );
        
        for ( let latitude = 0; latitude < latitudeDivisions - 1; latitude++ ) {
            let thisRow = latitude * longitudeDivisions;
            let nextRow = ( latitude + 1 ) * longitudeDivisions;
            
            for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
                let thisCol = longitude;
                let nextCol = ( longitude + 1 ) % longitudeDivisions;
                /*
                console.count("face");
                console.log(
                    thisRow + thisCol,
                    thisRow + nextCol,
                    nextRow + nextCol,
                    nextRow + thisCol
                );*/
                mesh.createFace(
                    thisRow + nextCol,
                    thisRow + thisCol,
                    nextRow + thisCol,
                    nextRow + nextCol
                );
            }
        }
    

        /*
        let nextRow = longitudeDivisions + 1;
        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            let thisCol = longitude;
            let nextCol = longitude + 1;
            let center = longitude + 1 - ( longitude % 2 );

            mesh.createFace(
                nextRow + thisCol,
                center,
                nextRow + nextCol
            );
        }*/
        /*
        for ( let latitude = 0; latitude < latitudeDivisions; latitude++ ) {
            let thisRow = latitude * ( longitudeDivisions + 1 );
            let nextRow = ( latitude + 1 ) * ( longitudeDivisions + 1 );
            
            for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
                let thisCol = longitude;
                let nextCol = longitude + 1;
                
                mesh.createFace(
                    thisRow + thisCol,
                    thisRow + nextCol,
                    nextRow + nextCol,
                    nextRow + thisCol
                );
            }
        }
        */
        /*
        let thisRow = ( latitudeDivisions - 1 ) * ( longitudeDivisions + 1 );
        
        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            let thisCol = longitude;
            let nextCol = longitude + 1;
            let center = longitude + ( longitude % 2 );
            mesh.createFace(
                thisRow + thisCol,
                thisRow + nextCol,
                center
            );
        }
        */
        return mesh;
    }

    def.Properties( createUVSphere, {
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

    return createUVSphere;
});