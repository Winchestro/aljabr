import def from "../utilities/PropertyDescriptors.js";
import Resource from "../resource/Resource.js";
import Texture from "../webgl/Texture.js";

export default class HttpSourceTexture {
	constructor ( url ) {
		this.image = new Image;
		this.texture = new Texture;

		image.src = url;

		image.addEventListener( "load", this );
	}
	handleEvent ( event ) {
		switch ( event.type ) {
			case "load": {
				this.texture.bind().image2d( this.image );
			} break;


		}
	}
}