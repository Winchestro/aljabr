define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class ScissorTest {
        constructor ( x, y, width, height ) {
            if ( x !== undefined ) this.set( x, y, width, height );
        }
        enable ( ) {
            this.enabled = true;
            ScissorTest.enable();
            return this;
        }
        disable ( ) {
            this.enabled = false;
            ScissorTest.disable();
            return this;
        }
        setDimensions ( x, y, width, height ) {
            this.dimensionsSet = true;
            if ( x !== undefined ) this.x = x;
            if ( y !== undefined ) this.y = y;
            if ( width !== undefined ) this.width = width;
            if ( height !== undefined ) this.height = height;
            ScissorTest.setDimensions( this.x, this.y, this.width, this.height );
            return this;
        }
        unset ( ) {
            this.dimensionsSet = false;
            ScissorTest.unset();
            return this;
        }
        static enable ( ) {
            if ( !ScissorTest.enabled ) {
                ScissorTest.enabled = true;
                gl.enable( gl.SCISSOR_TEST );
            }
            return ScissorTest;
        }
        static disable ( ) {
            if ( ScissorTest.enabled ) {
                ScissorTest.enabled = false;
                gl.disable( gl.SCISSOR_TEST );
            }
            return ScissorTest;
        }
        static setDimensions ( x, y, width, height ) {
            if ( x === undefined ) x = ScissorTest.x;
            if ( y === undefined ) y = ScissorTest.y;
            if ( width === undefined ) width = ScissorTest.width;
            if ( height === undefined ) height = ScissorTest.height;

            ScissorTest.dimensionsSet = true;
            gl.scissor(
                //GLint
                x,
                //GLint
                y,
                //GLint
                width,
                //GLint
                height
            );
            return ScissorTest;
        }
        static unset ( ) {
            if ( ScissorTest.dimensionsSet ) {
                ScissorTest.dimensionsSet = false;
                gl.scissor(
                    ScissorTest.x,
                    ScissorTest.y,
                    ScissorTest.width,
                    ScissorTest.height
                );
            }
            return ScissorTest;
        }
        get getEnabled()                { return gl.getParameter( gl.SCISSOR_TEST );}
        get getScissorBox()             { return gl.getParameter( gl.SCISSOR_BOX );}
    }
    def.Properties( ScissorTest, {
        enabled         : false,
        dimensionsSet   : false,
        x               : 0,
        y               : 0,
        width           : gl.canvas.clientWidth,
        height          : gl.canvas.clientHeight
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    return ScissorTest;
});