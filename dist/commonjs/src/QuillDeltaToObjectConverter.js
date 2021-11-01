"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var InsertOpsConverter_1 = require("./InsertOpsConverter");
var Grouper_1 = require("./grouper/Grouper");
var group_types_1 = require("./grouper/group-types");
var ListNester_1 = require("./grouper/ListNester");
var funcs_html_1 = require("./funcs-html");
var obj = __importStar(require("./helpers/object"));
var TableGrouper_1 = require("./grouper/TableGrouper");
var OpToObjectConverter_1 = require("./OpToObjectConverter");
var QuillDeltaToObjectConverter = (function () {
    function QuillDeltaToObjectConverter(deltaOps) {
        this.rawDeltaOps = [];
        this.callbacks = {};
        this.options = obj.assign({
            paragraphTag: 'p',
            encodeHtml: true,
            classPrefix: 'ql',
            inlineStyles: false,
            multiLineBlockquote: true,
            multiLineHeader: true,
            multiLineCodeblock: true,
            multiLineParagraph: true,
            multiLineCustomBlock: true,
            allowBackgroundClasses: false,
            linkTarget: '_blank',
        }, {
            orderedListTag: 'ol',
            bulletListTag: 'ul',
            listItemTag: 'li',
        });
        this.rawDeltaOps = deltaOps;
    }
    QuillDeltaToObjectConverter.prototype.getGroupedOps = function () {
        var deltaOps = InsertOpsConverter_1.InsertOpsConverter.convert(this.rawDeltaOps, this.options);
        var pairedOps = Grouper_1.Grouper.pairOpsWithTheirBlock(deltaOps);
        var groupedSameStyleBlocks = Grouper_1.Grouper.groupConsecutiveSameStyleBlocks(pairedOps, {
            blockquotes: !!this.options.multiLineBlockquote,
            header: !!this.options.multiLineHeader,
            codeBlocks: !!this.options.multiLineCodeblock,
            customBlocks: !!this.options.multiLineCustomBlock,
        });
        var groupedOps = Grouper_1.Grouper.reduceConsecutiveSameStyleBlocksToOne(groupedSameStyleBlocks);
        var tableGrouper = new TableGrouper_1.TableGrouper();
        groupedOps = tableGrouper.group(groupedOps);
        var listNester = new ListNester_1.ListNester();
        return listNester.nest(groupedOps);
    };
    QuillDeltaToObjectConverter.prototype.convert = function () {
        var _this = this;
        var groups = this.getGroupedOps();
        var result = groups
            .map(function (group) {
            if (group instanceof group_types_1.ListGroup) {
                return _this._renderList(group);
            }
            else if (group instanceof group_types_1.BlockGroup) {
                var g = group;
                return _this._renderBlock(g.op, g.ops);
            }
            else if (group instanceof group_types_1.BlotBlock) {
                return _this._renderCustom(group.op, null);
            }
            else {
                return _this._renderInlines(group.ops);
            }
        })
            .filter(function (item) { return item != null; });
        var blockedResult = []
            .concat.apply([], result).reduce(function (resultList, currentValue) {
            var isTextType = currentValue.type === 'text';
            if (!isTextType) {
                return resultList.concat([currentValue]);
            }
            if (resultList.length == 0) {
                return resultList.concat([{ type: 'textBlock', value: [currentValue] }]);
            }
            var beforeElement = resultList.pop();
            var isBeforeElementHasTextBlockType = beforeElement.type === 'textBlock';
            if (isBeforeElementHasTextBlockType) {
                return resultList.concat([
                    __assign({}, beforeElement, { value: beforeElement.value.concat([currentValue]) }),
                ]);
            }
            resultList.push(beforeElement);
            return resultList.concat([{ type: 'textBlock', value: [currentValue] }]);
        }, []);
        return { contents: blockedResult };
    };
    QuillDeltaToObjectConverter.prototype._renderList = function (list) {
        var _this = this;
        var listItems = list.items.map(function (li) { return _this._renderListItem(li); });
        var flattenListItems = [].concat.apply([], listItems);
        return {
            type: 'block',
            value: flattenListItems,
            attributes: list.items[0].item.op.attributes,
        };
    };
    QuillDeltaToObjectConverter.prototype._renderListItem = function (li) {
        li.item.op.attributes.indent = 0;
        return this._renderInlines(li.item.ops);
    };
    QuillDeltaToObjectConverter.prototype._renderBlock = function (bop, ops) {
        var _this = this;
        if (bop.isCodeBlock()) {
            var body = funcs_html_1.encodeHtml(ops
                .map(function (iop) {
                return iop.isCustomEmbed()
                    ? _this._renderCustom(iop, bop)
                    : iop.insert.value;
            })
                .join(''));
            var value = { type: 'text', value: body, attributes: {} };
            return { type: 'block', value: value, attributes: bop.attributes };
        }
        var inlines = ops.map(function (op) { return _this._renderInline(op, bop); });
        return {
            type: 'block',
            value: inlines,
            attributes: bop.attributes,
        };
    };
    QuillDeltaToObjectConverter.prototype._renderInlines = function (ops) {
        var _this = this;
        var opsLen = ops.length - 1;
        var objects = ops
            .map(function (op, i) {
            if (i > 0 && i === opsLen && op.isJustNewline()) {
                return undefined;
            }
            return _this._renderInline(op, null);
        })
            .filter(function (item) { return item != null; });
        var flattenObjects = [].concat.apply([], objects);
        return flattenObjects;
    };
    QuillDeltaToObjectConverter.prototype._renderInline = function (op, contextOp) {
        if (op.isCustomEmbed()) {
            return this._renderCustom(op, contextOp);
        }
        var converter = new OpToObjectConverter_1.OpToObjectConverter(op);
        return converter.getObject();
    };
    QuillDeltaToObjectConverter.prototype._renderCustom = function (op, contextOp) {
        var renderCb = this.callbacks['renderCustomOp_cb'];
        if (typeof renderCb === 'function') {
            return renderCb.apply(null, [op, contextOp]);
        }
        return undefined;
    };
    QuillDeltaToObjectConverter.prototype.renderCustomWith = function (cb) {
        this.callbacks['renderCustomOp_cb'] = cb;
    };
    return QuillDeltaToObjectConverter;
}());
exports.QuillDeltaToObjectConverter = QuillDeltaToObjectConverter;
