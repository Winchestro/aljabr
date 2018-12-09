import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Cube extends Mesh {
    constructor ( x1 = 1, x2 = -x1, y1 = x1, y2 = x2, z1 = x1, z2 = x2 ) {

        super( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        } );
        

        let vertices    = this.geometry.vertices;

        const _x_ = 0;
        const _y_ = 1;
        const _z_ = 2;

        vertices.allocateItems( 14 ).createItems();

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

        // Vertex splitting test
        // 
        // May need a better alternative, right now I'm manually creating the duplicate vertices and "meging" them in the mesh.
        // So they can have different attributes, like UV or vertex colors but still count as the same vertex as far as connectivity is concerned.
        // So it only really makes a difference when iterating over the mesh, as far as the rendering is concerned those are entirely different vertices.
        // The result is the intended behavior, but the process would be more intuitive if it were the opposite - taking one vertex and splitting it into multiple.
        
        // 4/4 connection face ( center of cross )
        this.createFace( 4, 5, 6, 7 );

        // upper short arm
        this.createFace( 1, 0, 7, 6 );

        // left and right short arm
        this.createFace( 3, 2, 5, 4 );
        this.createFace( 6, 5, 12, 11 );

        // base of long arm
        this.createFace( 4, 7, 10, 13 );
        // tip of long arm
        this.createFace( 9, 8, 11, 12 );
        

        this.mergeVertices( 0, 10, 8 );
        this.mergeVertices( 1, 11 );
        this.mergeVertices( 2, 12 );
        this.mergeVertices( 3, 13, 9 );

        vertices.allocateTarget();
    }
}