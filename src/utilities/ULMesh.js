import Geometry from "./ULGeometry";
import Material from "./ULMaterial";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./ULPropertyDescriptors";

export default class Mesh {
	constructor( geometry = new Geometry, material = new Material ) {
		this.geometry = geometry;
		this.material = material;
	}
	use ( ) {
		this.geometry.use();
		this.material.use();
	}
	drawTriangles( ) {
		
	}
	drawLines( ) {

	}
	drawPoints( ) {

	}

}