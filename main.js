define(['exports', 'module',
        './lib/document',
        './lib/utils'],
function(exports, module, Document, utils) {
  
  /**
   * Returns an XML document with usable building and traversing functions.
   *
   * Examples:
   *
   *     xml('body');
   *
   *     xml('message', { to: 'romeo', from: 'juliet' });
   *
   *     xml('http://www.w3.org/1999/xhtml', 'div', { id: 'foo' });
   *
   * @param {String} ns
   * @param {String} name
   * @param {Object} attrs
   * @return {Document} XML document wrapper
   * @api public
   */
  function xml(ns, name, attrs) {
    return new Document(ns, name, attrs);
  }
  
  
  /**
   * Expose document factory.
   */
  exports = module.exports = xml;
  
  /**
   * Expose utilities.
   */
  exports.parse = utils.parse;
  exports.stringify = utils.stringify;
});
