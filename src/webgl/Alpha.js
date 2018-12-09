import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

export default class Alpha {
    constructor ( rgbFunc, alphaFunc, equation, red, green, blue, alpha ) {
        if ( red !== undefined ) this.setColor( red, green, blue, alpha );
        if ( rgbFunc !== undefined ) this.setFunc( rgbFunc, alphaFunc, rgbFunc, alphaFunc );
        if ( equation !== undefined ) this.setEquation( equation );
    }
    enable ( ) {
        this.enabled = true;
        Alpha.enable();
        return this;
    }
    disable ( ) {
        this.enabled = false;
        Alpha.disable();
        return this;
    }
    setColor ( red, green, blue, alpha ) {
        this.colorSet = true;
        if ( red !== undefined ) this.red = red;
        if ( green !== undefined ) this.green = green;
        if ( blue !== undefined ) this.blue = blue;
        if ( alpha !== undefined ) this.alpha = alpha;
        Alpha.setColor( this.red, this.green, this.blue, this.alpha );
        return this;
    }
    unsetColor ( ) {
        this.colorSet = false;
        Alpha.unsetColor();
        return this;
    }
    setFunc ( srcRGB, dstRGB, srcAlpha, dstAlpha ) {
        this.funcSet = true;
        if ( srcRGB     !== undefined ) this.srcRGB     = srcRGB;
        if ( dstRGB     !== undefined ) this.dstRGB     = dstRGB;
        if ( srcAlpha   !== undefined ) this.srcAlpha   = srcAlpha;
        if ( dstAlpha   !== undefined ) this.dstAlpha   = dstAlpha;
        Alpha.setFunc( this.srcRGB, this.dstRGB, this.srcAlpha, this.dstAlpha );
        return this;
    }
    unsetFunc ( ) {
        this.funcSet = false;
        Alpha.unsetFunc();
        return this;
    }
    setEquation ( modeRGB, modeAlpha ) {
        this.equationSet = true;
        if ( modeRGB ) this.modeRGB = modeRGB;
        if ( modeAlpha ) this.modeAlpha = modeAlpha;
        Alpha.setEquation( this.modeRGB, this.modeAlpha );
        return this;
    }
    unsetEquation ( ) {
        this.equationSet = false;
        Alpha.unsetEquation;
        return this;
    }
    static enable ( ) {
        if ( !Alpha.enabled ) {
            Alpha.enabled = true;
            gl.enable( gl.BLEND );
        }
        return Alpha;
    }
    static disable ( ) {
        if ( Alpha.enabled ) {
            Alpha.enabled = false;
            gl.disable( gl.BLEND );
        }
        return Alpha;
    }
    static setColor ( red, green, blue, alpha ) {
        if ( red === undefined ) red = Alpha.colorRed;
        if ( green === undefined ) green = Alpha.colorGreen;
        if ( blue === undefined ) blue = Alpha.colorBlue;
        if ( alpha === undefined ) alpha = Alpha.colorAlpha;

        Alpha.colorSet = true;
        gl.blendColor(
            //GLclampf
            red,
            //GLclampf
            green,
            //GLclampf
            blue,
            //GLclampf
            alpha
        );
        return this; 
    }
    static unsetColor ( ) {
        if ( Alpha.colorSet ) {
            Alpha.colorSet = false;
            gl.blendColor(
                Alpha.colorRed,
                Alpha.colorGreen,
                Alpha.colorBlue,
                Alpha.colorAlpha 
            );
        }
        return Alpha;
    }
    static setFunc ( srcRGB, dstRGB, srcAlpha, dstAlpha ) {
        if ( srcRGB === undefined ) srcRGB = Alpha.srcRGB;
        if ( dstRGB === undefined ) dstRGB = Alpha.dstRGB;
        if ( srcAlpha === undefined ) srcAlpha = Alpha.srcAlpha;
        if ( dstAlpha === undefined ) dstAlpha = Alpha.dstAlpha;

        Alpha.funcSet = true;
        //  all combos of [ ONE_MINUS ?] _ [ SRC | DST | CONSTANT ] _ [ COLOR | ALPHA ]
        gl.blendFuncSeparate(
            //GLenum ZERO | ONE | SRC_ALPHA_SATURATE + combos
            srcRGB,
            //GLenum ZERO | ONE + combos
            dstRGB,
            //GLenum accepts same as srcRGB
            srcAlpha,
            //GLenum accepts same as dstRGB
            dstAlpha
        );
        return Alpha;
    }
    static unsetFunc ( ) {
        if ( Alpha.funcSet ) {
            Alpha.funcSet = false;
            gl.blendFuncSeparate(
                Alpha.srcRGB,
                Alpha.dstRGB,
                Alpha.srcAlpha,
                Alpha.dstAlpha
            );
        }
        return Alpha;
    }
    static setEquation ( modeRGB, modeAlpha ) {
        if ( modeRGB === undefined ) modeRGB = Alpha.modeRGB;
        if ( modeAlpha === undefined ) modeAlpha = Alpha.modeAlpha;

        Alpha.equationSet = true;
        gl.blendEquationSeparate(
            //GLenum FUNC_ADD | FUNC_SUBTRACT | FUNC_REVERSE_SUBTRACT
            modeRGB,
            //GLenum same
            modeAlpha
        );
        return Alpha;
    }
    static unsetEquation ( ) {
        if ( Alpha.equationSet ) {
            Alpha.equationSet = false;
            gl.blendEquationSeparate(
                Alpha.modeRGB,
                Alpha.modeAlpha
            );
        }
        return this;
    }

