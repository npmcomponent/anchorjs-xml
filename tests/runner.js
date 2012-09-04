require.config({
  paths:{
    'xml': '../',
    'mocha': 'vendor/mocha/mocha',
    'chai': 'vendor/chai/chai'
  }
});

require(['require',
         'mocha',
         'chai'],
function(require, _mocha, _chai) {
  mocha.setup('bdd');
  
  require(['test.xml',
           'test.document',
           'test.element',
           'test.factory',
           'test.utils'],
  function() {
    mocha.run();
  });
});
