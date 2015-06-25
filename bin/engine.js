System.registerModule("../src/gui/UIView", [], function() {
  "use strict";
  var __moduleName = "../src/gui/UIView";
  var ObjectViewStyle = "\n\t:host {\n\t\tbackground \t\t: #222222;\n\t\twidth \t\t\t: 260px;\n\t\tdisplay \t\t: flex;\n\t\tflex-direction \t: column;\n\t\tpadding \t\t: 10px;\n\t\tborder-radius \t: 5px 15px 5px 5px;\n\t\tfont-family\t\t: Consolas, Lucida Console, monospace;\n\t/*\tfont-family\t\t: 'Segoe UI', Tahoma, sans-serif;*/\n\t\tfont-size\t\t: 12px;\n\t\tcolor \t\t\t: #dddddd;\n\t\ttext-shadow\t\t: 0 0 1px;\n\t\tborder: 2px solid #BBB\n\t}\n\t.container {\n\t\tmargin-left\t\t: 15px;\n\t\t-webkit-user-select: none;\n\t\tuser-select \t: none;\n\t}\n\t.header {\n\t\tdisplay \t\t: flex;\n\t\t-webkit-user-select: initial;\n\t\tuser-select \t: initial;\n\t}\n\t.item {\n\t\tdisplay \t\t: flex;\n\t\tflex-direction\t: column;\n\t\tjustify-content : space-between;\n\t\tmargin-top\t\t: 3px;\n\t\t-webkit-user-select: none;\n\t\tuser-select \t: none;\n\t}\n\t.expandable {\n\t\tcursor\t\t\t: pointer;\n\t\t-webkit-user-select: none;\n\t\tuser-select \t: none;\n\t\tcolor\t\t\t: #8c8c8c;\n\n\t}\n\t.expandable.hidden {\n\t\tvisibility\t\t: hidden;\n\t}\n\t.expandable.hidden::before {\n\t\tcontent : \"+\";\n\t}\n\t.expandable.collapsed::before {\n\t\tcontent : \"+\";\n\t}\n\t.expandable.expanded::before {\n\t\tcontent : \"-\";\n\t}\n\t.center {\n\t\tcolor\t\t\t: #7c7c7c;\n\t\tfont-weight\t\t: bold;\n\t\tpadding\t\t\t: 0px 4px;\n\t\t-webkit-user-select: initial;\n\t\tuser-select \t: initial;\n\t}\n\t.center.configurable {\n\t\tcolor\t\t\t: white;\n\t}\n\t.property {\n\t\tcolor\t\t\t: #77a8c6;\n\t\topacity\t\t\t: 0.5;\n\t\ttext-shadow\t\t: 0 0 1px;\n\t\tflex\t\t\t: 0 1 30%;\n\t\toverflow\t\t: hidden;\n\t\t-webkit-user-select: initial;\n\t\tuser-select \t: initial;\n\t}\n\t.property.enumerable {\n\t\topacity\t\t\t: 1;\n\t}\n\t.value {\n\t\tflex \t\t\t: 1 0 50%;\n\t\tcolor\t\t\t: #7c7c7c;\n\t\toverflow\t\t: hidden;\n\t\t-webkit-user-select: initial;\n\t\tuser-select \t: initial;\n\t}\n\t.value.number {\n\t\tbackground: none;\n\t\ttext-shadow\t\t: 0 0 1px;\n\t\tborder: none;\n\t\tfont-weight: bold;\n\t\tpadding : 0;\n\t\tfont-size : 11px;\n\t\toutline: transparent;\n\t}\n\t.value.number.writable {\n\t\tcolor : #89f5a2;\n\t}\n\t.value.boolean {\n\t\tcolor \t\t\t: rgb(255, 205, 138);\n\t}\n\t.value.boolean.writable {\n\n\t}\n\t.value.string {\n\t\tcolor : #f0874f;\n\t\topacity : 0.5;\n\t}\n\t.value.string.writable {\n\t\topacity : 1;\t\n\t}\n\t.value.object {\n\t\ttext-shadow\t\t: 0 0 1px;\n\t\tfont-family: Consolas;\n\t\tcolor: #dddddd;\n\t\topacity : 0.5;\n\t}\n\t.value.object.writable {\n\t\topacity : 1;\n\t}\n\t.value.function {\n\t\tcolor : rgb(111, 200, 255);\n\t\topacity : 0.5;\n\t}\n\t.value.function.writable {\n\t\topacity : 1;\t\n\t}\n";
  var ObjectView = function ObjectView(model, name) {
    var element = document.createElement("div");
    var shadowRoot = element.createShadowRoot();
    var style = document.createElement("style");
    var header = document.createElement("div");
    header.innerHTML = ("\n\t\t\t<span class=\"expandable expanded\"></span>\n\t\t\t<span>" + model.constructor.name + "&nbsp;" + (name || "") + "&nbsp;{</span>\n\t\t");
    style.innerHTML = ObjectViewStyle;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(header);
    shadowRoot.appendChild(createExpandedObjectEntry(model));
    var footer = document.createElement("span");
    footer.innerHTML = "\n\t\t\t<span>}</span>\n\t\t";
    shadowRoot.appendChild(footer);
    return element;
  };
  ($traceurRuntime.createClass)(ObjectView, {}, {});
  var $__default = ObjectView;
  function createExpandedObjectEntry(model) {
    var container = document.createElement("div");
    container.className = "container";
    var keys = Object.getOwnPropertyNames(model);
    if (keys.length < 100) {
      for (var key in model) {
        var descriptor = getDescriptorRecursive(model, key);
        var entry = createEntry(key, descriptor);
        if (entry)
          container.appendChild(entry);
      }
      for (var $__1 = keys[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2 = void 0; !($__2 = $__1.next()).done; ) {
        var key$__3 = $__2.value;
        {
          var descriptor$__4 = Object.getOwnPropertyDescriptor(model, key$__3);
          if (!descriptor$__4.enumerable) {
            var entry$__5 = createEntry(key$__3, descriptor$__4);
            if (entry$__5)
              container.appendChild(entry$__5);
          }
        }
      }
    }
    var proto = Object.getPrototypeOf(model);
    if (proto) {
      var entry$__6 = createObjectEntry("[[proto]]", proto, false, false, false);
      if (entry$__6)
        container.appendChild(entry$__6);
    }
    return container;
    function getDescriptorRecursive(object, property) {
      var descriptor = Object.getOwnPropertyDescriptor(object, property);
      if (!descriptor) {
        var proto$__7 = Object.getPrototypeOf(object);
        if (proto$__7)
          return getDescriptorRecursive(proto$__7, property);
        else
          return ;
      } else
        return descriptor;
    }
  }
  function createEntry(key, descriptor) {
    if (descriptor.value !== undefined && descriptor.value !== null) {
      var value = descriptor.value;
      var enumerable = descriptor.enumerable;
      var configurable = descriptor.configurable;
      var writable = descriptor.writable;
      var type = typeof value;
      switch (type) {
        case "object":
          if (value.createUI)
            return value.createUI(key, value, enumerable, configurable, writable);
          else
            return createObjectEntry(key, value, enumerable, configurable, writable);
          break;
        case "number":
          return createNumberEntry(key, value, enumerable, configurable, writable);
          break;
        case "string":
          return createStringEntry(key, value, enumerable, configurable, writable);
          break;
        case "function":
          return createFunctionEntry(key, value, enumerable, configurable, writable);
          break;
        case "boolean":
          return createBooleanEntry(key, value, enumerable, configurable, writable);
          break;
        default:
          break;
      }
    } else {}
  }
  function createNumberEntry(key, value, enumerable, configurable, writable) {
    var element = document.createElement("div");
    element.className = "item";
    element.innerHTML = ("\n\t\t<div class=\"header\">\n\t\t\t<span class=\"expandable hidden\">&nbsp;</span>\n\t\t\t<span class=\"property " + (enumerable ? "enumerable" : "") + "\">" + key + "</span>\n\t\t\t<span class=\"center " + (configurable ? "configurable" : "") + "\"> : </span>\n\t\t\t<input " + (writable ? "" : "disabled") + " class=\"value number " + (writable ? "writable" : "") + "\" type=\"number\", value=\"" + value + "\" ></input>\n\t\t</div>\n\t");
    return element;
  }
  function createObjectEntry(key, value, enumerable, configurable, writable) {
    var element = document.createElement("div");
    var hasLength = length in value;
    element.className = "item";
    element.innerHTML = ("\n\t\t<div class=\"header\">\n\t\t\t<span class=\"expandable collapsed\">&nbsp;</span>\n\t\t\t<span class=\"property " + (enumerable ? "enumerable" : "") + "\">" + key + "</span>\n\t\t\t<span class=\"center " + (configurable ? "configurable" : "") + "\"> : </span>\n\t\t\t<span class=\"value object " + (writable ? "writable" : "") + "\">" + value.constructor.name + (hasLength ? "[" + value.length + "]" : "") + "</span>\n\t\t<div>\n\t");
    var expander = element.children[0].children[0];
    expander.addEventListener("click", function createExpansion() {
      var properties = createExpandedObjectEntry(value);
      expander.removeEventListener("click", createExpansion);
      expander.addEventListener("click", function() {
        expander.classList.toggle("collapsed");
        expander.classList.toggle("expanded");
        var s = properties.style;
        s.display = s.display === "none" ? "" : "none";
      });
      expander.classList.toggle("collapsed");
      expander.classList.toggle("expanded");
      element.appendChild(properties);
    });
    return element;
  }
  function createFunctionEntry(key, value, enumerable, configurable, writable) {
    var element = document.createElement("div");
    element.className = "item";
    element.innerHTML = ("\n\t\t<div class=\"header\">\n\t\t\t<span class=\"expandable collapsed\">&nbsp;</span>\n\t\t\t<span class=\"property " + (enumerable ? "enumerable" : "") + "\">" + key + "</span>\n\t\t\t<span class=\"center " + (configurable ? "configurable" : "") + "\"> : </span>\n\t\t\t<span class=\"value function " + (writable ? "writable" : "") + "\">" + (value.name ? value.name : "function") + "(" + value.length + ")</span>\n\t\t</div>\n\t");
    var expander = element.children[0].children[0];
    expander.addEventListener("click", function createExpansion() {
      var properties = createExpandedObjectEntry(value);
      expander.removeEventListener("click", createExpansion);
      expander.addEventListener("click", function() {
        expander.classList.toggle("collapsed");
        expander.classList.toggle("expanded");
        var s = properties.style;
        s.display = s.display === "none" ? "" : "none";
      });
      expander.classList.toggle("collapsed");
      expander.classList.toggle("expanded");
      element.appendChild(properties);
    });
    return element;
  }
  function createStringEntry(key, value, enumerable, configurable, writable) {}
  function createBooleanEntry(key, value, enumerable, configurable, writable) {}
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULPropertyDescriptors.js", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULPropertyDescriptors.js";
  var E = 1;
  var C = 2;
  var W = 4;
  var DESCRIPTOR = {};
  function Properties(target, values, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    DESCRIPTOR.writable = (descriptorMask & W) ? true : false;
    for (var p in values) {
      DESCRIPTOR.value = values[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.value;
  }
  function Property(target, key, value, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    DESCRIPTOR.writable = (descriptorMask & W) ? true : false;
    DESCRIPTOR.value = value;
    Object.defineProperty(target, key, DESCRIPTOR);
    delete DESCRIPTOR.value;
  }
  function Getters(target, getters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in getters) {
      DESCRIPTOR.get = getters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.get;
  }
  function Setters(target, setters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in setters) {
      DESCRIPTOR.set = getters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.set;
  }
  function GetterSetters(target, getters, setters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in setters) {
      DESCRIPTOR.get = getters[p];
      DESCRIPTOR.set = setters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.get;
    delete DESCRIPTOR.set;
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
    get Property() {
      return Property;
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
System.registerModule("../src/math/MLVector.js", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "../src/math/MLVector.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var Vector = function Vector() {};
  var $Vector = Vector;
  ($traceurRuntime.createClass)(Vector, ($__2 = {}, Object.defineProperty($__2, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__4() {
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
      }, $__4, this);
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
    set: function() {
      for (var values = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        values[$__3] = arguments[$__3];
      for (var i in values)
        this[i] = values[i];
    },
    copy: function(vA) {
      for (var i in vA)
        this[i] = vA[i];
    },
    add: function(vA) {
      for (var i in vA)
        this[i] += vA[i];
      return this;
    },
    addScalar: function(s) {
      for (var i in this)
        this[i] += s;
    },
    sub: function(vA) {
      for (var i in vA)
        this[i] -= vA[i];
      return this;
    },
    multiply: function(vA) {
      for (var i in vA)
        this[i] *= vA[i];
      return this;
    },
    multiplyScalar: function(s) {
      for (var i in this)
        this[i] *= s;
      return this;
    },
    lerp: function(vA, s) {
      for (var i in this)
        this[i] += (vA[i] - this[i]) * s;
      return this;
    },
    dot: function(vA) {
      return [].reduce.call(this, function(p, c, i) {
        return p += c * vA[i];
      }, 0);
    },
    normalize: function() {
      var l = this.getLength;
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
  }, C);
  var vec2 = function vec2(x, y) {
    $traceurRuntime.superConstructor($vec2).call(this);
    this[0] = x || 0;
    this[1] = y || 0;
  };
  var $vec2 = vec2;
  ($traceurRuntime.createClass)(vec2, {}, {
    clone: function(vA) {
      return new $vec2().copy(vA);
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
    length: 2,
    add: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      var v = this;
      v[0] = vA[0] + vB[0];
      v[1] = vA[1] + vB[1];
      return this;
    },
    set: function(x, y) {
      this[0] = x;
      this[1] = y;
      return this;
    },
    copy: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
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
  Getters(vec2.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]);
    }
  }, C);
  var vec3 = function vec3(x, y, z) {
    $traceurRuntime.superConstructor($vec3).call(this);
    this[0] = x || 0;
    this[1] = y || 0;
    this[2] = z || 0;
  };
  var $vec3 = vec3;
  ($traceurRuntime.createClass)(vec3, {}, {
    clone: function(vA) {
      return new $vec3().copy(vA);
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
    length: 3,
    set: function(x, y, z) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      return this;
    },
    copy: function(vA) {
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
      var vB = arguments[1] !== (void 0) ? arguments[1] : vec3.clone(this);
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
  Properties(vec3, {
    UP: new vec3(0, 1, 0),
    DOWN: new vec3(0, -1, 0),
    RIGHT: new vec3(1, 0, 0),
    LEFT: new vec3(-1, 0, 0),
    AHEAD: new vec3(0, 0, 1),
    BACK: new vec3(0, 0, -1)
  });
  Getters(vec3.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1] + this[2] * this[2];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]) + Math.abs(this[2]);
    }
  }, C);
  var vec4 = function vec4(x, y, z, w) {
    $traceurRuntime.superConstructor($vec4).call(this);
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
    length: 4,
    set: function(x, y, z, w) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this[3] = w;
      return this;
    },
    copy: function(vA) {
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
    dot: function(vB) {
      return vec4.dot(this, vB);
    }
  });
  Getters(vec4.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]) + Math.abs(this[2]) + Math.abs(this[3]);
    }
  }, C);
  var quat4 = function quat4() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 0;
    var y = arguments[1] !== (void 0) ? arguments[1] : 0;
    var z = arguments[2] !== (void 0) ? arguments[2] : 0;
    var w = arguments[3] !== (void 0) ? arguments[3] : 1;
    $traceurRuntime.superConstructor($quat4).call(this);
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
  };
  var $quat4 = quat4;
  ($traceurRuntime.createClass)(quat4, {}, {
    clone: function(vA) {
      return new $quat4().copy(vA);
    },
    axisAngle: function(axis, angle) {
      return new $quat4().axisAngle(axis, angle);
    },
    multiply: function(qA, qB) {
      return new $quat4().multiply(qA, qB);
    }
  }, Vector);
  Properties(quat4.prototype, {
    length: 4,
    set: function(x, y, z, w) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this[3] = w;
      return this;
    },
    copy: function(vA) {
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
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/math/MLVector.js"),
      vec2 = $__1.vec2,
      vec3 = $__1.vec3,
      vec4 = $__1.vec4,
      quat4 = $__1.quat4;
  var mat4 = function mat4() {
    var width = 4;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width),
      3: new Float32Array(buffer, 3 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.Identity();
  };
  var $mat4 = mat4;
  ($traceurRuntime.createClass)(mat4, {}, {
    clone: function(m) {
      return new $mat4().copy(m);
    },
    cloneArray: function(a) {
      return new $mat4().copyArray(a);
    },
    add: function(a, b) {
      return new $mat4().add(a, b);
    },
    multiply: function(a, b) {
      return new $mat4().multiply(a, b);
    },
    addScalar: function(m, s) {
      return $mat4.clone(m).addScalar(s);
    },
    multiplyScalar: function(m, s) {
      return $mat4.clone(m).multiplyScalar(s);
    },
    lookAt: function(m, eye, target, up) {
      return $mat4.clone(m).lookAt(eye, target, up);
    },
    Frustum: function(left, right, bottom, top, near, far) {
      return new $mat4().Frustum(left, right, bottom, top, near, far);
    },
    Orthographic: function(left, right, bottom, top, near, far) {
      return new $mat4().Orthographic(left, right, bottom, top, near, far);
    },
    Perspective: function(aspect, fov, near, far) {
      return new $mat4().Perspective(aspect, fov, near, far);
    },
    Translation: function(x, y, z) {
      return new $mat4().Translation(x, y, z);
    },
    Scale: function(x, y, z) {
      return new $mat4().Scale(x, y, z);
    },
    RotationX: function(rad) {
      return new $mat4().RotationX(rad);
    },
    RotationY: function(rad) {
      return new $mat4().RotationY(rad);
    },
    RotationZ: function(rad) {
      return new $mat4().RotationZ(rad);
    },
    RotationQuat4: function(quat) {
      return new $mat4().RotationQuat4(quat);
    }
  });
  Properties(mat4.prototype, {
    length: 4,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data || m);
      return this;
    },
    copyArray: function(array) {
      this.data.set(array);
      return this;
    },
    Identity: function() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : this;
      return this.set(a[0][0], a[1][0], a[2][0], a[3][0], a[0][1], a[1][1], a[2][1], a[3][1], a[0][2], a[1][2], a[2][2], a[3][2], a[0][3], a[1][3], a[2][3], a[3][3]);
    },
    invert: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT4.transpose(this);
      var m = this;
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
      m[1][3] = a[0][1] * a[2][2] * a[3][0] - a[0][2] * a[2][1] * a[3][0] + a[0][2] * a[2][0] * a[3][1] - a[0][0] * a[2][2] * a[3][1] - a[0][1] * a[2][0] * a[3][2] + a[0][0] * a[2][1] * a[3][2];
      m[2][3] = a[0][2] * a[1][1] * a[3][0] - a[0][1] * a[1][2] * a[3][0] - a[0][2] * a[1][0] * a[3][1] + a[0][0] * a[1][2] * a[3][1] + a[0][1] * a[1][0] * a[3][2] - a[0][0] * a[1][1] * a[3][2];
      m[3][3] = a[0][1] * a[1][2] * a[2][0] - a[0][2] * a[1][1] * a[2][0] + a[0][2] * a[1][0] * a[2][1] - a[0][0] * a[1][2] * a[2][1] - a[0][1] * a[1][0] * a[2][2] + a[0][0] * a[1][1] * a[2][2];
      var determinant = a[0][0] * m[0][0] + a[1][0] * m[1][0] + a[2][0] * m[2][0] + a[3][0] * m[3][0];
      if (Math.abs(determinant) < Number.EPSILON)
        return this.Identity();
      else
        return this.multiplyScalar(1 / determinant);
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
    add: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : this;
      return this.set(a[0][0] + b[0][0], a[0][1] + b[0][1], a[0][2] + b[0][2], a[0][3] + b[0][3], a[1][0] + b[1][0], a[1][1] + b[1][1], a[1][2] + b[1][2], a[1][3] + b[1][3], a[2][0] + b[2][0], a[2][1] + b[2][1], a[2][2] + b[2][2], a[2][3] + b[2][3], a[3][0] + b[3][0], a[3][1] + b[3][1], a[3][2] + b[3][2], a[3][3] + b[3][3]);
    },
    multiply: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : this;
      return this.set(a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0] + a[0][3] * b[3][0], a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1] + a[0][3] * b[3][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2] + a[0][3] * b[3][2], a[0][0] * b[0][3] + a[0][1] * b[1][3] + a[0][2] * b[2][3] + a[0][3] * b[3][3], a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0] + a[1][3] * b[3][0], a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1] + a[1][3] * b[3][1], a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2] + a[1][3] * b[3][2], a[1][0] * b[0][3] + a[1][1] * b[1][3] + a[1][2] * b[2][3] + a[1][3] * b[3][3], a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0] + a[2][3] * b[3][0], a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1] + a[2][3] * b[3][1], a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2] + a[2][3] * b[3][2], a[2][0] * b[0][3] + a[2][1] * b[1][3] + a[2][2] * b[2][3] + a[2][3] * b[3][3], a[3][0] * b[0][0] + a[3][1] * b[1][0] + a[3][2] * b[2][0] + a[3][3] * b[3][0], a[3][0] * b[0][1] + a[3][1] * b[1][1] + a[3][2] * b[2][1] + a[3][3] * b[3][1], a[3][0] * b[0][2] + a[3][1] * b[1][2] + a[3][2] * b[2][2] + a[3][3] * b[3][2], a[3][0] * b[0][3] + a[3][1] * b[1][3] + a[3][2] * b[2][3] + a[3][3] * b[3][3]);
    },
    determinant: function() {
      var m = this;
      var a1 = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      var a2 = m[0][0] * m[1][2] - m[0][2] * m[1][0];
      var a3 = m[0][0] * m[1][3] - m[0][3] * m[1][0];
      var a4 = m[0][1] * m[1][2] - m[0][2] * m[1][1];
      var a5 = m[0][1] * m[1][3] - m[0][3] * m[1][1];
      var a6 = m[0][2] * m[1][3] - m[0][3] * m[1][2];
      var b1 = m[2][2] * m[3][3] - m[2][3] * m[3][2];
      var b2 = m[2][1] * m[3][3] - m[2][3] * m[3][1];
      var b3 = m[2][1] + m[3][2] - m[2][2] + m[3][1];
      var b4 = m[2][0] + m[3][3] - m[2][3] + m[3][0];
      var b5 = m[2][0] + m[3][2] - m[2][2] + m[3][0];
      var b6 = m[2][0] + m[3][1] - m[2][1] + m[3][0];
      return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
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
      m[0][0] = x[0];
      m[0][1] = x[1];
      m[0][2] = x[2];
      m[1][0] = y[0];
      m[1][1] = y[1];
      m[1][2] = y[2];
      m[2][0] = z[0];
      m[2][1] = z[1];
      m[2][2] = z[2];
      return this;
    },
    Frustum: function(left, right, bottom, top, near, far) {
      var x = 2 * near / (right - left);
      var y = 2 * near / (top - bottom);
      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = -(far + near) / (far - near);
      var d = -2 * far * near / (far - near);
      return this.set(x, 0, 0, 0, 0, y, 0, 0, a, b, c, 1, 0, 0, d, 0);
    },
    Orthographic: function(left, right, bottom, top, near, far) {
      var w = right - left;
      var h = top - bottom;
      var d = far - near;
      var x = (left + right) / -w;
      var y = (top + bottom) / -h;
      var z = (near + far) / -d;
      w = 2 / w;
      h = 2 / h;
      d = -2 / d;
      return this.set(w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, x, y, z, 1);
    },
    Perspective: function(aspect, fov, near, far) {
      var y = 1.0 / Math.tan(fov / 2);
      var nf = 1 / (near - far);
      var x = y / aspect;
      var z = (far + near) * nf;
      var d = (2 * far * near) * nf;
      return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, -1, 0, 0, d, 0);
    },
    translate: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      var m = this;
      var a = CACHE_MAT4.copy(this);
      m[3][0] = a[0][0] * x + a[1][0] * y + a[2][0] * z + a[3][0];
      m[3][1] = a[0][1] * x + a[1][1] * y + a[2][1] * z + a[3][1];
      m[3][2] = a[0][2] * x + a[1][2] * y + a[2][2] * z + a[3][2];
      m[3][3] = a[0][3] * x + a[1][3] * y + a[2][3] * z + a[3][3];
      return this;
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      var m = this;
      m[0][0] *= x;
      m[0][1] *= x;
      m[0][2] *= x;
      m[0][3] *= x;
      m[1][0] *= y;
      m[1][1] *= y;
      m[1][2] *= y;
      m[1][3] *= y;
      m[2][0] *= z;
      m[2][1] *= z;
      m[2][2] *= z;
      m[2][3] *= z;
      return this;
    },
    rotate: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var x = arguments[1] !== (void 0) ? arguments[1] : 0;
      var y = arguments[2] !== (void 0) ? arguments[2] : 0;
      var z = arguments[3] !== (void 0) ? arguments[3] : 0;
      var length = Math.sqrt(x * x + y * y + z * z);
      if (Math.abs(length) < Number.EPSILON)
        return this.Identity();
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var t = 1 - c;
      length = 1 / length;
      x *= length;
      y *= length;
      z *= length;
      var r = CACHE_MAT3;
      r[0][0] = x * x * t + c;
      r[1][1] = y * y * t + c;
      r[2][2] = z * z * t + c;
      r[0][1] = x * y * t + z * s;
      r[1][2] = y * z * t + x * s;
      r[2][0] = z * x * t + y * s;
      r[0][2] = x * z * t - y * s;
      r[1][0] = y * x * t - z * s;
      r[2][1] = z * y * t - x * s;
      var a = CACHE_MAT4.copy(this);
      var m = this;
      m[0][0] = r[0][0] * a[0][0] + r[0][1] * a[1][0] + r[0][2] * a[2][0];
      m[0][1] = r[0][0] * a[0][1] + r[0][1] * a[1][1] + r[0][2] * a[2][1];
      m[0][2] = r[0][0] * a[0][2] + r[0][1] * a[1][2] + r[0][2] * a[2][2];
      m[0][3] = r[0][0] * a[0][3] + r[0][1] * a[1][3] + r[0][2] * a[2][3];
      m[1][0] = r[1][0] * a[0][0] + r[1][1] * a[1][0] + r[1][2] * a[2][0];
      m[1][1] = r[1][0] * a[0][1] + r[1][1] * a[1][1] + r[1][2] * a[2][1];
      m[1][2] = r[1][0] * a[0][2] + r[1][1] * a[1][2] + r[1][2] * a[2][2];
      m[1][3] = r[1][0] * a[0][3] + r[1][1] * a[1][3] + r[1][2] * a[2][3];
      m[2][0] = r[2][0] * a[0][0] + r[2][1] * a[1][0] + r[2][2] * a[2][0];
      m[2][1] = r[2][0] * a[0][1] + r[2][1] * a[1][1] + r[2][2] * a[2][1];
      m[2][2] = r[2][0] * a[0][2] + r[2][1] * a[1][2] + r[2][2] * a[2][2];
      m[2][3] = r[2][0] * a[0][3] + r[2][1] * a[1][3] + r[2][2] * a[2][3];
      return this;
    },
    rotateX: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m1 = CACHE_VEC4A.copy(m[1]);
      var m2 = CACHE_VEC4B.copy(m[2]);
      m[1][0] = m1[0] * c + m2[0] * s;
      m[1][1] = m1[1] * c + m2[1] * s;
      m[1][2] = m1[2] * c + m2[2] * s;
      m[1][3] = m1[3] * c + m2[3] * s;
      m[2][0] = m2[0] * c - m1[0] * s;
      m[2][1] = m2[1] * c - m1[1] * s;
      m[2][2] = m2[2] * c - m1[2] * s;
      m[2][3] = m2[3] * c - m1[3] * s;
      return this;
    },
    rotateY: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m0 = CACHE_VEC4A.copy(m[0]);
      var m2 = CACHE_VEC4B.copy(m[2]);
      m[2][0] = m0[0] * c + m2[0] * s;
      m[2][1] = m0[1] * c + m2[1] * s;
      m[2][2] = m0[2] * c + m2[2] * s;
      m[2][3] = m0[3] * c + m2[3] * s;
      m[0][0] = m2[0] * c - m0[0] * s;
      m[0][1] = m2[1] * c - m0[1] * s;
      m[0][2] = m2[2] * c - m0[2] * s;
      m[0][3] = m2[3] * c - m0[3] * s;
      return this;
    },
    rotateZ: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m0 = CACHE_VEC4A.copy(m[0]);
      var m2 = CACHE_VEC4B.copy(m[1]);
      m[0][0] = m0[0] * c + m2[0] * s;
      m[0][1] = m0[1] * c + m2[1] * s;
      m[0][2] = m0[2] * c + m2[2] * s;
      m[0][3] = m0[3] * c + m2[3] * s;
      m[1][0] = m2[0] * c - m0[0] * s;
      m[1][1] = m2[1] * c - m0[1] * s;
      m[1][2] = m2[2] * c - m0[2] * s;
      m[1][3] = m2[3] * c - m0[3] * s;
      return this;
    },
    rotateQuat4: function(quat) {
      var two = CACHE_VEC4.copy(quat).multiplyScalar(2);
      var m = this;
      var xx = quat.x * two.x,
          xy = quat.x * two.y,
          xz = quat.x * two.z;
      var yy = quat.y * two.y,
          yz = quat.y * two.z,
          zz = quat.z * two.z;
      var wx = quat.w * two.x,
          wy = quat.w * two.y,
          wz = quat.w * two.z;
      m[0][0] = 1 - (yy + zz);
      m[0][1] = xy + wz;
      m[0][2] = xz - wy;
      m[1][0] = xy - wz;
      m[1][1] = 1 - (xx + zz);
      m[1][2] = yz + wx;
      m[2][0] = xz + wy;
      m[2][1] = yz - wx;
      m[2][2] = 1 - (xx + yy);
      return this;
    },
    Translation: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
    },
    Scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    },
    Rotation: function(rad, x, y, z) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var t = 1 - c;
      var length = Math.sqrt(x * x + y * y + z * z);
      if (length < Number.EPSILON)
        return this.Identity();
      length = 1 / length;
      x *= length;
      y *= length;
      z *= length;
      var r = CACHE_MAT3;
      r[0][0] = x * x * t + c;
      r[1][1] = y * y * t + c;
      r[2][2] = z * z * t + c;
      r[0][1] = x * y * t + z * s;
      r[1][2] = y * z * t + x * s;
      r[2][0] = z * x * t + y * s;
      r[0][2] = x * z * t - y * s;
      r[1][0] = y * x * t - z * s;
      r[2][1] = z * y * t - x * s;
      return this.set(r[0][0], r[0][1], r[0][2], 0, r[1][0], r[1][1], r[1][2], 0, r[2][0], r[2][1], r[2][2], 0, 0, 0, 0, 1);
    },
    RotationX: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    },
    RotationY: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    },
    RotationZ: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    RotationQuat4: function(quat) {
      var two = CACHE_VEC4.copy(quat).multiplyScalar(2);
      var xx = quat.x * two.x,
          xy = quat.x * two.y,
          xz = quat.x * two.z;
      var yy = quat.y * two.y,
          yz = quat.y * two.z,
          zz = quat.z * two.z;
      var wx = quat.w * two.x,
          wy = quat.w * two.y,
          wz = quat.w * two.z;
      return this.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, 0, 0, 0, 1);
    }
  });
  var mat3 = function mat3() {
    var width = 3;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.identity();
  };
  var $mat3 = mat3;
  ($traceurRuntime.createClass)(mat3, {}, {
    clone: function(m) {
      return new $mat3().copy(m);
    },
    cloneArray: function(a) {
      return new $mat3().copyArray(a);
    },
    multiply: function(a, b) {
      return new $mat3().multiply(a, b);
    },
    multiplyScalar: function(m, s) {
      return $mat3.clone(m).multiplyScalar(s);
    },
    add: function(a, b) {
      return new $mat3().add(a, b);
    },
    addScalar: function(m, s) {
      return $mat3.clone(m).addScalar(s);
    }
  });
  Properties(mat3.prototype, {
    length: 4,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data);
      return this;
    },
    copyArray: function(array) {
      this.data.set(array);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT3.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.copy(this);
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
      return this.set(1, 0, 0, 0, 1, 0, x, y, z);
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set(x, 0, 0, 0, y, 0, 0, 0, z);
    },
    rotationX: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(1, 0, 0, 0, c, -s, 0, s, c);
    },
    rotationY: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(c, 0, s, 0, 1, 0, -s, 0, c);
    },
    rotationZ: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(c, -s, 0, s, c, 0, 0, 0, 1);
    }
  });
  var mat2 = function mat2() {
    var width = 2;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.identity();
  };
  var $mat2 = mat2;
  ($traceurRuntime.createClass)(mat2, {}, {
    clone: function(m) {
      return new $mat2().copy(m);
    },
    multiply: function(a, b) {
      return new $mat2().multiply(a, b);
    },
    multiplyScalar: function(m, s) {
      return $mat2.clone(m).multiplyScalar(s);
    },
    add: function(a, b) {
      return new $mat2().add(a, b);
    },
    addScalar: function(m, s) {
      return $mat2.clone(m).addScalar(s);
    }
  });
  Properties(mat2.prototype, {
    length: 2,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copyArray: function(a) {
      this.data.set(a);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT2.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.copy(this);
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
  var CACHE_VEC4A = new vec4;
  var CACHE_VEC4B = new vec4;
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
System.registerModule("../src/math/MLVector", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "../src/math/MLVector";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var Vector = function Vector() {};
  var $Vector = Vector;
  ($traceurRuntime.createClass)(Vector, ($__2 = {}, Object.defineProperty($__2, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__4() {
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
      }, $__4, this);
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
    set: function() {
      for (var values = [],
          $__3 = 0; $__3 < arguments.length; $__3++)
        values[$__3] = arguments[$__3];
      for (var i in values)
        this[i] = values[i];
    },
    copy: function(vA) {
      for (var i in vA)
        this[i] = vA[i];
    },
    add: function(vA) {
      for (var i in vA)
        this[i] += vA[i];
      return this;
    },
    addScalar: function(s) {
      for (var i in this)
        this[i] += s;
    },
    sub: function(vA) {
      for (var i in vA)
        this[i] -= vA[i];
      return this;
    },
    multiply: function(vA) {
      for (var i in vA)
        this[i] *= vA[i];
      return this;
    },
    multiplyScalar: function(s) {
      for (var i in this)
        this[i] *= s;
      return this;
    },
    lerp: function(vA, s) {
      for (var i in this)
        this[i] += (vA[i] - this[i]) * s;
      return this;
    },
    dot: function(vA) {
      return [].reduce.call(this, function(p, c, i) {
        return p += c * vA[i];
      }, 0);
    },
    normalize: function() {
      var l = this.getLength;
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
  }, C);
  var vec2 = function vec2(x, y) {
    $traceurRuntime.superConstructor($vec2).call(this);
    this[0] = x || 0;
    this[1] = y || 0;
  };
  var $vec2 = vec2;
  ($traceurRuntime.createClass)(vec2, {}, {
    clone: function(vA) {
      return new $vec2().copy(vA);
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
    length: 2,
    add: function(vA) {
      var vB = arguments[1] !== (void 0) ? arguments[1] : this;
      var v = this;
      v[0] = vA[0] + vB[0];
      v[1] = vA[1] + vB[1];
      return this;
    },
    set: function(x, y) {
      this[0] = x;
      this[1] = y;
      return this;
    },
    copy: function(vA) {
      this[0] = vA[0];
      this[1] = vA[1];
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
  Getters(vec2.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]);
    }
  }, C);
  var vec3 = function vec3(x, y, z) {
    $traceurRuntime.superConstructor($vec3).call(this);
    this[0] = x || 0;
    this[1] = y || 0;
    this[2] = z || 0;
  };
  var $vec3 = vec3;
  ($traceurRuntime.createClass)(vec3, {}, {
    clone: function(vA) {
      return new $vec3().copy(vA);
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
    length: 3,
    set: function(x, y, z) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      return this;
    },
    copy: function(vA) {
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
      var vB = arguments[1] !== (void 0) ? arguments[1] : vec3.clone(this);
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
  Properties(vec3, {
    UP: new vec3(0, 1, 0),
    DOWN: new vec3(0, -1, 0),
    RIGHT: new vec3(1, 0, 0),
    LEFT: new vec3(-1, 0, 0),
    AHEAD: new vec3(0, 0, 1),
    BACK: new vec3(0, 0, -1)
  });
  Getters(vec3.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1] + this[2] * this[2];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]) + Math.abs(this[2]);
    }
  }, C);
  var vec4 = function vec4(x, y, z, w) {
    $traceurRuntime.superConstructor($vec4).call(this);
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
    length: 4,
    set: function(x, y, z, w) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this[3] = w;
      return this;
    },
    copy: function(vA) {
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
    dot: function(vB) {
      return vec4.dot(this, vB);
    }
  });
  Getters(vec4.prototype, {
    getLength: function() {
      return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3]);
    },
    getLengthSq: function() {
      return this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3];
    },
    getLengthManhattan: function() {
      return Math.abs(this[0]) + Math.abs(this[1]) + Math.abs(this[2]) + Math.abs(this[3]);
    }
  }, C);
  var quat4 = function quat4() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 0;
    var y = arguments[1] !== (void 0) ? arguments[1] : 0;
    var z = arguments[2] !== (void 0) ? arguments[2] : 0;
    var w = arguments[3] !== (void 0) ? arguments[3] : 1;
    $traceurRuntime.superConstructor($quat4).call(this);
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
  };
  var $quat4 = quat4;
  ($traceurRuntime.createClass)(quat4, {}, {
    clone: function(vA) {
      return new $quat4().copy(vA);
    },
    axisAngle: function(axis, angle) {
      return new $quat4().axisAngle(axis, angle);
    },
    multiply: function(qA, qB) {
      return new $quat4().multiply(qA, qB);
    }
  }, Vector);
  Properties(quat4.prototype, {
    length: 4,
    set: function(x, y, z, w) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this[3] = w;
      return this;
    },
    copy: function(vA) {
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
System.registerModule("../src/utilities/ULInterleavedArray.js", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULInterleavedArray.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var InterleavedArray = function InterleavedArray(structure) {
    var type = readStructureType(structure);
    var stride = readOffsets(structure);
    Properties(this, {
      structure: structure,
      stride: stride,
      type: type
    });
  };
  ($traceurRuntime.createClass)(InterleavedArray, {}, {});
  var $__default = InterleavedArray;
  Properties(InterleavedArray.prototype, {
    allocate: function() {
      var maxLength = arguments[0] !== (void 0) ? arguments[0] : 0;
      if (this.length)
        this.disposeViews();
      var buffer = new ArrayBuffer(this.stride * maxLength);
      Properties(this, {
        buffer: buffer,
        maxLength: maxLength
      }, C);
      return this;
    },
    expand: function() {
      var lenght = arguments[0] !== (void 0) ? arguments[0] : 0;
      if (this.length)
        this.disposeViews();
      var maxLength = this.maxLength + length;
      var buffer = new ArrayBuffer(this.stride * maxLength);
      new this.type(buffer).set(new this.type(this.buffer));
      Properties(this, {
        buffer: buffer,
        maxLength: maxLength
      }, C);
      return this;
    }
  });
  function readOffsets(structure) {
    var offsets = [0];
    var i = 0;
    for (var property in structure) {
      offsets.push(offsets[i] + structure[property].type.byteLength);
      structure[property].offset = offsets[i];
      i++;
    }
    return offsets.pop();
  }
  function readStructureType(structure) {
    var type;
    for (var property = void 0 in structure) {
      if (type === undefined)
        type = structure[property].type.constructor;
      else if (type.name !== structure[property].type.constructor.name)
        console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type.");
    }
    return type;
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLContext.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLContext.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
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
  var viewport = new (function() {
    var Viewport = function Viewport() {};
    return ($traceurRuntime.createClass)(Viewport, {
      setDimensions: function() {
        var x = arguments[0] !== (void 0) ? arguments[0] : 0;
        var y = arguments[1] !== (void 0) ? arguments[1] : 0;
        var width = arguments[2] !== (void 0) ? arguments[2] : canvas.clientWidth;
        var height = arguments[3] !== (void 0) ? arguments[3] : canvas.clientHeight;
        gl.viewport(x, y, width, height);
        return this;
      },
      get getDimensions() {
        return gl.getParameter(GL.VIEWPORT);
      }
    }, {});
  }());
  Properties(WebGLRenderingContext.prototype, {
    options: {
      alpha: true,
      depth: true,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    setOptions: function(options) {
      this.options = options || this.options;
      gl = canvas.getContext("webgl", this.options) || canvas.getContext("experimental-webgl", this.options);
      return this;
    },
    setQuality: function(v) {
      isNaN(v) ? v = 2 : v = v || 2;
      this.quality = v;
      canvas.width = canvas.clientWidth / v;
      canvas.height = canvas.clientHeight / v;
      return this;
    }
  });
  Getters(WebGLRenderingContext.prototype, {
    getShadingLanguageVersion: function() {
      return gl.getParameter(GL.SHADING_LANGUAGE_VERSION);
    },
    getVersion: function() {
      return gl.getParameter(GL.VERSION);
    },
    getVendor: function() {
      return gl.getParameter(GL.VENDOR);
    },
    getRenderer: function() {
      return gl.getParameter(GL.RENDERER);
    }
  });
  Property(GL, "flags", []);
  for (var property in WebGLRenderingContext)
    if (typeof WebGLRenderingContext[property] === "number")
      Property(GL.flags, GL[property], property, E | C);
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
    get viewport() {
      return viewport;
    }
  };
});
System.registerModule("../src/utilities/ULResource.js", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULResource.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
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
              var t = {};
              SCENE[line[0].match(/\w*/)[0]] = t;
              target = t;
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
    htmlTexture: function(element) {
      element.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      var STATIC = $Resource.htmlTexture;
      var serializer = STATIC.serializer ? STATIC.serializer : STATIC.serializer = new XMLSerializer;
      var img = new Image;
      var resource = new $Resource(img);
      var width = 200;
      var height = 100;
      var htmlString = serializer.serializeToString(element);
      var uri = ("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\">\n\t\t\t\t<foreignObject width=\"100%\" height=\"100%\" x=\"20\" y=\"50\">\n\t\t\t\t\t" + htmlString + "\n\t\t\t\t</foreignObject>\n\t\t\t</svg>\n\t\t");
      img.onload = resource.process.bind(resource);
      img.src = uri;
      return resource;
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
          Array.isArray(this.source) ? [].unshift.apply(arguments, this.source) : [].unshift.call(arguments, this.source);
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
System.registerModule("../src/math/MLMatrix.js", [], function() {
  "use strict";
  var __moduleName = "../src/math/MLMatrix.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/math/MLVector.js"),
      vec2 = $__1.vec2,
      vec3 = $__1.vec3,
      vec4 = $__1.vec4,
      quat4 = $__1.quat4;
  var mat4 = function mat4() {
    var width = 4;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width),
      3: new Float32Array(buffer, 3 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.Identity();
  };
  var $mat4 = mat4;
  ($traceurRuntime.createClass)(mat4, {}, {
    clone: function(m) {
      return new $mat4().copy(m);
    },
    cloneArray: function(a) {
      return new $mat4().copyArray(a);
    },
    add: function(a, b) {
      return new $mat4().add(a, b);
    },
    multiply: function(a, b) {
      return new $mat4().multiply(a, b);
    },
    addScalar: function(m, s) {
      return $mat4.clone(m).addScalar(s);
    },
    multiplyScalar: function(m, s) {
      return $mat4.clone(m).multiplyScalar(s);
    },
    lookAt: function(m, eye, target, up) {
      return $mat4.clone(m).lookAt(eye, target, up);
    },
    Frustum: function(left, right, bottom, top, near, far) {
      return new $mat4().Frustum(left, right, bottom, top, near, far);
    },
    Orthographic: function(left, right, bottom, top, near, far) {
      return new $mat4().Orthographic(left, right, bottom, top, near, far);
    },
    Perspective: function(aspect, fov, near, far) {
      return new $mat4().Perspective(aspect, fov, near, far);
    },
    Translation: function(x, y, z) {
      return new $mat4().Translation(x, y, z);
    },
    Scale: function(x, y, z) {
      return new $mat4().Scale(x, y, z);
    },
    RotationX: function(rad) {
      return new $mat4().RotationX(rad);
    },
    RotationY: function(rad) {
      return new $mat4().RotationY(rad);
    },
    RotationZ: function(rad) {
      return new $mat4().RotationZ(rad);
    },
    RotationQuat4: function(quat) {
      return new $mat4().RotationQuat4(quat);
    }
  });
  Properties(mat4.prototype, {
    length: 4,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data || m);
      return this;
    },
    copyArray: function(array) {
      this.data.set(array);
      return this;
    },
    Identity: function() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : this;
      return this.set(a[0][0], a[1][0], a[2][0], a[3][0], a[0][1], a[1][1], a[2][1], a[3][1], a[0][2], a[1][2], a[2][2], a[3][2], a[0][3], a[1][3], a[2][3], a[3][3]);
    },
    invert: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT4.transpose(this);
      var m = this;
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
      m[1][3] = a[0][1] * a[2][2] * a[3][0] - a[0][2] * a[2][1] * a[3][0] + a[0][2] * a[2][0] * a[3][1] - a[0][0] * a[2][2] * a[3][1] - a[0][1] * a[2][0] * a[3][2] + a[0][0] * a[2][1] * a[3][2];
      m[2][3] = a[0][2] * a[1][1] * a[3][0] - a[0][1] * a[1][2] * a[3][0] - a[0][2] * a[1][0] * a[3][1] + a[0][0] * a[1][2] * a[3][1] + a[0][1] * a[1][0] * a[3][2] - a[0][0] * a[1][1] * a[3][2];
      m[3][3] = a[0][1] * a[1][2] * a[2][0] - a[0][2] * a[1][1] * a[2][0] + a[0][2] * a[1][0] * a[2][1] - a[0][0] * a[1][2] * a[2][1] - a[0][1] * a[1][0] * a[2][2] + a[0][0] * a[1][1] * a[2][2];
      var determinant = a[0][0] * m[0][0] + a[1][0] * m[1][0] + a[2][0] * m[2][0] + a[3][0] * m[3][0];
      if (Math.abs(determinant) < Number.EPSILON)
        return this.Identity();
      else
        return this.multiplyScalar(1 / determinant);
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
    add: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : this;
      return this.set(a[0][0] + b[0][0], a[0][1] + b[0][1], a[0][2] + b[0][2], a[0][3] + b[0][3], a[1][0] + b[1][0], a[1][1] + b[1][1], a[1][2] + b[1][2], a[1][3] + b[1][3], a[2][0] + b[2][0], a[2][1] + b[2][1], a[2][2] + b[2][2], a[2][3] + b[2][3], a[3][0] + b[3][0], a[3][1] + b[3][1], a[3][2] + b[3][2], a[3][3] + b[3][3]);
    },
    multiply: function(a) {
      var b = arguments[1] !== (void 0) ? arguments[1] : this;
      return this.set(a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0] + a[0][3] * b[3][0], a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1] + a[0][3] * b[3][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2] + a[0][3] * b[3][2], a[0][0] * b[0][3] + a[0][1] * b[1][3] + a[0][2] * b[2][3] + a[0][3] * b[3][3], a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0] + a[1][3] * b[3][0], a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1] + a[1][3] * b[3][1], a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2] + a[1][3] * b[3][2], a[1][0] * b[0][3] + a[1][1] * b[1][3] + a[1][2] * b[2][3] + a[1][3] * b[3][3], a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0] + a[2][3] * b[3][0], a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1] + a[2][3] * b[3][1], a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2] + a[2][3] * b[3][2], a[2][0] * b[0][3] + a[2][1] * b[1][3] + a[2][2] * b[2][3] + a[2][3] * b[3][3], a[3][0] * b[0][0] + a[3][1] * b[1][0] + a[3][2] * b[2][0] + a[3][3] * b[3][0], a[3][0] * b[0][1] + a[3][1] * b[1][1] + a[3][2] * b[2][1] + a[3][3] * b[3][1], a[3][0] * b[0][2] + a[3][1] * b[1][2] + a[3][2] * b[2][2] + a[3][3] * b[3][2], a[3][0] * b[0][3] + a[3][1] * b[1][3] + a[3][2] * b[2][3] + a[3][3] * b[3][3]);
    },
    determinant: function() {
      var m = this;
      var a1 = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      var a2 = m[0][0] * m[1][2] - m[0][2] * m[1][0];
      var a3 = m[0][0] * m[1][3] - m[0][3] * m[1][0];
      var a4 = m[0][1] * m[1][2] - m[0][2] * m[1][1];
      var a5 = m[0][1] * m[1][3] - m[0][3] * m[1][1];
      var a6 = m[0][2] * m[1][3] - m[0][3] * m[1][2];
      var b1 = m[2][2] * m[3][3] - m[2][3] * m[3][2];
      var b2 = m[2][1] * m[3][3] - m[2][3] * m[3][1];
      var b3 = m[2][1] + m[3][2] - m[2][2] + m[3][1];
      var b4 = m[2][0] + m[3][3] - m[2][3] + m[3][0];
      var b5 = m[2][0] + m[3][2] - m[2][2] + m[3][0];
      var b6 = m[2][0] + m[3][1] - m[2][1] + m[3][0];
      return a1 * b1 - a2 * b2 + a3 * b3 + a4 * b4 - a5 * b5 + a6 * b6;
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
      m[0][0] = x[0];
      m[0][1] = x[1];
      m[0][2] = x[2];
      m[1][0] = y[0];
      m[1][1] = y[1];
      m[1][2] = y[2];
      m[2][0] = z[0];
      m[2][1] = z[1];
      m[2][2] = z[2];
      return this;
    },
    Frustum: function(left, right, bottom, top, near, far) {
      var x = 2 * near / (right - left);
      var y = 2 * near / (top - bottom);
      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = -(far + near) / (far - near);
      var d = -2 * far * near / (far - near);
      return this.set(x, 0, 0, 0, 0, y, 0, 0, a, b, c, 1, 0, 0, d, 0);
    },
    Orthographic: function(left, right, bottom, top, near, far) {
      var w = right - left;
      var h = top - bottom;
      var d = far - near;
      var x = (left + right) / -w;
      var y = (top + bottom) / -h;
      var z = (near + far) / -d;
      w = 2 / w;
      h = 2 / h;
      d = -2 / d;
      return this.set(w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, x, y, z, 1);
    },
    Perspective: function(aspect, fov, near, far) {
      var y = 1.0 / Math.tan(fov / 2);
      var nf = 1 / (near - far);
      var x = y / aspect;
      var z = (far + near) * nf;
      var d = (2 * far * near) * nf;
      return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, -1, 0, 0, d, 0);
    },
    translate: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      var m = this;
      var a = CACHE_MAT4.copy(this);
      m[3][0] = a[0][0] * x + a[1][0] * y + a[2][0] * z + a[3][0];
      m[3][1] = a[0][1] * x + a[1][1] * y + a[2][1] * z + a[3][1];
      m[3][2] = a[0][2] * x + a[1][2] * y + a[2][2] * z + a[3][2];
      m[3][3] = a[0][3] * x + a[1][3] * y + a[2][3] * z + a[3][3];
      return this;
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      var m = this;
      m[0][0] *= x;
      m[0][1] *= x;
      m[0][2] *= x;
      m[0][3] *= x;
      m[1][0] *= y;
      m[1][1] *= y;
      m[1][2] *= y;
      m[1][3] *= y;
      m[2][0] *= z;
      m[2][1] *= z;
      m[2][2] *= z;
      m[2][3] *= z;
      return this;
    },
    rotate: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var x = arguments[1] !== (void 0) ? arguments[1] : 0;
      var y = arguments[2] !== (void 0) ? arguments[2] : 0;
      var z = arguments[3] !== (void 0) ? arguments[3] : 0;
      var length = Math.sqrt(x * x + y * y + z * z);
      if (Math.abs(length) < Number.EPSILON)
        return this.Identity();
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var t = 1 - c;
      length = 1 / length;
      x *= length;
      y *= length;
      z *= length;
      var r = CACHE_MAT3;
      r[0][0] = x * x * t + c;
      r[1][1] = y * y * t + c;
      r[2][2] = z * z * t + c;
      r[0][1] = x * y * t + z * s;
      r[1][2] = y * z * t + x * s;
      r[2][0] = z * x * t + y * s;
      r[0][2] = x * z * t - y * s;
      r[1][0] = y * x * t - z * s;
      r[2][1] = z * y * t - x * s;
      var a = CACHE_MAT4.copy(this);
      var m = this;
      m[0][0] = r[0][0] * a[0][0] + r[0][1] * a[1][0] + r[0][2] * a[2][0];
      m[0][1] = r[0][0] * a[0][1] + r[0][1] * a[1][1] + r[0][2] * a[2][1];
      m[0][2] = r[0][0] * a[0][2] + r[0][1] * a[1][2] + r[0][2] * a[2][2];
      m[0][3] = r[0][0] * a[0][3] + r[0][1] * a[1][3] + r[0][2] * a[2][3];
      m[1][0] = r[1][0] * a[0][0] + r[1][1] * a[1][0] + r[1][2] * a[2][0];
      m[1][1] = r[1][0] * a[0][1] + r[1][1] * a[1][1] + r[1][2] * a[2][1];
      m[1][2] = r[1][0] * a[0][2] + r[1][1] * a[1][2] + r[1][2] * a[2][2];
      m[1][3] = r[1][0] * a[0][3] + r[1][1] * a[1][3] + r[1][2] * a[2][3];
      m[2][0] = r[2][0] * a[0][0] + r[2][1] * a[1][0] + r[2][2] * a[2][0];
      m[2][1] = r[2][0] * a[0][1] + r[2][1] * a[1][1] + r[2][2] * a[2][1];
      m[2][2] = r[2][0] * a[0][2] + r[2][1] * a[1][2] + r[2][2] * a[2][2];
      m[2][3] = r[2][0] * a[0][3] + r[2][1] * a[1][3] + r[2][2] * a[2][3];
      return this;
    },
    rotateX: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m1 = CACHE_VEC4A.copy(m[1]);
      var m2 = CACHE_VEC4B.copy(m[2]);
      m[1][0] = m1[0] * c + m2[0] * s;
      m[1][1] = m1[1] * c + m2[1] * s;
      m[1][2] = m1[2] * c + m2[2] * s;
      m[1][3] = m1[3] * c + m2[3] * s;
      m[2][0] = m2[0] * c - m1[0] * s;
      m[2][1] = m2[1] * c - m1[1] * s;
      m[2][2] = m2[2] * c - m1[2] * s;
      m[2][3] = m2[3] * c - m1[3] * s;
      return this;
    },
    rotateY: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m0 = CACHE_VEC4A.copy(m[0]);
      var m2 = CACHE_VEC4B.copy(m[2]);
      m[2][0] = m0[0] * c + m2[0] * s;
      m[2][1] = m0[1] * c + m2[1] * s;
      m[2][2] = m0[2] * c + m2[2] * s;
      m[2][3] = m0[3] * c + m2[3] * s;
      m[0][0] = m2[0] * c - m0[0] * s;
      m[0][1] = m2[1] * c - m0[1] * s;
      m[0][2] = m2[2] * c - m0[2] * s;
      m[0][3] = m2[3] * c - m0[3] * s;
      return this;
    },
    rotateZ: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m = this;
      var m0 = CACHE_VEC4A.copy(m[0]);
      var m2 = CACHE_VEC4B.copy(m[1]);
      m[0][0] = m0[0] * c + m2[0] * s;
      m[0][1] = m0[1] * c + m2[1] * s;
      m[0][2] = m0[2] * c + m2[2] * s;
      m[0][3] = m0[3] * c + m2[3] * s;
      m[1][0] = m2[0] * c - m0[0] * s;
      m[1][1] = m2[1] * c - m0[1] * s;
      m[1][2] = m2[2] * c - m0[2] * s;
      m[1][3] = m2[3] * c - m0[3] * s;
      return this;
    },
    rotateQuat4: function(quat) {
      var two = CACHE_VEC4.copy(quat).multiplyScalar(2);
      var m = this;
      var xx = quat.x * two.x,
          xy = quat.x * two.y,
          xz = quat.x * two.z;
      var yy = quat.y * two.y,
          yz = quat.y * two.z,
          zz = quat.z * two.z;
      var wx = quat.w * two.x,
          wy = quat.w * two.y,
          wz = quat.w * two.z;
      m[0][0] = 1 - (yy + zz);
      m[0][1] = xy + wz;
      m[0][2] = xz - wy;
      m[1][0] = xy - wz;
      m[1][1] = 1 - (xx + zz);
      m[1][2] = yz + wx;
      m[2][0] = xz + wy;
      m[2][1] = yz - wx;
      m[2][2] = 1 - (xx + yy);
      return this;
    },
    Translation: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 0;
      var y = arguments[1] !== (void 0) ? arguments[1] : 0;
      var z = arguments[2] !== (void 0) ? arguments[2] : 0;
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
    },
    Scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    },
    Rotation: function(rad, x, y, z) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var t = 1 - c;
      var length = Math.sqrt(x * x + y * y + z * z);
      if (length < Number.EPSILON)
        return this.Identity();
      length = 1 / length;
      x *= length;
      y *= length;
      z *= length;
      var r = CACHE_MAT3;
      r[0][0] = x * x * t + c;
      r[1][1] = y * y * t + c;
      r[2][2] = z * z * t + c;
      r[0][1] = x * y * t + z * s;
      r[1][2] = y * z * t + x * s;
      r[2][0] = z * x * t + y * s;
      r[0][2] = x * z * t - y * s;
      r[1][0] = y * x * t - z * s;
      r[2][1] = z * y * t - x * s;
      return this.set(r[0][0], r[0][1], r[0][2], 0, r[1][0], r[1][1], r[1][2], 0, r[2][0], r[2][1], r[2][2], 0, 0, 0, 0, 1);
    },
    RotationX: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    },
    RotationY: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    },
    RotationZ: function() {
      var rad = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    RotationQuat4: function(quat) {
      var two = CACHE_VEC4.copy(quat).multiplyScalar(2);
      var xx = quat.x * two.x,
          xy = quat.x * two.y,
          xz = quat.x * two.z;
      var yy = quat.y * two.y,
          yz = quat.y * two.z,
          zz = quat.z * two.z;
      var wx = quat.w * two.x,
          wy = quat.w * two.y,
          wz = quat.w * two.z;
      return this.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, 0, 0, 0, 1);
    }
  });
  var mat3 = function mat3() {
    var width = 3;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width),
      2: new Float32Array(buffer, 2 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.identity();
  };
  var $mat3 = mat3;
  ($traceurRuntime.createClass)(mat3, {}, {
    clone: function(m) {
      return new $mat3().copy(m);
    },
    cloneArray: function(a) {
      return new $mat3().copyArray(a);
    },
    multiply: function(a, b) {
      return new $mat3().multiply(a, b);
    },
    multiplyScalar: function(m, s) {
      return $mat3.clone(m).multiplyScalar(s);
    },
    add: function(a, b) {
      return new $mat3().add(a, b);
    },
    addScalar: function(m, s) {
      return $mat3.clone(m).addScalar(s);
    }
  });
  Properties(mat3.prototype, {
    length: 4,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data);
      return this;
    },
    copyArray: function(array) {
      this.data.set(array);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT3.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT3.copy(this);
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
      return this.set(1, 0, 0, 0, 1, 0, x, y, z);
    },
    scale: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : 1;
      var y = arguments[1] !== (void 0) ? arguments[1] : x;
      var z = arguments[2] !== (void 0) ? arguments[2] : x;
      return this.set(x, 0, 0, 0, y, 0, 0, 0, z);
    },
    rotationX: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(1, 0, 0, 0, c, -s, 0, s, c);
    },
    rotationY: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(c, 0, s, 0, 1, 0, -s, 0, c);
    },
    rotationZ: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : 0;
      var c = Math.cos(a / 180 * Math.PI);
      var s = Math.sin(a / 180 * Math.PI);
      return this.set(c, -s, 0, s, c, 0, 0, 0, 1);
    }
  });
  var mat2 = function mat2() {
    var width = 2;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Property(this, "data", new Float32Array(buffer));
    Properties(this, {
      0: new Float32Array(buffer, 0 * elementSize * width, width),
      1: new Float32Array(buffer, 1 * elementSize * width, width)
    }, E);
    arguments.length ? this.data.set(arguments) : this.identity();
  };
  var $mat2 = mat2;
  ($traceurRuntime.createClass)(mat2, {}, {
    clone: function(m) {
      return new $mat2().copy(m);
    },
    multiply: function(a, b) {
      return new $mat2().multiply(a, b);
    },
    multiplyScalar: function(m, s) {
      return $mat2.clone(m).multiplyScalar(s);
    },
    add: function(a, b) {
      return new $mat2().add(a, b);
    },
    addScalar: function(m, s) {
      return $mat2.clone(m).addScalar(s);
    }
  });
  Properties(mat2.prototype, {
    length: 2,
    set: function() {
      this.data.set(arguments);
      return this;
    },
    copyArray: function(a) {
      this.data.set(a);
      return this;
    },
    copy: function(m) {
      this.data.set(m.data);
      return this;
    },
    transpose: function() {
      var a = arguments[0] !== (void 0) ? arguments[0] : CACHE_MAT2.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.copy(this);
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
      var b = arguments[1] !== (void 0) ? arguments[1] : CACHE_MAT2.copy(this);
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
  var CACHE_VEC4A = new vec4;
  var CACHE_VEC4B = new vec4;
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
System.registerModule("../src/webgl/GLUniformLocation.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLUniformLocation.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  Properties(WebGLUniformLocation.prototype, {
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
  });
  return {};
});
System.registerModule("../src/utilities/ULUniforms.js", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "../src/utilities/ULUniforms.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var $__2 = System.get("../src/math/MLVector.js"),
      vec2 = $__2.vec2,
      vec3 = $__2.vec3,
      vec4 = $__2.vec4;
  var $__3 = System.get("../src/math/MLMatrix.js"),
      mat2 = $__3.mat2,
      mat3 = $__3.mat3,
      mat4 = $__3.mat4;
  System.get("../src/webgl/GLUniformLocation.js");
  var Uniform = function Uniform() {};
  ($traceurRuntime.createClass)(Uniform, {}, {create: function(info, location) {
      var uniform = new (TYPES.get(info.type));
      Property(uniform, "location", location, E);
      return uniform;
    }});
  Properties(Uniform.prototype, {instantiate: function() {
      var o = Object.create(this);
      Property(o, "value", this.value, E | C | W);
      return o;
    }});
  var UniformVector = function UniformVector() {};
  ($traceurRuntime.createClass)(UniformVector, {}, {});
  Properties(UniformVector.prototype, {instantiate: function() {
      var o = Object.create(this);
      Property(o, "value", this.value.clone(), E | C);
      return o;
    }});
  var UniformFloat = function UniformFloat() {
    $traceurRuntime.superConstructor($UniformFloat).call(this);
    Property(this, "value", 0.0, E | W);
  };
  var $UniformFloat = UniformFloat;
  ($traceurRuntime.createClass)(UniformFloat, {}, {}, Uniform);
  Properties(UniformFloat.prototype, {
    set: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    },
    copy: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    }
  });
  var UniformFloatVec2 = function UniformFloatVec2() {
    $traceurRuntime.superConstructor($UniformFloatVec2).call(this);
    Property(this, "value", new vec2, E);
  };
  var $UniformFloatVec2 = UniformFloatVec2;
  ($traceurRuntime.createClass)(UniformFloatVec2, {}, {}, UniformVector);
  Properties(UniformFloatVec2.prototype, {
    set: function(x, y) {
      if (x !== undefined)
        this.value.set(x, y);
      this.location.set2f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set2f(this.value);
      return this;
    }
  });
  var UniformFloatVec3 = function UniformFloatVec3() {
    $traceurRuntime.superConstructor($UniformFloatVec3).call(this);
    Property(this, "value", new vec3, E);
  };
  var $UniformFloatVec3 = UniformFloatVec3;
  ($traceurRuntime.createClass)(UniformFloatVec3, {}, {}, UniformVector);
  Properties(UniformFloatVec3.prototype, {
    set: function(x, y, z) {
      if (x !== undefined)
        this.value.set(x, y, z);
      this.location.set3f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set3f(this.value);
      return this;
    }
  });
  var UniformFloatVec4 = function UniformFloatVec4() {
    $traceurRuntime.superConstructor($UniformFloatVec4).call(this);
    Property(this, "value", new vec4, E);
  };
  var $UniformFloatVec4 = UniformFloatVec4;
  ($traceurRuntime.createClass)(UniformFloatVec4, {}, {}, UniformVector);
  Properties(UniformFloatVec4.prototype, {
    set: function(x, y, z, w) {
      if (x !== undefined)
        this.value.set(x, y, z, w);
      this.location.set4f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set4f(this.value);
      return this;
    }
  });
  var UniformFloatMat2 = function UniformFloatMat2() {
    $traceurRuntime.superConstructor($UniformFloatMat2).call(this);
    Property(this, "value", new mat2, E);
  };
  var $UniformFloatMat2 = UniformFloatMat2;
  ($traceurRuntime.createClass)(UniformFloatMat2, {}, {}, UniformVector);
  Properties(UniformFloatMat2.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat2(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat2(this.value.data);
      return this;
    }
  });
  var UniformFloatMat3 = function UniformFloatMat3() {
    $traceurRuntime.superConstructor($UniformFloatMat3).call(this);
    Property(this, "value", new mat3, E);
  };
  var $UniformFloatMat3 = UniformFloatMat3;
  ($traceurRuntime.createClass)(UniformFloatMat3, {}, {}, UniformVector);
  Properties(UniformFloatMat3.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat3(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat3(this.value.data);
      return this;
    }
  });
  var UniformFloatMat4 = function UniformFloatMat4() {
    $traceurRuntime.superConstructor($UniformFloatMat4).call(this);
    Property(this, "value", new mat4, E);
  };
  var $UniformFloatMat4 = UniformFloatMat4;
  ($traceurRuntime.createClass)(UniformFloatMat4, {}, {}, UniformVector);
  Properties(UniformFloatMat4.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat4(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat4(this.value.data);
      return this;
    }
  });
  createDelegates(UniformFloatMat4, mat4);
  var UniformInt = function UniformInt() {
    $traceurRuntime.superConstructor($UniformInt).call(this);
    Property(this, "value", 0, E | W);
  };
  var $UniformInt = UniformInt;
  ($traceurRuntime.createClass)(UniformInt, {}, {}, Uniform);
  Properties(UniformInt.prototype, {
    set: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    },
    copy: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    }
  });
  var UniformIntVec2 = function UniformIntVec2() {
    $traceurRuntime.superConstructor($UniformIntVec2).call(this);
    Property(this, "value", new vec2, E);
  };
  var $UniformIntVec2 = UniformIntVec2;
  ($traceurRuntime.createClass)(UniformIntVec2, {}, {}, UniformVector);
  Properties(UniformIntVec2.prototype, {
    set: function(x, y) {
      if (x !== undefined)
        this.value.set(x, y);
      this.location.set2i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set2i(this.value);
      return this;
    }
  });
  var UniformIntVec3 = function UniformIntVec3() {
    $traceurRuntime.superConstructor($UniformIntVec3).call(this);
    Property(this, "value", new vec3, E);
  };
  var $UniformIntVec3 = UniformIntVec3;
  ($traceurRuntime.createClass)(UniformIntVec3, {}, {}, UniformVector);
  Properties(UniformIntVec3.prototype, {
    set: function(x, y, z) {
      if (x !== undefined)
        this.value.set(x, y, z);
      this.location.set3i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set3i(this.value);
      return this;
    }
  });
  var UniformIntVec4 = function UniformIntVec4() {
    $traceurRuntime.superConstructor($UniformIntVec4).call(this);
    Property(this, "value", new vec4, E);
  };
  var $UniformIntVec4 = UniformIntVec4;
  ($traceurRuntime.createClass)(UniformIntVec4, {}, {}, UniformVector);
  Properties(UniformIntVec4.prototype, {
    set: function(x, y, z, w) {
      if (x !== undefined)
        this.value.set(x, y, z, w);
      this.location.set4i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set4i(this.value);
      return this;
    }
  });
  var UniformTexture2D = function UniformTexture2D() {
    $traceurRuntime.superConstructor($UniformTexture2D).apply(this, arguments);
  };
  var $UniformTexture2D = UniformTexture2D;
  ($traceurRuntime.createClass)(UniformTexture2D, {}, {}, UniformInt);
  var UniformTextureCubeMap = function UniformTextureCubeMap() {
    $traceurRuntime.superConstructor($UniformTextureCubeMap).apply(this, arguments);
  };
  var $UniformTextureCubeMap = UniformTextureCubeMap;
  ($traceurRuntime.createClass)(UniformTextureCubeMap, {}, {}, Uniform);
  var TYPES = new Map([[GL.FLOAT, UniformFloat], [GL.FLOAT_VEC2, UniformFloatVec2], [GL.FLOAT_VEC3, UniformFloatVec3], [GL.FLOAT_VEC4, UniformFloatVec4], [GL.FLOAT_MAT2, UniformFloatMat2], [GL.FLOAT_MAT3, UniformFloatMat3], [GL.FLOAT_MAT4, UniformFloatMat4], [GL.INT, UniformInt], [GL.INT_VEC2, UniformIntVec2], [GL.INT_VEC3, UniformIntVec3], [GL.INT_VEC4, UniformIntVec4], [GL.SAMPLER_2D, UniformTexture2D], [GL.SAMPLER_CUBE, UniformTextureCubeMap]]);
  var UniformStruct = function UniformStruct() {
    $traceurRuntime.superConstructor($UniformStruct).apply(this, arguments);
  };
  var $UniformStruct = UniformStruct;
  ($traceurRuntime.createClass)(UniformStruct, ($__5 = {}, Object.defineProperty($__5, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__8() {
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
      }, $__8, this);
    }),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__5), {}, Uniform);
  Properties(UniformStruct.prototype, {
    set: function() {
      for (var property in this) {
        if (arguments.length)
          this[property].copy(object[property]);
        else
          this[property].set();
      }
      return this;
    },
    copy: function(object) {
      for (var property in this) {
        if (object && property in object)
          this[property].copy(object[property]);
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
  function createDelegates(uniform, delegate) {
    for (var $__6 = Object.getOwnPropertyNames(delegate.prototype)[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__7 = void 0; !($__7 = $__6.next()).done; ) {
      var method = $__7.value;
      if (uniform.prototype[method] === undefined)
        Property(uniform.prototype, method, new Function(("\n\t\tthis.value." + method + ".apply( this.value, arguments );\n\t\tthis.set();\n\t\treturn this;\n\t")), C);
    }
  }
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
System.registerModule("../src/webgl/GLAttributeLocation.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLAttributeLocation.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
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
    setSize: function(size) {
      Property(this, "size", size, E | C);
      return this;
    },
    setStride: function(stride) {
      Property(this, "stride", stride, E | C);
      return this;
    },
    setOffset: function(offset) {
      Property(this, "offset", offset, E | C);
      return this;
    },
    setType: function(type) {
      Property(this, "type", type, E | C);
      return this;
    },
    setNormalized: function(normalized) {
      Property(this, "normalized", normalized, E | C);
      return this;
    },
    setPointer: function() {
      var offset = arguments[0] !== (void 0) ? arguments[0] : 0;
      var stride = arguments[1] !== (void 0) ? arguments[1] : 0;
      var size = arguments[2] !== (void 0) ? arguments[2] : 4;
      var type = arguments[3] !== (void 0) ? arguments[3] : GL.FLOAT;
      var normalized = arguments[4] !== (void 0) ? arguments[4] : false;
      Properties(this, {
        size: size,
        offset: offset,
        stride: stride,
        type: type,
        normalized: normalized
      }, E | C);
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
  Getters(AttributeLocation.prototype, {
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
    getOffset: function() {
      return gl.getVertexAttribOffset(this.index, gl.VERTEX_ATTRIB_ARRAY_POINTER);
    },
    getTypeFlag: function() {
      return gl.flags[this.getType];
    }
  });
  Properties(AttributeLocation.prototype, {
    size: 4,
    offset: 0,
    stride: 0,
    type: GL.FLOAT,
    normalized: false
  }, E);
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLShader.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLShader.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var debugMode = false;
  var Shader = function Shader(type, code) {
    var shader = gl.createShader(type);
    if (code)
      shader.setShaderSource(code);
    return shader;
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
  Properties(WebGLShader.prototype, {
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
      if (debugMode) {
        console.clear();
      }
      if (!this.getCompileStatus) {
        debugMode = this;
        console.error(this.getInfoLog);
      } else if (debugMode === this) {
        debugMode = false;
      }
      return this;
    }
  });
  Getters(WebGLShader.prototype, {
    getInfoLog: function() {
      return gl.getShaderInfoLog(this);
    },
    getSource: function() {
      return gl.getShaderSource(this);
    },
    getDeleteStatus: function() {
      return gl.getShaderParameter(this, GL.DELETE_STATUS);
    },
    getCompileStatus: function() {
      return gl.getShaderParameter(this, GL.COMPILE_STATUS);
    },
    getType: function() {
      return gl.getShaderParameter(this, GL.SHADER_TYPE);
    },
    getTypeFlag: function() {
      return gl.flags[gl.getShaderParameter(this, GL.SHADER_TYPE)];
    },
    getPrecisionFormatLowFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.LOW_FLOAT);
    },
    getPrecisionFormatMediumFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_FLOAT);
    },
    getPrecisionFormatHighFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_FLOAT);
    },
    getPrecisionFormatLowInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.LOW_INT);
    },
    getPrecisionFormatMediumInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_INT);
    },
    getPrecisionFormatHighInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_INT);
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLProgram.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLProgram.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation.js").default;
  var Shader = System.get("../src/webgl/GLShader.js").default;
  var $__4 = System.get("../src/utilities/ULUniforms.js"),
      Uniform = $__4.Uniform,
      UniformArray = $__4.UniformArray,
      UniformStruct = $__4.UniformStruct;
  var Resource = System.get("../src/utilities/ULResource.js").default;
  var Program = function Program() {
    return gl.createProgram();
  };
  ($traceurRuntime.createClass)(Program, {}, {
    VertexColors: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 texCoord;\n\t\t\tattribute vec4 color;\n\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec3 modelScale;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );\n\t\t\t\tvec4 viewVertex = viewMatrix * worldVertex;\n\t\t\t\tvec4 pos = projectionMatrix * viewVertex ;\n\t\t\t\tgl_Position = pos;\n\t\t\t\tgl_PointSize = -pos.z  + 6.;\n\t\t\t\tv_color = color;\n\t\t\t\tv_texCoord = texCoord;\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tuniform float time;\n\t\t\tuniform sampler2D tex0;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 t = texture2D( tex0, v_texCoord );\n\t\t\t\t\n\t\t\t\tgl_FragColor = v_color;\n\t\t\t}\n\t\t")).link().use();
    },
    Phong: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\t#ifdef GL_ES\n\t\t\t\tprecision mediump float;\n\t\t\t\tprecision mediump int;\n\t\t\t#endif\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec3 color;\n\t\t\tattribute vec3 normal;\n\t\t\tattribute vec2 texCoord;\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec3 modelScale;\n\n\t\t\tvarying vec3 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\t\t\tvarying vec4 v_worldVertex;\n\t\t\tvarying vec3 v_viewVector;\n\t\t\tvarying vec3 v_normal;\n\t\t\tvarying mat3 v_modelMatrix;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tv_worldVertex = modelMatrix * vec4( position * modelScale, 1. );\n\t\t\t\t\n\t\t\t\tvec4 viewVertex = viewMatrix * v_worldVertex;\n\t\t\t\tgl_Position = projectionMatrix * viewVertex ;\n\t\t\t\tgl_PointSize = ( -gl_Position.z + 2. ) * 2. + 8.;\n\t\t\t\t\n\t\t\t\tv_modelMatrix = mat3( modelMatrix );\t\n\t\t\t\tv_color = color;\n\t\t\t\tv_texCoord = texCoord;\n\t\t\t\tv_normal = normalize(  mat3( modelMatrix ) * normal );\n\t\t\t\tv_viewVector = normalize( -viewVertex.xyz );\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\t#ifdef GL_ES\n\t\t\t\tprecision mediump float;\n\t\t\t\tprecision mediump int;\n\t\t\t#endif\n\n\t\t\tvarying vec3 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\t\t\tvarying vec4 v_worldVertex;\n\t\t\tvarying vec3 v_viewVector;\n\t\t\tvarying vec3 v_normal;\n\t\t\tvarying mat3 v_modelMatrix;\n\n\t\t\t#define MAX_LIGHTS 4\n\n\t\t\tstruct Scene {\n\t\t\t\tint frame;\n\t\t\t\tint usedLights;\n\t\t\t\tfloat deltaTime;\n\t\t\t};\n\t\t\tuniform Scene scene;\n\n\t\t\tstruct Light {\n\t\t\t\tvec3 position;\n\t\t\t\tvec3 attenuation;\n\t\t\t\tvec3 direction;\n\t\t\t\tvec3 color;\n\t\t\t\tfloat outerCutoff;\n\t\t\t\tfloat innerCutoff;\n\t\t\t\tfloat exponent;\n\t\t\t};\n\t\t\tuniform Light light[ MAX_LIGHTS ];\n\n\t\t\tstruct Material {\n\t\t\t\tvec3 ambient;\n\t\t\t\tvec4 diffuse;\n\t\t\t\tvec3 specular;\n\t\t\t\tfloat shininess;\n\t\t\t};\n\t\t\tuniform Material material;\n\n\t\t\tuniform sampler2D tex0;\n\t\t\tuniform sampler2D normalMap;\n\t\t\t/*builtin variables\n\t\t\t\tvec4 gl_FragCoord\n\t\t\t\tvec2 gl_PointCoord\n\t\t\t\tbool gl_FrontFacing\n\t\t\t\tvec4 gl_FragColor\n\t\t\t\tvec4 gl_FragData[ gl_MaxDrawBuffers ]\n\t\t\t*/\n\t\t\tvoid main ( void ) {\n\t\t\t\tMaterial M = material;\n\t\t\t\tvec3 normal = normalize( v_normal );\n\t\t\t/*\n\t\t\t\tvec3 normal = normalize( v_viewVector *  texture2D( normalMap, v_texCoord ).rgb );\n\t\t\t\tvec3 specular = texture2D( tex0, v_texCoord ).rgb;\n\t\t\t\tfloat shininess = /*texture2D( tex0, v_texCoord ).a;\n\t\t\t\tvec4 diffuse = vec4(texture2D( tex0, v_texCoord ).rgb, 1. );\n\t\t\t\t*/\n\t\t\t\t\n\t\t\t\tvec3 specular = M.specular;\n\t\t\t\tfloat shininess = M.shininess;\n\t\t\t\tvec4 diffuse = M.diffuse;\n\t\t\t\t/*\n\t\t\t\tM.specular = vec3( 0. );\n\t\t\t\tM.shininess = 50.;\n\t\t\t\tM.ambient = vec3( .2 );\n\t\t\t\tM.diffuse = vec4( .8 );\n\t\t\t\t*/\n\t\t\t\tvec3 color = M.ambient;\n\t\t\t\tfor ( int i = 0; i < MAX_LIGHTS; ++i ) {\n\t\t\t\t\tLight L = light[ i ];\n\t\t\t\t\t\n\t\t\t\t\tL.position.z = 1.;\n\t\t\t\t\tL.attenuation = vec3( 2., .0, .001 );\n\t\t\t\t\tL.direction = vec3( 0. );\n\t\t\t\t\tL.color = vec3( 1.,1.,1. );\n\t\t\t\t\tL.outerCutoff = 1.8;\n\t\t\t\t\tL.innerCutoff = .1;\n\t\t\t\t\tL.exponent = 2.;\n\t\t\t\t\t\n\t\t\t\t\tif ( i >= scene.usedLights ) break;\n\t\t\t\t\tvec3 lightVec = normalize( L.position - v_worldVertex.xyz );\n\t\t\t\t\tfloat l = dot( normal, lightVec );\n\t\t\t\t\tif ( l > 0.0 ) {\n\t\t\t\t\t\tfloat spotlight = 1.0;\n\t\t\t\t\t\t\n\t\t\t\t\t\tif ( ( L.direction.x != 0.0 ) || ( L.direction.y != 0.0 ) || ( L.direction.z != 0.0 ) ) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tspotlight = max( -dot( lightVec, L.direction ), 0.0 );\n\t\t\t\t\t\t\tfloat spotlightFade = clamp( ( L.outerCutoff - spotlight ) / ( L.outerCutoff - L.innerCutoff ), 0.0, 1.0 );\n\t\t\t\t\t\t\tspotlight = pow( spotlight * spotlightFade, L.exponent );\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tvec3 r = -normalize( reflect( lightVec, normal ) );\n\t\t\t\t\t\tfloat s = pow( max( dot( r, v_viewVector ), 0. ), M.shininess );\n\n\t\t\t\t\t\tfloat d = distance( v_worldVertex.xyz, light[ i ].position );\n\t\t\t\t\t\tfloat a = 1.0 / ( L.attenuation[ 0 ] + ( L.attenuation[ 1 ] * d ) + ( L.attenuation[ 2 ] * d * d ) );\n\t\t\t\t\t\tcolor += (\n\t\t\t\t\t\t\t( M.diffuse.xyz * l ) + ( specular * s )\n\t\t\t\t\t\t) * L.color * a * spotlight;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tvec4 texture0 = texture2D( tex0, v_texCoord * 4. );\n\t\t\t\tvec2 center = ( gl_PointCoord.xy - .5 ) * 2.;\n\t\t\t\tfloat s = ( 1. - dot( center, center ) ) * sqrt( 2. );\n\t\t\t\t\n\t\t\t\tgl_FragColor = clamp( vec4( color * v_color , material.diffuse.w ), 0.0, 1.0 );// * texture0;\n\t\t\t}\n\t\t")).link().use();
    },
    DynamicSource: function(url, refreshInterval) {
      var fsLoaded = false;
      var vsLoaded = false;
      var vs = Shader.Vertex();
      var fs = Shader.Fragment();
      var program = gl.createProgram().attachShader(fs).attachShader(vs);
      var vsSource = new Resource.http(url + ".vert", {interval: refreshInterval});
      var fsSource = new Resource.http(url + ".frag", {interval: refreshInterval});
      var fsCompile = new Resource(function(fsCode) {
        fsLoaded = true;
        fs.setShaderSource(fsCode);
        if (vsLoaded)
          return program;
      });
      var vsCompile = new Resource(function(vsCode) {
        vsLoaded = true;
        vs.setShaderSource(vsCode);
        if (fsLoaded)
          return program;
      });
      var programLink = new Resource(function(program) {
        return program.link().use();
      });
      vsSource.setTarget(vsCompile);
      fsSource.setTarget(fsCompile);
      vsCompile.setTarget(programLink);
      fsCompile.setTarget(programLink);
      return programLink;
    }
  });
  var $__default = Program;
  Properties(WebGLProgram.prototype, {
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
      var s = this.getAttachedShaders;
      if (s.length === 2 && s[0].getCompileStatus && s[1].getCompileStatus) {
        gl.linkProgram(this);
        if (!this.getLinkStatus)
          console.error(this.getInfoLog);
        else {
          this.clearCache();
        }
      }
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
        console.error(this.getInfoLog);
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
  });
  Getters(WebGLProgram.prototype, {
    getUniforms: function() {
      return new UniformMap(this);
    },
    getAttributes: function() {
      return new AttributeMap(this);
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
  });
  Properties(Program, {DEFAULT: new Program.Phong}, E | C);
  var UniformMap = function UniformMap(program) {
    if (!program)
      return ;
    else
      this.setFromProgram(program, "getUniforms");
  };
  ($traceurRuntime.createClass)(UniformMap, {}, {});
  Properties(UniformMap.prototype, {
    clone: function() {
      var map = new UniformMap;
      Properties(map, this, W | E);
      return map;
    },
    setFromProgram: function(program, cacheAccessor) {
      if (cacheAccessor)
        Property(program, cacheAccessor, this, C);
      var $__7 = this,
          $__8 = function(i) {
            var info = program.getActiveUniform(i);
            var location = program.getUniformLocation(info.name);
            var path = info.name.split(/[\[\].]/).filter((function(e) {
              return e;
            }));
            resolvePath.call($__7, path);
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
        $__8(i);
      }
      return this;
    }
  });
  var AttributeMap = function AttributeMap(program) {
    if (!program)
      return ;
    else
      this.setFromProgram(program, "getAttributes");
  };
  ($traceurRuntime.createClass)(AttributeMap, {}, {});
  Properties(AttributeMap.prototype, {
    clone: function() {
      var map = new AttributeMap;
      Properties(map, this, W | E);
      return map;
    },
    setFromProgram: function(program, cacheAccessor) {
      if (cacheAccessor)
        Property(program, cacheAccessor, this, C);
      for (var i = program.getActiveAttributesLength - 1; i >= 0; i--) {
        var info = program.getActiveAttrib(i);
        var name = info.name;
        Property(this, name, new AttributeLocation(program.getAttribLocation(name), info), E);
      }
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULMaterial.js", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMaterial.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL,
      canvas = $__1.canvas;
  var Program = System.get("../src/webgl/GLProgram.js").default;
  var Shader = System.get("../src/webgl/GLShader.js").default;
  var $__4 = System.get("../src/math/MLVector.js"),
      vec2 = $__4.vec2,
      vec3 = $__4.vec3,
      vec4 = $__4.vec4;
  var globalUsage = 0;
  var Dither = function Dither() {};
  var $Dither = Dither;
  ($traceurRuntime.createClass)(Dither, {
    enable: function() {
      $Dither.enable();
      this.enabled = true;
      return this;
    },
    disable: function() {
      $Dither.disable();
      this.enabled = false;
      return this;
    }
  }, {
    enable: function() {
      if (!$Dither.enabled) {
        $Dither.enabled = true;
        gl.enable(GL.DITHER_TEST);
      }
      return $Dither;
    },
    disable: function() {
      if ($Dither.enabled) {
        $Dither.enabled = false;
        gl.disable(GL.DITHER_TEST);
      }
      return $Dither;
    },
    get getEnabled() {
      return gl.getParameter(GL.DITHER);
    }
  });
  Properties(Dither, {enabled: false}, E | C | W);
  var Multisample = function Multisample(value, invert) {
    if (value !== undefined)
      this.setCoverage(value, invert);
  };
  var $Multisample = Multisample;
  ($traceurRuntime.createClass)(Multisample, {
    enable: function() {
      this.enabled = true;
      $Multisample.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $Multisample.disable();
      return this;
    },
    enableAlpha: function() {
      this.alphaEnabled = true;
      $Multisample.enableAlpha();
      return this;
    },
    disableAlpha: function() {
      this.alphaEnabled = false;
      $Multisample.disableAlpha();
      return this;
    },
    setCoverage: function(value, invert) {
      this.coverageSet = true;
      if (value)
        this.value = value;
      if (invert)
        this.invert = invert;
      $Multisample.setCoverage(this.value, this.invert);
    },
    unsetCoverage: function() {
      this.coverageSet = false;
      $Multisample.unsetCoverage();
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
  }, {
    enable: function() {
      if (!$Multisample.enabled) {
        $Multisample.enabled = true;
        gl.enable(GL.SAMPLE_COVERAGE);
      }
      return $Multisample;
    },
    disable: function() {
      if ($Multisample.enabled) {
        $Multisample.enabled = false;
        gl.disable(GL.SAMPLE_COVERAGE);
      }
      return $Multisample;
    },
    enableAlpha: function() {
      if (!$Multisample.alphaEnabled) {
        $Multisample.alphaEnabled = true;
        gl.enable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return $Multisample;
    },
    disableAlpha: function() {
      if ($Multisample.alphaEnabled) {
        $Multisample.alphaEnabled = false;
        gl.disable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return $Multisample;
    },
    setCoverage: function() {
      var value = arguments[0] !== (void 0) ? arguments[0] : $Multisample.value;
      var invert = arguments[1] !== (void 0) ? arguments[1] : $Multisample.invert;
      $Multisample.coverageSet = true;
      gl.sampleCoverage(value, invert);
      return $Multisample;
    },
    unsetCoverage: function() {
      if ($Multisample.coverageSet) {
        $Multisample.coverageSet = false;
        gl.sampleCoverage($Multisample.value, $Multisample.invert);
      }
      return $Multisample;
    }
  });
  Properties(Multisample, {
    enabled: false,
    alphaEnabled: false,
    coverageSet: false,
    value: 1,
    invert: GL.FALSE
  }, E | C | W);
  var ScissorTest = function ScissorTest(x, y, width, height) {
    if (x !== undefined)
      this.set(x, y, width, height);
  };
  var $ScissorTest = ScissorTest;
  ($traceurRuntime.createClass)(ScissorTest, {
    enable: function() {
      this.enabled = true;
      $ScissorTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $ScissorTest.disable();
      return this;
    },
    setDimensions: function(x, y, width, height) {
      this.dimensionsSet = true;
      if (x !== undefined)
        this.x = x;
      if (y !== undefined)
        this.y = y;
      if (width !== undefined)
        this.width = width;
      if (height !== undefined)
        this.height = height;
      $ScissorTest.setDimensions(this.x, this.y, this.width, this.height);
      return this;
    },
    unset: function() {
      this.dimensionsSet = false;
      $ScissorTest.unset();
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.SCISSOR_TEST);
    },
    get getScissorBox() {
      return gl.getParameter(GL.SCISSOR_BOX);
    }
  }, {
    enable: function() {
      if (!$ScissorTest.enabled) {
        $ScissorTest.enabled = true;
        gl.enable(GL.SCISSOR_TEST);
      }
      return $ScissorTest;
    },
    disable: function() {
      if ($ScissorTest.enabled) {
        $ScissorTest.enabled = false;
        gl.disable(GL.SCISSOR_TEST);
      }
      return $ScissorTest;
    },
    setDimensions: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : $ScissorTest.x;
      var y = arguments[1] !== (void 0) ? arguments[1] : $ScissorTest.y;
      var width = arguments[2] !== (void 0) ? arguments[2] : $ScissorTest.width;
      var height = arguments[3] !== (void 0) ? arguments[3] : $ScissorTest.height;
      $ScissorTest.dimensionsSet = true;
      gl.scissor(x, y, width, height);
      return $ScissorTest;
    },
    unset: function() {
      if ($ScissorTest.dimensionsSet) {
        $ScissorTest.dimensionsSet = false;
        gl.scissor($ScissorTest.x, $ScissorTest.y, $ScissorTest.width, $ScissorTest.height);
      }
      return $ScissorTest;
    }
  });
  Properties(ScissorTest, {
    enabled: false,
    dimensionsSet: false,
    x: 0,
    y: 0,
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }, E | C | W);
  var Alpha = function Alpha(rgbFunc, alphaFunc, equation, red, green, blue, alpha) {
    if (red !== undefined)
      this.setColor(red, green, blue, alpha);
    if (rgbFunc !== undefined)
      this.setFunc(rgbFunc, alphaFunc, rgbFunc, alphaFunc);
    if (equation !== undefined)
      this.setEquation(equation);
  };
  var $Alpha = Alpha;
  ($traceurRuntime.createClass)(Alpha, {
    enable: function() {
      this.enabled = true;
      $Alpha.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $Alpha.disable();
      return this;
    },
    setColor: function(red, green, blue, alpha) {
      this.colorSet = true;
      if (red !== undefined)
        this.red = red;
      if (green !== undefined)
        this.green = green;
      if (blue !== undefined)
        this.blue = blue;
      if (alpha !== undefined)
        this.alpha = alpha;
      $Alpha.setColor(this.red, this.green, this.blue, this.alpha);
      return this;
    },
    unsetColor: function() {
      this.colorSet = false;
      $Alpha.unsetColor();
      return this;
    },
    setFunc: function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
      this.funcSet = true;
      if (srcRGB !== undefined)
        this.srcRGB = srcRGB;
      if (dstRGB !== undefined)
        this.dstRGB = dstRGB;
      if (srcAlpha !== undefined)
        this.srcAlpha = srcAlpha;
      if (dstAlpha !== undefined)
        this.dstAlpha = dstAlpha;
      $Alpha.setFunc(this.srcRGB, this.dstRGB, this.srcAlpha, this.dstAlpha);
      return this;
    },
    unsetFunc: function() {
      this.funcSet = false;
      $Alpha.unsetFunc();
      return this;
    },
    setEquation: function(modeRGB, modeAlpha) {
      this.equationSet = true;
      if (modeRGB)
        this.modeRGB = modeRGB;
      if (modeAlpha)
        this.modeAlpha = modeAlpha;
      $Alpha.setEquation(this.modeRGB, this.modeAlpha);
      return this;
    },
    unsetEquation: function() {
      this.equationSet = false;
      $Alpha.unsetEquation;
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
  }, {
    enable: function() {
      if (!$Alpha.enabled) {
        $Alpha.enabled = true;
        gl.enable(GL.BLEND);
      }
      return $Alpha;
    },
    disable: function() {
      if ($Alpha.enabled) {
        $Alpha.enabled = false;
        gl.disable(GL.BLEND);
      }
      return $Alpha;
    },
    setColor: function() {
      var red = arguments[0] !== (void 0) ? arguments[0] : $Alpha.colorRed;
      var green = arguments[1] !== (void 0) ? arguments[1] : $Alpha.colorGreen;
      var blue = arguments[2] !== (void 0) ? arguments[2] : $Alpha.colorBlue;
      var alpha = arguments[3] !== (void 0) ? arguments[3] : $Alpha.colorAlpha;
      $Alpha.colorSet = true;
      gl.blendColor(red, green, blue, alpha);
      return this;
    },
    unsetColor: function() {
      if ($Alpha.colorSet) {
        $Alpha.colorSet = false;
        gl.blendColor($Alpha.colorRed, $Alpha.colorGreen, $Alpha.colorBlue, $Alpha.colorAlpha);
      }
      return $Alpha;
    },
    setFunc: function() {
      var srcRGB = arguments[0] !== (void 0) ? arguments[0] : $Alpha.srcRGB;
      var dstRGB = arguments[1] !== (void 0) ? arguments[1] : $Alpha.dstRGB;
      var srcAlpha = arguments[2] !== (void 0) ? arguments[2] : $Alpha.srcAlpha;
      var dstAlpha = arguments[3] !== (void 0) ? arguments[3] : $Alpha.dstAlpha;
      $Alpha.funcSet = true;
      gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
      return $Alpha;
    },
    unsetFunc: function() {
      if ($Alpha.funcSet) {
        $Alpha.funcSet = false;
        gl.blendFuncSeparate($Alpha.srcRGB, $Alpha.dstRGB, $Alpha.srcAlpha, $Alpha.dstAlpha);
      }
      return $Alpha;
    },
    setEquation: function() {
      var modeRGB = arguments[0] !== (void 0) ? arguments[0] : $Alpha.modeRGB;
      var modeAlpha = arguments[1] !== (void 0) ? arguments[1] : $Alpha.modeAlpha;
      $Alpha.equationSet = true;
      gl.blendEquationSeparate(modeRGB, modeAlpha);
      return $Alpha;
    },
    unsetEquation: function() {
      if ($Alpha.equationSet) {
        $Alpha.equationSet = false;
        gl.blendEquationSeparate($Alpha.modeRGB, $Alpha.modeAlpha);
      }
      return this;
    }
  });
  Properties(Alpha, {
    enabled: false,
    colorSet: false,
    funcSet: false,
    equationSet: false,
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
  }, E | C | W);
  Properties(Alpha, {
    EQ_ADD: GL.FUNC_ADD,
    EQ_SUBTRACT: GL.FUNC_SUBTRACT,
    EQ_REVERSE_SUBTRACT: GL.FUNC_REVERSE_SUBTRACT,
    FN_ZERO: GL.ZERO,
    FN_ONE: GL.ONE,
    FN_SRC_COLOR: GL.SRC_COLOR,
    FN_DST_COLOR: GL.DST_COLOR,
    FN_SRC_ALPHA: GL.SRC_ALPHA,
    FN_DST_ALPHA: GL.DST_ALPHA,
    FN_CONSTANT_COLOR: GL.CONSTANT_COLOR,
    FN_CONSTANT_ALPHA: GL.CONSTANT_ALPHA,
    FN_SRC_ALPHA_SATURATE: GL.SRC_ALPHA_SATURATE,
    FN_ONE_MINUS_SRC_COLOR: GL.ONE_MINUS_SRC_COLOR,
    FN_ONE_MINUS_DST_COLOR: GL.ONE_MINUS_DST_COLOR,
    FN_ONE_MINUS_SRC_ALPHA: GL.ONE_MINUS_SRC_ALPHA,
    FN_ONE_MINUS_DST_ALPHA: GL.ONE_MINUS_DST_ALPHA,
    FN_ONE_MINUS_CONSTANT_COLOR: GL.ONE_MINUS_CONSTANT_COLOR,
    FN_ONE_MINUS_CONSTANT_ALPHA: GL.ONE_MINUS_CONSTANT_ALPHA
  }, E);
  var DepthTest = function DepthTest(write, func, zNear, zFar) {
    if (write)
      this.enableWrite();
    if (func !== undefined)
      this.setFunc(func);
    if (zNear !== undefined)
      this.setRange(zNear, zFar);
  };
  var $DepthTest = DepthTest;
  ($traceurRuntime.createClass)(DepthTest, {
    enable: function() {
      this.enabled = true;
      $DepthTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $DepthTest.disable();
      return this;
    },
    enableWrite: function() {
      this.writeEnabled = true;
      $DepthTest.enableWrite();
      return this;
    },
    disableWrite: function() {
      this.writeEnabled = false;
      $DepthTest.disableWrite();
      return this;
    },
    setFunc: function(func) {
      this.funcSet = true;
      if (func !== undefined)
        this.func = func;
      $DepthTest.setFunc(this.func);
      return this;
    },
    unsetFunc: function() {
      this.funcSet = false;
      $DepthTest.unsetFunc();
      return this;
    },
    setRange: function(zNear, zFar) {
      this.rangeSet = true;
      if (zNear !== undefined)
        this.zNear = zNear;
      if (zFar !== undefined)
        this.zFar = zFar;
      $DepthTest.setRange(this.zNear, this.zFar);
      return this;
    },
    unsetRange: function() {
      this.rangeSet = false;
      $DepthTest.unsetRange();
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
  }, {
    enable: function() {
      if ($DepthTest.enabled === false) {
        $DepthTest.enabled = true;
        gl.enable(GL.DEPTH_TEST);
      }
      return $DepthTest;
    },
    disable: function() {
      if ($DepthTest.enabled === true) {
        $DepthTest.enabled = false;
        gl.disable(GL.DEPTH_TEST);
      }
      return $DepthTest;
    },
    enableWrite: function() {
      if ($DepthTest.writeEnabled === false) {
        $DepthTest.writeEnabled = true;
        gl.depthMask(true);
      }
      return $DepthTest;
    },
    disableWrite: function() {
      if ($DepthTest.writeEnabled === true) {
        $DepthTest.writeEnabled = false;
        gl.depthMask(false);
      }
      return $DepthTest;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $DepthTest.func;
      $DepthTest.funcSet;
      gl.depthFunc(func);
      return $DepthTest;
    },
    unsetFunc: function() {
      if ($DepthTest.funcSet) {
        $DepthTest.funcSet = false;
        gl.depthFunc($DepthTest.func);
      }
      return $DepthTest;
    },
    setRange: function() {
      var zNear = arguments[0] !== (void 0) ? arguments[0] : $DepthTest.zNear;
      var zFar = arguments[1] !== (void 0) ? arguments[1] : $DepthTest.zFar;
      $DepthTest.rangeSet = true;
      gl.depthRange(zNear, zFar);
      return $DepthTest;
    },
    unsetRange: function() {
      if ($DepthTest.rangeSet) {
        $DepthTest.rangeSet = false;
        gl.depthRange($DepthTest.zNear, $DepthTest.zFar);
      }
      return $DepthTest;
    }
  });
  Properties(DepthTest, {
    enabled: false,
    writeEnabled: false,
    funcSet: false,
    rangeSet: false,
    func: GL.LESS,
    zNear: 0,
    zFar: 1
  }, E | C | W);
  Properties(DepthTest, {
    FN_NEVER: GL.NEVER,
    FN_LESS: GL.LESS,
    FN_EQUAL: GL.EQUAL,
    FN_LEQUAL: GL.LEQUAL,
    FN_GREATER: GL.GREATER,
    FN_NOTEQUAL: GL.NOTEQUAL,
    FN_GEQUAL: GL.GEQUAL,
    FN_ALWAYS: GL.ALWAYS
  }, E);
  var PolygonOffset = function PolygonOffset(factor, units) {
    if (factor !== undefined)
      this.setFill(factor, units);
  };
  var $PolygonOffset = PolygonOffset;
  ($traceurRuntime.createClass)(PolygonOffset, {
    enable: function() {
      this.enabled = true;
      $PolygonOffset.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $PolygonOffset.disable();
      return this;
    },
    setFill: function(factor, units) {
      this.fillSet = true;
      if (factor !== undefined)
        this.factor = factor;
      if (units !== undefined)
        this.units = units;
      $PolygonOffset.setFill(this.factor, this.units);
      return this;
    },
    unsetFill: function() {
      this.fillSet = false;
      $PolygonOffset.unsetFill();
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
  }, {
    enable: function() {
      if (!$PolygonOffset.enabled) {
        $PolygonOffset.enabled = true;
        gl.enable(GL.POLYGON_OFFSET_FILL);
      }
      return $PolygonOffset;
    },
    disable: function() {
      if ($PolygonOffset.enabled) {
        $PolygonOffset.enabled = false;
        gl.disable(GL.POLYGON_OFFSET_FILL);
      }
      return $PolygonOffset;
    },
    setFill: function() {
      var factor = arguments[0] !== (void 0) ? arguments[0] : $PolygonOffset.factor;
      var units = arguments[1] !== (void 0) ? arguments[1] : $PolygonOffset.units;
      $PolygonOffset.fillSet = true;
      gl.polygonOffset(factor, units);
      return $PolygonOffset;
    },
    unsetFill: function() {
      if ($PolygonOffset.fillSet) {
        $PolygonOffset.fillSet = false;
        gl.polygonOffset($PolygonOffset.factor, $PolygonOffset.units);
      }
      return $PolygonOffset;
    }
  });
  Properties(PolygonOffset, {
    enabled: false,
    fillSet: false,
    factor: 0,
    units: 0
  }, E | C | W);
  var CullFace = function CullFace(mode, front) {
    if (mode !== undefined)
      this.setMode(mode);
    if (front !== undefined)
      this.setFront(front);
  };
  var $CullFace = CullFace;
  ($traceurRuntime.createClass)(CullFace, {
    enable: function() {
      this.enabled = true;
      $CullFace.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $CullFace.disable();
      return this;
    },
    setMode: function(mode) {
      this.modeSet = true;
      if (mode !== undefined)
        this.mode = mode;
      $CullFace.setMode(this.mode);
      return this;
    },
    unsetMode: function() {
      this.modeSet = false;
      $CullFace.unsetMode();
      return this;
    },
    setFront: function(front) {
      this.frontSet = true;
      if (front !== undefined)
        this.front = front;
      $CullFace.setFront(this.front);
      return this;
    },
    unsetFront: function() {
      this.frontSet = false;
      $CullFace.unsetFront();
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
  }, {
    enable: function() {
      if (!$CullFace.enabled) {
        $CullFace.enabled = true;
        gl.enable(GL.CULL_FACE);
      }
      return $CullFace;
    },
    disable: function() {
      if ($CullFace.enabled) {
        $CullFace.enabled = false;
        gl.disable(GL.CULL_FACE);
      }
      return $CullFace;
    },
    setMode: function() {
      var mode = arguments[0] !== (void 0) ? arguments[0] : $CullFace.mode;
      $CullFace.modeSet = true;
      gl.cullFace(mode);
      return $CullFace;
    },
    unsetMode: function() {
      if ($CullFace.modeSet) {
        $CullFace.modeSet = false;
        gl.cullFace($CullFace.mode);
      }
      return $CullFace;
    },
    setFront: function() {
      var front = arguments[0] !== (void 0) ? arguments[0] : CulLFace.front;
      $CullFace.frontSet = true;
      gl.frontFace(front);
      return $CullFace;
    },
    unsetFront: function() {
      if ($CullFace.fronSet) {
        $CullFace.frontSet = false;
        gl.frontFace($CullFace.front);
      }
      return $CullFace;
    }
  });
  Properties(CullFace, {
    enabled: false,
    modeSet: false,
    frontSet: false,
    mode: GL.FRONT,
    front: GL.CCW
  }, E | C | W);
  Properties(CullFace, {
    MD_FRONT: GL.FRONT,
    MD_BACK: GL.BACK,
    MD_FRONT_AND_BACK: GL.FRONT_AND_BACK,
    FR_CW: GL.CW,
    FR_CCW: GL.CCW
  }, E);
  var StencilTest = function StencilTest() {};
  var $StencilTest = StencilTest;
  ($traceurRuntime.createClass)(StencilTest, {
    enable: function() {
      this.enabled = true;
      $StencilTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $StencilTest.disable();
      return this;
    },
    setFunc: function(func, ref, mask) {
      this.frontFuncSet = true;
      this.backFuncSet = true;
      if (func !== undefined)
        this.func = func;
      if (ref !== undefined)
        this.ref = ref;
      if (mask !== undefined)
        this.mask = mask;
      $StencilTest.setFunc(this.func, this.ref, this.mask);
      return this;
    },
    setFrontFunc: function(func, ref, mask) {
      this.frontFuncSet = true;
      if (func !== undefined)
        this.frontFunc = func;
      if (ref !== undefined)
        this.frontRef = ref;
      if (mask !== undefined)
        this.frontMask = mask;
      $StencilTest.setFrontFunc(this.frontFunc, this.frontRef, this.frontMask);
      return this;
    },
    setBackFunc: function(func, ref, mask) {
      this.backFuncSet = true;
      if (func !== undefined)
        this.backFunc = func;
      if (ref !== undefined)
        this.backRef = ref;
      if (mask !== undefined)
        this.backMask = mask;
      $StencilTest.setBackFunc(this.backFunc, this.backRef, this.backMask);
      return this;
    },
    unsetFunc: function() {
      this.frontFuncSet = false;
      this.backFuncSet = false;
      $StencilTest.unsetFunc();
      return this;
    },
    setWriteMask: function(mask) {
      this.frontMaskSet = true;
      this.backMaskSet = true;
      if (mask !== undefined)
        this.writeMask = mask;
      $StencilTest.setWriteMask(this.writeMask);
      return this;
    },
    setFrontWriteMask: function(mask) {
      this.frontMaskSet = true;
      if (mask !== undefined)
        this.frontWriteMask = mask;
      Stenciltest.setFrontWriteMask(this.frontWriteMask);
      return this;
    },
    setBackWriteMask: function(mask) {
      this.backWriteMaskSet = true;
      if (mask !== undefined)
        this.backWriteMask = mask;
      $StencilTest.setBackWriteMask(this.backWriteMask);
      return this;
    },
    unsetWriteMask: function() {
      this.frontMaskSet = false;
      this.backMaskSet = false;
      $StencilTest.unsetWriteMask();
      return this;
    },
    setOp: function(stencilFail, depthFail, depthPass) {
      this.frontOpSet = true;
      this.backOpSet = true;
      if (stencilFail !== undefined)
        this.stencilFail = stencilFail;
      if (depthFail !== undefined)
        this.depthFail = depthFail;
      if (depthPass !== undefined)
        this.depthPass = depthPass;
      $StencilTest.setOp(this.stencilFail, this.depthFail, this.depthPass);
      return this;
    },
    setFrontOp: function(stencilFail, depthFail, depthPass) {
      this.frontOpSet = true;
      if (stencilFail !== undefined)
        this.frontStencilFail = stencilFail;
      if (depthFail !== undefined)
        this.frontDepthFail = depthFail;
      if (depthPass !== undefined)
        this.frontDepthPass = depthPass;
      $StencilTest.setFrontOp(this.frontStencilFail, this.frontDepthFail, this.frontDepthPass);
      return this;
    },
    setBackOp: function(stencilFail, depthFail, depthPass) {
      this.backOpSet = true;
      if (stencilFail !== undefined)
        this.backStencilFail = stencilFail;
      if (depthFail !== undefined)
        this.backDepthFail = depthFail;
      if (depthPass !== undefined)
        this.backDepthPass = depthPass;
      $StencilTest.setBackOp(this.backStencilFail, this.backDepthFail, this.backDepthPass);
      return this;
    },
    unsetOp: function() {
      this.frontOpSet = false;
      this.backOpSet = false;
      $StencilTest.unsetOp();
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
  }, {
    enable: function() {
      if (!$StencilTest.enabled) {
        $StencilTest.enabled = true;
        gl.enable(GL.STENCIL_TEST);
      }
      return $StencilTest;
    },
    disable: function() {
      if ($StencilTest.enabled) {
        $StencilTest.enabled = false;
        gl.disable(GL.STENCIL_TEST);
      }
      return $StencilTest;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.func;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.ref;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.valueMask;
      $StencilTest.frontFuncSet = true;
      $StencilTest.backFuncSet = true;
      gl.stencilFunc(func, ref, mask);
      return $StencilTest;
    },
    setFrontFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontValueMask;
      $StencilTest.frontFuncSet = true;
      gl.stencilFuncSeparate(GL.FRONT, func, ref, mask);
      return $StencilTest;
    },
    setBackFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.backRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.backValueMask;
      $StencilTest.backFuncSet = true;
      gl.stencilFuncSeparate(GL.BACK, func, ref, mask);
      return $StencilTest;
    },
    unsetFunc: function() {
      if ($StencilTest.frontFuncSet || $StencilTest.backFuncSet) {
        $StencilTest.frontFuncSet = false;
        $StencilTest.backFuncSet = false;
        gl.stencilFunc($StencilTest.func, $StencilTest.ref, $StencilTest.valueMask);
      }
      return $StencilTest;
    },
    setWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontWriteMask;
      $StencilTest.frontMaskSet = true;
      $StencilTest.backMaskSet = true;
      gl.stencilMask(mask);
      return $StencilTest;
    },
    setFrontWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontWriteMask;
      $StencilTest.frontMaskSet = true;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return $StencilTest;
    },
    setBackWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backWriteMask;
      $StencilTest.backMaskSet = true;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return $StencilTest;
    },
    unsetWriteMask: function() {
      if ($StencilTest.frontMaskSet || $StencilTest.backMaskSet) {
        $StencilTest.frontMaskSet = false;
        $StencilTest.backMaskSet = false;
        gl.stencilMask($StencilTest.writeMask);
      }
      return $StencilTest;
    },
    setOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontDepthPass;
      $StencilTest.frontOpSet = true;
      $StencilTest.backOpSet = true;
      gl.stencilOp(stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    setFrontOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontDepthPass;
      $StencilTest.frontOpSet = true;
      gl.stencilOpSeparate(GL.FRONT, stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    setBackOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.backDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.backDepthPass;
      $StencilTest.backOpSet = true;
      gl.stencilOpSeparate(GL.BACK, stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    unsetOp: function() {
      if ($StencilTest.frontOpSet || $StencilTest.backOpSet) {
        $StencilTest.frontOpSet = false;
        $StencilTest.backOpSet = false;
        gl.stencilOp($StencilTest.fail, $StencilTest.depthFail, $StencilTest.depthPass);
      }
      return $StencilTest;
    }
  });
  Properties(StencilTest, {
    enabled: false,
    frontFuncSet: false,
    frontOpSet: false,
    frontMaskSet: false,
    backFuncSet: false,
    backOpSet: false,
    backMaskSet: false,
    func: GL.ALWAYS,
    ref: 0,
    valueMask: (1 << 16) - 1,
    writeMask: (1 << 16) - 1,
    stencilfail: GL.KEEP,
    depthFail: GL.KEEP,
    depthPass: GL.KEEP,
    frontFunc: GL.ALWAYS,
    frontRef: 0,
    frontValueMask: (1 << 16) - 1,
    frontWriteMask: (1 << 16) - 1,
    frontStencilFail: GL.KEEP,
    frontDepthFail: GL.KEEP,
    frontDepthPass: GL.KEEP,
    backFunc: GL.ALWAYS,
    backRef: 0,
    backValueMask: (1 << 16) - 1,
    backWriteMask: (1 << 16) - 1,
    backStencilFail: GL.KEEP,
    backDepthFail: GL.KEEP,
    backDepthPass: GL.KEEP
  }, E | C | W);
  Properties(StencilTest, {
    FN_NEVER: GL.NEVER,
    FN_LESS: GL.LESS,
    FN_LEQUAL: GL.LEQUAL,
    FN_GREATER: GL.GREATER,
    FN_GEQUAL: GL.GEQUAL,
    FN_EQAUL: GL.EQUAL,
    FN_NOTEQUAL: GL.NOTEQUAL,
    FN_ALWAYS: GL.ALWAYS,
    OP_KEEP: GL.KEEP,
    OP_ZERO: GL.ZERO,
    OP_REPLACE: GL.REPLACE,
    OP_INCR: GL.INCR,
    OP_INCR_WRAP: GL.INCR_WRAP,
    OP_DECR: GL.DECR,
    OP_DECR_WRAP: GL.DECR_WRAP,
    OP_INVERT: GL.INVERT
  }, E);
  var DEFAULT_PROGRAM = Program.VertexColors;
  var Material = function Material() {
    var program = arguments[0] !== (void 0) ? arguments[0] : Program.DEFAULT;
    Properties(this, {
      offset: new PolygonOffset,
      alpha: new Alpha,
      depth: new DepthTest,
      stencil: new StencilTest,
      cullFace: new CullFace,
      scissor: new ScissorTest,
      dither: new Dither,
      multisample: new Multisample
    }, C);
    Properties(this, {
      ambient: new vec3(0.2, 0.2, 0.2),
      diffuse: new vec4(0.8, 0.8, 0.8, 0.8),
      specular: new vec3(0.0, 0.0, 0.0),
      shininess: 50.0
    }, E | C | W);
    this.setProgram(program);
  };
  ($traceurRuntime.createClass)(Material, {}, {});
  var $__default = Material;
  Properties(Material.prototype, {
    setProgram: function(program) {
      Property(this, "program", program, C);
    },
    use: function() {
      this.program.use();
      if (this.program.getUniforms.material)
        this.program.getUniforms.material.copy(this);
      if (this.alpha.enabled) {
        this.alpha.enable();
        if (this.alpha.colorSet)
          this.alpha.setColor();
        else
          this.alpha.unsetColor();
        if (this.alpha.funcSet)
          this.alpha.setFunc();
        else
          this.alpha.unsetFunc();
        if (this.alpha.equationSet)
          this.alpha.setEquation();
      } else
        this.alpha.disable();
      if (this.cullFace.enabled) {
        this.cullFace.enable();
        if (this.cullFace.modeSet)
          this.cullFace.setMode();
        else
          this.cullFace.unsetMode();
        if (this.cullFace.frontSet)
          this.cullFace.setFront();
        else
          this.cullFace.unsetFront();
      } else
        this.cullFace.disable();
      if (this.depth.enabled) {
        this.depth.enable();
        if (this.depth.writeEnabled)
          this.depth.enableWrite();
        else
          this.depth.disableWrite();
        if (this.depth.funcSet)
          this.depth.setFunc();
        else
          this.depth.unsetFunc();
        if (this.depth.rangeSet)
          this.depth.setRange();
        else
          this.depth.unsetRange();
      } else
        this.depth.disable();
      if (this.dither.enabled) {
        this.dither.enable();
      } else
        this.dither.disable();
      if (this.offset.enabled) {
        this.offset.enable();
        if (this.offset.fillSet)
          this.offset.setFill();
        else
          this.offset.unsetFill();
      } else
        this.offset.disable();
      if (this.multisample.enabled) {
        this.multisample.enable();
        if (this.multisample.alphaEnabled)
          this.multisample.enableAlpha();
        else
          this.multisample.disableAlpha();
        if (this.multisample.coverageSet)
          this.multisample.setCoverage();
        else
          this.multisample.unsetCoverage();
      } else
        this.multisample.disable();
      if (this.scissor.enabled) {
        this.scissor.enable();
        if (this.scissor.dimensionsSet)
          this.scissor.setDimensions();
        else
          this.scissor.unsetDimensions();
      } else
        this.scissor.disable();
      if (this.stencil.enabled) {
        this.stencil.enable();
        if (this.stencil.frontOpSet && this.stencil.backOpSet)
          this.stencil.setOp();
        else {
          this.stencil.unsetOp();
          if (this.stencil.frontOpSet)
            this.stencil.setFrontOp();
          if (this.stencil.backOpSet)
            this.stencil.setBackOp();
        }
        if (this.stencil.frontFuncSet && this.stencil.backFuncSet)
          this.stencil.setFunc();
        else {
          this.stencil.unsetFunc();
          if (this.stencil.frontFuncSet)
            this.stencil.setFrontFunc();
          if (this.stencil.backFuncSet)
            this.stencil.setBackFunc();
        }
        if (this.stencil.frontMaskSet && this.stencil.backMaskSet)
          this.stencil.setMask();
        else {
          this.stencil.unsetMask();
          if (this.stencil.frontMaskSet)
            this.stencil.setFrontMask();
          if (this.stencil.backMaskSet)
            this.stencil.setBackMask();
        }
      } else
        this.stencil.disable();
      return this;
    }
  });
  Properties(Material, {DEFAULT: new Material}, E | C);
  return {
    get Dither() {
      return Dither;
    },
    get Multisample() {
      return Multisample;
    },
    get ScissorTest() {
      return ScissorTest;
    },
    get Alpha() {
      return Alpha;
    },
    get DepthTest() {
      return DepthTest;
    },
    get PolygonOffset() {
      return PolygonOffset;
    },
    get CullFace() {
      return CullFace;
    },
    get StencilTest() {
      return StencilTest;
    },
    get default() {
      return $__default;
    }
  };
});
System.registerModule("../src/webgl/GLDraw.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLDraw.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var Draw = function Draw() {};
  ($traceurRuntime.createClass)(Draw, {
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
    }
  }, {
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
    arrays: function(mode, count) {
      var offset = arguments[2] !== (void 0) ? arguments[2] : 0;
      gl.drawArrays(mode, offset, count);
      return this;
    },
    elements: function(mode, type, count) {
      var offset = arguments[3] !== (void 0) ? arguments[3] : 0;
      gl.drawElements(mode, count, type, offset);
      return this;
    }
  });
  var $__default = Draw;
  ;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLVertexBuffer.js", [], function() {
  "use strict";
  var $__3;
  var __moduleName = "../src/webgl/GLVertexBuffer.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL,
      extensions = $__1.extensions;
  var BINDING_TARGET = ($__3 = {}, Object.defineProperty($__3, GL.ARRAY_BUFFER, {
    value: null,
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__3, GL.ELEMENT_ARRAY_BUFFER, {
    value: null,
    configurable: true,
    enumerable: true,
    writable: true
  }), $__3);
  var Buffer = function Buffer(target) {
    var buffer = gl.createBuffer();
    if (target !== undefined)
      Property(buffer, "target", target, C);
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
  Properties(WebGLBuffer.prototype, {
    delete: function() {
      gl.deleteBuffer(this);
      return this;
    },
    bind: function(target) {
      if (target !== undefined)
        Property(this, "target", target, C);
      else
        target = this.target;
      if (BINDING_TARGET[target] !== this) {
        BINDING_TARGET[target] = this;
        gl.bindBuffer(target, this);
      }
      return this;
    },
    unbind: function(target) {
      if (target !== undefined)
        Property(this, "target", target, C);
      else
        target = this.target;
      gl.bindBuffer(target, null);
      return this;
    },
    data: function(data) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      this.bind();
      if (this.target === GL.ELEMENT_ARRAY_BUFFER && data.BYTES_PER_ELEMENT === 4) {
        if (!extensions.OES_element_index_uint)
          console.warn("32bit indices currently not supported.");
      }
      gl.bufferData(this.target, data, usage);
      return this;
    },
    subData: function(data) {
      var offset = arguments[1] !== (void 0) ? arguments[1] : data.byteOffset;
      this.bind();
      gl.bufferSubData(this.target, offset, data);
      return this;
    }
  });
  Getters(WebGLBuffer.prototype, {
    getTargetFlag: function() {
      return gl.flags[this.target];
    },
    getUsageFlag: function() {
      return gl.flags[this.getUsage];
    },
    getUsage: function() {
      this.bind();
      return gl.getBufferParameter(this.target, GL.BUFFER_USAGE);
    },
    getSize: function() {
      this.bind();
      return gl.getBufferParameter(this.target, GL.BUFFER_SIZE);
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULGeometryAttributes.js", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULGeometryAttributes.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var InterleavedArray = System.get("../src/utilities/ULInterleavedArray.js").default;
  var Buffer = System.get("../src/webgl/GLVertexBuffer.js").default;
  var Draw = System.get("../src/webgl/GLDraw.js").default;
  var Material = System.get("../src/utilities/ULMaterial.js").default;
  var Attribute = function Attribute() {};
  var $Attribute = Attribute;
  ($traceurRuntime.createClass)(Attribute, {
    allocateBytes: function(byteLength) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.STATIC;
      this.buffer.data(byteLength, usage);
      return this;
    },
    allocateBuffer: function(data) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.DYNAMIC;
      Property(this, "data", data, C);
      this.buffer.data(data, usage);
      return this;
    },
    update: function() {
      var data = arguments[0] !== (void 0) ? arguments[0] : this.data;
      var offset = arguments[1] !== (void 0) ? arguments[1] : data.byteOffset;
      this.buffer.subData(data, offset);
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.STREAM;
      var oldData = length < this.data.length ? this.data.subarray(0, length) : this.data;
      this.data = new oldData.constructor(length);
      this.data.set(oldData);
      this.buffer.data(this.data.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var count = arguments[1] !== (void 0) ? arguments[1] : this.data.length;
      return this.data.subarray(start, count);
    }
  }, {});
  var VertexAttribute = function VertexAttribute(name, structure) {
    $traceurRuntime.superConstructor($VertexAttribute).call(this);
    Properties(this, {
      name: name,
      buffer: new Buffer.Vertex,
      data: structure.type ? structure.type : structure
    }, C);
  };
  var $VertexAttribute = VertexAttribute;
  ($traceurRuntime.createClass)(VertexAttribute, {}, {}, Attribute);
  Properties(Attribute, {
    STATIC: GL.STATIC_DRAW,
    DYNAMIC: GL.DYNAMIC_DRAW,
    STREAM: GL.STREAM_DRAW
  });
  var ElementAttribute = function ElementAttribute(geometry) {
    $traceurRuntime.superConstructor($ElementAttribute).call(this);
    Properties(this, {
      geometry: geometry,
      buffer: new Buffer.Index
    }, C);
  };
  var $ElementAttribute = ElementAttribute;
  ($traceurRuntime.createClass)(ElementAttribute, {}, {}, Attribute);
  Properties(ElementAttribute.prototype, {
    drawType: GL.TRIANGLES,
    dataType: GL.UNSIGNED_SHORT,
    material: Material.DEFAULT,
    setGeometry: function(geometry) {
      Property(this, "geometry", geometry, C);
      return this;
    },
    setMaterial: function(material) {
      Property(this, "material", material, C);
      return this;
    },
    setDrawType: function(drawType) {
      Property(this, "drawType", drawType, C);
      return this;
    },
    setDataType: function(dataType) {
      Property(this, "dataType", dataType, C);
      return this;
    },
    draw: function() {
      var offset = arguments[0] !== (void 0) ? arguments[0] : 0;
      var count = arguments[1] !== (void 0) ? arguments[1] : this.data.length;
      this.geometry.use();
      this.material.use();
      this.buffer.bind();
      gl.drawElements(this.drawType, count, this.dataType, offset);
      return this;
    }
  });
  Properties(ElementAttribute, {DATA_TYPES: {
      Uint8Array: GL.UNSIGNED_BYTE,
      Uint16Array: GL.UNSIGNED_SHORT,
      Uint32Array: GL.UNSIGNED_INT
    }});
  var VertexAttributeGroup = function VertexAttributeGroup(name, structure) {
    $traceurRuntime.superConstructor($VertexAttributeGroup).call(this);
    this.name = name;
    this.buffer = new Buffer.Vertex;
    this.data = new InterleavedArray(structure);
  };
  var $VertexAttributeGroup = VertexAttributeGroup;
  ($traceurRuntime.createClass)(VertexAttributeGroup, {
    allocate: function(lengthOrData) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      if (isNaN(lengthOrData)) {
        var data = lengthOrData;
        this.data.allocate(data.length);
        this.view = new this.data.type(this.data.buffer);
        this.view.set(data);
        this.buffer.data(this.view, usage);
      } else {
        var length = lengthOrData;
        this.data.allocate(length);
        this.view = new this.data.type(this.data.buffer);
        this.buffer.data(this.view.byteLength, usage);
      }
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      this.data.resize(length);
      this.view = new this.data.type(this.data.buffer);
      this.buffer.data(this.view.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var length = arguments[1] !== (void 0) ? arguments[1] : 1;
      var max = this.data.maxLength;
      if (start < 0)
        start = max + start;
      if (start >= max)
        start = start % max;
      var size = this.data.type.BYTES_PER_ELEMENT;
      var stride = this.data.stride;
      var buffer = this.data.buffer;
      return new this.data.type(buffer, start * stride, length * stride / size);
    },
    set: function() {
      var bufferView = arguments[0] !== (void 0) ? arguments[0] : this.view;
      var offset = arguments[1] !== (void 0) ? arguments[1] : bufferView.byteOffset;
      this.buffer.subData(bufferView, offset, length);
      return this;
    }
  }, {}, Attribute);
  return {
    get VertexAttribute() {
      return VertexAttribute;
    },
    get ElementAttribute() {
      return ElementAttribute;
    },
    get VertexAttributeGroup() {
      return VertexAttributeGroup;
    }
  };
});
System.registerModule("../src/webgl/GLVertexArrayObject.js", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLVertexArrayObject.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL,
      extensions = $__1.extensions,
      capabilities = $__1.capabilities;
  var ext = extensions.OES_vertex_array_object;
  var DEBUG_USE_FALLBACK = false;
  var MAX_VERTEX_BINDINGS = capabilities.getMaxVertexAttribs;
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
    Properties(proto, {
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
      updatePointer: function(index) {
        var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
        var stride = arguments[2] !== (void 0) ? arguments[2] : 0;
        var size = arguments[3] !== (void 0) ? arguments[3] : 4;
        var type = arguments[4] !== (void 0) ? arguments[4] : GL.FLOAT;
        var normalized = arguments[5] !== (void 0) ? arguments[5] : false;
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.setPointer(offset, stride, size, type, normalized);
        }
        return this;
      },
      disableAttribute: function(index) {
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.disable();
        }
        return this;
      },
      enableAttribute: function(index) {
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.enable();
        }
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
    });
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULGeometry", [], function() {
  "use strict";
  var $__8;
  var __moduleName = "../src/utilities/ULGeometry";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/utilities/ULGeometryAttributes.js"),
      VertexAttribute = $__1.VertexAttribute,
      VertexAttributeGroup = $__1.VertexAttributeGroup;
  var $__2 = System.get("../src/webgl/GLContext.js"),
      gl = $__2.gl,
      GL = $__2.GL;
  var VertexArrayObject = System.get("../src/webgl/GLVertexArrayObject.js").default;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation.js").default;
  var Material = System.get("../src/utilities/ULMaterial.js").default;
  var Draw = System.get("../src/webgl/GLDraw.js").default;
  var Geometry = function Geometry() {
    var material = arguments[0] !== (void 0) ? arguments[0] : Material.DEFAULT;
    Properties(this, {
      bindings: new VertexArrayObject,
      material: material
    });
  };
  var $Geometry = Geometry;
  ($traceurRuntime.createClass)(Geometry, {}, {
    Cube: function() {
      var x1 = arguments[0] !== (void 0) ? arguments[0] : 1;
      var x2 = arguments[1] !== (void 0) ? arguments[1] : -1;
      var y1 = arguments[2] !== (void 0) ? arguments[2] : x1;
      var y2 = arguments[3] !== (void 0) ? arguments[3] : x2;
      var z1 = arguments[4] !== (void 0) ? arguments[4] : x1;
      var z2 = arguments[5] !== (void 0) ? arguments[5] : x2;
      var $__9 = $Geometry.Cube.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, 8 + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      if (position) {
        var offset = position.offset / vertex.BYTES_PER_ELEMENT;
        var i = offset;
        vertex[i] = x1;
        vertex[++i] = y1;
        vertex[++i] = z1;
        vertex[i = 1 * stride + offset] = x1;
        vertex[++i] = y2;
        vertex[++i] = z1;
        vertex[i = 2 * stride + offset] = x1;
        vertex[++i] = y1;
        vertex[++i] = z2;
        vertex[i = 3 * stride + offset] = x1;
        vertex[++i] = y2;
        vertex[++i] = z2;
        vertex[i = 4 * stride + offset] = x2;
        vertex[++i] = y1;
        vertex[++i] = z2;
        vertex[i = 5 * stride + offset] = x2;
        vertex[++i] = y2;
        vertex[++i] = z2;
        vertex[i = 6 * stride + offset] = x2;
        vertex[++i] = y1;
        vertex[++i] = z1;
        vertex[i = 7 * stride + offset] = x2;
        vertex[++i] = y2;
        vertex[++i] = z1;
      }
      if (color) {
        var offset$__12 = color.offset / vertex.BYTES_PER_ELEMENT;
        var max = 7 * stride + offset$__12 + color.type.length;
        for (var i$__13 = offset$__12; i$__13 < max; i$__13 += stride) {
          colorFn(vertex, i$__13);
        }
      }
      if (texCoord) {}
      if (normal) {}
      attribute.set();
      return geometry;
    },
    Sphere: function() {
      var longitude = arguments[0] !== (void 0) ? arguments[0] : 10;
      var latitude = arguments[1] !== (void 0) ? arguments[1] : 10;
      latitude -= 1;
      var $__9 = $Geometry.Sphere.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var $__10 = Math,
          PI = $__10.PI,
          sin = $__10.sin,
          cos = $__10.cos;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, (1 + longitude) * (latitude) + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__11 = attribute.data.structure,
          position = $__11.position,
          color = $__11.color,
          texCoord = $__11.texCoord,
          normal = $__11.normal;
      for (var lat = 1; lat < latitude; lat++) {
        var theta = lat * PI / latitude;
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);
        for (var lon = 0; lon <= longitude; lon++) {
          var phi = lon * 2 * PI / longitude;
          var sinPhi = sin(phi);
          var cosPhi = cos(phi);
          var index = (lat * (longitude + 1) + lon) * stride;
          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;
          if (position) {
            var offset = position.offset / vertex.BYTES_PER_ELEMENT;
            var i = index + offset;
            vertex[i] = x;
            vertex[i + 1] = y;
            vertex[i + 2] = z;
          }
          if (color) {
            var offset$__14 = color.offset / vertex.BYTES_PER_ELEMENT;
            colorFn(vertex, index + offset$__14, sinPhi, lat / latitude);
          }
          if (normal) {
            var offset$__15 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__16 = index + offset$__15;
            vertex[i$__16] = x;
            vertex[i$__16 + 1] = y;
            vertex[i$__16 + 2] = z;
          }
          if (texCoord) {
            var offset$__17 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
            var i$__18 = index + offset$__17;
            vertex[i$__18] = 1. - lon / (longitude);
            vertex[i$__18 + 1] = lat / latitude;
          }
        }
      }
      for (var lon$__19 = 0; lon$__19 <= longitude; lon$__19++) {
        var UP = lon$__19 % 2;
        var index$__20 = lon$__19 * stride;
        if (position) {
          var offset$__21 = position.offset / vertex.BYTES_PER_ELEMENT;
          var i$__22 = index$__20 + offset$__21;
          vertex[i$__22] = 0;
          vertex[i$__22 + 1] = UP ? 1 : -1;
          vertex[i$__22 + 2] = 0;
        }
        if (color) {
          var offset$__23 = color.offset / vertex.BYTES_PER_ELEMENT;
          colorFn(vertex, index$__20 + offset$__23, UP ? 1 : 0, UP ? 0 : 1);
        }
        if (normal) {
          var offset$__24 = normal.offset / vertex.BYTES_PER_ELEMENT;
          var i$__25 = index$__20 + offset$__24;
          vertex[i$__25] = 0;
          vertex[i$__25 + 1] = UP ? 1 : -1;
          vertex[i$__25 + 2] = 0;
        }
        if (texCoord) {
          var offset$__26 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
          var i$__27 = index$__20 + offset$__26;
          vertex[i$__27] = 1. - (lon$__19 + -UP * .5) / longitude;
          vertex[i$__27 + 1] = UP ? 0 : 1;
        }
      }
      attribute.set();
      return geometry;
    },
    Cylinder: function() {
      var divisions = arguments[0] !== (void 0) ? arguments[0] : 20;
      var $__9 = $Geometry.Cylinder.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry().createVertexAttributeGroup(name, structure, xdivisions * ydivisions + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      if (position) {
        var offset = position.offset / vertex.BYTES_PER_ELEMENT;
        vertex[offset + 0] = 0;
        vertex[offset + 1] = 1;
        vertex[offset + 2] = 0;
        offset += divisions * stride;
        vertex[offset + 0] = 0;
        vertex[offset + 1] = -1;
        vertex[offset + 2] = 0;
      }
      if (color) {
        var offset$__28 = color.offset / vertex.BYTES_PER_ELEMENT;
        colorFn(vertex, offset$__28, 0);
        offset$__28 += divisions * stride;
        colorFn(vertex, offset$__28, 1);
      }
    },
    Grid: function() {
      var xdivisions = arguments[0] !== (void 0) ? arguments[0] : 20;
      var ydivisions = arguments[1] !== (void 0) ? arguments[1] : 20;
      var heightFn = arguments[2];
      xdivisions += 2;
      ydivisions += 2;
      var $__9 = $Geometry.Grid.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, (xdivisions) * (ydivisions) + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      var index = 0;
      for (var xx = 0; xx < xdivisions; xx++) {
        for (var yy = 0; yy < ydivisions; yy++) {
          var x = xx / (xdivisions - 1) * 2. - 1.0;
          var y = yy / (ydivisions - 1) * 2. - 1.0;
          var z = heightFn ? heightFn(x, y) : 0;
          if (position) {
            var offset = position.offset / vertex.BYTES_PER_ELEMENT;
            var i = index + offset;
            vertex[i++] = x;
            vertex[i++] = y;
            vertex[i++] = z;
          }
          if (color) {
            var offset$__29 = color.offset / vertex.BYTES_PER_ELEMENT;
            colorFn(vertex, index + offset$__29, x, y, z);
          }
          if (normal && !heightFn) {
            var offset$__30 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__31 = index + offset$__30;
            vertex[i$__31++] = 0;
            vertex[i$__31++] = 0;
            vertex[i$__31++] = 1;
          }
          if (texCoord) {
            var offset$__32 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
            var i$__33 = index + offset$__32;
            vertex[i$__33++] = xx / (xdivisions - 1);
            vertex[i$__33++] = yy / (ydivisions - 1);
          }
          index += stride;
        }
      }
      attribute.set();
      return geometry;
    },
    Polygon: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "polygon";
      var sides = arguments[1] !== (void 0) ? arguments[1] : 7;
      var r = arguments[2] !== (void 0) ? arguments[2] : 1;
      var x = arguments[3] !== (void 0) ? arguments[3] : 0;
      var y = arguments[4] !== (void 0) ? arguments[4] : 0;
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
    }
  });
  var $__default = Geometry;
  var GeometryOptions = function GeometryOptions(name, colorFn) {
    this.name = name;
    this.colorFn = colorFn;
  };
  ($traceurRuntime.createClass)(GeometryOptions, {}, {});
  Properties(GeometryOptions.prototype, {
    structure: {
      position: {type: new Float32Array([0, 0, 0])},
      color: {type: new Float32Array([0, 1, 0])},
      normal: {type: new Float32Array([1, 1, 1])},
      texCoord: {type: new Float32Array([0, 0])}
    },
    usage: GL.DYNAMIC_DRAW,
    preallocateVertices: 0
  }, E | C);
  Properties(Geometry.Cube, {options: new GeometryOptions("cube", function(data, offset) {
      data[offset] = Math.random();
      data[offset + 1] = Math.random();
      data[offset + 2] = Math.random();
    })});
  Properties(Geometry.Sphere, {options: new GeometryOptions("sphere", function(data, offset, longitude, latitude) {
      data[offset] = latitude;
      data[offset + 1] = (longitude + 1) * .5;
      data[offset + 2] = 1. - latitude;
    })});
  Properties(Geometry.Grid, {
    options: new GeometryOptions("grid", function colorFn(data, offset, x, y) {
      data[offset] = x;
      data[offset + 1] = y;
      data[offset + 2] = 1;
    }),
    updateHeight: function(gridGeometry, fn) {}
  });
  Properties(Geometry.prototype, ($__8 = {}, Object.defineProperty($__8, "use", {
    value: function() {
      this.bindings.use();
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "unbind", {
    value: function() {
      this.bindings.unbind();
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "draw", {
    value: function(start, count) {
      var max = this.getLength;
      var offset = (start || 0) % max;
      var length = count === undefined ? max : count;
      this.use();
      this.material.use();
      if (offset + length < offset) {
        offset = offset + length;
        length = Math.abs(length);
      }
      if (offset + length > max) {
        gl.drawArrays(GL.POINTS, offset, max - offset);
        gl.drawArrays(GL.POINTS, 0, (offset + length) % max);
      } else {
        gl.drawArrays(GL.POINTS, offset, length);
      }
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "createVertexAttributeGroup", {
    value: function(name, structure, length, usage) {
      var attr = new VertexAttributeGroup(name, structure);
      if (length)
        attr.allocate(length, usage);
      return this.attachVertexAttributeGroup(attr);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "createVertexAttribute", {
    value: function(name, structure, length, usage) {
      var attr = new VertexAttribute(name, structure);
      if (length)
        attr.allocate(length, usage);
      return this.attachVertexAttribute(attr);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "attachVertexAttribute", {
    value: function(attribute, location) {
      var $__8;
      var vao = this.bindings;
      if (location === undefined)
        location = new AttributeLocation(vao.getNextFreeSlot());
      var size = attribute.size;
      var buffer = attribute.buffer;
      location.setSize(size);
      vao.addVertexBinding(location, buffer);
      Properties(this, ($__8 = {}, Object.defineProperty($__8, name, {
        value: attribute,
        configurable: true,
        enumerable: true,
        writable: true
      }), $__8), C);
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "attachVertexAttributeGroup", {
    value: function(attributeGroup) {
      var vao = this.bindings;
      var name = attributeGroup.name;
      var structure = attributeGroup.data.structure;
      var stride = attributeGroup.data.stride;
      var buffer = attributeGroup.buffer;
      for (var property in structure) {
        var member = structure[property];
        var location = member.location ? member.location : new AttributeLocation(vao.getNextFreeSlot());
        var offset = member.offset;
        var defaultValue = member.type;
        var size = defaultValue.length;
        location.setSize(size).setStride(stride).setOffset(offset).setFloatVector(defaultValue, size);
        vao.addVertexBinding(location, buffer);
      }
      ;
      this[name] = attributeGroup;
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__8));
  Getters(Geometry.prototype, {getLength: function() {
      var max = 0;
      for (var attr in this) {
        var data = this[attr].data;
        if (data !== undefined) {
          var length = data.length || data.maxLength;
          if (length > max)
            max = length;
        }
      }
      Property(this, "getLength", max, C);
      return max;
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULGeometryAttributes", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULGeometryAttributes";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var InterleavedArray = System.get("../src/utilities/ULInterleavedArray.js").default;
  var Buffer = System.get("../src/webgl/GLVertexBuffer.js").default;
  var Draw = System.get("../src/webgl/GLDraw.js").default;
  var Material = System.get("../src/utilities/ULMaterial.js").default;
  var Attribute = function Attribute() {};
  var $Attribute = Attribute;
  ($traceurRuntime.createClass)(Attribute, {
    allocateBytes: function(byteLength) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.STATIC;
      this.buffer.data(byteLength, usage);
      return this;
    },
    allocateBuffer: function(data) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.DYNAMIC;
      Property(this, "data", data, C);
      this.buffer.data(data, usage);
      return this;
    },
    update: function() {
      var data = arguments[0] !== (void 0) ? arguments[0] : this.data;
      var offset = arguments[1] !== (void 0) ? arguments[1] : data.byteOffset;
      this.buffer.subData(data, offset);
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : $Attribute.STREAM;
      var oldData = length < this.data.length ? this.data.subarray(0, length) : this.data;
      this.data = new oldData.constructor(length);
      this.data.set(oldData);
      this.buffer.data(this.data.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var count = arguments[1] !== (void 0) ? arguments[1] : this.data.length;
      return this.data.subarray(start, count);
    }
  }, {});
  var VertexAttribute = function VertexAttribute(name, structure) {
    $traceurRuntime.superConstructor($VertexAttribute).call(this);
    Properties(this, {
      name: name,
      buffer: new Buffer.Vertex,
      data: structure.type ? structure.type : structure
    }, C);
  };
  var $VertexAttribute = VertexAttribute;
  ($traceurRuntime.createClass)(VertexAttribute, {}, {}, Attribute);
  Properties(Attribute, {
    STATIC: GL.STATIC_DRAW,
    DYNAMIC: GL.DYNAMIC_DRAW,
    STREAM: GL.STREAM_DRAW
  });
  var ElementAttribute = function ElementAttribute(geometry) {
    $traceurRuntime.superConstructor($ElementAttribute).call(this);
    Properties(this, {
      geometry: geometry,
      buffer: new Buffer.Index
    }, C);
  };
  var $ElementAttribute = ElementAttribute;
  ($traceurRuntime.createClass)(ElementAttribute, {}, {}, Attribute);
  Properties(ElementAttribute.prototype, {
    drawType: GL.TRIANGLES,
    dataType: GL.UNSIGNED_SHORT,
    material: Material.DEFAULT,
    setGeometry: function(geometry) {
      Property(this, "geometry", geometry, C);
      return this;
    },
    setMaterial: function(material) {
      Property(this, "material", material, C);
      return this;
    },
    setDrawType: function(drawType) {
      Property(this, "drawType", drawType, C);
      return this;
    },
    setDataType: function(dataType) {
      Property(this, "dataType", dataType, C);
      return this;
    },
    draw: function() {
      var offset = arguments[0] !== (void 0) ? arguments[0] : 0;
      var count = arguments[1] !== (void 0) ? arguments[1] : this.data.length;
      this.geometry.use();
      this.material.use();
      this.buffer.bind();
      gl.drawElements(this.drawType, count, this.dataType, offset);
      return this;
    }
  });
  Properties(ElementAttribute, {DATA_TYPES: {
      Uint8Array: GL.UNSIGNED_BYTE,
      Uint16Array: GL.UNSIGNED_SHORT,
      Uint32Array: GL.UNSIGNED_INT
    }});
  var VertexAttributeGroup = function VertexAttributeGroup(name, structure) {
    $traceurRuntime.superConstructor($VertexAttributeGroup).call(this);
    this.name = name;
    this.buffer = new Buffer.Vertex;
    this.data = new InterleavedArray(structure);
  };
  var $VertexAttributeGroup = VertexAttributeGroup;
  ($traceurRuntime.createClass)(VertexAttributeGroup, {
    allocate: function(lengthOrData) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      if (isNaN(lengthOrData)) {
        var data = lengthOrData;
        this.data.allocate(data.length);
        this.view = new this.data.type(this.data.buffer);
        this.view.set(data);
        this.buffer.data(this.view, usage);
      } else {
        var length = lengthOrData;
        this.data.allocate(length);
        this.view = new this.data.type(this.data.buffer);
        this.buffer.data(this.view.byteLength, usage);
      }
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      this.data.resize(length);
      this.view = new this.data.type(this.data.buffer);
      this.buffer.data(this.view.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var length = arguments[1] !== (void 0) ? arguments[1] : 1;
      var max = this.data.maxLength;
      if (start < 0)
        start = max + start;
      if (start >= max)
        start = start % max;
      var size = this.data.type.BYTES_PER_ELEMENT;
      var stride = this.data.stride;
      var buffer = this.data.buffer;
      return new this.data.type(buffer, start * stride, length * stride / size);
    },
    set: function() {
      var bufferView = arguments[0] !== (void 0) ? arguments[0] : this.view;
      var offset = arguments[1] !== (void 0) ? arguments[1] : bufferView.byteOffset;
      this.buffer.subData(bufferView, offset, length);
      return this;
    }
  }, {}, Attribute);
  return {
    get VertexAttribute() {
      return VertexAttribute;
    },
    get ElementAttribute() {
      return ElementAttribute;
    },
    get VertexAttributeGroup() {
      return VertexAttributeGroup;
    }
  };
});
System.registerModule("../src/utilities/ULInterleavedArray", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULInterleavedArray";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var InterleavedArray = function InterleavedArray(structure) {
    var type = readStructureType(structure);
    var stride = readOffsets(structure);
    Properties(this, {
      structure: structure,
      stride: stride,
      type: type
    });
  };
  ($traceurRuntime.createClass)(InterleavedArray, {}, {});
  var $__default = InterleavedArray;
  Properties(InterleavedArray.prototype, {
    allocate: function() {
      var maxLength = arguments[0] !== (void 0) ? arguments[0] : 0;
      if (this.length)
        this.disposeViews();
      var buffer = new ArrayBuffer(this.stride * maxLength);
      Properties(this, {
        buffer: buffer,
        maxLength: maxLength
      }, C);
      return this;
    },
    expand: function() {
      var lenght = arguments[0] !== (void 0) ? arguments[0] : 0;
      if (this.length)
        this.disposeViews();
      var maxLength = this.maxLength + length;
      var buffer = new ArrayBuffer(this.stride * maxLength);
      new this.type(buffer).set(new this.type(this.buffer));
      Properties(this, {
        buffer: buffer,
        maxLength: maxLength
      }, C);
      return this;
    }
  });
  function readOffsets(structure) {
    var offsets = [0];
    var i = 0;
    for (var property in structure) {
      offsets.push(offsets[i] + structure[property].type.byteLength);
      structure[property].offset = offsets[i];
      i++;
    }
    return offsets.pop();
  }
  function readStructureType(structure) {
    var type;
    for (var property = void 0 in structure) {
      if (type === undefined)
        type = structure[property].type.constructor;
      else if (type.name !== structure[property].type.constructor.name)
        console.error("InterleavedArray only supports uniform structures, all TypedArrays must have the same type.");
    }
    return type;
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULMaterial", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMaterial";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL,
      canvas = $__1.canvas;
  var Program = System.get("../src/webgl/GLProgram.js").default;
  var Shader = System.get("../src/webgl/GLShader.js").default;
  var $__4 = System.get("../src/math/MLVector.js"),
      vec2 = $__4.vec2,
      vec3 = $__4.vec3,
      vec4 = $__4.vec4;
  var globalUsage = 0;
  var Dither = function Dither() {};
  var $Dither = Dither;
  ($traceurRuntime.createClass)(Dither, {
    enable: function() {
      $Dither.enable();
      this.enabled = true;
      return this;
    },
    disable: function() {
      $Dither.disable();
      this.enabled = false;
      return this;
    }
  }, {
    enable: function() {
      if (!$Dither.enabled) {
        $Dither.enabled = true;
        gl.enable(GL.DITHER_TEST);
      }
      return $Dither;
    },
    disable: function() {
      if ($Dither.enabled) {
        $Dither.enabled = false;
        gl.disable(GL.DITHER_TEST);
      }
      return $Dither;
    },
    get getEnabled() {
      return gl.getParameter(GL.DITHER);
    }
  });
  Properties(Dither, {enabled: false}, E | C | W);
  var Multisample = function Multisample(value, invert) {
    if (value !== undefined)
      this.setCoverage(value, invert);
  };
  var $Multisample = Multisample;
  ($traceurRuntime.createClass)(Multisample, {
    enable: function() {
      this.enabled = true;
      $Multisample.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $Multisample.disable();
      return this;
    },
    enableAlpha: function() {
      this.alphaEnabled = true;
      $Multisample.enableAlpha();
      return this;
    },
    disableAlpha: function() {
      this.alphaEnabled = false;
      $Multisample.disableAlpha();
      return this;
    },
    setCoverage: function(value, invert) {
      this.coverageSet = true;
      if (value)
        this.value = value;
      if (invert)
        this.invert = invert;
      $Multisample.setCoverage(this.value, this.invert);
    },
    unsetCoverage: function() {
      this.coverageSet = false;
      $Multisample.unsetCoverage();
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
  }, {
    enable: function() {
      if (!$Multisample.enabled) {
        $Multisample.enabled = true;
        gl.enable(GL.SAMPLE_COVERAGE);
      }
      return $Multisample;
    },
    disable: function() {
      if ($Multisample.enabled) {
        $Multisample.enabled = false;
        gl.disable(GL.SAMPLE_COVERAGE);
      }
      return $Multisample;
    },
    enableAlpha: function() {
      if (!$Multisample.alphaEnabled) {
        $Multisample.alphaEnabled = true;
        gl.enable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return $Multisample;
    },
    disableAlpha: function() {
      if ($Multisample.alphaEnabled) {
        $Multisample.alphaEnabled = false;
        gl.disable(GL.SAMPLE_ALPHA_TO_COVERAGE);
      }
      return $Multisample;
    },
    setCoverage: function() {
      var value = arguments[0] !== (void 0) ? arguments[0] : $Multisample.value;
      var invert = arguments[1] !== (void 0) ? arguments[1] : $Multisample.invert;
      $Multisample.coverageSet = true;
      gl.sampleCoverage(value, invert);
      return $Multisample;
    },
    unsetCoverage: function() {
      if ($Multisample.coverageSet) {
        $Multisample.coverageSet = false;
        gl.sampleCoverage($Multisample.value, $Multisample.invert);
      }
      return $Multisample;
    }
  });
  Properties(Multisample, {
    enabled: false,
    alphaEnabled: false,
    coverageSet: false,
    value: 1,
    invert: GL.FALSE
  }, E | C | W);
  var ScissorTest = function ScissorTest(x, y, width, height) {
    if (x !== undefined)
      this.set(x, y, width, height);
  };
  var $ScissorTest = ScissorTest;
  ($traceurRuntime.createClass)(ScissorTest, {
    enable: function() {
      this.enabled = true;
      $ScissorTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $ScissorTest.disable();
      return this;
    },
    setDimensions: function(x, y, width, height) {
      this.dimensionsSet = true;
      if (x !== undefined)
        this.x = x;
      if (y !== undefined)
        this.y = y;
      if (width !== undefined)
        this.width = width;
      if (height !== undefined)
        this.height = height;
      $ScissorTest.setDimensions(this.x, this.y, this.width, this.height);
      return this;
    },
    unset: function() {
      this.dimensionsSet = false;
      $ScissorTest.unset();
      return this;
    },
    get getEnabled() {
      return gl.getParameter(GL.SCISSOR_TEST);
    },
    get getScissorBox() {
      return gl.getParameter(GL.SCISSOR_BOX);
    }
  }, {
    enable: function() {
      if (!$ScissorTest.enabled) {
        $ScissorTest.enabled = true;
        gl.enable(GL.SCISSOR_TEST);
      }
      return $ScissorTest;
    },
    disable: function() {
      if ($ScissorTest.enabled) {
        $ScissorTest.enabled = false;
        gl.disable(GL.SCISSOR_TEST);
      }
      return $ScissorTest;
    },
    setDimensions: function() {
      var x = arguments[0] !== (void 0) ? arguments[0] : $ScissorTest.x;
      var y = arguments[1] !== (void 0) ? arguments[1] : $ScissorTest.y;
      var width = arguments[2] !== (void 0) ? arguments[2] : $ScissorTest.width;
      var height = arguments[3] !== (void 0) ? arguments[3] : $ScissorTest.height;
      $ScissorTest.dimensionsSet = true;
      gl.scissor(x, y, width, height);
      return $ScissorTest;
    },
    unset: function() {
      if ($ScissorTest.dimensionsSet) {
        $ScissorTest.dimensionsSet = false;
        gl.scissor($ScissorTest.x, $ScissorTest.y, $ScissorTest.width, $ScissorTest.height);
      }
      return $ScissorTest;
    }
  });
  Properties(ScissorTest, {
    enabled: false,
    dimensionsSet: false,
    x: 0,
    y: 0,
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }, E | C | W);
  var Alpha = function Alpha(rgbFunc, alphaFunc, equation, red, green, blue, alpha) {
    if (red !== undefined)
      this.setColor(red, green, blue, alpha);
    if (rgbFunc !== undefined)
      this.setFunc(rgbFunc, alphaFunc, rgbFunc, alphaFunc);
    if (equation !== undefined)
      this.setEquation(equation);
  };
  var $Alpha = Alpha;
  ($traceurRuntime.createClass)(Alpha, {
    enable: function() {
      this.enabled = true;
      $Alpha.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $Alpha.disable();
      return this;
    },
    setColor: function(red, green, blue, alpha) {
      this.colorSet = true;
      if (red !== undefined)
        this.red = red;
      if (green !== undefined)
        this.green = green;
      if (blue !== undefined)
        this.blue = blue;
      if (alpha !== undefined)
        this.alpha = alpha;
      $Alpha.setColor(this.red, this.green, this.blue, this.alpha);
      return this;
    },
    unsetColor: function() {
      this.colorSet = false;
      $Alpha.unsetColor();
      return this;
    },
    setFunc: function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
      this.funcSet = true;
      if (srcRGB !== undefined)
        this.srcRGB = srcRGB;
      if (dstRGB !== undefined)
        this.dstRGB = dstRGB;
      if (srcAlpha !== undefined)
        this.srcAlpha = srcAlpha;
      if (dstAlpha !== undefined)
        this.dstAlpha = dstAlpha;
      $Alpha.setFunc(this.srcRGB, this.dstRGB, this.srcAlpha, this.dstAlpha);
      return this;
    },
    unsetFunc: function() {
      this.funcSet = false;
      $Alpha.unsetFunc();
      return this;
    },
    setEquation: function(modeRGB, modeAlpha) {
      this.equationSet = true;
      if (modeRGB)
        this.modeRGB = modeRGB;
      if (modeAlpha)
        this.modeAlpha = modeAlpha;
      $Alpha.setEquation(this.modeRGB, this.modeAlpha);
      return this;
    },
    unsetEquation: function() {
      this.equationSet = false;
      $Alpha.unsetEquation;
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
  }, {
    enable: function() {
      if (!$Alpha.enabled) {
        $Alpha.enabled = true;
        gl.enable(GL.BLEND);
      }
      return $Alpha;
    },
    disable: function() {
      if ($Alpha.enabled) {
        $Alpha.enabled = false;
        gl.disable(GL.BLEND);
      }
      return $Alpha;
    },
    setColor: function() {
      var red = arguments[0] !== (void 0) ? arguments[0] : $Alpha.colorRed;
      var green = arguments[1] !== (void 0) ? arguments[1] : $Alpha.colorGreen;
      var blue = arguments[2] !== (void 0) ? arguments[2] : $Alpha.colorBlue;
      var alpha = arguments[3] !== (void 0) ? arguments[3] : $Alpha.colorAlpha;
      $Alpha.colorSet = true;
      gl.blendColor(red, green, blue, alpha);
      return this;
    },
    unsetColor: function() {
      if ($Alpha.colorSet) {
        $Alpha.colorSet = false;
        gl.blendColor($Alpha.colorRed, $Alpha.colorGreen, $Alpha.colorBlue, $Alpha.colorAlpha);
      }
      return $Alpha;
    },
    setFunc: function() {
      var srcRGB = arguments[0] !== (void 0) ? arguments[0] : $Alpha.srcRGB;
      var dstRGB = arguments[1] !== (void 0) ? arguments[1] : $Alpha.dstRGB;
      var srcAlpha = arguments[2] !== (void 0) ? arguments[2] : $Alpha.srcAlpha;
      var dstAlpha = arguments[3] !== (void 0) ? arguments[3] : $Alpha.dstAlpha;
      $Alpha.funcSet = true;
      gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
      return $Alpha;
    },
    unsetFunc: function() {
      if ($Alpha.funcSet) {
        $Alpha.funcSet = false;
        gl.blendFuncSeparate($Alpha.srcRGB, $Alpha.dstRGB, $Alpha.srcAlpha, $Alpha.dstAlpha);
      }
      return $Alpha;
    },
    setEquation: function() {
      var modeRGB = arguments[0] !== (void 0) ? arguments[0] : $Alpha.modeRGB;
      var modeAlpha = arguments[1] !== (void 0) ? arguments[1] : $Alpha.modeAlpha;
      $Alpha.equationSet = true;
      gl.blendEquationSeparate(modeRGB, modeAlpha);
      return $Alpha;
    },
    unsetEquation: function() {
      if ($Alpha.equationSet) {
        $Alpha.equationSet = false;
        gl.blendEquationSeparate($Alpha.modeRGB, $Alpha.modeAlpha);
      }
      return this;
    }
  });
  Properties(Alpha, {
    enabled: false,
    colorSet: false,
    funcSet: false,
    equationSet: false,
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
  }, E | C | W);
  Properties(Alpha, {
    EQ_ADD: GL.FUNC_ADD,
    EQ_SUBTRACT: GL.FUNC_SUBTRACT,
    EQ_REVERSE_SUBTRACT: GL.FUNC_REVERSE_SUBTRACT,
    FN_ZERO: GL.ZERO,
    FN_ONE: GL.ONE,
    FN_SRC_COLOR: GL.SRC_COLOR,
    FN_DST_COLOR: GL.DST_COLOR,
    FN_SRC_ALPHA: GL.SRC_ALPHA,
    FN_DST_ALPHA: GL.DST_ALPHA,
    FN_CONSTANT_COLOR: GL.CONSTANT_COLOR,
    FN_CONSTANT_ALPHA: GL.CONSTANT_ALPHA,
    FN_SRC_ALPHA_SATURATE: GL.SRC_ALPHA_SATURATE,
    FN_ONE_MINUS_SRC_COLOR: GL.ONE_MINUS_SRC_COLOR,
    FN_ONE_MINUS_DST_COLOR: GL.ONE_MINUS_DST_COLOR,
    FN_ONE_MINUS_SRC_ALPHA: GL.ONE_MINUS_SRC_ALPHA,
    FN_ONE_MINUS_DST_ALPHA: GL.ONE_MINUS_DST_ALPHA,
    FN_ONE_MINUS_CONSTANT_COLOR: GL.ONE_MINUS_CONSTANT_COLOR,
    FN_ONE_MINUS_CONSTANT_ALPHA: GL.ONE_MINUS_CONSTANT_ALPHA
  }, E);
  var DepthTest = function DepthTest(write, func, zNear, zFar) {
    if (write)
      this.enableWrite();
    if (func !== undefined)
      this.setFunc(func);
    if (zNear !== undefined)
      this.setRange(zNear, zFar);
  };
  var $DepthTest = DepthTest;
  ($traceurRuntime.createClass)(DepthTest, {
    enable: function() {
      this.enabled = true;
      $DepthTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $DepthTest.disable();
      return this;
    },
    enableWrite: function() {
      this.writeEnabled = true;
      $DepthTest.enableWrite();
      return this;
    },
    disableWrite: function() {
      this.writeEnabled = false;
      $DepthTest.disableWrite();
      return this;
    },
    setFunc: function(func) {
      this.funcSet = true;
      if (func !== undefined)
        this.func = func;
      $DepthTest.setFunc(this.func);
      return this;
    },
    unsetFunc: function() {
      this.funcSet = false;
      $DepthTest.unsetFunc();
      return this;
    },
    setRange: function(zNear, zFar) {
      this.rangeSet = true;
      if (zNear !== undefined)
        this.zNear = zNear;
      if (zFar !== undefined)
        this.zFar = zFar;
      $DepthTest.setRange(this.zNear, this.zFar);
      return this;
    },
    unsetRange: function() {
      this.rangeSet = false;
      $DepthTest.unsetRange();
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
  }, {
    enable: function() {
      if ($DepthTest.enabled === false) {
        $DepthTest.enabled = true;
        gl.enable(GL.DEPTH_TEST);
      }
      return $DepthTest;
    },
    disable: function() {
      if ($DepthTest.enabled === true) {
        $DepthTest.enabled = false;
        gl.disable(GL.DEPTH_TEST);
      }
      return $DepthTest;
    },
    enableWrite: function() {
      if ($DepthTest.writeEnabled === false) {
        $DepthTest.writeEnabled = true;
        gl.depthMask(true);
      }
      return $DepthTest;
    },
    disableWrite: function() {
      if ($DepthTest.writeEnabled === true) {
        $DepthTest.writeEnabled = false;
        gl.depthMask(false);
      }
      return $DepthTest;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $DepthTest.func;
      $DepthTest.funcSet;
      gl.depthFunc(func);
      return $DepthTest;
    },
    unsetFunc: function() {
      if ($DepthTest.funcSet) {
        $DepthTest.funcSet = false;
        gl.depthFunc($DepthTest.func);
      }
      return $DepthTest;
    },
    setRange: function() {
      var zNear = arguments[0] !== (void 0) ? arguments[0] : $DepthTest.zNear;
      var zFar = arguments[1] !== (void 0) ? arguments[1] : $DepthTest.zFar;
      $DepthTest.rangeSet = true;
      gl.depthRange(zNear, zFar);
      return $DepthTest;
    },
    unsetRange: function() {
      if ($DepthTest.rangeSet) {
        $DepthTest.rangeSet = false;
        gl.depthRange($DepthTest.zNear, $DepthTest.zFar);
      }
      return $DepthTest;
    }
  });
  Properties(DepthTest, {
    enabled: false,
    writeEnabled: false,
    funcSet: false,
    rangeSet: false,
    func: GL.LESS,
    zNear: 0,
    zFar: 1
  }, E | C | W);
  Properties(DepthTest, {
    FN_NEVER: GL.NEVER,
    FN_LESS: GL.LESS,
    FN_EQUAL: GL.EQUAL,
    FN_LEQUAL: GL.LEQUAL,
    FN_GREATER: GL.GREATER,
    FN_NOTEQUAL: GL.NOTEQUAL,
    FN_GEQUAL: GL.GEQUAL,
    FN_ALWAYS: GL.ALWAYS
  }, E);
  var PolygonOffset = function PolygonOffset(factor, units) {
    if (factor !== undefined)
      this.setFill(factor, units);
  };
  var $PolygonOffset = PolygonOffset;
  ($traceurRuntime.createClass)(PolygonOffset, {
    enable: function() {
      this.enabled = true;
      $PolygonOffset.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $PolygonOffset.disable();
      return this;
    },
    setFill: function(factor, units) {
      this.fillSet = true;
      if (factor !== undefined)
        this.factor = factor;
      if (units !== undefined)
        this.units = units;
      $PolygonOffset.setFill(this.factor, this.units);
      return this;
    },
    unsetFill: function() {
      this.fillSet = false;
      $PolygonOffset.unsetFill();
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
  }, {
    enable: function() {
      if (!$PolygonOffset.enabled) {
        $PolygonOffset.enabled = true;
        gl.enable(GL.POLYGON_OFFSET_FILL);
      }
      return $PolygonOffset;
    },
    disable: function() {
      if ($PolygonOffset.enabled) {
        $PolygonOffset.enabled = false;
        gl.disable(GL.POLYGON_OFFSET_FILL);
      }
      return $PolygonOffset;
    },
    setFill: function() {
      var factor = arguments[0] !== (void 0) ? arguments[0] : $PolygonOffset.factor;
      var units = arguments[1] !== (void 0) ? arguments[1] : $PolygonOffset.units;
      $PolygonOffset.fillSet = true;
      gl.polygonOffset(factor, units);
      return $PolygonOffset;
    },
    unsetFill: function() {
      if ($PolygonOffset.fillSet) {
        $PolygonOffset.fillSet = false;
        gl.polygonOffset($PolygonOffset.factor, $PolygonOffset.units);
      }
      return $PolygonOffset;
    }
  });
  Properties(PolygonOffset, {
    enabled: false,
    fillSet: false,
    factor: 0,
    units: 0
  }, E | C | W);
  var CullFace = function CullFace(mode, front) {
    if (mode !== undefined)
      this.setMode(mode);
    if (front !== undefined)
      this.setFront(front);
  };
  var $CullFace = CullFace;
  ($traceurRuntime.createClass)(CullFace, {
    enable: function() {
      this.enabled = true;
      $CullFace.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $CullFace.disable();
      return this;
    },
    setMode: function(mode) {
      this.modeSet = true;
      if (mode !== undefined)
        this.mode = mode;
      $CullFace.setMode(this.mode);
      return this;
    },
    unsetMode: function() {
      this.modeSet = false;
      $CullFace.unsetMode();
      return this;
    },
    setFront: function(front) {
      this.frontSet = true;
      if (front !== undefined)
        this.front = front;
      $CullFace.setFront(this.front);
      return this;
    },
    unsetFront: function() {
      this.frontSet = false;
      $CullFace.unsetFront();
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
  }, {
    enable: function() {
      if (!$CullFace.enabled) {
        $CullFace.enabled = true;
        gl.enable(GL.CULL_FACE);
      }
      return $CullFace;
    },
    disable: function() {
      if ($CullFace.enabled) {
        $CullFace.enabled = false;
        gl.disable(GL.CULL_FACE);
      }
      return $CullFace;
    },
    setMode: function() {
      var mode = arguments[0] !== (void 0) ? arguments[0] : $CullFace.mode;
      $CullFace.modeSet = true;
      gl.cullFace(mode);
      return $CullFace;
    },
    unsetMode: function() {
      if ($CullFace.modeSet) {
        $CullFace.modeSet = false;
        gl.cullFace($CullFace.mode);
      }
      return $CullFace;
    },
    setFront: function() {
      var front = arguments[0] !== (void 0) ? arguments[0] : CulLFace.front;
      $CullFace.frontSet = true;
      gl.frontFace(front);
      return $CullFace;
    },
    unsetFront: function() {
      if ($CullFace.fronSet) {
        $CullFace.frontSet = false;
        gl.frontFace($CullFace.front);
      }
      return $CullFace;
    }
  });
  Properties(CullFace, {
    enabled: false,
    modeSet: false,
    frontSet: false,
    mode: GL.FRONT,
    front: GL.CCW
  }, E | C | W);
  Properties(CullFace, {
    MD_FRONT: GL.FRONT,
    MD_BACK: GL.BACK,
    MD_FRONT_AND_BACK: GL.FRONT_AND_BACK,
    FR_CW: GL.CW,
    FR_CCW: GL.CCW
  }, E);
  var StencilTest = function StencilTest() {};
  var $StencilTest = StencilTest;
  ($traceurRuntime.createClass)(StencilTest, {
    enable: function() {
      this.enabled = true;
      $StencilTest.enable();
      return this;
    },
    disable: function() {
      this.enabled = false;
      $StencilTest.disable();
      return this;
    },
    setFunc: function(func, ref, mask) {
      this.frontFuncSet = true;
      this.backFuncSet = true;
      if (func !== undefined)
        this.func = func;
      if (ref !== undefined)
        this.ref = ref;
      if (mask !== undefined)
        this.mask = mask;
      $StencilTest.setFunc(this.func, this.ref, this.mask);
      return this;
    },
    setFrontFunc: function(func, ref, mask) {
      this.frontFuncSet = true;
      if (func !== undefined)
        this.frontFunc = func;
      if (ref !== undefined)
        this.frontRef = ref;
      if (mask !== undefined)
        this.frontMask = mask;
      $StencilTest.setFrontFunc(this.frontFunc, this.frontRef, this.frontMask);
      return this;
    },
    setBackFunc: function(func, ref, mask) {
      this.backFuncSet = true;
      if (func !== undefined)
        this.backFunc = func;
      if (ref !== undefined)
        this.backRef = ref;
      if (mask !== undefined)
        this.backMask = mask;
      $StencilTest.setBackFunc(this.backFunc, this.backRef, this.backMask);
      return this;
    },
    unsetFunc: function() {
      this.frontFuncSet = false;
      this.backFuncSet = false;
      $StencilTest.unsetFunc();
      return this;
    },
    setWriteMask: function(mask) {
      this.frontMaskSet = true;
      this.backMaskSet = true;
      if (mask !== undefined)
        this.writeMask = mask;
      $StencilTest.setWriteMask(this.writeMask);
      return this;
    },
    setFrontWriteMask: function(mask) {
      this.frontMaskSet = true;
      if (mask !== undefined)
        this.frontWriteMask = mask;
      Stenciltest.setFrontWriteMask(this.frontWriteMask);
      return this;
    },
    setBackWriteMask: function(mask) {
      this.backWriteMaskSet = true;
      if (mask !== undefined)
        this.backWriteMask = mask;
      $StencilTest.setBackWriteMask(this.backWriteMask);
      return this;
    },
    unsetWriteMask: function() {
      this.frontMaskSet = false;
      this.backMaskSet = false;
      $StencilTest.unsetWriteMask();
      return this;
    },
    setOp: function(stencilFail, depthFail, depthPass) {
      this.frontOpSet = true;
      this.backOpSet = true;
      if (stencilFail !== undefined)
        this.stencilFail = stencilFail;
      if (depthFail !== undefined)
        this.depthFail = depthFail;
      if (depthPass !== undefined)
        this.depthPass = depthPass;
      $StencilTest.setOp(this.stencilFail, this.depthFail, this.depthPass);
      return this;
    },
    setFrontOp: function(stencilFail, depthFail, depthPass) {
      this.frontOpSet = true;
      if (stencilFail !== undefined)
        this.frontStencilFail = stencilFail;
      if (depthFail !== undefined)
        this.frontDepthFail = depthFail;
      if (depthPass !== undefined)
        this.frontDepthPass = depthPass;
      $StencilTest.setFrontOp(this.frontStencilFail, this.frontDepthFail, this.frontDepthPass);
      return this;
    },
    setBackOp: function(stencilFail, depthFail, depthPass) {
      this.backOpSet = true;
      if (stencilFail !== undefined)
        this.backStencilFail = stencilFail;
      if (depthFail !== undefined)
        this.backDepthFail = depthFail;
      if (depthPass !== undefined)
        this.backDepthPass = depthPass;
      $StencilTest.setBackOp(this.backStencilFail, this.backDepthFail, this.backDepthPass);
      return this;
    },
    unsetOp: function() {
      this.frontOpSet = false;
      this.backOpSet = false;
      $StencilTest.unsetOp();
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
  }, {
    enable: function() {
      if (!$StencilTest.enabled) {
        $StencilTest.enabled = true;
        gl.enable(GL.STENCIL_TEST);
      }
      return $StencilTest;
    },
    disable: function() {
      if ($StencilTest.enabled) {
        $StencilTest.enabled = false;
        gl.disable(GL.STENCIL_TEST);
      }
      return $StencilTest;
    },
    setFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.func;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.ref;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.valueMask;
      $StencilTest.frontFuncSet = true;
      $StencilTest.backFuncSet = true;
      gl.stencilFunc(func, ref, mask);
      return $StencilTest;
    },
    setFrontFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontValueMask;
      $StencilTest.frontFuncSet = true;
      gl.stencilFuncSeparate(GL.FRONT, func, ref, mask);
      return $StencilTest;
    },
    setBackFunc: function() {
      var func = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backFunc;
      var ref = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.backRef;
      var mask = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.backValueMask;
      $StencilTest.backFuncSet = true;
      gl.stencilFuncSeparate(GL.BACK, func, ref, mask);
      return $StencilTest;
    },
    unsetFunc: function() {
      if ($StencilTest.frontFuncSet || $StencilTest.backFuncSet) {
        $StencilTest.frontFuncSet = false;
        $StencilTest.backFuncSet = false;
        gl.stencilFunc($StencilTest.func, $StencilTest.ref, $StencilTest.valueMask);
      }
      return $StencilTest;
    },
    setWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontWriteMask;
      $StencilTest.frontMaskSet = true;
      $StencilTest.backMaskSet = true;
      gl.stencilMask(mask);
      return $StencilTest;
    },
    setFrontWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontWriteMask;
      $StencilTest.frontMaskSet = true;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return $StencilTest;
    },
    setBackWriteMask: function() {
      var mask = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backWriteMask;
      $StencilTest.backMaskSet = true;
      gl.stencilMaskSeparate(GL.FRONT, mask);
      return $StencilTest;
    },
    unsetWriteMask: function() {
      if ($StencilTest.frontMaskSet || $StencilTest.backMaskSet) {
        $StencilTest.frontMaskSet = false;
        $StencilTest.backMaskSet = false;
        gl.stencilMask($StencilTest.writeMask);
      }
      return $StencilTest;
    },
    setOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontDepthPass;
      $StencilTest.frontOpSet = true;
      $StencilTest.backOpSet = true;
      gl.stencilOp(stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    setFrontOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.frontFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.frontDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.frontDepthPass;
      $StencilTest.frontOpSet = true;
      gl.stencilOpSeparate(GL.FRONT, stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    setBackOp: function() {
      var stencilFail = arguments[0] !== (void 0) ? arguments[0] : $StencilTest.backFail;
      var depthFail = arguments[1] !== (void 0) ? arguments[1] : $StencilTest.backDepthFail;
      var depthPass = arguments[2] !== (void 0) ? arguments[2] : $StencilTest.backDepthPass;
      $StencilTest.backOpSet = true;
      gl.stencilOpSeparate(GL.BACK, stencilFail, depthFail, depthPass);
      return $StencilTest;
    },
    unsetOp: function() {
      if ($StencilTest.frontOpSet || $StencilTest.backOpSet) {
        $StencilTest.frontOpSet = false;
        $StencilTest.backOpSet = false;
        gl.stencilOp($StencilTest.fail, $StencilTest.depthFail, $StencilTest.depthPass);
      }
      return $StencilTest;
    }
  });
  Properties(StencilTest, {
    enabled: false,
    frontFuncSet: false,
    frontOpSet: false,
    frontMaskSet: false,
    backFuncSet: false,
    backOpSet: false,
    backMaskSet: false,
    func: GL.ALWAYS,
    ref: 0,
    valueMask: (1 << 16) - 1,
    writeMask: (1 << 16) - 1,
    stencilfail: GL.KEEP,
    depthFail: GL.KEEP,
    depthPass: GL.KEEP,
    frontFunc: GL.ALWAYS,
    frontRef: 0,
    frontValueMask: (1 << 16) - 1,
    frontWriteMask: (1 << 16) - 1,
    frontStencilFail: GL.KEEP,
    frontDepthFail: GL.KEEP,
    frontDepthPass: GL.KEEP,
    backFunc: GL.ALWAYS,
    backRef: 0,
    backValueMask: (1 << 16) - 1,
    backWriteMask: (1 << 16) - 1,
    backStencilFail: GL.KEEP,
    backDepthFail: GL.KEEP,
    backDepthPass: GL.KEEP
  }, E | C | W);
  Properties(StencilTest, {
    FN_NEVER: GL.NEVER,
    FN_LESS: GL.LESS,
    FN_LEQUAL: GL.LEQUAL,
    FN_GREATER: GL.GREATER,
    FN_GEQUAL: GL.GEQUAL,
    FN_EQAUL: GL.EQUAL,
    FN_NOTEQUAL: GL.NOTEQUAL,
    FN_ALWAYS: GL.ALWAYS,
    OP_KEEP: GL.KEEP,
    OP_ZERO: GL.ZERO,
    OP_REPLACE: GL.REPLACE,
    OP_INCR: GL.INCR,
    OP_INCR_WRAP: GL.INCR_WRAP,
    OP_DECR: GL.DECR,
    OP_DECR_WRAP: GL.DECR_WRAP,
    OP_INVERT: GL.INVERT
  }, E);
  var DEFAULT_PROGRAM = Program.VertexColors;
  var Material = function Material() {
    var program = arguments[0] !== (void 0) ? arguments[0] : Program.DEFAULT;
    Properties(this, {
      offset: new PolygonOffset,
      alpha: new Alpha,
      depth: new DepthTest,
      stencil: new StencilTest,
      cullFace: new CullFace,
      scissor: new ScissorTest,
      dither: new Dither,
      multisample: new Multisample
    }, C);
    Properties(this, {
      ambient: new vec3(0.2, 0.2, 0.2),
      diffuse: new vec4(0.8, 0.8, 0.8, 0.8),
      specular: new vec3(0.0, 0.0, 0.0),
      shininess: 50.0
    }, E | C | W);
    this.setProgram(program);
  };
  ($traceurRuntime.createClass)(Material, {}, {});
  var $__default = Material;
  Properties(Material.prototype, {
    setProgram: function(program) {
      Property(this, "program", program, C);
    },
    use: function() {
      this.program.use();
      if (this.program.getUniforms.material)
        this.program.getUniforms.material.copy(this);
      if (this.alpha.enabled) {
        this.alpha.enable();
        if (this.alpha.colorSet)
          this.alpha.setColor();
        else
          this.alpha.unsetColor();
        if (this.alpha.funcSet)
          this.alpha.setFunc();
        else
          this.alpha.unsetFunc();
        if (this.alpha.equationSet)
          this.alpha.setEquation();
      } else
        this.alpha.disable();
      if (this.cullFace.enabled) {
        this.cullFace.enable();
        if (this.cullFace.modeSet)
          this.cullFace.setMode();
        else
          this.cullFace.unsetMode();
        if (this.cullFace.frontSet)
          this.cullFace.setFront();
        else
          this.cullFace.unsetFront();
      } else
        this.cullFace.disable();
      if (this.depth.enabled) {
        this.depth.enable();
        if (this.depth.writeEnabled)
          this.depth.enableWrite();
        else
          this.depth.disableWrite();
        if (this.depth.funcSet)
          this.depth.setFunc();
        else
          this.depth.unsetFunc();
        if (this.depth.rangeSet)
          this.depth.setRange();
        else
          this.depth.unsetRange();
      } else
        this.depth.disable();
      if (this.dither.enabled) {
        this.dither.enable();
      } else
        this.dither.disable();
      if (this.offset.enabled) {
        this.offset.enable();
        if (this.offset.fillSet)
          this.offset.setFill();
        else
          this.offset.unsetFill();
      } else
        this.offset.disable();
      if (this.multisample.enabled) {
        this.multisample.enable();
        if (this.multisample.alphaEnabled)
          this.multisample.enableAlpha();
        else
          this.multisample.disableAlpha();
        if (this.multisample.coverageSet)
          this.multisample.setCoverage();
        else
          this.multisample.unsetCoverage();
      } else
        this.multisample.disable();
      if (this.scissor.enabled) {
        this.scissor.enable();
        if (this.scissor.dimensionsSet)
          this.scissor.setDimensions();
        else
          this.scissor.unsetDimensions();
      } else
        this.scissor.disable();
      if (this.stencil.enabled) {
        this.stencil.enable();
        if (this.stencil.frontOpSet && this.stencil.backOpSet)
          this.stencil.setOp();
        else {
          this.stencil.unsetOp();
          if (this.stencil.frontOpSet)
            this.stencil.setFrontOp();
          if (this.stencil.backOpSet)
            this.stencil.setBackOp();
        }
        if (this.stencil.frontFuncSet && this.stencil.backFuncSet)
          this.stencil.setFunc();
        else {
          this.stencil.unsetFunc();
          if (this.stencil.frontFuncSet)
            this.stencil.setFrontFunc();
          if (this.stencil.backFuncSet)
            this.stencil.setBackFunc();
        }
        if (this.stencil.frontMaskSet && this.stencil.backMaskSet)
          this.stencil.setMask();
        else {
          this.stencil.unsetMask();
          if (this.stencil.frontMaskSet)
            this.stencil.setFrontMask();
          if (this.stencil.backMaskSet)
            this.stencil.setBackMask();
        }
      } else
        this.stencil.disable();
      return this;
    }
  });
  Properties(Material, {DEFAULT: new Material}, E | C);
  return {
    get Dither() {
      return Dither;
    },
    get Multisample() {
      return Multisample;
    },
    get ScissorTest() {
      return ScissorTest;
    },
    get Alpha() {
      return Alpha;
    },
    get DepthTest() {
      return DepthTest;
    },
    get PolygonOffset() {
      return PolygonOffset;
    },
    get CullFace() {
      return CullFace;
    },
    get StencilTest() {
      return StencilTest;
    },
    get default() {
      return $__default;
    }
  };
});
System.registerModule("../src/utilities/ULGeometry.js", [], function() {
  "use strict";
  var $__8;
  var __moduleName = "../src/utilities/ULGeometry.js";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/utilities/ULGeometryAttributes.js"),
      VertexAttribute = $__1.VertexAttribute,
      VertexAttributeGroup = $__1.VertexAttributeGroup;
  var $__2 = System.get("../src/webgl/GLContext.js"),
      gl = $__2.gl,
      GL = $__2.GL;
  var VertexArrayObject = System.get("../src/webgl/GLVertexArrayObject.js").default;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation.js").default;
  var Material = System.get("../src/utilities/ULMaterial.js").default;
  var Draw = System.get("../src/webgl/GLDraw.js").default;
  var Geometry = function Geometry() {
    var material = arguments[0] !== (void 0) ? arguments[0] : Material.DEFAULT;
    Properties(this, {
      bindings: new VertexArrayObject,
      material: material
    });
  };
  var $Geometry = Geometry;
  ($traceurRuntime.createClass)(Geometry, {}, {
    Cube: function() {
      var x1 = arguments[0] !== (void 0) ? arguments[0] : 1;
      var x2 = arguments[1] !== (void 0) ? arguments[1] : -1;
      var y1 = arguments[2] !== (void 0) ? arguments[2] : x1;
      var y2 = arguments[3] !== (void 0) ? arguments[3] : x2;
      var z1 = arguments[4] !== (void 0) ? arguments[4] : x1;
      var z2 = arguments[5] !== (void 0) ? arguments[5] : x2;
      var $__9 = $Geometry.Cube.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, 8 + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      if (position) {
        var offset = position.offset / vertex.BYTES_PER_ELEMENT;
        var i = offset;
        vertex[i] = x1;
        vertex[++i] = y1;
        vertex[++i] = z1;
        vertex[i = 1 * stride + offset] = x1;
        vertex[++i] = y2;
        vertex[++i] = z1;
        vertex[i = 2 * stride + offset] = x1;
        vertex[++i] = y1;
        vertex[++i] = z2;
        vertex[i = 3 * stride + offset] = x1;
        vertex[++i] = y2;
        vertex[++i] = z2;
        vertex[i = 4 * stride + offset] = x2;
        vertex[++i] = y1;
        vertex[++i] = z2;
        vertex[i = 5 * stride + offset] = x2;
        vertex[++i] = y2;
        vertex[++i] = z2;
        vertex[i = 6 * stride + offset] = x2;
        vertex[++i] = y1;
        vertex[++i] = z1;
        vertex[i = 7 * stride + offset] = x2;
        vertex[++i] = y2;
        vertex[++i] = z1;
      }
      if (color) {
        var offset$__12 = color.offset / vertex.BYTES_PER_ELEMENT;
        var max = 7 * stride + offset$__12 + color.type.length;
        for (var i$__13 = offset$__12; i$__13 < max; i$__13 += stride) {
          colorFn(vertex, i$__13);
        }
      }
      if (texCoord) {}
      if (normal) {}
      attribute.set();
      return geometry;
    },
    Sphere: function() {
      var longitude = arguments[0] !== (void 0) ? arguments[0] : 10;
      var latitude = arguments[1] !== (void 0) ? arguments[1] : 10;
      latitude -= 1;
      var $__9 = $Geometry.Sphere.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var $__10 = Math,
          PI = $__10.PI,
          sin = $__10.sin,
          cos = $__10.cos;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, (1 + longitude) * (latitude) + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__11 = attribute.data.structure,
          position = $__11.position,
          color = $__11.color,
          texCoord = $__11.texCoord,
          normal = $__11.normal;
      for (var lat = 1; lat < latitude; lat++) {
        var theta = lat * PI / latitude;
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);
        for (var lon = 0; lon <= longitude; lon++) {
          var phi = lon * 2 * PI / longitude;
          var sinPhi = sin(phi);
          var cosPhi = cos(phi);
          var index = (lat * (longitude + 1) + lon) * stride;
          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;
          if (position) {
            var offset = position.offset / vertex.BYTES_PER_ELEMENT;
            var i = index + offset;
            vertex[i] = x;
            vertex[i + 1] = y;
            vertex[i + 2] = z;
          }
          if (color) {
            var offset$__14 = color.offset / vertex.BYTES_PER_ELEMENT;
            colorFn(vertex, index + offset$__14, sinPhi, lat / latitude);
          }
          if (normal) {
            var offset$__15 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__16 = index + offset$__15;
            vertex[i$__16] = x;
            vertex[i$__16 + 1] = y;
            vertex[i$__16 + 2] = z;
          }
          if (texCoord) {
            var offset$__17 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
            var i$__18 = index + offset$__17;
            vertex[i$__18] = 1. - lon / (longitude);
            vertex[i$__18 + 1] = lat / latitude;
          }
        }
      }
      for (var lon$__19 = 0; lon$__19 <= longitude; lon$__19++) {
        var UP = lon$__19 % 2;
        var index$__20 = lon$__19 * stride;
        if (position) {
          var offset$__21 = position.offset / vertex.BYTES_PER_ELEMENT;
          var i$__22 = index$__20 + offset$__21;
          vertex[i$__22] = 0;
          vertex[i$__22 + 1] = UP ? 1 : -1;
          vertex[i$__22 + 2] = 0;
        }
        if (color) {
          var offset$__23 = color.offset / vertex.BYTES_PER_ELEMENT;
          colorFn(vertex, index$__20 + offset$__23, UP ? 1 : 0, UP ? 0 : 1);
        }
        if (normal) {
          var offset$__24 = normal.offset / vertex.BYTES_PER_ELEMENT;
          var i$__25 = index$__20 + offset$__24;
          vertex[i$__25] = 0;
          vertex[i$__25 + 1] = UP ? 1 : -1;
          vertex[i$__25 + 2] = 0;
        }
        if (texCoord) {
          var offset$__26 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
          var i$__27 = index$__20 + offset$__26;
          vertex[i$__27] = 1. - (lon$__19 + -UP * .5) / longitude;
          vertex[i$__27 + 1] = UP ? 0 : 1;
        }
      }
      attribute.set();
      return geometry;
    },
    Cylinder: function() {
      var divisions = arguments[0] !== (void 0) ? arguments[0] : 20;
      var $__9 = $Geometry.Cylinder.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry().createVertexAttributeGroup(name, structure, xdivisions * ydivisions + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      if (position) {
        var offset = position.offset / vertex.BYTES_PER_ELEMENT;
        vertex[offset + 0] = 0;
        vertex[offset + 1] = 1;
        vertex[offset + 2] = 0;
        offset += divisions * stride;
        vertex[offset + 0] = 0;
        vertex[offset + 1] = -1;
        vertex[offset + 2] = 0;
      }
      if (color) {
        var offset$__28 = color.offset / vertex.BYTES_PER_ELEMENT;
        colorFn(vertex, offset$__28, 0);
        offset$__28 += divisions * stride;
        colorFn(vertex, offset$__28, 1);
      }
    },
    Grid: function() {
      var xdivisions = arguments[0] !== (void 0) ? arguments[0] : 20;
      var ydivisions = arguments[1] !== (void 0) ? arguments[1] : 20;
      var heightFn = arguments[2];
      xdivisions += 2;
      ydivisions += 2;
      var $__9 = $Geometry.Grid.options,
          structure = $__9.structure,
          colorFn = $__9.colorFn,
          usage = $__9.usage,
          name = $__9.name,
          preallocateVertices = $__9.preallocateVertices;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, (xdivisions) * (ydivisions) + preallocateVertices, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__10 = attribute.data.structure,
          position = $__10.position,
          color = $__10.color,
          normal = $__10.normal,
          texCoord = $__10.texCoord;
      var index = 0;
      for (var xx = 0; xx < xdivisions; xx++) {
        for (var yy = 0; yy < ydivisions; yy++) {
          var x = xx / (xdivisions - 1) * 2. - 1.0;
          var y = yy / (ydivisions - 1) * 2. - 1.0;
          var z = heightFn ? heightFn(x, y) : 0;
          if (position) {
            var offset = position.offset / vertex.BYTES_PER_ELEMENT;
            var i = index + offset;
            vertex[i++] = x;
            vertex[i++] = y;
            vertex[i++] = z;
          }
          if (color) {
            var offset$__29 = color.offset / vertex.BYTES_PER_ELEMENT;
            colorFn(vertex, index + offset$__29, x, y, z);
          }
          if (normal && !heightFn) {
            var offset$__30 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__31 = index + offset$__30;
            vertex[i$__31++] = 0;
            vertex[i$__31++] = 0;
            vertex[i$__31++] = 1;
          }
          if (texCoord) {
            var offset$__32 = texCoord.offset / vertex.BYTES_PER_ELEMENT;
            var i$__33 = index + offset$__32;
            vertex[i$__33++] = xx / (xdivisions - 1);
            vertex[i$__33++] = yy / (ydivisions - 1);
          }
          index += stride;
        }
      }
      attribute.set();
      return geometry;
    },
    Polygon: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "polygon";
      var sides = arguments[1] !== (void 0) ? arguments[1] : 7;
      var r = arguments[2] !== (void 0) ? arguments[2] : 1;
      var x = arguments[3] !== (void 0) ? arguments[3] : 0;
      var y = arguments[4] !== (void 0) ? arguments[4] : 0;
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
    }
  });
  var $__default = Geometry;
  var GeometryOptions = function GeometryOptions(name, colorFn) {
    this.name = name;
    this.colorFn = colorFn;
  };
  ($traceurRuntime.createClass)(GeometryOptions, {}, {});
  Properties(GeometryOptions.prototype, {
    structure: {
      position: {type: new Float32Array([0, 0, 0])},
      color: {type: new Float32Array([0, 1, 0])},
      normal: {type: new Float32Array([1, 1, 1])},
      texCoord: {type: new Float32Array([0, 0])}
    },
    usage: GL.DYNAMIC_DRAW,
    preallocateVertices: 0
  }, E | C);
  Properties(Geometry.Cube, {options: new GeometryOptions("cube", function(data, offset) {
      data[offset] = Math.random();
      data[offset + 1] = Math.random();
      data[offset + 2] = Math.random();
    })});
  Properties(Geometry.Sphere, {options: new GeometryOptions("sphere", function(data, offset, longitude, latitude) {
      data[offset] = latitude;
      data[offset + 1] = (longitude + 1) * .5;
      data[offset + 2] = 1. - latitude;
    })});
  Properties(Geometry.Grid, {
    options: new GeometryOptions("grid", function colorFn(data, offset, x, y) {
      data[offset] = x;
      data[offset + 1] = y;
      data[offset + 2] = 1;
    }),
    updateHeight: function(gridGeometry, fn) {}
  });
  Properties(Geometry.prototype, ($__8 = {}, Object.defineProperty($__8, "use", {
    value: function() {
      this.bindings.use();
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "unbind", {
    value: function() {
      this.bindings.unbind();
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "draw", {
    value: function(start, count) {
      var max = this.getLength;
      var offset = (start || 0) % max;
      var length = count === undefined ? max : count;
      this.use();
      this.material.use();
      if (offset + length < offset) {
        offset = offset + length;
        length = Math.abs(length);
      }
      if (offset + length > max) {
        gl.drawArrays(GL.POINTS, offset, max - offset);
        gl.drawArrays(GL.POINTS, 0, (offset + length) % max);
      } else {
        gl.drawArrays(GL.POINTS, offset, length);
      }
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "createVertexAttributeGroup", {
    value: function(name, structure, length, usage) {
      var attr = new VertexAttributeGroup(name, structure);
      if (length)
        attr.allocate(length, usage);
      return this.attachVertexAttributeGroup(attr);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "createVertexAttribute", {
    value: function(name, structure, length, usage) {
      var attr = new VertexAttribute(name, structure);
      if (length)
        attr.allocate(length, usage);
      return this.attachVertexAttribute(attr);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "attachVertexAttribute", {
    value: function(attribute, location) {
      var $__8;
      var vao = this.bindings;
      if (location === undefined)
        location = new AttributeLocation(vao.getNextFreeSlot());
      var size = attribute.size;
      var buffer = attribute.buffer;
      location.setSize(size);
      vao.addVertexBinding(location, buffer);
      Properties(this, ($__8 = {}, Object.defineProperty($__8, name, {
        value: attribute,
        configurable: true,
        enumerable: true,
        writable: true
      }), $__8), C);
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, "attachVertexAttributeGroup", {
    value: function(attributeGroup) {
      var vao = this.bindings;
      var name = attributeGroup.name;
      var structure = attributeGroup.data.structure;
      var stride = attributeGroup.data.stride;
      var buffer = attributeGroup.buffer;
      for (var property in structure) {
        var member = structure[property];
        var location = member.location ? member.location : new AttributeLocation(vao.getNextFreeSlot());
        var offset = member.offset;
        var defaultValue = member.type;
        var size = defaultValue.length;
        location.setSize(size).setStride(stride).setOffset(offset).setFloatVector(defaultValue, size);
        vao.addVertexBinding(location, buffer);
      }
      ;
      this[name] = attributeGroup;
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__8));
  Getters(Geometry.prototype, {getLength: function() {
      var max = 0;
      for (var attr in this) {
        var data = this[attr].data;
        if (data !== undefined) {
          var length = data.length || data.maxLength;
          if (length > max)
            max = length;
        }
      }
      Property(this, "getLength", max, C);
      return max;
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/utilities/ULMesh", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMesh";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var GL = System.get("../src/webgl/GLContext.js").GL;
  var $__2 = System.get("../src/math/MLVector.js"),
      vec2 = $__2.vec2,
      vec3 = $__2.vec3,
      vec4 = $__2.vec4;
  var $__3 = System.get("../src/math/MLMatrix.js"),
      mat2 = $__3.mat2,
      mat3 = $__3.mat3,
      mat4 = $__3.mat4;
  var ElementAttribute = System.get("../src/utilities/ULGeometryAttributes.js").ElementAttribute;
  var Geometry = System.get("../src/utilities/ULGeometry.js").default;
  var Material = System.get("../src/utilities/ULMaterial.js").default;
  var Halfedge = function Halfedge(vertex, face) {
    Properties(this, {
      vertex: vertex,
      face: face
    }, C);
  };
  ($traceurRuntime.createClass)(Halfedge, {}, {});
  var EdgeList = function EdgeList() {
    var halfedges = arguments[0] !== (void 0) ? arguments[0] : [];
    var opposites = arguments[1] !== (void 0) ? arguments[1] : [];
    Properties(this, {
      halfedges: halfedges,
      opposites: opposites
    }, C);
  };
  ($traceurRuntime.createClass)(EdgeList, {}, {});
  Properties(EdgeList.prototype, {
    add: function(halfedge, opposite) {
      halfedges.push(halfedge);
      opposites.push(opposite);
      return this;
    },
    forEach: function(callback) {
      for (var i = 0; i < current.length; i += 2)
        callback(halfedges[i], opposites[i]);
      return this;
    }
  });
  var Graph = function Graph(attribute) {
    var vertices = arguments[1] !== (void 0) ? arguments[1] : [];
    var faces = arguments[2] !== (void 0) ? arguments[2] : [];
    var edges = arguments[3] !== (void 0) ? arguments[3] : new EdgeList;
    Properties(this, {
      attribute: attribute,
      vertices: vertices,
      faces: faces,
      edges: edges
    }, C);
  };
  var $Graph = Graph;
  ($traceurRuntime.createClass)(Graph, {}, {Cube: function() {
      var graph = new $Graph(new ElementAttribute(new Geometry.Cube()));
      var mesh = new Mesh().setElement("graph", graph);
      return mesh;
    }});
  Properties(Graph.prototype, {draw: function(offset, count) {
      this.attribute.draw(offset, count);
      return this;
    }});
  var Mesh = function Mesh() {
    var transform = arguments[0] !== (void 0) ? arguments[0] : new mat4;
    var scale = arguments[1] !== (void 0) ? arguments[1] : new vec3;
    Properties(this, {
      transform: transform,
      scale: scale
    }, C);
  };
  var $Mesh = Mesh;
  ($traceurRuntime.createClass)(Mesh, {}, {
    Cube: function() {
      var x1 = arguments[0] !== (void 0) ? arguments[0] : 1;
      var x2 = arguments[1] !== (void 0) ? arguments[1] : -1;
      var y1 = arguments[2] !== (void 0) ? arguments[2] : x1;
      var y2 = arguments[3] !== (void 0) ? arguments[3] : x2;
      var z1 = arguments[4] !== (void 0) ? arguments[4] : x1;
      var z2 = arguments[5] !== (void 0) ? arguments[5] : x2;
      var geometry = Geometry.Cube(x1, x2, y1, y2, z1, z2);
      var vertex = new VertexPtr(geometry);
      var $__8 = $Mesh.Cube.options,
          triangles = $__8.triangles,
          lines = $__8.lines,
          points = $__8.points,
          name = $__8.name;
      var v = [vertex.pointTo(0), vertex.pointTo(1), vertex.pointTo(2), vertex.pointTo(3), vertex.pointTo(4), vertex.pointTo(5), vertex.pointTo(6), vertex.pointTo(7)];
      var f = [new Face(v[2], v[0], v[3]), new Face(v[3], v[0], v[1]), new Face(v[5], v[3], v[7]), new Face(v[7], v[3], v[1]), new Face(v[6], v[7], v[0]), new Face(v[0], v[7], v[1]), new Face(v[4], v[6], v[2]), new Face(v[2], v[6], v[0]), new Face(v[4], v[5], v[6]), new Face(v[6], v[5], v[7]), new Face(v[4], v[2], v[5]), new Face(v[5], v[2], v[3])];
      v[0].hEdge = f[4].hEdgeA;
      v[1].hEdge = f[1].hEdgeA;
      v[2].hEdge = f[6].hEdgeA;
      v[3].hEdge = f[0].hEdgeA;
      v[4].hEdge = f[6].hEdgeB;
      v[5].hEdge = f[10].hEdgeA;
      v[6].hEdge = f[8].hEdgeA;
      v[7].hEdge = f[2].hEdgeA;
      f[0].setEdges(f[11].hEdgeC, f[7].hEdgeA, f[1].hEdgeB);
      f[1].setEdges(f[3].hEdgeC, f[0].hEdgeC, f[5].hEdgeA);
      f[2].setEdges(f[9].hEdgeC, f[11].hEdgeA, f[3].hEdgeB);
      f[3].setEdges(f[5].hEdgeC, f[2].hEdgeC, f[1].hEdgeA);
      f[4].setEdges(f[7].hEdgeC, f[9].hEdgeA, f[5].hEdgeB);
      f[5].setEdges(f[1].hEdgeC, f[4].hEdgeC, f[3].hEdgeA);
      f[6].setEdges(f[10].hEdgeB, f[8].hEdgeA, f[7].hEdgeB);
      f[7].setEdges(f[0].hEdgeB, f[6].hEdgeC, f[4].hEdgeA);
      f[8].setEdges(f[6].hEdgeB, f[10].hEdgeA, f[9].hEdgeB);
      f[9].setEdges(f[4].hEdgeB, f[8].hEdgeC, f[2].hEdgeA);
      f[10].setEdges(f[8].hEdgeB, f[6].hEdgeA, f[11].hEdgeB);
      f[11].setEdges(f[2].hEdgeB, f[10].hEdgeC, f[0].hEdgeA);
      var mesh = new $Mesh(geometry, f, v);
      if (triangles)
        mesh.createElement("triangles", new Uint8Array([2, 0, 3, 3, 0, 1, 5, 3, 7, 7, 3, 1, 6, 7, 0, 0, 7, 1, 4, 6, 2, 2, 6, 0, 4, 5, 6, 6, 5, 7, 4, 2, 5, 5, 2, 3]), GL.TRIANGLES, GL.DYNAMIC_DRAW);
      if (lines)
        mesh.createElement("lines", new Uint8Array([0, 1, 2, 3, 2, 0, 3, 1, 0, 6, 1, 7, 2, 4, 3, 5, 4, 5, 6, 7, 4, 6, 5, 7]), GL.LINES, GL.DYNAMIC_DRAW);
      if (points)
        mesh.createElement("points", new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]), GL.POINTS, GL.DYNAMIC_DRAW);
      return mesh;
    },
    Sphere: function() {
      var longitude = arguments[0] !== (void 0) ? arguments[0] : 10;
      var latitude = arguments[1] !== (void 0) ? arguments[1] : 10;
      var geometry = new Geometry.Sphere(longitude, latitude);
      latitude -= 1;
      var $__8 = $Mesh.Sphere.options,
          triangles = $__8.triangles,
          lines = $__8.lines,
          points = $__8.points,
          name = $__8.name;
      var mesh = new $Mesh;
      if (triangles) {
        var length = 6 * (latitude - 1) * longitude;
        var data = allocateUint(length);
        var i = 0;
        var nextRow = longitude + 1;
        for (var lon = 0; lon < longitude; lon++) {
          var thisCol = lon;
          var nextCol = lon + 1;
          var center = lon + 1 - (lon % 2);
          data[i++] = nextRow + thisCol;
          data[i++] = center;
          data[i++] = nextRow + nextCol;
        }
        for (var lat = 1; lat < (latitude - 1); lat++) {
          var thisRow$__9 = lat * (longitude + 1);
          var nextRow$__10 = (lat + 1) * (longitude + 1);
          for (var lon$__11 = 0; lon$__11 < longitude; lon$__11++) {
            var thisCol$__12 = lon$__11;
            var nextCol$__13 = lon$__11 + 1;
            data[i++] = thisRow$__9 + thisCol$__12;
            data[i++] = thisRow$__9 + nextCol$__13;
            data[i++] = nextRow$__10 + thisCol$__12;
            data[i++] = nextRow$__10 + thisCol$__12;
            data[i++] = thisRow$__9 + nextCol$__13;
            data[i++] = nextRow$__10 + nextCol$__13;
          }
        }
        var thisRow = lat * (longitude + 1);
        for (var lon$__14 = 0; lon$__14 < longitude; lon$__14++) {
          var thisCol$__15 = lon$__14;
          var nextCol$__16 = lon$__14 + 1;
          var center$__17 = lon$__14 + (lon$__14 % 2);
          data[i++] = thisRow + thisCol$__15;
          data[i++] = thisRow + nextCol$__16;
          data[i++] = center$__17;
        }
        mesh.setElement("triangles", new ElementAttribute(geometry).allocateBuffer(data));
      }
      return mesh;
    },
    Grid: function() {
      var xDivisions = arguments[0] !== (void 0) ? arguments[0] : 10;
      var yDivisions = arguments[1] !== (void 0) ? arguments[1] : 10;
      var heightFn = arguments[2];
      var geometry = new Geometry.Grid(xDivisions, yDivisions, heightFn);
      xDivisions += 2;
      yDivisions += 2;
      var $__8 = $Mesh.Grid.options,
          triangles = $__8.triangles,
          lines = $__8.lines,
          points = $__8.points,
          name = $__8.name;
      var mesh = new $Mesh(geometry);
      if (triangles) {
        var length = 6 * (xDivisions) * (yDivisions);
        var data = length < (1 << 8) ? new Uint8Array(length) : length < (1 << 16) ? new Uint16Array(length) : new Uint32Array(length);
        var i = 0;
        for (var x = 0; x < xDivisions - 1; x++) {
          var thisRow = x * yDivisions;
          var nextRow = (x + 1) * yDivisions;
          for (var y = 0; y < yDivisions - 1; y++) {
            var yWrap = (y % (yDivisions - 1)) + 1;
            data[i++] = thisRow + y;
            data[i++] = nextRow + y;
            data[i++] = thisRow + yWrap;
            data[i++] = thisRow + yWrap;
            data[i++] = nextRow + y;
            data[i++] = nextRow + yWrap;
          }
        }
        mesh.createElement("triangles", data, GL.TRIANGLES, GL.DYNAMIC_DRAW);
      }
      return mesh;
    }
  });
  var $__default = Mesh;
  Properties(Mesh.prototype, {
    setElement: function(key, element) {
      Property(this, key, element, E | C);
      return this;
    },
    draw: function(offset, count) {
      for (var element in this) {
        this[element].draw(offset, count);
      }
    }
  });
  Properties(Mesh.Cube, {options: {
      name: "cube",
      triangles: true,
      lines: true,
      points: false
    }});
  Properties(Mesh.Sphere, {options: {
      name: "sphere",
      triangles: true,
      lines: false,
      points: false
    }});
  Properties(Mesh.Grid, {options: {
      name: "grid",
      triangles: true,
      lines: false,
      points: false
    }});
  function allocateUint(length) {
    return (length < (1 << 8) ? new Uint8Array(length) : length < (1 << 16) ? new Uint16Array(length) : new Uint32Array(length));
  }
  return {
    get Halfedge() {
      return Halfedge;
    },
    get EdgeList() {
      return EdgeList;
    },
    get Graph() {
      return Graph;
    },
    get default() {
      return $__default;
    }
  };
});
System.registerModule("../src/utilities/ULPropertyDescriptors", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULPropertyDescriptors";
  var E = 1;
  var C = 2;
  var W = 4;
  var DESCRIPTOR = {};
  function Properties(target, values, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    DESCRIPTOR.writable = (descriptorMask & W) ? true : false;
    for (var p in values) {
      DESCRIPTOR.value = values[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.value;
  }
  function Property(target, key, value, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    DESCRIPTOR.writable = (descriptorMask & W) ? true : false;
    DESCRIPTOR.value = value;
    Object.defineProperty(target, key, DESCRIPTOR);
    delete DESCRIPTOR.value;
  }
  function Getters(target, getters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in getters) {
      DESCRIPTOR.get = getters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.get;
  }
  function Setters(target, setters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in setters) {
      DESCRIPTOR.set = getters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.set;
  }
  function GetterSetters(target, getters, setters, descriptorMask) {
    DESCRIPTOR.enumerable = (descriptorMask & E) ? true : false;
    DESCRIPTOR.configurable = (descriptorMask & C) ? true : false;
    delete DESCRIPTOR.writable;
    for (var p in setters) {
      DESCRIPTOR.get = getters[p];
      DESCRIPTOR.set = setters[p];
      Object.defineProperty(target, p, DESCRIPTOR);
    }
    delete DESCRIPTOR.get;
    delete DESCRIPTOR.set;
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
    get Property() {
      return Property;
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
System.registerModule("../src/utilities/ULResource", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULResource";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
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
              var t = {};
              SCENE[line[0].match(/\w*/)[0]] = t;
              target = t;
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
    htmlTexture: function(element) {
      element.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      var STATIC = $Resource.htmlTexture;
      var serializer = STATIC.serializer ? STATIC.serializer : STATIC.serializer = new XMLSerializer;
      var img = new Image;
      var resource = new $Resource(img);
      var width = 200;
      var height = 100;
      var htmlString = serializer.serializeToString(element);
      var uri = ("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\">\n\t\t\t\t<foreignObject width=\"100%\" height=\"100%\" x=\"20\" y=\"50\">\n\t\t\t\t\t" + htmlString + "\n\t\t\t\t</foreignObject>\n\t\t\t</svg>\n\t\t");
      img.onload = resource.process.bind(resource);
      img.src = uri;
      return resource;
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
          Array.isArray(this.source) ? [].unshift.apply(arguments, this.source) : [].unshift.call(arguments, this.source);
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
System.registerModule("../src/utilities/ULUniforms", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "../src/utilities/ULUniforms";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var $__2 = System.get("../src/math/MLVector.js"),
      vec2 = $__2.vec2,
      vec3 = $__2.vec3,
      vec4 = $__2.vec4;
  var $__3 = System.get("../src/math/MLMatrix.js"),
      mat2 = $__3.mat2,
      mat3 = $__3.mat3,
      mat4 = $__3.mat4;
  System.get("../src/webgl/GLUniformLocation.js");
  var Uniform = function Uniform() {};
  ($traceurRuntime.createClass)(Uniform, {}, {create: function(info, location) {
      var uniform = new (TYPES.get(info.type));
      Property(uniform, "location", location, E);
      return uniform;
    }});
  Properties(Uniform.prototype, {instantiate: function() {
      var o = Object.create(this);
      Property(o, "value", this.value, E | C | W);
      return o;
    }});
  var UniformVector = function UniformVector() {};
  ($traceurRuntime.createClass)(UniformVector, {}, {});
  Properties(UniformVector.prototype, {instantiate: function() {
      var o = Object.create(this);
      Property(o, "value", this.value.clone(), E | C);
      return o;
    }});
  var UniformFloat = function UniformFloat() {
    $traceurRuntime.superConstructor($UniformFloat).call(this);
    Property(this, "value", 0.0, E | W);
  };
  var $UniformFloat = UniformFloat;
  ($traceurRuntime.createClass)(UniformFloat, {}, {}, Uniform);
  Properties(UniformFloat.prototype, {
    set: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    },
    copy: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    }
  });
  var UniformFloatVec2 = function UniformFloatVec2() {
    $traceurRuntime.superConstructor($UniformFloatVec2).call(this);
    Property(this, "value", new vec2, E);
  };
  var $UniformFloatVec2 = UniformFloatVec2;
  ($traceurRuntime.createClass)(UniformFloatVec2, {}, {}, UniformVector);
  Properties(UniformFloatVec2.prototype, {
    set: function(x, y) {
      if (x !== undefined)
        this.value.set(x, y);
      this.location.set2f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set2f(this.value);
      return this;
    }
  });
  var UniformFloatVec3 = function UniformFloatVec3() {
    $traceurRuntime.superConstructor($UniformFloatVec3).call(this);
    Property(this, "value", new vec3, E);
  };
  var $UniformFloatVec3 = UniformFloatVec3;
  ($traceurRuntime.createClass)(UniformFloatVec3, {}, {}, UniformVector);
  Properties(UniformFloatVec3.prototype, {
    set: function(x, y, z) {
      if (x !== undefined)
        this.value.set(x, y, z);
      this.location.set3f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set3f(this.value);
      return this;
    }
  });
  var UniformFloatVec4 = function UniformFloatVec4() {
    $traceurRuntime.superConstructor($UniformFloatVec4).call(this);
    Property(this, "value", new vec4, E);
  };
  var $UniformFloatVec4 = UniformFloatVec4;
  ($traceurRuntime.createClass)(UniformFloatVec4, {}, {}, UniformVector);
  Properties(UniformFloatVec4.prototype, {
    set: function(x, y, z, w) {
      if (x !== undefined)
        this.value.set(x, y, z, w);
      this.location.set4f(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set4f(this.value);
      return this;
    }
  });
  var UniformFloatMat2 = function UniformFloatMat2() {
    $traceurRuntime.superConstructor($UniformFloatMat2).call(this);
    Property(this, "value", new mat2, E);
  };
  var $UniformFloatMat2 = UniformFloatMat2;
  ($traceurRuntime.createClass)(UniformFloatMat2, {}, {}, UniformVector);
  Properties(UniformFloatMat2.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat2(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat2(this.value.data);
      return this;
    }
  });
  var UniformFloatMat3 = function UniformFloatMat3() {
    $traceurRuntime.superConstructor($UniformFloatMat3).call(this);
    Property(this, "value", new mat3, E);
  };
  var $UniformFloatMat3 = UniformFloatMat3;
  ($traceurRuntime.createClass)(UniformFloatMat3, {}, {}, UniformVector);
  Properties(UniformFloatMat3.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat3(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat3(this.value.data);
      return this;
    }
  });
  var UniformFloatMat4 = function UniformFloatMat4() {
    $traceurRuntime.superConstructor($UniformFloatMat4).call(this);
    Property(this, "value", new mat4, E);
  };
  var $UniformFloatMat4 = UniformFloatMat4;
  ($traceurRuntime.createClass)(UniformFloatMat4, {}, {}, UniformVector);
  Properties(UniformFloatMat4.prototype, {
    set: function() {
      if (arguments.length)
        this.value.copy(arguments);
      this.location.setMat4(this.value.data);
      return this;
    },
    copy: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat4(this.value.data);
      return this;
    }
  });
  createDelegates(UniformFloatMat4, mat4);
  var UniformInt = function UniformInt() {
    $traceurRuntime.superConstructor($UniformInt).call(this);
    Property(this, "value", 0, E | W);
  };
  var $UniformInt = UniformInt;
  ($traceurRuntime.createClass)(UniformInt, {}, {}, Uniform);
  Properties(UniformInt.prototype, {
    set: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    },
    copy: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    }
  });
  var UniformIntVec2 = function UniformIntVec2() {
    $traceurRuntime.superConstructor($UniformIntVec2).call(this);
    Property(this, "value", new vec2, E);
  };
  var $UniformIntVec2 = UniformIntVec2;
  ($traceurRuntime.createClass)(UniformIntVec2, {}, {}, UniformVector);
  Properties(UniformIntVec2.prototype, {
    set: function(x, y) {
      if (x !== undefined)
        this.value.set(x, y);
      this.location.set2i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set2i(this.value);
      return this;
    }
  });
  var UniformIntVec3 = function UniformIntVec3() {
    $traceurRuntime.superConstructor($UniformIntVec3).call(this);
    Property(this, "value", new vec3, E);
  };
  var $UniformIntVec3 = UniformIntVec3;
  ($traceurRuntime.createClass)(UniformIntVec3, {}, {}, UniformVector);
  Properties(UniformIntVec3.prototype, {
    set: function(x, y, z) {
      if (x !== undefined)
        this.value.set(x, y, z);
      this.location.set3i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set3i(this.value);
      return this;
    }
  });
  var UniformIntVec4 = function UniformIntVec4() {
    $traceurRuntime.superConstructor($UniformIntVec4).call(this);
    Property(this, "value", new vec4, E);
  };
  var $UniformIntVec4 = UniformIntVec4;
  ($traceurRuntime.createClass)(UniformIntVec4, {}, {}, UniformVector);
  Properties(UniformIntVec4.prototype, {
    set: function(x, y, z, w) {
      if (x !== undefined)
        this.value.set(x, y, z, w);
      this.location.set4i(this.value);
      return this;
    },
    copy: function(vA) {
      if (vA !== undefined)
        this.value.copy(vA);
      this.location.set4i(this.value);
      return this;
    }
  });
  var UniformTexture2D = function UniformTexture2D() {
    $traceurRuntime.superConstructor($UniformTexture2D).apply(this, arguments);
  };
  var $UniformTexture2D = UniformTexture2D;
  ($traceurRuntime.createClass)(UniformTexture2D, {}, {}, UniformInt);
  var UniformTextureCubeMap = function UniformTextureCubeMap() {
    $traceurRuntime.superConstructor($UniformTextureCubeMap).apply(this, arguments);
  };
  var $UniformTextureCubeMap = UniformTextureCubeMap;
  ($traceurRuntime.createClass)(UniformTextureCubeMap, {}, {}, Uniform);
  var TYPES = new Map([[GL.FLOAT, UniformFloat], [GL.FLOAT_VEC2, UniformFloatVec2], [GL.FLOAT_VEC3, UniformFloatVec3], [GL.FLOAT_VEC4, UniformFloatVec4], [GL.FLOAT_MAT2, UniformFloatMat2], [GL.FLOAT_MAT3, UniformFloatMat3], [GL.FLOAT_MAT4, UniformFloatMat4], [GL.INT, UniformInt], [GL.INT_VEC2, UniformIntVec2], [GL.INT_VEC3, UniformIntVec3], [GL.INT_VEC4, UniformIntVec4], [GL.SAMPLER_2D, UniformTexture2D], [GL.SAMPLER_CUBE, UniformTextureCubeMap]]);
  var UniformStruct = function UniformStruct() {
    $traceurRuntime.superConstructor($UniformStruct).apply(this, arguments);
  };
  var $UniformStruct = UniformStruct;
  ($traceurRuntime.createClass)(UniformStruct, ($__5 = {}, Object.defineProperty($__5, Symbol.iterator, {
    value: $traceurRuntime.initGeneratorFunction(function $__8() {
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
      }, $__8, this);
    }),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__5), {}, Uniform);
  Properties(UniformStruct.prototype, {
    set: function() {
      for (var property in this) {
        if (arguments.length)
          this[property].copy(object[property]);
        else
          this[property].set();
      }
      return this;
    },
    copy: function(object) {
      for (var property in this) {
        if (object && property in object)
          this[property].copy(object[property]);
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
  function createDelegates(uniform, delegate) {
    for (var $__6 = Object.getOwnPropertyNames(delegate.prototype)[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__7 = void 0; !($__7 = $__6.next()).done; ) {
      var method = $__7.value;
      if (uniform.prototype[method] === undefined)
        Property(uniform.prototype, method, new Function(("\n\t\tthis.value." + method + ".apply( this.value, arguments );\n\t\tthis.set();\n\t\treturn this;\n\t")), C);
    }
  }
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
System.registerModule("../src/webgl/GLAttributeLocation", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLAttributeLocation";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
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
    setSize: function(size) {
      Property(this, "size", size, E | C);
      return this;
    },
    setStride: function(stride) {
      Property(this, "stride", stride, E | C);
      return this;
    },
    setOffset: function(offset) {
      Property(this, "offset", offset, E | C);
      return this;
    },
    setType: function(type) {
      Property(this, "type", type, E | C);
      return this;
    },
    setNormalized: function(normalized) {
      Property(this, "normalized", normalized, E | C);
      return this;
    },
    setPointer: function() {
      var offset = arguments[0] !== (void 0) ? arguments[0] : 0;
      var stride = arguments[1] !== (void 0) ? arguments[1] : 0;
      var size = arguments[2] !== (void 0) ? arguments[2] : 4;
      var type = arguments[3] !== (void 0) ? arguments[3] : GL.FLOAT;
      var normalized = arguments[4] !== (void 0) ? arguments[4] : false;
      Properties(this, {
        size: size,
        offset: offset,
        stride: stride,
        type: type,
        normalized: normalized
      }, E | C);
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
  Getters(AttributeLocation.prototype, {
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
    getOffset: function() {
      return gl.getVertexAttribOffset(this.index, gl.VERTEX_ATTRIB_ARRAY_POINTER);
    },
    getTypeFlag: function() {
      return gl.flags[this.getType];
    }
  });
  Properties(AttributeLocation.prototype, {
    size: 4,
    offset: 0,
    stride: 0,
    type: GL.FLOAT,
    normalized: false
  }, E);
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLContext", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLContext";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
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
  var viewport = new (function() {
    var Viewport = function Viewport() {};
    return ($traceurRuntime.createClass)(Viewport, {
      setDimensions: function() {
        var x = arguments[0] !== (void 0) ? arguments[0] : 0;
        var y = arguments[1] !== (void 0) ? arguments[1] : 0;
        var width = arguments[2] !== (void 0) ? arguments[2] : canvas.clientWidth;
        var height = arguments[3] !== (void 0) ? arguments[3] : canvas.clientHeight;
        gl.viewport(x, y, width, height);
        return this;
      },
      get getDimensions() {
        return gl.getParameter(GL.VIEWPORT);
      }
    }, {});
  }());
  Properties(WebGLRenderingContext.prototype, {
    options: {
      alpha: true,
      depth: true,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    setOptions: function(options) {
      this.options = options || this.options;
      gl = canvas.getContext("webgl", this.options) || canvas.getContext("experimental-webgl", this.options);
      return this;
    },
    setQuality: function(v) {
      isNaN(v) ? v = 2 : v = v || 2;
      this.quality = v;
      canvas.width = canvas.clientWidth / v;
      canvas.height = canvas.clientHeight / v;
      return this;
    }
  });
  Getters(WebGLRenderingContext.prototype, {
    getShadingLanguageVersion: function() {
      return gl.getParameter(GL.SHADING_LANGUAGE_VERSION);
    },
    getVersion: function() {
      return gl.getParameter(GL.VERSION);
    },
    getVendor: function() {
      return gl.getParameter(GL.VENDOR);
    },
    getRenderer: function() {
      return gl.getParameter(GL.RENDERER);
    }
  });
  Property(GL, "flags", []);
  for (var property in WebGLRenderingContext)
    if (typeof WebGLRenderingContext[property] === "number")
      Property(GL.flags, GL[property], property, E | C);
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
    get viewport() {
      return viewport;
    }
  };
});
System.registerModule("../src/webgl/GLDraw", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLDraw";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var Draw = function Draw() {};
  ($traceurRuntime.createClass)(Draw, {
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
    }
  }, {
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
    arrays: function(mode, count) {
      var offset = arguments[2] !== (void 0) ? arguments[2] : 0;
      gl.drawArrays(mode, offset, count);
      return this;
    },
    elements: function(mode, type, count) {
      var offset = arguments[3] !== (void 0) ? arguments[3] : 0;
      gl.drawElements(mode, count, type, offset);
      return this;
    }
  });
  var $__default = Draw;
  ;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLProgram", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLProgram";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation.js").default;
  var Shader = System.get("../src/webgl/GLShader.js").default;
  var $__4 = System.get("../src/utilities/ULUniforms.js"),
      Uniform = $__4.Uniform,
      UniformArray = $__4.UniformArray,
      UniformStruct = $__4.UniformStruct;
  var Resource = System.get("../src/utilities/ULResource.js").default;
  var Program = function Program() {
    return gl.createProgram();
  };
  ($traceurRuntime.createClass)(Program, {}, {
    VertexColors: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 texCoord;\n\t\t\tattribute vec4 color;\n\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec3 modelScale;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );\n\t\t\t\tvec4 viewVertex = viewMatrix * worldVertex;\n\t\t\t\tvec4 pos = projectionMatrix * viewVertex ;\n\t\t\t\tgl_Position = pos;\n\t\t\t\tgl_PointSize = -pos.z  + 6.;\n\t\t\t\tv_color = color;\n\t\t\t\tv_texCoord = texCoord;\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tuniform float time;\n\t\t\tuniform sampler2D tex0;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 t = texture2D( tex0, v_texCoord );\n\t\t\t\t\n\t\t\t\tgl_FragColor = v_color;\n\t\t\t}\n\t\t")).link().use();
    },
    Phong: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\t#ifdef GL_ES\n\t\t\t\tprecision mediump float;\n\t\t\t\tprecision mediump int;\n\t\t\t#endif\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec3 color;\n\t\t\tattribute vec3 normal;\n\t\t\tattribute vec2 texCoord;\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec3 modelScale;\n\n\t\t\tvarying vec3 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\t\t\tvarying vec4 v_worldVertex;\n\t\t\tvarying vec3 v_viewVector;\n\t\t\tvarying vec3 v_normal;\n\t\t\tvarying mat3 v_modelMatrix;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tv_worldVertex = modelMatrix * vec4( position * modelScale, 1. );\n\t\t\t\t\n\t\t\t\tvec4 viewVertex = viewMatrix * v_worldVertex;\n\t\t\t\tgl_Position = projectionMatrix * viewVertex ;\n\t\t\t\tgl_PointSize = ( -gl_Position.z + 2. ) * 2. + 8.;\n\t\t\t\t\n\t\t\t\tv_modelMatrix = mat3( modelMatrix );\t\n\t\t\t\tv_color = color;\n\t\t\t\tv_texCoord = texCoord;\n\t\t\t\tv_normal = normalize(  mat3( modelMatrix ) * normal );\n\t\t\t\tv_viewVector = normalize( -viewVertex.xyz );\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\t#ifdef GL_ES\n\t\t\t\tprecision mediump float;\n\t\t\t\tprecision mediump int;\n\t\t\t#endif\n\n\t\t\tvarying vec3 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\t\t\tvarying vec4 v_worldVertex;\n\t\t\tvarying vec3 v_viewVector;\n\t\t\tvarying vec3 v_normal;\n\t\t\tvarying mat3 v_modelMatrix;\n\n\t\t\t#define MAX_LIGHTS 4\n\n\t\t\tstruct Scene {\n\t\t\t\tint frame;\n\t\t\t\tint usedLights;\n\t\t\t\tfloat deltaTime;\n\t\t\t};\n\t\t\tuniform Scene scene;\n\n\t\t\tstruct Light {\n\t\t\t\tvec3 position;\n\t\t\t\tvec3 attenuation;\n\t\t\t\tvec3 direction;\n\t\t\t\tvec3 color;\n\t\t\t\tfloat outerCutoff;\n\t\t\t\tfloat innerCutoff;\n\t\t\t\tfloat exponent;\n\t\t\t};\n\t\t\tuniform Light light[ MAX_LIGHTS ];\n\n\t\t\tstruct Material {\n\t\t\t\tvec3 ambient;\n\t\t\t\tvec4 diffuse;\n\t\t\t\tvec3 specular;\n\t\t\t\tfloat shininess;\n\t\t\t};\n\t\t\tuniform Material material;\n\n\t\t\tuniform sampler2D tex0;\n\t\t\tuniform sampler2D normalMap;\n\t\t\t/*builtin variables\n\t\t\t\tvec4 gl_FragCoord\n\t\t\t\tvec2 gl_PointCoord\n\t\t\t\tbool gl_FrontFacing\n\t\t\t\tvec4 gl_FragColor\n\t\t\t\tvec4 gl_FragData[ gl_MaxDrawBuffers ]\n\t\t\t*/\n\t\t\tvoid main ( void ) {\n\t\t\t\tMaterial M = material;\n\t\t\t\tvec3 normal = normalize( v_normal );\n\t\t\t/*\n\t\t\t\tvec3 normal = normalize( v_viewVector *  texture2D( normalMap, v_texCoord ).rgb );\n\t\t\t\tvec3 specular = texture2D( tex0, v_texCoord ).rgb;\n\t\t\t\tfloat shininess = /*texture2D( tex0, v_texCoord ).a;\n\t\t\t\tvec4 diffuse = vec4(texture2D( tex0, v_texCoord ).rgb, 1. );\n\t\t\t\t*/\n\t\t\t\t\n\t\t\t\tvec3 specular = M.specular;\n\t\t\t\tfloat shininess = M.shininess;\n\t\t\t\tvec4 diffuse = M.diffuse;\n\t\t\t\t/*\n\t\t\t\tM.specular = vec3( 0. );\n\t\t\t\tM.shininess = 50.;\n\t\t\t\tM.ambient = vec3( .2 );\n\t\t\t\tM.diffuse = vec4( .8 );\n\t\t\t\t*/\n\t\t\t\tvec3 color = M.ambient;\n\t\t\t\tfor ( int i = 0; i < MAX_LIGHTS; ++i ) {\n\t\t\t\t\tLight L = light[ i ];\n\t\t\t\t\t\n\t\t\t\t\tL.position.z = 1.;\n\t\t\t\t\tL.attenuation = vec3( 2., .0, .001 );\n\t\t\t\t\tL.direction = vec3( 0. );\n\t\t\t\t\tL.color = vec3( 1.,1.,1. );\n\t\t\t\t\tL.outerCutoff = 1.8;\n\t\t\t\t\tL.innerCutoff = .1;\n\t\t\t\t\tL.exponent = 2.;\n\t\t\t\t\t\n\t\t\t\t\tif ( i >= scene.usedLights ) break;\n\t\t\t\t\tvec3 lightVec = normalize( L.position - v_worldVertex.xyz );\n\t\t\t\t\tfloat l = dot( normal, lightVec );\n\t\t\t\t\tif ( l > 0.0 ) {\n\t\t\t\t\t\tfloat spotlight = 1.0;\n\t\t\t\t\t\t\n\t\t\t\t\t\tif ( ( L.direction.x != 0.0 ) || ( L.direction.y != 0.0 ) || ( L.direction.z != 0.0 ) ) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tspotlight = max( -dot( lightVec, L.direction ), 0.0 );\n\t\t\t\t\t\t\tfloat spotlightFade = clamp( ( L.outerCutoff - spotlight ) / ( L.outerCutoff - L.innerCutoff ), 0.0, 1.0 );\n\t\t\t\t\t\t\tspotlight = pow( spotlight * spotlightFade, L.exponent );\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tvec3 r = -normalize( reflect( lightVec, normal ) );\n\t\t\t\t\t\tfloat s = pow( max( dot( r, v_viewVector ), 0. ), M.shininess );\n\n\t\t\t\t\t\tfloat d = distance( v_worldVertex.xyz, light[ i ].position );\n\t\t\t\t\t\tfloat a = 1.0 / ( L.attenuation[ 0 ] + ( L.attenuation[ 1 ] * d ) + ( L.attenuation[ 2 ] * d * d ) );\n\t\t\t\t\t\tcolor += (\n\t\t\t\t\t\t\t( M.diffuse.xyz * l ) + ( specular * s )\n\t\t\t\t\t\t) * L.color * a * spotlight;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tvec4 texture0 = texture2D( tex0, v_texCoord * 4. );\n\t\t\t\tvec2 center = ( gl_PointCoord.xy - .5 ) * 2.;\n\t\t\t\tfloat s = ( 1. - dot( center, center ) ) * sqrt( 2. );\n\t\t\t\t\n\t\t\t\tgl_FragColor = clamp( vec4( color * v_color , material.diffuse.w ), 0.0, 1.0 );// * texture0;\n\t\t\t}\n\t\t")).link().use();
    },
    DynamicSource: function(url, refreshInterval) {
      var fsLoaded = false;
      var vsLoaded = false;
      var vs = Shader.Vertex();
      var fs = Shader.Fragment();
      var program = gl.createProgram().attachShader(fs).attachShader(vs);
      var vsSource = new Resource.http(url + ".vert", {interval: refreshInterval});
      var fsSource = new Resource.http(url + ".frag", {interval: refreshInterval});
      var fsCompile = new Resource(function(fsCode) {
        fsLoaded = true;
        fs.setShaderSource(fsCode);
        if (vsLoaded)
          return program;
      });
      var vsCompile = new Resource(function(vsCode) {
        vsLoaded = true;
        vs.setShaderSource(vsCode);
        if (fsLoaded)
          return program;
      });
      var programLink = new Resource(function(program) {
        return program.link().use();
      });
      vsSource.setTarget(vsCompile);
      fsSource.setTarget(fsCompile);
      vsCompile.setTarget(programLink);
      fsCompile.setTarget(programLink);
      return programLink;
    }
  });
  var $__default = Program;
  Properties(WebGLProgram.prototype, {
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
      var s = this.getAttachedShaders;
      if (s.length === 2 && s[0].getCompileStatus && s[1].getCompileStatus) {
        gl.linkProgram(this);
        if (!this.getLinkStatus)
          console.error(this.getInfoLog);
        else {
          this.clearCache();
        }
      }
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
        console.error(this.getInfoLog);
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
  });
  Getters(WebGLProgram.prototype, {
    getUniforms: function() {
      return new UniformMap(this);
    },
    getAttributes: function() {
      return new AttributeMap(this);
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
  });
  Properties(Program, {DEFAULT: new Program.Phong}, E | C);
  var UniformMap = function UniformMap(program) {
    if (!program)
      return ;
    else
      this.setFromProgram(program, "getUniforms");
  };
  ($traceurRuntime.createClass)(UniformMap, {}, {});
  Properties(UniformMap.prototype, {
    clone: function() {
      var map = new UniformMap;
      Properties(map, this, W | E);
      return map;
    },
    setFromProgram: function(program, cacheAccessor) {
      if (cacheAccessor)
        Property(program, cacheAccessor, this, C);
      var $__7 = this,
          $__8 = function(i) {
            var info = program.getActiveUniform(i);
            var location = program.getUniformLocation(info.name);
            var path = info.name.split(/[\[\].]/).filter((function(e) {
              return e;
            }));
            resolvePath.call($__7, path);
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
        $__8(i);
      }
      return this;
    }
  });
  var AttributeMap = function AttributeMap(program) {
    if (!program)
      return ;
    else
      this.setFromProgram(program, "getAttributes");
  };
  ($traceurRuntime.createClass)(AttributeMap, {}, {});
  Properties(AttributeMap.prototype, {
    clone: function() {
      var map = new AttributeMap;
      Properties(map, this, W | E);
      return map;
    },
    setFromProgram: function(program, cacheAccessor) {
      if (cacheAccessor)
        Property(program, cacheAccessor, this, C);
      for (var i = program.getActiveAttributesLength - 1; i >= 0; i--) {
        var info = program.getActiveAttrib(i);
        var name = info.name;
        Property(this, name, new AttributeLocation(program.getAttribLocation(name), info), E);
      }
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLShader", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLShader";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var debugMode = false;
  var Shader = function Shader(type, code) {
    var shader = gl.createShader(type);
    if (code)
      shader.setShaderSource(code);
    return shader;
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
  Properties(WebGLShader.prototype, {
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
      if (debugMode) {
        console.clear();
      }
      if (!this.getCompileStatus) {
        debugMode = this;
        console.error(this.getInfoLog);
      } else if (debugMode === this) {
        debugMode = false;
      }
      return this;
    }
  });
  Getters(WebGLShader.prototype, {
    getInfoLog: function() {
      return gl.getShaderInfoLog(this);
    },
    getSource: function() {
      return gl.getShaderSource(this);
    },
    getDeleteStatus: function() {
      return gl.getShaderParameter(this, GL.DELETE_STATUS);
    },
    getCompileStatus: function() {
      return gl.getShaderParameter(this, GL.COMPILE_STATUS);
    },
    getType: function() {
      return gl.getShaderParameter(this, GL.SHADER_TYPE);
    },
    getTypeFlag: function() {
      return gl.flags[gl.getShaderParameter(this, GL.SHADER_TYPE)];
    },
    getPrecisionFormatLowFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.LOW_FLOAT);
    },
    getPrecisionFormatMediumFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_FLOAT);
    },
    getPrecisionFormatHighFloat: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_FLOAT);
    },
    getPrecisionFormatLowInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.LOW_INT);
    },
    getPrecisionFormatMediumInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.MEDIUM_INT);
    },
    getPrecisionFormatHighInt: function() {
      return gl.getShaderPrecisionFormat(this.getType, GL.HIGH_INT);
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLTexture", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLTexture";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL;
  var Texture = function Texture() {
    var target = arguments[0] !== (void 0) ? arguments[0] : GL.TEXTURE_2D;
    var texture = gl.createTexture();
    if (texture)
      Property(texture, "target", target);
    return texture;
  };
  var $Texture = Texture;
  ($traceurRuntime.createClass)(Texture, {}, {CubeMap: function() {
      if (!(this instanceof $Texture.CubeMap))
        return new $Texture.CubeMap;
      Properties(this, {
        x: {
          positive: gl.createTexture(),
          negative: gl.createTexture()
        },
        y: {
          positive: gl.createTexture(),
          negative: gl.createTexture()
        },
        z: {
          positive: gl.createTexture(),
          negative: gl.createTexture()
        }
      }, E);
      Property(this.x.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_X);
      Property(this.x.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_X);
      Property(this.y.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_Y);
      Property(this.y.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_Y);
      Property(this.z.positive, "target", GL.TEXTURE_CUBE_MAP_POSITIVE_Z);
      Property(this.z.negative, "target", GL.TEXTURE_CUBE_MAP_NEGATIVE_Z);
    }});
  var $__default = Texture;
  Properties(WebGLTexture.prototype, {
    setActiveTexture: function(nTextureUnit) {
      gl.activeTexture(GL.TEXTURE0 + nTextureUnit);
      return this;
    },
    delete: function() {
      gl.deleteTexture(this);
      return this;
    },
    bind: function() {
      gl.bindTexture(this.target, this);
      return this;
    },
    unbind: function() {
      gl.bindTexture(this.target, null);
      return this;
    },
    setMipmapHint: function(mode) {
      gl.hint(GL.GENERATE_MIPMAP_HINT, mode);
      return this;
    },
    generateMipmap: function() {
      gl.generateMipmap(this.target);
      return this;
    },
    pixelStorei: function(pname, param) {
      gl.pixelStorei(pname, param);
      return this;
    },
    setMinFilter: function() {
      var min = arguments[0] !== (void 0) ? arguments[0] : GL.NEAREST;
      gl.texParameteri(this.target, GL.TEXTURE_MIN_FILTER, min);
      return this;
    },
    setMagFilter: function() {
      var mag = arguments[0] !== (void 0) ? arguments[0] : GL.NEAREST;
      gl.texParameteri(this.target, GL.TEXTURE_MAG_FILTER, mag);
      return this;
    },
    setWrapS: function() {
      var s = arguments[0] !== (void 0) ? arguments[0] : GL.CLAMP_TO_EDGE;
      gl.texParameteri(this.target, GL.TEXTURE_WRAP_S, s);
      return this;
    },
    setWrapT: function() {
      var t = arguments[0] !== (void 0) ? arguments[0] : GL.CLAMP_TO_EDGE;
      gl.texParameteri(this.target, GL.TEXTURE_WRAP_T, t);
      return this;
    },
    texImage: function(data) {
      var level = arguments[1] !== (void 0) ? arguments[1] : 0;
      var format = arguments[2] !== (void 0) ? arguments[2] : GL.RGBA;
      var type = arguments[3] !== (void 0) ? arguments[3] : GL.UNSIGNED_BYTE;
      gl.texImage2D(this.target, level, format, format, type, data);
      return this;
    },
    texData: function(data, width, height) {
      var level = arguments[3] !== (void 0) ? arguments[3] : 0;
      var format = arguments[4] !== (void 0) ? arguments[4] : GL.RGBA;
      var type = arguments[5] !== (void 0) ? arguments[5] : GL.UNSIGNED_BYTE;
      gl.texImage2D(this.target, level, format, width, height, 0, format, type, data);
      return this;
    },
    texSubImage: function(data) {
      var xoffset = arguments[1] !== (void 0) ? arguments[1] : 0;
      var yoffset = arguments[2] !== (void 0) ? arguments[2] : 0;
      var level = arguments[3] !== (void 0) ? arguments[3] : 0;
      var format = arguments[4] !== (void 0) ? arguments[4] : GL.RGBA;
      var type = arguments[5] !== (void 0) ? arguments[5] : GL.UNSIGNED_BYTE;
      gl.texSubImage2D(this.target, level, xoffset, yoffset, format, format, type, data);
      return this;
    },
    texSubData: function(data, width, height) {
      var xoffset = arguments[3] !== (void 0) ? arguments[3] : 0;
      var yoffset = arguments[4] !== (void 0) ? arguments[4] : 0;
      var level = arguments[5] !== (void 0) ? arguments[5] : 0;
      var format = arguments[6] !== (void 0) ? arguments[6] : GL.RGBA;
      var type = arguments[7] !== (void 0) ? arguments[7] : GL.UNSIGNED_BYTE;
      gl.texSubImage2D(this.target, level, xoffset, yoffset, format, width, height, 0, format, type, data);
      return this;
    },
    copyTexImage: function(x, y, width, height) {
      var level = arguments[4] !== (void 0) ? arguments[4] : 0;
      var format = arguments[5] !== (void 0) ? arguments[5] : GL.RGBA;
      gl.copyTexImage2D(this.target, level, format, x, y, width, height, 0);
      return this;
    },
    copyTexSubImage: function(xoffset, yoffset, x, y, width, height, level, format) {
      gl.copyTexImage2D(this.target, level, xoffset, yoffset, format, x, y, width, height);
      return this;
    }
  });
  Properties(Texture, {
    TARGET_TEXTURE_2D: GL.TEXTURE_2D,
    TARGET_TEXTURE_CUBE_MAP_POSITIVE_X: GL.TEXTURE_CUBE_MAP_POSITIVE_X,
    TARGET_TEXTURE_CUBE_MAP_NEGATIVE_X: GL.TEXTURE_CUBE_MAP_NEGATIVE_X,
    TARGET_TEXTURE_CUBE_MAP_POSITIVE_Y: GL.TEXTURE_CUBE_MAP_POSITIVE_Y,
    TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Y: GL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    TARGET_TEXTURE_CUBE_MAP_POSITIVE_Z: GL.TEXTURE_CUBE_MAP_POSITIVE_Z,
    TARGET_TEXTURE_CUBE_MAP_NEGATIVE_Z: GL.TEXTURE_CUBE_MAP_NEGATIVE_Z,
    FORMAT_ALPHA: GL.ALPHA,
    FORMAT_LUMINANCE: GL.LUMINANCE,
    FORMAT_LUMINANCE_ALPHA: GL.LUMINANCE_ALPHA,
    FORMAT_RGB: GL.RGB,
    FORMAT_RGBA: GL.RGBA,
    TYPE_UNSIGNED_BYTE: GL.UNSIGNED_BYTE,
    TYPE_UNSIGNED_SHORT_5_6_5: GL.UNSIGNED_SHORT_5_6_5,
    TYPE_UNSIGNED_SHORT_4_4_4_4: GL.UNSIGNED_SHORT_4_4_4_4,
    TYPE_UNSIGNED_SHORT_5_5_5_1: GL.UNSIGNED_SHORT_5_5_5_1,
    STORE_UNPACK_FLIP_Y: GL.UNPACK_FLIP_Y_WEBGL,
    STORE_UNPACK_COLORSPACE_CONVERSION: GL.UNPACK_COLORSPACE_CONVERSION_WEBGL,
    STORE_UNPACK_PREMULTIPLY_ALPHA: GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
    STORE_UNPACK_ALIGNMENT: GL.UNPACK_ALIGNMENT,
    STORE_PACK_ALIGNMENT: GL.PACK_ALIGNMENT,
    STOREPARAM_BROWSER_DEFAULT: GL.BROWSER_DEFAULT_WEBGL,
    MIPMAP_FASTEST: GL.FASTEST,
    MIPMAP_NICEST: GL.NICEST,
    MIPMAP_DONT_CARE: GL.DONT_CARE,
    MIN_NEAREST: GL.NEAREST,
    MIN_LINEAR: GL.LINEAR,
    MIN_NEAREST_MIPMAP_NEAREST: GL.NEAREST_MIPMAP_NEAREST,
    MIN_LINEAR_MIPMAP_NEAREST: GL.LINEAR_MIPMAP_NEAREST,
    MIN_NEAREST_MIPMAP_LINEAR: GL.NEAREST_MIPMAP_LINEAR,
    MIN_LINEAR_MIPMAP_LINEAR: GL.LINEAR_MIPMAP_LINEAR,
    MAG_NEAREST: GL.NEAREST,
    MAG_LINEAR: GL.LINEAR,
    WRAP_CLAMP_TO_EDGE: GL.CLAMP_TO_EDGE,
    WRAP_MIRRORED_REPEAT: GL.MIRRORED_REPEAT,
    WRAP_REPEAT: GL.REPEAT
  });
  Getters(WebGLTexture.prototype, {
    getTargetFlag: function() {
      return gl.flags[this.target];
    },
    getMagFilter: function() {
      this.bind();
      return gl.getTexParameter(this.target, GL.TEXTURE_MAG_FILTER);
    },
    getMagFilterFlag: function() {
      return gl.flags[this.getMagFilter];
    },
    getMinFilter: function() {
      this.bind();
      return gl.getTexParameter(this.target, GL.TEXTURE_MIN_FILTER);
    },
    getMinFilterFlag: function() {
      return gl.flags[this.getMinFilter];
    },
    getWrapS: function() {
      this.bind();
      return gl.getTexParameter(this.target, GL.TEXTURE_WRAP_S);
    },
    getWrapSFlag: function() {
      return gl.flags[this.getWrapS];
    },
    getWrapT: function() {
      this.bind();
      return gl.getTexParameter(this.target, GL.TEXTURE_WRAP_T);
    },
    getWrapTFlag: function() {
      return gl.flags[this.getWrapT];
    }
  });
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/webgl/GLVertexArrayObject", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLVertexArrayObject";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors.js"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext.js"),
      gl = $__1.gl,
      GL = $__1.GL,
      extensions = $__1.extensions,
      capabilities = $__1.capabilities;
  var ext = extensions.OES_vertex_array_object;
  var DEBUG_USE_FALLBACK = false;
  var MAX_VERTEX_BINDINGS = capabilities.getMaxVertexAttribs;
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
    Properties(proto, {
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
      updatePointer: function(index) {
        var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
        var stride = arguments[2] !== (void 0) ? arguments[2] : 0;
        var size = arguments[3] !== (void 0) ? arguments[3] : 4;
        var type = arguments[4] !== (void 0) ? arguments[4] : GL.FLOAT;
        var normalized = arguments[5] !== (void 0) ? arguments[5] : false;
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.setPointer(offset, stride, size, type, normalized);
        }
        return this;
      },
      disableAttribute: function(index) {
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.disable();
        }
        return this;
      },
      enableAttribute: function(index) {
        if (currentBinding !== this)
          bind(this);
        var target = this[index];
        if (target) {
          target.buffer.bind();
          target.location.enable();
        }
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
    });
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../src/preprocessed.js", [], function() {
  "use strict";
  var __moduleName = "../src/preprocessed.js";
  Function.prototype.getSignature = function() {
    var source = Function.prototype.toString.call(this);
    var end = 0;
    var start = 0;
    var balance = 1;
    while (source[start] !== "(")
      start++;
    end = start + 1;
    while (balance !== 0) {
      if (source[end] === "(")
        balance++;
      if (source[end] === ")")
        balance--;
      end++;
    }
    return source.substring(start, end);
  };
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/utilities/ULUniforms"),
      Uniform = $__1.Uniform,
      UniformStruct = $__1.UniformStruct,
      UniformArray = $__1.UniformArray;
  var $__2 = System.get("../src/utilities/ULGeometryAttributes"),
      VertexAttribute = $__2.VertexAttribute,
      VertexAttributeGroup = $__2.VertexAttributeGroup,
      ElementAttribute = $__2.ElementAttribute;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation").default;
  var $__4 = System.get("../src/webgl/GLContext"),
      gl = $__4.gl,
      GL = $__4.GL,
      canvas = $__4.canvas,
      extensions = $__4.extensions,
      capabilities = $__4.capabilities,
      bindings = $__4.bindings,
      viewport = $__4.viewport,
      textureUnit = $__4.textureUnit;
  parent.gl = gl;
  parent.GL = GL;
  parent.canvas = canvas;
  parent.extensions = extensions;
  parent.capabilities = capabilities;
  parent.bindings = bindings;
  parent.viewport = viewport;
  parent.textureUnit = textureUnit;
  var Program = System.get("../src/webgl/GLProgram").default;
  parent.Program = Program;
  var Shader = System.get("../src/webgl/GLShader").default;
  parent.Shader = Shader;
  var Texture = System.get("../src/webgl/GLTexture").default;
  parent.Texture = Texture;
  var VertexArrayObject = System.get("../src/webgl/GLVertexArrayObject").default;
  parent.VertexArrayObject = VertexArrayObject;
  var Geometry = System.get("../src/utilities/ULGeometry").default;
  parent.Geometry = Geometry;
  var Material = System.get("../src/utilities/ULMaterial").default;
  parent.Material = Material;
  var $__11 = System.get("../src/utilities/ULMaterial"),
      Alpha = $__11.Alpha,
      DepthTest = $__11.DepthTest,
      Dither = $__11.Dither,
      PolygonOffset = $__11.PolygonOffset,
      StencilTest = $__11.StencilTest,
      CullFace = $__11.CullFace,
      Multisample = $__11.Multisample;
  parent.Alpha = Alpha;
  parent.DepthTest = DepthTest;
  parent.Dither = Dither;
  parent.PolygonOffset = PolygonOffset;
  parent.StencilTest = StencilTest;
  parent.CullFace = CullFace;
  parent.Multisample = Multisample;
  var Mesh = System.get("../src/utilities/ULMesh").default;
  parent.Mesh = Mesh;
  var Draw = System.get("../src/webgl/GLDraw").default;
  parent.Draw = Draw;
  var Resource = System.get("../src/utilities/ULResource").default;
  parent.Resource = Resource;
  var $__15 = System.get("../src/math/MLVector"),
      vec2 = $__15.vec2,
      vec3 = $__15.vec3,
      vec4 = $__15.vec4,
      quat4 = $__15.quat4;
  parent.vec2 = vec2;
  parent.vec3 = vec3;
  parent.vec4 = vec4;
  parent.quat4 = quat4;
  var $__16 = System.get("../src/math/MLMatrix"),
      mat2 = $__16.mat2,
      mat3 = $__16.mat3,
      mat4 = $__16.mat4;
  parent.mat2 = mat2;
  parent.mat3 = mat3;
  parent.mat4 = mat4;
  var InterleavedArray = System.get("../src/utilities/ULInterleavedArray").default;
  parent.InterleavedArray = InterleavedArray;
  var ObjectView = System.get("../src/gui/UIView").default;
  parent.ObjectView = ObjectView;
  try {
    parent.main();
  } catch (err) {
    console.warn(err.stack);
  }
  return {};
});
System.get("../src/preprocessed.js" + '');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzUiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNCIsIi4uL3NyYy9ndWkvVUlWaWV3LmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTAiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yIiwiLi4vc3JjL3V0aWxpdGllcy9VTFByb3BlcnR5RGVzY3JpcHRvcnMuanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTEiLCIuLi9zcmMvbWF0aC9NTFZlY3Rvci5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMiIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMiIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xNiIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xOSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xNyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xNSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xNCIsIi4uL3NyYy9tYXRoL01MTWF0cml4LmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTEludGVybGVhdmVkQXJyYXkuanMiLCIuLi9zcmMvd2ViZ2wvR0xDb250ZXh0LmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzI0IiwiLi4vc3JjL3V0aWxpdGllcy9VTFJlc291cmNlLmpzIiwiLi4vc3JjL3dlYmdsL0dMVW5pZm9ybUxvY2F0aW9uLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzI1IiwiLi4vc3JjL3V0aWxpdGllcy9VTFVuaWZvcm1zLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzI2IiwiLi4vc3JjL3dlYmdsL0dMQXR0cmlidXRlTG9jYXRpb24uanMiLCIuLi9zcmMvd2ViZ2wvR0xTaGFkZXIuanMiLCIuLi9zcmMvd2ViZ2wvR0xQcm9ncmFtLmpzIiwiLi4vc3JjL3V0aWxpdGllcy9VTE1hdGVyaWFsLmpzIiwiLi4vc3JjL3dlYmdsL0dMRHJhdy5qcyIsIi4uL3NyYy93ZWJnbC9HTFZlcnRleEJ1ZmZlci5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxHZW9tZXRyeUF0dHJpYnV0ZXMuanMiLCIuLi9zcmMvd2ViZ2wvR0xWZXJ0ZXhBcnJheU9iamVjdC5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxHZW9tZXRyeS5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxNZXNoLmpzIiwiLi4vc3JjL3dlYmdsL0dMVGV4dHVyZS5qcyIsIi4uL3NyYy9wcmVwcm9jZXNzZWQuanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMjciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSyxlQUFlLEFBQUMscUJBQW9CLEdBQUMsQ0NBMUMs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LENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsRUFBQyxBQUFXLENBQUk7UUFBWixHQUFDLDZDQUFJLEtBQUc7QUFDdEIsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFFBQUksQ0FBSixVQUFRLEVBQUMsQUFBeUIsQ0FBSTtRQUExQixHQUFDLDZDQUFJLENBQUEsSUFBRyxNQUFNLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDakMsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLGFBQVMsQ0FBVCxVQUFhLENBQUEsQ0FBSTtBQUNoQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDM0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMzRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTNELFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNoRSxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDaEUsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRWhFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENB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QUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUNBLFlBQVEsQ0FBUixVQUFZLEFBQU8sQ0FBSTtRQUFYLEVBQUEsNkNBQUksS0FBRztBQUNsQixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRWpELENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUVqRCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFakQsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ2xELENBQUM7SUFDRjtBQUNBLFNBQUssQ0FBTCxVQUFTLEFBQStCLENBQUk7UUFBbkMsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsVUFBVSxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ3ZDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFHNUMsQUFBSSxRQUFBLENBQUEsV0FBVSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3BDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRS9CLFNBQUksSUFBRyxJQUFJLEFBQUMsQ0FBRSxXQUFVLENBQUUsQ0FBQSxDQUFJLENBQUEsTUFBSyxRQUFRO0FBQUksYUFBTyxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQzs7QUFDaEUsYUFBTyxDQUFBLElBQUcsZUFBZSxBQUFDLENBQUUsQ0FBQSxFQUFJLFlBQVUsQ0FBQyxDQUFDO0FBQUEsSUFDbEQ7QUFDQSxZQUFRLENBQVIsVUFBWSxDQUFBLENBQUk7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsaUJBQWEsQ0FBYixVQUFpQixDQUFBLENBQUk7QUFDcEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFdEUsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLENBQUEsQUFBVSxDQUFJO1FBQVgsRUFBQSw2Q0FBSSxLQUFHO0FBQ2YsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN6QixDQUFDO0lBQ0Y7QUFDQSxXQUFPLENBQVAsVUFBVyxDQUFBLEFBQVUsQ0FBSztRQUFaLEVBQUEsNkNBQUksS0FBRztBQUNwQixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDWixDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQzNCLENBQUM7SUFDRjtBQUNBLGNBQVUsQ0FBVixVQUFjLEFBQUYsQ0FBSTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUssQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDOUIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUc3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLFdBQU8sQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFBLENBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFBLENBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFBLENBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFBLENBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFBLENBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFDO0lBQ2pFO0FBQ0EsU0FBSyxDQUFMLFVBQVMsR0FBRSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsRUFBQyxDQUFJO0FBQzFCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFDWixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRyxPQUFLLENBQUUsVUFBVSxBQUFDLEVBQUMsQ0FBQztBQUVuRCxTQUFLLENBQUEsVUFBVSxJQUFNLEVBQUE7QUFBSSxRQUFBLEVBQUksQ0FBQSxDQUFBLElBQUksQUFBQyxDQUFFLEVBQUMsQ0FBRSxDQUFDO0FBQUEsQUFFcEMsUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFlBQVcsTUFBTSxBQUFDLENBQUUsRUFBQyxDQUFHLEVBQUEsQ0FBRSxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBRS9DLFNBQUksQ0FBQSxVQUFVLElBQU0sRUFBQSxDQUFJO0FBQ3ZCLFFBQUEsRUFBRSxHQUFLLE9BQUssQ0FBQztBQUNiLFFBQUEsRUFBSSxDQUFBLENBQUEsTUFBTSxBQUFDLENBQUUsRUFBQyxDQUFHLEVBQUEsQ0FBRSxVQUFVLEFBQUMsRUFBQyxDQUFDO01BQ2pDO0FBQUEsQUFFSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsWUFBVyxNQUFNLEFBQUMsQ0FBRSxDQUFBLENBQUcsRUFBQSxDQUFFLENBQUM7QUFFbEMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2hFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNoRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEUsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUVBLFVBQU0sQ0FBTixVQUFVLElBQUcsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUMvQyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFBLENBQUksRUFBRSxLQUFJLEVBQUksS0FBRyxDQUFFLENBQUM7QUFDbkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQSxDQUFJLEVBQUUsR0FBRSxFQUFJLE9BQUssQ0FBRSxDQUFDO0FBRW5DLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsS0FBSSxFQUFJLEtBQUcsQ0FBRSxFQUFJLEVBQUUsS0FBSSxFQUFJLEtBQUcsQ0FBRSxDQUFDO0FBQzNDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsR0FBRSxFQUFJLE9BQUssQ0FBRSxFQUFJLEVBQUUsR0FBRSxFQUFJLE9BQUssQ0FBRSxDQUFDO0FBQzNDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUMsQ0FBRSxHQUFFLEVBQUksS0FBRyxDQUFFLENBQUEsQ0FBSSxFQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsQ0FBQztBQUN4QyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLENBQUEsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLEtBQUcsQ0FBQSxDQUFJLEVBQUUsR0FBRSxFQUFJLEtBQUcsQ0FBRSxDQUFDO0FBRXpDLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVixDQUFBO0lBQ0Q7QUFDQSxlQUFXLENBQVgsVUFBZSxJQUFHLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUk7QUFDcEQsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsS0FBSSxFQUFJLEtBQUcsQ0FBQztBQUNwQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxHQUFFLEVBQUksT0FBSyxDQUFDO0FBQ3BCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLEdBQUUsRUFBSSxLQUFHLENBQUM7QUFFbEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxJQUFHLEVBQUksTUFBSSxDQUFFLEVBQUksRUFBQyxDQUFBLENBQUM7QUFDN0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxHQUFFLEVBQUksT0FBSyxDQUFFLEVBQUksRUFBQyxDQUFBLENBQUM7QUFDN0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxJQUFHLEVBQUksSUFBRSxDQUFFLEVBQU0sRUFBQyxDQUFBLENBQUM7QUFFN0IsTUFBQSxFQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUNWLE1BQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDVixNQUFBLEVBQUksQ0FBQSxDQUFDLENBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUVWLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVixDQUFDO0lBQ0Y7QUFDQSxjQUFVLENBQVYsVUFBYyxNQUFLLENBQUcsQ0FBQSxHQUFFLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFLENBQUk7QUFDdEMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsR0FBRSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLEVBQUksRUFBQSxDQUFFLENBQUM7QUFDakMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUUsSUFBRyxFQUFJLElBQUUsQ0FBRSxDQUFDO0FBQzNCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUM7QUFDbEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxHQUFFLEVBQUksS0FBRyxDQUFFLEVBQUksR0FBQyxDQUFDO0FBQzNCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsQ0FBQSxF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LENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFdEUsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFNBQUssQ0FBTCxVQUFTLEFBQTJCLENBQUk7UUFBL0IsSUFBRSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQ25DLEFBQUksUUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLElBQUcsS0FBSyxBQUFDLENBQUUsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBRSxDQUFDO0FBRS9DLFNBQUssSUFBRyxJQUFJLEFBQUMsQ0FBRSxNQUFLLENBQUUsQ0FBQSxDQUFJLENBQUEsTUFBSyxRQUFRO0FBQUksYUFBTyxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztBQUFBLEFBRTdELFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUViLFdBQUssRUFBSSxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUM7QUFDbkIsTUFBQSxHQUFLLE9BQUssQ0FBQztBQUNYLE1BQUEsR0FBSyxPQUFLLENBQUM7QUFDWCxNQUFBLEdBQUssT0FBSyxDQUFDO0FBRVgsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLFdBQVMsQ0FBQztBQUNsQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBQzNCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUUzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFFLElBQUcsQ0FBRSxDQUFDO0FBQy9CLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsVUFBTSxDQUFOLFVBQVUsQUFBTSxDQUFJO1FBQVYsSUFBRSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLEtBQUssQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBQ25DLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsS0FBSyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFFbkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxBQUFNLENBQUk7UUFBVixJQUFFLDZDQUFJLEVBQUE7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsS0FBSyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFDbkMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxLQUFLLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUVuQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFVBQU0sQ0FBTixVQUFVLEFBQU0sQ0FBSTtRQUFWLElBQUUsNkNBQUksRUFBQTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxLQUFLLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUNuQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLEtBQUssQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBRW5DLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsY0FBVSxDQUFWLFVBQWMsSUFBRyxDQUFJO0FBQ3BCLEFBQUksUUFBQSxDQUFBLEdBQUUsRUFBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFLGVBQWUsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUFDO0FBQ3JELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUVqRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBQztBQUNyQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxD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Q0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBQzNCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFFM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFFL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENB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Q0FBQztJQUNGO0FBQ0EsZ0JBQVksQ0FBWixVQUFnQixJQUFHLENBQUk7QUFDdEIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUUsZUFBZSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFFckQsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFLENBQUM7QUFDakUsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFLENBQUM7QUFDakUsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFLENBQUM7QUFFakUsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxFQUFJLEVBQUMsRUFBQyxFQUFJLEdBQUMsQ0FBQyxDQUFHLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksRUFBQSxDQUVuQyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUcsQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFJLEVBQUEsQ0FFbkMsQ0FBQSxF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Q0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMvRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFL0UsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLEFBQUYsQ0FBSTtBQUNaLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDakQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ2pELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUVqRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsaUJBQWEsQ0FBYixVQUFpQixDQUFBLENBQUk7QUFDcEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDcEQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXBELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxZQUFRLENBQVIsVUFBWSxDQUFBLENBQUk7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3BELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFcEQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBNkIsQ0FBSTtRQUE5QixFQUFBLDZDQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDdkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUVILFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENBQUYsVUFBTSxDQUFBLEFBQTZCLENBQUk7UUFBOUIsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ2xDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDekgsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ3pILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFB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Q0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFFQSxNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FB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Q0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFFBQUksQ0FBSixVQUFRLEVBQUMsQUFBeUIsQ0FBSTtRQUExQixHQUFDLDZDQUFJLENBQUEsSUFBRyxNQUFNLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDakMsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDakQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLGFBQVMsQ0FBVCxVQUFhLENBQUEsQ0FBSTtBQUNoQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDM0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMzRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTNELFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEs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S0FBSyxBQUFDLENBQUUsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7SUFDbEg7QUFDQSxjQUFVLENBQVYsVUFBYyxBQUFGLENBQUk7QUFDZixXQUFPLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFDO0lBQ3JHO0FBQ0EscUJBQWlCLENBQWpCLFVBQXFCLEFBQUYsQ0FBSTtBQUN0QixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztJQUNyRztBQUFBLEVBQ0QsQ0FBRyxFQUFBLENBQUUsQ0FBQztBVGxUTixB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QSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDbEIsTUFBQTtBQUNILFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSyxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUNsQixNQUFBO0FBQ0gsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFLLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQ2xCLE1BQUE7QUFDSCxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdkIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxD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QUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUc1QyxBQUFJLFFBQUEsQ0FBQSxXQUFVLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDcEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFL0IsU0FBSSxJQUFHLElBQUksQUFBQyxDQUFFLFdBQVUsQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDOztBQUNoRSxhQUFPLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBRSxDQUFBLEVBQUksWUFBVSxDQUFDLENBQUM7QUFBQSxJQUNsRDtBQUNBLFlBQVEsQ0FBUixVQUFZLENBQUEsQ0FBSTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXRFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxpQkFBYSxDQUFiLFVBQWlCLENBQUEsQ0FBSTtBQUNwQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsTUFBRSxDQUFGLFVBQU0sQ0FBQSxBQUFVLENBQUk7UUFBWCxFQUFBLDZDQUFJLEtBQUc7QUFDZixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3pCLENBQUM7SUFDRjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBVSxDQUFLO1FBQVosRUFBQSw2Q0FBSSxLQUFHO0FBQ3BCLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNaLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDM0IsQ0FBQztJQUNGO0FBQ0EsY0FBVSxDQUFWLFVBQWMsQUFBRixDQUFJO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM5QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRzdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsV0FBTyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7SUFDakU7QUFDQSxTQUFLLENBQUwsVUFBUyxHQUFFLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxFQUFDLENBQUk7QUFDMUIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUNaLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFlBQVcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFHLE9BQUssQ0FBRSxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBRW5ELFNBQUssQ0FBQSxVQUFVLElBQU0sRUFBQTtBQUFJLFFBQUEsRUFBSSxDQUFBLENBQUEsSUFBSSxBQUFDLENBQUUsRUFBQyxDQUFFLENBQUM7QUFBQSxBQUVwQyxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsWUFBVyxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7QUFFL0MsU0FBSSxDQUFBLFVBQVUsSUFBTSxFQUFBLENBQUk7QUFDdkIsUUFBQSxFQUFFLEdBQUssT0FBSyxDQUFDO0FBQ2IsUUFBQSxFQUFJLENBQUEsQ0FBQSxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7TUFDakM7QUFBQSxBQUVJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLE1BQU0sQUFBQyxDQUFFLENBQUEsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDaEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2hFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoRSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBRUEsVUFBTSxDQUFOLFVBQVUsSUFBRyxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFJO0FBQy9DLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUEsQ0FBSSxFQUFFLEtBQUksRUFBSSxLQUFHLENBQUUsQ0FBQztBQUNuQyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFFbkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxLQUFJLEVBQUksS0FBRyxDQUFFLEVBQUksRUFBRSxLQUFJLEVBQUksS0FBRyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxHQUFFLEVBQUksT0FBSyxDQUFFLEVBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQyxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsQ0FBQSxDQUFJLEVBQUUsR0FBRSxFQUFJLEtBQUcsQ0FBRSxDQUFDO0FBQ3hDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsQ0FBQSxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksS0FBRyxDQUFFLENBQUM7QUFFekMsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUE7SUFDRDtBQUNBLGVBQVcsQ0FBWCxVQUFlLElBQUcsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUNwRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxLQUFJLEVBQUksS0FBRyxDQUFDO0FBQ3BCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLEdBQUUsRUFBSSxPQUFLLENBQUM7QUFDcEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsR0FBRSxFQUFJLEtBQUcsQ0FBQztBQUVsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxNQUFJLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxPQUFLLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxJQUFFLENBQUUsRUFBTSxFQUFDLENBQUEsQ0FBQztBQUU3QixNQUFBLEVBQUssQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQ1YsTUFBQSxFQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUNWLE1BQUEsRUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRVYsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUNBLGNBQVUsQ0FBVixVQUFjLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUN0QyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxHQUFFLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsRUFBSSxFQUFBLENBQUUsQ0FBQztBQUNqQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBRSxJQUFHLEVBQUksSUFBRSxDQUFFLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxDQUFBLEVBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFFLEVBQUksR0FBQyxDQUFDO0FBRy9CLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQyxDQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUVBLFlBQVEsQ0FBUixVQUFZLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQzdCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFDWixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFFLElBQUcsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUN2QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ3ZCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRWhCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDdkIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFFBQUksQ0FBSixVQUFRLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQ3pCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsU0FBSyxDQUFMLFVBQVMsQUFBMkIsQ0FBSTtRQUEvQixJQUFFLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7QUFDbkMsQUFBSSxRQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxLQUFLLEFBQUMsQ0FBRSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFFLENBQUM7QUFFL0MsU0FBSyxJQUFHLElBQUksQUFBQyxDQUFFLE1BQUssQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBQUEsQUFFN0QsUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRWIsV0FBSyxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNuQixNQUFBLEdBQUssT0FBSyxDQUFDO0FBQ1gsTUFBQSxHQUFLLE9BQUssQ0FBQztBQUNYLE1BQUEsR0FBSyxPQUFLLENBQUM7QUFFWCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksV0FBUyxDQUFDO0FBQ2xCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRTNCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFLENBQUM7QUFDL0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxBQUFNLENBQUk7UUFBVixJQUFFLDZDQUFJLEVBQUE7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsS0FBSyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFDbkMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxLQUFLLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUVuQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFVBQU0sQ0FBTixVQUFVLEFBQU0sQ0FBSTtRQUFWLElBQUUsNkNBQUksRUFBQTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxLQUFLLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUNuQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLEtBQUssQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBRW5DLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsVUFBTSxDQUFOLFVBQVUsQUFBTSxDQUFJO1FBQVYsSUFBRSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLEtBQUssQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBQ25DLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsS0FBSyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFFbkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxjQUFVLENBQVYsVUFBYyxJQUFHLENBQUk7QUFDcEIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUUsZUFBZSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFDckQsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBRWpFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFDO0FBQ3JCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7QUFFckIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBQztBQUNyQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUM7QUFD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QUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUUzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcs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QUNuQixTQUFHLEtBQUssSUFBSSxBQUFDLENBQUUsS0FBSSxDQUFFLENBQUM7QUFDdEIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFlBQVEsQ0FBUixVQUFZLEFBQTBCLENBQUk7UUFBOUIsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ3JDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDL0UsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQy9FLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUUvRSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsQUFBRixDQUFJO0FBQ1osQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUNqRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDakQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRWpELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxpQkFBYSxDQUFiLFVBQWlCLENBQUEsQ0FBSTtBQUNwQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3BELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFcEQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFlBQVEsQ0FBUixVQUFZLENBQUEsQ0FBSTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDcEQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3BELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUVwRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsQ0FBQSxBQUE2QixDQUFJO1FBQTlCLEVBQUEsNkNBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFFLElBQUcsQ0FBRTtBQUN2QyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBRUgsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLENBQUEsQUFBNkIsQ0FBSTtRQUE5QixFQUFBLDZDQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDbEMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUN6SCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDekgsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FB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RSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUVBLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBRUgsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLENBQUEsQUFBNkIsQ0FBSTtRQUE5QixFQUFBLDZDQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDbEMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNoRixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEYsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUFBLEVBQ0QsQ0FBQyxDQUFDO0FBRUYsQUFBTSxJQUFBLENBQUEsVUFBUyxFQUFLLElBQUksS0FBRyxDQUFDO0FBQzVCLEFBQU0sSUFBQSxDQUFBLFVBQVMsRUFBSyxJQUFJLEtBQUcsQ0FBQztBQUM1QixBQUFNLElBQUEsQ0FBQSxVQUFTLEVBQUksSUFBSSxLQUFHLENBQUM7QUFDM0IsQUFBTSxJQUFBLENBQUEsWUFBVyxFQUFLLElBQUksS0FBRyxDQUFDO0FBQzlCLEFBQU0sSUFBQSxDQUFBLFlBQVcsRUFBSyxJQUFJLEtBQUcsQ0FBQztBQUM5QixBQUFNLElBQUEsQ0FBQSxZQUFXLEVBQUssSUFBSSxLQUFHLENBQUM7QUFFOUIsQUFBTSxJQUFBLENBQUEsV0FBVSxFQUFL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RUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDL0UsYUFBSyxDQUFHLENBQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDL0UsYUFBSyxDQUFHLENBQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDL0UsYUFBSyxDQUFHLENBQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFFL0UsYUFBSyxDQUFHLENBQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDL0UsYUFBSyxDQUFHLENBQUEsRUFBSyxDQUFBLENBQUEsRUFBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcsRUFBRSxDQUFBLENBQUUsRUFBSSxHQUFDLENBQUM7QUFBRSxhQUFLLENBQUcs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LENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNqQyxJQUFJLEtBQUcsQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUNsQyxDQUFDO0FBRUQsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBRTdCLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBRWxFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFHLEVBQUMsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUcsRUFBQyxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFHLEVBQUMsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBRWxFLEFBQUksUUFBQSxDQUFBLElBQUcsRUFBSSxVQUFRLENBQUUsUUFBTyxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUNyQyxTQUFLLFNBQVE7QUFBSSxXQUFHLGNBQWMsQUFBQyxDQUNsQyxXQUFVLENBQ1YsSUFBSSxXQUFTLEFBQUMsQ0FBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNQLENBQUMsQ0FDRCxDQUFBLEVBQUMsVUFBVSxDQUNYLENBQUEsRUFBQyxhQUFhLENBQ2YsQ0FBQztBQUFBLEFBQ0QsU0FBSyxLQUFJO0FBQUksV0FBRyxjQUFjLEFBQUMsQ0FDOUIsT0FBTSxDQUNOLElBQUksV0FBUyxBQUFDLENBQUMsQ0FDZCxDQUFBLENBQUUsRUFBQSxDQUFHLEVBQUEsQ0FBRSxFQUFBLENBQ1AsRUFBQSxDQUFFLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQSxDQUNQLEVBQUEsQ0FBRSxFQUFBLENBQUcsRUFBQSxDQUFFLEVBQUEsQ0FDUCxFQUFBLENBQUUsRUFBQSxDQUFHLEVBQUEsQ0FBRSxFQUFBLENBQ1AsRUFBQSxDQUFFLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQSxDQUNQLEVBQUEsQ0FBRSxFQUFBLENBQUcsRUFBQSxDQUFFLEVBQUEsQ0FDUixDQUFDLENBQ0QsQ0FBQSxFQUFDLE1BQU0sQ0FDUCxDQUFB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QU0sRUFBSSxNQUFJLENBQUM7WWxDM0ZwQixDQUFBLE1BQUssSUFBSSxBQUFDLHdCQUFrQjtBa0M2Rm5CLFNBQUc7QUFBRyxTQUFHO0FBQUcsU0FBRztBQUN4QixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDbEIsT0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2xCLE9BQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztJQUdYLGlCQUFlLEVsQ25HdEIsQ0FBQSxNQUFLLElBQUksQUFBQyx1Q0FBa0I7QWtDb0c1QixPQUFLLGlCQUFpQixFQUFJLGlCQUFlLENBQUM7SUFFbkMsV0FBUyxFbEN0R2hCLENBQUEsTUFBSyxJQUFJLEFBQUMscUJBQWtCO0FrQ3VHNUIsT0FBSyxXQUFXLEVBQUksV0FBUyxDQUFDO0FBRTlCLElBQUk7QUFDSCxTQUFLLEtBQUssQUFBQyxFQUFDLENBQUM7RUFDZCxDQUFFLE9BQVEsR0FBRSxDQUFJO0FBQ2YsVUFBTSxLQUFLLEFBQUMsQ0FBQyxHQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQ3hCO0FBQUEsQXJDN0dBLFdBQXVCO0FSRWpCLENERndELENBQUM7QStDQS9ELEtBQUssSUFBSSxBQUFDLENBQUMsMEJBQW1CLEdBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6IkQ6L3dlYi9wb2x5bWVyL2Rldi9nbC1lbGVtZW50cy9iaW4vZW5naW5lLmpzIiwic291cmNlUm9vdCI6IkQ6L3dlYi9wb2x5bWVyL2Rldi9nbC1lbGVtZW50cy9iaW4vIiwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyTW9kdWxlKCRfX3BsYWNlaG9sZGVyX18wLCBbXSwgJF9fcGxhY2Vob2xkZXJfXzEpOyIsImZ1bmN0aW9uKCkge1xuICAgICAgICAkX19wbGFjZWhvbGRlcl9fMFxuICAgICAgfSIsInZhciBfX21vZHVsZU5hbWUgPSAkX19wbGFjZWhvbGRlcl9fMDsiLG51bGwsInZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xIiwiKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzAsICRfX3BsYWNlaG9sZGVyX18xLCAkX19wbGFjZWhvbGRlcl9fMikiLCJ2YXIgJF9fZGVmYXVsdCA9ICRfX3BsYWNlaG9sZGVyX18wIiwiXG4gICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID1cbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzFbXG4gICAgICAgICAgICAgICAgICAgICAkdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSgpLFxuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAhKCRfX3BsYWNlaG9sZGVyX18zID0gJF9fcGxhY2Vob2xkZXJfXzQubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNTtcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNjtcbiAgICAgICAgfSIsInZvaWQgMCIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMCIsImdldCAkX19wbGFjZWhvbGRlcl9fMCgpIHsgcmV0dXJuICRfX3BsYWNlaG9sZGVyX18xOyB9IixudWxsLCJTeXN0ZW0uZ2V0KCRfX3BsYWNlaG9sZGVyX18wKSIsbnVsbCwidmFyICRfX3BsYWNlaG9sZGVyX18wID0gJF9fcGxhY2Vob2xkZXJfXzEiLCIkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKCRfX3BsYWNlaG9sZGVyX18wKSIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMChcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzEsXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yLCB0aGlzKTsiLCIkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UiLCJmdW5jdGlvbigkY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkgJF9fcGxhY2Vob2xkZXJfXzBcbiAgICB9IiwiJGN0eC5zdGF0ZSA9ICgkX19wbGFjZWhvbGRlcl9fMCkgPyAkX19wbGFjZWhvbGRlcl9fMSA6ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICBicmVhayIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMCIsIiRjdHgubWF5YmVUaHJvdygpIiwicmV0dXJuICRjdHguZW5kKCkiLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdOyIsIiR0cmFjZXVyUnVudGltZS5zdXBlckNvbnN0cnVjdG9yKCRfX3BsYWNlaG9sZGVyX18wKS5jYWxsKCRfX3BsYWNlaG9sZGVyX18xKSIsIigkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKCRfX3BsYWNlaG9sZGVyX18wLCAkX19wbGFjZWhvbGRlcl9fMSwgJF9fcGxhY2Vob2xkZXJfXzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMykiLG51bGwsbnVsbCxudWxsLCJmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMTtcbiAgICAgICAgICByZXR1cm4gKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzIsICRfX3BsYWNlaG9sZGVyX18zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNCk7XG4gICAgICAgIH0oKSIsbnVsbCxudWxsLCIkdHJhY2V1clJ1bnRpbWUuc3ByZWFkKCRfX3BsYWNlaG9sZGVyX18wKSIsbnVsbCwiJHRyYWNldXJSdW50aW1lLnN1cGVyQ29uc3RydWN0b3IoXG4gICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzApLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykiLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLCJTeXN0ZW0uZ2V0KCRfX3BsYWNlaG9sZGVyX18wICsnJykiXX0=
