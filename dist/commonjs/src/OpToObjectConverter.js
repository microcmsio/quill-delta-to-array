"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OpToObjectConverter = (function () {
    function OpToObjectConverter(op) {
        this.op = op;
    }
    OpToObjectConverter.prototype.getObject = function () {
        var insert = this.op.insert;
        var object = {
            type: insert.type,
            value: insert.value,
            attributes: this.op.attributes,
        };
        return object;
    };
    return OpToObjectConverter;
}());
exports.OpToObjectConverter = OpToObjectConverter;
