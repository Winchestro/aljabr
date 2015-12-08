define ( [
	"../utilities/PropertyDescriptors",
	"../material/Material"
], function module (
	def,
	Material
) {
	"use strict";
	const NIL = -1;

	class DisplayList extends Array {
		draw ( scene, camera, lights, mesh ) {
			for ( let drawable of this ) drawable.draw( scene, camera, lights, mesh );
			return this;
		}
		
	}
	return DisplayList;
});
