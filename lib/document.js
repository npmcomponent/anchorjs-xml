define(['./factory',
        './utils'],
function(factory, utils) {
  
  function Document(name, attrs) {
    this._root = factory.createElement(name);
    this._el = this._root;
  }
  
  Document.prototype.toString = function() {
    return utils.stringify(this._el);
  }
  
  return Document;
});
