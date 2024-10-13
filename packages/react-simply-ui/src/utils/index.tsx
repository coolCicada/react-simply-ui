function getStringPath(name: string): Array<string | number> {
    return name?.split('.') ?? [];
}

function getObjValue(obj: Record<string, any>, name: string) {
    const keys = name?.split('.') ?? [];
    for (let i = 0; i < keys.length; i ++) {
        // 为空
        if (typeof obj === null || typeof obj === undefined) {
            return undefined;
        }
        obj = obj[keys[i]];
        if (i !== keys.length - 1 && typeof obj !== 'object') {
            return undefined;
        }
    }
    return obj;
}

function updateObjValue(obj: Record<string, any>, name: string, value: any) {
    const keys = name?.split('.') ?? [];
    let res = obj;
    let curr = res;
    for (let i = 0; i < keys.length; i ++) {
        // 为空
        if (typeof obj === null || typeof obj === undefined) {
            return obj;
        }
        curr = res[keys[i]]
        if (typeof curr === 'object') {
            res[keys[i]] = { ...curr}
        }
        if (i === keys.length - 1) {
            res[keys[i]] = value;
        }
    }
    return res;
} 


export { getStringPath, getObjValue, updateObjValue };