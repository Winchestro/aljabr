import { gl, GL } from "./GLContext";

Object.defineProperties( WebGLActiveInfo.prototype, { 
	typeFlag : {
		get : function ( ) {
			return gl.flags[ this.type ];
		}
	}
} );
