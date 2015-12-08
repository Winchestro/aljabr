define( [
    "../webgl/Context"
], function module (
    gl
) {
    "use strict";

    class Capabilities { 
        get getMaxVertexAttribs()               { return gl.getParameter( gl.MAX_VERTEX_ATTRIBS );}
        get getMaxCombinedTextureImageUnits()   { return gl.getParameter( gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS );}
        get getMaxTextureImageUnits()           { return gl.getParameter( gl.MAX_TEXTURE_IMAGE_UNITS );}
        get getMaxVertexTextureImageUnits()     { return gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );}
        get getMaxCubeMaptextureSize()          { return gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );}
        get getMaxFragmentUniformVectors()      { return gl.getParameter( gl.MAX_FRAGMENT_UNIFORM_VECTORS );}
        get getMaxVertexUniformVectors()        { return gl.getParameter( gl.MAX_VERTEX_UNIFORM_VECTORS );}
        get getMaxRenderbufferSize()            { return gl.getParameter( gl.MAX_RENDERBUFFER_SIZE );}
        get getMaxTextureSize()                 { return gl.getParameter( gl.MAX_TEXTURE_SIZE );}
        get getMaxVaryingVectors()              { return gl.getParameter( gl.MAX_VARYING_VECTORS );}
        get getMaxViewportDims()                { return gl.getParameter( gl.MAX_VIEWPORT_DIMS );}
        get getAliasedLineWidthRange()          { return gl.getParameter( gl.ALIASED_LINE_WIDTH_RANGE );}
        get getAliasedPointSizeRange()          { return gl.getParameter( gl.ALIASED_POINT_SIZE_RANGE );}
    };
    return new Capabilities;
});