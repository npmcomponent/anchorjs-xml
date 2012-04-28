define(['xml/lib/element',
        'chai'],

function(Element, chai) {
  var expect = chai.expect;

  describe("Element", function() {
    
    it('should alias t to text', function() {
      expect(Element.prototype.t).to.be.equal(Element.prototype.text);
    });
    
  });
  
  return { name: "test.element" }
});
