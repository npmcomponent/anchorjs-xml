define(['./factory',
        './utils'],
function(factory, utils) {
  
  function Document(ns, name, attrs) {
    this._root = build(ns, name, attrs);
    this._el = this._root;
  }
  
  Document.prototype.toString = function() {
    return utils.stringify(this._el);
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
