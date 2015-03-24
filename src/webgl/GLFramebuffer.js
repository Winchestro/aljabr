import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";

export default class Framebuffer {
	constructor ( ) {
		return gl.createFramebuffer();
	}
}

Properties( WebGLFramebuffer.prototype, {
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
		Property( this, "attachment", GL.COLOR_ATTACHMENT0, C );
		gl.framebufferRenderbuffer( 
			GL.FRAMEBUFFER,
			GL.COLOR_ATTACHMENT0,
			GL.RENDERBUFFER,
			Renderbuffer
		);
		return this;
	},
	attachDepthbuffer ( Renderbuffer ) {
		Property( this, "attachment", GL.DEPTH_ATTACHMENT, C );
		gl.framebufferRenderbuffer(
			GL.FRAMEBUFFER,
			GL.DEPTH_ATTACHMENT,
			GL.RENDERBUFFER,
			Renderbuffer
		);
		return this;
	},
};

const getters = {
	getObjectType : function ( ) {
		return gl.getFramebufferAttachmentParameter( GL.FRAMEBUFFER, this.attachment, GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE );
	},
	getObjectName : function ( ) {
		return gl.getFramebufferAttachmentParameter( GL.FRAMEBUFFER, this.attachment, GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME );
	},
	getTextureLevel : function ( ) {
		return gl.getFramebufferAttachmentParameter( GL.FRAMEBUFFER, this.attachment, GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL );
	},
	getTextureCubeMapFace : function ( ) {
		return gl.getFramebufferAttachmentParameter( GL.FRAMEBUFFER, this.attachment, GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE );
	}
};