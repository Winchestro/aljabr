import { gl, GL } from "./GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

export default class Shader {
	constructor ( type, code ) {
		var s = gl.createShader( type );
		if ( code ) s.setShaderSource( code );
		return s;
	}
	static Fragment ( code ) {
		return Shader( GL.FRAGMENT_SHADER, code );
	}
	static Vertex ( code ) {
		return Shader( GL.VERTEX_SHADER, code );
	}
}

const PROTOTYPE = WebGLShader.prototype;

const METHODS = {
	delete : function ( ) {
		gl.deleteShader( this );
		return this;
	},
	compile : function ( ) {
		gl.compileShader( this );
		return this;
	},
	setShaderSource : function ( code ) {
		gl.shaderSource( this, code );
		this.compile();
		if ( !this.getCompileStatus ) throw new Error ( this.getInfoLog );
		return this;
	},
};
const ACCESSORS = {
	getPrecisionFormatLowFloat : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.LOW_FLOAT );
		}
	},
	getPrecisionFormatMediumFloat : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.MEDIUM_FLOAT );
		}
	},
	getPrecisionFormatHighFloat : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.HIGH_FLOAT );
		}
	},
	getPrecisionFormatLowInt : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.LOW_INT );
		}
	},
	getPrecisionFormatMediumInt : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.MEDIUM_INT );
		}
	},
	getPrecisionFormatHighInt : {
		get : function ( ) {
			return gl.getShaderPrecisionFormat( this.getType, GL.HIGH_INT );
		}
	},
	getTypeFlag : {
		get : function ( ) {
			return gl.flags[ gl.getShaderParameter( this, GL.SHADER_TYPE ) ];
		}
	},
	getType : {
		get : function ( ) {
			return gl.getShaderParameter( this, GL.SHADER_TYPE );
		}	
	},
	getDeleteStatus : {
		get : function ( ) {
			return gl.getShaderParameter( this, GL.DELETE_STATUS );
		}
	},
	getCompileStatus : {
		get : function ( ) {
			return gl.getShaderParameter( this, GL.COMPILE_STATUS );
		}
	},
	getSource : {
		get : function ( ) {
			return gl.getShaderSource( this );
		}
	},
	getInfoLog : {
		get : function ( ) {
			return gl.getShaderInfoLog( this );
		}
	}
};

for ( var p in METHODS ) PROTOTYPE[ p ] = METHODS[ p ];
Object.defineProperties( PROTOTYPE, ACCESSORS );
