define([
	"../utilities/PropertyDescriptors",
	"../math/vec3"
], function module(
	def,
	vec3
) {
	"use strict"

	const U = new vec3;
	const V = new vec3;
	const N = new vec3;

	
	class Plane extends Float32Array {
		constructor ( A, B, C, D ) {
			super( 4 );
			/*
				Plane defined by Ax + By + Cz + D = 0;
			*/
			this[ 0 ] = A;
			this[ 1 ] = B;
			this[ 2 ] = C;
			this[ 3 ] = D;
		}

		projectPoint ( outV3point, inV3point ) { return Plane.projectPoint( outV3point, this, inV3point ); }
		static projectPoint ( outV3point, inPlane, inV3point ) {
			outV3point = vec3.set( outV3point, inV3point );

			let normal = N.set( inPlane );
			let distance = Plane.signedDistance( inPlane, inV3point );

			return vec3.multiply( vec3.subtractScalar( outV3point, distance ), normal );
		}

		signedDistance( inV3point ) { return Plane.signedDistance( this, inV3point ); }
		static signedDistance( inPlane, inV3point ) {
			return N.set( inPlane ).dot( inV3point ) + inPlane[ 3 ];
		}
		
		setFrom3Positions( inV3point0, inV3point1, inV3point2 ) { return Plane.setFrom3Positions( this, inV3point0, inV3point1, inV3point2 ); }
		static setFrom3Positions ( outPlane, inV3point0, inV3point1, inV3point2 ) {
			U.sub( inV3point0, inV3point1 );
			V.sub( inV3point0, inV3point2 );
			N.cross( U, V ).normalize();

			outPlane[ 0 ] = N[ 0 ];
			outPlane[ 1 ] = N[ 1 ];
			outPlane[ 2 ] = N[ 2 ];
			outPlane[ 3 ] = N.multiplyScalar( -1 ).dot( inV3point0 );

			return inPlane;
		}
	}

	return Plane;
});