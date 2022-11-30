import React from 'react'
import { getToken } from '../../api/token';
import { deleteFileAction, setDefaultImageAction, setPublicImageAction } from '../../store/actions/propertyActions';
import Modal from '../shared/Modal'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PDF from '../../public/img/pdf.png'
import Other from '../../public/img/other.png'
import { getAttachment } from '../../api/utils';

const DocumentConfig = ({ file, show, setShow, id, status }) => {
    const envUrl = process.env[process.env.NODE_ENV];
    const dispatch = useDispatch();
    var [image, setImage] = useState(Other)

    useEffect(() => {
        if (file.file.fileType === 'application/pdf') setImage(PDF)
        if (file.file.fileType.includes('image')) {
            getAttachment(file.file._id)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(Other))
        }
        else setImage(Other)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const setDefaultImage = (_id) => {
        const token = getToken();
        if (token) {
            const _data = {
                id: _id
            }
            dispatch(setDefaultImageAction(id, _data))

            setShow(false)
            toast.success('Uploaded Successful')

        } else {
            toast.error("Information Failed")
        }
    }

    const setPublicImage = (_id) => {
        const token = getToken();
        if (token) {
            const _data = {
                id: _id
            }
            dispatch(setPublicImageAction(id, _data))

            setShow(false)
            toast.success('Uploaded Successful')

        } else {
            toast.error("Information Failed")
        }
    }

    const deleteFile = (_id) => {
        const token = getToken();
        if (token) {
            const _data = {
                id: _id
            }
            dispatch(deleteFileAction(id, _data))

            setShow(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information Failed")
        }
    }

    const downloadFile = (filename) => {
        const url = envUrl + '/' + filename;
        const link = document.createElement('a');
        link.href = url;
        link.target = "_blank"
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
    }

    return (
        <Modal title={file.file.category === 'undefined' ? 'Sin Categoria' : file.file.category} show={show} setShow={setShow} size={'md'}>
            <div className="row">
                <div className="box-cover">
                    <Image src={image} className="box-cover-image col-10 m-auto" alt="" layout="fill" />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="row mt-3 justify-content-center">
                        {
                            file.file.fileType.includes('image') && !status ?
                                (
                                    <>
                                        <button className="btn btn-action-primary mx-2 col-6" onClick={() => setDefaultImage(file._id)}>Asignar Imagen de Portada</button>
                                    </>
                                )
                                : (<div></div>)
                        }
                        <button className='btn btn-action-info col-6 my-2'><a href={`${envUrl}/utils/attachment/${file?.file?._id}`} target={'_blank'} rel='noreferrer'>Abrir</a></button>
                        <button className="btn btn-action-warning mx-2 col-6" onClick={() => deleteFile(file._id)}>Eliminar</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DocumentConfig