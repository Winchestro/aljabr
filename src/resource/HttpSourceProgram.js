import def from "../utilities/PropertyDescriptors.js"
import Resource from "../resource/Resource.js"
import Shader from "../webgl/Shader.js"
import Program from "../webgl/Program.js"

export default class HttpSourceProgram {
    constructor ( urlVertexShader, urlFragmentShader, refreshInterval ) {
        if ( urlFragmentShader === undefined ) {
            urlFragmentShader = urlVertexShader + ".frag";
            urlVertexShader += ".vert";
        }

        let vsLoaded = false;
        let fsLoaded = false;
        
        let vs = new Shader.Vertex;
        let fs = new Shader.Fragment;

        let program = new Program().attachShader( fs ).attachShader( vs );

        let sourceVS = Resource.http( urlVertexShader, { interval : refreshInterval } );
        let sourceFS = Resource.http( urlFragmentShader , { interval : refreshInterval } );
        
        let compileVS = new Resource( function compileVS ( vsCode ) {
            vsLoaded = true;
            vs.setShaderSource( vsCode );
            if ( fsLoaded ) return program;
        } );

        let compileFS = new Resource( function compileFS ( fsCode ) {
            fsLoaded = true;
            fs.setShaderSource( fsCode );
            if ( vsLoaded ) return program;
        } );

        
        let linkProgram = new Resource( function linkProgram ( program ) {
            return program.link();
        } ); 
        
        sourceVS.setTarget( compileVS );
        compileVS.setTarget( linkProgram );

        sourceFS.setTarget( compileFS );
        compileFS.setTarget( linkProgram );
        
        
        //linkProgram.setTarget( callback );
        linkProgram.program = program;


        return linkProgram;
    }
}

def.Property( Resource, "HttpSourceProgram", HttpSourceProgram, def.CONFIGURABLE );