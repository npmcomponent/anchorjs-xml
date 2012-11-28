define(['xml/lib/factory',
        'chai'],

function(factory, chai) {
  var expect = chai.expect;

  describe("factory", function() {
    
    it('should be a DOM document', function() {
      expect(factory).to.be.an.instanceOf(Document);
    });
    
  });
  
  return { name: "test.xml.factory" }
});
