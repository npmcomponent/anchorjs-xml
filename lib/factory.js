define(function() {
  
  var factory;
  if (!factory) {
    if (window.ActiveXObject) {
      factory = new ActiveXObject("Microsoft.XMLDOM");
      factory.appendChild(doc.createElement('document'));
    } else {
      factory = document.implementation.createDocument('http://xml.anchorjs.org', 'document', null);
    }
  }
  
  return factory;
});
