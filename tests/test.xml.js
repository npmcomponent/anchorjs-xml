define(['xml/main',
        'chai'],

function(xml, chai) {
  var expect = chai.expect;

  describe("xml", function() {
    
    it('should be a function', function() {
      expect(xml).to.be.a('function');
    });
    
    it('should have a stringify function', function() {
      expect(xml.stringify).to.be.a('function');
    });
    
    describe('create with name', function() {
      var doc = xml('html');
      
      it('should be an instance of Element', function() {
        expect(doc).to.be.an.instanceOf(Node);
        expect(doc).to.be.an.instanceOf(Element);
      });
      it('should serialize to string', function() {
        var str = xml.stringify(doc);
        expect(str).to.be.equal('<html/>');
      });
    });
    
  });
  
  return { name: "test.xml" }
});
