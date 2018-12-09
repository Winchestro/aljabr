import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";

export default class PolygonOffset {
    constructor ( factor, units ) {
        if ( factor !== undefined ) this.setFill( factor, units );
    }
    enable ( ) {
        this.enabled = true;
        PolygonOffset.enable();
        return this;
    }
    disable ( ) {
        this.enabled = false;
        PolygonOffset.disable();
        return this;
    }
    setFill ( factor, units ) {
        this.fillSet = true;
        if ( factor !== undefined ) this.factor = factor;
        if ( units !== undefined ) this.units = units;
        PolygonOffset.setFill( this.factor, this.units );
        return this;
    }
    unsetFill ( ) {
        this.fillSet = false;
        PolygonOffset.unsetFill();
        return this;
    }
    static enable ( ) {
        if ( !PolygonOffset.enabled ) {
            PolygonOffset.enabled = true;
            gl.enable( gl.POLYGON_OFFSET_FILL );
        }
        return PolygonOffset;
    }
    static disable ( ) {
        if ( PolygonOffset.enabled ) {
            PolygonOffset.enabled = false;
            gl.disable( gl.POLYGON_OFFSET_FILL );
        }
        return PolygonOffset;
    }
    static setFill ( factor, units ) {
        if ( factor === undefined ) factor = PolygonOffset.factor;
        if ( units === undefined ) units = PolygonOffset.units;

        PolygonOffset.fillSet = true;
        gl.polygonOffset(
            //GLfloat
            factor,
            //GLfloat
            units
        );
        return PolygonOffset;
    }
    static unsetFill ( ) {
        if ( PolygonOffset.fillSet ) {
            PolygonOffset.fillSet = false;
            gl.polygonOffset(
                PolygonOffset.factor,
                PolygonOffset.units
            );
        }
        return PolygonOffset;
    }
    get getEnabled()        { return gl.getParameter( gl.POLYGON_OFFSET_FILL );}
    get getFactor()         { return gl.getParameter( gl.POLYGON_OFFSET_FACTOR );}
    get getUnits()          { return gl.getParameter( gl.POLYGON_OFFSET_UNITS );}
}
def.Properties( PolygonOffset, {
    enabled : false,
    fillSet : false,
    factor  : 0,
    units   : 0
}, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );