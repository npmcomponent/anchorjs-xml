/**
 * Module definition.
 */
define(function() {
  
  /**
   * `Element` constructor.
   *
   * This class provides an interface for simplified traversing of XML elements.
   *
   * @param {Element} node DOM element
   * @api protected
   */
  function Element(node) {
    this._node = node;
  }
  
  /* Check if the element has `name` and optional `ns`.
   *
   * @param {String} name
   * @param {String} ns
   * @return {Boolean}
   * @api public
   */
  Element.prototype.is = function(name, ns) {
    if (name == this.name() && (!ns || ns === this.ns())) {
      return true;
    }
    return false;
  }
  
  /* Get the namespace of the element.
   *
   * @return {String}
   * @api public
   */
  Element.prototype.ns =
  Element.prototype.namespace = function() {
    return this._node.namespaceURI || this._node.getAttribute('xmlns');
  }
  
  /* Get the name of the element.
   *
   * @return {String}
   * @api public
   */
  Element.prototype.name = function() {
    return this._node.localName;
  }
  
  /* Get the first child with matching `name` and optional `ns` of the element.
   *
   * @param {String} name
   * @param {String} ns
   * @return {Element}
   * @api public
   */
  Element.prototype.child =
  Element.prototype.getChild = function(name, ns) {
    return this.children(name, ns)[0];
  }
  
  /* Get the children with matching `name` and optional `ns` of the element.
   *
   * @param {String} name
   * @param {String} ns
   * @return {Array}
   * @api public
   */
  Element.prototype.children = function(name, ns) {
    var arr = []
      , child = this._node.firstChild;
    while (child) {
      var childNS = child.namespaceURI || (child.getAttribute && child.getAttribute('xmlns'));
      if ((!name || name === child.localName) && (!ns || ns === childNS)) {
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
  Element.prototype.text =
  Element.prototype.getText = function() {
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
