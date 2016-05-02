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

        set ( in_mat3 ) { return mat3.set( this, in_mat3 );
        }
        static set ( out_mat3, in_mat3 ) {
            out_mat3[_0_0_] = in_mat3[_0_0_];
            out_mat3[_0_1_] = in_mat3[_0_1_];
            out_mat3[_0_2_] = in_mat3[_0_2_];
            out_mat3[_1_0_] = in_mat3[_1_0_];
            out_mat3[_1_1_] = in_mat3[_1_1_];
            out_mat3[_1_2_] = in_mat3[_1_2_];
            out_mat3[_2_0_] = in_mat3[_2_0_];
            out_mat3[_2_1_] = in_mat3[_2_1_];
            out_mat3[_2_2_] = in_mat3[_2_2_];
            return out_mat3;
        }

        setValues ( _00, _01, _02, _10, _11, _12, _20, _21, _22 ) { return mat3.setValues( this,  _00, _01, _02, _10, _11, _12, _20, _21, _22 );
        }
        static setValues ( out_mat3, _00, _01, _02, _10, _11, _12, _20, _21, _22_2 ) {
            out_mat3[_0_0_] = _00;
            out_mat3[_0_1_] = _01;
            out_mat3[_0_2_] = _02;
            out_mat3[_1_0_] = _10;
            out_mat3[_1_1_] = _11;
            out_mat3[_1_2_] = _12;
            out_mat3[_2_0_] = _20;
            out_mat3[_2_1_] = _21;
            out_mat3[_2_2_] = _22;
            return out_mat3;
        }

        transpose ( ) { return mat3.transpose( this ); }
        static transpose ( out_mat3, in_mat3 ) {
            if ( in_mat3 === undefined ) in_mat3 = mat3.set( CACHE_MAT3, out_mat3 );

            out_mat3[_0_0_] = in_mat3[_0_0_];
            out_mat3[_0_1_] = in_mat3[_1_0_];
            out_mat3[_0_2_] = in_mat3[_2_0_];
            out_mat3[_1_0_] = in_mat3[_0_1_];
            out_mat3[_1_1_] = in_mat3[_1_1_];
            out_mat3[_1_2_] = in_mat3[_2_1_];
            out_mat3[_2_0_] = in_mat3[_0_2_];
            out_mat3[_2_1_] = in_mat3[_1_2_];
            out_mat3[_2_2_] = in_mat3[_2_2_];
            return out_mat3;
        }

        add ( in_mat3 ) { return mat3.add( this, in_mat3 ); }
        static add ( inM3_a, inM3_b ) {
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