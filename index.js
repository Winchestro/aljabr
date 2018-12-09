//const startTime = Date.now();


import Camera from "./src/scene/Camera.js";

import Frustum from "./src/scene/Frustum.js";
import Light from "./src/scene/Light.js";
import Scene from "./src/scene/Scene.js";
import Material from "./src/material/Material.js";

import Texture from "./src/webgl/Texture.js";

import Mesh from "./src/mesh/Mesh.js";
import EdgeList from "./src/mesh/EdgeList.js";
import FaceList from "./src/mesh/FaceList.js";
import VertexList from "./src/mesh/VertexList.js";
import Face from "./src/mesh/Face.js";

import Phong from "./src/material/Phong.js";
import VertexColors from "./src/material/VertexColors.js";
import VertexColorsPoint from "./src/material/VertexColorsPoint.js";

import Geometry from "./src/mesh/Geometry.js";

import Vertex from "./src/mesh/Vertex.js";
import Element from "./src/mesh/Element.js";
import Halfedge from "./src/mesh/Halfedge.js";

import mat2 from "./src/math/mat2.js";
import mat3 from "./src/math/mat3.js";
import mat4 from "./src/math/mat4.js";

import vec2 from "./src/math/vec2.js";
import vec3 from "./src/math/vec3.js";
import vec4 from "./src/math/vec4.js";

import quat4 from "./src/math/quat4.js";
import lerp from "./src/math/lerp.js";
import Plane from "./src/math/Plane.js";

import def from "./src/utilities/PropertyDescriptors.js";

import gl from "./src/webgl/Context.js";

import Viewport from "./src/webgl/Viewport.js";

import Perlin from "../lib/proc-noise-node/lib/proc-noise.js";

import Resource from "./src/resource/Resource.js";

import GlyphAtlas from "./src/utilities/GlyphAtlas.js";

import VoronoiMesh from "./examples/js/VoronoiMesh.js";
import Cube from "./src/primitives/Cube.js";
import Grid from "./src/primitives/Grid.js";
import Sphere from "./src/primitives/Sphere.js";
import Cylinder from "./src/primitives/Cylinder.js";
import Icosahedron from "./src/primitives/Icosahedron.js";
import Tetrahedron from "./src/primitives/Tetrahedron.js";
import Dodecahedron from "./src/primitives/Dodecahedron.js";

