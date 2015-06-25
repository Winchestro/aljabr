import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";

var debugMode = false;

export default class Shader {
	constructor ( type, code ) {
		let shader = gl.createShader( type );
		if ( code ) shader.setShaderSource( code );
		return shader;
	}
	static Fragment ( code ) {
		return Shader( GL.FRAGMENT_SHADER, code );
	}
	static Vertex ( code ) {
		return Shader( GL.VERTEX_SHADER, code );
	}
}

Properties( WebGLShader.prototype, {
	delete ( ) {
		gl.deleteShader( this );
		return this;
	},
	compile ( ) {
		gl.compileShader( this );
		return this;
	},
	setShaderSource ( code ) {
		gl.shaderSource( this, code );
		this.compile();
		if ( debugMode ) { console.clear(); }
		if ( !this.getCompileStatus ) {
			debugMode = this;
			console.error( this.getInfoLog );
		}
		else if ( debugMode === this ) { 
			debugMode = false; 
		}
		return this;
	},
});
Getters( WebGLShader.prototype, {
	getInfoLog						(){ return gl.getShaderInfoLog( this );},
	getSource						(){ return gl.getShaderSource( this );},
	getDeleteStatus					(){ return gl.getShaderParameter( this, GL.DELETE_STATUS );},
	getCompileStatus				(){ return gl.getShaderParameter( this, GL.COMPILE_STATUS );},
	getType							(){ return gl.getShaderParameter( this, GL.SHADER_TYPE );},
	getTypeFlag						(){ return gl.flags[ gl.getShaderParameter( this, GL.SHADER_TYPE ) ];},
	
	getPrecisionFormatLowFloat		(){ return gl.getShaderPrecisionFormat( this.getType, GL.LOW_FLOAT );},
	getPrecisionFormatMediumFloat	(){ return gl.getShaderPrecisionFormat( this.getType, GL.MEDIUM_FLOAT );},
	getPrecisionFormatHighFloat		(){	return gl.getShaderPrecisionFormat( this.getType, GL.HIGH_FLOAT );},
	getPrecisionFormatLowInt		(){	return gl.getShaderPrecisionFormat( this.getType, GL.LOW_INT );},
	getPrecisionFormatMediumInt		(){ return gl.getShaderPrecisionFormat( this.getType, GL.MEDIUM_INT );},
	getPrecisionFormatHighInt		(){	return gl.getShaderPrecisionFormat( this.getType, GL.HIGH_INT );},
});