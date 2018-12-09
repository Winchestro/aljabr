import def from "../utilities/PropertyDescriptors.js";
import AttributeLocation from "../webgl/AttributeLocation.js";
import Shader from "../webgl/Shader.js";
import UniformList from "../webgl/UniformList.js";
import AttributeList from "../webgl/AttributeList.js";
import gl from "../webgl/Context.js";

let currentProgram = null;

export default class Program {
    constructor ( ) {

        return gl.createProgram();
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
        else this.clearCache();
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