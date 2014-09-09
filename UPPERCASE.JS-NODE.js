global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(E){"use strict";var o,n,t=require("cluster");return E.getWorkerId=n=function(){return o},{run:function(n){RUN(t.isMaster?function(){var E=function(){var E=t.fork();E.on("message",function(o){EACH(t.workers,function(n){n!==E&&n.send(o)})})};REPEAT(require("os").cpus().length,function(){E()}),t.on("exit",function(o,n,t){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+o.id+" died. ("+(void 0!==t?t:n)+"). restarting...")),E()})}:function(){var e,r,i,S={},a=function(E,o){var n=S[E];void 0!==n&&EACH(n,function(E){E(o)})};o=t.worker.id,process.on("message",function(E){var o=PARSE_STR(E);void 0!==o&&a(o.methodName,o.data)}),E.on=e=function(E,o){var n=S[E];void 0===n&&(n=S[E]=[]),n.push(o)},e("__SHARED_STORE_SAVE",SHARED_STORE.save),e("__SHARED_STORE_REMOVE",SHARED_STORE.remove),e("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),e("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),E.off=r=function(E){delete S[E]},E.broadcast=i=function(E){process.send(STRINGIFY(E))},n(),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+o+")"))})}}}),global.CPU_SHARED_STORE=CPU_SHARED_STORE=CLASS(function(E){"use strict";var o,n,t,e={},r={};return E.save=o=function(E,o){var n=E.fullName,t=E.value,i=E.removeAfterSeconds,S=E.isWaitRemove;e[n]=t,S===!0&&void 0!==r[n]&&(r[n].remove(),delete r[n]),void 0!==i&&(r[n]=DELAY(i,o))},E.get=n=function(E){return e[E]},E.remove=t=function(E){delete e[E],void 0!==r[E]&&(r[E].remove(),delete r[E])},{init:function(o,n,t){var e,r,i,S;o.getFullName=e=function(E){return t+"."+E},n.save=r=function(o){var n=o.name,t=e(n),r=o.value,i=o.removeAfterSeconds;E.save({fullName:t,value:r,removeAfterSeconds:i},function(){S(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullName:t,value:r,isWaitRemove:void 0!==i}})},n.get=i=function(o){return E.get(e(o))},n.remove=S=function(o){var n=e(o);E.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:n})}}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(E){"use strict";return{run:function(o,n){var t,e,r,i,S=o.hosts,a=o.thisServerHost,R=o.port,c={},u={},s={},_=[];t=function(E){u[E]!==!0&&(u[E]=!0,CONNECT_TO_SOCKET_SERVER({host:E,port:R},{error:function(){delete u[E]},success:function(o,n,t){t({methodName:"__BOOTED",data:a}),s[E]=function(E){var o=E.methodName,n=E.data;t({methodName:"SERVER_CLUSTERING."+o,data:n})},o("__DISCONNECTED",function(){delete s[E],delete u[E]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+E+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:E})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",t),EACH(S,function(E){E!==a&&t(E)}),SOCKET_SERVER(R,function(E,o){_.push(o),o("__BOOTED",function(E){t(E)}),EACH(c,function(E,n){EACH(E,function(E){o("SERVER_CLUSTERING."+n,E)})}),o("__DISCONNECTED",function(){REMOVE({array:_,value:o})})}),E.on=e=function(E,o){var n=c[E];void 0===n&&(n=c[E]=[]),n.push(o),EACH(_,function(n){n("SERVER_CLUSTERING."+E,o)})},e("__SHARED_STORE_SAVE",function(E){SHARED_STORE.save(E),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:E})}),e("__SHARED_STORE_REMOVE",function(E){SHARED_STORE.remove(E),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:E})}),E.off=r=function(E){delete c[E]},E.broadcast=i=function(E){EACH(s,function(o){o(E)})},void 0!==n&&n(a,e,r,i),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+a+", PORT:"+R+")"))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(E){"use strict";var o,n,t,e={},r={};return E.save=o=function(E,o){var n=E.fullName,t=E.value,i=E.removeAfterSeconds,S=E.isWaitRemove;e[n]=t,S===!0&&void 0!==r[n]&&(r[n].remove(),delete r[n]),void 0!==i&&(r[n]=DELAY(i,o))},E.get=n=function(E){return e[E]},E.remove=t=function(E){delete e[E],void 0!==r[E]&&(r[E].remove(),delete r[E])},{init:function(o,n,t){var e,r,i,S;e=function(E){return t+"."+E},n.save=r=function(o){var n=o.name,t=e(n),r=o.value,i=o.removeAfterSeconds;E.save({fullName:t,value:r,removeAfterSeconds:i},function(){S(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:r,isWaitRemove:void 0!==i}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:r,isWaitRemove:void 0!==i}})},n.get=i=function(o){return E.get(e(o))},n.remove=S=function(o){var n=e(o);E.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(E,o){"use strict";var n,t,e,r,i,S,a,R,c,u=E.host,s=E.port,_=require("net"),C={},d=0,O="";CHECK_IS_DATA(o)!==!0?n=o:(n=o.success,t=o.error),c=function(E,o,n){var t=C[E];void 0!==t&&EACH(t,function(E){E(o,function(E){void 0!==R&&void 0!==n&&R({methodName:"__CALLBACK_"+n,data:E})})})},e=_.connect({host:u,port:s},function(){r=!0,n(S=function(E,o){var n=C[E];void 0===n&&(n=C[E]=[]),n.push(o)},a=function(E,o){var n=C[E];void 0!==n&&(void 0!==o?REMOVE({array:n,value:o}):delete C[E])},R=function(E,o){var n="__CALLBACK_"+d;E.sendKey=d,d+=1,e.write(STRINGIFY(E)+"\r\n"),void 0!==o&&S(n,function(E){o(E),a(n)})},function(){i=!0,e.end()})}),e.on("data",function(E){var o,n,t;for(O+=E.toString();-1!==(n=O.indexOf("\r\n"));)o=O.substring(0,n),t=PARSE_STR(o),void 0!==t&&c(t.methodName,t.data,t.sendKey),O=O.substring(n+1)}),e.on("close",function(){i!==!0&&c("__DISCONNECTED")}),e.on("error",function(E){var o=E.toString();r!==!0?void 0!==t?t(o):console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+o)):c("__ERROR",o)})}}),global.CONSOLE_BLUE=CONSOLE_BLUE=METHOD({run:function(E){"use strict";return"[36m"+E+"[0m"}}),global.CONSOLE_GREEN=CONSOLE_GREEN=METHOD({run:function(E){"use strict";return"[32m"+E+"[0m"}}),global.CONSOLE_RED=CONSOLE_RED=METHOD({run:function(E){"use strict";return"[31m"+E+"[0m"}}),global.CONSOLE_YELLOW=CONSOLE_YELLOW=METHOD({run:function(E){"use strict";return"[33m"+E+"[0m"}}),global.SHA1=SHA1=METHOD({run:function(E){"use strict";var o=E.key,n=E.password,t=require("crypto");return t.createHmac("sha1",o).update(n).digest("hex")}}),global.CHECK_IS_EXISTS_FILE=CHECK_IS_EXISTS_FILE=METHOD(function(){"use strict";var E=require("fs");return{run:function(o,n){var t,e;return CHECK_IS_DATA(o)!==!0?t=o:(t=o.path,e=o.isSync),e===!0?E.existsSync(t):void E.exists(t,n)}}}),global.COPY_FILE=COPY_FILE=METHOD(function(){"use strict";var E=require("fs"),o=require("path");return{run:function(n,t){var e,r,i=n.from,S=n.to,a=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,r=t.error)),CREATE_FOLDER({path:o.dirname(S),isSync:a},{error:r,success:function(){RUN(a!==!0?function(){var o=E.createReadStream(i);o.pipe(E.createWriteStream(S)),o.on("error",function(E){var o=E.toString();void 0!==r?r(o):console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR:"+o))}),o.on("end",function(){void 0!==e&&e()})}:function(){var o;try{E.writeFileSync(S,E.readFileSync(i))}catch(n){n!==TO_DELETE&&(o=n.toString(),void 0!==r?r(o):console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR: "+o)))}void 0!==e&&e()})}})}}}),global.CREATE_FOLDER=CREATE_FOLDER=METHOD(function(){"use strict";var E=require("fs"),o=require("path");return{run:function(n,t){var e,r,i,S,a;CHECK_IS_DATA(n)!==!0?e=n:(e=n.path,r=n.isSync),void 0!==t&&(CHECK_IS_DATA(t)!==!0?S=t:(S=t.success,a=t.error)),r!==!0?CHECK_IS_EXISTS_FILE(e,function(n){n===!0?void 0!==S&&S():(i=o.dirname(e),CHECK_IS_EXISTS_FILE(i,function(o){o===!0?E.mkdir(e,function(E){var o;E!==TO_DELETE?(o=E.toString(),void 0!==a?a(o):console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+o))):S()}):CREATE_FOLDER(i,function(){CREATE_FOLDER(e,S)})}))}):RUN(function(){var n;try{CHECK_IS_EXISTS_FILE({path:e,isSync:!0})!==!0&&(i=o.dirname(e),CHECK_IS_EXISTS_FILE({path:i,isSync:!0})===!0?E.mkdirSync(e):(CREATE_FOLDER({path:i,isSync:!0}),CREATE_FOLDER({path:e,isSync:!0})))}catch(t){t!==TO_DELETE&&(n=t.toString(),void 0!==a?a(n):console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+n)))}void 0!==S&&S()})}}}),global.FIND_FILE_NAMES=FIND_FILE_NAMES=METHOD(function(){"use strict";{var E=require("fs");require("path")}return{run:function(o,n){var t,e,r,i,S=[];return CHECK_IS_DATA(o)!==!0?t=o:(t=o.path,e=o.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?r=n:(r=n.success,i=n.error)),e===!0?RUN(function(){var o,n;try{o=E.readdirSync(t),EACH(o,function(o){"."!==o[0]&&E.statSync(t+"/"+o).isDirectory()!==!0&&S.push(o)})}catch(e){e!==TO_DELETE&&(n=e.toString(),void 0!==i?i(n):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR: "+n)))}return void 0!==r&&r(S),S}):void E.readdir(t,function(o,n){var e;o!==TO_DELETE?(e=o.toString(),void 0!==i?i(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:"+e))):void 0!==r&&PARALLEL(n,[function(o,n){"."!==o[0]?E.stat(t+"/"+o,function(E,t){var e;E!==TO_DELETE?(e=E.toString(),void 0!==i?i(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:"+e))):(t.isDirectory()!==!0&&S.push(o),n())}):n()},function(){void 0!==r&&r(S)}])})}}}),global.FIND_FOLDER_NAMES=FIND_FOLDER_NAMES=METHOD(function(){"use strict";{var E=require("fs");require("path")}return{run:function(o,n){var t,e,r,i,S=[];return CHECK_IS_DATA(o)!==!0?t=o:(t=o.path,e=o.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?r=n:(r=n.success,i=n.error)),e===!0?RUN(function(){var o,n;try{o=E.readdirSync(t),EACH(o,function(o){"."!==o[0]&&E.statSync(t+"/"+o).isDirectory()===!0&&S.push(o)})}catch(e){e!==TO_DELETE&&(n=e.toString(),void 0!==i?i(n):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR: "+n)))}return void 0!==r&&r(S),S}):void E.readdir(t,function(o,n){var e;o!==TO_DELETE?(e=o.toString(),void 0!==i?i(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR:"+e))):void 0!==r&&PARALLEL(n,[function(o,n){"."!==o[0]?E.stat(t+"/"+o,function(E,t){var e;E!==TO_DELETE?(e=E.toString(),void 0!==i?i(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR:"+e))):(t.isDirectory()===!0&&S.push(o),n())}):n()},function(){void 0!==r&&r(S)}])})}}}),global.MOVE_FILE=MOVE_FILE=METHOD({run:function(E,o){"use strict";var n,t,e=E.from,r=E.isSync;CHECK_IS_DATA(o)!==!0?n=o:(n=o.success,t=o.error),COPY_FILE(E,{error:t,success:function(){REMOVE_FILE({path:e,isSync:r},{error:t,success:n})}})}}),global.READ_FILE=READ_FILE=METHOD(function(){"use strict";var E=require("fs");return{run:function(o,n){var t,e,r,i,S;return CHECK_IS_DATA(o)!==!0?t=o:(t=o.path,e=o.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?r=n:(r=n.success,i=n.notExists,S=n.error)),e===!0?RUN(function(){var o,n;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")));if(E.statSync(t).isDirectory()===!0)return void(void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")))}catch(e){e!==TO_DELETE&&(o=e.toString(),void 0!==S?S(o):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+o)))}return n=E.readFileSync(t),void 0!==r&&r(n),n}):void CHECK_IS_EXISTS_FILE(t,function(o){o===!0?E.stat(t,function(o,n){var e;o!==TO_DELETE?(e=o.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+e))):n.isDirectory()===!0?void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")):E.readFile(t,function(E,o){var n;E!==TO_DELETE?(n=E.toString(),void 0!==S?S(n):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+n))):void 0!==r&&r(o)})}):void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))})}}}),global.REMOVE_FILE=REMOVE_FILE=METHOD(function(){"use strict";var E=require("fs");return{run:function(o,n){var t,e,r,i,S;CHECK_IS_DATA(o)!==!0?t=o:(t=o.path,e=o.isSync),CHECK_IS_DATA(n)!==!0?r=n:(r=n.success,i=n.notExists,S=n.error),e!==!0?CHECK_IS_EXISTS_FILE(t,function(o){o===!0?E.unlink(t,function(E){var o;E!==TO_DELETE?(o=E.toString(),void 0!==S?S(o):console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+o))):void 0!==r&&r()}):void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}):RUN(function(){var o;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==i?i(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">")));E.unlinkSync(t)}catch(n){n!==TO_DELETE&&(o=n.toString(),void 0!==S?S(o):console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+o)))}void 0!==r&&r()})}}}),global.WRITE_FILE=WRITE_FILE=METHOD(function(){"use strict";var E=require("fs"),o=require("path");return{run:function(n,t){var e,r,i=n.path,S=n.content,a=n.buffer,R=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,r=t.error)),CREATE_FOLDER({path:o.dirname(i),isSync:R},function(){R!==!0?E.writeFile(i,void 0!==a?a:S,function(E){var o;E!==TO_DELETE?(o=E.toString(),void 0!==r?r(o):console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+o))):void 0!==e&&e()}):RUN(function(){var o;try{E.writeFileSync(i,void 0!==a?a:S)}catch(n){n!==TO_DELETE&&(o=n.toString(),void 0!==r?r(o):console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR: "+o)))}void 0!==e&&e()})})}}}),global.DELETE=DELETE=METHOD({run:function(E,o){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(E)===!0?E:{uri:E},{method:"DELETE"}]),o)}}),global.GET=GET=METHOD({run:function(E,o){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(E)===!0?E:{uri:E},{method:"GET"}]),o)}}),global.POST=POST=METHOD({run:function(E,o){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(E)===!0?E:{uri:E},{method:"POST"}]),o)}}),global.PUT=PUT=METHOD({run:function(E,o){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(E)===!0?E:{uri:E},{method:"PUT"}]),o)}}),global.REQUEST=REQUEST=METHOD(function(){"use strict";var E=require("http"),o=require("https");return{run:function(n,t){var e,r,i,S=n.host,a=n.isSecure,R=void 0===n.port?a!==!0?80:443:n.port,c=n.method,u=n.uri,s=void 0!==n.data?"data="+encodeURIComponent(STRINGIFY(n.data)):n.paramStr;CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,r=t.error),s=(void 0===s?"":s+"&")+Date.now(),c=c.toUpperCase(),"GET"===c?i=(a!==!0?E:o).get({hostname:S,port:R,path:"/"+u+"?"+s},function(E){E.setEncoding("utf-8"),E.on("data",function(E){e(E)})}):(i=(a!==!0?E:o).request({hostname:S,port:R,path:"/"+u,method:c},function(E){E.setEncoding("utf-8"),E.on("data",function(E){e(E)})}),i.write(s),i.end()),i.on("error",function(E){var o=E.toString();void 0!==r?r(o):console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+o),n)})}}}),global.RESOURCE_SERVER=RESOURCE_SERVER=CLASS(function(E){"use strict";var o,n=require("path"),t=require("querystring");return E.getContentTypeFromURI=o=function(E){var o=n.extname(E);return".png"===o?"image/png":".jpeg"===o||".jpg"===o?"image/jpeg":".gif"===o?"image/gif":".svg"===o?"image/svg+xml":".js"===o?"application/javascript":".json"===o?"application/json":".css"===o?"text/css":".text"===o||".txt"===o?"text/plain":".html"===o?"text/html":".swf"===o?"application/x-shockwave-flash":".mp3"===o?"audio/mpeg":"application/octet-stream"},{init:function(E,n,e,r){var i,S,a,R,c,u,s,_,C,d=(require("path"),{});CHECK_IS_DATA(e)!==!0?i=e:(i=e.port,S=e.securedPort,a=e.rootPath,R=e.version),void 0!==r&&(CHECK_IS_DATA(r)!==!0?c=r:(c=r.requestListener,u=r.error,s=r.notExistsResource)),_=WEB_SERVER(e,function(E,n,e){var r,i,S,_=a,C=E.uri,O=E.uri,v=E.method,T=E.params,f=E.headers,l={};NEXT([function(o){void 0!==c&&(r=c(E,n,e,function(E){_=E},function(E){void 0!==E&&(l=E),o()}),O=E.uri,v=E.method,T=E.params,f=E.headers),r!==!1&&E.isResponsed!==!0&&o()},function(){return function(){CONFIG.isDevMode!==!0&&(l.isFinal!==!0?void 0!==R&&f["if-none-match"]===R:void 0!==f["if-none-match"])?n({statusCode:304}):CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0!==R&&""!==C&&T.version!==R?n({statusCode:302,headers:{Location:"/"+C+"?"+t.stringify(COMBINE([T,{version:R}]))}}):void 0!==_&&"GET"===v?(i=function(o){void 0!==s&&s(o,E,n),E.isResponsed!==!0&&n({statusCode:404})},S=function(o){void 0!==u?u(o,E,n):console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+o)),E.isResponsed!==!0&&n({statusCode:500})},NEXT([function(E){var o=d[C];void 0!==o?E(o.buffer,o.contentType):READ_FILE(_+"/"+O,{notExists:function(){READ_FILE(_+(""===O?"":"/"+O)+"/index.html",{notExists:i,error:S,success:function(o){E(o,"text/html")}})},error:S,success:E})},function(){return function(E,t){void 0===t&&(t=o(O)),CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0===d[C]&&(d[C]={buffer:E,contentType:t}),n(EXTEND({origin:{buffer:E,contentType:t,version:R},extend:l}))}}])):n({statusCode:404})}}])}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===i?"":" (PORT:"+i+")")+(void 0===S?"":" (SECURED PORT:"+S+")")),n.getNativeHTTPServer=C=function(){return _.getNativeHTTPServer()}}}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(E,o){"use strict";var n=require("net"),t=n.createServer(function(E){var n,t,e,r,i={},S=0,a="",R=function(E,o,n){var t=i[E];void 0!==t&&EACH(t,function(E){E(o,function(E){void 0!==n&&r({methodName:"__CALLBACK_"+n,data:E})})})};E.on("data",function(E){var o,n,t;for(a+=E.toString();-1!==(n=a.indexOf("\r\n"));)o=a.substring(0,n),t=PARSE_STR(o),void 0!==t&&R(t.methodName,t.data,t.sendKey),a=a.substring(n+1)}),E.on("close",function(){n!==!0&&R("__DISCONNECTED"),i=void 0}),E.on("error",function(E){var o=E.toString();console.log("[UPPERCASE.JS-SOCEKT_SERVER] ERROR:",o),R("__ERROR",o)}),o({ip:E.remoteAddress},t=function(E,o){var n=i[E];void 0===n&&(n=i[E]=[]),n.push(o)},e=function(E,o){var n=i[E];void 0!==n&&(void 0!==o?REMOVE({array:n,value:o}):delete i[E])},r=function(o,n){var r="__CALLBACK_"+S;o.sendKey=S,S+=1,E.write(STRINGIFY(o)+"\r\n"),void 0!==n&&t(r,function(E){n(E),e(r)})},function(){n=!0,E.end()})});t.listen(E),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+E+")")}}),global.WEB_SERVER=WEB_SERVER=CLASS(function(E){"use strict";var o,n=require("http"),t=require("querystring"),e=require("zlib");return E.getEncodingFromContentType=o=function(E){return"application/javascript"===E?"utf-8":"application/json"===E?"utf-8":"text/css"===E?"utf-8":"text/plain"===E?"binary":"text/html"===E?"utf-8":"image/png"===E?"binary":"image/jpeg"===E?"binary":"image/gif"===E?"binary":"image/svg+xml"===E?"utf-8":"application/x-shockwave-flash"===E?"binary":"audio/mpeg"===E?"binary":"binary"},{init:function(E,r,i,S){var a,R,c,u,s,_,C,d;CHECK_IS_DATA(i)!==!0?a=i:(a=i.port,R=i.securedPort,c=i.securedKeyFilePath,u=i.securedCertFilePath,s=i.noParsingNativeReqURIs),C=function(E,n){var r,i,a=E.headers,R=E.url,c=E.method.toUpperCase(),u=a["X-Forwarded-For"],_=a["accept-encoding"],C=[];void 0===u&&(u=E.connection.remoteAddress),void 0===_&&(_=""),-1!=R.indexOf("?")&&(r=R.substring(R.indexOf("?")+1),R=R.substring(0,R.indexOf("?"))),R=R.substring(1),NEXT([function(o){"GET"===c||CHECK_IS_IN({array:s,value:R})===!0?o():(E.on("data",function(E){void 0===r&&(r=""),r+=E}),E.on("end",function(){o()}))},function(){return function(){S(i={headers:a,uri:R,method:c,params:t.parse(r),ip:u,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:E},function(E){var t,r,S,a,R,c,u,s;i.isResponsed!==!0&&(CHECK_IS_DATA(E)!==!0?a=E:(t=E.statusCode,r=E.headers,S=E.contentType,a=E.content,R=E.buffer,c=E.encoding,u=E.version,s=E.isFinal),void 0===t&&(t=200),void 0===r&&(r={}),void 0!==S&&(void 0===c&&(c=o(S)),r["Content-Type"]=S+"; charset="+c),CONFIG.isDevMode!==!0&&(s===!0?r.ETag="FINAL":void 0!==u&&(r.ETag=u)),_.match(/\bgzip\b/)!==TO_DELETE?(r["Content-Encoding"]="gzip",e.gzip(void 0!==R?R:a,function(E,o){n.writeHead(t,r),n.end(o,c)})):(n.writeHead(t,r),n.end(void 0!==R?R:a,c)),i.isResponsed=!0)},function(E){C.push(E)})}}]),CHECK_IS_IN({array:s,value:R})!==!0&&E.on("close",function(){EACH(C,function(E){E()})})},void 0!==a&&(_=n.createServer(C).listen(a)),void 0!==R&&(_=https.createServer({key:fs.readFileSync(c),cert:fs.readFileSync(u)},C).listen(R)),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===R?"":" (SECURED PORT:"+R+")")),r.getNativeHTTPServer=d=function(){return _}}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(E){"use strict";var o,n={};return void 0!==E&&(o=E.split(";"),EACH(o,function(E){var o=E.split("=");n[o[0].trim()]=decodeURIComponent(o[1])})),n}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(E){"use strict";var o=[];return EACH(E,function(E,n){o.push(n+"="+encodeURIComponent(E))}),o}});