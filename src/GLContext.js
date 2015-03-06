import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

export const GL = WebGLRenderingContext.prototype;

export var canvas = document.createElement("canvas");
export var gl = canvas.getContext("webgl", { 
	alpha : true,
	depth : true,
//	stencil : false,
//	antialias : false,
//	premultipliedAlpha : false,
//	preserveDrawingBuffer : false,
//	preferLowPowerToHighPerformance : false,
//	failIfMajorPerformanceCaveat : false
} );

class ExtensionLoader {};
gl.getSupportedExtensions().forEach( function ( extension ) {
	Object.defineProperty( this, extension, {
		enumerable : true,
		configurable : true,
		get : function ( ) {
			var resolved = gl.getExtension ( extension );
			Object.defineProperty( this, extension, {
				enumerable : true,
				value : resolved
			} );
			return resolved;
		}
	} );
}, ExtensionLoader.prototype );
export const extensions = new ExtensionLoader;

export const textureUnit = new class TextureUnit {
	get getGenerateMipmapHintFlag()					{ return gl.flags[ this.getGenerateMipmapHint ];}
	get getImplementationColorReadTypeFlag()		{ return gl.flags[ this.getImplementationColorReadType ];}
	get getUnpackColorspaceConversionWebGLFlag()	{ return gl.flags[ this.getUnpackColorspaceConversionWebGL ];}
	get getImplementationColorReadFormatFlag()		{ return gl.flags[ this.getImplementationColorReadFormat ];}
	get getActiveTextureUnit() 						{ return gl.getParameter( GL.ACTIVE_TEXTURE ) - GL.TEXTURE0;}
	get getActiveTexture() 							{ return gl.getParameter( GL.ACTIVE_TEXTURE );}
	get getUnpackAlignment()						{ return gl.getParameter( GL.UNPACK_ALIGNMENT );}
	get getPackAlignment()							{ return gl.getParameter( GL.PACK_ALIGNMENT );}
	get getUnpackColorspaceConversionWebGL()		{ return gl.getParameter( GL.UNPACK_COLORSPACE_CONVERSION_WEBGL );}
	get getUnpackFlipYWebGL()						{ return gl.getParameter( GL.UNPACK_FLIP_Y_WEBGL );}
	get getUnpackPremultiplyAlphaWebGL()			{ return gl.getParameter( GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL );}
	get getCompressedTextureFormats()				{ return gl.getParameter( GL.COMPRESSED_TEXTURE_FORMATS );}
	get getGenerateMipmapHint()						{ return gl.getParameter( GL.GENERATE_MIPMAP_HINT );}
	get getImplementationColorReadFormat()			{ return gl.getParameter( GL.IMPLEMENTATION_COLOR_READ_FORMAT );}
	get getImplementationColorReadType()			{ return gl.getParameter( GL.IMPLEMENTATION_COLOR_READ_TYPE );}
};

export const bindings = new class Bindings {
	get getActiveProgram() 		{ return gl.getParameter( GL.CURRENT_PROGRAM );}
	get getArrayBuffer() 		{ return gl.getParameter( GL.ARRAY_BUFFER_BINDING );}
	get getElementArrayBuffer()	{ return gl.getParameter( GL.ELEMENT_ARRAY_BUFFER_BINDING );}
	get getTexture2D() 			{ return gl.getParameter( GL.TEXTURE_BINDING_2D );}
	get getTextureCubeMap()		{ return gl.getParameter( GL.TEXTURE_BINDING_CUBE_MAP );}
	get getFramebuffer()		{ return gl.getParameter( GL.FRAMEBUFFER_BINDING );}
	get getRenderbuffer()		{ return gl.getParameter( GL.RENDERBUFFER_BINDING );}
};

