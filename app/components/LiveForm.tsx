'use client'
import { Check, Code2, Copy, Import } from 'lucide-react'
import React, { useState } from 'react'
import { Modal } from './UI/Modal'
import { useFormStructure } from '../context/FormStructureContext'
import { isValidJson, toJson } from '../utils/helpers'
import FormUI from './FormUI'

const LiveForm = () => {
    const [openExportModal, setOpenExportModal] = useState(false);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [json, setJson] = useState('')

    const { fields, setFields } = useFormStructure();

    const [copied, setCopied] = useState(false);


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(toJson(fields));
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    const handleImportJson = () => {
        if (!isValidJson(json)) {
            alert('Invalid JSON');
            return
        }
        setFields(JSON.parse(json));
        setOpenImportModal(false)
    }
    return (
        <div className='  w-1/2'>
            <div className="flex  justify-between items-center border-b-2 border-teal-900 pb-4 my-4 relative">
                <h6 className=' text-lg font-semibold text-teal-900'>Live Form</h6>
                <div className='flex text-sm gap-4'>
                    <button onClick={() => setOpenImportModal(true)} className="flex border border-teal-900 text-teal-900 rounded-lg p-2 cursor-pointer items-center gap-1"> <Import /> Import JSON</button>

                    <button onClick={() => setOpenExportModal(true)} className="flex border border-teal-900 text-teal-900 rounded-lg p-2 cursor-pointer items-center gap-1"> <Code2 /> Export JSON</button>
                </div>

            </div>
            <FormUI />

            <Modal isOpen={openExportModal} onClose={() => setOpenExportModal(false)} title="Export JSON">
                <button
                    onClick={handleCopy}
                    className='text-xs cursor-pointer px-2 mb-2 py-1 rounded bg-teal-900/20 hover:bg-teal-900/30'
                >
                    {copied ? <div className='flex items-center gap-1'> <Check size={12} /> Copied</div> : <div className='flex items-center gap-1'> <Copy size={12} /> Copy</div>}
                </button>
                <div className='p-2 rounded-lg max-h-[60vh] overflow-y-auto bg-teal-900/10'>
                    <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
                        {toJson(fields)}
                    </pre>
                </div>
            </Modal>

            <Modal isOpen={openImportModal} onClose={() => setOpenImportModal(false)} title="Import JSON">
                <textarea value={json} onChange={(e) => setJson(e?.target?.value)} placeholder='Paste jSON here' className=' min-h-[500px] bg-teal-900/10 w-full p-2 rounded-lg'></textarea>
                <button onClick={() => handleImportJson()} className='bg-teal-950 p-2 text-gray-50 rounded cursor-pointer w-full '>Submit</button>

            </Modal>
        </div>
    )
}

export default LiveForm
