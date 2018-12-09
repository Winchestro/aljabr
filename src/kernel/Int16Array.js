export default class ClientInt16Array extends Int16Array {
	
	update ( ) {
		this.buffer.update( this );
		return this;
	}

	setValues ( ) {
		this.set.call( this, arguments );
		return this;
	}
}