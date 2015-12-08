define( function module ( ) {
    return function allocateUint( length ) {
        return ( length < ( 1 << 8 ) ? new Uint8Array( length )
                : length < ( 1 << 16 ) ? new Uint16Array( length )
                : new Uint32Array( length )
        )
    }
});
