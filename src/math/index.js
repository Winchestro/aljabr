import lerp from "../math/lerp.js";
import mat2 from "../math/mat2.js";
import mat3 from "../math/mat3.js";
import mat4 from "../math/mat4.js";
import vec2 from "../math/vec2.js";
import vec3 from "../math/vec3.js";
import vec4 from "../math/vec4.js";
import quat4 from "../math/quat4.js";
import Plane from "../math/Plane.js";
import Mesh from "../mesh/mesh.js";

import ObjectView from "../gui/ObjectView.js";

const Mat4 = new ObjectView;

Mat4.setValue( window, "ObjectView" );

document.body.appendChild( Mat4 );

window.d = Mat4;