define ( [
], function module (
){
	"use strict";

	class ClientUint8Array extends Uint8Array {
		
		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return ClientUint8Array;
});