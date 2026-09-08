import React, { useEffect, useState } from 'react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import Inputs from './Inputs';
import { clearValues, getAllValues } from '../formState/formValues';
import { validateAll } from '../formState/formValidator';

const FormUI = () => {

    const { fields, } = useFormStructure();

    const [error, setError] = useState<Record<string, string>>({})

    // useEffect(() => {
    //     console.log('field change');
    //     clearValues()
    // }, [fields])

    function handleSubmit() {


        setError(validateAll(fields)?.errors)
        if (validateAll(fields)?.allValid) {
            alert(
                'Form submitted successfully! 🎉\n\n' +
                'Looks like we’re off to a good start — let’s work together! 🚀\n\n' +
                JSON.stringify(getAllValues(), null, 2)
            ); console.log(getAllValues(), 'submitted succesfully!!!!!!!!!!!!')
        }


    }

    if (fields?.length) {
        return (
            <div className='p-4 rounded-lg bg-teal-900/2 shadow-lg'>
                <div className=' border flex flex-col gap-4 border-gray-200 rounded-lg p-4'>
                    {fields?.map((field: Field) => {
                        return <Inputs key={field?.id} inputError={error} path={[field.label]} field={field} />
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
