import def from "../utilities/PropertyDescriptors.js";
import gl from "../webgl/Context.js";
import Texture from "../webgl/Texture.js";
import Mesh from "../mesh/Mesh.js";
import Geometry from "../mesh/Geometry.js";
import GlyphFont from "../material/GlyphFont.js";
import VertexColors from "../material/VertexColors.js";
import vec2 from "../math/vec2.js";
import mat4 from "../math/mat4.js";

const NS_SVG = "http://www.w3.org/2000/svg";
const NS_XHTML = "http://www.w3.org/1999/xhtml";
const SERIALIZER = new XMLSerializer;    

export default class GlyphAtlas {
    constructor ( css, characterList ) {
        if ( characterList === undefined ) {
            characterList = [];
            for ( let i = 32; i < 127; i++ ) characterList.push( String.fromCharCode( i ) );
        }

        if ( css === undefined ) css = `
            font : 15px Helvetica;
            color : #EEE;
            background : #222;
        `;

        //TODO: Generalize
        let width = 256;
        let height = 256;

        let div = document.createElement( "div" );
            div.setAttribute( "xmlns", NS_XHTML );
            div.setAttribute( "style", `
                overflow-wrap : break-word;
                word-break : break-all;
                white-space : pre-wrap;
                ${ css }
            `);

        let foreignObject = document.createElementNS( NS_SVG, "foreignObject" );
            foreignObject.setAttribute( "width", "100%" );
            foreignObject.setAttribute( "height", "100%" );
            foreignObject.appendChild( div );

        let svg = document.createElementNS( NS_SVG, "svg" );
            svg.setAttribute( "width",  `${ width }px` );
            svg.setAttribute( "height", `${ height }px` );
            svg.setAttribute( "xmlns", NS_SVG );

            svg.appendChild( foreignObject );       

        document.body.appendChild( svg );

        let glyphRects = {};
        let container = svg.getBoundingClientRect();
        let img = new Image;
        let tex = new Texture;
        const ZWNJ = String.fromCharCode( 32 );
        for ( let i = 0; i < characterList.length; i++ ) {
            let character = characterList[ i ];

            let span = document.createElement( "span" );
                span.innerText = character;

            let spacing = document.createElement( "span" );
                spacing.innerText = ZWNJ;
            div.appendChild( span );
            div.appendChild( spacing );
            
            glyphRects[ character ] = span.getBoundingClientRect(); 

            //console.log( glyphRects[ character ] );
        }
        
        

        //document.body.appendChild( img );
        svg.remove();

        let material = new GlyphFont;
        
        
        

        img.src = "data:image/svg+xml," + SERIALIZER.serializeToString( svg );
        img.onload = function ( ) {
            material.textures.setActiveTextureUnit( 0 );
            material.textures[ 0 ] = tex;
            tex.bind().allocateImage2D( img ).generateMipmap();
            //tex.setMinFilter( gl.NEAREST );
        }
        this.glyphRects = glyphRects;
        this.material = material;
        this.containerRect = container;
        this.svg = svg;
        this.img = img;
        this.tex = tex;
        this.atlasWidth = width;
        this.atlasHeight = height;
        
    }

    createTextMesh ( string ) {
        string = String( string );
        let geometry = new Geometry({
            position : new Float32Array( 2 ),
            uv : new Float32Array( 2 )
        });

        let mesh = new Mesh( geometry, {
            scale : new vec2( 1, 1 ),
            transform : new mat4
        });

        let vertices = geometry.vertices;

        vertices.allocateItems( string.length * 4 ).createItems();

        
        let offsetX = 0;
        let offsetY = 0;
        let width = this.atlasWidth;
        let height = this.atlasHeight;
        let totalWidth = 0;

        for ( let i = 0; i < string.length; i++ ) {
            totalWidth += this.glyphRects[ string[ i ] ].width;
        }

        offsetX -= ( totalWidth / 2 ) / width;

        for ( let i = 0; i < string.length; i++) {
            let character = string[ i ];
            let rect = this.glyphRects[ character ];
            let container = this.containerRect;
            let v = i * 4;

            //console.log( container, rect );

            vertices[ v + 0 ].position.setValues( offsetX,                          offsetY );
            vertices[ v + 1 ].position.setValues( offsetX,                          offsetY + rect.height / height );
            vertices[ v + 2 ].position.setValues( offsetX + rect.width / container.width, offsetY + rect.height / height );
            vertices[ v + 3 ].position.setValues( offsetX + rect.width / container.width, offsetY );

            vertices[ v + 0 ].uv.setValues( ( rect.left - container.left ) / container.width,       ( rect.bottom - container.top ) / container.height );
            vertices[ v + 1 ].uv.setValues( ( rect.left - container.left ) / container.width,       ( rect.top - container.top ) / container.height );
            vertices[ v + 2 ].uv.setValues( ( rect.right - container.left ) / container.width,  ( rect.top - container.top ) / container.height );
            vertices[ v + 3 ].uv.setValues( ( rect.right - container.left ) / container.width,  ( rect.bottom - container.top ) / container.height );
            
            mesh.createFace( v + 0, v + 1, v + 2, v + 3 );

            offsetX += rect.width / container.width;
        }
        
        vertices.allocateTarget();

        mesh.createTriangleElement( this.material );


        return mesh;
    }

}