/**
 * factory
 *
 * This module provides singleton DOM document that is used to create XML
 * elements.  The document returned by this module is distinct from the
 * document that hosts the HTML page.
 */
define(function() {
  
  var factory;
  
  if (window.ActiveXObject) {
    factory = new ActiveXObject("Microsoft.XMLDOM");
    factory.appendChild(doc.createElement('document'));
  } else {
    factory = document.implementation.createDocument('http://anchorjs.org/__xml__/', 'document', null);
  }
  
  return factory;
});
