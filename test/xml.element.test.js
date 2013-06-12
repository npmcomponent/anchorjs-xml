define(['xml/lib/element'],
function(Element) {

  describe("Element", function() {
    
    it('should alias ns to namespace', function() {
      expect(Element.prototype.ns).to.be.equal(Element.prototype.namespace);
    });
    
    it('should alias t to text', function() {
      expect(Element.prototype.t).to.be.equal(Element.prototype.text);
    });
    
  });
  
  return { name: "test.xml.element" }
});
