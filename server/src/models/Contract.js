export class Contract {
    constructor({ 
        id, 
        number
    }) {
        this.id = id;
        this.number = number;
    }

    toJSON() {
        return {
            id: this.id,
            number: this.number
        };
    }
}
