 define( [
    "../utilities/PropertyDescriptors",
    "../resource/Resource",
    "../webgl/Shader",
    "../webgl/Program"
], function module ( 
    def,
    Resource,
    Shader,
    Program
) {
    "use strict";


    class HttpSourceProgram {
        constructor ( url, callback, refreshInterval ) {
            let fsLoaded = false;
            let vsLoaded = false;
            let vs = new Shader.Vertex;
            let fs = new Shader.Fragment;

            let program = new Program().attachShader( fs ).attachShader( vs );

            let sourceVS = Resource.http( url + ".vert", { interval : refreshInterval } );
            let sourceFS = Resource.http( url + ".frag", { interval : refreshInterval } );
            
            let compileFS = new Resource( function compileFS ( fsCode ) {
                fsLoaded = true;
                fs.setShaderSource( fsCode );
                if ( vsLoaded ) return program;
            } );
            let compileVS = new Resource( function compileVS ( vsCode ) {
                vsLoaded = true;
                vs.setShaderSource( vsCode );
                if ( fsLoaded ) return program;
            } );
            
            let linkProgram = new Resource( function linkProgram ( program ) {
                return program.link();
            } ); 
            
            sourceVS.setTarget( compileVS );
            compileVS.setTarget( linkProgram );

            sourceFS.setTarget( compileFS );
            compileFS.setTarget( linkProgram );
            
            
            linkProgram.setTarget( callback );
            linkProgram.program = program;


            return linkProgram;
        }

        linkProgram ( ) {
            if ( this.fsLoaded && this.vsLoaded ) return this.program.link();
        }
    }

    def.Property( Resource, "HttpSourceProgram", HttpSourceProgram, def.CONFIGURABLE );

    return HttpSourceProgram;
});