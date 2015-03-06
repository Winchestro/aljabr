export const E = 0b001;
export const C = 0b010;
export const W = 0b100;

export function Properties( target, values, descriptorMask ) {
	let descriptor = {};
	if ( descriptorMask & E ) descriptor.enumerable = true;
	if ( descriptorMask & C ) descriptor.configurable = true;
	if ( descriptorMask & W ) descriptor.writable = true;

	for( let p in values ) {
		descriptor.value = values[ p ];
		Object.defineProperty( target, p, descriptor );
	}
}

export function Getters( target, getters, descriptorMask ) {
	let descriptor = {};
	if ( descriptorMask & E ) descriptor.enumerable = true;
	if ( descriptorMask & C ) descriptor.configurable = true;

	for( let p in getters ) {
		descriptor.get = getters[ p ];
		Object.defineProperty( target, p, descriptor );
	}
}

export function Setters( target, setters, descriptorMask ) {
	let descriptor = {};
	if ( descriptorMask & E ) descriptor.enumerable = true;
	if ( descriptorMask & C ) descriptor.configurable = true;

	for( let p in setters ) {
		descriptor.set = getters[ p ];
		Object.defineProperty( target, p, descriptor );
	}
}

export function GetterSetters( target, getters, setters, descriptorMask ) {
	let descriptor = {};
	if ( descriptorMask & E ) descriptor.enumerable = true;
	if ( descriptorMask & C ) descriptor.configurable = true;

	for( let p in setters ) {
		descriptor.get = getters[ p ];
		descriptor.set = setters[ p ];
		Object.defineProperty( target, p, descriptor );
	}
}