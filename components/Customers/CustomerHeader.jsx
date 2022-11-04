import React, { useEffect, useState } from 'react'
import { CustomerForm } from './CustomerForm'
import ModalProp from '../shared/Modal'
import { getCustomersAction } from '../../store/actions/customerActions';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../shared/Paginator';

const CustomerHeader = () => {
    const [show, setShow] = useState(false)

    const updateShow = (_show) => setShow(_show)
    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <h2><b></b>Clientes</h2>
                    <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Nuevo Cliente</button>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>

            <ModalProp title="Nuevo Cliente" show={show} setShow={updateShow} fullscreen={true} >
                <CustomerForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default CustomerHeader;
