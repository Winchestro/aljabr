import Program from "../GLProgram";
import Shader from "../GLShader";

import { gl, GL, canvas } from "../GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./ULPropertyDescriptors";

var currentProgram = null;
var currentUniforms = null;
var globalUsage = 0;

const DEFAULT_PROGRAM = new Program.VertexColors;

const BLEND_ENABLED						= 1 <<  0;
const BLEND_COLOR_SET					= 1 <<  1;
const BLEND_FUNC_SET					= 1 <<  2;
const BLEND_EQUATION_SET				= 1 <<  3;
const CULL_FACE_ENABLED 				= 1 <<  4;
const CULL_FACE_SET						= 1 <<  5;
const CULL_FACE_FRONT_SET				= 1 <<  6;
const DEPTH_ENABLED						= 1 <<  7;
const DEPTH_WRITE_SET					= 1 <<  8;
const DEPTH_FUNC_SET 					= 1 <<  9;
const DEPTH_RANGE_SET 					= 1 << 10;
const DITHER_ENABLED 					= 1 << 11;
const OFFSET_ENABLED					= 1 << 12;
const OFFSET_SET						= 1 << 13;
const SAMPLE_ALPHA_ENABLED 				= 1 << 14;
const SAMPLE_ENABLED 					= 1 << 15;
const SAMPLE_SET						= 1 << 16;
const SCISSOR_ENABLED					= 1 << 17;
const SCISSOR_SET						= 1 << 18;
const STENCIL_ENABLED					= 1 << 19;
const STENCIL_FRONT_FUNC_SET			= 1 << 20;
const STENCIL_FRONT_MASK_SET			= 1 << 21;
const STENCIL_FRONT_OP_SET				= 1 << 22;
const STENCIL_BACK_FUNC_SET				= 1 << 23;
const STENCIL_BACK_MASK_SET				= 1 << 24;
const STENCIL_BACK_OP_SET				= 1 << 25;

const STENCIL_FUNC_SET	= STENCIL_FRONT_FUNC_SET
						| STENCIL_BACK_FUNC_SET
						;
const STENCIL_OP_SET	= STENCIL_FRONT_OP_SET
						| STENCIL_BACK_OP_SET
						;
const STENCIL_MASK_SET	= STENCIL_FRONT_MASK_SET
						| STENCIL_BACK_MASK_SET
						;
const BLEND_ANY_SET 	= BLEND_COLOR_SET
						| BLEND_FUNC_SET
						| BLEND_EQUATION_SET
						;
const STENCIL_ANY_SET	= STENCIL_FUNC_SET
						| STENCIL_MASK_SET
						| STENCIL_OP_SET
						;

class Dither {
	enable ( ) {
		if ( ~globalUsage & DITHER_ENABLED ) {
			globalUsage |= DITHER_ENABLED;
			gl.enable( GL.DITHER_TEST );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & DITHER_ENABLED ) {
			globalUsage &= ~DITHER_ENABLED;
			gl.disable( GL.DITHER_TEST );
		}
		return this;
	}
	get getEnabled ( ) { return gl.getParameter( GL.DITHER ); }
}

class SampleCoverage {
	enable ( ) {
		if ( ~globalUsage & SAMPLE_ENABLED ) {
			globalUsage |= SAMPLE_ENABLED;
			gl.enable( GL.SAMPLE_COVERAGE );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & SAMPLE_ENABLED ) {
			globalUsage &= ~SAMPLE_ENABLED;
			gl.disable( GL.SAMPLE_COVERAGE );
		}
		return this;
	}
	enableAlpha ( ) {
		if ( ~globalUsage & SAMPLE_ALPHA_ENABLED ) {
			globalUsage |= SAMPLE_ALPHA_ENABLED;
			gl.enable( GL.SAMPLE_ALPHA_TO_COVERAGE );
		}
		return this;
	}
	disableAlpha ( ) {
		if ( globalUsage & SAMPLE_ALPHA_ENABLED ) {
			globalUsage &= ~SAMPLE_ALPHA_ENABLED;
			gl.disable( GL.SAMPLE_ALPHA_TO_COVERAGE );
		}
		return this;
	}
	set ( value = this.value, invert = this.invert ) {
		globalUsage |= SAMPLE_SET;
		gl.sampleCoverage(
			//GLclampf
			value,
			//GLboolean
			invert
		);
		return this;
	}
	unset ( ) {
		if ( globalUsage & SAMPLE_SET ) {
			globalUsage &= ~SAMPLE_SET;
			gl.sampleCoverage(
				//GLclampf
				SampleCoverage.prototype.value,
				//GLboolean
				SampleCoverage.prototype.invert
			);
		}
		return this;
	}
	get getSampleBuffers()			{ return gl.getParameter( GL.SAMPLE_BUFFERS );}
	get getInvert()					{ return gl.getParameter( GL.SAMPLE_COVERAGE_INVERT );}
	get getValue()					{ return gl.getParameter( GL.SAMPLE_COVERAGE_VALUE );}
	get getSamples()				{ return gl.getParameter( GL.SAMPLES );}
}
Properties( SampleCoverage.prototype, {
	value 		: 1,
	invert 		: GL.FALSE,
}, E | C );

