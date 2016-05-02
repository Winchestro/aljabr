define ( [
], function module (
){
	"use strict";

	class ClientInt16Array extends Int16Array {
		
		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return Int16Array;
});