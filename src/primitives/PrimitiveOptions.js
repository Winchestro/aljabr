define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    class GeometryOptions {
        constructor( colorFn ) {
            this.colorFn = colorFn;
        }
    }
    
    def.Properties( GeometryOptions.prototype, {
        structure : {
            position    : new Float32Array( 3 ),
            color       : new Float32Array( 4 ),
            normal      : new Float32Array( 3 ),
            uv          : new Float32Array( 2 )
        },
        usage : gl.STATIC_DRAW,
        preallocateVertices : 0
    }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );

    return GeometryOptions;
});