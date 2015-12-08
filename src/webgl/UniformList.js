define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Uniform",
    "../webgl/UniformArray",
    "../webgl/UniformStruct"
], function module (
    def,
    Uniform,
    UniformArray,
    UniformStruct
) {
    "use strict";

    class UniformList {
        constructor ( program ) {
            if ( !program ) return;
            else this.setFromProgram( program, "getActiveUniforms" );
        }
    }
    def.Properties( UniformList.prototype, {
        clone ( ) {
            let list = new UniformList;
            def.Properties( list, this, def.WRITABLE | def.ENUMERABLE );
            return list;
        },
        setFromProgram ( program, cacheAccessor ) {
            if ( cacheAccessor ) def.Property( program, cacheAccessor, this, def.CONFIGURABLE );
            for( let i = program.getActiveUniformsLength - 1; i >= 0; i-- ) {
                let info        = program.getActiveUniform( i );
                let location    = program.getUniformLocation( info.name );
                let path        = info.name.split( /[\[\].]/ ).filter( function( e ) { return e; });
                
                resolvePath.call( this, path );
                function resolvePath( path ) {
                    let member = path.shift();
                    if ( path.length === 0 ) return this[ member ] = Uniform.create( info, location );
                    else if ( this[ member ] === undefined ){
                        let dataType = isNaN( parseInt( path[ 0 ], 10 ) ) ? UniformStruct : UniformArray;
                        this[ member ] = new dataType( info );

                        if ( path.length === 1 && info.size > 1 ) {
                            let nameString = info.name;
                            let matchLastIndex = /\d*(?=\]$)/;
                            for ( let i = 1; i < info.size; i++ ) {
                                let name = nameString.replace( matchLastIndex, i );
                                this[ member ][ i ] = Uniform.create( info, program.getUniformLocation( name ) );
                            }
                        }
                        
                    }
                    return resolvePath.call( this[ member ], path );
                }
            }
            return this;
        }
    });

    return UniformList;
});