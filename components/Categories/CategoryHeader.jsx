import React, { useState } from 'react'
import { CategoryForm } from './CategoryForm'
import ModalProp from '../shared/Modal'

const CategoryHeader = () => {
    const [show, setShow] = useState(false)

    const updateShow = (_show) => setShow(_show)

    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <div>
                        <h2><b>Categorías de doucumentos</b></h2>
                        <p>Registro y Consulta de Categorias</p>
                        <div className="alert alert-info" role="alert">
                            Este apartado funcionara para dar nombre a las categorias de los documentos que se cargaran a lo largo del sistema.
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Agregar Categoría</button>
                    </div>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>

            <ModalProp title="Nueva Categoria" show={show} setShow={setShow}>
                <CategoryForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default CategoryHeader;
