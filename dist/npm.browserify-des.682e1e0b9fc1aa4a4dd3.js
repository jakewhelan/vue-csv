(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{542:function(e,d,s){var c=s(55),t=s(543),i=s(2),n=s(5).Buffer,r={"des-ede3-cbc":t.CBC.instantiate(t.EDE),"des-ede3":t.EDE,"des-ede-cbc":t.CBC.instantiate(t.EDE),"des-ede":t.EDE,"des-cbc":t.CBC.instantiate(t.DES),"des-ecb":t.DES};function o(e){c.call(this);var d,s=e.mode.toLowerCase(),t=r[s];d=e.decrypt?"decrypt":"encrypt";var i=e.key;n.isBuffer(i)||(i=n.from(i)),"des-ede"!==s&&"des-ede-cbc"!==s||(i=n.concat([i,i.slice(0,8)]));var o=e.iv;n.isBuffer(o)||(o=n.from(o)),this._des=t.create({key:i,iv:o,type:d})}r.des=r["des-cbc"],r.des3=r["des-ede3-cbc"],e.exports=o,i(o,c),o.prototype._update=function(e){return n.from(this._des.update(e))},o.prototype._final=function(){return n.from(this._des.final())}},555:function(e,d){d["des-ecb"]={key:8,iv:0},d["des-cbc"]=d.des={key:8,iv:8},d["des-ede3-cbc"]=d.des3={key:24,iv:8},d["des-ede3"]={key:24,iv:0},d["des-ede-cbc"]={key:16,iv:8},d["des-ede"]={key:16,iv:0}}}]);