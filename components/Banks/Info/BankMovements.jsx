import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Modal from '../../../components/shared/Modal';
import MovementNote from './MovementNote';
import { translateType } from './translateType';

const BankMovements = () => {
    const { movements } = useSelector(state => state.banks.currentBank)
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const [show, setShow] = useState(false)
    const [movement, setMovement] = useState(null)

    const updateShowNote = (data) => {
        setMovement(data)
        setShow(true)
    }

    return (
        <div className='moves-box'>

            <table className="table">
                <thead>
                    {
                        movements?.length == 0
                            ? (
                                <tr>
                                    <th></th>
                                </tr>
                            )
                            : (
                                <tr>
                                    <th className='table-header w-25'>Fecha</th>
                                    <th className='table-header'>Concepto</th>
                                    <th className='table-header'>Tipo</th>
                                    <th className='table-header'>Monto</th>
                                    <th className='table-header'>Saldo Total</th>
                                </tr>
                            )
                    }
                </thead>
                <tbody>
                    {
                        movements?.length == 0
                            ? (
                                <tr className="moves-info d-flex justify-content-center p-4">
                                    <td><h4>Sin Movimientos</h4></td>
                                </tr>
                            )
                            : movements?.map((data, index) => (
                                <tr key={index} className="" onClick={() => updateShowNote(data)}>
                                    <td>{new Date(data.createDate).toLocaleString("en-US")} </td>
                                    <td>{data.concept}</td>
                                    <td>{translateType(data.type)}</td>
                                    <td>{dollarUSLocale.format(data.amount)}</td>
                                    <td>{dollarUSLocale.format(data.amount)}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <Modal title="Nota" show={show} setShow={setShow} fullscreen={false} size={'md'} >
                <MovementNote movement={movement} />
            </Modal>
        </div>
    )
}

export default BankMovements