class ScissorTest {
	enable ( ) {
		if ( ~globalUsage & SCISSOR_ENABLED ) {
			globalUsage |= SCISSOR_ENABLED;
			gl.enable( GL.SCISSOR_TEST );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & SCISSOR_ENABLED ) {
			globalUsage &= ~SCISSOR_ENABLED;
			gl.disable( GL.SCISSOR_TEST );
		}
		return this;
	}
	set ( x = this.x, y = this.y, width = this.width, height = this.height ) {
		globalUsage |= SCISSOR_SET;
		gl.scissor(
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
	unset ( ) {
		if ( globalUsage & SCISSOR_SET ) {
			globalUsage &= ~SCISSOR_SET;
			gl.scissor(
				ScissorTest.prototype.x,
				ScissorTEst.prototype.y,
				ScissorTest.prototype.width,
				ScissorTest.prototype.height
			);
		}
		return this;
	}
	get getEnabled()				{ return gl.getParameter( GL.SCISSOR_TEST );}
	get getScissorBox()				{ return gl.getParameter( GL.SCISSOR_BOX );}
}
Properties( ScissorTest.prototype, {
	x 			: 0,
	y 			: 0,
	width 		: canvas.clientWidth,
	height 		: canvas.clientHeight
}, E | C );

class Alpha {
	enable ( ) {
		if ( ~globalUsage & BLEND_ENABLED ) {
			globalUsage |= BLEND_ENABLED;
			gl.enable( GL.BLEND );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & BLEND_ENABLED ) {
			globalUsage &= ~BLEND_ENABLED;
			gl.disable( GL.BLEND );
		}
		return this;
	}
	setColor ( red = this.colorRed, green = this.colorGreen, blue = this.colorBlue, alpha = this.colorAlpha ) {
		globalUsage |= BLEND_COLOR_SET;
		gl.blendColor(
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
	unsetColor ( ) {
		if ( globalUsage & BLEND_COLOR_SET ) {
			globalUsage &= ~BLEND_COLOR_SET;
			gl.blendColor(
				Alpha.prototype.colorRed,
				Alpha.prototype.colorGreen,
				Alpha.prototype.colorBlue,
				Alpha.prototype.colorAlpha 
			);
		}
		return this;
	}
	setFunc ( srcRGB = this.srcRGB, dstRGB = this.dstRGB, srcAlpha = this.srcAlpha, dstAlpha = this.dstAlpha ) {
		globalUsage |= BLEND_FUNC_SET;
		//  all combos of [ ONE_MINUS ?] _ [ SRC | DST | CONSTANT ] _ [ COLOR | ALPHA ]
		gl.blendFuncSeparate(
			//GLenum ZERO | ONE | SRC_Alpha.SATURATE + combos
			srcRGB,
			//GLenum ZERO | ONE + combos
			dstRGB,
			//GLenum accepts same as srcRGB
			srcAlpha,
			//GLenum accepts same as dstRGB
			dstAlpha
		);
		return this;
	}
	unsetFunc ( ) {
		if ( globalUsage & BLEND_FUNC_SET ) {
			globalUsage &= ~BLEND_FUNC_SET;
			gl.blendFuncSeparate(
				Alpha.prototype.srcRGB,
				Alpha.prototype.dstRGB,
				Alpha.prototype.srcAlpha,
				Alpha.prototype.dstAlpha
			);
		}
		return this;
	}
	setEquation ( modeRGB = this.modeRGB, modeAlpha = this.modeAlpha ) {
		globalUsage |= BLEND_EQUATION_SET;
		gl.blendEquationSeparate(
			//GLenum FUNC_ADD | FUNC_SUBTRACT | FUNC_REVERSE_SUBTRACT
			modeRGB,
			//GLenum same
			modeAlpha
		);
		return this;
	}
	unsetEquation ( ) {
		if ( globalUsage & BLEND_EQUATION_SET ) {
			globalUsage &= ~BLEND_EQUATION_SET;
			gl.blendEquationSeparate(
				Alpha.prototype.modeRGB,
				Alpha.prototype.modeAlpha
			);
		}
		return this;
	}

	get getEnabled()				{ return gl.getParameter( GL.BLEND );}
	get getColor()					{ return gl.getParameter( GL.BLEND_COLOR );}

	get getSrcRGB()					{ return gl.getParameter( GL.BLEND_SRC_RGB );}
	get getSrcAlpha()				{ return gl.getParameter( GL.BLEND_SRC_ALPHA );}
	get getDstRGB()					{ return gl.getParameter( GL.BLEND_DST_RGB );}
	get getDstAlpha()				{ return gl.getParameter( GL.BLEND_DST_ALPHA );}
	get getEquationRGB()			{ return gl.getParameter( GL.BLEND_EQUATION_RGB );}
	get getEquationAlpha()			{ return gl.getParameter( GL.BLEND_EQUATION_ALPHA );}

	get getSrcRGBFlag()				{ return gl.flags[ this.getSrcRGB ];}
	get getSrcAlphaFlag()			{ return gl.flags[ this.getSrcAlpha ];}
	get getDstRGBFlag()				{ return gl.flags[ this.getDstRGB ];}
	get getDstAlphaFlag()			{ return gl.flags[ this.getDstAlpha ];}
	get getEquationRGBFlag()		{ return gl.flags[ this.getEquationRGB ];}
	get getEquationAlphaFlag()		{ return gl.flags[ this.getEquationAlpha ];}
}
Properties( Alpha.prototype, {
	colorRed 	: 0,
	colorGreen 	: 0,
	colorBlue 	: 0,
	colorAlpha 	: 1,
	modeRGB 	: GL.FUNC_ADD,
	modeAlpha 	: GL.FUNC_ADD,
	srcRGB 		: GL.ONE,
	srcAlpha 	: GL.ONE,
	dstRGB 		: GL.ZERO,
	dstAlpha 	: GL.ZERO
}, E | C );

class DepthTest {
	enable ( ) {
		if ( ~globalUsage & DEPTH_ENABLED ) {
			globalUsage |= DEPTH_ENABLED;
			gl.enable( GL.DEPTH_TEST );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & DEPTH_ENABLED ) {
			globalUsage &= ~DEPTH_ENABLED;
			gl.disable( GL.DEPTH_TEST );
		}
		return this;
	}
	setWrite ( enable = this.write ) {
		globalUsage |= DEPTH_WRITE_SET;
		gl.depthMask( enable );
		return this;
	}
	unsetWrite ( ) {
		if ( globalUsage & DEPTH_WRITE_SET ) {
			globalUsage &= ~DEPTH_WRITE_SET;
			gl.depthMask(
				DepthTest.prototype.write 
			);
		}
		return this;
	}
	setFunc ( func = this.func ) {
		globalUsage |= DEPTH_FUNC_SET;
		gl.depthFunc(
			//GLenum NEVER | LESS | EQUAL | LEQUAL | GREATER | NOTEQUAL | GEEQUAL | ALWAYS
			func
		);
		return this;
	}
	unsetFunc ( ) {
		if ( globalUsage & DEPTH_FUNC_SET ) {
			globalUsage &= ~DEPTH_FUNC_SET;
			gl.depthFunc(
				DepthTest.prototype.func
			);
		}
		return this;
	}
	setRange ( zNear = this.zNear, zFar = this.zFar ) {
		globalUsage |= DEPTH_RANGE_SET;
		gl.depthRange(
			//GLclampf
			zNear,
			//GLclampf
			zFar
		);
		return this;
	}
	unsetRange ( ) {
		if ( globalUsage & DEPTH_RANGE_SET ) {
			globalUsage &= ~DEPTH_RANGE_SET;
			gl.depthRange(
				DepthTest.prototype.zNear,
				DepthTest.prototype.zFar
			);
		}
		return this;
	}
	get getEnabled()		{ return gl.getParameter( GL.DEPTH_TEST );}
	get getFunc()			{ return gl.getParameter( GL.DEPTH_FUNC );}
	get getRange()			{ return gl.getParameter( GL.DEPTH_RANGE );}
	get getWrite()			{ return gl.getParameter( GL.DEPTH_WRITEMASK );}
	get getFuncFlag()		{ return gl.flags[ this.getFunc ];}
}
Properties( DepthTest.prototype, {
	write		: true,
	func 	 	: GL.LESS,
	zNear		: 0,
	zFar		: 1,
}, E | C );

class PolygonOffset {
	enable ( ) {
		if ( globalUsage & OFFSET_ENABLED ) return this;
		globalUsage |= OFFSET_ENABLED;
		gl.enable( GL.POLYGON_OFFSET_FILL );
		return this;
	}
	disable ( ) {
		if ( ~globalUsage & OFFSET_ENABLED ) return this;
		globalUsage &= ~OFFSET_ENABLED;
		gl.disable( GL.POLYGON_OFFSET_FILL );
		return this;
	}
	set ( factor = this.factor, units = this.units ) {
		globalUsage |= OFFSET_SET;
		gl.polygonOffset(
			//GLfloat
			factor,
			//GLfloat
			units
		);
		return this;
	}
	unset ( ) {
		if ( globalUsage & OFFSET_SET ) {
			globalUsage &= ~OFFSET_SET;
			gl.polygonOffset(
				PolygonOffset.prototype.factor,
				PolygonOffset.prototype.units
			);
		}
		return this;
	}
	get getEnabled()		{ return gl.getParameter( GL.POLYGON_OFFSET_FILL );}
	get getFactor()			{ return gl.getParameter( GL.POLYGON_OFFSET_FACTOR );}
	get getUnits()			{ return gl.getParameter( GL.POLYGON_OFFSET_UNITS );}
}
Properties( PolygonOffset.prototype, {
	factor	: 0,
	units	: 0
}, E | C );

class CullFace {
	enable ( ) {
		if ( ~globalUsage & CULL_FACE_ENABLED ) {
			globalUsage |= CULL_FACE_ENABLED;
			gl.enable( GL.CULL_FACE );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & CULL_FACE_ENABLED ) {
			globalUsage &= ~CULL_FACE_ENABLED;
			gl.disable( GL.CULL_FACE );
		}
		return this;
	}
	set ( mode = this.mode ) {
		globalUsage |= CULL_FACE_SET;
		gl.cullFace( 
			//GLenum FRONT | BACK | FRONT_AND_BACK
			mode
		);
		return this;
	}
	unset ( ) {
		if ( globalUsage & CULL_FACE_SET ) {
			globalUsage &= ~CULL_FACE_SET;
			gl.cullFace(
				CullFace.prototype.mode
			);
		}
		return this;
	}
	setFront ( front = this.front ) {
		globalUsage |= CULL_FACE_FRONT_SET;
		gl.frontFace( 
			//GLenum CW | CCW
			front
		); 
		return this; 
	}
	unsetFront ( ) {
		if ( globalUsage & CULL_FACE_FRONT_SET ) {
			globalUsage &= ~CULL_FACE_FRONT_SET;
			gl.frontFace(
				CullFace.prototype.front
			);
		}
		return this;
	}
	get getEnabled()		{ return gl.getParameter( GL.CULL_FACE );}
	get getFront()			{ return gl.getParameter( GL.FRONT_FACE );}
	get getMode()			{ return gl.getParameter( GL.CULL_FACE_MODE );}
	get getFrontFlag()		{ return gl.flags[ this.getFront ];}
	get getModeFlag()		{ return gl.flags[ this.getMode ];}
}
Properties( CullFace.prototype, {
	mode 	: GL.FRONT,
	front 	: GL.CCW
}, E | C );

class StencilTest {
	enable ( ) {
		if ( ~globalUsage & STENCIL_ENABLED ) {
			globalUsage |= STENCIL_ENABLED;
			gl.enable( GL.STENCIL_TEST );
		}
		return this;
	}
	disable ( ) {
		if ( globalUsage & STENCIL_ENABLED ) {
			globalUsage &= ~STENCIL_ENABLED;
			gl.disable( GL.STENCIL_TEST );
		}
		return this;
	}

	setFunc ( func = this.frontFunc, ref = this.frontRef, mask = this.frontValueMask ) {
		globalUsage |= STENCIL_FUNC_SET;
		gl.stencilFunc(
			func,
			ref,
			mask
		);
		return this;
	}
	setFrontFunc ( func = this.frontFunc, ref = this.frontRef, mask = this.frontValueMask ) {
		globalUsage |= STENCIL_FRONT_FUNC_SET;
		gl.stencilFuncSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT,
			// GLenum NEVER | LESS | LEQUAL | GREATER | GEQUAL | EQUAL | NOTEQUAL | ALWAYS
			func,
			// GLint
			ref,
			// GLuint
			mask
		);
		return this;
	}
	setBackFunc( func = this.backFunc, ref = this.backRef, mask = this.backValueMask ) {
		globalUsage |= STENCIL_BACK_FUNC_SET;
		gl.stencilFuncSeparate(
			GL.BACK,
			func,
			ref,
			mask
		);
		return this;
	}
	unsetFunc ( ) {
		if ( globalUsage & STENCIL_FRONT_FUNC_SET || globalUsage & STENCIL_BACK_FUNC_SET ) {
			globalUsage & ~STENCIL_FUNC_SET;
			gl.stencilFunc(
				StencilTest.prototype.frontFunc,
				StencilTest.prototype.frontRef,
				StencilTest.prototype.frontValueMask
			);
		}
		return this;
	}

	setWriteMask ( mask = this.frontWriteMask ) {
		globalUsage |= STENCIL_MASK_SET;
		gl.stencilMask( 
			// GLuint
			mask 
		);
		return this;
	}
	setFrontWriteMask ( mask = this.frontWriteMask ) {
		globalUsage |= STENCIL_FRONT_MASK_SET;
		gl.stencilMaskSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT, 
			// GLuint
			mask 
		);
		return this;
	}
	setBackWriteMask ( mask = this.backWriteMask ) {
		globalUsage |= STENCIL_BACK_MASK_SET;
		gl.stencilMaskSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT, 
			// GLuint
			mask 
		);
		return this;
	}
	unsetWriteMask ( ) {
		if ( globalUsage & STENCIL_FRONT_MASK_SET || globalUsage & STENCIL_BACK_MASK_SET ) {
			globalUsage &= ~STENCIL_MASK_SET;
			gl.stencilMask(
				StencilTest.prototype.frontWriteMask
			);
		}
		return this;
	}

	setOp ( stencilFail = this.frontFail, depthFail = this.frontDepthFail, depthPass = this.frontDepthPass ) {
		globalUsage |= STENCIL_OP_SET;
		gl.stencilOp(
			//GLenum KEEP | ZERO | REPLACE | INCR | INCR_WRAP | DECR | DECR_WRAP | INVERT
			stencilFail,
			// GLenum same
			depthFail,
			// GLenum same
			depthPass
		);
		return this;
	}
	setFrontOp ( stencilFail = this.frontFail, depthFail = this.frontDepthFail, depthPass = this.frontDepthPass ) {
		globalUsage |= STENCIL_FRONT_OP_SET;
		gl.stencilOpSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT,
			// GLenum KEEP | ZERO | REPLACE | INCR |INCR_WRAP | DECR | DECR_WRAP | INVERT
			stencilFail,
			// GLenum same
			depthFail,
			// GLenum same
			depthPass
		);
		return this;
	}
	setBackOp ( stencilFail = this.backFail, depthFail = this.backDepthFail, depthPass = this.backDepthPass ) {
		globalUsage |= STENCIL_BACK_OP_SET;
		gl.stencilOpSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.BACK,
			// GLenum KEEP | ZERO | REPLACE | INCR |INCR_WRAP | DECR | DECR_WRAP | INVERT
			stencilFail,
			// GLenum same
			depthFail,
			// GLenum same
			depthPass
		);
		return this;
	}
	unsetOp ( ) {
		if ( globalUsage & STENCIL_FRONT_OP_SET || globalUsage & STENCIL_BACK_OP_SET) {
			globalUsage &= ~STENCIL_OP_SET;
			gl.stencilOp(
				StencilTest.prototype.frontFail,
				StencilTest.prototype.frontDepthFail,
				StencilTest.prototype.frontDepthPass
			);
		}
		return this;
	}

	get getEnabled()				{ return gl.getParameter( GL.STENCIL_TEST );}
	
	get getBits()					{ return gl.getParameter( GL.STENCIL_BITS );}

	get getFrontFunc()				{ return gl.getParameter( GL.STENCIL_FUNC );}
	get getFrontRef()				{ return gl.getParameter( GL.STENCIL_REF );}
	get getFrontFail()				{ return gl.getParameter( GL.STENCIL_FAIL );}
	get getFrontPassDepthPass()		{ return gl.getParameter( GL.STENCIL_PASS_DEPTH_PASS );}
	get getFrontPassDepthFail()		{ return gl.getParameter( GL.STENCIL_PASS_DEPTH_FAIL );}
	get getFrontValueMask()			{ return gl.getParameter( GL.STENCIL_VALUE_MASK );}
	get getFrontWriteMask()			{ return gl.getParameter( GL.STENCIL_WRITEMASK );}
	
	get getBackFunc()				{ return gl.getParameter( GL.STENCIL_BACK_FUNC );}
	get getBackRef()				{ return gl.getParameter( GL.STENCIL_BACK_REF );}
	get getBackFail()				{ return gl.getParameter( GL.STENCIL_BACK_FAIL );}
	get getBackPassDepthPass()		{ return gl.getParameter( GL.STENCIL_BACK_PASS_DEPTH_PASS );}
	get getBackPassDepthFail()		{ return gl.getParameter( GL.STENCIL_BACK_PASS_DEPTH_FAIL );}
	get getBackValueMask()			{ return gl.getParameter( GL.STENCIL_BACK_VALUE_MASK );}
	get getBackWriteMask()			{ return gl.getParameter( GL.STENCIL_BACK_WRITEMASK );}

	get getFrontFuncFlag()			{ return gl.flags[ this.getFrontFunc ];}
	get getFrontFailFlag()			{ return gl.flags[ this.getFrontFail ];}
	get getFrontPassDepthPassFlag()	{ return gl.flags[ this.getFrontPassDepthPass ];}
	get getFrontPassDepthFailFlag()	{ return gl.flags[ this.getFrontPassDepthFail ];}
	
	get getBackFuncFlag()			{ return gl.flags[ this.getBackFunc ];}
	get getBackFailFlag()			{ return gl.flags[ this.getBackFail ];}
	get getBackPassDepthPassFlag()	{ return gl.flags[ this.getBackPassDepthPass ];}
	get getBackPassDepthFailFlag()	{ return gl.flags[ this.getBackPassDepthFail ];}
}
Properties( StencilTest.prototype, {
	frontFunc 		: GL.ALWAYS,
	frontRef 		: 0,
	frontValueMask 	: ( 1 << 16 ) - 1,
	frontFail 		: GL.KEEP,
	frontDepthFail 	: GL.KEEP,
	frontDepthPass 	: GL.KEEP,
	frontWriteMask 	: ( 1 << 16 ) - 1,
	
	backFunc 		: GL.ALWAYS,
	backRef 		: 0,
	backValueMask 	: ( 1 << 16 ) - 1,
	backFail 		: GL.KEEP,
	backDepthFail 	: GL.KEEP,
	backDepthPass 	: GL.KEEP,
	backWriteMask 	: ( 1 << 16 ) - 1,
}, E | C );


