define( [
    "../math/vec3"
], function module ( 
    vec3
) {
    "use strict";

    class Light {
        constructor ( uniforms ) {
            def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        }
    }

    return Light;
});