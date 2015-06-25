import Camera from "../utilities/Camera.js";
import Light from "../utilities/Light.js";

export default class Scene {
	constructor ( camera ) {
		this.camera = camera;
		this.lights = [];
		this.objects = [];
		this.uniforms = {};
	}
}