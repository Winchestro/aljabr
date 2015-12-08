define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";
    
    class StencilTest {
        enable ( ) {
            this.enabled = true;
            StencilTest.enable();
            return this;
        }
        disable ( ) {
            this.enabled = false;
            StencilTest.disable();
            return this;
        }
        setFunc ( func, ref, mask ) {
            this.frontFuncSet = true;
            this.backFuncSet = true;
            if ( func !== undefined ) this.func = func;
            if ( ref !== undefined ) this.ref = ref;
            if ( mask !== undefined ) this.mask = mask;
            StencilTest.setFunc( this.func, this.ref, this.mask );
            return this;
        }
        setFrontFunc ( func, ref, mask ) {
            this.frontFuncSet = true;
            if ( func !== undefined ) this.frontFunc = func;
            if ( ref !== undefined ) this.frontRef = ref;
            if ( mask !== undefined ) this.frontMask = mask;
            StencilTest.setFrontFunc( this.frontFunc, this.frontRef, this.frontMask );
            return this;
        }
        setBackFunc ( func, ref, mask ) {
            this.backFuncSet = true;
            if ( func !== undefined ) this.backFunc = func;
            if ( ref !== undefined ) this.backRef = ref;
            if ( mask !== undefined ) this.backMask = mask;
            StencilTest.setBackFunc( this.backFunc, this.backRef, this.backMask );
            return this;
        }
        unsetFunc ( ) {
            this.frontFuncSet = false;
            this.backFuncSet = false;
            StencilTest.unsetFunc();
            return this;
        }
        setWriteMask ( mask ) {
            this.frontMaskSet = true;
            this.backMaskSet = true;
            if ( mask !== undefined ) this.writeMask = mask;
            StencilTest.setWriteMask( this.writeMask );
            return this;
        }
        setFrontWriteMask ( mask ) {
            this.frontMaskSet = true;
            if ( mask !== undefined ) this.frontWriteMask = mask;
            StencilTest.setFrontWriteMask( this.frontWriteMask );
            return this;
        }
        setBackWriteMask ( mask ) {
            this.backWriteMaskSet = true;
            if ( mask !== undefined ) this.backWriteMask = mask;
            StencilTest.setBackWriteMask( this.backWriteMask );
            return this;
        }
        unsetWriteMask ( ) {
            this.frontMaskSet = false;
            this.backMaskSet = false;
            StencilTest.unsetWriteMask();
            return this;
        }
        setOp ( stencilFail, depthFail, depthPass ) {
            this.frontOpSet = true;
            this.backOpSet = true;
            if ( stencilFail !== undefined ) this.stencilFail = stencilFail;
            if ( depthFail !== undefined ) this.depthFail = depthFail;
            if ( depthPass !== undefined ) this.depthPass = depthPass;
            StencilTest.setOp( this.stencilFail, this.depthFail, this.depthPass );
            return this;
        }
        setFrontOp ( stencilFail, depthFail, depthPass ) {
            this.frontOpSet = true;
            if ( stencilFail !== undefined ) this.frontStencilFail = stencilFail;
            if ( depthFail !== undefined ) this.frontDepthFail = depthFail;
            if ( depthPass !== undefined ) this.frontDepthPass = depthPass;
            StencilTest.setFrontOp( this.frontStencilFail, this.frontDepthFail, this.frontDepthPass );
            return this;
        }
        setBackOp ( stencilFail, depthFail, depthPass ) {
            this.backOpSet = true;
            if ( stencilFail !== undefined ) this.backStencilFail = stencilFail;
            if ( depthFail !== undefined ) this.backDepthFail = depthFail;
            if ( depthPass !== undefined ) this.backDepthPass = depthPass;
            StencilTest.setBackOp( this.backStencilFail, this.backDepthFail, this.backDepthPass );
            return this;
        }
        unsetOp ( ) {
            this.frontOpSet = false;
            this.backOpSet = false;
            StencilTest.unsetOp();
            return this;
        }
        static enable ( ) {
            if ( !StencilTest.enabled ) {
                StencilTest.enabled = true;
                gl.enable( gl.STENCIL_TEST );
            }
            return StencilTest;
        }
        static disable ( ) {
            if ( StencilTest.enabled ) {
                StencilTest.enabled = false;
                gl.disable( gl.STENCIL_TEST );
            }
            return StencilTest;
        }
        static setFunc ( func, ref, mask ) {
            if ( func === undefined ) func = StencilTest.func;
            if ( ref === undefined ) ref = StencilTest.ref;
            if ( mask === undefined ) mask = StencilTest.valueMask;

            StencilTest.frontFuncSet = true;
            StencilTest.backFuncSet = true;
            gl.stencilFunc(
                func,
                ref,
                mask
            );
            return StencilTest;
        }
        static setFrontFunc ( func, ref, mask ) {
            if ( func === undefined ) func = StencilTest.frontFunc;
            if ( ref === undefined ) ref = StencilTest.frontRef;
            if ( mask === undefined ) mask = StencilTest.frontValueMask;

            StencilTest.frontFuncSet = true;
            gl.stencilFuncSeparate(
                // GLenum FRONT | BACK |FRONT_AND_BACK
                gl.FRONT,
                // GLenum NEVER | LESS | LEQUAL | GREATER | GEQUAL | EQUAL | NOTEQUAL | ALWAYS
                func,
                // GLint
                ref,
                // GLuint
                mask
            );
            return StencilTest;
        }
        static setBackFunc( func, ref, mask ) {
            if ( func === undefined ) func = StencilTest.backFunc;
            if ( ref === undefined ) ref = StencilTest.backRef;
            if ( mask === undefined ) mask = StencilTest.backValueMask;

            StencilTest.backFuncSet = true;
            gl.stencilFuncSeparate(
                gl.BACK,
                func,
                ref,
                mask
            );
            return StencilTest;
        }
        static unsetFunc ( ) {
            if ( StencilTest.frontFuncSet || StencilTest.backFuncSet ) {
                StencilTest.frontFuncSet = false;
                StencilTest.backFuncSet = false;
                gl.stencilFunc(
                    StencilTest.func,
                    StencilTest.ref,
                    StencilTest.valueMask
                );
            }
            return StencilTest;
        }
        static setWriteMask ( mask ) {
            if ( mask === undefined ) mask = StencilTest.writeMask;

            StencilTest.frontMaskSet = true;
            StencilTest.backMaskSet = true;
            gl.stencilMask( 
                // GLuint
                mask 
            );
            return StencilTest;
        }
        static setFrontWriteMask ( mask ) {
            if ( mask === undefined ) mask = StencilTest.frontWriteMask;

            StencilTest.frontMaskSet = true;
            gl.stencilMaskSeparate(
                // GLenum FRONT | BACK |FRONT_AND_BACK
                gl.FRONT, 
                // GLuint
                mask 
            );
            return StencilTest;
        }
        static setBackWriteMask ( mask ) {
            if ( mask === undefined ) mask = StencilTest.backWriteMask;

            StencilTest.backMaskSet = true;
            gl.stencilMaskSeparate(
                // GLenum FRONT | BACK |FRONT_AND_BACK
                gl.FRONT, 
                // GLuint
                mask 
            );
            return StencilTest;
        }
        static unsetWriteMask ( ) {
            if ( StencilTest.frontMaskSet || StencilTest.backMaskSet ) {
                StencilTest.frontMaskSet = false;
                StencilTest.backMaskSet = false;
                gl.stencilMask(
                    StencilTest.writeMask
                );
            }
            return StencilTest;
        }
        static setOp ( stencilFail, depthFail, depthPass ) {
            if ( stencilFail === undefined ) stencilFail = StencilTest.stencilFail;
            if ( depthFail === undefined ) depthFail = StencilTest.depthFail;
            if ( depthPass === undefined ) depthPass = StencilTest.depthPass

            StencilTest.frontOpSet = true;
            StencilTest.backOpSet = true;
            gl.stencilOp(
                /*GLenum 
                    KEEP : Keeps current value
                    ZERO : Sets the stencil buffer value to 0
                    REPLACE : Sets the stencil buffer to ref, as specified in stencilFunc
                    INCR : Increments the current stencil buffer value. Clamps to the maximum representable unsigned value.
                    INCR_WRAP : Incremenets the current stencil buffer value. Wraps stencil buffer value to zero when incrementing the maximum representable value.
                    DECR : Decrements the current stencil buffer value. Clamps to 0.
                    DECR_WRAP : Decrements the current stencil buffer value. Wraps stencil buffer value to the maximum representable unsigned value when decrementing a stencil buffer value of zero.
                    INVERT : Bitwise inverts the current stencil buffer value.
                */
                stencilFail,
                // GLenum same
                depthFail,
                // GLenum same
                depthPass
            );
            return StencilTest;
        }
        static setFrontOp ( stencilFail, depthFail, depthPass ) {
            if ( stencilFail === undefined ) stencilFail = StencilTest.frontStencilFail;
            if ( depthFail === undefined ) depthFail = StencilTest.frontDepthFail;
            if ( depthPass === undefined ) depthPass = StencilTest.frontDepthPass

            StencilTest.frontOpSet = true;
            gl.stencilOpSeparate(
                // GLenum FRONT | BACK |FRONT_AND_BACK
                gl.FRONT,
                // GLenum KEEP | ZERO | REPLACE | INCR |INCR_WRAP | DECR | DECR_WRAP | INVERT
                stencilFail,
                // GLenum same
                depthFail,
                // GLenum same
                depthPass
            );
            return StencilTest;
        }
        static setBackOp ( stencilFail, depthFail, depthPass ) {
            if ( stencilFail === undefined ) stencilFail = StencilTest.backStencilFail;
            if ( depthFail === undefined ) depthFail = StencilTest.backDepthFail;
            if ( depthPass === undefined ) depthPass = StencilTest.backDepthPass;

            StencilTest.backOpSet = true;
            gl.stencilOpSeparate(
                // GLenum FRONT | BACK |FRONT_AND_BACK
                gl.BACK,
                // GLenum KEEP | ZERO | REPLACE | INCR |INCR_WRAP | DECR | DECR_WRAP | INVERT
                stencilFail,
                // GLenum same
                depthFail,
                // GLenum same
                depthPass
            );
            return StencilTest;
        }
        static unsetOp ( ) {
            if ( StencilTest.frontOpSet || StencilTest.backOpSet ) {
                StencilTest.frontOpSet = false;
                StencilTest.backOpSet = false;
                gl.stencilOp(
                    StencilTest.fail,
                    StencilTest.depthFail,
                    StencilTest.depthPass
                );
            }
            return StencilTest;
        }

        get getEnabled()                    { return gl.getParameter( gl.STENCIL_TEST );}
        
        get getBits()                       { return gl.getParameter( gl.STENCIL_BITS );}

        get getFrontFunc()                  { return gl.getParameter( gl.STENCIL_FUNC );}
        get getFrontRef()                   { return gl.getParameter( gl.STENCIL_REF );}
        get getFrontFail()                  { return gl.getParameter( gl.STENCIL_FAIL );}
        get getFrontPassDepthPass()         { return gl.getParameter( gl.STENCIL_PASS_DEPTH_PASS );}
        get getFrontPassDepthFail()         { return gl.getParameter( gl.STENCIL_PASS_DEPTH_FAIL );}
        get getFrontValueMask()             { return gl.getParameter( gl.STENCIL_VALUE_MASK );}
        get getFrontWriteMask()             { return gl.getParameter( gl.STENCIL_WRITEMASK );}
        
        get getBackFunc()                   { return gl.getParameter( gl.STENCIL_BACK_FUNC );}
        get getBackRef()                    { return gl.getParameter( gl.STENCIL_BACK_REF );}
        get getBackFail()                   { return gl.getParameter( gl.STENCIL_BACK_FAIL );}
        get getBackPassDepthPass()          { return gl.getParameter( gl.STENCIL_BACK_PASS_DEPTH_PASS );}
        get getBackPassDepthFail()          { return gl.getParameter( gl.STENCIL_BACK_PASS_DEPTH_FAIL );}
        get getBackValueMask()              { return gl.getParameter( gl.STENCIL_BACK_VALUE_MASK );}
        get getBackWriteMask()              { return gl.getParameter( gl.STENCIL_BACK_WRITEMASK );}

        get getFrontFuncString()            { return gl.strings[ this.getFrontFunc ];}
        get getFrontFailString()            { return gl.strings[ this.getFrontFail ];}
        get getFrontPassDepthPassString()   { return gl.strings[ this.getFrontPassDepthPass ];}
        get getFrontPassDepthFailString()   { return gl.strings[ this.getFrontPassDepthFail ];}
        
        get getBackFuncString()             { return gl.strings[ this.getBackFunc ];}
        get getBackFailString()             { return gl.strings[ this.getBackFail ];}
        get getBackPassDepthPassString()    { return gl.strings[ this.getBackPassDepthPass ];}
        get getBackPassDepthFailString()    { return gl.strings[ this.getBackPassDepthFail ];}
    }

    def.Properties( StencilTest, {
        enabled         : false,

        frontFuncSet    : false,
        frontOpSet      : false,
        frontMaskSet    : false,

        backFuncSet     : false,
        backOpSet       : false,
        backMaskSet     : false,

        func            : gl.ALWAYS,
        ref             : 0,
        valueMask       : ( 1 << 16 ) - 1,
        writeMask       : ( 1 << 16 ) - 1,
        stencilFail     : gl.KEEP,
        depthFail       : gl.KEEP,
        depthPass       : gl.KEEP,


        frontFunc       : gl.ALWAYS,
        frontRef        : 0,
        frontValueMask  : ( 1 << 16 ) - 1,
        frontWriteMask  : ( 1 << 16 ) - 1,
        frontStencilFail: gl.KEEP,
        frontDepthFail  : gl.KEEP,
        frontDepthPass  : gl.KEEP,
        
        backFunc        : gl.ALWAYS,
        backRef         : 0,
        backValueMask   : ( 1 << 16 ) - 1,
        backWriteMask   : ( 1 << 16 ) - 1,
        backStencilFail : gl.KEEP,
        backDepthFail   : gl.KEEP,
        backDepthPass   : gl.KEEP,
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    def.Properties( StencilTest, {
        FN_NEVER        : gl.NEVER,
        FN_LESS         : gl.LESS,
        FN_LEQUAL       : gl.LEQUAL,
        FN_GREATER      : gl.GREATER,
        FN_GEQUAL       : gl.GEQUAL,
        FN_EQAUL        : gl.EQUAL,
        FN_NOTEQUAL     : gl.NOTEQUAL,
        FN_ALWAYS       : gl.ALWAYS,
        OP_KEEP         : gl.KEEP,
        OP_ZERO         : gl.ZERO,
        OP_REPLACE      : gl.REPLACE,
        OP_INCR         : gl.INCR,
        OP_INCR_WRAP    : gl.INCR_WRAP,
        OP_DECR         : gl.DECR,
        OP_DECR_WRAP    : gl.DECR_WRAP,
        OP_INVERT       : gl.INVERT
    }, def.ENUMERABLE );

    return StencilTest;
});