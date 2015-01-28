void function GLShader(){
	const GL 			= WebGLRenderingContext.prototype;
	const GLResource 	= GLResource;
	const PROTOTYPE 	= WebGLShader.prototype;
	
	function FragmentShader ( code ) {
		var s = gl.createShader( GL.FRAGMENT_SHADER );
		if ( code ) s.setShaderSource( code );
		return s;
	};
	function VertexShader ( code ) {
		var s = gl.createShader( GL.VERTEX_SHADER );
		if ( code ) s.setShaderSource( code );
		return s;
	};

	const METHODS = {

	};

	const BINDINGS = {
		delete:function(){
			gl.deleteShader(this);
			return this;
		},
		compile:function(){
			gl.compileShader(this);
			return this;
		},
		setShaderSource:function(code){
			gl.shaderSource(this,code);
			this.compile();
			if ( !this.getCompileStatus ) console.warn( this.getInfoLog );
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

	for ( var p in METHODS ) PROTOTYPE[p] = METHODS[p];
	for ( var p in BINDINGS ) PROTOTYPE[p] = BINDINGS[p];
	Object.defineProperties( PROTOTYPE, ACCESSORS );
	
	const EXPORT = {
		FragmentShader:FragmentShader,
		VertexShader:VertexShader
	};
	for ( var e in EXPORT ) window[e] = core[e] = EXPORT[e];
}();
/*
		


*/