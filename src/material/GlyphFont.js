define ( [
    "../utilities/PropertyDescriptors",
    "../resource/HttpSourceProgram",
    "../material/Material",
    "../math/vec3",
], function module (
    def,
    HttpSourceProgram,
    Material,
    vec3
) {
    "use strict";

    const RESOURCE = new HttpSourceProgram( "src/glsl/text" );

    class GlyphFont extends Material {
        constructor ( uniforms ) {
            if ( uniforms === undefined ) uniforms                        = {};
            if ( uniforms.ambient === undefined ) uniforms.ambient        = new vec3( 1, 1, 1 );
            
            super( uniforms );

            this.setProgram( RESOURCE.program );
            this.depth.enable().enableWrite();
            this.alpha.enable().setFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE );
        }
    }

    def.Properties( Material, {
        GlyphFont
    }, def.CONFIGURABLE );

    return GlyphFont;
});