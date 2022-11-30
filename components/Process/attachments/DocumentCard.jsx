import Image from 'next/image';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { getAttachment, getAttachmentInfo } from '../../../api/utils';
import PDF from "../../../public/img/pdf.png";
import OTHER from "../../../public/img/other.png";

const DocumentCard = ({ file }) => {

    const envUrl = process.env[process.env.NODE_ENV];
    const [data, setData] = useState(OTHER)
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (file?._id) { 
            setInfo(file) 
            if (file?.fileType?.includes('image')) {
                getAttachment(file?._id)
                    .then(blob => {
                        const objectUrl = URL.createObjectURL(blob);
                        setData(objectUrl);
                    })
                    .catch(file => setData(OTHER))
            }
            else if (file?.fileType === 'application/pdf') setData(PDF)
            else setData(OTHER)
        }
        else { 
            getAttachmentInfo(file).then(response => {
                setInfo(response);
                if (response?.fileType?.includes('image')) {
                    getAttachment(response?._id)
                        .then(blob => {
                            const objectUrl = URL.createObjectURL(blob);
                            setData(objectUrl);
                        })
                        .catch(response => setData(OTHER))
                }
                else if (response?.fileType === 'application/pdf') setData(PDF)
                else setData(OTHER)
            }) 
        }

        
    }, [])

    return (
        <a href={`${envUrl}/utils/attachment/${file?._id ? file?._id : file }`} target='_blank'>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <div style={{ position: 'relative', minWidth: '50px', minHeight: '50px', maxWidth: '150px', maxHeight: '150px' }}>
                    <Image src={data} layout={'fill'} objectFit={'contain'}></Image>
                </div>
                <div className='text-center'><b>{info?.category}</b></div>
            </div>
        </a>
    )
}

export default DocumentCard