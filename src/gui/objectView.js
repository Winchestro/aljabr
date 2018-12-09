
import def from "../utilities/PropertyDescriptors.js";

import dom from "../gui/dom.js";

import PropertyEntry from "../gui/propertyEntry.js";
import NumberView from "../gui/numberView.js";
import StringView from "../gui/stringView.js";
import BooleanView from "../gui/booleanView.js";

const TITLE_ID = "title";
const EXPAND_TOGGLE_ID = "expandToggle";
const PROPERTY_LIST_ID = "propertyList";
const CLASS_COLLAPSED = "collapsed";

let prototype = Object.create( HTMLElement.prototype );

let template = `
    <style>
        :host {

        }
       
        #${ EXPAND_TOGGLE_ID } {
            font : inherit;
            background : none;
            border : inherit;
            color : inherit;
            outline : inherit;   
            cursor : pointer;
        }
        
        #${ EXPAND_TOGGLE_ID }:active {
            background : #AAA;
            color : black;   
            transition : 0.25s;
        }
        #${ PROPERTY_LIST_ID } {
            padding-left : 24px;
            margin : 0;
            list-style-type : circle;
            
        }
         #${ PROPERTY_LIST_ID }.${ CLASS_COLLAPSED } {
            display : none;
        }
        #${ PROPERTY_LIST_ID }::before ) {
            content : "...";
        }

       

    </style>
    <button id="${ EXPAND_TOGGLE_ID }">
        <span id="${ TITLE_ID }"></span> {
    </button>
    <ol id="${ PROPERTY_LIST_ID }" class="${ CLASS_COLLAPSED }">
    </ol>}
`;

def.Properties( prototype, {
    createdCallback ( ) {

        this.createShadowRoot().innerHTML = template;
        def.Property( this, "proxy", null, def.WRITABLE );
    },

    attachedCallback ( ) {
        this.expandToggle.addEventListener( "click", this );
        
    },
    detachedCallback ( ) {
        this.expandToggle.removeEventListener( "click", this );
        
        
    },

    toggleCollapsed ( ) {

        if ( !this.hasExpansion ) this.createExpansion();

        this.propertyList.classList.toggle( CLASS_COLLAPSED );
        this.isExpanded = !this.isExpanded;
        return this;
    },

   

    getPropertyView ( name ) {
        return this.shadowRoot.getElementById( name );
    },

    createExpansion ( ) {
        let properties  = Object.getOwnPropertyNames( this.target );

        if ( this.hasExpansion ) this.propertyList.innerHTML = "";

        for ( let property of properties ) this.addPropertyCallback( property, this.target[ property ] );

        this.hasExpansion = true;
        return this;
    },

    set ( target, propertyName, value, proxy ) {

        this.updatePropertyCallback( propertyName, value );
        target[ propertyName ] = value;
        return true;
    },

    setValue ( object, name = object.constructor.name ) {
       

        this.proxy = new Proxy( object, this );

        this.target = object;
        this.title.textContent = name;
        
        if ( this.hasExpansion ) this.createExpansion();
        

        return this;
    },

    handleEvent ( event ) {
        switch ( event.type ) {
            case "click" : {
                this.toggleCollapsed();
            } break;
            case "change" : {

                let proxy = this.proxy;
                let name = event.detail.name;
                let value = event.detail.value;
                let target = this.target;

                if ( name in proxy ) proxy[ name ] = value;
                
            }
        }
        
    },

    updatePropertyCallback ( name, newValue ) {
        console.log( name, newValue );
        let view = this.getPropertyView( name );

        if ( view ) view.setValue( newValue );
    },
    addPropertyCallback ( name, newValue ) {
        let view = ObjectView.createValueEntry( newValue );
        if ( view ) {
            let container       = this.propertyList;
            let descriptor      = Object.getOwnPropertyDescriptor( this.target, name );
            let propertyEntry   = new PropertyEntry;

            propertyEntry.propertyName = name;
            propertyEntry.id = name;
            let classList = propertyEntry.classList;
            if ( descriptor ) {
                if ( descriptor.enumerable )    classList.add( "enumerable" );
                if ( descriptor.writable )      classList.add( "writable" );
                if ( descriptor.configurable )  classList.add( "configurable" );
            }

            propertyEntry.addEventListener( "change", this );
            propertyEntry.propertyView = view;
            container.appendChild( propertyEntry );
        }
    },
    deletePropertyCallback( name, newValue ) {
        let view = this.shadowRoot.getElementById( name );

        if ( view ) {

            view.removeEventListener( "change", this );
            view.remove();
        }
    },
    attributeChangedCallback ( name, oldValue, newValue ) {

        switch ( name ) {

        }
    },

    

}, def.CONFIGURABLE );

def.Getters( prototype, {
    propertyList ( ) {
        return this.shadowRoot.getElementById( PROPERTY_LIST_ID );
    },
    title ( ) {
        return this.shadowRoot.getElementById( TITLE_ID );
    },
    expandToggle ( ) {
        return this.shadowRoot.getElementById( EXPAND_TOGGLE_ID );
    },
    
});

def.Properties( prototype, {
    target : null,
    isObserving : false,
    isExpanded : false,
    hasExpansion : false
}, def.ENUMERABLE | def.WRITABLE );


const ObjectView = document.registerElement( "object-view", {
    prototype
});

export default ObjectView;

def.Properties( ObjectView, {
    registerClassView ( className, element ) {
        def.Property( ObjectView.prototype.views, className, element, def.CONFIGURABLE );
    },
    createValueEntry( value ) {
        if ( value === undefined || value === null ) return null;
        let view;
        switch ( typeof value ) {
            
            case "boolean" : {
                view = new BooleanView;
            } break;
            case "number" : {
                view = new NumberView;
            } break;
            case "string" : {
                view = new StringView;
            } break;
            default : {
                let Constructor = this.views[ value.constructor.name ];

                if ( Constructor ) view = new Constructor;
                else view = new ObjectView;
            }    
        }
        view.setValue( value );
        return view;
    },
    views : []
}, def.CONFIGURABLE );