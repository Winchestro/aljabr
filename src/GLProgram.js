void function GLProgram ( ) {
	const GL 				= WebGLRenderingContext.prototype;
	
	function Program ( ) {
		return gl.createProgram();
	}

	const GLResource		= GLResource;
	const PROTOTYPE 		= WebGLProgram.prototype;
	
	const ACCESSORS = {
		getUniformActiveInfos : {
			get : function _cache ( ) {
				const infos = [];
				for( var i = this.getActiveUniforms - 1; i >= 0; i-- ) {
					const info = this.getActiveUniform( i );
					info.location = this.getUniformLocation( info.name );
					infos[i] = info;
				}
				return infos;
			}
		},
		getAttributeActiveInfos:{
			get:function _cache(){
				var infos = [];
				for(var i = this.getActiveAttributes - 1; i >= 0; i--) {
					var info = this.getActiveAttrib( i );
					
					info.location = this.getAttribLocation( info.name );
					info.buffer = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING );
					info.arrayEnabled = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_ENABLED );
					info.arraySize = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_SIZE );
					info.arrayStride = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_STRIDE );
					info.arrayType = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_TYPE );
					info.arrayTypeFlag = gl.flags[info.arrayType];
					info.arrayNormalized = gl.getVertexAttrib( info.location, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED );
					infos[i] = info;
				}
				return infos;
			}
		},
		getInfoLog:{
			get:function(){
				return gl.getProgramInfoLog(this);
			}
		},
		getAttachedShaders:{
			get:function(){
				return gl.getAttachedShaders(this,GL.ATTACHED_SHADERS);
			}
		},
		getActiveAttributes:{
			get:function(){
				return gl.getProgramParameter(this,GL.ACTIVE_ATTRIBUTES);
			}
		},
		getActiveUniforms:{
			get:function(){
				return gl.getProgramParameter(this,GL.ACTIVE_UNIFORMS);
			}
		},
		getDeleteStatus:{
			get:function(){
				return gl.getProgramParameter(this,GL.DELETE_STATUS);
			}
		},
		getLinkStatus:{
			get:function(){
				return gl.getProgramParameter(this,GL.LINK_STATUS);
			}
		},
		getValidateStatus:{
			get:function(){
				return gl.getProgramParameter(this,GL.VALIDATE_STATUS);
			}
		}
	};
	const RENDERING = {
		clear:function(mask){
			gl.clear(mask);
			return this;
		},
		clearColor:function(red,green,blue,alpha){
			gl.clearColor(red,green,blue,alpha);
			return this;
		},
		clearDepth:function(depth){
			gl.clearDepth(depth);
			return this;
		},
		clearStencil:function(s){
			gl.clearStencil(s);
			return this;
		},
		drawArrays:function(mode,first,count){
			gl.drawArrays(mode,first,count);
			return this;
		},
		drawElements:function(mode,count,type,offset){
			gl.drawElements(mode,count,type,offset);
			return this;
		},
	};
	const BINDINGS = {
		delete:function(){
			gl.deleteProgram(this);
			return this;
		},
		use:function(){
			gl.useProgram(this);
			return this;
		},
		link:function(){
			gl.linkProgram(this);
			if ( !this.getLinkStatus ) console.warn( this.getInfoLog );
			return this; 
		},
		validate:function(){
			gl.validateProgram(this);
			if ( !this.getValidateStatus ) console.warn( this.getInfoLog );
			return this;
		},
		attachShader:function(shader){
			gl.attachShader(this,shader);
			return this;
		},
		detachShader:function(shader){
			gl.detachShader(this,shader);
			return this;
		},
		getActiveAttrib:function(index){
			return gl.getActiveAttrib(this,index);
		},
		getActiveUniform:function(index){
			return gl.getActiveUniform(this,index);
		},
		getUniform:function(location){
			return gl.getUniform(this,location);
		},
		getUniformLocation:function(name){
			return gl.getUniformLocation(this,name);
		},
		getAttribLocation:function(name){
			return gl.getAttribLocation(this,name);
		},
		bindAttribLocation:function(index,name){
			gl.bindAttribLocation(this,index,name);
			return this;
		},
	};

	Object.defineProperties(PROTOTYPE,ACCESSORS);
	for(var p in RENDERING) PROTOTYPE[p] = RENDERING[p];
	for(var p in BINDINGS) PROTOTYPE[p] = BINDINGS[p];

	window.Program = core.Program = Program
}();
