export class Role {
    constructor({ 
        id, 
        name, 
        access_level = 0, 
        is_default = false
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof name !== 'string') throw new Error('Parameter "name" must be "string" type');
        if (typeof access_level !== 'number') throw new Error('Parameter "access_level" must be "number" type');
        if (typeof is_default !== 'boolean') throw new Error('Parameter "is_default" must be "boolean" type');

        this.id = id;
        this.name = name;
        this.access_level = access_level;
        this.is_default = is_default;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            access_level: this.access_level,
            is_default: this.is_default
        };
    }
}
