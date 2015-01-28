void function GLActiveInfo(){
	const GL 						= WebGLRenderingContext.prototype;
	const Resource 					= Resource;
	const PROTOTYPE 				= WebGLActiveInfo.prototype;

	const ACCESSORS = {
		typeFlag : {
			get : function ( ) {
				return gl.flags[ this.type ];
			}
		}
	}

	Object.defineProperties(PROTOTYPE,ACCESSORS);
}()