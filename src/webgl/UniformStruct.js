import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

import Uniform from "../webgl/Uniform.js";

export default class UniformStruct extends Uniform {
    
}


def.Properties( UniformStruct.prototype, {
    set ( object ) {
        for ( let propertyName in this ) {
            let targetProperty = this[ propertyName ];
            let sourceProperty = object[ propertyName ];
            if ( targetProperty && sourceProperty ) targetProperty.set( sourceProperty );
        }
        return this;
    },
    instantiate ( ) {
        let instance =  Object.create( this );
        for ( let property in this ) instance[ property ] = this[ property ].instantiate();
        return instance;
    }
});