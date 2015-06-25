import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";

import Material from "../mesh/Material.js";

export class Drawable {
	
}

Properties( Drawable.prototype, {
	material : Material.DEFAULT,
	draw ( offset, count ) {
		// every class implementing this interface provide a draw method taking offset and
		// count as arguments that default to no offset and count max, so calling draw
		// without arguments results in everything being drawn.
	},
	setMaterial ( material ) {
		Property( this, "material", material, C );
		return this;
	},
});


export class DisplayList extends Drawable {

}

Properties( DisplayList.prototype, {
	length : 0,
}, C );
DisplayList.prototype[ Symbol.iterator ] = [][ Symbol.iterator ];

Properties( DisplayList.prototype, {
	setMaterial ( material ) {
		for ( let drawable of this ) drawable.setMaterial( material );
		return this;
	},
	addDrawable ( drawable, index = this.length ) {
		Property( this, index, drawable, E | C );
		Property( this, "length", this.length + 1, C );
		return this;
	},
	removeDrawable ( index = 0 ) {
		for ( let i = index; i < this.length; i++ ) Property( this, i, this[ i + 1 ], C | E );
		Property( this, "length", this.length - 1, C );
		delete this[ length ];
		return this;
	},
	draw ( offset, count ) {
		for ( let drawable of this ) drawable.draw( offset, count );
		return this;
	}
});
