define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/Program",
    "../webgl/Shader",
    "../math/vec4",
    "../math/vec3",
    "../math/vec2",
    "../math/mat4",
    "../math/mat3",
    "../math/mat2",
    "../math/quat4",
    "../material/TextureUnit",
    "../material/Alpha",
    "../material/CullFace",
    "../material/DepthTest",
    "../material/Dither",
    "../material/Multisample",
    "../material/PolygonOffset",
    "../material/ScissorTest",
    "../material/StencilTest"
], function module (
    def,
    gl,
    Program,
    Shader,
    vec4,
    vec3,
    vec2,
    mat4,
    mat3,
    mat2,
    quat4,
    TextureUnit,
    Alpha,
    CullFace,
    DepthTest,
    Dither,
    Multisample,
    PolygonOffset,
    ScissorTest,
    StencilTest
){
    "use strict";

    class Material {
        constructor ( uniforms ) {
            def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
            
            def.Properties( this, {
                textures    : new TextureUnit,
                offset      : new PolygonOffset,
                alpha       : new Alpha,
                depth       : new DepthTest,
                stencil     : new StencilTest,
                cullFace    : new CullFace,
                scissor     : new ScissorTest,
                dither      : new Dither,
                multisample : new Multisample
            }, def.CONFIGURABLE );
        }
        setProgram ( program ) {
            program.use();
            //let uniforms = program.getActiveUniforms.material;
            //if ( uniforms ) uniforms.set( this );
            def.Property( this, "program", program, def.CONFIGURABLE );
        }
        use ( ) {

            this.program.use();
            var uniforms = this.program.getActiveUniforms.material;
            if ( uniforms ) uniforms.set( this );

            this.textures.use();


            if ( this.alpha.enabled ) {                 this.alpha.enable();

                if ( this.alpha.colorSet )              this.alpha.setColor();
                else                                    this.alpha.unsetColor();

                if ( this.alpha.funcSet )               this.alpha.setFunc();
                else                                    this.alpha.unsetFunc();

                if ( this.alpha.equationSet )           this.alpha.setEquation();
                else                                    this.alpha.unsetEquation();

            } else                                      this.alpha.disable();
            

            if ( this.cullFace.enabled ) {              this.cullFace.enable();

                if ( this.cullFace.modeSet )            this.cullFace.setMode();
                else                                    this.cullFace.unsetMode();

                if ( this.cullFace.frontSet )           this.cullFace.setFront();
                else                                    this.cullFace.unsetFront();

            } else                                      this.cullFace.disable();


            if ( this.depth.enabled ) {                 this.depth.enable();

                if ( this.depth.writeEnabled )          this.depth.enableWrite();
                else                                    this.depth.disableWrite();

                if ( this.depth.funcSet )               this.depth.setFunc();
                else                                    this.depth.unsetFunc();

                if ( this.depth.rangeSet )              this.depth.setRange();
                else                                    this.depth.unsetRange();

            } else                                      this.depth.disable();


            if ( this.dither.enabled ) {                this.dither.enable();
            } else                                      this.dither.disable();


            if ( this.offset.enabled  ) {               this.offset.enable();

                if ( this.offset.fillSet )              this.offset.setFill();
                else                                    this.offset.unsetFill();

            } else                                      this.offset.disable();


            if ( this.multisample.enabled ) {           this.multisample.enable();

                if ( this.multisample.alphaEnabled )    this.multisample.enableAlpha();
                else                                    this.multisample.disableAlpha();

                if ( this.multisample.coverageSet )     this.multisample.setCoverage();
                else                                    this.multisample.unsetCoverage();

            } else                                      this.multisample.disable();


            if ( this.scissor.enabled ) {               this.scissor.enable();

                if ( this.scissor.dimensionsSet )       this.scissor.setDimensions();
                else                                    this.scissor.unsetDimensions();

            } else                                      this.scissor.disable();


            if ( this.stencil.enabled ) {               this.stencil.enable();
                if ( 
                    this.stencil.frontOpSet && 
                    this.stencil.backOpSet 
                )                                       this.stencil.setOp();
                else {                                  this.stencil.unsetOp();

                    if ( this.stencil.frontOpSet )      this.stencil.setFrontOp();
                    if ( this.stencil.backOpSet )       this.stencil.setBackOp();
                }
                if ( 
                    this.stencil.frontFuncSet &&
                    this.stencil.backFuncSet 
                )                                       this.stencil.setFunc();
                else {                                  this.stencil.unsetFunc();

                    if ( this.stencil.frontFuncSet )    this.stencil.setFrontFunc();
                    if ( this.stencil.backFuncSet )     this.stencil.setBackFunc();
                }
                if ( 
                    this.stencil.frontMaskSet &&
                    this.stencil.backMaskSet
                )                                       this.stencil.setMask();
                else {                                  this.stencil.unsetMask();

                    if ( this.stencil.frontMaskSet )    this.stencil.setFrontMask();
                    if ( this.stencil.backMaskSet )     this.stencil.setBackMask();
                }
            } else                                      this.stencil.disable();
            

            return this;
        }
    }

    return Material;
});