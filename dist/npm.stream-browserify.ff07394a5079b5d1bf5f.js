(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{529:function(e,r,n){e.exports=t;var o=n(64).EventEmitter;function t(){o.call(this)}n(2)(t,o),t.Readable=n(171),t.Writable=n(534),t.Duplex=n(535),t.Transform=n(536),t.PassThrough=n(537),t.Stream=t,t.prototype.pipe=function(e,r){var n=this;function t(r){e.writable&&!1===e.write(r)&&n.pause&&n.pause()}function i(){n.readable&&n.resume&&n.resume()}n.on("data",t),e.on("drain",i),e._isStdio||r&&!1===r.end||(n.on("end",a),n.on("close",c));var s=!1;function a(){s||(s=!0,e.end())}function c(){s||(s=!0,"function"==typeof e.destroy&&e.destroy())}function u(e){if(d(),0===o.listenerCount(this,"error"))throw e}function d(){n.removeListener("data",t),e.removeListener("drain",i),n.removeListener("end",a),n.removeListener("close",c),n.removeListener("error",u),e.removeListener("error",u),n.removeListener("end",d),n.removeListener("close",d),e.removeListener("close",d)}return n.on("error",u),e.on("error",u),n.on("end",d),n.on("close",d),e.on("close",d),e.emit("pipe",n),e}}}]);