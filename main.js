define(['./lib/document',
        './lib/utils'],
function(Document, utils) {
  
  function xml(name, attrs) {
    return new Document(name, attrs);
  }
  
  xml.stringify = utils.stringify;
  
  return xml;
});