export const polygonOffset 	= new PolygonOffset;
export const alpha 			= new Alpha;
export const depthTest 		= new DepthTest;
export const stencilTest 	= new StencilTest;
export const cullFace 		= new CullFace;
export const scissorTest	= new ScissorTest;
export const dither			= new Dither;
export const sampleCoverage = new SampleCoverage;
export default class Material {
	constructor( ) {
		this.usage 			= 0;
		this.program 		= DEFAULT_PROGRAM;
		this.uniforms 		= this.program.getUniforms.material.instantiate();
	}
	use ( ) {
		let bit = Material;
		let locations = this.uniforms;

		if ( currentProgram !== this.program ) currentProgram = this.program.use();
		if ( currentUniforms !== this.uniforms ) currentUniforms = this.uniforms.set();
		

		if ( this.usage & bit.BLEND_ENABLED ) {
			globalUsage |= bit.BLEND_ENABLED; 
			this.alpha.use();
		} else
		if ( globalUsage & bit.BLEND_ENABLED ) {
			globalUsage &= ~bit.BLEND_ENABLED; 
			gl.disable( GL.BLEND );
		}

		if ( this.usage & bit.CULL_FACE_ENABLED ) {
			globalUsage |= bit.CULL_FACE_ENABLED;
			this.cullFace.use();
		} else
		if ( globalUsage & bit.CULL_FACE_ENABLED ) {
			globalUsage &= ~bit.CULL_FACE_ENABLED; 
			gl.disable( GL.CULL_FACE );
		}

		if ( this.usage & bit.DEPTH_TEST_ENABLED ) {
			globalUsage |= bit.DEPTH_TEST_ENABLED;
			this.depthTest.use();
		} else
		if ( globalUsage & bit.DEPTH_TEST_ENABLED ) {
			globalUsage &= ~bit.DEPTH_TEST_ENABLED;
			gl.disable( GL.DEPTH_TEST );
		}

		if ( this.usage & bit.DITHER_ENABLED ) {
			globalUsage |= bit.DITHER_ENABLED;
			this.dither.use();
		} else
		if ( globalUsage & bit.DITHER_ENABLED ) {
			globalUsage &= ~bit.DITHER_ENABLED;
			gl.disable( GL.DITHER );
		}

		if ( this.usage & bit.POLYGON_OFFSET_FILL_ENABLED ) {
			globalUsage |= bit.POLYGON_OFFSET_FILL_ENABLED;
			this.polygonOffset.use();
		} else
		if ( globalUsage & bit.POLYGON_OFFSET_FILL_ENABLED ) {
			globalUsage &= ~bit.POLYGON_OFFSET_FILL_ENABLED;
			gl.disable( GL.POLYGON_OFFSET_FILL );
		}

		if ( this.usage & bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED ) {
			globalUsage |= bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED;
			this.sampleAlphaToCoverage.use();
		} else
		if ( globalUsage & bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED ) {
			globalUsage &= ~bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED;
			gl.disable( GL.SAMPLE_ALPHA_TO_COVERAGE );
		}

		if ( this.usage & bit.SAMPLE_COVERAGE_ENABLED ) {
			globalUsage |= bit.SAMPLE_COVERAGE_ENABLED;
			this.sampleCoverage.use();
		} else
		if ( globalUsage & bit.SAMPLE_COVERAGE_ENABLED ) {
			globalUsage &= ~bit.SAMPLE_COVERAGE_ENABLED;
			gl.disable( GL.SAMPLE_COVERAGE );
		}

		if ( this.usage & bit.SCISSOR_TEST_ENABLED ) {
			globalUsage |= bit.SCISSOR_TEST_ENABLED;
			this.scissorTest.use();
		} else
		if ( globalUsage & bit.SCISSOR_TEST_ENABLED ) {
			globalUsage &= ~bit.SCISSOR_TEST_ENABLED;
			gl.disable( GL.SCISSOR_TEST );
		}

		if ( this.usage & bit.STENCIL_TEST_ENABLED ) {
			globalUsage |= bit.STENCIL_TEST_ENABLED;
			this.stencilTest.use();
		} else
		if ( globalUsage & bit.STENCIL_TEST_ENABLED ) {
			globalUsage &= ~bit.STENCIL_TEST_ENABLED;
			gl.disable( GL.STENCIL_TEST );
		}

		return this;
	}

