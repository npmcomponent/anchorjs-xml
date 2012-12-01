/**
 * Module definition.
 */
define(['./element',
        './factory',
        './utils'],
function(Element, factory, utils) {
  
  /**
   * `Document` constructor.
   *
   * This class provides an interface for simplified building and traversing of
   * XML documents.  The philosophy follows that of jQuery, in that functions
   * are chainable, but geared towards XML rather than the HTML DOM.
   *
   * Example:
   *
   *     var iq = xml('iq', { type: 'result', from: 'plays.shakespeare.lit', to: 'romeo@montague.net/orchard' })
   *       .c('query', { xmlns: 'http://jabber.org/protocol/disco#info' })
   *       .c('feature', { 'var': 'http://jabber.org/protocol/disco#info' })
   *       .root().toString();
   *
   *     // =>
   *
   *     <iq type="result" from="plays.shakespeare.lit" to="romeo@montague.net/orchard">
   *       <query xmlns="http://jabber.org/protocol/disco#info">
   *         <feature var="http://jabber.org/protocol/disco#info"/>
   *       </query>
   *     </iq>
   *
   * @param {String} name
   * @param {String} ns
   * @param {Object} attrs
   * @api protected
   */
  function Document(name, ns, attrs) {
    if (typeof name == 'string') {
      this._root = build(name, ns, attrs);
    } else if (name instanceof window.Document) {
      this._root = name.documentElement;
    } else if (name instanceof window.Element) {
      this._root = name;
    } else {
      throw new Error('Failed to parse XML')
    }
    this._node = this._root;
  }
  
  /* Sets the current node to the root node.
   *
   * This function sets the current node to the root node.  This is useful when
   * a deeply nested structure has been constructed, and you want to quickly
   * return to the root (for example, to serialize the document).
   *
   * Example:
   *
   *     xml('root')
   *       .c('child')
   *         .c('grandchild')
   *       .root();
   *
   * @return {Document} for chaining
   * @api public
   */
  Document.prototype.tree =
  Document.prototype.root = function() {
    this._node = this._root;
    return this;
  }
  
  /* Sets the current node to the parent node.
   *
   * This function sets the current node to the parent node.  This is useful
   * when adding a series of child elements that are siblings.  In this case,
   * `up()` is used to restore the current node to the same nesting level.
   *
   * Example:
   *
   *     xml('root')
   *       .c('child1').up()
   *       .c('child2');
   *
   * @return {Document} for chaining
   * @api public
   */
  Document.prototype.up = function() {
    this._node = this._node.parentNode;
    return this;
  }
  
  /* Check if the current element has `name` and optional `ns`.
   *
   * Example:
   *
   *     el.is('p');
   *
   *     el.is('div', 'http://www.w3.org/1999/xhtml');
   *
   * @param {String} name
   * @param {String} ns
   * @return {Boolean}
   * @api public
   */
  Document.prototype.is = function(name, ns) {
    if (name == this.name() && (!ns || ns === this.ns())) {
      return true;
    }
    return false;
  }
  
  /* Get the namespace of the current node.
   *
   * @return {String}
   * @api public
   */
  Document.prototype.ns =
  Document.prototype.namespace = function() {
    return this._node.namespaceURI || this._node.getAttribute('xmlns');
  }
  
  /* Get the name of the current node.
   *
   * @return {String}
   * @api public
   */
  Document.prototype.name = function() {
    return this._node.localName;
  }
  
  /* Get the first child with matching `name` and optional `ns` of the current
   * node.
   *
   * Example:
   *
   *     el.child('p');
   *
   *     el.child('div', 'http://www.w3.org/1999/xhtml');
   *
   * @param {String} name
   * @param {String} ns
   * @return {Element}
   * @api public
   */
  Document.prototype.child = function(name, ns) {
    var el = new Element(this._node);
    return el.child(name, ns);
  }
  
  /* Get the children with matching `name` and optional `ns` of the current
   * node.
   *
   * Example:
   *
   *     el.children('p');
   *
   *     el.children('div', 'http://www.w3.org/1999/xhtml');
   *
   * @param {String} name
   * @param {String} ns
   * @return {Array} XML element wrappers
   * @api public
   */
  Document.prototype.children = function(name, ns) {
    var el = new Element(this._node);
    return el.children(name, ns);
  }
  
  /* Appends a child the current node and makes it the new current node.
   *
   * Example:
   *
   *     xml('root').c('child');
   *
   * @param {String} name
   * @param {String} ns
   * @param {Object} attrs
   * @return {Document} for chaining
   * @api public
   */
  Document.prototype.c =
  Document.prototype.append = function(name, ns, attrs) {
    var child;
    if (name._node) {
      child = name._node;
    } else {
      child = build(name, ns, attrs);
    }
    this._node.appendChild(child);
    this._node = child;
    return this;
  }
  
  /* Get or set the text value of the current node.
   *
   * This function does not move the current node, as text nodes cannot have
   * child nodes.
   *
   * Example:
   *
   *     xml('root').c('child').t('hello');
   *
   *     el.t();  // => 'hello'
   *
   * @param {String} text
   * @return {String|Document} for chaining
   * @api public
   */
  Document.prototype.t =
  Document.prototype.text = function(text) {
    if (!text) { 
      var el = new Element(this._node);
      return el.text();
    }
    var child = factory.createTextNode(text);
    this._node.appendChild(child);
    return this;
  }
  
  /* Gets or sets attributes of the current node.
   *
   * This function does not move the current node.
   *
   * Example:
   *
   *     xml('root').c('child').attr('foo', 'bar');
   *
   *     xml('root').c('child').attr({ foo: bar });
   *
   *     el.attr('foo');  // => 'bar'
   *
   * @param {String} name
   * @param {String} value
   * @return {String|Document} for chaining
   * @api public
   */
  Document.prototype.attrs =
  Document.prototype.attr = function(name, value) {
    if (value || typeof name == 'object') {
      var attrs = {};
      if (value) attrs[name] = value;
      else attrs = name;
      
      for (var name in attrs) {
        this._node.setAttribute(name, attrs[name]);
      }
      return this;
    }
    return this._node.getAttribute(name);
  }
  
  /**
   * Returns the XML serialization of this current node.
   *
   * Note: To serialize a whole document, call `root()` prior to invoking
   * `toString()`.
   *
   * @return {String}
   * @api public
   */
  Document.prototype.toString = function() {
    return utils.stringify(this._node);
  }
  
  
  /**
   * Builds an XML element with `name`, `attrs`, and optional `ns`.
   *
   * @param {String} name
   * @param {String} ns
   * @param {Object} attrs
   * @return {Element} DOM element
   * @api private
   */
  function build(name, ns, attrs) {
    if (typeof ns == 'object') {
      attrs = ns;
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
