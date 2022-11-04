import Image from 'next/image';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DocumentConfig from './DocumentConfig';
import PDF from '../../public/img/pdf.png'
import Other from '../../public/img/other.png'
import { getAttachment } from '../../api/utils';

const CardDocument = ({ att, category, id, status }) => {
    const envUrl = process.env[process.env.NODE_ENV];
    var [image, setImage] = useState(Other)
    var [show, setShow] = useState(false)

    useEffect(() => {
        if (att.file.fileType === 'application/pdf') setImage(PDF)
        else if (att.file.fileType.includes('image')) {
            getAttachment(att.file._id)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(Other))
        }
        else setImage(Other)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <div className="container_img_repo" onClick={() => setShow(true)} >
                {
                    image && (<Image src={image} alt="" layout="fill" className="pt-2" />)
                }
            </div>
            <div className='d-flex'>
                <h4 className="">{category.name}</h4>
                    {
                        att.isPublic
                            ? (
                                <span className="mx-2">
                                    <i className="bi bi-check-circle-fill my-auto" style={{ color: 'green', fontSize: '18px' }}></i>
                                </span>)
                            : (<></>)
                    }
                    {
                        status
                            ? (
                                <h6><span className="badge rounded-pill bg-info text-dark ms-2">Portada</span></h6>
                            )
                            : (<></>)
                    }
                
            </div>
            <p>Fecha de Carga: {new Date(att.releaseDate).getUTCDate() + "/" + (new Date(att.releaseDate).getUTCMonth() + 1) + "/" + new Date(att.releaseDate).getUTCFullYear()}</p>

            <DocumentConfig file={att} show={show} setShow={setShow} id={id} status={status} />
        </div>
    )
}

export default CardDocument