import React from 'react'
import { Field } from '../context/FormStructureContext'

const Inputs = ({ field }: { field: Field }) => {

    if (field?.type == 'group') {
        return <div className='outline pl-2'>
            {field?.type}
            {field?.children?.map((item) => {
                return <Inputs field={item} />
            })}
        </div>
    }
    return (
        <div className='outline pl-2'>
            {field?.type}
        </div>
    )
}

export default Inputs
