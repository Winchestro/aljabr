import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

def.Getters( WebGLActiveInfo.prototype, {
    typeString ( ) { return gl.strings[ this.type ]; }
});

export default WebGLActiveInfo;