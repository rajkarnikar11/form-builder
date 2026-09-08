const values: Record<string, any> = {};

// export function getValue(id: string): string {
//     return values[id] ?? "";
// }

export function setValue(path: string[], val: string): void {
    let obj = values;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof obj[key] !== "object" || obj[key] === null) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    obj[path[path.length - 1]] = val;
}

export function getAllValues(): Record<string, any> {
    return JSON.parse(JSON.stringify(values)); // deep clone, since it's nested now
}

export function clearValues(): void {
    for (const key in values) {
        delete values[key];
    }
}