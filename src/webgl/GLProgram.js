import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";
import AttributeLocation from "../webgl/GLAttributeLocation";
import Shader from "../webgl/GLShader";
import { Uniform } from "../utilities/ULUniforms";
import Resource from "../utilities/ULResource";

export default class Program {
	constructor ( ) {
		return gl.createProgram();
	}
	static VertexColors ( ) {
		return gl.createProgram().attachShader( Shader.Vertex(`
			precision mediump float;
			precision mediump int;

			attribute vec3 position;
			attribute vec2 texCoord;
			attribute vec4 color;


			uniform mat4 modelMatrix;
			uniform mat4 viewMatrix;
			uniform mat4 projectionMatrix;
			uniform vec3 modelScale;

			varying vec4 v_color;
			varying vec2 v_texCoord;

			void main ( void ) {
				vec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );
				vec4 viewVertex = viewMatrix * worldVertex;
				vec4 pos = projectionMatrix * viewVertex ;
				gl_Position = pos;
				gl_PointSize = -pos.z  + 6.;
				v_color = color;
				v_texCoord = texCoord;
			}
		`)).attachShader( Shader.Fragment(`
			precision mediump float;
			precision mediump int;

			varying vec4 v_color;
			varying vec2 v_texCoord;

			uniform float time;
			uniform sampler2D tex0;

			void main ( void ) {
				vec4 t = texture2D( tex0, v_texCoord );
				
				gl_FragColor = v_color;
			}
		`)).bindLocations(
			"position",
			"color",
			"normal",
			"texCoord"
		).link().use();
	}
	static DynamicSource ( url, refreshInterval ) {
		let fsLoaded = false;
		let vsLoaded = false;
		let vs = Shader.Vertex();
		let fs = Shader.Fragment();
		let program = gl.createProgram().attachShader( fs ).attachShader( vs );

		let vsSource = new Resource.http( url + ".vert", { interval : refreshInterval } );
		let fsSource = new Resource.http( url + ".frag", { interval : refreshInterval } );
		let fsCompile = new Resource( function ( fsCode ) {
			fsLoaded = true;
			fs.setShaderSource( fsCode );
			if ( vsLoaded ) return program;
		} );
		let vsCompile = new Resource( function ( vsCode ) {
			vsLoaded = true;
			vs.setShaderSource( vsCode );
			if ( fsLoaded ) return program;
		} );
		let programLink = new Resource( function( program ) {
			return program;
		} ); 
		
		vsSource.setTarget( vsCompile );
		fsSource.setTarget( fsCompile );
		vsCompile.setTarget( programLink );
		fsCompile.setTarget( programLink );
		
		
		

		
		return programLink;
	}
}

Properties( WebGLProgram.prototype, {
	bindLocations ( ) {
		for ( let location in arguments ) {
			this.bindAttribLocation( location, arguments[ location ] );
		}
		return this;
	},
	delete ( ) {
		gl.deleteProgram( this );
		return this;
	},
	use ( ) {
		gl.useProgram( this );
		return this;
	},
	link ( ) {
		let s = this.getAttachedShaders;
		if ( s.length === 2 && s[0].getCompileStatus && s[1].getCompileStatus ) { 
			gl.linkProgram( this );
			if ( !this.getLinkStatus ) console.error( this.getInfoLog );
			else { 
				this.clearCache(); 
			}
		}
		return this; 
	},
	clearCache ( ) {
		let properties = Object.getOwnPropertyNames( this );
		for( let p in properties ) delete this[ properties[ p ] ];
		return this;
	},
	validate ( ) {
		gl.validateProgram( this );
		if ( !this.getValidateStatus ) console.error( this.getInfoLog );
		return this;
	},
	attachShader ( shader ){
		if( Object.hasOwnProperty( this, "getAttachedShaders" ) ) delete this.getAttachedShaders;
		gl.attachShader( this, shader );
		return this;
	},
	detachShader ( shader ) {
		if( Object.hasOwnProperty( this, "getAttachedShaders" ) ) delete this.getAttachedShaders;
		gl.detachShader( this, shader );
		return this;
	},
	getActiveAttrib ( index ) {
		return gl.getActiveAttrib( this, index );
	},
	getActiveUniform ( index ) {
		return gl.getActiveUniform( this, index );
	},
	getUniform ( location ) {
		return gl.getUniform( this, location );
	},
	getUniformLocation ( name ) {
		return gl.getUniformLocation( this, name );
	},
	getAttribLocation ( name ) {
		return gl.getAttribLocation( this, name );
	},
	bindAttribLocation ( index, name ) {
		gl.bindAttribLocation( this, index, name );
		return this;
	},
});
Getters( WebGLProgram.prototype, {
	getUniforms 				(){ return new UniformMap( this );},
	getAttributes				(){ return new AttributeMap( this );},
	getInfoLog					(){ return gl.getProgramInfoLog( this );},
	getAttachedShaders			(){ return gl.getAttachedShaders( this, GL.ATTACHED_SHADERS );},
	getActiveAttributesLength	(){ return gl.getProgramParameter( this, GL.ACTIVE_ATTRIBUTES );},
	getActiveUniformsLength		(){ return gl.getProgramParameter( this, GL.ACTIVE_UNIFORMS );},
	getDeleteStatus				(){ return gl.getProgramParameter( this, GL.DELETE_STATUS );},
	getLinkStatus				(){ return gl.getProgramParameter( this, GL.LINK_STATUS );},
	getValidateStatus			(){ return gl.getProgramParameter( this, GL.VALIDATE_STATUS );},
});