	enableAlpha ( ) {
		this.usage |= BLEND_ENABLED;
		if ( this.alpha === undefined ) this.alpha = new Alpha;
		this.alpha.enable();
		return this;
	}
	disableAlpha ( ) {
		this.usage &= ~BLEND_ENABLED;
		this.alpha.disable();
		delete this.alpha;
		return this;
	}
	setAlphaColor ( colorRed = this.alpha.colorRed, colorGreen = this.alpha.colorGreen, colorBlue = this.alpha.colorBlue, colorAlpha = this.alpha.colorAlpha ) {
		this.usage |= BLEND_COLOR_SET;
		Properties( this.alpha, { colorRed, colorGreen, colorBlue, colorAlpha }, E | C );
		this.alpha.setColor();
		return this;
	}
	unsetAlphaColor ( ) {
		if ( this.usage & BLEND_COLOR_SET ) {
			this.usage &= ~BLEND_COLOR_SET;
			delete this.alpha.colorRed;
			delete this.alpha.colorGreen;
			delete this.alpha.colorBlue;
			delete this.alpha.colorAlpha;
		}
		this.alpha.unsetColor();
		return this;
	}
	setAlphaFunc ( srcRGB = this.alpha.srcRGB, dstRGB = this.alpha.dstRGB, srcAlpha = this.alpha.srcAlpha, dstAlpha = this.alpha.dstAlpha ) {
		this.usage |= BLEND_FUNC_SET;
		Properties( this.alpha, { srcRGB, dstRGB, srcAlpha, dstAlpha }, E | C );
		this.alpha.setFunc();
		return this;
	}
	unsetAlphaFunc ( ) {
		if ( this.usage & BLEND_FUNC_SET ) {
			this.usage &= ~BLEND_FUNC_SET;
			delete this.alpha.srcRGB;
			delete this.alpha.dstRGB;
			delete this.alpha.srcAlpha;
			delete this.alpha.dstAlpha;
		}
		this.alpha.unsetFunc();
		return this;
	}
	setAlphaEquation ( modeRGB = this.alpha.modeRGB, modeAlpha = this.alpha.modeAlpha ) {
		this.usage |= BLEND_EQUATION_SET;
		Properties( this.alpha, { modeRGB, modeAlpha }, E | C );
		this.alpha.setEquation();
		return this;
	}
	unsetAlphaEquation ( ) {
		if ( this.usage & BLEND_EQUATION_SET ) {
			this.usage &= ~BLEND_EQUATION_SET;
			delete this.alpha.modeRGB;
			delete this.alpha.modeAlpha;
		}
		this.alpha.unsetEquation();
		return this;
	}

