import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL, canvas } from "../webgl/Context.js";
import Program from "../webgl/Program.js";
import Shader from "../webgl/Shader.js";

import { mat2, mat3, mat4, vec2, vec3, vec4, quat4 } from "../math/math.js";

var globalUsage = 0;

export class Dither {
	constructor( ) { 
	}
	enable ( ) {
		Dither.enable();
		this.enabled = true;
		return this;
	}
	disable ( ) {
		Dither.disable();
		this.enabled = false;
		return this;
	}
	static enable ( ) {
		if ( !Dither.enabled ) {
			Dither.enabled = true;
			gl.enable( GL.DITHER_TEST );
		}
		return Dither;
	}
	static disable ( ) {
		if ( Dither.enabled ) {
			Dither.enabled = false;
			gl.disable( GL.DITHER_TEST );
		}
		return Dither;
	}
	static get getEnabled ( ) { return gl.getParameter( GL.DITHER ); }
}
Properties( Dither, {

	enabled			: false,	
}, E | C | W );

export class Multisample {
	constructor ( value, invert ) {
		if ( value !== undefined ) this.setCoverage( value, invert );
	}
	enable ( ) {
		this.enabled = true;
		Multisample.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		Multisample.disable();
		return this;
	}
	enableAlpha ( ) {
		this.alphaEnabled = true;
		Multisample.enableAlpha();
		return this;
	}
	disableAlpha ( ) {
		this.alphaEnabled = false;
		Multisample.disableAlpha();
		return this;
	}
	setCoverage ( value, invert ) {
		this.coverageSet = true;
		if ( value ) this.value = value;
		if ( invert ) this.invert = invert;
		Multisample.setCoverage( this.value, this.invert );
	}
	unsetCoverage ( ) {
		this.coverageSet = false;
		Multisample.unsetCoverage();
		return this;
	}
	static enable ( ) {
		if ( !Multisample.enabled ) {
			Multisample.enabled = true;
			gl.enable( GL.SAMPLE_COVERAGE );
		}
		return Multisample;
	}
	static disable ( ) {
		if ( Multisample.enabled ) {
			Multisample.enabled = false;
			gl.disable( GL.SAMPLE_COVERAGE );
		}
		return Multisample;
	}
	static enableAlpha ( ) {
		if ( !Multisample.alphaEnabled ) {
			Multisample.alphaEnabled = true;
			gl.enable( GL.SAMPLE_ALPHA_TO_COVERAGE );
		}
		return Multisample;
	}
	static disableAlpha ( ) {
		if ( Multisample.alphaEnabled ) {
			Multisample.alphaEnabled = false;
			gl.disable( GL.SAMPLE_ALPHA_TO_COVERAGE );
		}
		return Multisample;
	}
	static setCoverage ( value = Multisample.value, invert = Multisample.invert ) {
		Multisample.coverageSet = true;
		gl.sampleCoverage(
			//GLclampf
			value,
			//GLboolean
			invert
		);
		return Multisample;
	}
	static unsetCoverage ( ) {
		if( Multisample.coverageSet ) {
			Multisample.coverageSet = false;
			gl.sampleCoverage(
				//GLclampf
				Multisample.value,
				//GLboolean
				Multisample.invert
			);
		}
		return Multisample;
	}
	get getSampleBuffers()			{ return gl.getParameter( GL.SAMPLE_BUFFERS );}
	get getInvert()					{ return gl.getParameter( GL.SAMPLE_COVERAGE_INVERT );}
	get getValue()					{ return gl.getParameter( GL.SAMPLE_COVERAGE_VALUE );}
	get getSamples()				{ return gl.getParameter( GL.SAMPLES );}
}
Properties( Multisample, {
	enabled			: false,
	alphaEnabled	: false,
	coverageSet		: false,
	value 			: 1,
	invert 			: GL.FALSE,
}, E | C | W );

export class ScissorTest {
	constructor ( x, y, width, height ) {
		if ( x !== undefined ) this.set( x, y, width, height );
	}
	enable ( ) {
		this.enabled = true;
		ScissorTest.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		ScissorTest.disable();
		return this;
	}
	setDimensions ( x, y, width, height ) {
		this.dimensionsSet = true;
		if ( x !== undefined ) this.x = x;
		if ( y !== undefined ) this.y = y;
		if ( width !== undefined ) this.width = width;
		if ( height !== undefined ) this.height = height;
		ScissorTest.setDimensions( this.x, this.y, this.width, this.height );
		return this;
	}
	unset ( ) {
		this.dimensionsSet = false;
		ScissorTest.unset();
		return this;
	}
	static enable ( ) {
		if ( !ScissorTest.enabled ) {
			ScissorTest.enabled = true;
			gl.enable( GL.SCISSOR_TEST );
		}
		return ScissorTest;
	}
	static disable ( ) {
		if ( ScissorTest.enabled ) {
			ScissorTest.enabled = false;
			gl.disable( GL.SCISSOR_TEST );
		}
		return ScissorTest;
	}
	static setDimensions ( x = ScissorTest.x, y = ScissorTest.y, width = ScissorTest.width, height = ScissorTest.height ) {
		ScissorTest.dimensionsSet = true;
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
		return ScissorTest;
	}
	static unset ( ) {
		if ( ScissorTest.dimensionsSet ) {
			ScissorTest.dimensionsSet = false;
			gl.scissor(
				ScissorTest.x,
				ScissorTest.y,
				ScissorTest.width,
				ScissorTest.height
			);
		}
		return ScissorTest;
	}
	get getEnabled()				{ return gl.getParameter( GL.SCISSOR_TEST );}
	get getScissorBox()				{ return gl.getParameter( GL.SCISSOR_BOX );}
}
Properties( ScissorTest, {
	enabled			: false,
	dimensionsSet	: false,
	x 				: 0,
	y 				: 0,
	width 			: canvas.clientWidth,
	height 			: canvas.clientHeight
}, E | C | W );

