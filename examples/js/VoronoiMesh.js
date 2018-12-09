import Voronoi from "../../../lib/Javascript-Voronoi/rhill-voronoi-core.js";
import Perlin from "../../../lib/proc-noise-node/lib/proc-noise.js";

import def from "../../src/utilities/PropertyDescriptors.js";
import vec3 from "../../src/math/vec3.js";
import vec4 from "../../src/math/vec4.js";
import mat4 from "../../src/math/mat4.js";
import Geometry from "../../src/mesh/Geometry.js";
import Mesh from "../../src/mesh/Mesh.js";

import gl from "../../src/webgl/Context.js";
import VertexList from "../../src/mesh/VertexList.js";
import Material from "../../src/material/Material.js";

import Phong from "../../src/material/Phong.js";
import VertexColors from "../../src/material/VertexColors.js";

import VertexColorsPoint from "../../src/material/VertexColorsPoint.js";

const bbox = { xl: -100, xr: 100, yt: -100, yb: 100 };
const perlin = new Perlin;

class LandMaterial extends Material.Phong {
    constructor ( ) {
        super();
        this.offset.enable().setFill( 1, 1 );
        //this.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA );
    }
}

class WaterMaterial extends Material.Phong {
    constructor ( ) {
        super();
        this.depth.disableWrite();
        this.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA );
        //this.offset.enable().setFill( 1, 0 );
    }
}

class EdgeMaterial extends Material.VertexColors {
}

class PointMaterial extends Material.VertexColorsPoint {
    constructor ( ) {
        super();
        this.alpha.enable().setFunc( gl.SRC_ALPHA , gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE );
    }
}


