# Quill Delta to Object Converter #
Converts [Quill's](https://quilljs.com) [Delta](https://quilljs.com/docs/delta/) format to Object (insert ops only) with properly nested lists.

This library is inspired by [quill-delta-to-html](https://github.com/nozer/quill-delta-to-html).

## Quickstart ## 

Installation
```
npm install quill-delta-to-object
```

Usage
```javascript
var QuillDeltaToObjectConverter = require('quill-delta-to-object').QuillDeltaToObjectConverter;

// TypeScript / ES6:
// import { QuillDeltaToObjectConverter } from 'quill-delta-to-object'; 

var deltaOps =  [
    {insert: "Hello\n"},
    {insert: "This is colorful", attributes: {color: '#f00'}}
];

var converter = new QuillDeltaToObjectConverter(deltaOps);

var object = converter.convert(); 
```

## Supporting Formats ##

*Not* Supported:

* Image
* Video
* Table
* Nested List

## Rendering Custom Blot Formats ##

You need to tell system how to render your custom blot by registering a renderer callback function to `renderCustomWith` method before calling the `convert()` method. 

Example:
```javascript 
let ops = [
    { insert: { bolditalic: 'my text' } },
];

let converter = new QuillDeltaToObjectConverter(ops);

// customOp is your custom blot op
// contextOp is the block op that wraps this op, if any. 
// If, for example, your custom blot is located inside a list item,
// then contextOp would provide that op. 
converter.renderCustomWith(function(customOp, contextOp){
    if (op.insert.type === 'bolditalic') {
        return {
            type: 'text',
            value: op.insert.value,
            attributes: { bold: true, italic: true },
        };
    }
    return undefined;
});

object = converter.convert();
```
`customOp object` will have the following format: 

```javascript
{
    insert: {
        type: string //whatever you specified as key for insert, in above example: 'bolditalic'
        value: any // value for the custom blot  
    }, 
    attributes: {
        // ... any attributes custom blot may have
    }
}
```

