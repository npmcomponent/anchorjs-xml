define({
  
  /**
   * Parses XML string and returns a DOM document.
   *
   * @param {String} str
   * @return {Document} DOM document
   * @api public
   */
  parse: function(str) {
    return null;

    // TODO: Support for this functionality is inconsistent across browsers.
    //       A cross-browser solutions needs to be implemented.
    /*
    var p = new DOMParser();
    return p.parseFromString(str, "application/xml");
    */
  },
  
  /**
   * Returns the XML serialization of `node`.
   *
   * @param {Node} node
   * @return {String}
   * @api public
   */
  stringify: function(node) {
    var s = new XMLSerializer();
    return s.serializeToString(node);
  }
  
});
