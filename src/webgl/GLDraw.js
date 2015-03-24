import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";

export default class Draw {
	static setClearDepth ( depth ) {
		gl.clearDepth(
			//GLclampf set clear depth
			depth
		);
		return this;
	}
	static setClearStencil ( stencil ) {
		gl.clearStencil(
			//GLint set stencil buffer index to clear
			stencil
		);
		return this;
	}
	static setClearColor ( red, green, blue, alpha ) {
		gl.clearColor(
			//GLclampf
			red,
			//GLclampf
			green,
			//GLclampf
			blue,
			//GLclampf
			alpha
		);
		return this;
	}
	static clear ( mask = GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT ) {
		gl.clear(
			//GLbitfield COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT | STENCIL_BUFFER_BIT
			mask
		);
		return this;
	}
	static arrays ( mode, count, offset = 0 ) {
		gl.drawArrays(
			//GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
			mode,
			//GLint
			offset,
			//GLsizei
			count
		);
		return this;
	}
	static elements ( mode, type, count, offset = 0 ) {
		gl.drawElements(
			//GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
			mode,
			//GLsizei
			count,
			//GLenum UNSIGNED_BYTE | UNSIGNED_SHORT | [UNSIGNED_INT]
			type,
			//GLvoid *
			offset
		);
		return this;
	}

	/*TODO : Move to material
	static setLineWidth ( width ) {
		gl.lineWidth(
			//GLfloat
			width
		);
		return this;
	}*/
	get getStencilClear()	{ return gl.getParameter( GL.STENCIL_CLEAR_VALUE );}
	get getDepthClear()		{ return gl.getParameter( GL.DEPTH_CLEAR_VALUE );}
	get getColorClear()		{ return gl.getParameter( GL.COLOR_CLEAR_VALUE );}
	get getRedBits()		{ return gl.getParameter( GL.RED_BITS );}
	get getGreenBits()		{ return gl.getParameter( GL.GREEN_BITS );}
	get getBlueBits()		{ return gl.getParameter( GL.BLUE_BITS );}
	get getAlphaBits()		{ return gl.getParameter( GL.ALPHA_BITS );}
	get getSubpixelBits()	{ return gl.getParameter( GL.SUBPIXEL_BITS );}
	get getDepthBits()		{ return gl.getParameter( GL.DEPTH_BITS );}
	get getStencilBits()	{ return gl.getParameter( GL.STENCIL_BITS );}
	get getColorWritemask()	{ return gl.getParameter( GL.COLOR_WRITEMASK );}
	//get getLineWidth()		{ return gl.getParameter( GL.LINE_WIDTH );}
};
