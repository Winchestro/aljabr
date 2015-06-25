import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { GL } from "../webgl/Context.js";

export default class GeometryOptions {
	constructor( colorFn ) {
		this.name = name;
		this.colorFn = colorFn;
	}
}
Properties( GeometryOptions.prototype, {
	structure : {
		position : { type : new Float32Array( [ 0, 0, 0 ] ) },
		color : 	{ type : new Float32Array( [ 0, 1, 0 ] ) },
		normal : 	{ type : new Float32Array( [ 1, 1, 1 ] ) },
		texCoord :	{ type : new Float32Array( [ 0, 0 ] ) }
	},
	usage : GL.DYNAMIC_DRAW,
	preallocateVertices : 0
}, E | C );