OVERRIDE(EXPORT_IMG_DATA,function(){"use strict";global.EXPORT_IMG_DATA=METHOD(function(){var t,a={};return exportingCallbackMap={},{run:function(o,n){var o,e=o.getSrc(),i=a[e],l=exportingCallbackMap[e];void 0===t&&(t=DIV({style:{position:"absolute",left:-999999,top:-999999}}).appendTo(BODY)),void 0!==i?n(i):void 0!==l?l.push(n):(l=exportingCallbackMap[e]=[n],EVENT_ONCE({node:IMG({src:e}),name:"load"},function(o,n){var i,g,s=n.getWidth(),r=n.getHeight(),c=CANVAS({width:s,height:r}).appendTo(t);i=c.getContext(),i.drawImg({img:n}),DELAY(.5,function(){BROWSER_CONFIG.isUsingFlashCanvasPro!==!0?console.log("[UPPERCASE.JS-EXPORT_IMG_DATA] ERROR: You can use this method if you use FlashCanvas Pro."):(g=i.getImgData(),a[e]=g,EACH(l,function(t){t(g)}),delete exportingCallbackMap[e])})}))}}})});