	enableCullFace ( ) {
		this.usage |= CULL_FACE_ENABLED;
		if ( this.cullFace === undefined ) this.cullFace = new CullFace;
		this.cullFace.enable();
		return this;
	}
	disableCullFace ( ) {
		this.usage &= ~CULL_FACE_ENABLED;
		this.cullFace.disable();
		delete this.cullFace;
		return this;
	}
	setCullFace ( mode = this.cullFace.mode ) {
		this.usage |= CULL_FACE_SET;
		Properties( this.cullFace, { mode }, E | C );
		this.cullFace.set();
	}
	unsetCullFace ( ) {
		if ( this.usage & CULL_FACE_SET ) {
			this.usage &= ~CULL_FACE_SET;
			delete this.cullFace.mode;
		}
		this.cullFace.unset();
		return this;
	}
	setCullFaceFront ( front = this.cullFace.front ) {
		this.usage |= CULL_FACE_FRONT_SET;
		Properties( this.cullFace, { front }, E | C );
		this.cullFace.setFront();
		return this;
	}
	unsetCullFaceFront ( ) {
		if ( this.usage & CULL_FACE_FRONT_SET ) {
			this.usage &= ~CULL_FACE_FRONT_SET;
			delete this.culLFace.front;
		}
		this.cullFace.unsetFront();
		return this;
	}

