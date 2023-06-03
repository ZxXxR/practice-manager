export class Enterprise {
    constructor({ 
        id,
        representative_id,
        legal_form,
        name,
        ogrn = "",
        inn = "",
        phone_number = "",
        email = "",
        legal_address = "",
        comment = ""
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof representative_id !== 'number') throw new Error('Parameter "representative_id" must be "number" type');
        if (typeof legal_form !== 'string') throw new Error('Parameter "legal_form" must be "string" type');
        if (typeof name !== 'string') throw new Error('Parameter "name" must be "string" type');
        if (typeof ogrn !== 'string') throw new Error('Parameter "ogrn" must be "string" type');
        if (typeof inn !== 'string') throw new Error('Parameter "inn" must be "string" type');
        if (typeof phone_number !== 'string') throw new Error('Parameter "phone_number" must be "string" type');
        if (typeof email !== 'string') throw new Error('Parameter "email" must be "string" type');
        if (typeof legal_address !== 'string') throw new Error('Parameter "legal_address" must be "string" type');
        if (typeof comment !== 'string') throw new Error('Parameter "comment" must be "string" type');

        this.id = id;
        this.representative_id = representative_id;
        this.legal_form = legal_form;
        this.name = name;
        this.ogrn = ogrn;
        this.inn = inn;
        this.phone_number = phone_number;
        this.email = email;
        this.legal_address = legal_address;
        this.comment = comment;
    }

    toJSON() {
        return {
            id: this.id,
            representative_id: this.representative_id,
            legal_form: this.legal_form,
            name: this.name,
            ogrn: this.ogrn,
            inn: this.inn,
            phone_number: this.phone_number,
            email: this.email,
            legal_address: this.legal_address,
            comment: this.comment
        };
    }
}
