import def from "../utilities/PropertyDescriptors.js";

const MAX_STEPS = 5000;

export default class Resource {
    constructor ( source, target ) {
        def.Properties( this, {
            source,
            target
        }, def.ENUMERABLE | def.CONFIGURABLE | def.WRITABLE );
    }
    next ( ) {
        if ( typeof this.target === "function" ) return this.target.apply(
            this,
            arguments
        );
        else if ( this.target instanceof Resource ) return this.target.process.apply(
            this.target,
            arguments
        );
        else if( arguments.length > 1 ) return this.target = arguments;
        else return this.target = arguments[ 0 ];
    }
    process ( ) {
        if ( typeof this.source === "function" ) {
            var returnValue = this.source.apply(
                this,
                arguments
            );
            if ( returnValue === undefined ) return;
            else return this.next( returnValue );
        }
        else if ( this.source instanceof Resource ) return this.next(
            this.source.process.apply( this.source, arguments )
        );
        else {
            if ( this.source !== undefined ) Array.isArray( this.source ) ? 
            [].unshift.apply( arguments, this.source ) : [].unshift.call( arguments, this.source );

            return this.next.apply( this, arguments );
        }
    }
    setTarget ( target ) {
        if ( this.target !== undefined ) target.process( this.target );
        this.target = target;
        return this;
    }
    swapTarget ( target ) {
        this.target = target;
        return this;
    }
    setSource ( source ) {
        if ( arguments.length > 1 ) source = [].slice.call( arguments );
        this.source = source;
        return this;
    }
    createLeaf ( source ) {
        let node = this;
        let steps = 0;
        while ( node.target instanceof Resource ) {
            if ( steps > MAX_STEPS ) {
                throw new Error( `maximum step size of ${MAX_STEPS} exceeded.` );
            }
            node = node.target;
            steps++;
        }
        return node.target = new Resource().setSource( source );
    }
    createRoot ( source ) {
        return new Resource().setSource( source ).setTarget( this );
    }
    createFork ( target ) {
        return new Resource().setSource( this ).setTarget( target );
    }
    static parseObj ( string ) {
        const RESSOURCE = new Resource ( function ( string ) {
            const SCENE = {};
            var target = SCENE;
            string.split( "\n" ).forEach( function ( line ) {
                line = line.split(" ");
                const TYPE = line.shift().toLowerCase();
                
                if( !TYPE ) return;
                
                switch(TYPE){
                    case "o":
                        //console.log( line[0] );
                        var t = {}
                        SCENE[ line[ 0 ].match(/\w*/)[ 0 ] ] = t;
                        target = t;
                        break;
                    case "v":
                    case "vt":
                    case "vn":
                        var subtarget = getSubtarget();

                        var VERTEX = line.map( function ( e ) {
                            return parseFloat( e );
                        });
                        subtarget.push( VERTEX );
                        break;
                    case "f":
                        var subtarget = getSubtarget();
                        
                        var INDEX = line.map( function ( e ) {
                            var refs = e.split( "/" ).map( function ( e ) {
                                return parseInt( e, 10 ) - 1;
                            });
                            return refs;
                        });
                        subtarget.push( INDEX );
                        break;
                    default:
                        break;
                }
                function getSubtarget(){
                    if ( target === SCENE ) {
                        SCENE.object = {};
                        target = SCENE.object;
                    }
                    if ( !target[ TYPE ] ) target[ TYPE ] = [];
                    return target[ TYPE ];
                }
            });
            //console.log( SCENE );
            return SCENE;
        });
        if ( string ) RESSOURCE.process( string );
        return RESSOURCE;
    }

    static htmlTexture ( htmlString ) {
        
        let img = new Image;
        let resource = new Resource( img );
        let width = 200;
        let height = 100;
        let uri = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                <foreignObject width="100%" height="100%" x="20" y="50">
                    ${htmlString}
                </foreignObject>
            </svg>
        `;

        img.onload = resource.process.bind( resource );
        img.src = uri;
        return resource;
    }

    static htmlSerializer ( element ) {
        element.setAttribute( "xmlns",  "http://www.w3.org/1999/xhtml" );
        const STATIC = Resource.htmlSerializer;
        let serializer  = STATIC.serializer ? STATIC.serializer : STATIC.serializer = new XMLSerializer;

        return serializer.serializeToString( element );
    }
    
    static http ( url, options ) {
        if ( options === undefined ) options = {};

        const XHR = new XMLHttpRequest;
        const SOURCE = {
            method      : "GET",
            url         : url,
            request     : XHR,
            options     : options,
            lastUpdated : 0,
            timeout     : 0,
            reroute     : function ( url ) {
                this.abort();
                this.url = url;
                this.lastUpdated = 0;
                this.send();
            },
            abort       : function ( ) {
                clearTimeout( this.timeout );
                XHR.abort();
            },
            send        : function ( ) {
                XHR.open( SOURCE.method, SOURCE.url, true );
                for( var prop in options ) {
                    if( prop in XHR ) XHR[ prop ] = options[ prop ];
                }
                XHR.onreadystatechange = options.onreadystatechange || resolve;
                XHR.send();
            }
        
        }
        console.log( SOURCE );
        const RESOURCE = new Resource( SOURCE );
        
        SOURCE.send();
        return RESOURCE;
        
        function resolve ( ) {
            //console.log(x.readyState);
            switch ( XHR.readyState ) {
                case XHR.UNSENT:
                    break;
                case XHR.OPENED:
                    
                    break;
                case XHR.HEADERS_RECEIVED:
                    SOURCE.lastModified = new Date(
                        XHR.getResponseHeader( "Last-Modified" )
                    ).getTime();

                    //console.log(x,r.source.lastModified-r.source.lastUpdated);
                    if ( SOURCE.lastModified > SOURCE.lastUpdated )
                        SOURCE.lastUpdated = Date.now();
                    else {
                        XHR.abort();
                        //console.log("no change");
                        if ( SOURCE.options.interval ) SOURCE.timeout = setTimeout(
                            SOURCE.send,
                            SOURCE.options.interval
                        );
                    }
                    break;
                case XHR.LOADING:
                    break;
                case XHR.DONE:
                    switch ( XHR.status ) {
                        case 200:
                            RESOURCE.next( XHR.response );
                            console.log("data changed")
                            if ( SOURCE.options.interval ) SOURCE.timeout = setTimeout(
                                SOURCE.send,
                                SOURCE.options.interval
                            );
                            break;
                        case 0 :
                            break;
                        default:
                            console.log( "default" + XHR.status );
                            //console.error(XHR.status+":"+XHR.statusText);
                            if ( SOURCE.options.interval ) SOURCE.timeout = setTimeout(
                                SOURCE.send,
                                SOURCE.options.interval
                            );
                            break;
                    }
                break;
            }
        }
    }
}