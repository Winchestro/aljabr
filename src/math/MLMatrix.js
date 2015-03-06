import { vec3, vec4, quat4 } from "./MLVector";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";

export class mat4 { 
	constructor ( ...data ) {
		const width = 4;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data : new Float32Array( buffer ),
			0 : new Float32Array( buffer, 0 * elementSize * width, width ),
			1 : new Float32Array( buffer, 1 * elementSize * width, width ),
			2 : new Float32Array( buffer, 2 * elementSize * width, width ),
			3 : new Float32Array( buffer, 3 * elementSize * width, width )
		}, E );

		data.length ? this.data.set( data ) : this.identity();
	}
	static clone ( m ) {
		return new mat4().set( m.data ); 
	}
	static multiply ( a, b ) {
		return new mat4().multiply( a, b );
	}
	static multiplyScalar ( m, s ) {
		return new mat4.clone( m ).multiplyScalar( s );
	}
	static lookAt ( m, eye, target, up ) {
		return new mat4.clone( m ).lookAt( eye, target, up );
	}
	static frustum ( left, right, bottom, top, near, far ) {
		return new mat4().frustum( ...arguments );
	}
	static perspective ( aspect, fov, near, far ) {
		return new mat4().perspective( ...arguments );
	}
	static translation ( x = 0, y = 0, z = 0 ) {
		return new mat4().translation( x, y, z );
	}
	static scale  ( x = 1, y = x, z = x ) {
		return new mat4().scale( x, y, z );
	}
	static rotationX ( a = 0 ) {
		return new mat4().rotationX( a );
	}
	static rotationY ( a = 0 ) {
		return new mat4().rotationY( a );
	}
	static rotationZ ( a = 0 ) {
		return new mat4().rotationZ( a );
	}
	static rotationQuat4 ( quat ) {
		return new mat4().rotationQuat4( quat );
	}
}
Properties( mat4.prototype, {
	length : 4,
	set ( m ) {
		this.data.set( m );
		return this;
	},
	transpose ( a = CACHE_MAT4.set(this) ) {
		let m = this;
		
		m[ 0 ][ 0 ] = a[ 0 ][ 0 ];	m[ 0 ][ 1 ] = a[ 1 ][ 0 ];	m[ 0 ][ 2 ] = a[ 2 ][ 0 ];	m[ 0 ][ 3 ] = a[ 3 ][ 0 ];
		m[ 1 ][ 0 ] = a[ 0 ][ 1 ];	m[ 1 ][ 1 ] = a[ 1 ][ 1 ];	m[ 1 ][ 2 ] = a[ 2 ][ 1 ];	m[ 1 ][ 3 ] = a[ 3 ][ 1 ];
		m[ 2 ][ 0 ] = a[ 0 ][ 2 ];	m[ 2 ][ 1 ] = a[ 1 ][ 2 ];	m[ 2 ][ 2 ] = a[ 2 ][ 2 ];	m[ 2 ][ 3 ] = a[ 3 ][ 2 ];
		m[ 3 ][ 0 ] = a[ 0 ][ 3 ];	m[ 3 ][ 1 ] = a[ 1 ][ 3 ];	m[ 3 ][ 2 ] = a[ 2 ][ 3 ];	m[ 3 ][ 3 ] = a[ 3 ][ 3 ];
		
		return this;
	},
	identity ( ) {
		let m = this;

		m[ 0 ][ 0 ] = 1;	m[ 0 ][ 1 ] = 0;	m[ 0 ][ 2 ] = 0;	m[ 0 ][ 3 ] = 0;
		m[ 1 ][ 0 ] = 0;	m[ 1 ][ 1 ] = 1;	m[ 1 ][ 2 ] = 0;	m[ 1 ][ 3 ] = 0;
		m[ 2 ][ 0 ] = 0;	m[ 2 ][ 1 ] = 0;	m[ 2 ][ 2 ] = 1;	m[ 2 ][ 3 ] = 0;
		m[ 3 ][ 0 ] = 0;	m[ 3 ][ 1 ] = 0;	m[ 3 ][ 2 ] = 0;	m[ 3 ][ 3 ] = 1;
			
		return this;
	},
	inverse ( ) {
		let m = this;
		let a = CACHE_MAT4.transpose(this);
			
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
					+ a[ 0 ][ 1 ] * a[ 2 ][ 0 ] * a[ 3 ][ 1 ]
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
					+ a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 0 ] * a[ 1 ][ 2 ] * a[ 2 ][ 1 ]
					- a[ 0 ][ 1 ] * a[ 1 ][ 0 ] * a[ 2 ][ 2 ]
					+ a[ 0 ][ 0 ] * a[ 1 ][ 1 ] * a[ 2 ][ 2 ];

		
		let determinant = a[ 0 ][ 0 ] * m[ 0 ][ 0 ]
						+ a[ 1 ][ 0 ] * m[ 1 ][ 0 ]
						+ a[ 2 ][ 0 ] * m[ 2 ][ 0 ]
						+ a[ 3 ][ 0 ] * m[ 3 ][ 0 ];
		
		if( determinant === 0 ) return this.identity();
		else return this.multiplyScalar( 1 / determinant);
	},
	multiplyScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] *= s; m[ 0 ][ 1 ] *= s; m[ 0 ][ 2 ] *= s; m[ 0 ][ 3 ] *= s;
		m[ 1 ][ 0 ] *= s; m[ 1 ][ 1 ] *= s; m[ 1 ][ 2 ] *= s; m[ 1 ][ 3 ] *= s;
		m[ 2 ][ 0 ] *= s; m[ 2 ][ 1 ] *= s; m[ 2 ][ 2 ] *= s; m[ 2 ][ 3 ] *= s;
		m[ 3 ][ 0 ] *= s; m[ 3 ][ 1 ] *= s; m[ 3 ][ 2 ] *= s; m[ 3 ][ 3 ] *= s;
		
		return this;
	},
	addScalar ( s ) {
		let m = this;

		m[ 0 ][ 0 ] += s; m[ 0 ][ 1 ] += s; m[ 0 ][ 2 ] += s; m[ 0 ][ 3 ] += s;
		m[ 1 ][ 0 ] += s; m[ 1 ][ 1 ] += s; m[ 1 ][ 2 ] += s; m[ 1 ][ 3 ] += s;
		m[ 2 ][ 0 ] += s; m[ 2 ][ 1 ] += s; m[ 2 ][ 2 ] += s; m[ 2 ][ 3 ] += s;
		m[ 3 ][ 0 ] += s; m[ 3 ][ 1 ] += s; m[ 3 ][ 2 ] += s; m[ 3 ][ 3 ] += s;
		
		return this;
	},
	multiply ( a, b = CACHE_MAT4.set(this) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 0 ]
					+ a[ 0 ][ 3 ] * b[ 3 ][ 0 ];

		m[ 0 ][ 1 ] = a[ 0 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 1 ]
					+ a[ 0 ][ 3 ] * b[ 3 ][ 1 ];

		m[ 0 ][ 2 ] = a[ 0 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 2 ]
					+ a[ 0 ][ 3 ] * b[ 3 ][ 2 ];

		m[ 0 ][ 3 ] = a[ 0 ][ 0 ] * b[ 0 ][ 3 ]
					+ a[ 0 ][ 1 ] * b[ 1 ][ 3 ]
					+ a[ 0 ][ 2 ] * b[ 2 ][ 3 ]
					+ a[ 0 ][ 3 ] * b[ 3 ][ 3 ];

		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 0 ]
					+ a[ 1 ][ 3 ] * b[ 3 ][ 0 ];

		m[ 1 ][ 1 ] = a[ 1 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 1 ]
					+ a[ 1 ][ 3 ] * b[ 3 ][ 1 ];

		m[ 1 ][ 2 ] = a[ 1 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 2 ]
					+ a[ 1 ][ 3 ] * b[ 3 ][ 2 ];

		m[ 1 ][ 3 ] = a[ 1 ][ 0 ] * b[ 0 ][ 3 ]
					+ a[ 1 ][ 1 ] * b[ 1 ][ 3 ]
					+ a[ 1 ][ 2 ] * b[ 2 ][ 3 ]
					+ a[ 1 ][ 3 ] * b[ 3 ][ 3 ];

		m[ 2 ][ 0 ] = a[ 2 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 0 ]
					+ a[ 2 ][ 3 ] * b[ 3 ][ 0 ];

		m[ 2 ][ 1 ] = a[ 2 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 1 ]
					+ a[ 2 ][ 3 ] * b[ 3 ][ 1 ];

		m[ 2 ][ 2 ] = a[ 2 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 2 ]
					+ a[ 2 ][ 3 ] * b[ 3 ][ 2 ];

		m[ 2 ][ 3 ] = a[ 2 ][ 0 ] * b[ 0 ][ 3 ]
					+ a[ 2 ][ 1 ] * b[ 1 ][ 3 ]
					+ a[ 2 ][ 2 ] * b[ 2 ][ 3 ]
					+ a[ 2 ][ 3 ] * b[ 3 ][ 3 ];

		m[ 3 ][ 0 ] = a[ 3 ][ 0 ] * b[ 0 ][ 0 ]
					+ a[ 3 ][ 1 ] * b[ 1 ][ 0 ]
					+ a[ 3 ][ 2 ] * b[ 2 ][ 0 ]
					+ a[ 3 ][ 3 ] * b[ 3 ][ 0 ];

		m[ 3 ][ 1 ] = a[ 3 ][ 0 ] * b[ 0 ][ 1 ]
					+ a[ 3 ][ 1 ] * b[ 1 ][ 1 ]
					+ a[ 3 ][ 2 ] * b[ 2 ][ 1 ]
					+ a[ 3 ][ 3 ] * b[ 3 ][ 1 ];

		m[ 3 ][ 2 ] = a[ 3 ][ 0 ] * b[ 0 ][ 2 ]
					+ a[ 3 ][ 1 ] * b[ 1 ][ 2 ]
					+ a[ 3 ][ 2 ] * b[ 2 ][ 2 ]
					+ a[ 3 ][ 3 ] * b[ 3 ][ 2 ];

		m[ 3 ][ 3 ] = a[ 3 ][ 0 ] * b[ 0 ][ 3 ]
					+ a[ 3 ][ 1 ] * b[ 1 ][ 3 ]
					+ a[ 3 ][ 2 ] * b[ 2 ][ 3 ]
					+ a[ 3 ][ 3 ] * b[ 3 ][ 3 ];

		return this;
	},
	add ( a, b = CACHE_MAT4.set( this ) ) {
		let m = this;

		m[ 0 ][ 0 ] = a[ 0 ][ 0 ] + b[ 0 ][ 0 ]; m[ 0 ][ 1 ] = a[ 0 ][ 1 ] + b[ 0 ][ 1 ]; m[ 0 ][ 2 ] = a[ 0 ][ 2 ] + b[ 0 ][ 2 ]; m[ 0 ][ 3 ] = a[ 0 ][ 3 ] + b[ 0 ][ 3 ];
		m[ 1 ][ 0 ] = a[ 1 ][ 0 ] + b[ 1 ][ 0 ]; m[ 1 ][ 1 ] = a[ 1 ][ 1 ] + b[ 1 ][ 1 ]; m[ 1 ][ 2 ] = a[ 1 ][ 2 ] + b[ 1 ][ 2 ]; m[ 1 ][ 3 ] = a[ 1 ][ 3 ] + b[ 1 ][ 3 ];
		m[ 2 ][ 0 ] = a[ 2 ][ 0 ] + b[ 2 ][ 0 ]; m[ 2 ][ 1 ] = a[ 2 ][ 1 ] + b[ 2 ][ 1 ]; m[ 2 ][ 2 ] = a[ 2 ][ 2 ] + b[ 2 ][ 2 ]; m[ 2 ][ 3 ] = a[ 2 ][ 3 ] + b[ 2 ][ 3 ];
		m[ 3 ][ 0 ] = a[ 3 ][ 0 ] + b[ 3 ][ 0 ]; m[ 3 ][ 1 ] = a[ 3 ][ 1 ] + b[ 3 ][ 1 ]; m[ 3 ][ 2 ] = a[ 3 ][ 2 ] + b[ 3 ][ 2 ]; m[ 3 ][ 3 ] = a[ 3 ][ 3 ] + b[ 3 ][ 3 ];

		return this;
	},
	lookAt ( eye, target, up ) {
		let m = this;

		let z = CACHE_VEC3_Z.sub( eye, target ).normalize();

		if ( z.getLength === 0 ) z = z.set(up);

		let x = CACHE_VEC3_X.cross( up, z ).normalize();
		
		if( x.getLength === 0 ) {
			z.x += 0.0001;
			x = x.cross( up, z ).normalize();
		}

		let y = CACHE_VEC3_Y.cross( z, x );

		return this.set([
			x[ 0 ],	x[ 1 ],	x[ 2 ], 0,
			y[ 0 ],	y[ 1 ],	y[ 2 ], 0,
			z[ 0 ],	z[ 1 ],	z[ 2 ], 0,
			0,		0,		0,		1
		]);
	},
	frustum ( left, right, bottom, top, near, far ) {
		let x = 2 * near / ( right - left );
		let y = 2 * near / ( top - bottom );
		let a = ( right + left ) / ( right - left );
		let b = ( top + bottom ) / ( top - bottom );
		let c = -( far + near ) / ( far - near );
		let d = - 2 * far * near / ( far - near );
		let m = this;

		return this.set([
			x, 0, 0, 0,
			0, y, 0, 0,
			a, b, c,-1,
			0, 0, d, 0
		])
	},
	perspective ( aspect, fov, near, far ) {
		let ymax = near * Math.tan( fov * Math.PI / 720. );
		let ymin = -ymax;

		return this.frustum (
			ymin * aspect,
			ymax * aspect,
			ymin,
			ymax,
			near,
			far
		);
	},
	translation ( x = 0, y = 0, z = 0 ) {
		return this.set([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			x, y, z, 1
		]);
	},
	scale ( x = 1, y = x, z = x ) {
		return this.set([
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		]);
	},
	rotationX( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );

		return this.set([
			1, 0, 0, 0,
			0, c,-s, 0,
			0, s, c, 0,
			0, 0, 0, 1,
		]);
	},
	rotationY ( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );
		
		return this.set([
			c, 0, s, 0,
			0, 1, 0, 0,
		   -s, 0, c, 0,
			0, 0, 0, 1
		]);
	},
	rotationZ ( a = 0 ) {
		let c = Math.cos( a / 180 * Math.PI );
		let s = Math.sin( a / 180 * Math.PI );
		
		return this.set([
			c,-s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	},
	rotationQuat4 ( quat ) {
		let two = CACHE_VEC4.clone( quat ).multiplyScalar( 2 );
		
		let xx = quat.x * two.x, xy = quat.x * two.y, xz = quat.x * two.z;
		let yy = quat.y * two.y, yz = quat.y * two.z, zz = quat.z * two.z;
		let wx = quat.w * two.x, wy = quat.w * two.y, wz = quat.w * two.z;

		return this.set([
			1 - (yy + zz),	xy + wz,		xz - wy,		0,
			xy - wz,		1 - (xx + zz),	yz + wx,		0,
			xz + wy,		yz-wx,			1 - (xx + yy),	0,
			0,				0,				0,				1
		]);
	}
});

