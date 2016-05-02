define( [
	"../../../lib/Javascript-Voronoi/rhill-voronoi-core",
	"../../../lib/proc-noise-node/lib/proc-noise",
	"../../src/math/vec3",
	"../../src/mesh/Mesh",
	"../../src/mesh/VertexList",
	"../../src/material/Material",
	"../../src/material/Phong",
	"../../src/material/VertexColors",
	"../../src/material/VertexColorsPoint"
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
		constructor ( amount, smooth, uniforms ) {
			if ( uniforms === undefined ) uniforms = {};
			if ( uniforms.scale === undefined ) uniforms.scale = new vec3( 1, 1, 1 );
			if ( uniforms.transform === undefined ) uniforms.transform = new mat4;

		    let landMaterial = new Material.Phong;
		    let waterMaterial = new Material.Phong;
		    let edgeMaterial = new Material.VertexColors;
		    let pointMaterial = new Material.VertexColorsPoint;

			landMaterial.offset.enable().setFill( 1, 0 );
			//landMaterial.alpha.enable().setFunc( gl.SRC_COLOR , gl.ONE_MINUS_DST_COLOR, gl.SRC_ALPHA, gl.DST_ALPHA );
		    
		    waterMaterial.depth.disableWrite();
		    waterMaterial.alpha.enable().setFunc( Alpha.FN_SRC_COLOR , Alpha.FN_ONE_MINUS_DST_COLOR, Alpha.FN_SRC_ALPHA, Alpha.FN_DST_ALPHA );
	//	    waterMaterial.offset.enable().setFill( 1, 0 );

			/*
				full map generation

				voronoi diagram -> voronoi mesh -> delaunay triangulation -> triangulation mesh -> render processing steps -> final render mesh

				voronoi mesh and delaunay mesh are one interconnected dual-graph and internally used for graph searches / graph traversal.

				the final render mesh is generated and updated from them and sent to the gpu.

				
				
			

			*/
			let diagram = createSmooth( amount, bbox, smooth );
			
			let layout = {
				position    : new Float32Array( 3 ),
				color       : new Float32Array( 4 ),
				normal      : new Float32Array( 3 ),
				uv          : new Float32Array( 2 )
			};

			

			let cells = new Mesh;
			cells.vertices.allocateItems( diagram.vertices.length ).createItems();

			let triangulation = new Mesh( undefined, new VertexList( layout, diagram.cells.length ) );
			triangulation.vertices.allocateItems( diagram.cells.length ).createItems();

			
			// set cell vertices ( 0 to diagram vertices length )
			for ( let i = 0; i < diagram.vertices.length; i++ ) {
				let sourceVertex = diagram.vertices[ i ];
				
				sourceVertex.id = i;
				let targetVertex = cells.vertices[ i ];
			  
				targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, 1.5 );
				targetVertex.color.setValues( .3,.5,.8, .6 );
				targetVertex.normal.setValues( 0,0,1 );
				targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ),  .5 * ( 1 + sourceVertex.y ) );
				//createIndexLabel( cells, i, "c_"+i/*faceIndices.join(" / ")*/, 2 );
			}
			
			let faceIndices = [];
			{
				// compte cell faces and set triangulation vertices ( 0 to diagram cell length )
				let color = new vec4;
				for ( let i = 0; i < diagram.cells.length; i++ ) {
					let cell = diagram.cells[ i ];

					
					for ( let halfedge of cell.halfedges ) faceIndices.unshift( halfedge.getStartpoint().id );
					

					let face = cells.createFace.apply( cells, faceIndices );

					let sourceVertex = diagram.cells[ i ].site;
					let targetVertex = triangulation.vertices[ i ];

					face.site = targetVertex;
					diagram.cells[ i ].vertex = targetVertex;
					

					let z = sourceVertex.z;
					//let z = scaledNoise( sourceVertex.x, sourceVertex.y, NOISE_SCALE );
					/*
					let g;
					( z > 0 ) ? g = ( z + .5 ) * 0.75 : g = 0;
					let b;
					( z < 0 ) ? b = 1 : b = 0;
					*/
				
					getColor( color, z );
					


					//let b = Math.min( z, 0 ) + .5;
					//console.log( z );

					targetVertex.position.setValues( sourceVertex.x, sourceVertex.y, z );
					targetVertex.color.set( color );
					targetVertex.uv.setValues( .5 * ( 1 + sourceVertex.x ), .5 * ( 1 + sourceVertex.y ) );
					faceIndices.length = 0;
				}
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


			// create the rendermesh
			let divisions = 0;
			
			
			
			for ( let edge of triangulation.edges ) {
				let halfedge = edge.a ? edge.a : edge.b;

				let a = halfedge.toVertex.position;
				let b = halfedge.fromVertex.position;

				let steps = Math.abs( Math.floor( a[ 2 ] ) - Math.floor( b[ 2 ] ) );
				
				divisions += steps;
				
				

			}
			let renderMesh = new Mesh;

			renderMesh.vertices.allocateItems( diagram.cells.length + divisions * 4 )/*.createItems()*/;
			
			{
				let vertices = renderMesh.vertices;
				let edges = renderMesh.edges;
				let faces = renderMesh.faces;
				// set up rendermesh vertices based on triangulation
				for ( let i = 0; i < triangulation.vertices.length; i++ ) {
					let sourceVertex = triangulation.vertices[ i ];
					let targetVertex = vertices.createItem();

					targetVertex.position.setValues( sourceVertex.position[ 0 ], sourceVertex.position[ 1 ], Math.floor( sourceVertex.position[ 2 ] ) );
					targetVertex.color.set( sourceVertex.color );
					targetVertex.normal.setValues( 0, 0, -targetVertex.position[2] - 10 );
				}
				// take rendermesh connectivity from triangulation
				for ( let face of triangulation.faces ) {
					let vertexIter = face.vertices();
					let vertexA = vertices[ vertexIter.next().value.index ];
					let vertexB = vertices[ vertexIter.next().value.index ];
					let vertexC = vertices[ vertexIter.next().value.index ];
					
					renderMesh.createFaceFromVertices( vertexA, vertexB, vertexC );
				}	

				{
					let a = new vec3;
					let b = new vec3;
					let c = new vec3;
					let d = new vec3;

					let length = edges.length;
					let transformFaces = new Set;
					renderMesh.clearSelections();

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


			
			
			//cells.vertices.allocateVBO();
			//triangulation.vertices.allocateVBO();

			renderMesh.vertices.allocateVBO();

			renderMesh
			
				.createTriangleElement( landMaterial )
				//.createPointElement( pointMaterial )
				.createLineElement( edgeMaterial )
			;

			

			/*
			triangulation
				.createPointElement( pointMaterial )
				.createLineElement( edgeMaterial )
				.createTriangleElement( landMaterial )
				.createNormalElement( edgeMaterial )
			;*/
			//triangulation.scale = [1,1,0];

			def.Properties( this, {
				renderMesh,
				cells,
				triangulation,
				diagram,
				landMaterial,
				waterMaterial,
				edgeMaterial,
				
			});

			def.Properties( this, uniforms, def.ENUMERABLE | def.WRITABLE );

			def.Properties( this, {
				visible : true
			}, def.WRITABLE );
		}
		update ( ) {
			
		}
		draw ( camera, scene, lights, partentMesh ) {
            if ( !this.visible ) return;
            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].push( this[ element ] );
            }
            this.renderMesh.draw( camera, scene, lights, partentMesh );
            //this.triangulation.draw( camera, scene, lights, partentMesh );
            //this.cells.draw( camera, scene, lights, partentMesh );
            for ( var element in scene.stacks ) {
                if ( this[ element ] ) scene.stacks[ element ].pop();
            }
            return this;
        }
	}
	const NOISE_SCALE = 0.02;
	const MAP_HEIGHT = 10;
	const perlin = new Perlin;
	function scaledNoise( x, y, scale ) {
		let n = ( Math.tan( perlin.noise( x * scale, y * scale ) ) - .5 ) * 2;
		return  n;
	}

	function clamp ( v, max, min ) {
		return Math.min( max, Math.max( min, v )  );
	}

	function getColor ( in_vec4, z ) {
		z = Math.floor( z );
		let h = z / MAP_HEIGHT;
		in_vec4.setValues( clamp( h * .25 + .15, 1, 0 ), /*h > 1 / MAP_HEIGHT ? */clamp( h + .75 / 1.8, .55, .15 )/* : .5*/, /*h < 1 / MAP_HEIGHT ? 1 :*/ .15, 1 );
	}

	function createSmooth ( numSites, bbox, steps ) {
		let sites = [];
		let voronoi = new Voronoi();
		let width = bbox.xr - bbox.xl;
		let height = bbox.yb - bbox.yt;

		for ( let i = 0; i < numSites; i++ ) {
			let x, y, z;
			
			do {
				x = Math.random() * width - width * .5;
				y = Math.random() * height - height * .5;
			} while ( ( z = scaledNoise( x, y, NOISE_SCALE ) ) < ( Math.tan( Math.random() ) - .4 ) );
			sites.push({
				x : x,
				y : y,
				z : ( z) * MAP_HEIGHT
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
