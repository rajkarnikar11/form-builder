import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Trash } from 'lucide-react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import AddField from './UI/AddField';

interface FieldsProps {
    type: "number" | "text" | "group";
    index: number;
}

interface BaseFieldProps {
    field: Field;
    index: number;
}

const BaseField = ({ field, index }: BaseFieldProps) => {
    const { setFields } = useFormStructure();

    return (<div className=' flex flex-col'>
        <label className='text-sm text-gray-500'>label</label>
        <div className=' flex gap-2 items-center'>
            <input onChange={(e) => setFields((prev: any) => prev.map((f: any, i: any) => (i === index ? { ...f, label: e.target.value } : f))
            )} className='border border-gray-200 rounded p-1' value={field?.label}></input>
            <input
                type="checkbox"
                checked={field?.required ?? false}
                onChange={(e) =>
                    setFields((prev: any) =>
                        prev.map((f: any, i: any) =>
                            i === index ? { ...f, required: e.target.checked } : f
                        )
                    )
                }
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

        <div >{field?.children?.map((item: Field) => <div className=' my-2 flex flex-col border border-gray-200 rounded-lg'>
            <FieldHeader parentID={field?.id} id={item?.id} type={item?.type} index={index} />

            {renderContent(item, index)}
        </div>)}</div>

    </div>

    );
}

const renderContent = (field: Field, index: number) => {
    const { setFields } = useFormStructure();




    switch (field?.type) {
        case 'text':
            return (
                <div className='flex p-2'>
                    <BaseField field={field} index={index} />
                </div>)
        case 'number':
            return (
                <div className=' flex gap-2 flex-col p-2'>
                    <BaseField field={field} index={index} />
                    <div className='flex gap-2'>
                        <div className='flex flex-col'>
                            <label className='text-sm text-gray-500'>min  (optional) </label>
                            <input
                                type="number"
                                value={field?.min ?? ""}
                                onChange={(e) =>
                                    setFields((prev: any) =>
                                        prev.map((f: any, i: any) => (i === index ? { ...f, min: e.target.value } : f))
                                    )
                                }
                                className='border border-gray-200 rounded p-1'
                            />
                        </div>
                        <div className='flex gep-1 flex-col'>
                            <label className='text-sm text-gray-500'>max (optional)</label>
                            <input
                                type="number"
                                value={field?.max ?? ""}
                                onChange={(e) =>
                                    setFields((prev: any) =>
                                        prev.map((f: any, i: any) => (i === index ? { ...f, max: e.target.value } : f))
                                    )
                                }
                                className='border border-gray-200 rounded p-1'
                            />
                        </div>
                    </div>
                </div>
            )

        case 'group':
            return (
                <div className='flex flex-col gap-2 p-2'>
                    <BaseField field={field} index={index} />
                    <GroupField field={field} index={index} />

                </div>)
    }


}

const FieldHeader = ({ type, index, parentID, id }: { type: Field['type'], index: number, parentID?: string, id: string }) => {
    const { moveField, fields, removeField } = useFormStructure();

    return (<div className='flex justify-between gap-4 border-gray-200 p-2 border-b'>
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
        <div className=' border border-gray-300 rounded-lg'>
            <FieldHeader type={type} index={index} id={fields?.[index]?.id} />

            <div>{renderContent(fields[index], index)}</div>
        </div>
    )
}

export default Fields
