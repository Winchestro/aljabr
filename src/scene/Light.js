import def from "../utilities/PropertyDescriptors.js";
import vec3 from "../math/vec3.js";
import vec4 from "../math/vec4.js";

export default class Light {
    constructor ( uniforms ) {
        def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
    }
}

export class Directional extends Light {
    constructor ( uniforms ) {
    	if ( uniforms === undefined ) uniforms = {};

    	if ( uniforms.position === undefined ) uniforms.position 		= new vec4( 1,1,1,0 );
        if ( uniforms.attenuation === undefined ) uniforms.attenuation 	= new vec3( 2, 1, 0.025 );
        if ( uniforms.color === undefined ) uniforms.color 				= new vec3( 1,1,1 );
        if ( uniforms.direction === undefined ) uniforms.direction 		= new vec3( 0,0,0 );
        if ( uniforms.exponent ===undefined ) uniforms.exponent 		= 2;
        if ( uniforms.innerCutoff === undefined ) uniforms.innerCutoff 	= 0.1;
        if ( uniforms.outerCutoff === undefined ) uniforms.outerCutoff 	= 5.9;

        super( uniforms );
    }
}

def.Properties( Light, {
	Directional
});