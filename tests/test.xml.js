define(['xml/main',
        'xml/lib/document',
        'chai'],

function(xml, Document, chai) {
  var expect = chai.expect;

  describe("xml", function() {
    
    it('should be a function', function() {
      expect(xml).to.be.a('function');
    });
    
    it('should have a parse function', function() {
      expect(xml.parse).to.be.a('function');
    });
    
    it('should have a stringify function', function() {
      expect(xml.stringify).to.be.a('function');
    });
    
    describe('create with name', function() {
      var doc = xml('html');
      
      it('should be an instance of Document', function() {
        expect(doc).to.be.an.instanceOf(Document);
      });
      it('should query name and ns', function() {
        expect(doc.ns()).to.be.equal(null);
        expect(doc.name()).to.be.equal('html');
        expect(doc.is('html')).to.be.true;
        expect(doc.is('http://www.w3.org/1999/xhtml', 'html')).to.be.false;
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
    
    describe('create with name and xmlns attribute', function() {
      var doc = xml('message', { xmlns: 'jabber:client' });
      
      it('should query name and ns', function() {
        expect(doc.ns()).to.be.equal('jabber:client');
        expect(doc.name()).to.be.equal('message');
        expect(doc.is('message')).to.be.true;
        expect(doc.is('jabber:client', 'message')).to.be.true;
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<message xmlns="jabber:client"/>');
      });
    });
    
    describe('create with ns and name', function() {
      var doc = xml('http://www.w3.org/1999/xhtml', 'html');
      
      it('should query name and ns', function() {
        expect(doc.ns()).to.be.equal('http://www.w3.org/1999/xhtml');
        expect(doc.name()).to.be.equal('html');
        expect(doc.is('html')).to.be.true;
        expect(doc.is('http://www.w3.org/1999/xhtml', 'html')).to.be.true;
      });
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
    
    describe('create with DOM document', function() {
      var x = xml('doc');
      var el = x._node.ownerDocument;
      var docEl = el.documentElement;
      var doc = xml(el);
      
      it('should set root to element', function() {
        expect(doc._root).to.be.equal(docEl);
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<document xmlns="http://xml.anchorjs.org"/>');
      });
    });
    
    describe('create with DOM element', function() {
      var x = xml('xml');
      var el = x._node;
      var doc = xml(el);
      
      it('should set root to element', function() {
        expect(doc._root).to.be.equal(el);
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xml/>');
      });
    });
    
  });
  
  return { name: "test.xml" }
});
