define ( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
	"use strict";

	class ClientArrayBuffer extends ArrayBuffer {
		constructor ( byteLength, targetVBO ) {
			super( byteLength );
			def.Property( this, "target", targetVBO, def.WRITABLE );
		}

		update ( ) {
			if( this.target ) this.target.update( this );
		}
	}

	return ClientArrayBuffer;
});