export class PracticeAssignment {
    constructor({ 
        id, 
        practice_id,
        enterprise_id,
        responsible_id,
        mentor_id,
        student_id,
        contract_number
    }) {
        if (typeof id !== 'number') throw new Error('Parameter "id" must be "number" type');
        if (typeof practice_id !== 'number') throw new Error('Parameter "practice_id" must be "number" type');
        if (typeof enterprise_id !== 'number') throw new Error('Parameter "enterprise_id" must be "number" type');
        if (typeof responsible_id !== 'number') throw new Error('Parameter "responsible_id" must be "number" type');
        if (typeof mentor_id !== 'number') throw new Error('Parameter "mentor_id" must be "number" type');
        if (typeof student_id !== 'number') throw new Error('Parameter "student_id" must be "number" type');
        if (typeof contract_number !== 'string') throw new Error('Parameter "contract_number" must be "string" type');

        this.id = id;
        this.practice_id = practice_id;
        this.enterprise_id = enterprise_id;
        this.responsible_id = responsible_id;
        this.mentor_id = mentor_id;
        this.student_id = student_id;
        this.contract_number = contract_number;
    }

    toJSON() {
        return {
            id: this.id,
            practice_id: this.practice_id,
            enterprise_id: this.enterprise_id,
            responsible_id: this.responsible_id,
            mentor_id: this.mentor_id,
            student_id: this.student_id,
            contract_number: this.contract_number
        };
    }
}
  