define( [
    "../utilities/PropertyDescriptors",
    "../webgl/AttributeLocation"
], function module (
    def,
    AttributeLocation
) {
    "use strict";
    
    class AttributeList {
        constructor ( program ) {
            if ( !program ) return;
            else this.setFromProgram( program, "getActiveAttributes" );
        }
    }

    def.Properties( AttributeList.prototype, {
        clone ( ) {
            let list = new AttributeList;
            def.Properties( list, this, def.WRITABLE | def.ENUMERABLE );
            return map;
        },
        setFromProgram ( program, cacheAccessor ) {
            if ( cacheAccessor ) def.Property( program, cacheAccessor, this, def.CONFIGURABLE );

            for( let i = program.getActiveAttributesLength - 1; i >= 0; i-- ) {
                let info = program.getActiveAttrib( i );
                let name = info.name;
                def.Property( this, name, new AttributeLocation( 
                    program.getAttribLocation( name ),
                    info
                ), def.ENUMERABLE );
            }
        }
    });
    return AttributeList;
});