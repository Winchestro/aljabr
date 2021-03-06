import def from "../utilities/PropertyDescriptors.js";
import allocateUint from "../kernel/allocateUint.js";
import PoolAllocator from "../kernel/PoolAllocator.js";
import Halfedge from "../mesh/Halfedge.js";

const NOT_IN_LIST = -1;
const ITERATOR_EDGE = { a : null, b : null };

export default class EdgeList extends PoolAllocator {
    constructor ( halfedgeA, halfedgeB ) {
        if ( halfedgeA === undefined ) halfedgeA = [];
        if ( halfedgeB === undefined ) halfedgeB = [];
        
        super();
        
        
      
        def.Properties( this, {
            halfedgeA,
            halfedgeB
        }, def.CONFIGURABLE );
    }
    *[ Symbol.iterator ] ( ) {
        let index = 0;
        let listA = this.halfedgeA;
        let listB = this.halfedgeB;

        while ( index < listA.length || index < listB.lenght ) {
            let a = listA[ index ];
            let b = listB[ index ];
            ITERATOR_EDGE.a = a;
            ITERATOR_EDGE.b = b;

            yield ITERATOR_EDGE;
            index++;
        }
        ITERATOR_EDGE.a = null;
        ITERATOR_EDGE.b = null;

    }
    *pairs ( ) {
        let index = 0;
        let listA = this.halfedgeA;
        let listB = this.halfedgeB;

        while ( index < listA.length || index < listB.lenght ) {
            let a = listA[ index ];
            let b = listB[ index ];
            if ( a && b ) {
                ITERATOR_EDGE.a = a;
                ITERATOR_EDGE.b = b;
                yield ITERATOR_EDGE;
            }
            index++;
        }
    }

    createItem ( toVertex, oppositeHalfedge, nextHalfedge, previousHalfedge, face ) {

        this.length = Math.max( this.halfedgeA.length, this.halfedgeB.length ) + 1;

        if ( this.pool.length !== 0 ) {
            let halfedge = this.pool.pop();
                halfedge.toVertex = toVertex;
                halfedge.oppositeHalfedge = oppositeHalfedge;
                halfedge.nextHalfedge = nextHalfedge;
                halfedge.previousHalfedge = previousHalfedge;
                halfedge.face = face;

            
            return halfedge;
        } else {
            return new Halfedge( toVertex, oppositeHalfedge, nextHalfedge, previousHalfedge, face );
        }


    }
    createFromVertices ( vertexA, vertexB ) {

        let halfedgeA = this.createHalfedgeFromTo( vertexA, vertexB );
        let halfedgeB = this.createHalfedgeFromTo( vertexB, vertexA );



        halfedgeA.oppositeHalfedge = halfedgeB;
        halfedgeB.oppositeHalfedge = halfedgeA;

        this.push( halfedgeA, halfedgeB );
        
        return this;
    }

    createHalfedgeFromTo ( vertexA, vertexB ) {
        let halfedge = this.createItem();

        halfedge.toVertex = vertexB;
        if ( !vertexA.outgoingHalfedge ) vertexA.outgoingHalfedge = halfedge;
        
        
   
        
        return halfedge;
    }

