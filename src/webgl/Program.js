define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/AttributeLocation",
    "../webgl/Shader",
    "../utilities/Resource",
    "../webgl/UniformList",
    "../webgl/AttributeList"
], function module (
    def,
    gl,
    AttributeLocation,
    Shader,
    Resource,
    UniformList,
    AttributeList
) {
    "use strict";
    var currentProgram = null;

    class Program {
        constructor ( ) {
            return gl.createProgram();
        }
        static HttpSource ( url, callback, refreshInterval ) {
            let fsLoaded = false;
            let vsLoaded = false;
            let vs = Shader.Vertex();
            let fs = Shader.Fragment();
            let program = gl.createProgram().attachShader( fs ).attachShader( vs );

            let sourceVS = Resource.http( url + ".vert", { interval : refreshInterval } );
            let sourceFS = Resource.http( url + ".frag", { interval : refreshInterval } );
            let compileFS = new Resource( function compileFS ( fsCode ) {
                fsLoaded = true;
                fs.setShaderSource( fsCode );
                if ( vsLoaded ) return program;
            } );
            let compileVS = new Resource( function compileVS ( vsCode ) {
                vsLoaded = true;
                vs.setShaderSource( vsCode );
                if ( fsLoaded ) return program;
            } );
            let linkProgram = new Resource( function linkProgram ( program ) {
                return program.link().use();
            } ); 
            
            sourceVS.setTarget( compileVS );
            compileVS.setTarget( linkProgram );

            sourceFS.setTarget( compileFS );
            compileFS.setTarget( linkProgram );
            
            
            linkProgram.setTarget( callback );

            return linkProgram;
        }
    }

    def.Properties( WebGLProgram.prototype, {
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
            if ( currentProgram !== this ) {
                gl.useProgram( this );
                currentProgram = this;
            }
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
    
    def.Getters( WebGLProgram.prototype, {
        getActiveUniforms           (){ return new UniformList( this );},
        getActiveAttributes         (){ return new AttributeList( this );},
        getInfoLog                  (){ return gl.getProgramInfoLog( this );},
        getAttachedShaders          (){ return gl.getAttachedShaders ( this, gl.ATTACHED_SHADERS );},
        getActiveAttributesLength   (){ return gl.getProgramParameter( this, gl.ACTIVE_ATTRIBUTES );},
        getActiveUniformsLength     (){ return gl.getProgramParameter( this, gl.ACTIVE_UNIFORMS );},
        getDeleteStatus             (){ return gl.getProgramParameter( this, gl.DELETE_STATUS );},
        getLinkStatus               (){ return gl.getProgramParameter( this, gl.LINK_STATUS );},
        getValidateStatus           (){ return gl.getProgramParameter( this, gl.VALIDATE_STATUS );},
    });


    return Program;
});