export class Alpha {
	constructor ( rgbFunc, alphaFunc, equation, red, green, blue, alpha ) {
		if ( red !== undefined ) this.setColor( red, green, blue, alpha );
		if ( rgbFunc !== undefined ) this.setFunc( rgbFunc, alphaFunc, rgbFunc, alphaFunc );
		if ( equation !== undefined ) this.setEquation( equation );
	}
	enable ( ) {
		this.enabled = true;
		Alpha.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		Alpha.disable();
		return this;
	}
	setColor ( red, green, blue, alpha ) {
		this.colorSet = true;
		if ( red !== undefined ) this.red = red;
		if ( green !== undefined ) this.green = green;
		if ( blue !== undefined ) this.blue = blue;
		if ( alpha !== undefined ) this.alpha = alpha;
		Alpha.setColor( this.red, this.green, this.blue, this.alpha );
		return this;
	}
	unsetColor ( ) {
		this.colorSet = false;
		Alpha.unsetColor();
		return this;
	}
	setFunc ( srcRGB, dstRGB, srcAlpha, dstAlpha ) {
		this.funcSet = true;
		if ( srcRGB 	!== undefined )	this.srcRGB 	= srcRGB;
		if ( dstRGB 	!== undefined )	this.dstRGB 	= dstRGB;
		if ( srcAlpha 	!== undefined )	this.srcAlpha 	= srcAlpha;
		if ( dstAlpha 	!== undefined )	this.dstAlpha 	= dstAlpha;
		Alpha.setFunc( this.srcRGB, this.dstRGB, this.srcAlpha, this.dstAlpha );
		return this;
	}
	unsetFunc ( ) {
		this.funcSet = false;
		Alpha.unsetFunc();
		return this;
	}
	setEquation ( modeRGB, modeAlpha ) {
		this.equationSet = true;
		if ( modeRGB ) this.modeRGB = modeRGB;
		if ( modeAlpha ) this.modeAlpha = modeAlpha;
		Alpha.setEquation( this.modeRGB, this.modeAlpha );
		return this;
	}
	unsetEquation ( ) {
		this.equationSet = false;
		Alpha.unsetEquation;
		return this;
	}
	static enable ( ) {
		if ( !Alpha.enabled ) {
			Alpha.enabled = true;
			gl.enable( GL.BLEND );
		}
		return Alpha;
	}
	static disable ( ) {
		if ( Alpha.enabled ) {
			Alpha.enabled = false;
			gl.disable( GL.BLEND );
		}
		return Alpha;
	}
	static setColor ( red = Alpha.colorRed, green = Alpha.colorGreen, blue = Alpha.colorBlue, alpha = Alpha.colorAlpha ) {
		Alpha.colorSet = true;
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
	static unsetColor ( ) {
		if ( Alpha.colorSet ) {
			Alpha.colorSet = false;
			gl.blendColor(
				Alpha.colorRed,
				Alpha.colorGreen,
				Alpha.colorBlue,
				Alpha.colorAlpha 
			);
		}
		return Alpha;
	}
	static setFunc ( srcRGB = Alpha.srcRGB, dstRGB = Alpha.dstRGB, srcAlpha = Alpha.srcAlpha, dstAlpha = Alpha.dstAlpha ) {
		Alpha.funcSet = true;
		//  all combos of [ ONE_MINUS ?] _ [ SRC | DST | CONSTANT ] _ [ COLOR | ALPHA ]
		gl.blendFuncSeparate(
			//GLenum ZERO | ONE | SRC_ALPHA_SATURATE + combos
			srcRGB,
			//GLenum ZERO | ONE + combos
			dstRGB,
			//GLenum accepts same as srcRGB
			srcAlpha,
			//GLenum accepts same as dstRGB
			dstAlpha
		);
		return Alpha;
	}
	static unsetFunc ( ) {
		if ( Alpha.funcSet ) {
			Alpha.funcSet = false;
			gl.blendFuncSeparate(
				Alpha.srcRGB,
				Alpha.dstRGB,
				Alpha.srcAlpha,
				Alpha.dstAlpha
			);
		}
		return Alpha;
	}
	static setEquation ( modeRGB = Alpha.modeRGB, modeAlpha = Alpha.modeAlpha ) {
		Alpha.equationSet = true;
		gl.blendEquationSeparate(
			//GLenum FUNC_ADD | FUNC_SUBTRACT | FUNC_REVERSE_SUBTRACT
			modeRGB,
			//GLenum same
			modeAlpha
		);
		return Alpha;
	}
	static unsetEquation ( ) {
		if ( Alpha.equationSet ) {
			Alpha.equationSet = false;
			gl.blendEquationSeparate(
				Alpha.modeRGB,
				Alpha.modeAlpha
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
Properties( Alpha, {
	enabled		: false,
	colorSet	: false,
	funcSet		: false,
	equationSet	: false,
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
}, E | C | W );
Properties( Alpha, {
	EQ_ADD						: GL.FUNC_ADD,
	EQ_SUBTRACT 				: GL.FUNC_SUBTRACT,
	EQ_REVERSE_SUBTRACT 		: GL.FUNC_REVERSE_SUBTRACT,
	FN_ZERO						: GL.ZERO,
	FN_ONE						: GL.ONE,
	FN_SRC_COLOR				: GL.SRC_COLOR,
	FN_DST_COLOR				: GL.DST_COLOR,
	FN_SRC_ALPHA				: GL.SRC_ALPHA,
	FN_DST_ALPHA				: GL.DST_ALPHA,
	FN_CONSTANT_COLOR			: GL.CONSTANT_COLOR,
	FN_CONSTANT_ALPHA			: GL.CONSTANT_ALPHA,
	FN_SRC_ALPHA_SATURATE		: GL.SRC_ALPHA_SATURATE,
	FN_ONE_MINUS_SRC_COLOR 		: GL.ONE_MINUS_SRC_COLOR,
	FN_ONE_MINUS_DST_COLOR		: GL.ONE_MINUS_DST_COLOR,
	FN_ONE_MINUS_SRC_ALPHA		: GL.ONE_MINUS_SRC_ALPHA,
	FN_ONE_MINUS_DST_ALPHA		: GL.ONE_MINUS_DST_ALPHA,
	FN_ONE_MINUS_CONSTANT_COLOR : GL.ONE_MINUS_CONSTANT_COLOR,
	FN_ONE_MINUS_CONSTANT_ALPHA : GL.ONE_MINUS_CONSTANT_ALPHA
}, E );

export class DepthTest {
	constructor ( write, func, zNear, zFar ) {
		if ( write ) this.enableWrite();
		if ( func !== undefined ) this.setFunc( func );
		if ( zNear !== undefined ) this.setRange( zNear, zFar );
	}
	enable ( ) {
		this.enabled = true;
		DepthTest.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		DepthTest.disable();
		return this;
	}
	enableWrite ( ) {
		this.writeEnabled = true;
		DepthTest.enableWrite();
		return this;
	}
	disableWrite ( ) {
		this.writeEnabled = false;
		DepthTest.disableWrite();
		return this;
	}
	setFunc ( func ) {
		this.funcSet = true;
		if ( func !== undefined ) this.func = func;
		DepthTest.setFunc( this.func );
		return this;
	}
	unsetFunc ( ) {
		this.funcSet = false;
		DepthTest.unsetFunc( );
		return this;
	}
	setRange ( zNear, zFar ) {
		this.rangeSet = true;
		if ( zNear !== undefined ) this.zNear = zNear;
		if ( zFar !== undefined ) this.zFar = zFar;
		DepthTest.setRange( this.zNear, this.zFar );
		return this;
	}
	unsetRange ( ) {
		this.rangeSet = false;
		DepthTest.unsetRange();
		return this;
	}
	static enable ( ) {
		if ( DepthTest.enabled === false ) {
			DepthTest.enabled = true;
			gl.enable( GL.DEPTH_TEST );
		}
		return DepthTest;
	}
	static disable ( ) {
		if ( DepthTest.enabled === true ) {
			DepthTest.enabled = false;
			gl.disable( GL.DEPTH_TEST );
		}
		return DepthTest;
	}
	static enableWrite ( ) {
		if ( DepthTest.writeEnabled === false ) {
			DepthTest.writeEnabled = true;
			gl.depthMask( true );
		}
		return DepthTest;
	}
	static disableWrite ( ) {
		if ( DepthTest.writeEnabled === true ) {
			DepthTest.writeEnabled = false;
			gl.depthMask( false );
		}
		return DepthTest;
	}
	static setFunc ( func = DepthTest.func ) {
		DepthTest.funcSet;
		gl.depthFunc(
			//GLenum NEVER | LESS | EQUAL | LEQUAL | GREATER | NOTEQUAL | GEEQUAL | ALWAYS
			func
		);
		return DepthTest;
	}
	static unsetFunc ( ) {
		if ( DepthTest.funcSet ) {
			DepthTest.funcSet = false;
			gl.depthFunc(
				DepthTest.func
			);
		}
		return DepthTest;
	}
	static setRange ( zNear = DepthTest.zNear, zFar = DepthTest.zFar ) {
		DepthTest.rangeSet = true;
		gl.depthRange(
			//GLclampf
			zNear,
			//GLclampf
			zFar
		);
		return DepthTest;
	}
	static unsetRange ( ) {
		if ( DepthTest.rangeSet ) {
			DepthTest.rangeSet = false;
			gl.depthRange(
				DepthTest.zNear,
				DepthTest.zFar
			);
		}
		return DepthTest;
	}
	get getEnabled()		{ return gl.getParameter( GL.DEPTH_TEST );}
	get getFunc()			{ return gl.getParameter( GL.DEPTH_FUNC );}
	get getRange()			{ return gl.getParameter( GL.DEPTH_RANGE );}
	get getWrite()			{ return gl.getParameter( GL.DEPTH_WRITEMASK );}
	get getFuncFlag()		{ return gl.flags[ this.getFunc ];}
}
Properties( DepthTest, {
	enabled			: false,
	writeEnabled	: false,
	funcSet 		: false,
	rangeSet		: false,
	func 	 		: GL.LESS,
	zNear			: 0,
	zFar			: 1,
}, E | C | W );
Properties( DepthTest, {
	FN_NEVER		: GL.NEVER,
	FN_LESS			: GL.LESS,
	FN_EQUAL		: GL.EQUAL,
	FN_LEQUAL		: GL.LEQUAL,
	FN_GREATER		: GL.GREATER,
	FN_NOTEQUAL		: GL.NOTEQUAL,
	FN_GEQUAL		: GL.GEQUAL,
	FN_ALWAYS		: GL.ALWAYS
}, E );

export class PolygonOffset {
	constructor ( factor, units ) {
		if ( factor !== undefined ) this.setFill( factor, units );
	}
	enable ( ) {
		this.enabled = true;
		PolygonOffset.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		PolygonOffset.disable();
		return this;
	}
	setFill ( factor, units ) {
		this.fillSet = true;
		if ( factor !== undefined ) this.factor = factor;
		if ( units !== undefined ) this.units = units;
		PolygonOffset.setFill( this.factor, this.units );
		return this;
	}
	unsetFill ( ) {
		this.fillSet = false;
		PolygonOffset.unsetFill();
		return this;
	}
	static enable ( ) {
		if ( !PolygonOffset.enabled ) {
			PolygonOffset.enabled = true;
			gl.enable( GL.POLYGON_OFFSET_FILL );
		}
		return PolygonOffset;
	}
	static disable ( ) {
		if ( PolygonOffset.enabled ) {
			PolygonOffset.enabled = false;
			gl.disable( GL.POLYGON_OFFSET_FILL );
		}
		return PolygonOffset;
	}
	static setFill ( factor = PolygonOffset.factor, units = PolygonOffset.units ) {
		PolygonOffset.fillSet = true;
		gl.polygonOffset(
			//GLfloat
			factor,
			//GLfloat
			units
		);
		return PolygonOffset;
	}
	static unsetFill ( ) {
		if ( PolygonOffset.fillSet ) {
			PolygonOffset.fillSet = false;
			gl.polygonOffset(
				PolygonOffset.factor,
				PolygonOffset.units
			);
		}
		return PolygonOffset;
	}
	get getEnabled()		{ return gl.getParameter( GL.POLYGON_OFFSET_FILL );}
	get getFactor()			{ return gl.getParameter( GL.POLYGON_OFFSET_FACTOR );}
	get getUnits()			{ return gl.getParameter( GL.POLYGON_OFFSET_UNITS );}
}
Properties( PolygonOffset, {
	enabled : false,
	fillSet	: false,
	factor	: 0,
	units	: 0
}, E | C | W );

export class CullFace {
	constructor ( mode, front ) {
		if ( mode !== undefined ) this.setMode( mode );
		if ( front !== undefined ) this.setFront( front );
	}
	enable ( ) {
		this.enabled = true;
		CullFace.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		CullFace.disable();
		return this;
	}
	setMode ( mode ) {
		this.modeSet = true;
		if ( mode !== undefined ) this.mode = mode;
		CullFace.setMode( this.mode );
		return this;
	}
	unsetMode ( ) {
		this.modeSet = false;
		CullFace.unsetMode();
		return this;
	}
	setFront ( front ) {
		this.frontSet = true;
		if ( front !== undefined ) this.front = front;
		CullFace.setFront( this.front );
		return this;
	}
	unsetFront ( ) {
		this.frontSet = false;
		CullFace.unsetFront();
		return this;
	}
	static enable ( ) {
		if ( !CullFace.enabled ) {
			CullFace.enabled = true;
			gl.enable( GL.CULL_FACE );
		}
		return CullFace;
	}
	static disable ( ) {
		if ( CullFace.enabled ) {
			CullFace.enabled = false;
			gl.disable( GL.CULL_FACE );
		}
		return CullFace;
	}
	static setMode ( mode = CullFace.mode ) {
		CullFace.modeSet = true;
		gl.cullFace( 
			//GLenum FRONT | BACK | FRONT_AND_BACK
			mode
		);
		return CullFace;
	}
	static unsetMode ( ) {
		if ( CullFace.modeSet ) {
			CullFace.modeSet = false;
			gl.cullFace(
				CullFace.mode
			);
		}
		return CullFace;
	}
	static setFront ( front = CulLFace.front ) {
		CullFace.frontSet = true;
		gl.frontFace( 
			//GLenum CW | CCW
			front
		); 
		return CullFace; 
	}
	static unsetFront ( ) {
		if ( CullFace.fronSet ) {
			CullFace.frontSet = false;
			gl.frontFace(
				CullFace.front
			);
		}
		return CullFace;
	}
	get getEnabled()		{ return gl.getParameter( GL.CULL_FACE );}
	get getFront()			{ return gl.getParameter( GL.FRONT_FACE );}
	get getMode()			{ return gl.getParameter( GL.CULL_FACE_MODE );}
	get getFrontFlag()		{ return gl.flags[ this.getFront ];}
	get getModeFlag()		{ return gl.flags[ this.getMode ];}
}
Properties( CullFace, {
	enabled : false,
	modeSet : false,
	frontSet: false,
	mode 	: GL.FRONT,
	front 	: GL.CCW
}, E | C | W );
Properties( CullFace, {
	MD_FRONT			: GL.FRONT,
	MD_BACK				: GL.BACK,
	MD_FRONT_AND_BACK 	: GL.FRONT_AND_BACK,
	FR_CW				: GL.CW,
	FR_CCW				: GL.CCW
}, E );

export class StencilTest {
	enable ( ) {
		this.enabled = true;
		StencilTest.enable();
		return this;
	}
	disable ( ) {
		this.enabled = false;
		StencilTest.disable();
		return this;
	}
	setFunc ( func, ref, mask ) {
		this.frontFuncSet = true;
		this.backFuncSet = true;
		if ( func !== undefined ) this.func = func;
		if ( ref !== undefined ) this.ref = ref;
		if ( mask !== undefined ) this.mask = mask;
		StencilTest.setFunc( this.func, this.ref, this.mask );
		return this;
	}
	setFrontFunc ( func, ref, mask ) {
		this.frontFuncSet = true;
		if ( func !== undefined ) this.frontFunc = func;
		if ( ref !== undefined ) this.frontRef = ref;
		if ( mask !== undefined ) this.frontMask = mask;
		StencilTest.setFrontFunc( this.frontFunc, this.frontRef, this.frontMask );
		return this;
	}
	setBackFunc ( func, ref, mask ) {
		this.backFuncSet = true;
		if ( func !== undefined ) this.backFunc = func;
		if ( ref !== undefined ) this.backRef = ref;
		if ( mask !== undefined ) this.backMask = mask;
		StencilTest.setBackFunc( this.backFunc, this.backRef, this.backMask );
		return this;
	}
	unsetFunc ( ) {
		this.frontFuncSet = false;
		this.backFuncSet = false;
		StencilTest.unsetFunc();
		return this;
	}
	setWriteMask ( mask ) {
		this.frontMaskSet = true;
		this.backMaskSet = true;
		if ( mask !== undefined ) this.writeMask = mask;
		StencilTest.setWriteMask( this.writeMask );
		return this;
	}
	setFrontWriteMask ( mask ) {
		this.frontMaskSet = true;
		if ( mask !== undefined ) this.frontWriteMask = mask;
		Stenciltest.setFrontWriteMask( this.frontWriteMask );
		return this;
	}
	setBackWriteMask ( mask ) {
		this.backWriteMaskSet = true;
		if ( mask !== undefined ) this.backWriteMask = mask;
		StencilTest.setBackWriteMask( this.backWriteMask );
		return this;
	}
	unsetWriteMask ( ) {
		this.frontMaskSet = false;
		this.backMaskSet = false;
		StencilTest.unsetWriteMask();
		return this;
	}
	setOp ( stencilFail, depthFail, depthPass ) {
		this.frontOpSet = true;
		this.backOpSet = true;
		if ( stencilFail !== undefined ) this.stencilFail = stencilFail;
		if ( depthFail !== undefined ) this.depthFail = depthFail;
		if ( depthPass !== undefined ) this.depthPass = depthPass;
		StencilTest.setOp( this.stencilFail, this.depthFail, this.depthPass );
		return this;
	}
	setFrontOp ( stencilFail, depthFail, depthPass ) {
		this.frontOpSet = true;
		if ( stencilFail !== undefined ) this.frontStencilFail = stencilFail;
		if ( depthFail !== undefined ) this.frontDepthFail = depthFail;
		if ( depthPass !== undefined ) this.frontDepthPass = depthPass;
		StencilTest.setFrontOp( this.frontStencilFail, this.frontDepthFail, this.frontDepthPass );
		return this;
	}
	setBackOp ( stencilFail, depthFail, depthPass ) {
		this.backOpSet = true;
		if ( stencilFail !== undefined ) this.backStencilFail = stencilFail;
		if ( depthFail !== undefined ) this.backDepthFail = depthFail;
		if ( depthPass !== undefined ) this.backDepthPass = depthPass;
		StencilTest.setBackOp( this.backStencilFail, this.backDepthFail, this.backDepthPass );
		return this;
	}
	unsetOp ( ) {
		this.frontOpSet = false;
		this.backOpSet = false;
		StencilTest.unsetOp();
		return this;
	}
	static enable ( ) {
		if ( !StencilTest.enabled ) {
			StencilTest.enabled = true;
			gl.enable( GL.STENCIL_TEST );
		}
		return StencilTest;
	}
	static disable ( ) {
		if ( StencilTest.enabled ) {
			StencilTest.enabled = false;
			gl.disable( GL.STENCIL_TEST );
		}
		return StencilTest;
	}
	static setFunc ( func = StencilTest.func, ref = StencilTest.ref, mask = StencilTest.valueMask ) {
		StencilTest.frontFuncSet = true;
		StencilTest.backFuncSet = true;
		gl.stencilFunc(
			func,
			ref,
			mask
		);
		return StencilTest;
	}
	static setFrontFunc ( func = StencilTest.frontFunc, ref = StencilTest.frontRef, mask = StencilTest.frontValueMask ) {
		StencilTest.frontFuncSet = true;
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
		return StencilTest;
	}
	static setBackFunc( func = StencilTest.backFunc, ref = StencilTest.backRef, mask = StencilTest.backValueMask ) {
		StencilTest.backFuncSet = true;
		gl.stencilFuncSeparate(
			GL.BACK,
			func,
			ref,
			mask
		);
		return StencilTest;
	}
	static unsetFunc ( ) {
		if ( StencilTest.frontFuncSet || StencilTest.backFuncSet ) {
			StencilTest.frontFuncSet = false;
			StencilTest.backFuncSet = false;
			gl.stencilFunc(
				StencilTest.func,
				StencilTest.ref,
				StencilTest.valueMask
			);
		}
		return StencilTest;
	}
	static setWriteMask ( mask = StencilTest.frontWriteMask ) {
		StencilTest.frontMaskSet = true;
		StencilTest.backMaskSet	= true;
		gl.stencilMask( 
			// GLuint
			mask 
		);
		return StencilTest;
	}
	static setFrontWriteMask ( mask = StencilTest.frontWriteMask ) {
		StencilTest.frontMaskSet = true;
		gl.stencilMaskSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT, 
			// GLuint
			mask 
		);
		return StencilTest;
	}
	static setBackWriteMask ( mask = StencilTest.backWriteMask ) {
		StencilTest.backMaskSet = true;
		gl.stencilMaskSeparate(
			// GLenum FRONT | BACK |FRONT_AND_BACK
			GL.FRONT, 
			// GLuint
			mask 
		);
		return StencilTest;
	}
	static unsetWriteMask ( ) {
		if ( StencilTest.frontMaskSet || StencilTest.backMaskSet ) {
			StencilTest.frontMaskSet = false;
			StencilTest.backMaskSet = false;
			gl.stencilMask(
				StencilTest.writeMask
			);
		}
		return StencilTest;
	}
	static setOp ( stencilFail = StencilTest.frontFail, depthFail = StencilTest.frontDepthFail, depthPass = StencilTest.frontDepthPass ) {
		StencilTest.frontOpSet = true;
		StencilTest.backOpSet = true;
		gl.stencilOp(
			/*GLenum 
				KEEP : Keeps current value
				ZERO : Sets the stencil buffer value to 0
				REPLACE : Sets the stencil buffer to ref, as specified in stencilFunc
				INCR : Increments the current stencil buffer value. Clamps to the maximum representable unsigned value.
				INCR_WRAP : Incremenets the current stencil buffer value. Wraps stencil buffer value to zero when incrementing the maximum representable value.
				DECR : Decrements the current stencil buffer value. Clamps to 0.
				DECR_WRAP : Decrements the current stencil buffer value. Wraps stencil buffer value to the maximum representable unsigned value when decrementing a stencil buffer value of zero.
				INVERT : Bitwise inverts the current stencil buffer value.
			*/
			stencilFail,
			// GLenum same
			depthFail,
			// GLenum same
			depthPass
		);
		return StencilTest;
	}
	static setFrontOp ( stencilFail = StencilTest.frontFail, depthFail = StencilTest.frontDepthFail, depthPass = StencilTest.frontDepthPass ) {
		StencilTest.frontOpSet = true;
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
		return StencilTest;
	}
	static setBackOp ( stencilFail = StencilTest.backFail, depthFail = StencilTest.backDepthFail, depthPass = StencilTest.backDepthPass ) {
		StencilTest.backOpSet = true;
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
		return StencilTest;
	}
	static unsetOp ( ) {
		if ( StencilTest.frontOpSet || StencilTest.backOpSet ) {
			StencilTest.frontOpSet = false;
			StencilTest.backOpSet = false;
			gl.stencilOp(
				StencilTest.fail,
				StencilTest.depthFail,
				StencilTest.depthPass
			);
		}
		return StencilTest;
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
Properties( StencilTest, {
	enabled			: false,

	frontFuncSet	: false,
	frontOpSet		: false,
	frontMaskSet	: false,

	backFuncSet		: false,
	backOpSet		: false,
	backMaskSet		: false,

	func			: GL.ALWAYS,
	ref				: 0,
	valueMask		: ( 1 << 16 ) - 1,
	writeMask		: ( 1 << 16 ) - 1,
	stencilfail		: GL.KEEP,
	depthFail		: GL.KEEP,
	depthPass		: GL.KEEP,


	frontFunc 		: GL.ALWAYS,
	frontRef 		: 0,
	frontValueMask 	: ( 1 << 16 ) - 1,
	frontWriteMask 	: ( 1 << 16 ) - 1,
	frontStencilFail: GL.KEEP,
	frontDepthFail 	: GL.KEEP,
	frontDepthPass 	: GL.KEEP,
	
	backFunc 		: GL.ALWAYS,
	backRef 		: 0,
	backValueMask 	: ( 1 << 16 ) - 1,
	backWriteMask 	: ( 1 << 16 ) - 1,
	backStencilFail	: GL.KEEP,
	backDepthFail 	: GL.KEEP,
	backDepthPass 	: GL.KEEP,
}, E | C | W );
Properties( StencilTest, {
	FN_NEVER		: GL.NEVER,
	FN_LESS			: GL.LESS,
	FN_LEQUAL		: GL.LEQUAL,
	FN_GREATER		: GL.GREATER,
	FN_GEQUAL		: GL.GEQUAL,
	FN_EQAUL		: GL.EQUAL,
	FN_NOTEQUAL		: GL.NOTEQUAL,
	FN_ALWAYS		: GL.ALWAYS,
	OP_KEEP			: GL.KEEP,
	OP_ZERO			: GL.ZERO,
	OP_REPLACE		: GL.REPLACE,
	OP_INCR			: GL.INCR,
	OP_INCR_WRAP	: GL.INCR_WRAP,
	OP_DECR			: GL.DECR,
	OP_DECR_WRAP	: GL.DECR_WRAP,
	OP_INVERT		: GL.INVERT
}, E );
const DEFAULT_PROGRAM = Program.VertexColors;

export default class Material {
	constructor( program = Program.DEFAULT ) {
		Properties( this, {
			offset 		: new PolygonOffset,
			alpha		: new Alpha,
			depth		: new DepthTest,
			stencil		: new StencilTest,
			cullFace	: new CullFace,
			scissor		: new ScissorTest,
			dither		: new Dither,
			multisample	: new Multisample
		}, C );
		Properties( this, {
			ambient 		: new vec3( 0.2, 0.2, 0.2 ),
			diffuse			: new vec4( 0.8, 0.8, 0.8, 0.8 ),
			specular		: new vec3( 0.0, 0.0, 0.0 ),
			shininess 		: 50.0
		}, E | C | W );
		this.setProgram( program );
	}
}

Properties( Material.prototype, {
	setProgram ( program ) {
		//program.use();
		//let uniforms = program.getUniforms.material;
		Property( this, "program", program, C );
		//if ( uniforms ) this.uniforms = uniforms;
	},
	use ( ) {

		this.program.use();
		let material = this.program.getUniforms.material;
		if ( material ) material.set( this );

		if ( this.alpha.enabled ) {					this.alpha.enable();
			if ( this.alpha.colorSet ) 				this.alpha.setColor();
			else									this.alpha.unsetColor();
			if ( this.alpha.funcSet ) 				this.alpha.setFunc();
			else									this.alpha.unsetFunc();
			if ( this.alpha.equationSet ) 			this.alpha.setEquation();
		} else 										this.alpha.disable();
		
		if ( this.cullFace.enabled ) {				this.cullFace.enable();
			if ( this.cullFace.modeSet ) 			this.cullFace.setMode();
			else 									this.cullFace.unsetMode();
			if ( this.cullFace.frontSet )			this.cullFace.setFront();
			else 									this.cullFace.unsetFront();
		} else 										this.cullFace.disable();

		if ( this.depth.enabled ) {					this.depth.enable();
			if ( this.depth.writeEnabled ) 			this.depth.enableWrite();
			else 									this.depth.disableWrite();
			if ( this.depth.funcSet )		 		this.depth.setFunc();
			else 									this.depth.unsetFunc();
			if ( this.depth.rangeSet )				this.depth.setRange();
			else 									this.depth.unsetRange();
		} else										this.depth.disable();

		if ( this.dither.enabled ) {				this.dither.enable();
		} else										this.dither.disable();

		if ( this.offset.enabled  ) {				this.offset.enable();
			if ( this.offset.fillSet ) 				this.offset.setFill();
			else									this.offset.unsetFill();
		} else										this.offset.disable();

		if ( this.multisample.enabled ) {			this.multisample.enable();
			if ( this.multisample.alphaEnabled )	this.multisample.enableAlpha();
			else									this.multisample.disableAlpha();
			if ( this.multisample.coverageSet ) 	this.multisample.setCoverage();
			else									this.multisample.unsetCoverage();
		} else										this.multisample.disable();

		if ( this.scissor.enabled ) {				this.scissor.enable();
			if ( this.scissor.dimensionsSet ) 		this.scissor.setDimensions();
			else									this.scissor.unsetDimensions();
		} else 										this.scissor.disable();

		if ( this.stencil.enabled ) {				this.stencil.enable();
			if ( 
				this.stencil.frontOpSet && 
				this.stencil.backOpSet 
			) 										this.stencil.setOp();
			else {									this.stencil.unsetOp();
				if ( this.stencil.frontOpSet )		this.stencil.setFrontOp();
				if ( this.stencil.backOpSet ) 		this.stencil.setBackOp();
			}
			if ( 
				this.stencil.frontFuncSet &&
				this.stencil.backFuncSet 
			)										this.stencil.setFunc();
			else { 									this.stencil.unsetFunc();
				if ( this.stencil.frontFuncSet ) 	this.stencil.setFrontFunc();
				if ( this.stencil.backFuncSet ) 	this.stencil.setBackFunc();
			}
			if ( 
				this.stencil.frontMaskSet &&
				this.stencil.backMaskSet
			)										this.stencil.setMask();
			else {									this.stencil.unsetMask();
				if ( this.stencil.frontMaskSet ) 	this.stencil.setFrontMask();
				if ( this.stencil.backMaskSet ) 	this.stencil.setBackMask();
			}
		} else										this.stencil.disable();
		

		return this;
	},
});

Properties( Material, {
	DEFAULT : new Material
}, E | C );

/*

	enableAlpha ( ) {
		this.usage |= BLEND_ENABLED;
		this.alpha.enable();
		return this;
	}
	disableAlpha ( ) {
		this.usage &= ~BLEND_ENABLED;
		this.alpha.disable();
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
		this.cullFace.enable();
		return this;
	}
	disableCullFace ( ) {
		this.usage &= ~CULL_FACE_ENABLED;
		this.cullFace.disable();
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
		this.depth.enable();
		return this;
	}
	disableDepth ( ) {
		this.usage &= ~DEPTH_ENABLED;
		this.depth.disable();
		return this;
	}
	setDepthWrite ( write = this.depth.write ) {
		this.usage |= DEPTH_WRITE_SET;
		Properties( this.depth, { write }, C | E );
		this.depth.setWrite();
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
		this.dither.enable();
		return this;
	}
	disableDither ( ) {
		this.usage &= ~DITHER_ENABLED;
		this.dither.disable();
		return this;
	}

	enablePolygonOffset ( ) {
		this.usage |= OFFSET_ENABLED;
		this.offset.enable();
		return this;
	}
	disablePolygonOffset ( ) {
		this.usage &= ~OFFSET_ENABLED;
		this.offset.disable();
		return this;
	}
	setPolygonOffset ( factor = this.offset.factor, units = this.offset.units ) {
		this.usage |= OFFSET_SET;
		Properties( this.offset, { factor, units }, C | E );
		this.offset.set();
		return this;
	}
	unsetPolygonOffset ( ) {
		if ( this.usage & OFFSET_SET ) {
			this.usage &= ~OFFSET_SET;
			delete this.offset.factor;
			delete this.offset.units;
		}
		this.offset.unset();
		return this;
	}

	enableSampleCoverage ( ) {
		this.usage |= SAMPLE_ENABLED;
		this.sampleCoverage.enable();
		return this;
	}
	disableSampleCoverage ( ) {
		this.usage &= ~SAMPLE_ENABLED;
		this.sampleCoverage.disable();
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
		this.scissor.enable();
		return this;
	}
	disableScissorTest ( ) {
		this.usage &= ~SCISSOR_ENABLED;
		this.scissor.disable();
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
		this.stencil.enable();
		return this;
	}
	disableStencilTest ( ) {
		this.usage &= ~STENCIL_ENABLED;
		this.stencil.disable();
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
	}*/