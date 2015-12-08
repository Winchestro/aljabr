define ( function module ( ) {
    "use strict";
    
    const E = 0b001;
    const C = 0b010;
    const W = 0b100;

    const DESCRIPTOR = {
        enumerable : false,
        configurable : false,
        writable : false,
        value : null
    };
    const DESCRIPTOR_GETTER = {
        enumerable : false,
        configurable : false,
        get : null
    };
    const DESCRIPTOR_SETTER = {
        enumerable : false,
        configurable : false,
        set : null
    };
    const DESCRIPTOR_GETTER_SETTER = {
        enumerable : false,
        configurable : false,
        get : null,
        set : null
    };

    function Properties( target, values, descriptorMask ) {
        DESCRIPTOR.enumerable   = ( descriptorMask & E ) ? true : false;
        DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
        DESCRIPTOR.writable     = ( descriptorMask & W ) ? true : false;
        for( let p in values ) {
            DESCRIPTOR.value = values[ p ];
            Object.defineProperty( target, p, DESCRIPTOR );
        }
    }

    function Property( target, key, value, descriptorMask ) {
        DESCRIPTOR.enumerable   = ( descriptorMask & E ) ? true : false;
        DESCRIPTOR.configurable = ( descriptorMask & C ) ? true : false;
        DESCRIPTOR.writable     = ( descriptorMask & W ) ? true : false;
        DESCRIPTOR.value        = value;
        Object.defineProperty( target, key, DESCRIPTOR );
    }

    function Getters( target, getters, descriptorMask ) {
        DESCRIPTOR_GETTER.enumerable    = ( descriptorMask & E ) ? true : false;
        DESCRIPTOR_GETTER.configurable  = ( descriptorMask & C ) ? true : false;

        for( let p in getters ) {
            DESCRIPTOR_GETTER.get = getters[ p ];
            Object.defineProperty( target, p, DESCRIPTOR_GETTER );
        }
        
    }

    function Setters( target, setters, descriptorMask ) {
        DESCRIPTOR_SETTER.enumerable    = ( descriptorMask & E ) ? true : false;
        DESCRIPTOR_SETTER.configurable  = ( descriptorMask & C ) ? true : false;


        for( let p in setters ) {
            DESCRIPTOR_SETTER.set = getters[ p ];
            Object.defineProperty( target, p, DESCRIPTOR_SETTER );
        }

    }

    function GetterSetters( target, getters, setters, descriptorMask ) {
        DESCRIPTOR_GETTER_SETTER.enumerable     = ( descriptorMask & E ) ? true : false;
        DESCRIPTOR_GETTER_SETTER.configurable   = ( descriptorMask & C ) ? true : false;

        for( let p in setters ) {
            DESCRIPTOR_GETTER_SETTER.get = getters[ p ];
            DESCRIPTOR_GETTER_SETTER.set = setters[ p ];
            Object.defineProperty( target, p, DESCRIPTOR_GETTER_SETTER );
        }
    }
    function Mixin ( target, source ) {
        let names = Object.getOwnPropertyNames( source );
        let superClass = Object.getPrototypeOf( source );

        for ( let name of names ) Object.defineProperty(
            target,
            name,
            Object.getOwnPropertyDescriptor( source, name )
        );

        if ( superClass && !( target instanceof superClass.constructor ) ) Mixin( target, superClass );
        return target;
    }
    return {
        ENUMERABLE : E,
        WRITABLE : W,
        CONFIGURABLE : C,
        Property : Property,
        Properties : Properties,
        Getters : Getters,
        Setters : Setters,
        GetterSetters : GetterSetters,
        Mixin : Mixin
    }
});