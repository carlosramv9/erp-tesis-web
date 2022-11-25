import React, { useState } from 'react'
import PDF from '../../public/img/pdf.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import ProcessTimelineCard from './ProcessTimelineCard';

const ProcessInfo = () => {
  const process = useSelector(state => state.processes.currentProcess);
  const [currentStep, setCurrentStep] = useState(process?.steps?.filter(step => step.index === process.currentStep))

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
              return !currentStep?.tasks?.some(x => x.index === (tid + 1))
                ? <div key={tid} className="card tasks__info__box mb-3">
                  <div className='d-flex align-items-center'>
                    <h4 className='card-title me-2'>{task.name}</h4>
                    {task.isRequired ? <small className='mb-2'>(Obligatorio)</small> : null}
                  </div>
                  <div className="button__row flex-end">
                    <button className='btn btn-action-primary' disabled={false}>Iniciar</button>
                  </div>
                </div>
                : null;
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