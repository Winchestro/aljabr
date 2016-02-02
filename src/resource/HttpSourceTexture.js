define( [
	"../utilities/PropertyDescriptors",
	"../resource/Resource",
	"../webgl/Texture"
], function module (
	def,
	Resource,
	Texture
) {
	"use strict";

	class HttpSourceTexture {
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
});