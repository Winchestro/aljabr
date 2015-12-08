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
        *[ Symbol.iterator ] ( ) {
            let properties = Object.getOwnPropertyNames( this );
            let index = 0;
            while ( index < properties.length ) yield this[ properties[ index++ ] ];
        }
    }

    def.Properties( UniformStruct.prototype, {
        set ( object ) {
            for ( var property in this ) {
                if ( object && property in object ) this[ property ].set( object[ property ] );
                else this[ property ].set();
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