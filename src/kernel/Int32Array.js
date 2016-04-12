define ( [
], function module (
){
	"use strict";

	class ClientInt32Array extends Int32Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return Int32Array;
});