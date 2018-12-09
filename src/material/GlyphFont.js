import def from "../utilities/PropertyDescriptors.js";
import HttpSourceProgram from "../resource/HttpSourceProgram.js";
import Material from "../material/Material.js";
import vec4 from "../math/vec4.js";

//TODO : figure out how to get the correct path in new modules
const RESOURCE = new HttpSourceProgram( "src/glsl/text" );

export default class GlyphFont extends Material {
    constructor ( uniforms ) {
        if ( uniforms === undefined ) uniforms                        = {};
        if ( uniforms.color === undefined ) uniforms.color        = new vec4( 1, 1, 1, 1 );
        
        super( uniforms );

        this.setProgram( RESOURCE.program );
        this.depth.enable().enableWrite();
        this.alpha.enable().setFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE );
    }
}

def.Properties( Material, {
    GlyphFont
}, def.CONFIGURABLE );