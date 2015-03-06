import { gl, GL } from "./GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

const PROTOTYPE 	= WebGLTexture.prototype;	
const TARGET		= new WeakMap;

export default class Texture {
	constructor ( ) {
		var t = gl.createTexture();
		TARGET.set( t, GL.TEXTURE_2D );
		return t;
	}
	static CubeMap ( ) {
		var t = gl.createTexture();
		TARGET.set( t, GL.TEXTURE_CUBE_MAP);
		return t;
	}
}

const BINDINGS = {
	setActiveTexture : function ( nTextureUnit ) {
		gl.activeTexture( GL.TEXTURE0 + nTextureUnit );
		return this;
	},
	delete : function(){
		gl.deleteTexture( this );
		return this;
	},
	bind : function ( ) {
		gl.bindTexture( this.getTarget, this );
		return this;
	},
	unbind : function ( ) {
		gl.bindTexture( this.getTarget, null );
		return this;
	},
	setMipmapHint : function ( mode ) {
		gl.hint(
			GL.GENERATE_MIPMAP_HINT,
			//GLenum FASTEST | NICEST | DONT_CARE
			mode
		);
		return this;
	},
	generateMipmap : function ( ) {
		gl.generateMipmap( this.getTarget );
		return this;
	},
	copyTexImage2D : function ( x, y, width, height, level, format ) {
		gl.copyTexImage2D (
			this.getTarget,
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
	copyTexSubImage2D : function ( xoffset, yoffset, x, y, width, height, level, format ) {
		gl.copyTexImage2D(
			this.getTarget,
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
	pixelStorei : function ( pname, param ) {
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
	setMinFilter : function ( min ) {
		gl.texParameteri(
			this.getTarget,
			GL.TEXTURE_MIN_FILTER,
			min
		);
		return this;
	},
	setMagFilter : function ( mag ) {
		gl.texParameteri(
			this.getTarget,
			GL.TEXTURE_MAG_FILTER,
			mag
		);
		return this;
	},
	setWrapS : function ( s ) {
		gl.texParameteri(
			this.getTarget,
			GL.TEXTURE_WRAP_S,
			s
		);
		return this;
	},
	setWrapT : function ( t ) {
		gl.texParameteri(
			this.getTarget,
			GL.TEXTURE_WRAP_T,
			t
		);
		return this;
	},
	texImage2D : function ( data, level, format, type, width, height ) {
		gl.texImage2D(
			this.getTarget,
			level,
			format,
			format,
			type,
			data
		);
		return this;
	},
	texImageData2D : function ( data, level, format, type, width, height ) {
		gl.texImage2D(
			this.getTarget,
			level,
			format,
			width,
			height,
			0,// wut?
			format,//again?!? :O
			type,
			data
		);
		return this;
	},
	texSubImage2D : function ( xoffset, yoffset, data, level, format, type, width, height ) {
		gl.texSubImage2D(
			this.getTarget,
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
	texSubImageData2D : function ( xoffset, yoffset, data, level, format, type, width, height ) {
		gl.texSubImage2D(
			this.getTarget,
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
};
const ACCESSORS = {
	getTarget : {
		get : function ( ) {
			return TARGET.get( this );
		}
	},
	getTargetFlag : {
		get : function ( ) {
			return gl.flags[ this.getTarget ];
		}
	},
	getMagFilter : {
		get : function ( ) {
			this.bind();
			return gl.getTexParameter( this.getTarget, GL.TEXTURE_MAG_FILTER );
		}
	},
	getMagFilterFlag : {
		get : function ( ) {
			return gl.flags[ this.getMagFilter ];
		}
	},
	getMinFilter : {
		get : function ( ) {
			this.bind();
			return gl.getTexParameter( this.getTarget, GL.TEXTURE_MIN_FILTER );
		}
	},
	getMinFilterFlag : {
		get : function ( ) {
			return gl.flags[ this.getMinFilter ];
		}
	},
	getWrapS : {
		get : function ( ) {
			this.bind();
			return gl.getTexParameter( this.getTarget, GL.TEXTURE_WRAP_S );
		}
	},
	getWrapSFlag : {
		get : function ( ) {
			return gl.flags[ this.getWrapS ];
		}
	},
	getWrapT : {
		get : function ( ) {
			this.bind();
			return gl.getTexParameter( this.getTarget, GL.TEXTURE_WRAP_T );
		}
	},
	getWrapTFlag : {
		get : function ( ) {
			return gl.flags[ this.getWrapT ];
		}
	}
};

for ( var p in BINDINGS ) Object.defineProperty( PROTOTYPE, p, {
	value : BINDINGS[ p ]
} );

Object.defineProperties( PROTOTYPE, ACCESSORS );
