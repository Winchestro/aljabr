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

    function createCube ( uniforms, x1, x2, y1, y2, z1, z2 ) {

        if ( x1 === undefined ) x1 = 1;
        if ( x2 === undefined ) x2 = -x1;

        if ( y1 === undefined ) y1 = x1;
        if ( y2 === undefined ) y2 = x2;

        if ( z1 === undefined ) z1 = x1;
        if ( z2 === undefined ) z2 = x2;

        let options                 = createCube.options;
            let structure           = options.structure;
            let colorFn             = options.colorFn;
            let usage               = options.usage;
            let preallocateVertices = options.preallocateVertices;
        
        let mesh = new Mesh( uniforms, new VertexList(
            structure,
            14 + preallocateVertices,
            usage
        ));

        // 1-11-9
        // 2-12-10
        // 3-13
        // 4-14

        let position    = structure.position;
        let color       = structure.color;
        let normal      = structure.normal;
        let uv          = structure.uv;

        let vertices    = mesh.vertices;

        const _x_ = 0;
        const _y_ = 1;
        const _z_ = 2;

        if ( position ) {
            vertices[ 0  ].position.setValues( x1, y1, z1 );
            vertices[ 10 ].position.set( vertices[ 0  ].position );
            vertices[ 8  ].position.set( vertices[ 0  ].position );

            vertices[ 1  ].position.setValues( x1, y2, z1 );
            vertices[ 11 ].position.set( vertices[ 1  ].position );
            

            vertices[ 2  ].position.setValues( x1, y2, z2 );
            vertices[ 12 ].position.set( vertices[ 2  ].position );
           

            vertices[ 3  ].position.setValues( x1, y1, z2 );
            vertices[ 13 ].position.set( vertices[ 3  ].position );
            vertices[ 9  ].position.set( vertices[ 3  ].position );

            vertices[ 4  ].position.setValues( x2, y1, z2 );
            vertices[ 5  ].position.setValues( x2, y2, z2 );
            vertices[ 6  ].position.setValues( x2, y2, z1 );
            vertices[ 7  ].position.setValues( x2, y1, z1 );
        }
        if ( color ) {
            vertices[ 0  ].color.setValues( 1, 0, 0, 1 );
            vertices[ 10 ].color.setValues( 0, 1, 0, 1 );
            

            vertices[ 1  ].color.setValues( 1, 0, 0, 1 );
            vertices[ 11 ].color.setValues( 0, 1, 0, 1 );
            vertices[ 8  ].color.setValues( 0, 0, 1, 1 );

            vertices[ 2  ].color.setValues( 1, 0, 0, 1 );
            vertices[ 12 ].color.setValues( 0, 1, 0, 1 );
            vertices[ 9  ].color.setValues( 0, 0, 1, 1 );

            vertices[ 3  ].color.setValues( 1, 0, 0, 1 );
            vertices[ 13 ].color.setValues( 0, 1, 0, 1 );
            

            vertices[ 4  ].color.setValues( 1, 1, 1, 1 );
            vertices[ 5  ].color.setValues( 1, 1, 1, 1 );
            vertices[ 6  ].color.setValues( 1, 1, 1, 1 );
            vertices[ 7  ].color.setValues( 1, 1, 1, 1 );
        }
        if ( normal ) {
            let n1 = new vec3( x1, y1, z1 ).normalize();
            let n2 = new vec3( x2, y2, z2 ).normalize();

            vertices[ 0  ].normal.setValues( n1[_x_], n1[_y_], n1[_z_] );
            vertices[ 10 ].normal.set( vertices[ 0 ].normal );
            vertices[ 8  ].normal.set( vertices[ 0  ].normal );

            vertices[ 1  ].normal.setValues( n1[_x_], n2[_y_], n1[_z_] );
            vertices[ 11 ].normal.set( vertices[ 1  ].normal );
            

            vertices[ 2  ].normal.setValues( n1[_x_], n2[_y_], n2[_z_] );
            vertices[ 12 ].normal.set( vertices[ 2  ].normal );
            

            vertices[ 3  ].normal.setValues( n1[_x_], n1[_y_], n2[_z_] );
            vertices[ 13 ].normal.set( vertices[ 3  ].normal );
            vertices[ 9  ].normal.set( vertices[ 3  ].normal );

            vertices[ 4  ].normal.setValues( n2[_x_], n1[_y_], n2[_z_] );
            vertices[ 5  ].normal.setValues( n2[_x_], n2[_y_], n2[_z_] );
            vertices[ 6  ].normal.setValues( n2[_x_], n2[_y_], n1[_z_] );
            vertices[ 7  ].normal.setValues( n2[_x_], n1[_y_], n1[_z_] );
        }
        if ( uv ) {
            

            vertices[ 0  ].uv.setValues( 1/4, 3/3 );
            vertices[ 1  ].uv.setValues( 2/4, 3/3 );
            vertices[ 2  ].uv.setValues( 2/4, 0/3 );
            vertices[ 3  ].uv.setValues( 1/4, 0/3 );

            vertices[ 4  ].uv.setValues( 1/4, 1/3 );
            vertices[ 5  ].uv.setValues( 2/4, 1/3 );
            vertices[ 6  ].uv.setValues( 2/4, 2/3 );
            vertices[ 7  ].uv.setValues( 1/4, 2/3 );

            vertices[ 8  ].uv.setValues( 4/4, 2/3 );
            vertices[ 9  ].uv.setValues( 4/4, 1/3 );

            vertices[ 10 ].uv.setValues( 0/4, 2/3 );
            vertices[ 11 ].uv.setValues( 3/4, 2/3 ); 
            vertices[ 12 ].uv.setValues( 3/4, 1/3 );
            vertices[ 13 ].uv.setValues( 0/4, 1/3 );

        }

        vertices.update();
        
        // 4/4 connection face ( center of cross )
        mesh.createFace( 4, 5, 6, 7 );

        // upper short arm
        mesh.createFace( 1, 0, 7, 6 );

        // left and right short arm
        mesh.createFace( 3, 2, 5, 4 );
        mesh.createFace( 6, 5, 12, 11 );

        // base of long arm
        mesh.createFace( 4, 7, 10, 13 );
        // tip of long arm
        mesh.createFace( 9, 8, 11, 12 );
        
        mesh.mergeVertices( 0, 10, 8 );
        mesh.mergeVertices( 1, 11 );
        mesh.mergeVertices( 2, 12 );
        mesh.mergeVertices( 3, 13, 9 );


        return mesh;
    }
    
    def.Properties( createCube, {
        options : {
            usage : gl.STATIC_DRAW,
            preallocateVertices : 0,
            colorFn : function colorFn ( view ) {
                view.setValues(
                    Math.random() * .5 + .25,
                    Math.random() * .5 + .25,
                    Math.random() * .5 + .25,
                    1
                );
            },
            structure : {
                position    : new Float32Array( 3 ),
                color       : new Float32Array( 4 ),
                normal      : new Float32Array( 3 ),
                uv          : new Float32Array( 2 )
            }
        }
    });

    return createCube;
});