const APP = {

    handleEvent ( event ) {
        this[ event.type + "Handler" ]( event );
    },
    perlin : new Perlin,
    pressedKeys : new Set,
    KEY_W : "W".charCodeAt( 0 ),
    KEY_A : "A".charCodeAt( 0 ),
    KEY_S : "S".charCodeAt( 0 ),
    KEY_D : "D".charCodeAt( 0 ),
    KEY_Q : "Q".charCodeAt( 0 ),
    KEY_E : "E".charCodeAt( 0 ),
    KEY_X : "X".charCodeAt( 0 ),
    KEY_Y : "Y".charCodeAt( 0 ),
    KEY_V : "V".charCodeAt( 0 ),
    KEY_R : "R".charCodeAt( 0 ),
    KEY_SPACE : 32,
    KEY_SHIFT : 16,
    
    keydownHandler ( event ) {
        const keyCode = event.keyCode;

        this.pressedKeys.add( keyCode );

        if ( keyCode === APP.KEY_Y ) APP.loop();

    },

    keyupHandler ( event ) {
        this.pressedKeys.delete( event.keyCode );
    },

    keyBindings : {
        
    },


    dragging : false,
    mouse : new vec3,
    pointer : new vec3,
    pointerMovement : new vec3,
    pointerPrevious : new vec3,
    strafe : new vec3,

    mousedownHandler ( event ) {
        this.dragging = true;

        let x = event.clientX;
        let y = event.clientY;

        

        const LEFT = 1;
        const MIDDLE = 2;
        const RIGHT = 3;

        switch ( event.which ) {

            case LEFT : {
                //console.log( this.selectedVertex );
            } break;

            case RIGHT : {

            } break;
        }

        //this.camera.unproject( new vec3( x, y, 0 ) );
    },

    mouseupHandler ( event ) {
        this.dragging = false;
    },

    mousemoveHandler ( event ) {
        let x = event.clientX;
        let y = event.clientY;
        let dragging = this.dragging;
        let mouse = this.mouse;
        let pointer = this.pointer;
        let pointerMovement = this.pointerMovement;
        let pointerPrevious = this.pointerPrevious;
        let light = this.light;

        pointer.setValues( x, y );
        pointerMovement.sub( pointer, pointerPrevious );

        mouse[ 0 ] = ( pointer[ 0 ] / innerWidth * 2 ) - 1;
        mouse[ 1 ] = ( pointer[ 1 ] / innerHeight * 2 ) - 1;
        mouse[ 2 ] = 0;

        if ( dragging ) {
            //this.camera.transform.rotateX( pointerMovement[ 1 ] / 100 );
            //this.camera.transform.rotateY( pointerMovement[ 0 ] / 100 )
        } else {
            //light.position[ 0 ] = Math.sin( mouse[ 0 ] / 2 * Math.PI ) * 100;
            //light.position[ 1 ] = -Math.sin( mouse[ 1 ] / 2 * Math.PI ) * 100;

        }
        pointerPrevious.setValues( x, y );
    },

    wheelHandler ( event ) {

        //polyfill and normalize the delta across browsers.
        let wheelDelta = event.wheelDelta === undefined ? -event.deltaY : event.wheelDelta;
        let delta = wheelDelta / Math.abs( wheelDelta ) * 10;

        this.camera.zoomVelocity -= delta;
        //console.log( event, wheelDelta, delta );
        //this.camera.position.addValues( 0, 0, -delta );
        //this.camera.position.add( this.forward.set( this.camera.direction ).multiplyScalar( delta ) );
        //this.camera.zoom -= delta * .001;
        //this.camera.updateProjection();
    },

    resizeHandler ( event ) {
        let width = gl.canvas.clientWidth;
        let height = gl.canvas.clientHeight;
        gl.canvas.width = width;
        gl.canvas.height = height;
        
        this.camera.updateViewport( 0, 0, width, height );
    },

    initialize ( ) {
        document.body.appendChild( gl.canvas );
        gl.canvas.width = gl.canvas.clientWidth;
        gl.canvas.height = gl.canvas.clientHeight;
        window.gl = gl;
        gl.clearColor( 0,.0,0, 1 );

        //let camera = new Camera.Orthographic( -500, 500, .1 );
        let camera = window.camera = new Camera.Perspective( .01, 1000 );
        let scene = window.scene = camera.scene;
        let light = window.light = new Light.Directional;

        camera.updateViewport( 0, 0, innerWidth, innerHeight );
        camera.zoom = 10;
        camera.zoomVelocity = 0;
        camera.zoomFriction = .85;
        //camera.frustum.setOffset( 5 );
        //camera.createFrustumMesh();

        //camera.transform.rotateValues( Math.PI / 4, 0, 0, 1 );
        //camera.zoom = .8;
        camera.viewTarget = new vec3( 0, 1, 0 );
        camera.trackViewTarget = true;
        camera.position.setValues( 0, 0, 50 );
        camera.updateProjection();

        scene.lights.push( light );
        
        console.time("mesh gen")
        let voronoi = window.voronoi = new VoronoiMesh( 1000, 6 );
        console.timeEnd("mesh gen");

        //let glyphAtlas = window.glyphAtlas = new GlyphAtlas( "font : 20px Helvetica; color : #DDD;" );


        let vertexColorMaterial = new VertexColors;
        let phongMaterial = new Phong;
        let vertexColorPointMaterial = new VertexColorsPoint;

        
        //let grid = new Grid( 210, 210, 100 );

        //grid.createPointElement( vertexColorPointMaterial ).createLineElement( vertexColorMaterial ).createTriangleElement( phongMaterial );
        
        //scene.addChild( "grid", grid );
        /*
        for ( let vertex of voronoi.triangulation.geometry.vertices ) {
            let label = glyphAtlas.createTextMesh( vertex.index );
            label.transform.setTranslation( vertex.position );
            label.scale.setValues( 30, 30 );
            voronoi.triangulation.addChild( "label" + vertex.index, label );
            
        }*/


        scene.addChild( "voronoi", voronoi );

        voronoi.scale.setValues( 1,1,0);

        gl.canvas.addEventListener( "mousemove", this );
        gl.canvas.addEventListener( "wheel", this );
        window.addEventListener( "keydown", this );
        window.addEventListener( "keyup", this );
        window.addEventListener( "resize", this );
        gl.canvas.addEventListener( "mousedown", this );
        window.addEventListener( "mouseup", this );
        //gl.canvas.addEventListener( "contextmenu", (e)=>e.preventDefault() );

        
        def.Properties( this, {
            camera,
            scene,
            light
        });

        this.loop();
    },

    loop ( ) {
        let interrupt = null;

        try {

            APP.update();
            APP.redraw();
        } catch ( error ) {
            if ( error ) interrupt = error;
        } finally {
            if ( interrupt ) throw interrupt;
            else if ( !APP.pressedKeys.has( APP.KEY_X ) ) requestAnimationFrame( APP.loop );
        }
    },

    vertexPosition : new vec3,
    selectedVertex : null,
    originalVertexColor : new vec4,
    forward : new vec3,
    upward : new vec3,
    update ( ) {
        let speed = .5;
        let forward = this.forward;
        let upward = this.upward;
        let strafe = this.strafe;
        let camera = this.camera;
        let position = camera.position;
        let direction = camera.direction;
        let viewTarget = camera.viewTarget;
        let pressedKeys = this.pressedKeys;
        let mouse = this.mouse;
        
        let vertexPosition = this.vertexPosition;
        let originalVertexColor = this.originalVertexColor;
        let nearestDistance = Infinity;
        let nearestVertex = null;


        let zoom = camera.position[ 2 ];
        const MIN_ZOOM = 1.1;
        const MAX_ZOOM = 900;
        
        
        let zoomTo = camera.zoom + camera.zoomVelocity;

        if ( zoomTo < MIN_ZOOM ) {
            camera.zoom = MIN_ZOOM;
            camera.zoomVelocity = 0;
        }
        else if ( zoomTo > MAX_ZOOM ) {
            camera.zoom = MAX_ZOOM;
            camera.zoomVelocity = 0;
        }
        else camera.zoom = zoomTo;

        let zoomRange = MAX_ZOOM - MIN_ZOOM;
        camera.position[ 2 ] = Math.pow( (( camera.zoom - MIN_ZOOM ) / zoomRange ) , 2 ) * zoomRange + MIN_ZOOM;
        camera.zoomVelocity *= camera.zoomFriction;

        
        const UP = vec3.UP;
        /*
        for ( let i = 0, vertex = null; vertex = voronoi.triangulation.geometry.vertices[ i ]; i++ ) {
            vertexPosition.set( vertex.position );

            camera.project( vertexPosition );

            vertexPosition[ 0 ] -= mouse[ 0 ]
            vertexPosition[ 1 ] -= -mouse[ 1 ]
            vertexPosition[ 0 ] *= vertexPosition[ 0 ]
            vertexPosition[ 1 ] *= vertexPosition[ 1 ]

            let distanceSquared = vertexPosition[ 0 ] + vertexPosition[ 1 ];

            if ( distanceSquared < nearestDistance ) {
                nearestDistance = distanceSquared;
                nearestVertex = vertex;
            }
        }

        if ( nearestVertex && this.selectedVertex !== nearestVertex ) {

            if ( this.selectedVertex ) {
                this.selectedVertex.color.set( originalVertexColor );
                this.selectedVertex.color.buffer.update( this.selectedVertex.color );
            }

            originalVertexColor.set( nearestVertex.color );
            nearestVertex.color.setValues( 1,0,0,1 );
            nearestVertex.color.buffer.update( nearestVertex.color );
            this.selectedVertex = nearestVertex;
        }*/

        //if ( viewTarget ) viewTarget.setValues( mouse[ 0 ] * 1000, -mouse[ 1 ] * 1000, -50 );

        forward.multiplyValues( 1,1,0, direction ).normalize().multiplyScalar( speed );
        strafe.cross( direction, UP ).normalize().multiplyScalar( speed );
        upward.cross( strafe, direction ).normalize().multiplyScalar( speed );

        if ( pressedKeys.has( APP.KEY_W ) ) {
            
            position.add( forward ); 
            viewTarget.add( forward );
        }
        else if ( pressedKeys.has( APP.KEY_S ) ) {
            
            forward.multiplyScalar( -1 );
            position.add( forward );
            viewTarget.add( forward );
            forward.multiplyScalar( -1 );
        }
        if ( pressedKeys.has( APP.KEY_D ) ) {
            
            position.add( strafe );
            viewTarget.add( strafe );
        }
        else if ( pressedKeys.has( APP.KEY_A ) ) {
           
            strafe.multiplyScalar( -1 );
            position.add( strafe ); 
            viewTarget.add( strafe );
            strafe.multiplyScalar( -1 );
        }
        if ( pressedKeys.has( APP.KEY_Q ) ) position.add( strafe );
        else if ( pressedKeys.has( APP.KEY_E ) ) {
            
            strafe.multiplyScalar( -1 );
            position.add( strafe );
           
            strafe.multiplyScalar( -1 );
        }
        if ( pressedKeys.has( APP.KEY_SPACE ) ) position.add( upward );
        else if ( pressedKeys.has( APP.KEY_SHIFT ) ) {
            upward.multiplyScalar( -1 );
            position.add( upward );
        }

        camera.update();
    },
    redraw ( ) {
        APP.camera.draw();
    }
};

window.APP = APP;

APP.initialize();