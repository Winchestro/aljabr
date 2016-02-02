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

    const RESOURCE = new HttpSourceProgram( "src/glsl/phong" );

    class Phong extends Material {
        constructor ( uniforms ) {
            if ( uniforms === undefined ) uniforms                        = {};
            if ( uniforms.ambient === undefined ) uniforms.ambient        = new vec4( 0.0, 0.0, 0.0, 1.0 );
            if ( uniforms.diffuse === undefined ) uniforms.diffuse        = new vec4( 0.5, 0.5, 0.5, 1.0 );
            if ( uniforms.specular === undefined ) uniforms.specular      = new vec3( 1.0, 1.0, 1.0 );
            if ( uniforms.shininess === undefined ) uniforms.shininess    = 1.0;
            
            super( uniforms );

            this.depth.enable().enableWrite();
            this.cullFace.enable();

            this.setProgram( RESOURCE.program );
        }
    }

    def.Properties( Material, {
        Phong
    }, def.CONFIGURABLE );

    return Phong;
});