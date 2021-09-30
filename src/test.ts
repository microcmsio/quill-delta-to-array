import { QuillDeltaToObjectConverter } from './QuillDeltaToObjectConverter';
import { delta1 } from '../test/data/delta1';

var qdc = new QuillDeltaToObjectConverter(delta1.ops);
var html = qdc.convert();
console.log(html);
