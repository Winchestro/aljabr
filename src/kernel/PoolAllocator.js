define ( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
    "use strict";
    const NOT_IN_LIST = -1;

    class PoolAllocator {
        constructor ( ) {
            def.Properties( this, {
                pool : [],
                length : 0
            }, def.WRITABLE | def.CONFIGURABLE );
        }
        
        createItem ( ) {
            let item = this.pool.pop();

            if ( item ) {
                this.length++;
                //item.constructor.apply( item, arguments );
                return item;
            } else return NOT_IN_LIST;
        }
        destroyItem ( item ) {
            let index = NOT_IN_LIST;

            if ( isNaN( item ) ) index = this.indexOf( item );
            else index = item; 
            
            
            if ( index !== NOT_IN_LIST ) {
                this.length--;
                let lastItem = this[ this.length - 1 ];

                this.pool.push( item );
                this[ index ] = lastItem;
                delete this[ this.length - 1 ];
                return this.length;
            } else return NOT_IN_LIST;
        }
    }

    def.Properties( PoolAllocator.prototype, {
        splice      : [].splice,
        push        : [].push,
        pop         : [].pop,
        forEach     : [].forEach,
        indexOf     : [].indexOf,
        NOT_IN_LIST
    });
    
    return PoolAllocator;
});