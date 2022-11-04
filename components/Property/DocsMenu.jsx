import React from 'react'
import { useUpload } from './../../hooks/useUpload';

export const DocsMenu = ({ show, setShow }) => {
    const { DropzoneBox, onSubmit } = useUpload()

    return (
        <div className={show ? 'documents show' : 'documents'}>
            <div className="documents_back" onClick={() => setShow(!show)} ></div>
            <div className="documents_header ">
                <div className='d-flex justify-content-end my-auto'>
                    <button className='btn-close p-3 my-auto' onClick={() => setShow(!show)} />
                </div>
                <hr className='m-0'/>
            </div>
            <div className="documents_dropzone">
                <DropzoneBox 
                    title={'Arrastra los documentos para expediente aquí, o presiona para cargar'} 
                    icon="bi bi-cloud-arrow-up-fill"
                    multiple={true}
                    className={'m-4 bg-light text-secondary'}
                />
            </div>
            <hr />
            <div className="documents_body">

            </div>
        </div>
    )
}
