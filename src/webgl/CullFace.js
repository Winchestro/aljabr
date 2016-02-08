define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class CullFace {
        constructor ( mode, front ) {
            if ( mode !== undefined ) this.setMode( mode );
            if ( front !== undefined ) this.setFront( front );
        }
        enable ( ) {
            this.enabled = true;
            CullFace.enable();
            return this;
        }
        disable ( ) {
            this.enabled = false;
            CullFace.disable();
            return this;
        }
        setMode ( mode ) {
            this.modeSet = true;
            if ( mode !== undefined ) this.mode = mode;
            CullFace.setMode( this.mode );
            return this;
        }
        unsetMode ( ) {
            this.modeSet = false;
            CullFace.unsetMode();
            return this;
        }
        setFront ( front ) {
            this.frontSet = true;
            if ( front !== undefined ) this.front = front;
            CullFace.setFront( this.front );
            return this;
        }
        unsetFront ( ) {
            this.frontSet = false;
            CullFace.unsetFront();
            return this;
        }
        static enable ( ) {
            if ( !CullFace.enabled ) {
                CullFace.enabled = true;
                gl.enable( gl.CULL_FACE );
            }
            return CullFace;
        }
        static disable ( ) {
            if ( CullFace.enabled ) {
                CullFace.enabled = false;
                gl.disable( gl.CULL_FACE );
            }
            return CullFace;
        }
        static setMode ( mode ) {
            if ( mode === undefined ) mode = CullFace.mode;

            CullFace.modeSet = true;
            gl.cullFace( 
                //GLenum FRONT | BACK | FRONT_AND_BACK
                mode
            );
            return CullFace;
        }
        static unsetMode ( ) {
            if ( CullFace.modeSet ) {
                CullFace.modeSet = false;
                gl.cullFace(
                    CullFace.mode
                );
            }
            return CullFace;
        }
        static setFront ( front ) {
            if ( front === undefined ) front = CullFace.front;

            CullFace.frontSet = true;
            gl.frontFace( 
                //GLenum CW | CCW
                front
            ); 
            return CullFace; 
        }
        static unsetFront ( ) {
            if ( CullFace.fronSet ) {
                CullFace.frontSet = false;
                gl.frontFace(
                    CullFace.front
                );
            }
            return CullFace;
        }
        get getEnabled()        { return gl.getParameter( gl.CULL_FACE );}
        get getFront()          { return gl.getParameter( gl.FRONT_FACE );}
        get getMode()           { return gl.getParameter( gl.CULL_FACE_MODE );}
        get getFrontString()    { return gl.strings[ this.getFront ];}
        get getModeString()     { return gl.strings[ this.getMode ];}
    }

    def.Properties( CullFace, {
        enabled : false,
        modeSet : false,
        frontSet: false,
        mode    : gl.FRONT,
        front   : gl.CCW
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    def.Properties( CullFace, {
        MD_FRONT            : gl.FRONT,
        MD_BACK             : gl.BACK,
        MD_FRONT_AND_BACK   : gl.FRONT_AND_BACK,
        FR_CW               : gl.CW,
        FR_CCW              : gl.CCW
    }, def.ENUMERABLE );

    return CullFace;
});