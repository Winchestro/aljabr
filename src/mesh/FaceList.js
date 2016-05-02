define ( [
    "../utilities/PropertyDescriptors",
    "../kernel/allocateUint",
    "../webgl/Context",
    "../kernel/PoolAllocator",
    "../mesh/Face",
    "../mesh/Element"
], function module (
    def,
    allocateUint,
    gl,
    PoolAllocator,
    Face,
    Element
){
    "use strict";

    class FaceList extends PoolAllocator {
        constructor ( ) {
            super();

            class ListFace extends Face {};
            def.Property( ListFace.prototype, "list", this );


            def.Properties( this, {
                selection : new Set,
                ListFace
            }, def.CONFIGURABLE );
            
            
            
            
        }
        createItem ( halfedge, length ) {
            
            if ( this.pool.length ) {
                let face = this.pool.pop();
                    face.halfedge = halfedge;
                    face.length = length;
                this.push( face );
                this.selection.add( face );
                return face;
            } else {
                let face = new this.ListFace( halfedge, length );
                this.selection.add( face );
                this.push( face );
                return face;
            }
        }
        createFromHalfedgeLoop( ) {
            let halfedges = arguments;
            let face = this.createItem( halfedges[ 0 ], halfedges.length );

            for ( let halfedge of halfedges ) halfedge.face = face;

            return face;
        }

        


        createElement ( material, uniforms, usage, buffer ) {
            return new Element( material, uniforms, gl.TRIANGLES ).allocateBuffer( this.getData( buffer ), usage );
        }
        updateElement( drawable ) {
            if ( this.length !== drawable.length ) drawable.allocateBuffer( this.getData() );
            else drawable.update( this.getData( drawable.data ) );
            return this;
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

    return FaceList;
});