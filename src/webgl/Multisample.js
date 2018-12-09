import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

export default class Multisample {
    constructor ( value, invert ) {
        if ( value !== undefined ) this.setCoverage( value, invert );
    }
    enable ( ) {
        this.enabled = true;
        Multisample.enable();
        return this;
    }
    disable ( ) {
        this.enabled = false;
        Multisample.disable();
        return this;
    }
    enableAlpha ( ) {
        this.alphaEnabled = true;
        Multisample.enableAlpha();
        return this;
    }
    disableAlpha ( ) {
        this.alphaEnabled = false;
        Multisample.disableAlpha();
        return this;
    }
    setCoverage ( value, invert ) {
        this.coverageSet = true;
        if ( value ) this.value = value;
        if ( invert ) this.invert = invert;
        Multisample.setCoverage( this.value, this.invert );
    }
    unsetCoverage ( ) {
        this.coverageSet = false;
        Multisample.unsetCoverage();
        return this;
    }
    static enable ( ) {
        if ( !Multisample.enabled ) {
            Multisample.enabled = true;
            gl.enable( gl.SAMPLE_COVERAGE );
        }
        return Multisample;
    }
    static disable ( ) {
        if ( Multisample.enabled ) {
            Multisample.enabled = false;
            gl.disable( gl.SAMPLE_COVERAGE );
        }
        return Multisample;
    }
    static enableAlpha ( ) {
        if ( !Multisample.alphaEnabled ) {
            Multisample.alphaEnabled = true;
            gl.enable( gl.SAMPLE_ALPHA_TO_COVERAGE );
        }
        return Multisample;
    }
    static disableAlpha ( ) {
        if ( Multisample.alphaEnabled ) {
            Multisample.alphaEnabled = false;
            gl.disable( gl.SAMPLE_ALPHA_TO_COVERAGE );
        }
        return Multisample;
    }
    static setCoverage ( value, invert ) {
        if ( value === undefined ) value = Multisample.value;
        if ( invert === undefined ) invert = Multisample.invert;

        Multisample.coverageSet = true;
        gl.sampleCoverage(
            //GLclampf
            value,
            //GLboolean
            invert
        );
        return Multisample;
    }
    static unsetCoverage ( ) {
        if( Multisample.coverageSet ) {
            Multisample.coverageSet = false;
            gl.sampleCoverage(
                //GLclampf
                Multisample.value,
                //GLboolean
                Multisample.invert
            );
        }
        return Multisample;
    }
    get getSampleBuffers()          { return gl.getParameter( gl.SAMPLE_BUFFERS );}
    get getInvert()                 { return gl.getParameter( gl.SAMPLE_COVERAGE_INVERT );}
    get getValue()                  { return gl.getParameter( gl.SAMPLE_COVERAGE_VALUE );}
    get getSamples()                { return gl.getParameter( gl.SAMPLES );}
}
def.Properties( Multisample, {
    enabled         : false,
    alphaEnabled    : false,
    coverageSet     : false,
    value           : 1,
    invert          : gl.FALSE,
}, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );