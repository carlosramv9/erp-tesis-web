import React, { useState } from 'react'
import { getToken } from '../../../api/token';
import dayjs from 'dayjs';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Dropzone from '../../shared/Dropzone';
import Image from 'next/image';
import PDF from "../../../public/img/pdf.png";
import OTHER from "../../../public/img/other.png";
import { addTaskProcessAction, updateTaskProcessAction } from '../../../store/actions/processActions';

const AttachmentForm = ({ task, setShow }) => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categories.categories)
    const process = useSelector(state => state.processes.currentProcess)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [documents, setDocuments] = useState([])

    const onChange = (acceptedFiles) => {
        Array.from(acceptedFiles)?.forEach((file) => {
            var reader = new FileReader()

            reader.onload = e => {
                if (file.type === 'image/jpeg' || file.type === 'image/png')
                    setDocuments([...documents, { img: e.target.result, name: file.name, category: categoriesList[0]?.name, data: file }])
                else if (file.type === 'application/pdf')
                    setDocuments([...documents, { img: PDF, name: file.name, category: categoriesList[0]?.name, data: file }])
                else {
                    setDocuments([...documents, { img: OTHER, name: file.name, category: categoriesList[0]?.name, data: file }])
                }
            }

            reader.readAsDataURL(file)
        });
    }

    const onDelete = (indexToDelete) => {
        const newFields = documents.filter((d, index) => index !== indexToDelete);
        setDocuments([...newFields]);
    };

    const modifyCategory = (event, indexParent) => {
        const newData = documents.map((d, index) => {
            if (index === indexParent) {
                d[event.target.name] = event.target.value;
            }
            return d;
        });
        setDocuments([...newData]);
    }

    const processData = async () => {
        const token = getToken();
        if (token) {
            let currentTask = process?.steps[process?.currentStep - 1]?.tasks?.find(res => res.index === task.index)
            if (currentTask?.attachments?.length > 0) {
                if (documents) {
                    const _data = new FormData()
                    documents?.forEach((file) => _data.append("taskFile", file.data))

                    dispatch(updateTaskProcessAction(process?._id, currentTask?._id, _data))
                    setShow(false)
                    toast.success('Updated Successful')
                }
                setDocuments([])
            }
            else {
                if (documents) {
                    const _data = new FormData()
                    documents?.forEach((file) => _data.append("taskFile", file.data))

                    let stepId = process?.steps?.filter(step => step.index === process.currentStep)[0]?._id
                    dispatch(addTaskProcessAction(process?._id, task?.index, process?.processTemplate?._id, stepId, _data))
                    setShow(false)
                    toast.success('Uploaded Successful')
                }
                setDocuments([])
            }
        } else {
            toast.error("Information Failed")
        }

        //e.target.reset();
    }
    return (
        <form >
            <div className='flex-center'>
                <Dropzone
                    multiple={false}
                    className="col-md-8 col-sm-12"
                    title='Arrastra los documentos para expediente aquí, o presiona para cargar'
                    icon="bi bi-cloud-arrow-up-fill"
                    onChange={(files) => onChange(files, true)}
                />
            </div>
            <hr />
            <div className='flex-center mt-3 flex-wrap'>
                {
                    /// Documentos que se cargaran al inversionista  ///
                    documents?.map((data, index) => {
                        return <div key={index} className='mx-3 mt-2 flex-center flex-column align-items-center'>
                            <div className='boxImagesToLoad'>
                                <div className='boxImagesToLoad_courtain'>
                                    <p className='mb-2 text-white'>{data.name}</p>
                                    <button type='button' className='boxImagesToLoad_courtain_delete' onClick={() => onDelete(index)}><i className='fa-solid fa-trash'></i></button>
                                </div>
                                <Image src={data.img} alt='' layout='fill' objectFit='cover' ></Image>
                            </div>
                            <button type='button' className='d-xl-none boxImagesToLoad_courtain_delete-sm' onClick={() => onDelete(index)}><i className='fa-solid fa-trash'></i></button>
                        </div>
                    })
                }

            </div>

            {documents.length ? <div className='flex-end mt-3'><button type='button' className='btn btn-action-primary' onClick={async () => await processData()}>Guardar</button></div> : null}

        </form>
    )
}

export default AttachmentForm