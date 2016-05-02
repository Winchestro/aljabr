define ( [
    "../utilities/PropertyDescriptors"
], function module (
    def
){
	"use strict";

	class ClientArrayBuffer extends ArrayBuffer {
		constructor ( byteLength ) {
			super( byteLength );
			def.Property( this, "target", null, def.WRITABLE );
		}

		update ( ) {
			if( this.target ) this.target.update( this );
			return this;
		}

		setTarget ( vbo ) {
			this.target = vbo;
			return this;
		}
	}

	return ClientArrayBuffer;
});