export class mat3 {
	constructor ( ...data ) {
		const width = 3;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data : new Float32Array( buffer ),
			0 : new Float32Array( buffer, 0 * elementSize * width, width ),
			1 : new Float32Array( buffer, 1 * elementSize * width, width ),
			2 : new Float32Array( buffer, 2 * elementSize * width, width ),
		}, E );

		data.length ? this.data.set( data ) : this.identity();
	}
}
Properties( mat3.prototype, {
	length : 3,
	set ( m ) {
		this.data.set( m );
		return this;
	},
	transpose ( a = CACHE_MAT3.set(this) ) {
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
	multiply ( a, b = CACHE_MAT3.set( this ) ) {
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
	add ( a, b = CACHE_MAT3.set( this ) ) {
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
	constructor ( ...data ) {
		const width = 2;
		const elementSize = Float32Array.BYTES_PER_ELEMENT;
		const buffer = new ArrayBuffer( width * width * elementSize );
		Properties( this, {
			data : new Float32Array( buffer ),
			0 : new Float32Array( buffer, 0 * elementSize * width, width ),
			1 : new Float32Array( buffer, 1 * elementSize * width, width ),
		}, E );

		data.length ? this.data.set( data ) : this.identity();
	}
}
Properties( mat2.prototype, {
	length : 2,
	set ( m ) {
		this.data.set( m );
		return this;
	},
	transpose ( a = CACHE_MAT2.set(this) ) {
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
	multiply ( a, b = CACHE_MAT2.set( this ) ) {
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
	add ( a, b = CACHE_MAT2.set( this ) ) {
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
const CACHE_VEC4 	= new vec4;



/*

			var		n11 = m[  0 ], n12 = m[  4 ], n13 = m[  8 ], n14 = m[ 12 ],
					n21 = m[  1 ], n22 = m[  5 ], n23 = m[  9 ], n24 = m[ 13 ],
					n31 = m[  2 ], n32 = m[  6 ], n33 = m[ 10 ], n34 = m[ 14 ],
					n41 = m[  3 ], n42 = m[  7 ], n43 = m[ 11 ], n44 = m[ 15 ];

			m[  0 ] = n23 * n34 * n42
					- n24 * n33 * n42
					+ n24 * n32 * n43
					- n22 * n34 * n43
					- n23 * n32 * n44
					+ n22 * n33 * n44;
			m[  4 ] = n14 * n33 * n42
					- n13 * n34 * n42
					- n14 * n32 * n43
					+ n12 * n34 * n43
					+ n13 * n32 * n44
					- n12 * n33 * n44;
			m[  8 ] = n13 * n24 * n42
					- n14 * n23 * n42
					+ n14 * n22 * n43
					- n12 * n24 * n43
					- n13 * n22 * n44
					+ n12 * n23 * n44;
			m[ 12 ] = n14 * n23 * n32
					- n13 * n24 * n32
					- n14 * n22 * n33
					+ n12 * n24 * n33
					+ n13 * n22 * n34
					- n12 * n23 * n34;
			m[  1 ] = n24 * n33 * n41
					- n23 * n34 * n41
					- n24 * n31 * n43
					+ n21 * n34 * n43
					+ n23 * n31 * n44
					- n21 * n33 * n44;
			m[  5 ] = n13 * n34 * n41
					- n14 * n33 * n41
					+ n14 * n31 * n43
					- n11 * n34 * n43
					- n13 * n31 * n44
					+ n11 * n33 * n44;
			m[  9 ] = n14 * n23 * n41
					- n13 * n24 * n41
					- n14 * n21 * n43
					+ n11 * n24 * n43
					+ n13 * n21 * n44
					- n11 * n23 * n44;
			m[ 13 ] = n13 * n24 * n31
					- n14 * n23 * n31
					+ n14 * n21 * n33
					- n11 * n24 * n33
					- n13 * n21 * n34
					+ n11 * n23 * n34;
			m[  2 ] = n22 * n34 * n41
					- n24 * n32 * n41
					+ n24 * n31 * n42
					- n21 * n34 * n42
					- n22 * n31 * n44
					+ n21 * n32 * n44;
			m[  6 ] = n14 * n32 * n41
					- n12 * n34 * n41
					- n14 * n31 * n42
					+ n11 * n34 * n42
					+ n12 * n31 * n44
					- n11 * n32 * n44;
			m[ 10 ] = n12 * n24 * n41
					- n14 * n22 * n41
					+ n14 * n21 * n42
					- n11 * n24 * n42
					- n12 * n21 * n44
					+ n11 * n22 * n44;
			m[ 14 ] = n14 * n22 * n31
					- n12 * n24 * n31
					- n14 * n21 * n32
					+ n11 * n24 * n32
					+ n12 * n21 * n34
					- n11 * n22 * n34;
			m[  3 ]	= n23 * n32 * n41
					- n22 * n33 * n41
					- n23 * n31 * n42
					+ n21 * n33 * n42
					+ n22 * n31 * n43
					- n21 * n32 * n43;
			m[  7 ] = n12 * n33 * n41
					- n13 * n32 * n41
					+ n13 * n31 * n42
					- n11 * n33 * n42
					- n12 * n31 * n43
					+ n11 * n32 * n43;
			m[ 11 ] = n13 * n22 * n41
					- n12 * n23 * n41
					- n13 * n21 * n42
					+ n11 * n23 * n42
					+ n12 * n21 * n43
					- n11 * n22 * n43;
			m[ 15 ] = n12 * n23 * n31
					- n13 * n22 * n31
					+ n13 * n21 * n32
					- n11 * n23 * n32
					- n12 * n21 * n33
					+ n11 * n22 * n33;
			
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