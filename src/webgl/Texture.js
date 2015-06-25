import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";

export default class Texture {
	constructor ( target = GL.TEXTURE_2D ) {
		var texture = gl.createTexture();
		if( texture ) Property( texture, "target", target );
		return texture;
	}
	static CubeMap ( ) {
		if( !( this instanceof Texture.CubeMap ) ) return new Texture.CubeMap;
		Properties( this, {
			x : { positive : gl.createTexture(), negative : gl.createTexture() },
			y : { positive : gl.createTexture(), negative : gl.createTexture() },
			z : { positive : gl.createTexture(), negative : gl.createTexture() }
		}, E );
		Property( this.x.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_X );
		Property( this.x.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_X );
		Property( this.y.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_Y );
		Property( this.y.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_Y );
		Property( this.z.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_Z );
		Property( this.z.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_Z );
	}
}

Properties( WebGLTexture.prototype, {
	setActiveTexture ( nTextureUnit ) {
		gl.activeTexture( GL.TEXTURE0 + nTextureUnit );
		return this;
	},
	delete ( ) {
		gl.deleteTexture( this );
		return this;
	},
	bind  ( ) {
		gl.bindTexture( this.target, this );
		return this;
	},
	unbind ( ) {
		gl.bindTexture( this.target, null );
		return this;
	},
	setMipmapHint ( mode ) {
		gl.hint(
			GL.GENERATE_MIPMAP_HINT,
			//GLenum FASTEST | NICEST | DONT_CARE
			mode
		);
		return this;
	},
	generateMipmap ( ) {
		gl.generateMipmap( this.target );
		return this;
	},
	
	pixelStorei ( pname, param ) {
		//pname PACK_ALIGNMENT | UNPACK_ALIGNMENT param 1 | 2 | 4 | 8
		//pname UNPACK_FLIP_Y_WEBGL | UNPACK_PREMULTIPLY_ALPHA_WEBGL param true | false
		//pname UNPACK_COLORSPACE_CONVERSION_WEBGL param NONE | BROWSER_DEFAULT_WEBGL
		gl.pixelStorei(
			//GLenum
			pname,
			//GLint
			param 
		);
		return this;
	},
	setMinFilter ( min = GL.NEAREST ) {
		gl.texParameteri(
			this.target,
			GL.TEXTURE_MIN_FILTER,
			//GLenum NEAREST | LINEAR | NEAREST_MIPMAP_NEAREST | LINEAR_MIPAMP_NEAREST | NEAREST_MIPMAP_LINEAR | LINEAR_MIPMAP_LINEAR
			min
		);
		return this;
	},
	setMagFilter ( mag = GL.NEAREST ) {
		gl.texParameteri(
			this.target,
			GL.TEXTURE_MAG_FILTER,
			//GLenum NEAREST | LINEAR
			mag
		);
		return this;
	},
	setWrapS ( s = GL.CLAMP_TO_EDGE ) {
		gl.texParameteri(
			this.target,
			GL.TEXTURE_WRAP_S,
			//GLenum CLAMP_TO_EDGE | MIRRORED_REPEAT | REPEAT
			s
		);
		return this;
	},
	setWrapT ( t = GL.CLAMP_TO_EDGE ) {
		gl.texParameteri(
			this.target,
			GL.TEXTURE_WRAP_T,
			//GLenum CLAMP_TO_EDGE | MIRRORED_REPEAT | REPEAT
			t
		);
		return this;
	},
	texImage ( data, level = 0, format = GL.RGBA, type = GL.UNSIGNED_BYTE ) {
		gl.texImage2D(
			this.target,
			level,
			format,
			format,
			type,
			data
		);
		return this;
	},
	texData ( data, width, height, level = 0, format = GL.RGBA,  type = GL.UNSIGNED_BYTE ) {
		gl.texImage2D(
			//GLenum TEXTURE_2D | TEXTURE_CUBE_MAP_ + POSITIVE_ | NEGATIVE_ + X | Y | Z
			this.target,
			//GLint mipmap level must be >= 0, and <= log2( maxTextureSize )
			level,
			//GLint internalformat ALPHA | LUMINANCE | LUMINANCE_ALPHA | RGB | RGBA
			format,
			//GLsizei must be equal for all sides of a cubemap
			width,
			//GLsizei must be equal for all sides of a cubemap
			height,
			//GLint border ( must be 0 ... )
			0,
			//GLint - must be same as internalformat ...
			format,
			//GLenum UNSIGNED_BYTE | UNSIGNED_SHORT_5_6_5 (only RGB) | UNSIGNED_SHORT_4_4_4_4 (only RGBA) | UNSIGNED_SHORT_5_5_5_1 (only RGBA) 
			type,
			//GLvoid*  
			data
		);
		return this;
	},
	texSubImage ( data, xoffset = 0, yoffset = 0, level = 0, format = GL.RGBA, type = GL.UNSIGNED_BYTE ) {
		gl.texSubImage2D(
			this.target,
			level,
			xoffset,
			yoffset,
			format,
			format,
			type,
			data
		);
		return this;
	},
	texSubData ( data,  width, height, xoffset = 0, yoffset = 0, level = 0, format = GL.RGBA, type = GL.UNSIGNED_BYTE ) {
		gl.texSubImage2D(
			this.target,
			level,
			xoffset,
			yoffset,
			format,
			width,
			height,
			0,
			format,
			type,
			data
		);
		return this;
	},
	copyTexImage ( x, y, width, height, level = 0, format = GL.RGBA ) {
		gl.copyTexImage2D (
			this.target,
			level,
			format,
			x,
			y,
			width,
			height,
			0
		);
		return this;
	},
	copyTexSubImage ( xoffset, yoffset, x, y, width, height, level, format ) {
		gl.copyTexImage2D(
			this.target,
			level,
			xoffset,
			yoffset,
			format,
			x,
			y,
			width,
			height
		);
		return this;
	},
} );
Properties( Texture, {
	TARGET_TEXTURE_2D 					: GL.TEXTURE_2D,
	TARGET_TEXTURE_CUBE_MAP_POSITIVE_X	: GL.TEXTURE_CUBE_MAP_POSITIVE_X,
	TARGET_TEXTURE_CUBE_MAP_NEGATIVE_X	: GL.TEXTURE_CUBE_MAP_NEGATIVE_X,
	TARGET_TEXTURE_CUBE_MAP_POSITIVE_Y	: GL.TEXTURE_CUBE_MAP_POSITIVE_Y,
	TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Y	: GL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
	TARGET_TEXTURE_CUBE_MAP_POSITIVE_Z	: GL.TEXTURE_CUBE_MAP_POSITIVE_Z,
	TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Z	: GL.TEXTURE_CUBE_MAP_NEGATIVE_Z,
	FORMAT_ALPHA						: GL.ALPHA,
	FORMAT_LUMINANCE					: GL.LUMINANCE,
	FORMAT_LUMINANCE_ALPHA				: GL.LUMINANCE_ALPHA,
	FORMAT_RGB							: GL.RGB,
	FORMAT_RGBA							: GL.RGBA,
	TYPE_UNSIGNED_BYTE					: GL.UNSIGNED_BYTE,
	TYPE_UNSIGNED_SHORT_5_6_5			: GL.UNSIGNED_SHORT_5_6_5,
	TYPE_UNSIGNED_SHORT_4_4_4_4			: GL.UNSIGNED_SHORT_4_4_4_4,
	TYPE_UNSIGNED_SHORT_5_5_5_1			: GL.UNSIGNED_SHORT_5_5_5_1,
	STORE_UNPACK_FLIP_Y					: GL.UNPACK_FLIP_Y_WEBGL,
	STORE_UNPACK_COLORSPACE_CONVERSION	: GL.UNPACK_COLORSPACE_CONVERSION_WEBGL,
	STORE_UNPACK_PREMULTIPLY_ALPHA		: GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
	STORE_UNPACK_ALIGNMENT				: GL.UNPACK_ALIGNMENT,
	STORE_PACK_ALIGNMENT				: GL.PACK_ALIGNMENT,
	STOREPARAM_BROWSER_DEFAULT			: GL.BROWSER_DEFAULT_WEBGL,
	MIPMAP_FASTEST						: GL.FASTEST,
	MIPMAP_NICEST						: GL.NICEST,
	MIPMAP_DONT_CARE					: GL.DONT_CARE,
	MIN_NEAREST							: GL.NEAREST,
	MIN_LINEAR							: GL.LINEAR,
	MIN_NEAREST_MIPMAP_NEAREST			: GL.NEAREST_MIPMAP_NEAREST,
	MIN_LINEAR_MIPMAP_NEAREST			: GL.LINEAR_MIPMAP_NEAREST,
	MIN_NEAREST_MIPMAP_LINEAR			: GL.NEAREST_MIPMAP_LINEAR,
	MIN_LINEAR_MIPMAP_LINEAR			: GL.LINEAR_MIPMAP_LINEAR,
	MAG_NEAREST							: GL.NEAREST,
	MAG_LINEAR							: GL.LINEAR,
	WRAP_CLAMP_TO_EDGE					: GL.CLAMP_TO_EDGE,
	WRAP_MIRRORED_REPEAT				: GL.MIRRORED_REPEAT,
	WRAP_REPEAT							: GL.REPEAT
} );
Getters( WebGLTexture.prototype, {
	getTargetFlag ( ) {
		return gl.flags[ this.target ];
	},
	getMagFilter ( ) {
		this.bind();
		return gl.getTexParameter( this.target, GL.TEXTURE_MAG_FILTER );
	},
	getMagFilterFlag ( ) {
		return gl.flags[ this.getMagFilter ];
	},
	getMinFilter ( ) {
		this.bind();
		return gl.getTexParameter( this.target, GL.TEXTURE_MIN_FILTER );
	},
	getMinFilterFlag ( ) {
		return gl.flags[ this.getMinFilter ];
	},
	getWrapS ( ) {
		this.bind();
		return gl.getTexParameter( this.target, GL.TEXTURE_WRAP_S );
	},
	getWrapSFlag ( ) {
		return gl.flags[ this.getWrapS ];
	},
	getWrapT ( ) {
		this.bind();
		return gl.getTexParameter( this.target, GL.TEXTURE_WRAP_T );
	},
	getWrapTFlag ( ) {
		return gl.flags[ this.getWrapT ];
	}
} );