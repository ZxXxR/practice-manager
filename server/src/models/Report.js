export class PracticeAssignment {
    constructor({ 
        id, 
        practice_id,
        mentor_id,
        student_id,
        date = new Date(),
        estimation,
        comment = ''
    }) {
        if (typeof id !== 'number') throw new Error('Parameter "id" must be "number" type');
        if (typeof practice_id !== 'number') throw new Error('Parameter "practice_id" must be "number" type');
        if (typeof mentor_id !== 'number') throw new Error('Parameter "mentor_id" must be "number" type');
        if (typeof student_id !== 'number') throw new Error('Parameter "student_id" must be "number" type');
        if (!(date instanceof Date)) throw new Error('Parameter "date" must be "date" type');
        if (typeof estimation !== 'string') throw new Error('Parameter "estimation" must be "string" type');
        if (typeof comment !== 'string') throw new Error('Parameter "comment" must be "string" type');

        this.id = id;
        this.practice_id = practice_id;
        this.mentor_id = mentor_id;
        this.student_id = student_id;
        this.date = date;
        this.estimation = estimation;
        this.comment = comment;
    }

    toJSON() {
        return {
            id: this.id,
            practice_id: this.practice_id,
            mentor_id: this.mentor_id,
            student_id: this.student_id,
            date: this.date,
            estimation: this.estimation,
            comment: this.comment
        };
    }
}
  