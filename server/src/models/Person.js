export class Person {
    constructor({ 
        id, 
        firstName,
        lastName,
        secondName = '',
        number = '',
        email = '',
        position = '',
        communication = '',
        type
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.secondName = secondName;
        this.number = number;
        this.email = email;
        this.position = position;
        this.communication = communication;
        this.type = type;
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            secondName: this.secondName,
            number: this.number,
            email: this.email,
            position: this.position,
            communication: this.communication,
            type: this.type
        };
    }
}
