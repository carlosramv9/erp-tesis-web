import React, { useState } from 'react'
import ModalProp from '../shared/Modal'
import { PropertySaleForm } from './PropertySaleForm'
import { PropertyDevelopmentForm } from './PropertyDevForm';

const PropertyHeader = ({ type }) => {
    const [show, setShow] = useState(false)

    const updateShow = (_show) => setShow(_show)

    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between flex-column flex-md-row'>
                    <h2><b></b>Propiedades</h2>
                    <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Nuevo Inmueble</button>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>

            <ModalProp title="Nueva Propiedad" show={show} setShow={setShow} fullscreen={true} >
                <PropertyTypeForm show={updateShow} type={type} />
            </ModalProp>
        </div>
    )
}

export default PropertyHeader;

const PropertyTypeForm = ({ type, show }) => {
    switch (type) {
        case 'sale':
            return (<PropertySaleForm type={type} show={show} />)
        case 'development':
            return (<PropertyDevelopmentForm type={type} show={show} />)
        default:
            return (<PropertySaleForm type={type} show={show} />)
    }
}