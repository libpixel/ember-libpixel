'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-libpixel',

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/jssha/src/sha.js', {
      using: [
        { transformation: 'amd', as: 'jsSHA' }
      ]
    });
  },

  treeForVendor(vendorTree) {
    let jsSHAPath = path.dirname(resolve.sync('jssha/src/sha.js'));
    let jsSHATree = new Funnel(jsSHAPath, {
      files: ['sha.js']
    });

    return new MergeTrees([vendorTree, jsSHATree]);
  }
};
