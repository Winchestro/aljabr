import def from "../utilities/PropertyDescriptors.js";

export default class Halfedge {
    constructor ( ) {
        this.index = -1;
        this.toVertex = null;
        this.oppositeHalfedge = null;
        this.nextHalfedge = null;
        this.previousHalfedge = null;
        this.face = null;
        //Object.seal( this );
    }
    delete ( ) {

        this.list.destroyItem( this );
    }

    extrude ( ) {
        /*
        f1   f1      f1   f1
        a -> (b) -> (c) -> d 
        f2   f2     f2   f2

        f1   f1      f1   f1
        a -> (b) -> (c) -> d 
        f3   f3     f3   f3
        b <- (e) <- (f) <- c
        f2   f2     f2    


        extrude along an edge, creating a new face in between
        */
        let vertices = this.list.mesh.vertices;
        let faces = this.list.mesh.faces;
        let edges = this.list;

        let hAB = this;
        let hBA = this.oppositeHalfedge;

        let f1 = hAB.face;
        let f2 = hBA.face;

        let vA = hBA.toVertex;
        let vB = hAB.toVertex;

        let vC = vertices.createItem();
        let vD = vertices.createItem();

        let hCD = edges.createItem();
        let hDC = edges.createItem();
        let hCA = edges.createItem();
        let hBD = edges.createItem();

        let f3 = faces.createItem();
    }

    splitFace ( halfedgeXY ) {
        let halfedgeAB = this;
        /*
            split face between two halfedges

            ... a -> (b) -> c ... x -> (y) -> z ...
            
            ... a -> (b) -> (y) -> z ... | y -> (b) -> c -> ... -> x -> (y) -> b

            new halfedge pair b->y | y->b

            halfedge y->z previousHalfedge now b->y
            halfedge a->b nextHalfedge now b->y
            
            halfedge b->c previousHalfedge now y->b
            halfedge x->y nextHalfedge now y->b
         */
        
        
        let halfedgeBC = halfedgeAB.nextHalfedge;
        let halfedgeYZ = halfedgeXY.nextHalfedge;

        
        let vertexB = halfedgeAB.toVertex;
        let vertexY = halfedgeXY.toVertex;

        let edges = halfedgeAB.list;
        let faces = edges.mesh.faces;

        let faceB = halfedgeAB.face;
        let faceY = faces.createItem();
        let halfedgeBY = edges.createItem();
        let halfedgeYB = edges.createItem();

        faceY.halfedge = halfedgeBY;

        halfedgeYB.toVertex = vertexB;
        halfedgeBY.toVertex = vertexY;

        halfedgeBY.oppositeHalfedge = halfedgeYB;
        halfedgeYB.oppositeHalfedge = halfedgeBY;

        halfedgeAB.nextHalfedge = halfedgeBY;
        halfedgeBY.previousHalfedge = halfedgeAB;
        halfedgeBY.nextHalfedge = halfedgeYZ;
        halfedgeYZ.previousHalfedge = halfedgeBY;

        halfedgeXY.nextHalfedge = halfedgeYB;
        halfedgeYB.previousHalfedge = halfedgeXY;
        halfedgeYB.nextHalfedge = halfedgeBC;
        halfedgeBC.previousHalfedge = halfedgeYB;


        let length = 0;
        
        for ( let halfedge of faceY.halfedges() ) {
            halfedge.face = faceY;
            length++;
        }
        faceY.length = length;
        faceB.length = faceB.length - length + 2;

        edges.put( halfedgeBY, halfedgeYB );

        return faceY;
    }

    splitEdge ( ) {

        let toVertex = this.toVertex;
        let oppositeHalfedge = this.oppositeHalfedge;
        let nextHalfedge = this.nextHalfedge;
        let previousHalfedge = this.previousHalfedge;
        let face = this.face;

        let frontHalfedge = this.list.createItem();
        let newVertex = this.list.mesh.vertices.createItem();


        /*
            a -> b
            c <- d

            a -> x => b     insert new halfedge in front. 
            c <= x <- d     insert opposite halfedge in front.
         */

        newVertex.outgoingHalfedge = frontHalfedge;

        frontHalfedge.toVertex = toVertex;
        this.toVertex = newVertex;

        frontHalfedge.previousHalfedge = this;
        this.nextHalfedge = frontHalfedge;

        frontHalfedge.nextHalfedge = nextHalfedge;
        nextHalfedge.previousHalfedge = frontHalfedge;


        frontHalfedge.face = face;
        face.length++;
        face.halfedge = this;
        
        
        if ( oppositeHalfedge  ) {
            
            let oToVertex = oppositeHalfedge.toVertex;
            let oNextHalfedge = oppositeHalfedge.nextHalfedge;
            let oPreviousHalfedge = oppositeHalfedge.previousHalfedge;
            let oFace = oppositeHalfedge.face;
            let newOppositeHalfedge = this.list.createItem();
            
            newOppositeHalfedge.toVertex = oToVertex;
            oppositeHalfedge.toVertex = newVertex;

            newOppositeHalfedge.nextHalfedge = oNextHalfedge;
            oNextHalfedge.previousHalfedge = newOppositeHalfedge;

            newOppositeHalfedge.previousHalfedge = oppositeHalfedge;
            oppositeHalfedge.nextHalfedge = newOppositeHalfedge;

            newOppositeHalfedge.oppositeHalfedge = this;
            this.oppositeHalfedge = newOppositeHalfedge;
            
            oppositeHalfedge.oppositeHalfedge = frontHalfedge;
            frontHalfedge.oppositeHalfedge = oppositeHalfedge;

            newOppositeHalfedge.face = oFace;
            oFace.length++;
            
            oFace.halfedge = oppositeHalfedge;

            newVertex.outgoingHalfedge = newOppositeHalfedge;

            // TODO : cick out this redundant double array datastructure
            let thisInA = this.list.halfedgeA.indexOf( this );
            if ( thisInA ===  -1 ) {
                let thisInB = this.list.halfedgeB.indexOf( this );
                this.list.halfedgeA[ thisInB ] = newOppositeHalfedge;
            } else this.list.halfedgeB[ thisInA ] = newOppositeHalfedge;

            
            this.list.push( oppositeHalfedge, frontHalfedge );


        } else this.list.push( frontHalfedge );

        
        
        return newVertex;
    }


    get toIndex ( ) {
        if ( this.toVertex ) {
            return this.toVertex.index;
        }
    }
    get fromVertex ( ) {
        if ( this.previousHalfedge && this.previousHalfedge.toVertex ) {
            return this.previousHalfedge.toVertex;
        }
    }

    get fromIndex ( ) {
        let fromVertex = this.fromVertex;
        if ( fromVertex ) {
            return fromVertex.index;
        }
        
    }

    get leftOutgoingHalfedge ( ) {
        if ( this.previousHalfedge && this.previousHalfedge.oppositeHalfedge ) {
            return this.previousHalfedge.oppositeHalfedge;
        }
    }
    
    get rightOutgoingHalfedge ( ) {
        if ( this.oppositeHalfedge && this.oppositeHalfedge.nextHalfedge ) {
            return this.oppositeHalfedge.nextHalfedge;
        }
    }

    get leftIncomingHalfedge ( ) {
        if ( this.oppositeHalfedge && this.oppositeHalfedge.previousHalfedge ) {
            return this.oppositeHalfedge.previousHalfedge;
        }
    }
    get rightIncomingHalfedge ( ) {
        if ( this.nextHalfedge && this.nextHalfedge.oppositeHalfedge ) {
            return this.nextHalfedge.oppositeHalfedge;
        }   
    }
}