define( [
    "../utilities/PropertyDescriptors",
    "../math/mat3",
    "../math/vec4",
    "../math/vec3"
], function module (
    def,
    mat3,
    vec4,
    vec3
) {
    "use strict";

    const _0_0_ = 0; const _1_0_ = 4; const _2_0_ =  8; const _3_0_ = 12;
    const _0_1_ = 1; const _1_1_ = 5; const _2_1_ =  9; const _3_1_ = 13;
    const _0_2_ = 2; const _1_2_ = 6; const _2_2_ = 10; const _3_2_ = 14;
    const _0_3_ = 3; const _1_3_ = 7; const _2_3_ = 11; const _3_3_ = 15;

    const _x_ = 0;
    const _y_ = 1;
    const _z_ = 2;
    const _w_ = 3;

    const sin = Math.sin;
    const cos = Math.cos;
    const tan = Math.tan;
    const sqrt = Math.sqrt;
    const abs = Math.abs;
    const EPSILON = Number.EPSILON;

    class mat4 {
        constructor ( ) {
            mat4.prototype.makeIdentity.call( this );
        }

        set ( inM4 ) {
            let m = this;
                m[_0_0_] = inM4[_0_0_]; m[_0_1_] = inM4[_0_1_]; m[_0_2_] = inM4[_0_2_]; m[_0_3_] = inM4[_0_3_];
                m[_1_0_] = inM4[_1_0_]; m[_1_1_] = inM4[_1_1_]; m[_1_2_] = inM4[_1_2_]; m[_1_3_] = inM4[_1_3_];
                m[_2_0_] = inM4[_2_0_]; m[_2_1_] = inM4[_2_1_]; m[_2_2_] = inM4[_2_2_]; m[_2_3_] = inM4[_2_3_];
                m[_3_0_] = inM4[_3_0_]; m[_3_1_] = inM4[_3_1_]; m[_3_2_] = inM4[_3_2_]; m[_3_3_] = inM4[_3_3_];
            return this;
        }

        static set ( outM4, inM4 ) {
            return mat4.prototype.set.call( outM4, inM4 );
        }

        setValues ( inS_0_0, inS_0_1, inS_0_2, inS_0_3, inS_1_0, inS_1_1, inS_1_2, inS_1_3, inS_2_0, inS_2_1, inS_2_2, inS_2_3, inS_3_0, inS_3_1, inS_3_2, inS_3_3 ) {
            let m = this;
                m[_0_0_] = inS_0_0; m[_0_1_] = inS_0_1; m[_0_2_] = inS_0_2; m[_0_3_] = inS_0_3;
                m[_1_0_] = inS_1_0; m[_1_1_] = inS_1_1; m[_1_2_] = inS_1_2; m[_1_3_] = inS_1_3;
                m[_2_0_] = inS_2_0; m[_2_1_] = inS_2_1; m[_2_2_] = inS_2_2; m[_2_3_] = inS_2_3;
                m[_3_0_] = inS_3_0; m[_3_1_] = inS_3_1; m[_3_2_] = inS_3_2; m[_3_3_] = inS_3_3;
            return this;
        }

        static setValues ( outM4, inM4 ) {
            return mat4.prototype.setValues.call( outM4, inS_0_0, inS_0_1, inS_0_2, inS_0_3, inS_1_0, inS_1_1, inS_1_2, inS_1_3, inS_2_0, inS_2_1, inS_2_2, inS_2_3, inS_3_0, inS_3_1, inS_3_2, inS_3_3 );
        }
        
        transpose ( inM4 ) {
            if ( inM4 === undefined ) inM4 = this;

            let a = inM4;

            let m = this;
                m[_0_0_] = a[_0_0_]; m[_0_1_] = a[_1_0_]; m[_0_2_] = a[_2_0_]; m[_0_3_] = a[_3_0_];
                m[_1_0_] = a[_0_1_]; m[_1_1_] = a[_1_1_]; m[_1_2_] = a[_2_1_]; m[_1_3_] = a[_3_1_];
                m[_2_0_] = a[_0_2_]; m[_2_1_] = a[_1_2_]; m[_2_2_] = a[_2_2_]; m[_2_3_] = a[_3_2_];
                m[_3_0_] = a[_0_3_]; m[_3_1_] = a[_1_3_]; m[_3_2_] = a[_2_3_]; m[_3_3_] = a[_3_3_];

            return this;
        }

        static transpose ( outM4, inM4 ) {
            return mat4.prototype.transpose.call( outM4, inM4 );
        }

        invert ( inM4A ) {
            if ( inM4A === undefined ) inM4A = CACHE_MAT4.transpose( this );
            let a = inM4A;
                
            let m = this;
                m[_0_0_] = a[_1_2_] * a[_2_3_] * a[_3_1_]
                         - a[_1_3_] * a[_2_2_] * a[_3_1_]
                         + a[_1_3_] * a[_2_1_] * a[_3_2_]
                         - a[_1_1_] * a[_2_3_] * a[_3_2_]
                         - a[_1_2_] * a[_2_1_] * a[_3_3_]
                         + a[_1_1_] * a[_2_2_] * a[_3_3_];

                m[_1_0_] = a[_0_3_] * a[_2_2_] * a[_3_1_]
                         - a[_0_2_] * a[_2_3_] * a[_3_1_]
                         - a[_0_3_] * a[_2_1_] * a[_3_2_]
                         + a[_0_1_] * a[_2_3_] * a[_3_2_]
                         + a[_0_2_] * a[_2_1_] * a[_3_3_]
                         - a[_0_1_] * a[_2_2_] * a[_3_3_];

                m[_2_0_] = a[_0_2_] * a[_1_3_] * a[_3_1_]
                         - a[_0_3_] * a[_1_2_] * a[_3_1_]
                         + a[_0_3_] * a[_1_1_] * a[_3_2_]
                         - a[_0_1_] * a[_1_3_] * a[_3_2_]
                         - a[_0_2_] * a[_1_1_] * a[_3_3_]
                         + a[_0_1_] * a[_1_2_] * a[_3_3_];

                m[_3_0_] = a[_0_3_] * a[_1_2_] * a[_2_1_]
                         - a[_0_2_] * a[_1_3_] * a[_2_1_]
                         - a[_0_3_] * a[_1_1_] * a[_2_2_]
                         + a[_0_1_] * a[_1_3_] * a[_2_2_]
                         + a[_0_2_] * a[_1_1_] * a[_2_3_]
                         - a[_0_1_] * a[_1_2_] * a[_2_3_];

                m[_0_1_] = a[_1_3_] * a[_2_2_] * a[_3_0_]
                         - a[_1_2_] * a[_2_3_] * a[_3_0_]
                         - a[_1_3_] * a[_2_0_] * a[_3_2_]
                         + a[_1_0_] * a[_2_3_] * a[_3_2_]
                         + a[_1_2_] * a[_2_0_] * a[_3_3_]
                         - a[_1_0_] * a[_2_2_] * a[_3_3_];

                m[_1_1_] = a[_0_2_] * a[_2_3_] * a[_3_0_]
                         - a[_0_3_] * a[_2_2_] * a[_3_0_]
                         + a[_0_3_] * a[_2_0_] * a[_3_2_]
                         - a[_0_0_] * a[_2_3_] * a[_3_2_]
                         - a[_0_2_] * a[_2_0_] * a[_3_3_]
                         + a[_0_0_] * a[_2_2_] * a[_3_3_];

                m[_2_1_] = a[_0_3_] * a[_1_2_] * a[_3_0_]
                         - a[_0_2_] * a[_1_3_] * a[_3_0_]
                         - a[_0_3_] * a[_1_0_] * a[_3_2_]
                         + a[_0_0_] * a[_1_3_] * a[_3_2_]
                         + a[_0_2_] * a[_1_0_] * a[_3_3_]
                         - a[_0_0_] * a[_1_2_] * a[_3_3_];

                m[_3_1_] = a[_0_2_] * a[_1_3_] * a[_2_0_]
                         - a[_0_3_] * a[_1_2_] * a[_2_0_]
                         + a[_0_3_] * a[_1_0_] * a[_2_2_]
                         - a[_0_0_] * a[_1_3_] * a[_2_2_]
                         - a[_0_2_] * a[_1_0_] * a[_2_3_]
                         + a[_0_0_] * a[_1_2_] * a[_2_3_];

                m[_0_2_] = a[_1_1_] * a[_2_3_] * a[_3_0_]
                         - a[_1_3_] * a[_2_1_] * a[_3_0_]
                         + a[_1_3_] * a[_2_0_] * a[_3_1_]
                         - a[_1_0_] * a[_2_3_] * a[_3_1_]
                         - a[_1_1_] * a[_2_0_] * a[_3_3_]
                         + a[_1_0_] * a[_2_1_] * a[_3_3_];

                m[_1_2_] = a[_0_3_] * a[_2_1_] * a[_3_0_]
                         - a[_0_1_] * a[_2_3_] * a[_3_0_]
                         - a[_0_3_] * a[_2_0_] * a[_3_1_]
                         + a[_0_0_] * a[_2_3_] * a[_3_1_]
                         + a[_0_1_] * a[_2_0_] * a[_3_3_]
                         - a[_0_0_] * a[_2_1_] * a[_3_3_];

                m[_2_2_] = a[_0_1_] * a[_1_3_] * a[_3_0_]
                         - a[_0_3_] * a[_1_1_] * a[_3_0_]
                         + a[_0_3_] * a[_1_0_] * a[_3_1_]
                         - a[_0_0_] * a[_1_3_] * a[_3_1_]
                         - a[_0_1_] * a[_1_0_] * a[_3_3_]
                         + a[_0_0_] * a[_1_1_] * a[_3_3_];

                m[_3_2_] = a[_0_3_] * a[_1_1_] * a[_2_0_]
                         - a[_0_1_] * a[_1_3_] * a[_2_0_]
                         - a[_0_3_] * a[_1_0_] * a[_2_1_]
                         + a[_0_0_] * a[_1_3_] * a[_2_1_]
                         + a[_0_1_] * a[_1_0_] * a[_2_3_]
                         - a[_0_0_] * a[_1_1_] * a[_2_3_];

                m[_0_3_] = a[_1_2_] * a[_2_1_] * a[_3_0_]
                         - a[_1_1_] * a[_2_2_] * a[_3_0_]
                         - a[_1_2_] * a[_2_0_] * a[_3_1_]
                         + a[_1_0_] * a[_2_2_] * a[_3_1_]
                         + a[_1_1_] * a[_2_0_] * a[_3_2_]
                         - a[_1_0_] * a[_2_1_] * a[_3_2_];

                m[_1_3_] = a[_0_1_] * a[_2_2_] * a[_3_0_]
                         - a[_0_2_] * a[_2_1_] * a[_3_0_]
                         + a[_0_2_] * a[_2_0_] * a[_3_1_]
                         - a[_0_0_] * a[_2_2_] * a[_3_1_]
                         - a[_0_1_] * a[_2_0_] * a[_3_2_]
                         + a[_0_0_] * a[_2_1_] * a[_3_2_];

                m[_2_3_] = a[_0_2_] * a[_1_1_] * a[_3_0_]
                         - a[_0_1_] * a[_1_2_] * a[_3_0_]
                         - a[_0_2_] * a[_1_0_] * a[_3_1_]
                         + a[_0_0_] * a[_1_2_] * a[_3_1_]
                         + a[_0_1_] * a[_1_0_] * a[_3_2_]
                         - a[_0_0_] * a[_1_1_] * a[_3_2_];

                m[_3_3_] = a[_0_1_] * a[_1_2_] * a[_2_0_]
                         - a[_0_2_] * a[_1_1_] * a[_2_0_]
                         + a[_0_2_] * a[_1_0_] * a[_2_1_]
                         - a[_0_0_] * a[_1_2_] * a[_2_1_]
                         - a[_0_1_] * a[_1_0_] * a[_2_2_]
                         + a[_0_0_] * a[_1_1_] * a[_2_2_];
              
            let determinant = a[_0_0_] * m[_0_0_]
                            + a[_1_0_] * m[_1_0_]
                            + a[_2_0_] * m[_2_0_]
                            + a[_3_0_] * m[_3_0_];
            
            if( Math.abs( determinant ) < EPSILON ) return mat4.makeIdentity( this );
            else return mat4.multiplyScalar( this, 1 / determinant );
        }

        static invert ( outM4, inM4 ) {
            return mat4.prototype.invert.call( outM4, inM4 );
        }

        add ( inM4A, inM4B ) {
            if ( inM4B === undefined ) inM4B = CACHE_MAT4.set( this );

            let a = inM4A;
            let b = inM4B;

            let m = this;
                m[_0_0_] = a[_0_0_] + b[_0_0_]; m[_0_1_] = a[_0_1_] + b[_0_1_]; m[_0_2_] = a[_0_2_] + b[_0_2_]; m[_0_3_] = a[_0_3_] + b[_0_3_];
                m[_1_0_] = a[_1_0_] + b[_1_0_]; m[_1_1_] = a[_1_1_] + b[_1_1_]; m[_1_2_] = a[_1_2_] + b[_1_2_]; m[_1_3_] = a[_1_3_] + b[_1_3_];
                m[_2_0_] = a[_2_0_] + b[_2_0_]; m[_2_1_] = a[_2_1_] + b[_2_1_]; m[_2_2_] = a[_2_2_] + b[_2_2_]; m[_2_3_] = a[_2_3_] + b[_2_3_];
                m[_3_0_] = a[_3_0_] + b[_3_0_]; m[_3_1_] = a[_3_1_] + b[_3_1_]; m[_3_2_] = a[_3_2_] + b[_3_2_]; m[_3_3_] = a[_3_3_] + b[_3_3_];
            return this;
        }

        static add ( outM4, inM4A, inM4B ) {
            return mat4.prototype.add.call( outM4, inM4A, inM4B );
        }

        multiply ( inM4A, inM4B ) {
            if ( inM4B === undefined ) inM4B = CACHE_MAT4.set( this );

            let a = inM4A;
            let b = inM4B;
            
            let m = this;
                m[_0_0_] = a[_0_0_] * b[_0_0_]
                         + a[_0_1_] * b[_1_0_]
                         + a[_0_2_] * b[_2_0_]
                         + a[_0_3_] * b[_3_0_];

                m[_0_1_] = a[_0_0_] * b[_0_1_]
                         + a[_0_1_] * b[_1_1_]
                         + a[_0_2_] * b[_2_1_]
                         + a[_0_3_] * b[_3_1_];

                m[_0_2_] = a[_0_0_] * b[_0_2_]
                         + a[_0_1_] * b[_1_2_]
                         + a[_0_2_] * b[_2_2_]
                         + a[_0_3_] * b[_3_2_];

                m[_0_3_] = a[_0_0_] * b[_0_3_]
                         + a[_0_1_] * b[_1_3_]
                         + a[_0_2_] * b[_2_3_]
                         + a[_0_3_] * b[_3_3_];
                
                m[_1_0_] = a[_1_0_] * b[_0_0_]
                         + a[_1_1_] * b[_1_0_]
                         + a[_1_2_] * b[_2_0_]
                         + a[_1_3_] * b[_3_0_];

                m[_1_1_] = a[_1_0_] * b[_0_1_]
                         + a[_1_1_] * b[_1_1_]
                         + a[_1_2_] * b[_2_1_]
                         + a[_1_3_] * b[_3_1_];

                m[_1_2_] = a[_1_0_] * b[_0_2_]
                         + a[_1_1_] * b[_1_2_]
                         + a[_1_2_] * b[_2_2_]
                         + a[_1_3_] * b[_3_2_];

                m[_1_3_] = a[_1_0_] * b[_0_3_]
                         + a[_1_1_] * b[_1_3_]
                         + a[_1_2_] * b[_2_3_]
                         + a[_1_3_] * b[_3_3_];
                
                m[_2_0_] = a[_2_0_] * b[_0_0_]
                         + a[_2_1_] * b[_1_0_]
                         + a[_2_2_] * b[_2_0_]
                         + a[_2_3_] * b[_3_0_];

                m[_2_1_] = a[_2_0_] * b[_0_1_]
                         + a[_2_1_] * b[_1_1_]
                         + a[_2_2_] * b[_2_1_]
                         + a[_2_3_] * b[_3_1_];

                m[_2_2_] = a[_2_0_] * b[_0_2_]
                         + a[_2_1_] * b[_1_2_]
                         + a[_2_2_] * b[_2_2_]
                         + a[_2_3_] * b[_3_2_];

                m[_2_3_] = a[_2_0_] * b[_0_3_]
                         + a[_2_1_] * b[_1_3_]
                         + a[_2_2_] * b[_2_3_]
                         + a[_2_3_] * b[_3_3_];     
                
                m[_3_0_] = a[_3_0_] * b[_0_0_]
                         + a[_3_1_] * b[_1_0_]
                         + a[_3_2_] * b[_2_0_]
                         + a[_3_3_] * b[_3_0_];

                m[_3_1_] = a[_3_0_] * b[_0_1_]
                         + a[_3_1_] * b[_1_1_]
                         + a[_3_2_] * b[_2_1_]
                         + a[_3_3_] * b[_3_1_];

                m[_3_2_] = a[_3_0_] * b[_0_2_]
                         + a[_3_1_] * b[_1_2_]
                         + a[_3_2_] * b[_2_2_]
                         + a[_3_3_] * b[_3_2_];

                m[_3_3_] = a[_3_0_] * b[_0_3_]
                         + a[_3_1_] * b[_1_3_]
                         + a[_3_2_] * b[_2_3_]
                         + a[_3_3_] * b[_3_3_];

            return this;
        }

        static multiply ( outM4, inM4A, inM4B ) {
            return mat4.prototype.multiply.call( outM4, inM4A, inM4B );
        }

        addScalar ( inS ) {
            let m = this;
                m[_0_0_] += inS; m[_0_1_] += inS; m[_0_2_] += inS; m[_0_3_] += inS;
                m[_1_0_] += inS; m[_1_1_] += inS; m[_1_2_] += inS; m[_1_3_] += inS;
                m[_2_0_] += inS; m[_2_1_] += inS; m[_2_2_] += inS; m[_2_3_] += inS;
                m[_3_0_] += inS; m[_3_1_] += inS; m[_3_2_] += inS; m[_3_3_] += inS;
            return this;
        }

        static addScalar ( outM4, inS ) {
            return mat4.prototype.addScalar.call( outM4, inS );
        }


        multiplyScalar ( inS ) {
            let m = this;
                m[_0_0_] *= inS; m[_0_1_] *= inS; m[_0_2_] *= inS; m[_0_3_] *= inS;
                m[_1_0_] *= inS; m[_1_1_] *= inS; m[_1_2_] *= inS; m[_1_3_] *= inS;
                m[_2_0_] *= inS; m[_2_1_] *= inS; m[_2_2_] *= inS; m[_2_3_] *= inS;
                m[_3_0_] *= inS; m[_3_1_] *= inS; m[_3_2_] *= inS; m[_3_3_] *= inS;
            return this;
        }

        static multiplyScalar ( outM4, inS ) {
            return mat4.prototype.multiplyScalar.call( outM4, inS );
        }

        determinant ( ) {
            let m = this;
                let a1  = m[_0_0_] * m[_1_1_] - m[_0_1_] * m[_1_0_];
                let a2  = m[_0_0_] * m[_1_2_] - m[_0_2_] * m[_1_0_];
                let a3  = m[_0_0_] * m[_1_3_] - m[_0_3_] * m[_1_0_];
                let a4  = m[_0_1_] * m[_1_2_] - m[_0_2_] * m[_1_1_];
                let a5  = m[_0_1_] * m[_1_3_] - m[_0_3_] * m[_1_1_];
                let a6  = m[_0_2_] * m[_1_3_] - m[_0_3_] * m[_1_2_];

                let b1  = m[_2_2_] * m[_3_3_] - m[_2_3_] * m[_3_2_];
                let b2  = m[_2_1_] * m[_3_3_] - m[_2_3_] * m[_3_1_];
                let b3  = m[_2_1_] + m[_3_2_] - m[_2_2_] + m[_3_1_];
                let b4  = m[_2_0_] + m[_3_3_] - m[_2_3_] + m[_3_0_];
                let b5  = m[_2_0_] + m[_3_2_] - m[_2_2_] + m[_3_0_];
                let b6  = m[_2_0_] + m[_3_1_] - m[_2_1_] + m[_3_0_];
            return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
        }
        static determinant ( inM4 ) {
            return mat4.prototype.determinant.call( inM4 );
        }

        lookAt ( inV3_eye, inV3_target, inV3_up ) {
            let z = CACHE_VEC3_Z.sub( inV3_eye, inV3_target ).normalize();

            if ( z.getLength() === 0 ) z = z.set( inV3_up );

            let x = CACHE_VEC3_X.cross( inV3_up, z ).normalize();
            
            if( x.getLength() === 0 ) {
                z[_x_] += 0.0001;
                x = x.cross( inV3_up, z ).normalize();
            }

            let y = CACHE_VEC3_Y.cross( z, x );

            let m = this;
                m[_0_0_] = x[ 0 ]; m[_0_1_] = x[ 1 ]; m[_0_2_] = x[ 2 ];
                m[_1_0_] = y[ 0 ]; m[_1_1_] = y[ 1 ]; m[_1_2_] = y[ 2 ];
                m[_2_0_] = z[ 0 ]; m[_2_1_] = z[ 1 ]; m[_2_2_] = z[ 2 ];
            return this;
        }

        static lookAt ( outM4, inV3_eye, inV3_target, inV3_up ) {
            return mat4.prototype.lookAt.call( outM4, inV3_eye, inV3_target, inV3_up );
        }

        translate ( x, y, z ) {
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = 0;
            if ( z === undefined ) z = 0;

            let a = CACHE_MAT4.set( this );

            let m = this;
                m[_3_0_]    = a[_0_0_] * x
                            + a[_1_0_] * y
                            + a[_2_0_] * z
                            + a[_3_0_];

                m[_3_1_]    = a[_0_1_] * x
                            + a[_1_1_] * y
                            + a[_2_1_] * z
                            + a[_3_1_];

                m[_3_2_]    = a[_0_2_] * x
                            + a[_1_2_] * y
                            + a[_2_2_] * z
                            + a[_3_2_];

                m[_3_3_]    = a[_0_3_] * x
                            + a[_1_3_] * y
                            + a[_2_3_] * z
                            + a[_3_3_];
            return this;
        }

        static translate ( outM4, x, y, z ) {
            return mat4.prototype.translate.call( outM4, x, y, z );
        }

        scale ( x , y, z ) {
            if ( x === undefined ) x = 1;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;

            let m = this;
                m[_0_0_] *= x; m[_0_1_] *= x; m[_0_2_] *= x; m[_0_3_] *= x;
                m[_1_0_] *= y; m[_1_1_] *= y; m[_1_2_] *= y; m[_1_3_] *= y;
                m[_2_0_] *= z; m[_2_1_] *= z; m[_2_2_] *= z; m[_2_3_] *= z;
            return this;
        }

        static scale ( outM4, x, y, z ) {
            return mat4.prototype.scale.call( outM4, x, y, z );
        }

        rotate ( rad, x, y, z ) {
            if ( rad === undefined ) rad = 0;
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = 0;
            if ( z === undefined ) z = 0;

            let length = sqrt( x * x + y * y + z * z );
            
            if ( abs( length ) < EPSILON ) return makeIdentity.call( this );

            let s = sin( rad );
            let c = cos( rad );
            let t = 1 - c;

            length = 1 / length;
            x *= length;
            y *= length;
            z *= length;

            let r = CACHE_MAT3;
                r[ 0 ] = x * x * t + c;     r[ 1 ] = x * y * t + z * s; r[ 2 ] = x * z * t - y * s;
                r[ 3 ] = y * x * t - z * s; r[ 4 ] = y * y * t + c;     r[ 5 ] = y * z * t + x * s;
                r[ 6 ] = z * x * t + y * s; r[ 7 ] = z * y * t - x * s; r[ 8 ] = z * z * t + c;

            let a = CACHE_MAT4.set( this );
            let m = this;
                m[_0_0_] = r[ 0 ] * a[_0_0_]
                         + r[ 1 ] * a[_1_0_]
                         + r[ 2 ] * a[_2_0_];

                m[_0_1_] = r[ 0 ] * a[_0_1_]
                         + r[ 1 ] * a[_1_1_]
                         + r[ 2 ] * a[_2_1_];

                m[_0_2_] = r[ 0 ] * a[_0_2_]
                         + r[ 1 ] * a[_1_2_]
                         + r[ 2 ] * a[_2_2_];

                m[_0_3_] = r[ 0 ] * a[_0_3_]
                         + r[ 1 ] * a[_1_3_]
                         + r[ 2 ] * a[_2_3_];

                m[_1_0_] = r[ 3 ] * a[_0_0_]
                         + r[ 4 ] * a[_1_0_]
                         + r[ 5 ] * a[_2_0_];

                m[_1_1_] = r[ 3 ] * a[_0_1_]
                         + r[ 4 ] * a[_1_1_]
                         + r[ 5 ] * a[_2_1_];

                m[_1_2_] = r[ 3 ] * a[_0_2_]
                         + r[ 4 ] * a[_1_2_]
                         + r[ 5 ] * a[_2_2_];

                m[_1_3_] = r[ 3 ] * a[_0_3_]
                         + r[ 4 ] * a[_1_3_]
                         + r[ 5 ] * a[_2_3_];

                m[_2_0_] = r[ 6 ] * a[_0_0_]
                         + r[ 7 ] * a[_1_0_]
                         + r[ 8 ] * a[_2_0_];

                m[_2_1_] = r[ 6 ] * a[_0_1_]
                         + r[ 7 ] * a[_1_1_]
                         + r[ 8 ] * a[_2_1_];

                m[_2_2_] = r[ 6 ] * a[_0_2_]
                         + r[ 7 ] * a[_1_2_]
                         + r[ 8 ] * a[_2_2_];

                m[_2_3_] = r[ 6 ] * a[_0_3_]
                         + r[ 7 ] * a[_1_3_]
                         + r[ 8 ] * a[_2_3_];
            return this;
        }

        static rotate ( outM4, rad, x, y, z ) {
            return mat4.prototype.rotate.call( outM4, rad, x, y, z );
        }

        rotateX ( rad ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let v1 = CACHE_VEC4A.setValues( this[_1_0_], this[_1_1_], this[_1_2_], this[_1_3_] );
            let v2 = CACHE_VEC4B.setValues( this[_2_0_], this[_2_1_], this[_2_2_], this[_2_3_] );


            let m = this;
                m[_1_0_] = v1[_x_] * c + v2[_x_] * s;
                m[_1_1_] = v1[_y_] * c + v2[_y_] * s;
                m[_1_2_] = v1[_z_] * c + v2[_z_] * s;
                m[_1_3_] = v1[_w_] * c + v2[_w_] * s;

                m[_2_0_] = v2[_x_] * c - v1[_x_] * s;
                m[_2_1_] = v2[_y_] * c - v1[_y_] * s;
                m[_2_2_] = v2[_z_] * c - v1[_z_] * s;
                m[_2_3_] = v2[_w_] * c - v1[_w_] * s;
            return this;
        }

        static rotateX ( outM4, rad ) {
            return mat4.prototype.rotateX.call( outM4, rad );
        }

        rotateY ( rad ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let v0 = CACHE_VEC4A.setValues( this[_0_0_], this[_0_1_], this[_0_2_], this[_0_3_] );
            let v2 = CACHE_VEC4B.setValues( this[_2_0_], this[_2_1_], this[_2_2_], this[_2_3_] );

            let m = this;
                m[_2_0_] = v2[_x_] * c + v0[_x_] * s;
                m[_2_1_] = v2[_y_] * c + v0[_y_] * s;
                m[_2_2_] = v2[_z_] * c + v0[_z_] * s;
                m[_2_3_] = v2[_w_] * c + v0[_w_] * s;

                m[_0_0_] = v0[_x_] * c - v2[_x_] * s;
                m[_0_1_] = v0[_y_] * c - v2[_y_] * s;
                m[_0_2_] = v0[_z_] * c - v2[_z_] * s;
                m[_0_3_] = v0[_w_] * c - v2[_w_] * s;
            return this;
        }

        static rotateY ( outM4, rad ) {
            return mat4.prototype.rotateY.call( outM4, rad );
        }

        rotateZ ( rad ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let v0 = CACHE_VEC4A.setValues( this[_0_0_], this[_0_1_], this[_0_2_], this[_0_3_] );
            let v1 = CACHE_VEC4B.setValues( this[_1_0_], this[_1_1_], this[_1_2_], this[_1_3_] );
            
            let m = this;
                m[_0_0_] = v0[_x_] * c + v1[_x_] * s;
                m[_0_1_] = v0[_y_] * c + v1[_y_] * s;
                m[_0_2_] = v0[_z_] * c + v1[_z_] * s;
                m[_0_3_] = v0[_w_] * c + v1[_w_] * s;

                m[_1_0_] = v1[_x_] * c - v0[_x_] * s;
                m[_1_1_] = v1[_y_] * c - v0[_y_] * s;
                m[_1_2_] = v1[_z_] * c - v0[_z_] * s;
                m[_1_3_] = v1[_w_] * c - v0[_w_] * s;
            return this;
        }

        static rotateZ ( outM4, rad ) {
            return mat4.prototype.rotateZ.call( outM4, rad );
        }

        rotateQuat4 ( quat ) {
            let two = CACHE_VEC4.set( quat ).multiplyScalar( 2 );
            

            let xx = quat[_x_] * two[_x_], xy = quat[_x_] * two[_y_], xz = quat[_x_] * two[_z_];
            let yy = quat[_y_] * two[_y_], yz = quat[_y_] * two[_z_], zz = quat[_z_] * two[_z_];
            let wx = quat[_w_] * two[_x_], wy = quat[_w_] * two[_y_], wz = quat[_w_] * two[_z_];

            let m = this;
                m[_0_0_] = 1 - (yy + zz);
                m[_0_1_] = xy + wz;
                m[_0_2_] = xz - wy;

                m[_1_0_] = xy - wz;
                m[_1_1_] = 1 - (xx + zz);
                m[_1_2_] = yz + wx;

                m[_2_0_] = xz + wy;
                m[_2_1_] = yz-wx;
                m[_2_2_] = 1 - (xx + yy);

            return this;
        }

        static rotateQuat4 ( outM4, quat ) {
            return mat4.prototype.rotateQuat4.call( outM4, quat );
        }

        setTranslation ( x, y, z ) {
            let m = this;

            if ( x === undefined ) x = m[_3_0_];
            if ( y === undefined ) y = m[_3_1_];
            if ( z === undefined ) z = m[_3_2_];

            m[_3_0_] = x;
            m[_3_1_] = y;
            m[_3_2_] = z;
            
            return this;
        }

        static setTranslation ( outM4, x, y, z ) {
            return mat4.prototype.setTranslation.call( outM4, x, y, z );
        }

        setRotation ( rad, x, y, z ) {
            if ( rad === undefined ) rad = 0;
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = 0;
            if ( z === undefined ) z = 0;

            let s = sin( rad );
            let c = cos( rad );
            let t = 1 - c;
            let length = sqrt( x * x + y * y + z * z );

            if ( length < EPSILON ) return makeIdentity.call( this );

            length = 1 / length;
            x *= length;
            y *= length;
            z *= length;

            let r = CACHE_MAT3;
                r[ 0 ] = x * x * t + c;     r[ 1 ] = x * y * t + z * s; r[ 2 ] = x * z * t - y * s;
                r[ 3 ] = y * x * t - z * s; r[ 4 ] = y * y * t + c;     r[ 5 ] = y * z * t + x * s;
                r[ 6 ] = z * x * t + y * s; r[ 7 ] = z * y * t - x * s; r[ 8 ] = z * z * t + c;
            
            let m = this;
                m[_0_0_] = r[ 0 ];  m[_0_1_] = r[ 1 ];  m[_0_2_] = r[ 2 ];
                m[_1_0_] = r[ 3 ];  m[_1_1_] = r[ 4 ];  m[_1_2_] = r[ 5 ];
                m[_2_0_] = r[ 6 ];  m[_2_1_] = r[ 7 ];  m[_2_2_] = r[ 8 ]; 

            return this;
        }

        static setRotation ( outM4, rad, x, y, z ) {
            return mat4.prototype.setRotation.call( outM4, rad, x, y, z );
        }

        setScale ( x, y, z ) {
            if ( x === undefined ) x = 1;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;

            let m = this;
                m[_0_0_] = x;
                m[_1_1_] = y;
                m[_2_2_] = z;
            return this;
        }

        static setScale ( outM4, x, y, z ) {
            return mat4.prototype.setScale.call( outM4, x, y, z );
        }

        makeIdentity ( ) {
            let m = this;
                m[_0_0_] = 1; m[_0_1_] = 0; m[_0_2_] = 0; m[_0_3_] = 0;
                m[_1_0_] = 0; m[_1_1_] = 1; m[_1_2_] = 0; m[_1_3_] = 0;
                m[_2_0_] = 0; m[_2_1_] = 0; m[_2_2_] = 1; m[_2_3_] = 0;
                m[_3_0_] = 0; m[_3_1_] = 0; m[_3_2_] = 0; m[_3_3_] = 1;
            return this;
        }

        static makeIdentity ( outM4 ) {
            return mat4.prototype.makeIdentity.call( outM4 );
        }

        makeFrustum ( inS_left, inS_right, inS_bottom, inS_top, inS_near, inS_far ) {
            let x = 2 * inS_near / ( inS_right - inS_left );
            let y = 2 * inS_near / ( inS_top - inS_bottom );
            
            let a = ( inS_right + inS_left ) / ( inS_right - inS_left );
            let b = ( inS_top + inS_bottom ) / ( inS_top - inS_bottom );
            let c = -( inS_far + inS_near ) / ( inS_far - inS_near );
            let d = - 2 * inS_far * inS_near / ( inS_far - inS_near );
            
            let m = this;
                m[_0_0_] = x; m[_0_1_] = 0; m[_0_2_] = 0; m[_0_3_] = 0;
                m[_1_0_] = 0; m[_1_1_] = y; m[_1_2_] = 0; m[_1_3_] = 0;
                m[_2_0_] = a; m[_2_1_] = b; m[_2_2_] = c; m[_2_3_] = 1;
                m[_3_0_] = 0; m[_3_1_] = 0; m[_3_2_] = d; m[_3_3_] = 0;
            return this;
        }

        static makeFrustum ( outM4, inS_left, inS_right, inS_bottom, inS_top, inS_near, inS_far ) {
            return mat4.prototype.makeFrustum.call( outM4, inS_left, inS_right, inS_bottom, inS_top, inS_near, inS_far );
        }

        makeOrthographic ( left, right, bottom, top, near, far ) {
            let lr = 1 / (left - right);
            let bt = 1 / (bottom - top);
            let nf = 1 / (near - far);

            let x =  ( left + right ) *  lr;
            let y =  ( top + bottom ) *  bt;
            let z =  ( near + far )   *  nf;

            let w = -2 * lr;
            let h = -2 * bt;
            let d =  2 * nf;

            let m = this;
                m[_0_0_] = w; m[_0_1_] = 0; m[_0_2_] = 0; m[_0_3_] = 0;
                m[_1_0_] = 0; m[_1_1_] = h; m[_1_2_] = 0; m[_1_3_] = 0;
                m[_2_0_] = 0; m[_2_1_] = 0; m[_2_2_] = d; m[_2_3_] = 0;
                m[_3_0_] = x; m[_3_1_] = y; m[_3_2_] = z; m[_3_3_] = 1;
            return this;
        }

        static makeOrthographic ( outM4, left, right, bottom, top, near, far ) {
            return mat4.prototype.makeOrthographic.call( outM4, left, right, bottom, top, near, far );
        }

        makePerspective ( aspect, fov, near, far ) {
            let y = 1.0 / tan( fov / 2 );
            let nf = 1 / ( near - far );
            let x = y / aspect;
            let z = ( far + near ) * nf;
            let d = ( 2 * far * near ) * nf;

            let m = this;
                m[_0_0_] = x; m[_0_1_] = 0; m[_0_2_] = 0; m[_0_3_] = 0;
                m[_1_0_] = 0; m[_1_1_] = y; m[_1_2_] = 0; m[_1_3_] = 0;
                m[_2_0_] = 0; m[_2_1_] = 0; m[_2_2_] = z; m[_2_3_] = -1;
                m[_3_0_] = 0; m[_3_1_] = 0; m[_3_2_] = d; m[_3_3_] = 0;
            return this;
        }

        static makePerspective ( outM4, aspect, fov, near, far ) {
            return mat4.prototype.makePerspective.call( outM4, aspect, fov, near, far );
        }

        makeTranslation ( x, y, z ) {
            
            if ( x === undefined ) x = 0;
            if ( y === undefined ) y = 0;
            if ( z === undefined ) z = 0;

            let m = this;
                m[_0_0_] = 1;   m[_0_1_] = 0;   m[_0_2_] = 0;   m[_0_3_] = 0;
                m[_1_0_] = 0;   m[_1_1_] = 1;   m[_1_2_] = 0;   m[_1_3_] = 0;
                m[_2_0_] = 0;   m[_2_1_] = 0;   m[_2_2_] = 1;   m[_2_3_] = 0;
                m[_3_0_] = x;   m[_3_1_] = y;   m[_3_2_] = z;   m[_3_3_] = 1;
            return this;
        }

        static makeTranslation ( outM4, x, y, z ) {
            return mat4.prototype.makeTranslation.call( outM4, x, y, z );
        }

        makeScale ( x, y , z  ) {
            if ( x === undefined ) x = 1;
            if ( y === undefined ) y = x;
            if ( z === undefined ) z = x;

            let m = this;
                m[_0_0_] = x;   m[_0_1_] = 0;   m[_0_2_] = 0;   m[_0_3_] = 0;
                m[_1_0_] = 0;   m[_1_1_] = y;   m[_1_2_] = 0;   m[_1_3_] = 0;
                m[_2_0_] = 0;   m[_2_1_] = 0;   m[_2_2_] = z;   m[_2_3_] = 0;
                m[_3_0_] = 0;   m[_3_1_] = 0;   m[_3_2_] = 0;   m[_3_3_] = 1;
            return this;
        }

        static makeScale ( outM4, x, y, z ) {
            return mat4.prototype.makeScale.call( outM4, x, y, z );
        }

        makeRotation ( rad, x, y, z ) {
            this.setRotation.call( this, rad, x, y, z );
            let m = this;
                                                                            m[_0_3_] = 0;
                                                                            m[_1_3_] = 0;
                                                                            m[_2_3_] = 0;
                m[_3_0_] = 0;       m[_3_1_] = 0;       m[_3_2_] = 0;       m[_3_3_] = 1;

            return this;
        }

        static makeRotation ( outM4, rad, x, y, z ) {
            return mat4.prototype.makeRotation.call( outM4, rad, x, y, z );
        }

        makeRotationX ( rad ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let m = this;
                m[_0_0_] = 1;   m[_0_1_] = 0;   m[_0_2_] = 0;   m[_0_3_] = 0;
                m[_1_0_] = 0;   m[_1_1_] = c;   m[_1_2_] = -s;  m[_1_3_] = 0;
                m[_2_0_] = 0;   m[_2_1_] = s;   m[_2_2_] = c;   m[_2_3_] = 0;
                m[_3_0_] = 0;   m[_3_1_] = 0;   m[_3_2_] = 0;   m[_3_3_] = 1;
            return this;
        }

        static makeRotationX ( outM4, rad ) {
            return mat4.prototype.makeRotationX.call( outM4, rad );
        }

        makeRotationY ( rad  ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let m = this;
                m[_0_0_] = c;   m[_0_1_] = 0;   m[_0_2_] = s;   m[_0_3_] = 0;
                m[_1_0_] = 0;   m[_1_1_] = 1;   m[_1_2_] = 0;   m[_1_3_] = 0;
                m[_2_0_] = -s;  m[_2_1_] = 0;   m[_2_2_] = c;   m[_2_3_] = 0;
                m[_3_0_] = 0;   m[_3_1_] = 0;   m[_3_2_] = 0;   m[_3_3_] = 1;
            return this;
        }

        static makeRotationY ( outM4, rad ) {
            return mat4.prototype.makeRotationY.call( outM4, rad );
        }

        makeRotationZ ( rad ) {
            if ( rad === undefined ) rad = 0;

            let c = cos( rad );
            let s = sin( rad );
            
            let m = this;
                m[_0_0_] = c;   m[_0_1_] = -s;  m[_0_2_] = 0;   m[_0_3_] = 0;
                m[_1_0_] = s;   m[_1_1_] = c;   m[_1_2_] = 0;   m[_1_3_] = 0;
                m[_2_0_] = 0;   m[_2_1_] = 0;   m[_2_2_] = 1;   m[_2_3_] = 0;
                m[_3_0_] = 0;   m[_3_1_] = 0;   m[_3_2_] = 0;   m[_3_3_] = 1;
            return this;
        }

        static makeRotationZ ( outM4, rad ) {
            return mat4.prototype.makeRotationZ.call( outM4, rad );
        }

        makeRotationQuat4 ( quat ) {
            let two = CACHE_VEC4.set( quat ).multiplyScalar( 2 );
            
            let xx = quat[_x_] * two[_x_], xy = quat[_x_] * two[_y_], xz = quat[_x_] * two[_z_];
            let yy = quat[_y_] * two[_y_], yz = quat[_y_] * two[_z_], zz = quat[_z_] * two[_z_];
            let wx = quat[_w_] * two[_x_], wy = quat[_w_] * two[_y_], wz = quat[_w_] * two[_z_];

            let m = this;
                m[_0_0_] = 1 - (yy + zz);   m[_0_1_] = xy + wz;         m[_0_2_] = xz - wy;         m[_0_3_] = 0;
                m[_1_0_] = xy - wz;         m[_1_1_] = 1 - (xx + zz);   m[_1_2_] = yz + wx;         m[_1_3_] = 0;
                m[_2_0_] = xz + wy;         m[_2_1_] = yz-wx;           m[_2_2_] = 1 - (xx + yy);   m[_2_3_] = 0;
                m[_3_0_] = 0;               m[_3_1_] = 0;               m[_3_2_] = 0;               m[_3_3_] = 1;
            return this;
        }

        static makeRotationQuat4 ( outM4, quat ) {
            return mat4.prototype.makeRotationQuat4.call( outM4, quat );
        }
    }

    def.Properties( mat4.prototype, {
        length : 16,
        splice : [].splice
    });
    

    const CACHE_MAT3 = new mat3;
    const CACHE_MAT4 = new mat4;

    const CACHE_VEC4 = new vec4;
    const CACHE_VEC4A = new vec4;
    const CACHE_VEC4B = new vec4;

    const CACHE_VEC3_X = new vec3;
    const CACHE_VEC3_Y = new vec3;
    const CACHE_VEC3_Z = new vec3;

    return mat4;
});

