import { Field } from "../context/FormStructureContext";

export const findFieldById = (fields: Field[], id: string): Field | undefined => {
    for (const field of fields) {
        if (field.id === id) return field;
        if (field.children) {
            const found = findFieldById(field.children, id);
            if (found) return found;
        }
    }
    return undefined;
};

export const addChildToField = (
    fields: Field[],
    parentId: string,
    newField: Field
): Field[] => {
    return fields.map((field) => {
        if (field.id === parentId) {
            return {
                ...field,
                children: [...(field.children ?? []), newField],
            };
        }
        if (field.children) {
            return {
                ...field,
                children: addChildToField(field.children, parentId, newField),
            };
        }
        return field;
    });
};

export const removeChildFromField = (
    fields: Field[],
    idToRemove: string,
    parentId?: string,
): Field[] => {
    return fields.map((field) => {
        if (field.id === parentId) {
            return {
                ...field,
                children: field.children?.filter((item) => item.id !== idToRemove),
            };
        }
        if (field.children) {
            return {
                ...field,
                children: removeChildFromField(field.children, idToRemove, parentId),
            };
        }
        return field;
    });
};

export const moveChildField = (
    fields: Field[],
    id: string,
    direction: "up" | "down",
    parentID?: string
): Field[] => {
    const index = fields.findIndex((f) => f.id === id);


    if (index !== -1) {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= fields.length) return fields;

        const updated = [...fields];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        return updated;
    }

    return fields.map((field) =>
        field.type === "group"
            ? { ...field, children: moveChildField(field.children ?? [], id, direction) }
            : field
    );
};


export const toJson = (value: unknown, pretty: boolean = true): string => {
    return JSON.stringify(value, null, pretty ? 2 : undefined);
};


export const isValidJson = (value: string): boolean => {
    try {
        const parsed = JSON.parse(value);
        return typeof parsed === 'object' && parsed !== null;
    } catch {
        return false;
    }
};