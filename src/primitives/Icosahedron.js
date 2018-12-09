import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Icosahedron extends Mesh {
    constructor ( ) {
        super ( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        });

        let vertices = this.geometry.vertices;
        

        vertices.allocateItems( 12 ).createItems();

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


        this.createFace( 8, 4, 0 );

        this.createFace( 4, 5, 0 );
        this.createFace( 5, 11, 0 );

        this.createFace( 1, 8, 0 );
        this.createFace( 11, 1, 0 );

        this.createFace( 11, 6, 1 );
        this.createFace( 6, 7, 1 );
        this.createFace( 7, 8, 1 );

        this.createFace(  9, 8, 7 );
        this.createFace( 9, 7, 2 );
        this.createFace( 7, 6, 2 );
        this.createFace( 6, 10, 2 );
        this.createFace( 11, 10, 6 );

        this.createFace( 3, 2, 10 );
        this.createFace( 2, 3,  9 );

        this.createFace( 3, 10, 5 );
        this.createFace( 10, 11, 5 );

        this.createFace(  5, 4, 3 );

        this.createFace( 4, 9, 3 );
        this.createFace( 4, 8, 9 );


        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        vertices.allocateTarget();
    }

}