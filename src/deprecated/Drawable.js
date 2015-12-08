define ( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../material/Material"
], function module (
	def,
	gl,
	Material
) {
	"use strict";
	
	const DRAW_TYPES = {
		[ gl.LINES ] : "LINES",
		[ gl.LINE_STRIP ] : "LINE_STRIP",
		[ gl.LINE_LOOP ] : "LINE_LOOP",
		[ gl.TRIANGLES ] : "TRIANGLES",
		[ gl.TRIANGLE_STRIP ] : "TRIANGLE_STRIP",
		[ gl.TRIANGLE_FAN ] : "TRIANGLE_FAN",
		[ gl.POINTS ] : "POINTS"
	};

	class Drawable {
		setDrawType ( drawType ) {
			def.Property( this, "drawType", drawType, def.CONFIGURABLE );
			return this;
		}
		get drawTypeString ( ) {
			return DRAW_TYPES[ this.drawType ];
		}
	}

	return Drawable;
});
