import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { vec2, vec3, vec4, quat4 } from "../math/MLVector";

export class mat4 { 
	constructor ( ) {
		const width = 4;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data 	: new Float32Array( buffer ),
			0 		: new Float32Array( buffer, 0 * elementSize * width, width ),
			1 		: new Float32Array( buffer, 1 * elementSize * width, width ),
			2 		: new Float32Array( buffer, 2 * elementSize * width, width ),
			3 		: new Float32Array( buffer, 3 * elementSize * width, width )
		}, E );
		arguments.length ? this.data.set( arguments ) : this.Identity();
	}
	static clone ( m ) {
		return new mat4().copy( m ); 
	}
	static cloneArray ( a ) {
		return new mat4().copyArray( a );
	}
	static add ( a, b ) {
		return new mat4().add( a, b );
	}
	static multiply ( a, b ) {
		return new mat4().multiply( a, b );
	}
	static addScalar ( m, s ) {
		return mat4.clone( m ).addScalar( s );
	}
	static multiplyScalar ( m, s ) {
		return mat4.clone( m ).multiplyScalar( s );
	}
	static lookAt ( m, eye, target, up ) {
		return mat4.clone( m ).lookAt( eye, target, up );
	}
	static Frustum ( left, right, bottom, top, near, far ) {
		return new mat4().Frustum( left, right, bottom, top, near, far );
	}
	static Orthographic ( left, right, bottom, top, near, far ) {
		return new mat4().Orthographic( left, right, bottom, top, near, far );
	}
	static Perspective ( aspect, fov, near, far ) {
		return new mat4().Perspective( aspect, fov, near, far );
	}
	static Translation ( x, y, z ) {
		return new mat4().Translation( x, y, z );
	}
	static Scale  ( x, y , z ) {
		return new mat4().Scale( x, y, z );
	}
	static RotationX ( rad ) {
		return new mat4().RotationX( rad );
	}
	static RotationY ( rad ) {
		return new mat4().RotationY( rad );
	}
	static RotationZ ( rad ) {
		return new mat4().RotationZ( rad );
	}
	static RotationQuat4 ( quat ) {
		return new mat4().RotationQuat4( quat );
	}
}
Properties( mat4.prototype, {
	length : 4,
	set ( ) {
		this.data.set( arguments );
		return this;
	},
	copy ( m ) {
		this.data.set( m.data );
		return this;
	},
	copyArray ( array ) {
		this.data.set( array );
		return this;
	},
	Identity ( ) {
		return this.set(
			1,	0,	0,	0
			,
			0,	1,	0,	0
			,
			0,	0,	1,	0
			,
			0,	0,	0,	1
		);
	},
	transpose ( a = this ) {
		return this.set(
			a[ 0 ][ 0 ], a[ 1 ][ 0 ], a[ 2 ][ 0 ], a[ 3 ][ 0 ]
			,
			a[ 0 ][ 1 ], a[ 1 ][ 1 ], a[ 2 ][ 1 ], a[ 3 ][ 1 ]
			,
			a[ 0 ][ 2 ], a[ 1 ][ 2 ], a[ 2 ][ 2 ], a[ 3 ][ 2 ]
			,
			a[ 0 ][ 3 ], a[ 1 ][ 3 ], a[ 2 ][ 3 ], a[ 3 ][ 3 ]
		);
	},
	invert ( a = CACHE_MAT4.transpose( this ) ) {
		let m = this;
			
		m[ 0 ][ 0 ] = a[ 1 ][ 2 ] * a[ 2 ][ 3 ] * a[ 3 ][ 1 ]
					- a[ 1 ][ 3 ] * a[ 2 ][ 2 ] * a[ 3 ][ 1 ]
					+ a[ 1 ][ 3 ] * a[ 2 ][ 1 ] * a[ 3 ][ 2 ]
					- a[ 1 ][ 1 ] * a[ 2 ][ 3 ] * a[ 3 ][ 2 ]
					- a[ 1 ][ 2 ] * a[ 2 ][ 1 ] * a[ 3 ][ 3 ]
					+ a[ 1 ][ 1 ] * a[ 2 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 1 ][ 0 ] = a[ 0 ][ 3 ] * a[ 2 ][ 2 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 2 ] * a[ 2 ][ 3 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 3 ] * a[ 2 ][ 1 ] * a[ 3 ][ 2 ]
					+ a[ 0 ][ 1 ] * a[ 2 ][ 3 ] * a[ 3 ][ 2 ]
					+ a[ 0 ][ 2 ] * a[ 2 ][ 1 ] * a[ 3 ][ 3 ]
					- a[ 0 ][ 1 ] * a[ 2 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 2 ][ 0 ] = a[ 0 ][ 2 ] * a[ 1 ][ 3 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 2 ] * a[ 3 ][ 1 ]
					+ a[ 0 ][ 3 ] * a[ 1 ][ 1 ] * a[ 3 ][ 2 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 3 ] * a[ 3 ][ 2 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 1 ] * a[ 3 ][ 3 ]
					+ a[ 0 ][ 1 ] * a[ 1 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 3 ][ 0 ] = a[ 0 ][ 3 ] * a[ 1 ][ 2 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 3 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 1 ] * a[ 2 ][ 2 ]
					+ a[ 0 ][ 1 ] * a[ 1 ][ 3 ] * a[ 2 ][ 2 ]
					+ a[ 0 ][ 2 ] * a[ 1 ][ 1 ] * a[ 2 ][ 3 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 2 ] * a[ 2 ][ 3 ];

		m[ 0 ][ 1 ] = a[ 1 ][ 3 ] * a[ 2 ][ 2 ] * a[ 3 ][ 0 ]
					- a[ 1 ][ 2 ] * a[ 2 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 1 ][ 3 ] * a[ 2 ][ 0 ] * a[ 3 ][ 2 ]
					+ a[ 1 ][ 0 ] * a[ 2 ][ 3 ] * a[ 3 ][ 2 ]
					+ a[ 1 ][ 2 ] * a[ 2 ][ 0 ] * a[ 3 ][ 3 ]
					- a[ 1 ][ 0 ] * a[ 2 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 1 ][ 1 ] = a[ 0 ][ 2 ] * a[ 2 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 2 ][ 2 ] * a[ 3 ][ 0 ]
					+ a[ 0 ][ 3 ] * a[ 2 ][ 0 ] * a[ 3 ][ 2 ]
					- a[ 0 ][ 0 ] * a[ 2 ][ 3 ] * a[ 3 ][ 2 ]
					- a[ 0 ][ 2 ] * a[ 2 ][ 0 ] * a[ 3 ][ 3 ]
					+ a[ 0 ][ 0 ] * a[ 2 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 2 ][ 1 ] = a[ 0 ][ 3 ] * a[ 1 ][ 2 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 0 ] * a[ 3 ][ 2 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 3 ] * a[ 3 ][ 2 ]
					+ a[ 0 ][ 2 ] * a[ 1 ][ 0 ] * a[ 3 ][ 3 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 2 ] * a[ 3 ][ 3 ];

		m[ 3 ][ 1 ] = a[ 0 ][ 2 ] * a[ 1 ][ 3 ] * a[ 2 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 2 ] * a[ 2 ][ 0 ]
					+ a[ 0 ][ 3 ] * a[ 1 ][ 0 ] * a[ 2 ][ 2 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 3 ] * a[ 2 ][ 2 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 0 ] * a[ 2 ][ 3 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 2 ] * a[ 2 ][ 3 ];

		m[ 0 ][ 2 ] = a[ 1 ][ 1 ] * a[ 2 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 1 ][ 3 ] * a[ 2 ][ 1 ] * a[ 3 ][ 0 ]
					+ a[ 1 ][ 3 ] * a[ 2 ][ 0 ] * a[ 3 ][ 1 ]
					- a[ 1 ][ 0 ] * a[ 2 ][ 3 ] * a[ 3 ][ 1 ]
					- a[ 1 ][ 1 ] * a[ 2 ][ 0 ] * a[ 3 ][ 3 ]
					+ a[ 1 ][ 0 ] * a[ 2 ][ 1 ] * a[ 3 ][ 3 ];

		m[ 1 ][ 2 ] = a[ 0 ][ 3 ] * a[ 2 ][ 1 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 1 ] * a[ 2 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 2 ][ 0 ] * a[ 3 ][ 1 ]
					+ a[ 0 ][ 0 ] * a[ 2 ][ 3 ] * a[ 3 ][ 1 ]
					+ a[ 0 ][ 1 ] * a[ 2 ][ 0 ] * a[ 3 ][ 3 ]
					- a[ 0 ][ 0 ] * a[ 2 ][ 1 ] * a[ 3 ][ 3 ];

		m[ 2 ][ 2 ] = a[ 0 ][ 1 ] * a[ 1 ][ 3 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 1 ] * a[ 3 ][ 0 ]
					+ a[ 0 ][ 3 ] * a[ 1 ][ 0 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 3 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 3 ][ 3 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 1 ] * a[ 3 ][ 3 ];

		m[ 3 ][ 2 ] = a[ 0 ][ 3 ] * a[ 1 ][ 1 ] * a[ 2 ][ 0 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 3 ] * a[ 2 ][ 0 ]
					- a[ 0 ][ 3 ] * a[ 1 ][ 0 ] * a[ 2 ][ 1 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 3 ] * a[ 2 ][ 1 ]
					+ a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 2 ][ 3 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 1 ] * a[ 2 ][ 3 ];

		m[ 0 ][ 3 ] = a[ 1 ][ 2 ] * a[ 2 ][ 1 ] * a[ 3 ][ 0 ]
					- a[ 1 ][ 1 ] * a[ 2 ][ 2 ] * a[ 3 ][ 0 ]
					- a[ 1 ][ 2 ] * a[ 2 ][ 0 ] * a[ 3 ][ 1 ]
					+ a[ 1 ][ 0 ] * a[ 2 ][ 2 ] * a[ 3 ][ 1 ]
					+ a[ 1 ][ 1 ] * a[ 2 ][ 0 ] * a[ 3 ][ 2 ]
					- a[ 1 ][ 0 ] * a[ 2 ][ 1 ] * a[ 3 ][ 2 ];

		m[ 1 ][ 3 ] = a[ 0 ][ 1 ] * a[ 2 ][ 2 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 2 ] * a[ 2 ][ 1 ] * a[ 3 ][ 0 ]
					+ a[ 0 ][ 2 ] * a[ 2 ][ 0 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 0 ] * a[ 2 ][ 2 ] * a[ 3 ][ 1 ]
					- a[ 0 ][ 1 ] * a[ 2 ][ 0 ] * a[ 3 ][ 2 ]
					+ a[ 0 ][ 0 ] * a[ 2 ][ 1 ] * a[ 3 ][ 2 ];

		m[ 2 ][ 3 ] = a[ 0 ][ 2 ] * a[ 1 ][ 1 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 2 ] * a[ 3 ][ 0 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 0 ] * a[ 3 ][ 1 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 2 ] * a[ 3 ][ 1 ]
					+ a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 3 ][ 2 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 1 ] * a[ 3 ][ 2 ];

		m[ 3 ][ 3 ] = a[ 0 ][ 1 ] * a[ 1 ][ 2 ] * a[ 2 ][ 0 ]
					- a[ 0 ][ 2 ] * a[ 1 ][ 1 ] * a[ 2 ][ 0 ]
					+ a[ 0 ][ 2 ] * a[ 1 ][ 0 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 2 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 2 ][ 2 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 1 ] * a[ 2 ][ 2 ];
		  
		
		let determinant = a[ 0 ][ 0 ] * m[ 0 ][ 0 ]
						+ a[ 1 ][ 0 ] * m[ 1 ][ 0 ]
						+ a[ 2 ][ 0 ] * m[ 2 ][ 0 ]
						+ a[ 3 ][ 0 ] * m[ 3 ][ 0 ];
		
		if( Math.abs( determinant ) < Number.EPSILON ) return this.Identity();
		else return this.multiplyScalar( 1 / determinant);
	},
	addScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] += s; m[ 0 ][ 1 ] += s; m[ 0 ][ 2 ] += s; m[ 0 ][ 3 ] += s;
		m[ 1 ][ 0 ] += s; m[ 1 ][ 1 ] += s; m[ 1 ][ 2 ] += s; m[ 1 ][ 3 ] += s;
		m[ 2 ][ 0 ] += s; m[ 2 ][ 1 ] += s; m[ 2 ][ 2 ] += s; m[ 2 ][ 3 ] += s;
		m[ 3 ][ 0 ] += s; m[ 3 ][ 1 ] += s; m[ 3 ][ 2 ] += s; m[ 3 ][ 3 ] += s;
		
		return this;
	},
	multiplyScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] *= s; m[ 0 ][ 1 ] *= s; m[ 0 ][ 2 ] *= s; m[ 0 ][ 3 ] *= s;
		m[ 1 ][ 0 ] *= s; m[ 1 ][ 1 ] *= s; m[ 1 ][ 2 ] *= s; m[ 1 ][ 3 ] *= s;
		m[ 2 ][ 0 ] *= s; m[ 2 ][ 1 ] *= s; m[ 2 ][ 2 ] *= s; m[ 2 ][ 3 ] *= s;
		m[ 3 ][ 0 ] *= s; m[ 3 ][ 1 ] *= s; m[ 3 ][ 2 ] *= s; m[ 3 ][ 3 ] *= s;
		
		return this;
	},
	add ( a, b = this ) {
		return this.set(
			a[ 0 ][ 0 ] + b[ 0 ][ 0 ],
			a[ 0 ][ 1 ] + b[ 0 ][ 1 ],
			a[ 0 ][ 2 ] + b[ 0 ][ 2 ],
			a[ 0 ][ 3 ] + b[ 0 ][ 3 ],

			a[ 1 ][ 0 ] + b[ 1 ][ 0 ],
			a[ 1 ][ 1 ] + b[ 1 ][ 1 ],
			a[ 1 ][ 2 ] + b[ 1 ][ 2 ],
			a[ 1 ][ 3 ] + b[ 1 ][ 3 ],

			a[ 2 ][ 0 ] + b[ 2 ][ 0 ],
			a[ 2 ][ 1 ] + b[ 2 ][ 1 ],
			a[ 2 ][ 2 ] + b[ 2 ][ 2 ],
			a[ 2 ][ 3 ] + b[ 2 ][ 3 ],

			a[ 3 ][ 0 ] + b[ 3 ][ 0 ],
			a[ 3 ][ 1 ] + b[ 3 ][ 1 ],
			a[ 3 ][ 2 ] + b[ 3 ][ 2 ],
			a[ 3 ][ 3 ] + b[ 3 ][ 3 ]
		);
	},
	multiply ( a, b = this  ) {
		return this.set(
			  a[ 0 ][ 0 ] * b[ 0 ][ 0 ]
			+ a[ 0 ][ 1 ] * b[ 1 ][ 0 ]
			+ a[ 0 ][ 2 ] * b[ 2 ][ 0 ]
			+ a[ 0 ][ 3 ] * b[ 3 ][ 0 ]
			
			, a[ 0 ][ 0 ] * b[ 0 ][ 1 ]
			+ a[ 0 ][ 1 ] * b[ 1 ][ 1 ]
			+ a[ 0 ][ 2 ] * b[ 2 ][ 1 ]
			+ a[ 0 ][ 3 ] * b[ 3 ][ 1 ]
			
			, a[ 0 ][ 0 ] * b[ 0 ][ 2 ]
			+ a[ 0 ][ 1 ] * b[ 1 ][ 2 ]
			+ a[ 0 ][ 2 ] * b[ 2 ][ 2 ]
			+ a[ 0 ][ 3 ] * b[ 3 ][ 2 ]
			
			, a[ 0 ][ 0 ] * b[ 0 ][ 3 ]
			+ a[ 0 ][ 1 ] * b[ 1 ][ 3 ]
			+ a[ 0 ][ 2 ] * b[ 2 ][ 3 ]
			+ a[ 0 ][ 3 ] * b[ 3 ][ 3 ]
			
			, a[ 1 ][ 0 ] * b[ 0 ][ 0 ]
			+ a[ 1 ][ 1 ] * b[ 1 ][ 0 ]
			+ a[ 1 ][ 2 ] * b[ 2 ][ 0 ]
			+ a[ 1 ][ 3 ] * b[ 3 ][ 0 ]
			
			, a[ 1 ][ 0 ] * b[ 0 ][ 1 ]
			+ a[ 1 ][ 1 ] * b[ 1 ][ 1 ]
			+ a[ 1 ][ 2 ] * b[ 2 ][ 1 ]
			+ a[ 1 ][ 3 ] * b[ 3 ][ 1 ]

			, a[ 1 ][ 0 ] * b[ 0 ][ 2 ]
			+ a[ 1 ][ 1 ] * b[ 1 ][ 2 ]
			+ a[ 1 ][ 2 ] * b[ 2 ][ 2 ]
			+ a[ 1 ][ 3 ] * b[ 3 ][ 2 ]

			, a[ 1 ][ 0 ] * b[ 0 ][ 3 ]
			+ a[ 1 ][ 1 ] * b[ 1 ][ 3 ]
			+ a[ 1 ][ 2 ] * b[ 2 ][ 3 ]
			+ a[ 1 ][ 3 ] * b[ 3 ][ 3 ]

			, a[ 2 ][ 0 ] * b[ 0 ][ 0 ]
			+ a[ 2 ][ 1 ] * b[ 1 ][ 0 ]
			+ a[ 2 ][ 2 ] * b[ 2 ][ 0 ]
			+ a[ 2 ][ 3 ] * b[ 3 ][ 0 ]

			, a[ 2 ][ 0 ] * b[ 0 ][ 1 ]
			+ a[ 2 ][ 1 ] * b[ 1 ][ 1 ]
			+ a[ 2 ][ 2 ] * b[ 2 ][ 1 ]
			+ a[ 2 ][ 3 ] * b[ 3 ][ 1 ]

			, a[ 2 ][ 0 ] * b[ 0 ][ 2 ]
			+ a[ 2 ][ 1 ] * b[ 1 ][ 2 ]
			+ a[ 2 ][ 2 ] * b[ 2 ][ 2 ]
			+ a[ 2 ][ 3 ] * b[ 3 ][ 2 ]

			, a[ 2 ][ 0 ] * b[ 0 ][ 3 ]
			+ a[ 2 ][ 1 ] * b[ 1 ][ 3 ]
			+ a[ 2 ][ 2 ] * b[ 2 ][ 3 ]
			+ a[ 2 ][ 3 ] * b[ 3 ][ 3 ]

			, a[ 3 ][ 0 ] * b[ 0 ][ 0 ]
			+ a[ 3 ][ 1 ] * b[ 1 ][ 0 ]
			+ a[ 3 ][ 2 ] * b[ 2 ][ 0 ]
			+ a[ 3 ][ 3 ] * b[ 3 ][ 0 ]

			, a[ 3 ][ 0 ] * b[ 0 ][ 1 ]
			+ a[ 3 ][ 1 ] * b[ 1 ][ 1 ]
			+ a[ 3 ][ 2 ] * b[ 2 ][ 1 ]
			+ a[ 3 ][ 3 ] * b[ 3 ][ 1 ]

			, a[ 3 ][ 0 ] * b[ 0 ][ 2 ]
			+ a[ 3 ][ 1 ] * b[ 1 ][ 2 ]
			+ a[ 3 ][ 2 ] * b[ 2 ][ 2 ]
			+ a[ 3 ][ 3 ] * b[ 3 ][ 2 ]

			, a[ 3 ][ 0 ] * b[ 0 ][ 3 ]
			+ a[ 3 ][ 1 ] * b[ 1 ][ 3 ]
			+ a[ 3 ][ 2 ] * b[ 2 ][ 3 ]
			+ a[ 3 ][ 3 ] * b[ 3 ][ 3 ]
		);
	},
	determinant ( ) {
		let m = this;

		let a1 	= m[ 0 ][ 0 ] * m[ 1 ][ 1 ] 
				- m[ 0 ][ 1 ] * m[ 1 ][ 0 ];

		let a2	= m[ 0 ][ 0 ] * m[ 1 ][ 2 ]	
				- m[ 0 ][ 2 ] * m[ 1 ][ 0 ];

		let a3	= m[ 0 ][ 0 ] * m[ 1 ][ 3 ]
				- m[ 0 ][ 3 ] * m[ 1 ][ 0 ];

		let a4	= m[ 0 ][ 1 ] * m[ 1 ][ 2 ]
				- m[ 0 ][ 2 ] * m[ 1 ][ 1 ];

		let a5	= m[ 0 ][ 1 ] * m[ 1 ][ 3 ]
				- m[ 0 ][ 3 ] * m[ 1 ][ 1 ];

		let a6	= m[ 0 ][ 2 ] * m[ 1 ][ 3 ]
				- m[ 0 ][ 3 ] * m[ 1 ][ 2 ];


		let b1	= m[ 2 ][ 2 ] * m[ 3 ][ 3 ]
				- m[ 2 ][ 3 ] * m[ 3 ][ 2 ];

		let b2	= m[ 2 ][ 1 ] * m[ 3 ][ 3 ]
				- m[ 2 ][ 3 ] * m[ 3 ][ 1 ];

		let b3	= m[ 2 ][ 1 ] + m[ 3 ][ 2 ]
				- m[ 2 ][ 2 ] + m[ 3 ][ 1 ];

		let b4	= m[ 2 ][ 0 ] + m[ 3 ][ 3 ]
				- m[ 2 ][ 3 ] + m[ 3 ][ 0 ];

		let b5	= m[ 2 ][ 0 ] + m[ 3 ][ 2 ]
				- m[ 2 ][ 2 ] + m[ 3 ][ 0 ];

		let b6	= m[ 2 ][ 0 ] + m[ 3 ][ 1 ]
				- m[ 2 ][ 1 ] + m[ 3 ][ 0 ];

		return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
	},
	lookAt ( eye, target, up ) {
		let m = this;
		let z = CACHE_VEC3_Z.sub( eye, target ).normalize();

		if ( z.getLength === 0 ) z = z.set( up );

		let x = CACHE_VEC3_X.cross( up, z ).normalize();
		
		if( x.getLength === 0 ) {
			z.x += 0.0001;
			x = x.cross( up, z ).normalize();
		}

		let y = CACHE_VEC3_Y.cross( z, x );

		m[ 0 ][ 0 ] = x[ 0 ]; m[ 0 ][ 1 ] = x[ 1 ]; m[ 0 ][ 2 ] = x[ 2 ];
		m[ 1 ][ 0 ] = y[ 0 ]; m[ 1 ][ 1 ] = y[ 1 ]; m[ 1 ][ 2 ] = y[ 2 ];
		m[ 2 ][ 0 ] = z[ 0 ]; m[ 2 ][ 1 ] = z[ 1 ]; m[ 2 ][ 2 ] = z[ 2 ];
		
		return this;
	},

	Frustum ( left, right, bottom, top, near, far ) {
		let x = 2 * near / ( right - left );
		let y = 2 * near / ( top - bottom );
		
		let a = ( right + left ) / ( right - left );
		let b = ( top + bottom ) / ( top - bottom );
		let c = -( far + near ) / ( far - near );
		let d = - 2 * far * near / ( far - near );
		
		return this.set(
			x,	0,	0,	0
			,
			0,	y,	0,	0
			,
			a,	b,	c,	1
			,
			0,	0,	d,	0
		)
	},
	Orthographic ( left, right, bottom, top, near, far ) {
		let w = right - left;
		let h = top - bottom;
		let d = far - near;

		let x = ( left + right ) / -w;
		let y = ( top + bottom ) / -h;
		let z = ( near + far ) 	 / -d;

		w =  2 / w;
		h =  2 / h;
		d = -2 / d;

		return this.set(
			w,	0,	0,	0
			,
			0,	h,	0,	0
			,
			0,	0,	d,	0
			,
			x,	y,	z,	1
		);
	},
	Perspective ( aspect, fov, near, far ) {
		let y = 1.0 / Math.tan( fov / 2 );
		let nf = 1 / ( near - far );
		let x = y / aspect;
		let z = ( far + near ) * nf;
		let d = ( 2 * far * near ) * nf;


		return this.set(
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z,-1,
			0, 0, d, 0
		);
	},

	translate ( x = 0, y = 0, z = 0 ) {
		let m = this;
		let a = CACHE_MAT4.copy( this );

	 	m[ 3 ][ 0 ]	= a[ 0 ][ 0 ] * x
					+ a[ 1 ][ 0 ] * y
					+ a[ 2 ][ 0 ] * z
					+ a[ 3 ][ 0 ];

		m[ 3 ][ 1 ]	= a[ 0 ][ 1 ] * x
					+ a[ 1 ][ 1 ] * y
					+ a[ 2 ][ 1 ] * z
					+ a[ 3 ][ 1 ];

		m[ 3 ][ 2 ]	= a[ 0 ][ 2 ] * x
					+ a[ 1 ][ 2 ] * y
					+ a[ 2 ][ 2 ] * z
					+ a[ 3 ][ 2 ];

		m[ 3 ][ 3 ] = a[ 0 ][ 3 ] * x
					+ a[ 1 ][ 3 ] * y
					+ a[ 2 ][ 3 ] * z
					+ a[ 3 ][ 3 ];

		return this;
	},
	scale ( x = 1, y = x, z = x ) {
		let m = this;

		m[ 0 ][ 0 ] *= x; m[ 0 ][ 1 ] *= x; m[ 0 ][ 2 ] *= x; m[ 0 ][ 3 ] *= x;
		m[ 1 ][ 0 ] *= y; m[ 1 ][ 1 ] *= y; m[ 1 ][ 2 ] *= y; m[ 1 ][ 3 ] *= y;
		m[ 2 ][ 0 ] *= z; m[ 2 ][ 1 ] *= z; m[ 2 ][ 2 ] *= z; m[ 2 ][ 3 ] *= z;

		return this;
	},
	rotate ( rad = 0, x = 0, y = 0, z = 0 ) {
		let length = Math.sqrt( x * x + y * y + z * z );
		
		if ( Math.abs( length ) < Number.EPSILON ) return this.Identity();

		let s = Math.sin( rad );
		let c = Math.cos( rad );
		let t = 1 - c;

		length = 1 / length;
		x *= length;
		y *= length;
		z *= length;

		let r = CACHE_MAT3;
		r[ 0 ][ 0 ] = x * x * t + c;
		r[ 1 ][ 1 ] = y * y * t + c;
		r[ 2 ][ 2 ] = z * z * t + c;

		r[ 0 ][ 1 ] = x * y * t + z * s;
		r[ 1 ][ 2 ] = y * z * t + x * s;
		r[ 2 ][ 0 ] = z * x * t + y * s;

		r[ 0 ][ 2 ] = x * z * t - y * s;
		r[ 1 ][ 0 ] = y * x * t - z * s;
		r[ 2 ][ 1 ] = z * y * t - x * s;

		let a = CACHE_MAT4.copy( this );
		let m = this;
		
		m[ 0 ][ 0 ] = r[ 0 ][ 0 ] * a[ 0 ][ 0 ]
					+ r[ 0 ][ 1 ] * a[ 1 ][ 0 ]
					+ r[ 0 ][ 2 ] * a[ 2 ][ 0 ];

		m[ 0 ][ 1 ] = r[ 0 ][ 0 ] * a[ 0 ][ 1 ]
					+ r[ 0 ][ 1 ] * a[ 1 ][ 1 ]
					+ r[ 0 ][ 2 ] * a[ 2 ][ 1 ];

		m[ 0 ][ 2 ] = r[ 0 ][ 0 ] * a[ 0 ][ 2 ]
					+ r[ 0 ][ 1 ] * a[ 1 ][ 2 ]
					+ r[ 0 ][ 2 ] * a[ 2 ][ 2 ];

		m[ 0 ][ 3 ] = r[ 0 ][ 0 ] * a[ 0 ][ 3 ]
					+ r[ 0 ][ 1 ] * a[ 1 ][ 3 ]
					+ r[ 0 ][ 2 ] * a[ 2 ][ 3 ];

		m[ 1 ][ 0 ] = r[ 1 ][ 0 ] * a[ 0 ][ 0 ]
					+ r[ 1 ][ 1 ] * a[ 1 ][ 0 ]
					+ r[ 1 ][ 2 ] * a[ 2 ][ 0 ];

		m[ 1 ][ 1 ] = r[ 1 ][ 0 ] * a[ 0 ][ 1 ]
					+ r[ 1 ][ 1 ] * a[ 1 ][ 1 ]
					+ r[ 1 ][ 2 ] * a[ 2 ][ 1 ];

		m[ 1 ][ 2 ] = r[ 1 ][ 0 ] * a[ 0 ][ 2 ]
					+ r[ 1 ][ 1 ] * a[ 1 ][ 2 ]
					+ r[ 1 ][ 2 ] * a[ 2 ][ 2 ];

		m[ 1 ][ 3 ] = r[ 1 ][ 0 ] * a[ 0 ][ 3 ]
					+ r[ 1 ][ 1 ] * a[ 1 ][ 3 ]
					+ r[ 1 ][ 2 ] * a[ 2 ][ 3 ];

		m[ 2 ][ 0 ] = r[ 2 ][ 0 ] * a[ 0 ][ 0 ]
					+ r[ 2 ][ 1 ] * a[ 1 ][ 0 ]
					+ r[ 2 ][ 2 ] * a[ 2 ][ 0 ];

		m[ 2 ][ 1 ] = r[ 2 ][ 0 ] * a[ 0 ][ 1 ]
					+ r[ 2 ][ 1 ] * a[ 1 ][ 1 ]
					+ r[ 2 ][ 2 ] * a[ 2 ][ 1 ];

		m[ 2 ][ 2 ] = r[ 2 ][ 0 ] * a[ 0 ][ 2 ]
					+ r[ 2 ][ 1 ] * a[ 1 ][ 2 ]
					+ r[ 2 ][ 2 ] * a[ 2 ][ 2 ];

		m[ 2 ][ 3 ] = r[ 2 ][ 0 ] * a[ 0 ][ 3 ]
					+ r[ 2 ][ 1 ] * a[ 1 ][ 3 ]
					+ r[ 2 ][ 2 ] * a[ 2 ][ 3 ];
		
		return this;
	},
	rotateX ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m1 = CACHE_VEC4A.set( m[ 1 ] );
		let m2 = CACHE_VEC4B.set( m[ 2 ] );

		m[ 1 ][ 0 ] = m1[ 0 ] * c + m2[ 0 ] * s;
		m[ 1 ][ 1 ] = m1[ 1 ] * c + m2[ 1 ] * s;
		m[ 1 ][ 2 ] = m1[ 2 ] * c + m2[ 2 ] * s;
		m[ 1 ][ 3 ] = m1[ 3 ] * c + m2[ 3 ] * s;

		m[ 2 ][ 0 ] = m2[ 0 ] * c - m1[ 0 ] * s;
		m[ 2 ][ 1 ] = m2[ 1 ] * c - m1[ 1 ] * s;
		m[ 2 ][ 2 ] = m2[ 2 ] * c - m1[ 2 ] * s;
		m[ 2 ][ 3 ] = m2[ 3 ] * c - m1[ 3 ] * s;

		return this;
	},
	rotateY ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m0 = CACHE_VEC4A.set( m[ 0 ] );
		let m2 = CACHE_VEC4B.set( m[ 2 ] );

		m[ 2 ][ 0 ] = m0[ 0 ] * c + m2[ 0 ] * s;
		m[ 2 ][ 1 ] = m0[ 1 ] * c + m2[ 1 ] * s;
		m[ 2 ][ 2 ] = m0[ 2 ] * c + m2[ 2 ] * s;
		m[ 2 ][ 3 ] = m0[ 3 ] * c + m2[ 3 ] * s;

		m[ 0 ][ 0 ] = m2[ 0 ] * c - m0[ 0 ] * s;
		m[ 0 ][ 1 ] = m2[ 1 ] * c - m0[ 1 ] * s;
		m[ 0 ][ 2 ] = m2[ 2 ] * c - m0[ 2 ] * s;
		m[ 0 ][ 3 ] = m2[ 3 ] * c - m0[ 3 ] * s;

		return this;
	},
	rotateZ ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		let m = this;
		
		let m0 = CACHE_VEC4A.set( m[ 0 ] );
		let m2 = CACHE_VEC4B.set( m[ 1 ] );

		m[ 0 ][ 0 ] = m0[ 0 ] * c + m2[ 0 ] * s;
		m[ 0 ][ 1 ] = m0[ 1 ] * c + m2[ 1 ] * s;
		m[ 0 ][ 2 ] = m0[ 2 ] * c + m2[ 2 ] * s;
		m[ 0 ][ 3 ] = m0[ 3 ] * c + m2[ 3 ] * s;

		m[ 1 ][ 0 ] = m2[ 0 ] * c - m0[ 0 ] * s;
		m[ 1 ][ 1 ] = m2[ 1 ] * c - m0[ 1 ] * s;
		m[ 1 ][ 2 ] = m2[ 2 ] * c - m0[ 2 ] * s;
		m[ 1 ][ 3 ] = m2[ 3 ] * c - m0[ 3 ] * s;

		return this;
	},
	rotateQuat4 ( quat ) {
		let two = CACHE_VEC4.clone( quat ).multiplyScalar( 2 );
		let m = this;

		let xx = quat.x * two.x, xy = quat.x * two.y, xz = quat.x * two.z;
		let yy = quat.y * two.y, yz = quat.y * two.z, zz = quat.z * two.z;
		let wx = quat.w * two.x, wy = quat.w * two.y, wz = quat.w * two.z;

		m[ 0 ][ 0 ] = 1 - (yy + zz);
		m[ 0 ][ 1 ] = xy + wz;
		m[ 0 ][ 2 ] = xz - wy;

		m[ 1 ][ 0 ] = xy - wz;
		m[ 1 ][ 1 ] = 1 - (xx + zz);
		m[ 1 ][ 2 ] = yz + wx;

		m[ 2 ][ 0 ] = xz + wy;
		m[ 2 ][ 1 ] = yz-wx;
		m[ 2 ][ 2 ] = 1 - (xx + yy);

		return this;
	},

	Translation ( x = 0, y = 0, z = 0 ) {
		return this.set(
			1,	0,	0,	0
			,
			0,	1,	0,	0
			,
			0,	0,	1,	0
			,
			x,	y,	z,	1
		);
	},
	Scale ( x = 1, y = x, z = x ) {
		return this.set(
			x,	0,	0,	0
			,
			0,	y,	0,	0
			,
			0,	0,	z,	0
			,
			0,	0,	0,	1
		);
	},
	Rotation ( rad, x, y, z ) {
		let s = Math.sin( rad );
		let c = Math.cos( rad );
		let t = 1 - c;
		let length = Math.sqrt( x * x + y * y + z * z );

		if ( length < Number.EPSILON ) return this.Identity();

		length = 1 / length;
		x *= length;
		y *= length;
		z *= length;

		let r = CACHE_MAT3;

		r[ 0 ][ 0 ] = x * x * t + c;
		r[ 1 ][ 1 ] = y * y * t + c;
		r[ 2 ][ 2 ] = z * z * t + c;

		r[ 0 ][ 1 ] = x * y * t + z * s;
		r[ 1 ][ 2 ] = y * z * t + x * s;
		r[ 2 ][ 0 ] = z * x * t + y * s;

		r[ 0 ][ 2 ] = x * z * t - y * s;
		r[ 1 ][ 0 ] = y * x * t - z * s;
		r[ 2 ][ 1 ] = z * y * t - x * s;

		return this.set(
			r[ 0 ][ 0 ],	r[ 0 ][ 1 ],	r[ 0 ][ 2 ],	0
			,
			r[ 1 ][ 0 ],	r[ 1 ][ 1 ],	r[ 1 ][ 2 ],	0
			,
			r[ 2 ][ 0 ],	r[ 2 ][ 1 ],	r[ 2 ][ 2 ],	0
			,
			0,				0,				0,				1
		);
	},
	RotationX ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );

		return this.set(
			1,	0,	0,	0
			,
			0, 	c,	-s, 0
			,
			0, 	s, 	c, 	0
			,
			0, 	0, 	0, 	1
		);
	},
	RotationY ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		
		return this.set(
			c,	0,	s,	0
			,
			0,	1,	0,	0
			,
		   -s,	0,	c,	0
		   ,
			0,	0,	0,	1
		);
	},
	RotationZ ( rad = 0 ) {
		let c = Math.cos( rad );
		let s = Math.sin( rad );
		
		return this.set(
			c,	-s,	0,	0
			,
			s,	c,	0,	0
			,
			0,	0,	1,	0
			,
			0,	0,	0,	1
		);
	},
	RotationQuat4 ( quat ) {
		let two = CACHE_VEC4.clone( quat ).multiplyScalar( 2 );
		
		let xx = quat.x * two.x, xy = quat.x * two.y, xz = quat.x * two.z;
		let yy = quat.y * two.y, yz = quat.y * two.z, zz = quat.z * two.z;
		let wx = quat.w * two.x, wy = quat.w * two.y, wz = quat.w * two.z;

		return this.set(
			1 - (yy + zz),	xy + wz,		xz - wy,		0
			,
			xy - wz,		1 - (xx + zz),	yz + wx,		0
			,
			xz + wy,		yz-wx,			1 - (xx + yy),	0
			,
			0,				0,				0,				1
		);
	}
});

