export default class ClientUint32Array extends Uint32Array {
	
	update ( ) {
		this.buffer.update( this );
		return this;
	}

	setValues ( ) {
		this.set.call( this, arguments );
		return this;
	}
}