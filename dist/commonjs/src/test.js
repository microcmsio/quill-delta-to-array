"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuillDeltaToObjectConverter_1 = require("./QuillDeltaToObjectConverter");
var delta1_1 = require("../test/data/delta1");
var qdc = new QuillDeltaToObjectConverter_1.QuillDeltaToObjectConverter(delta1_1.delta1.ops);
var html = qdc.convert();
console.log(html);
