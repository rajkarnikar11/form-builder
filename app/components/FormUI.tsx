import React from 'react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import Inputs from './Inputs';
import { clearValues, getAllValues } from '../formState/formValues';
import { validateAll } from '../formState/formValidator';

const FormUI = () => {

    const { fields, } = useFormStructure();

    function handleSubmit() {
        validateAll(fields)
    }

    if (fields?.length) {
        return (
            <div><div className=' border flex flex-col gap-4 border-gray-200 rounded-lg p-4'>
                {fields?.map((field: Field) => {
                    return <Inputs field={field} />
                })}
            </div>
                <div className=' flex justify-end mt-2'>
                    <button onClick={() => handleSubmit()} className=' rounded-lg bg-teal-900 text-gray-50 cursor-pointer py-2 px-4'>submit</button>
                </div>
            </div>
        )
    }
    return (
        <div className='p-6 rounded-xl text-center text-teal-900/50  border-teal-900 text-xl font-semibold'>Create a form or Import JSON</div>
    )
}

export default FormUI
