define ( [
], function module (
){
	"use strict";

	class ClientInt8Array extends Int8Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return Int8Array;
});