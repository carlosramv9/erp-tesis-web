import React from 'react'
import PDF from '../../public/img/pdf.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import ProcessTimelineCard from './ProcessTimelineCard';

const ProcessInfo = () => {
  const process = useSelector(state => state.processes.currentProcess)
  return (
    <div>
      <div className="stepper mt-3">
        <div className="card__steps text-center">
          {
            process?.processTemplate?.steps.map((data, index) => <ProcessTimelineCard key={index} step={data} index={index + 1} currentStep={process?.currentStep} />)
          }
          {/* <div className="card__steps__step d-flex flex-column align-items-center ">
            <div className="card__steps__step--box active mb-2"></div>
            <span className='text-center'>CITA</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>DOCUMENTACION</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>APARTADO</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>AVALUO</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>NOTARIA</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>FIRMA</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box  mb-2"></div>
            <span className='text-center'>FACTURACION</span>
          </div>
          <div className="card__steps__step d-flex flex-column align-items-center">
            <div className="card__steps__step--box mb-2"></div>
            <span className='text-center'>PAGO</span>
          </div> */}
        </div>
      </div>
      
      <hr />

      <div className="tasks d-flex">
        <div className="tasks__info w-75 p-3">
          <div className="card tasks__info__box">
            {/* <h4 className='card-title'>Se Recibio Pago de Propiedad <i className='fa-solid fa-check text-success'></i></h4>
            <div className="box__document my-3">
              <Image src={PDF} width={100} height={100} objectFit={'contain'}></Image>
              <div className="card-title">Recibo de Pago</div>
            </div>
            <div className="button__row flex-between">
              <button className='btn btn-action-primary' disabled={true}>Cargar Documento</button>
              <button className='btn btn-action-primary' disabled={true}>Finalizar</button>
            </div> */}
            <h4 className='card-title'>Cita con el cliente</h4>
            
            <div className="button__row flex-end">
              <button className='btn btn-action-primary' disabled={false}>Iniciar</button>
            </div>
          </div>
        </div>
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