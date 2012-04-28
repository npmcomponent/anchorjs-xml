define(['./factory',
        './utils'],
function(factory, utils) {
  
  function Document(ns, name, attrs) {
    this._root = build(ns, name, attrs);
    this._node = this._root;
  }
  
  Document.prototype.root =
  Document.prototype.tree = function() {
    this._node = this._root;
    return this;
  }
  
  Document.prototype.up = function() {
    this._node = this._node.parentNode;
    return this;
  }
  
  Document.prototype.c = function(ns, name, attrs) {
    var child = build(ns, name, attrs);
    this._node.appendChild(child);
    this._node = child;
    return this;
  }
  
  Document.prototype.toString = function() {
    return utils.stringify(this._node);
  }
  
  
  function build(ns, name, attrs) {
    if (!name || typeof name == 'object') {
      attrs = name;
      name = ns;
      ns = null;
    }
    
    var el = ns ? factory.createElementNS(ns, name) : factory.createElement(name);
    for (var name in attrs) {
      el.setAttribute(name, attrs[name]);
    }
    return el;
  }
  
  return Document;
});
