import reformatDate from '../utils/reformatDate.js'

export class Date {
    constructor({ 
        id, 
        dateStart = new Date(),
        dateEnd = new Date()
    }) {
        this.id = id;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    toJSON() {
        return reformatDate({
            id: this.id,
            dateStart: new Date(this.dateStart).getTime(),
            dateEnd: new Date(this.dateEnd).getTime()
        });
    }
}
