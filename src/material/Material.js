define ( [
    "../utilities/PropertyDescriptors",
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

    const TEXTURES_BIT      = 0b000000001;
    const OFFSET_BIT        = 0b000000010;
    const ALPHA_BIT         = 0b000000100;
    const DEPTH_BIT         = 0b000001000;
    const STENCIL_BIT       = 0b000010000;
    const CULLFACE_BIT      = 0b000100000;
    const SCISSOR_BIT       = 0b001000000;
    const DITHER_BIT        = 0b010000000;
    const MULTISAMPLE_BIT   = 0b100000000;

    class Material {

        constructor ( uniforms, textures, offset, alpha, depth, stencil, cullFace, scissor, dither, multisample ) {
            def.Properties( this, uniforms, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
            
            if ( textures       === undefined ) textures = new TextureUnit;
            if ( offset         === undefined ) offset = new PolygonOffset;
            if ( alpha          === undefined ) alpha = new Alpha;
            if ( depth          === undefined ) depth = new DepthTest;
            if ( stencil        === undefined ) stencil = new StencilTest;
            if ( cullFace       === undefined ) cullFace = new CullFace;
            if ( scissor        === undefined ) scissor = new ScissorTest;
            if ( dither         === undefined ) dither = new Dither;
            if ( multisample    === undefined ) multisample = new Multisample;


            def.Properties( this, {
                textures,
                offset,
                alpha,
                depth,
                stencil,
                cullFace,
                scissor,
                dither,
                multisample 
            }, def.CONFIGURABLE );
        }
        setProgram ( program ) {
            def.Property( this, "program", program, def.CONFIGURABLE );
        }
        setTextures ( textures ) {
            def.Property( this, "textures", textures, def.CONFIGURABLE );
        }
        setOffset ( offset ) {
            def.Property( this, "offset", offset, def.CONFIGURABLE );
        }
        setAlpha ( alpha ) {
            def.Property( this, "alpha", alpha, def.CONFIGURABLE );
        }
        setDepth ( depth ) {
            def.Property( this, "depth", depth, def.CONFIGURABLE );
        }
        setStencil ( stencil ) {
            def.Property( this, "stencil", stencil, def.CONFIGURABLE );
        }
        setCullFace ( cullFace ) {
            def.Property( this, "cullFace", cullFace, def.CONFIGURABLE );
        }
        setScissor ( scissor ) {
            def.Property( this, "scissor", scissor, def.CONFIGURABLE );
        }
        setDither ( dither ) {
            def.Property( this, "dither", dither, def.CONFIGURABLE );
        }
        setMultisample ( multisample ) {
            def.Property( this, "multisample", multisample, def.CONFIGURABLE );
        }

        createSubmaterial ( mask ) {
            let material = Object.create( this );

            if ( mask & TEXTURES_BIT )      material.setTextures( new TextureUnit );
            if ( mask & OFFSET_BIT )        material.setOffset( new PolygonOffset );
            if ( mask & ALPHA_BIT )         material.setAlpha( new Alpha );
            if ( mask & DEPTH_BIT )         material.setDepth( new DepthTest );
            if ( mask & STENCIL_BIT )       material.setStencil( new StencilTest );
            if ( mask & CULLFACE_BIT )      material.setCullFace( new CullFace );
            if ( mask & SCISSOR_BIT )       material.setScissor( new ScissorTest );
            if ( mask & DITHER_BIT )        material.setDither( new Dither );
            if ( mask & MULTISAMPLE_BIT )   material.setMultisample( new Multisample );

            return material;
        }

        use ( ) {
            
            this.program.use();
            var uniforms = this.program.getActiveUniforms.material;
            if ( uniforms ) uniforms.set( this );

            this.textures.use();


            if ( this.alpha && this.alpha.enabled ) {
                Alpha.enable();

                if ( this.alpha.colorSet )              this.alpha.setColor();
                else                                    this.alpha.unsetColor();

                if ( this.alpha.funcSet )               this.alpha.setFunc();
                else                                    this.alpha.unsetFunc();

                if ( this.alpha.equationSet )           this.alpha.setEquation();
                else                                    this.alpha.unsetEquation();

            } else Alpha.disable();
            

            if ( this.cullFace && this.cullFace.enabled ) {
                CullFace.enable();

                if ( this.cullFace.modeSet )            this.cullFace.setMode();
                else                                    this.cullFace.unsetMode();

                if ( this.cullFace.frontSet )           this.cullFace.setFront();
                else                                    this.cullFace.unsetFront();

            } else CullFace.disable();


            if ( this.depth && this.depth.enabled ) {   DepthTest.enable();

                if ( this.depth.writeEnabled )          this.depth.enableWrite();
                else                                    this.depth.disableWrite();

                if ( this.depth.funcSet )               this.depth.setFunc();
                else                                    this.depth.unsetFunc();

                if ( this.depth.rangeSet )              this.depth.setRange();
                else                                    this.depth.unsetRange();

            } else                                      DepthTest.disable();


            if ( this.dither && this.dither.enabled ) {
                Dither.enable();
            } else Dither.disable();


            if ( this.offset && this.offset.enabled  ) {
                PolygonOffset.enable();

                if ( this.offset.fillSet )              this.offset.setFill();
                else                                    this.offset.unsetFill();

            } else PolygonOffset.disable();


            if ( this.multisample && this.multisample.enabled ) {
                Multisample.enable();

                if ( this.multisample.alphaEnabled )    this.multisample.enableAlpha();
                else                                    this.multisample.disableAlpha();

                if ( this.multisample.coverageSet )     this.multisample.setCoverage();
                else                                    this.multisample.unsetCoverage();

            } else Multisample.disable();


            if ( this.scissor && this.scissor.enabled ) {
                ScissorTest.enable();

                if ( this.scissor.dimensionsSet )       this.scissor.setDimensions();
                else                                    this.scissor.unsetDimensions();

            } else ScissorTest.disable();


            if ( this.stencil && this.stencil.enabled ) {
                StencilTest.enable();
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
            } else StencilTest.disable();
            

            return this;
        }
    }

    return Material;
});