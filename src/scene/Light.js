import { mat2, mat3, mat4, vec2, vec3, vec4, quat4 } from "../math/math.js";

export default class Light {
	constructor ( ) {
		this.position 		= new vec3( 0.0, 0.0, 1.0 );
		this.attenuation 	= new vec3( 1.0, 0.0, 0.01 );
		this.direction 		= new vec3( 0.0, 0.0, 0.0 );
		this.color 			= new vec3( 1.0, 1.0, 1.0 );
		this.outerCutoff 	= 1.8;
		this.innerCutoff 	= .1;
		this.exponent 		= 2.;
	}
}