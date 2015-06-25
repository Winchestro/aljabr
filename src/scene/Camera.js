import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { mat2, mat3, mat4, vec2, vec3, vec4, quat4 } from "../math/math.js";

export default class Camera {
	constructor ( matrix ) {
		this.matrix = matrix;
	}
	static Perspective ( aspect, fov, near, far ) {
		return new Camera( new mat4.Perspective( aspect, fov, near, far ) );
	}
	
} 