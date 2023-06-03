export default function (
    object,
    keys
) {
    if (typeof keys === 'string') {
        delete object[keys];
    } else if (Array.isArray(keys)) {
        for (const key of keys) {
            delete object[key];
        }
    } else {
        throw new Error('Parameter "keys" should be "string" or "array" type');
    }

    return object;
}
