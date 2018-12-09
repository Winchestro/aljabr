import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import capabilities from "../webgl/Capabilities.js";
import extensions from "../webgl/Extensions.js";

const ext = extensions.OES_vertex_array_object;
const DEBUG_USE_FALLBACK = false;
const MAX_VERTEX_BINDINGS = capabilities.getMaxVertexAttribs;
var currentBinding;

export class VertexBinding {
    constructor ( name, buffer, location ) {
        def.Properties ( this, {
            name,
            buffer,
            location
        }, def.CONFIGURABLE );
    }
}

export default class VertexArrayObject {
    constructor ( ) {
        if( ext && !DEBUG_USE_FALLBACK ) return ext.createVertexArrayOES( );        
    }
    use ( ) {
        for ( let i = 0; i < MAX_VERTEX_BINDINGS; i++ ) {
            let binding = this[ i ];
            if ( binding ) {
                binding.buffer.bind();
                binding.location.enable();
            }
        }
        if( this.index ) this.index.bind();
        return this;
    }
    unbind ( ) {
        // should I even implement this?
    }
    addVertexBinding ( name, location, buffer ) {
        let index = location.index;
        let target = this[ index ];
        if( target ) {
            target.buffer = buffer;
            target.location = location;
        } else {
            this[ index ] = new VertexBinding( name, buffer, location );
        }
        buffer.bind();
        location.enable();
        return this;
    }
    setIndexBinding ( buffer ) {
        this.index = buffer;
        buffer.bind();
        return this;
    }
    dispose ( ) {

    }
}

def.Properties( VertexArrayObject.prototype, {
    [ Symbol.iterator ] : [][ Symbol.iterator ],
    splice : [].splice,
    length : 0,
}, def.CONFIGURABLE );

function bind( target ) {
    currentBinding = target;
    ext.bindVertexArrayOES( target );
}
function unbind( target ) {
    currentBinding = null;
    ext.bindVertexArrayOES( null );
}

if ( ext && !DEBUG_USE_FALLBACK ) {
    let proto = Object.getPrototypeOf( new VertexArrayObject );

    def.Properties( proto, {
        use ( ) {
            if ( currentBinding !== this ) bind( this );
            return this;
        },
        unbind ( ) {
            unbind( this );
            return this;
        },
        addVertexBinding ( name, location, buffer ) {
            if ( currentBinding !== this ) bind( this );
            
            let index = location.index;
            let target = this[ index ];
            
            if( target ) {
                target.buffer = buffer;
                target.location = location;
            } else {
                this[ index ] = new VertexBinding( name, buffer, location );
            }
            //console.log(buffer,location);
            def.Property( this, "length", this.length + 1, def.CONFIGURABLE );
            buffer.bind();
            location.enable();

            return this;
        },
        updatePointer ( index, offset, stride, size, type, normalized ) {
            if ( offset === undefined )     offset = 0;
            if ( stride === undefined )     stride = 0;
            if ( size === undefined )       size = 4;
            if ( type === undefined )       type = gl.FLOAT;
            if ( normalized === undefined ) normalized = false;

            if ( currentBinding !== this ) bind( this );

            let target = this[ index ];

            if ( target ) {
                target.buffer.bind();
                target.location
                    .setOffset( offset )
                    .setStride( stride )
                    .setSize( size )
                    .setType( type )
                    .setNormalized( normalized );
            }
            return this;
        },
        disableAttribute ( index ) {
            if ( currentBinding !== this ) bind( this );

            let target = this[ index ];
            if ( target ) {
                target.buffer.bind();
                target.location.disable();
            }
            return this;
        },
        enableAttribute ( index ) {
            if ( currentBinding !== this ) bind( this );

            let target = this[ index ];
            if ( target ) {
                target.buffer.bind();
                target.location.enable();
            }
            return this;
        },
        getNextFreeSlot ( ) {
            let i = 0;
            while ( i < MAX_VERTEX_BINDINGS ) {
                if ( this[ i ] === undefined ) return i;
                else i++;
            }
        },
        setIndexBinding ( buffer ) {
            if ( currentBinding !== this ) bind( this );
            buffer.bind();
            this.index = buffer;
            return this;
        },
        dispose ( ) {
            //if ( currentBinding !== this ) bind( this );
            ext.deleteVertexArrayOES( this );
            return this;
        }   
    });
    def.Properties( proto, {
        [ Symbol.iterator ] : [][ Symbol.iterator ],
        splice : [].splice,
        length : 0,
    }, def.CONFIGURABLE );
}