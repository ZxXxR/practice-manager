export class Group {
    constructor({ 
        id, 
        name
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof name !== 'string') throw new Error('Parameter "name" must be "string" type');

        this.id = id;
        this.name = name;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