class UniformMap {
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

class AttributeMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getAttributes" );
	}
}
Properties( AttributeMap.prototype, {
	clone ( ) {
		let map = new AttributeMap;
		Properties( map, this, W | E );
		return map;
	},
	setFromProgram ( program, cacheAccessor ) {
		if ( cacheAccessor ) Property( program, cacheAccessor, this, C );

		for( let i = program.getActiveAttributesLength - 1; i >= 0; i-- ) {
			let info = program.getActiveAttrib( i );
			let name = info.name;
			Property( this, name, new AttributeLocation( 
				program.getAttribLocation( name ),
				info
			), E );
		}
	}
});



/*
class AttributeInfoMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getAttributeInfos" );
	}
	setFromProgram ( program, cacheAccessor ) {
		// optionally cache results by masking accessor.
		if ( cacheAccessor ) Property( program, cacheAccessor, this, C );
		
		for( let i = program.getActiveAttributesLength - 1; i >= 0; i-- ) {
			let info = program.getActiveAttrib( i );
			let name = info.name;
			Property( this, "name", info, E );
		}
	}
}
class AttributeLocationMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getAttributeLocations" );
	}
	setFromProgram ( program, cacheAccessor ) {
		if ( cacheAccessor ) Property( program, cacheAccessor, this, C );
		let infos = program.getAttributeInfos;
		
		for( let info in infos ) {
			Property( this, info, new AttributeLocation( 
				program.getAttribLocation( info ),
				infos[ info ]
			), E );
		}
	}
}
class UniformLocationMap {
	constructor ( program ) {
		if ( !program ) return;
		Object.defineProperty( program, "getUniformLocations", { value : this, configurable : true } );
		getLocations.call( this, program.getUniformInfos );
			
		function getLocations ( infoMap ) {
			for ( let info in infoMap ) {
				let activeInfo = infoMap[ info ];
				let location;
				if ( activeInfo instanceof UniformStruct ) {
					location = getLocations.call( activeInfo.cloneShallow(), activeInfo );
				}
				else {
					
					
					Object.defineProperty( location, "value", {
						get : function ( ) { return program.getUniform( this ); }
					} );
				}
				Object.defineProperty( this, info, {
					value : location,
					enumerable : true
				} );		
			}
			return this;
		}
	}
}

class UniformValueMap {
	constructor ( program ) {
		if ( !program ) return;
		Object.defineProperty( program, "getUniformValues", { value : this, configurable : true } );
		let locations = program.getUniformLocations;
		
		function getValues 
		for( let name in locations ) {
			let location = locations[ name ];
			if ( location
			Object.defineProperty( this, name, {
				value : location.value,
				writable : true,
				enumerable : true
			} );
		}
	}
}


class UniformMethodMap {
	constructor ( program ) {
		if ( !program ) return;
		Object.defineProperty( program, "getUniformMethods", { value : this, enumerable : true } );
		let infos = program.getUniformInfos;
		let locations = program.getUniformLocations;
		for ( let info in infos ) {
			Object.defineProperty( this, info, {
				value : getMethod( infos[ info ] ),
				enumerable : true
			} );
		}

		function getMethod ( ActiveInfo ) {
			let { name, type, size } = ActiveInfo;
			let location = locations[ name ];
			switch ( type ) {
				case GL.FLOAT :
					if ( size === 1 ) return location.set1f;
					else return location.set1fv;
				case GL.FLOAT_VEC2 :
					if ( size === 1 ) return location.set2f;
					else return location.set2fv;
				case GL.FLOAT_VEC3 :
					if ( size === 1 ) return location.set3f;
					else return location.set3fv;
				case GL.FLOAT_VEC4 :
					if ( size === 1 ) return location.set4f;
					else return location.set4fv;
				case GL.INT :
					if ( size === 1 ) return location.set1i;
					else return location.set1iv;
				case GL.INT_VEC2 :
					if ( size === 1 ) return location.set2i;
					else return location.set2iv;
				case GL.INT_VEC3 :
					if ( size === 1 ) return location.set3i;
					else return location.set3iv;
				case GL.INT_VEC4 :
					if ( size === 1 ) return location.set4i;
					else return location.set4iv;
				case GL.FLOAT_MAT2 :
					return location.setMat2;
				case GL.FLOAT_MAT3 :
					return location.setMat3;
				case GL.FLOAT_MAT4 :
					return location.setMat4;
				default : break;
			}

		}
	}
}

const UNIFORM_TYPE = new Map([
	[ GL.FLOAT, 		"uniform1f" ],
	[ GL.FLOAT_VEC2, 	"uniform2f" ],
	[ GL.FLOAT_VEC3,	"uniform3f" ],
	[ GL.FLOAT_VEC4,	"uniform4f" ],

	[ GL.INT, 			"uniform1i" ],
	[ GL.INT_VEC2,		"uniform2i" ],
	[ GL.INT_VEC3,		"uniform3i" ],
	[ GL.INT_VEC4,		"uniform4i" ],

	[ GL.FLOAT_MAT2,	"uniformMatrix2fv" ],
	[ GL.FLOAT_MAT3,	"uniformMatrix3fv" ],
	[ GL.FLOAT_MAT4,	"uniformMatrix4fv" ],
]);

*/