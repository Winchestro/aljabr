import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL } from "../webgl/Context.js";


Properties( WebGLUniformLocation.prototype, {
	set1f ( f ) {	gl.uniform1f( this,    f ); return this; },
	set2f ( f ) {	gl.uniform2f( this, ...f ); return this; },
	set3f ( f ) {	gl.uniform3f( this, ...f ); return this; },
	set4f ( f ) {	gl.uniform4f( this, ...f ); return this; },

	set1i ( i ) {	gl.uniform1i( this,    i ); return this; },
	set2i ( i ) {	gl.uniform2i( this, ...i ); return this; },
	set3i ( i ) {	gl.uniform3i( this, ...i ); return this; },
	set4i ( i ) {	gl.uniform4i( this, ...i ); return this; },
	
	set1fv ( v ) {	gl.uniform1fv( this, v ); return this; },
	set2fv ( v ) {	gl.uniform2fv( this, v ); return this; },
	set3fv ( v ) {	gl.uniform3fv( this, v ); return this; },
	set4fv ( v ) {	gl.uniform4fv( this, v ); return this; },

	set1iv ( v ) {	gl.uniform1iv( this, v ); return this; },
	set2iv ( v ) {	gl.uniform2iv( this, v ); return this; },
	set3iv ( v ) {	gl.uniform3iv( this, v ); return this; },
	set4iv ( v ) {	gl.uniform4iv( this, v ); return this; },

	setMat2	( m, transpose ) { gl.uniformMatrix2fv( this, transpose, m ); return this; },
	setMat3	( m, transpose ) { gl.uniformMatrix3fv( this, transpose, m ); return this; },
	setMat4	( m, transpose ) { gl.uniformMatrix4fv( this, transpose, m ); return this; },

	setFloat ( f1, f2, f3, f4 ) {
		f4 !== undefined ?	gl.uniform4f( this, f1, f2, f3, f4 ) :
		f3 !== undefined ?	gl.uniform3f( this, f1, f2, f3 ) :
		f2 !== undefined ?	gl.uniform2f( this, f1, f2 ) :
		f1 !== undefined ?	gl.uniform1f( this, f1 ) :
							console.warn( "setFloat expects 1-4 arguments" );
		return this;
	},
	setFloatVector ( v, size = 4 ) {
		switch ( size ) {
			case 4 : gl.uniform4fv( this, v ); break;
			case 3 : gl.uniform3fv( this, v ); break;
			case 2 : gl.uniform2fv( this, v ); break;
			case 1 : gl.uniform1fv( this, v ); break;
			default: console.warn("setFloatVector expects size 1-4"); break;
		}
		return this;
	},
	setInt ( i1, i2, i3, i4 ) {
		i4 !== undefined ? 	gl.uniform4i( this, i1, i2, i3, i4 ) :
		i3 !== undefined ? 	gl.uniform3i( this, i1, i2, i3 ) :
		i2 !== undefined ? 	gl.uniform2i( this, i1, i2 ) :
		i1 !== undefined ?	gl.uniform1i( this, i1 ) :
							console.warn( "setInt expects 1-4 arguments" );
		return this;
	},
	setIntVector ( v, size = 4 ) {
		switch ( size ) {
			case 4 : gl.uniform4iv( this, v ); break;
			case 3 : gl.uniform3iv( this, v ); break;
			case 2 : gl.uniform2iv( this, v ); break;
			case 1 : gl.uniform1iv( this, v ); break;
			default: console.warn("setIntVector expects size 1-4"); break;
		}
		return this;
	},
	setMatrix ( m, transpose = false ) {
		switch ( m.length ) {
			case  4 : gl.uniformMatrix2fv( this, transpose, m ); break;
			case  9 : gl.uniformMatrix3fv( this, transpose, m ); break;
			case 16 : gl.uniformMatrix4fv( this, transpose, m ); break;
			default : console.warn("setMatrix expects a typed array with length 4, 9 or 16"); break;
		}
		return this;
	}
});