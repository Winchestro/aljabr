define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";
    
    class Dither {
        constructor( ) { 
        }
        enable ( ) {
            Dither.enable();
            this.enabled = true;
            return this;
        }
        disable ( ) {
            Dither.disable();
            this.enabled = false;
            return this;
        }
        static enable ( ) {
            if ( !Dither.enabled ) {
                Dither.enabled = true;
                gl.enable( gl.DITHER );
            }
            return Dither;
        }
        static disable ( ) {
            if ( Dither.enabled ) {
                Dither.enabled = false;
                gl.disable( gl.DITHER );
            }
            return Dither;
        }
        static get getEnabled ( ) { return gl.getParameter( gl.DITHER ); }
    }
    def.Properties( Dither, {
        enabled         : false,    
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    return Dither;
});