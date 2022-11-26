import React, { useState } from 'react'
import PDF from '../../public/img/pdf.png';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import ProcessTimelineCard from './ProcessTimelineCard';
import { useForm } from 'react-hook-form';
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
import { addTaskProcessAction } from '../../store/actions/processActions';
import AppointmentCard from './appointments/AppointmentCard';

const ProcessInfo = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const process = useSelector(state => state.processes.currentProcess);
  const [currentStep, setCurrentStep] = useState(process?.steps?.filter(step => step.index === process.currentStep)[0])
  const [taskIndex, setTaskIndex] = useState(0)

  const processData = async (data, e) => {
    const token = getToken();
    if (token) {
      console.log(currentStep)
      if (currentStep?.tasks[taskIndex - 1]) {
        const _data = new FormData()

        //show(false)
        toast.success('Updated Successful')
      }
      else {
        const _data = new FormData()
        switch (process?.processTemplate?.steps[process?.currentStep - 1].tasks[taskIndex]?.type) {
          case 'Appointment':
            _data.append('place', 'My New House');
            _data.append('date', new Date());
            _data.append('customer', '6380fdcf5742a2c6ca04a0f1');
            break;
          case '': break;
          case '': break;
        }
        dispatch(addTaskProcessAction(taskIndex, process?.processTemplate?._id, currentStep?._id, _data))
        //show(false)
        toast.success('Uploaded Successful')
      }
    } else {
      toast.error("Information Failed")
    }
  }

  return (
    <div>
      <div className="stepper mt-3">
        <div className="card__steps text-center">
          {
            process?.processTemplate?.steps.map((data, index) => <ProcessTimelineCard key={index} step={data} index={index + 1} currentStep={process?.currentStep} />)
          }
        </div>
      </div>

      <hr />

      <div className="tasks d-flex">
        <div className="tasks__info w-75 p-3">
          {
            process?.processTemplate?.steps[process?.currentStep - 1].tasks?.map((task, tid) => {
              return currentStep?.tasks?.some(x => x.index === task.index)
                ? <AppointmentCard></AppointmentCard>
                :
                <form onSubmit={handleSubmit(processData)} method="post" className=''>
                  <div key={tid} className="card tasks__info__box mb-3">
                    <div className='d-flex align-items-center'>
                      <h4 className='card-title me-2'>{task.name}</h4>
                      {task.isRequired ? <small className='mb-2'>(Obligatorio)</small> : null}
                    </div>
                    <div className="button__row flex-end">
                      <button className='btn btn-action-primary' onClick={() => setTaskIndex(task.index)}>Iniciar</button>
                    </div>
                  </div>
                </form>;
            }
            )
          }
        </div>
        {/* <h4 className='card-title'>Se Recibio Pago de Propiedad <i className='fa-solid fa-check text-success'></i></h4>
            <div className="box__document my-3">
              <Image src={PDF} width={100} height={100} objectFit={'contain'}></Image>
              <div className="card-title">Recibo de Pago</div>
            </div>
            <div className="button__row flex-between">
              <button className='btn btn-action-primary' disabled={true}>Cargar Documento</button>
              <button className='btn btn-action-primary' disabled={true}>Finalizar</button>
            </div> */}
        <div className="comments w-25 p-3">
          <div className="card" style={{ minHeight: '100%' }}>
            <h4 className="card-title">Comentarios</h4>
            <div className="card-footer flex-between">
              <input type="text" className="form-control" placeholder='Dejar comentario...' />
              <button className='btn btn-action-primary'><i className='fa-solid fa-paper-plane'></i></button>
            </div>
          </div>
        </div>
      </div>
      <div className="process__footer flex-end mt-4">
        <button className='btn btn-action-primary'>Finalizar Paso</button>
      </div>
    </div>
  )
}

export default ProcessInfo