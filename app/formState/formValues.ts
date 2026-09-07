const values: Record<string, string> = {};

export function getValue(id: string): string {
    return values[id] ?? "";
}

export function setValue(id: string, val: string): void {
    values[id] = val;
}

export function getAllValues(): Record<string, string> {
    return { ...values };
}

export function clearValues(): void {
    for (const key in values) {
        delete values[key];
    }
}