    createEdgeLoopFromVertices ( ...vertices ) {
        
        let lastIndex = vertices.length - 1;

        let firstHalfedge, previousHalfedge, currentHalfedge;
        let halfedges = [];

        for ( let index = 0; index <= lastIndex; index++ ) {
            let previousVertex = vertices[ ( index + lastIndex ) % vertices.length ];
            let currentVertex = vertices[ index ];

            currentHalfedge = this.createHalfedgeFromTo( previousVertex, currentVertex );
            
            if ( !firstHalfedge ) firstHalfedge = currentHalfedge;
            
            if ( previousHalfedge ) {
                currentHalfedge.previousHalfedge = previousHalfedge;
                previousHalfedge.nextHalfedge = currentHalfedge;
            }
            
            if ( index === lastIndex ) {
                currentHalfedge.nextHalfedge = firstHalfedge;
                firstHalfedge.previousHalfedge = currentHalfedge;
               
                this.push( currentHalfedge );
                this.push( firstHalfedge );
            } else if ( index !== 0 )  {
                this.push( currentHalfedge );
            }

            halfedges.push( currentHalfedge );
            previousHalfedge = currentHalfedge;
        }

        return halfedges;
    }
    forEachPair ( iterator ) {
        let index = 0;
        let listA = this.halfedgeA;
        let listB = this.halfedgeB;

        while ( index < listA.length || index < listB.lenght ) {
            let halfedgeA = listA[ index ];
            let halfedgeB = listB[ index ];

            if ( halfedgeA && halfedgeB ) iterator( halfedgeA, halfedgeB, index );
            index++;
        }
    }
    forEach ( iterator ) {
        let index = 0;
        let listA = this.halfedgeA;
        let listB = this.halfedgeB;

        while ( index < listA.length || index < listB.lenght ) {
            let halfedgeA = listA[ index ];
            let halfedgeB = listB[ index ];

            iterator( halfedgeA, halfedgeB, index );
            index++;
        }   
    }
    join ( halfedgeA, halfedgeB ) {
        halfedgeA.oppositeHalfedge = halfedgeB;
        halfedgeB.oppositeHalfedge = halfedgeA;
        const NIL = -1;
        
        let indexOfB = this.halfedgeA.indexOf( halfedgeB );
        // put last items of A and B into where outgoing is taken out of A and put into B
        
        // A[ 0, A, 2, B, 4 ] B[ 0, ., 2, ., 4 ]
        // A[ 0, A, 2, 4 ] B [ 0, ., 2, 4 ]
        // A[ 0, A, 2, 4 ] B[ 0, B, 2, 4 ]

        // A[ 0, B, A ] B[ 0, ., .]
        // A[ 0, A ] B[ 0,. ]
        // A[ 0, A ] B[ 0, ., B]
        if ( indexOfB === NIL ) console.warn( "illegal mergeEdge operation, halfedgeB already part of edge" );

        this.halfedgeA[ indexOfB ] = this.halfedgeA.pop();
        this.halfedgeB[ indexOfB ] = this.halfedgeB.pop();
    
        let indexOfA = this.halfedgeA.indexOf( halfedgeA );

        if ( indexOfA === NIL ) console.warn( "illegal mergeEdge operation, halfedgeA already part of edge" );

        this.halfedgeB[ indexOfA ] = halfedgeB;

        return this;
    }
    push ( insertedHalfedge, oppositeHalfedge ) {
        //TODO : Rework edge joining, should not try to match them in the general case (expensive!), if the user may have a cheaper alternative.
        
       

        if (  oppositeHalfedge === undefined ) {

            let insertedToVertex = insertedHalfedge.toVertex;
            //console.log( insertedHalfedge.toVertex.out );
            let insertedFromVertex = insertedHalfedge.fromVertex;

            let outFromHalfedge = insertedFromVertex.outgoingHalfedge;
            //let outToHalfedge = insertedToVertex.outgoingHalfedge;
            
            if ( outFromHalfedge === null ) {
                insertedFromVertex.outgoingHalfedge = insertedHalfedge;
            } else {
                if ( outFromHalfedge.rightOutgoingHalfedge ) {
                    //console.log( "rotated", insertedFromVertex.index );
                    insertedFromVertex.outgoingHalfedge = outFromHalfedge.rightOutgoingHalfedge;
                }
                for ( let halfedge of insertedToVertex.outgoingHalfedges() ) {
                    //console.log( "toVertex", insertedFromVertex.index, halfedge.toVertex.index );
                    if ( halfedge.toVertex.outgoingHalfedge === insertedFromVertex.outgoingHalfedge ) {
                        //console.log("match A", halfedge.toIndex, insertedHalfedge.toIndex );
                        halfedge.oppositeHalfedge = insertedHalfedge;
                        insertedHalfedge.oppositeHalfedge = halfedge;
                        
                        insertedHalfedge.index = halfedge.index;

                        this.halfedgeB[ halfedge.index ] = insertedHalfedge;
                        return this;
                    } 
                }
                
                
            }
        }

        insertedHalfedge.index = this.halfedgeA.length;
        if ( oppositeHalfedge ) oppositeHalfedge.index = this.halfedgeB.length;

        this.halfedgeA.push( insertedHalfedge );
        this.halfedgeB.push( oppositeHalfedge );
        
        //this.length = Math.max( this.halfedgeA.length, this.halfedgeB.length );
        return this;
    }
    put ( insertedHalfedge, oppositeHalfedge ) {
        this.halfedgeA.push( insertedHalfedge );
        this.halfedgeB.push( oppositeHalfedge );
    }

   
    getData ( buffer ) {
        if ( buffer === undefined ) buffer = allocateUint( this.length * 2 );
        let offset = 0;
        this.forEach( function ( halfedgeA, halfedgeB, index ) {
            
            buffer[ offset++ ] = halfedgeA.toVertex.index;

            if ( halfedgeB )                        buffer[ offset++ ] = halfedgeB.toVertex.index;
            else if ( halfedgeA.previousHalfedge )  buffer[ offset++ ] = halfedgeA.previousHalfedge.toVertex.index;
            else if ( halfedgeA.oppositeHalfedge )  buffer[ offset++ ] = halfedgeA.oppositeHalfedge.toVertex.index;
            else                                    console.log( "incomplete halfedge ( no opposite or previous halfedge ) : ", halfedgeA  );
        });
        return buffer;
    }
}