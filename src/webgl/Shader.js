define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";
    var debugMode = false;
    
    class Shader {
        constructor ( type, code ) {
            let shader = gl.createShader( type );
            if ( code ) shader.setShaderSource( code );
            return shader;
        }
    }

    class Fragment {
        constructor ( code ) {
            return new Shader( gl.FRAGMENT_SHADER, code );
        }
    }

    class Vertex {
        constructor ( code ) {
            return new Shader( gl.VERTEX_SHADER, code );
        }
    }

    def.Properties( Shader, {
        Fragment,
        Vertex
    }, def.CONFIGURABLE );

    def.Properties( WebGLShader.prototype, {
        delete ( ) {
            gl.deleteShader( this );
            return this;
        },
        compile ( ) {
            gl.compileShader( this );
            return this;
        },
        setShaderSource ( code ) {
            gl.shaderSource( this, code );
            this.compile();
            
            if ( !this.getCompileStatus ) {
                console.clear();
                console.error( this.getInfoLog );
            }
            
            return this;
        },
    });
    def.Getters( WebGLShader.prototype, {
        getInfoLog                      (){ return gl.getShaderInfoLog( this );},
        getSource                       (){ return gl.getShaderSource( this );},
        getDeleteStatus                 (){ return gl.getShaderParameter( this, gl.DELETE_STATUS );},
        getCompileStatus                (){ return gl.getShaderParameter( this, gl.COMPILE_STATUS );},
        getType                         (){ return gl.getShaderParameter( this, gl.SHADER_TYPE );},
        getTypeString                   (){ return gl.strings[ this.getType ];},
        
        getPrecisionFormatLowFloat      (){ return gl.getShaderPrecisionFormat( this.getType, gl.LOW_FLOAT );},
        getPrecisionFormatMediumFloat   (){ return gl.getShaderPrecisionFormat( this.getType, gl.MEDIUM_FLOAT );},
        getPrecisionFormatHighFloat     (){ return gl.getShaderPrecisionFormat( this.getType, gl.HIGH_FLOAT );},
        getPrecisionFormatLowInt        (){ return gl.getShaderPrecisionFormat( this.getType, gl.LOW_INT );},
        getPrecisionFormatMediumInt     (){ return gl.getShaderPrecisionFormat( this.getType, gl.MEDIUM_INT );},
        getPrecisionFormatHighInt       (){ return gl.getShaderPrecisionFormat( this.getType, gl.HIGH_INT );},
    });

    return Shader;
});