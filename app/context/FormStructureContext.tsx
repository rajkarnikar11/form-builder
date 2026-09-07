'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { addChildToField, findFieldById, moveChildField, removeChildFromField } from '../utils/helpers';

export interface Field {
    id: string;

    type: 'text' | 'number' | 'group';
    label: string;
    required?: boolean;
    min?: number;
    max?: number;
    children?: Field[];
}

interface FormStructureContextType {
    fields: Field[];
    addField: (type: Field['type'], label: string, parentID?: string) => void;
    removeField: (index: number, id: string, parentID?: string) => void;
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
    moveField: (index: number, direction: 'up' | 'down', id: string, parentID?: string) => void;

}

const FormStructureContext = createContext<FormStructureContextType | undefined>(undefined);

export function FormStructureProvider({ children }: { children: ReactNode }) {
    const [fields, setFields] = useState<Field[]>([]);




    const addField = (type: Field['type'], label: string, parentID?: string) => {
        const newField: Field = { id: crypto.randomUUID(), type, label };



        if (parentID) {
            setFields((prev) => addChildToField(prev, parentID, newField));
        } else {
            setFields((prev) => [...prev, newField]);
        }
    };

    const removeField = (index: number, id: string, parentID?: string) => {
        if (parentID) {
            setFields((prev) => removeChildFromField(prev, id, parentID))
        } else { setFields((prev) => prev.filter((_, i) => i !== index)); }
    };

    const moveField = (index: number, direction: 'up' | 'down', id: string, parentID?: string,) => {
        if (parentID) {
            setFields((prev) => moveChildField(prev, id, direction, parentID));

        }

        else {
            console.log('else')
            setFields((prev) => {
                const newIndex = direction === 'up' ? index - 1 : index + 1;
                if (newIndex < 0 || newIndex >= prev.length) return prev;

                const updated = [...prev];
                [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
                return updated;
            });
        }
    };

    console.log(fields, 'fields')

    return (
        <FormStructureContext.Provider value={{ fields, addField, removeField, setFields, moveField }}>
            {children}
        </FormStructureContext.Provider>
    );
}

export function useFormStructure() {
    const context = useContext(FormStructureContext);
    if (!context) {
        throw new Error('useFormStructure must be used within a FormStructureProvider');
    }
    return context;
}