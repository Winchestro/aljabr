define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    def.Getters( WebGLActiveInfo.prototype, {
        typeString ( ) { return gl.strings[ this.type ]; }
    });

});
