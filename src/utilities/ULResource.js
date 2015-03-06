import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./ULPropertyDescriptors";

// instead of preventing circular structures I limit the depth to something silly
const MAX_STEPS = 5000;

export default class Resource {
	constructor ( source, target ) {
		if ( !( this instanceof Resource ) ) return new Resource( source, target );
		Properties( this, { source, target }, E | C | W );
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
						SCENE[ line ] = {};
						target = SCENE[ line ];
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
			console.log( SCENE );
			return SCENE;
		});
		if ( string ) RESSOURCE.process( string );
		return RESSOURCE;
	}
	static base16 ( ) {
		return new Resource( function ( ) { 
			return  new Uint16Array( [].slice.call( arguments ).map( function ( e ) { 
				return parseInt( e, 16 );
			} ) );
		}, target );
	}
	static base8 ( ) {
		return new Resource( function ( ) { 
			return  new Uint8Array( [].slice.call( arguments ).map( function ( e ) { 
				return parseInt( e, 8 );
			} ) );
		}, target );
	}
	static int8 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Int8Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static uint8 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Uint8Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static uint8clamped ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Uint8ClampedArray( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static int16 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Int16Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static uint16 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Uint16Array( arguments );
		});
		if( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static int32 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Int32Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static uint32 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Uint32Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static float32 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Float32Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static float64 ( ) {
		var r = new Resource().setSource( function ( ) { 
			return new Float64Array( arguments );
		});
		if ( arguments.length > 0 ) r.process.apply( r, arguments );
		return r;
	}
	static css ( property ) {
		const PRIMITIVE = CSSPrimitiveValue;
		const TARGET = document.querySelector( selector );

		//this.createShadowRoot();
		//this.shadowRoot.innerHTML = "<style>:host{display:block;visibility:hidden;transition:1ms;}</style>";
		/*
		var rgb = v.getRGBColorValue();
		var p = rgb.red.primitiveValue;

		col[0] = rgb.red.getFloatValue(PRIMITIVE.CSS_NUMBER);
		col[1] = rgb.green.getFloatValue(PRIMITIVE.CSS_NUMBER);
		col[2] = rgb.blue.getFloatValue(PRIMITIVE.CSS_NUMBER);
		console.log(col);
		*/
		TARGET.handleEvent=function(e){
			var c = getComputedStyle(this);
			var v = c.getPropertyCSSValue(property);
			
		};
		TARGET.addEventListener("transitionend",TARGET);
		TARGET.style.color = "#555";
	}
	static http ( url, options ) {
		if ( options === undefined ) options = {};

		const XHR = new XMLHttpRequest;
		const SOURCE = {
			url			: url,
			request		: XHR,
			options		: options,
			lastUpdated	: 0,

			send 		: function ( ) {
				XHR.open( "GET", SOURCE.url );
				for( var prop in options ) {
					if( prop in XHR ) XHR[ prop ] = options[ prop ];
				}
				XHR.onreadystatechange = options.onreadystatechange || resolve;
				XHR.send();
			}
		
		}
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
						if ( SOURCE.options.interval ) setTimeout(
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
							//console.log("data changed")
							if ( SOURCE.options.interval ) setTimeout(
								SOURCE.send,
								SOURCE.options.interval
							);
							break;
						default:
							//console.error(XHR.status+":"+XHR.statusText);
							if ( SOURCE.options.interval ) setTimeout(
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
Properties( Resource.prototype, {
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
	},
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
			arguments.unshift.apply( arguments, this.source ) : arguments.unshift( this.source );

			return this.next.apply( this, arguments );
		}
	},
	setTarget ( target ) {
		if ( this.target !== undefined ) target.process( this.target );
		this.target = target;
		return this;
	},
	swapTarget ( target ) {
		this.target = target;
		return this;
	},
	setSource ( source ) {
		if ( arguments.length > 1 ) source = [].slice.call( arguments );
		this.source = source;
		return this;
	},
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
	},
	createRoot ( source ) {
		return new Resource().setSource( source ).setTarget( this );
	},
	createFork ( target ) {
		return new Resource().setSource( this ).setTarget( target );
	},
});