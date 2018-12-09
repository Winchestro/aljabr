import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Tetrahedron extends Mesh {
    constructor ( ) {

        super( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        } );
        

        let vertices    = this.geometry.vertices;
        
        vertices.allocateItems( 4 ).createItems();

    
        vertices[ 0 ].position.setValues(  1,  1,  1 );
        vertices[ 1 ].position.setValues(  1, -1, -1 );
        vertices[ 2 ].position.setValues( -1,  1, -1 );
        vertices[ 3 ].position.setValues( -1, -1,  1 ); 
    

    
        vertices[ 0 ].normal.setValues(  1,  1,  1 );
        vertices[ 1 ].normal.setValues(  1, -1, -1 );
        vertices[ 2 ].normal.setValues( -1,  1, -1 );
        vertices[ 3 ].normal.setValues( -1, -1,  1 );   
    

    
        vertices[ 0 ].color.setValues(  1,  1,  1, 1 );
        vertices[ 1 ].color.setValues(  1,  0,  0, 1 );
        vertices[ 2 ].color.setValues(  0,  1,  0, 1 );
        vertices[ 3 ].color.setValues(  0,  0,  1, 1 );

    

        this.createFace( 0, 1, 2 );
        this.createFace( 1, 0, 3 );
        this.createFace( 2, 1, 3 );
        this.createFace( 3, 0, 2 );
        
        vertices.allocateTarget();
    }
}