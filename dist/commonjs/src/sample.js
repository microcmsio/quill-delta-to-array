"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuillDeltaToObjectConverter_1 = require("./QuillDeltaToObjectConverter");
var deltaOps = [
    {
        insert: 'Hello World',
    },
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
    {
        insert: 'This is Header',
    },
    {
        attributes: {
            header: 1,
        },
        insert: '\n',
    },
    {
        insert: 'here is section text\n',
    },
];
var converter2 = new QuillDeltaToObjectConverter_1.QuillDeltaToObjectConverter(deltaOps);
var html = converter2.convert();
console.dir(html, { depth: null });
