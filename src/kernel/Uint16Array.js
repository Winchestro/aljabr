define([
], function module (
){
	"use strict";

	class ClientUint16Array extends Uint16Array {
		
		update ( ) {
			this.buffer.update( this );
			return this;
		}

		setValues ( ) {
			this.set.call( this, arguments );
			return this;
		}
	}

	return ClientUint16Array;
});