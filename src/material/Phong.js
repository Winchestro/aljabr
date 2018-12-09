import def from "../utilities/PropertyDescriptors.js";
import HttpSourceProgram from "../resource/HttpSourceProgram.js";
import Material from "../material/Material.js";
import vec4 from "../math/vec4.js";
import vec3 from "../math/vec3.js";

const RESOURCE = new HttpSourceProgram( "src/glsl/phong" );

export default class Phong extends Material {
    constructor ( uniforms ) {
        if ( uniforms === undefined ) uniforms                        = {};
        if ( uniforms.ambient === undefined ) uniforms.ambient        = new vec4( 0.0, 0.0, 0.0, 1.0 );
        if ( uniforms.diffuse === undefined ) uniforms.diffuse        = new vec4( 0.5, 0.5, 0.5, 1.0 );
        if ( uniforms.specular === undefined ) uniforms.specular      = new vec3( 1.0, 1.0, 1.0 );
        if ( uniforms.shininess === undefined ) uniforms.shininess    = 1.0;
        
        super( uniforms );
        this.alpha.enable().setFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE );
        this.depth.enable().enableWrite();
        this.offset.enable().setFill( 1, 1 );
        this.cullFace.enable();

        this.setProgram( RESOURCE.program );
    }
}

def.Properties( Material, {
    Phong
}, def.CONFIGURABLE );