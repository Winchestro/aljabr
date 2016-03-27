define([
], function module (
){
	"use strict";

	class ClientUint32Array extends Uint32Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return ClientUint32Array;
});