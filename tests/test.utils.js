define(['xml/lib/utils',
        'chai'],
function(utils, chai) {
  var expect = chai.expect;

  describe("utils", function() {
    
    it('should export parse function', function() {
      expect(utils.parse).to.be.a('function');
    });
    
    it('should export stringify function', function() {
      expect(utils.stringify).to.be.a('function');
    });
    
  });
  
  return { name: "test.xml.utils" }
});
