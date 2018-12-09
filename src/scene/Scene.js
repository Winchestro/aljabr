import def from "../utilities/PropertyDescriptors.js";
import Renderable from "../mesh/Renderable.js";
import Light from "../scene/Light.js";

const START_TIME = Date.now();

export default class Scene extends Renderable {
    constructor ( lights, stacks, children, uniforms ) {
        if ( lights === undefined ) lights = [];
        if ( children === undefined ) children = [];
        if ( stacks === undefined ) stacks = {
            transform : [],
            scale : []
        };
        super( children );
        
        def.Properties( this, {
            lights,
            children,
            stacks
        });

        def.Properties( this, {
            deltaTime : 0
        }, def.WRITABLE | def.ENUMERABLE | def.CONFIGURABLE );
        
        if ( uniforms !== undefined ) def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
    }

    update ( camera ) {
        this.time = ( Date.now() - START_TIME ) / 1000;
        let length = this.children.length;

        for ( let i = 0; i < length; i++ ) this.children[ i ].update( camera, this, this.lights );
    }

    draw ( camera ) {
        
        for ( let drawable in this.children ) this.children[ drawable ].draw( camera, this, this.lights );            
    }
    /*
    draw ( ) {
        this.drawCalls = 0;
        this.frame++;
        this.time = ( Date.now() - START_TIME ) / 1000;

        for ( let drawable of this.children ) drawable.draw( this, this.camera, this.lights );
    }*/

}

def.Getters( Scene.prototype, {
    usedLights ( ) {
        return this.lights.length;
    }
}, def.ENUMERABLE );