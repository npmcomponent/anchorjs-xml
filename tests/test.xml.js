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
    
    describe('create with name and attributes', function() {
      var doc = xml('message', { to: 'romeo', from: 'juliet' });
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<message to="romeo" from="juliet"/>');
      });
    });
    
    describe('create with ns and name', function() {
      var doc = xml('http://www.w3.org/1999/xhtml', 'html');
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<html xmlns="http://www.w3.org/1999/xhtml"></html>');
      });
    });
    
    describe('create with ns, name, and attributes', function() {
      var doc = xml('http://www.w3.org/1999/xhtml', 'div', { id: 'foo' });
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<div xmlns="http://www.w3.org/1999/xhtml" id="foo"></div>');
      });
    });
    
    describe('create with ns and qalified name', function() {
      var doc = xml('http://www.w3.org/1999/xhtml', 'xhtml:html');
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xhtml:html xmlns:xhtml="http://www.w3.org/1999/xhtml"></xhtml:html>');
      });
    });
    
    describe('create with ns, qualified name, and attributes', function() {
      var doc = xml('http://www.w3.org/1999/xhtml', 'xhtml:div', { id: 'foo' });
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xhtml:div xmlns:xhtml="http://www.w3.org/1999/xhtml" id="foo"></xhtml:div>');
      });
    });
    
  });
  
  return { name: "test.xml" }
});
