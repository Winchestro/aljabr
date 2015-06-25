import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";

Object.defineProperties( WebGLActiveInfo.prototype, { 
	typeFlag : {
		get : function ( ) {
			return gl.flags[ this.type ];
		}
	}
} );
