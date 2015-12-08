define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class DepthTest {
        constructor ( write, func, zNear, zFar ) {
            if ( write ) this.enableWrite();
            if ( func !== undefined ) this.setFunc( func );
            if ( zNear !== undefined ) this.setRange( zNear, zFar );
        }
        enable ( ) {
            this.enabled = true;
            DepthTest.enable();
            return this;
        }
        disable ( ) {
            this.enabled = false;
            DepthTest.disable();
            return this;
        }
        enableWrite ( ) {
            this.writeEnabled = true;
            DepthTest.enableWrite();
            return this;
        }
        disableWrite ( ) {
            this.writeEnabled = false;
            DepthTest.disableWrite();
            return this;
        }
        setFunc ( func ) {
            this.funcSet = true;
            if ( func !== undefined ) this.func = func;
            DepthTest.setFunc( this.func );
            return this;
        }
        unsetFunc ( ) {
            this.funcSet = false;
            DepthTest.unsetFunc( );
            return this;
        }
        setRange ( zNear, zFar ) {
            this.rangeSet = true;
            if ( zNear !== undefined ) this.zNear = zNear;
            if ( zFar !== undefined ) this.zFar = zFar;
            DepthTest.setRange( this.zNear, this.zFar );
            return this;
        }
        unsetRange ( ) {
            this.rangeSet = false;
            DepthTest.unsetRange();
            return this;
        }
        static enable ( ) {
            if ( DepthTest.enabled === false ) {
                DepthTest.enabled = true;
                gl.enable( gl.DEPTH_TEST );
            }
            return DepthTest;
        }
        static disable ( ) {
            if ( DepthTest.enabled === true ) {
                DepthTest.enabled = false;
                gl.disable( gl.DEPTH_TEST );
            }
            return DepthTest;
        }
        static enableWrite ( ) {
            if ( DepthTest.writeEnabled === false ) {
                DepthTest.writeEnabled = true;
                gl.depthMask( true );
            }
            return DepthTest;
        }
        static disableWrite ( ) {
            if ( DepthTest.writeEnabled === true ) {
                DepthTest.writeEnabled = false;
                gl.depthMask( false );
            }
            return DepthTest;
        }
        static setFunc ( func ) {
            if ( func === undefined ) func = DepthTest.func;

            DepthTest.funcSet;
            gl.depthFunc(
                //GLenum NEVER | LESS | EQUAL | LEQUAL | GREATER | NOTEQUAL | GEEQUAL | ALWAYS
                func
            );
            return DepthTest;
        }
        static unsetFunc ( ) {
            if ( DepthTest.funcSet ) {
                DepthTest.funcSet = false;
                gl.depthFunc(
                    DepthTest.func
                );
            }
            return DepthTest;
        }
        static setRange ( zNear, zFar ) {
            if ( zNear === undefined ) zNear = DepthTest.zNear;
            if ( zFar === undefined ) zFar = DepthTest.zFar;
            DepthTest.rangeSet = true;
            gl.depthRange(
                //GLclampf
                zNear,
                //GLclampf
                zFar
            );
            return DepthTest;
        }
        static unsetRange ( ) {
            if ( DepthTest.rangeSet ) {
                DepthTest.rangeSet = false;
                gl.depthRange(
                    DepthTest.zNear,
                    DepthTest.zFar
                );
            }
            return DepthTest;
        }
        get getEnabled()        { return gl.getParameter( gl.DEPTH_TEST );}
        get getFunc()           { return gl.getParameter( gl.DEPTH_FUNC );}
        get getRange()          { return gl.getParameter( gl.DEPTH_RANGE );}
        get getWrite()          { return gl.getParameter( gl.DEPTH_WRITEMASK );}
        get getFuncString()     { return gl.strings[ this.getFunc ];}
    }

    def.Properties( DepthTest, {
        enabled         : false,
        writeEnabled    : false,
        funcSet         : false,
        rangeSet        : false,
        func            : gl.LESS,
        zNear           : 0,
        zFar            : 1,
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    def.Properties( DepthTest, {
        FN_NEVER        : gl.NEVER,
        FN_LESS         : gl.LESS,
        FN_EQUAL        : gl.EQUAL,
        FN_LEQUAL       : gl.LEQUAL,
        FN_GREATER      : gl.GREATER,
        FN_NOTEQUAL     : gl.NOTEQUAL,
        FN_GEQUAL       : gl.GEQUAL,
        FN_ALWAYS       : gl.ALWAYS
    }, def.ENUMERABLE );

    return DepthTest;
});