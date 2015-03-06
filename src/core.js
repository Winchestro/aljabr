import * as context from "./GLContext";

import Program from "./GLProgram";
import Shader from "./GLShader";
import Buffer from "./GLVertexbuffer";
import Texture from "./GLTexture";
//import Renderbuffer from "./GLRenderbuffer";
//import Framebuffer from "./GLFramebuffer";
import VertexArrayObject from "./GLVertexArrayObject";

import Geometry from "./utilities/ULGeometry";
import Material from "./utilities/ULMaterial";
import { alpha, depthTest, dither, polygonOffset, stencilTest, cullFace, sampleCoverage } from "./utilities/ULMaterial";
import Mesh from "./utilities/ULMesh";

import Resource from "./utilities/ULResource";

import { vec2, vec3, vec4, quat4 } from "./math/MLVector";
import { mat4 } from "./math/MLMatrix";
import { InterleavedFloat32 } from "./utilities/ULInterleavedArrays";

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
} catch ( err ) {
	console.warn(err.stack);
}