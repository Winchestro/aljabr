import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import Viewport from "../webgl/Viewport.js";
import mat4 from "../math/mat4.js";
import vec3 from "../math/vec3.js";
import vec4 from "../math/vec4.js";
import Scene from "../scene/Scene.js";
import Frustum from "../scene/Frustum.js";

const CACHE_VEC4 = new vec4;

const EYE = new vec3;
const TARGET = new vec3;

const UP = new vec3( 0, 0, 1 );
const CACHE_INV_TRANSFORM_MAT4 = new mat4;
const CACHE_INV_PROJECTION_MAT4 = new mat4;

const _x_ = 0;
const _y_ = 1;
const _z_ = 2;
const _w_ = 3;


export default class Camera {
    constructor ( scene ) {
        this.projection = new mat4;
        this.projectionInverse = new mat4;
        this.transform = new mat4;
        this.transformInverse = new mat4;
        this.frame = 0;

        if ( scene === undefined ) scene = new Scene;
        
        def.Properties( this, {
            scene,
            frustum : new Frustum,
            viewport : new Viewport,
            
            position : new vec3( 1 ),
            viewTarget : null,
            
            farCenter : new vec3,
            nearCenter : new vec3,
            direction : new vec3,

            trackViewTarget : false,

            renderTarget : null,
            drawCalls : 0
        }, def.WRITABLE | def.CONFIGURABLE );
    }
    project ( outV3 ) {
        CACHE_VEC4.setValues( outV3[_x_], outV3[_y_], outV3[_z_], 1 );

        CACHE_VEC4.multiplyMat4( this.transformInverse ).multiplyMat4( this.projection );

        let inverseW = 1 / CACHE_VEC4[_w_];
        
        CACHE_VEC4[_x_] *= inverseW;
        CACHE_VEC4[_y_] *= inverseW;
        CACHE_VEC4[_z_] *= inverseW;
        
        outV3[_x_] = CACHE_VEC4[_x_];
        outV3[_y_] = CACHE_VEC4[_y_];

        return outV3;
    }
    toScreenCoordinates ( outV2 ) {
        outV2[_x_] = ( outV2[_x_] + 1 ) / 2 * this.viewport.width;
        outV2[_y_] = ( -outV2[_y_] + 1 ) / 2 * this.viewport.height;

        return outV2;
    }

    toNormalizedDeviceCoordinates ( outV2 ) {
        outV2[_x_] = outV2[_x_] / this.viewport.width * 2 - 1;
        outV2[_y_] = -( outV2[_y_] / this.viewport.height * 2 - 1 );

        return outV2;
    }
    projectToScreenCoordinates ( outV3 ) {
        return this.toScreenCoordinates( this.project( outV3 ) );
    }
    unproject ( outV3 ) {
        CACHE_VEC4.setValues( outV3[_x_], outV3[_y_], outV3[_z_], 1 );

        CACHE_VEC4.multiplyMat4( this.projectionInverse ).multiplyMat4( this.transform );
        
        let inverseW = 1 / CACHE_VEC4[_w_];

        outV3[_x_] = CACHE_VEC4[_x_] * inverseW;
        outV3[_y_] = CACHE_VEC4[_y_] * inverseW;
        outV3[_z_] = CACHE_VEC4[_z_] * inverseW;

        return outV3;
    }
    unprojectFromScreenCoordinates( outV3 ) {
        return this.unproject( this.toNormalizedDeviceCoordinates( outV3 ) );
    }
    update ( ) {
        if ( this.trackViewTarget ) {
            this.transformInverse.makeLookAt( this.position, this.viewTarget, vec3.UP );
            this.transform.invert( this.transformInverse );
        } else {
            this.transform.setTranslation( this.position );
            
            this.transformInverse.invert( this.transform );
        }
        
        this.unproject( this.nearCenter.setValues( 0, 0, 0 ) );
        this.unproject( this.farCenter.setValues( 0, 0, 1 ) );
        this.direction.sub( this.nearCenter, this.farCenter ).normalize();
        this.frustum.update( this );

        this.scene.update( this );
    }
    draw ( ) {
        //gl.bindFramebuffer( gl.FRAMEBUFFER, this.renderTarget );
        gl.clear( gl.COLOR_BUFFER_BIT  | gl.DEPTH_BUFFER_BIT );
        this.drawCalls = 0;
        this.frame++;
        
        this.scene.draw( this );
    }

    
    createFrustumMesh ( ) {
        return this.scene.addChild( "frustum", this.frustum.createMesh() );
    }


}



export class Perspective extends Camera {
    constructor( near, far, fov, aspect ) {
        if ( near === undefined ) near = 0.1;
        if ( far === undefined ) far = 1000;
        if ( fov === undefined ) fov = Math.PI / 3;
        if ( aspect === undefined ) aspect = gl.canvas.width / gl.canvas.height;

        super( );
        
        this.projection.makePerspective( aspect, fov, near, far ),
        
        def.Properties( this, {
            near,
            far,
            fov,
            aspect
        }, def.WRITABLE );
    }

    updateProjection ( near, far, fov, aspect ) {
        if ( near === undefined ) near = this.near;
        else this.near = near;

        if ( far === undefined ) far = this.far;
        else this.far = far;

        if ( fov === undefined ) fov = this.fov;
        else this.fov = fov;

        if ( aspect === undefined ) aspect = this.aspect;
        else this.aspect = aspect;

        this.projection.makePerspective( aspect, fov, near, far );
        this.projectionInverse.invert( this.projection );
        return this;
    }

    updateViewport ( x, y, width, height ) {
        this.aspect = width / height;
        this.viewport.setDimensions( x, y, width, height );
        gl.setPixelRatio( window.devicePixelRatio );
        this.updateProjection();
    }
}

export class Orthographic extends Camera {
    constructor ( near, far, zoom ) {
        if ( near === undefined ) near = 0.1;
        if ( far === undefined ) far = 10;
        if ( zoom === undefined ) zoom = 1;
        
        super( );
        let width = this.viewport.width;
        let height = this.viewport.height;
        let x = this.viewport.x;
        let y = this.viewport.y;
        

        this.projection.makeOrthographic(
            ( -width + x ) * zoom,
            ( width + x ) * zoom,
            ( -height + y ) * zoom,
            ( height + y ) * zoom,
            near,
            far
        );
        this.projectionInverse.invert( this.projection );

        def.Properties( this, {
            near,
            far,
            zoom
        }, def.WRITABLE );
    }

    updateProjection( near, far, zoom ) {
        if ( near === undefined ) near = this.near;
        else this.near = near;

        if ( far === undefined ) far = this.far;
        else this.far = far;

        if ( zoom === undefined ) zoom = this.zoom;
        else this.zoom = zoom;

        let width = this.viewport.width;
        let height = this.viewport.height;
        let x = this.viewport.x;
        let y = this.viewport.y;

        this.projection.makeOrthographic(
            ( -width + x ) * zoom,
            ( width + x ) * zoom,
            ( -height + y ) * zoom,
            ( height + y ) * zoom,
            near,
            far
        );
        this.projectionInverse.invert( this.projection );
        return this;
    }

    updateViewport ( x, y, width, height ) {
        
        this.viewport.setDimensions( x, y, width, height );
        gl.setPixelRatio( );
        this.updateProjection();
    }
}
/*
def.Properties( Camera, {
    Perspective,
    Orthographic
}, def.CONFIGURABLE );*/