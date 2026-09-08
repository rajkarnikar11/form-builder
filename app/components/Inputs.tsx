import React, { useEffect, useState } from 'react'
import { Field, useFormStructure } from '../context/FormStructureContext'
import { eventNames } from 'process'
import { clearValues, setValue } from '../formState/formValues';

const Inputs = ({ field, inputError, path }: { field: Field, inputError: Record<string, any>, path: string[] }) => {
    const { fields, } = useFormStructure();


    const [input, setInput] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        clearValues();
        setInput(null);
        setError('')
    }, [fields])

    useEffect(() => {
        setError(inputError?.[path?.join?.('.')])
    }, [inputError])

    if (field?.type == 'group') {
        return <div className='flex flex-col border mt-4 border-gray-200 p-4 rounded-lg relative gap-1'>
            <label className='text-sm absolute top-0 px-1  bg-[#FEFFFE] -translate-y-1/2'>{field?.label}</label>
            {field?.children?.map((item) => {
                return <Inputs inputError={inputError} field={item} path={[...path, item.label]} />
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
        setInput(event);
        setValue(path, event);
        if (error) setError(''); // clear a stale error the moment they start fixing it, optional but nice UX
    };

    const handleBlur = () => {
        const msg = validateMinMax(input ?? '', field?.min, field?.max);
        setError(msg);
    };
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm'>{field?.label} {field?.required ? <span className=' text-red-700' >*</span> : ''} </label>
            <input onBlur={handleBlur}
                value={input ?? ''} onChange={(e) => handleChange(e?.target?.value)} className={` border rounded border-gray-200 p-1 ${error ? ' border-red-700 focus:outline-red-700 ' : ''} `} type={field?.type}></input>
            {error && <span className=' text-xs text-red-700' >{error}</span>}
        </div>
    )
}

export default Inputs
