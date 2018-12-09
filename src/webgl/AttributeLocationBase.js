import def from "../utilities/PropertyDescriptors.js";

export default class AttributeLocationBase {
    constructor ( index, size, offset, stride ) {
        
        if ( size === undefined ) size = 4;
        if ( offset === undefined ) offset = 0;
        if ( stride === undefined ) stride = 0;

        this.index = index;
        this.size = size;
        this.offset = offset;
        this.stride = stride;
    }
};