import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { vec2, vec3, vec4, quat4 } from "../math/MLVector";
import { mat4 } from "../math/MLMatrix";

export default class Camera {
	static Perspective ( aspect, fov ) {
		
		this.rotation = new quat4;

	}
	static Orthographic ( ) {

	} 
} 