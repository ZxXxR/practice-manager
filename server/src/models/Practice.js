export class Practice {
    constructor({ 
        id, 
        student,
        contract,
        base,
        period,
        comment = '',
        type
    }) {
        this.id = id;
        this.student = student;
        this.contract = contract;
        this.base = base;
        this.period = period;
        this.comment = comment;
        this.type = type;
    }

    toJSON() {
        return {
            id: this.id,
            studentId: this.student,
            contractId: this.contract,
            baseId: this.base,
            periodId: this.period,
            comment: this.comment,
            type: this.type
        };
    }
}
  