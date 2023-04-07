export class Practice {
    constructor({ 
        id, 
        studentId,
        contractId,
        baseId,
        periodId,
        comment,
        type
    }) {
        this.id = id;
        this.studentId = studentId;
        this.contractId = contractId;
        this.baseId = baseId;
        this.periodId = periodId;
        this.comment = comment;
        this.type = type;
    }

    toJSON() {
        return {
            id: this.id,
            student: this.studentId,
            contract: this.contractId,
            base: this.baseId,
            period: this.periodId,
            comment: this.comment,
            type: this.type
        };
    }
}
  