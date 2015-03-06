import { gl, GL } from "./GLContext";
import Shader from "./GLShader";
import "./GLUniformLocation";
import "./GLActiveInfo";
import AttributeLocation from "./GLAttributeLocation";
import { Uniform, UniformStruct, UniformArray } from "./utilities/ULUniforms";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

const PROTOTYPE 		= WebGLProgram.prototype;

export default class Program {
	constructor ( ) {
		return gl.createProgram();
	}
	static VertexColors ( ) {
		return gl.createProgram().attachShader( Shader.Vertex(`
			precision mediump float;
			precision mediump int;
			
			attribute vec2 position;
			attribute vec3 color;
			
			uniform mat4 modelView;
			uniform mat4 perspective;
			uniform mat4 view;

			varying vec3 vColor;
			
			void main ( void ) {
				
				gl_Position = vec4( position , 0, 1 );
				gl_PointSize = 8.0;
				vColor = color;
			}
		`)).attachShader( Shader.Fragment(`
			precision mediump float;
			precision mediump int;
			
			varying vec3 vColor;
			uniform int frame;
			uniform float zoom;
			uniform vec2 resolution;
			uniform vec2 mouse;

			uniform sampler2D texture;

			struct Material {
				float shininess;
				vec3 specular;
				vec3 ambient;
				vec4 diffuse;
			};
			uniform Material material;

			struct SomeStruct {
				float test;
				int otherTest;
				vec4 whatever;
			};
			struct Light {
				vec3 position;
				vec3 direction;
				vec3 attenuation;
				vec3 color;
				SomeStruct nestedStruct[2];
			};
			uniform Light light[4];
			uniform SomeStruct structure;
			uniform int someArray[ 5 ];

			float iterations;

			void main ( void ) {
				Material mnn = material;
				int f = frame;
				vec2 m = mouse;
				Light l = light[0];
				vec4 t = texture2D( texture, vec2(0,0) );
				int x = someArray[4];
				SomeStruct s = structure;
				gl_FragColor.rgb = vColor;
				gl_FragColor.a = .5;
			}
		`)).bindLocations(
			"position",
			"color"
		).link();
	}
}

let getters = {
	getUniforms 				: function(){ return new UniformMap( this );},
	getAttributeInfos 			: function(){ return new AttributeInfoMap( this );},
	getAttributeLocations 		: function(){ return new AttributeLocationMap( this );},

	getInfoLog					: function(){ return gl.getProgramInfoLog( this );},
	getAttachedShaders			: function(){ return gl.getAttachedShaders( this, GL.ATTACHED_SHADERS );},
	getActiveAttributesLength	: function(){ return gl.getProgramParameter( this, GL.ACTIVE_ATTRIBUTES );},
	getActiveUniformsLength		: function(){ return gl.getProgramParameter( this, GL.ACTIVE_UNIFORMS );},
	getDeleteStatus				: function(){ return gl.getProgramParameter( this, GL.DELETE_STATUS );},
	getLinkStatus				: function(){ return gl.getProgramParameter( this, GL.LINK_STATUS );},
	getValidateStatus			: function(){ return gl.getProgramParameter( this, GL.VALIDATE_STATUS );},
};

let methods = {
	bindLocations : function ( ) {
		for ( let location in arguments ) {
			this.bindAttribLocation( location, arguments[ location ] );
		}
		return this;
	},
	delete : function ( ) {
		gl.deleteProgram( this );
		return this;
	},
	use : function ( ) {
		gl.useProgram( this );
		return this;
	},
	link : function ( ) {
		gl.linkProgram( this );
		if ( !this.getLinkStatus ) throw new Error( this.getInfoLog );
		else this.clearCache();
		return this; 
	},
	clearCache : function ( ) {
		let properties = Object.getOwnPropertyNames( this );
		for( let p in properties ) delete this[ properties[ p ] ];
		return this;
	},
	validate : function ( ) {
		gl.validateProgram( this );
		if ( !this.getValidateStatus ) throw new Error( this.getInfoLog );
		return this;
	},
	attachShader : function ( shader ){
		if( Object.hasOwnProperty( this, "getAttachedShaders" ) ) delete this.getAttachedShaders;
		gl.attachShader( this, shader );
		return this;
	},
	detachShader : function ( shader ) {
		if( Object.hasOwnProperty( this, "getAttachedShaders" ) ) delete this.getAttachedShaders;
		gl.detachShader( this, shader );
		return this;
	},
	getActiveAttrib : function ( index ) {
		return gl.getActiveAttrib( this, index );
	},
	getActiveUniform : function ( index ) {
		return gl.getActiveUniform( this, index );
	},
	getUniform : function ( location ) {
		return gl.getUniform( this, location );
	},
	getUniformLocation : function ( name ) {
		return gl.getUniformLocation( this, name );
	},
	getAttribLocation:function( name ) {
		return gl.getAttribLocation( this, name );
	},
	bindAttribLocation:function( index, name ) {
		gl.bindAttribLocation( this, index, name );
		return this;
	},
};

for ( let g in getters ) Object.defineProperty( PROTOTYPE, g, {
	get : getters[ g ]
});
for ( let m in methods) PROTOTYPE[ m ] = methods[ m ];

class AttributeInfoMap {
	constructor ( program ) {
		Object.defineProperty( program, "getAttributeInfos", { value : this, configurable : true } );
		
		for( let i = program.getActiveAttributesLength - 1; i >= 0; i-- ) {
			let info = program.getActiveAttrib( i );
			Object.defineProperty( this, info.name, {
				value : info,
				enumerable : true
			} );
		}
	}
}
class UniformMap {
	constructor ( program ) {
		if ( !program ) return;
		else this.setFromProgram( program, "getUniforms" );
	}
	setFromProgram ( program, cacheGetter ) {
		if ( cacheGetter ) Object.defineProperty( program, cacheGetter, { value : this, configurable : true } );
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
}
Object.defineProperties( UniformMap.prototype, {
	clone : {
		value : function ( ) {
			let m = new UniformMap;
			for ( let p in this ) {
				Object.defineProperty( m, p, {
					value : this[ p ],
					writable : true,
					enumerable : true
				} );
			}
			return m;
		}
	}
} );


class AttributeLocationMap {
	constructor ( program ) {
		if ( !program ) return;
		Object.defineProperty( program, "getAttributeLocations", { value : this, configurable : true } );
		let infos = program.getAttributeInfos;
		
		for( let info in infos ) {
			let location = new AttributeLocation( 
				program.getAttribLocation( info ),
				infos[ info ]
			);

			Object.defineProperty( this, info, {
				value :	location,
				enumerable : true
			} );
		}
	}
}

/*
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