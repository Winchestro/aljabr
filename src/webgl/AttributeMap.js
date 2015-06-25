import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

export default class AttributeMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getAttributes" );
	}
}
Properties( AttributeMap.prototype, {
	clone ( ) {
		let map = new AttributeMap;
		Properties( map, this, W | E );
		return map;
	},
	setFromProgram ( program, cacheAccessor ) {
		if ( cacheAccessor ) Property( program, cacheAccessor, this, C );

		for( let i = program.getActiveAttributesLength - 1; i >= 0; i-- ) {
			let info = program.getActiveAttrib( i );
			let name = info.name;
			Property( this, name, new AttributeLocation( 
				program.getAttribLocation( name ),
				info
			), E );
		}
	}
});