define ( function module ( ) {
    "use strict";

    const _0_0_ = 0; const _1_0_ = 3; const _2_0_ = 6;
    const _0_1_ = 1; const _1_1_ = 4; const _2_1_ = 7;
    const _0_2_ = 2; const _1_2_ = 5; const _2_2_ = 8;


    class mat3 extends Float32Array {
        constructor ( ) {
            super( 9 );
            this.makeIdentity();
        }

        static set ( outM3, inM3 ) {
            return mat3.prototype.set.call( outM3 );
        }
        set ( inM3 ) {
            this[_0_0_] = inM3[_0_0_];
            this[_0_1_] = inM3[_0_1_];
            this[_0_2_] = inM3[_0_2_];
            this[_1_0_] = inM3[_1_0_];
            this[_1_1_] = inM3[_1_1_];
            this[_1_2_] = inM3[_1_2_];
            this[_2_0_] = inM3[_2_0_];
            this[_2_1_] = inM3[_2_1_];
            this[_2_2_] = inM3[_2_2_];
            return this;
        }

        static setValues ( outM3, s_0_0, s_0_1, s_0_2, s_1_0, s_1_1, s_1_2, s_2_0, s_2_1, s_2_2 ) {
            return mat3.prototype.setValues.call( outM3, s_0_0, s_0_1, s_0_2, s_1_0, s_1_1, s_1_2, s_2_0, s_2_1, s_2_2 );
        }
        setValues ( s_0_0, s_0_1, s_0_2, s_1_0, s_1_1, s_1_2, s_2_0, s_2_1, s_2_2 ) {
            this[_0_0_] = s_0_0;
            this[_0_1_] = s_0_1;
            this[_0_2_] = s_0_2;
            this[_1_0_] = s_1_0;
            this[_1_1_] = s_1_1;
            this[_1_2_] = s_1_2;
            this[_2_0_] = s_2_0;
            this[_2_1_] = s_2_1;
            this[_2_2_] = s_2_2;
            return this;
        }

        static transpose ( outM3 ) {
            return mat3.prototype.transpose.call( outM3 );
        }
        transpose ( inM3 ) {
            if ( inM3 === undefined ) inM3 = CACHE_MAT3.set( this );

            this[_0_0_] = inM3[_0_0_];
            this[_0_1_] = inM3[_1_0_];
            this[_0_2_] = inM3[_2_0_];
            this[_1_0_] = inM3[_0_1_];
            this[_1_1_] = inM3[_1_1_];
            this[_1_2_] = inM3[_2_1_];
            this[_2_0_] = inM3[_0_2_];
            this[_2_1_] = inM3[_1_2_];
            this[_2_2_] = inM3[_2_2_];
            return this;
        }

        static add ( outM3, inM3 ) {
            return mat3.prototype.add.call( outM3, inM3 );
        }
        add ( inM3_a, inM3_b ) {
            if ( inM3_b === undefined ) inM3_b = this;

            this[_0_0_] = inM3_a[_0_0_] + inM3_b[_0_0_];
            this[_0_1_] = inM3_a[_0_1_] + inM3_b[_0_1_];
            this[_0_2_] = inM3_a[_0_2_] + inM3_b[_0_2_];
            this[_1_0_] = inM3_a[_1_0_] + inM3_b[_1_0_];
            this[_1_1_] = inM3_a[_1_1_] + inM3_b[_1_1_];
            this[_1_2_] = inM3_a[_1_2_] + inM3_b[_1_2_];
            this[_2_0_] = inM3_a[_2_0_] + inM3_b[_2_0_];
            this[_2_1_] = inM3_a[_2_1_] + inM3_b[_2_1_];
            this[_2_2_] = inM3_a[_2_2_] + inM3_b[_2_2_];
            return this;
        }

        static multiply ( outM3, inM3 ) {
            return mat3.prototype.multiply.call( outM3, inM3 );
        }
        multiply ( inM3_a, inM3_b ) {
            if ( inM3_b === undefined ) inM3_b = CACHE_MAT3.set( this );
            let a = inM3_a;
            let b = inM3_b;

            this[_0_0_] = a[_0_0_] * b[_0_0_] + a[_0_1_] * b[_1_0_] + a[_0_2_] * b[_2_0_];
            this[_0_1_] = a[_0_0_] * b[_0_1_] + a[_0_1_] * b[_1_1_] + a[_0_2_] * b[_2_1_];
            this[_0_2_] = a[_0_0_] * b[_0_2_] + a[_0_1_] * b[_1_2_] + a[_0_2_] * b[_2_2_];
            this[_1_0_] = a[_1_0_] * b[_0_0_] + a[_1_1_] * b[_1_0_] + a[_1_2_] * b[_2_0_];
            this[_1_1_] = a[_1_0_] * b[_0_1_] + a[_1_1_] * b[_1_1_] + a[_1_2_] * b[_2_1_];
            this[_1_2_] = a[_1_0_] * b[_0_2_] + a[_1_1_] * b[_1_2_] + a[_1_2_] * b[_2_2_];
            this[_2_0_] = a[_2_0_] * b[_0_0_] + a[_2_1_] * b[_1_0_] + a[_2_2_] * b[_2_0_];
            this[_2_1_] = a[_2_0_] * b[_0_1_] + a[_2_1_] * b[_1_1_] + a[_2_2_] * b[_2_1_];
            this[_2_2_] = a[_2_0_] * b[_0_2_] + a[_2_1_] * b[_1_2_] + a[_2_2_] * b[_2_2_];
            return this;
        }

        static addScalar ( outM3, s ) {
            return mat3.prototype.addScalar.call( outM3, s );
        }
        addScalar ( s, inM3 ) {
            if ( inM3 === undefined ) inM3 = this;

            this[_0_0_] = inM3[_0_0_] + s;
            this[_0_1_] = inM3[_0_1_] + s;
            this[_0_2_] = inM3[_0_2_] + s;
            this[_1_0_] = inM3[_1_0_] + s;
            this[_1_1_] = inM3[_1_1_] + s;
            this[_1_2_] = inM3[_1_2_] + s;
            this[_2_0_] = inM3[_2_0_] + s;
            this[_2_1_] = inM3[_2_1_] + s;
            this[_2_2_] = inM3[_2_2_] + s;
            return this;
        }

        static multiplyScalar ( outM3, s ) {
            return mat3.prototype.multiplyScalar.call( outM3, s );
        }
        multiplyScalar ( s, inM3 ) {
            if ( inM3 === undefined ) inM3 = this;

            this[_0_0_] = inM3[_0_0_] * s;
            this[_0_1_] = inM3[_0_1_] * s;
            this[_0_2_] = inM3[_0_2_] * s;
            this[_1_0_] = inM3[_1_0_] * s;
            this[_1_1_] = inM3[_1_1_] * s;
            this[_1_2_] = inM3[_1_2_] * s;
            this[_2_0_] = inM3[_2_0_] * s;
            this[_2_1_] = inM3[_2_1_] * s;
            this[_2_2_] = inM3[_2_2_] * s;
            return this;
        }

        static makeIdentity ( outM3 ) {
            return mat3.prototype.makeIdentity.call( outM3 );
        }
        makeIdentity ( ) {
            this[_0_0_] = 1;
            this[_0_1_] = 0;
            this[_0_2_] = 0;
            this[_1_0_] = 0;
            this[_1_1_] = 1;
            this[_1_2_] = 0;
            this[_2_0_] = 0;
            this[_2_1_] = 0;
            this[_2_2_] = 1;
            return this;
        }

        static makeTranslation ( outM3, sX, sY, sZ ) {
            return mat3.prototype.makeTranslation.call( outM3, sX, sY, sZ );
        }
        makeTranslation ( sX, sY, sZ ) {
            if ( sX === undefined ) sX = 0;
            if ( sY === undefined ) sY = 0;
            if ( sZ === undefined ) sZ = 0;

            this[_0_0_] = 1;
            this[_0_1_] = 0;
            this[_0_2_] = 0;
            this[_1_0_] = 0;
            this[_1_1_] = 1;
            this[_1_2_] = 0;
            this[_2_0_] = sX;
            this[_2_1_] = sY;
            this[_2_2_] = sZ;
            return this;
        }

        static makeScale ( outM3, sX, sY, sZ ) {
            return mat3.prototype.makeScale.call( outM3, sX, sY, sZ );
        }
        makeScale ( sX, sY, sZ ) {
            if ( sX === undefined ) sX = 1;
            if ( sY === undefined ) sY = sX;
            if ( sZ === undefined ) sZ = sX;

            this[_0_0_] = sX;
            this[_0_1_] = 0;
            this[_0_2_] = 0;
            this[_1_0_] = 0;
            this[_1_1_] = sY;
            this[_1_2_] = 0;
            this[_2_0_] = 0;
            this[_2_1_] = 0;
            this[_2_2_] = sZ;
        }

        static makeRotationX ( outM3, sDeg ) {
            return mat3.prototype.makeRotationX.call( outM3, sDeg );
        }
        makeRotationX( sDeg ) {
            if ( sDeg === undefined ) sDeg = 0;

            let c = Math.cos( sDeg / 180 * Math.PI );
            let s = Math.sin( sDeg / 180 * Math.PI );
            this[_0_0_] = 1;
            this[_0_1_] = 0;
            this[_0_2_] = 0;
            this[_1_0_] = 0;
            this[_1_1_] = c;
            this[_1_2_] = -s;
            this[_2_0_] = 0;
            this[_2_1_] = s;
            this[_2_2_] = c;
            return this;
        }

        static makeRotationY ( outM3, sDeg ) {
            return mat3.prototype.makeRotationY.call( outM3, sDeg );
        }
        makeRotationY ( sDeg ) {
            if ( sDeg === undefined ) sDeg = 0;

            let c = Math.cos( sDeg / 180 * Math.PI );
            let s = Math.sin( sDeg / 180 * Math.PI );
            this[_0_0_] = c;
            this[_0_1_] = 0;
            this[_0_2_] = s;
            this[_1_0_] = 0;
            this[_1_1_] = 0;
            this[_1_2_] = 1;
            this[_2_0_] = -s;
            this[_2_1_] = 0;
            this[_2_2_] = c;
            return this;
        }

        static makeRotationZ ( outM3, sDeg ) {
            return mat3.prototype.makeRotationZ.call( outM3, sDeg );
        }
        makeRotationZ ( sDeg ) {
            if ( sDeg === undefined ) sDeg = 0;

            let c = Math.cos( sDeg / 180 * Math.PI );
            let s = Math.sin( sDeg / 180 * Math.PI );
            this[_0_0_] = c;
            this[_0_1_] = -s;
            this[_0_2_] = 0;
            this[_1_0_] = s;
            this[_1_1_] = c;
            this[_1_2_] = 0;
            this[_2_0_] = 0;
            this[_2_1_] = 0;
            this[_2_2_] = 1;
            return this;
        }
    }

    const CACHE_MAT3 = new mat3;

    return mat3;
});