export class mat3 {
	constructor ( ) {
		const width = 3;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data : new Float32Array( buffer ),
			0 : new Float32Array( buffer, 0 * elementSize * width, width ),
			1 : new Float32Array( buffer, 1 * elementSize * width, width ),
			2 : new Float32Array( buffer, 2 * elementSize * width, width ),
		}, E );

		arguments.length ? this.data.set( arguments ) : this.identity();
	}
	static clone ( m ) {
		return new mat3().copy( m ); 
	}
	static cloneArray( a ) {
		return new mat3().copyArray( a );
	}
	static multiply ( a, b ) {
		return new mat3().multiply( a, b );
	}
	static multiplyScalar ( m, s ) {
		return mat3.clone( m ).multiplyScalar( s );
	}
	static add ( a, b ) {
		return new mat3().add( a, b );
	}
	static addScalar ( m, s ) {
		return mat3.clone( m ).addScalar( s );
	}
}
Properties( mat3.prototype, {
	length : 4,
	set ( ) {
		this.data.set( arguments );
		return this;
	},
	copy ( m ) {
		this.data.set( m.data );
		return this;
	},
	copyArray ( array ) {
		this.data.set( array );
		return this;
	},
	transpose ( a = CACHE_MAT3.copy( this ) ) {
		let m = this;
		
		m[ 0 ][ 0 ] = a[ 0 ][ 0 ];	m[ 0 ][ 1 ] = a[ 1 ][ 0 ];	m[ 0 ][ 2 ] = a[ 2 ][ 0 ];
		m[ 1 ][ 0 ] = a[ 0 ][ 1 ];	m[ 1 ][ 1 ] = a[ 1 ][ 1 ];	m[ 1 ][ 2 ] = a[ 2 ][ 1 ];
		m[ 2 ][ 0 ] = a[ 0 ][ 2 ];	m[ 2 ][ 1 ] = a[ 1 ][ 2 ];	m[ 2 ][ 2 ] = a[ 2 ][ 2 ];
	
		return this;
	},
	identity ( ) {
		let m = this;

		m[ 0 ][ 0 ] = 1; m[ 0 ][ 1 ] = 0; m[ 0 ][ 2 ] = 0;
		m[ 1 ][ 0 ] = 0; m[ 1 ][ 1 ] = 1; m[ 1 ][ 2 ] = 0;
		m[ 2 ][ 0 ] = 0; m[ 2 ][ 1 ] = 0; m[ 2 ][ 2 ] = 1;
			
		return this;
	},
	multiplyScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] *= s; m[ 0 ][ 1 ] *= s; m[ 0 ][ 2 ] *= s;
		m[ 1 ][ 0 ] *= s; m[ 1 ][ 1 ] *= s; m[ 1 ][ 2 ] *= s;
		m[ 2 ][ 0 ] *= s; m[ 2 ][ 1 ] *= s; m[ 2 ][ 2 ] *= s;
		
		return this;
	},
	addScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] += s; m[ 0 ][ 1 ] += s; m[ 0 ][ 2 ] += s;
		m[ 1 ][ 0 ] += s; m[ 1 ][ 1 ] += s; m[ 1 ][ 2 ] += s;
		m[ 2 ][ 0 ] += s; m[ 2 ][ 1 ] += s; m[ 2 ][ 2 ] += s;
		
		return this;
	},
	multiply ( a, b = CACHE_MAT3.copy( this ) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 0 ]
					;
		m[ 0 ][ 1 ] = a[ 0 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 1 ]
					;
		m[ 0 ][ 2 ] = a[ 0 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 2 ]
					;
		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 0 ]
					;
		m[ 1 ][ 1 ] = a[ 1 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 1 ]
					;
		m[ 1 ][ 2 ] = a[ 1 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 2 ]
					;
		m[ 2 ][ 0 ] = a[ 2 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 0 ]
					;
		m[ 2 ][ 1 ] = a[ 2 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 1 ]
					;
		m[ 2 ][ 2 ] = a[ 2 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 2 ]
					;

		return this;
	},
	add ( a, b = CACHE_MAT3.copy( this ) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] + b[ 0 ][ 0 ]; m[ 0 ][ 1 ] = a[ 0 ][ 1 ] + b[ 0 ][ 1 ]; m[ 0 ][ 2 ] = a[ 0 ][ 2 ] + b[ 0 ][ 2 ];
		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] + b[ 1 ][ 0 ]; m[ 1 ][ 1 ] = a[ 1 ][ 1 ] + b[ 1 ][ 1 ]; m[ 1 ][ 2 ] = a[ 1 ][ 2 ] + b[ 1 ][ 2 ];
		m[ 2 ][ 0 ] = a[ 2 ][ 0 ] + b[ 2 ][ 0 ]; m[ 2 ][ 1 ] = a[ 2 ][ 1 ] + b[ 2 ][ 1 ]; m[ 2 ][ 2 ] = a[ 2 ][ 2 ] + b[ 2 ][ 2 ];
		
		return this;
	},
	translation ( x = 0, y = 0, z = 0 ) {
		return this.set([
			1, 0, 0, 
			0, 1, 0, 
			x, y, z
		]);
	},
	scale ( x = 1, y = x, z = x ) {
		return this.set([
			x, 0, 0, 
			0, y, 0, 
			0, 0, z
		]);
	},
	rotationX( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );

		return this.set([
			1, 0, 0, 
			0, c,-s, 
			0, s, c
		]);
	},
	rotationY ( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );
		
		return this.set([
			c, 0, s,
			0, 1, 0,
		   -s, 0, c
		]);
	},
	rotationZ ( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );
		
		return this.set([
			c,-s, 0,
			s, c, 0,
			0, 0, 1
		]);
	},
});

