define ( [
    "../utilities/PropertyDescriptors",
    "../resource/HttpSourceProgram",
    "../material/Material",
    "../math/vec4",
    "../math/vec3",
], function module (
    def,
    HttpSourceProgram,
    Material,
    vec4,
    vec3
) {
    "use strict";

    const RESOURCE = new HttpSourceProgram( "src/glsl/vertexColors" );

    class VertexColors extends Material {
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

    return VertexColors;
});