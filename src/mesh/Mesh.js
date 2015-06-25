import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { GL } from "../webgl/Context.js";

import { mat2, mat3, mat4, vec2, vec3, vec4, quat4 } from "../math/math.js";

import { ElementAttribute } from "../mesh/GeometryAttributes.js";
import { Drawable, DisplayList } from "../mesh/Drawable.js";
import Geometry from "../mesh/Geometry.js";


import { allocateUint } from "../utilities/misc.js";

export default class Mesh extends DisplayList {
	constructor( transform = new mat4, scale = new vec3 ) {
		super();
		Properties( this, {
			transform,
			scale,
		}, C );
	}
}
Properties( Mesh.prototype, {
	use ( uniformMap = {} ) {
		if ( !"mesh" in uniformMap ) uniformMap.mesh = this;
		for ( let drawable of this ) drawable.use( Object.create( uniformMap ) );
		return this;
	},
	draw ( offset, count ) {
		for ( let drawable of this ) drawable.draw( offset, count );
		return this;
	}
});

