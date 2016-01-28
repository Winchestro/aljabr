define( [
    "../utilities/PropertyDescriptors"
], function module(
    def
) {
    "use strict";
    
    class KeyBindings {
        constructor ( bindings ) {
            window.addEventListener( "keydown", this );
            window.addEventListener( "keyup", this );
            window.addEventListener( "keytyped", this );

            for ( let binding in bindings ) {
                let bindingObject = new KeyBinding;
                for ( let property in bindings[ binding ] ) {
                    bindingObject[ property ] = bindings[ binding ][ property ];
                }
                this[ binding ] = bindingObject;
            }
        }
        handleEvent ( event ) {
            for ( let bindingName in this ) {
                let binding = this[ bindingName ];
                if (
                    binding.keyCode === event.keyCode &&
                    binding.shiftPressed === event.shiftPressed && 
                    binding.ctrlPressed === event.ctrlPressed &&
                    binding.metaPressed === event.metaPressed
                ) {
                    let handler = binding[ event.type ]( event );
                    if ( handler ) handler.call( this, event );
                }
            }
        }
    }

    class KeyBinding {
        constructor ( key, shiftPressed, ctrlPressed, metaPressed, keyDown, keyUp, keyTyped ) {

        }
    }

    def.Properties( KeyBinding.prototype, {
        keyCode : null,
        shiftPressed : null,
        ctrlPressed : null,
        metaPressed : null,
        keyDown : null,
        keyUp : null,
        keyTyped : null
    });

    return KeyBindings;
});
