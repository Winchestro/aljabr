import Uint8Array from "../kernel/Uint8Array.js";
import Uint16Array from "../kernel/Uint16Array.js";
import Uint32Array from "../kernel/Uint32Array.js";

export default function allocateUint( length ) {
    return ( length < ( 1 << 8 ) ? new Uint8Array( length )
            : length < ( 1 << 16 ) ? new Uint16Array( length )
            : new Uint32Array( length )
    )
}