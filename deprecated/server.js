const FS = require("fs");
const PATH = require("path");
const URL = require("url");
const APP = require("http").createServer(onRequest);
const IO = require("socket.io")(APP);
const CWD = process.cwd();
const PORT = process.argv[2] || 8001;

APP.listen(PORT,function(){console.log([timeHHMMSS()," listening on port ",PORT].join(""));});

function onRequest(request,response){
	
	var rURL = URL.parse(request.url);
	var rPath = rURL.path;
	if(rPath === "/") rPath = "/index.html";
	console.log(request.method + " " + PATH.normalize(rPath))
	if(request.method === "GET") FS.readFile(process.cwd()+rPath,{encoding:"utf8"},serveFile);
		
	function serveFile(error,file){
		//return inspect(PATH,1); 
		if(error){ 
			response.writeHead(404,{"Content-Type":"text/html"});
			console.log(error);
		}
		else {
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write(file);
		}
		response.end();
	}
	function inspect(structure,d){
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("<html><head></head><body style='background:black;'>");
		response.write("<h1 style='background:#444;color:white;'>"+CWD+"</h1>");
		response.write("<h2 style='background:#444;color:white;'>"+request.url+"</h2>");
		recursivePrint(structure,d||0,"",function(result,depth){	
			response.write("<div style='background:#444;padding-left:"+(120-depth*50)+"px;'>"+result+"</div>");
		})
		
		response.end("</body></html>");
	

		function recursivePrint(target,iterations,objpath,oniteration){
			if(typeof target === "object"){
				for(var k in target){
					oniteration("<span style='margin-right:5px;color:white'>" + k + "</span> <span style='color:yellowgreen;'> "+ typeof target[k] +"</span> <span style='color:#CCC'> "+objpath+"</span> <pre style='background:#333;margin:0;color:#CCC;'> "+ target[k]+"</pre>",iterations);
					if(iterations > 0) recursivePrint(target[k],iterations-1,objpath+k+"/",oniteration);
				}
			}
		}
		function requestFile(path){
			const x = new XMLHttpRequest;
			const $ = this;
			x.open("GET",path);
			x.onreadystatechange = function(){
				if(x.readystate === x.DONE) $.appendChild(x.response);
			}
		}
	}
}

function timeHHMMSS(){
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();	if(m < 10) m = "0"+m;
	var s = d.getSeconds();	if(s < 10) s = "0"+s;
	return [h,":",m,":",s].join("");
}