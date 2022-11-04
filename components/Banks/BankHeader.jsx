import React, { useEffect, useState } from 'react'
import { BankForm } from './BankForm'
import ModalProp from '../shared/Modal'
import { getBanksAction } from '../../store/actions/bankActions';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../shared/Paginator';

const BankHeader = () => {
    const [show, setShow] = useState(false)

    const updateShow = (_show) => setShow(_show)
    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <h2><b></b>Bancos</h2>
                    <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Agregar Banco</button>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>

            <ModalProp title="Agregar Banco" show={show} setShow={updateShow} fullscreen={false} >
                <BankForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default BankHeader;
