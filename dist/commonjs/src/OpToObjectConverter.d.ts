import { DeltaInsertOp } from './DeltaInsertOp';
declare class OpToObjectConverter {
  private op;
  constructor(op: DeltaInsertOp);
  getObject(): object;
}
export { OpToObjectConverter };
