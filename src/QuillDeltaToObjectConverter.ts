import { InsertOpsConverter } from './InsertOpsConverter';
import { IOpToHtmlConverterOptions } from './OpToHtmlConverter';
import { DeltaInsertOp } from './DeltaInsertOp';
import { Grouper } from './grouper/Grouper';
import {
  InlineGroup,
  BlockGroup,
  ListGroup,
  ListItem,
  TDataGroup,
  BlotBlock,
} from './grouper/group-types';
import { ListNester } from './grouper/ListNester';
import { encodeHtml } from './funcs-html';
import * as obj from './helpers/object';
import { IOpAttributeSanitizerOptions } from './OpAttributeSanitizer';
import { TableGrouper } from './grouper/TableGrouper';
import { OpToObjectConverter } from './OpToObjectConverter';

interface IQuillDeltaToHtmlConverterOptions
  extends IOpAttributeSanitizerOptions,
    IOpToHtmlConverterOptions {
  orderedListTag?: string;
  bulletListTag?: string;

  multiLineBlockquote?: boolean;
  multiLineHeader?: boolean;
  multiLineCodeblock?: boolean;
  multiLineParagraph?: boolean;
  multiLineCustomBlock?: boolean;
}

class QuillDeltaToObjectConverter {
  private options: IQuillDeltaToHtmlConverterOptions;
  private rawDeltaOps: any[] = [];

  // render callbacks
  private callbacks: any = {};

  constructor(deltaOps: any[]) {
    this.options = obj.assign(
      {
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
      },
      {
        orderedListTag: 'ol',
        bulletListTag: 'ul',
        listItemTag: 'li',
      }
    );

    this.rawDeltaOps = deltaOps;
  }

  getGroupedOps(): TDataGroup[] {
    var deltaOps = InsertOpsConverter.convert(this.rawDeltaOps, this.options);

    var pairedOps = Grouper.pairOpsWithTheirBlock(deltaOps);

    var groupedSameStyleBlocks = Grouper.groupConsecutiveSameStyleBlocks(
      pairedOps,
      {
        blockquotes: !!this.options.multiLineBlockquote,
        header: !!this.options.multiLineHeader,
        codeBlocks: !!this.options.multiLineCodeblock,
        customBlocks: !!this.options.multiLineCustomBlock,
      }
    );

    var groupedOps = Grouper.reduceConsecutiveSameStyleBlocksToOne(
      groupedSameStyleBlocks
    );

    var tableGrouper = new TableGrouper();
    groupedOps = tableGrouper.group(groupedOps);

    var listNester = new ListNester();
    return listNester.nest(groupedOps);
  }

  convert() {
    let groups = this.getGroupedOps();
    let result = groups
      .map((group) => {
        if (group instanceof ListGroup) {
          return this._renderList(<ListGroup>group);
        } else if (group instanceof BlockGroup) {
          var g = <BlockGroup>group;
          return this._renderBlock(g.op, g.ops);
        } else if (group instanceof BlotBlock) {
          return this._renderCustom(group.op, null);
        } else {
          // InlineGroup
          return this._renderInlines((<InlineGroup>group).ops);
        }
      })
      .filter((item) => item != null);

    const blockedResult = []
      .concat(...result)
      .reduce(function (resultList: any, currentValue: any) {
        const isTextType = currentValue.type === 'text';
        if (!isTextType) {
          return [...resultList, currentValue];
        }

        const beforeElement: any = resultList.pop();
        const isBeforeElementHasTextBlockType =
          beforeElement.type === 'textBlock';
        if (isBeforeElementHasTextBlockType) {
          return [
            ...resultList,
            { ...beforeElement, value: [...beforeElement.value, currentValue] },
          ];
        }

        resultList.push(beforeElement);
        return [...resultList, { type: 'textBlock', value: [currentValue] }];
      }, []);

    return { contents: blockedResult };
  }

  _renderList(list: ListGroup) {
    var listItems = list.items.map((li: ListItem) => this._renderListItem(li));
    const flattenListItems = [].concat(...listItems);

    return {
      type: 'block',
      value: flattenListItems,
      attributes: list.items[0].item.op.attributes,
    };
  }

  _renderListItem(li: ListItem) {
    li.item.op.attributes.indent = 0;

    return this._renderInlines(li.item.ops);
  }

  _renderBlock(bop: DeltaInsertOp, ops: DeltaInsertOp[]) {
    if (bop.isCodeBlock()) {
      const body = encodeHtml(
        ops
          .map((iop) =>
            iop.isCustomEmbed()
              ? this._renderCustom(iop, bop)
              : iop.insert.value
          )
          .join('')
      );
      const value = { type: 'text', value: body, attributes: {} };
      return { type: 'block', value: value, attributes: bop.attributes };
    }

    var inlines = ops.map((op) => this._renderInline(op, bop));
    return {
      type: 'block',
      value: inlines,
      attributes: bop.attributes,
    };
  }

  _renderInlines(ops: DeltaInsertOp[]) {
    var opsLen = ops.length - 1;
    var objects = ops
      .map((op: DeltaInsertOp, i: number) => {
        if (i > 0 && i === opsLen && op.isJustNewline()) {
          return undefined;
        }
        return this._renderInline(op, null);
      })
      .filter((item) => item != null);

    var flattenObjects = [].concat(...objects);
    return flattenObjects;
  }

  _renderInline(op: DeltaInsertOp, contextOp: DeltaInsertOp | null) {
    if (op.isCustomEmbed()) {
      return this._renderCustom(op, contextOp);
    }

    const converter = new OpToObjectConverter(op);
    return converter.getObject();
  }

  _renderCustom(op: DeltaInsertOp, contextOp: DeltaInsertOp | null) {
    var renderCb = this.callbacks['renderCustomOp_cb'];
    if (typeof renderCb === 'function') {
      return renderCb.apply(null, [op, contextOp]);
    }
    return undefined;
  }

  renderCustomWith(
    cb: (op: DeltaInsertOp, contextOp: DeltaInsertOp) => object | undefined
  ) {
    this.callbacks['renderCustomOp_cb'] = cb;
  }
}

export { QuillDeltaToObjectConverter };
