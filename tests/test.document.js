define(['xml/lib/document',
        'chai'],

function(Document, chai) {
  var expect = chai.expect;

  describe("Document", function() {
    
    it('should alias root to tree', function() {
      expect(Document.prototype.root).to.be.equal(Document.prototype.tree);
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
    
  });
  
  return { name: "test.document" }
});
