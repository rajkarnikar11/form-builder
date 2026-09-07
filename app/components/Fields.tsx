import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Trash } from 'lucide-react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import AddField from './UI/AddField';
import { Accordion } from './Accordion';

interface FieldsProps {
    type: "number" | "text" | "group";
    index: number;
}

interface BaseFieldProps {
    field: Field;
    index: number;
    parentID?: string;

}



const BaseField = ({ field, index, parentID }: BaseFieldProps) => {
    const { setFields, updateField } = useFormStructure();
    const handleFieldChange = (key: keyof Field, value: string | number | boolean) => {
        updateField(field.id, { [key]: value }, parentID);
    };

    return (<div className=' flex flex-col'>
        <label className='text-sm text-gray-500'>label</label>
        <div className=' flex gap-2 items-center'>
            <input onChange={(e) => handleFieldChange('label', e.target.value)}
                className='border border-gray-200 rounded p-1' value={field?.label}></input>
            <input
                type="checkbox"
                checked={field?.required ?? false}
                onChange={(e) => handleFieldChange('required', e.target.value)}

            /> <label> Required</label>
        </div>

    </div>);
}

const GroupField = ({ field, index }: BaseFieldProps) => {
    const { setFields } = useFormStructure();
    const [isOpen, setIsOpen] = useState(false);
    console.log(field, 'inside group')
    return (<div className=' '>
        <div className=' flex justify-end'><AddField isOpen={isOpen} parentID={field?.id} setIsOpen={setIsOpen} /></div>

        <div className='nested' >{field?.children?.map((item: Field) => <div className=' my-2 flex flex-col border border-gray-200 rounded-lg'>
            <FieldHeader parentID={field?.id} id={item?.id} type={item?.type} index={index} />

            {renderContent(item, index, item?.id, field?.id)}
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
                    <BaseField parentID={parentID} field={field} index={index} />
                    <GroupField field={field} index={index} />

                </div>)
    }


}

const FieldHeader = ({ type, index, parentID, id }: { type: Field['type'], index: number, parentID?: string, id: string }) => {
    const { moveField, fields, removeField } = useFormStructure();

    return (<div className='flex justify-between field-header gap-4 border-gray-200 p-2 border-b'>
        <p className='font-medium capitalize'>{type}</p>
        <div className=' flex gap-2'>
            <button
                className='cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                onClick={() => moveField(index, 'up', id, parentID)}
            // disabled={index === 0}
            >
                <ChevronUp />
            </button>
            <button
                className='cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

                onClick={() => moveField(index, 'down', id, parentID)}
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
                <FieldHeader type={type} index={index} id={fields?.[index]?.id} />
            )}
        >
            {renderContent(fields[index], index, fields?.[index]?.id)}
        </Accordion>
    )
}

export default Fields
