define(['xml/main',
        'xml/lib/document',
        'chai'],

function(xml, Document, chai) {
  var expect = chai.expect;

  describe("xml", function() {
    
    it('should export function', function() {
      expect(xml).to.be.a('function');
    });
    
    it('should export parse function', function() {
      expect(xml.parse).to.be.a('function');
    });
    
    it('should export stringify function', function() {
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
        expect(doc.is('html', 'http://www.w3.org/1999/xhtml')).to.be.false;
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
        expect(doc.is('message', 'jabber:client')).to.be.true;
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<message xmlns="jabber:client"/>');
      });
    });
    
    describe('create with name and ns', function() {
      var doc = xml('html', 'http://www.w3.org/1999/xhtml');
      
      it('should query name and ns', function() {
        expect(doc.ns()).to.be.equal('http://www.w3.org/1999/xhtml');
        expect(doc.name()).to.be.equal('html');
        expect(doc.is('html')).to.be.true;
        expect(doc.is('html', 'http://www.w3.org/1999/xhtml')).to.be.true;
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<html xmlns="http://www.w3.org/1999/xhtml"></html>');
      });
    });
    
    describe('create with name, ns, and attributes', function() {
      var doc = xml('div', 'http://www.w3.org/1999/xhtml', { id: 'foo' });
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<div xmlns="http://www.w3.org/1999/xhtml" id="foo"></div>');
      });
    });
    
    describe('create with qalified name and ns', function() {
      var doc = xml('xhtml:html', 'http://www.w3.org/1999/xhtml');
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xhtml:html xmlns:xhtml="http://www.w3.org/1999/xhtml"></xhtml:html>');
      });
    });
    
    describe('create with qualified name, ns, and attributes', function() {
      var doc = xml('xhtml:div', 'http://www.w3.org/1999/xhtml', { id: 'foo' });
      
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xhtml:div xmlns:xhtml="http://www.w3.org/1999/xhtml" id="foo"></xhtml:div>');
      });
    });
    
    describe('create with DOM document', function() {
      var x = xml('xml');
      var d = x._node.ownerDocument;
      var doc = xml(d);
      
      it('should set root to document element', function() {
        expect(doc._root).to.be.equal(d.documentElement);
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<document xmlns="http://anchorjs.org/__xml__/"/>');
      });
    });
    
    describe('create with DOM element', function() {
      var x = xml('xml');
      var e = x._node;
      var doc = xml(e);
      
      it('should set root to element', function() {
        expect(doc._root).to.be.equal(e);
      });
      it('should serialize to string', function() {
        expect(doc.toString()).to.be.equal('<xml/>');
      });
    });
    
  });
  
  return { name: "test.xml" }
});
