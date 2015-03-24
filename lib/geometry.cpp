#include<stdio.h>


template <class T> struct vec2 {
	T x;
	T y;
	vec2 ( ) { }
	vec2 ( T in_x, T in_y ) {
		x = in_x;
		y = in_y;
	}
};

template <class T> struct vec3 {
	T x;
	T y;
	T z;
	vec3 ( ) { }
	vec3 ( T in_x, T in_y, T in_z ) {
		x = in_x;
		y = in_y;
		z = in_z;
	}
};

template <class T> struct vec4 {
	T x;
	T y;
	T z;
	T w;
	vec4 ( ) { }
	vec4 ( T in_x, T in_y, T in_z, T in_w ) {
		x = in_x;
		y = in_y;
		z = in_z;
		w = in_w;
	}
};

template <class ...members> struct Tuple : members... {
	Tuple ( ) { }
	Tuple ( const members&... m ) : members( m )... { }
};

int main ( ) {
	vec3 <float> f3 ( 1.0, 1.0, 1.0 );
	vec4 <char> i4 ( 0xFF, 0xFF, 0xFF, 0xFF );

	Tuple <vec3 <float>, vec4 <char>> e1( f3, i4 );
	Tuple <vec4 <float>, vec4 <char>> e2[ 10 ];

	printf ( "vec3 <float> size : %d\n", sizeof( f3 ) );
	printf ( "vec4 <char> size : %d\n", sizeof( i4 ) );
	printf ( "e1 <vec3 <float>, vec4 <char>> size : %d\n", sizeof( e1 ) );
	printf ( "e2 <vec4 <float>, vec2 <char>>[ 10 ] size : %d\n", sizeof( e2 ) );
	return 0;
}