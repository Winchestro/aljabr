import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import AttributeLocationBase from "../webgl/AttributeLocationBase.js";

export default class AttributeLocation extends AttributeLocationBase {
    
    updateActiveInfo ( program ) {
        //active infos are only needed if you choose to not process unused vertex buffers
        this.info = program.getActiveAttrib( this.index );
        return this;
    }
    setFloat ( f1, f2, f3, f4 ) {
        f4 !== undefined ?  gl.vertexAttrib4f( this.index, f1, f2, f3, f4 ) :
        f3 !== undefined ?  gl.vertexAttrib3f( this.index, f1, f2, f3 ) :
        f2 !== undefined ?  gl.vertexAttrib2f( this.index, f1, f2 ) :
        f1 !== undefined ?  gl.vertexAttrib1f( this.index, f1 ) :
                            console.warn( "setFloat expects 1-4 arguments" );
        return this;
    }
    setFloatVector ( v, size ) {
        if ( size === undefined ) size = 4;
        switch ( size ) {
            case 4 : gl.vertexAttrib4fv( this, v ); break;
            case 3 : gl.vertexAttrib3fv( this, v ); break;
            case 2 : gl.vertexAttrib2fv( this, v ); break;
            case 1 : gl.vertexAttrib1fv( this, v ); break;
            default: console.warn("setFloatVector expects size 1-4"); break;
        }
        return this;
    }
    enable ( ) {
        

        gl.enableVertexAttribArray( this.index );
        gl.vertexAttribPointer(
            this.index,
            this.size,
            gl.FLOAT,
            false,
            this.stride,
            this.offset
        );
        return this;
    }
    disable ( ) {
        gl.disableVertexAttribArray( this.index );
        return this;
    }
};

def.Getters( AttributeLocation.prototype, {
    getCurrentVertexAtrrib  (){ return gl.getVertexAttrib( this.index, gl.CURRENT_VERTEX_ATTRIB ); },
    getBuffer               (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING ); },
    getEnabled              (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_ENABLED ); },
    getSize                 (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_SIZE ); },
    getStride               (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_STRIDE ); },
    getNormalized           (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED ); },
    getType                 (){ return gl.getVertexAttrib( this.index, gl.VERTEX_ATTRIB_ARRAY_TYPE ); },
    getOffset               (){ return gl.getVertexAttribOffset( this.index, gl.VERTEX_ATTRIB_ARRAY_POINTER ); },
    getTypeString           (){ return gl.strings[ this.getType ]; },
});