define(function() {
  
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
  exports.stringify = stringify;
  
  return exports;
});
