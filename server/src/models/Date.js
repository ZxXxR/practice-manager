import reformatDate from '../utils/reformatDate.js'

export class Date {
    constructor({ 
        id, 
        date_start = new Date(),
        date_end = new Date()
    }) {
        this.id = id;
        this.date_start = date_start;
        this.dat_end = date_end;
    }

    toJSON() {
        return reformatDate({
            id: this.id,
            date_start: new Date(this.date_start).getTime(),
            date_end: new Date(this.date_end).getTime()
        });
    }
}
