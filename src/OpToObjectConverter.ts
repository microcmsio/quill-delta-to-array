import { DeltaInsertOp } from './DeltaInsertOp';

class OpToObjectConverter {
  private op: DeltaInsertOp;

  constructor(op: DeltaInsertOp) {
    this.op = op;
  }

  getObject(): object {
    const insert = this.op.insert;
    const object = {
      type: insert.type,
      value: insert.value,
      attrubute: this.op.attributes,
    };

    return object;
  }
}

export { OpToObjectConverter };
