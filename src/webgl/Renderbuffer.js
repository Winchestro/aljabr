import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";

export default class Renderbuffer {
	constructor ( ) {
		return gl.createRenderbuffer();
	}
}

Properties( WebGLRenderbuffer.prototype, {
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

Getters( WebGLRenderbuffer.prototype, {
	getWidth 		(){ return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_WIDTH );},
	getHeight		(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_HEIGHT );},
	getFormat		(){ return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_INTERNAL_FORMAT );},
	getRedSize		(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_RED_SIZE );},
	getGreenSize	(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_GREEN_SIZE );},
	getBlueSize		(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_BLUE_SIZE );},
	getAlphaSize	(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_ALPHA_SIZE );},
	getDepthSize	(){ return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_DEPTH_SIZE );},
	getStencilSize	(){	return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_STENCIL_SIZE );},
});