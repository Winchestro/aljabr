export const E = 0b001;
export const C = 0b010;
export const W = 0b100;

const DESCRIPTOR = {};

export function Properties( target, values, descriptorMask ) {
	DESCRIPTOR.enumerable 	= ( descriptorMask & E ) ? true : false;
	DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
	DESCRIPTOR.writable 	= ( descriptorMask & W ) ? true : false;
	for( let p in values ) {
		DESCRIPTOR.value = values[ p ];
		Object.defineProperty( target, p, DESCRIPTOR );
	}
	delete DESCRIPTOR.value;
}

export function Property( target, key, value, descriptorMask ) {
	DESCRIPTOR.enumerable 	= ( descriptorMask & E ) ? true : false;
	DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
	DESCRIPTOR.writable 	= ( descriptorMask & W ) ? true : false;
	DESCRIPTOR.value 		= value;
	Object.defineProperty( target, key, DESCRIPTOR );
	delete DESCRIPTOR.value;
}

export function Getters( target, getters, descriptorMask ) {
	DESCRIPTOR.enumerable 	= ( descriptorMask & E ) ? true : false;
	DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
	delete DESCRIPTOR.writable;

	for( let p in getters ) {
		DESCRIPTOR.get = getters[ p ];
		Object.defineProperty( target, p, DESCRIPTOR );
	}
	delete DESCRIPTOR.get;
}

export function Setters( target, setters, descriptorMask ) {
	DESCRIPTOR.enumerable 	= ( descriptorMask & E ) ? true : false;
	DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
	delete DESCRIPTOR.writable;

	for( let p in setters ) {
		DESCRIPTOR.set = getters[ p ];
		Object.defineProperty( target, p, DESCRIPTOR );
	}
	delete DESCRIPTOR.set;
}

export function GetterSetters( target, getters, setters, descriptorMask ) {
	DESCRIPTOR.enumerable 	= ( descriptorMask & E ) ? true : false;
	DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
	delete DESCRIPTOR.writable;

	for( let p in setters ) {
		DESCRIPTOR.get = getters[ p ];
		DESCRIPTOR.set = setters[ p ];
		Object.defineProperty( target, p, DESCRIPTOR );
	}
	delete DESCRIPTOR.get;
	delete DESCRIPTOR.set;
}