import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import extensions from "../webgl/Extensions.js";
import BufferObject from "../webgl/BufferObject.js";
import Material from "../material/Material.js";

const DATA_UINT8          = 0x1401;
const DATA_UINT16         = 0x1403;
const DATA_UINT32         = 0x1405;

const DRAW_POINTS         = 0x0000;
const DRAW_LINES          = 0x0001;
const DRAW_LINE_LOOP      = 0x0002;
const DRAW_LINE_STRIP     = 0x0003;
const DRAW_TRIANGLES      = 0x0004;
const DRAW_TRIANGLE_STRIP = 0x0005;
const DRAW_TRIANGLE_FAN   = 0x0006;


const DRAW_TYPES = {
    [ DRAW_LINES ] : "LINES",
    [ DRAW_LINE_STRIP ] : "LINE_STRIP",
    [ DRAW_LINE_LOOP ] : "LINE_LOOP",
    [ DRAW_TRIANGLES ] : "TRIANGLES",
    [ DRAW_TRIANGLE_STRIP ] : "TRIANGLE_STRIP",
    [ DRAW_TRIANGLE_FAN ] : "TRIANGLE_FAN",
    [ DRAW_POINTS ] : "POINTS"
};

export default class Element {
    constructor ( material, uniforms, drawType ) {
        if ( drawType === undefined ) drawType = DRAW_POINTS;
        
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
        

        if ( dataType === undefined ) {
            switch ( view.BYTES_PER_ELEMENT ) {
                case 1 : {
                    this.dataType = DATA_UINT8;
                } break;
                case 4 : {

                    if( !extensions.OES_element_index_uint ) console.warn("32bit indices currently not supported.");
                    
                    this.dataType = DATA_UINT32;
                } break;
                default : {
                    this.dataType = DATA_UINT16;
                } break;
            }
        } else {
            this.dataType = dataType;
        }

        if ( !view.BYTES_PER_ELEMENT ) {
            switch ( this.dataType ) {
                case DATA_UINT8 : {
                    view = new Uint8Array( view );
                } break;
                case DATA_UINT16 : {
                    view = new Uint16Array( view );
                } break;
                case DATA_UINT32 : {
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

            uniforms.set( mesh );

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
        }
        uniforms = this.material.program.getActiveUniforms.element;
        if ( uniforms ) uniforms.set( this );
        camera.drawCalls++;
        gl.drawElements( this.drawType, this.count, this.dataType, this.offset );
        
        return this;
    }
    
    get UintConstructor ( ) {
        switch ( this.dataType ) {
            case DATA_UINT8 : return Uint8Array;
            case DATA_UINT16 : return Uint16Array;
            case DATA_UINT32 : return Uint32Array;
        }
    }
    get drawTypeString ( ) {
        return DRAW_TYPES[ this.drawType ];
    }
    get dataTypeString ( ) {
        return gl.strings[ this.dataType ];
    }
}

class Points extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_POINTS );
    }
}

class Lines extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_LINES );
    }
}

class LineStrip extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_LINE_STRIP );
    }
}

class LineLoop extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_LINE_LOOP );
    }
}

class Triangles extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_TRIANGLES );
    }
}

class TriangleStrip extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_TRIANGLE_STRIP );
    }
}

class TrianleFan extends Element {
    constructor ( material, uniforms ) {
        super( material, uniforms, DRAW_TRIANGLE_FAN );
    }
}

def.Properties( Element, {
    Points,
    Lines,
    LineLoop,
    LineStrip,
    Triangles,
    TriangleStrip,
    TrianleFan
});

def.Properties( Element.prototype, {
    
    DATA_UINT8,
    DATA_UINT16,
    DATA_UINT32,

    DRAW_POINTS,
    DRAW_LINES,
    DRAW_LINE_LOOP,
    DRAW_LINE_STRIP,
    DRAW_TRIANGLES,
    DRAW_TRIANGLE_STRIP,
    DRAW_TRIANGLE_FAN
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