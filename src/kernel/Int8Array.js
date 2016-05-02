define ( [
], function module (
){
	"use strict";

	class ClientInt8Array extends Int8Array {
		
		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return Int8Array;
});