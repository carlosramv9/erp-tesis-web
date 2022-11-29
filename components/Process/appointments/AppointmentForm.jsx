import React from 'react'
import Required from '../../shared/Required'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { toast } from "react-toastify";
import { addTaskProcessAction } from '../../../store/actions/processActions';
import { getToken } from '../../../api/token';

const AppointmentForm = ({ task, setShow }) => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const process = useSelector(state => state.processes.currentProcess);

  const processData = async (data, e) => {
    const token = getToken();
    if (token) {
      if (task.data) {
        const _data = new FormData()
        //show(false)
        toast.success('Updated Successful')
      }
      else {
        const _data = new FormData()
        _data.append('place', data?.place);
        _data.append('date', data?.date);
        _data.append('customer', process?.customer?._id);

        let stepId = process?.steps?.filter(step => step.index === process.currentStep)[0]?._id
        dispatch(addTaskProcessAction(process?._id, task?.index, process?.processTemplate?._id, stepId, _data))
        setShow(false)
        toast.success('Uploaded Successful')
      }
    } else {
      toast.error("Information Failed")
    }
  }
  return (
    <form onSubmit={handleSubmit(processData)} method="post" className=''>
      <div className="mb-3">
        <Required />
      </div>
      <div className='d-flex flex-between w-100'>
        <div className='d-flex flex-column w-100 me-2'>
          <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>  Dirección o lugar de encuentro</label>
          <textarea rows={2} className="form-control" name='place'
            defaultValue={task?.data ? task?.data?.place : null} placeholder=''
            {...register("place", task?.data ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' } })} />
          <span className='text-danger text-small d-block mb-2'>{errors?.place?.message}</span>
        </div>
      </div>
      <div className='d-flex flex-between w-100 mt-3'>
        <div className='d-flex flex-column w-100'>
          <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>  Fecha Programada de Visita</label>
          <input name='date' type="date" placeholder='Fecha de Visita' defaultValue={dayjs().format('YYYY-MM-DD')} min={dayjs().format('YYYY-MM-DD')} className='form-control my-2 w-25' {...register("date")} />
          <span className='text-danger text-small d-block mb-2'>{errors?.date?.message}</span>
        </div>
      </div>
      <div className="flex-end">
        <button type='submit' className='btn btn-action-primary'>Enviar</button>
      </div>
    </form>
  )
}

export default AppointmentForm