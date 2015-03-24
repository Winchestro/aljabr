/* 
	In the future all dependencies should resolve through this, but currently
	circular dependencies aren't supported. 

	For testing purposes and because native JS modules aren't availible yet I'm
	eporting to the global scope because I personally don't want namespaced access.

	In the future the user will be able to import both ways.

*/

import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

import { Uniform, UniformStruct, UniformArray } from "./utilities/ULUniforms";

import { VertexAttribute, VertexAttributeGroup, ElementAttribute } from "./utilities/ULGeometryAttributes";

import AttributeLocation from "./webgl/GLAttributeLocation";

import { gl, GL, canvas, extensions, capabilities, bindings, viewport, textureUnit } from "./webgl/GLContext";
parent.gl = gl;
parent.GL = GL;
parent.canvas = canvas;
parent.extensions = extensions;
parent.capabilities = capabilities;
parent.bindings = bindings;
parent.viewport = viewport;
parent.textureUnit = textureUnit;

import Program from "./webgl/GLProgram";
parent.Program = Program;

import Shader from "./webgl/GLShader";
parent.Shader = Shader;

//import Buffer from "./webgl/GLVertexbuffer";
//parent.Buffer = Buffer;

import Texture from "./webgl/GLTexture";
parent.Texture = Texture;
//import Renderbuffer from "./GLRenderbuffer";
//import Framebuffer from "./GLFramebuffer";
import VertexArrayObject from "./webgl/GLVertexArrayObject";
parent.VertexArrayObject = VertexArrayObject;

import Geometry from "./utilities/ULGeometry";
parent.Geometry = Geometry;

import Material from "./utilities/ULMaterial";
parent.Material = Material;


import { Alpha, DepthTest, Dither, PolygonOffset, StencilTest, CullFace, Multisample } from "./utilities/ULMaterial";
parent.Alpha = Alpha;
parent.DepthTest = DepthTest;
parent.Dither = Dither;
parent.PolygonOffset = PolygonOffset;
parent.StencilTest = StencilTest;
parent.CullFace = CullFace;
parent.Multisample = Multisample;

import Mesh from "./utilities/ULMesh";
parent.Mesh = Mesh;

import Draw from "./webgl/GLDraw";
parent.Draw = Draw;

import Resource from "./utilities/ULResource";
parent.Resource = Resource;

import { vec2, vec3, vec4, quat4 } from "./math/MLVector";
parent.vec2 = vec2;
parent.vec3 = vec3;
parent.vec4 = vec4;
parent.quat4 = quat4;

import { mat2, mat3, mat4 } from "./math/MLMatrix";
parent.mat2 = mat2;
parent.mat3 = mat3;
parent.mat4 = mat4;


import InterleavedArray from "./utilities/ULInterleavedArray";
parent.InterleavedArray = InterleavedArray;

try {
	parent.main();
} catch ( err ) {
	console.warn(err.stack);
}