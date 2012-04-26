define(['xml/main',
        'chai'],

function(xml, chai) {
  var expect = chai.expect;

  describe("xml", function() {
    
    it('should be a function', function() {
      expect(xml).to.be.a('function');
    });
    
  });
  
  return { name: "test.xml" }
});
