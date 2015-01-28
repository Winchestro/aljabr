const canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl",{alpha:true, depth:true});

void function GLContext(){
	const PROTOTYPE 			= WebGLRenderingContext.prototype;
	const __createProgram = gl.createProgram;

	const STATES_FLAGS = {
		getActiveTextureFlag : "ACTIVE_TEXTURE",
		getBlendDstAlphaFlag : "BLEND_DST_ALPHA",
		getBlendDstRGBFlag : "BLEND_DST_RGB",
		getBlendEquationAlphaFlag : "BLEND_EQUATION_ALPHA",
		getBlendEquationRGBFlag : "BLEND_EQUATION_RGB",
		getBlendSrcAlphaFlag : "BLEND_SRC_ALPHA",
		getBlendSrcRGBFlag : "BLEND_SRC_RGB",
		getCullFaceModeFlag : "CULL_FACE_MODE",
		getDepthFuncFlag : "DEPTH_FUNC",
		getFrontFaceFlag : "FRONT_FACE",
		getGenerateMipmapHintFlag : "GENERATE_MIPMAP_HINT",
		getImplementationColorReadTypeFlag : "IMPLEMENTATION_COLOR_READ_TYPE",
		getPackAlignmentFlag : "PACK_ALIGNMENT",
		getStencilBackFailFlag : "STENCIL_BACK_FAIL",
		getStencilBackFuncFlag : "STENCIL_BACK_FUNC",
		getStencilBackPassDepthFailFlag : "STENCIL_BACK_PASS_DEPTH_FAIL",
		getStencilBackPassDepthPassFlag : "STENCIL_BACK_PASS_DEPTH_PASS",
		getStencilBackRefFlag : "STENCIL_BACK_REF",
		getStencilBitsFlag : "STENCIL_BITS",
		getStencilClearValueFlag : "STENCIL_CLEAR_VALUE",
		getStencilFailFlag : "STENCIL_FAIL",
		getStencilFuncFlag : "STENCIL_FUNC",
		getStencilPassDepthFailFlag : "STENCIL_PASS_DEPTH_FAIL",
		getStencilPassDepthPassFlag : "STENCIL_PASS_DEPTH_PASS",
		getStencilRefFlag : "STENCIL_REF",
		getUnpackAlignmentFlag : "UNPACK_ALIGNMENT",
		getUnpackColorspaceConversionWebGLFlag : "UNPACK_COLORSPACE_CONVERSION_WEBGL",
	};
	const STATES = {
		getActiveTexture : "ACTIVE_TEXTURE",
		getAliasedLineWidthRange : "ALIASED_LINE_WIDTH_RANGE",
		getAliasedPointSizeRange : "ALIASED_POINT_SIZE_RANGE",
		getAlphaBits : "ALPHA_BITS",
		getArrayBufferBinding : "ARRAY_BUFFER_BINDING",
		getBlend : "BLEND",
		getBlendColor : "BLEND_COLOR",
		getBlendDstAlpha : "BLEND_DST_ALPHA",
		getBlendDstRGB : "BLEND_DST_RGB",
		getBlendEquationAlpha : "BLEND_EQUATION_ALPHA",
		getBlendEquationRGB : "BLEND_EQUATION_RGB",
		getBlendSrcAlpha : "BLEND_SRC_ALPHA",
		getBlendSrcRGB : "BLEND_SRC_RGB",
		getBlueBits : "BLUE_BITS",
		getColorClearValue : "COLOR_CLEAR_VALUE",
		getColorWritemask : "COLOR_WRITEMASK",
		getCompressedTextureFormats : "COMPRESSED_TEXTURE_FORMATS",
		getCullFace : "CULL_FACE",
		getCullFaceMode : "CULL_FACE_MODE",
		getCurrentProgram : "CURRENT_PROGRAM",
		getDepthBits : "DEPTH_BITS",
		getDepthClearValue : "DEPTH_CLEAR_VALUE",
		getDepthFunc : "DEPTH_FUNC",
		getDepthRange : "DEPTH_RANGE",
		getDepthTest : "DEPTH_TEST",
		getDepthWritemask : "DEPTH_WRITEMASK",
		getDither : "DITHER",
		getElementArrayBufferBinding : "ELEMENT_ARRAY_BUFFER_BINDING",
		getFramebufferBinding : "FRAMEBUFFER_BINDING",
		getFrontFace : "FRONT_FACE",
		getGenerateMipmapHint : "GENERATE_MIPMAP_HINT",
		getGreenBits : "GREEN_BITS",
		getImplementationColorReadFormat : "IMPLEMENTATION_COLOR_READ_FORMAT",
		getImplementationColorReadType : "IMPLEMENTATION_COLOR_READ_TYPE",
		getLineWidth : "LINE_WIDTH",
		getMaxCombinedTextureImageUnits : "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
		getMaxCubeMaptextureSize : "MAX_CUBE_MAP_TEXTURE_SIZE",
		getMaxFragmentUniformVectors : "MAX_FRAGMENT_UNIFORM_VECTORS",
		getMaxRenderbufferSize : "MAX_RENDERBUFFER_SIZE",
		getMaxtextureImageUnits : "MAX_TEXTURE_IMAGE_UNITS",
		getMaxTextureSize : "MAX_TEXTURE_SIZE",
		getMaxVaryingVectors : "MAX_VARYING_VECTORS",
		getMaxVertexAttribs : "MAX_VERTEX_ATTRIBS",
		getMaxVertexTextureImageUnits : "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
		getMaxVertexUniformVectors : "MAX_VERTEX_UNIFORM_VECTORS",
		getMaxViewportDims : "MAX_VIEWPORT_DIMS",
		getPackAlignment : "PACK_ALIGNMENT",
		getPolygonOffsetFactor : "POLYGON_OFFSET_FACTOR",
		getPolygonOffsetFill : "POLYGON_OFFSET_FILL",
		getPolygonOffsetUnits : "POLYGON_OFFSET_UNITS",
		getRedBits : "RED_BITS",
		getRenderbufferBinding : "RENDERBUFFER_BINDING",
		getRenderer : "RENDERER",
		getSampleBuffers : "SAMPLE_BUFFERS",
		getSampleCoverageInvert : "SAMPLE_COVERAGE_INVERT",
		getSampleCoverageValue : "SAMPLE_COVERAGE_VALUE",
		getSamples : "SAMPLES",
		getScissorBox : "SCISSOR_BOX",
		getScissorTest : "SCISSOR_TEST",
		getShadingLanguageVersion : "SHADING_LANGUAGE_VERSION",
		getStencilBackFail : "STENCIL_BACK_FAIL",
		getStencilBackFunc : "STENCIL_BACK_FUNC",
		getStencilBackPassDepthFail : "STENCIL_BACK_PASS_DEPTH_FAIL",
		getStencilBackPassDepthPass : "STENCIL_BACK_PASS_DEPTH_PASS",
		getStencilBackRef : "STENCIL_BACK_REF",
		getStencilBackValueMask : "STENCIL_BACK_VALUE_MASK",
		getStencilBackWriteMask : "STENCIL_BACK_WRITEMASK",
		getStencilBits : "STENCIL_BITS",
		getStencilClearValue : "STENCIL_CLEAR_VALUE",
		getStencilFail : "STENCIL_FAIL",
		getStencilFunc : "STENCIL_FUNC",
		getStencilPassDepthFail : "STENCIL_PASS_DEPTH_FAIL",
		getStencilPassDepthPass : "STENCIL_PASS_DEPTH_PASS",
		getStencilRef : "STENCIL_REF",
		getStencilTest : "STENCIL_TEST",
		getStencilValueMask : "STENCIL_VALUE_MASK",
		getStencilWritemask : "STENCIL_WRITEMASK",
		getSubpixelBits : "SUBPIXEL_BITS",
		getTextureBinding2D : "TEXTURE_BINDING_2D",
		getTextureBindingCubeMap : "TEXTURE_BINDING_CUBE_MAP",
		getUnpackAlignment : "UNPACK_ALIGNMENT",
		getUnpackColorspaceConversionWebGL : "UNPACK_COLORSPACE_CONVERSION_WEBGL",
		getUnpackFlipYWebGL : "UNPACK_FLIP_Y_WEBGL",
		getUnpackPremultiplyAlphaWebGL : "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
		getVendor : "VENDOR",
		getVersion : "VERSION",
		getViewport : "VIEWPORT",
		getMaxVertexAttribs : "MAX_VERTEX_ATTRIBS",
		getArrayBufferBinding : "ARRAY_BUFFER_BINDING",
		getElementArrayBufferBinding : "ELEMENT_ARRAY_BUFFER_BINDING"
	};

	
	function ExtensionCollection ( extArray  ) {
		
	}
	var extArray = gl.getSupportedExtensions();
	var $ = ExtensionCollection.prototype;
	extArray.forEach( function (ext) {
		Object.defineProperty( $, ext, {
			configurable : true,
			get : function ( ) {
				var e = gl.getExtension ( ext );
				Object.defineProperty( this, ext, {
					value : e
				} );
				return e;
			}
		} );
	} );



	const METHODS = {
		quality : 1,
		extensions : new ExtensionCollection,
		options : {
			alpha:true,
			depth:true,
			stencil:false,
			antialias:false,
			premultipliedAlpha:false,
			preserveDrawingBuffer:false
		},

		setOptions : function ( options ) {
			this.options = options || this.options;
			gl = canvas.getContext( "webgl", this.options ) || 
			canvas.getContext( "experimental-webgl", this.options );
			return this;
		},
		setQuality : function ( v ) {
			isNaN( v ) ? v = 2 : v = v || 2;
			this.quality = v;
			canvas.width = canvas.clientWidth / v;
			canvas.height = canvas.clientHeight / v;
			
			return this;
		}
	}

	PROTOTYPE.flags = [];
	for ( var e in PROTOTYPE ) {
		if ( typeof PROTOTYPE[e] === "number") PROTOTYPE.flags[PROTOTYPE[e]] = e;
	}

	for ( var p in METHODS ) PROTOTYPE[p] = METHODS[p];
	for ( var s in STATES ) Object.defineProperty(PROTOTYPE,s,{
		get: new Function(
			"return this.getParameter("+PROTOTYPE[STATES[s]]+")"
		)
	});
	for ( var s in STATES_FLAGS ) Object.defineProperty(PROTOTYPE,s,{
		get: new Function(
			"return this.flags[this.getParameter("+PROTOTYPE[STATES_FLAGS[s]]+")]"
		)
	});
	
}();

