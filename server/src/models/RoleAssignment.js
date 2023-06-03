export class PracticeAssignment {
    constructor({ 
        id, 
        user_id,
        role_id
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof user_id !== 'number') throw new Error('Parameter "user_id" must be "number" type');
        if (typeof role_id !== 'number') throw new Error('Parameter "role_id" must be "number" type');

        this.id = id;
        this.user_id = user_id;
        this.role_id = role_id;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            role_id: this.role_id
        };
    }
}
  