import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";

Object.defineProperties( WebGLActiveInfo.prototype, { 
	typeFlag : {
		get : function ( ) {
			return gl.flags[ this.type ];
		}
	}
} );
