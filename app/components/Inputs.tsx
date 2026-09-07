import React, { useState } from 'react'
import { Field } from '../context/FormStructureContext'
import { eventNames } from 'process'
import { setValue } from '../formState/formValues';

const Inputs = ({ field }: { field: Field }) => {

    const [input, setInput] = useState(null);
    const [error, setError] = useState('')

    if (field?.type == 'group') {
        return <div className='flex flex-col border mt-4 border-gray-200 p-4 rounded-lg relative gap-1'>
            <label className='text-sm absolute top-0 px-1  bg-[#FEFFFE] -translate-y-1/2'>{field?.label}</label>
            {field?.children?.map((item) => {
                return <Inputs field={item} />
            })}
        </div>

    }

    function validateMinMax(value: string, min?: number, max?: number): string {
        if (value === "") return "";

        const num = Number(value);

        if (min != null && num < min) {
            return `Value must be at least ${min}.`;
        }
        if (max != null && num > max) {
            return `Value must be at most ${max}.`;
        }
        return "";
    }

    const handleChange = (event: any) => {
        const msg = validateMinMax(event, field?.min, field?.max);

        if (msg) {
            setError(msg)

        }
        else {
            setError('')
            setValue(field?.label, event)
            setInput(event)
        }
    }
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm'>{field?.label} {field?.required ? <span className=' text-red-700' >*</span> : ''} </label>
            <input value={input ?? ''} onChange={(e) => handleChange(e?.target?.value)} className={` border rounded border-gray-200 p-1 ${error ? ' border-red-700 focus:outline-red-700 ' : ''} `} type={field?.type}></input>
            {error && <span className=' text-xs text-red-700' >{error}</span>}
        </div>
    )
}

export default Inputs
