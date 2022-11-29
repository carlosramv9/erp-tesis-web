import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getToken } from '../../../api/token';
import { finishTaskProcessAction } from '../../../store/actions/processActions';
import { toast } from "react-toastify";
import Modal from '../../shared/Modal'
import { useState, useEffect } from 'react';
import ContractForm from './ContractForm';
import DocumentCard from './../attachments/DocumentCard';
import { getAttachmentInfo } from '../../../api/utils';

const ContractCard = ({ process, task }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const current = useSelector(state => state.processes.currentProcess)
    const currentTask = current?.steps[current?.currentStep - 1]?.tasks.find(x => x.index === task.index)
    const [showModal, setShowModal] = useState(false)
    const [file, setFile] = useState(null)

    const processData = async () => {
        const token = getToken();
        if (token) {
            dispatch(finishTaskProcessAction(process, currentTask._id))
            //show(false)
            toast.success('Finished Successful')
        } else {
            toast.error("Information Failed")
        }
    }
    return (
        <form method="post" className=''>
            <div className="card tasks__info__box mb-3">
                <div className='d-flex align-items-center'>
                    <h4 className='card-title me-2'>{currentTask.name}</h4>
                    {currentTask.isRequired ? <small className='mb-2'>(Obligatorio)</small> : null}
                    {currentTask?.status === 'complete' ? <small className='mb-2'><i className='fa-solid fa-check text-success'></i></small> : null}
                </div>
                <div className='d-flex flex-column '>
                    <div className='row my-3'>
                        <div className='col-md-3 my-2'>
                            <DocumentCard file={currentTask?.data.file} />
                        </div>
                    </div>
                </div>
                <div className="button__row flex-end">
                    {
                        currentTask?.status === 'complete'
                            ? null
                            : <button type='button' className='btn btn-action-primary'
                                disabled={currentTask?.data && task.isRequired}
                                onClick={() => processData()}>Finalizar Tarea</button>
                    }
                </div>
            </div>

            <Modal title="Agregar Archivo" show={showModal} setShow={setShowModal}>
                <ContractForm setShow={setShowModal} task={task} />
            </Modal>
        </form>
    )
}

export default ContractCard