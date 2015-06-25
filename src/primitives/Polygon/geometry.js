import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../../utilities/PropertyDescriptors.js";

import GeometryPrimitiveOptions from "../GeometryPrimitiveOptions.js";
import Geometry from "../../mesh/Geometry.js";

export default function createPolygonGeometry ( sides = 7, r = 1, x = 0, y = 0 ) {
	let positions = 2;
	let colors = 3;
	let stride = positions + colors;
	let geometry = new Geometry().addAttributeGroup( "dynamic", [ 
		new Float32Array( positions ),
		new Float32Array( colors )
	], sides + 1 );

	let v = geometry.dynamic.view;
	let e = new Uint32Array( 3 * sides );

	v.set( [ x, y,  0, 1, 1 ] )
	
	for ( let i = 1; i < sides + 1; i++ ) {
		let a = Math.PI * 2 * i / sides;
		v.set( [
			Math.sin( a ) * r + x, 
			Math.cos( a ) * r + y,
			
			.0,
			Math.random(),
			.5
		], i * stride );
		

		let offset 	= ( i - 1 ) * 3;
		let center 	= 0;
		let next = ( i % sides ) + 1;

		if ( i % 2 ) e.set( [ 
			i,
			next,
			center 
		], offset );
		else e.set( [
			center,
			i,
			next 
		], offset );
	}
	
	geometry.dynamic.update();
	geometry.createIndex( e );
	return geometry;
}