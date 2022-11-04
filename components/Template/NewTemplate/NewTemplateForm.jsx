import React from 'react'
import { useSelector } from 'react-redux';

const NewTemplateForm = ({setProcessTemplate, processTemplate, saveNewTemplate, updateTemplate, isReady}) => {

    const currentTemplate = useSelector(state => state.templates.currentTemplate);
    const updateState = async e =>{
        setProcessTemplate({ ...processTemplate, [e.target.name]: e.target.value})    
    }
  return (
        <div className='new-template_form mx-2 w-100 card shadow p-4 d-flex flex-row justify-content-start align-items-center'>
            <div className='d-flex flex-column w-75'>
                <div className='d-flex align-items-center w-75 mb-4'>
                    <label className='input-label new-template_label'> Nombre</label> 
                    <input name='name' type="text" className='form-control' defaultValue={currentTemplate? currentTemplate.name:null} onChange={updateState}></input>
                </div>
                <div className='d-flex align-items-center w-75 mb-4'>
                    <label className='input-label new-template_label'> Tipo de proceso </label> 
                    <select className="form-select" aria-label="Default select example"  value={currentTemplate? processTemplate.type:null} name='type' onChange={updateState}>
                        <option defaultValue=''>Selecciona un tipo</option>
                        <option value="new">Casa Nueva</option>
                        <option value="used">Casa Usada</option>
                    </select>
                </div>
                <div className='d-flex align-items-center w-75 mb-4'>
                    <label className='input-label new-template_label'> Metodo de Pago</label> 
                    <select className="form-select" aria-label="Default select example"  defaultValue="" name='paymentMethod' value={currentTemplate? processTemplate.paymentMethod:null} onChange={updateState}>
                        <option defaultValue=''>Selecciona el tipo de pago</option>
                        <option value="credit">Contado</option>
                        <option value="counted">Credito</option>
                        <option value="mix">Mixto</option>
                    </select>
                </div>
            </div>
            <div className='w-25 d-flex flex-column align-items-center'>
                {   currentTemplate?._id
                    ?<button className='btn btn-primary p-4' onClick={()=>updateTemplate()} disabled={!isReady}><i style={{fontSize:'40px'}} className="bi bi-arrow-repeat"/></button>
                    :<button className='btn btn-primary p-4' onClick={()=>saveNewTemplate()} disabled={!isReady}><i style={{fontSize:'40px'}} className="bi bi-save"/></button>
                    }
                {
                    currentTemplate?._id
                    ?<h3>Actualizar</h3>
                    :<h3>Guardar</h3>
                }
            </div>
        </div>
  )
}

export default NewTemplateForm