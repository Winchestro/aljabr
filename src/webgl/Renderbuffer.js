define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class Renderbuffer {
        constructor ( ) {
            return gl.createRenderbuffer();
        }
    }

    def.Properties( WebGLRenderbuffer.prototype, {
        bind ( ) {
            gl.bindRenderbuffer( this.target, this );
            return this;
        },
        unbind ( ) {
            gl.bindRenderbuffer( this.target, null );
            return this;
        },
        delete ( ) {
            gl.deleteRenderbuffer( this );
            return this;
        },
    });

    def.Getters( WebGLRenderbuffer.prototype, {
        getWidth        (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_WIDTH );},
        getHeight       (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_HEIGHT );},
        getFormat       (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_INTERNAL_FORMAT );},
        getRedSize      (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_RED_SIZE );},
        getGreenSize    (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_GREEN_SIZE );},
        getBlueSize     (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_BLUE_SIZE );},
        getAlphaSize    (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_ALPHA_SIZE );},
        getDepthSize    (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_DEPTH_SIZE );},
        getStencilSize  (){ return gl.getRenderbufferParameter( this.target, gl.RENDERBUFFER_STENCIL_SIZE );},
    });

    return Renderbuffer;
});