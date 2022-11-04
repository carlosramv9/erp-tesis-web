import React, { useState } from 'react'
import { BankCreditForm } from './BankCreditForm'
import ModalProp from '../shared/Modal'

const BankCreditHeader = () => {
    const [show, setShow] = useState(false)

    const updateShow = (_show) => setShow(_show)

    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <div>
                        <h2><b>Créditos Bancarios</b></h2>
                        <p>Registro y Consulta de créditos</p>
                    </div>
                    <div>
                        <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Agregar Crédito</button>
                    </div>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>

            <ModalProp title="Nuevo Crédito" show={show} setShow={setShow}>
                <BankCreditForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default BankCreditHeader;
