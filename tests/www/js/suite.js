define(['require',
        'mocha',
        'chai',
        'mocha-results'],
function(require, mocha, chai, results) {
  mocha.setup('bdd');
  expect = chai.expect
  
  require(['test/xml',
           'test/xml.document',
           'test/xml.element',
           'test/xml.factory',
           'test/xml.utils'],
  function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { results(mocha.run()); }
  });
});
