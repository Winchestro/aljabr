define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class Draw {
        static setClearDepth ( depth ) {
            gl.clearDepth(
                //GLclampf set clear depth
                depth
            );
            return this;
        }
        static setClearStencil ( stencil ) {
            gl.clearStencil(
                //GLint set stencil buffer index to clear
                stencil
            );
            return this;
        }
        static setClearColor ( red, green, blue, alpha ) {
            gl.clearColor(
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
        static clear ( mask ) {
            if ( mask === undefined ) mask = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT
            gl.clear(
                //GLbitfield COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT | STENCIL_BUFFER_BIT
                mask
            );
            return this;
        }
        static arrays ( mode, count, offset ) {
            if ( offset === undefined ) offset = 0;
            gl.drawArrays(
                //GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
                mode,
                //GLint
                offset,
                //GLsizei
                count
            );
            return this;
        }
        static elements ( mode, type, count, offset ) {
            if ( offset === undefined ) offset = 0;
            gl.drawElements(
                //GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
                mode,
                //GLsizei
                count,
                //GLenum UNSIGNED_BYTE | UNSIGNED_SHORT | [UNSIGNED_INT]
                type,
                //GLvoid *
                offset
            );
            return this;
        }

        /*TODO : Move to material
        static setLineWidth ( width ) {
            gl.lineWidth(
                //GLfloat
                width
            );
            return this;
        }*/
        get getStencilClear()   { return gl.getParameter( gl.STENCIL_CLEAR_VALUE );}
        get getDepthClear()     { return gl.getParameter( gl.DEPTH_CLEAR_VALUE );}
        get getColorClear()     { return gl.getParameter( gl.COLOR_CLEAR_VALUE );}
        get getRedBits()        { return gl.getParameter( gl.RED_BITS );}
        get getGreenBits()      { return gl.getParameter( gl.GREEN_BITS );}
        get getBlueBits()       { return gl.getParameter( gl.BLUE_BITS );}
        get getAlphaBits()      { return gl.getParameter( gl.ALPHA_BITS );}
        get getSubpixelBits()   { return gl.getParameter( gl.SUBPIXEL_BITS );}
        get getDepthBits()      { return gl.getParameter( gl.DEPTH_BITS );}
        get getStencilBits()    { return gl.getParameter( gl.STENCIL_BITS );}
        get getColorWritemask() { return gl.getParameter( gl.COLOR_WRITEMASK );}
        //get getLineWidth()        { return gl.getParameter( gl.LINE_WIDTH );}
    };
    return Draw;
});