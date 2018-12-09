import def from "../utilities/PropertyDescriptors.js";

export const GL = WebGLRenderingContext.prototype;


var defaultOptions = { 
    alpha : true,
    depth : true,
    stencil : false,
    antialias : false,
    premultipliedAlpha : false,
    preserveDrawingBuffer : false,
    preferLowPowerToHighPerformance : false,
    failIfMajorPerformanceCaveat : false
};



function createContext ( options ) {
    let canvas = document.createElement("canvas");
    return canvas.getContext("webgl", options ) || canvas.getContext("experimental-webgl", options );
}



def.Properties( WebGLRenderingContext.prototype, {
    options : defaultOptions,
    setOptions ( options ) {
        if ( options === undefined ) options = this.options;
        return createContext( this.canvas, options );
    },
    setPixelRatio ( pixelRatio ) {
        if ( pixelRatio === undefined ) pixelRatio = devicePixelRatio;
        let width = this.canvas.clientWidth * pixelRatio;
        let height = this.canvas.clientHeight * pixelRatio;

        this.canvas.width = width;
        this.canvas.height = height;
        this.viewport( 0, 0, width, height );
        return this;
    }
});

def.Getters( WebGLRenderingContext.prototype, {
    getShadingLanguageVersion   ( ) { return gl.getParameter( GL.SHADING_LANGUAGE_VERSION );    },
    getVersion                  ( ) { return gl.getParameter( GL.VERSION );                     },
    getVendor                   ( ) { return gl.getParameter( GL.VENDOR );                      },
    getRenderer                 ( ) { return gl.getParameter( GL.RENDERER );                    }
});

def.Property( GL, "strings", [] );

for ( let property in WebGLRenderingContext ) {
    if ( typeof WebGLRenderingContext[ property ] === "number") {
        def.Property ( GL.strings, GL[ property ], property, def.ENUMERABLE | def.CONFIGURABLE );
    }
}
let gl = createContext( defaultOptions );
export default gl;