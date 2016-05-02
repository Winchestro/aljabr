define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/Extensions",
    "../webgl/BufferObject",
    "../material/Material"
], function module (
    def,
    gl,
    extensions,
    BufferObject,
    Material
) {
    "use strict";

    const DRAW_TYPES = {
        [ gl.LINES ] : "LINES",
        [ gl.LINE_STRIP ] : "LINE_STRIP",
        [ gl.LINE_LOOP ] : "LINE_LOOP",
        [ gl.TRIANGLES ] : "TRIANGLES",
        [ gl.TRIANGLE_STRIP ] : "TRIANGLE_STRIP",
        [ gl.TRIANGLE_FAN ] : "TRIANGLE_FAN",
        [ gl.POINTS ] : "POINTS"
    };

    class Element {
        constructor ( material, uniforms, drawType ) {
            if ( drawType === undefined ) drawType = gl.POINTS;
            
            def.Properties( this, {
                offset : 0,
                count : 0,
                dataType : 0,
                visible : true,
                drawType,
                material
            }, def.WRITABLE );

            def.Properties( this, {
                vertexBuffer : new BufferObject.Index,
                view : null
            }, def.CONFIGURABLE );
            
            if ( uniforms !== undefined ) def.Properties( this, uniforms, def.WRITABLE | def.ENUMERABLE | def.CONFIGURABLE );
            //this.allocateBuffer( indices, dataType, usage );
        }
        allocateBuffer ( view, usage, dataType ) {
            if ( usage === undefined ) usage = gl.STATIC_DRAW;

            if ( dataType === undefined ) {
                switch ( view.BYTES_PER_ELEMENT ) {
                    case 1 : {
                        this.dataType = gl.UNSIGNED_BYTE;
                    } break;
                    case 4 : {

                        if( !extensions.OES_element_index_uint ) console.warn("32bit indices currently not supported.");
                        
                        this.dataType = gl.UNSIGNED_INT;
                    } break;
                    default : {
                        this.dataType = gl.UNSIGNED_SHORT;
                    } break;
                }
            } else {
                this.dataType = dataType;
            }

            if ( !view.BYTES_PER_ELEMENT ) {
                switch ( this.dataType ) {
                    case gl.UNSIGNED_BYTE : {
                        view = new Uint8Array( view );
                    } break;
                    case gl.UNSIGNED_SHORT : {
                        view = new Uint16Array( view );
                    } break;
                    case gl.UNSIGNED_INT : {
                        if( !extensions.OES_element_index_uint ) console.warn("32bit indices currently not supported.");
                        view = new Uint32Array( view ); 
                    } break;
                }
            }
            
                

            def.Property( this, "view", view, def.CONFIGURABLE );

            this.vertexBuffer.allocate( view, usage );
            this.count = view.length;

            return this;
        }
        updateBuffer ( view ) {
            if ( view !== undefined && view !== this.view ) this.view.set( view );
            this.vertexBuffer.update( this.view );
            this.count = this.view.length;

            return this;
        }

        update ( camera, scene, lights, mesh ) {

        }

        draw ( camera, scene, lights, mesh ) {
            if ( !this.visible ) return this;
            if ( !this.material.program.getLinkStatus ) return this;
            var uniforms;

            this.vertexBuffer.bind();
            this.material.use();
            //console.log( arguments );
            
            uniforms = this.material.program.getActiveUniforms.scene;
            if ( uniforms ) uniforms.set( scene );
       
            uniforms = this.material.program.getActiveUniforms.camera;
            if ( uniforms ) uniforms.set( camera );
       
            uniforms = this.material.program.getActiveUniforms.lights;
            if ( uniforms ) uniforms.set( lights );
            
           
            uniforms = this.material.program.getActiveUniforms.mesh;

            if ( uniforms ) {

                //uniforms.set( mesh );

                for ( var element in scene.stacks ) {
                    var stack = scene.stacks[ element ];
                    var uniform = uniforms[ element ];
                    if ( uniform ) {
                        uniform.value.set( stack[ 0 ] );
                        for ( var i = 1; i < stack.length; i++ ) {
                            uniform.value.multiply( stack[ i ] );    
                        }
                        uniform.set( uniform.value );
                    }    
                    
                }

                    /*
                    if ( uniforms.transform ) {
                    
                        for ( var i = 4; i < arguments.length; i++ ) {
                            var nextMatrix = arguments[ i ].transform;
                            //console.count( "transforms" );
                            //console.log( "current = ", uniforms.transform.value )
                            //console.log( "next = ", nextMatrix );
                            
                            if ( nextMatrix ) uniforms.transform.multiply( nextMatrix );
                            
                            //console.log( "result = ", uniforms.transform.value );
                            //debugger;

                            
                        }
                        uniforms.transform.set();
                    }
                    if ( uniforms.scale ) {
                        
                        for ( var i = 4; i < arguments.length; i++ ) {
                            var nextVector = arguments[ i ].scale;

                            if ( nextVector ) uniforms.scale.multiply( nextVector );
                        }
                        uniforms.scale.set();
                    }
                    */
                
            }
            uniforms = this.material.program.getActiveUniforms.element;
            if ( uniforms ) uniforms.set( this );
            camera.drawCalls++;
            gl.drawElements( this.drawType, this.count, this.dataType, this.offset );
            
            return this;
        }
        get UintConstructor ( ) {
            switch ( this.dataType ) {
                case gl.UNSIGNED_BYTE : return Uint8Array;
                case gl.UNSIGNED_SHORT : return Uint16Array;
                case gl.UNSIGNED_INT : return Uint32Array;
            }
        }
        get drawTypeString ( ) {
            return DRAW_TYPES[ this.drawType ];
        }
        get dataTypeString ( ) {
            return gl.strings[ this.dataType ];
        }
    }

    def.Properties( Element.prototype, {
        DATA_UINT8          : gl.UNSIGNED_BYTE,
        DATA_UINT16         : gl.UNSIGNED_SHORT,
        DATA_UINT32         : gl.UNSIGNED_INT,
        DRAW_TRIANGLES      : gl.TRIANGLES,
        DRAW_TRIANGLE_FAN   : gl.TRIANGLE_FAN,
        DRAW_TRIANGLE_STRIP : gl.TRIANGLE_STRIP,
        DRAW_LINES          : gl.LINES,
        DRAW_LINE_LOOP      : gl.LINE_LOOP,
        DRAW_LINE_STRIP     : gl.LINE_STRIP,
        DRAW_POINTS         : gl.POINTS
    });

    return Element;
});

/*
        get dataType ( ) {
            let length = this.view.length;
            let dataType =  length < ( 1 << 8 ) ?   gl.UNSIGNED_BYTE : 
                            length < ( 1 << 16 ) ?  gl.UNSIGNED_SHORT : 
                                                    gl.UNSIGNED_INT;
            
            return dataType;
        }

        get dataTypeString ( ) {
            return gl.strings[ this.dataType ];
        }
        */