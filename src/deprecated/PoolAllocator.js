define( function module( ) {
    "use strict";

    class PoolAllocator extends Array {
        constructor ( ) {
            super();
            this.pool = [];
        }
        create ( ) {
            if ( this.pool.length ) {
                let item = this.pool.shift();
                item.constructor.apply( item, arguments );
                this.push( item );
                return item;
            } else return false;
        }
        release ( index ) {
            var lastItem = this.pop();

            this.pool.push( this[ index ] );

            this[ index ] = lastItem;
            
            return false;
        }
    }

    return PoolAllocator;
});