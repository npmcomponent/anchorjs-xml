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
  
  Element.prototype.child = function(ns, name) {
    return this.children(ns, name)[0];
  }
  
  Element.prototype.children = function(ns, name) {
    if (!name) {
      name = ns;
      ns = null;
    }
    
    var arr = []
      , child = this._node.firstChild;
    while (child) {
      if (child.nodeName == name) {
        arr.push(new Element(child));
      }
      child = child.nextSibling;
    }
    return arr;
  }
  
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
  
  Element.prototype.attr = function(name) {
    return this._node.getAttribute(name);
  }
  
  return Element;
});
