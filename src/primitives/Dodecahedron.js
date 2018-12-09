import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Dodecahedron extends Mesh {
    constructor ( radius = 1 ) {
        
        super( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        } );
        

        let vertices    = this.geometry.vertices;

        vertices.allocateItems( 20 ).createItems();

        let GOLDEN_RATIO = ( 1 + Math.sqrt( 5 ) ) / 2;
        let VERTEX_INSET = 1 / GOLDEN_RATIO;

        //https://en.wikipedia.org/wiki/Regular_dodecahedron#/media/File:Dodecahedron_vertices.png

        vertices[  0 ].position.setValues(  radius,  radius,  radius );
        vertices[  1 ].position.setValues( -radius,  radius,  radius );
        vertices[  2 ].position.setValues(  radius, -radius,  radius );
        vertices[  3 ].position.setValues(  radius,  radius, -radius );
        vertices[  4 ].position.setValues( -radius, -radius,  radius );
        vertices[  5 ].position.setValues( -radius,  radius, -radius );
        vertices[  6 ].position.setValues(  radius, -radius, -radius );
        vertices[  7 ].position.setValues( -radius, -radius, -radius );

        vertices[  8 ].position.setValues(  0,  GOLDEN_RATIO * radius,  VERTEX_INSET * radius );
        vertices[  9 ].position.setValues(  0, -GOLDEN_RATIO * radius,  VERTEX_INSET * radius );
        vertices[ 10 ].position.setValues(  0,  GOLDEN_RATIO * radius, -VERTEX_INSET * radius );        
        vertices[ 11 ].position.setValues(  0, -GOLDEN_RATIO * radius, -VERTEX_INSET * radius );

        vertices[ 12 ].position.setValues(   VERTEX_INSET * radius, 0,  GOLDEN_RATIO * radius );
        vertices[ 13 ].position.setValues(   VERTEX_INSET * radius, 0, -GOLDEN_RATIO * radius );
        vertices[ 14 ].position.setValues(  -VERTEX_INSET * radius, 0,  GOLDEN_RATIO * radius );        
        vertices[ 15 ].position.setValues(  -VERTEX_INSET * radius, 0, -GOLDEN_RATIO * radius );

        vertices[ 16 ].position.setValues(   GOLDEN_RATIO * radius,  VERTEX_INSET * radius, 0 );
        vertices[ 17 ].position.setValues(  -GOLDEN_RATIO * radius,  VERTEX_INSET * radius, 0 );
        vertices[ 18 ].position.setValues(   GOLDEN_RATIO * radius, -VERTEX_INSET * radius, 0 );        
        vertices[ 19 ].position.setValues(  -GOLDEN_RATIO * radius, -VERTEX_INSET * radius, 0 );

        for ( let i = 0; i < 20; i++ ) vertices[ i ].color.setValues( 1, 1, 1, 1 );

        /*
        vertices[  0 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  1 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  2 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  3 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  4 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  5 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  6 ].color.setValues(  1,  .5,  0, 1 );
        vertices[  7 ].color.setValues(  1,  .5,  0, 1 );

        vertices[  8 ].color.setValues(  0,  1,  0, 1 );
        vertices[  9 ].color.setValues(  0,  1,  0, 1 );
        vertices[ 10 ].color.setValues(  0,  1,  0, 1 );
        vertices[ 11 ].color.setValues(  0,  1,  0, 1 );

        vertices[ 12 ].color.setValues(  0,  0,  1, 1 );
        vertices[ 13 ].color.setValues(  0,  0,  1, 1 );
        vertices[ 14 ].color.setValues(  0,  0,  1, 1 );
        vertices[ 15 ].color.setValues(  0,  0,  1, 1 );

        vertices[ 16 ].color.setValues(  1,  0,  1, 1 );
        vertices[ 17 ].color.setValues(  1,  0,  1, 1 );
        vertices[ 18 ].color.setValues(  1,  0,  1, 1 );
        vertices[ 19 ].color.setValues(  1,  0,  1, 1 );
        */
        
        this.createFace( 0, 12, 2, 18, 16 );
        this.createFace( 0, 8, 1, 14, 12 );
        this.createFace( 0, 16, 3, 10, 8 );
        
        this.createFace( 8, 10, 5, 17, 1 );
        this.createFace( 12, 14, 4, 9, 2 );
        this.createFace( 1, 17, 19, 4, 14 );
        
        this.createFace( 2, 9, 11, 6, 18 );
        this.createFace( 4, 19, 7, 11, 9 );
        this.createFace( 17, 5, 15, 7, 19 );
       
        this.createFace( 11, 7, 15, 13, 6 );
        this.createFace( 10, 3, 13, 15, 5 );
        this.createFace( 18, 6, 13, 3, 16 );

        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        vertices.allocateTarget();
    }
}