System.registerModule("../src/utilities/ULPropertyDescriptors", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULPropertyDescriptors";
  var E = 1;
  var C = 2;
  var W = 4;
  function Properties(target, values, descriptorMask) {
    var descriptor = {};
    if (descriptorMask & E)
      descriptor.enumerable = true;
    if (descriptorMask & C)
      descriptor.configurable = true;
    if (descriptorMask & W)
      descriptor.writable = true;
    for (var p in values) {
      descriptor.value = values[p];
      Object.defineProperty(target, p, descriptor);
    }
  }
  function Getters(target, getters, descriptorMask) {
    var descriptor = {};
    if (descriptorMask & E)
      descriptor.enumerable = true;
    if (descriptorMask & C)
      descriptor.configurable = true;
    for (var p in getters) {
      descriptor.get = getters[p];
      Object.defineProperty(target, p, descriptor);
    }
  }
  function Setters(target, setters, descriptorMask) {
    var descriptor = {};
    if (descriptorMask & E)
      descriptor.enumerable = true;
    if (descriptorMask & C)
      descriptor.configurable = true;
    for (var p in setters) {
      descriptor.set = getters[p];
      Object.defineProperty(target, p, descriptor);
    }
  }
  function GetterSetters(target, getters, setters, descriptorMask) {
    var descriptor = {};
    if (descriptorMask & E)
      descriptor.enumerable = true;
    if (descriptorMask & C)
      descriptor.configurable = true;
    for (var p in setters) {
      descriptor.get = getters[p];
      descriptor.set = setters[p];
      Object.defineProperty(target, p, descriptor);
    }
  }
  return {
    get E() {
      return E;
    },
    get C() {
      return C;
    },
    get W() {
      return W;
    },
    get Properties() {
      return Properties;
    },
    get Getters() {
      return Getters;
    },
    get Setters() {
      return Setters;
    },
    get GetterSetters() {
      return GetterSetters;
    }
  };
});
System.registerModule("../src/GLContext", [], function() {
  "use strict";
  var __moduleName = "../src/GLContext";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var GL = WebGLRenderingContext.prototype;
  var canvas = document.createElement("canvas");
  var gl = canvas.getContext("webgl", {
    alpha: true,
    depth: true
  });
  var ExtensionLoader = function ExtensionLoader() {};
  ($traceurRuntime.createClass)(ExtensionLoader, {}, {});
  ;
  gl.getSupportedExtensions().forEach(function(extension) {
    Object.defineProperty(this, extension, {
      enumerable: true,
      configurable: true,
      get: function() {
        var resolved = gl.getExtension(extension);
        Object.defineProperty(this, extension, {
          enumerable: true,
          value: resolved
        });
        return resolved;
      }
    });
  }, ExtensionLoader.prototype);
  var extensions = new ExtensionLoader;
  var textureUnit = new (function() {
    var TextureUnit = function TextureUnit() {};
    return ($traceurRuntime.createClass)(TextureUnit, {
      get getGenerateMipmapHintFlag() {
        return gl.flags[this.getGenerateMipmapHint];
      },
      get getImplementationColorReadTypeFlag() {
        return gl.flags[this.getImplementationColorReadType];
      },
      get getUnpackColorspaceConversionWebGLFlag() {
        return gl.flags[this.getUnpackColorspaceConversionWebGL];
      },
      get getImplementationColorReadFormatFlag() {
        return gl.flags[this.getImplementationColorReadFormat];
      },
      get getActiveTextureUnit() {
        return gl.getParameter(GL.ACTIVE_TEXTURE) - GL.TEXTURE0;
      },
      get getActiveTexture() {
        return gl.getParameter(GL.ACTIVE_TEXTURE);
      },
      get getUnpackAlignment() {
        return gl.getParameter(GL.UNPACK_ALIGNMENT);
      },
      get getPackAlignment() {
        return gl.getParameter(GL.PACK_ALIGNMENT);
      },
      get getUnpackColorspaceConversionWebGL() {
        return gl.getParameter(GL.UNPACK_COLORSPACE_CONVERSION_WEBGL);
      },
      get getUnpackFlipYWebGL() {
        return gl.getParameter(GL.UNPACK_FLIP_Y_WEBGL);
      },
      get getUnpackPremultiplyAlphaWebGL() {
        return gl.getParameter(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
      },
      get getCompressedTextureFormats() {
        return gl.getParameter(GL.COMPRESSED_TEXTURE_FORMATS);
      },
      get getGenerateMipmapHint() {
        return gl.getParameter(GL.GENERATE_MIPMAP_HINT);
      },
      get getImplementationColorReadFormat() {
        return gl.getParameter(GL.IMPLEMENTATION_COLOR_READ_FORMAT);
      },
      get getImplementationColorReadType() {
        return gl.getParameter(GL.IMPLEMENTATION_COLOR_READ_TYPE);
      }
    }, {});
  }());
  var bindings = new (function() {
    var Bindings = function Bindings() {};
    return ($traceurRuntime.createClass)(Bindings, {
      get getActiveProgram() {
        return gl.getParameter(GL.CURRENT_PROGRAM);
      },
      get getArrayBuffer() {
        return gl.getParameter(GL.ARRAY_BUFFER_BINDING);
      },
      get getElementArrayBuffer() {
        return gl.getParameter(GL.ELEMENT_ARRAY_BUFFER_BINDING);
      },
      get getTexture2D() {
        return gl.getParameter(GL.TEXTURE_BINDING_2D);
      },
      get getTextureCubeMap() {
        return gl.getParameter(GL.TEXTURE_BINDING_CUBE_MAP);
      },
      get getFramebuffer() {
        return gl.getParameter(GL.FRAMEBUFFER_BINDING);
      },
      get getRenderbuffer() {
        return gl.getParameter(GL.RENDERBUFFER_BINDING);
      }
    }, {});
  }());
  var capabilities = new (function() {
    var Capabilities = function Capabilities() {};
    return ($traceurRuntime.createClass)(Capabilities, {
      get getMaxVertexAttribs() {
        return gl.getParameter(GL.MAX_VERTEX_ATTRIBS);
      },
      get getMaxCombinedTextureImageUnits() {
        return gl.getParameter(GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      },
      get getMaxCubeMaptextureSize() {
        return gl.getParameter(GL.MAX_CUBE_MAP_TEXTURE_SIZE);
      },
      get getMaxFragmentUniformVectors() {
        return gl.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS);
      },
      get getMaxVertexUniformVectors() {
        return gl.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS);
      },
      get getMaxRenderbufferSize() {
        return gl.getParameter(GL.MAX_RENDERBUFFER_SIZE);
      },
      get getMaxtextureImageUnits() {
        return gl.getParameter(GL.MAX_TEXTURE_IMAGE_UNITS);
      },
      get getMaxTextureSize() {
        return gl.getParameter(GL.MAX_TEXTURE_SIZE);
      },
      get getMaxVaryingVectors() {
        return gl.getParameter(GL.MAX_VARYING_VECTORS);
      },
      get getMaxVertexTextureImageUnits() {
        return gl.getParameter(GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      },
      get getMaxViewportDims() {
        return gl.getParameter(GL.MAX_VIEWPORT_DIMS);
      },
      get getAliasedLineWidthRange() {
        return gl.getParameter(GL.ALIASED_LINE_WIDTH_RANGE);
      },
      get getAliasedPointSizeRange() {
        return gl.getParameter(GL.ALIASED_POINT_SIZE_RANGE);
      }
    }, {});
  }());
  var draw = new (function() {
    var Draw = function Draw() {};
    return ($traceurRuntime.createClass)(Draw, {
      setClearDepth: function(depth) {
        gl.clearDepth(depth);
        return this;
      },
      setClearStencil: function(stencil) {
        gl.clearStencil(stencil);
        return this;
      },
      setClearColor: function(red, green, blue, alpha) {
        gl.clearColor(red, green, blue, alpha);
        return this;
      },
      clear: function() {
        var mask = arguments[0] !== (void 0) ? arguments[0] : GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT;
        gl.clear(mask);
        return this;
      },
      drawArrays: function(mode, first, count) {
        gl.drawArrays(mode, first, count);
        return this;
      },
      drawElements: function(mode, count, type, indices) {
        gl.drawElements(mode, count, type, indices);
        return this;
      },
      setLineWidth: function(width) {
        gl.lineWidth(width);
        return this;
      },
      get getStencilClear() {
        return gl.getParameter(GL.STENCIL_CLEAR_VALUE);
      },
      get getDepthClear() {
        return gl.getParameter(GL.DEPTH_CLEAR_VALUE);
      },
      get getColorClear() {
        return gl.getParameter(GL.COLOR_CLEAR_VALUE);
      },
      get getRedBits() {
        return gl.getParameter(GL.RED_BITS);
      },
      get getGreenBits() {
        return gl.getParameter(GL.GREEN_BITS);
      },
      get getBlueBits() {
        return gl.getParameter(GL.BLUE_BITS);
      },
      get getAlphaBits() {
        return gl.getParameter(GL.ALPHA_BITS);
      },
      get getSubpixelBits() {
        return gl.getParameter(GL.SUBPIXEL_BITS);
      },
      get getDepthBits() {
        return gl.getParameter(GL.DEPTH_BITS);
      },
      get getStencilBits() {
        return gl.getParameter(GL.STENCIL_BITS);
      },
      get getColorWritemask() {
        return gl.getParameter(GL.COLOR_WRITEMASK);
      },
      get getLineWidth() {
        return gl.getParameter(GL.LINE_WIDTH);
      }
    }, {});
  }());
  var viewport = new (function() {
    var Viewport = function Viewport() {};
    return ($traceurRuntime.createClass)(Viewport, {
      setViewport: function() {
        var x = arguments[0] !== (void 0) ? arguments[0] : 0;
        var y = arguments[1] !== (void 0) ? arguments[1] : 0;
        var width = arguments[2] !== (void 0) ? arguments[2] : canvas.clientWidth;
        var height = arguments[3] !== (void 0) ? arguments[3] : canvas.clientHeight;
        gl.viewport(x, y, width, height);
        return this;
      },
      get getViewport() {
        return gl.getParameter(GL.VIEWPORT);
      }
    }, {});
  }());
  Object.defineProperties(GL, {
    getShadingLanguageVersion: {get: function() {
        return gl.getParameter(GL.SHADING_LANGUAGE_VERSION);
      }},
    getVersion: {get: function() {
        return gl.getParameter(GL.VERSION);
      }},
    getVendor: {get: function() {
        return gl.getParameter(GL.VENDOR);
      }},
    getRenderer: {get: function() {
        return gl.getParameter(GL.RENDERER);
      }},
    options: {value: {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false
      }},
    setOptions: {value: function(options) {
        this.options = options || this.options;
        gl = canvas.getContext("webgl", this.options) || canvas.getContext("experimental-webgl", this.options);
        return this;
      }},
    setQuality: {value: function(v) {
        isNaN(v) ? v = 2 : v = v || 2;
        this.quality = v;
        canvas.width = canvas.clientWidth / v;
        canvas.height = canvas.clientHeight / v;
        return this;
      }}
  });
  GL.flags = [];
  for (var e = void 0 in GL) {
    if (typeof GL[e] === "number")
      GL.flags[GL[e]] = e;
  }
  return {
    get GL() {
      return GL;
    },
    get canvas() {
      return canvas;
    },
    get gl() {
      return gl;
    },
    get extensions() {
      return extensions;
    },
    get textureUnit() {
      return textureUnit;
    },
    get bindings() {
      return bindings;
    },
    get capabilities() {
      return capabilities;
    },
    get draw() {
      return draw;
    },
    get viewport() {
      return viewport;
    }
  };
});
System.registerModule("../src/GLActiveInfo", [], function() {
  "use strict";
  var __moduleName = "../src/GLActiveInfo";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      GL = $__0.GL;
  Object.defineProperties(WebGLActiveInfo.prototype, {typeFlag: {get: function() {
        return gl.flags[this.type];
      }}});
  return {};
});
System.registerModule("../src/GLAttributeLocation", [], function() {
  "use strict";
  var __moduleName = "../src/GLAttributeLocation";
  var gl = System.get("../src/GLContext").gl;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var GL = WebGLRenderingContext.prototype;
  var AttributeLocation = function AttributeLocation(index, info) {
    this.index = index;
    if (info)
      this.info = info;
  };
  ($traceurRuntime.createClass)(AttributeLocation, {
    updateActiveInfo: function(program) {
      this.info = program.getActiveAttrib(this.index);
      return this;
    },
    setFloat: function(f1, f2, f3, f4) {
      f4 !== undefined ? gl.vertexAttrib4f(this.index, f1, f2, f3, f4) : f3 !== undefined ? gl.vertexAttrib3f(this.index, f1, f2, f3) : f2 !== undefined ? gl.vertexAttrib2f(this.index, f1, f2) : f1 !== undefined ? gl.vertexAttrib1f(this.index, f1) : console.warn("setFloat expects 1-4 arguments");
      return this;
    },
    setFloatVector: function(v) {
      var size = arguments[1] !== (void 0) ? arguments[1] : 4;
      switch (size) {
        case 4:
          gl.vertexAttrib4fv(this, v);
          break;
        case 3:
          gl.vertexAttrib3fv(this, v);
          break;
        case 2:
          gl.vertexAttrib2fv(this, v);
          break;
        case 1:
          gl.vertexAttrib1fv(this, v);
          break;
        default:
          console.warn("setFloatVector expects size 1-4");
          break;
      }
      return this;
    },
    enable: function() {
      gl.enableVertexAttribArray(this.index);
      return this;
    },
    disable: function() {
      gl.disableVertexAttribArray(this.index);
      return this;
    },
    setSize: function(size, offset, stride, type, normalized) {
      Object.defineProperty(this, "size", {
        value: size,
        enumerable: true,
        configurable: true
      });
      return this;
    },
    setStride: function(stride) {
      Object.defineProperty(this, "stride", {
        value: stride,
        enumerable: true,
        configurable: true
      });
      return this;
    },
    setOffset: function(offset) {
      Object.defineProperty(this, "offset", {
        value: offset,
        enumerable: true,
        configurable: true
      });
      return this;
    },
    setType: function(type) {
      Object.defineProperty(this, "type", {
        value: type,
        enumerable: true,
        configurable: true
      });
      return this;
    },
    setNormalized: function(normalized) {
      Object.defineProperty(this, "normalized", {
        value: normalized,
        enumerable: true,
        configurable: true,
        writeable: true
      });
      return this;
    },
    setPointer: function() {
      var size = arguments[0] !== (void 0) ? arguments[0] : 4;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      var stride = arguments[2] !== (void 0) ? arguments[2] : 0;
      var type = arguments[3] !== (void 0) ? arguments[3] : GL.FLOAT;
      var normalized = arguments[4] !== (void 0) ? arguments[4] : false;
      gl.vertexAttribPointer(this.index, size, type, normalized, stride, offset);
      return this;
    },
    applyPointer: function() {
      gl.vertexAttribPointer(this.index, this.size, this.type, this.normalized, this.stride, this.offset);
      return this;
    }
  }, {});
  var $__default = AttributeLocation;
  ;
  var getters = {
    getCurrentVertexAtrrib: function() {
      return gl.getVertexAttrib(this.index, gl.CURRENT_VERTEX_ATTRIB);
    },
    getBuffer: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
    },
    getEnabled: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_ENABLED);
    },
    getSize: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_SIZE);
    },
    getStride: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_STRIDE);
    },
    getNormalized: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED);
    },
    getType: function() {
      return gl.getVertexAttrib(this.index, gl.VERTEX_ATTRIB_ARRAY_TYPE);
    },
    getTypeFlag: function() {
      return gl.flags[this.getType];
    },
    getOffset: function() {
      return gl.getVertexAttribOffset(this.index, gl.VERTEX_ATTRIB_ARRAY_POINTER);
    }
  };
  for (var p in getters)
    Object.defineProperty(AttributeLocation.prototype, p, {get: getters[p]});
  Object.defineProperties(AttributeLocation.prototype, {
    size: {
      value: 4,
      enumerable: true
    },
    offset: {
      value: 0,
      enumerable: true
    },
    stride: {
      value: 0,
      enumerable: true
    },
    type: {
      value: GL.FLOAT,
      enumerable: true
    },
    normalized: {
      value: false,
      enumerable: true
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/GLShader", [], function() {
  "use strict";
  var __moduleName = "../src/GLShader";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      GL = $__0.GL;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var Shader = function Shader(type, code) {
    var s = gl.createShader(type);
    if (code)
      s.setShaderSource(code);
    return s;
  };
  var $Shader = Shader;
  ($traceurRuntime.createClass)(Shader, {}, {
    Fragment: function(code) {
      return $Shader(GL.FRAGMENT_SHADER, code);
    },
    Vertex: function(code) {
      return $Shader(GL.VERTEX_SHADER, code);
    }
  });
  var $__default = Shader;
  var PROTOTYPE = WebGLShader.prototype;
  var METHODS = {
    delete: function() {
      gl.deleteShader(this);
      return this;
    },
    compile: function() {
      gl.compileShader(this);
      return this;
    },
    setShaderSource: function(code) {
      gl.shaderSource(this, code);
      this.compile();
      if (!this.getCompileStatus)
        throw new Error(this.getInfoLog);
      return this;
    }
  };
  var ACCESSORS = {
    getPrecisionFormatLowFloat: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.LOW_FLOAT);
      }},
    getPrecisionFormatMediumFloat: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_FLOAT);
      }},
    getPrecisionFormatHighFloat: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_FLOAT);
      }},
    getPrecisionFormatLowInt: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.LOW_INT);
      }},
    getPrecisionFormatMediumInt: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_INT);
      }},
    getPrecisionFormatHighInt: {get: function() {
        return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_INT);
      }},
    getTypeFlag: {get: function() {
        return gl.flags[gl.getShaderParameter(this, GL.SHADER_TYPE)];
      }},
    getType: {get: function() {
        return gl.getShaderParameter(this, GL.SHADER_TYPE);
      }},
    getDeleteStatus: {get: function() {
        return gl.getShaderParameter(this, GL.DELETE_STATUS);
      }},
    getCompileStatus: {get: function() {
        return gl.getShaderParameter(this, GL.COMPILE_STATUS);
      }},
    getSource: {get: function() {
        return gl.getShaderSource(this);
      }},
    getInfoLog: {get: function() {
        return gl.getShaderInfoLog(this);
      }}
  };
  for (var p = void 0 in METHODS)
    PROTOTYPE[p] = METHODS[p];
  Object.defineProperties(PROTOTYPE, ACCESSORS);
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/GLUniformLocation", [], function() {
  "use strict";
  var __moduleName = "../src/GLUniformLocation";
  var gl = System.get("../src/GLContext").gl;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var GL = WebGLRenderingContext.prototype;
  var methods = {
    set1f: function(f) {
      gl.uniform1f(this, f);
      return this;
    },
    set2f: function(f) {
      var $__2;
      ($__2 = gl).uniform2f.apply($__2, $traceurRuntime.spread([this], f));
      return this;
    },
    set3f: function(f) {
      var $__2;
      ($__2 = gl).uniform3f.apply($__2, $traceurRuntime.spread([this], f));
      return this;
    },
    set4f: function(f) {
      var $__2;
      ($__2 = gl).uniform4f.apply($__2, $traceurRuntime.spread([this], f));
      return this;
    },
    set1i: function(i) {
      gl.uniform1i(this, i);
      return this;
    },
    set2i: function(i) {
      var $__2;
      ($__2 = gl).uniform2i.apply($__2, $traceurRuntime.spread([this], i));
      return this;
    },
    set3i: function(i) {
      var $__2;
      ($__2 = gl).uniform3i.apply($__2, $traceurRuntime.spread([this], i));
      return this;
    },
    set4i: function(i) {
      var $__2;
      ($__2 = gl).uniform4i.apply($__2, $traceurRuntime.spread([this], i));
      return this;
    },
    set1fv: function(v) {
      gl.uniform1fv(this, v);
      return this;
    },
    set2fv: function(v) {
      gl.uniform2fv(this, v);
      return this;
    },
    set3fv: function(v) {
      gl.uniform3fv(this, v);
      return this;
    },
    set4fv: function(v) {
      gl.uniform4fv(this, v);
      return this;
    },
    set1iv: function(v) {
      gl.uniform1iv(this, v);
      return this;
    },
    set2iv: function(v) {
      gl.uniform2iv(this, v);
      return this;
    },
    set3iv: function(v) {
      gl.uniform3iv(this, v);
      return this;
    },
    set4iv: function(v) {
      gl.uniform4iv(this, v);
      return this;
    },
    setMat2: function(m, transpose) {
      gl.uniformMatrix2fv(this, transpose, m);
      return this;
    },
    setMat3: function(m, transpose) {
      gl.uniformMatrix3fv(this, transpose, m);
      return this;
    },
    setMat4: function(m, transpose) {
      gl.uniformMatrix4fv(this, transpose, m);
      return this;
    },
    setFloat: function(f1, f2, f3, f4) {
      f4 !== undefined ? gl.uniform4f(this, f1, f2, f3, f4) : f3 !== undefined ? gl.uniform3f(this, f1, f2, f3) : f2 !== undefined ? gl.uniform2f(this, f1, f2) : f1 !== undefined ? gl.uniform1f(this, f1) : console.warn("setFloat expects 1-4 arguments");
      return this;
    },
    setFloatVector: function(v) {
      var size = arguments[1] !== (void 0) ? arguments[1] : 4;
      switch (size) {
        case 4:
          gl.uniform4fv(this, v);
          break;
        case 3:
          gl.uniform3fv(this, v);
          break;
        case 2:
          gl.uniform2fv(this, v);
          break;
        case 1:
          gl.uniform1fv(this, v);
          break;
        default:
          console.warn("setFloatVector expects size 1-4");
          break;
      }
      return this;
    },
    setInt: function(i1, i2, i3, i4) {
      i4 !== undefined ? gl.uniform4i(this, i1, i2, i3, i4) : i3 !== undefined ? gl.uniform3i(this, i1, i2, i3) : i2 !== undefined ? gl.uniform2i(this, i1, i2) : i1 !== undefined ? gl.uniform1i(this, i1) : console.warn("setInt expects 1-4 arguments");
      return this;
    },
    setIntVector: function(v) {
      var size = arguments[1] !== (void 0) ? arguments[1] : 4;
      switch (size) {
        case 4:
          gl.uniform4iv(this, v);
          break;
        case 3:
          gl.uniform3iv(this, v);
          break;
        case 2:
          gl.uniform2iv(this, v);
          break;
        case 1:
          gl.uniform1iv(this, v);
          break;
        default:
          console.warn("setIntVector expects size 1-4");
          break;
      }
      return this;
    },
    setMatrix: function(m) {
      var transpose = arguments[1] !== (void 0) ? arguments[1] : false;
      switch (m.length) {
        case 4:
          gl.uniformMatrix2fv(this, transpose, m);
          break;
        case 9:
          gl.uniformMatrix3fv(this, transpose, m);
          break;
        case 16:
          gl.uniformMatrix4fv(this, transpose, m);
          break;
        default:
          console.warn("setMatrix expects a typed array with length 4, 9 or 16");
          break;
      }
      return this;
    }
  };
  for (var m in methods)
    Object.defineProperty(WebGLUniformLocation.prototype, m, {value: methods[m]});
  return {};
});
System.registerModule("../src/math/MLVector", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "../src/math/MLVector";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var Vector = function Vector() {
    this.length = 0;
    [].push.apply(this, arguments);
    Object.defineProperty(this, "length", {value: arguments.length});
  };
  var $Vector = Vector;
  ($traceurRuntime.createClass)(Vector, ($__2 = {}, Object.defineProperty($__2, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__3() {
      var index;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              index = 0;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (index < this.length) ? 1 : -2;
              break;
            case 1:
              $ctx.state = 2;
              return this[index++];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 7;
              break;
            default:
              return $ctx.end();
          }
      }, $__3, this);
    }),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {clone: function(vA) {
      return new $Vector(vA);
    }});
  var $__default = Vector;
  Properties(Vector.prototype, {
    splice: [].splice,
    clone: function() {
      return new this.constructor().set(this);
    },
    set: function(vA) {
      for (var i = void 0 in vA)
        this[i] = vA[i];
    },
    add: function(vA) {
      for (var i = void 0 in vA)
        this[i] += vA[i];
      return this;
    },
    sub: function(vA) {
      for (var i = void 0 in vA)
        this[i] -= vA[i];
      return this;
    },
    multiply: function(vA) {
      for (var i = void 0 in vA)
        this[i] *= vA[i];
      return this;
    },
    multiplyScalar: function(s) {
      for (var i = void 0 in this)
        this[i] *= s;
      return this;
    },
    lerp: function(vA, s) {
      for (var i = void 0 in this)
        this[i] += (vA[i] - this[i]) * s;
      return this;
    },
    dot: function(vA) {
      return [].reduce.call(this, function(p, c, i) {
        return p += c * vA[i];
      }, 0);
    },
    normalize: function() {
      var l = this.vectorLength;
      if (l === 0)
        return this;
      else
        this.multiplyScalar(1 / l);
      return this;
    }
  });
  Getters(Vector.prototype, {
    getLength: function() {
      return Math.sqrt(this.getLengthSq);
    },
    getLengthSq: function() {
      return [].reduce.call(this, function(p, c) {
        return p += c * c;
      }, 0);
    },
    getLengthManhattan: function() {
      return [].reduce.call(this, function(p, c) {
        return p += Math.abs(c);
      }, 0);
    }
  });
  var vec2 = function vec2(x, y) {
    Object.defineProperty(this, "length", {value: 2});
    this[0] = x || 0;
    this[1] = y || 0;
  };
  var $vec2 = vec2;
  ($traceurRuntime.createClass)(vec2, {}, {
    copy: function(vA) {
      return new $vec2().set(vA);
    },
    add: function(vA, vB) {
      return new $vec2().add(vA, vB);
    },
    sub: function(vA, vB) {
      return new $vec2().sub(vA, vB);
    },
    multiply: function(vA, vB) {
      return new $vec2().multiply(vA, vB);
    },
    dot: function(vA, vB) {
      return vA[0] * vB[0] + vA[1] * vB[1];
    }
  }, Vector);
  Properties(vec2.prototype, {
    add: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      var v = this;
      v[0] = vA[0] + vB[0];
      v[1] = vA[1] + vB[1];
      return this;
    },
    sub: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      var v = this;
      v[0] = vB[0] - vA[0];
      v[1] = vB[1] - vA[1];
      return this;
    },
    multiply: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      var v = this;
      v[0] = vA[0] * vB[0];
      v[1] = vA[1] * vB[1];
      return this;
    },
    dot: function(vA) {
      return vec2.dot(this, vA);
    }
  });
  var vec3 = function vec3(x, y, z) {
    Object.defineProperty(this, "length", {value: 3});
    this[0] = x || 0;
    this[1] = y || 0;
    this[2] = z || 0;
  };
  var $vec3 = vec3;
  ($traceurRuntime.createClass)(vec3, {}, {
    clone: function(vA) {
      return new $vec3().set(vA);
    },
    add: function(vA, vB) {
      return new $vec3().add(vA, vB);
    },
    sub: function(vA, vB) {
      return new $vec3().sub(vA, vB);
    },
    multiply: function(vA, vB) {
      return new $vec3().multiply(vA, vB);
    },
    cross: function(vA, vB) {
      return new $vec3().cross(vA, vB);
    },
    dot: function(vA, vB) {
      return s = vA[0] * vB[0] + vA[1] * vB[1] + vA[2] * vB[2];
    }
  }, Vector);
  Properties(vec3.prototype, {
    set: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
      this[2] = vA[2];
      return this;
    },
    add: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vA[0] + vB[0];
      this[1] = vA[1] + vB[1];
      this[2] = vA[2] + vB[2];
      return this;
    },
    sub: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vB[0] - vA[0];
      this[1] = vB[1] - vA[1];
      this[2] = vB[2] - vA[2];
      return this;
    },
    multiply: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vA[0] * vB[0];
      this[1] = vA[1] * vB[1];
      this[2] = vA[2] * vB[2];
      return this;
    },
    cross: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : vec3.copy(this);
      this[0] = vA[1] * vB[2] - vA[2] * vB[1];
      this[1] = vA[2] * vB[0] - vA[0] * vB[2];
      this[2] = vA[0] * vB[1] - vA[1] * vB[0];
      return this;
    },
    applyQuat4: function(q) {
      var x = q[3] * v[0] + q[1] * v[2] - q[2] * v[1];
      var y = q[3] * v[1] + q[2] * v[0] - q[0] * v[2];
      var z = q[3] * v[2] + q[0] * v[1] - q[1] * v[0];
      var w = q[0] * v[0] - q[1] * v[1] - q[2] * v[2];
      this[0] = x * q[3] + w * -q[0] + y * -q[2] - z * -q[1];
      this[1] = y * q[3] + w * -q[1] + z * -q[0] - x * -q[2];
      this[2] = z * q[3] + w * -q[2] + x * -q[1] - y * -q[0];
      return this;
    },
    dot: function(vA) {
      return vec3.dot(this, vA);
    }
  });
  var vec4 = function vec4(x, y, z, w) {
    Object.defineProperty(this, "length", {value: 4});
    this[0] = x || 0;
    this[1] = y || 0;
    this[2] = z || 0;
    this[3] = w || 0;
  };
  var $vec4 = vec4;
  ($traceurRuntime.createClass)(vec4, {}, {
    clone: function(vA) {
      return new $vec4().copy(vA);
    },
    add: function(vA, vB) {
      return new $vec4().add(vA, vB);
    },
    sub: function(vA, vB) {
      return new $vec4().sub(vA, vB);
    },
    multiply: function(vA, vB) {
      return new $vec4().multiply(vA, vB);
    },
    dot: function(vA, vB) {
      return vA[0] * vB[0] + vA[1] * vB[1] + vA[2] * vB[2] + vA[3] * vB[3];
    }
  }, Vector);
  Properties(vec4.prototype, {
    set: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
      this[2] = vA[2];
      this[3] = vA[3];
      return this;
    },
    add: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vA[0] + vB[0];
      this[1] = vA[1] + vB[1];
      this[2] = vA[2] + vB[2];
      this[3] = vA[3] + vB[3];
      return this;
    },
    sub: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vB[0] - vA[0];
      this[1] = vB[1] - vA[1];
      this[2] = vB[2] - vA[2];
      this[3] = vB[3] - vA[3];
      return this;
    },
    multiply: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      this[0] = vA[0] * vB[0];
      this[1] = vA[1] * vB[1];
      this[2] = vA[2] * vB[2];
      this[3] = vA[3] * vB[3];
      return this;
    },
    copy: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
      this[2] = vA[2];
      this[3] = vA[3];
      return this;
    },
    dot: function(vB) {
      return vec4.dot(this, vB);
    }
  });
  var quat4 = function quat4() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 0;
    var y = arguments[1] !== (void 0) ? arguments[1] : 0;
    var z = arguments[2] !== (void 0) ? arguments[2] : 0;
    var w = arguments[3] !== (void 0) ? arguments[3] : 1;
    Object.defineProperty(this, "length", {value: 4});
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
  };
  var $quat4 = quat4;
  ($traceurRuntime.createClass)(quat4, {}, {
    clone: function(vA) {
      return new $quat4().set(vA);
    },
    axisAngle: function(axis, angle) {
      return new $quat4().axisAngle(axis, angle);
    },
    multiply: function(qA, qB) {
      return new $quat4().multiply(qA, qB);
    }
  }, Vector);
  Properties(quat4.prototype, {
    set: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
      this[2] = vA[2];
      this[3] = vA[3];
      return this;
    },
    identity: function() {
      this[0] = 0;
      this[1] = 0;
      this[2] = 0;
      this[3] = 1;
      return this;
    },
    multiply: function(qA) {
      var qB = arguments[1] !== (void 0) ? arguments[1] : quat4.clone(this);
      this[0] = qB[0] * qA[3] + qB[3] * qA[0] + qB[1] * qA[2] - qB[2] * qA[1];
      ;
      this[1] = qB[1] * qA[3] + qB[3] * qA[1] + qB[2] * qA[0] - qB[0] * qA[2];
      ;
      this[2] = qB[2] * qA[3] + qB[3] * qA[2] + qB[0] * qA[1] - qB[1] * qA[0];
      ;
      this[3] = qB[3] * qA[3] - qB[3] * qA[0] - qB[1] * qA[1] - qB[2] * qA[2];
      ;
      return this;
    },
    normalize: function() {
      var l = this.getLength;
      if (l === 0)
        return this.identity();
      else
        return this.multiplyScalar(1 / l);
    },
    conjugate: function() {
      this[0] *= -1;
      this[1] *= -1;
      this[2] *= -1;
      return this;
    },
    axisAngle: function(v3Axis, sAngle) {
      var a = sAngle * .5;
      var s = Math.sin(a);
      var c = Math.cos(a);
      this[0] = v3Axis[0] * s;
      this[1] = v3Axis[1] * s;
      this[2] = v3Axis[2] * s;
      this[3] = c;
      return this;
    }
  });
  ["x", "y", "z", "w"].map(function(ex, x, a) {
    var getter = "return this[" + x + "];";
    var setter = "this[" + x + "] = v;";
    if (x < 2)
      $(vec2, a[x], getter, setter);
    if (x < 3)
      $(vec3, a[x], getter, setter);
    $(vec4, a[x], getter, setter);
    $(quat4, a[x], getter, setter);
    function $(constructor, property, getter, setter) {
      Object.defineProperty(constructor.prototype, property, {
        get: new Function(getter),
        set: new Function("v", setter)
      });
    }
  });
  return {
    get default() {
      return $__default;
    },
    get vec2() {
      return vec2;
    },
    get vec3() {
      return vec3;
    },
    get vec4() {
      return vec4;
    },
    get quat4() {
      return quat4;
    }
  };
});
System.registerModule("../src/math/MLMatrix", [], function() {
  "use strict";
  var __moduleName = "../src/math/MLMatrix";
  var $__0 = System.get("../src/math/MLVector"),
      vec3 = $__0.vec3,
      vec4 = $__0.vec4,
      quat4 = $__0.quat4;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var mat4 = function mat4() {
    for (var data = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      data[$__3] = arguments[$__3];
    var width = 4;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Properties(this, {
      data: new Float32Array(buffer),
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width),
      3: new Float32Array(buffer, 3 * elementSize * width, width)
    }, E);
    data.length ? this.data.set(data) : this.identity();
  };
  var $mat4 = mat4;
  ($traceurRuntime.createClass)(mat4, {}, {
    clone: function(m) {
      return new $mat4().set(m.data);
    },
    multiply: function(a, b) {
      return new $mat4().multiply(a, b);
    },
    multiplyScalar: function(m, s) {
      return new $mat4.clone(m).multiplyScalar(s);
    },
    lookAt: function(m, eye, target, up) {
      return new $mat4.clone(m).lookAt(eye, target, up);
    },
    frustum: function(left, right, bottom, top, near, far) {
      var $__6;
      return ($__6 = new $mat4()).frustum.apply($__6, $traceurRuntime.spread(arguments));
    },
    perspective: function(aspect, fov, near, far) {
      var $__6;
      return ($__6 = new $mat4()).perspective.apply($__6, $traceurRuntime.spread(arguments));
    },
    translation: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      return new $mat4().translation(x, y, z);
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return new $mat4().scale(x, y, z);
    },
    rotationX: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      return new $mat4().rotationX(a);
    },
    rotationY: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      return new $mat4().rotationY(a);
    },
    rotationZ: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      return new $mat4().rotationZ(a);
    },
    rotationQuat4: function(quat) {
      return new $mat4().rotationQuat4(quat);
    }
  });
  Properties(mat4.prototype, {
    length: 4,
    set: function(m) {
      this.data.set(m);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT4.set(this);
      var m = this;
      m[0][0] = a[0][0];
      m[0][1] = a[1][0];
      m[0][2] = a[2][0];
      m[0][3] = a[3][0];
      m[1][0] = a[0][1];
      m[1][1] = a[1][1];
      m[1][2] = a[2][1];
      m[1][3] = a[3][1];
      m[2][0] = a[0][2];
      m[2][1] = a[1][2];
      m[2][2] = a[2][2];
      m[2][3] = a[3][2];
      m[3][0] = a[0][3];
      m[3][1] = a[1][3];
      m[3][2] = a[2][3];
      m[3][3] = a[3][3];
      return this;
    },
    identity: function() {
      var m = this;
      m[0][0] = 1;
      m[0][1] = 0;
      m[0][2] = 0;
      m[0][3] = 0;
      m[1][0] = 0;
      m[1][1] = 1;
      m[1][2] = 0;
      m[1][3] = 0;
      m[2][0] = 0;
      m[2][1] = 0;
      m[2][2] = 1;
      m[2][3] = 0;
      m[3][0] = 0;
      m[3][1] = 0;
      m[3][2] = 0;
      m[3][3] = 1;
      return this;
    },
    inverse: function() {
      var m = this;
      var a = CACHE_MAT4.transpose(this);
      m[0][0] = a[1][2] * a[2][3] * a[3][1] - a[1][3] * a[2][2] * a[3][1] + a[1][3] * a[2][1] * a[3][2] - a[1][1] * a[2][3] * a[3][2] - a[1][2] * a[2][1] * a[3][3] + a[1][1] * a[2][2] * a[3][3];
      m[1][0] = a[0][3] * a[2][2] * a[3][1] - a[0][2] * a[2][3] * a[3][1] - a[0][3] * a[2][1] * a[3][2] + a[0][1] * a[2][3] * a[3][2] + a[0][2] * a[2][1] * a[3][3] - a[0][1] * a[2][2] * a[3][3];
      m[2][0] = a[0][2] * a[1][3] * a[3][1] - a[0][3] * a[1][2] * a[3][1] + a[0][3] * a[1][1] * a[3][2] - a[0][1] * a[1][3] * a[3][2] - a[0][2] * a[1][1] * a[3][3] + a[0][1] * a[1][2] * a[3][3];
      m[3][0] = a[0][3] * a[1][2] * a[2][1] - a[0][2] * a[1][3] * a[2][1] - a[0][3] * a[1][1] * a[2][2] + a[0][1] * a[1][3] * a[2][2] + a[0][2] * a[1][1] * a[2][3] - a[0][1] * a[1][2] * a[2][3];
      m[0][1] = a[1][3] * a[2][2] * a[3][0] - a[1][2] * a[2][3] * a[3][0] - a[1][3] * a[2][0] * a[3][2] + a[1][0] * a[2][3] * a[3][2] + a[1][2] * a[2][0] * a[3][3] - a[1][0] * a[2][2] * a[3][3];
      m[1][1] = a[0][2] * a[2][3] * a[3][0] - a[0][3] * a[2][2] * a[3][0] + a[0][3] * a[2][0] * a[3][2] - a[0][0] * a[2][3] * a[3][2] - a[0][2] * a[2][0] * a[3][3] + a[0][0] * a[2][2] * a[3][3];
      m[2][1] = a[0][3] * a[1][2] * a[3][0] - a[0][2] * a[1][3] * a[3][0] - a[0][3] * a[1][0] * a[3][2] + a[0][0] * a[1][3] * a[3][2] + a[0][2] * a[1][0] * a[3][3] - a[0][0] * a[1][2] * a[3][3];
      m[3][1] = a[0][2] * a[1][3] * a[2][0] - a[0][3] * a[1][2] * a[2][0] + a[0][3] * a[1][0] * a[2][2] - a[0][0] * a[1][3] * a[2][2] - a[0][2] * a[1][0] * a[2][3] + a[0][0] * a[1][2] * a[2][3];
      m[0][2] = a[1][1] * a[2][3] * a[3][0] - a[1][3] * a[2][1] * a[3][0] + a[1][3] * a[2][0] * a[3][1] - a[1][0] * a[2][3] * a[3][1] - a[1][1] * a[2][0] * a[3][3] + a[1][0] * a[2][1] * a[3][3];
      m[1][2] = a[0][3] * a[2][1] * a[3][0] - a[0][1] * a[2][3] * a[3][0] - a[0][3] * a[2][0] * a[3][1] + a[0][0] * a[2][3] * a[3][1] + a[0][1] * a[2][0] * a[3][3] - a[0][0] * a[2][1] * a[3][3];
      m[2][2] = a[0][1] * a[1][3] * a[3][0] - a[0][3] * a[1][1] * a[3][0] + a[0][3] * a[1][0] * a[3][1] - a[0][0] * a[1][3] * a[3][1] - a[0][1] * a[1][0] * a[3][3] + a[0][0] * a[1][1] * a[3][3];
      m[3][2] = a[0][3] * a[1][1] * a[2][0] - a[0][1] * a[1][3] * a[2][0] - a[0][3] * a[1][0] * a[2][1] + a[0][0] * a[1][3] * a[2][1] + a[0][1] * a[1][0] * a[2][3] - a[0][0] * a[1][1] * a[2][3];
      m[0][3] = a[1][2] * a[2][1] * a[3][0] - a[1][1] * a[2][2] * a[3][0] - a[1][2] * a[2][0] * a[3][1] + a[1][0] * a[2][2] * a[3][1] + a[1][1] * a[2][0] * a[3][2] - a[1][0] * a[2][1] * a[3][2];
      m[1][3] = a[0][1] * a[2][2] * a[3][0] - a[0][2] * a[2][1] * a[3][0] + a[0][1] * a[2][0] * a[3][1] - a[0][0] * a[2][2] * a[3][1] - a[0][1] * a[2][0] * a[3][2] + a[0][0] * a[2][1] * a[3][2];
      m[2][3] = a[0][2] * a[1][1] * a[3][0] - a[0][1] * a[1][2] * a[3][0] - a[0][2] * a[1][0] * a[3][1] + a[0][0] * a[1][2] * a[3][1] + a[0][1] * a[1][0] * a[3][2] - a[0][0] * a[1][1] * a[3][2];
      m[3][3] = a[0][1] * a[1][2] * a[2][0] - a[0][2] * a[1][1] * a[2][0] + a[0][1] * a[1][0] * a[2][1] - a[0][0] * a[1][2] * a[2][1] - a[0][1] * a[1][0] * a[2][2] + a[0][0] * a[1][1] * a[2][2];
      var determinant = a[0][0] * m[0][0] + a[1][0] * m[1][0] + a[2][0] * m[2][0] + a[3][0] * m[3][0];
      if (determinant === 0)
        return this.identity();
      else
        return this.multiplyScalar(1 / determinant);
    },
    multiplyScalar: function(s) {
      var m = this;
      m[0][0] *= s;
      m[0][1] *= s;
      m[0][2] *= s;
      m[0][3] *= s;
      m[1][0] *= s;
      m[1][1] *= s;
      m[1][2] *= s;
      m[1][3] *= s;
      m[2][0] *= s;
      m[2][1] *= s;
      m[2][2] *= s;
      m[2][3] *= s;
      m[3][0] *= s;
      m[3][1] *= s;
      m[3][2] *= s;
      m[3][3] *= s;
      return this;
    },
    addScalar: function(s) {
      var m = this;
      m[0][0] += s;
      m[0][1] += s;
      m[0][2] += s;
      m[0][3] += s;
      m[1][0] += s;
      m[1][1] += s;
      m[1][2] += s;
      m[1][3] += s;
      m[2][0] += s;
      m[2][1] += s;
      m[2][2] += s;
      m[2][3] += s;
      m[3][0] += s;
      m[3][1] += s;
      m[3][2] += s;
      m[3][3] += s;
      return this;
    },
    multiply: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT4.set(this);
      var m = this;
      m[0][0] = a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0] + a[0][3] * b[3][0];
      m[0][1] = a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1] + a[0][3] * b[3][1];
      m[0][2] = a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2] + a[0][3] * b[3][2];
      m[0][3] = a[0][0] * b[0][3] + a[0][1] * b[1][3] + a[0][2] * b[2][3] + a[0][3] * b[3][3];
      m[1][0] = a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0] + a[1][3] * b[3][0];
      m[1][1] = a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1] + a[1][3] * b[3][1];
      m[1][2] = a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2] + a[1][3] * b[3][2];
      m[1][3] = a[1][0] * b[0][3] + a[1][1] * b[1][3] + a[1][2] * b[2][3] + a[1][3] * b[3][3];
      m[2][0] = a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0] + a[2][3] * b[3][0];
      m[2][1] = a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1] + a[2][3] * b[3][1];
      m[2][2] = a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2] + a[2][3] * b[3][2];
      m[2][3] = a[2][0] * b[0][3] + a[2][1] * b[1][3] + a[2][2] * b[2][3] + a[2][3] * b[3][3];
      m[3][0] = a[3][0] * b[0][0] + a[3][1] * b[1][0] + a[3][2] * b[2][0] + a[3][3] * b[3][0];
      m[3][1] = a[3][0] * b[0][1] + a[3][1] * b[1][1] + a[3][2] * b[2][1] + a[3][3] * b[3][1];
      m[3][2] = a[3][0] * b[0][2] + a[3][1] * b[1][2] + a[3][2] * b[2][2] + a[3][3] * b[3][2];
      m[3][3] = a[3][0] * b[0][3] + a[3][1] * b[1][3] + a[3][2] * b[2][3] + a[3][3] * b[3][3];
      return this;
    },
    add: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT4.set(this);
      var m = this;
      m[0][0] = a[0][0] + b[0][0];
      m[0][1] = a[0][1] + b[0][1];
      m[0][2] = a[0][2] + b[0][2];
      m[0][3] = a[0][3] + b[0][3];
      m[1][0] = a[1][0] + b[1][0];
      m[1][1] = a[1][1] + b[1][1];
      m[1][2] = a[1][2] + b[1][2];
      m[1][3] = a[1][3] + b[1][3];
      m[2][0] = a[2][0] + b[2][0];
      m[2][1] = a[2][1] + b[2][1];
      m[2][2] = a[2][2] + b[2][2];
      m[2][3] = a[2][3] + b[2][3];
      m[3][0] = a[3][0] + b[3][0];
      m[3][1] = a[3][1] + b[3][1];
      m[3][2] = a[3][2] + b[3][2];
      m[3][3] = a[3][3] + b[3][3];
      return this;
    },
    lookAt: function(eye, target, up) {
      var m = this;
      var z = CACHE_VEC3_Z.sub(eye, target).normalize();
      if (z.getLength === 0)
        z = z.set(up);
      var x = CACHE_VEC3_X.cross(up, z).normalize();
      if (x.getLength === 0) {
        z.x += 0.0001;
        x = x.cross(up, z).normalize();
      }
      var y = CACHE_VEC3_Y.cross(z, x);
      return this.set([x[0], x[1], x[2], 0, y[0], y[1], y[2], 0, z[0], z[1], z[2], 0, 0, 0, 0, 1]);
    },
    frustum: function(left, right, bottom, top, near, far) {
      var x = 2 * near / (right - left);
      var y = 2 * near / (top - bottom);
      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = -(far + near) / (far - near);
      var d = -2 * far * near / (far - near);
      var m = this;
      return this.set([x, 0, 0, 0, 0, y, 0, 0, a, b, c, -1, 0, 0, d, 0]);
    },
    perspective: function(aspect, fov, near, far) {
      var ymax = near * Math.tan(fov * Math.PI / 720.);
      var ymin = -ymax;
      return this.frustum(ymin * aspect, ymax * aspect, ymin, ymax, near, far);
    },
    translation: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      return this.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
    },
    rotationX: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
    },
    rotationY: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
    },
    rotationZ: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    },
    rotationQuat4: function(quat) {
      var two = CACHE_VEC4.clone(quat).multiplyScalar(2);
      var xx = quat.x * two.x,
          xy = quat.x * two.y,
          xz = quat.x * two.z;
      var yy = quat.y * two.y,
          yz = quat.y * two.z,
          zz = quat.z * two.z;
      var wx = quat.w * two.x,
          wy = quat.w * two.y,
          wz = quat.w * two.z;
      return this.set([1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, 0, 0, 0, 1]);
    }
  });
  var mat3 = function mat3() {
    for (var data = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      data[$__4] = arguments[$__4];
    var width = 3;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Properties(this, {
      data: new Float32Array(buffer),
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width)
    }, E);
    data.length ? this.data.set(data) : this.identity();
  };
  ($traceurRuntime.createClass)(mat3, {}, {});
  Properties(mat3.prototype, {
    length: 3,
    set: function(m) {
      this.data.set(m);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT3.set(this);
      var m = this;
      m[0][0] = a[0][0];
      m[0][1] = a[1][0];
      m[0][2] = a[2][0];
      m[1][0] = a[0][1];
      m[1][1] = a[1][1];
      m[1][2] = a[2][1];
      m[2][0] = a[0][2];
      m[2][1] = a[1][2];
      m[2][2] = a[2][2];
      return this;
    },
    identity: function() {
      var m = this;
      m[0][0] = 1;
      m[0][1] = 0;
      m[0][2] = 0;
      m[1][0] = 0;
      m[1][1] = 1;
      m[1][2] = 0;
      m[2][0] = 0;
      m[2][1] = 0;
      m[2][2] = 1;
      return this;
    },
    multiplyScalar: function(s) {
      var m = this;
      m[0][0] *= s;
      m[0][1] *= s;
      m[0][2] *= s;
      m[1][0] *= s;
      m[1][1] *= s;
      m[1][2] *= s;
      m[2][0] *= s;
      m[2][1] *= s;
      m[2][2] *= s;
      return this;
    },
    addScalar: function(s) {
      var m = this;
      m[0][0] += s;
      m[0][1] += s;
      m[0][2] += s;
      m[1][0] += s;
      m[1][1] += s;
      m[1][2] += s;
      m[2][0] += s;
      m[2][1] += s;
      m[2][2] += s;
      return this;
    },
    multiply: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.set(this);
      var m = this;
      m[0][0] = a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0];
      ;
      m[0][1] = a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1];
      ;
      m[0][2] = a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2];
      ;
      m[1][0] = a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0];
      ;
      m[1][1] = a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1];
      ;
      m[1][2] = a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2];
      ;
      m[2][0] = a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0];
      ;
      m[2][1] = a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1];
      ;
      m[2][2] = a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2];
      ;
      return this;
    },
    add: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.set(this);
      var m = this;
      m[0][0] = a[0][0] + b[0][0];
      m[0][1] = a[0][1] + b[0][1];
      m[0][2] = a[0][2] + b[0][2];
      m[1][0] = a[1][0] + b[1][0];
      m[1][1] = a[1][1] + b[1][1];
      m[1][2] = a[1][2] + b[1][2];
      m[2][0] = a[2][0] + b[2][0];
      m[2][1] = a[2][1] + b[2][1];
      m[2][2] = a[2][2] + b[2][2];
      return this;
    },
    translation: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      return this.set([1, 0, 0, 0, 1, 0, x, y, z]);
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set([x, 0, 0, 0, y, 0, 0, 0, z]);
    },
    rotationX: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([1, 0, 0, 0, c, -s, 0, s, c]);
    },
    rotationY: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([c, 0, s, 0, 1, 0, -s, 0, c]);
    },
    rotationZ: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set([c, -s, 0, s, c, 0, 0, 0, 1]);
    }
  });
  var mat2 = function mat2() {
    for (var data = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      data[$__5] = arguments[$__5];
    var width = 2;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Properties(this, {
      data: new Float32Array(buffer),
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width)
    }, E);
    data.length ? this.data.set(data) : this.identity();
  };
  ($traceurRuntime.createClass)(mat2, {}, {});
  Properties(mat2.prototype, {
    length: 2,
    set: function(m) {
      this.data.set(m);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT2.set(this);
      var m = this;
      m[0][0] = a[0][0];
      m[0][1] = a[1][0];
      m[1][0] = a[0][1];
      m[1][1] = a[1][1];
      return this;
    },
    identity: function() {
      var m = this;
      m[0][0] = 1;
      m[0][1] = 0;
      m[1][0] = 0;
      m[1][1] = 1;
      return this;
    },
    multiplyScalar: function(s) {
      var m = this;
      m[0][0] *= s;
      m[0][1] *= s;
      m[1][0] *= s;
      m[1][1] *= s;
      return this;
    },
    addScalar: function(s) {
      var m = this;
      m[0][0] += s;
      m[0][1] += s;
      m[1][0] += s;
      m[1][1] += s;
      return this;
    },
    multiply: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.set(this);
      var m = this;
      m[0][0] = a[0][0] * b[0][0] + a[0][1] * b[1][0];
      ;
      m[0][1] = a[0][0] * b[0][1] + a[0][1] * b[1][1];
      ;
      ;
      m[1][0] = a[1][0] * b[0][0] + a[1][1] * b[1][0];
      ;
      m[1][1] = a[1][0] * b[0][1] + a[1][1] * b[1][1];
      ;
      return this;
    },
    add: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.set(this);
      var m = this;
      m[0][0] = a[0][0] + b[0][0];
      m[0][1] = a[0][1] + b[0][1];
      m[1][0] = a[1][0] + b[1][0];
      m[1][1] = a[1][1] + b[1][1];
      return this;
    }
  });
  var CACHE_MAT4 = new mat4;
  var CACHE_MAT3 = new mat3;
  var CACHE_MAT2 = new mat2;
  var CACHE_VEC3_X = new vec3;
  var CACHE_VEC3_Y = new vec3;
  var CACHE_VEC3_Z = new vec3;
  var CACHE_VEC4 = new vec4;
  return {
    get mat4() {
      return mat4;
    },
    get mat3() {
      return mat3;
    },
    get mat2() {
      return mat2;
    }
  };
});
System.registerModule("../src/utilities/ULUniforms", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "../src/utilities/ULUniforms";
  var $__0 = System.get("../src/math/MLVector"),
      vec2 = $__0.vec2,
      vec3 = $__0.vec3,
      vec4 = $__0.vec4;
  var $__1 = System.get("../src/math/MLMatrix"),
      mat2 = $__1.mat2,
      mat3 = $__1.mat3,
      mat4 = $__1.mat4;
  var $__2 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__2.Properties,
      Getters = $__2.Getters,
      Setters = $__2.Setters,
      GetterSetters = $__2.GetterSetters,
      E = $__2.E,
      C = $__2.C,
      W = $__2.W;
  var GL = System.get("../src/GLContext").GL;
  var Uniform = function Uniform() {};
  ($traceurRuntime.createClass)(Uniform, {}, {create: function(info, location) {
      var uniform = new (TYPES.get(info.type));
      Properties(uniform, {location: location}, E);
      return uniform;
    }});
  Properties(Uniform.prototype, {instantiate: function() {
      var o = Object.create(this);
      Properties(o, {value: this.value}, E | C | W);
      return o;
    }});
  var UniformVector = function UniformVector() {};
  ($traceurRuntime.createClass)(UniformVector, {}, {});
  Properties(UniformVector.prototype, {instantiate: function() {
      var o = Object.create(this);
      Properties(o, {value: this.value.clone()}, E | C);
      return o;
    }});
  var UniformFloat = function UniformFloat() {
    Properties(this, {value: 0.0}, E | W);
  };
  ($traceurRuntime.createClass)(UniformFloat, {}, {}, Uniform);
  Properties(UniformFloat.prototype, {set: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    }});
  var UniformFloatVec2 = function UniformFloatVec2() {
    Properties(this, {value: new vec2}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec2, {}, {}, UniformVector);
  Properties(UniformFloatVec2.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set2f(this.value);
      return this;
    }});
  var UniformFloatVec3 = function UniformFloatVec3() {
    Properties(this, {value: new vec3}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec3, {}, {}, UniformVector);
  Properties(UniformFloatVec3.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set3f(this.value);
      return this;
    }});
  var UniformFloatVec4 = function UniformFloatVec4() {
    Properties(this, {value: new vec4}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec4, {}, {}, UniformVector);
  Properties(UniformFloatVec4.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set4f(this.value);
      return this;
    }});
  var UniformFloatMat2 = function UniformFloatMat2() {
    Properties(this, {value: new mat2}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat2, {}, {}, UniformVector);
  Properties(UniformFloatMat2.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.set(m);
      this.location.setMat2(this.value);
      return this;
    }});
  var UniformFloatMat3 = function UniformFloatMat3() {
    Properties(this, {value: new mat3}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat3, {}, {}, UniformVector);
  Properties(UniformFloatMat3.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.set(m);
      this.location.setMat3(this.value);
      return this;
    }});
  var UniformFloatMat4 = function UniformFloatMat4() {
    Properties(this, {value: new mat4}, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat4, {}, {}, UniformVector);
  Properties(UniformFloatMat4.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.set(m);
      this.location.setMat4(this.value);
      return this;
    }});
  var UniformInt = function UniformInt() {
    Properties(this, {value: 0}, E | W);
  };
  ($traceurRuntime.createClass)(UniformInt, {}, {}, Uniform);
  Properties(UniformInt.prototype, {set: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    }});
  var UniformIntVec2 = function UniformIntVec2() {
    Properties(this, {value: new vec2}, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec2, {}, {}, UniformVector);
  Properties(UniformIntVec2.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set2i(this.value);
      return this;
    }});
  var UniformIntVec3 = function UniformIntVec3() {
    Properties(this, {value: new vec3}, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec3, {}, {}, UniformVector);
  Properties(UniformIntVec3.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set3i(this.value);
      return this;
    }});
  var UniformIntVec4 = function UniformIntVec4() {
    Properties(this, {value: new vec4}, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec4, {}, {}, UniformVector);
  Properties(UniformIntVec4.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set4i(this.value);
      return this;
    }});
  var UniformTexture2D = function UniformTexture2D() {};
  ($traceurRuntime.createClass)(UniformTexture2D, {}, {}, Uniform);
  var UniformTextureCubeMap = function UniformTextureCubeMap() {};
  ($traceurRuntime.createClass)(UniformTextureCubeMap, {}, {}, Uniform);
  var TYPES = new Map([[GL.FLOAT, UniformFloat], [GL.FLOAT_VEC2, UniformFloatVec2], [GL.FLOAT_VEC3, UniformFloatVec3], [GL.FLOAT_VEC4, UniformFloatVec4], [GL.FLOAT_MAT2, UniformFloatMat2], [GL.FLOAT_MAT3, UniformFloatMat3], [GL.FLOAT_MAT4, UniformFloatMat4], [GL.INT, UniformInt], [GL.INT_VEC2, UniformIntVec2], [GL.INT_VEC3, UniformIntVec3], [GL.INT_VEC4, UniformIntVec4], [GL.SAMPLER_2D, UniformTexture2D], [GL.SAMPLER_CUBE, UniformTextureCubeMap]]);
  var UniformStruct = function UniformStruct() {
    $traceurRuntime.superConstructor($UniformStruct).apply(this, arguments);
  };
  var $UniformStruct = UniformStruct;
  ($traceurRuntime.createClass)(UniformStruct, ($__5 = {}, Object.defineProperty($__5, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__6() {
      var properties,
          index;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              properties = Object.getOwnPropertyNames(this);
              index = 0;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (index < properties.length) ? 1 : -2;
              break;
            case 1:
              $ctx.state = 2;
              return this[properties[index++]];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 7;
              break;
            default:
              return $ctx.end();
          }
      }, $__6, this);
    }),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__5), {}, Uniform);
  Properties(UniformStruct.prototype, {
    set: function(object) {
      for (var property in this) {
        if (object && property in object)
          this[property].set(object[property]);
        else
          this[property].set();
      }
      return this;
    },
    instantiate: function() {
      var instance = Object.create(this);
      for (var property in this)
        instance[property] = this[property].instantiate();
      return instance;
    }
  });
  var UniformArray = function UniformArray() {
    $traceurRuntime.superConstructor($UniformArray).apply(this, arguments);
  };
  var $UniformArray = UniformArray;
  ($traceurRuntime.createClass)(UniformArray, {}, {}, UniformStruct);
  return {
    get Uniform() {
      return Uniform;
    },
    get UniformStruct() {
      return UniformStruct;
    },
    get UniformArray() {
      return UniformArray;
    }
  };
});
System.registerModule("../src/GLProgram", [], function() {
  "use strict";
  var __moduleName = "../src/GLProgram";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      GL = $__0.GL;
  var Shader = System.get("../src/GLShader").default;
  System.get("../src/GLUniformLocation");
  System.get("../src/GLActiveInfo");
  var AttributeLocation = System.get("../src/GLAttributeLocation").default;
  var $__3 = System.get("../src/utilities/ULUniforms"),
      Uniform = $__3.Uniform,
      UniformStruct = $__3.UniformStruct,
      UniformArray = $__3.UniformArray;
  var $__4 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__4.Properties,
      Getters = $__4.Getters,
      Setters = $__4.Setters,
      GetterSetters = $__4.GetterSetters,
      E = $__4.E,
      C = $__4.C,
      W = $__4.W;
  var PROTOTYPE = WebGLProgram.prototype;
  var Program = function Program() {
    return gl.createProgram();
  };
  ($traceurRuntime.createClass)(Program, {}, {VertexColors: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\t\t\t\n\t\t\tattribute vec2 position;\n\t\t\tattribute vec3 color;\n\t\t\t\n\t\t\tuniform mat4 modelView;\n\t\t\tuniform mat4 perspective;\n\t\t\tuniform mat4 view;\n\n\t\t\tvarying vec3 vColor;\n\t\t\t\n\t\t\tvoid main ( void ) {\n\t\t\t\t\n\t\t\t\tgl_Position = vec4( position , 0, 1 );\n\t\t\t\tgl_PointSize = 8.0;\n\t\t\t\tvColor = color;\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\t\t\t\n\t\t\tvarying vec3 vColor;\n\t\t\tuniform int frame;\n\t\t\tuniform float zoom;\n\t\t\tuniform vec2 resolution;\n\t\t\tuniform vec2 mouse;\n\n\t\t\tuniform sampler2D texture;\n\n\t\t\tstruct Material {\n\t\t\t\tfloat shininess;\n\t\t\t\tvec3 specular;\n\t\t\t\tvec3 ambient;\n\t\t\t\tvec4 diffuse;\n\t\t\t};\n\t\t\tuniform Material material;\n\n\t\t\tstruct SomeStruct {\n\t\t\t\tfloat test;\n\t\t\t\tint otherTest;\n\t\t\t\tvec4 whatever;\n\t\t\t};\n\t\t\tstruct Light {\n\t\t\t\tvec3 position;\n\t\t\t\tvec3 direction;\n\t\t\t\tvec3 attenuation;\n\t\t\t\tvec3 color;\n\t\t\t\tSomeStruct nestedStruct[2];\n\t\t\t};\n\t\t\tuniform Light light[4];\n\t\t\tuniform SomeStruct structure;\n\t\t\tuniform int someArray[ 5 ];\n\n\t\t\tfloat iterations;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tMaterial mnn = material;\n\t\t\t\tint f = frame;\n\t\t\t\tvec2 m = mouse;\n\t\t\t\tLight l = light[0];\n\t\t\t\tvec4 t = texture2D( texture, vec2(0,0) );\n\t\t\t\tint x = someArray[4];\n\t\t\t\tSomeStruct s = structure;\n\t\t\t\tgl_FragColor.rgb = vColor;\n\t\t\t\tgl_FragColor.a = .5;\n\t\t\t}\n\t\t")).bindLocations("position", "color").link();
    }});
  var $__default = Program;
  var getters = {
    getUniforms: function() {
      return new UniformMap(this);
    },
    getAttributeInfos: function() {
      return new AttributeInfoMap(this);
    },
    getAttributeLocations: function() {
      return new AttributeLocationMap(this);
    },
    getInfoLog: function() {
      return gl.getProgramInfoLog(this);
    },
    getAttachedShaders: function() {
      return gl.getAttachedShaders(this, GL.ATTACHED_SHADERS);
    },
    getActiveAttributesLength: function() {
      return gl.getProgramParameter(this, GL.ACTIVE_ATTRIBUTES);
    },
    getActiveUniformsLength: function() {
      return gl.getProgramParameter(this, GL.ACTIVE_UNIFORMS);
    },
    getDeleteStatus: function() {
      return gl.getProgramParameter(this, GL.DELETE_STATUS);
    },
    getLinkStatus: function() {
      return gl.getProgramParameter(this, GL.LINK_STATUS);
    },
    getValidateStatus: function() {
      return gl.getProgramParameter(this, GL.VALIDATE_STATUS);
    }
  };
  var methods = {
    bindLocations: function() {
      for (var location in arguments) {
        this.bindAttribLocation(location, arguments[location]);
      }
      return this;
    },
    delete: function() {
      gl.deleteProgram(this);
      return this;
    },
    use: function() {
      gl.useProgram(this);
      return this;
    },
    link: function() {
      gl.linkProgram(this);
      if (!this.getLinkStatus)
        throw new Error(this.getInfoLog);
      else
        this.clearCache();
      return this;
    },
    clearCache: function() {
      var properties = Object.getOwnPropertyNames(this);
      for (var p in properties)
        delete this[properties[p]];
      return this;
    },
    validate: function() {
      gl.validateProgram(this);
      if (!this.getValidateStatus)
        throw new Error(this.getInfoLog);
      return this;
    },
    attachShader: function(shader) {
      if (Object.hasOwnProperty(this, "getAttachedShaders"))
        delete this.getAttachedShaders;
      gl.attachShader(this, shader);
      return this;
    },
    detachShader: function(shader) {
      if (Object.hasOwnProperty(this, "getAttachedShaders"))
        delete this.getAttachedShaders;
      gl.detachShader(this, shader);
      return this;
    },
    getActiveAttrib: function(index) {
      return gl.getActiveAttrib(this, index);
    },
    getActiveUniform: function(index) {
      return gl.getActiveUniform(this, index);
    },
    getUniform: function(location) {
      return gl.getUniform(this, location);
    },
    getUniformLocation: function(name) {
      return gl.getUniformLocation(this, name);
    },
    getAttribLocation: function(name) {
      return gl.getAttribLocation(this, name);
    },
    bindAttribLocation: function(index, name) {
      gl.bindAttribLocation(this, index, name);
      return this;
    }
  };
  for (var g in getters)
    Object.defineProperty(PROTOTYPE, g, {get: getters[g]});
  for (var m in methods)
    PROTOTYPE[m] = methods[m];
  var AttributeInfoMap = function AttributeInfoMap(program) {
    Object.defineProperty(program, "getAttributeInfos", {
      value: this,
      configurable: true
    });
    for (var i = program.getActiveAttributesLength - 1; i >= 0; i--) {
      var info = program.getActiveAttrib(i);
      Object.defineProperty(this, info.name, {
        value: info,
        enumerable: true
      });
    }
  };
  ($traceurRuntime.createClass)(AttributeInfoMap, {}, {});
  var UniformMap = function UniformMap(program) {
    if (!program)
      return ;
    else
      this.setFromProgram(program, "getUniforms");
  };
  ($traceurRuntime.createClass)(UniformMap, {setFromProgram: function(program, cacheGetter) {
      if (cacheGetter)
        Object.defineProperty(program, cacheGetter, {
          value: this,
          configurable: true
        });
      var $__6 = this,
          $__7 = function(i) {
            var info = program.getActiveUniform(i);
            var location = program.getUniformLocation(info.name);
            var path = info.name.split(/[\[\].]/).filter((function(e) {
              return e;
            }));
            resolvePath.call($__6, path);
            function resolvePath(path) {
              var member = path.shift();
              if (path.length === 0)
                return this[member] = Uniform.create(info, location);
              else if (this[member] === undefined) {
                var dataType = isNaN(parseInt(path[0], 10)) ? UniformStruct : UniformArray;
                this[member] = new dataType(info);
                if (path.length === 1 && info.size > 1) {
                  var nameString = info.name;
                  var matchLastIndex = /\d*(?=\]$)/;
                  for (var i = 1; i < info.size; i++) {
                    var name = nameString.replace(matchLastIndex, i);
                    this[member][i] = Uniform.create(info, program.getUniformLocation(name));
                  }
                }
              }
              return resolvePath.call(this[member], path);
            }
          };
      for (var i = program.getActiveUniformsLength - 1; i >= 0; i--) {
        $__7(i);
      }
      return this;
    }}, {});
  Object.defineProperties(UniformMap.prototype, {clone: {value: function() {
        var m = new UniformMap;
        for (var p in this) {
          Object.defineProperty(m, p, {
            value: this[p],
            writable: true,
            enumerable: true
          });
        }
        return m;
      }}});
  var AttributeLocationMap = function AttributeLocationMap(program) {
    if (!program)
      return ;
    Object.defineProperty(program, "getAttributeLocations", {
      value: this,
      configurable: true
    });
    var infos = program.getAttributeInfos;
    for (var info in infos) {
      var location = new AttributeLocation(program.getAttribLocation(info), infos[info]);
      Object.defineProperty(this, info, {
        value: location,
        enumerable: true
      });
    }
  };
  ($traceurRuntime.createClass)(AttributeLocationMap, {}, {});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/GLTexture", [], function() {
  "use strict";
  var __moduleName = "../src/GLTexture";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      GL = $__0.GL;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var PROTOTYPE = WebGLTexture.prototype;
  var TARGET = new WeakMap;
  var Texture = function Texture() {
    var t = gl.createTexture();
    TARGET.set(t, GL.TEXTURE_2D);
    return t;
  };
  ($traceurRuntime.createClass)(Texture, {}, {CubeMap: function() {
      var t = gl.createTexture();
      TARGET.set(t, GL.TEXTURE_CUBE_MAP);
      return t;
    }});
  var $__default = Texture;
  var BINDINGS = {
    setActiveTexture: function(nTextureUnit) {
      gl.activeTexture(GL.TEXTURE0 + nTextureUnit);
      return this;
    },
    delete: function() {
      gl.deleteTexture(this);
      return this;
    },
    bind: function() {
      gl.bindTexture(this.getTarget, this);
      return this;
    },
    unbind: function() {
      gl.bindTexture(this.getTarget, null);
      return this;
    },
    setMipmapHint: function(mode) {
      gl.hint(GL.GENERATE_MIPMAP_HINT, mode);
      return this;
    },
    generateMipmap: function() {
      gl.generateMipmap(this.getTarget);
      return this;
    },
    copyTexImage2D: function(x, y, width, height, level, format) {
      gl.copyTexImage2D(this.getTarget, level, format, x, y, width, height, 0);
      return this;
    },
    copyTexSubImage2D: function(xoffset, yoffset, x, y, width, height, level, format) {
      gl.copyTexImage2D(this.getTarget, level, xoffset, yoffset, format, x, y, width, height);
      return this;
    },
    pixelStorei: function(pname, param) {
      gl.pixelStorei(pname, param);
      return this;
    },
    setMinFilter: function(min) {
      gl.texParameteri(this.getTarget, GL.TEXTURE_MIN_FILTER, min);
      return this;
    },
    setMagFilter: function(mag) {
      gl.texParameteri(this.getTarget, GL.TEXTURE_MAG_FILTER, mag);
      return this;
    },
    setWrapS: function(s) {
      gl.texParameteri(this.getTarget, GL.TEXTURE_WRAP_S, s);
      return this;
    },
    setWrapT: function(t) {
      gl.texParameteri(this.getTarget, GL.TEXTURE_WRAP_T, t);
      return this;
    },
    texImage2D: function(data, level, format, type, width, height) {
      gl.texImage2D(this.getTarget, level, format, format, type, data);
      return this;
    },
    texImageData2D: function(data, level, format, type, width, height) {
      gl.texImage2D(this.getTarget, level, format, width, height, 0, format, type, data);
      return this;
    },
    texSubImage2D: function(xoffset, yoffset, data, level, format, type, width, height) {
      gl.texSubImage2D(this.getTarget, level, xoffset, yoffset, format, format, type, data);
      return this;
    },
    texSubImageData2D: function(xoffset, yoffset, data, level, format, type, width, height) {
      gl.texSubImage2D(this.getTarget, level, xoffset, yoffset, format, width, height, 0, format, type, data);
      return this;
    }
  };
  var ACCESSORS = {
    getTarget: {get: function() {
        return TARGET.get(this);
      }},
    getTargetFlag: {get: function() {
        return gl.flags[this.getTarget];
      }},
    getMagFilter: {get: function() {
        this.bind();
        return gl.getTexParameter(this.getTarget, GL.TEXTURE_MAG_FILTER);
      }},
    getMagFilterFlag: {get: function() {
        return gl.flags[this.getMagFilter];
      }},
    getMinFilter: {get: function() {
        this.bind();
        return gl.getTexParameter(this.getTarget, GL.TEXTURE_MIN_FILTER);
      }},
    getMinFilterFlag: {get: function() {
        return gl.flags[this.getMinFilter];
      }},
    getWrapS: {get: function() {
        this.bind();
        return gl.getTexParameter(this.getTarget, GL.TEXTURE_WRAP_S);
      }},
    getWrapSFlag: {get: function() {
        return gl.flags[this.getWrapS];
      }},
    getWrapT: {get: function() {
        this.bind();
        return gl.getTexParameter(this.getTarget, GL.TEXTURE_WRAP_T);
      }},
    getWrapTFlag: {get: function() {
        return gl.flags[this.getWrapT];
      }}
  };
  for (var p = void 0 in BINDINGS)
    Object.defineProperty(PROTOTYPE, p, {value: BINDINGS[p]});
  Object.defineProperties(PROTOTYPE, ACCESSORS);
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/GLVertexArrayObject", [], function() {
  "use strict";
  var __moduleName = "../src/GLVertexArrayObject";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      GL = $__0.GL,
      extensions = $__0.extensions;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var ext = extensions.OES_vertex_array_object;
  var DEBUG_USE_FALLBACK = false;
  var MAX_VERTEX_BINDINGS = 16;
  var currentBinding;
  var VertexArrayObject = function VertexArrayObject() {
    if (ext && !DEBUG_USE_FALLBACK)
      return ext.createVertexArrayOES();
    else {
      if (!(this instanceof $VertexArrayObject))
        return new $VertexArrayObject;
    }
  };
  var $VertexArrayObject = VertexArrayObject;
  ($traceurRuntime.createClass)(VertexArrayObject, {
    use: function() {
      for (var i = 0; i < MAX_VERTEX_BINDINGS; i++) {
        var binding = this[i];
        if (binding) {
          binding.buffer.bind();
          binding.location.enable().applyPointer();
        }
      }
      if (this.index)
        this.index.bind();
      return this;
    },
    unbind: function() {},
    addVertexBinding: function(location, buffer) {
      var index = location.index;
      var target = this[index];
      if (target) {
        target.buffer = buffer;
        target.location = location;
      } else {
        this[index] = {
          buffer: buffer,
          location: location
        };
      }
      buffer.bind();
      location.enable().applyPointer();
      return this;
    },
    setIndexBinding: function(buffer) {
      this.index = buffer;
      buffer.bind();
      return this;
    },
    dispose: function() {}
  }, {});
  var $__default = VertexArrayObject;
  function bind(target) {
    currentBinding = target;
    ext.bindVertexArrayOES(target);
  }
  function unbind(target) {
    currentBinding = null;
    ext.bindVertexArrayOES(null);
  }
  if (ext && !DEBUG_USE_FALLBACK) {
    var proto = Object.getPrototypeOf(VertexArrayObject());
    var methods = {
      use: function() {
        if (currentBinding !== this)
          bind(this);
        return this;
      },
      unbind: function() {
        unbind(this);
        return this;
      },
      addVertexBinding: function(location, buffer) {
        if (currentBinding !== this)
          bind(this);
        var index = location.index;
        var target = this[index];
        if (target) {
          target.buffer = buffer;
          target.location = location;
        } else {
          this[index] = {
            buffer: buffer,
            location: location
          };
        }
        buffer.bind();
        location.enable().applyPointer();
        return this;
      },
      getNextFreeSlot: function() {
        var i = 0;
        while (i < MAX_VERTEX_BINDINGS) {
          if (this[i] === undefined)
            return i;
          else
            i++;
        }
      },
      setIndexBinding: function(buffer) {
        if (currentBinding !== this)
          bind(this);
        buffer.bind();
        this.index = buffer;
        return this;
      },
      dispose: function() {
        ext.deleteVertexArrayOES(this);
        return this;
      }
    };
    for (var m in methods)
      Object.defineProperty(proto, m, {value: methods[m]});
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/GLVertexbuffer", [], function() {
  "use strict";
  var __moduleName = "../src/GLVertexbuffer";
  var $__0 = System.get("../src/GLContext"),
      gl = $__0.gl,
      extensions = $__0.extensions;
  var $__1 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__1.Properties,
      Getters = $__1.Getters,
      Setters = $__1.Setters,
      GetterSetters = $__1.GetterSetters,
      E = $__1.E,
      C = $__1.C,
      W = $__1.W;
  var GL = WebGLRenderingContext.prototype;
  var PROTOTYPE = WebGLBuffer.prototype;
  var TARGET = new WeakMap;
  var BINDING_TARGET = new Map([[GL.ARRAY_BUFFER, null], [GL.ELEMENT_ARRAY_BUFFER, null]]);
  var Buffer = function Buffer(target) {
    var buffer = gl.createBuffer();
    TARGET.set(buffer, target);
    return buffer;
  };
  var $Buffer = Buffer;
  ($traceurRuntime.createClass)(Buffer, {}, {
    Vertex: function() {
      return $Buffer(GL.ARRAY_BUFFER);
    },
    Index: function() {
      return $Buffer(GL.ELEMENT_ARRAY_BUFFER);
    }
  });
  var $__default = Buffer;
  Properties(PROTOTYPE, {
    delete: function() {
      gl.deleteBuffer(this);
      return this;
    },
    bind: function() {
      var target = this.getTarget;
      gl.bindBuffer(target, this);
      return this;
    },
    unbind: function() {
      var target = this.getTarget;
      if (BINDING_TARGET.get(target) === this) {
        gl.bindBuffer(target, null);
        BINDING_TARGET.set(target, null);
      }
      return this;
    },
    data: function(data) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      this.bind();
      if (this.getTarget === GL.ELEMENT_ARRAY_BUFFER && data.BYTES_PER_ELEMENT === 4) {
        if (!extensions.OES_element_index_uint)
          console.warn("32bit indices not supported");
      }
      gl.bufferData(this.getTarget, data, usage);
      return this;
    },
    subData: function(data) {
      var offset = arguments[1] !== (void 0) ? arguments[1] : data.byteOffset;
      this.bind();
      gl.bufferSubData(this.getTarget, offset, data);
      return this;
    }
  }, E | W | C);
  Getters(PROTOTYPE, {
    getTarget: function() {
      return TARGET.get(this);
    },
    getTargetFlag: function() {
      return gl.flags[this.getTarget];
    },
    getUsageFlag: function() {
      return gl.flags[this.getUsage];
    },
    getUsage: function() {
      this.bind();
      return gl.getBufferParameter(this.getTarget, GL.BUFFER_USAGE);
    },
    getSize: function() {
      this.bind();
      return gl.getBufferParameter(this.getTarget, GL.BUFFER_SIZE);
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULInterleavedArrays", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "../src/utilities/ULInterleavedArrays";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var InterleavedFloat32 = function InterleavedFloat32() {
    var structure = readStructure(arguments);
    var stride = readOffsets(structure);
    Properties(this, {
      structure: structure,
      stride: stride
    });
  };
  ($traceurRuntime.createClass)(InterleavedFloat32, ($__2 = {}, Object.defineProperty($__2, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__3() {
      var i,
          max,
          n;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              max = Math.max(this.maxLength, this.length);
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < max) ? 6 : -2;
              break;
            case 6:
              n = this[i];
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (n !== undefined) ? 1 : 4;
              break;
            case 1:
              $ctx.state = 2;
              return n;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              i++;
              $ctx.state = 12;
              break;
            default:
              return $ctx.end();
          }
      }, $__3, this);
    }),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {});
  Properties(InterleavedFloat32.prototype, {
    allocate: function(length) {
      if (this.length)
        this.disposeVertexViews();
      Object.defineProperties(this, {
        buffer: {
          value: new ArrayBuffer(this.stride * length),
          configurable: true
        },
        maxLength: {
          value: length,
          configurable: true
        }
      });
      return this;
    },
    expand: function(lenght) {
      if (!length)
        return ;
      if (this.length)
        this.disposeVertexViews();
      var newLength = this.maxLength + length;
      var newBuffer = new ArrayBuffer(this.stride * newLength);
      new Float32Array(newBuffer).set(new Float32Array(this.buffer));
      Object.defineProperties(this, {
        buffer: {
          value: newBuffer,
          configurable: true
        },
        maxLength: {
          value: newLength,
          configurable: true
        }
      });
      return this;
    },
    disposeVertexViews: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var end = arguments[1] !== (void 0) ? arguments[1] : this.length;
      for (var i = start; i < end; i++) {
        delete this[i];
      }
      Object.defineProperty(this, "length", {
        value: 0,
        configurable: true
      });
      return this;
    },
    createVertexViews: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var end = arguments[1] !== (void 0) ? arguments[1] : this.maxLength;
      for (var i = start; i < end; i++) {
        this[i] = new Float32Array(this.buffer, this.stride * i, this.stride / 4);
      }
      Object.defineProperty(this, "length", {
        value: Math.max(this.length || 0, end),
        configurable: true
      });
      return this;
    }
  });
  function readOffsets(structure) {
    var offsets = [0];
    for (var i in structure) {
      offsets.push(offsets.reduce((function(p, c) {
        return p + c;
      })) + structure[i].type.byteLength);
      structure[i].offset = offsets[i];
    }
    return offsets.pop();
  }
  function readStructure(args) {
    var structure = [];
    for (var i in args) {
      if (args[i].BYTES_PER_ELEMENT)
        structure[i] = {type: args[i]};
      else if (args[i].type.BYTES_PER_ELEMENT)
        structure[i] = args[i];
    }
    return structure;
  }
  return {get InterleavedFloat32() {
      return InterleavedFloat32;
    }};
});
System.registerModule("../src/utilities/ULGeometry", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULGeometry";
  var Buffer = System.get("../src/GLVertexbuffer").default;
  var VertexArrayObject = System.get("../src/GLVertexArrayObject").default;
  var AttributeLocation = System.get("../src/GLAttributeLocation").default;
  var InterleavedFloat32 = System.get("../src/utilities/ULInterleavedArrays").InterleavedFloat32;
  var $__4 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__4.Properties,
      Getters = $__4.Getters,
      Setters = $__4.Setters,
      GetterSetters = $__4.GetterSetters,
      E = $__4.E,
      C = $__4.C,
      W = $__4.W;
  var GL = WebGLRenderingContext.prototype;
  var TYPEDEF = new Map([["Int8Array", GL.BYTE], ["Uint8ClampedArray", GL.UNSIGNED_BYTE], ["Uint8Array", GL.UNSIGNED_BYTE], ["Int16Array", GL.SHORT], ["Uint16Array", GL.UNSIGNED_SHORT], ["Int32Array", GL.INT], ["Uint32Array", GL.UNSIGNED_INT], ["Float32Array", GL.FLOAT], ["Float64Array", GL.FLOAT]]);
  var VAO_NAME = "bindings";
  var INDEX_NAME = "index";
  var Geometry = function Geometry() {};
  var $Geometry = Geometry;
  ($traceurRuntime.createClass)(Geometry, {
    use: function() {
      if (this[VAO_NAME])
        this[VAO_NAME].use();
      return this;
    },
    unbind: function() {
      if (this[VAO_NAME])
        this[VAO_NAME].unbind();
      return this;
    },
    createIndex: function(data, usage) {
      var buffer = new Buffer.Index;
      var attr = new AttributeIndex(data, buffer, usage);
      var vao = getOrCreate(this, VAO_NAME, VertexArrayObject);
      this.index = attr;
      vao.setIndexBinding(buffer);
      return this;
    },
    addAttributeGroup: function(name, structure, length) {
      var data = new (Function.prototype.bind.apply(InterleavedFloat32, $traceurRuntime.spread([null], structure)))();
      var buffer = new Buffer.Vertex;
      var vao = getOrCreate(this, VAO_NAME, VertexArrayObject);
      var attr = new AttributeGroup(data, buffer).setPointers(vao);
      this[name] = attr;
      if (length)
        attr.allocate(length);
      return this;
    },
    addAttribute: function(name, structure) {
      var data = structure.type ? structure.type : structure;
      var buffer = new Buffer.Vertex;
      var vao = getOrCreate(this, "bindings", VertexArrayObject);
      var attr = new Attribute(structure, buffer).setPointer(vao);
      this[name] = attr;
      return this;
    }
  }, {Polygon2D: function() {
      var sides = arguments[0] !== (void 0) ? arguments[0] : 7;
      var r = arguments[1] !== (void 0) ? arguments[1] : 1;
      var x = arguments[2] !== (void 0) ? arguments[2] : 0;
      var y = arguments[3] !== (void 0) ? arguments[3] : 0;
      var positions = 2;
      var colors = 3;
      var stride = positions + colors;
      var geometry = new $Geometry().addAttributeGroup("dynamic", [new Float32Array(positions), new Float32Array(colors)], sides + 1);
      var v = geometry.dynamic.view;
      var e = new Uint32Array(3 * sides);
      v.set([x, y, 0, 1, 1]);
      for (var i = 1; i < sides + 1; i++) {
        var a = Math.PI * 2 * i / sides;
        v.set([Math.sin(a) * r + x, Math.cos(a) * r + y, .0, Math.random(), .5], i * stride);
        var offset = (i - 1) * 3;
        var center = 0;
        var next = (i % sides) + 1;
        if (i % 2)
          e.set([i, next, center], offset);
        else
          e.set([center, i, next], offset);
      }
      geometry.dynamic.update();
      geometry.createIndex(e);
      return geometry;
    }});
  var $__default = Geometry;
  function getOrCreate(instance, name, constructor) {
    var isEnumerable = arguments[3] !== (void 0) ? arguments[3] : false;
    var isWritable = arguments[4] !== (void 0) ? arguments[4] : false;
    var isConfigurable = arguments[5] !== (void 0) ? arguments[5] : false;
    return instance[name] ? instance[name] : Object.defineProperty(instance, name, {
      value: new constructor,
      enumerable: isEnumerable,
      writable: isWritable,
      configurable: isConfigurable
    })[name];
  }
  var BufferAttribute = function BufferAttribute(defaultValue, buffer) {
    this.defaultValue = defaultValue;
    this.buffer = buffer;
  };
  ($traceurRuntime.createClass)(BufferAttribute, {}, {});
  var AttributeIndex = function AttributeIndex(data, buffer, usage) {
    this.data = data;
    this.buffer = buffer;
    buffer.data(data, usage);
  };
  ($traceurRuntime.createClass)(AttributeIndex, {}, {}, BufferAttribute);
  var Attribute = function Attribute() {
    $traceurRuntime.superConstructor($Attribute).apply(this, arguments);
  };
  var $Attribute = Attribute;
  ($traceurRuntime.createClass)(Attribute, {
    set: function(data) {
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      var constructor = this.defaultValue.constructor;
      if (data.byteLength === undefined)
        data = new constructor(data);
      if (this.data) {
        if (data.length <= this.data.length) {
          buffer.bufferSubData(this.data, byteOffset);
        } else {
          this.data = new constructor(data.buffer);
          buffer.bufferData(this.data, GL.STATIC_DRAW);
        }
      } else {
        this.data = data;
        buffer.bufferData(this.data, GL.STATIC_DRAW);
      }
      return this;
    },
    setPointer: function(vao) {}
  }, {}, BufferAttribute);
  var AttributeGroup = function AttributeGroup(data, buffer) {
    this.buffer = buffer;
    this.data = data;
    this.view = null;
  };
  ($traceurRuntime.createClass)(AttributeGroup, {
    allocate: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.DYNAMIC_DRAW;
      this.data.allocate(length);
      this.view = new Float32Array(this.data.buffer);
      this.buffer.data(this.view.byteLength, usage);
      return this;
    },
    setPointers: function(vao) {
      var $__5 = this;
      var structure = this.data.structure;
      var stride = this.data.stride;
      structure.forEach((function(e) {
        var location = e.location;
        var offset = e.offset;
        var size = e.type.length;
        if (!location)
          location = new AttributeLocation(vao.getNextFreeSlot());
        location.setSize(size).setStride(stride).setOffset(offset).setFloatVector(e.type, size);
        vao.addVertexBinding(location, $__5.buffer);
      }));
      return this;
    },
    createVertexView: function() {
      var vertices = arguments[0] !== (void 0) ? arguments[0] : this.data.maxLength;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      var size = Float32Array.BYTES_PER_ELEMENT;
      return new Float32Array(this.data.buffer, offset * this.data.stride, vertices * this.data.stride / size);
    },
    update: function() {
      var bufferView = arguments[0] !== (void 0) ? arguments[0] : this.view;
      this.buffer.subData(bufferView, bufferView.byteOffset);
      return this;
    }
  }, {}, BufferAttribute);
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULMaterial", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMaterial";
  var Program = System.get("../src/GLProgram").default;
  var Shader = System.get("../src/GLShader").default;
  var $__2 = System.get("../src/GLContext"),
      gl = $__2.gl,
      GL = $__2.GL,
      canvas = $__2.canvas;
  var $__3 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__3.Properties,
      Getters = $__3.Getters,
      Setters = $__3.Setters,
      GetterSetters = $__3.GetterSetters,
      E = $__3.E,
      C = $__3.C,
      W = $__3.W;
  var currentProgram = null;
  var currentUniforms = null;
  var globalUsage = 0;
  var DEFAULT_PROGRAM = new Program.VertexColors;
  var BLEND_ENABLED = 1 << 0;
  var BLEND_COLOR_SET = 1 << 1;
  var BLEND_FUNC_SET = 1 << 2;
  var BLEND_EQUATION_SET = 1 << 3;
  var CULL_FACE_ENABLED = 1 << 4;
  var CULL_FACE_SET = 1 << 5;
  var CULL_FACE_FRONT_SET = 1 << 6;
  var DEPTH_ENABLED = 1 << 7;
  var DEPTH_WRITE_SET = 1 << 8;
  var DEPTH_FUNC_SET = 1 << 9;
  var DEPTH_RANGE_SET = 1 << 10;
  var DITHER_ENABLED = 1 << 11;
  var OFFSET_ENABLED = 1 << 12;
  var OFFSET_SET = 1 << 13;
  var SAMPLE_ALPHA_ENABLED = 1 << 14;
  var SAMPLE_ENABLED = 1 << 15;
  var SAMPLE_SET = 1 << 16;
  var SCISSOR_ENABLED = 1 << 17;
  var SCISSOR_SET = 1 << 18;
  var STENCIL_ENABLED = 1 << 19;
  var STENCIL_FRONT_FUNC_SET = 1 << 20;
  var STENCIL_FRONT_MASK_SET = 1 << 21;
  var STENCIL_FRONT_OP_SET = 1 << 22;
  var STENCIL_BACK_FUNC_SET = 1 << 23;
  var STENCIL_BACK_MASK_SET = 1 << 24;
  var STENCIL_BACK_OP_SET = 1 << 25;
  var STENCIL_FUNC_SET = STENCIL_FRONT_FUNC_SET | STENCIL_BACK_FUNC_SET;
  ;
  var STENCIL_OP_SET = STENCIL_FRONT_OP_SET | STENCIL_BACK_OP_SET;
  ;
  var STENCIL_MASK_SET = STENCIL_FRONT_MASK_SET | STENCIL_BACK_MASK_SET;
  ;
  var BLEND_ANY_SET = BLEND_COLOR_SET | BLEND_FUNC_SET | BLEND_EQUATION_SET;
  ;
  var STENCIL_ANY_SET = STENCIL_FUNC_SET | STENCIL_MASK_SET | STENCIL_OP_SET;
  ;
  var Dither = function Dither() {};
  ($traceurRuntime.createClass)(Dither, {
    enable: function() {
      if (~globalUsage & DITHER_ENABLED) {
        globalUsage |= DITHER_ENABLED;
        gl.enable(GL.DITHER_TEST);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & DITHER_ENABLED) {
        globalUsage &= ~DITHER_ENABLED;
        gl.disable(GL.DITHER_TEST);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.DITHER);
    }
  }, {});
  var SampleCoverage = function SampleCoverage() {};
  var $SampleCoverage = SampleCoverage;
  ($traceurRuntime.createClass)(SampleCoverage, {
    enable: function() {
      if (~globalUsage & SAMPLE_ENABLED) {
        globalUsage |= SAMPLE_ENABLED;
        gl.enable(GL.SAMPLE_COVERAGE);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & SAMPLE_ENABLED) {
        globalUsage &= ~SAMPLE_ENABLED;
        gl.disable(GL.SAMPLE_COVERAGE);
      }
      return this;
    },
    enableAlpha: function() {
      if (~globalUsage & SAMPLE_ALPHA_ENABLED) {
        globalUsage |= SAMPLE_ALPHA_ENABLED;
        gl.enable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return this;
    },
    disableAlpha: function() {
      if (globalUsage & SAMPLE_ALPHA_ENABLED) {
        globalUsage &= ~SAMPLE_ALPHA_ENABLED;
        gl.disable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return this;
    },
    set: function() {
      var value = arguments[0] !== (void 0) ? arguments[0] : this.value;
      var invert = arguments[1] !== (void 0) ? arguments[1] : this.invert;
      globalUsage |= SAMPLE_SET;
      gl.sampleCoverage(value, invert);
      return this;
    },
    unset: function() {
      if (globalUsage & SAMPLE_SET) {
        globalUsage &= ~SAMPLE_SET;
        gl.sampleCoverage($SampleCoverage.prototype.value, $SampleCoverage.prototype.invert);
      }
      return this;
    },
    get getSampleBuffers() {
      return gl.getParameter(GL.SAMPLE_BUFFERS);
    },
    get getInvert() {
      return gl.getParameter(GL.SAMPLE_COVERAGE_INVERT);
    },
    get getValue() {
      return gl.getParameter(GL.SAMPLE_COVERAGE_VALUE);
    },
    get getSamples() {
      return gl.getParameter(GL.SAMPLES);
    }
  }, {});
  Properties(SampleCoverage.prototype, {
    value: 1,
    invert: GL.FALSE
  }, E | C);
  var ScissorTest = function ScissorTest() {};
  var $ScissorTest = ScissorTest;
  ($traceurRuntime.createClass)(ScissorTest, {
    enable: function() {
      if (~globalUsage & SCISSOR_ENABLED) {
        globalUsage |= SCISSOR_ENABLED;
        gl.enable(GL.SCISSOR_TEST);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & SCISSOR_ENABLED) {
        globalUsage &= ~SCISSOR_ENABLED;
        gl.disable(GL.SCISSOR_TEST);
      }
      return this;
    },
    set: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : this.x;
      var y = arguments[1] !== (void 0) ? arguments[1] : this.y;
      var width = arguments[2] !== (void 0) ? arguments[2] : this.width;
      var height = arguments[3] !== (void 0) ? arguments[3] : this.height;
      globalUsage |= SCISSOR_SET;
      gl.scissor(x, y, width, height);
      return this;
    },
    unset: function() {
      if (globalUsage & SCISSOR_SET) {
        globalUsage &= ~SCISSOR_SET;
        gl.scissor($ScissorTest.prototype.x, ScissorTEst.prototype.y, $ScissorTest.prototype.width, $ScissorTest.prototype.height);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.SCISSOR_TEST);
    },
    get getScissorBox() {
      return gl.getParameter(GL.SCISSOR_BOX);
    }
  }, {});
  Properties(ScissorTest.prototype, {
    x: 0,
    y: 0,
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }, E | C);
  var Alpha = function Alpha() {};
  var $Alpha = Alpha;
  ($traceurRuntime.createClass)(Alpha, {
    enable: function() {
      if (~globalUsage & BLEND_ENABLED) {
        globalUsage |= BLEND_ENABLED;
        gl.enable(GL.BLEND);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & BLEND_ENABLED) {
        globalUsage &= ~BLEND_ENABLED;
        gl.disable(GL.BLEND);
      }
      return this;
    },
    setColor: function() {
      var red = arguments[0] !== (void 0) ? arguments[0] : this.colorRed;
      var green = arguments[1] !== (void 0) ? arguments[1] : this.colorGreen;
      var blue = arguments[2] !== (void 0) ? arguments[2] : this.colorBlue;
      var alpha = arguments[3] !== (void 0) ? arguments[3] : this.colorAlpha;
      globalUsage |= BLEND_COLOR_SET;
      gl.blendColor(red, green, blue, alpha);
      return this;
    },
    unsetColor: function() {
      if (globalUsage & BLEND_COLOR_SET) {
        globalUsage &= ~BLEND_COLOR_SET;
        gl.blendColor($Alpha.prototype.colorRed, $Alpha.prototype.colorGreen, $Alpha.prototype.colorBlue, $Alpha.prototype.colorAlpha);
      }
      return this;
    },
    setFunc: function() {
      var srcRGB = arguments[0] !== (void 0) ? arguments[0] : this.srcRGB;
      var dstRGB = arguments[1] !== (void 0) ? arguments[1] : this.dstRGB;
      var srcAlpha = arguments[2] !== (void 0) ? arguments[2] : this.srcAlpha;
      var dstAlpha = arguments[3] !== (void 0) ? arguments[3] : this.dstAlpha;
      globalUsage |= BLEND_FUNC_SET;
      gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
      return this;
    },
    unsetFunc: function() {
      if (globalUsage & BLEND_FUNC_SET) {
        globalUsage &= ~BLEND_FUNC_SET;
        gl.blendFuncSeparate($Alpha.prototype.srcRGB, $Alpha.prototype.dstRGB, $Alpha.prototype.srcAlpha, $Alpha.prototype.dstAlpha);
      }
      return this;
    },
    setEquation: function() {
      var modeRGB = arguments[0] !== (void 0) ? arguments[0] : this.modeRGB;
      var modeAlpha = arguments[1] !== (void 0) ? arguments[1] : this.modeAlpha;
      globalUsage |= BLEND_EQUATION_SET;
      gl.blendEquationSeparate(modeRGB, modeAlpha);
      return this;
    },
    unsetEquation: function() {
      if (globalUsage & BLEND_EQUATION_SET) {
        globalUsage &= ~BLEND_EQUATION_SET;
        gl.blendEquationSeparate($Alpha.prototype.modeRGB, $Alpha.prototype.modeAlpha);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.BLEND);
    },
    get getColor() {
      return gl.getParameter(GL.BLEND_COLOR);
    },
    get getSrcRGB() {
      return gl.getParameter(GL.BLEND_SRC_RGB);
    },
    get getSrcAlpha() {
      return gl.getParameter(GL.BLEND_SRC_ALPHA);
    },
    get getDstRGB() {
      return gl.getParameter(GL.BLEND_DST_RGB);
    },
    get getDstAlpha() {
      return gl.getParameter(GL.BLEND_DST_ALPHA);
    },
    get getEquationRGB() {
      return gl.getParameter(GL.BLEND_EQUATION_RGB);
    },
    get getEquationAlpha() {
      return gl.getParameter(GL.BLEND_EQUATION_ALPHA);
    },
    get getSrcRGBFlag() {
      return gl.flags[this.getSrcRGB];
    },
    get getSrcAlphaFlag() {
      return gl.flags[this.getSrcAlpha];
    },
    get getDstRGBFlag() {
      return gl.flags[this.getDstRGB];
    },
    get getDstAlphaFlag() {
      return gl.flags[this.getDstAlpha];
    },
    get getEquationRGBFlag() {
      return gl.flags[this.getEquationRGB];
    },
    get getEquationAlphaFlag() {
      return gl.flags[this.getEquationAlpha];
    }
  }, {});
  Properties(Alpha.prototype, {
    colorRed: 0,
    colorGreen: 0,
    colorBlue: 0,
    colorAlpha: 1,
    modeRGB: GL.FUNC_ADD,
    modeAlpha: GL.FUNC_ADD,
    srcRGB: GL.ONE,
    srcAlpha: GL.ONE,
    dstRGB: GL.ZERO,
    dstAlpha: GL.ZERO
  }, E | C);
  var DepthTest = function DepthTest() {};
  var $DepthTest = DepthTest;
  ($traceurRuntime.createClass)(DepthTest, {
    enable: function() {
      if (~globalUsage & DEPTH_ENABLED) {
        globalUsage |= DEPTH_ENABLED;
        gl.enable(GL.DEPTH_TEST);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & DEPTH_ENABLED) {
        globalUsage &= ~DEPTH_ENABLED;
        gl.disable(GL.DEPTH_TEST);
      }
      return this;
    },
    setWrite: function() {
      var enable = arguments[0] !== (void 0) ? arguments[0] : this.write;
      globalUsage |= DEPTH_WRITE_SET;
      gl.depthMask(enable);
      return this;
    },
    unsetWrite: function() {
      if (globalUsage & DEPTH_WRITE_SET) {
        globalUsage &= ~DEPTH_WRITE_SET;
        gl.depthMask($DepthTest.prototype.write);
      }
      return this;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : this.func;
      globalUsage |= DEPTH_FUNC_SET;
      gl.depthFunc(func);
      return this;
    },
    unsetFunc: function() {
      if (globalUsage & DEPTH_FUNC_SET) {
        globalUsage &= ~DEPTH_FUNC_SET;
        gl.depthFunc($DepthTest.prototype.func);
      }
      return this;
    },
    setRange: function() {
      var zNear = arguments[0] !== (void 0) ? arguments[0] : this.zNear;
      var zFar = arguments[1] !== (void 0) ? arguments[1] : this.zFar;
      globalUsage |= DEPTH_RANGE_SET;
      gl.depthRange(zNear, zFar);
      return this;
    },
    unsetRange: function() {
      if (globalUsage & DEPTH_RANGE_SET) {
        globalUsage &= ~DEPTH_RANGE_SET;
        gl.depthRange($DepthTest.prototype.zNear, $DepthTest.prototype.zFar);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.DEPTH_TEST);
    },
    get getFunc() {
      return gl.getParameter(GL.DEPTH_FUNC);
    },
    get getRange() {
      return gl.getParameter(GL.DEPTH_RANGE);
    },
    get getWrite() {
      return gl.getParameter(GL.DEPTH_WRITEMASK);
    },
    get getFuncFlag() {
      return gl.flags[this.getFunc];
    }
  }, {});
  Properties(DepthTest.prototype, {
    write: true,
    func: GL.LESS,
    zNear: 0,
    zFar: 1
  }, E | C);
  var PolygonOffset = function PolygonOffset() {};
  var $PolygonOffset = PolygonOffset;
  ($traceurRuntime.createClass)(PolygonOffset, {
    enable: function() {
      if (globalUsage & OFFSET_ENABLED)
        return this;
      globalUsage |= OFFSET_ENABLED;
      gl.enable(GL.POLYGON_OFFSET_FILL);
      return this;
    },
    disable: function() {
      if (~globalUsage & OFFSET_ENABLED)
        return this;
      globalUsage &= ~OFFSET_ENABLED;
      gl.disable(GL.POLYGON_OFFSET_FILL);
      return this;
    },
    set: function() {
      var factor = arguments[0] !== (void 0) ? arguments[0] : this.factor;
      var units = arguments[1] !== (void 0) ? arguments[1] : this.units;
      globalUsage |= OFFSET_SET;
      gl.polygonOffset(factor, units);
      return this;
    },
    unset: function() {
      if (globalUsage & OFFSET_SET) {
        globalUsage &= ~OFFSET_SET;
        gl.polygonOffset($PolygonOffset.prototype.factor, $PolygonOffset.prototype.units);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.POLYGON_OFFSET_FILL);
    },
    get getFactor() {
      return gl.getParameter(GL.POLYGON_OFFSET_FACTOR);
    },
    get getUnits() {
      return gl.getParameter(GL.POLYGON_OFFSET_UNITS);
    }
  }, {});
  Properties(PolygonOffset.prototype, {
    factor: 0,
    units: 0
  }, E | C);
  var CullFace = function CullFace() {};
  var $CullFace = CullFace;
  ($traceurRuntime.createClass)(CullFace, {
    enable: function() {
      if (~globalUsage & CULL_FACE_ENABLED) {
        globalUsage |= CULL_FACE_ENABLED;
        gl.enable(GL.CULL_FACE);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & CULL_FACE_ENABLED) {
        globalUsage &= ~CULL_FACE_ENABLED;
        gl.disable(GL.CULL_FACE);
      }
      return this;
    },
    set: function() {
      var mode = arguments[0] !== (void 0) ? arguments[0] : this.mode;
      globalUsage |= CULL_FACE_SET;
      gl.cullFace(mode);
      return this;
    },
    unset: function() {
      if (globalUsage & CULL_FACE_SET) {
        globalUsage &= ~CULL_FACE_SET;
        gl.cullFace($CullFace.prototype.mode);
      }
      return this;
    },
    setFront: function() {
      var front = arguments[0] !== (void 0) ? arguments[0] : this.front;
      globalUsage |= CULL_FACE_FRONT_SET;
      gl.frontFace(front);
      return this;
    },
    unsetFront: function() {
      if (globalUsage & CULL_FACE_FRONT_SET) {
        globalUsage &= ~CULL_FACE_FRONT_SET;
        gl.frontFace($CullFace.prototype.front);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.CULL_FACE);
    },
    get getFront() {
      return gl.getParameter(GL.FRONT_FACE);
    },
    get getMode() {
      return gl.getParameter(GL.CULL_FACE_MODE);
    },
    get getFrontFlag() {
      return gl.flags[this.getFront];
    },
    get getModeFlag() {
      return gl.flags[this.getMode];
    }
  }, {});
  Properties(CullFace.prototype, {
    mode: GL.FRONT,
    front: GL.CCW
  }, E | C);
  var StencilTest = function StencilTest() {};
  var $StencilTest = StencilTest;
  ($traceurRuntime.createClass)(StencilTest, {
    enable: function() {
      if (~globalUsage & STENCIL_ENABLED) {
        globalUsage |= STENCIL_ENABLED;
        gl.enable(GL.STENCIL_TEST);
      }
      return this;
    },
    disable: function() {
      if (globalUsage & STENCIL_ENABLED) {
        globalUsage &= ~STENCIL_ENABLED;
        gl.disable(GL.STENCIL_TEST);
      }
      return this;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : this.frontFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : this.frontRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : this.frontValueMask;
      globalUsage |= STENCIL_FUNC_SET;
      gl.stencilFunc(func, ref, mask);
      return this;
    },
    setFrontFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : this.frontFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : this.frontRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : this.frontValueMask;
      globalUsage |= STENCIL_FRONT_FUNC_SET;
      gl.stencilFuncSeparate(GL.FRONT, func, ref, mask);
      return this;
    },
    setBackFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : this.backFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : this.backRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : this.backValueMask;
      globalUsage |= STENCIL_BACK_FUNC_SET;
      gl.stencilFuncSeparate(GL.BACK, func, ref, mask);
      return this;
    },
    unsetFunc: function() {
      if (globalUsage & STENCIL_FRONT_FUNC_SET || globalUsage & STENCIL_BACK_FUNC_SET) {
        globalUsage & ~STENCIL_FUNC_SET;
        gl.stencilFunc($StencilTest.prototype.frontFunc, $StencilTest.prototype.frontRef, $StencilTest.prototype.frontValueMask);
      }
      return this;
    },
    setWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : this.frontWriteMask;
      globalUsage |= STENCIL_MASK_SET;
      gl.stencilMask(mask);
      return this;
    },
    setFrontWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : this.frontWriteMask;
      globalUsage |= STENCIL_FRONT_MASK_SET;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return this;
    },
    setBackWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : this.backWriteMask;
      globalUsage |= STENCIL_BACK_MASK_SET;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return this;
    },
    unsetWriteMask: function() {
      if (globalUsage & STENCIL_FRONT_MASK_SET || globalUsage & STENCIL_BACK_MASK_SET) {
        globalUsage &= ~STENCIL_MASK_SET;
        gl.stencilMask($StencilTest.prototype.frontWriteMask);
      }
      return this;
    },
    setOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : this.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : this.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : this.frontDepthPass;
      globalUsage |= STENCIL_OP_SET;
      gl.stencilOp(stencilFail, depthFail, depthPass);
      return this;
    },
    setFrontOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : this.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : this.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : this.frontDepthPass;
      globalUsage |= STENCIL_FRONT_OP_SET;
      gl.stencilOpSeparate(GL.FRONT, stencilFail, depthFail, depthPass);
      return this;
    },
    setBackOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : this.backFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : this.backDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : this.backDepthPass;
      globalUsage |= STENCIL_BACK_OP_SET;
      gl.stencilOpSeparate(GL.BACK, stencilFail, depthFail, depthPass);
      return this;
    },
    unsetOp: function() {
      if (globalUsage & STENCIL_FRONT_OP_SET || globalUsage & STENCIL_BACK_OP_SET) {
        globalUsage &= ~STENCIL_OP_SET;
        gl.stencilOp($StencilTest.prototype.frontFail, $StencilTest.prototype.frontDepthFail, $StencilTest.prototype.frontDepthPass);
      }
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.STENCIL_TEST);
    },
    get getBits() {
      return gl.getParameter(GL.STENCIL_BITS);
    },
    get getFrontFunc() {
      return gl.getParameter(GL.STENCIL_FUNC);
    },
    get getFrontRef() {
      return gl.getParameter(GL.STENCIL_REF);
    },
    get getFrontFail() {
      return gl.getParameter(GL.STENCIL_FAIL);
    },
    get getFrontPassDepthPass() {
      return gl.getParameter(GL.STENCIL_PASS_DEPTH_PASS);
    },
    get getFrontPassDepthFail() {
      return gl.getParameter(GL.STENCIL_PASS_DEPTH_FAIL);
    },
    get getFrontValueMask() {
      return gl.getParameter(GL.STENCIL_VALUE_MASK);
    },
    get getFrontWriteMask() {
      return gl.getParameter(GL.STENCIL_WRITEMASK);
    },
    get getBackFunc() {
      return gl.getParameter(GL.STENCIL_BACK_FUNC);
    },
    get getBackRef() {
      return gl.getParameter(GL.STENCIL_BACK_REF);
    },
    get getBackFail() {
      return gl.getParameter(GL.STENCIL_BACK_FAIL);
    },
    get getBackPassDepthPass() {
      return gl.getParameter(GL.STENCIL_BACK_PASS_DEPTH_PASS);
    },
    get getBackPassDepthFail() {
      return gl.getParameter(GL.STENCIL_BACK_PASS_DEPTH_FAIL);
    },
    get getBackValueMask() {
      return gl.getParameter(GL.STENCIL_BACK_VALUE_MASK);
    },
    get getBackWriteMask() {
      return gl.getParameter(GL.STENCIL_BACK_WRITEMASK);
    },
    get getFrontFuncFlag() {
      return gl.flags[this.getFrontFunc];
    },
    get getFrontFailFlag() {
      return gl.flags[this.getFrontFail];
    },
    get getFrontPassDepthPassFlag() {
      return gl.flags[this.getFrontPassDepthPass];
    },
    get getFrontPassDepthFailFlag() {
      return gl.flags[this.getFrontPassDepthFail];
    },
    get getBackFuncFlag() {
      return gl.flags[this.getBackFunc];
    },
    get getBackFailFlag() {
      return gl.flags[this.getBackFail];
    },
    get getBackPassDepthPassFlag() {
      return gl.flags[this.getBackPassDepthPass];
    },
    get getBackPassDepthFailFlag() {
      return gl.flags[this.getBackPassDepthFail];
    }
  }, {});
  Properties(StencilTest.prototype, {
    frontFunc: GL.ALWAYS,
    frontRef: 0,
    frontValueMask: (1 << 16) - 1,
    frontFail: GL.KEEP,
    frontDepthFail: GL.KEEP,
    frontDepthPass: GL.KEEP,
    frontWriteMask: (1 << 16) - 1,
    backFunc: GL.ALWAYS,
    backRef: 0,
    backValueMask: (1 << 16) - 1,
    backFail: GL.KEEP,
    backDepthFail: GL.KEEP,
    backDepthPass: GL.KEEP,
    backWriteMask: (1 << 16) - 1
  }, E | C);
  var polygonOffset = new PolygonOffset;
  var alpha = new Alpha;
  var depthTest = new DepthTest;
  var stencilTest = new StencilTest;
  var cullFace = new CullFace;
  var scissorTest = new ScissorTest;
  var dither = new Dither;
  var sampleCoverage = new SampleCoverage;
  var Material = function Material() {
    this.usage = 0;
    this.program = DEFAULT_PROGRAM;
    this.uniforms = this.program.getUniforms.material.instantiate();
  };
  var $Material = Material;
  ($traceurRuntime.createClass)(Material, {
    use: function() {
      var bit = $Material;
      var locations = this.uniforms;
      if (currentProgram !== this.program)
        currentProgram = this.program.use();
      if (currentUniforms !== this.uniforms)
        currentUniforms = this.uniforms.set();
      if (this.usage & bit.BLEND_ENABLED) {
        globalUsage |= bit.BLEND_ENABLED;
        this.alpha.use();
      } else if (globalUsage & bit.BLEND_ENABLED) {
        globalUsage &= ~bit.BLEND_ENABLED;
        gl.disable(GL.BLEND);
      }
      if (this.usage & bit.CULL_FACE_ENABLED) {
        globalUsage |= bit.CULL_FACE_ENABLED;
        this.cullFace.use();
      } else if (globalUsage & bit.CULL_FACE_ENABLED) {
        globalUsage &= ~bit.CULL_FACE_ENABLED;
        gl.disable(GL.CULL_FACE);
      }
      if (this.usage & bit.DEPTH_TEST_ENABLED) {
        globalUsage |= bit.DEPTH_TEST_ENABLED;
        this.depthTest.use();
      } else if (globalUsage & bit.DEPTH_TEST_ENABLED) {
        globalUsage &= ~bit.DEPTH_TEST_ENABLED;
        gl.disable(GL.DEPTH_TEST);
      }
      if (this.usage & bit.DITHER_ENABLED) {
        globalUsage |= bit.DITHER_ENABLED;
        this.dither.use();
      } else if (globalUsage & bit.DITHER_ENABLED) {
        globalUsage &= ~bit.DITHER_ENABLED;
        gl.disable(GL.DITHER);
      }
      if (this.usage & bit.POLYGON_OFFSET_FILL_ENABLED) {
        globalUsage |= bit.POLYGON_OFFSET_FILL_ENABLED;
        this.polygonOffset.use();
      } else if (globalUsage & bit.POLYGON_OFFSET_FILL_ENABLED) {
        globalUsage &= ~bit.POLYGON_OFFSET_FILL_ENABLED;
        gl.disable(GL.POLYGON_OFFSET_FILL);
      }
      if (this.usage & bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED) {
        globalUsage |= bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED;
        this.sampleAlphaToCoverage.use();
      } else if (globalUsage & bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED) {
        globalUsage &= ~bit.SAMPLE_ALPHA_TO_COVERAGE_ENABLED;
        gl.disable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      if (this.usage & bit.SAMPLE_COVERAGE_ENABLED) {
        globalUsage |= bit.SAMPLE_COVERAGE_ENABLED;
        this.sampleCoverage.use();
      } else if (globalUsage & bit.SAMPLE_COVERAGE_ENABLED) {
        globalUsage &= ~bit.SAMPLE_COVERAGE_ENABLED;
        gl.disable(GL.SAMPLE_COVERAGE);
      }
      if (this.usage & bit.SCISSOR_TEST_ENABLED) {
        globalUsage |= bit.SCISSOR_TEST_ENABLED;
        this.scissorTest.use();
      } else if (globalUsage & bit.SCISSOR_TEST_ENABLED) {
        globalUsage &= ~bit.SCISSOR_TEST_ENABLED;
        gl.disable(GL.SCISSOR_TEST);
      }
      if (this.usage & bit.STENCIL_TEST_ENABLED) {
        globalUsage |= bit.STENCIL_TEST_ENABLED;
        this.stencilTest.use();
      } else if (globalUsage & bit.STENCIL_TEST_ENABLED) {
        globalUsage &= ~bit.STENCIL_TEST_ENABLED;
        gl.disable(GL.STENCIL_TEST);
      }
      return this;
    },
    enableAlpha: function() {
      this.usage |= BLEND_ENABLED;
      if (this.alpha === undefined)
        this.alpha = new Alpha;
      this.alpha.enable();
      return this;
    },
    disableAlpha: function() {
      this.usage &= ~BLEND_ENABLED;
      this.alpha.disable();
      delete this.alpha;
      return this;
    },
    setAlphaColor: function() {
      var colorRed = arguments[0] !== (void 0) ? arguments[0] : this.alpha.colorRed;
      var colorGreen = arguments[1] !== (void 0) ? arguments[1] : this.alpha.colorGreen;
      var colorBlue = arguments[2] !== (void 0) ? arguments[2] : this.alpha.colorBlue;
      var colorAlpha = arguments[3] !== (void 0) ? arguments[3] : this.alpha.colorAlpha;
      this.usage |= BLEND_COLOR_SET;
      Properties(this.alpha, {
        colorRed: colorRed,
        colorGreen: colorGreen,
        colorBlue: colorBlue,
        colorAlpha: colorAlpha
      }, E | C);
      this.alpha.setColor();
      return this;
    },
    unsetAlphaColor: function() {
      if (this.usage & BLEND_COLOR_SET) {
        this.usage &= ~BLEND_COLOR_SET;
        delete this.alpha.colorRed;
        delete this.alpha.colorGreen;
        delete this.alpha.colorBlue;
        delete this.alpha.colorAlpha;
      }
      this.alpha.unsetColor();
      return this;
    },
    setAlphaFunc: function() {
      var srcRGB = arguments[0] !== (void 0) ? arguments[0] : this.alpha.srcRGB;
      var dstRGB = arguments[1] !== (void 0) ? arguments[1] : this.alpha.dstRGB;
      var srcAlpha = arguments[2] !== (void 0) ? arguments[2] : this.alpha.srcAlpha;
      var dstAlpha = arguments[3] !== (void 0) ? arguments[3] : this.alpha.dstAlpha;
      this.usage |= BLEND_FUNC_SET;
      Properties(this.alpha, {
        srcRGB: srcRGB,
        dstRGB: dstRGB,
        srcAlpha: srcAlpha,
        dstAlpha: dstAlpha
      }, E | C);
      this.alpha.setFunc();
      return this;
    },
    unsetAlphaFunc: function() {
      if (this.usage & BLEND_FUNC_SET) {
        this.usage &= ~BLEND_FUNC_SET;
        delete this.alpha.srcRGB;
        delete this.alpha.dstRGB;
        delete this.alpha.srcAlpha;
        delete this.alpha.dstAlpha;
      }
      this.alpha.unsetFunc();
      return this;
    },
    setAlphaEquation: function() {
      var modeRGB = arguments[0] !== (void 0) ? arguments[0] : this.alpha.modeRGB;
      var modeAlpha = arguments[1] !== (void 0) ? arguments[1] : this.alpha.modeAlpha;
      this.usage |= BLEND_EQUATION_SET;
      Properties(this.alpha, {
        modeRGB: modeRGB,
        modeAlpha: modeAlpha
      }, E | C);
      this.alpha.setEquation();
      return this;
    },
    unsetAlphaEquation: function() {
      if (this.usage & BLEND_EQUATION_SET) {
        this.usage &= ~BLEND_EQUATION_SET;
        delete this.alpha.modeRGB;
        delete this.alpha.modeAlpha;
      }
      this.alpha.unsetEquation();
      return this;
    },
    enableCullFace: function() {
      this.usage |= CULL_FACE_ENABLED;
      if (this.cullFace === undefined)
        this.cullFace = new CullFace;
      this.cullFace.enable();
      return this;
    },
    disableCullFace: function() {
      this.usage &= ~CULL_FACE_ENABLED;
      this.cullFace.disable();
      delete this.cullFace;
      return this;
    },
    setCullFace: function() {
      var mode = arguments[0] !== (void 0) ? arguments[0] : this.cullFace.mode;
      this.usage |= CULL_FACE_SET;
      Properties(this.cullFace, {mode: mode}, E | C);
      this.cullFace.set();
    },
    unsetCullFace: function() {
      if (this.usage & CULL_FACE_SET) {
        this.usage &= ~CULL_FACE_SET;
        delete this.cullFace.mode;
      }
      this.cullFace.unset();
      return this;
    },
    setCullFaceFront: function() {
      var front = arguments[0] !== (void 0) ? arguments[0] : this.cullFace.front;
      this.usage |= CULL_FACE_FRONT_SET;
      Properties(this.cullFace, {front: front}, E | C);
      this.cullFace.setFront();
      return this;
    },
    unsetCullFaceFront: function() {
      if (this.usage & CULL_FACE_FRONT_SET) {
        this.usage &= ~CULL_FACE_FRONT_SET;
        delete this.culLFace.front;
      }
      this.cullFace.unsetFront();
      return this;
    },
    enableDepth: function() {
      this.usage |= DEPTH_ENABLED;
      if (this.depth === undefined)
        this.depth = new DepthTest;
      this.depth.enable();
      return this;
    },
    disableDepth: function() {
      this.usage &= ~DEPTH_ENABLED;
      this.depth.disable();
      delete this.depth;
      return this;
    },
    setDepthWrite: function() {
      var write = arguments[0] !== (void 0) ? arguments[0] : this.depth.write;
      this.usage |= DEPTH_WRITE_SET;
      Properties(this.depth, {write: write}, C | E);
      this.depth.setDepthWrite();
      return this;
    },
    unsetDepthWrite: function() {
      if (this.usage & DEPTH_WRITE_SET) {
        this.usage &= ~DEPTH_WRITE_SET;
        delete this.depth.write;
      }
      this.depth.unsetDepthWrite();
      return this;
    },
    setDepthFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : this.depth.func;
      this.usage |= DEPTH_FUNC_SET;
      Properties(this.depth, {func: func}, C | E);
      this.depth.setFunc();
      return this;
    },
    unsetDepthFunc: function() {
      if (this.usage & DEPTH_FUNC_SET) {
        this.usage &= ~DEPTH_FUNC_SET;
        delete this.depthTest.func;
      }
      this.depthTest.unsetFunc();
      return this;
    },
    setDepthRange: function() {
      var zNear = arguments[0] !== (void 0) ? arguments[0] : this.depth.zNear;
      var zFar = arguments[1] !== (void 0) ? arguments[1] : this.depth.zFar;
      this.usage |= DEPTH_RANGE_SET;
      Properties(this.depth, {
        zNear: zNear,
        zFar: zFar
      }, C | E);
      this.depth.setRange();
      return this;
    },
    unsetDepthRange: function() {
      if (this.usage & DEPTH_RANGE_SET) {
        this.usage &= ~DEPTH_RANGE_SET;
        delete this.depth.zNear;
        delete this.depth.zFar;
      }
      this.depth.unsetRange();
      return this;
    },
    enableDither: function() {
      this.usage |= DITHER_ENABLED;
      if (this.dither === undefined)
        this.dither = new Dither;
      this.dither.enable();
      return this;
    },
    disableDither: function() {
      this.usage &= ~DITHER_ENABLED;
      this.dither.disable();
      delete this.dither;
      return this;
    },
    enablePolygonOffset: function() {
      this.usage |= OFFSET_ENABLED;
      if (this.polygonOffset === undefined)
        this.polygonOffset = new PolygonOffset;
      this.polygonOffset.enable();
      return this;
    },
    disablePolygonOffset: function() {
      this.usage &= ~OFFSET_ENABLED;
      this.polygonOffset.disable();
      delete this.polygonOffset;
      return this;
    },
    setPolygonOffset: function() {
      var factor = arguments[0] !== (void 0) ? arguments[0] : this.polygonOffset.factor;
      var units = arguments[1] !== (void 0) ? arguments[1] : this.polygonOffset.units;
      this.usage |= OFFSET_SET;
      Properties(this.polygonOffset, {
        factor: factor,
        units: units
      }, C | E);
      this.polygonOffset.set();
      return this;
    },
    unsetPolygonOffset: function() {
      if (this.usage & OFFSET_SET) {
        this.usage &= ~OFFSET_SET;
        delete this.polygonOffset.factor;
        delete this.polygonOffset.units;
      }
      this.polygonOffset.unset();
      return this;
    },
    enableSampleCoverage: function() {
      this.usage |= SAMPLE_ENABLED;
      if (this.sampleCoverage === undefined)
        this.sampleCoverage = new SampleCoverage;
      this.sampleCoverage.enable();
      return this;
    },
    disableSampleCoverage: function() {
      this.usage &= ~SAMPLE_ENABLED;
      this.sampleCoverage.disable();
      delete this.sampleCoverage;
      return this;
    },
    enableAlphaToCoverage: function() {
      if (~this.usage & SAMPLE_ALPHA_ENABLED) {
        this.usage |= SAMPLE_ALPHA_ENABLED;
      }
      this.sampleCoverage.enableAlpha();
      return this;
    },
    disableAlphaToCoverage: function() {
      if (this.usage & SAMPLE_ALPHA_ENABLED) {
        this.usage &= ~SAMPLE_ALPHA_ENABLED;
      }
      this.sampleCoverage.disableAlpha();
      return this;
    },
    setSampleCoverge: function() {
      var value = arguments[0] !== (void 0) ? arguments[0] : this.sample.value;
      var invert = arguments[1] !== (void 0) ? arguments[1] : this.sample.invert;
      this.usage |= SAMPLE_SET;
      Properties(this.sampleCoverage, {
        value: value,
        invert: invert
      }, C | E);
      this.sampleCoverage.set();
      return this;
    },
    unsetSampleCoverage: function() {
      if (this.usage & SAMPLE_SET) {
        this.usage &= ~SAMPLE_SET;
        delete this.sampleCoverage.value;
        delete this.sampleCoverage.invert;
      }
      this.sampleCoverage.unset();
      return this;
    },
    enableScissorTest: function() {
      this.usage |= SCISSOR_ENABLED;
      if (this.scissorTest === undefined)
        this.scissorTest = new ScissorTest;
      this.scissorTest.enable();
      return this;
    },
    disableScissorTest: function() {
      this.usage &= ~SCISSOR_ENABLED;
      this.scissorTest.disable();
      delete this.scissorTest;
      return this;
    },
    setScissor: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : this.scissor.x;
      var y = arguments[1] !== (void 0) ? arguments[1] : this.scissor.y;
      var width = arguments[2] !== (void 0) ? arguments[2] : this.scissor.width;
      var height = arguments[3] !== (void 0) ? arguments[3] : this.scissor.height;
      this.usage |= SCISSOR_SET;
      Properties(this.scissor, {
        x: x,
        y: y,
        width: width,
        height: height
      }, E | C);
      this.scissor.set();
      return this;
    },
    unsetScissor: function() {
      if (this.usage & SCISSOR_SET) {
        this.usage &= ~SCISSOR_SET;
        delete this.scissor.x;
        delete this.scissor.y;
        delete this.scissor.width;
        delete this.scissor.height;
      }
      this.scissor.unset();
      return this;
    },
    enableStencilTest: function() {
      this.usage |= STENCIL_ENABLED;
      if (this.stencil === undefined)
        this.stencil = new Stencil;
      this.stencil.enable();
      return this;
    },
    disableStencilTest: function() {
      this.usage &= ~STENCIL_ENABLED;
      this.stencil.disable();
      delete this.stencil;
      return this;
    },
    setStencilFunc: function() {
      var frontFunc = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontFunc;
      var frontRef = arguments[1] !== (void 0) ? arguments[1] : this.stencil.frontRef;
      var frontMask = arguments[2] !== (void 0) ? arguments[2] : this.stencil.frontValueMask;
      this.usage |= STENCIL_FUNC_SET;
      Properties(this.stencil, {
        frontFunc: frontFunc,
        frontRef: frontRef,
        frontMask: frontMask
      }, E | C);
      this.stencil.setFunc();
      return this;
    },
    setStencilFrontFunc: function() {
      var frontFunc = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontFunc;
      var frontRef = arguments[1] !== (void 0) ? arguments[1] : this.stencil.frontRef;
      var frontMask = arguments[2] !== (void 0) ? arguments[2] : this.stencil.frontValueMask;
      this.usage |= STENCIL_FRONT_FUNC_SET;
      Properties(this.stencil, {
        frontFunc: frontFunc,
        frontRef: frontRef,
        frontMask: frontMask
      }, E | C);
      this.stencil.setFrontFunc();
      return this;
    },
    setStencilBackFunc: function() {
      var backFunc = arguments[0] !== (void 0) ? arguments[0] : this.stencil.backFunc;
      var backRef = arguments[1] !== (void 0) ? arguments[1] : this.stencil.backRef;
      var backMask = arguments[2] !== (void 0) ? arguments[2] : this.stencil.backValueMask;
      this.suage |= STENCIL_BACK_FUNC_SET;
      Properties(this.stencil, {
        backFunc: backFunc,
        backRef: backRef,
        backMask: backMask
      }, E | C);
      this.stencil.setBackFunc();
      return this;
    },
    unsetStencilFunc: function() {
      if (this.usage & STENCIL_FRONT_FUNC_SET || this.usage & STENCIL_BACK_FUNC_SET) {
        this.usage & ~STENCIL_FUNC_SET;
        delete this.stencil.frontFunc;
        delete this.stencil.frontRef;
        delete this.stencil.frontMask;
        delete this.stencil.backFunc;
        delete this.stencil.backRef;
        delete this.stencil.backMask;
      }
      this.stentil.unsetFunc();
      return this;
    },
    setStencilWriteMask: function() {
      var frontWriteMask = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontWriteMask;
      this.usage |= STENCIL_MASK_SET;
      Properties(this.stencil, {frontWriteMask: frontWriteMask}, C | E);
      this.stencil.setWriteMask();
      return this;
    },
    setStencilFrontWriteMask: function() {
      var frontWriteMask = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontWriteMask;
      this.usage |= STENCIL_FRONT_MASK_SET;
      Properties(this.stencil, {frontWriteMask: frontWriteMask}, C | E);
      this.stencil.setFrontWriteMask();
      return this;
    },
    setStencilBackWriteMask: function() {
      var backWriteMask = arguments[0] !== (void 0) ? arguments[0] : this.stencil.backWriteMask;
      this.usage |= STENCIL_BACK_MASK_SET;
      Properties(this.stencil, {backWriteMask: backWriteMask}, C | E);
      this.stencil.setBackWriteMask();
      return this;
    },
    unsetStencilWriteMask: function() {
      if (this.usage & STENCIL_FRONT_MASK_SET || this.usage & STENCIL_BACK_MASK_SET) {
        this.usage &= ~STENCIL_MASK_SET;
        delete this.stencil.frontWriteMask;
        delete this.stencil.backWriteMask;
      }
      this.stencil.unsetWriteMask();
      return this;
    },
    setStencilOp: function() {
      var frontFail = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontFail;
      var frontDepthFail = arguments[1] !== (void 0) ? arguments[1] : this.stencil.frontDepthFail;
      var frontDepthPass = arguments[2] !== (void 0) ? arguments[2] : this.stencil.frontDepthPass;
      this.usage |= STENCIL_OP_SET;
      Properties(this.stencil, {
        frontFail: frontFail,
        frontDepthFail: frontDepthFail,
        frontDepthPass: frontDepthPass
      }, C | E);
      this.stencil.setOp();
      return this;
    },
    setStencilFrontOp: function() {
      var frontFail = arguments[0] !== (void 0) ? arguments[0] : this.stencil.frontFail;
      var frontDepthFail = arguments[1] !== (void 0) ? arguments[1] : this.stencil.frontDepthFail;
      var frontDepthPass = arguments[2] !== (void 0) ? arguments[2] : this.stencil.frontDepthPass;
      this.usage |= STENCIL_FRONT_OP_SET;
      Properties(this.stencil, {
        frontFail: frontFail,
        frontDepthFail: frontDepthFail,
        frontDepthPass: frontDepthPass
      }, C | E);
      this.stencil.setFrontOp();
      return this;
    },
    setStencilBackOp: function() {
      var backFail = arguments[0] !== (void 0) ? arguments[0] : this.stencil.backFail;
      var backDepthFail = arguments[1] !== (void 0) ? arguments[1] : this.stencil.backDepthFail;
      var backDepthPass = arguments[2] !== (void 0) ? arguments[2] : this.stencil.backDepthPass;
      this.usage |= STENCIL_BACK_OP_SET;
      Properties(this.stencil, {
        backFail: backFail,
        backDepthFail: backDepthFail,
        backDepthPass: backDepthPass
      }, C | E);
      this.stencil.setBackOp();
      return this;
    },
    unsetStencilOp: function() {
      if (this.usage & STENCIL_FRONT_OP_SET || this.usage & STENCIL_BACK_OP_SET) {
        this.usage &= ~STENCIL_OP_SET;
        delete this.stencil.frontFail;
        delete this.stencil.frontDepthFail;
        delete this.stencil.frontDepthPass;
        delete this.stencil.BackFail;
        delete this.stencil.BackDepthFail;
        delete this.stencil.BackDepthPass;
      }
      this.stencil.unsetOp();
      return this;
    }
  }, {});
  var $__default = Material;
  Properties(Material, {}, E | C);
  return {
    get polygonOffset() {
      return polygonOffset;
    },
    get alpha() {
      return alpha;
    },
    get depthTest() {
      return depthTest;
    },
    get stencilTest() {
      return stencilTest;
    },
    get cullFace() {
      return cullFace;
    },
    get scissorTest() {
      return scissorTest;
    },
    get dither() {
      return dither;
    },
    get sampleCoverage() {
      return sampleCoverage;
    },
    get default() {
      return $__default;
    }
  };
});
System.registerModule("../src/utilities/ULMesh", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMesh";
  var Geometry = System.get("../src/utilities/ULGeometry").default;
  var Material = System.get("../src/utilities/ULMaterial").default;
  var $__2 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__2.Properties,
      Getters = $__2.Getters,
      Setters = $__2.Setters,
      GetterSetters = $__2.GetterSetters,
      E = $__2.E,
      C = $__2.C,
      W = $__2.W;
  var Mesh = function Mesh() {
    var geometry = arguments[0] !== (void 0) ? arguments[0] : new Geometry;
    var material = arguments[1] !== (void 0) ? arguments[1] : new Material;
    this.geometry = geometry;
    this.material = material;
  };
  ($traceurRuntime.createClass)(Mesh, {
    use: function() {
      this.geometry.use();
      this.material.use();
    },
    drawTriangles: function() {},
    drawLines: function() {},
    drawPoints: function() {}
  }, {});
  var $__default = Mesh;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULResource", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULResource";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var MAX_STEPS = 5000;
  var Resource = function Resource(source, target) {
    if (!(this instanceof $Resource))
      return new $Resource(source, target);
    Properties(this, {
      source: source,
      target: target
    }, E | C | W);
  };
  var $Resource = Resource;
  ($traceurRuntime.createClass)(Resource, {}, {
    parseObj: function(string) {
      var RESSOURCE = new $Resource(function(string) {
        var SCENE = {};
        var target = SCENE;
        string.split("\n").forEach(function(line) {
          line = line.split(" ");
          var TYPE = line.shift().toLowerCase();
          if (!TYPE)
            return ;
          switch (TYPE) {
            case "o":
              SCENE[line] = {};
              target = SCENE[line];
              break;
            case "v":
            case "vt":
            case "vn":
              var subtarget = getSubtarget();
              var VERTEX = line.map(function(e) {
                return parseFloat(e);
              });
              subtarget.push(VERTEX);
              break;
            case "f":
              var subtarget = getSubtarget();
              var INDEX = line.map(function(e) {
                var refs = e.split("/").map(function(e) {
                  return parseInt(e, 10) - 1;
                });
                return refs;
              });
              subtarget.push(INDEX);
              break;
            default:
              break;
          }
          function getSubtarget() {
            if (target === SCENE) {
              SCENE.object = {};
              target = SCENE.object;
            }
            if (!target[TYPE])
              target[TYPE] = [];
            return target[TYPE];
          }
        });
        console.log(SCENE);
        return SCENE;
      });
      if (string)
        RESSOURCE.process(string);
      return RESSOURCE;
    },
    base16: function() {
      return new $Resource(function() {
        return new Uint16Array([].slice.call(arguments).map(function(e) {
          return parseInt(e, 16);
        }));
      }, target);
    },
    base8: function() {
      return new $Resource(function() {
        return new Uint8Array([].slice.call(arguments).map(function(e) {
          return parseInt(e, 8);
        }));
      }, target);
    },
    int8: function() {
      var r = new $Resource().setSource(function() {
        return new Int8Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    uint8: function() {
      var r = new $Resource().setSource(function() {
        return new Uint8Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    uint8clamped: function() {
      var r = new $Resource().setSource(function() {
        return new Uint8ClampedArray(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    int16: function() {
      var r = new $Resource().setSource(function() {
        return new Int16Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    uint16: function() {
      var r = new $Resource().setSource(function() {
        return new Uint16Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    int32: function() {
      var r = new $Resource().setSource(function() {
        return new Int32Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    uint32: function() {
      var r = new $Resource().setSource(function() {
        return new Uint32Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    float32: function() {
      var r = new $Resource().setSource(function() {
        return new Float32Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    float64: function() {
      var r = new $Resource().setSource(function() {
        return new Float64Array(arguments);
      });
      if (arguments.length > 0)
        r.process.apply(r, arguments);
      return r;
    },
    css: function(property) {
      var PRIMITIVE = CSSPrimitiveValue;
      var TARGET = document.querySelector(selector);
      TARGET.handleEvent = function(e) {
        var c = getComputedStyle(this);
        var v = c.getPropertyCSSValue(property);
      };
      TARGET.addEventListener("transitionend", TARGET);
      TARGET.style.color = "#555";
    },
    http: function(url, options) {
      if (options === undefined)
        options = {};
      var XHR = new XMLHttpRequest;
      var SOURCE = {
        url: url,
        request: XHR,
        options: options,
        lastUpdated: 0,
        send: function() {
          XHR.open("GET", SOURCE.url);
          for (var prop = void 0 in options) {
            if (prop in XHR)
              XHR[prop] = options[prop];
          }
          XHR.onreadystatechange = options.onreadystatechange || resolve;
          XHR.send();
        }
      };
      var RESOURCE = new $Resource(SOURCE);
      SOURCE.send();
      return RESOURCE;
      function resolve() {
        switch (XHR.readyState) {
          case XHR.UNSENT:
            break;
          case XHR.OPENED:
            break;
          case XHR.HEADERS_RECEIVED:
            SOURCE.lastModified = new Date(XHR.getResponseHeader("Last-Modified")).getTime();
            if (SOURCE.lastModified > SOURCE.lastUpdated)
              SOURCE.lastUpdated = Date.now();
            else {
              XHR.abort();
              if (SOURCE.options.interval)
                setTimeout(SOURCE.send, SOURCE.options.interval);
            }
            break;
          case XHR.LOADING:
            break;
          case XHR.DONE:
            switch (XHR.status) {
              case 200:
                RESOURCE.next(XHR.response);
                if (SOURCE.options.interval)
                  setTimeout(SOURCE.send, SOURCE.options.interval);
                break;
              default:
                if (SOURCE.options.interval)
                  setTimeout(SOURCE.send, SOURCE.options.interval);
                break;
            }
            break;
        }
      }
    }
  });
  var $__default = Resource;
  Properties(Resource.prototype, {
    next: function() {
      if (typeof this.target === "function")
        return this.target.apply(this, arguments);
      else if (this.target instanceof Resource)
        return this.target.process.apply(this.target, arguments);
      else if (arguments.length > 1)
        return this.target = arguments;
      else
        return this.target = arguments[0];
    },
    process: function() {
      if (typeof this.source === "function") {
        var returnValue = this.source.apply(this, arguments);
        if (returnValue === undefined)
          return ;
        else
          return this.next(returnValue);
      } else if (this.source instanceof Resource)
        return this.next(this.source.process.apply(this.source, arguments));
      else {
        if (this.source !== undefined)
          Array.isArray(this.source) ? arguments.unshift.apply(arguments, this.source) : arguments.unshift(this.source);
        return this.next.apply(this, arguments);
      }
    },
    setTarget: function(target) {
      if (this.target !== undefined)
        target.process(this.target);
      this.target = target;
      return this;
    },
    swapTarget: function(target) {
      this.target = target;
      return this;
    },
    setSource: function(source) {
      if (arguments.length > 1)
        source = [].slice.call(arguments);
      this.source = source;
      return this;
    },
    createLeaf: function(source) {
      var node = this;
      var steps = 0;
      while (node.target instanceof Resource) {
        if (steps > MAX_STEPS) {
          throw new Error(("maximum step size of " + MAX_STEPS + " exceeded."));
        }
        node = node.target;
        steps++;
      }
      return node.target = new Resource().setSource(source);
    },
    createRoot: function(source) {
      return new Resource().setSource(source).setTarget(this);
    },
    createFork: function(target) {
      return new Resource().setSource(this).setTarget(target);
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/core.js", [], function() {
  "use strict";
  var __moduleName = "../src/core.js";
  var context = System.get("../src/GLContext");
  var Program = System.get("../src/GLProgram").default;
  var Shader = System.get("../src/GLShader").default;
  var Buffer = System.get("../src/GLVertexbuffer").default;
  var Texture = System.get("../src/GLTexture").default;
  var VertexArrayObject = System.get("../src/GLVertexArrayObject").default;
  var Geometry = System.get("../src/utilities/ULGeometry").default;
  var Material = System.get("../src/utilities/ULMaterial").default;
  var $__7 = System.get("../src/utilities/ULMaterial"),
      alpha = $__7.alpha,
      depthTest = $__7.depthTest,
      dither = $__7.dither,
      polygonOffset = $__7.polygonOffset,
      stencilTest = $__7.stencilTest,
      cullFace = $__7.cullFace,
      sampleCoverage = $__7.sampleCoverage;
  var Mesh = System.get("../src/utilities/ULMesh").default;
  var Resource = System.get("../src/utilities/ULResource").default;
  var $__10 = System.get("../src/math/MLVector"),
      vec2 = $__10.vec2,
      vec3 = $__10.vec3,
      vec4 = $__10.vec4,
      quat4 = $__10.quat4;
  var mat4 = System.get("../src/math/MLMatrix").mat4;
  var InterleavedFloat32 = System.get("../src/utilities/ULInterleavedArrays").InterleavedFloat32;
  parent.InterleavedFloat32 = InterleavedFloat32;
  parent.gl = context.gl;
  parent.ctx = context;
  parent.canvas = context.canvas;
  parent.alpha = alpha;
  parent.depthTest = depthTest;
  parent.dither = dither;
  parent.polygonOffset = polygonOffset;
  parent.stencilTest = stencilTest;
  parent.cullFace = cullFace;
  parent.sampleCoverage = sampleCoverage;
  parent.Program = Program;
  parent.Shader = Shader;
  parent.Buffer = Buffer;
  parent.Texture = Texture;
  parent.VertexArrayObject = VertexArrayObject;
  parent.vec2 = vec2;
  parent.vec3 = vec3;
  parent.vec4 = vec4;
  parent.quat4 = quat4;
  parent.mat4 = mat4;
  parent.Geometry = Geometry;
  parent.Material = Material;
  parent.Mesh = Mesh;
  parent.Resource = Resource;
  try {
    parent.main();
  } catch (err) {
    console.warn(err.stack);
  }
  return {};
});
System.get("../src/core.js" + '');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzQiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIi4uL3NyYy91dGlsaXRpZXMvVUxQcm9wZXJ0eURlc2NyaXB0b3JzLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiLi4vc3JjL0dMQ29udGV4dC5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzgiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMCIsIi4uL3NyYy9HTEFjdGl2ZUluZm8uanMiLCIuLi9zcmMvR0xBdHRyaWJ1dGVMb2NhdGlvbi5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMSIsIi4uL3NyYy9HTFNoYWRlci5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMiIsIi4uL3NyYy9HTFVuaWZvcm1Mb2NhdGlvbi5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMyIsIi4uL3NyYy9tYXRoL01MVmVjdG9yLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIyIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIxIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE1IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIwIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE3IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE4IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE2IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE5IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE0IiwiLi4vc3JjL21hdGgvTUxNYXRyaXguanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMjMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMVW5pZm9ybXMuanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMjQiLCIuLi9zcmMvR0xQcm9ncmFtLmpzIiwiLi4vc3JjL0dMVGV4dHVyZS5qcyIsIi4uL3NyYy9HTFZlcnRleEFycmF5T2JqZWN0LmpzIiwiLi4vc3JjL0dMVmVydGV4YnVmZmVyLmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTEludGVybGVhdmVkQXJyYXlzLmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTEdlb21ldHJ5LmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTE1hdGVyaWFsLmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTE1lc2guanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMUmVzb3VyY2UuanMiLCIuLi9zcmMvY29yZS5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLLGVBQWUsQUFBQywwQ0FBb0IsR0FBQyxDQ0ExQyxVQUFTLEFBQUQ7O0FDQVIsQUFBSSxJQUFBLENBQUEsWUFBVywyQ0FBb0IsQ0FBQztBQ0E3QixBQUFNLElBQUEsQ0FBQSxDQUFBLEVBQUksRUFBSSxDQUFDO0FBQ2YsQUFBTSxJQUFBLENBQUEsQ0FBQSxFQUFJLEVBQUksQ0FBQztBQUNmLEFBQU0sSUFBQSxDQUFBLENBQUEsRUFBSSxFQUFJLENBQUM7QUFFZixTQUFTLFdBQVMsQ0FBRyxNQUFLLENBQUcs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S0FBRyxDQUFDO0lBQUU7QUFDakUsU0FBSyxDQUFJLFVBQVcsQ0FBQSxDQUFJO0FBQUUsT0FBQyxXQUFXLEFBQUMsQ0FBRSxJQUFHLENBQUcsRUFBQSxDQUFFLENBQUM7QUFBRSxXQUFPLEtBQUcsQ0FBQztJQUFFO0FBQ2pFLFNBQUssQ0FBSSxVQUFXLENBQUEsQ0FBSTtBQUFFLE9BQUMsV0FBVyxBQUFDLENBQUUsSUFBRyxDQUFHLEVBQUEsQ0FBRSxDQUFDO0FBQUUsV0FBTyxLQUFHLENBQUM7SUFBRTtBQUNqRSxTQUFLLENBQUksVUFBVyxDQUFBLENBQUk7QUFBRSxPQUFDLFdBQVcsQUFBQyxDQUFFLElBQUcsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUFFLFdBQU8sS0FBRyxDQUFDO0lBQUU7QUFFakUsU0FBSyxDQUFJLFVBQVcsQ0FBQSxDQUFJO0FBQUUsT0FBQyxXQUFXLEFBQUMsQ0FBRSxJQUFHLENBQUcsRUFBQSxDQUFFLENBQUM7QUFBRSxXQUFPLEtBQUcsQ0FBQztJQUFFO0FBQ2pFLFNBQUssQ0FBSSxVQUFXLENBQUEsQ0FBSTtBQUFFLE9BQUMsV0FBVyxBQUFDLENBQUUsSUFBRyxDQUFHLEVBQUEsQ0FBRSxDQUFDO0FBQUUsV0FBTyxLQUFHLENBQUM7SUFBRTtBQUNqRSxTQUFLLENBQUksVUFBVyxDQUFBLENBQUk7QUFBRSxPQUFDLFdBQVcsQUFBQyxDQUFFLElBQUcsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUFFLFdBQU8sS0FBRyxDQUFDO0lBQUU7QUFDakUsU0FBSyxDQUFJLFVBQVcsQ0FBQSxDQUFJO0FBQUUsT0FBQyxXQUFXLEFBQUMsQ0FBRSxJQUFHLENBQUcsRUFBQSxDQUFFLENBQUM7QUFBRSxXQUFPLEtBQUcsQ0FBQztJQUFFO0FBRWpFLFVBQU0sQ0FBSSxVQUFXLENBQUEsQ0FBRyxDQUFBLFNBQVEsQ0FBSTtBQUFFLE9BQUMsaUJBQWlCLEFBQUMsQ0FBRSxJQUFHLENBQUcsVUFBUSxDQUFHLEVBQUEsQ0FBRSxDQUFDO0FBQUUsV0FBTyxLQUFHLENBQUM7SUFBRTtBQUM5RixVQUFN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RyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxRQUFJLENBQUosVUFBUSxFQUFDLEFBQXNCLENBQUk7UUFBdkIsR0FBQyw2Q0FBSSxDQUFBLElBQUcsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDO0FBQzlCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2pELFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2pELFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2pELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxhQUFTLENBQVQsVUFBYSxDQUFBLENBQUk7QUFDaEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMzRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDM0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUUzRCxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUks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QUcsQ0FBQztBQUNuQyxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdkIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDbEIsTUFBQTtBQUNILFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSyxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUNsQixNQUFBO0FBQ0gsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFLLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQ2xC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VUFBTSxDQUFBLENBQUk7QUFDVCxTQUFHLEtBQUssSUFBSSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFDbEIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFlBQVEsQ0FBUixVQUFZLEFBQXVCLENBQUk7UUFBM0IsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsSUFBSSxBQUFDLENBQUMsSUFBRyxDQUFDO0FBQ2xDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDMUcsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzFHLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMxRyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFMUcsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLEFBQUYsQ0FBSTtBQUNaLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ2xFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDbEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUNsRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRWxFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxBQUFGLENBQUk7QUFDWCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBQ1osQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsVUFBUyxVQUFVLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFHNUMsQUFBSSxRQUFBLENBQUEsV0FBVSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3BDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRS9CLFNBQUksV0FBVSxJQUFNLEVBQUE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDOztBQUN6QyxhQUFPLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBRSxDQUFBLEVBQUksWUFBVSxDQUFDLENBQUM7QUFBQSxJQUNsRDtBQUNBLGlCQUFhLENBQWIsVUFBaUIsQ0FBQSxDQUFJO0FBQ3BCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXRFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxZQUFRLENBQVIsVUFBWSxDQUFBLENBQUk7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsQ0FBQSxBQUEwQixDQUFJO1FBQTNCLEVBQUEsNkNBQUksQ0FBQSxVQUFTLElBQUksQUFBQyxDQUFDLElBQUcsQ0FBQztBQUNwQyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENBQUYsVUFBTSxDQUFBLEFBQTRCLENBQUk7UUFBN0IsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsSUFBSSxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ2pDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDbEssTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2xLLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNsSyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFbEssV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFNBQUssQ0FBTCxVQUFTLEdBQUUsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEVBQUMsQ0FBSTtBQUMxQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsWUFBVyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUcsT0FBSyxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7QUFFbkQsU0FBSyxDQUFBLFVBQVUsSUFBTSxFQUFBO0FBQUksUUFBQSxFQUFJLENBQUEsQ0FBQSxJQUFJLEFBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFBLEFBRWxDLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLE1BQU0sQUFBQyxDQUFFLEVBQUMsQ0FBRyxFQUFBLENBQUUsVUFBVSxBQUFDLEVBQUMsQ0FBQztBQUUvQyxTQUFJLENBQUEsVUFBVSxJQUFNLEVBQUEsQ0FBSTtBQUN2QixRQUFBLEVBQUUsR0FBSyxPQUFLLENBQUM7QUFDYixRQUFBLEVBQUksQ0FBQSxDQUFBLE1BQU0sQUFBQyxD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QUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxHQUFHLENBQUUsQ0FBQztBQUVyQyxXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxDQUNmLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFFLEVBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUMsQ0FBQztJQUNIO0FBQ0EsWUFBUSxDQUFSLFVBQVksQUFBSSxDQUFJO1FBQVIsRUFBQSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxDQUFBLEVBQUksSUFBRSxDQUFBLENBQUksQ0FBQSxJQUFHLEdBQUcsQ0FBRSxDQUFDO0FBQ3JDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsQ0FBQSxFQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxHQUFHLENBQUUsQ0FBQztBQUVyQyxXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxDQUNmLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1AsRUFBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1osRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUMsQ0FBQztJQUNIO0FBQ0EsWUFBUSxDQUFSLFVBQVksQUFBSSxDQUFJO1FBQVIsRUFBQSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxDQUFBLEVBQUksSUFBRSxDQUFBLENBQUksQ0FBQSxJQUFHLEdBQUcsQ0FBRSxDQUFDO0FBQ3JDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsQ0FBQSxFQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxHQUFHLENBQUUsQ0FBQztBQUVyQyxXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxDQUNmLENBQUEsQ0FBRSxFQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUMsQ0FBQztJQUNIO0FBQ0EsZ0JBQVksQ0FBWixVQUFnQixJQUFHLENBQUk7QUFDdEIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsVUFBUyxNQUFNLEFBQUMsQ0FBRSxJQUFHLENBQUUsZUFBZSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFFdEQsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFLENBQUM7QUFDakUsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFLENBQUM7QUFDakUsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFB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LENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMvRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDL0UsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRS9FLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxXQUFPLENBQVAsVUFBVyxBQUFGLENBQUk7QUFDWixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxF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Q0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxD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LENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUVBLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBRUgsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLENBQUEsQUFBNEIsQ0FBSTtRQUE3QixFQUFBLDZDQUFJLENBQUEsVUFBUyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDakMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFB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QUNsQixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDbEIsT0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2xCLE9BQUssTUFBTSxFQUFJLE1BQUksQ0FBQztBQUNwQixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFFbEIsT0FBSyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBQzFCLE9BQUssU0FBUyxFQUFJLFNBQU8sQ0FBQztBQUMxQixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFFbEIsT0FBSyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBRTFCLElBQUk7QUFDSCxTQUFLLEtBQUssQUFBQyxFQUFDLENBQUM7RUFDZCxDQUFFLE9BQVEsR0FBRSxDQUFJO0FBQ2YsVUFBTSxLQUFLLEFBQUMsQ0FBQyxHQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQ3hCO0FBQUEsQXRDeERBLFdBQXVCO0FIRWpCLENERndELENBQUM7QTJDQS9ELEtBQUssSUFBSSxBQUFDLENBQUMsa0JBQW1CLEdBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6IkQ6L3dlYi9wb2x5bWVyL2Rldi9nbC1lbGVtZW50cy9iaW4vZW5naW5lLmpzIiwic291cmNlUm9vdCI6IkQ6L3dlYi9wb2x5bWVyL2Rldi9nbC1lbGVtZW50cy9iaW4vIiwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyTW9kdWxlKCRfX3BsYWNlaG9sZGVyX18wLCBbXSwgJF9fcGxhY2Vob2xkZXJfXzEpOyIsImZ1bmN0aW9uKCkge1xuICAgICAgICAkX19wbGFjZWhvbGRlcl9fMFxuICAgICAgfSIsInZhciBfX21vZHVsZU5hbWUgPSAkX19wbGFjZWhvbGRlcl9fMDsiLG51bGwsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMCIsImdldCAkX19wbGFjZWhvbGRlcl9fMCgpIHsgcmV0dXJuICRfX3BsYWNlaG9sZGVyX18xOyB9IiwiU3lzdGVtLmdldCgkX19wbGFjZWhvbGRlcl9fMCkiLG51bGwsInZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xIiwiKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzAsICRfX3BsYWNlaG9sZGVyX18xLCAkX19wbGFjZWhvbGRlcl9fMikiLCJmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMTtcbiAgICAgICAgICByZXR1cm4gKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzIsICRfX3BsYWNlaG9sZGVyX18zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNCk7XG4gICAgICAgIH0oKSIsInZvaWQgMCIsbnVsbCxudWxsLCJ2YXIgJF9fZGVmYXVsdCA9ICRfX3BsYWNlaG9sZGVyX18wIixudWxsLCJ2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMSIsbnVsbCwiJHRyYWNldXJSdW50aW1lLnNwcmVhZCgkX19wbGFjZWhvbGRlcl9fMCkiLG51bGwsIiR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oJF9fcGxhY2Vob2xkZXJfXzApIiwicmV0dXJuICRfX3BsYWNlaG9sZGVyX18wKFxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMSxcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIsIHRoaXMpOyIsIiR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZSIsImZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSAkX19wbGFjZWhvbGRlcl9fMFxuICAgIH0iLCIkY3R4LnN0YXRlID0gKCRfX3BsYWNlaG9sZGVyX18wKSA/ICRfX3BsYWNlaG9sZGVyX18xIDogJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgIGJyZWFrIiwicmV0dXJuICRfX3BsYWNlaG9sZGVyX18wIiwiJGN0eC5tYXliZVRocm93KCkiLCJyZXR1cm4gJGN0eC5lbmQoKSIsIigkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKCRfX3BsYWNlaG9sZGVyX18wLCAkX19wbGFjZWhvbGRlcl9fMSwgJF9fcGxhY2Vob2xkZXJfXzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMykiLG51bGwsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07IixudWxsLCIkdHJhY2V1clJ1bnRpbWUuc3VwZXJDb25zdHJ1Y3RvcihcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiU3lzdGVtLmdldCgkX19wbGFjZWhvbGRlcl9fMCArJycpIl19
