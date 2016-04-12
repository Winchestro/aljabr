define([
], function module (
){
	"use strict";

	class ClientUint16Array extends Uint16Array {
		
		update ( ) {
			this.buffer.update( this );
		}

		setValues ( ) {
			this.set.call( this, arguments );
		}
	}

	return ClientUint16Array;
});