'use client'
import { Code2 } from 'lucide-react'
import React, { useState } from 'react'
import { Modal } from './UI/Modal'
import { useFormStructure } from '../context/FormStructureContext'
import { toJson } from '../utils/helpers'

const LiveForm = () => {
    const [openExportModal, setOpenExportModal] = useState(false)
    const { fields } = useFormStructure();

    return (
        <div className='  w-1/2'>
            <div className="flex  justify-between items-center border-b-2 border-teal-900 pb-4 my-4 relative">
                <h6 className=' text-lg font-semibold text-teal-900'>Live Form</h6>
                <div className='dlex gap-4'>
                    <button onClick={() => setOpenExportModal(true)} className="flex border border-teal-900 text-teal-900 rounded-lg p-2 cursor-pointer items-center gap-1"> <Code2 /> Export JSON</button>
                </div>

            </div>


            <Modal isOpen={openExportModal} onClose={() => setOpenExportModal(false)} title="Export JSON">
                <div className='p-2 rounded-lg bg-teal-900/10'>{toJson(fields)}</div>

            </Modal>
        </div>
    )
}

export default LiveForm
