import def from "../utilities/PropertyDescriptors.js";
import dom from "../gui/dom.js";
import MenuHorizontal from "../gui/menuHorizontal.js";
import MenuContext from "../gui/menuContext.js";
import ObjectView from "../gui/ObjectView.js";

let prototype = Object.create( HTMLElement.prototype );

const MENU_HORIZONTAL_ID = "menuHorizontal";
const MENU_VERTICAL_ID = "menuVertical";
const MENU_CONTEXT_ID = "menuContext";

let template = `
    <style>

        :host {
            color               : #FFF;
            font-family         : Consolas;
            font-size           : 14px;
            -webkit-user-select : none;
            cursor              : default;
            padding             : 0;
            margin              : 0;
            position            : absolute;

            overflow-y          : scroll;
            overflow-z          : break-word;
            display             : flex;
            flex-direction      : column;
            max-height          : 100%;
            direction           : rtl;
        }

        ${ MenuHorizontal.name } {
            direction           : ltr;
        }
        
    </style>
    <${ MenuHorizontal.name } id="${ MENU_HORIZONTAL_ID }"></${ MenuHorizontal.name }>
    <!--${ MenuContext.name } id="${ MENU_CONTEXT_ID }"></${ MenuContext.name }-->
    <content></content>
`;


def.Properties( prototype, {
    MenuHorizontal,
    MenuContext,
    ObjectView,
    createdCallback ( ) {
        let shadowRoot = this.createShadowRoot();
        shadowRoot.innerHTML = template;
        
    },


    attachedCallback ( ) {

    },

    detachedCallback ( ) {

    },

    inspect ( value ) {
        let view = ObjectView.createValueEntry( value );
        //view.setTargetExpanded( object );

        this.shadowRoot.getElementById( "menuHorizontal" ).appendChild( view );
    },


    toggleVisibility ( ) {

    },

    attributeChangedCallback ( name, oldValue, newValue ) {
        switch ( name ) {

        }
    },

}, def.CONFIGURABLE );

def.Getters( prototype, {
    menuHorizontal ( ) {
        return this.shadowRoot.getElementById( MENU_HORIZONTAL_ID );
    },
    menuVertical ( ) {
        return this.shadowRoot.getElementById( MENU_VERTICAL_ID );
    },
    menuContext ( ) {
        return this.shadowRoot.getElementById( MENU_CONTEXT_ID );
    }
}, def.CONFIGURABLE );



export default document.registerElement( "al-gui", {
    prototype
});