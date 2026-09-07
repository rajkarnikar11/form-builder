import React from 'react'
import { Field, useFormStructure } from '../context/FormStructureContext';
import Inputs from './Inputs';

const FormUI = () => {

    const { fields, } = useFormStructure();

    console.log(fields, 'fields')

    return (
        <div className=' border flex flex-col gap-2 border-gray-200 rounded-lg p-2'>
            {fields?.map((field: Field) => {
                return <Inputs field={field} />
            })}
        </div>
    )
}

export default FormUI
