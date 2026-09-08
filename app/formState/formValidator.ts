import { Field } from "../context/FormStructureContext"
import { getAllValues } from "./formValues";


interface FlatFieldMeta {
    id: string;
    label: string;
    required: boolean;
    min?: number;
    max?: number;
}

function flattenValues(values: Record<string, any>): Record<string, string> {
    const flat: Record<string, string> = {};

    function walk(obj: Record<string, any>, prefix: string[]) {
        for (const key in obj) {
            const value = obj[key];
            const path = [...prefix, key];

            if (typeof value === "object" && value !== null) {
                walk(value, path);
            } else {
                flat[path.join(".")] = value;
            }
        }
    }

    walk(values, []);
    return flat;
}

function flattenFields(nodes: Field[]): FlatFieldMeta[] {
    const result: FlatFieldMeta[] = [];

    function walk(fields: Field[], prefix: string[]) {
        for (const field of fields) {
            const path = [...prefix, field.label];

            if (field.type === "group") {
                walk(field.children ?? [], path);
                continue;
            }

            result.push({
                id: field.id,
                label: path.join("."),
                required: !!field.required,
                ...(field.type === "number"
                    ? {
                        min: field.min !== undefined && field.min != null ? Number(field.min) : undefined,
                        max: field.max !== undefined && field.max != null ? Number(field.max) : undefined,
                    }
                    : {}),
            });
        }
    }

    walk(nodes, []);
    return result;
}


export const validateAll = (fields: Field[]): { allValid: boolean, errors: Record<string, string> } => {
    let allValid = true;
    let errors: Record<string, string> = {};
    const flatValues = flattenValues(getAllValues());


    console.log(getAllValues(), 'hee', flattenFields(fields))

    flattenFields(fields)?.forEach((flatField) => {
        if (flatField?.required && !flatValues?.[flatField?.label]) {
            allValid = false
            errors[flatField?.label] = `${flatField?.label?.split('.')?.at(-1)} is required`
        } else if (flatField?.min != null && (+flatValues?.[flatField?.label]) < flatField.min) {
            errors[flatField?.label] = `Value must be at least ${flatField.min}.`;
            allValid = false

        } else if (flatField?.max != null && (+flatValues?.[flatField?.label]) > flatField.max) {
            errors[flatField?.label] = `Value must be at most ${flatField.max}.`;
            allValid = false

        }
    })

    return { allValid, errors }
}