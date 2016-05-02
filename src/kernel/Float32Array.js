define ( [
], function module (
){
	"use strict";

	class ClientFloat32Array extends Float32Array {

		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return ClientFloat32Array;
});