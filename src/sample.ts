// import { QuillDeltaToHtmlConverter } from "./QuillDeltaToHtmlConverter";
import { QuillDeltaToObjectConverter } from './QuillDeltaToObjectConverter';

var deltaOps = [
  {
    insert: 'Hello World',
  },
  {
    attributes: {
      header: 1,
    },
    insert: '\n',
  },
  {
    insert: 'This is sample for delta object.\nDo you know quill?\n',
  },
];

var converter2 = new QuillDeltaToObjectConverter(deltaOps);
var html = converter2.convert();
console.dir(html, { depth: null });
