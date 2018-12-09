import def from "../utilities/PropertyDescriptors.js";
import vec3 from "../math/vec3.js";

const U = new vec3;
const V = new vec3;
const N = new vec3;


export default class Plane extends Float32Array {
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

	projectPoint ( outV3point, inV3point ) { return Plane.projectPoint( this, outV3point, inV3point ); }
	static projectPoint ( inPlane, outV3point, inV3point ) {
		outV3point = vec3.set( outV3point, inV3point );

		let normal = vec3.set( N, inPlane );
		let distance = Plane.signedDistance( inPlane, inV3point );

		return vec3.multiply( vec3.subtractScalar( outV3point, distance ), normal );
	}

	signedDistance( inV3point ) { return Plane.signedDistance( this, inV3point ); }
	static signedDistance( inPlane, inV3point ) {
		return N.set( inPlane ).dot( inV3point ) + inPlane[ 3 ];
	}

	setFrom3Positions( inV3point0, inV3point1, inV3point2 ) { return Plane.setFrom3Positions( this, inV3point0, inV3point1, inV3point2 ); }
	static setFrom3Positions ( outPlane, inV3point0, inV3point1, inV3point2 ) {
		vec3.sub( U, inV3point0, inV3point1 );
		vec3.sub( V, inV3point0, inV3point2 );
		vec3.normalize( vec3.cross( N, U, V ) );

		outPlane[ 0 ] = N[ 0 ];
		outPlane[ 1 ] = N[ 1 ];
		outPlane[ 2 ] = N[ 2 ];
		outPlane[ 3 ] = vec3.dot( vec3.multiplyScalar( N, -1 ), inV3point0 );

		return inPlane;
	}
}