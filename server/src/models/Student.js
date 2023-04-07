export class Student {
    constructor({ 
        id, 
        firstName,
        lastName,
        secondName,
        groupId
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.secondName = secondName;
        this.groupId = groupId;
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            secondName: this.secondName,
            group: this.groupId
        };
    }
}
