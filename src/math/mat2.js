define ( [
    "../utilities/PropertyDescriptors"
], function module (
    def
) {
    "use strict";

    const _0_0_ = 0; const _1_0_ = 2;
    const _0_1_ = 1; const _1_1_ = 3;

    class mat2 {
        constructor ( ) {
            if ( arguments.length === 4 ) this.copy( arguments );
            else this.makeIdentity();
        }
        
        static set ( outM2, inM2 ) {
            return mat2.prototype.set.call( outM2, inM2 );
        }
        set ( inM2 ) {
            this[_0_0_] = inM2[_0_0_]; this[_0_1_] = inM2[_0_1_];
            this[_1_0_] = inM2[_1_0_]; this[_1_1_] = inM2[_1_1_];
            return this;
        }

        static setValues ( outM2, inS_0_0, inS_0_1, inS_1_0, inS_1_1 ) {
            return mat2.prototype.setValues.call( outM2, inS_0_0, inS_0_1, inS_1_0, inS_1_1 );
        }
        setValues ( inS_0_0, inS_0_1, inS_1_0, inS_1_1 ) {
            this[_0_0_] = inS_0_0; this[_0_1_] = inS_0_1;
            this[_1_0_] = inS_1_0; this[_1_1_] = inS_1_1;
            return this;
        }

        static transpose ( outM2 ) {
            return mat2.prototype.transpose.call( outM2 );
        }
        transpose ( inM2 ) {
            if ( inM2 === undefined ) inM2 = CACHE_MAT2.copy( this );

            this[_0_0_] = a[_0_0_]; m[_0_1_] = a[_1_0_];
            this[_1_0_] = a[_0_1_]; m[_1_1_] = a[_1_1_];
            return this;
        }

        static add ( outM2, inM2 ) {
            return mat2.prototype.add.call( outM2, inM2 );
        }
        add ( inM2_a, inM2_b ) {
            if ( inM2_b === undefined ) inM2_b = CACHE_MAT2.copy( this );

            let a = inM2_a;
            let b = inM2_b;

            this[_0_0_] = a[_0_0_] + b[_0_0_]; this[_0_1_] = a[_0_1_] + b[_0_1_];
            this[_1_0_] = a[_1_0_] + b[_1_0_]; this[_1_1_] = a[_1_1_] + b[_1_1_];
            return this;
        }

        static multiply ( outM2, inM2 ) {
            return mat2.prototype.multiply.call( outM2, inM2 );
        }
        multiply ( a, b ) {
            if ( b === undefined ) b = CACHE_MAT2.copy( this );

            this[_0_0_] = a[_0_0_] * b[_0_0_] + a[_0_1_] * b[_1_0_];
            this[_0_1_] = a[_0_0_] * b[_0_1_] + a[_0_1_] * b[_1_1_];
            this[_1_0_] = a[_1_0_] * b[_0_0_] + a[_1_1_] * b[_1_0_];
            this[_1_1_] = a[_1_0_] * b[_0_1_] + a[_1_1_] * b[_1_1_];
            return this;
        }

        static addScalar ( outM2, inS ) {
            return mat2.prototype.addScalar.call( outM2, inS );
        }
        addScalar ( inS, inM2 ) {
            if ( inM2 === undefined ) inM2 = this;

            this[_0_0_] = inM2[_0_0_] + inS; this[_0_1_] = inM2[_0_1_] + inS;
            this[_1_0_] = inM2[_1_0_] + inS; this[_1_1_] = inM2[_1_1_] + inS;
            return this;
        }

        static multiplyScalar ( outM2, inS ) {
            return mat2.prototype.multiplyScalar.call( outM2, inM2 );
        }
        multiplyScalar ( inS, inM2 ) {
            if ( inM2 === undefined ) inM2 = this;

            this[_0_0_] = inM2[_0_0_] * inS; this[_0_1_] = inM2[_0_1_] * inS;
            this[_1_0_] = inM2[_1_0_] * inS; this[_1_1_] = inM2[_1_1_] * inS;
            return this;
        }

        static makeIdentity ( outM2 ) {
            return mat2.prototype.makeIdentity.call( outM2 );
        }
        makeIdentity ( ) {
            this[_0_0_] = 1; this[_0_1_] = 0;
            this[_1_0_] = 0; this[_1_1_] = 1;   
            return this;
        }

        static makeMercator ( outM2 ) {
            return mat2.prototype.makeMercator.call( outM2 );
        }
        makeMercator ( ) {

        }


    }


    def.Properties( mat2.prototype, {
        length : 4
    });

    const CACHE_MAT2 = new mat2;

    return mat2;
});