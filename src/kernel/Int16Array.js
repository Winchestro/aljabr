define ( [
], function module (
){
	"use strict";

	class ClientInt16Array extends Int16Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return Int16Array;
});