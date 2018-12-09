import def from "../utilities/PropertyDescriptors.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import vec3 from "../math/vec3.js";
import mat4 from "../math/mat4.js";

export default class Sphere extends Mesh {
    constructor ( longitudeDivisions = 10, latitudeDivisions = 10, radius = 1, centerX = 0, centerY = 0 ) {
        super ( new Geometry, {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4
        });

        let vertices = this.geometry.vertices;

        vertices.allocateItems( longitudeDivisions * latitudeDivisions ).createItems();

        const PI = Math.PI;
        const sin = Math.sin;
        const cos = Math.cos;

        let index = 0;


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

                position.setValues( x, y, z );
                this.colorIterator( color, sinPhi, latitude / latitudeDivisions );
                normal.setValues( x, y, z );
                uv.setValues( 1.- longitude / longitudeDivisions, latitude / latitudeDivisions );
                index++;

            }
        }

        

        vertices.allocateTarget();

        let pole = new Array( longitudeDivisions  );

        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            pole[ longitude ] = longitude;
        }
        this.createFace.apply( this, pole );

        for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
            let max = longitudeDivisions * latitudeDivisions - 1;
            pole[ longitude ] = max - longitude;
        }
        //console.log( pole );
        this.createFace.apply( this, pole );
        
        for ( let latitude = 0; latitude < latitudeDivisions - 1; latitude++ ) {
            let thisRow = latitude * longitudeDivisions;
            let nextRow = ( latitude + 1 ) * longitudeDivisions;
            
            for ( let longitude = 0; longitude < longitudeDivisions; longitude++ ) {
                let thisCol = longitude;
                let nextCol = ( longitude + 1 ) % longitudeDivisions;

                this.createFace(
                    thisRow + nextCol,
                    thisRow + thisCol,
                    nextRow + thisCol,
                    nextRow + nextCol
                );
            }
        }
    }
}

def.Properties( Sphere.prototype, {
     colorIterator : null /*( color, lon, lat )*/
}, def.WRITABLE | def.CONFIGURABLE );