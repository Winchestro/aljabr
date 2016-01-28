define( [
    "../utilities/PropertyDescriptors",
    "../mesh/DisplayList",
    "../scene/Camera",
    "../scene/Light"
], function module (
    def,
    DisplayList,
    Camera,
    Light
) {
    "use strict";
    const START_TIME = Date.now();

    class Scene extends DisplayList {
        constructor ( camera, lights, stacks, children, uniforms ) {
            if ( camera === undefined ) camera = new Camera.Perspective;
            if ( lights === undefined ) lights = [];
            if ( children === undefined ) children = [];
            if ( stacks === undefined ) stacks = {
                transform : [],
                scale : []
            };
            super( children );
            
            def.Properties( this, {
                camera,
                lights,
                children,
                stacks
            });

            def.Properties( this, {
                deltaTime : 0,
                frame : 0
            }, def.WRITABLE | def.ENUMERABLE | def.CONFIGURABLE );

            def.Properties( this, {
                drawCalls : 0
            }, def.WRITABLE | def.CONFIGURABLE );
            
            if ( uniforms !== undefined ) def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
        }
        draw ( ) {
            this.drawCalls = 0;
            this.frame++;
            this.deltaTime = Date.now() - START_TIME;
            for ( let drawable of this.children ) drawable.draw( this, this.camera, this.lights );
        }

    }

    def.Getters( Scene.prototype, {
        usedLights ( ) {
            return this.lights.length;
        }
    }, def.ENUMERABLE );

    return Scene;
});