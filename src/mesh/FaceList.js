import def from "../utilities/PropertyDescriptors.js";
import allocateUint from "../kernel/allocateUint.js";
import PoolAllocator from "../kernel/PoolAllocator.js";
import Face from "../mesh/Face.js";

export default class FaceList extends PoolAllocator {
    constructor ( ) {
        super();

    }
    createItem ( halfedge, length ) {
        
        if ( this.pool.length ) {
            let face = this.pool.pop();
                face.halfedge = halfedge;
                face.length = length;
            this.push( face );
           
            return face;
        } else {
            let face = new Face( halfedge, length );
           
            this.push( face );
            return face;
        }
    }
    createFromHalfedgeLoop( ...halfedges ) {
        
        let face = this.createItem( halfedges[ 0 ], halfedges.length );

        for ( let halfedge of halfedges ) halfedge.face = face;

        return face;
    }

    getData ( buffer ) {
        let totalLength = 0;
        for ( let index in this ) totalLength += ( this[ index ].length - 2 ) * 3;
        
        if ( buffer === undefined ) buffer = allocateUint( totalLength );


        let offset = 0;
        let length = this.length;
        for ( let face of this ) {
            
            let sides = face.length;
            let start =    face.halfedge.toIndex;
            let halfedge = face.halfedge.nextHalfedge;
            
            for ( let i = 0; i < sides - 2; i++ ) {
                let prev = halfedge.toIndex;
                halfedge = halfedge.nextHalfedge;
                let next = halfedge.toIndex;
                
                if ( i % 2 ) {
                    buffer[ offset++ ] = prev;
                    buffer[ offset++ ] = next;
                    buffer[ offset++ ] = start;
                } else {
                    buffer[ offset++ ] = start;
                    buffer[ offset++ ] = prev;
                    buffer[ offset++ ] = next;
                }
            }
        };

        return buffer;
    }
}