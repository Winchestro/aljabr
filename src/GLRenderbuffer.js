import { gl } from "./GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

const PROTOTYPE = WebGLRenderbuffer.prototype;

export default class Renderbuffer {
	constructor ( ) {
		return gl.createRenderbuffer();
	}
}

const methods = {
	bind : function ( ) {
		gl.bindRenderbuffer( this.target, this );
		return this;
	},
	unbind : function ( ) {
		gl.bindRenderbuffer( this.target, null );
		return this;
	},
	delete : function ( ) {
		gl.deleteRenderbuffer( this );
		return this;
	},
};

const getters = {
	getWidth : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_WIDTH );
	},
	getHeight : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_HEIGHT );
	},
	getFormat : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_INTERNAL_FORMAT );
	},
	getRedSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_RED_SIZE );
	},
	getGreenSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_GREEN_SIZE );
	},
	getBlueSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_BLUE_SIZE );
	},
	getAlphaSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_ALPHA_SIZE );
	},
	getDepthSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_DEPTH_SIZE );
	},
	getStencilSize : function ( ) {
		return gl.getRenderbufferParameter( this.target, GL.RENDERBUFFER_STENCIL_SIZE );
	},
}

for ( let p of methods ) Object.defineProperty( PROTOTYPE, p, {
	value : methods[ p ],
	enumerable : true,
});

for ( let p of getters ) Object.defineProperty( PROTOTYPE, p, {
	get : getters[ p ]
});