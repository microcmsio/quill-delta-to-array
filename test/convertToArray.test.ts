import 'mocha';
import * as assert from 'assert';

import { QuillDeltaToArrayConverter } from './../src/QuillDeltaToArrayConverter';

import { delta1 } from './data/delta1';

describe('QuillDeltaToArrayConverter', function () {
  describe('constructor()', function () {
    it('should instantiate return proper html', function () {
      var qdc = new QuillDeltaToArrayConverter(delta1.ops, {
        classPrefix: 'noz',
      });
      var html = qdc.convert();
      assert.equal(html, delta1.html);
    });
  });
});
