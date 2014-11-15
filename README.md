gl-elements
================

gl-elements are WebGL web components, providing 

* low level bindings to the full WebGL API, trying to stay as close as possible to the spec.
* higher levels of abstraction built on top of the low level elements.
* a smoother learning curve, eventually (at least i hope so) leading to a deeper understanding of the WebGL API

##Render Propagation

You can use the elements in pure HTML, without the need to write a single line of JS. All you need to know to do it is how those elements work together. 

1. After registration, once all elements are ready (in the `DOMReady` callback) the `gl-context` checks all its children for elements who have a `setupProgram` Method and calls it. The method returns a Promise that will eventually resolve in a 2dimensional array, containing all renderpasses from all programs and define the method `render` on the context.

2. The program does most of the work in building a renderpass. It first checks its own children for the ones who have a method `setupShader`, calls it and compiles a program. After this is done, it retrieves the ActiveInfo for all attributes and uniforms used in the shaders and then sets up the corresponding elements. This means all elements that are not needed will be ignored entirely and not result in any redundant API calls and (if possible) HTTP requests.

3. There is a still WIP system to reference elements by the names you use for attributes and uniforms in your shader code. Prefixing them with `class_*` will result in a query selection by class name, `id_*` to selectById, `attr_*` in selection by attribute and `*` (no-prefix) will try to fetch a property of the corresponding name from either the parent of the program or the gl-context element. This system is likely to change soon. You can also add suffixes to reach nested elements in the shadow dom I implemented to work with elements of higher abstraction but in retrospect it seems a bit tedious.


(the reference will follow after I finished going over each element)

#Tier 1 Elements Reference

Tier 1 elements are low level wrappers for WebGL objects. All T1 elements need to be initialized with the WebGLRenderingContext they are intended to be used with before any methods on them are invoked or states retrieved. You only need to do this if you want to use them individually with JS.

##gl-context (constructor: glContext) (extends: gl-rendertarget)

##gl-framebuffer (constructor: glFramebuffer) (extends: gl-rendertarget)

##gl-rendertarget Interface (extend:s gl-element)

##gl-texture (constructor: glTexture) (extends: gl-element)

##gl-program (constructor: glProgram) (extends: gl-element)

##gl-shader (constructor: glShader) (extends:gl-element)

##gl-vertexbuffer (constructor: glVertexbuffer) (extends: gl-element)

##gl-renderbuffer (todo)

##gl-element Interface (todo)


#Tier 2 Elements Reference

Tier 2 elements either wrap T1 elements for higher levels of abstraction or express other useful concepts and perform calculations. The T2 layer corresponds to concepts found in many other 3d libraries.

##gl-matrix (constructor: glMatrix)

###extends: gl-vector

##gl-vector (todo)

##gl-geometry (constructor: glGeometry)


#Tier 3 Elements (todo)

Tier 3 elements will take a while until I reach them. These elements will be more a engine level of abstraction.


#Tier 4 Elements (far away future)

Tier 4 elements are basically the goal of the whole thing, not sure if I ever reach it. I would like to one day provide a very highly abstract layer that will allow people without any programming skills to create their homepages in 3d, interconnect them with other homepages to create a 3d world, basically literal virtual "homes". It's a bit ambitious, and there is a lot of work and learning ahead, but I think I can make it. And after working on this after a quarter year I'm pretty sure I *want* to make it. 