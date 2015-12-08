define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";
    
    class ExtensionLoader {};
    gl.getSupportedExtensions().forEach( function ( extension ) {
        Object.defineProperty( this, extension, {
            enumerable : true,
            configurable : true,
            get : function ( ) {
                var resolved = gl.getExtension ( extension );
                Object.defineProperty( this, extension, {
                    enumerable : true,
                    value : resolved
                });
                return resolved;
            }
        });
    }, ExtensionLoader.prototype );
    return new ExtensionLoader;
});