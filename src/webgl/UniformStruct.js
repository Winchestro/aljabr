define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/Uniform"
], function module (
    def,
    gl,
    Uniform
) {
    "use strict";

    class UniformStruct extends Uniform {
        
    }
    window.COUNT = 0;
    window.MISS = 0;
    def.Properties( UniformStruct.prototype, {
        set ( object ) {
            for ( var propertyName in object ) {
                let ownProperty = this[ propertyName ];
                if ( ownProperty ) COUNT++, ownProperty.set( object[ propertyName ] );
                else MISS++;
            }
            return this;
        },
        instantiate ( ) {
            let instance =  Object.create( this );
            for ( let property in this ) instance[ property ] = this[ property ].instantiate();
            return instance;
        }
    });

    return UniformStruct;
});