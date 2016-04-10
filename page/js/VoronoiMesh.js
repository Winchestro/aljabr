define( [
	"../../../lib/Javascript-Voronoi/rhill-voronoi-core",
	"../../../lib/proc-noise-node/lib/proc-noise",
	"../../src/math/vec3",
	"../../src/mesh/Mesh",
	"../../src/mesh/VertexList",
	"../../src/material/Material",
	"../../src/material/Phong",
	"../../src/material/VertexColors"
], function module (
	Voronoi,
	Perlin,
	vec3,
	Mesh,
	VertexList,
	Material,
	Phong,
	VertexColors
) {
	"use strict";

	const bbox = { xl: -100, xr: 100, yt: -100, yb: 100 };
	
	class VoronoiMesh {
		constructor( ) {
		    let landMaterial = new Material.Phong;
			landMaterial.offset.enable().setFill( 1, 0 );
			//landMaterial.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA );

		    let waterMaterial = new Material.Phong;

		    
		    waterMaterial.depth.disableWrite();
		    waterMaterial.alpha.enable().setFunc( Alpha.FN_SRC_COLOR , Alpha.FN_ONE_MINUS_DST_COLOR, Alpha.FN_SRC_ALPHA, Alpha.FN_DST_ALPHA );
		    waterMaterial.offset.enable().setFill( 1, 0 );


		    let edgeMaterial = new Material.VertexColors;


			let diagram = createSmooth( 1000, bbox, 4 );
			
			let cells = new Mesh({
				scale       : new vec3( 1, 1, 1 ),
				transform   : mat4.fromTranslation( new mat4, [ 0, 0, 0 ] )
			}, new VertexList({
				position    : new Float32Array( 3 ),
				color       : new Float32Array( 4 ),
				normal      : new Float32Array( 3 ),
				uv          : new Float32Array( 2 )
			}, diagram.vertices.length,  gl.STATIC_DRAW ));

			let triangulation = new Mesh({
				scale       : new vec3( 1, 1, 1 ),
				transform   : new mat4.fromTranslation( new mat4, [ 0, 0, 0 ] )
			}, new VertexList({
				position    : new Float32Array( 3 ),
				color       : new Float32Array( 4 ),
				normal      : new Float32Array( 3 ),
				uv          : new Float32Array( 2 )
			}, diagram.cells.length,  gl.STATIC_DRAW ));

			for ( let i = 0; i < diagram.vertices.length; i++ ) {
				let sourceVertex = diagram.vertices[ i ];
				
				sourceVertex.id = i;
				let targetVertex = cells.vertices[ i ];
			  
				targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, 0 );
				targetVertex.color.setValues( .3,.5,.8, .6 );
				targetVertex.normal.setValues( 0,0,1 );
				targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ),  .5 * ( 1 + sourceVertex.y ) );
				//createIndexLabel( cells, i, "c_"+i/*faceIndices.join(" / ")*/, 2 );
			}

			let faceIndices = [];
			for ( let i = 0; i < diagram.cells.length; i++ ) {
				let cell = diagram.cells[ i ];

				
				for ( let halfedge of cell.halfedges ) {
					faceIndices.unshift( halfedge.getStartpoint().id );
				}

				let face = cells.createFace.apply( cells, faceIndices );

				let sourceVertex = diagram.cells[ i ].site;
				let targetVertex = triangulation.vertices[ i ];

				face.site = targetVertex;
				
				let z = scaledNoise( sourceVertex.x, sourceVertex.y, NOISE_SCALE, NOISE_EXPONENT );
				/*
				let g;
				( z > 0 ) ? g = ( z + .5 ) * 0.75 : g = 0;
				let b;
				( z < 0 ) ? b = 1 : b = 0;
				*/
				let g = Math.max( z, -.25 ) + .75 - Math.min( z, 0 );
				let w = Math.max( z +.25, .5 ); 


				//let b = Math.min( z, 0 ) + .5;
				//console.log( z );

				targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, /*( z  > 0 ) ? z * 10 : 0*/ z * 10 );
				targetVertex.color.setValues( w, g, w, 1 );
				targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ), .5 * ( 1 + sourceVertex.y ) );
				faceIndices.length = 0;
			}



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

					let v0 = vec3.subtract( new vec3, vertices[ 0 ].position, vertices[ 1 ].position );
					let v1 = vec3.subtract( new vec3, vertices[ 2 ].position, vertices[ 0 ].position );

					let faceNormal = vec3.cross( v0, v0, v1 );

					face.normal = faceNormal;
					

				}

				
				faceIndices.length = 0;
			}

			let normal = new vec3;
			for ( let vertex of triangulation.vertices ) {

				let count = 0;

				for ( let face of vertex.faces() ) {
					if ( face.normal ) {
						count++;

						vec3.add( normal, normal, face.normal );
						
					}
				}  

				vec3.scale( normal, normal, 1 / count );
				vec3.normalize( normal, normal );
				//normal.divideScalar( count ).normalize();
				
				vertex.normal.set( normal );

				vec3.set( normal, 0,0,0 );
			}

			cells.vertices.update();
			triangulation.vertices.update();

			
			cells
				.addChild( "points", cells.vertices.createElement( waterMaterial ), 0 )
				.addChild( "normals", cells.createNormalMesh( edgeMaterial, 5 ), 0 )
				.addChild( "lines", cells.edges.createElement( edgeMaterial ), 0 )
				.addChild( "triangles", cells.faces.createElement( waterMaterial ), 0 )
			;
			cells.points.visible = false;
			cells.lines.visible = false;
			cells.normals.visible = false;

			
			//scene.children.push( triangulation );
			//scene.children.push( cells );
			
			triangulation
				.addChild( "points", triangulation.vertices.createElement( landMaterial ), 0 )
				.addChild( "lines", triangulation.edges.createElement( edgeMaterial ), 0 )
				.addChild( "normals", triangulation.createNormalMesh( edgeMaterial, 5 ), 0 )
				.addChild( "triangles", triangulation.faces.createElement( landMaterial ), 0 )
			;

			triangulation.points.visible = false;
			triangulation.normals.visible = false;
			triangulation.lines.visible = false;
			
			def.Properties( this, {
				cells,
				triangulation,
				diagram,
				visible : true
			});
		}
		update ( ) {
			
		}
		draw ( camera, scene, lights, partentMesh ) {
            if ( !this.visible ) return;
            
            this.triangulation.draw( camera, scene, lights, partentMesh );
            this.cells.draw( camera, scene, lights, partentMesh );
            
        }


		addToRenderable ( renderable ) {
			renderable.addChild( "delaunay", this.triangulation );
			renderable.addChild( "voronoi", this.cells );
			return this;
		}
	}
	const NOISE_SCALE = 0.04;
	const NOISE_EXPONENT = 2;
	const perlin = new Perlin;
	function scaledNoise( x, y, scale, exponent ) {
		let n = ( perlin.noise( x * scale, y * scale ) - .5 ) * 2;
		return  n;
	}
	function createSmooth ( numSites, bbox, steps ) {
		var sites = [];
		var voronoi = new Voronoi();
		var width = bbox.xr - bbox.xl;
		var height = bbox.yb - bbox.yt;

		for ( var i = 0; i < numSites; i++ ) {
			var x, y;
			do {
				x = Math.random() * width - width * .5;
				y = Math.random() * height - height * .5;
			} while ( scaledNoise( x, y, NOISE_SCALE, NOISE_EXPONENT ) < Math.random() );
			sites.push({
				x : x,
				y : y
			});
		}

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
		return diagram;
	}

	return VoronoiMesh;
});