export class mat2 {
	constructor ( ) {
		const width = 2;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data : new Float32Array( buffer ),
			0 : new Float32Array( buffer, 0 * elementSize * width, width ),
			1 : new Float32Array( buffer, 1 * elementSize * width, width ),
		}, E );

		arguments.length ? this.data.set( arguments ) : this.identity();
	}
	static clone ( m ) {
		return new mat2().copy( m ); 
	}
	static multiply ( a, b ) {
		return new mat2().multiply( a, b );
	}
	static multiplyScalar ( m, s ) {
		return mat2.clone( m ).multiplyScalar( s );
	}
	static add ( a, b ) {
		return new mat2().add( a, b );
	}
	static addScalar ( m, s ) {
		return mat2.clone( m ).addScalar( s );
	}
}
Properties( mat2.prototype, {
	length : 2,
	set ( ) {
		this.data.set( arguments );
		return this;
	},
	copyArray ( a ) {
		this.data.set( a );
		return this;
	},
	copy ( m ) {
		this.data.set( m.data );
		return this;
	},
	transpose ( a = CACHE_MAT2.copy( this ) ) {
		let m = this;
		
		m[ 0 ][ 0 ] = a[ 0 ][ 0 ];	m[ 0 ][ 1 ] = a[ 1 ][ 0 ];
		m[ 1 ][ 0 ] = a[ 0 ][ 1 ];	m[ 1 ][ 1 ] = a[ 1 ][ 1 ];
	
		return this;
	},
	identity ( ) {
		let m = this;

		m[ 0 ][ 0 ] = 1; m[ 0 ][ 1 ] = 0;
		m[ 1 ][ 0 ] = 0; m[ 1 ][ 1 ] = 1;
			
		return this;
	},
	multiplyScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] *= s; m[ 0 ][ 1 ] *= s;
		m[ 1 ][ 0 ] *= s; m[ 1 ][ 1 ] *= s;
		
		return this;
	},
	addScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] += s; m[ 0 ][ 1 ] += s;
		m[ 1 ][ 0 ] += s; m[ 1 ][ 1 ] += s;
		
		return this;
	},
	multiply ( a, b = CACHE_MAT2.copy( this ) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 0 ]
					;
		m[ 0 ][ 1 ] = a[ 0 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 1 ]
					;
		
					;
		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 0 ]
					;
		m[ 1 ][ 1 ] = a[ 1 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 1 ]
					;

		return this;
	},
	add ( a, b = CACHE_MAT2.copy( this ) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] + b[ 0 ][ 0 ]; m[ 0 ][ 1 ] = a[ 0 ][ 1 ] + b[ 0 ][ 1 ];
		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] + b[ 1 ][ 0 ]; m[ 1 ][ 1 ] = a[ 1 ][ 1 ] + b[ 1 ][ 1 ];
		
		return this;
	},
});