    get getEnabled()                { return gl.getParameter( gl.BLEND );}
    get getColor()                  { return gl.getParameter( gl.BLEND_COLOR );}

    get getSrcRGB()                 { return gl.getParameter( gl.BLEND_SRC_RGB );}
    get getSrcAlpha()               { return gl.getParameter( gl.BLEND_SRC_ALPHA );}
    get getDstRGB()                 { return gl.getParameter( gl.BLEND_DST_RGB );}
    get getDstAlpha()               { return gl.getParameter( gl.BLEND_DST_ALPHA );}
    get getEquationRGB()            { return gl.getParameter( gl.BLEND_EQUATION_RGB );}
    get getEquationAlpha()          { return gl.getParameter( gl.BLEND_EQUATION_ALPHA );}

    get getSrcRGBString()           { return gl.strings[ this.getSrcRGB ];}
    get getSrcAlphaString()         { return gl.strings[ this.getSrcAlpha ];}
    get getDstRGBString()           { return gl.strings[ this.getDstRGB ];}
    get getDstAlphaString()         { return gl.strings[ this.getDstAlpha ];}
    get getEquationRGBString()      { return gl.strings[ this.getEquationRGB ];}
    get getEquationAlphaString()    { return gl.strings[ this.getEquationAlpha ];}
}

def.Properties( Alpha, {
    enabled     : false,
    colorSet    : false,
    funcSet     : false,
    equationSet : false,
    colorRed    : 0,
    colorGreen  : 0,
    colorBlue   : 0,
    colorAlpha  : 1,
    modeRGB     : gl.FUNC_ADD,
    modeAlpha   : gl.FUNC_ADD,
    srcRGB      : gl.ONE,
    srcAlpha    : gl.ONE,
    dstRGB      : gl.ZERO,
    dstAlpha    : gl.ZERO
}, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

def.Properties( Alpha, {
    EQ_ADD                      : gl.FUNC_ADD,
    EQ_SUBTRACT                 : gl.FUNC_SUBTRACT,
    EQ_REVERSE_SUBTRACT         : gl.FUNC_REVERSE_SUBTRACT,
    FN_ZERO                     : gl.ZERO,
    FN_ONE                      : gl.ONE,
    FN_SRC_COLOR                : gl.SRC_COLOR,
    FN_DST_COLOR                : gl.DST_COLOR,
    FN_SRC_ALPHA                : gl.SRC_ALPHA,
    FN_DST_ALPHA                : gl.DST_ALPHA,
    FN_CONSTANT_COLOR           : gl.CONSTANT_COLOR,
    FN_CONSTANT_ALPHA           : gl.CONSTANT_ALPHA,
    FN_SRC_ALPHA_SATURATE       : gl.SRC_ALPHA_SATURATE,
    FN_ONE_MINUS_SRC_COLOR      : gl.ONE_MINUS_SRC_COLOR,
    FN_ONE_MINUS_DST_COLOR      : gl.ONE_MINUS_DST_COLOR,
    FN_ONE_MINUS_SRC_ALPHA      : gl.ONE_MINUS_SRC_ALPHA,
    FN_ONE_MINUS_DST_ALPHA      : gl.ONE_MINUS_DST_ALPHA,
    FN_ONE_MINUS_CONSTANT_COLOR : gl.ONE_MINUS_CONSTANT_COLOR,
    FN_ONE_MINUS_CONSTANT_ALPHA : gl.ONE_MINUS_CONSTANT_ALPHA
}, def.ENUMERABLE );