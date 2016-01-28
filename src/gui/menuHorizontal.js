define( [
    "../utilities/PropertyDescriptors",
    "../gui/dom"
], function module(
    def,
    dom
) {
    "use strict";

    let prototype = Object.create( HTMLElement.prototype );

    let template = `
        <style>
            :host {
                color : #FFF;
                margin : 4px;
                display : flex;
                flex-direction : column;
            }
        </style>
        <content></content>
    `;

    def.Properties( prototype, {
        createdCallback ( ) {
            let shadowRoot = this.createShadowRoot();
            shadowRoot.innerHTML = template;
        },

        attachedCallback ( ) {

        },

        detachedCallback ( ) {

        },
        attributeChangedCallback ( name, oldValue, newValue ) {
            switch ( name ) {

            }
        }
    }, def.CONFIGURABLE );

    return document.registerElement( "menu-horizontal", {
        prototype
    });
});
