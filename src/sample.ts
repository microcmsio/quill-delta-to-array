// import { QuillDeltaToHtmlConverter } from "./QuillDeltaToHtmlConverter";
import { QuillDeltaToArrayConverter } from './QuillDeltaToArrayConverter';

// var deltaOps = [
//   {
//     insert: 'Hello, This is Official Site',
//   },
//   {
//     attributes: {
//       header: 1,
//     },
//     insert: '\n',
//   },
//   {
//     insert: '\nMy Home Page',
//   },
//   {
//     attributes: {
//       header: 2,
//     },
//     insert: '\n',
//   },
//   {
//     insert: '\nDo you know ',
//   },
//   {
//     attributes: {
//       link: 'https://microcms.io/',
//     },
//     insert: 'microCMS',
//   },
//   {
//     insert:
//       '?\nmicroCMS is one of the most famous headless CMS service in Japan.\n',
//   },
// ];
// var deltaOps =  [
//     {insert: "Hello\n"},
//     {insert: "This is colorful", attributes: {color: '#f00'}}
// ];
var deltaOps = [
  { insert: 'link', attributes: { link: 'http://a.com/?x=a&b=()' } },
  { insert: 'This ' },
  { attributes: { font: 'monospace' }, insert: 'is' },
  { insert: ' a ' },
  { attributes: { size: 'large' }, insert: 'test' },
  { insert: ' ' },
  { attributes: { italic: true, bold: true }, insert: 'data' },
  { insert: ' ' },
  { attributes: { underline: true, strike: true }, insert: 'that' },
  { insert: ' is ' },
  { attributes: { color: '#e60000' }, insert: 'will' },
  { insert: ' ' },
  { attributes: { background: '#ffebcc' }, insert: 'test' },
  { insert: ' ' },
  { attributes: { script: 'sub' }, insert: 'the' },
  { insert: ' ' },
  { attributes: { script: 'super' }, insert: 'rendering' },
  { insert: ' of ' },
  { attributes: { link: 'http://yahoo' }, insert: 'inline' },
  { insert: ' ' },
  { insert: { formula: 'x=data' } },
  { insert: ' formats.\n' },
  { insert: 'list' },
  { insert: '\n', attributes: { list: 'bullet' } },
  { insert: 'list' },
  { insert: '\n', attributes: { list: 'checked' } },
  { insert: 'some code', attributes: { code: true, bold: true } },
  { attributes: { italic: true, link: '#top', code: true }, insert: 'Top' },
  { insert: '\n' },
];
// var deltaOps =[
//     {
//       "insert": "Hello World"
//     },
//     {
//       "attributes": {
//         "header": 1
//       },
//       "insert": "\n"
//     },
//     {
//       "insert": "This is sample for delta object.\nDo you know quill?\n"
//     }
//   ];

var cfg = {};

// var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
// var object = "[" + converter.convert() + "]";
// console.dir(object);

var converter2 = new QuillDeltaToArrayConverter(deltaOps, cfg);
var html = converter2.convert();
console.log(html);

// var ops = [{
//     insert: 'hello',
//     attributes: {
//        color: '#f00'
//     }
//  },
//  {
//     "insert": {
//        "customImageBlot": {
//           "height": 150,
//           "width": 150,
//           "url": "https://d35bklnb0uzdnn.cloudfront.net/image/i@Hy81U57G7.png"
//        }
//     },
//     attributes: {
//        renderAsBlock: true
//     }
//  },
//  {
//     insert: 'how r u?'
//  }
// ];

// var converter = new QuillDeltaToHtmlConverter(ops);

// converter.renderCustomWith(() => {
//     // console.log(op);
//     // console.log(ctxop);
//     return 'aa';
// })
// var html = converter.convert();

// console.log(html);
