export class Practice {
    constructor({ 
        id, 
        name,
        direction,
        start_date,
        end_date,
        type = 'production'
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof name !== 'string') throw new Error('Parameter "name" must be "string" type');
        if (typeof direction !== 'number') throw new Error('Parameter "direction" must be "number" type');
        if (!(start_date instanceof Date)) throw new Error('Parameter "start_date" must be "date" type');
        if (!(end_date instanceof Date)) throw new Error('Parameter "end_date" must be "date" type');
        if (typeof type !== 'string') throw new Error('Parameter "type" must be "string" type');

        this.id = id;
        this.name = name;
        this.direction = direction;
        this.start_date = start_date;
        this.end_date = end_date;
        this.type = type;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            direction: this.direction,
            start_date: this.start_date,
            end_date: this.end_date,
            type: this.type
        };
    }
}
  