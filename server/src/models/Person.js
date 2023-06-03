export class Person {
    constructor({ 
        id, 
        first_name,
        last_name,
        second_name = '',
        photo = '',
        phone_number = '',
        email = '',
        position = '',
        group_id = null,
        comment = '',
        created_at = new Date(),
        updated_at = new Date()
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof first_name !== 'string') throw new Error('Parameter "firstName" must be "string" type');
        if (typeof last_name !== 'string') throw new Error('Parameter "last_name" must be "string" type');
        if (typeof second_name !== 'string') throw new Error('Parameter "second_name" must be "string" type');
        if (typeof photo !== 'string') throw new Error('Parameter "photo" must be "string" type');
        if (typeof phone_number !== 'string') throw new Error('Parameter "phone_number" must be "string" type');
        if (typeof email !== 'string') throw new Error('Parameter "email" must be "string" type');
        if (typeof position !== 'string') throw new Error('Parameter "position" must be "string" type');
        if (typeof group_id !== 'number' && typeof group_id !== 'undefined') throw new Error('Parameter "group_id" must be "number" or "undefined" type');
        if (typeof comment !== 'string') throw new Error('Parameter "comment" must be "string" type');
        if (!(created_at instanceof Date)) throw new Error('Parameter "created_at" must be "date" type');
        if (!(updated_at instanceof Date)) throw new Error('Parameter "updated_at" must be "date" type');
        

        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.second_name = second_name;
        this.photo = photo;
        this.phone_number = phone_number;
        this.email = email;
        this.position = position;
        this.group_id = group_id;
        this.comment = comment;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            second_name: this.second_name,
            photo: this.photo,
            phone_number: this.phone_number,
            email: this.email,
            position: this.position,
            group_id: this.group_id,
            comment: this.comment,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
