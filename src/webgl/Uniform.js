import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

import mat4 from "../math/mat4.js";
import mat3 from "../math/mat3.js";
import mat2 from "../math/mat2.js";
import vec4 from "../math/vec4.js";
import vec3 from "../math/vec3.js";
import vec2 from "../math/vec2.js";

import UniformLocation from "../webgl/UniformLocation.js";

/*
    TODO: A more solid system to handle uniforms.

    a ) composing a hierarchy of uniforms.

        global scene uniforms
            + camera object uniforms
                + light object uniforms

                + mesh object uniforms
                    + material uniforms

        each material may be a different program, but different programs may share the same uniforms

        currently every program creates its own set of uniforms, but what I actually want is a
        single uniform that propagates the changes to different locations in dfferent programs
        only when changed.

        actually it would be nice if setting unforms and attributes would be identical


        uniform[DataType]
        attribute[DataType] 
    
        interface commitOnChange
    
        {
            sources[]
            data
        }
        .update() -> source in sources update ( data )




*/



export default class Uniform {
    static create( info, location ) {
        let uniform =  new ( TYPES.get( info.type ) );
        
        def.Property( uniform, "location", location, def.ENUMERABLE );
        
        return uniform;
    }
}
def.Properties( Uniform.prototype, {
    instantiate ( ) {
        let o = Object.create( this );
        o.value = this.value;
        def.Property( o, "value", this.value, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        return o;
    }
});

export class UniformVector { }
def.Properties( UniformVector.prototype, {
    instantiate ( ) {
        let o = Object.create( this );
        def.Property( o, "value", this.value.clone(), def.ENUMERABLE | def.CONFIGURABLE );
        return o;
    }
});

export class UniformFloat extends Uniform {
    constructor ( ) {
        super();
        def.Property( this, "value", 0.0, def.ENUMERABLE | def.WRITABLE );
    }
    set ( f ) {
        this.location.set1f( f );
    }
}

export class UniformFloatVec2 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new vec2, def.ENUMERABLE );
    }
    set ( vA ) {
        this.location.set2f( vA );
        return this;
    }
}


export class UniformFloatVec3 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new vec3, def.ENUMERABLE );
    }
    set ( vA ) {
        this.location.set3f( vA );
        return this;
    }
}

export class UniformFloatVec4 extends UniformVector {
    constructor ( ) { 
        super();
        def.Property( this, "value", new vec4, def.ENUMERABLE );
    }
    set ( vA ) {
        this.location.set4f( vA );
        return this;
    }
}



export class UniformFloatMat2 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new mat2, def.ENUMERABLE );
    }
    set ( m ) {
        this.location.setMat2( m );
        return this;
    }
}

export class UniformFloatMat3 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new mat3, def.ENUMERABLE );
    }
    set ( m ) {
        this.location.setMat3( m );
        return this;
    }
}

export class UniformFloatMat4 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new mat4, def.ENUMERABLE );
    }
    set ( m ) {
        this.location.setMat4( m );
        return this;
    }
}

export class UniformInt extends Uniform {
    constructor ( ) {
        super();
        def.Property( this, "value", 0, def.ENUMERABLE | def.WRITABLE );
    }
    set ( i ) {
        this.location.set1i( i );
        return this;
    }
}

export class UniformIntVec2 extends UniformVector {
    constructor ( ) {
        super(); 
        def.Property( this, "value", new vec2, def.ENUMERABLE );
    }
    set ( vA ) {
        this.location.set2i( vA );
        return this;
    }
}

export class UniformIntVec3 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new vec3, def.ENUMERABLE );
    }

    set ( vA ) {
        this.location.set3i( this.value );
        return this;
    }
}

export class UniformIntVec4 extends UniformVector {
    constructor ( ) {
        super();
        def.Property( this, "value", new vec4, def.ENUMERABLE );
    }
    set ( vA ) {
        this.location.set4i( vA );
        return this;
    }
}

export class UniformTexture2D extends UniformInt {
}

export class UniformTextureCubeMap extends Uniform {

}


const TYPES = new Map( [
    [ gl.FLOAT,             UniformFloat ],
    [ gl.FLOAT_VEC2,        UniformFloatVec2 ],
    [ gl.FLOAT_VEC3,        UniformFloatVec3 ],
    [ gl.FLOAT_VEC4,        UniformFloatVec4 ],
    [ gl.FLOAT_MAT2,        UniformFloatMat2 ],
    [ gl.FLOAT_MAT3,        UniformFloatMat3 ],
    [ gl.FLOAT_MAT4,        UniformFloatMat4 ],
    [ gl.INT,               UniformInt ],
    [ gl.INT_VEC2,          UniformIntVec2 ],
    [ gl.INT_VEC3,          UniformIntVec3 ],
    [ gl.INT_VEC4,          UniformIntVec4 ],
    [ gl.SAMPLER_2D,        UniformTexture2D ],
    [ gl.SAMPLER_CUBE,      UniformTextureCubeMap ]
] );



/*
function mixin ( target, source ) {
    for ( let method of Object.getOwnPropertyNames( source.prototype ) )
    if ( target.prototype[ method ] === undefined ) def.Property( target.prototype, method, eval(`(function ( ) {
        ${ source.name }.prototype.${ method }.apply( this.value, arguments );
        return this;
    })`), def.CONFIGURABLE );
}*/
