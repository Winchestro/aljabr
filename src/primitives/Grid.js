import def from "../utilities/PropertyDescriptors.js"
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js"
import mat4 from "../math/mat4.js";

export default class Grid extends Mesh {
    constructor ( xDivisions = 10, yDivisions = 10, x1 = 1, x2 = -x1 , y1 = x1, y2 = x2 ) {
        super ( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        });

        let vertices = this.geometry.vertices;
        let index = 0;
        const usingHeightIterator = this.heightIterator !== null;


        vertices.allocateItems( xDivisions * yDivisions ).createItems();


        for ( let xx = 0; xx < xDivisions; xx++ ) {
            for ( let yy = 0; yy < yDivisions; yy++ ) {
                let xAlpha = xx / ( xDivisions - 1 );
                let yAlpha = yy / ( yDivisions - 1 );
                let x = x1 + ( x2 - x1 ) * xAlpha;
                let y = y1 + ( y2 - y1 ) * yAlpha;
                let z = usingHeightIterator ? this.heightIterator( x, y ) : 0;

                let vertex = vertices[ index ];

                vertex.position.setValues( x, y, z );
                this.colorIterator( vertex.color, xAlpha, yAlpha, z );
                if ( !usingHeightIterator ) vertex.normal.setValues( 0, 0, 1 );
                vertex.uv.setValues(
                    xx / ( xDivisions - 1 ),
                    yy / ( yDivisions - 1 )
                );
                index++;
            }
        }
    

        let sub0 = new vec3;
        let sub1 = new vec3;

        for ( let x = 0; x < xDivisions - 1; x++ ) {
            let thisRow = x * yDivisions;
            let nextRow = ( x + 1 ) * yDivisions;
            for ( let y = 0; y < yDivisions - 1; y++ ) {
                let yWrap = ( y % ( yDivisions - 1 ) ) + 1;

                let i0 = thisRow + y;
                let i1 = nextRow + y;
                let i2 = nextRow + yWrap;
                let i3 = thisRow + yWrap;


                let face = this.createFace( i0, i1, i2, i3 );
                    
                if ( usingHeightIterator ) {
                    vec3.sub( sub0, vertices[ i0 ].position, vertices[ i1 ].position );
                    vec3.sub( sub1, vertices[ i2 ].position, vertices[ i0 ].position );

                    face.normal.cross( sub1, sub0 );
                } else {
                    face.normal.setValues( 0, 0, 1 );
                }
            }
        }


        if ( usingHeightIterator ) {
            let normal = new vec3;

            for ( let vertex of vertices ) {

                let count = 0;

                for ( let face of vertex.faces() ) {
                    if ( face.normal ) {
                        count++;
                        normal.add( face.normal );
                    }
                }  
                normal.divideScalar( count ).normalize();
                
                vertex.normal.set( normal );

                normal.setValues( 0,0,0 );

            }
        }
        vertices.allocateTarget();
    }
    colorIterator ( color, x, y, z ) {
        color.setValues( 1, 1, 1, 1 );
    }
    
}

def.Property( Grid.prototype, "heightIterator", null, def.WRITABLE | def.CONFIGURABLE );