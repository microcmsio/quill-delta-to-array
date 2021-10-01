import { DeltaInsertOp } from './DeltaInsertOp';
import { ListGroup, ListItem, TDataGroup } from './grouper/group-types';
declare class QuillDeltaToObjectConverter {
  private options;
  private rawDeltaOps;
  private callbacks;
  constructor(deltaOps: any[]);
  getGroupedOps(): TDataGroup[];
  convert(): never[];
  _renderList(
    list: ListGroup
  ): {
    type: string;
    value: never[];
    attributes: import('../../../../../../Users/him/Documents/microcms/quill-delta-to-array/src/OpAttributeSanitizer').IOpAttributes;
  };
  _renderListItem(li: ListItem): never[];
  _renderBlock(
    bop: DeltaInsertOp,
    ops: DeltaInsertOp[]
  ):
    | {
        type: string;
        value: {
          type: string;
          value: string;
          attributes: {};
        };
        attributes: import('../../../../../../Users/him/Documents/microcms/quill-delta-to-array/src/OpAttributeSanitizer').IOpAttributes;
      }
    | {
        type: string;
        value: any[];
        attributes: import('../../../../../../Users/him/Documents/microcms/quill-delta-to-array/src/OpAttributeSanitizer').IOpAttributes;
      };
  _renderInlines(ops: DeltaInsertOp[]): never[];
  _renderInline(op: DeltaInsertOp, contextOp: DeltaInsertOp | null): any;
  _renderCustom(op: DeltaInsertOp, contextOp: DeltaInsertOp | null): any;
  renderCustomWith(
    cb: (op: DeltaInsertOp, contextOp: DeltaInsertOp) => object | undefined
  ): void;
}
export { QuillDeltaToObjectConverter };
