define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class Framebuffer {
        constructor ( ) {
            return gl.createFramebuffer();
        }
    }

    def.Properties( WebGLFramebuffer.prototype, {
        bind ( ) {
            gl.bindFramebuffer( this.target, this );
        },
        unbind ( ) {
            gl.bindFramebuffer( this.target, null );
        },
        delete ( ) {
            gl.deleteFramebuffer( this );
        },
        attachColorbuffer ( Renderbuffer ) {
            Property( this, "attachment", gl.COLOR_ATTACHMENT0, C );
            gl.framebufferRenderbuffer( 
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.RENDERBUFFER,
                Renderbuffer
            );
            return this;
        },
        attachDepthbuffer ( Renderbuffer ) {
            Property( this, "attachment", gl.DEPTH_ATTACHMENT, C );
            gl.framebufferRenderbuffer(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.RENDERBUFFER,
                Renderbuffer
            );
            return this;
        },
    });

    def.Getters( WebGLFramebuffer.prototype, {
        getObjectType : function ( ) {
            return gl.getFramebufferAttachmentParameter( gl.FRAMEBUFFER, this.attachment, gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE );
        },
        getObjectName : function ( ) {
            return gl.getFramebufferAttachmentParameter( gl.FRAMEBUFFER, this.attachment, gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME );
        },
        getTextureLevel : function ( ) {
            return gl.getFramebufferAttachmentParameter( gl.FRAMEBUFFER, this.attachment, gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL );
        },
        getTextureCubeMapFace : function ( ) {
            return gl.getFramebufferAttachmentParameter( gl.FRAMEBUFFER, this.attachment, gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE );
        }
    });
    return Framebuffer;
});