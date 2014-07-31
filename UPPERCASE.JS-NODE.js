global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(e){"use strict";var t=require("cluster");return{run:function(n){RUN(t.isMaster?function(){var e=function(){var e=t.fork();e.on("message",function(n){EACH(t.workers,function(t){t!==e&&t.send(n)})})};REPEAT(require("os").cpus().length,function(){e()}),t.on("exit",function(t,n,o){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+t.id+" (PID:"+t.process.pid+") died. ("+(void 0!==o?o:n)+"). restarting...")),e()})}:function(){var o,E,r,i=t.worker.id,a=t.worker.process.pid,u={},R=function(e,t){var n=u[e];void 0!==n&&EACH(n,function(e){e(t)})};process.on("message",function(e){var t=PARSE_STR(e);void 0!==t&&R(t.methodName,t.data)}),e.on=o=function(e,t){var n=u[e];void 0===n&&(n=u[e]=[]),n.push(t)},o("__SHARED_STORE_SAVE",SHARED_STORE.save),o("__SHARED_STORE_REMOVE",SHARED_STORE.remove),o("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),o("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),e.off=E=function(e){delete u[e]},e.broadcast=r=function(e){process.send(STRINGIFY(e))},n({id:i,pid:a},o,E,r),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+i+", PID:"+a+")"))})}}}),global.CPU_SHARED_STORE=CPU_SHARED_STORE=CLASS(function(e){"use strict";var t,n,o,E={},r={};return e.save=t=function(e,t){var n=e.fullKey,o=e.value,i=e.removeAfterSeconds,a=e.isWaitRemove;E[n]=o,a===!0&&void 0!==r[n]&&(r[n].remove(),delete r[n]),void 0!==i&&(r[n]=DELAY(i,t))},e.get=n=function(e){return E[e]},e.remove=o=function(e){delete E[e],void 0!==r[e]&&(r[e].remove(),delete r[e])},{init:function(t,n,o){var E,r,i,a;E=function(e){return o+"."+e},n.save=r=function(t){var n=t.key,o=E(n),r=t.value,i=t.removeAfterSeconds;e.save({fullKey:o,value:r,removeAfterSeconds:i},function(){a(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullKey:o,value:r,isWaitRemove:void 0!==i}})},n.get=i=function(t){return e.get(E(t))},n.remove=a=function(t){var n=E(t);e.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:n})}}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(e){"use strict";return{run:function(t,n){var o,E,r,i,a,u=require("os"),R=t.hosts,s=t.port,c=u.networkInterfaces(),S=[],_={},d={},C={},v=[];EACH(c,function(e){return EACH(e,function(e){var t=e.address;return"IPv4"===e.family&&e.internal===!1&&(S.push(t),CHECK_IS_EXISTS({data:R,value:t})===!0)?(o=t,!1):void 0})}),void 0===o?console.log(CONSOLE_YELLOW("[UPPERCASE.JS-SERVER_CLUSTERING] NOT EXISTS MY HOST. (CLUSTER SERVER HOSTS:"),R,CONSOLE_YELLOW(", THIS SERVER HOSTS:"),S):(E=function(e){d[e]!==!0&&(d[e]=!0,CONNECT_TO_SOCKET_SERVER({host:e,port:s},{error:function(){delete d[e]},success:function(t,n,E){E({methodName:"__BOOTED",data:o}),C[e]=function(e){var t=e.methodName,n=e.data;E({methodName:"SERVER_CLUSTERING."+t,data:n})},t("__DISCONNECTED",function(){delete C[e],delete d[e]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+e+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:e})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",E),EACH(R,function(e){e!==o&&E(e)}),SOCKET_SERVER(s,function(e,t){v.push(t),t("__BOOTED",function(e){E(e)}),EACH(_,function(e,n){EACH(e,function(e){t("SERVER_CLUSTERING."+n,e)})}),t("__DISCONNECTED",function(){REMOVE({data:v,value:t})})}),e.on=r=function(e,t){var n=_[e];void 0===n&&(n=_[e]=[]),n.push(t),EACH(v,function(n){n("SERVER_CLUSTERING."+e,t)})},r("__SHARED_STORE_SAVE",function(e){SHARED_STORE.save(e),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:e})}),r("__SHARED_STORE_REMOVE",function(e){SHARED_STORE.remove(e),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:e})}),e.off=i=function(e){delete _[e]},e.broadcast=a=function(e){EACH(C,function(t){t(e)})},void 0!==n&&n(o,r,i,a),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+o+", PORT:"+s+")")))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(e){"use strict";var t,n,o,E={},r={};return e.save=t=function(e,t){var n=e.fullKey,o=e.value,i=e.removeAfterSeconds,a=e.isWaitRemove;E[n]=o,a===!0&&void 0!==r[n]&&(r[n].remove(),delete r[n]),void 0!==i&&(r[n]=DELAY(i,t))},e.get=n=function(e){return E[e]},e.remove=o=function(e){delete E[e],void 0!==r[e]&&(r[e].remove(),delete r[e])},{init:function(t,n,o){var E,r,i,a;E=function(e){return o+"."+e},n.save=r=function(t){var n=t.key,o=E(n),r=t.value,i=t.removeAfterSeconds;e.save({fullKey:o,value:r,removeAfterSeconds:i},function(){a(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:o,value:r,isWaitRemove:void 0!==i}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:o,value:r,isWaitRemove:void 0!==i}})},n.get=i=function(t){return e.get(E(t))},n.remove=a=function(t){var n=E(t);e.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(e,t){"use strict";var n,o,E,r,i,a,u,R,s,c=e.host,S=e.port,_=require("net"),d={},C=0,v="";CHECK_IS_DATA(t)!==!0?n=t:(n=t.success,o=t.error),s=function(e,t,n){var o=d[e];void 0!==o&&EACH(o,function(e){e(t,function(e){void 0!==R&&void 0!==n&&R({methodName:"__CALLBACK_"+n,data:e})})})},E=_.connect({host:c,port:S},function(){r=!0,n(a=function(e,t){var n=d[e];void 0===n&&(n=d[e]=[]),n.push(t)},u=function(e,t){var n=d[e];void 0!==n&&(void 0!==t?REMOVE({data:n,value:t}):delete d[e])},R=function(e,t){var n="__CALLBACK_"+C;e.sendKey=C,C+=1,E.write(STRINGIFY(e)+"\n"),void 0!==t&&a(n,function(e){t(e),u(n)})},function(){i=!0,E.end()})}),E.on("data",function(e){var t,n,o;for(v+=e.toString();-1!==(n=v.indexOf("\n"));)t=v.substring(0,n),o=PARSE_STR(t),void 0!==o&&s(o.methodName,o.data,o.sendKey),v=v.substring(n+1)}),E.on("close",function(){i!==!0&&s("__DISCONNECTED")}),E.on("error",function(e){var t=e.toString();r!==!0?(console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+t)),void 0!==o&&o(t)):s("__ERROR",t)})}}),global.CONSOLE_BLUE=CONSOLE_BLUE=METHOD({run:function(e){"use strict";return"[36m"+e+"[0m"}}),global.CONSOLE_GREEN=CONSOLE_GREEN=METHOD({run:function(e){"use strict";return"[32m"+e+"[0m"}}),global.CONSOLE_RED=CONSOLE_RED=METHOD({run:function(e){"use strict";return"[31m"+e+"[0m"}}),global.CONSOLE_YELLOW=CONSOLE_YELLOW=METHOD({run:function(e){"use strict";return"[33m"+e+"[0m"}}),global.SHA1=SHA1=METHOD({run:function(e){"use strict";var t=e.key,n=e.password,o=require("crypto");return o.createHmac("sha1",t).update(n).digest("hex")}}),global.COPY_FILE=COPY_FILE=METHOD(function(){"use strict";var e=require("fs"),t=require("path");return{run:function(n,o){var E,r,i=n.srcPath,a=n.distPath;CHECK_IS_DATA(o)!==!0?E=o:(E=o.success,r=o.error),CREATE_FOLDER(t.dirname(a),function(){var t=e.createReadStream(i);t.pipe(e.createWriteStream(a)),t.on("error",function(e){var t=e.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR:"+t)),void 0!==r&&r(t)}),t.on("end",function(){E()})})}}}),global.CREATE_FOLDER=CREATE_FOLDER=METHOD(function(){"use strict";var e=require("fs"),t=require("path");return{run:function(n,o){e.exists(n,function(E){var r;E===!0?o():(r=t.dirname(n),e.exists(r,function(t){t===!0?e.mkdir(n,o):CREATE_FOLDER(r,function(){CREATE_FOLDER(n,o)})}))})}}}),global.MOVE_FILE=MOVE_FILE=METHOD({run:function(e,t){"use strict";var n,o,E=e.srcPath;CHECK_IS_DATA(t)!==!0?n=t:(n=t.success,o=t.error),COPY_FILE(e,{error:o,success:function(){REMOVE_FILE(E,{error:o,success:n})}})}}),global.READ_FILE=READ_FILE=METHOD(function(){"use strict";var e=require("fs");return{run:function(t,n){var o,E,r;CHECK_IS_DATA(n)!==!0?o=n:(o=n.success,E=n.notExists,r=n.error),e.exists(t,function(n){n===!0?e.stat(t,function(n,i){var a;n!==TO_DELETE?(a=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+a)),void 0!==r&&r(a)):i.isDirectory()===!0?void 0!==E&&E(t):e.readFile(t,function(e,t){var n;e!==TO_DELETE?(n=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+n)),void 0!==r&&r(n)):o(t)})}):void 0!==E&&E(t)})}}}),global.REMOVE_FILE=REMOVE_FILE=METHOD(function(){"use strict";var e=require("fs");return{run:function(t,n){var o,E,r;CHECK_IS_DATA(n)!==!0?o=n:(o=n.success,E=n.notExists,r=n.error),e.exists(t,function(n){n===!0?e.unlink(t,function(e){var t;e!==TO_DELETE?(t=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+t)),void 0!==r&&r(t)):void 0!==o&&o()}):void 0!==E&&E(t)})}}}),global.WRITE_FILE=WRITE_FILE=METHOD(function(){"use strict";var e=require("fs"),t=require("path");return{run:function(n,o){var E,r,i=n.path,a=n.content;CHECK_IS_DATA(o)!==!0?E=o:(E=o.success,r=o.error),CREATE_FOLDER(t.dirname(i),function(){e.writeFile(i,a,function(e){var t;e!==TO_DELETE?(t=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+t)),void 0!==r&&r(t)):E()})})}}}),global.DELETE=DELETE=METHOD({run:function(e,t){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(e)===!0?e:{uri:e},{method:"DELETE"}]),t)}}),global.GET=GET=METHOD({run:function(e,t){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(e)===!0?e:{uri:e},{method:"GET"}]),t)}}),global.POST=POST=METHOD({run:function(e,t){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(e)===!0?e:{uri:e},{method:"POST"}]),t)}}),global.PUT=PUT=METHOD({run:function(e,t){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(e)===!0?e:{uri:e},{method:"PUT"}]),t)}}),global.REQUEST=REQUEST=METHOD({run:function(e,t){"use strict";var n,o,E,r=require("http"),i=void 0===e.host?"localhost":e.host,a=void 0===e.port?80:e.port,u=e.method,R=e.uri,s=void 0!==e.data?"data="+encodeURIComponent(STRINGIFY(e.data)):e.paramStr;CHECK_IS_DATA(t)!==!0?n=t:(n=t.success,o=t.error),s=(void 0===s?"":s+"&")+Date.now(),u=u.toUpperCase(),"GET"===u?E=r.get({hostname:i,port:a,path:"/"+R+"?"+s},function(e){e.setEncoding("utf-8"),e.on("data",function(e){n(e)})}):(E=r.request({hostname:i,port:a,path:"/"+R,method:u},function(e){e.setEncoding("utf-8"),e.on("data",function(e){n(e)})}),E.write(s),E.end()),E.on("error",function(t){var n=t.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+n),e),void 0!==o&&o(n)})}}),global.RESOURCE_SERVER=RESOURCE_SERVER=CLASS(function(e){"use strict";var t,n=require("path"),o=require("querystring");return e.getContentTypeFromURI=t=function(e){var t=n.extname(e);return".png"===t?"image/png":".jpeg"===t||".jpg"===t?"image/jpeg":".gif"===t?"image/gif":".js"===t?"text/javascript":".json"===t?"application/json":".css"===t?"text/css":".text"===t||".txt"===t?"text/plain":".html"===t?"text/html":".swf"===t?"application/x-shockwave-flash":".mp3"===t?"audio/mpeg":"application/octet-stream"},{init:function(e,n,E,r){var i,a,u,R,s,c=(require("path"),E.port),S=E.securedPort,_=E.rootPath,d=E.version,C={};void 0!==r&&(CHECK_IS_DATA(r)!==!0?i=r:(i=r.requestListener,a=r.error,u=r.notExistsResource)),R=WEB_SERVER(E,function(e,n,E){var r,R,s,c=_,S=e.uri,v=e.method,T=e.params,O=e.headers,f={};NEXT([function(t){void 0!==i&&(r=i(e,n,E,function(e){c=e},function(e){f=e,t()}),S=e.uri,v=e.method,T=e.params,O=e.headers),r!==!1&&e.isResponsed!==!0&&t()},function(){return function(){CONFIG.isDevMode!==!0&&(f.isFinal!==!0?void 0!==d&&O["if-none-match"]===d:void 0!==O["if-none-match"])?n({statusCode:304}):CONFIG.isDevMode!==!0&&f.isFinal!==!0&&void 0!==d&&""!==S&&T.version!==d?n({statusCode:302,headers:{Location:"/"+S+"?"+o.stringify(COMBINE([T,{version:d}]))}}):"GET"===v&&(R=function(t){void 0!==u&&u(t,e,n),e.isResponsed!==!0&&n({statusCode:404})},s=function(t){console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+t)),void 0!==a&&a(t,e,n),e.isResponsed!==!0&&n({statusCode:500})},NEXT([function(e){var t=C[S];void 0!==t?e(t.content,t.contentType):READ_FILE(c+"/"+S,{notExists:function(){READ_FILE(c+(""===S?"":"/"+S)+"/index.html",{notExists:R,error:s,success:function(t){e(t,"text/html")}})},error:s,success:e})},function(){return function(e,o){void 0===o&&(o=t(S)),f.isFinal!==!0&&void 0===C[S]&&(C[S]={content:e,contentType:o}),n(EXTEND({origin:{content:e,contentType:o,version:d},extend:f}))}}]))}}])}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===c?"":" (PORT:"+c+")")+(void 0===S?"":" (SECURED PORT:"+S+")")),n.getNativeHTTPServer=s=function(){return R.getNativeHTTPServer()}}}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(e,t){"use strict";var n=require("net"),o=n.createServer(function(e){var n,o,E,r,i={},a=0,u="",R=function(e,t,n){var o=i[e];void 0!==o&&EACH(o,function(e){e(t,function(e){void 0!==n&&r({methodName:"__CALLBACK_"+n,data:e})})})};e.on("data",function(e){var t,n,o;for(u+=e.toString();-1!==(n=u.indexOf("\n"));)t=u.substring(0,n),o=PARSE_STR(t),void 0!==o&&R(o.methodName,o.data,o.sendKey),u=u.substring(n+1)}),e.on("close",function(){n!==!0&&R("__DISCONNECTED"),i=void 0}),e.on("error",function(e){R("__ERROR",e)}),t({ip:e.remoteAddress},o=function(e,t){var n=i[e];void 0===n&&(n=i[e]=[]),n.push(t)},E=function(e,t){var n=i[e];void 0!==n&&(void 0!==t?REMOVE({data:n,value:t}):delete i[e])},r=function(t,n){var r="__CALLBACK_"+a;t.sendKey=a,a+=1,e.write(STRINGIFY(t)+"\n"),void 0!==n&&o(r,function(e){n(e),E(r)})},function(){n=!0,e.end()})});o.listen(e),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+e+")")}}),global.WEB_SERVER=WEB_SERVER=CLASS(function(e){"use strict";var t,n=require("http"),o=require("querystring");return e.getEncodingFromContentType=t=function(e){return"text/javascript"===e?"utf-8":"text/css"===e?"utf-8":"text/plain"===e?"binary":"text/html"===e?"utf-8":"image/png"===e?"binary":"image/jpeg"===e?"binary":"image/gif"===e?"binary":"application/x-shockwave-flash"===e?"binary":"audio/mpeg"===e?"binary":"binary"},{init:function(e,E,r,i){var a,u,R,s,c,S,_,d;CHECK_IS_DATA(r)!==!0?a=r:(a=r.port,u=r.securedPort,R=r.securedKeyFilePath,s=r.securedCertFilePath,c=r.notParsingNativeReqURIs),_=function(e,n){var E,r,a=e.headers,u=e.url,R=e.method.toUpperCase(),s=a["X-Forwarded-For"],S=[];void 0===s&&(s=e.connection.remoteAddress),-1!=u.indexOf("?")&&(E=u.substring(u.indexOf("?")+1),u=u.substring(0,u.indexOf("?"))),u=u.substring(1),NEXT([function(t){"GET"===R||CHECK_IS_EXISTS({data:c,value:u})===!0?t():(e.on("data",function(e){void 0===E&&(E=""),E+=e}),e.on("end",function(){t()}))},function(){return function(){i(r={headers:a,uri:u,method:R,params:o.parse(E),ip:s,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:e},function(e){var o,E,i,a,u,R,s;r.isResponsed!==!0&&(CHECK_IS_DATA(e)!==!0?a=e:(o=e.statusCode,E=e.headers,i=e.contentType,a=e.content,u=e.encoding,R=e.version,s=e.isFinal),void 0===o&&(o=200),void 0===E&&(E={}),void 0!==i&&(E["Content-Type"]=i,void 0===u&&(u=t(i))),CONFIG.isDevMode!==!0&&(s===!0?E.ETag="FINAL":void 0!==R&&(E.ETag=R)),n.writeHead(o,E),n.end(a,u),r.isResponsed=!0)},function(e){S.push(e)})}}]),CHECK_IS_EXISTS({data:c,value:u})!==!0&&e.on("close",function(){EACH(S,function(e){e()})})},void 0!==a&&(S=n.createServer(_).listen(a)),void 0!==u&&(S=https.createServer({key:fs.readFileSync(R),cert:fs.readFileSync(s)},_).listen(u)),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===u?"":" (SECURED PORT:"+u+")")),E.getNativeHTTPServer=d=function(){return S}}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(e){"use strict";var t,n={};return void 0!==e&&(t=e.split(";"),EACH(t,function(e){var t=e.split("=");n[t[0].trim()]=decodeURIComponent(t[1])})),n}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(e){"use strict";var t=[];return EACH(e,function(e,n){t.push(n+"="+encodeURIComponent(e))}),t}});