	enableDepth ( ) {
		this.usage |= DEPTH_ENABLED;
		if ( this.depth === undefined ) this.depth = new DepthTest;
		this.depth.enable();
		return this;
	}
	disableDepth ( ) {
		this.usage &= ~DEPTH_ENABLED;
		this.depth.disable();
		delete this.depth;
		return this;
	}
	setDepthWrite ( write = this.depth.write ) {
		this.usage |= DEPTH_WRITE_SET;
		Properties( this.depth, { write }, C | E );
		this.depth.setDepthWrite();
		return this;
	}
	unsetDepthWrite ( ) {
		if ( this.usage & DEPTH_WRITE_SET ) {
			this.usage &= ~DEPTH_WRITE_SET;
			delete this.depth.write;
		}
		this.depth.unsetDepthWrite();
		return this;
	}
	setDepthFunc ( func = this.depth.func ) {
		this.usage |= DEPTH_FUNC_SET;
		Properties( this.depth, { func }, C | E );
		this.depth.setFunc();
		return this;
	}
	unsetDepthFunc ( ) {
		if ( this.usage & DEPTH_FUNC_SET ) {
			this.usage &= ~DEPTH_FUNC_SET;
			delete this.depthTest.func;
		}
		this.depthTest.unsetFunc();
		return this;
	}
	setDepthRange ( zNear = this.depth.zNear, zFar = this.depth.zFar ) {
		this.usage |= DEPTH_RANGE_SET;
		Properties( this.depth, { zNear, zFar }, C | E );
		this.depth.setRange();
		return this;
	}
	unsetDepthRange ( ) {
		if ( this.usage & DEPTH_RANGE_SET ) {
			this.usage &= ~DEPTH_RANGE_SET;
			delete this.depth.zNear;
			delete this.depth.zFar;
		}
		this.depth.unsetRange();
		return this;
	}

