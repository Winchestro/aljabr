define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
){
    "use strict";
    class VBOArrayBuffer {
        constructor ( byteLength, usage ) {
            let arrayBuffer = new ArrayBuffer( byteLength );
            let vbo = gl.createBuffer();

            def.Property( arrayBuffer, "vbo", vbo, def.CONFIGURABLE );
            def.Property( vbo, "arrayBuffer", arrayBuffer, def.CONFIGURABLE );

            vbo.bind().bufferData( byteLength, usage );

            return arrayBuffer;
        }
    }

    return VBOArrayBuffer;
});