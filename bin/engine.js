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
  Getters(vec3.prototype, {
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
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/math/MLVector"),
      vec2 = $__1.vec2,
      vec3 = $__1.vec3,
      vec4 = $__1.vec4,
      quat4 = $__1.quat4;
  var mat4 = function mat4() {
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
      this.data.set(m.data);
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
      var m1 = CACHE_VEC4A.set(m[1]);
      var m2 = CACHE_VEC4B.set(m[2]);
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
      var m0 = CACHE_VEC4A.set(m[0]);
      var m2 = CACHE_VEC4B.set(m[2]);
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
      var m0 = CACHE_VEC4A.set(m[0]);
      var m2 = CACHE_VEC4B.set(m[1]);
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
      var two = CACHE_VEC4.clone(quat).multiplyScalar(2);
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
      return this.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, 0, 0, 0, 1);
    }
  });
  var mat3 = function mat3() {
    var width = 3;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Properties(this, {
      data: new Float32Array(buffer),
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
    var width = 2;
    var elementSize = Float32Array.BYTES_PER_ELEMENT;
    var buffer = new ArrayBuffer(width * width * elementSize);
    Properties(this, {
      data: new Float32Array(buffer),
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
System.registerModule("../src/utilities/ULInterleavedArray", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULInterleavedArray";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
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
System.registerModule("../src/webgl/GLContext", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLContext";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
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
System.registerModule("../src/utilities/ULResource", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULResource";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
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
System.registerModule("../src/webgl/GLUniformLocation", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLUniformLocation";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
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
System.registerModule("../src/utilities/ULUniforms", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "../src/utilities/ULUniforms";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL;
  var $__2 = System.get("../src/math/MLVector"),
      vec2 = $__2.vec2,
      vec3 = $__2.vec3,
      vec4 = $__2.vec4;
  var $__3 = System.get("../src/math/MLMatrix"),
      mat2 = $__3.mat2,
      mat3 = $__3.mat3,
      mat4 = $__3.mat4;
  System.get("../src/webgl/GLUniformLocation");
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
    Property(this, "value", 0.0, E | W);
  };
  ($traceurRuntime.createClass)(UniformFloat, {}, {}, Uniform);
  Properties(UniformFloat.prototype, {set: function(f) {
      if (f !== undefined)
        this.value = f;
      this.location.set1f(f);
    }});
  var UniformFloatVec2 = function UniformFloatVec2() {
    Property(this, "value", new vec2, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec2, {}, {}, UniformVector);
  Properties(UniformFloatVec2.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set2f(this.value);
      return this;
    }});
  var UniformFloatVec3 = function UniformFloatVec3() {
    Property(this, "value", new vec3, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec3, {}, {}, UniformVector);
  Properties(UniformFloatVec3.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set3f(this.value);
      return this;
    }});
  var UniformFloatVec4 = function UniformFloatVec4() {
    Property(this, "value", new vec4, E);
  };
  ($traceurRuntime.createClass)(UniformFloatVec4, {}, {}, UniformVector);
  Properties(UniformFloatVec4.prototype, {set: function(f) {
      if (f !== undefined)
        this.value.set(f);
      this.location.set4f(this.value);
      return this;
    }});
  var UniformFloatMat2 = function UniformFloatMat2() {
    Property(this, "value", new mat2, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat2, {}, {}, UniformVector);
  Properties(UniformFloatMat2.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat2(this.value.data);
      return this;
    }});
  var UniformFloatMat3 = function UniformFloatMat3() {
    Property(this, "value", new mat3, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat3, {}, {}, UniformVector);
  Properties(UniformFloatMat3.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat3(this.value.data);
      return this;
    }});
  var UniformFloatMat4 = function UniformFloatMat4() {
    Property(this, "value", new mat4, E);
  };
  ($traceurRuntime.createClass)(UniformFloatMat4, {}, {}, UniformVector);
  Properties(UniformFloatMat4.prototype, {set: function(m) {
      if (m !== undefined)
        this.value.copy(m);
      this.location.setMat4(this.value.data);
      return this;
    }});
  var UniformInt = function UniformInt() {
    Property(this, "value", 0, E | W);
  };
  ($traceurRuntime.createClass)(UniformInt, {}, {}, Uniform);
  Properties(UniformInt.prototype, {set: function(i) {
      if (i !== undefined)
        this.value = i;
      this.location.set1i(i);
      return this;
    }});
  var UniformIntVec2 = function UniformIntVec2() {
    Property(this, "value", new vec2, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec2, {}, {}, UniformVector);
  Properties(UniformIntVec2.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set2i(this.value);
      return this;
    }});
  var UniformIntVec3 = function UniformIntVec3() {
    Property(this, "value", new vec3, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec3, {}, {}, UniformVector);
  Properties(UniformIntVec3.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set3i(this.value);
      return this;
    }});
  var UniformIntVec4 = function UniformIntVec4() {
    Property(this, "value", new vec4, E);
  };
  ($traceurRuntime.createClass)(UniformIntVec4, {}, {}, UniformVector);
  Properties(UniformIntVec4.prototype, {set: function(i) {
      if (i !== undefined)
        this.value.set(i);
      this.location.set4i(this.value);
      return this;
    }});
  var UniformTexture2D = function UniformTexture2D() {
    $traceurRuntime.superConstructor($UniformTexture2D).apply(this, arguments);
  };
  var $UniformTexture2D = UniformTexture2D;
  ($traceurRuntime.createClass)(UniformTexture2D, {}, {}, UniformInt);
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
System.registerModule("../src/webgl/GLAttributeLocation", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLAttributeLocation";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
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
System.registerModule("../src/webgl/GLShader", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLShader";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
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
System.registerModule("../src/webgl/GLProgram", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLProgram";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation").default;
  var Shader = System.get("../src/webgl/GLShader").default;
  var Uniform = System.get("../src/utilities/ULUniforms").Uniform;
  var Resource = System.get("../src/utilities/ULResource").default;
  var Program = function Program() {
    return gl.createProgram();
  };
  ($traceurRuntime.createClass)(Program, {}, {
    VertexColors: function() {
      return gl.createProgram().attachShader(Shader.Vertex("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 texCoord;\n\t\t\tattribute vec4 color;\n\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec3 modelScale;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 worldVertex = modelMatrix * vec4( position * modelScale, 1. );\n\t\t\t\tvec4 viewVertex = viewMatrix * worldVertex;\n\t\t\t\tvec4 pos = projectionMatrix * viewVertex ;\n\t\t\t\tgl_Position = pos;\n\t\t\t\tgl_PointSize = -pos.z  + 6.;\n\t\t\t\tv_color = color;\n\t\t\t\tv_texCoord = texCoord;\n\t\t\t}\n\t\t")).attachShader(Shader.Fragment("\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec4 v_color;\n\t\t\tvarying vec2 v_texCoord;\n\n\t\t\tuniform float time;\n\t\t\tuniform sampler2D tex0;\n\n\t\t\tvoid main ( void ) {\n\t\t\t\tvec4 t = texture2D( tex0, v_texCoord );\n\t\t\t\t\n\t\t\t\tgl_FragColor = v_color;\n\t\t\t}\n\t\t")).bindLocations("position", "color", "normal", "texCoord").link().use();
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
        return program;
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
System.registerModule("../src/utilities/ULMaterial", [], function() {
  "use strict";
  var __moduleName = "../src/utilities/ULMaterial";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL,
      canvas = $__1.canvas;
  var Program = System.get("../src/webgl/GLProgram").default;
  var Shader = System.get("../src/webgl/GLShader").default;
  var currentProgram = null;
  var currentUniforms = null;
  var globalUsage = 0;
  var DEFAULT_PROGRAM = new Program.VertexColors;
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
    enabled: true,
    writeEnabled: true,
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
  }.E);
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
  var Material = function Material() {
    var program = arguments[0] !== (void 0) ? arguments[0] : DEFAULT_PROGRAM;
    this.usage = 0;
    this.polygonOffset = new PolygonOffset;
    this.alpha = new Alpha;
    this.depth = new DepthTest;
    this.stencil = new StencilTest;
    this.cullFace = new CullFace;
    this.scissor = new ScissorTest;
    this.dither = new Dither;
    this.multisample = new Multisample;
    this.setProgram(program);
  };
  ($traceurRuntime.createClass)(Material, {
    setProgram: function(program) {
      var uniforms = program.getUniforms.material;
      this.program = program;
      if (uniforms)
        this.uniforms = uniforms;
    },
    use: function() {
      if (this.program && currentProgram !== this.program)
        currentProgram = this.program.use();
      if (this.uniforms && currentUniforms !== this.uniforms)
        currentUniforms = this.uniforms.set();
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
      if (this.polygonOffset.enabled) {
        this.polygonOffset.enable();
        if (this.polygonOffset.fillSet)
          this.polygonOffset.setFill();
        else
          this.polygonOffset.unsetFill();
      } else
        this.polygonOffset.disable();
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
  }, {});
  var $__default = Material;
  Properties(Material, {}, E | C);
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
System.registerModule("../src/webgl/GLDraw", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLDraw";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
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
System.registerModule("../src/webgl/GLVertexBuffer", [], function() {
  "use strict";
  var $__3;
  var __moduleName = "../src/webgl/GLVertexBuffer";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
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
System.registerModule("../src/utilities/ULGeometryAttributes", [], function() {
  "use strict";
  var $__7,
      $__8,
      $__9,
      $__10;
  var __moduleName = "../src/utilities/ULGeometryAttributes";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL;
  var InterleavedArray = System.get("../src/utilities/ULInterleavedArray").default;
  var Buffer = System.get("../src/webgl/GLVertexBuffer").default;
  var Draw = System.get("../src/webgl/GLDraw").default;
  var Material = System.get("../src/utilities/ULMaterial").default;
  var VertexAttribute = function VertexAttribute(name, structure) {
    this.name = name;
    this.buffer = new Buffer.Vertex;
    this.data = structure.type ? structure.type : structure;
  };
  ($traceurRuntime.createClass)(VertexAttribute, {
    allocate: function(lengthOrData) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.STATIC_DRAW;
      var data = this.data;
      if (isNaN(lengthOrData)) {
        this.data = lengthOrData;
        this.buffer.data(lengthOrData, usage);
      } else {
        this.data = new data.constructor(length);
        this.buffer.data(lengthOrData * this.data.byteLength, usage);
      }
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.DYNAMIC_DRAW;
      var oldData = length < this.data.length ? this.data.subarray(0, length) : this.data;
      this.data = new oldData.constructor(length);
      this.data.set(oldData);
      this.buffer.data(this.data.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var length = arguments[1] !== (void 0) ? arguments[1] : this.data.length;
      return this.data.subarray(start, length);
    },
    set: function() {
      var bufferView = arguments[0] !== (void 0) ? arguments[0] : this.data;
      this.buffer.subData(bufferView, bufferView.byteOffset);
      return this;
    }
  }, {});
  Properties(VertexAttribute, {
    STATIC: GL.STATIC_DRAW,
    DYNAMIC: GL.DYNAMIC_DRAW,
    STREAM: GL.STREAM_DRAW
  });
  var DEFAULT_MATERIAL = new Material;
  var ElementAttribute = function ElementAttribute(name, data, material) {
    var drawType = arguments[3] !== (void 0) ? arguments[3] : GL.TRIANGLES;
    return new DATA_TYPES[data.constructor.name][drawType](name, data, material);
  };
  ($traceurRuntime.createClass)(ElementAttribute, {}, {}, VertexAttribute);
  var ElementAttribute8 = function ElementAttribute8(name, data) {
    var material = arguments[2] !== (void 0) ? arguments[2] : DEFAULT_MATERIAL;
    this.name = name;
    this.buffer = new Buffer.Index;
    this.data = data;
    this.material = material;
  };
  ($traceurRuntime.createClass)(ElementAttribute8, {}, {}, ElementAttribute);
  var ElementAttribute16 = function ElementAttribute16(name, data) {
    var material = arguments[2] !== (void 0) ? arguments[2] : DEFAULT_MATERIAL;
    this.name = name;
    this.buffer = new Buffer.Index;
    this.data = data;
    this.material = material;
  };
  ($traceurRuntime.createClass)(ElementAttribute16, {}, {}, ElementAttribute);
  var ElementAttribute32 = function ElementAttribute32(name, data) {
    var material = arguments[2] !== (void 0) ? arguments[2] : DEFAULT_MATERIAL;
    this.name = name;
    this.buffer = new Buffer.Index;
    this.data = data;
    this.material = material;
  };
  ($traceurRuntime.createClass)(ElementAttribute32, {}, {}, ElementAttribute);
  var PointsInt8 = function PointsInt8() {
    $traceurRuntime.superConstructor($PointsInt8).apply(this, arguments);
  };
  var $PointsInt8 = PointsInt8;
  ($traceurRuntime.createClass)(PointsInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.POINTS, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var PointsInt16 = function PointsInt16() {
    $traceurRuntime.superConstructor($PointsInt16).apply(this, arguments);
  };
  var $PointsInt16 = PointsInt16;
  ($traceurRuntime.createClass)(PointsInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.POINTS, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var PointsInt32 = function PointsInt32() {
    $traceurRuntime.superConstructor($PointsInt32).apply(this, arguments);
  };
  var $PointsInt32 = PointsInt32;
  ($traceurRuntime.createClass)(PointsInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.POINTS, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var LinesInt8 = function LinesInt8() {
    $traceurRuntime.superConstructor($LinesInt8).apply(this, arguments);
  };
  var $LinesInt8 = LinesInt8;
  ($traceurRuntime.createClass)(LinesInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINES, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var LinesInt16 = function LinesInt16() {
    $traceurRuntime.superConstructor($LinesInt16).apply(this, arguments);
  };
  var $LinesInt16 = LinesInt16;
  ($traceurRuntime.createClass)(LinesInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINES, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var LinesInt32 = function LinesInt32() {
    $traceurRuntime.superConstructor($LinesInt32).apply(this, arguments);
  };
  var $LinesInt32 = LinesInt32;
  ($traceurRuntime.createClass)(LinesInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINES, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var LineStripInt8 = function LineStripInt8() {
    $traceurRuntime.superConstructor($LineStripInt8).apply(this, arguments);
  };
  var $LineStripInt8 = LineStripInt8;
  ($traceurRuntime.createClass)(LineStripInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_STRIP, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var LineStripInt16 = function LineStripInt16() {
    $traceurRuntime.superConstructor($LineStripInt16).apply(this, arguments);
  };
  var $LineStripInt16 = LineStripInt16;
  ($traceurRuntime.createClass)(LineStripInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_STRIP, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var LineStripInt32 = function LineStripInt32() {
    $traceurRuntime.superConstructor($LineStripInt32).apply(this, arguments);
  };
  var $LineStripInt32 = LineStripInt32;
  ($traceurRuntime.createClass)(LineStripInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_STRIP, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var LineLoopInt8 = function LineLoopInt8() {
    $traceurRuntime.superConstructor($LineLoopInt8).apply(this, arguments);
  };
  var $LineLoopInt8 = LineLoopInt8;
  ($traceurRuntime.createClass)(LineLoopInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_LOOP, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var LineLoopInt16 = function LineLoopInt16() {
    $traceurRuntime.superConstructor($LineLoopInt16).apply(this, arguments);
  };
  var $LineLoopInt16 = LineLoopInt16;
  ($traceurRuntime.createClass)(LineLoopInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_LOOP, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var LineLoopInt32 = function LineLoopInt32() {
    $traceurRuntime.superConstructor($LineLoopInt32).apply(this, arguments);
  };
  var $LineLoopInt32 = LineLoopInt32;
  ($traceurRuntime.createClass)(LineLoopInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.LINE_LOOP, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var TrianglesInt8 = function TrianglesInt8() {
    $traceurRuntime.superConstructor($TrianglesInt8).apply(this, arguments);
  };
  var $TrianglesInt8 = TrianglesInt8;
  ($traceurRuntime.createClass)(TrianglesInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLES, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var TrianglesInt16 = function TrianglesInt16() {
    $traceurRuntime.superConstructor($TrianglesInt16).apply(this, arguments);
  };
  var $TrianglesInt16 = TrianglesInt16;
  ($traceurRuntime.createClass)(TrianglesInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLES, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var TrianglesInt32 = function TrianglesInt32() {
    $traceurRuntime.superConstructor($TrianglesInt32).apply(this, arguments);
  };
  var $TrianglesInt32 = TrianglesInt32;
  ($traceurRuntime.createClass)(TrianglesInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLES, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var TriangleStripInt8 = function TriangleStripInt8() {
    $traceurRuntime.superConstructor($TriangleStripInt8).apply(this, arguments);
  };
  var $TriangleStripInt8 = TriangleStripInt8;
  ($traceurRuntime.createClass)(TriangleStripInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_STRIP, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var TriangleStripInt16 = function TriangleStripInt16() {
    $traceurRuntime.superConstructor($TriangleStripInt16).apply(this, arguments);
  };
  var $TriangleStripInt16 = TriangleStripInt16;
  ($traceurRuntime.createClass)(TriangleStripInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_STRIP, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var TriangleStripInt32 = function TriangleStripInt32() {
    $traceurRuntime.superConstructor($TriangleStripInt32).apply(this, arguments);
  };
  var $TriangleStripInt32 = TriangleStripInt32;
  ($traceurRuntime.createClass)(TriangleStripInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_STRIP, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var TriangleFanInt8 = function TriangleFanInt8() {
    $traceurRuntime.superConstructor($TriangleFanInt8).apply(this, arguments);
  };
  var $TriangleFanInt8 = TriangleFanInt8;
  ($traceurRuntime.createClass)(TriangleFanInt8, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_FAN, count, GL.UNSIGNED_BYTE, offset);
      return this;
    }}, {}, ElementAttribute8);
  ;
  var TriangleFanInt16 = function TriangleFanInt16() {
    $traceurRuntime.superConstructor($TriangleFanInt16).apply(this, arguments);
  };
  var $TriangleFanInt16 = TriangleFanInt16;
  ($traceurRuntime.createClass)(TriangleFanInt16, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_FAN, count, GL.UNSIGNED_SHORT, offset);
      return this;
    }}, {}, ElementAttribute16);
  ;
  var TriangleFanInt32 = function TriangleFanInt32() {
    $traceurRuntime.superConstructor($TriangleFanInt32).apply(this, arguments);
  };
  var $TriangleFanInt32 = TriangleFanInt32;
  ($traceurRuntime.createClass)(TriangleFanInt32, {draw: function() {
      var count = arguments[0] !== (void 0) ? arguments[0] : this.data.length;
      var offset = arguments[1] !== (void 0) ? arguments[1] : 0;
      this.material.use();
      this.buffer.bind();
      gl.drawElements(GL.TRIANGLE_FAN, count, GL.UNSIGNED_INT, offset);
      return this;
    }}, {}, ElementAttribute32);
  ;
  var DATA_TYPES = ($__10 = {}, Object.defineProperty($__10, "Uint8Array", {
    value: ($__7 = {}, Object.defineProperty($__7, GL.POINTS, {
      value: PointsInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.LINES, {
      value: LinesInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.LINE_STRIP, {
      value: LineStripInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.LINE_LOOP, {
      value: LineLoopInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.TRIANGLES, {
      value: TrianglesInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.TRIANGLE_STRIP, {
      value: TriangleStripInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__7, GL.TRIANGLE_FAN, {
      value: TriangleFanInt8,
      configurable: true,
      enumerable: true,
      writable: true
    }), $__7),
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__10, "Uint16Array", {
    value: ($__8 = {}, Object.defineProperty($__8, GL.POINTS, {
      value: PointsInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.LINES, {
      value: LinesInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.LINE_STRIP, {
      value: LineStripInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.LINE_LOOP, {
      value: LineLoopInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.TRIANGLES, {
      value: TrianglesInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.TRIANGLE_STRIP, {
      value: TriangleStripInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__8, GL.TRIANGLE_FAN, {
      value: TriangleFanInt16,
      configurable: true,
      enumerable: true,
      writable: true
    }), $__8),
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__10, "Uint32Array", {
    value: ($__9 = {}, Object.defineProperty($__9, GL.POINTS, {
      value: PointsInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.LINES, {
      value: LinesInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.LINE_STRIP, {
      value: LineStripInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.LINE_LOOP, {
      value: LineLoopInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.TRIANGLES, {
      value: TrianglesInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.TRIANGLE_STRIP, {
      value: TriangleStripInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__9, GL.TRIANGLE_FAN, {
      value: TriangleFanInt32,
      configurable: true,
      enumerable: true,
      writable: true
    }), $__9),
    configurable: true,
    enumerable: true,
    writable: true
  }), $__10);
  var VertexAttributeGroup = function VertexAttributeGroup(name, structure) {
    this.name = name;
    this.buffer = new Buffer.Vertex;
    this.data = new InterleavedArray(structure);
  };
  ($traceurRuntime.createClass)(VertexAttributeGroup, {
    allocate: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.DYNAMIC_DRAW;
      this.data.allocate(length);
      this.view = new this.data.type(this.data.buffer);
      this.buffer.data(this.view.byteLength, usage);
      return this;
    },
    resize: function(length) {
      var usage = arguments[1] !== (void 0) ? arguments[1] : GL.DYNAMIC_DRAW;
      this.data.resize(length);
      this.view = new this.data.type(this.data.buffer);
      this.buffer.data(this.view.byteLength, usage);
      return this;
    },
    createView: function() {
      var start = arguments[0] !== (void 0) ? arguments[0] : 0;
      var length = arguments[1] !== (void 0) ? arguments[1] : this.data.maxLength;
      var size = this.data.type.BYTES_PER_ELEMENT;
      var stride = this.data.stride;
      var buffer = this.data.buffer;
      return new this.data.type(buffer, start * stride, length * stride / size);
    },
    set: function() {
      var bufferView = arguments[0] !== (void 0) ? arguments[0] : this.view;
      this.buffer.subData(bufferView, bufferView.byteOffset);
      return this;
    }
  }, {}, VertexAttribute);
  return {
    get VertexAttribute() {
      return VertexAttribute;
    },
    get ElementAttribute() {
      return ElementAttribute;
    },
    get ElementAttribute8() {
      return ElementAttribute8;
    },
    get ElementAttribute16() {
      return ElementAttribute16;
    },
    get ElementAttribute32() {
      return ElementAttribute32;
    },
    get PointsInt8() {
      return PointsInt8;
    },
    get PointsInt16() {
      return PointsInt16;
    },
    get PointsInt32() {
      return PointsInt32;
    },
    get LinesInt8() {
      return LinesInt8;
    },
    get LinesInt16() {
      return LinesInt16;
    },
    get LinesInt32() {
      return LinesInt32;
    },
    get LineStripInt8() {
      return LineStripInt8;
    },
    get LineStripInt16() {
      return LineStripInt16;
    },
    get LineStripInt32() {
      return LineStripInt32;
    },
    get LineLoopInt8() {
      return LineLoopInt8;
    },
    get LineLoopInt16() {
      return LineLoopInt16;
    },
    get LineLoopInt32() {
      return LineLoopInt32;
    },
    get TrianglesInt8() {
      return TrianglesInt8;
    },
    get TrianglesInt16() {
      return TrianglesInt16;
    },
    get TrianglesInt32() {
      return TrianglesInt32;
    },
    get TriangleStripInt8() {
      return TriangleStripInt8;
    },
    get TriangleStripInt16() {
      return TriangleStripInt16;
    },
    get TriangleStripInt32() {
      return TriangleStripInt32;
    },
    get TriangleFanInt8() {
      return TriangleFanInt8;
    },
    get TriangleFanInt16() {
      return TriangleFanInt16;
    },
    get TriangleFanInt32() {
      return TriangleFanInt32;
    },
    get VertexAttributeGroup() {
      return VertexAttributeGroup;
    }
  };
});
System.registerModule("../src/webgl/GLVertexArrayObject", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLVertexArrayObject";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL,
      extensions = $__1.extensions;
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
System.registerModule("../src/utilities/ULGeometry", [], function() {
  "use strict";
  var $__8;
  var __moduleName = "../src/utilities/ULGeometry";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/utilities/ULGeometryAttributes"),
      VertexAttribute = $__1.VertexAttribute,
      VertexAttributeGroup = $__1.VertexAttributeGroup;
  var $__2 = System.get("../src/webgl/GLContext"),
      gl = $__2.gl,
      GL = $__2.GL;
  var VertexArrayObject = System.get("../src/webgl/GLVertexArrayObject").default;
  var AttributeLocation = System.get("../src/webgl/GLAttributeLocation").default;
  var Material = System.get("../src/utilities/ULMaterial").default;
  var Draw = System.get("../src/webgl/GLDraw").default;
  var DEFAULT_MATERIAL = new Material;
  var Geometry = function Geometry() {
    var material = arguments[0] !== (void 0) ? arguments[0] : DEFAULT_MATERIAL;
    Properties(this, {
      bindings: new VertexArrayObject,
      material: material
    });
  };
  var $Geometry = Geometry;
  ($traceurRuntime.createClass)(Geometry, {}, {
    Cube: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "cube";
      var x1 = arguments[1] !== (void 0) ? arguments[1] : 1;
      var x2 = arguments[2] !== (void 0) ? arguments[2] : -1;
      var y1 = arguments[3] !== (void 0) ? arguments[3] : x1;
      var y2 = arguments[4] !== (void 0) ? arguments[4] : x2;
      var z1 = arguments[5] !== (void 0) ? arguments[5] : x1;
      var z2 = arguments[6] !== (void 0) ? arguments[6] : x2;
      var $__9 = $Geometry.Cube.options,
          structure = $__9.structure,
          colorIterator = $__9.colorIterator,
          usage = $__9.usage;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, 8, usage);
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
          colorIterator(vertex, i$__13);
        }
      }
      if (texCoord) {}
      if (normal) {}
      attribute.set();
      return geometry;
    },
    Sphere: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "sphere";
      var longitude = arguments[1] !== (void 0) ? arguments[1] : 10;
      var latitude = arguments[2] !== (void 0) ? arguments[2] : 10;
      var radius = arguments[3] !== (void 0) ? arguments[3] : 1;
      var $__9 = $Geometry.Sphere.options,
          structure = $__9.structure,
          colorIterator = $__9.colorIterator,
          usage = $__9.usage;
      var $__10 = Math,
          PI = $__10.PI,
          sin = $__10.sin,
          cos = $__10.cos;
      var geometry = new $Geometry;
      geometry.createVertexAttributeGroup(name, structure, longitude * latitude, usage);
      var attribute = geometry[name];
      var vertex = attribute.view;
      var stride = attribute.data.stride / vertex.BYTES_PER_ELEMENT;
      var $__11 = attribute.data.structure,
          position = $__11.position,
          color = $__11.color,
          texCoord = $__11.texCoord,
          normal = $__11.normal;
      for (var lat = 1; lat <= (latitude + 1); lat++) {
        var theta = lat * PI / (latitude + 1);
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);
        for (var lon = 0; lon <= longitude; lon++) {
          var phi = lon * 2 * PI / longitude;
          var sinPhi = sin(phi);
          var cosPhi = cos(phi);
          var index = ((lat - 1) * longitude + lon) * stride;
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
            colorIterator(vertex, index + offset$__14, lat / latitude, lon / longitude);
          }
          if (normal) {
            var offset$__15 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__16 = index + offset$__15;
            vertex[i$__16] = x;
            vertex[i$__16 + 1] = y;
            vertex[i$__16 + 2] = z;
          }
          if (texCoord) {
            var offset$__17 = normal.offset / vertex.BYTES_PER_ELEMENT;
            var i$__18 = index + offset$__17;
            vertex[i$__18] = 1 - lon / longitude;
            vertex[i$__18 + 1] = lat / latitude;
          }
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
  Properties(Geometry.Cube, {options: {
      structure: {
        position: {type: new Float32Array([0, 0, 0])},
        color: {type: new Float32Array([0, 1, 0, 1])},
        normal: {type: new Float32Array([1, 1, 1])},
        texCoord: {type: new Float32Array([0, 0])}
      },
      colorIterator: function(data, offset) {
        data[offset] = Math.random();
        data[offset + 1] = Math.random();
        data[offset + 2] = Math.random();
        data[offset + 3] = 1;
      },
      usage: GL.DYNAMIC_DRAW
    }});
  Properties(Geometry.Sphere, {options: {
      structure: {
        position: {type: new Float32Array([0, 0, 0])},
        color: {type: new Float32Array([0, 1, 0, 1])},
        normal: {type: new Float32Array([1, 1, 1])},
        texCoord: {type: new Float32Array([0, 0])}
      },
      colorIterator: function(data, offset, latitude, longitude) {
        data[offset] = latitude;
        data[offset + 1] = .1 * Math.random();
        data[offset + 2] = 1 - latitude;
        data[offset + 3] = 1;
      },
      usage: GL.DYNAMIC_DRAW
    }});
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
    value: function() {
      var offset = arguments[0] !== (void 0) ? arguments[0] : 0;
      var count = arguments[1] !== (void 0) ? arguments[1] : this.getLength;
      this.use();
      this.material.use();
      gl.drawArrays(GL.POINTS, offset, count);
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
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var GL = System.get("../src/webgl/GLContext").GL;
  var $__2 = System.get("../src/math/MLVector"),
      vec2 = $__2.vec2,
      vec3 = $__2.vec3,
      vec4 = $__2.vec4;
  var $__3 = System.get("../src/math/MLMatrix"),
      mat2 = $__3.mat2,
      mat3 = $__3.mat3,
      mat4 = $__3.mat4;
  var ElementAttribute = System.get("../src/utilities/ULGeometryAttributes").ElementAttribute;
  var Geometry = System.get("../src/utilities/ULGeometry").default;
  var Material = System.get("../src/utilities/ULMaterial").default;
  var Mesh = function Mesh() {
    var geometry = arguments[0] !== (void 0) ? arguments[0] : new Geometry;
    var graph = arguments[1] !== (void 0) ? arguments[1] : {};
    this.geometry = geometry;
    this.matrix = new mat4;
    this.faces = faces;
    this.vertices = vertices;
    this.elements = {};
  };
  var $Mesh = Mesh;
  ($traceurRuntime.createClass)(Mesh, {
    createElement: function(name, data, type, usage, material) {
      var element = new ElementAttribute(name, data, material, type);
      element.allocate(data, usage);
      return this.attachElement(element);
    },
    attachElement: function(element) {
      this.elements[element.name] = element;
      return this;
    },
    use: function() {
      this.geometry.use();
    },
    draw: function() {
      for (var element in this.elements) {
        this.elements[element].draw();
      }
    }
  }, {
    Cube: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "cube";
      var geometry = Geometry.Cube(name);
      var vertex = new VertexPtr(geometry);
      var $__8 = $Mesh.Cube.options,
          triangles = $__8.triangles,
          lines = $__8.lines,
          points = $__8.points;
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
        mesh.createElement(name + "Triangles", new Uint8Array([2, 0, 3, 3, 0, 1, 5, 3, 7, 7, 3, 1, 6, 7, 0, 0, 7, 1, 4, 6, 2, 2, 6, 0, 4, 5, 6, 6, 5, 7, 4, 2, 5, 5, 2, 3]), GL.TRIANGLES, GL.DYNAMIC_DRAW);
      if (lines)
        mesh.createElement(name + "Lines", new Uint8Array([0, 1, 2, 3, 2, 0, 3, 1, 0, 6, 1, 7, 2, 4, 3, 5, 4, 5, 6, 7, 4, 6, 5, 7]), GL.LINES, GL.DYNAMIC_DRAW);
      if (points)
        mesh.createElement(name + "Points", new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]), GL.POINTS, GL.DYNAMIC_DRAW);
      return mesh;
    },
    Sphere: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "sphere";
      var l = arguments[1];
    }
  });
  var $__default = Mesh;
  Properties(Mesh.Cube, {options: {
      triangles: true,
      lines: true,
      points: false
    }});
  Properties(Mesh.Sphere, {options: {
      triangles: true,
      lines: false,
      points: false
    }});
  var VertexPtr = function VertexPtr(geometry) {
    this.geometry = geometry;
  };
  ($traceurRuntime.createClass)(VertexPtr, {pointTo: function(index) {
      var v = Object.create(this);
      v.index = index;
      return v;
    }}, {});
  var Face = function Face(vPtrA, vPtrB, vPtrC) {
    var hA = new Halfedge(vPtrA, this);
    var hB = new Halfedge(vPtrB, this);
    var hC = new Halfedge(vPtrC, this);
    hA.setNeighbors(hC, hB);
    hB.setNeighbors(hA, hC);
    hC.setNeighbors(hB, hA);
    this.hEdgeA = hA;
  };
  ($traceurRuntime.createClass)(Face, {setEdges: function(oppositeHalfedgeA, oppositeHalfedgeB, oppositeHalfedgeC) {
      this.hEdgeA.opposite = oppositeHalfedgeA;
      this.hEdgeB.opposite = oppositeHalfedgeB;
      this.hEdgeC.opposite = oppositeHalfedgeC;
    }}, {});
  Getters(Face.prototype, {
    hEdgeB: function() {
      return this.hEdgeA.next;
    },
    hEdgeC: function() {
      return this.hEdgeA.prev;
    }
  });
  var Halfedge = function Halfedge(toVertex, belongsToFace) {
    this.toVertex = toVertex;
    this.fromFace = belongsToFace;
    this.opposite = null;
    this.prev = null;
    this.next = null;
  };
  ($traceurRuntime.createClass)(Halfedge, {setNeighbors: function(previousHalfedge, nextHalfedge) {
      this.prev = previousHalfedge;
      this.next = nextHalfedge;
    }}, {});
  return {
    get default() {
      return $__default;
    },
    get VertexPtr() {
      return VertexPtr;
    },
    get Face() {
      return Face;
    },
    get Halfedge() {
      return Halfedge;
    }
  };
});
System.registerModule("../src/webgl/GLTexture", [], function() {
  "use strict";
  var __moduleName = "../src/webgl/GLTexture";
  var $__0 = System.get("../src/utilities/ULPropertyDescriptors"),
      Property = $__0.Property,
      Properties = $__0.Properties,
      Getters = $__0.Getters,
      Setters = $__0.Setters,
      GetterSetters = $__0.GetterSetters,
      E = $__0.E,
      C = $__0.C,
      W = $__0.W;
  var $__1 = System.get("../src/webgl/GLContext"),
      gl = $__1.gl,
      GL = $__1.GL;
  var Texture = function Texture() {
    var target = arguments[0] !== (void 0) ? arguments[0] : GL.TEXTURE_2D;
    var texture = gl.createTexture();
    Properties(texture, {target: target});
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
  Properties(WebGLTexture, {
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
System.registerModule("../src/header.js", [], function() {
  "use strict";
  var __moduleName = "../src/header.js";
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
  try {
    parent.main();
  } catch (err) {
    console.warn(err.stack);
  }
  return {};
});
System.get("../src/header.js" + '');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzQiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIi4uL3NyYy91dGlsaXRpZXMvVUxQcm9wZXJ0eURlc2NyaXB0b3JzLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiLi4vc3JjL21hdGgvTUxWZWN0b3IuanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE5IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE4IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEyIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE3IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE0IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE1IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE2IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTEiLCIuLi9zcmMvbWF0aC9NTE1hdHJpeC5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxJbnRlcmxlYXZlZEFycmF5LmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIwIiwiLi4vc3JjL3dlYmdsL0dMQ29udGV4dC5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMSIsIi4uL3NyYy91dGlsaXRpZXMvVUxSZXNvdXJjZS5qcyIsIi4uL3NyYy93ZWJnbC9HTFVuaWZvcm1Mb2NhdGlvbi5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMiIsIi4uL3NyYy91dGlsaXRpZXMvVUxVbmlmb3Jtcy5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMyIsIi4uL3NyYy93ZWJnbC9HTEF0dHJpYnV0ZUxvY2F0aW9uLmpzIiwiLi4vc3JjL3dlYmdsL0dMU2hhZGVyLmpzIiwiLi4vc3JjL3dlYmdsL0dMUHJvZ3JhbS5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxNYXRlcmlhbC5qcyIsIi4uL3NyYy93ZWJnbC9HTERyYXcuanMiLCIuLi9zcmMvd2ViZ2wvR0xWZXJ0ZXhCdWZmZXIuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMR2VvbWV0cnlBdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL3dlYmdsL0dMVmVydGV4QXJyYXlPYmplY3QuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMR2VvbWV0cnkuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMTWVzaC5qcyIsIi4uL3NyYy93ZWJnbC9HTFRleHR1cmUuanMiLCIuLi9zcmMvaGVhZGVyLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUssZUFBZSxBQUFDLDBDQUFvQixHQUFDLENDQTFDLFVBQVMsQUFBRDs7QUNBUixBQUFJLElBQUEsQ0FBQSxZQUFXLDJDQUFvQixDQUFDO0FDQTdCLEFBQU0sSUFBQSxDQUFBLENBQUEsRUFBSSxFQUFJLENBQUM7QUFDZixBQUFNLElBQUEsQ0FBQSxDQUFBLEVBQUksRUFBSSxDQUFDO0FBQ2YsQUFBTSxJQUFBLENB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QUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDM0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMzRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFM0QsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2hFLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNoRSxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUMsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEUsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLEVBQUMsQ0FBSTtBQUNWLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBRSxDQUFFLElBQUcsQ0FBRyxHQUFDLENBQUUsQ0FBQztJQUM3QjtBQUFBLEVBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBTSxBQUFDLENBQUUsSUFBRyxVQUFVLENBQUc7QUFDeEIsWUFBUSxDQUFSLFVBQVksQUFBRixDQUFJO0FBQ2IsV0FBTyxDQUFBLElBQUcsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0lBQzFGO0FBQ0EsY0FBVSxDQUFWLFVBQWMsQUFBRixDQUFJO0FBQ2YsV0FBTyxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUM7SUFDN0U7QUFDQSxxQkFBaUIsQ0FBakIsVUFBcUIsQUFBRixDQUFJO0FBQ3RCLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0lBQzdFO0FBQUEsRUFDRCxDQUFHLEVBQUEsQ0FBRSxDQUFDO0FDdE5OLEFBQUksSUFBQSxPRHdORyxTQUFNLEtBQUcsQ0FDRCxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUk7QUFDMUIsU0FBSyxlQUFlLEFBQUUsQ0FBRSxJQUFHLENBQUcsU0FBTyxDQUFHLEVBQUUsS0FBSSxDQUFJLEVBQUEsQ0FBRSxDQUFFLENBQUM7QUFDdkQsT0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxHQUFLLEVBQUEsQ0FBQztBQUNsQixPQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEdBQUssRUFBQSxDQUFDO0FBQ2xCLE9BQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsR0FBSyxFQUFBLENBQUM7QUFDbEIsT0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxHQUFLLEVBQUEsQ0FBQztFQUNuQixBQy9OdUMsQ0FBQTtBQ0F4QyxBQUFJLElBQUEsYUFBb0MsQ0FBQTtBV0F4QyxFQUFDLGVBQWMsWUFBWSxDQUFDLEFBQUM7QWJpT3JCLFFBQUksQ0FBWCxVQUFlLEVBQUMsQ0FBSTtBQUFFLFdBQU8sQ0FBQSxTQUFRLEVBQUMsS0FBSyxBQUFDLENBQUUsRUFBQyxDQUFFLENBQUM7SUFBRTtBQUM3QyxNQUFFLENBQVQsVUFBYSxFQUFDLENBQUcsQ0FBQSxFQUFDLENBQUk7QUFBRSxXQUFPLENBQUEsU0FBUSxFQUFDLElBQUksQUFBQyxDQUFFLEVBQUMsQ0FBRyxHQUFDLENBQUUsQ0FBQztJQUFFO0FBQ2xELE1BQUUsQ0FBVCxVQUFhLEVBQUMsQ0FBRyxDQUFBLEVBQUMsQ0FBSTtBQUFFLFdBQU8sQ0FBQSxTQUFRLEVBQUMsSUFBSSxBQUFDLENBQUUsRUFBQyxDQUFHLEdBQUMsQ0FBQyxDQUFDO0lBQUU7QUFDakQsV0FBTyxDQUFkLFVBQWtCLEVBQUMsQ0FBRyxDQUFBLEVBQUMsQ0FBSTtBQUFFLFdBQU8sQ0FBQSxTQUFRLEVBQUMsU0FBUyxBQUFDLENBQUUsRUFBQyxDQUFHLEdBQUMsQ0FBRSxDQUFDO0lBQUU7QUFDNUQsTUFBRSxDQUFULFVBQWEsRUFBQyxDQUFHLENBQUEsRUFBQyxDQUFJO0FBQ3JCLFdBQU8sQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7SUFDckY7QUFBQSxHQWZ5QixPQUFLLENhdk55QjtBYndPeEQsV0FBUyxBQUFDLENBQUUsSUFBRyxVQUFVLENBQUc7QUFDM0IsTUFBRSxDQUFGLFVBQU0sRUFBQyxDQUFJO0FBQ1YsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ25CLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNuQixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDbkIsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ25CLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENBQUYsVUFBTSxFQUFDLEFBQVcsQ0FBSTtRQUFaLEdBQUMsNkNBQUksS0FBRztBQUNqQixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLEVBQUMsQUFBVyxDQUFJO1FBQVosR0FBQyw2Q0FBSSxLQUFHO0FBQ2pCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsRUFBQyxBQUFXLENBQUk7UUFBWixHQUFDLDZDQUFJLEtBQUc7QUFDdEIsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUM3QixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDN0IsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzdCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxPQUFHLENBQUgsVUFBTyxFQUFDLENBQUk7QUFDWCxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDbkIsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ25CLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNuQixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFbkIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLE1BQUUsQ0FBRixVQUFNLEVBQUMsQ0FBSTtBQUNWLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLElBQUcsQ0FBRyxHQUFDLENBQUUsQ0FBQztJQUM1QjtBQUFBLEVBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBTSxBQUFDLENBQUUsSUFBRyxVQUFVLENBQUc7QUFDeEIsWUFBUSxDQUFSLFVBQVksQUFBRixDQUFJO0FBQ2IsV0FBTyxDQUFBLElBQUcsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7SUFDbEg7QUFDQSxjQUFVLENBQVYsVUFBYyxBQUFGLENBQUk7QUFDZixXQUFPLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLElBQUcsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsSUFBRyxDQUFHLENBQUEsQ0FBRSxDQUFDO0lBQ3JHO0FBQ0EscUJBQWlCLENBQWpCLFVBQXFCLEFBQUYsQ0FBSTtBQUN0QixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxJQUFHLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztJQUNyRztBQUFBLEVBQ0QsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQzVSTixBQUFJLElBQUEsUUQ4UkcsU0FBTSxNQUFJLENBQ0YsQUFBeUIsQ0FBSTtNQUE3QixFQUFBLDZDQUFJLEVBQUE7TUFBRyxFQUFBLDZDQUFJLEVBQUE7TUFBRyxFQUFBLDZDQUFJLEVBQUE7TUFBRyxFQUFBLDZDQUFJLEVBQUE7QUFDdEMsU0FBSyxlQUFlLEFBQUUsQ0FBRSxJQUFHLENBQUcsU0FBTyxDQUFHLEVBQUUsS0FBSSxDQUFJLEVBQUEsQ0FBRSxDQUFFLENBQUM7QUFDdkQsT0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUNiLE9BQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDYixPQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ2IsT0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztFQUNkLEFDclN1QyxDQUFBO0FDQXhDLEFBQUksSUFBQSxlQUFvQyxDQUFBO0FXQXhDLEVBQUMsZUFBYyxZQUFZLENBQUMsQUFBQztBYnVTckIsUUFBSSxDQUFYLFVBQWUsRUFBQyxDQUFJO0FBQUUsV0FBTyxDQUFBLFVBQVMsRUFBQyxJQUFJLEFBQUMsQ0FBRSxFQUFDLENBQUUsQ0FBQztJQUFFO0FBQzdDLFlBQVEsQ0FBZixVQUFtQixJQUFHLENBQUcsQ0FBQSxLQUFJLENBQUk7QUFBRSxXQUFPLENBQUEsVUFBUyxFQUFDLFVBQVUsQUFBQyxDQUFFLElBQUcsQ0FBRyxNQUFJLENBQUUsQ0FBQztJQUFFO0FBQ3pFLFdBQU8sQ0FBZCxVQUFrQixFQUFDLENBQUcsQ0FBQSxFQUFDLENBQUk7QUFBRSxXQUFPLENBQUEsVUFBUyxFQUFDLFNBQVMsQUFBQyxDQUFFLEVBQUMsQ0FBRyxHQUFDLENBQUUsQ0FBQztJQUFFO0FBQUEsR0FYMUMsT0FBSyxDYTdSd0I7QWIwU3hELFdBQVMsQUFBQyxDQUFFLEtBQUksVUFBVSxDQUFHO0FBQzVCLE1BQUUsQ0FBRixVQUFNLEVBQUMsQ0FBSTtBQUNWLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNuQixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDbkIsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ25CLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUNuQixXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsV0FBTyxDQUFQLFVBQVcsQUFBRixDQUFJO0FBQ1osU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUNiLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDYixTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ2IsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUNiLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxXQUFPLENBQVAsVUFBVyxFQUFDLEFBQXdCLENBQUk7UUFBekIsR0FBQyw2Q0FBSSxDQUFBLEtBQUksTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFDO0FBQ25DLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN2QixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUNsQixNQUFBO0FBQ0gsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFLLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQ2xCLE1BQUE7QUFDSCxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUssQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcs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QUFJLENBQUEsVUFBUyxVQUFVLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDdkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUc1QyxBQUFJLFFBQUEsQ0FBQSxXQUFVLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDcEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFL0IsU0FBSSxJQUFHLElBQUksQUFBQyxDQUFFLFdBQVUsQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDOztBQUNoRSxhQUFPLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBRSxDQUFBLEVBQUksWUFBVSxDQUFDLENBQUM7QUFBQSxJQUNsRDtBQUNBLFlBQVEsQ0FBUixVQUFZLENBQUEsQ0FBSTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXRFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxpQkFBYSxDQUFiLFVBQWlCLENBQUEsQ0FBSTtBQUNwQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsTUFBRSxDQUFGLFVBQU0sQ0FBQSxBQUFVLENBQUk7UUFBWCxFQUFBLDZDQUFJLEtBQUc7QUFDZixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3pCLENBQUM7SUFDRjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBVSxDQUFLO1FBQVosRUFBQSw2Q0FBSSxLQUFHO0FBQ3BCLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNaLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDM0IsQ0FBQztJQUNGO0FBQ0EsY0FBVSxDQUFWLFVBQWMsQUFBRixDQUFJO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM5QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRzdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsV0FBTyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7SUFDakU7QUFDQSxTQUFLLENBQUwsVUFBUyxHQUFFLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxFQUFDLENBQUk7QUFDMUIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUNaLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFlBQVcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFHLE9BQUssQ0FBRSxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBRW5ELFNBQUssQ0FBQSxVQUFVLElBQU0sRUFBQTtBQUFJLFFBQUEsRUFBSSxDQUFBLENBQUEsSUFBSSxBQUFDLENBQUUsRUFBQyxDQUFFLENBQUM7QUFBQSxBQUVwQyxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsWUFBVyxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7QUFFL0MsU0FBSSxDQUFBLFVBQVUsSUFBTSxFQUFBLENBQUk7QUFDdkIsUUFBQSxFQUFFLEdBQUssT0FBSyxDQUFDO0FBQ2IsUUFBQSxFQUFJLENBQUEsQ0FBQSxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7TUFDakM7QUFBQSxBQUVJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLE1BQU0sQUFBQyxDQUFFLENBQUEsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDaEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2hFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoRSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBRUEsVUFBTSxDQUFOLFVBQVUsSUFBRyxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFJO0FBQy9DLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUEsQ0FBSSxFQUFFLEtBQUksRUFBSSxLQUFHLENBQUUsQ0FBQztBQUNuQyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFFbkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxLQUFJLEVBQUksS0FBRyxDQUFFLEVBQUksRUFBRSxLQUFJLEVBQUksS0FBRyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxHQUFFLEVBQUksT0FBSyxDQUFFLEVBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQyxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsQ0FBQSxDQUFJLEVBQUUsR0FBRSxFQUFJLEtBQUcsQ0FBRSxDQUFDO0FBQ3hDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsQ0FBQSxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksS0FBRyxDQUFFLENBQUM7QUFFekMsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUE7SUFDRDtBQUNBLGVBQVcsQ0FBWCxVQUFlLElBQUcsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUNwRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxLQUFJLEVBQUksS0FBRyxDQUFDO0FBQ3BCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLEdBQUUsRUFBSSxPQUFLLENBQUM7QUFDcEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsR0FBRSxFQUFJLEtBQUcsQ0FBQztBQUVsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxNQUFJLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxPQUFLLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxJQUFFLENBQUUsRUFBTSxFQUFDLENBQUEsQ0FBQztBQUU3QixNQUFBLEVBQUssQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQ1YsTUFBQSxFQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUNWLE1BQUEsRUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRVYsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUNBLGNBQVUsQ0FBVixVQUFjLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUN0QyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxHQUFFLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsRUFBSSxFQUFBLENBQUUsQ0FBQztBQUNqQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBRSxJQUFHLEVBQUksSUFBRSxDQUFFLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxDQUFBLEVBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFFLEVBQUksR0FBQyxDQUFDO0FBRy9CLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQyxDQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUVBLFlBQVEsQ0FBUixVQUFZLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQzdCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFDWixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFFLElBQUcsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUN2QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ3ZCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRWhCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDdkIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFFBQUksQ0FBSixVQUFRLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQ3pCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsU0FBSyxDQUFMLFVBQVMsQUFBMkIsQ0FBSTtRQUEvQixJQUFFLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7QUFDbkMsQUFBSSxRQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxLQUFLLEFBQUMsQ0FBRSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFFLENBQUM7QUFFL0MsU0FBSyxJQUFHLElBQUksQUFBQyxDQUFFLE1BQUssQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBQUEsQUFFN0QsUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRWIsV0FBSyxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNuQixNQUFBLEdBQUssT0FBSyxDQUFDO0FBQ1gsTUFBQSxHQUFLLE9BQUssQ0FBQztBQUNYLE1BQUEsR0FBSyxPQUFLLENBQUM7QUFFWCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksV0FBUyxDQUFDO0FBQ2xCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRTNCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFLENBQUM7QUFDL0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxBQUFNLENBQUk7UUFBVixJQUFFLDZDQUFJLEVBQUE7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsSUFBSSxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFDbEMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxJQUFJLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFVBQU0sQ0FBTixVQUFVLEFBQU0sQ0FBSTtRQUFWLElBQUUsNkNBQUksRUFBQTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxJQUFJLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUNsQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLElBQUksQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBRWxDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsVUFBTSxDQUFOLFVBQVUsQUFBTSxDQUFJO1FBQVYsSUFBRSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLElBQUksQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBQ2xDLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsSUFBSSxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFFbEMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxjQUFVLENBQVYsVUFBYyxJQUFHLENBQUk7QUFDcEIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsVUFBUyxNQUFNLEFBQUMsQ0FBRSxJQUFHLENBQUUsZUFBZSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFDdEQsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBRWpFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFDO0FBQ3JCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7QUFFckIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBQztBQUNyQixNQUFBLENB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QUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUUzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUcsRUFBQSxDQUV2QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBRyxFQUFBLENBRXZDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFHLEVBQUEsQ0FFdkMsRUFBQSxDQUFNLEVBQUEsQ0FBTSxFQUFBLENBQU0sRUFBQSxDQUNuQixDQUFDO0lBQ0Y7QUFDQSxZQUFRLENBQVIsVUFBWSxBQUFNLENBQUk7UUFBVixJQUFFLDZDQUFJLEVBQUE7QUFDakIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBRXZCLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUksRUFBQSxDQUFHLEVBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FFWCxFQUFBLENBQUksRUFBQSxDQUFJLEVBQUEsQ0FBSSxFQUFBLENBRVosRUFBQSxDQUFJLEVBQUEsQ0FBSSxFQUFBLENBQUksRUFBQSxDQUNiLENBQUM7SUFDRjtBQUNBLFlBQVEsQ0FBUixVQUFZLEFBQU0sQ0FBSTtRQUFWLElBQUUsNkNBQUksRUFBQTtBQUNqQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFFdkIsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFUCxFQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFWixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1YsQ0FBQztJQUNGO0FBQ0EsWUFBUSxDQUFSLFVBQVksQUFBTSxDQUFJO1FBQVYsSUFBRSw2Q0FBSSxFQUFBO0FBQ2pCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUV2QixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsRUFBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVixDQUFDO0lBQ0Y7QUFDQSxnQkFBWSxDQUFaLFVBQWdCLElBQUcsQ0FBSTtBQUN0QixBQUFJLFFBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxVQUFTLE1BQU0sQUFBQyxDQUFFLElBQUcsQ0FBRSxlQUFlLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FBQztBQUV0RCxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUVqRSxXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUcsQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBSSxFQUFBLENBRW5DLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBRyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksRUFBQSxDQUVuQyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksQ0FBQSxFQUFDLEVBQUUsR0FBQyxDQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUMsRUFBQyxFQUFJLEdBQUMsQ0FBQyxDQUFHLEVBQUEsQ0FFbEMsRUFBQSxDQUFNLEVBQUEsQ0FB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QUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDcEQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXBELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxZQUFRLENBQVIsVUFBWSxDQUFBLENBQUk7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3BELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFcEQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBNkIsQ0FBSTtRQUE5QixFQUFBLDZDQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDdkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUVILFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENBQUYsVUFBTSxDQUFBLEFBQTZCLENBQUk7UUFBOUIsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ2xDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDekgsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ3pILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FB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QUFBLENBQUEsRUFBSSxFQUNQLE1BQUssUUFBUSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQ2xCLENBQUEsTUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbEIsQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUNsQixDQUFBLE1BQUssUUFBUSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQ2xCLENBQUEsTUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbEIsQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUNsQixDQUFBLE1BQUssUUFBUSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQ2xCLENBQUEsTUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbkIsQ0FBQztBQUNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxFQUNQLEdBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2pDLElBQUksS0FBRyxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQ2xDLENBQUM7QUFFRCxNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFFN0IsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFFbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUcsRUFBQyxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBRyxFQUFDLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUcsRUFBQyxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFFbEUsQUFBSSxRQUFBLENBQUEsSUFBRyxFQUFJLFVBQVEsQ0FBRSxRQUFPLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRSxDQUFDO0FBQ3JDLFNBQUssU0FBUTtBQUFJLFdBQUcsY0FBYyxBQUFDLENBQ2xDLElBQUcsRUFBSSxZQUFVLENBQ2pCLElBQUksV0FBUyxBQUFDLENBQUMsQ0FDZCxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDTixFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FD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QUEiLCJmaWxlIjoiRDovd2ViL3BvbHltZXIvZGV2L2dsLWVsZW1lbnRzL2Jpbi9lbmdpbmUuanMiLCJzb3VyY2VSb290IjoiRDovd2ViL3BvbHltZXIvZGV2L2dsLWVsZW1lbnRzL2Jpbi8iLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXJNb2R1bGUoJF9fcGxhY2Vob2xkZXJfXzAsIFtdLCAkX19wbGFjZWhvbGRlcl9fMSk7IiwiZnVuY3Rpb24oKSB7XG4gICAgICAgICRfX3BsYWNlaG9sZGVyX18wXG4gICAgICB9IiwidmFyIF9fbW9kdWxlTmFtZSA9ICRfX3BsYWNlaG9sZGVyX18wOyIsbnVsbCwicmV0dXJuICRfX3BsYWNlaG9sZGVyX18wIiwiZ2V0ICRfX3BsYWNlaG9sZGVyX18wKCkgeyByZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzE7IH0iLCJTeXN0ZW0uZ2V0KCRfX3BsYWNlaG9sZGVyX18wKSIsbnVsbCwidmFyICRfX3BsYWNlaG9sZGVyX18wID0gJF9fcGxhY2Vob2xkZXJfXzEiLCJ2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMSIsIigkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKCRfX3BsYWNlaG9sZGVyX18wLCAkX19wbGFjZWhvbGRlcl9fMSwgJF9fcGxhY2Vob2xkZXJfXzIpIiwiJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbigkX19wbGFjZWhvbGRlcl9fMCkiLCJyZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzAoXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18xLFxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiwgdGhpcyk7IiwiJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlIiwiZnVuY3Rpb24oJGN0eCkge1xuICAgICAgd2hpbGUgKHRydWUpICRfX3BsYWNlaG9sZGVyX18wXG4gICAgfSIsIiRjdHguc3RhdGUgPSAoJF9fcGxhY2Vob2xkZXJfXzApID8gJF9fcGxhY2Vob2xkZXJfXzEgOiAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgYnJlYWsiLCJyZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzAiLCIkY3R4Lm1heWJlVGhyb3coKSIsInJldHVybiAkY3R4LmVuZCgpIiwidmFyICRfX2RlZmF1bHQgPSAkX19wbGFjZWhvbGRlcl9fMCIsIigkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKCRfX3BsYWNlaG9sZGVyX18wLCAkX19wbGFjZWhvbGRlcl9fMSwgJF9fcGxhY2Vob2xkZXJfXzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMykiLG51bGwsbnVsbCwidm9pZCAwIixudWxsLCJmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMTtcbiAgICAgICAgICByZXR1cm4gKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzIsICRfX3BsYWNlaG9sZGVyX18zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNCk7XG4gICAgICAgIH0oKSIsbnVsbCxudWxsLCIkdHJhY2V1clJ1bnRpbWUuc3ByZWFkKCRfX3BsYWNlaG9sZGVyX18wKSIsbnVsbCwiJHRyYWNldXJSdW50aW1lLnN1cGVyQ29uc3RydWN0b3IoXG4gICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzApLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykiLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLCJTeXN0ZW0uZ2V0KCRfX3BsYWNlaG9sZGVyX18wICsnJykiXX0=
