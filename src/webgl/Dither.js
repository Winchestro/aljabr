import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

export default class Dither {
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