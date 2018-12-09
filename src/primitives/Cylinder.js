import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Cylinder extends Mesh {
    constructor ( xDivisions = 20, yDivisions = 20 ) {

        super( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        } );

        let vertices    = this.geometry.vertices;

        vertices.allocateItems( xDivisions * yDivisions ).createItems();

        
        let index       = 0;

        for ( let currentY = 0; currentY < yDivisions; currentY++ ) {
            

            let phi = currentY / yDivisions * -2 * Math.PI;
                let sinPhi = Math.sin( phi );
                let cosPhi = Math.cos( phi );

                let x = cosPhi;
                let y = sinPhi;


            for ( let currentX = 0; currentX < xDivisions; currentX++ ) {

                let z = ( currentX / ( xDivisions - 1 ) * 2 ) - 1;
                console.log( index );
                let vertex          = vertices[ index ];
                    let position    = vertex.position;
                    let color       = vertex.color;
                    let normal      = vertex.normal;
                    let uv          = vertex.uv;

                

                position.setValues( x, y, z );
                normal.setValues( x, y, 0 );
                
                if ( this.colorIterator !== null ) this.colorIterator( color, currentX / (xDivisions - 1 ), currentY / ( yDivisions - 1 ) );
                else this.color.setValues( 1, 1, 1, 1 );

             
                
                index++;
            }
        }

        vertices.allocateTarget();

        let pole = new Array( yDivisions  );

        for ( let y = 0; y < yDivisions; y++ ) {
            pole[ y ] = y * xDivisions;
        }
        this.createFace.apply( this, pole );

        let max = yDivisions * xDivisions - 1;

        for ( let y = 0; y < yDivisions; y++ ) {
            
            pole[ y ] = max - y * xDivisions;
        }

        this.createFace.apply( this, pole );
        
        for ( let y = 0; y < yDivisions; y++ ) {
            let thisCol = y * xDivisions;
            let nextCol = ( ( y + 1 ) % yDivisions ) * xDivisions;

            for ( let x = 0; x < xDivisions - 1; x++ ) {
                let thisRow = x;
                let nextRow = x + 1;
                this.createFace(
                    thisCol + thisRow,
                    thisCol + nextRow,
                    nextCol + nextRow,
                    nextCol + thisRow
                );
            }
        }
       

    }
}

def.Properties( Cylinder.prototype, {
    colorIterator : null
}, def.WRITABLE | def.CONFIGURABLE );