export default class VoronoiMesh {
    constructor ( amount, smooth, NOISE_SCALE, MAP_HEIGHT ) {
        if ( NOISE_SCALE === undefined ) NOISE_SCALE = 0.008;
        if ( MAP_HEIGHT === undefined ) MAP_HEIGHT = 30;

        let uniforms = {
            scale : new vec3( 1, 1, 1 ),
            transform : new mat4,
            pointSize : 10
        };

        let landMaterial = new LandMaterial;
        let waterMaterial = new WaterMaterial;
        let edgeMaterial = new EdgeMaterial;
        let pointMaterial = new PointMaterial;

        
        
        

       


        /*
            full map generation

            voronoi diagram -> voronoi mesh -> delaunay triangulation -> triangulation mesh -> render processing steps -> final render mesh

            voronoi mesh and delaunay mesh are one interconnected dual-graph and internally used for graph searches / graph traversal.

            the final render mesh is generated and updated from them and sent to the gpu.

            
            
        

        */
       

        let diagram = createSmooth( amount, bbox, smooth );

        let cells = new Geometry;
        cells.vertices.allocateItems( diagram.vertices.length ).createItems();

        let triangulation = new Geometry;
        triangulation.vertices.allocateItems( diagram.cells.length ).createItems();

        
        for ( let i = 0, end = diagram.vertices.length; i < end; i++ ) {
            let sourceVertex = diagram.vertices[ i ];
            
            sourceVertex.id = i;
            let targetVertex = cells.vertices[ i ];
          
            targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, 0 );
            targetVertex.color.setValues( 1,1,1,1 );
            targetVertex.normal.setValues( 0,0,1 );
            targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ),  .5 * ( 1 + sourceVertex.y ) );
            //createIndexLabel( cells, i, "c_"+i/*faceIndices.join(" / ")*/, 2 );
        }
        
        let faceIndices = [];
        
        
            
        for ( let i = 0; i < diagram.cells.length; i++ ) {
            let cell = diagram.cells[ i ];
            let sourceVertex = diagram.cells[ i ].site;
            let targetVertex = triangulation.vertices[ i ];
            
            for ( let halfedge of cell.halfedges ) faceIndices.unshift( halfedge.getStartpoint().id );
            

            let face = cells.createFace.apply( cells, faceIndices );

            

            face.site = targetVertex;
            diagram.cells[ i ].vertex = targetVertex;
            

            //let z = sourceVertex.z;
            let z = scaledNoise( sourceVertex.x, sourceVertex.y, NOISE_SCALE );
            /*
            let g;
            ( z > 0 ) ? g = ( z + .5 ) * 0.75 : g = 0;
            let b;
            ( z < 0 ) ? b = 1 : b = 0;
            */
        
            //setColor( targetVertex.color, z );
            
            targetVertex.color.setValues( .62,.85,0, 1 );

            //let b = Math.min( z, 0 ) + .5;
            //console.log( z );

            targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, z * 50 );
            
            targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ), .5 * ( 1 + sourceVertex.y ) );
            faceIndices.length = 0;
        }
       

        

        {
            let v0 = new vec3;
            let v1 = new vec3;

            // create triangle mesh faces and compute face normals
            for ( let i = 0; i < cells.vertices.length; i++ ) {
                let vertex = cells.vertices[ i ];
                
                for ( let face of vertex.faces() ) {
                    faceIndices.push( face.site.index );
                }

                //console.log( faceIndices.length, i );
                //createIndexLabel( cells, i, faceIndices.join(" / "), 5 );
                if ( faceIndices.length === 3 ) {
                    
                    let face = triangulation.createFace.apply( triangulation, faceIndices );
                    face.vertex = vertex;
                    
                    let vertices = triangulation.vertices.dereference( faceIndices );

                    vec3.sub( v0, vertices[ 0 ].position, vertices[ 1 ].position );
                    vec3.sub( v1, vertices[ 2 ].position, vertices[ 0 ].position );

                    //let faceNormal = v0.cross( v1 );

                    face.normal.cross( v1, v0 );
                }

                
                faceIndices.length = 0;
            }
        }
        // compute vertex normals from face normals
        {
            let normal = new vec3;
            for ( let vertex of triangulation.vertices ) {

                let count = 0;

                for ( let face of vertex.faces() ) {
                    if ( face.normal ) {
                        count++;
                        normal.add( face.normal );
                    }
                }  
                normal.divideScalar( count ).normalize();
                
                vertex.normal.set( normal );

                normal.setValues( 0,0,0 );
            }
        }


        // create the renderGeometry
      
        let divisions = 0;
        
        for ( let edge of triangulation.edges ) {
            let halfedge = edge.a ? edge.a : edge.b;

            let a = halfedge.toVertex.position;
            let b = halfedge.fromVertex.position;

            let steps = Math.abs( Math.floor( a[ 2 ] ) - Math.floor( b[ 2 ] ) );
            
            divisions += steps;
        }

        /*
        let renderGeometry = new Geometry;

        renderGeometry.vertices.allocateItems( diagram.cells.length + divisions * 4 );
        
        {
            let vertices = renderGeometry.vertices;
            let edges = renderGeometry.edges;
            let faces = renderGeometry.faces;

           
            // set up renderGeometry vertices based on triangulation
            for ( let i = 0; i < triangulation.vertices.length; i++ ) {
                let sourceVertex = triangulation.vertices[ i ];
                let targetVertex = vertices.createItem();

                targetVertex.position.setValues( sourceVertex.position[ 0 ], sourceVertex.position[ 1 ], Math.floor( sourceVertex.position[ 2 ] ) );
                targetVertex.color.set( sourceVertex.color );
                targetVertex.normal.setValues( 0, 0, -targetVertex.position[2] - 10 );
            }
            // take renderGeometry connectivity from triangulation
            for ( let face of triangulation.faces ) {
                let vertexIter = face.vertices();
                let vertexA = vertices[ vertexIter.next().value.index ];
                let vertexB = vertices[ vertexIter.next().value.index ];
                let vertexC = vertices[ vertexIter.next().value.index ];
                
                renderGeometry.createFaceFromVertices( vertexA, vertexB, vertexC );
            }   

            {
                let a = new vec3;
                let b = new vec3;
                let c = new vec3;
                let d = new vec3;

                let length = edges.length;
                let transformFaces = new Set;
                //renderGeometry.clearSelections();

                
                for ( let i = 0; i < length; i++ ) {
                    let halfedgeA = edges.halfedgeA[ i ];
                    let halfedgeB = edges.halfedgeB[ i ];

                    let toVertex = halfedgeA.toVertex;
                    let fromVertex = halfedgeA.fromVertex;

                    a.set( toVertex.position );
                    b.set( fromVertex.position );
                    

                    let aZ = Math.floor( a[2] );
                    let bZ = Math.floor( b[2] );
                    

                    let steps = Math.abs( aZ - bZ );


                    
                    let step = 1 / ( steps + 1 );
                    let zDirecton = ( bZ - aZ ) / steps;

                    b[2] = a[2];

                    c.lerp( .25, a, b );
                    d.lerp( .25, b, a );
                    
                    if ( steps ) {
                        

                        
                        let v = halfedgeA.splitEdge();

                        v.position.set( c );
                        v.position[2] = aZ;
                        v.normal[2] = aZ;
                        v.color.set( toVertex.color );
                    }


                    for ( let i = 0; i < steps; i++ ) {
                        let v = halfedgeA.splitEdge();

                        transformFaces.add( halfedgeA.face );
                        if ( halfedgeA.oppositeHalfedge ) transformFaces.add( halfedgeA.oppositeHalfedge.face );
                        
                        v.position.lerp(( i + 1 ) * step, c, d );


                        //vec3.addValues( newVertex.position, 0, 0, 6 );
                        

                        //v.position[2] = aZ + i * zDirecton + zDirecton / 2;
                        v.position[2] = v.normal[2] = aZ + i * zDirecton + zDirecton / 2;   

                        
                        v.color.lerp( ( i + 1 ) * step, fromVertex.color, toVertex.color );
                        //newVertex.color.setValues( 1,1,1,1 );
                        //v.color.addValues( .25, .25, .25, 0 );
                        //newVertex.normal.setValues( 0,0,1 );
                    }

                    if ( steps ) {
                        

                        let v = halfedgeA.splitEdge();
                        
                        v.position.set( d );
                        v.position[2] = bZ;
                        //innerVertex.position[2] = bZ - ( zDirecton / 16 );
                        v.position[2] = v.normal[2] = bZ;
                        v.color.set( fromVertex.color );
                    
                    }
                    
                }
                
                for ( let face of transformFaces ) if ( face.length > 3 ) splitFacesRecursive( face );

                function splitFacesRecursive ( face ) {
                        
                    let halfedgeA = face.halfedge;
                    let vertexA = halfedgeA.toVertex;

                    let halfedgeB = halfedgeA.nextHalfedge;
                    let vertexB = halfedgeB.toVertex;

                    let length = face.length;

                    for ( let a = 0; a < length; a++  ) {
                        //if ( a > 1 ) debugger;
                        for ( let b = 0; b < length; b++ ) {
                            let cA = vertexA.normal[2];
                            let cB = vertexB.normal[2];

                            if (
                                cA === cB &&
                                halfedgeA !== halfedgeB &&
                                halfedgeA.nextHalfedge !== halfedgeB &&
                                halfedgeB.nextHalfedge !== halfedgeA ) {

                                let direction = ( b + 1 ) - a;

                                let newFace;

                                if ( direction > 0 ) newFace = halfedgeB.splitFace( halfedgeA );
                                else newFace = halfedgeA.splitFace( halfedgeB );

                                if ( face.length > 3 ) splitFacesRecursive( face );
                                if ( newFace.length > 3 ) splitFacesRecursive( newFace );
                                return;
                            }

                            halfedgeB = halfedgeB.nextHalfedge;
                            vertexB = halfedgeB.toVertex;
                        }
                        halfedgeA = halfedgeA.nextHalfedge;
                        vertexA = halfedgeA.toVertex;
                    }

                }

                let v0 = new vec3;
                let v1 = new vec3;
                for ( let face of faces ) {
                    let halfedge = face.halfedge;

                    let vA = halfedge.toVertex.position;
                    halfedge = halfedge.nextHalfedge;
                    let vB = halfedge.toVertex.position;
                    halfedge = halfedge.nextHalfedge;
                    let vC = halfedge.toVertex.position;

                    v0.sub( vA, vB );
                    v1.sub( vC, vA );
                    face.normal.cross( v1, v0 );
                }

                for ( let vertex of vertices ) {
                    let normal = vertex.normal;
                    
                    normal.setValues( 0,0,0 );
                    let count = 0;

                    for ( let face of vertex.faces() ) {
                        if ( face ) {
                            count++;
                            normal.add( face.normal );
                        }
                    }  
                    normal.divideScalar( count ).normalize();
                }

            }
        }
        

        
        renderGeometry.vertices.allocateTarget();
        let renderMesh = new Mesh( renderGeometry );

        renderMesh
            .createPointElement( pointMaterial )
            .createLineElement( edgeMaterial )
            .createTriangleElement( landMaterial )
        ;           
        
        renderMesh.pointSize = 15;
        renderMesh.points.visible = false;
        //renderGeometry.lines.visible = false;
        //renderGeometry.triangles.visible = false;
        //renderMesh.createNormalElement( edgeMaterial, 1.0 );

        */
        triangulation.vertices.allocateTarget();
        triangulation = new Mesh( triangulation )
            .createPointElement( pointMaterial )
            .createLineElement( edgeMaterial )
            .createTriangleElement( landMaterial )
        ;

        triangulation.pointSize = 5;
        //triangulation.points.visible = false;
        //triangulation.lines.visible = false;
        triangulation.triangles.visible = false;

        cells.vertices.allocateTarget();
        cells = new Mesh( cells )
            .createPointElement( pointMaterial )
            .createLineElement( edgeMaterial )
            .createTriangleElement( waterMaterial )
        ;

        cells.pointSize = 5;
        cells.points.visible = false;
        //cells.lines.visible = false;
        cells.triangles.visible = false;

        //triangulation.scale = [1,1,0];

        def.Properties( this, {
            //renderMesh,
            cells,
            triangulation,
            diagram,
            landMaterial,
            waterMaterial,
            edgeMaterial,
            
        });

        def.Properties( this, uniforms, def.ENUMERABLE | def.WRITABLE );

        def.Properties( this, {
            visible : true,

        }, def.WRITABLE );


        
        function scaledNoise( x, y, scale ) {
            let n = ( perlin.noise( x * scale, y * scale ) );

            return  n;
        }

        function clamp ( v, max, min ) {
            return Math.min( max, Math.max( min, v )  );
        }

        function setColor ( in_vec4, z ) {
            
            let h = z;
            
            in_vec4[ 0 ] = 1;
            in_vec4[ 1 ] = 1;
            in_vec4[ 2 ] = 1;
            in_vec4[ 3 ] = 1;
            
            return in_vec4;
            
        }

        function createSmooth ( numSites, bbox, steps ) {
            let sites = [];
            let voronoi = new Voronoi();
            let width = bbox.xr - bbox.xl;
            let height = bbox.yb - bbox.yt;
            
            
            let distanceToCenter;
            const sqrt2 = Math.sqrt( 2 );

            for ( let i = 0; i < numSites; i++ ) {
                let x, y, z;
                
                do {
                    let rx = Math.random();
                    let ry = Math.random();

                    x = rx * width - width * .5;
                    y = ry * height - height * .5;

                    distanceToCenter = Math.sqrt( Math.pow( rx - .5, 2 ) + Math.pow( ry - .5, 2 ) ) * sqrt2;
                    
                    //z = scaledNoise( x, y, NOISE_SCALE );
                } while ( ( z = scaledNoise( x, y, NOISE_SCALE ) * ( 1 - distanceToCenter ) ) < Math.pow( Math.random(), .5 ) );
                sites.push({
                    x,
                    y,
                    z : z
                
                });

            }
            normalize ( sites );

            let diagram = voronoi.compute( sites, bbox );
        
            while( steps ) {
                sites.length = 0;
                diagram.cells.forEach( function ( cell ) {
                    var avgX = cell.halfedges.reduce(
                        function ( p, c ) { return p + c.edge.va.x + c.edge.vb.x }
                        ,0
                    ) / 2 / cell.halfedges.length;
                    var avgY = cell.halfedges.reduce(
                        function ( p, c ) { return p + c.edge.va.y + c.edge.vb.y }
                        ,0
                    ) / 2 / cell.halfedges.length;
                    cell.site.x = avgX;
                    cell.site.y = avgY;
                    sites.push( cell.site );
                })
                voronoi.recycle( diagram );
                diagram = voronoi.compute( sites, bbox );
                steps--;
            }

            function normalize ( sites ) {
                let average = 0;
                let min = Infinity;
                let max = -Infinity;
                let magnitude = 0;

                for ( let i = 0, site; site = sites[ i ]; i++ ) {
                    let z = site.z;
                    average += z; 
                    if ( z < min ) min = z;
                    if ( z > max ) max = z;
                }
                average /= sites.length;
                magnitude = max - min;

                for ( let i = 0, site; site = sites[ i ]; i++ ) {
                    let z = site.z;

                    site.z = ( z - min ) / magnitude;

                }
                console.log( average, min, max, magnitude );
            }

            return diagram;
        }
    }

    generate ( amount, smooth, NOISE_SCALE, MAP_HEIGHT ) {


    }

    update ( camera, scene, lights, partentMesh ) {
        //this.renderMesh.update( camera, scene, lights, this );
        this.triangulation.update( camera, scene, lights, this );
        this.cells.update( camera, scene, lights, this );
    }
    draw ( camera, scene, lights, partentMesh ) {
        if ( !this.visible ) return;
        for ( var element in scene.stacks ) {
            if ( this[ element ] ) scene.stacks[ element ].push( this[ element ] );
        }
        //this.renderMesh.draw( camera, scene, lights, partentMesh );
        
        
        this.cells.draw( camera, scene, lights, partentMesh );
        this.triangulation.draw( camera, scene, lights, partentMesh );
        for ( var element in scene.stacks ) {
            if ( this[ element ] ) scene.stacks[ element ].pop();
        }
        return this;
    }
}