/*
        if ( position ) {
            for ( let i = 0; i < vertices.length; i++ ) {
                vertices[ i ].position[ 0 ] = ( i / 4 ) % 2 < 1 ? x1 : x2;
                vertices[ i ].position[ 1 ] = ( i / 2 ) % 2 < 1 ? y1 : y2;
                vertices[ i ].position[ 2 ] = ( i / 1 ) % 2 < 1 ? z1 : z2;
            }
        }
        

        if ( normal ) {
            let n1 = new vec3( x1, y1, z1 ).normalize();
            let n2 = new vec3( x2, y2, z2 ).normalize();
            
            for ( let i = 0; i < vertices.length; i++ ) {
                vertices[ i ].normal[_x_] = ( i / 4 ) % 2 < 1 ? n1[_x_] : n2[_x_];
                vertices[ i ].normal[_y_] = ( i / 2 ) % 2 < 1 ? n1[_y_] : n2[_y_];
                vertices[ i ].normal[_z_] = ( i / 1 ) % 2 < 1 ? n1[_z_] : n2[_z_];
            }
        }
        */
        /*
        if ( position ) {
            let offset = position.offset / view.BYTES_PER_ELEMENT;
            let i = offset;
            view[ i                        ] = x1; view[ ++i ] = y1; view[ ++i ] = z1;
            view[ i =  1 * stride + offset ] = x1; view[ ++i ] = y2; view[ ++i ] = z1;
            view[ i =  2 * stride + offset ] = x1; view[ ++i ] = y2; view[ ++i ] = z2;
            view[ i =  3 * stride + offset ] = x1; view[ ++i ] = y1; view[ ++i ] = z2;
            
            view[ i =  4 * stride + offset ] = x2; view[ ++i ] = y1; view[ ++i ] = z2;
            view[ i =  5 * stride + offset ] = x2; view[ ++i ] = y2; view[ ++i ] = z2;
            view[ i =  6 * stride + offset ] = x2; view[ ++i ] = y2; view[ ++i ] = z1;
            view[ i =  7 * stride + offset ] = x2; view[ ++i ] = y1; view[ ++i ] = z1;
        }
        if ( color ) {
            let offset = color.offset / view.BYTES_PER_ELEMENT;
            let max = 7 * stride + offset + color.size;
            for ( let i = offset; i < max; i += stride ) {
                colorFn( view, i );
            }
        }
        if ( texCoord ) {
        }

        let n1 = new vec3( x1, y1, z1 ).normalize();
        let n2 = new vec3( x2, y2, z2 ).normalize();
        if ( normal ) {
            let offset = normal.offset / view.BYTES_PER_ELEMENT;
            let i = offset;

            view[ i                        ] = n1[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n1[ 2 ];
            view[ i =  1 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n1[ 2 ];
            view[ i =  2 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n2[ 2 ];
            view[ i =  3 * stride + offset ] = n1[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n2[ 2 ];
            view[ i =  4 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n2[ 2 ];
            view[ i =  5 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n2[ 2 ];
            view[ i =  6 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n2[ 1 ]; view[ ++i ] = n1[ 2 ];
            view[ i =  7 * stride + offset ] = n2[ 0 ]; view[ ++i ] = n1[ 1 ]; view[ ++i ] = n1[ 2 ];
        }
        */
/*
    let graph = new Graph().makeVerticesFromGeometry( geometry ).makeFacesFromIndexData(
        [ 2, 0, 3 ],
        [ 3, 0, 1 ],
        [ 5, 3, 7 ],
        [ 7, 3, 1 ],
        [ 6, 7, 0 ],
        [ 0, 7, 1 ],
        [ 4, 6, 2 ],
        [ 2, 6, 0 ],
        [ 4, 5, 6 ],
        [ 6, 5, 7 ],
        [ 4, 2, 5 ],
        [ 5, 2, 3 ]
    );
*/