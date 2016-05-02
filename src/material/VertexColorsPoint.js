define ( [
    "require",
    "../utilities/PropertyDescriptors",
    "../resource/HttpSourceProgram",
    "../material/Material",
    "../math/vec4",
    "../math/vec3",
], function module (
    require,
    def,
    HttpSourceProgram,
    Material,
    vec4,
    vec3
) {
    "use strict";
    
    const RESOURCE = new HttpSourceProgram( require.toUrl( "../glsl/vertexColors.vert" ), require.toUrl( "../glsl/vertexColorsPoints.frag" ) );

    class VertexColorsPoint extends Material {
        constructor ( uniforms ) {
            if ( uniforms === undefined ) uniforms                        = {};
            if ( uniforms.ambient === undefined ) uniforms.ambient        = new vec4( 1.0, 1.0, 1.0, 1.0 );
            
            super( uniforms );

            //this.depth.enable().enableWrite();
            //this.cullFace.enable();

            this.setProgram( RESOURCE.program );
        }
    }

    def.Properties( Material, {
        VertexColorsPoint
    }, def.CONFIGURABLE );

    return VertexColorsPoint;
});