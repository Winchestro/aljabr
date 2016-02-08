define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context"
], function module (
    def,
    gl
) {
    "use strict";

    let BOUND_TEXTURE = null;

    class Texture {
        constructor ( target ) {
            var texture = gl.createTexture();
            def.Property( texture, "target", gl.TEXTURE_2D );
            //texture.bind();
            
            //texture.setMinFilter( gl.NEAREST );
            //texture.setMagFilter( gl.NEAREST );
            //texture.setWrapS( gl.CLAMP_TO_EDGE );
            //texture.setWrapT( gl.CLAMP_TO_EDGE );
            
            //texture.unbind();
            return texture;
        }
        static CubeMap ( ) {
            if( !( this instanceof Texture.CubeMap ) ) return new Texture.CubeMap;
            def.Properties( this, {
                x : {},
                y : {},
                z : {}
            }, def.ENUMERABLE );

            def.Properties( this.x, {
                positive : gl.createTexture(),
                negative : gl.createTexture()
            }, def.ENUMERABLE );
            def.Property( this.x.positive, "target", gl.TEXTURE_CUBE_MAP_POSITIVE_X );
            def.Property( this.x.negative, "target", gl.TEXTURE_CUBE_MAP_NEGATIVE_X );

            def.Properties( this.y, {
                positive : gl.createTexture(),
                negative : gl.createTexture()
            }, def.ENUMERABLE );
            def.Property( this.y.positive, "target", gl.TEXTURE_CUBE_MAP_POSITIVE_Y );
            def.Property( this.y.negative, "target", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y );

            def.Properties( this.z, {
                positive : gl.createTexture(),
                negative : gl.createTexture()
            }, def.ENUMERABLE );
            def.Property( this.z.positive, "target", gl.TEXTURE_CUBE_MAP_POSITIVE_Z );
            def.Property( this.z.negative, "target", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z );
        }
    }

    def.Properties( WebGLTexture.prototype, {
        delete ( ) {
            gl.deleteTexture( this );
            return this;
        },
        bind  ( ) {
            if ( BOUND_TEXTURE !== this ) {
                gl.bindTexture( this.target, this );
                BOUND_TEXTURE = this;
            }
            return this;
        },
        unbind ( ) {
            if ( BOUND_TEXTURE === this ) {
                gl.bindTexture( this.target, null );
                BOUND_TEXTURE = null;
            }
            return this;
        },
        load( url ) {
            let img;

            if ( this.img ) img = this.img;
            else {
                
                img = new Image;
                img.addEventListener( "load", this );
                def.Property( this, "img", img, def.CONFIGURABLE );
            }

            img.src = url;
            return this;
        },
        generateMipmap ( ) {
            gl.generateMipmap( this.target );
            return this;
        },
        
        setMinFilter ( min ) {
            if ( min === undefined ) min = gl.NEAREST;

            gl.texParameteri(
                this.target,
                gl.TEXTURE_MIN_FILTER,
                //GLenum NEAREST | LINEAR | NEAREST_MIPMAP_NEAREST | LINEAR_MIPAMP_NEAREST | NEAREST_MIPMAP_LINEAR | LINEAR_MIPMAP_LINEAR
                min
            );
            return this;
        },

        setMagFilter ( mag ) {
            if ( mag === undefined ) mag = gl.NEAREST;
            gl.texParameteri(
                this.target,
                gl.TEXTURE_MAG_FILTER,
                //GLenum NEAREST | LINEAR
                mag
            );
            return this;
        },

        setWrapS ( s ) {
            if ( s === undefined ) s = gl.CLAMP_TO_EDGE;
            gl.texParameteri(
                this.target,
                gl.TEXTURE_WRAP_S,
                //GLenum CLAMP_TO_EDGE | MIRRORED_REPEAT | REPEAT
                s
            );
            return this;
        },

        setWrapT ( t ) {
            if ( t === undefined ) t = gl.CLAMP_TO_EDGE;
            gl.texParameteri(
                this.target,
                gl.TEXTURE_WRAP_T,
                //GLenum CLAMP_TO_EDGE | MIRRORED_REPEAT | REPEAT
                t
            );
            return this;
        },

        image2D ( data, level, format, type ) {
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            if ( type === undefined )       type = gl.UNSIGNED_BYTE;
            gl.texImage2D(
                this.target,
                level,
                format,
                format,
                type,
                data
            );
            return this;
        },

        data ( data, width, height, level, format, type ) {
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            if ( type === undefined )       type = gl.UNSIGNED_BYTE;

            gl.texImage2D(
                //GLenum TEXTURE_2D | TEXTURE_CUBE_MAP_ + POSITIVE_ | NEGATIVE_ + X | Y | Z
                this.target,
                //GLint mipmap level must be >= 0, and <= log2( maxTextureSize )
                level,
                //GLint internalformat ALPHA | LUMINANCE | LUMINANCE_ALPHA | RGB | RGBA
                format,
                //GLsizei must be equal for all sides of a cubemap
                width,
                //GLsizei must be equal for all sides of a cubemap
                height,
                //GLint border ( must be 0 ... )
                0,
                //GLint - must be same as internalformat ...
                format,
                //GLenum UNSIGNED_BYTE | UNSIGNED_SHORT_5_6_5 (only RGB) | UNSIGNED_SHORT_4_4_4_4 (only RGBA) | UNSIGNED_SHORT_5_5_5_1 (only RGBA) 
                type,
                //GLvoid*  
                data
            );
            return this;
        },

        subImage2D ( data, xoffset, yoffset, level, format, type ) {
            if ( xoffset === undefined )    xoffset = 0;
            if ( yoffset === undefined )    yoffset = 0;
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            if ( type === undefined )       type = gl.UNSIGNED_BYTE;
            gl.texSubImage2D(
                this.target,
                level,
                xoffset,
                yoffset,
                format,
                format,
                type,
                data
            );
            return this;
        },

        subData ( data,  width, height, xoffset, yoffset, level, format, type ) {
            if ( xoffset === undefined )    xoffset = 0;
            if ( yoffset === undefined )    yoffset = 0;
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            if ( type === undefined )       type = gl.UNSIGNED_BYTE;
            gl.texSubImage2D(
                this.target,
                level,
                xoffset,
                yoffset,
                format,
                width,
                height,
                0,
                format,
                type,
                data
            );
            return this;
        },

        copyImage ( x, y, width, height, level, format ) {
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            
            gl.copyTexImage2D (
                this.target,
                level,
                format,
                x,
                y,
                width,
                height,
                0
            );
            return this;
        },

        copySubImage ( xoffset, yoffset, x, y, width, height, level, format ) {
            if ( level === undefined )      level = 0;
            if ( format === undefined )     format = gl.RGBA;
            
            gl.copyTexImage2D(
                this.target,
                level,
                xoffset,
                yoffset,
                format,
                x,
                y,
                width,
                height
            );
            return this;
        },

        handleEvent ( event ) {
            switch ( event.type ) {
                case "load" : {
                    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
                    this.bind().image2D( event.path[ 0 ] ).unbind();
                } break;
            }
        }
    });
    def.Properties( Texture, {
        TARGET_TEXTURE_2D                   : gl.TEXTURE_2D,
        TARGET_TEXTURE_CUBE_MAP_POSITIVE_X  : gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        TARGET_TEXTURE_CUBE_MAP_NEGATIVE_X  : gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        TARGET_TEXTURE_CUBE_MAP_POSITIVE_Y  : gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Y  : gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        TARGET_TEXTURE_CUBE_MAP_POSITIVE_Z  : gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Z  : gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        FORMAT_ALPHA                        : gl.ALPHA,
        FORMAT_LUMINANCE                    : gl.LUMINANCE,
        FORMAT_LUMINANCE_ALPHA              : gl.LUMINANCE_ALPHA,
        FORMAT_RGB                          : gl.RGB,
        FORMAT_RGBA                         : gl.RGBA,
        TYPE_UNSIGNED_BYTE                  : gl.UNSIGNED_BYTE,
        TYPE_UNSIGNED_SHORT_5_6_5           : gl.UNSIGNED_SHORT_5_6_5,
        TYPE_UNSIGNED_SHORT_4_4_4_4         : gl.UNSIGNED_SHORT_4_4_4_4,
        TYPE_UNSIGNED_SHORT_5_5_5_1         : gl.UNSIGNED_SHORT_5_5_5_1,
       
        MIN_NEAREST                         : gl.NEAREST,
        MIN_LINEAR                          : gl.LINEAR,
        MIN_NEAREST_MIPMAP_NEAREST          : gl.NEAREST_MIPMAP_NEAREST,
        MIN_LINEAR_MIPMAP_NEAREST           : gl.LINEAR_MIPMAP_NEAREST,
        MIN_NEAREST_MIPMAP_LINEAR           : gl.NEAREST_MIPMAP_LINEAR,
        MIN_LINEAR_MIPMAP_LINEAR            : gl.LINEAR_MIPMAP_LINEAR,
        MAG_NEAREST                         : gl.NEAREST,
        MAG_LINEAR                          : gl.LINEAR,
        WRAP_CLAMP_TO_EDGE                  : gl.CLAMP_TO_EDGE,
        WRAP_MIRRORED_REPEAT                : gl.MIRRORED_REPEAT,
        WRAP_REPEAT                         : gl.REPEAT
    });
    def.Getters( WebGLTexture.prototype, {
        getTargetString ( ) {
            return gl.strings[ this.target ];
        },
        getMagFilter ( ) {
            this.bind();
            return gl.getTexParameter( this.target, gl.TEXTURE_MAG_FILTER );
        },
        getMagFilterString ( ) {
            return gl.strings[ this.getMagFilter ];
        },
        getMinFilter ( ) {
            this.bind();
            return gl.getTexParameter( this.target, gl.TEXTURE_MIN_FILTER );
        },
        getMinFilterString ( ) {
            return gl.strings[ this.getMinFilter ];
        },
        getWrapS ( ) {
            this.bind();
            return gl.getTexParameter( this.target, gl.TEXTURE_WRAP_S );
        },
        getWrapSString ( ) {
            return gl.strings[ this.getWrapS ];
        },
        getWrapT ( ) {
            this.bind();
            return gl.getTexParameter( this.target, gl.TEXTURE_WRAP_T );
        },
        getWrapTString ( ) {
            return gl.strings[ this.getWrapT ];
        }
    });

    return Texture;
});