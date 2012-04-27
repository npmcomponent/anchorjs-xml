define(['xml/main',
        'xml/lib/document',
        'chai'],

function(xml, Document, chai) {
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
      
      it('should be an instance of Document', function() {
        expect(doc).to.be.an.instanceOf(Document);
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<html/>');
      });
    });
    
  });
  
  return { name: "test.xml" }
});