	enableDither ( ) {
		this.usage |= DITHER_ENABLED;
		if ( this.dither === undefined ) this.dither = new Dither;
		this.dither.enable();
		return this;
	}
	disableDither ( ) {
		this.usage &= ~DITHER_ENABLED;
		this.dither.disable();
		delete this.dither;
		return this;
	}

	enablePolygonOffset ( ) {
		this.usage |= OFFSET_ENABLED;
		if( this.polygonOffset === undefined ) this.polygonOffset = new PolygonOffset;
		this.polygonOffset.enable();
		return this;
	}
	disablePolygonOffset ( ) {
		this.usage &= ~OFFSET_ENABLED;
		this.polygonOffset.disable();
		delete this.polygonOffset;
		return this;
	}
	setPolygonOffset ( factor = this.polygonOffset.factor, units = this.polygonOffset.units ) {
		this.usage |= OFFSET_SET;
		Properties( this.polygonOffset, { factor, units }, C | E );
		this.polygonOffset.set();
		return this;
	}
	unsetPolygonOffset ( ) {
		if ( this.usage & OFFSET_SET ) {
			this.usage &= ~OFFSET_SET;
			delete this.polygonOffset.factor;
			delete this.polygonOffset.units;
		}
		this.polygonOffset.unset();
		return this;
	}

	enableSampleCoverage ( ) {
		this.usage |= SAMPLE_ENABLED;
		if ( this.sampleCoverage === undefined ) this.sampleCoverage = new SampleCoverage;
		this.sampleCoverage.enable();
		return this;
	}
	disableSampleCoverage ( ) {
		this.usage &= ~SAMPLE_ENABLED;
		this.sampleCoverage.disable();
		delete this.sampleCoverage;
		return this;
	}
	enableAlphaToCoverage ( ) {
		if ( ~this.usage & SAMPLE_ALPHA_ENABLED ) {
			this.usage |= SAMPLE_ALPHA_ENABLED;
		}
		this.sampleCoverage.enableAlpha();
		return this;
	}
	disableAlphaToCoverage ( ) {
		if ( this.usage & SAMPLE_ALPHA_ENABLED ) {
			this.usage &= ~SAMPLE_ALPHA_ENABLED;
		}
		this.sampleCoverage.disableAlpha();
		return this;
	}
	setSampleCoverge ( value = this.sample.value, invert = this.sample.invert ) {
		this.usage |= SAMPLE_SET;
		Properties( this.sampleCoverage, { value, invert }, C | E );
		this.sampleCoverage.set();
		return this;
	}
	unsetSampleCoverage ( ) {
		if ( this.usage & SAMPLE_SET ) {
			this.usage &= ~SAMPLE_SET;
			delete this.sampleCoverage.value;
			delete this.sampleCoverage.invert;
		}
		this.sampleCoverage.unset();
		return this;
	}

