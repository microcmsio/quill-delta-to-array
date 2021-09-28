import { QuillDeltaToArrayConverter } from './QuillDeltaToArrayConverter';
import { delta1 } from '../test/data/delta1';

var qdc = new QuillDeltaToArrayConverter(delta1.ops, {
  classPrefix: 'noz',
});
var html = qdc.convert();
console.log(html);
