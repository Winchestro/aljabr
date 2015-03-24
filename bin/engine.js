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
  for (var property in GL)
    if (typeof GL[property] === "number")
      Property(GL.flags, property, GL[property], E);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzQiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMyIsIi4uL3NyYy91dGlsaXRpZXMvVUxQcm9wZXJ0eURlc2NyaXB0b3JzLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82IiwiLi4vc3JjL21hdGgvTUxWZWN0b3IuanMiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xMCIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE5IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE4IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEyIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE3IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE0IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE1IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzE2IiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzciLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMTEiLCIuLi9zcmMvbWF0aC9NTE1hdHJpeC5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxJbnRlcmxlYXZlZEFycmF5LmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIwIiwiLi4vc3JjL3dlYmdsL0dMQ29udGV4dC5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMSIsIi4uL3NyYy91dGlsaXRpZXMvVUxSZXNvdXJjZS5qcyIsIi4uL3NyYy93ZWJnbC9HTFVuaWZvcm1Mb2NhdGlvbi5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMiIsIi4uL3NyYy91dGlsaXRpZXMvVUxVbmlmb3Jtcy5qcyIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yMyIsIi4uL3NyYy93ZWJnbC9HTEF0dHJpYnV0ZUxvY2F0aW9uLmpzIiwiLi4vc3JjL3dlYmdsL0dMU2hhZGVyLmpzIiwiLi4vc3JjL3dlYmdsL0dMUHJvZ3JhbS5qcyIsIi4uL3NyYy91dGlsaXRpZXMvVUxNYXRlcmlhbC5qcyIsIi4uL3NyYy93ZWJnbC9HTERyYXcuanMiLCIuLi9zcmMvd2ViZ2wvR0xWZXJ0ZXhCdWZmZXIuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMR2VvbWV0cnlBdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL3dlYmdsL0dMVmVydGV4QXJyYXlPYmplY3QuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMR2VvbWV0cnkuanMiLCIuLi9zcmMvdXRpbGl0aWVzL1VMTWVzaC5qcyIsIi4uL3NyYy93ZWJnbC9HTFRleHR1cmUuanMiLCIuLi9zcmMvaGVhZGVyLmpzIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUssZUFBZSxBQUFDLDBDQUFvQixHQUFDLENDQTFDLFVBQVMsQUFBRDs7QUNBUixBQUFJLElBQUEsQ0FBQSxZQUFXLDJDQUFvQixDQUFDO0FDQTdCLEFBQU0sSUFBQSxDQUFBLENBQUEsRUFBSSxFQUFJLENBQUM7QUFDZixBQUFNLElBQUEsQ0FBQSxDQUFBLEVBQUksRUFBSSxDQUFDO0FBQ2YsQUFBTSxJQUFBLENB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QUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDM0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUMzRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQzNELEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFM0QsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQyxDQUFBLENBQUcsQ0FB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LENBQUk7UUFBekIsR0FBQyw2Q0FBSSxDQUFBLEtBQUksTUFBTSxBQUFDLENBQUMsSUFBRyxDQUFDO0FBQ25DLFNBQUcsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN2QixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNoQixDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUNsQixNQUFBO0FBQ0gsU0FBRyxDQUFHLENBQUEsQ0FBRSxFQUFLLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2hCLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQ2xCLE1BQUE7QUFDSCxTQUFHLENBQUcsQ0FBQSxDQUFFLEVBQUssQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDaEIsQ0FBQSxFQUFDLENBQUcs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QUFJLENBQUEsVUFBUyxVQUFVLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDdkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU1QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUMvQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFNUMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDL0MsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTVDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQy9DLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN0QyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3RDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDdEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUc1QyxBQUFJLFFBQUEsQ0FBQSxXQUFVLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDcEMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFL0IsU0FBSSxJQUFHLElBQUksQUFBQyxDQUFFLFdBQVUsQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDOztBQUNoRSxhQUFPLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBRSxDQUFBLEVBQUksWUFBVSxDQUFDLENBQUM7QUFBQSxJQUNsRDtBQUNBLFlBQVEsQ0FBUixVQUFZLENBQUEsQ0FBSTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXRFLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxpQkFBYSxDQUFiLFVBQWlCLENBQUEsQ0FBSTtBQUNwQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUN0RSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsTUFBRSxDQUFGLFVBQU0sQ0FBQSxBQUFVLENBQUk7UUFBWCxFQUFBLDZDQUFJLEtBQUc7QUFDZixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQ3pCLENBQUM7SUFDRjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBVSxDQUFLO1FBQVosRUFBQSw2Q0FBSSxLQUFHO0FBQ3BCLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNaLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FFeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBRXhCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUV4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FDM0IsQ0FBQztJQUNGO0FBQ0EsY0FBVSxDQUFWLFVBQWMsQUFBRixDQUFJO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM5QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRzdCLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUM3QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU3QixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDN0IsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQzdCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFN0IsV0FBTyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUEsQ0FBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7SUFDakU7QUFDQSxTQUFLLENBQUwsVUFBUyxHQUFFLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxFQUFDLENBQUk7QUFDMUIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUNaLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFlBQVcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFHLE9BQUssQ0FBRSxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBRW5ELFNBQUssQ0FBQSxVQUFVLElBQU0sRUFBQTtBQUFJLFFBQUEsRUFBSSxDQUFBLENBQUEsSUFBSSxBQUFDLENBQUUsRUFBQyxDQUFFLENBQUM7QUFBQSxBQUVwQyxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsWUFBVyxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7QUFFL0MsU0FBSSxDQUFBLFVBQVUsSUFBTSxFQUFBLENBQUk7QUFDdkIsUUFBQSxFQUFFLEdBQUssT0FBSyxDQUFDO0FBQ2IsUUFBQSxFQUFJLENBQUEsQ0FBQSxNQUFNLEFBQUMsQ0FBRSxFQUFDLENBQUcsRUFBQSxDQUFFLFVBQVUsQUFBQyxFQUFDLENBQUM7TUFDakM7QUFBQSxBQUVJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxZQUFXLE1BQU0sQUFBQyxDQUFFLENBQUEsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDaEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ2hFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoRSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBRUEsVUFBTSxDQUFOLFVBQVUsSUFBRyxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFJO0FBQy9DLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUEsQ0FBSSxFQUFFLEtBQUksRUFBSSxLQUFHLENBQUUsQ0FBQztBQUNuQyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFFbkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxLQUFJLEVBQUksS0FBRyxDQUFFLEVBQUksRUFBRSxLQUFJLEVBQUksS0FBRyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxHQUFFLEVBQUksT0FBSyxDQUFFLEVBQUksRUFBRSxHQUFFLEVBQUksT0FBSyxDQUFFLENBQUM7QUFDM0MsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQyxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsQ0FBQSxDQUFJLEVBQUUsR0FBRSxFQUFJLEtBQUcsQ0FBRSxDQUFDO0FBQ3hDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLENBQUUsQ0FBQSxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFBLENBQUksRUFBRSxHQUFFLEVBQUksS0FBRyxDQUFFLENBQUM7QUFFekMsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUE7SUFDRDtBQUNBLGVBQVcsQ0FBWCxVQUFlLElBQUcsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUNwRCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxLQUFJLEVBQUksS0FBRyxDQUFDO0FBQ3BCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLEdBQUUsRUFBSSxPQUFLLENBQUM7QUFDcEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsR0FBRSxFQUFJLEtBQUcsQ0FBQztBQUVsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxNQUFJLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxPQUFLLENBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUM3QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLElBQUcsRUFBSSxJQUFFLENBQUUsRUFBTSxFQUFDLENBQUEsQ0FBQztBQUU3QixNQUFBLEVBQUssQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQ1YsTUFBQSxFQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUNWLE1BQUEsRUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRVYsV0FBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQ2QsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUVULEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FFVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBRVQsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUNBLGNBQVUsQ0FBVixVQUFjLE1BQUssQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBSTtBQUN0QyxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxHQUFFLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsRUFBSSxFQUFBLENBQUUsQ0FBQztBQUNqQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBRSxJQUFHLEVBQUksSUFBRSxDQUFFLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNsQixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFFLEdBQUUsRUFBSSxLQUFHLENBQUUsRUFBSSxHQUFDLENBQUM7QUFDM0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBRSxDQUFBLEVBQUksSUFBRSxDQUFBLENBQUksS0FBRyxDQUFFLEVBQUksR0FBQyxDQUFDO0FBRy9CLFdBQU8sQ0FBQSxJQUFHLElBQUksQUFBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FDVCxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQyxDQUFBLENBQ1QsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNWLENBQUM7SUFDRjtBQUVBLFlBQVEsQ0FBUixVQUFZLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQzdCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFDWixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFFLElBQUcsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUN2QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDZCxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUVoQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ3ZCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUNkLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRWhCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FDdkIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQ2QsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFaEIsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFFBQUksQ0FBSixVQUFRLEFBQWtCLENBQUk7UUFBdEIsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO1FBQUcsRUFBQSw2Q0FBSSxFQUFBO0FBQ3pCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3RFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDdEUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUV0RSxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsU0FBSyxDQUFMLFVBQVMsQUFBMkIsQ0FBSTtRQUEvQixJQUFFLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7UUFBRyxFQUFBLDZDQUFJLEVBQUE7QUFDbkMsQUFBSSxRQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxLQUFLLEFBQUMsQ0FBRSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFFLENBQUM7QUFFL0MsU0FBSyxJQUFHLElBQUksQUFBQyxDQUFFLE1BQUssQ0FBRSxDQUFBLENBQUksQ0FBQSxNQUFLLFFBQVE7QUFBSSxhQUFPLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBQUEsQUFFN0QsUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRWIsV0FBSyxFQUFJLENBQUEsQ0FBQSxFQUFJLE9BQUssQ0FBQztBQUNuQixNQUFBLEdBQUssT0FBSyxDQUFDO0FBQ1gsTUFBQSxHQUFLLE9BQUssQ0FBQztBQUNYLE1BQUEsR0FBSyxPQUFLLENBQUM7QUFFWCxBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksV0FBUyxDQUFDO0FBQ2xCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFDO0FBRTNCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUMvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBRS9CLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFLENBQUM7QUFDL0IsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUU5QixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFFOUIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBRTlCLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxBQUFNLENBQUk7UUFBVixJQUFFLDZDQUFJLEVBQUE7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsSUFBSSxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFDbEMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxJQUFJLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUVsQyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFVBQU0sQ0FBTixVQUFVLEFBQU0sQ0FBSTtRQUFWLElBQUUsNkNBQUksRUFBQTtBQUNmLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUUsR0FBRSxDQUFFLENBQUM7QUFDdkIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsV0FBVSxJQUFJLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FBQztBQUNsQyxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLElBQUksQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBRWxDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFFdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsVUFBTSxDQUFOLFVBQVUsQUFBTSxDQUFJO1FBQVYsSUFBRSw2Q0FBSSxFQUFBO0FBQ2YsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBRSxHQUFFLENBQUUsQ0FBQztBQUN2QixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFFLEdBQUUsQ0FBRSxDQUFDO0FBQ3ZCLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxXQUFVLElBQUksQUFBQyxDQUFFLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRSxDQUFDO0FBQ2xDLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLFdBQVUsSUFBSSxBQUFDLENBQUUsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFFLENBQUM7QUFFbEMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUV2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBQ3ZDLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLEVBQUMsQ0FBRyxDQUFBLENBQUUsRUFBSSxFQUFBLENBQUM7QUFDdkMsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsRUFBQyxDQUFHLENBQUEsQ0FBRSxFQUFJLEVBQUEsQ0FBQztBQUN2QyxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxFQUFDLENBQUcsQ0FBQSxDQUFFLEVBQUksRUFBQSxDQUFDO0FBRXZDLFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxjQUFVLENBQVYsVUFBYyxJQUFHLENBQUk7QUFDcEIsQUFBSSxRQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsVUFBUyxNQUFNLEFBQUMsQ0FBRSxJQUFHLENBQUUsZUFBZSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQUM7QUFDdEQsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBQ2pFLEFBQUksUUFBQSxDQUFBLEVBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUU7QUFBRyxXQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRSxDQUFDO0FBRWpFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUMzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFDO0FBQ3JCLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUM7QUFFckIsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBQztBQUNyQixNQUFBLENB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QUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUM7QUFDM0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQztBQUUzQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFBLENBQUksRUFBQSxDQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksRUFBQSxDQUFDO0FBQy9CLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUEsQ0FBSSxFQUFBLENBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUM7QUFDL0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQSxDQUFJLEVBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBQztBQUUvQixXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFB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Q0FBRSxDQUFBLENBQUUsQ0FBQztBQUV0RCxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUNqRSxBQUFJLFFBQUEsQ0FBQSxFQUFDLEVBQUksQ0FBQSxJQUFHLEVBQUUsRUFBSSxDQUFBLEdBQUUsRUFBRTtBQUFHLFdBQUMsRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsR0FBRSxFQUFFO0FBQUcsV0FBQyxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxHQUFFLEVBQUUsQ0FBQztBQUVqRSxXQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FDZCxDQUFBLEVBQUksRUFBQyxFQUFDLEVBQUksR0FBQyxDQUFDLENBQUcsQ0FBQSxFQUFDLEVBQUksR0FBQyxDQUFJLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBSSxFQUFBLENBRW5DLENBQUEsRUFBQyxFQUFJLEdBQUMsQ0FBSSxDQUFBLENBQUEsRUFBSSxFQUFDLEVBQUMsRUFBSSxHQUFDLENBQUMsQ0FBRyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksRUFBQSxDQUVuQyxDQUFBLEVBQUMsRUFBSSxHQUFDLENBQUksQ0FBQSxFQUFDLEVBQUUsR0FBQyxDQUFLLENBQUEsQ0FBQSxFQUFJLEVBQUMsRUFBQyxFQUFJLEdBQUMsQ0FBQyxDQUFHLEVBQUEsQ0FFbEMsRUFBQSxDQUFNLEVBQUEsQ0FB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QUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFDcEQsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBRXBELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxZQUFRLENBQVIsVUFBWSxDQUFBLENBQUk7QUFDZixBQUFJLFFBQUEsQ0FBQSxDQUFBLEVBQUksS0FBRyxDQUFDO0FBRVosTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQ3BELE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUNwRCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEdBQUssRUFBQSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxHQUFLLEVBQUEsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsR0FBSyxFQUFBLENBQUM7QUFFcEQsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLENBQUEsQUFBNkIsQ0FBSTtRQUE5QixFQUFBLDZDQUFJLENBQUEsVUFBUyxLQUFLLEFBQUMsQ0FBRSxJQUFHLENBQUU7QUFDdkMsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEtBQUcsQ0FBQztBQUVaLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUNILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUNqQyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQSxDQUN4QixDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQTtBQUMxQixNQUFBO0FBQ0gsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ2pDLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBLENBQ3hCLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFBO0FBQzFCLE1BQUE7QUFDSCxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDakMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUEsQ0FDeEIsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUE7QUFDMUIsTUFBQTtBQUVILFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxNQUFFLENBQUYsVUFBTSxDQUFBLEFBQTZCLENBQUk7UUFBOUIsRUFBQSw2Q0FBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUUsSUFBRyxDQUFFO0FBQ2xDLEFBQUksUUFBQSxDQUFBLENBQUEsRUFBSSxLQUFHLENBQUM7QUFFWixNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFBRSxNQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLEVBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFFLENBQUM7QUFDekgsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQUUsTUFBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxFQUFJLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBRSxDQUFHLENBQUEsQ0FBRSxDQUFDO0FBQ3pILE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsQ0FBQztBQUFFLE1BQUEsQ0FBRyxDQUFBLENBQUUsQ0FBRyxDQUFBLENBQUUsRUFBSSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUUsQ0FB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TUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbEIsQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUNsQixDQUFBLE1BQUssUUFBUSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQ2xCLENBQUEsTUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbEIsQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUNsQixDQUFBLE1BQUssUUFBUSxBQUFDLENBQUUsQ0FBQSxDQUFFLENBQ2xCLENBQUEsTUFBSyxRQUFRLEFBQUMsQ0FBRSxDQUFBLENBQUUsQ0FDbEIsQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFFLENBQUEsQ0FBRSxDQUNuQixDQUFDO0FBQ0QsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLEVBQ1AsR0FBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDakMsSUFBSSxLQUFHLEFBQUMsQ0FBRSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFFLENBQUUsQ0FDbEMsQ0FBQztBQUVELE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUM3QixNQUFBLENBQUcsQ0FBQSxDQUFFLE1BQU0sRUFBSSxDQUFBLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFDO0FBQzdCLE1BQUEsQ0FBRyxDQUFBLENBQUUsTUFBTSxFQUFJLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUM7QUFDN0IsTUFBQSxDQUFHLENBQUEsQ0FBRSxNQUFNLEVBQUksQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBQztBQUU3QixNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUVsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBSSxDQUFBLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFJLENBQUEsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUNsRSxNQUFBLENBQUksQ0FBQSxDQUFFLFNBQVMsQUFBQyxDQUFFLENBQUEsQ0FBSSxDQUFBLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xFLE1BQUEsQ0FBRyxFQUFDLENBQUUsU0FBUyxBQUFDLENBQUUsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUcsQ0FBQSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDbEUsTUFBQSxDQUFHLEVBQUMsQ0FBRSxTQUFTLEFBQUMsQ0FBRSxDQUFBLENBQUksQ0FBQSxDQUFFLE9BQU8sQ0FBRyxDQUFBLENBQUEsQ0FBRyxFQUFDLENBQUUsT0FBTyxDQUFHLENBQUEsQ0FBQSxDQUFJLENBQUEsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUVsRSxBQUFJLFFBQUEsQ0FBQSxJQUFHLEVBQUksVUFBUSxDQUFFLFFBQU8sQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFFLENBQUM7QUFDckMsU0FBSyxTQUFRO0FBQUksV0FBRyxjQUFjLEFBQUMsQ0FDbEMsSUFBRyxFQUFJLFlBQVUsQ0FDakIsSUFBSSxXQUFTLEFBQUMsQ0FBQyxDQUNkLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNOLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUNQLENBQUMsQ0FDRCxDQUFBLEVBQUMsVUFBVSxDQUNYLENBQUEsRUFBQyxhQUFhLENBQ2YsQ0FBQztBQUFBLEFBQ0QsU0FBSyxLQUFJO0FBQUksV0FBRyxjQUFjLEFBQUMsQ0FDOUIsSUFBRyxFQUFJLFFBQU0sQ0FDYixJQUFJLFdBQVMsQUFBQyxDQUFDLENBQ2QsQ0FBQSxDQUFFLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQSxDQUNQLEVBQUEsQ0FBRSxFQUFBLENBQUcsRUFBQSxDQUFFLEVBQUEsQ0FDUCxFQUFBLENBQUUsRUFBQSxDQUFHLEVBQUEsQ0FBRSxFQUFBLENBQ1AsRUFBQSxDQUFFLEVBQUEsQ0FBRyxFQUFBLENBQUUsRUFBQSxDQUNQLEVBQUEsQ0FBRSxFQUFBLENBQUcsRUFBQSxDQUFFLEVBQUEsQ0FDUCxFQUFBLENBQUUsRUFBQSxDQUFHLEVBQUEsQ0FBRSxFQUFBLENBQ1IsQ0FBQyxDQUNELENBQUEsRUFBQyxNQUFNLENBQ1AsQ0FBQSxFQUFDLGFBQWEsQ0FDZixDQUFDO0FBQUEsQUFDRCxTQUFLLE1BQUs7QUFBSSxXQUFHLGNBQWMsQUFBQyxDQUMvQixJQUFHLEVBQUksU0FBTyxDQUNkLElBQUksV0FBUyxBQUFDLENBQUMsQ0FBRSxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFFLENBQUUsQ0FDMUMsQ0FBQSxFQUFDLE9BQU8sQ0FDUixDQUFBLEVBQUMsYUFBYSxDQUNmLENBQUM7QUFBQSxBQUVELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDTyxTQUFLLENBQVosVUFBZ0IsQUFBaUIsQ0FBSTtRQUFyQixLQUFHLDZDQUFJLFNBQU87UUFBRyxFQUFBO0lBRWpDO0FBQUEsRzlCbElvRjtBU0FyRixBQUFJLElBQUEsQ0FBQSxVQUFTLE9BQW9CLENBQUE7QXFCb0lqQyxXQUFTLEFBQUMsQ0FBRSxJQUFHLEtBQUssQ0FBRyxFQUN0QixPQUFNLENBQUk7QUFDVCxjQUFRLENBQUksS0FBRztBQUNmLFVBQUksQ0FBSSxLQUFHO0FBQ1gsV0FBSyxDQUFJLE1BQUk7QUFBQSxJQUNkLENBQ0QsQ0FBQyxDQUFDO0FBQ0YsV0FBUyxBQUFDLENBQUUsSUFBRyxPQUFPLENBQUcsRUFDeEIsT0FBTSxDQUFJO0FBQ1QsY0FBUSxDQUFJLEtBQUc7QUFDZixVQUFJLENBQUksTUFBSTtBQUNaLFdBQUssQ0FBSSxNQUFJO0FBQUEsSUFDZCxDQUNELENBQUMsQ0FBQztBaENqSkYsQUFBSSxJQUFBLFlnQ21KRyxTQUFNLFVBQVEsQ0FDTixRQUFPLENBQUk7QUFDeEIsT0FBRyxTQUFTLEVBQUksU0FBTyxDQUFDO0VBQ3pCLEFoQ3RKdUMsQ0FBQTtBRUF4QyxFQUFDLGVBQWMsWUFBWSxDQUFDLEFBQUMsYThCdUo1QixPQUFNLENBQU4sVUFBUyxLQUFJLENBQUk7QUFDaEIsQUFBSSxRQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsTUFBSyxPQUFPLEFBQUMsQ0FBRSxJQUFHLENBQUUsQ0FBQztBQUM3QixNQUFBLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFDZixXQUFPLEVBQUEsQ0FBQztJQUNULE05QjNKb0Y7QUZBckYsQUFBSSxJQUFBLE9nQytKRyxTQUFNLEtBQUcsQ0FDRCxLQUFJLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxLQUFJLENBQUk7QUFDbkMsQUFBSSxNQUFBLENBQUEsRUFBQyxFQUFJLElBQUksU0FBTyxBQUFDLENBQUUsS0FBSSxDQUFHLEtBQUcsQ0FBRSxDQUFDO0FBQ3BDLEFBQUksTUFBQSxDQUFBLEVBQUMsRUFBSSxJQUFJLFNBQU8sQUFBQyxDQUFFLEtBQUksQ0FBRyxLQUFHLENBQUUsQ0FBQztBQUNwQyxBQUFJLE1BQUEsQ0FBQSxFQUFDLEVBQUksSUFBSSxTQUFPLEFBQUMsQ0FBRSxLQUFJLENBQUcsS0FBRyxDQUFFLENBQUM7QUFFcEMsS0FBQyxhQUFhLEFBQUMsQ0FBRSxFQUFDLENBQUcsR0FBQyxDQUFFLENBQUM7QUFDekIsS0FBQyxhQUFhLEFBQUMsQ0FBRSxFQUFDLENBQUcsR0FBQyxDQUFFLENBQUM7QUFDekIsS0FBQyxhQUFhLEFBQUMsQ0FBRSxFQUFDLENBQUcsR0FBQyxDQUFFLENBQUM7QUFFekIsT0FBRyxPQUFPLEVBQUksR0FBQyxDQUFDO0VBQ2pCLEFoQzFLdUMsQ0FBQTtBRUF4QyxFQUFDLGVBQWMsWUFBWSxDQUFDLEFBQUMsUThCMks1QixRQUFPLENBQVAsVUFBVSxpQkFBZ0IsQ0FBRyxDQUFBLGlCQUFnQixDQUFHLENBQUEsaUJBQWdCLENBQUk7QUFDbkUsU0FBRyxPQUFPLFNBQVMsRUFBSSxrQkFBZ0IsQ0FBQztBQUN4QyxTQUFHLE9BQU8sU0FBUyxFQUFJLGtCQUFnQixDQUFDO0FBQ3hDLFNBQUcsT0FBTyxTQUFTLEVBQUksa0JBQWdCLENBQUM7SUFDekMsTTlCL0tvRjtBOEJpTHJGLFFBQU0sQUFBQyxDQUFFLElBQUcsVUFBVSxDQUFHO0FBQ3hCLFNBQUssQ0FBTCxVQUFTLEFBQUYsQ0FBSTtBQUFFLFdBQU8sQ0FBQSxJQUFHLE9BQU8sS0FBSyxDQUFDO0lBQUU7QUFDdEMsU0FBSyxDQUFMLFVBQVMsQUFBRixDQUFJO0FBQUUsV0FBTyxDQUFBLElBQUcsT0FBTyxLQUFLLENBQUM7SUFBRTtBQUFBLEVBRXZDLENBQUUsQ0FBQztBaENyTEgsQUFBSSxJQUFBLFdnQ3NMRyxTQUFNLFNBQU8sQ0FDTCxRQUFPLENBQUcsQ0FBQSxhQUFZLENBQUk7QUFDdkMsT0FBRyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBQ3hCLE9BQUcsU0FBUyxFQUFJLGNBQVksQ0FBQztBQUM3QixPQUFHLFNBQVMsRUFBSSxLQUFHLENBQUM7QUFDcEIsT0FBRyxLQUFLLEVBQU8sS0FBRyxDQUFDO0FBQ25CLE9BQUcsS0FBSyxFQUFNLEtBQUcsQ0FBQztFQUNuQixBaEM3THVDLENBQUE7QUVBeEMsRUFBQyxlQUFjLFlBQVksQ0FBQyxBQUFDLFk4QjhMNUIsWUFBVyxDQUFYLFVBQWUsZ0JBQWUsQ0FBRyxDQUFBLFlBQVcsQ0FBSTtBQUMvQyxTQUFHLEtBQUssRUFBSSxpQkFBZSxDQUFDO0FBQzVCLFNBQUcsS0FBSyxFQUFJLGFBQVcsQ0FBQztJQUN6QixNOUJqTW9GO0FOQXJGO0FDQUEsZ0JBQXdCO0FBQUUsdUJBQXdCO0lBQUU7QUFBcEQsa0JBQXdCO0FBQUUsc0JBQXdCO0lBQUU7QUFBcEQsYUFBd0I7QUFBRSxpQkFBd0I7SUFBRTtBQUFwRCxpQkFBd0I7QUFBRSxxQkFBd0I7SUFBRTtBQUFBLEdEQTdCO0FIRWpCLENERndELENBQUM7QUFBL0QsS0FBSyxlQUFlLEFBQUMsMEJBQW9CLEdBQUMsQ0NBMUMsVUFBUyxBQUFEOztBQ0FSLEFBQUksSUFBQSxDQUFBLFlBQVcsMkJBQW9CLENBQUM7V0lBcEMsQ0FBQSxNQUFLLElBQUksQUFBQywwQ0FBa0I7QW1DQW5CLGFBQU87QUFBRyxlQUFTO0FBQUcsWUFBTTtBQUFHLFlBQU07QUFBRyxrQkFBWTtBQUFHLE1BQUE7QUFBRyxNQUFBO0FBQUcsTUFBQTtXbkNBdEUsQ0FBQSxNQUFLLElBQUksQUFBQywwQkFBa0I7QW1DQ25CLE9BQUM7QUFBRyxPQUFDO0FqQ0RkLEFBQUksSUFBQSxVaUNHVyxTQUFNLFFBQU0sQ0FDWixBQUFxQixDQUFJO01BQXpCLE9BQUssNkNBQUksQ0FBQSxFQUFDLFdBQVc7QUFDbEMsQUFBSSxNQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsRUFBQyxjQUFjLEFBQUMsRUFBQyxDQUFDO0FBQ2hDLGFBQVMsQUFBQyxDQUFFLE9BQU0sQ0FBRyxFQUFFLE1BQUssQ0FBTCxPQUFLLENBQUUsQ0FBRSxDQUFDO0FBQ2pDLFNBQU8sUUFBTSxDQUFDO0VBQ2YsQWpDUnVDLENBQUE7QUNBeEMsQUFBSSxJQUFBLG1CQUFvQyxDQUFBO0FDQXhDLEVBQUMsZUFBYyxZQUFZLENBQUMsQUFBQyxlK0JTckIsT0FBTSxDQUFiLFVBQWlCLEFBQUYsQ0FBSTtBQUNsQixTQUFJLENBQUMsQ0FBRSxJQUFHLFdBQWEsaUJBQWMsQ0FBRTtBQUFJLGFBQU8sSUFBSSxpQkFBYyxDQUFDO0FBQUEsQUFDckUsZUFBUyxBQUFDLENBQUUsSUFBRyxDQUFHO0FBQ2pCLFFBQUEsQ0FBSTtBQUFFLGlCQUFPLENBQUksQ0FBQSxFQUFDLGNBQWMsQUFBQyxFQUFDO0FBQUcsaUJBQU8sQ0FBSSxDQUFBLEVBQUMsY0FBYyxBQUFDLEVBQUM7QUFBQSxRQUFFO0FBQ25FLFFBQUEsQ0FBSTtBQUFFLGlCQUFPLENBQUksQ0FBQSxFQUFDLGNBQWMsQUFBQyxFQUFDO0FBQUcsaUJBQU8sQ0FBSSxDQUFBLEVBQUMsY0FBYyxBQUFDLEVBQUM7QUFBQSxRQUFFO0FBQ25FLFFBQUEsQ0FBSTtBQUFFLGlCQUFPLENBQUksQ0FBQSxFQUFDLGNBQWMsQUFBQyxFQUFDO0FBQUcsaUJBQU8sQ0FBSSxDQUFBLEVBQUMsY0FBYyxBQUFDLEVBQUM7QUFBQSxRQUFFO0FBQUEsTUFDcEUsQ0FBRyxFQUFBLENBQUUsQ0FBQztBQUNOLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0FBQ3JFLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0FBQ3JFLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0FBQ3JFLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0FBQ3JFLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0FBQ3JFLGFBQU8sQUFBQyxDQUFFLElBQUcsRUFBRSxTQUFTLENBQUcsU0FBTyxDQUFHLENBQUEsRUFBQyw0QkFBNEIsQ0FBRSxDQUFDO0lBQ3RFLEUvQnRCb0Y7QVNBckYsQUFBSSxJQUFBLENBQUEsVUFBUyxVQUFvQixDQUFBO0FzQnlCakMsV0FBUyxBQUFDLENBQUUsWUFBVyxVQUFVLENBQUc7QUFDbkMsbUJBQWUsQ0FBZixVQUFtQixZQUFXLENBQUk7QUFDakMsT0FBQyxjQUFjLEFBQUMsQ0FBRSxFQUFDLFNBQVMsRUFBSSxhQUFXLENBQUUsQ0FBQztBQUM5QyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsU0FBSyxDQUFMLFVBQVMsQUFBRixDQUFJO0FBQ1YsT0FBQyxjQUFjLEFBQUMsQ0FBRSxJQUFHLENBQUUsQ0FBQztBQUN4QixXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsT0FBRyxDQUFILFVBQVEsQUFBRixDQUFJO0FBQ1QsT0FBQyxZQUFZLEFBQUMsQ0FBRSxJQUFHLE9BQU8sQ0FBRyxLQUFHLENBQUUsQ0FBQztBQUNuQyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsU0FBSyxDQUFMLFVBQVMsQUFBRixDQUFJO0FBQ1YsT0FBQyxZQUFZLEFBQUMsQ0FBRSxJQUFHLE9BQU8sQ0FBRyxLQUFHLENBQUUsQ0FBQztBQUNuQyxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsZ0JBQVksQ0FBWixVQUFnQixJQUFHLENBQUk7QUFDdEIsT0FBQyxLQUFLLEFBQUMsQ0FDTixFQUFDLHFCQUFxQixDQUV0QixLQUFHLENBQ0osQ0FBQztBQUNELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxpQkFBYSxDQUFiLFVBQWlCLEFBQUYsQ0FBSTtBQUNsQixPQUFDLGVBQWUsQUFBQyxDQUFFLElBQUcsT0FBTyxDQUFFLENBQUM7QUFDaEMsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUVBLGNBQVUsQ0FBVixVQUFjLEtBQUksQ0FBRyxDQUFBLEtBQUksQ0FBSTtBQUk1QixPQUFDLFlBQVksQUFBQyxDQUViLEtBQUksQ0FFSixNQUFJLENBQ0wsQ0FBQztBQUNELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxlQUFXLENBQVgsVUFBZSxBQUFlLENBQUk7UUFBbkIsSUFBRSw2Q0FBSSxDQUFBLEVBQUMsUUFBUTtBQUM3QixPQUFDLGNBQWMsQUFBQyxDQUNmLElBQUcsT0FBTyxDQUNWLENBQUEsRUFBQyxtQkFBbUIsQ0FFcEIsSUFBRSxDQUNILENBQUM7QUFDRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsZUFBVyxDQUFYLFVBQWUsQUFBZSxDQUFJO1FBQW5CLElBQUUsNkNBQUksQ0FBQSxFQUFDLFFBQVE7QUFDN0IsT0FBQyxjQUFjLEFBQUMsQ0FDZixJQUFHLE9BQU8sQ0FDVixDQUFBLEVBQUMsbUJBQW1CLENBRXBCLElBQUUsQ0FDSCxDQUFDO0FBQ0QsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLEFBQW1CLENBQUk7UUFBdkIsRUFBQSw2Q0FBSSxDQUFBLEVBQUMsY0FBYztBQUM3QixPQUFDLGNBQWMsQUFBQyxDQUNmLElBQUcsT0FBTyxDQUNWLENBQUEsRUFBQyxlQUFlLENBRWhCLEVBQUEsQ0FDRCxDQUFDO0FBQ0QsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLEFBQW1CLENBQUk7UUFBdkIsRUFBQSw2Q0FBSSxDQUFBLEVBQUMsY0FBYztBQUM3QixPQUFDLGNBQWMsQUFBQyxDQUNmLElBQUcsT0FBTyxDQUNWLENBQUEsRUFBQyxlQUFlLENBRWhCLEVBQUEsQ0FDRCxDQUFDO0FBQ0QsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUNBLFdBQU8sQ0FBUCxVQUFXLElBQUcsQUFBc0QsQ0FBSTtRQUF2RCxNQUFJLDZDQUFJLEVBQUE7UUFBRyxPQUFLLDZDQUFJLENBQUEsRUFBQyxLQUFLO1FBQUcsS0FBRyw2Q0FBSSxDQUFBLEVBQUMsY0FBYztBQUNuRSxPQUFDLFdBQVcsQUFBQyxDQUNaLElBQUcsT0FBTyxDQUNWLE1BQUksQ0FDSixPQUFLLENBQ0wsT0FBSyxDQUNMLEtBQUcsQ0FDSCxLQUFHLENBQ0osQ0FBQztBQUNELFdBQU8sS0FBRyxDQUFDO0lBQ1o7QUFDQSxVQUFNLENBQU4sVUFBVSxJQUFHLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxNQUFLLEFBQXNELENBQUk7UUFBdkQsTUFBSSw2Q0FBSSxFQUFBO1FBQUcsT0FBSyw2Q0FBSSxDQUFBLEVBQUMsS0FBSztRQUFHLEtBQUcsNkNBQUksQ0FBQSxFQUFDLGNBQWM7QUFDakYsT0FBQyxXQUFXLEFBQUMsQ0FFWixJQUFHLE9BQU8sQ0FFVixNQUFJLENBRUosT0FBSyxDQUVMLE1BQUksQ0FFSixPQUFLLENBRUwsRUFBQSxDQUVBLE9BQUssQ0FFTCxLQUFHLENBRUgsS0FBRyxDQUNKLENBQUM7QUFDRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsY0FBVSxDQUFWLFVBQWMsSUFBRyxBQUFnRixDQUFJO1FBQWpGLFFBQU0sNkNBQUksRUFBQTtRQUFHLFFBQU0sNkNBQUksRUFBQTtRQUFHLE1BQUksNkNBQUksRUFBQTtRQUFHLE9BQUssNkNBQUksQ0FBQSxFQUFDLEtBQUs7UUFBRyxLQUFHLDZDQUFJLENBQUEsRUFBQyxjQUFjO0FBQ2hHLE9BQUMsY0FBYyxBQUFDLENBQ2YsSUFBRyxPQUFPLENBQ1YsTUFBSSxDQUNKLFFBQU0sQ0FDTixRQUFNLENBQ04sT0FBSyxDQUNMLE9BQUssQ0FDTCxLQUFHLENBQ0gsS0FBRyxDQUNKLENBQUM7QUFDRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsYUFBUyxDQUFULFVBQWEsSUFBRyxDQUFJLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxBQUFnRixDQUFJO1FBQWpGLFFBQU0sNkNBQUksRUFBQTtRQUFHLFFBQU0sNkNBQUksRUFBQTtRQUFHLE1BQUksNkNBQUksRUFBQTtRQUFHLE9BQUssNkNBQUksQ0FBQSxFQUFDLEtBQUs7UUFBRyxLQUFHLDZDQUFJLENBQUEsRUFBQyxjQUFjO0FBQy9HLE9BQUMsY0FBYyxBQUFDLENBQ2YsSUFBRyxPQUFPLENBQ1YsTUFBSSxDQUNKLFFBQU0sQ0FDTixRQUFNLENBQ04sT0FBSyxDQUNMLE1BQUksQ0FDSixPQUFLLENBQ0wsRUFBQSxDQUNBLE9BQUssQ0FDTCxLQUFHLENBQ0gsS0FBRyxDQUNKLENBQUM7QUFDRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0EsZUFBVyxDQUFYLFVBQWUsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxBQUE2QixDQUFJO1FBQTlCLE1BQUksNkNBQUksRUFBQTtRQUFHLE9BQUssNkNBQUksQ0FBQSxFQUFDLEtBQUs7QUFDN0QsT0FBQyxlQUFlLEFBQUUsQ0FDakIsSUFBRyxPQUFPLENBQ1YsTUFBSSxDQUNKLE9BQUssQ0FDTCxFQUFBLENBQ0EsRUFBQSxDQUNBLE1BQUksQ0FDSixPQUFLLENBQ0wsRUFBQSxDQUNELENBQUM7QUFDRCxXQUFPLEtBQUcsQ0FBQztJQUNaO0FBQ0Esa0JBQWMsQ0FBZCxVQUFrQixPQUFNLENBQUcsQ0FBQSxPQUFNLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxNQUFLLENBQUk7QUFDeEUsT0FBQyxlQUFlLEFBQUMsQ0FDaEIsSUFBRyxPQUFPLENBQ1YsTUFBSSxDQUNKLFFBQU0sQ0FDTixRQUFNLENBQ04sT0FBSyxDQUNMLEVBQUEsQ0FDQSxFQUFBLENBQ0EsTUFBSSxDQUNKLE9BQUssQ0FDTixDQUFDO0FBQ0QsV0FBTyxLQUFHLENBQUM7SUFDWjtBQUFBLEVBQ0QsQ0FBRSxDQUFDO0FBQ0gsV0FBUyxBQUFDLENBQUUsWUFBVyxDQUFHO0FBQ3pCLG9CQUFnQixDQUFTLENBQUEsRUFBQyxXQUFXO0FBQ3JDLHFDQUFpQyxDQUFJLENBQUEsRUFBQyw0QkFBNEI7QUFDbEUscUNBQWlDLENBQUksQ0FBQSxFQUFDLDRCQUE0QjtBQUNsRSxxQ0FBaUMsQ0FBSSxDQUFBLEVBQUMsNEJBQTRCO0FBQ2xFLHFDQUFpQyxDQUFJLENBQUEsRUFBQyw0QkFBNEI7QUFDbEUscUNBQWlDLENBQUksQ0FBQSxFQUFDLDRCQUE0QjtBQUNsRSxxQ0FBaUMsQ0FBSSxDQUFBLEVBQUMsNEJBQTRCO0FBQ2xFLGVBQVcsQ0FBUyxDQUFBLEVBQUMsTUFBTTtBQUMzQixtQkFBZSxDQUFRLENBQUEsRUFBQyxVQUFVO0FBQ2xDLHlCQUFxQixDQUFPLENBQUEsRUFBQyxnQkFBZ0I7QUFDN0MsYUFBUyxDQUFVLENBQUEsRUFBQyxJQUFJO0FBQ3hCLGNBQVUsQ0FBVSxDQUFBLEVBQUMsS0FBSztBQUMxQixxQkFBaUIsQ0FBUSxDQUFBLEVBQUMsY0FBYztBQUN4Qyw0QkFBd0IsQ0FBTSxDQUFBLEVBQUMscUJBQXFCO0FBQ3BELDhCQUEwQixDQUFNLENBQUEsRUFBQyx1QkFBdUI7QUFDeEQsOEJBQTBCLENBQU0sQ0FBQSxFQUFDLHVCQUF1QjtBQUN4RCxzQkFBa0IsQ0FBUSxDQUFBLEVBQUMsb0JBQW9CO0FBQy9DLHFDQUFpQyxDQUFJLENBQUEsRUFBQyxtQ0FBbUM7QUFDekUsaUNBQTZCLENBQUssQ0FBQSxFQUFDLCtCQUErQjtBQUNsRSx5QkFBcUIsQ0FBTyxDQUFBLEVBQUMsaUJBQWlCO0FBQzlDLHVCQUFtQixDQUFPLENBQUEsRUFBQyxlQUFlO0FBQzFDLDZCQUF5QixDQUFNLENBQUEsRUFBQyxzQkFBc0I7QUFDdEQsaUJBQWEsQ0FBUyxDQUFBLEVBQUMsUUFBUTtBQUMvQixnQkFBWSxDQUFTLENBQUEsRUFBQyxPQUFPO0FBQzdCLG1CQUFlLENBQVEsQ0FBQSxFQUFDLFVBQVU7QUFDbEMsY0FBVSxDQUFVLENBQUEsRUFBQyxRQUFRO0FBQzdCLGFBQVMsQ0FBVSxDQUFBLEVBQUMsT0FBTztBQUMzQiw2QkFBeUIsQ0FBTSxDQUFBLEVBQUMsdUJBQXVCO0FBQ3ZELDRCQUF3QixDQUFNLENBQUEsRUFBQyxzQkFBc0I7QUFDckQsNEJBQXdCLENBQU0sQ0FBQSxFQUFDLHNCQUFzQjtBQUNyRCwyQkFBdUIsQ0FBTSxDQUFBLEVBQUMscUJBQXFCO0FBQ25ELGNBQVUsQ0FBVSxDQUFBLEVBQUMsUUFBUTtBQUM3QixhQUFTLENBQVUsQ0FBQSxFQUFDLE9BQU87QUFDM0IscUJBQWlCLENBQVEsQ0FBQSxFQUFDLGNBQWM7QUFDeEMsdUJBQW1CLENBQU8sQ0FBQSxFQUFDLGdCQUFnQjtBQUMzQyxjQUFVLENBQVUsQ0FBQSxFQUFDLE9BQU87QUFBQSxFQUM3QixDQUFFLENBQUM7QUFDSCxRQUFNLEFBQUMsQ0FBRSxZQUFXLFVBQVUsQ0FBRztBQUNoQyxnQkFBWSxDQUFaLFVBQWdCLEFBQUYsQ0FBSTtBQUNqQixXQUFPLENBQUEsRUFBQyxNQUFNLENBQUcsSUFBRyxPQUFPLENBQUUsQ0FBQztJQUMvQjtBQUNBLGVBQVcsQ0FBWCxVQUFlLEFBQUYsQ0FBSTtBQUNoQixTQUFHLEtBQUssQUFBQyxFQUFDLENBQUM7QUFDWCxXQUFPLENBQUEsRUFBQyxnQkFBZ0IsQUFBQyxDQUFFLElBQUcsT0FBTyxDQUFHLENBQUEsRUFBQyxtQkFBbUIsQ0FBRSxDQUFDO0lBQ2hFO0FBQ0EsbUJBQWUsQ0FBZixVQUFtQixBQUFGLENBQUk7QUFDcEIsV0FBTyxDQUFBLEVBQUMsTUFBTSxDQUFHLElBQUcsYUFBYSxDQUFFLENBQUM7SUFDckM7QUFDQSxlQUFXLENBQVgsVUFBZSxBQUFGLENBQUk7QUFDaEIsU0FBRyxLQUFLLEFBQUMsRUFBQyxDQUFDO0FBQ1gsV0FBTyxDQUFBLEVBQUMsZ0JBQWdCLEFBQUMsQ0FBRSxJQUFHLE9BQU8sQ0FBRyxDQUFBLEVBQUMsbUJBQW1CLENBQUUsQ0FBQztJQUNoRTtBQUNBLG1CQUFlLENBQWYsVUFBbUIsQUFBRixDQUFJO0FBQ3BCLFdBQU8sQ0FBQSxFQUFDLE1BQU0sQ0FBRyxJQUFHLGFBQWEsQ0FBRSxDQUFDO0lBQ3JDO0FBQ0EsV0FBTyxDQUFQLFVBQVcsQUFBRixDQUFJO0FBQ1osU0FBRyxLQUFLLEFBQUMsRUFBQyxDQUFDO0FBQ1gsV0FBTyxDQUFBLEVBQUMsZ0JBQWdCLEFBQUMsQ0FBRSxJQUFHLE9BQU8sQ0FBRyxDQUFBLEVBQUMsZUFBZSxDQUFFLENBQUM7SUFDNUQ7QUFDQSxlQUFXLENBQVgsVUFBZSxBQUFGLENBQUk7QUFDaEIsV0FBTyxDQUFBLEVBQUMsTUFBTSxDQUFHLElBQUcsU0FBUyxDQUFFLENBQUM7SUFDakM7QUFDQSxXQUFPLENBQVAsVUFBVyxBQUFGLENBQUk7QUFDWixTQUFHLEtBQUssQUFBQyxFQUFDLENBQUM7QUFDWCxXQUFPLENBQUEsRUFBQyxnQkFBZ0IsQUFBQyxDQUFFLElBQUcsT0FBTyxDQUFHLENBQUEsRUFBQyxlQUFlLENBQUUsQ0FBQztJQUM1RDtBQUNBLGVBQVcsQ0FBWCxVQUFlLEFBQUYsQ0FBSTtBQUNoQixXQUFPLENBQUEsRUFBQyxNQUFNLENBQUcsSUFBRyxTQUFTLENBQUUsQ0FBQztJQUNqQztBQUFBLEVBQ0QsQ0FBRSxDQUFDO0FyQ3hRSCxTQ0FBLGFBQXdCO0FBQUUsdUJBQXdCO0lBQUUsRURBN0I7QUhFakIsQ0RGd0QsQ0FBQztBQUEvRCxLQUFLLGVBQWUsQUFBQyxvQkFBb0IsR0FBQyxDQ0ExQyxVQUFTLEFBQUQ7O0FDQVIsQUFBSSxJQUFBLENBQUEsWUFBVyxxQkFBb0IsQ0FBQztXSUFwQyxDQUFBLE1BQUssSUFBSSxBQUFDLDBDQUFrQjtBb0NXbkIsYUFBTztBQUFHLGVBQVM7QUFBRyxZQUFNO0FBQUcsWUFBTTtBQUFHLGtCQUFZO0FBQUcsTUFBQTtBQUFHLE1BQUE7QUFBRyxNQUFBO1dwQ1h0RSxDQUFBLE1BQUssSUFBSSxBQUFDLCtCQUFrQjtBb0NhbkIsWUFBTTtBQUFHLGtCQUFZO0FBQUcsaUJBQVc7V3BDYjVDLENBQUEsTUFBSyxJQUFJLEFBQUMseUNBQWtCO0FvQ2VuQixvQkFBYztBQUFHLHlCQUFtQjtBQUFHLHFCQUFlO0lBRXhELGtCQUFnQixFcENqQnZCLENBQUEsTUFBSyxJQUFJLEFBQUMsb0NBQWtCO1dBQTVCLENBQUEsTUFBSyxJQUFJLEFBQUMsMEJBQWtCO0FvQ21CbkIsT0FBQztBQUFHLE9BQUM7QUFBRyxXQUFLO0FBQUcsZUFBUztBQUFHLGlCQUFXO0FBQUcsYUFBTztBQUFHLGFBQU87QUFBRyxnQkFBVTtBQUNqRixPQUFLLEdBQUcsRUFBSSxHQUFDLENBQUM7QUFDZCxPQUFLLEdBQUcsRUFBSSxHQUFDLENBQUM7QUFDZCxPQUFLLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDdEIsT0FBSyxXQUFXLEVBQUksV0FBUyxDQUFDO0FBQzlCLE9BQUssYUFBYSxFQUFJLGFBQVcsQ0FBQztBQUNsQyxPQUFLLFNBQVMsRUFBSSxTQUFPLENBQUM7QUFDMUIsT0FBSyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBQzFCLE9BQUssWUFBWSxFQUFJLFlBQVUsQ0FBQztJQUV6QixRQUFNLEVwQzdCYixDQUFBLE1BQUssSUFBSSxBQUFDLDBCQUFrQjtBb0M4QjVCLE9BQUssUUFBUSxFQUFJLFFBQU0sQ0FBQztJQUVqQixPQUFLLEVwQ2hDWixDQUFBLE1BQUssSUFBSSxBQUFDLHlCQUFrQjtBb0NpQzVCLE9BQUssT0FBTyxFQUFJLE9BQUssQ0FBQztJQUtmLFFBQU0sRXBDdENiLENBQUEsTUFBSyxJQUFJLEFBQUMsMEJBQWtCO0FvQ3VDNUIsT0FBSyxRQUFRLEVBQUksUUFBTSxDQUFDO0lBR2pCLGtCQUFnQixFcEMxQ3ZCLENBQUEsTUFBSyxJQUFJLEFBQUMsb0NBQWtCO0FvQzJDNUIsT0FBSyxrQkFBa0IsRUFBSSxrQkFBZ0IsQ0FBQztJQUVyQyxTQUFPLEVwQzdDZCxDQUFBLE1BQUssSUFBSSxBQUFDLCtCQUFrQjtBb0M4QzVCLE9BQUssU0FBUyxFQUFJLFNBQU8sQ0FBQztJQUVuQixTQUFPLEVwQ2hEZCxDQUFBLE1BQUssSUFBSSxBQUFDLCtCQUFrQjtBb0NpRDVCLE9BQUssU0FBUyxFQUFJLFNBQU8sQ0FBQztZcENqRDFCLENBQUEsTUFBSyxJQUFJLEFBQUMsK0JBQWtCO0FvQ29EbkIsVUFBSTtBQUFHLGNBQVE7QUFBRyxXQUFLO0FBQUcsa0JBQVk7QUFBRyxnQkFBVTtBQUFHLGFBQU87QUFBRyxnQkFBVTtBQUNuRixPQUFLLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFDcEIsT0FBSyxVQUFVLEVBQUksVUFBUSxDQUFDO0FBQzVCLE9BQUssT0FBTyxFQUFJLE9BQUssQ0FBQztBQUN0QixPQUFLLGNBQWMsRUFBSSxjQUFZLENBQUM7QUFDcEMsT0FBSyxZQUFZLEVBQUksWUFBVSxDQUFDO0FBQ2hDLE9BQUssU0FBUyxFQUFJLFNBQU8sQ0FBQztBQUMxQixPQUFLLFlBQVksRUFBSSxZQUFVLENBQUM7SUFFekIsS0FBRyxFcEM3RFYsQ0FBQSxNQUFLLElBQUksQUFBQywyQkFBa0I7QW9DOEQ1QixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7SUFFWCxLQUFHLEVwQ2hFVixDQUFBLE1BQUssSUFBSSxBQUFDLHVCQUFrQjtBb0NpRTVCLE9BQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztJQUVYLFNBQU8sRXBDbkVkLENBQUEsTUFBSyxJQUFJLEFBQUMsK0JBQWtCO0FvQ29FNUIsT0FBSyxTQUFTLEVBQUksU0FBTyxDQUFDO1lwQ3BFMUIsQ0FBQSxNQUFLLElBQUksQUFBQyx3QkFBa0I7QW9Dc0VuQixTQUFHO0FBQUcsU0FBRztBQUFHLFNBQUc7QUFBRyxVQUFJO0FBQy9CLE9BQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNsQixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDbEIsT0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2xCLE9BQUssTUFBTSxFQUFJLE1BQUksQ0FBQztZcEMxRXBCLENBQUEsTUFBSyxJQUFJLEFBQUMsd0JBQWtCO0FvQzRFbkIsU0FBRztBQUFHLFNBQUc7QUFBRyxTQUFHO0FBQ3hCLE9BQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNsQixPQUFLLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDbEIsT0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0lBR1gsaUJBQWUsRXBDbEZ0QixDQUFBLE1BQUssSUFBSSxBQUFDLHVDQUFrQjtBb0NtRjVCLE9BQUssaUJBQWlCLEVBQUksaUJBQWUsQ0FBQztBQUUxQyxJQUFJO0FBQ0gsU0FBSyxLQUFLLEFBQUMsRUFBQyxDQUFDO0VBQ2QsQ0FBRSxPQUFRLEdBQUUsQ0FBSTtBQUNmLFVBQU0sS0FBSyxBQUFDLENBQUMsR0FBRSxNQUFNLENBQUMsQ0FBQztFQUN4QjtBQUFBLEF0Q3pGQSxXQUF1QjtBSEVqQixDREZ3RCxDQUFDO0EyQ0EvRCxLQUFLLElBQUksQUFBQyxDQUFDLG9CQUFtQixHQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJEOi93ZWIvcG9seW1lci9kZXYvZ2wtZWxlbWVudHMvYmluL2VuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiJEOi93ZWIvcG9seW1lci9kZXYvZ2wtZWxlbWVudHMvYmluLyIsInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3Rlck1vZHVsZSgkX19wbGFjZWhvbGRlcl9fMCwgW10sICRfX3BsYWNlaG9sZGVyX18xKTsiLCJmdW5jdGlvbigpIHtcbiAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzBcbiAgICAgIH0iLCJ2YXIgX19tb2R1bGVOYW1lID0gJF9fcGxhY2Vob2xkZXJfXzA7IixudWxsLCJyZXR1cm4gJF9fcGxhY2Vob2xkZXJfXzAiLCJnZXQgJF9fcGxhY2Vob2xkZXJfXzAoKSB7IHJldHVybiAkX19wbGFjZWhvbGRlcl9fMTsgfSIsIlN5c3RlbS5nZXQoJF9fcGxhY2Vob2xkZXJfXzApIixudWxsLCJ2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSAkX19wbGFjZWhvbGRlcl9fMSIsInZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xIiwiKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzAsICRfX3BsYWNlaG9sZGVyX18xLCAkX19wbGFjZWhvbGRlcl9fMikiLCIkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKCRfX3BsYWNlaG9sZGVyX18wKSIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMChcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzEsXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yLCB0aGlzKTsiLCIkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UiLCJmdW5jdGlvbigkY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkgJF9fcGxhY2Vob2xkZXJfXzBcbiAgICB9IiwiJGN0eC5zdGF0ZSA9ICgkX19wbGFjZWhvbGRlcl9fMCkgPyAkX19wbGFjZWhvbGRlcl9fMSA6ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICBicmVhayIsInJldHVybiAkX19wbGFjZWhvbGRlcl9fMCIsIiRjdHgubWF5YmVUaHJvdygpIiwicmV0dXJuICRjdHguZW5kKCkiLCJ2YXIgJF9fZGVmYXVsdCA9ICRfX3BsYWNlaG9sZGVyX18wIiwiKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoJF9fcGxhY2Vob2xkZXJfXzAsICRfX3BsYWNlaG9sZGVyX18xLCAkX19wbGFjZWhvbGRlcl9fMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zKSIsbnVsbCxudWxsLCJ2b2lkIDAiLG51bGwsImZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xO1xuICAgICAgICAgIHJldHVybiAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKSgkX19wbGFjZWhvbGRlcl9fMiwgJF9fcGxhY2Vob2xkZXJfXzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180KTtcbiAgICAgICAgfSgpIixudWxsLG51bGwsIiR0cmFjZXVyUnVudGltZS5zcHJlYWQoJF9fcGxhY2Vob2xkZXJfXzApIixudWxsLCIkdHJhY2V1clJ1bnRpbWUuc3VwZXJDb25zdHJ1Y3RvcihcbiAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIlN5c3RlbS5nZXQoJF9fcGxhY2Vob2xkZXJfXzAgKycnKSJdfQ==
