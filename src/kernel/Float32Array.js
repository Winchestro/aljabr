define ( [
], function module (
){
	"use strict";

	class ClientFloat32Array extends Float32Array {

		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return ClientFloat32Array;
});