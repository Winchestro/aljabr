define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/Capabilities"
], function module (
    def,
    gl,
    Capabilities
) {
    "use strict";

    const GLOBAL_TEXTURE_BINDINGS = [];
    const TEXTURES = new Map;
    const PENDING_TEXTURES = [];

    class TextureUnit extends Array {
        constructor ( ) {
            /*
            for ( let i = 0; i < this.length; i++ ) {
                this[ i ] = null;
            }*/
            super();
        }

        use ( ) {
            var max = Math.max( this.length, GLOBAL_TEXTURE_BINDINGS.length );
            
            for ( var unit = 0; unit < max; unit++ ) {
                var localTexture = this[ unit ];
                var globalTexture = GLOBAL_TEXTURE_BINDINGS[ unit ];

                this.setActiveTextureUnit( unit );

                if( localTexture ) {
                    localTexture.bind();
                    GLOBAL_TEXTURE_BINDINGS[ unit ] = localTexture;
                }
                else if ( globalTexture ) {
                    globalTexture.unbind();
                }
                
            }
        }
        
        /*
        pixelStorei ( pname, param ) {
            //pname PACK_ALIGNMENT | UNPACK_ALIGNMENT param 1 | 2 | 4 | 8
            //pname UNPACK_FLIP_Y_WEBGL | UNPACK_PREMULTIPLY_ALPHA_WEBGL param true | false
            //pname UNPACK_COLORSPACE_CONVERSION_WEBGL param NONE | BROWSER_DEFAULT_WEBGL
            gl.pixelStorei(
                //GLenum
                pname,
                //GLint
                param 
            );
            return this;
        }
        */
        get getActiveTexture ( ) {
            return gl.getParameter( gl.ACTIVE_TEXTURE );
        }
        
        setActiveTexture ( nTexture ) {
            gl.activeTexture( nTexture );
            return this;
        }

        get getActiveTextureUnit ( ) {
            return gl.getParameter( gl.ACTIVE_TEXTURE ) - gl.TEXTURE0;
        }
        
        setActiveTextureUnit ( nTextureUnit ) {
            gl.activeTexture( gl.TEXTURE0 + nTextureUnit );
            return this;
        }


        get getMipmapHint ( ) {
            return gl.getParameter( gl.GENERATE_MIPMAP_HINT );
        }

        get getMipmapHintString ( ) {
            return gl.strings[ this.getMipmapHint ];
        }
        
        setMipmapHint ( mode ) {
            if ( mode === undefined ) mode = gl.DONT_CARE;
            
            gl.hint(
                gl.GENERATE_MIPMAP_HINT,
                //GLenum FASTEST | NICEST | DONT_CARE
                mode
            );
            return this;
        }

       
        get getUnpackColorspaceConversionString ( ) {
            return gl.strings[ this.getUnpackColorspaceConversion ];
        }

        get getUnpackColorspaceConversion ( ) {
            return gl.getParameter( gl.UNPACK_COLORSPACE_CONVERSION_WEBGL );
        }
        
        setUnpackColorspaceConversion ( value ) {
            gl.pixelStorei(
                gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,
                value
            );
            return this;
        }


        get getUnpackPremultiplyAlpha ( ) {
            return gl.getParameter( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL );
        }
        
        setUnpackPremultiplyAlpha ( bValue ) {
            gl.pixelStorei(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                bValue
            );
            return this;
        } 

        get getUnpackFlipY ( ) {
            return gl.getParameter( gl.UNPACK_FLIP_Y_WEBGL );
        }

        setUnpackFlipY ( value ) {
            gl.pixelStorei(
                gl.UNPACK_FLIP_Y_WEBGL,
                value
            );
            return this;
        }
        
        
        get getPackAlignment ( ) {
            return gl.getParameter( gl.PACK_ALIGNMENT );
        }
        
        setPackAlignment ( param ) {
            gl.pixelStorei(
                gl.PACK_ALIGNMENT,
                param
            );
            return this;
        }
        
        get getUnpackAlignment ( ) {
            return gl.getParameter( gl.UNPACK_ALIGNMENT );
        }
        
        setUnpackAlignment ( ) {
            gl.pixelStorei(
                gl.UNPACK_ALIGNMENT,
                param
            );
            return this;
        }
        
        get getCompressedTextureFormats()               { return gl.getParameter( gl.COMPRESSED_TEXTURE_FORMATS );}

        get getImplementationColorReadFormat()          { return gl.getParameter( gl.IMPLEMENTATION_COLOR_READ_FORMAT );}
        get getImplementationColorReadFormatString()    { return gl.strings[ this.getImplementationColorReadFormat ];}
        
        get getImplementationColorReadType()            { return gl.getParameter( gl.IMPLEMENTATION_COLOR_READ_TYPE );}
        get getImplementationColorReadTypeString()      { return gl.strings[ this.getImplementationColorReadType ];}
    };
    /*
    TextureUnit[ Symbol.iterator ] = [][ Symbol.iterator ];

    def.Properties( TextureUnit.prototype, {
        length : Capabilities.getMaxCombinedTextureImageUnits,
        splice : [].splice
    });
    */
    

    return TextureUnit;
});