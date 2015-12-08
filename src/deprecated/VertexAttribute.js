define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../webgl/VertexBuffer",
	"../material/Material",
	"../mesh/Attribute"
], function module (
	def,
	gl,
	VertexBufferObject,
	Material,
	Attribute
) {
	"use strict";

	class VertexAttribute extends Attribute {
		constructor ( structure ) {
			super( new VertexBuffer.Vertex, structure.type ? structure.type : structure );
		}
	}
	

	return VertexAttribute;
});