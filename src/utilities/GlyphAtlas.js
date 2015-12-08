define ( [
    "../utilities/PropertyDescriptors",
    "../webgl/Context",
    "../webgl/Texture",
    "../mesh/Mesh",
    "../material/Material",
], function module (
    def,
    gl,
    Texture,
    Mesh,
    Material
){  
    "use strict";

    const NS_SVG = "http://www.w3.org/2000/svg";
    const NS_XHTML = "http://www.w3.org/1999/xhtml";
    const SERIALIZER = new XMLSerializer;


    class GlyphAtlas {
        constructor ( font, characterList ) {
            if ( characterList === undefined ) {
                characterList = [];
                for ( let i = 32; i < 127; i++ ) characterList.push( String.fromCharCode( i ) );
            }

            if ( font === undefined ) font = "12px Helvetica";

            let div = document.createElement( "div" );
                div.setAttribute( "xmlns", NS_XHTML );
                div.setAttribute( "style", `
                    overflow-wrap : break-word;
                    word-break : break-all;
                    white-space : pre-wrap;
                    font : ${ font };
                    color : #FFF;
                `);

            let foreignObject = document.createElementNS( NS_SVG, "foreignObject" );
                foreignObject.setAttribute( "width", "100%" );
                foreignObject.setAttribute( "height", "100%" );
                foreignObject.appendChild( div );

            let svg = document.createElementNS( NS_SVG, "svg" );
                svg.setAttribute( "width", "256px" );
                svg.setAttribute( "height", "256px" );
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

            let material = new Material({
                color : new vec3( 1, 1, 1 )
            });
            
            material.depth.enable().enableWrite();
            material.alpha.enable().setFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE );
            

            img.src = "data:image/svg+xml," + SERIALIZER.serializeToString( svg );
            img.onload = function ( ) {
                material.textures.setActiveTextureUnit( 0 );
                material.textures[ 0 ] = tex;
                tex.bind().image2D( img ).generateMipmap();
                //tex.setMinFilter( gl.NEAREST );
            }
            this.glyphRects = glyphRects;
            this.material = material;
            this.containerRect = container;
            this.svg = svg;
            this.img = img;
            this.tex = tex;
        }

        createTextMesh ( string, uniforms ) {
            let mesh = new Mesh( uniforms, new VertexList({
                position : new Float32Array( 2 ),
                uv : new Float32Array( 2 )
            }, string.length * 4 ));

            let vertices = mesh.vertices;
            let img = this.img;
            let offsetX = 0;
            let offsetY = 0;
            let totalWidth = 0;

            for ( let i = 0; i < string.length; i++ ) {
                totalWidth += this.glyphRects[ string[ i ] ].width;
            }

            offsetX -= ( totalWidth / 2 ) / img.width;

            for ( let i = 0; i < string.length; i++) {
                let character = string[ i ];
                let rect = this.glyphRects[ character ];
                let container = this.containerRect;
                let v = i * 4;


                vertices[ v + 0 ].position.setValues( offsetX,                          offsetY );
                vertices[ v + 1 ].position.setValues( offsetX,                          offsetY + rect.height / img.height );
                vertices[ v + 2 ].position.setValues( offsetX + rect.width / container.width, offsetY + rect.height / img.height );
                vertices[ v + 3 ].position.setValues( offsetX + rect.width / container.width, offsetY );

                vertices[ v + 0 ].uv.setValues( ( rect.left - container.left ) / container.width,       ( rect.bottom - container.top ) / container.height );
                vertices[ v + 1 ].uv.setValues( ( rect.left - container.left ) / container.width,       ( rect.top - container.top ) / container.height );
                vertices[ v + 2 ].uv.setValues( ( rect.right - container.left ) / container.width,  ( rect.top - container.top ) / container.height );
                vertices[ v + 3 ].uv.setValues( ( rect.right - container.left ) / container.width,  ( rect.bottom - container.top ) / container.height );
                
                mesh.createFace( v + 0, v + 1, v + 2, v + 3 );

                offsetX += rect.width / container.width;
            }
            
            vertices.update();

            return mesh;
        }

    }

    return GlyphAtlas;
});