	enableScissorTest ( ) {
		this.usage |= SCISSOR_ENABLED;
		if ( this.scissorTest === undefined ) this.scissorTest = new ScissorTest;
		this.scissorTest.enable();
		return this;
	}
	disableScissorTest ( ) {
		this.usage &= ~SCISSOR_ENABLED;
		this.scissorTest.disable();
		delete this.scissorTest;
		return this;
	}
	setScissor ( x = this.scissor.x, y = this.scissor.y, width = this.scissor.width, height = this.scissor.height ) {
		this.usage |= SCISSOR_SET;
		Properties( this.scissor, { x, y, width, height }, E | C );
		this.scissor.set();
		return this;
	}
	unsetScissor ( ) {
		if ( this.usage & SCISSOR_SET ) {
			this.usage &= ~SCISSOR_SET;
			delete this.scissor.x;
			delete this.scissor.y;
			delete this.scissor.width;
			delete this.scissor.height;
		}
		this.scissor.unset();
		return this;
	}

	enableStencilTest ( ) {
		this.usage |= STENCIL_ENABLED;
		if ( this.stencil === undefined ) this.stencil = new Stencil;
		this.stencil.enable();
		return this;
	}
	disableStencilTest ( ) {
		this.usage &= ~STENCIL_ENABLED;
		this.stencil.disable();
		delete this.stencil;
		return this;
	}
	setStencilFunc ( frontFunc = this.stencil.frontFunc, frontRef = this.stencil.frontRef, frontMask = this.stencil.frontValueMask ) {
		this.usage |= STENCIL_FUNC_SET;
		Properties( this.stencil, { frontFunc, frontRef, frontMask }, E | C );
		this.stencil.setFunc();
		return this;
	}
	setStencilFrontFunc ( frontFunc = this.stencil.frontFunc, frontRef = this.stencil.frontRef, frontMask = this.stencil.frontValueMask ) {
		this.usage |= STENCIL_FRONT_FUNC_SET;
		Properties( this.stencil, { frontFunc, frontRef, frontMask }, E | C );
		this.stencil.setFrontFunc();
		return this;
	}
	setStencilBackFunc ( backFunc = this.stencil.backFunc, backRef = this.stencil.backRef, backMask = this.stencil.backValueMask ) {
		this.suage |= STENCIL_BACK_FUNC_SET;
		Properties( this.stencil, { backFunc, backRef, backMask }, E | C );
		this.stencil.setBackFunc();
		return this;
	}
	unsetStencilFunc ( ) {
		if ( this.usage & STENCIL_FRONT_FUNC_SET || this.usage & STENCIL_BACK_FUNC_SET ) {
			this.usage & ~STENCIL_FUNC_SET;
			delete this.stencil.frontFunc;
			delete this.stencil.frontRef;
			delete this.stencil.frontMask;
			delete this.stencil.backFunc;
			delete this.stencil.backRef;
			delete this.stencil.backMask;
		}
		this.stentil.unsetFunc();
		return this;
	}
	setStencilWriteMask ( frontWriteMask = this.stencil.frontWriteMask ) {
		this.usage |= STENCIL_MASK_SET;
		Properties( this.stencil, { frontWriteMask }, C | E );
		this.stencil.setWriteMask();
		return this;
	}
	setStencilFrontWriteMask ( frontWriteMask = this.stencil.frontWriteMask ) {
		this.usage |= STENCIL_FRONT_MASK_SET;
		Properties( this.stencil, { frontWriteMask }, C | E );
		this.stencil.setFrontWriteMask();
		return this;
	}
	setStencilBackWriteMask ( backWriteMask = this.stencil.backWriteMask ) {
		this.usage |= STENCIL_BACK_MASK_SET;
		Properties( this.stencil, { backWriteMask }, C | E );
		this.stencil.setBackWriteMask();
		return this;
	}
	unsetStencilWriteMask ( ) {
		if ( this.usage & STENCIL_FRONT_MASK_SET || this.usage & STENCIL_BACK_MASK_SET ) {
			this.usage &= ~STENCIL_MASK_SET;
			delete this.stencil.frontWriteMask;
			delete this.stencil.backWriteMask;
		}
		this.stencil.unsetWriteMask();
		return this;
	}
	setStencilOp ( frontFail = this.stencil.frontFail, frontDepthFail = this.stencil.frontDepthFail, frontDepthPass = this.stencil.frontDepthPass ) {
		this.usage |= STENCIL_OP_SET;
		Properties( this.stencil, { frontFail, frontDepthFail, frontDepthPass }, C | E );
		this.stencil.setOp();
		return this;
	}
	setStencilFrontOp ( frontFail = this.stencil.frontFail, frontDepthFail = this.stencil.frontDepthFail, frontDepthPass = this.stencil.frontDepthPass ) {
		this.usage |= STENCIL_FRONT_OP_SET;
		Properties( this.stencil, { frontFail, frontDepthFail, frontDepthPass }, C | E );
		this.stencil.setFrontOp();
		return this;
	}
	setStencilBackOp ( backFail = this.stencil.backFail, backDepthFail = this.stencil.backDepthFail, backDepthPass = this.stencil.backDepthPass ) {
		this.usage |= STENCIL_BACK_OP_SET;
		Properties( this.stencil, { backFail, backDepthFail, backDepthPass }, C | E );
		this.stencil.setBackOp();
		return this;
	}
	unsetStencilOp ( ) {
		if ( this.usage & STENCIL_FRONT_OP_SET || this.usage & STENCIL_BACK_OP_SET) {
			this.usage &= ~STENCIL_OP_SET;
			delete this.stencil.frontFail;
			delete this.stencil.frontDepthFail;
			delete this.stencil.frontDepthPass;
			delete this.stencil.BackFail;
			delete this.stencil.BackDepthFail;
			delete this.stencil.BackDepthPass;
		}
		this.stencil.unsetOp();
		return this;
	}
}
Properties( Material, {
	
}, E | C );