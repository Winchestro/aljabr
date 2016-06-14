define( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";
    
    const GL = WebGLRenderingContext.prototype;

    var canvas = document.createElement("canvas");
    
    var defaultOptions = { 
        alpha : true,
        depth : true,
        stencil : false,
        antialias : false,
        premultipliedAlpha : false,
        preserveDrawingBuffer : false,
        preferLowPowerToHighPerformance : true,
        failIfMajorPerformanceCaveat : true
    };

    var gl = canvas.getContext("webgl", defaultOptions ) || canvas.getContext("experimental-webgl", defaultOptions );

    def.Properties( WebGLRenderingContext.prototype, {
        options : defaultOptions,
        setOptions ( options ) {
            if ( options === undefined ) options = this.options;

            gl = canvas.getContext( "webgl", options ) || 
            canvas.getContext( "experimental-webgl", options );
            return gl;
        },
        setPixelRatio ( pixelRatio ) {
            if ( pixelRatio === undefined ) pixelRatio = window.devicePixelRatio;
            let width = canvas.clientWidth * pixelRatio;
            let height = canvas.clientHeight * pixelRatio;

            canvas.width = width;
            canvas.height = height;
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


    return gl;
});