export const capabilities = new class Capabilities { 
	get getMaxVertexAttribs() 				{ return gl.getParameter( GL.MAX_VERTEX_ATTRIBS );}
	get getMaxCombinedTextureImageUnits() 	{ return gl.getParameter( GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS );}
	get getMaxCubeMaptextureSize() 			{ return gl.getParameter( GL.MAX_CUBE_MAP_TEXTURE_SIZE );}
	get getMaxFragmentUniformVectors() 		{ return gl.getParameter( GL.MAX_FRAGMENT_UNIFORM_VECTORS );}
	get getMaxVertexUniformVectors() 		{ return gl.getParameter( GL.MAX_VERTEX_UNIFORM_VECTORS );}
	get getMaxRenderbufferSize() 			{ return gl.getParameter( GL.MAX_RENDERBUFFER_SIZE );}
	get getMaxtextureImageUnits() 			{ return gl.getParameter( GL.MAX_TEXTURE_IMAGE_UNITS );}
	get getMaxTextureSize() 				{ return gl.getParameter( GL.MAX_TEXTURE_SIZE );}
	get getMaxVaryingVectors() 				{ return gl.getParameter( GL.MAX_VARYING_VECTORS );}
	get getMaxVertexTextureImageUnits() 	{ return gl.getParameter( GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS );}
	get getMaxViewportDims() 				{ return gl.getParameter( GL.MAX_VIEWPORT_DIMS );}
	get getAliasedLineWidthRange()	{ return gl.getParameter( GL.ALIASED_LINE_WIDTH_RANGE );}
	get getAliasedPointSizeRange()	{ return gl.getParameter( GL.ALIASED_POINT_SIZE_RANGE );}
};




export const draw = new class Draw {
	setClearDepth ( depth ) {
		gl.clearDepth(
			//GLclampf set clear depth
			depth
		);
		return this;
	}
	setClearStencil ( stencil ) {
		gl.clearStencil(
			//GLint set stencil buffer index to clear
			stencil
		);
		return this;
	}
	setClearColor ( red, green, blue, alpha ) {
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
	clear ( mask = GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT ) {
		gl.clear(
			//GLbitfield COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT | STENCIL_BUFFER_BIT
			mask
		);
		return this;
	}
	drawArrays ( mode, first, count ) {
		gl.drawArrays(
			//GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
			mode,
			//GLint
			first,
			//GLsizei
			count
		);
		return this;
	}
	drawElements ( mode, count, type, indices ) {
		gl.drawElements(
			//GLenum POINTS | LINE_STRIP | LINE_LOOP | LINES | TRIANGLE_STRIP | TRIANGLE_FAN | TRIANGLES
			mode,
			//GLsizei
			count,
			//GLenum UNSIGNED_BYTE | UNSIGNED_SHORT | [UNSIGNED_INT]
			type,
			//GLvoid *
			indices
		);
		return this;
	}
	setLineWidth ( width ) {
		gl.lineWidth(
			//GLfloat
			width
		);
		return this;
	}
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
	get getLineWidth()		{ return gl.getParameter( GL.LINE_WIDTH );}
};

export const viewport = new class Viewport {
	setViewport ( x = 0, y = 0, width = canvas.clientWidth, height = canvas.clientHeight ) {
		gl.viewport(
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
	get getViewport()				{ return gl.getParameter( GL.VIEWPORT );}
};




Object.defineProperties( GL, {
	getShadingLanguageVersion : { 
		get : function ( ) { return gl.getParameter( GL.SHADING_LANGUAGE_VERSION ); }
	},
	getVersion : {
		get : function ( ) { return gl.getParameter( GL.VERSION ); }
	},
	getVendor : {
		get : function ( ) { return gl.getParameter( GL.VENDOR ); }
	},
	getRenderer : {
		get : function ( ) { return gl.getParameter( GL.RENDERER ); }
	},
	options : {
		value : {
			alpha : true,
			depth : true,
			stencil : false,
			antialias : false,
			premultipliedAlpha : false,
			preserveDrawingBuffer : false
		}
	},
	setOptions : {
		value : function ( options ) {
			this.options = options || this.options;
			gl = canvas.getContext( "webgl", this.options ) || 
			canvas.getContext( "experimental-webgl", this.options );
			return this;
		}
	},
	setQuality : {
		value : function ( v ) {
			isNaN( v ) ? v = 2 : v = v || 2;
			this.quality = v;
			canvas.width = canvas.clientWidth / v;
			canvas.height = canvas.clientHeight / v;
			
			return this;
		}
	}
} );

GL.flags = [];
for ( var e in GL ) {
	if ( typeof GL[e] === "number") GL.flags[GL[e]] = e;
}


