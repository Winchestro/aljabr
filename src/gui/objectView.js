define( [
    "../utilities/PropertyDescriptors",
    "../gui/dom",
    "../gui/propertyEntry",
    "../gui/numberView",
    "../gui/stringView",
    "../gui/booleanView"
], function module(
    def,
    dom,
    PropertyEntry,
    NumberView,
    StringView,
    BooleanView
) {
    "use strict";

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
                background : rgba( 0,0,0, 0.15 );
            }
             #${ PROPERTY_LIST_ID }.${ CLASS_COLLAPSED } {
                display : none;
            }
            #${ PROPERTY_LIST_ID }::before ) {
                content : "...";
            }

            #${ PROPERTY_LIST_ID } > ${ PropertyEntry.name } {
                display : block;
             
                color : #FFF;
            }
            #${ PROPERTY_LIST_ID } > ${ PropertyEntry.name }.enumerable {
                
            }

            #${ PROPERTY_LIST_ID } ${ PropertyEntry.name }.writable {
                font-style : bold;
            }
            #${ PROPERTY_LIST_ID } ${ PropertyEntry.name }.configurable {
                list-style-type : disc;
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
            def.Properties( this, {
                observer : this.observer.bind( this )
            });
        },

        attachedCallback ( ) {
            this.expandToggle.addEventListener( "click", this );
            
        },
        detachedCallback ( ) {
            this.expandToggle.removeEventListener( "click", this );
            
            if ( this.isObserving ) this.disableObserver();
        },

        toggleCollapsed ( ) {

            if ( !this.hasExpansion ) this.createExpansion();

            this.propertyList.classList.toggle( CLASS_COLLAPSED );
            this.toggleObserver();
            this.isExpanded = !this.isExpanded;
            return this;
        },

        toggleObserver ( ) {
            if ( this.isObserving ) this.disableObserver();
            else this.enableObserver();

            return this;
        },
        disableObserver ( ) {
            Object.unobserve( this.target, this.observer );
            this.isObserving = false;
            return this;
        },
        enableObserver ( ) {
            Object.observe( this.target, this.observer );
            this.isObserving = true;
            return this;
        },


        observer ( changes ) {

            for ( let change of changes ) {

                let name = change.name;

                let object = change.object;
                let type = change.type;
                let handler = type + "PropertyCallback";
                let oldValue = change.oldValue;
                let newValue = object[ name ];
                
                if ( this[ handler ] !== undefined ) this[ handler ]( name, newValue, oldValue );

            }
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

        setValue ( object ) {
            let wasObserving;

            if ( this.isObserving ) {
                wasObserving = true;
                this.disableObserver();
            }

            this.target = object;
            this.title.textContent = object.constructor.name;
            
            if ( this.hasExpansion ) this.createExpansion();
            if ( wasObserving ) {
                this.enableObserver();
            }
            

            return this;
        },

        handleEvent ( event ) {
            switch ( event.type ) {
                case "click" : {
                    this.toggleCollapsed();
                } break;
                case "change" : {
                    let notifier = Object.getNotifier( this.target );
                    let name = event.detail.name;
                    let value = event.detail.value;
                    let target = this.target;

                    notifier.performChange( "update", function ( ) {
                        target[ name ] = value;
                    });

                    
                }
            }
            
        },

        updatePropertyCallback ( name, newValue, oldValue ) {
            
            let view = this.getPropertyView( name ).propertyView;

            view.setValue( newValue );
        },
        addPropertyCallback ( name, newValue, oldValue ) {
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
        deletePropertyCallback( name, newValue, oldValue ) {
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

    def.Properties( ObjectView, {
        registerClassView ( className, element ) {
            def.Property( ObjectView.prototype.views, className, element, def.CONFIGURABLE );
        },
        createValueEntry( value ) {
            if ( value === undefined || value === null ) return null;
            let view;
            switch ( typeof value ) {
                case "object" : {
                    
                    let Constructor = this.views[ value.constructor.name ];

                    if ( Constructor ) view = new Constructor;
                    else view = new ObjectView;
                } break;
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
                    
                }    
            }
            view.setValue( value );
            return view;
        },
        views : []
    }, def.CONFIGURABLE );
    
    return ObjectView;
});