const CACHE_MAT4 	= new mat4;
const CACHE_MAT3 	= new mat3;
const CACHE_MAT2	= new mat2;
const CACHE_VEC3_X 	= new vec3;
const CACHE_VEC3_Y 	= new vec3;
const CACHE_VEC3_Z 	= new vec3;

const CACHE_VEC4A 	= new vec4;
const CACHE_VEC4B	= new vec4;

//TESTS
/*
var test = {
	is : function assert( statement ) {
		console.assert( statement );
		return this;
	}
};

var m2a = new mat2( 4, 3, 2, 1 ); var m2b = new mat2; test

	.is( m2a[ 0 ][ 0 ] === 4 ).is( m2a[ 0 ][ 1 ] === 3 )
	.is( m2a[ 1 ][ 0 ] === 2 ).is( m2a[ 1 ][ 1 ] === 1 )

	.is( m2b[ 0 ][ 0 ] === 1 ).is( m2b[ 0 ][ 1 ] === 0 )
	.is( m2b[ 1 ][ 0 ] === 0 ).is( m2b[ 1 ][ 1 ] === 1 )
	;
m2a.set( 1, 2, 3, 4 ); test

	.is( m2a[ 0 ][ 0 ] === 1 ).is( m2a[ 0 ][ 1 ] === 2 )
	.is( m2a[ 1 ][ 0 ] === 3 ).is( m2a[ 1 ][ 1 ] === 4 )
	;
m2a.transpose(); test

	.is( m2a[ 0 ][ 0 ] === 1 ).is( m2a[ 0 ][ 1 ] === 3 )
	.is( m2a[ 1 ][ 0 ] === 2 ).is( m2a[ 1 ][ 1 ] === 4 )
	; //console.log( "transpose", "=", m2a.data );
m2a.add( m2b ); test

	.is( m2a[ 0 ][ 0 ] === 2 ).is( m2a[ 0 ][ 1 ] === 3 )
	.is( m2a[ 1 ][ 0 ] === 2 ).is( m2a[ 1 ][ 1 ] === 5 )

	.is( m2b[ 0 ][ 0 ] === 1 ).is( m2b[ 0 ][ 1 ] === 0 )
	.is( m2b[ 1 ][ 0 ] === 0 ).is( m2b[ 1 ][ 1 ] === 1 )
	; //console.log( "+", m2b.data, "=", m2a.data );
m2a.multiply( m2b ); test
	
	.is( m2a[ 0 ][ 0 ] === 2 ).is( m2a[ 0 ][ 1 ] === 3 )
	.is( m2a[ 1 ][ 0 ] === 2 ).is( m2a[ 1 ][ 1 ] === 5 )

	.is( m2b[ 0 ][ 0 ] === 1 ).is( m2b[ 0 ][ 1 ] === 0 )
	.is( m2b[ 1 ][ 0 ] === 0 ).is( m2b[ 1 ][ 1 ] === 1 )
	; //console.log( "*", m2b.data, "=", m2a.data );
m2a.addScalar( 1 ); test
	
	.is( m2a[ 0 ][ 0 ] === 3 ).is( m2a[ 0 ][ 1 ] === 4 )
	.is( m2a[ 1 ][ 0 ] === 3 ).is( m2a[ 1 ][ 1 ] === 6 )
	; //console.log( "+", 1, "=", m2a.data );
m2a.multiplyScalar( 2 ); test

	.is( m2a[ 0 ][ 0 ] === 6 ).is( m2a[ 0 ][ 1 ] === 8 )
	.is( m2a[ 1 ][ 0 ] === 6 ).is( m2a[ 1 ][ 1 ] === 12 )
	; //console.log( "*", 2, "=", m2a.data );
var m2c = mat2.add( m2a, m2b ); test
	
	.is( m2a[ 0 ][ 0 ] === 6 ).is( m2a[ 0 ][ 1 ] === 8 )
	.is( m2a[ 1 ][ 0 ] === 6 ).is( m2a[ 1 ][ 1 ] === 12 )

	.is( m2b[ 0 ][ 0 ] === 1 ).is( m2b[ 0 ][ 1 ] === 0 )
	.is( m2b[ 1 ][ 0 ] === 0 ).is( m2b[ 1 ][ 1 ] === 1 )

	.is( m2c[ 0 ][ 0 ] === 7 ).is( m2c[ 0 ][ 1 ] === 8 )
	.is( m2c[ 1 ][ 0 ] === 6 ).is( m2c[ 1 ][ 1 ] === 13 )
	; //console.log( m2a.data, "+", m2b.data, "=", m2c.data );
var m2c = mat2.addScalar( m2a, 1 ); test
	
	.is( m2a[ 0 ][ 0 ] === 6 ).is( m2a[ 0 ][ 1 ] === 8 )
	.is( m2a[ 1 ][ 0 ] === 6 ).is( m2a[ 1 ][ 1 ] === 12 )

	.is( m2c[ 0 ][ 0 ] === 7 ).is( m2c[ 0 ][ 1 ] === 9 )
	.is( m2c[ 1 ][ 0 ] === 7 ).is( m2c[ 1 ][ 1 ] === 13 )
	; //console.log( m2a.data, "+", 1, "=", m2c.data );
var m2c = mat2.multiply( m2a, m2b ); test
	
	.is( m2a[ 0 ][ 0 ] === 6 ).is( m2a[ 0 ][ 1 ] === 8 )
	.is( m2a[ 1 ][ 0 ] === 6 ).is( m2a[ 1 ][ 1 ] === 12 )

	.is( m2b[ 0 ][ 0 ] === 1 ).is( m2b[ 0 ][ 1 ] === 0 )
	.is( m2b[ 1 ][ 0 ] === 0 ).is( m2b[ 1 ][ 1 ] === 1 )

	.is( m2c[ 0 ][ 0 ] === 6 ).is( m2c[ 0 ][ 1 ] === 8 )
	.is( m2c[ 1 ][ 0 ] === 6 ).is( m2c[ 1 ][ 1 ] === 12 )
	; //console.log( m2a.data, "*", m2b.data, "=", m2c.data );
var m2c = mat2.multiplyScalar( m2a, 2 ); test

	.is( m2a[ 0 ][ 0 ] === 6 ).is( m2a[ 0 ][ 1 ] === 8 )
	.is( m2a[ 1 ][ 0 ] === 6 ).is( m2a[ 1 ][ 1 ] === 12 )

	.is( m2c[ 0 ][ 0 ] === 12 ).is( m2c[ 0 ][ 1 ] === 16 )
	.is( m2c[ 1 ][ 0 ] === 12 ).is( m2c[ 1 ][ 1 ] === 24 )
	; //console.log( m2a.data, "*", 2, "=", m2c.data );

var m3a = new mat3( 9, 8, 7, 6, 5, 4, 3, 2, 1 ); var m3b = new mat3; test

	.is( m3a[ 0 ][ 0 ] === 9 ).is( m3a[ 0 ][ 1 ] === 8 ).is( m3a[ 0 ][ 2 ] === 7 )
	.is( m3a[ 1 ][ 0 ] === 6 ).is( m3a[ 1 ][ 1 ] === 5 ).is( m3a[ 1 ][ 2 ] === 4 )
	.is( m3a[ 2 ][ 0 ] === 3 ).is( m3a[ 2 ][ 1 ] === 2 ).is( m3a[ 2 ][ 2 ] === 1 )

	.is( m3b[ 0 ][ 0 ] === 1 ).is( m3b[ 0 ][ 1 ] === 0 ).is( m3b[ 0 ][ 2 ] === 0 )
	.is( m3b[ 1 ][ 0 ] === 0 ).is( m3b[ 1 ][ 1 ] === 1 ).is( m3b[ 1 ][ 2 ] === 0 )
	.is( m3b[ 2 ][ 0 ] === 0 ).is( m3b[ 2 ][ 1 ] === 0 ).is( m3b[ 2 ][ 2 ] === 1 )
	;
m3a.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 ); test

	.is( m3a[ 0 ][ 0 ] === 1 ).is( m3a[ 0 ][ 1 ] === 2 ).is( m3a[ 0 ][ 2 ] === 3 )
	.is( m3a[ 1 ][ 0 ] === 4 ).is( m3a[ 1 ][ 1 ] === 5 ).is( m3a[ 1 ][ 2 ] === 6 )
	.is( m3a[ 2 ][ 0 ] === 7 ).is( m3a[ 2 ][ 1 ] === 8 ).is( m3a[ 2 ][ 2 ] === 9 )
	;
m3a.transpose(); test

	.is( m3a[ 0 ][ 0 ] === 1 ).is( m3a[ 0 ][ 1 ] === 4 ).is( m3a[ 0 ][ 2 ] === 7 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 5 ).is( m3a[ 1 ][ 2 ] === 8 )
	.is( m3a[ 2 ][ 0 ] === 3 ).is( m3a[ 2 ][ 1 ] === 6 ).is( m3a[ 2 ][ 2 ] === 9 )
	;
m3a.add( m3b ); test

	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 4 ).is( m3a[ 0 ][ 2 ] === 7 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 6 ).is( m3a[ 1 ][ 2 ] === 8 )
	.is( m3a[ 2 ][ 0 ] === 3 ).is( m3a[ 2 ][ 1 ] === 6 ).is( m3a[ 2 ][ 2 ] === 10 )

	.is( m3b[ 0 ][ 0 ] === 1 ).is( m3b[ 0 ][ 1 ] === 0 ).is( m3b[ 0 ][ 2 ] === 0 )
	.is( m3b[ 1 ][ 0 ] === 0 ).is( m3b[ 1 ][ 1 ] === 1 ).is( m3b[ 1 ][ 2 ] === 0 )
	.is( m3b[ 2 ][ 0 ] === 0 ).is( m3b[ 2 ][ 1 ] === 0 ).is( m3b[ 2 ][ 2 ] === 1 )
	;
m3b.multiply( m3b ); test

	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 4 ).is( m3a[ 0 ][ 2 ] === 7 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 6 ).is( m3a[ 1 ][ 2 ] === 8 )
	.is( m3a[ 2 ][ 0 ] === 3 ).is( m3a[ 2 ][ 1 ] === 6 ).is( m3a[ 2 ][ 2 ] === 10 )

	.is( m3b[ 0 ][ 0 ] === 1 ).is( m3b[ 0 ][ 1 ] === 0 ).is( m3b[ 0 ][ 2 ] === 0 )
	.is( m3b[ 1 ][ 0 ] === 0 ).is( m3b[ 1 ][ 1 ] === 1 ).is( m3b[ 1 ][ 2 ] === 0 )
	.is( m3b[ 2 ][ 0 ] === 0 ).is( m3b[ 2 ][ 1 ] === 0 ).is( m3b[ 2 ][ 2 ] === 1 )
	;
m3a.addScalar( -1 ); test
	
	.is( m3a[ 0 ][ 0 ] === 1 ).is( m3a[ 0 ][ 1 ] === 3 ).is( m3a[ 0 ][ 2 ] === 6 )
	.is( m3a[ 1 ][ 0 ] === 1 ).is( m3a[ 1 ][ 1 ] === 5 ).is( m3a[ 1 ][ 2 ] === 7 )
	.is( m3a[ 2 ][ 0 ] === 2 ).is( m3a[ 2 ][ 1 ] === 5 ).is( m3a[ 2 ][ 2 ] === 9 )
	;
m3a.multiplyScalar( 2 ); test

	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 6 ).is( m3a[ 0 ][ 2 ] === 12 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 10 ).is( m3a[ 1 ][ 2 ] === 14 )
	.is( m3a[ 2 ][ 0 ] === 4 ).is( m3a[ 2 ][ 1 ] === 10 ).is( m3a[ 2 ][ 2 ] === 18 )
	;
var m3c = mat3.add( m3a, m3b ); test
	
	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 6 ).is( m3a[ 0 ][ 2 ] === 12 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 10 ).is( m3a[ 1 ][ 2 ] === 14 )
	.is( m3a[ 2 ][ 0 ] === 4 ).is( m3a[ 2 ][ 1 ] === 10 ).is( m3a[ 2 ][ 2 ] === 18 )

	.is( m3b[ 0 ][ 0 ] === 1 ).is( m3b[ 0 ][ 1 ] === 0 ).is( m3b[ 0 ][ 2 ] === 0 )
	.is( m3b[ 1 ][ 0 ] === 0 ).is( m3b[ 1 ][ 1 ] === 1 ).is( m3b[ 1 ][ 2 ] === 0 )
	.is( m3b[ 2 ][ 0 ] === 0 ).is( m3b[ 2 ][ 1 ] === 0 ).is( m3b[ 2 ][ 2 ] === 1 )

	.is( m3c[ 0 ][ 0 ] === 3 ).is( m3c[ 0 ][ 1 ] === 6 ).is( m3c[ 0 ][ 2 ] === 12 )
	.is( m3c[ 1 ][ 0 ] === 2 ).is( m3c[ 1 ][ 1 ] === 11 ).is( m3c[ 1 ][ 2 ] === 14 )
	.is( m3c[ 2 ][ 0 ] === 4 ).is( m3c[ 2 ][ 1 ] === 10 ).is( m3c[ 2 ][ 2 ] === 19 )
	; //console.log( m3a.data, "+", m3b.data, "=", m3c.data );
var m3c = mat3.addScalar( m3a, -2 ); test
	
	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 6 ).is( m3a[ 0 ][ 2 ] === 12 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 10 ).is( m3a[ 1 ][ 2 ] === 14 )
	.is( m3a[ 2 ][ 0 ] === 4 ).is( m3a[ 2 ][ 1 ] === 10 ).is( m3a[ 2 ][ 2 ] === 18 )

	.is( m3c[ 0 ][ 0 ] === 0 ).is( m3c[ 0 ][ 1 ] === 4 ).is( m3c[ 0 ][ 2 ] === 10 )
	.is( m3c[ 1 ][ 0 ] === 0 ).is( m3c[ 1 ][ 1 ] === 8 ).is( m3c[ 1 ][ 2 ] === 12 )
	.is( m3c[ 2 ][ 0 ] === 2 ).is( m3c[ 2 ][ 1 ] === 8 ).is( m3c[ 2 ][ 2 ] === 16 )
	; //console.log ( m3a.data, "+ -2 =", m3c.data );
var m3c = mat3.multiply( m3a, m3b ); test
	
	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 6 ).is( m3a[ 0 ][ 2 ] === 12 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 10 ).is( m3a[ 1 ][ 2 ] === 14 )
	.is( m3a[ 2 ][ 0 ] === 4 ).is( m3a[ 2 ][ 1 ] === 10 ).is( m3a[ 2 ][ 2 ] === 18 )

	.is( m3b[ 0 ][ 0 ] === 1 ).is( m3b[ 0 ][ 1 ] === 0 ).is( m3b[ 0 ][ 2 ] === 0 )
	.is( m3b[ 1 ][ 0 ] === 0 ).is( m3b[ 1 ][ 1 ] === 1 ).is( m3b[ 1 ][ 2 ] === 0 )
	.is( m3b[ 2 ][ 0 ] === 0 ).is( m3b[ 2 ][ 1 ] === 0 ).is( m3b[ 2 ][ 2 ] === 1 )

	.is( m3c[ 0 ][ 0 ] === 2 ).is( m3c[ 0 ][ 1 ] === 6 ).is( m3c[ 0 ][ 2 ] === 12 )
	.is( m3c[ 1 ][ 0 ] === 2 ).is( m3c[ 1 ][ 1 ] === 10 ).is( m3c[ 1 ][ 2 ] === 14 )
	.is( m3c[ 2 ][ 0 ] === 4 ).is( m3c[ 2 ][ 1 ] === 10 ).is( m3c[ 2 ][ 2 ] === 18 )
	;
var m3c = mat3.multiplyScalar( m3a, .5 ); test
	
	.is( m3a[ 0 ][ 0 ] === 2 ).is( m3a[ 0 ][ 1 ] === 6 ).is( m3a[ 0 ][ 2 ] === 12 )
	.is( m3a[ 1 ][ 0 ] === 2 ).is( m3a[ 1 ][ 1 ] === 10 ).is( m3a[ 1 ][ 2 ] === 14 )
	.is( m3a[ 2 ][ 0 ] === 4 ).is( m3a[ 2 ][ 1 ] === 10 ).is( m3a[ 2 ][ 2 ] === 18 )

	.is( m3c[ 0 ][ 0 ] === 1 ).is( m3c[ 0 ][ 1 ] === 3 ).is( m3c[ 0 ][ 2 ] === 6 )
	.is( m3c[ 1 ][ 0 ] === 1 ).is( m3c[ 1 ][ 1 ] === 5 ).is( m3c[ 1 ][ 2 ] === 7 )
	.is( m3c[ 2 ][ 0 ] === 2 ).is( m3c[ 2 ][ 1 ] === 5 ).is( m3c[ 2 ][ 2 ] === 9 )
	;

var m4a = new mat4( 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ); var m4b = new mat4; test
	.is( m4a[ 0 ][ 0 ] === 16 ).is( m4a[ 0 ][ 1 ] === 15 ).is( m4a[ 0 ][ 2 ] === 14 ).is( m4a[ 0 ][ 3 ] === 13 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 11 ).is( m4a[ 1 ][ 2 ] === 10 ).is( m4a[ 1 ][ 3 ] ===  9 )
	.is( m4a[ 2 ][ 0 ] ===  8 ).is( m4a[ 2 ][ 1 ] ===  7 ).is( m4a[ 2 ][ 2 ] ===  6 ).is( m4a[ 2 ][ 3 ] ===  5 )
	.is( m4a[ 3 ][ 0 ] ===  4 ).is( m4a[ 3 ][ 1 ] ===  3 ).is( m4a[ 3 ][ 2 ] ===  2 ).is( m4a[ 3 ][ 3 ] ===  1 )

	.is( m4b[ 0 ][ 0 ] === 1 ).is( m4b[ 0 ][ 1 ] === 0 ).is( m4b[ 0 ][ 2 ] === 0 ).is( m4b[ 0 ][ 3 ] === 0 )
	.is( m4b[ 1 ][ 0 ] === 0 ).is( m4b[ 1 ][ 1 ] === 1 ).is( m4b[ 1 ][ 2 ] === 0 ).is( m4b[ 1 ][ 3 ] === 0 )
	.is( m4b[ 2 ][ 0 ] === 0 ).is( m4b[ 2 ][ 1 ] === 0 ).is( m4b[ 2 ][ 2 ] === 1 ).is( m4b[ 2 ][ 3 ] === 0 )
	.is( m4b[ 3 ][ 0 ] === 0 ).is( m4b[ 3 ][ 1 ] === 0 ).is( m4b[ 3 ][ 2 ] === 0 ).is( m4b[ 3 ][ 3 ] === 1 )
	;
m4a.set( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ); test
	.is( m4a[ 0 ][ 0 ] ===  1 ).is( m4a[ 0 ][ 1 ] ===  2 ).is( m4a[ 0 ][ 2 ] ===  3 ).is( m4a[ 0 ][ 3 ] ===  4 )
	.is( m4a[ 1 ][ 0 ] ===  5 ).is( m4a[ 1 ][ 1 ] ===  6 ).is( m4a[ 1 ][ 2 ] ===  7 ).is( m4a[ 1 ][ 3 ] ===  8 )
	.is( m4a[ 2 ][ 0 ] ===  9 ).is( m4a[ 2 ][ 1 ] === 10 ).is( m4a[ 2 ][ 2 ] === 11 ).is( m4a[ 2 ][ 3 ] === 12 )
	.is( m4a[ 3 ][ 0 ] === 13 ).is( m4a[ 3 ][ 1 ] === 14 ).is( m4a[ 3 ][ 2 ] === 15 ).is( m4a[ 3 ][ 3 ] === 16 )
	;
m4a.add( m4b ); test	
	.is( m4a[ 0 ][ 0 ] ===  2 ).is( m4a[ 0 ][ 1 ] ===  2 ).is( m4a[ 0 ][ 2 ] ===  3 ).is( m4a[ 0 ][ 3 ] ===  4 )
	.is( m4a[ 1 ][ 0 ] ===  5 ).is( m4a[ 1 ][ 1 ] ===  7 ).is( m4a[ 1 ][ 2 ] ===  7 ).is( m4a[ 1 ][ 3 ] ===  8 )
	.is( m4a[ 2 ][ 0 ] ===  9 ).is( m4a[ 2 ][ 1 ] === 10 ).is( m4a[ 2 ][ 2 ] === 12 ).is( m4a[ 2 ][ 3 ] === 12 )
	.is( m4a[ 3 ][ 0 ] === 13 ).is( m4a[ 3 ][ 1 ] === 14 ).is( m4a[ 3 ][ 2 ] === 15 ).is( m4a[ 3 ][ 3 ] === 17 )

	.is( m4b[ 0 ][ 0 ] === 1 ).is( m4b[ 0 ][ 1 ] === 0 ).is( m4b[ 0 ][ 2 ] === 0 ).is( m4b[ 0 ][ 3 ] === 0 )
	.is( m4b[ 1 ][ 0 ] === 0 ).is( m4b[ 1 ][ 1 ] === 1 ).is( m4b[ 1 ][ 2 ] === 0 ).is( m4b[ 1 ][ 3 ] === 0 )
	.is( m4b[ 2 ][ 0 ] === 0 ).is( m4b[ 2 ][ 1 ] === 0 ).is( m4b[ 2 ][ 2 ] === 1 ).is( m4b[ 2 ][ 3 ] === 0 )
	.is( m4b[ 3 ][ 0 ] === 0 ).is( m4b[ 3 ][ 1 ] === 0 ).is( m4b[ 3 ][ 2 ] === 0 ).is( m4b[ 3 ][ 3 ] === 1 )
	;
m4a.multiply( m4b ); test	
	.is( m4a[ 0 ][ 0 ] ===  2 ).is( m4a[ 0 ][ 1 ] ===  2 ).is( m4a[ 0 ][ 2 ] ===  3 ).is( m4a[ 0 ][ 3 ] ===  4 )
	.is( m4a[ 1 ][ 0 ] ===  5 ).is( m4a[ 1 ][ 1 ] ===  7 ).is( m4a[ 1 ][ 2 ] ===  7 ).is( m4a[ 1 ][ 3 ] ===  8 )
	.is( m4a[ 2 ][ 0 ] ===  9 ).is( m4a[ 2 ][ 1 ] === 10 ).is( m4a[ 2 ][ 2 ] === 12 ).is( m4a[ 2 ][ 3 ] === 12 )
	.is( m4a[ 3 ][ 0 ] === 13 ).is( m4a[ 3 ][ 1 ] === 14 ).is( m4a[ 3 ][ 2 ] === 15 ).is( m4a[ 3 ][ 3 ] === 17 )

	.is( m4b[ 0 ][ 0 ] === 1 ).is( m4b[ 0 ][ 1 ] === 0 ).is( m4b[ 0 ][ 2 ] === 0 ).is( m4b[ 0 ][ 3 ] === 0 )
	.is( m4b[ 1 ][ 0 ] === 0 ).is( m4b[ 1 ][ 1 ] === 1 ).is( m4b[ 1 ][ 2 ] === 0 ).is( m4b[ 1 ][ 3 ] === 0 )
	.is( m4b[ 2 ][ 0 ] === 0 ).is( m4b[ 2 ][ 1 ] === 0 ).is( m4b[ 2 ][ 2 ] === 1 ).is( m4b[ 2 ][ 3 ] === 0 )
	.is( m4b[ 3 ][ 0 ] === 0 ).is( m4b[ 3 ][ 1 ] === 0 ).is( m4b[ 3 ][ 2 ] === 0 ).is( m4b[ 3 ][ 3 ] === 1 )
	;
m4a.addScalar( 1 ); test	
	.is( m4a[ 0 ][ 0 ] ===  3 ).is( m4a[ 0 ][ 1 ] ===  3 ).is( m4a[ 0 ][ 2 ] ===  4 ).is( m4a[ 0 ][ 3 ] ===  5 )
	.is( m4a[ 1 ][ 0 ] ===  6 ).is( m4a[ 1 ][ 1 ] ===  8 ).is( m4a[ 1 ][ 2 ] ===  8 ).is( m4a[ 1 ][ 3 ] ===  9 )
	.is( m4a[ 2 ][ 0 ] === 10 ).is( m4a[ 2 ][ 1 ] === 11 ).is( m4a[ 2 ][ 2 ] === 13 ).is( m4a[ 2 ][ 3 ] === 13 )
	.is( m4a[ 3 ][ 0 ] === 14 ).is( m4a[ 3 ][ 1 ] === 15 ).is( m4a[ 3 ][ 2 ] === 16 ).is( m4a[ 3 ][ 3 ] === 18 )
	;
m4a.multiplyScalar( 2 ); test
	.is( m4a[ 0 ][ 0 ] ===  6 ).is( m4a[ 0 ][ 1 ] ===  6 ).is( m4a[ 0 ][ 2 ] ===  8 ).is( m4a[ 0 ][ 3 ] === 10 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 16 ).is( m4a[ 1 ][ 2 ] === 16 ).is( m4a[ 1 ][ 3 ] === 18 )
	.is( m4a[ 2 ][ 0 ] === 20 ).is( m4a[ 2 ][ 1 ] === 22 ).is( m4a[ 2 ][ 2 ] === 26 ).is( m4a[ 2 ][ 3 ] === 26 )
	.is( m4a[ 3 ][ 0 ] === 28 ).is( m4a[ 3 ][ 1 ] === 30 ).is( m4a[ 3 ][ 2 ] === 32 ).is( m4a[ 3 ][ 3 ] === 36 )
	;
var m4c = mat4.add( m4a, m4b ); test
	.is( m4a[ 0 ][ 0 ] ===  6 ).is( m4a[ 0 ][ 1 ] ===  6 ).is( m4a[ 0 ][ 2 ] ===  8 ).is( m4a[ 0 ][ 3 ] === 10 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 16 ).is( m4a[ 1 ][ 2 ] === 16 ).is( m4a[ 1 ][ 3 ] === 18 )
	.is( m4a[ 2 ][ 0 ] === 20 ).is( m4a[ 2 ][ 1 ] === 22 ).is( m4a[ 2 ][ 2 ] === 26 ).is( m4a[ 2 ][ 3 ] === 26 )
	.is( m4a[ 3 ][ 0 ] === 28 ).is( m4a[ 3 ][ 1 ] === 30 ).is( m4a[ 3 ][ 2 ] === 32 ).is( m4a[ 3 ][ 3 ] === 36 )

	.is( m4b[ 0 ][ 0 ] === 1 ).is( m4b[ 0 ][ 1 ] === 0 ).is( m4b[ 0 ][ 2 ] === 0 ).is( m4b[ 0 ][ 3 ] === 0 )
	.is( m4b[ 1 ][ 0 ] === 0 ).is( m4b[ 1 ][ 1 ] === 1 ).is( m4b[ 1 ][ 2 ] === 0 ).is( m4b[ 1 ][ 3 ] === 0 )
	.is( m4b[ 2 ][ 0 ] === 0 ).is( m4b[ 2 ][ 1 ] === 0 ).is( m4b[ 2 ][ 2 ] === 1 ).is( m4b[ 2 ][ 3 ] === 0 )
	.is( m4b[ 3 ][ 0 ] === 0 ).is( m4b[ 3 ][ 1 ] === 0 ).is( m4b[ 3 ][ 2 ] === 0 ).is( m4b[ 3 ][ 3 ] === 1 )

	.is( m4c[ 0 ][ 0 ] ===  7 ).is( m4c[ 0 ][ 1 ] ===  6 ).is( m4c[ 0 ][ 2 ] ===  8 ).is( m4c[ 0 ][ 3 ] === 10 )
	.is( m4c[ 1 ][ 0 ] === 12 ).is( m4c[ 1 ][ 1 ] === 17 ).is( m4c[ 1 ][ 2 ] === 16 ).is( m4c[ 1 ][ 3 ] === 18 )
	.is( m4c[ 2 ][ 0 ] === 20 ).is( m4c[ 2 ][ 1 ] === 22 ).is( m4c[ 2 ][ 2 ] === 27 ).is( m4c[ 2 ][ 3 ] === 26 )
	.is( m4c[ 3 ][ 0 ] === 28 ).is( m4c[ 3 ][ 1 ] === 30 ).is( m4c[ 3 ][ 2 ] === 32 ).is( m4c[ 3 ][ 3 ] === 37 )
	;
var m4c = mat4.addScalar( m4a, 1 ); test
	.is( m4a[ 0 ][ 0 ] ===  6 ).is( m4a[ 0 ][ 1 ] ===  6 ).is( m4a[ 0 ][ 2 ] ===  8 ).is( m4a[ 0 ][ 3 ] === 10 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 16 ).is( m4a[ 1 ][ 2 ] === 16 ).is( m4a[ 1 ][ 3 ] === 18 )
	.is( m4a[ 2 ][ 0 ] === 20 ).is( m4a[ 2 ][ 1 ] === 22 ).is( m4a[ 2 ][ 2 ] === 26 ).is( m4a[ 2 ][ 3 ] === 26 )
	.is( m4a[ 3 ][ 0 ] === 28 ).is( m4a[ 3 ][ 1 ] === 30 ).is( m4a[ 3 ][ 2 ] === 32 ).is( m4a[ 3 ][ 3 ] === 36 )

	.is( m4c[ 0 ][ 0 ] ===  7 ).is( m4c[ 0 ][ 1 ] ===  7 ).is( m4c[ 0 ][ 2 ] ===  9 ).is( m4c[ 0 ][ 3 ] === 11 )
	.is( m4c[ 1 ][ 0 ] === 13 ).is( m4c[ 1 ][ 1 ] === 17 ).is( m4c[ 1 ][ 2 ] === 17 ).is( m4c[ 1 ][ 3 ] === 19 )
	.is( m4c[ 2 ][ 0 ] === 21 ).is( m4c[ 2 ][ 1 ] === 23 ).is( m4c[ 2 ][ 2 ] === 27 ).is( m4c[ 2 ][ 3 ] === 27 )
	.is( m4c[ 3 ][ 0 ] === 29 ).is( m4c[ 3 ][ 1 ] === 31 ).is( m4c[ 3 ][ 2 ] === 33 ).is( m4c[ 3 ][ 3 ] === 37 )
	;
var m4c = mat4.multiply( m4a, m4b ); test
	.is( m4a[ 0 ][ 0 ] ===  6 ).is( m4a[ 0 ][ 1 ] ===  6 ).is( m4a[ 0 ][ 2 ] ===  8 ).is( m4a[ 0 ][ 3 ] === 10 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 16 ).is( m4a[ 1 ][ 2 ] === 16 ).is( m4a[ 1 ][ 3 ] === 18 )
	.is( m4a[ 2 ][ 0 ] === 20 ).is( m4a[ 2 ][ 1 ] === 22 ).is( m4a[ 2 ][ 2 ] === 26 ).is( m4a[ 2 ][ 3 ] === 26 )
	.is( m4a[ 3 ][ 0 ] === 28 ).is( m4a[ 3 ][ 1 ] === 30 ).is( m4a[ 3 ][ 2 ] === 32 ).is( m4a[ 3 ][ 3 ] === 36 )

	.is( m4b[ 0 ][ 0 ] === 1 ).is( m4b[ 0 ][ 1 ] === 0 ).is( m4b[ 0 ][ 2 ] === 0 ).is( m4b[ 0 ][ 3 ] === 0 )
	.is( m4b[ 1 ][ 0 ] === 0 ).is( m4b[ 1 ][ 1 ] === 1 ).is( m4b[ 1 ][ 2 ] === 0 ).is( m4b[ 1 ][ 3 ] === 0 )
	.is( m4b[ 2 ][ 0 ] === 0 ).is( m4b[ 2 ][ 1 ] === 0 ).is( m4b[ 2 ][ 2 ] === 1 ).is( m4b[ 2 ][ 3 ] === 0 )
	.is( m4b[ 3 ][ 0 ] === 0 ).is( m4b[ 3 ][ 1 ] === 0 ).is( m4b[ 3 ][ 2 ] === 0 ).is( m4b[ 3 ][ 3 ] === 1 )

	.is( m4c[ 0 ][ 0 ] ===  6 ).is( m4c[ 0 ][ 1 ] ===  6 ).is( m4c[ 0 ][ 2 ] ===  8 ).is( m4c[ 0 ][ 3 ] === 10 )
	.is( m4c[ 1 ][ 0 ] === 12 ).is( m4c[ 1 ][ 1 ] === 16 ).is( m4c[ 1 ][ 2 ] === 16 ).is( m4c[ 1 ][ 3 ] === 18 )
	.is( m4c[ 2 ][ 0 ] === 20 ).is( m4c[ 2 ][ 1 ] === 22 ).is( m4c[ 2 ][ 2 ] === 26 ).is( m4c[ 2 ][ 3 ] === 26 )
	.is( m4c[ 3 ][ 0 ] === 28 ).is( m4c[ 3 ][ 1 ] === 30 ).is( m4c[ 3 ][ 2 ] === 32 ).is( m4c[ 3 ][ 3 ] === 36 )
	;	
var m4c = mat4.multiplyScalar( m4a, 2 ); test
	.is( m4a[ 0 ][ 0 ] ===  6 ).is( m4a[ 0 ][ 1 ] ===  6 ).is( m4a[ 0 ][ 2 ] ===  8 ).is( m4a[ 0 ][ 3 ] === 10 )
	.is( m4a[ 1 ][ 0 ] === 12 ).is( m4a[ 1 ][ 1 ] === 16 ).is( m4a[ 1 ][ 2 ] === 16 ).is( m4a[ 1 ][ 3 ] === 18 )
	.is( m4a[ 2 ][ 0 ] === 20 ).is( m4a[ 2 ][ 1 ] === 22 ).is( m4a[ 2 ][ 2 ] === 26 ).is( m4a[ 2 ][ 3 ] === 26 )
	.is( m4a[ 3 ][ 0 ] === 28 ).is( m4a[ 3 ][ 1 ] === 30 ).is( m4a[ 3 ][ 2 ] === 32 ).is( m4a[ 3 ][ 3 ] === 36 )

	.is( m4c[ 0 ][ 0 ] === 12 ).is( m4c[ 0 ][ 1 ] === 12 ).is( m4c[ 0 ][ 2 ] === 16 ).is( m4c[ 0 ][ 3 ] === 20 )
	.is( m4c[ 1 ][ 0 ] === 24 ).is( m4c[ 1 ][ 1 ] === 32 ).is( m4c[ 1 ][ 2 ] === 32 ).is( m4c[ 1 ][ 3 ] === 36 )
	.is( m4c[ 2 ][ 0 ] === 40 ).is( m4c[ 2 ][ 1 ] === 44 ).is( m4c[ 2 ][ 2 ] === 52 ).is( m4c[ 2 ][ 3 ] === 52 )
	.is( m4c[ 3 ][ 0 ] === 56 ).is( m4c[ 3 ][ 1 ] === 60 ).is( m4c[ 3 ][ 2 ] === 64 ).is( m4c[ 3 ][ 3 ] === 72 )
	;
m4a.invert(); test
	.is( m4a[ 0 ][ 0 ] === -0.15853658318519592  ).is( m4a[ 0 ][ 1 ] === -0.353658527135849    ).is( m4a[ 0 ][ 2 ] === -0.04878048598766327 ).is( m4a[ 0 ][ 3 ] === 0.25609755516052246 )
	.is( m4a[ 1 ][ 0 ] === -0.31707316637039185  ).is( m4a[ 1 ][ 1 ] ===  0.2926829159259796   ).is( m4a[ 1 ][ 2 ] === -0.09756097197532654 ).is( m4a[ 1 ][ 3 ] === 0.012195121496915817 )
	.is( m4a[ 2 ][ 0 ] ===  0.024390242993831635 ).is( m4a[ 2 ][ 1 ] === -0.060975611209869385 ).is( m4a[ 2 ][ 2 ] ===  0.353658527135849   ).is( m4a[ 2 ][ 3 ] === -0.23170731961727142 )
	.is( m4a[ 3 ][ 0 ] ===  0.3658536672592163   ).is( m4a[ 3 ][ 1 ] ===  0.08536585420370102  ).is( m4a[ 3 ][ 2 ] === -0.19512194395065308 ).is( m4a[ 3 ][ 3 ] === 0.024390242993831635 )
	; // console.log( m4a.data );
m4a.Perspective( 1, 90, 1, 10 ); test
	.is( m4a[ 0 ][ 0 ] === 0.6173696517944336   ).is( m4a[ 0 ][ 1 ] === 0                    ).is( m4a[ 0 ][ 2 ] ===  0                  ).is( m4a[ 0 ][ 3 ] ===  0 )
	.is( m4a[ 1 ][ 0 ] === 0                    ).is( m4a[ 1 ][ 1 ] === 0.6173696517944336   ).is( m4a[ 1 ][ 2 ] ===  0                  ).is( m4a[ 1 ][ 3 ] ===  0 )
	.is( m4a[ 2 ][ 0 ] === 0                    ).is( m4a[ 2 ][ 1 ] === 0                    ).is( m4a[ 2 ][ 2 ] === -1.2222222089767456 ).is( m4a[ 2 ][ 3 ] === -1 )
	.is( m4a[ 3 ][ 0 ] === 0                    ).is( m4a[ 3 ][ 1 ] === 0                    ).is( m4a[ 3 ][ 2 ] === -2.222222328186035  ).is( m4a[ 3 ][ 3 ] ===  0 )
	; //console.log( m4a.data );
m4a.Orthographic( 0, 100, 0, 100, 1, 10 ); test
	.is( m4a[ 0 ][ 0 ] === 0.019999999552965164 ).is( m4a[ 0 ][ 1 ] === 0                    ).is( m4a[ 0 ][ 2 ] ===  0                  ).is( m4a[ 0 ][ 3 ] ===  0 )
	.is( m4a[ 1 ][ 0 ] === 0                    ).is( m4a[ 1 ][ 1 ] === 0.019999999552965164 ).is( m4a[ 1 ][ 2 ] ===  0                  ).is( m4a[ 1 ][ 3 ] ===  0 )
	.is( m4a[ 2 ][ 0 ] === 0                    ).is( m4a[ 2 ][ 1 ] === 0                    ).is( m4a[ 2 ][ 2 ] === -0.2222222238779068 ).is( m4a[ 2 ][ 3 ] ===  0 )
	.is( m4a[ 3 ][ 0 ] === -1                   ).is( m4a[ 3 ][ 1 ] === -1                   ).is( m4a[ 3 ][ 2 ] === -1.2222222089767456 ).is( m4a[ 3 ][ 3 ] ===  1 )
	; //console.log( m4a.data );
m4a.Identity().rotate( 1, 1, 1, 1 ); test
	.is( m4a[ 0 ][ 0 ] ===  0.6935348510742188  ).is( m4a[ 0 ][ 1 ] ===  0.6390560865402222  ).is( m4a[ 0 ][ 2 ] === -0.3325909376144409 ).is( m4a[ 0 ][ 3 ] ===  0 )
	.is( m4a[ 1 ][ 0 ] === -0.3325909376144409  ).is( m4a[ 1 ][ 1 ] ===  0.6935348510742188  ).is( m4a[ 1 ][ 2 ] ===  0.6390560865402222 ).is( m4a[ 1 ][ 3 ] ===  0 )
	.is( m4a[ 2 ][ 0 ] ===  0.6390560865402222  ).is( m4a[ 2 ][ 1 ] === -0.3325909376144409  ).is( m4a[ 2 ][ 2 ] ===  0.6935348510742188 ).is( m4a[ 2 ][ 3 ] ===  0 )
	.is( m4a[ 3 ][ 0 ] ===  0                   ).is( m4a[ 3 ][ 1 ] ===  0                   ).is( m4a[ 3 ][ 2 ] ===  0                  ).is( m4a[ 3 ][ 3 ] ===  1 )
	; //console.log( m4a.data );
m4a.Identity().translate( 1, 1, 1 ); test
	.is( m4a[ 0 ][ 0 ] ===  1					).is( m4a[ 0 ][ 1 ] ===  0				     ).is( m4a[ 0 ][ 2 ] ===  0					 ).is( m4a[ 0 ][ 3 ] ===  0 )
	.is( m4a[ 1 ][ 0 ] ===  0  					).is( m4a[ 1 ][ 1 ] ===  1					 ).is( m4a[ 1 ][ 2 ] ===  0					 ).is( m4a[ 1 ][ 3 ] ===  0 )
	.is( m4a[ 2 ][ 0 ] ===  0				  	).is( m4a[ 2 ][ 1 ] ===  0					 ).is( m4a[ 2 ][ 2 ] ===  1					 ).is( m4a[ 2 ][ 3 ] ===  0 )
	.is( m4a[ 3 ][ 0 ] ===  1                   ).is( m4a[ 3 ][ 1 ] ===  1                   ).is( m4a[ 3 ][ 2 ] ===  1                  ).is( m4a[ 3 ][ 3 ] ===  1 )
	;
m4a.Identity().scale( 1, 2, 3 ); test
	.is( m4a[ 0 ][ 0 ] ===  1					).is( m4a[ 0 ][ 1 ] ===  0				     ).is( m4a[ 0 ][ 2 ] ===  0					 ).is( m4a[ 0 ][ 3 ] ===  0 )
	.is( m4a[ 1 ][ 0 ] ===  0  					).is( m4a[ 1 ][ 1 ] ===  2					 ).is( m4a[ 1 ][ 2 ] ===  0					 ).is( m4a[ 1 ][ 3 ] ===  0 )
	.is( m4a[ 2 ][ 0 ] ===  0				  	).is( m4a[ 2 ][ 1 ] ===  0					 ).is( m4a[ 2 ][ 2 ] ===  3					 ).is( m4a[ 2 ][ 3 ] ===  0 )
	.is( m4a[ 3 ][ 0 ] ===  0                   ).is( m4a[ 3 ][ 1 ] ===  0                   ).is( m4a[ 3 ][ 2 ] ===  0                  ).is( m4a[ 3 ][ 3 ] ===  1 )
	;

*/