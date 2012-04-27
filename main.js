define(function() {
  
  var generator;
  
  function xml(name, attrs) {
    if (!generator) { init(); }
    
    var doc = generator.createElement(name);
    return doc;
  }
  
  xml.stringify = function(node) {
    var s = new XMLSerializer();
    return s.serializeToString(node);
  }
  
  
  function init() {
    if (window.ActiveXObject) {
      generator = new ActiveXObject("Microsoft.XMLDOM");
      generator.appendChild(doc.createElement('document'));
    } else {
      generator = document.implementation.createDocument('http://xml.anchorjs.org', 'document', null);
    }
  }
  
  return xml;
});
