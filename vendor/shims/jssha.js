(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jssha'],
      __esModule: true,
    };
  }

  define('jssha', [], vendorModule);
})();
