import def from "../utilities/PropertyDescriptors.js";
import AttributeLocation from "../webgl/AttributeLocation.js";

export default class VertexStructure {
    constructor ( structure ) {
        let stride = VertexStructure.computeStride( structure );
        let byteOffset = 0;
        let index = 0;
        for ( let attributeName in structure ) {
            let attribute = structure[ attributeName ];

            let length = attribute.length;
            let location = new AttributeLocation( index, length, byteOffset, stride );

            def.Property( this, attributeName, location, def.CONFIGURABLE | def.ENUMERABLE );

            byteOffset += structure[ attributeName ].byteLength;
            index++;
        }

        def.Property( this, "stride", stride, def.CONFIGURABLE );
    }
    static computeStride ( structure ) {
        let stride = 0;
        for ( let view in structure ) stride += structure[ view ].byteLength;

        return stride;
    }
}