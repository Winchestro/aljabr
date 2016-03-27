define ( [
], function module (
){
	"use strict";

	class ClientFloat64Array extends Float64Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return ClientFloat64Array;
});