
'use client'
import React, { useState } from 'react'
import {
  Plus,
} from "lucide-react";
import { useFormStructure } from '../context/FormStructureContext';
import Fields from './Fields';
import AddField from './UI/AddField';




const Formstructure = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { fields, addField, removeField } = useFormStructure();




  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-teal-900 pb-4 my-4 relative">
        <h6 className=' text-lg font-semibold text-teal-900'>Form structure</h6>
        <AddField isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className=' grid gap-2'>
        {fields?.map((field, index) => {
          console.log(field);
          return <Fields type={field?.type} index={index} key={`${field?.id}`} />
        })}
      </div>
    </div>
  )
}

export default Formstructure
