export class Base {
    constructor({ 
        id, 
        name,
        formId,
        directionId,
        responsibleId,
        representativeId,
        comment
    }) {
        this.id = id;
        this.name = name;
        this.formId = formId;
        this.directionId = directionId;
        this.responsibleId = responsibleId;
        this.representativeId = representativeId;
        this.comment = comment;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            form: this.formId,
            direction: this.directionId,
            responsible: this.responsibleId,
            representative: this.representativeId,
            comment: this.comment
        };
    }
}
