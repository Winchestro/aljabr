void function MLMat4( Vector, vec3, vec4, quat4 ) {
	const PROTOTYPE = Float32Array.prototype;

	function mat4 ( ) {
		var a = arguments;
		var m = new Float32Array ( 16 );
		m.set( [
			a[0 ] || 1, a[1 ] || 0, a[2 ] || 0, a[3 ] || 0,
			a[4 ] || 0, a[5 ] || 1, a[6 ] || 0, a[7 ] || 0,
			a[8 ] || 0, a[9 ] || 0, a[10] || 1, a[11] || 0,
			a[12] || 0, a[13] || 0, a[14] || 0, a[15] || 1,
		] );
		return m;
	}
	Object.defineProperties( PROTOTYPE, {
		Identity : {
			value : function ( ) {
				this.set( [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				] ) 
			}
		}

	} );
	Object.defineProperties( Float32Array, {

	} );
	

	function m4 ( ) {
		for(var a in arguments) this[a] = arguments[a];
		Object.defineProperty(this,"length",{value:16});	
	}

	const _PROTOTYPE = Object.create( Vector.prototype, {
		rows : {
			get : function ( ) {
				const m = this;
				return [
					new vec4(	m[0],	m[4],	m[8],	m[12]	),
					new vec4(	m[1],	m[5],	m[9],	m[13]	),
					new vec4(	m[2],	m[6],	m[10],	m[14]	),
					new vec4(	m[3],	m[7],	m[11],	m[15]	)
				];
			}
		},
		columns : {
			get : function ( ) {
				const m = this;
				return [
					new vec4(	m[0],	m[1],	m[2],	m[3]	),
					new vec4(	m[4],	m[5],	m[6],	m[7]	),
					new vec4(	m[8],	m[9],	m[10],	m[11]	),
					new vec4(	m[12],	m[13],	m[14],	m[15]	)
				];
			}
		},
		position : {
			get : function ( ) {
				return new vec3( this[12], this[13], this[14] );
			},
			set : function( vec ) {
				this[12] = vec[0]; this[13] = vec[1]; this[14] = vec[2];
			}
		},
		inverse : {
			value : function ( ) {
				const M = this;

				var		n11=M[ 0], 		n12=M[ 4], 		n13=M[ 8],		n14=M[12],
						n21=M[ 1], 		n22=M[ 5], 		n23=M[ 9], 		n24=M[13],
						n31=M[ 2], 		n32=M[ 6], 		n33=M[10], 		n34=M[14],
						n41=M[ 3], 		n42=M[ 7], 		n43=M[11], 		n44=M[15];

				M[0]	= n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 
						- n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
				M[4]	= n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 
						+ n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
				M[8] 	= n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 
						- n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
				M[12]	= n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 
						+ n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
				M[1] 	= n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 
						+ n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
				M[5] 	= n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 
						- n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
				M[9] 	= n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 
						+ n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
				M[13]	= n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 
						- n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
				M[2] 	= n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 
						- n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
				M[6] 	= n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 
						+ n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
				M[10]	= n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 
						- n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
				M[14]	= n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 
						+ n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
				M[3] 	= n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 
						+ n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
				M[7] 	= n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 
						- n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
				M[11]	= n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 
						+ n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
				M[15] 	= n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 
						- n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

				var det = n11 * M[ 0] + n21 * M[ 4] + n31 * M[ 8] + n41 * M[12];
				if( det == 0 ){
					return mat4.Identity();
				}
				M.multiplyScalar( 1 / det);
				return M;
			}
		},
		multiplyScalar : {
			value : function ( s ) {
				for( var i in this ) this[i]  *= s;
				return this;
			}
		},
		lookAt : {
			value : function ( eye, target, up ) {
				 var z = vec3.sub( eye, target ).norm();
				 if ( z.len === 0 ) z.z = 1;

				 var x = vec3.cross( up, z ).norm();
				 if( x.len === 0 ) {
				 	z.x += 0.0001;
				 	x = vec3.cross( up, z ).norm();
				 }

				 var y = vec3.cross( z, x );

				 this[0] = x.x; this[4] = y.x; this[8] = z.x;
				 this[1] = x.y; this[5] = y.y; this[9] = z.y;
				 this[2] = x.z; this[6] = y.z; this[10] = z.z;
				 return this;
			}
		},
		multiply : {
			value : function ( a, b ) {
				b = b || new Float32Array(this);
				
				this[ 0] = a[ 0] * b[ 0] + a[ 1] * b[ 4] + a[ 2] * b[ 8] + a[ 3] * b[12];
				this[ 1] = a[ 0] * b[ 1] + a[ 1] * b[ 5] + a[ 2] * b[ 9] + a[ 3] * b[13];
				this[ 2] = a[ 0] * b[ 2] + a[ 1] * b[ 6] + a[ 2] * b[10] + a[ 3] * b[14];
				this[ 3] = a[ 0] * b[ 3] + a[ 1] * b[ 7] + a[ 2] * b[11] + a[ 3] * b[15];

				this[ 4] = a[ 4] * b[ 0] + a[ 5] * b[ 4] + a[ 6] * b[ 8] + a[ 7] * b[12];
				this[ 5] = a[ 4] * b[ 1] + a[ 5] * b[ 5] + a[ 6] * b[ 9] + a[ 7] * b[13];
				this[ 6] = a[ 4] * b[ 2] + a[ 5] * b[ 6] + a[ 6] * b[10] + a[ 7] * b[14];
				this[ 7] = a[ 4] * b[ 3] + a[ 5] * b[ 7] + a[ 6] * b[11] + a[ 7] * b[15];

				this[ 8] = a[ 8] * b[ 0] + a[ 9] * b[ 4] + a[10] * b[ 8] + a[11] * b[12];
				this[ 9] = a[ 8] * b[ 1] + a[ 9] * b[ 5] + a[10] * b[ 9] + a[11] * b[13];
				this[10] = a[ 8] * b[ 2] + a[ 9] * b[ 6] + a[10] * b[10] + a[11] * b[14];
				this[11] = a[ 8] * b[ 3] + a[ 9] * b[ 7] + a[10] * b[11] + a[11] * b[15];

				this[12] = a[12] * b[ 0] + a[13] * b[ 4] + a[14] * b[ 8] + a[15] * b[12];
				this[13] = a[12] * b[ 1] + a[13] * b[ 5] + a[14] * b[ 9] + a[15] * b[13];
				this[14] = a[12] * b[ 2] + a[13] * b[ 6] + a[14] * b[10] + a[15] * b[14];
				this[15] = a[12] * b[ 3] + a[13] * b[ 7] + a[14] * b[11] + a[15] * b[15];
				return this;
				/*
				const s		= 4;
				const r		= new Float32Array(a.length);
				const cols	= this.columns;

				for(var y in cols){ 
					y = Number(y);
					var row = subArray( y * s,y * s + s );
					for(var x in cols[y]){
						x	= Number(x);
						r[ x + y * s ] 	= dot(cols[x],row);
					}
				}
				for(var v in r) a[v] = r[v];
				return a;
				function subArray(start,end){
					return [].slice.call(b,start,end);
				}
				function dot(a,b){
					return a.reduce(function(previous,current,i){
						return previous + current * b[i];
					},0);
				}
				*/
			}
		},
	});
	
	const STATIC = {
		Frustum : function ( left, right, bottom, top, near,far ) {
			const x = 2 * near / ( right - left );
			const y = 2 * near / ( top - bottom );
			
			const a = ( right + left ) / ( right - left );
			const b = ( top + bottom ) / ( top - bottom );
			const c = -( far + near ) / ( far - near );
			const d = - 2 * far * near / ( far - near );
			return new mat4 (
				x,	0,	0,	0,
				0,	y,	0,	0,
				a,	b,	c, -1,
				0,	0,  d,	0
			);
		},
		Perspective : function ( fov, near, far ) {
			const aspect = innerWidth / innerHeight;
			const ymax = near * Math.tan( fov * Math.PI / 720. );
			const ymin = -ymax;

			return mat4.Frustum (
				ymin * aspect,
				ymax * aspect,
				ymin,
				ymax,
				near,
				far
			);
		},
		Translation : function ( x, y, z ) {
			x = x || 0;
			y = y || 0;
			z = z || 0;
			return new mat4 (
				1,	0,	0,	0,
				0,	1,	0,	0,
				0,	0,	1,	0,
				x,	y,	z,	1
			);
		},
		Scale : function ( x, y, z ) {
			x = x || 1;
			y = y || 1;
			z = z || 1;
			return new mat4 (
				x,	0,	0,	0,
				0,	y,	0,	0,
				0,	0,	z,	0,
				0,	0,	0,	1
			);
		},
		RotationX : function ( a ) {
			a = a || 0;
			const c = Math.cos( a / 180 * Math.PI );
			const s = Math.sin( a / 180 * Math.PI );
			return new mat4 (
				1,	0,	0,	0,
				0,	c, -s,	0,
				0,	s,	c,	0,
				0,	0,	0,	1
			);
		},
		RotationY : function ( a ) {
			a = a || 0;
			const c = Math.cos( a / 180 * Math.PI );
			const s = Math.sin( a / 180 * Math.PI );
			return new mat4 (
				c,	0,	s,	0,
				0,	1, 	0,	0,
			   -s,	0,	c,	0,
				0,	0,	0,	1
			);
		},
		RotationZ : function ( a ) {
			a = a || 0;
			const c = Math.cos( a / 180 * Math.PI );
			const s = Math.sin( a / 180 * Math.PI );
			return new mat4 (
				c,	-s,	0,	0,
				s,	c,	0,	0,
				0,	0,	1,	0,
				0,	0,	0,	1
			);
		},
		RotationQuat4 : function ( quat ) {
			var two = vec4.fromArray( quat ).multiplyScalar( 2 );
			
			var xx = quat.x * two.x, xy = quat.x * two.y, xz = quat.x * two.z;
			var yy = quat.y * two.y, yz = quat.y * two.z, zz = quat.z * two.z;
			var wx = quat.w * two.x, wy = quat.w * two.y, wz = quat.w * two.z;

			return new mat4 (
				1-(yy+zz),	xy+wz,		xz-wy,		0,
				xy-wz,		1-(xx+zz),	yz+wx,		0,
				xz+wy,		yz-wx,		1-(xx+yy),	0,
				0,			0,			0,			1
			);
		},
		Identity : function ( ) {
			return new mat4 (
				1,0,0,0,
				0,1,0,0,
				0,0,1,0,
				0,0,0,1
			);
		},
		fromArray : function ( a ) {
			return new mat4 (
				a[ 0],a[ 1],a[ 2],a[ 3],
				a[ 4],a[ 5],a[ 6],a[ 7],
				a[ 8],a[ 9],a[10],a[11],
				a[12],a[13],a[14],a[15]
			)
		}
	};

	m4.prototype = _PROTOTYPE;
	for ( var p in STATIC ) m4[p] = STATIC[p];


	const EXPORT = {
		mat4 : mat4,
		m4 : m4,
	};
	for ( var e in EXPORT ) window[e] = math[e] = EXPORT[e];
} ( Vector, vec3, vec4, quat4 );
