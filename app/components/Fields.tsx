import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Trash, Minus, Plus } from 'lucide-react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import AddField from './UI/AddField';
import { Accordion } from './UI/Accordion';

interface FieldsProps {
    type: "number" | "text" | "group";
    index: number;
}

interface BaseFieldProps {
    field: Field;
    index: number;
    parentID?: string;
    required?: boolean;

}



const BaseField = ({ required = true, field, index, parentID }: BaseFieldProps) => {
    const { setFields, updateField } = useFormStructure();
    const handleFieldChange = (key: keyof Field, value: string | number | boolean) => {
        updateField(field.id, { [key]: value }, parentID);
    };

    return (<div className=' flex flex-col'>
        <label className='text-sm text-gray-500'>label</label>
        <div className=' flex gap-2 items-center'>
            <input onChange={(e) => handleFieldChange('label', e.target.value)}
                className='border border-gray-200 rounded p-1' value={field?.label}></input>
            {required ? <><input
                type="checkbox"
                checked={field?.required ?? false}
                onChange={(e) => handleFieldChange('required', !field?.required)}

            /> <label> Required</label></> : <></>}
        </div>

    </div>);
}

const GroupField = ({ field, index }: BaseFieldProps) => {
    const { setFields } = useFormStructure();
    const [isOpen, setIsOpen] = useState(false);
    return (<div className=' '>
        <div className=' flex justify-end'><AddField isOpen={isOpen} parentID={field?.id} setIsOpen={setIsOpen} /></div>

        <div className='nested' >{field?.children?.map((item: Field) => <div key={item?.id} className=' my-2 flex flex-col border border-gray-200 rounded-lg'>
            <Accordion
                header={(isOpen: boolean) => (
                    <FieldHeader parentID={field?.id} id={item?.id} type={item?.type} isOpen={isOpen} index={index} />

                )}
            >
                {renderContent(item, index, item?.id, field?.id)}
            </Accordion>

        </div>)}</div>

    </div>

    );
}

const renderContent = (field: Field, index: number, id: string, parentID?: string) => {
    const { setFields, updateField } = useFormStructure();

    const handleFieldChange = (key: keyof Field, value: string | number | boolean) => {
        updateField(id, { [key]: value }, parentID);
    };


    switch (field?.type) {
        case 'text':
            return (
                <div className='flex p-2'>
                    <BaseField parentID={parentID} field={field} index={index} />
                </div>)
        case 'number':
            return (
                <div className=' flex gap-2 flex-col p-2'>
                    <BaseField parentID={parentID} field={field} index={index} />
                    <div className='flex gap-2'>
                        <div className='flex flex-col'>
                            <label className='text-sm text-gray-500'>min  (optional) </label>
                            <input
                                type="number"
                                value={field?.min ?? ""}
                                onChange={(e) => handleFieldChange('min', e.target.value)}

                                className='border border-gray-200 rounded p-1'
                            />
                        </div>
                        <div className='flex gep-1 flex-col'>
                            <label className='text-sm text-gray-500'>max (optional)</label>
                            <input
                                type="number"
                                value={field?.max ?? ""}
                                onChange={(e) => handleFieldChange('max', e.target.value)}

                                className='border border-gray-200 rounded p-1'
                            />
                        </div>
                    </div>
                </div>
            )

        case 'group':
            return (
                <div className='flex flex-col nester gap-2 pl-4 p-2'>
                    <BaseField required={false} parentID={parentID} field={field} index={index} />
                    <GroupField field={field} index={index} />

                </div>)
    }


}

const FieldHeader = ({ type, index, parentID, id, isOpen }: { type: Field['type'], index: number, parentID?: string, id: string, isOpen: boolean }) => {
    const { moveField, fields, removeField } = useFormStructure();

    return (<div className='flex justify-between field-header gap-4 border-gray-200 p-2 border-b'>
        <div className=' flex gap-2 items-center'>
            <span className=' bg-teal-900 accordion-header-icon text-white border-2 border-teal-900 rounded '>{isOpen ? <Minus strokeWidth={2} size={14} /> : <Plus strokeWidth={2} size={14} />}</span>
            <p className='font-medium capitalize'>{type}</p>
        </div>
        <div className=' flex gap-2'>
            <button
                className='cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                onClick={(e) => { e.stopPropagation(); moveField(index, 'up', id, parentID) }}
            // disabled={index === 0}
            >
                <ChevronUp />
            </button>
            <button
                className='cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

                onClick={(e) => { e.stopPropagation(); moveField(index, 'down', id, parentID) }}
            // disabled={index === fields.length - 1}
            >
                <ChevronDown />
            </button>
            <button onClick={() => removeField(index, id, parentID)} className='cursor-pointer'
            ><Trash className=' text-red-600' /></button>
        </div>
    </div>)
}

const Fields = ({ type, index, }: FieldsProps) => {
    const { fields } = useFormStructure();

    return (
        <Accordion
            header={(isOpen: boolean) => (
                <FieldHeader type={type} index={index} id={fields?.[index]?.id} isOpen={isOpen} />
            )}
        >
            {renderContent(fields[index], index, fields?.[index]?.id)}
        </Accordion>
    )
}

export default Fields
