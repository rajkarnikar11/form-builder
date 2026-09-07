import { useFormStructure } from '@/app/context/FormStructureContext';
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
const fieldOptions: { type: 'text' | 'number' | 'group'; label: string }[] = [
    { type: 'text', label: 'Text Input' },
    { type: 'number', label: 'Number Input' },
    { type: 'group', label: 'Group' },
];

interface AddFieldProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    parentID?: string;
}
const AddField = ({ isOpen, setIsOpen, parentID }: AddFieldProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.right + window.scrollX - 160,
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (buttonRef.current && !optionRef?.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setIsOpen]);
    const { fields, addField, removeField } = useFormStructure();


    return (
        <div className="relative">
            <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex border border-teal-900 text-teal-900 rounded-lg p-2 cursor-pointer items-center gap-1">
                <Plus size={16} /> Add field
            </button>

            {mounted && isOpen &&
                createPortal(
                    <div
                        ref={optionRef}
                        style={{ position: 'absolute', top: position.top, left: position.left }}
                        className="w-40 bg-white rounded-md shadow-md z-50"
                    >
                        {fieldOptions.map((option) => (
                            <button
                                key={option.type}
                                onClick={() => {
                                    addField(option.type, option.label, parentID);
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 hover:bg-green-900/20"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default AddField
