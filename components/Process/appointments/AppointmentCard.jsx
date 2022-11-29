import React from 'react'
import { getToken } from '../../../api/token';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { finishTaskProcessAction, verifyAppointmentProcessAction } from './../../../store/actions/processActions';

const AppointmentCard = ({ process, task }) => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const current = useSelector(state => state.processes.currentProcess)
  const currentTask = current?.steps[current?.currentStep - 1]?.tasks.find(x => x.index === task.index)
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

  const verify = async () => {
    const token = getToken()
    if (token) {
      let dataId = currentTask?.data._id;
      dispatch(verifyAppointmentProcessAction(process, dataId))
      toast.success('Updated Successful')
    } else {
      toast.error("Information Failed")
    }
  }
  return (
    <div className=''>
      <div className="card tasks__info__box mb-3">
        <div className='d-flex align-items-center'>
          <h4 className='card-title me-2'>{currentTask.name}</h4>
          {currentTask.isRequired ? <small className='mb-2'>(Obligatorio)</small> : null}
          {currentTask?.status === 'complete' ? <small className='mb-2'><i className='fa-solid fa-check text-success'></i></small> : null}
        </div>
        <div className='d-flex flex-column '>
          <div>
            <label className='me-2'><b>Lugar: </b></label><span>{currentTask?.data?.place}</span><br />
            <label className='me-2'><b>Fecha: </b></label><span>{new Date(currentTask?.data?.date).toLocaleDateString()}</span><br />
            <div className='flex-between mb-3'>
              <div>
                <label className='me-2'><b>Estado: </b></label>
                {
                  currentTask?.data?.attended ?
                    <span className='text-success'>Atendido</span>
                    : <span className='text-danger'>Sin Atender
                    </span>
                }
              </div>
              {currentTask?.data?.attended
                ? null
                : <button type='button' className='btn btn-action-primary' onClick={() => verify()}>Verificar Visita</button>}
            </div>
          </div>
        </div>
        <div className="button__row flex-end">
          {currentTask?.status === 'complete' ? null :
            <button className='btn btn-action-primary' type='button'
              onClick={() => processData()}
              disabled={!currentTask?.data?.attended}>Finalizar Tarea</button>}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard