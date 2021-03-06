import def from "../utilities/PropertyDescriptors.js";

export default class Renderable {
    constructor ( children ) {
        if ( children === undefined ) children = [];

        def.Property( this, "children", children, def.CONFIGURABLE );
    }
    update ( ) {
        
    }
    draw ( ) {
        
    }
    addChild ( name, child, index ) {
        if ( !child || !child.draw ) console.warn( "child added to Renderable null or lacking a draw method" );
        if ( index === undefined ) index = this.children.length;
        else {
            for ( let i = this.children.length; i > index; --i ) {
                
                this.children[ i ] = this.children[ i - 1 ];
            }
        }

        def.Property( this, name, child, def.CONFIGURABLE );

        this.children[ index ] = child;

        return this;
    }
    removeChild ( nameOrReferenceOrIndex ) {
        let child = null;
        let index = -1;

        if ( typeof nameOrReferenceOrIndex === "string" ) {
            child = this[ nameOrReferenceOrIndex ];
            index = this.children.indexOf( child );

            delete this[ nameOrReferenceOrIndex ];
        }
        else if ( isNaN( nameOrReferenceOrIndex ) ) {
            child = nameOrReferenceOrIndex;
            index = this.children.indexOf( child );   
        }
        else {
            index = nameOrReferenceOrIndex;
            child = this.children[ index ];
        }
        

        if ( child !== undefined && index !== undefined ) {
            for ( let i = index; i < this.children.length; i++ ) {
                this.children[ index ] = this.children[ index + 1 ];
            }
            this.children.pop();
        }

        return child;
    }
}