export function camelToDashed(input:string) {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function dashedToCamel(input: string): string {
    return input.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
}

export function getMethods(obj:any) : string[] {
    const ignore = [
        "__defineGetter__",
        "__defineSetter__",
        "hasOwnProperty",
        "__lookupGetter__",
        "__lookupSetter__",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toString",
        "valueOf",
        "toLocaleString",
        "constructor",
        "render",
        "connectedCallback",
        "disconnectedCallback",
        "adoptedCallback",
        "attributeChangedCallback"
    ];
    const properties = new Set()
    let currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter((item:any) => typeof obj[item] === 'function' && !(ignore.includes(item))) as string[]
}