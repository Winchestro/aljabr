import def from "../utilities/PropertyDescriptors.js";
import HttpSourceProgram from "../resource/HttpSourceProgram.js";
import Material from "../material/Material.js";
import vec4 from "../math/vec4.js";
import vec3 from "../math/vec3.js";

const RESOURCE = new HttpSourceProgram( "src/glsl/vertexColors" );

export default class VertexColors extends Material {
    constructor ( uniforms ) {
        if ( uniforms === undefined ) uniforms                        = {};
        if ( uniforms.ambient === undefined ) uniforms.ambient        = new vec4( 1.0, 1.0, 1.0, 1.0 );
        
        super( uniforms );

        this.depth.enable().enableWrite();
        this.cullFace.enable();

        this.setProgram( RESOURCE.program );
    }
}

def.Properties( Material, {
    VertexColors
}, def.CONFIGURABLE );