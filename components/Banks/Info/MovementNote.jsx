import React from 'react'
import { translateBankOperations, translateType } from '../../../utilities/translateLabel';

const MovementNote = ({ movement }) => {
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });
    return (
        <div>
            <div className='d-flex justify-content-between mt-2 mb-3'>
                <span>Tipo de Movimiento</span>
                <span>{translateType(movement.type)}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Fecha de Creación</span>
                <span>{new Date(movement.createDate).toLocaleString("en-US")}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Creado por</span>
                <span>{movement.createdBy.firstName} {movement.createdBy.lastName}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Concepto</span>
                <p>{movement.concept}</p>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Saldo Anterior</span>
                <span>{dollarUSLocale.format(movement.amountBefore)}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Cantidad</span>
                <span>{dollarUSLocale.format(movement.amount)}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Saldo Posterior</span>
                <span>{dollarUSLocale.format(movement.amountAfter)}</span>
            </div>
            <div className='d-flex justify-content-between my-2'>
                <span>Estado</span>
                <span>{translateBankOperations(movement.moveStatus)}</span>
            </div>
            <div className='mb-2 mt-3'>
                <span><b>Observaciones:</b></span>
                <p className='mt-3'>{movement.description}</p>
            </div>
        </div>
    )
}

export default MovementNote