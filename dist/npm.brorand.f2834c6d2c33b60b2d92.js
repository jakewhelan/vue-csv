(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{177:function(t,e,r){var n;function o(t){this.rand=t}if(t.exports=function(t){return n||(n=new o(null)),n.generate(t)},t.exports.Rand=o,o.prototype.generate=function(t){return this._rand(t)},o.prototype._rand=function(t){if(this.rand.getBytes)return this.rand.getBytes(t);for(var e=new Uint8Array(t),r=0;r<e.length;r++)e[r]=this.rand.getByte();return e},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?o.prototype._rand=function(t){var e=new Uint8Array(t);return self.crypto.getRandomValues(e),e}:self.msCrypto&&self.msCrypto.getRandomValues?o.prototype._rand=function(t){var e=new Uint8Array(t);return self.msCrypto.getRandomValues(e),e}:"object"==typeof window&&(o.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var a=r(560);if("function"!=typeof a.randomBytes)throw new Error("Not supported");o.prototype._rand=function(t){return a.randomBytes(t)}}catch(t){}}}]);