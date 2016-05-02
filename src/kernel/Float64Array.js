define ( [
], function module (
){
	"use strict";

	class ClientFloat64Array extends Float64Array {
		
		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return ClientFloat64Array;
});