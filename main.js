define(['./lib/document',
        './lib/utils'],
function(Document, utils) {
  
  function xml(ns, name, attrs) {
    return new Document(ns, name, attrs);
  }
  
  xml.stringify = utils.stringify;
  
  return xml;
});
