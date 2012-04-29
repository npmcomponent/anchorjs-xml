/**
 * Module definition.
 */
define(function() {
  
  /**
   * `Element` constructor.
   *
   * This class provides an interface for simplified traversing XML elements.
   *
   * @param {Element} node DOM element
   * @api protected
   */
  function Element(node) {
    this._node = node;
  }
  
  Element.prototype.is = function(ns, name) {
    if (!name) {
      name = ns;
      ns = null;
    }
    
    if (name == this.name() && (ns === null || ns === this.ns())) {
      return true;
    }
    return false;
  }
  
  Element.prototype.ns =
  Element.prototype.namespace = function() {
    return this._node.namespaceURI || this._node.getAttribute('xmlns');
  }
  
  Element.prototype.name = function() {
    return this._node.nodeName;
  }
  
  /* Get the first child with matching `name` and optional `ns` of the element.
   *
   * @return {Element}
   * @api public
   */
  Element.prototype.child = function(ns, name) {
    return this.children(ns, name)[0];
  }
  
  /* Get the children with matching `name` and optional `ns` of the element.
   *
   * @return {Array}
   * @api public
   */
  Element.prototype.children = function(ns, name) {
    if (!name) {
      name = ns;
      ns = null;
    }
    
    var arr = []
      , child = this._node.firstChild;
    while (child) {
      var cns = child.namespaceURI || child.getAttribute('xmlns');
      if (child.nodeName == name && (ns === null || ns === cns)) {
        arr.push(new Element(child));
      }
      child = child.nextSibling;
    }
    return arr;
  }
  
  /* Get the text value of the element.
   *
   * @return {String}
   * @api public
   */
  Element.prototype.t = 
  Element.prototype.text = function() {
    var str = ""
      , child = this._node.firstChild;
    while (child) {
      if (child.nodeType == 3) {
        str += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return str;
  }
  
  /* Get the attribute named `name` of the element.
   *
   * @param {String} name
   * @return {String}
   * @api public
   */
  Element.prototype.attr = function(name) {
    return this._node.getAttribute(name);
  }
  
  return Element;
});
