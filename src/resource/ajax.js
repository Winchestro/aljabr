define( [
	"../utilities/ProeprtyDescriptors"
], function module(
	def
) {
	"use strict";

	class Ajax {
		constructor ( ) {
			def.Properties( this, {
				request : new XMLHttpRequest
			}, def.CONFIGURABLE );

			this.request.addEventListener( "readystatechange", this );
			
		}
		handleEvent ( event ) {
			switch ( event.type ) {
				case "readystatechange" : {
					
				} break;
			}
		}
	}
});