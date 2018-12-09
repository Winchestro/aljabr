import def from "../utilities/PropertyDescriptors.js";
const NOT_IN_LIST = -1;

export default class PoolAllocator {
    constructor ( ) {
        def.Properties( this, {
            pool : [],
            length : 0
        }, def.WRITABLE | def.CONFIGURABLE );
    }

    createItems ( count ) {
        if ( count === undefined ) count = this.pool.length;
        while ( count-- ) this.createItem();
        return this;
    }
    
    createItem ( ) {
        let item = this.pool.pop();

        if ( item ) {
            //this.length++;
            this.push( item );
            //item.constructor.apply( item, arguments );
            return item;
        } else return NOT_IN_LIST;
    }
    returnItem ( item ) {
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

PoolAllocator.prototype[ Symbol.iterator ] = [][ Symbol.iterator ];

def.Properties( PoolAllocator.prototype, {
    length      : 0,
    splice      : [].splice,
    push        : [].push,
    pop         : [].pop,
    forEach     : [].forEach,
    indexOf     : [].indexOf,

    NOT_IN_LIST
});