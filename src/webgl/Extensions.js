import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

class ExtensionLoader {};
gl.getSupportedExtensions().forEach( function ( extensionName ) {

    def.Getter( this, extensionName, function unresolvedExtensionGetter ( ) {
        let resolvedExtension = gl.getExtension( extensionName );
        
        def.Property( this, extensionName, resolvedExtension, def.ENUMERABLE );
        return resolvedExtension;
    }, def.ENUMERABLE | def.CONFIGURABLE );

}, ExtensionLoader.prototype );

export default new ExtensionLoader;