import { gl, GL } from "./GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

const ATTACHMENT = new WeakMap;

export default class Framebuffer {
	constructor ( ) {
		return gl.createFramebuffer();
	}
}

const methods = {
	bind : function ( ) {
		gl.bindFramebuffer( this.target, this );
	},
	unbind : function ( ) {
		gl.bindFramebuffer( this.target, null );
	},
	delete : function ( ) {
		gl.deleteFramebuffer( this );
	},
	attachColorbuffer : function ( Renderbuffer ) {
		ATTACHMENT.set( this, GL.COLOR_ATTACHMENT0 );
		gl.framebufferRenderbuffer( 
			GL.FRAMEBUFFER,
			GL.COLOR_ATTACHMENT0,
			GL.RENDERBUFFER,
			Renderbuffer
		);
		return this;
	},
	attachDepthbuffer : function ( Renderbuffer ) {
		ATTACHMENT.set( this, GL.DEPTH_ATTACHMENT );
		gl.framebufferRenderbuffer(
			GL.FRAMEBUFFER,
			GL.DEPTH_ATTACHMENT,
			GL.RENDERBUFFER,
			Renderbuffer
		);
		return this;
	},
	attachStencilbuffer : function ( Renderbuffer ) {
		ATTACHMENT.set( this, GL.
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