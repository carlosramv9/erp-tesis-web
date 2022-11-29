import React, { useEffect, useState } from 'react'
import PDF from '../../public/img/pdf.png';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import ProcessTimelineCard from './ProcessTimelineCard';
import { useForm } from 'react-hook-form';
import AppointmentCard from './appointments/AppointmentCard';
import Modal from '../shared/Modal'
import AppointmentForm from './appointments/AppointmentForm';
import AttachmentForm from './attachments/AttachmentForm';
import AttachmentCard from './attachments/AttachmentCard';
import ContractForm from './contracts/ContractForm';
import ContractCard from './contracts/ContractCard';
import { getToken } from '../../api/token';
import { nextStepProcessAction, createCommentStepProcessAction, activeProcessAction, cancelProcessAction } from './../../store/actions/processActions';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const ProcessInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
  const process = useSelector(state => state.processes.currentProcess);
  const [taskIndex, setTaskIndex] = useState(null)
  const [showAppointment, setShowAppointment] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [showContract, setShowContract] = useState(false)


  const getViewOperation = (task) => {
    switch (task.type) {
      case 'Appointment':
        return <AppointmentCard process={process?._id} task={task} />
      case 'Attachment':
        return <AttachmentCard process={process?._id} task={task} />
      case 'Contract':
        return <ContractCard process={process?._id} task={task} />
      default:
        break;
    }
  }

  const openModalOperation = (type) => {
    if (type === 'Appointment') setShowAppointment(true)
    if (type === 'Attachment') setShowAttachments(true)
    if (type === 'Contract') setShowContract(true)
  }

  const verifyRequired = () => {
    const indexes = process?.processTemplate?.steps[process?.currentStep - 1].tasks.filter(x => x.isRequired).map(x => x.index)
    let result = true;

    indexes?.forEach(x => {
      if (!process?.steps[process?.currentStep - 1]?.tasks?.some(y => y.index === x && y.status === 'complete'))
        result = false;
    })

    return result;
  }

  const verifyProcessComplete = () => {
    let result = true;
    let steps = process?.processTemplate?.steps.filter(x => x.index < process?.totalSteps);
    console.log(process?.currentStep === process?.totalSteps)
    console.log(verifyRequired())
    console.log(process?.currentStep === process?.totalSteps && verifyRequired())

    if (process?.currentStep === process?.totalSteps && verifyRequired()) {
      steps?.forEach(template => {
        if (!process?.steps?.some(step => step.index === template.index && step.status === 'complete')) {
          result = false
        }
      })
    } else {
      result = false
    }
    return result
  }

  const processData = async () => {
    const token = getToken();
    if (token) {
      if (!verifyProcessComplete() && process?.currentStep === process?.totalSteps) {
        if (!confirm('Existen Tareas Obligatorias Pendientes. ¿Desea Continuar?'))
          return
      }

      dispatch(nextStepProcessAction(process?._id))
      //show(false)
      toast.success('Finished Successful')

      if (process?.currentStep === process?.totalSteps) {
        router.push('/process')
      }
    } else {
      toast.error("Information Failed")
    }
  }

  const processActiveData = async () => {
    const token = getToken();
    if (token) {
      dispatch(activeProcessAction(process?._id))
      //show(false)
      toast.success('Activated Successful')

      if (process?.currentStep === process?.totalSteps) {
        router.push('/process')
      }
    } else {
      toast.error("Information Failed")
    }
  }

  const processCancelData = async () => {
    const token = getToken();
    if (token) {
      dispatch(cancelProcessAction(process?._id))
      //show(false)
      toast.success('Canceled Successful')

      router.push('/process')

    } else {
      toast.error("Information Failed")
    }
  }

  const processCommentData = async (stepId) => {
    const token = getToken();
    if (token) {
      const data = {
        comment: getValues('comment')
      }
      dispatch(createCommentStepProcessAction(process?._id, stepId, data))
      reset({ comment: '' })
      //show(false)
    } else {
      toast.error("Information Failed")
    }
  }

  return (
    <div className=''>
      <div className="stepper mt-3">
        <ProcessTimelineCard process={process} />
      </div>

      <hr />

      <div className="tasks row">
        <div className="tasks__info col-md-8 col-sm-12 p-3">
          {
            process?.processTemplate?.steps[process?.currentStep - 1]?.tasks?.map((task, tid) => {
              return process?.steps?.filter(step => step.index === process.currentStep)[0]?.tasks?.some(x => x.index === task.index)
                ?
                <div key={tid}>{getViewOperation(task)}</div>
                :
                <div key={tid} className=''>
                  <div className="card tasks__info__box mb-3">
                    <div className='d-flex align-items-center'>
                      <h4 className='card-title me-2'>{task.name}</h4>
                      {task.isRequired ? <small className='mb-2'>(Obligatorio)</small> : null}
                    </div>
                    <div className="button__row flex-end">
                      {
                        process?.status === 'finished' ? null :
                          <button type={'button'} className='btn btn-action-primary'
                            onClick={() => {
                              setTaskIndex(task);
                              openModalOperation(task?.type);
                            }}
                          >Iniciar</button>
                      }
                    </div>
                  </div>
                </div>;
            })
          }
        </div>
        <div className="comments col-md-4 col-sm-12 p-3">
          <div className="card" style={{ minHeight: '100%' }}>
            <h4 className="card-title">Comentarios</h4>
            <div className="comments__box">
              {
                process?.steps?.find(step => step.index === process.currentStep)?.comments?.map((comment, index) =>
                  <div className="comments__line" key={index}>
                    <div><span className='comments__line__user'>{comment?.user?.firstName + ' ' + comment?.user?.lastName}</span>: {comment?.comment}</div>
                  </div>
                )
              }
            </div>
            <div className="comments__input">
              <hr className='mt-3' />
              <input type="text" className="form-control col-md-5 col-sm-8 mb-3" placeholder='Dejar comentario...' {...register('comment')} />
              <button type='button' className='btn btn-action-primary col-md-4 col-sm-12 w-100' onClick={() => processCommentData(process?.steps[process?.currentStep - 1]?._id)}><i className='fa-solid fa-paper-plane'></i></button>
            </div>
          </div>
        </div>
      </div>
      {
        process?.status === 'finished'
          ?
          <div className="process__footer flex-end my-4">
            <button className='btn btn-action-primary'
              onClick={() => processActiveData()}>Activar Proceso</button>
          </div>
          :
          <div className="process__footer flex-end my-4">
            <button className='btn btn-action-danger' onClick={() => processCancelData()}>Cancelar Proceso</button>
            <button className='btn btn-action-primary' onClick={() => processData()}>Finalizar Paso</button>
          </div>
      }
      <Modal title="Nueva Cita" show={showAppointment} setShow={setShowAppointment}>
        <AppointmentForm setShow={setShowAppointment} task={taskIndex} />
      </Modal>

      <Modal title="Agregar Archivo" show={showAttachments} setShow={setShowAttachments}>
        <AttachmentForm setShow={setShowAttachments} task={taskIndex} />
      </Modal>

      <Modal title="Agregar Contrato" show={showContract} setShow={setShowContract}>
        <ContractForm setShow={setShowContract} task={taskIndex} />
      </Modal>
    </div>
  )
}

export default ProcessInfo