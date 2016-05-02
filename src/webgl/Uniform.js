define( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../math/mat4",
    "../math/mat3",
    "../math/mat2",
    "../math/vec4",
    "../math/vec3",
    "../math/vec2",
    "../webgl/UniformLocation"
], function module (
    def,
    gl,
    mat4,
    mat3,
    mat2,
    vec4,
    vec3,
    vec2
) {
    "use strict";

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



    class Uniform {
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

    class UniformVector { }
    def.Properties( UniformVector.prototype, {
        instantiate ( ) {
            let o = Object.create( this );
            def.Property( o, "value", this.value.clone(), def.ENUMERABLE | def.CONFIGURABLE );
            return o;
        }
    });

    class UniformFloat extends Uniform {
        constructor ( ) {
            super();
            def.Property( this, "value", 0.0, def.ENUMERABLE | def.WRITABLE );
        }
        set ( f ) {
            this.location.set1f( f );
        }
    }
    
    class UniformFloatVec2 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new vec2, def.ENUMERABLE );
        }
        set ( vA ) {
            this.location.set2f( vA );
            return this;
        }
    }
    

    class UniformFloatVec3 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new vec3, def.ENUMERABLE );
        }
        set ( vA ) {
            this.location.set3f( vA );
            return this;
        }
    }
    
    class UniformFloatVec4 extends UniformVector {
        constructor ( ) { 
            super();
            def.Property( this, "value", new vec4, def.ENUMERABLE );
        }
        set ( vA ) {
            this.location.set4f( vA );
            return this;
        }
    }
    
   

    class UniformFloatMat2 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new mat2, def.ENUMERABLE );
        }
        set ( m ) {
            this.location.setMat2( m );
            return this;
        }
    }
    
    class UniformFloatMat3 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new mat3, def.ENUMERABLE );
        }
        set ( m ) {
            this.location.setMat3( m );
            return this;
        }
    }

    class UniformFloatMat4 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new mat4, def.ENUMERABLE );
        }
        set ( m ) {
            this.location.setMat4( m );
            return this;
        }
    }

    class UniformInt extends Uniform {
        constructor ( ) {
            super();
            def.Property( this, "value", 0, def.ENUMERABLE | def.WRITABLE );
        }
        set ( i ) {
            this.location.set1i( i );
            return this;
        }
    }

    class UniformIntVec2 extends UniformVector {
        constructor ( ) {
            super(); 
            def.Property( this, "value", new vec2, def.ENUMERABLE );
        }
        set ( vA ) {
            this.location.set2i( vA );
            return this;
        }
    }
    
    class UniformIntVec3 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new vec3, def.ENUMERABLE );
        }

        set ( vA ) {
            this.location.set3i( this.value );
            return this;
        }
    }

    class UniformIntVec4 extends UniformVector {
        constructor ( ) {
            super();
            def.Property( this, "value", new vec4, def.ENUMERABLE );
        }
        set ( vA ) {
            this.location.set4i( vA );
            return this;
        }
    }
    
    class UniformTexture2D extends UniformInt {
    }

    class UniformTextureCubeMap extends Uniform {

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

    return Uniform;
});