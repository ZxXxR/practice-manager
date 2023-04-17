export class Base {
    constructor({ 
        id, 
        name,
        form,
        direction,
        responsible,
        representative,
        comment = ''
    }) {
        this.id = id;
        this.name = name;
        this.form = form;
        this.direction = direction;
        this.responsible = responsible;
        this.representative = representative;
        this.comment = comment;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            formId: this.form,
            directionId: this.direction,
            responsibleId: this.responsible,
            representativeId: this.representative,
            comment: this.comment
        };
    }
}
