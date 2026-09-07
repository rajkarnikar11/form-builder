import { useFormStructure } from '@/app/context/FormStructureContext';
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';


const AddField = ({ isOpen, setIsOpen, parentID }: {
    isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, parentID?: string;
}) => {

    const fieldOptions: { type: 'text' | 'number' | 'group'; label: string }[] = [
        { type: 'text', label: 'Text Input' },
        { type: 'number', label: 'Number Input' },
        { type: 'group', label: 'Group' },
    ];

    const { addField } = useFormStructure();

    return (
        <div className="relative">
            <button
                onClick={() => { setIsOpen(!isOpen) }}
                className="flex cursor-pointer border-green-900 text-green-900 rounded-lg border p-2 items-center gap-1"
            >
                <Plus size={16} /> Add field
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md z-10">
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
                </div>
            )}
        </div>
    )
}

export default AddField
