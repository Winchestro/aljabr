import def from "../utilities/PropertyDescriptors.js";

export default class ClientArrayBuffer extends ArrayBuffer {
	constructor ( byteLength ) {
		super( byteLength );
		def.Property( this, "target", null, def.WRITABLE );
	}

	update ( ) {
		if( this.target ) this.target.update( this );
		return this;
	}
	
	allocateTarget ( usage, target ) {
		if ( target !== undefined ) this.setTarget( target );
		this.target.bind().allocate( this, usage );
		return this;
	}
	

	setTarget ( vbo ) {
		this.target = vbo;
		return this;
	}
}