define( [
    "../webgl/Context"
], function module (
    gl
) {
    "use strict";

    class Viewport {
        
        setDimensions ( x, y, width, height ) {
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = 0;
            if ( width === undefined ) width = gl.canvas.clientWidth;
            if ( height === undefined ) height = gl.canvas.clientHeight;
            
            gl.viewport(
                //GLint
                x,
                //GLint
                y,
                //GLint
                width,
                //GLint
                height
            );
            return this;
        }
        get getDimensions() { return gl.getParameter( gl.VIEWPORT );}
    };
    return new Viewport;
});