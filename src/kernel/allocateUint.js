define( [
	"../kernel/Uint8Array",
	"../kernel/Uint16Array",
	"../kernel/Uint32Array"
], function module (
	Uint8Array,
	Uint16Array,
	Uint32Array
) {
	"use strict";

    return function allocateUint( length ) {
        return ( length < ( 1 << 8 ) ? new Uint8Array( length )
                : length < ( 1 << 16 ) ? new Uint16Array( length )
                : new Uint32Array( length )
        )
    }
});
