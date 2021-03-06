define(['xml/lib/factory'],
function(factory) {

  describe("factory", function() {
    
    it('should be a DOM document', function() {
      expect(factory).to.be.an.instanceOf(Document);
    });
    
  });
  
  return { name: "test.xml.factory" }
});
