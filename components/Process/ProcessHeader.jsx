import React,{useState} from 'react'
import Modal from '../shared/Modal'
const ProcessHeader = () => {
    const [show, setShow] = useState(false)  
  return(
    <div className='mb-4'>
        <div className='d-flex flex-column'>
            <div className='d-flex flex-between'>
                <h2><b></b>Procesos de Venta</h2>
                <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Nueva Venta</button>
            </div>
            <div className='d-flex flex-between'>
                
                
            </div>                
        </div>
        <Modal title="Iniciar Nueva Venta" show={show} setShow={setShow}>
           
        </Modal>
    </div>
  )
};

export default ProcessHeader;
