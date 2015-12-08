define( [
    "../webgl/Context"
], function module (
    gl
) {
    "use strict";
    
    class Bindings {
        get getActiveProgram()      { return gl.getParameter( gl.CURRENT_PROGRAM );}
        get getArrayBuffer()        { return gl.getParameter( gl.ARRAY_BUFFER_BINDING );}
        get getElementArrayBuffer() { return gl.getParameter( gl.ELEMENT_ARRAY_BUFFER_BINDING );}
        get getTexture2D()          { return gl.getParameter( gl.TEXTURE_BINDING_2D );}
        get getTextureCubeMap()     { return gl.getParameter( gl.TEXTURE_BINDING_CUBE_MAP );}
        get getFramebuffer()        { return gl.getParameter( gl.FRAMEBUFFER_BINDING );}
        get getRenderbuffer()       { return gl.getParameter( gl.RENDERBUFFER_BINDING );}
    };

    return new Bindings;
});