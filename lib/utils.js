define(function() {
  
  function stringify(node) {
    var s = new XMLSerializer();
    return s.serializeToString(node);
  }
  
  
  var exports = {};
  exports.stringify = stringify;
  
  return exports;
});
