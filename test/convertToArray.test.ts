import 'mocha';
import * as assert from 'assert';

import { QuillDeltaToArrayConverter } from './../src/QuillDeltaToArrayConverter';

import { delta1 } from './data/delta1';

describe('QuillDeltaToArrayConverter', function () {
  describe('constructor()', function () {
    it('should instantiate return proper html', function () {
      var qdc = new QuillDeltaToArrayConverter(delta1.ops);
      var json = qdc.convert();
      assert.deepEqual(json, delta1.json);
    });
  });

  describe('convert()', function () {
    var ops2 = [
      { insert: 'this is text' },
      { insert: '\n' },
      { insert: 'this is code' },
      { insert: '\n', attributes: { 'code-block': true } },
      { insert: 'this is code TOO!' },
      { insert: '\n', attributes: { 'code-block': true } },
    ];

    it('should render object', function () {
      var qdc = new QuillDeltaToArrayConverter(ops2);

      var object = qdc.convert();
      var expected = [
        { type: 'text', value: 'this is text', attrubute: {} },
        {
          type: 'block',
          value: {
            type: 'text',
            value: 'this is code\nthis is code TOO!',
            attributes: {},
          },
          attributes: { 'code-block': true },
        },
      ];

      assert.deepEqual(object, expected);
    });

    it('should render mention', function () {
      let ops = [
        {
          insert: 'mention',
          attributes: {
            mentions: true,
            mention: {
              'end-point': 'http://abc.com',
              slug: 'a',
              class: 'abc',
              target: '_blank',
            },
          },
        },
      ];
      var qdc = new QuillDeltaToArrayConverter(ops);
      var object = qdc.convert();

      assert.deepEqual(object, [
        {
          type: 'text',
          value: 'mention',
          attrubute: {
            mention: {
              'end-point': 'http://abc.com',
              class: 'abc',
              slug: 'a',
              target: '_blank',
            },
            mentions: true,
          },
        },
      ]);

      var qdc = new QuillDeltaToArrayConverter([
        {
          insert: 'mention',
          attributes: {
            mentions: true,
            mention: { slug: 'aa' },
          },
        },
      ]);
      var object = qdc.convert();
      assert.deepEqual(object, [
        {
          type: 'text',
          value: 'mention',
          attrubute: {
            mentions: true,
            mention: { slug: 'aa' },
          },
        },
      ]);
    });

    it('should render links with rels', function () {
      var ops = [
        {
          attributes: {
            link: '#',
            rel: 'nofollow noopener',
          },
          insert: 'external link',
        },
        {
          attributes: {
            link: '#',
          },
          insert: 'internal link',
        },
      ];
      var qdc = new QuillDeltaToArrayConverter(ops);
      var object = qdc.convert();

      assert.deepEqual(object, [
        {
          type: 'text',
          value: 'external link',
          attrubute: { link: '#', rel: 'nofollow noopener' },
        },
        { type: 'text', value: 'internal link', attrubute: { link: '#' } },
      ]);
    });

    it('should render image and image links', function () {
      let ops = [
        { insert: { image: 'http://yahoo.com/abc.jpg' } },
        {
          insert: { image: 'http://yahoo.com/def.jpg' },
          attributes: { link: 'http://aha' },
        },
      ];
      let qdc = new QuillDeltaToArrayConverter(ops);
      let object = qdc.convert();

      assert.deepEqual(object, [
        { type: 'image', value: 'http://yahoo.com/abc.jpg', attrubute: {} },
        {
          type: 'image',
          value: 'http://yahoo.com/def.jpg',
          attrubute: { link: 'http://aha' },
        },
      ]);
    });

    it('should open and close list tags', function () {
      var ops4 = [
        { insert: 'mr\n' },
        { insert: 'hello' },
        { insert: '\n', attributes: { list: 'ordered' } },
        { insert: 'there' },
        { insert: '\n', attributes: { list: 'bullet' } },
        { insert: '\n', attributes: { list: 'ordered' } },
      ];
      var qdc = new QuillDeltaToArrayConverter(ops4);
      var object = qdc.convert();

      var expected = [
        { type: 'text', value: 'mr', attrubute: {} },
        {
          type: 'block',
          value: [
            {
              type: 'text',
              value: 'hello',
              attrubute: {},
            },
          ],
          attributes: { list: 'ordered', indent: 0 },
        },
        {
          type: 'block',
          value: [
            {
              type: 'text',
              value: 'there',
              attrubute: {},
            },
          ],
          attributes: { list: 'bullet', indent: 0 },
        },
        {
          type: 'block',
          value: [
            {
              type: 'text',
              value: '\n',
              attrubute: {},
            },
          ],
          attributes: { list: 'ordered', indent: 0 },
        },
      ];
      assert.deepEqual(object, expected);
    });

    it('should render as separate paragraphs', function () {
      var ops4 = [{ insert: 'hello\nhow areyou?\n\nbye' }];
      var qdc = new QuillDeltaToArrayConverter(ops4);
      var object = qdc.convert();

      var expected = [
        {
          attrubute: {},
          type: 'text',
          value: 'hello',
        },
        {
          attrubute: {},
          type: 'text',
          value: '\n',
        },
        {
          attrubute: {},
          type: 'text',
          value: 'how areyou?',
        },
        {
          attrubute: {},
          type: 'text',
          value: '\n',
        },
        {
          attrubute: {},
          type: 'text',
          value: '\n',
        },
        {
          attrubute: {},
          type: 'text',
          value: 'bye',
        },
      ];

      assert.deepEqual(object, expected);
    });

    it('should wrap positional styles in right tag', function () {
      var ops4 = [
        { insert: 'mr' },
        { insert: '\n', attributes: { align: 'center' } },
        { insert: '\n', attributes: { direction: 'rtl' } },
        { insert: '\n', attributes: { indent: 2 } },
      ];
      var qdc = new QuillDeltaToArrayConverter(ops4);
      var object = qdc.convert();

      const expected = [
        {
          type: 'block',
          value: [{ type: 'text', value: 'mr', attrubute: {} }],
          attributes: { align: 'center' },
        },
        {
          type: 'block',
          value: [{ type: 'text', value: '\n', attrubute: {} }],
          attributes: { direction: 'rtl' },
        },
        {
          type: 'block',
          value: [{ type: 'text', value: '\n', attrubute: {} }],
          attributes: { indent: 2 },
        },
      ];

      assert.deepEqual(object, expected);
    });

    it('should render target attr correctly', () => {
      let ops = [
        { attributes: { target: '_self', link: 'http://#' }, insert: 'A' },
        { attributes: { target: '_blank', link: 'http://#' }, insert: 'B' },
        { attributes: { link: 'http://#' }, insert: 'C' },
        { insert: '\n' },
      ];
      let qdc = new QuillDeltaToArrayConverter(ops);
      let object = qdc.convert();

      assert.deepEqual(object, [
        {
          attrubute: {
            link: 'http://#',
            target: '_self',
          },
          type: 'text',
          value: 'A',
        },
        {
          attrubute: {
            link: 'http://#',
            target: '_blank',
          },
          type: 'text',
          value: 'B',
        },
        {
          attrubute: {
            link: 'http://#',
          },
          type: 'text',
          value: 'C',
        },
      ]);
    });
  });

  describe('custom types', () => {
    it(`should return empty string if renderer not defined for
                           custom blot`, () => {
      let ops = [{ insert: { customstuff: 'my val' } }];
      let qdc = new QuillDeltaToArrayConverter(ops);
      assert.deepEqual(qdc.convert(), []);
    });

    it('should render custom insert types with given renderer', () => {
      let ops = [
        { insert: { bolditalic: 'my text' } },
        { insert: { blah: 1 } },
      ];
      let qdc = new QuillDeltaToArrayConverter(ops);
      qdc.renderCustomWith((op) => {
        if (op.insert.type === 'bolditalic') {
          return {
            type: 'text',
            value: op.insert.value,
            attribute: { bold: true, italic: true },
          };
        }
        return undefined;
      });
      let object = qdc.convert();
      var expected = [
        {
          type: 'text',
          value: 'my text',
          attribute: {
            bold: true,
            italic: true,
          },
        },
      ];
      assert.deepEqual(object, expected);
    });
  });
});
