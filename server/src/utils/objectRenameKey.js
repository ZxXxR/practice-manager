export default function (
    object,
    keys
) {
    if (Array.isArray(keys)) {
        for (const key of keys) {
            delete object[key];
            object[to] = object[from];
            delete object[from];
        }
    } else {
        throw new Error('Parameter "keys" should be "string" or "array" type');
    }

    return object;
}
