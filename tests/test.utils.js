define(['xml/lib/utils',
        'chai'],

function(utils, chai) {
  var expect = chai.expect;

  describe("utils", function() {
    
    it('should have a parse function', function() {
      expect(utils.parse).to.be.a('function');
    });
    
    it('should have a stringify function', function() {
      expect(utils.stringify).to.be.a('function');
    });
    
  });
  
  return { name: "test.utils" }
});
