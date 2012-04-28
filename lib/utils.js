define(function() {
  
  /**
   * Parses XML string and returns a DOM document.
   *
   * @param {String} str
   * @return {Document} DOM Document
   * @api public
   */
  function parse(str) {
    return null;

    // TODO: Support for this functionality is inconsistent across browsers.
    //       A cross-browser solutions needs to be implemented.
    /*
    var p = new DOMParser();
    return p.parseFromString(str, "application/xml");
    */
  }
  
  /**
   * Returns the XML serialization of `node`.
   *
   * @param {Node} node
   * @return {String}
   * @api public
   */
  function stringify(node) {
    var s = new XMLSerializer();
    return s.serializeToString(node);
  }
  
  
  var exports = {};
  exports.parse = parse;
  exports.stringify = stringify;
  
  return exports;
});
