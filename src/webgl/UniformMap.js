import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import Uniform from "../webgl/Uniforms.js";
import { UniformArray, UniformStruct } from "../webgl/Uniforms.js";

export default class UniformMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getUniforms" );
	}
}
Properties( UniformMap.prototype, {
	clone ( ) {
		let map = new UniformMap;
		Properties( map, this, W | E );
		return map;
	},
	setFromProgram ( program, cacheAccessor ) {
		if ( cacheAccessor ) Property( program, cacheAccessor, this, C );
		for( let i = program.getActiveUniformsLength - 1; i >= 0; i-- ) {
			let info		= program.getActiveUniform( i );
			let location	= program.getUniformLocation( info.name );
			let path		= info.name.split( /[\[\].]/ ).filter( e=>e );
			
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
