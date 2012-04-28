define(['xml/lib/document',
        'xml/lib/element',
        'chai'],

function(Document, Element, chai) {
  var expect = chai.expect;

  describe("Document", function() {
    
    it('should alias root to tree', function() {
      expect(Document.prototype.root).to.be.equal(Document.prototype.tree);
    });
    it('should alias c to append', function() {
      expect(Document.prototype.c).to.be.equal(Document.prototype.append);
    });
    it('should alias t to text', function() {
      expect(Document.prototype.t).to.be.equal(Document.prototype.text);
    });
    it('should alias attr to attrs', function() {
      expect(Document.prototype.attr).to.be.equal(Document.prototype.attrs);
    });
    
    describe('root', function() {
      var doc = new Document('root')
      var rv = doc.c('child').c('grandchild').root();
    
      it('should return document', function() {
        expect(rv).to.be.equal(doc);
      });
      it('should set current node to root', function() {
        expect(doc._root).to.be.equal(doc._node);
      });
    });
    
    describe('up', function() {
      var doc = new Document('root')
      var rv = doc.c('child').c('grandchild').up();
    
      it('should return document', function() {
        expect(rv).to.be.equal(doc);
      });
      it('should set current node to parent', function() {
        expect(doc._node.nodeName).to.be.equal('child');
      });
    });
    
    describe('children', function() {
      
      describe('without namespaces', function() {
        var doc = new Document('root')
          .c('child1').text('foo').up()
          .c('child1').text('bar').up()
          .c('child2').text('baz').up()
          .root();
        var child = doc.child('child1');
        var children = doc.children('child1');
    
        it('child should be correct', function() {
          expect(child).to.be.an.instanceOf(Element);
          expect(child._node.nodeName).to.be.equal('child1');
          expect(child.text()).to.be.equal('foo');
        });
    
        it('children should return an array', function() {
          expect(children).to.be.an.instanceOf(Array);
        });
        it('children should return two children', function() {
          expect(children).to.have.length(2);
        });
        it('first child should be correct', function() {
          expect(children[0]).to.be.an.instanceOf(Element);
          expect(children[0]._node.nodeName).to.be.equal('child1');
          expect(children[0].text()).to.be.equal('foo');
        });
        it('second child should be correct', function() {
          expect(children[1]).to.be.an.instanceOf(Element);
          expect(children[1]._node.nodeName).to.be.equal('child1');
          expect(children[1].text()).to.be.equal('bar');
        });
      });
    });
    
    describe('c', function() {
      var doc = new Document('root')
      var rv = doc.c('child');
    
      it('should return document', function() {
        expect(rv).to.be.equal(doc);
      });
      it('should set current node to child', function() {
        expect(doc._node.nodeName).to.be.equal('child');
      });
    });
    
    describe('t', function() {
      var doc = new Document('root')
      var rv = doc.c('child').t('hello');
    
      it('should return document', function() {
        expect(rv).to.be.equal(doc);
      });
      it('should leave current node at child', function() {
        expect(doc._node.nodeName).to.be.equal('child');
      });
      it('should get text', function() {
        expect(rv.t()).to.be.equal('hello');
      });
      it('should serialize with text', function() {
        expect(doc.toString()).to.be.equal('<child>hello</child>');
      });
    });
    
    describe('attr', function() {
      
      describe('set with name and value', function() {
        var doc = new Document('root')
        var rv = doc.c('child').attr('foo', 'bar');
    
        it('should return document', function() {
          expect(rv).to.be.equal(doc);
        });
        it('should leave current node at child', function() {
          expect(doc._node.nodeName).to.be.equal('child');
        });
        it('should get attribute', function() {
          expect(doc.attr('foo')).to.be.equal('bar');
        });
        it('should serialize with attributes', function() {
          expect(doc.toString()).to.be.equal('<child foo="bar"/>');
        });
      });
      
      describe('set with object', function() {
        var doc = new Document('root')
        var rv = doc.c('child').attr({ foo1: 'bar1', foo2: 'bar2' });
    
        it('should return document', function() {
          expect(rv).to.be.equal(doc);
        });
        it('should leave current node at child', function() {
          expect(doc._node.nodeName).to.be.equal('child');
        });
        it('should get attribute', function() {
          expect(doc.attr('foo1')).to.be.equal('bar1');
          expect(doc.attr('foo2')).to.be.equal('bar2');
        });
        it('should serialize with attributes', function() {
          expect(doc.toString()).to.be.equal('<child foo1="bar1" foo2="bar2"/>');
        });
      });
      
    });
    
    describe('create two children and serialize', function() {
      var doc = new Document('root')
      
      it('should serialize the last child', function() {
        expect(doc.c('x').c('y').toString()).to.be.equal('<y/>');
      });
    });
    
    describe('create two children, root and serialize', function() {
      var doc = new Document('root')
      
      it('should serialize the last child', function() {
        expect(doc.c('x').c('y').root().toString()).to.be.equal('<root><x><y/></x></root>');
      });
    });
    
    describe('create IQ with xmlns as attribute', function() {
      var iq = new Document('iq', { type: 'result', from: 'plays.shakespeare.lit', to: 'romeo@montague.net/orchard' })
        .c('query', { xmlns: 'http://jabber.org/protocol/disco#info' })
        .c('feature', { 'var': 'http://jabber.org/protocol/disco#info' })
        .root();
      
      it('should serialize the last child', function() {
        expect(iq.toString()).to.be.equal('<iq type="result" from="plays.shakespeare.lit" to="romeo@montague.net/orchard"><query xmlns="http://jabber.org/protocol/disco#info"><feature var="http://jabber.org/protocol/disco#info"/></query></iq>');
      });
    });
    
  });
  
  return { name: "test.document" }
});
