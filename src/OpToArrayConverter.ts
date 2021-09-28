import { DeltaInsertOp } from './DeltaInsertOp';

class OpToArrayConverter {
  private op: DeltaInsertOp;

  constructor(op: DeltaInsertOp) {
    this.op = op;
  }

  getObject(): string {
    const insert = this.op.insert;
    const object = {
      type: insert.type,
      value: insert.value,
      attrubute: this.op.attributes,
    };

    return JSON.stringify(object);
  }
}

export { OpToArrayConverter };
