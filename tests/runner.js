require.config({
  paths:{
    'anchor': '../../anchor',
    'xml': '../',
    'mocha': 'vendor/mocha/1.0.1/mocha',
    'chai': 'vendor/chai/0.5.2/chai'
  }
});

require(['require',
         'mocha',
         'chai'],

function(require, _mocha, _chai) {
  mocha.setup('bdd');
  
  require(['test.xml',
           'test.factory',
           'test.utils'],
  function() {
    mocha.run();
  });
});
