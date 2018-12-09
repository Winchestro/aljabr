import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

export default class Viewport {
    constructor ( x, y, width, height ) {
        if ( x === undefined ) x = 0;
        if ( y === undefined ) y = 0;
        if ( width === undefined ) width = gl.canvas.clientWidth;
        if ( height === undefined ) height = gl.canvas.clientHeight;

        def.Properties( this, {
            x,
            y,
            width,
            height
        }, def.WRITABLE );
    }

    setDimensions ( x, y, width, height ) {
        if ( x === undefined ) x = this.x;
        else this.x = x;

        if ( y === undefined ) y = this.y;
        else this.y = y;

        if ( width === undefined ) width = this.width;
        else this.width = width;

        if ( height === undefined ) height = this.height;
        else this.height = height;

        Viewport.setDimensions( this.x, this.y, this.width, this.height );
    }


    static setDimensions ( x, y, width, height ) {
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
    static get getDimensions() { return gl.getParameter( gl.VIEWPORT );}
};