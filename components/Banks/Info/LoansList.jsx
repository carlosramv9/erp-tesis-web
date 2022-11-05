import React from 'react'
import { useEffect, useState } from 'react';
import { getBankPendantsApi } from '../../../api/banks';
import { useSelector } from 'react-redux';
import { translateType } from '../../../utilities/translateLabel';

const LoansList = () => {
    const bank = useSelector(state => state.banks.currentBank)
    const [loans, setLoans] = useState([])
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        getBankPendantsApi(bank._id, '', '').then(data => {
            setLoans(data.bankMovements)
        })
    }, [bank])

    return (
        <table className="table">
            <thead>
                {
                    loans?.length == 0
                        ? (
                            <tr>
                                <th></th>
                            </tr>
                        )
                        : (
                            <tr>
                                <th className='table-header'>Tipo</th>
                                <th className='table-header w-25'>Fecha</th>
                                <th className='table-header'>Concepto</th>
                                <th className='table-header'>Monto</th>
                                <th className='table-header'>Restante</th>
                                <th className='table-header'>Estado</th>
                            </tr>
                        )
                }
            </thead>
            <tbody>
                {
                    loans?.length == 0
                        ? (
                            <tr className="d-flex justify-content-center p-4">
                                <td className='w-100 text-center'><h4>Sin Movimientos</h4></td>
                            </tr>
                        )
                        : loans?.map((data, index) => {
                            return (
                                <tr key={index} className="" onClick={() => {}}>
                                    <td>{data.operation === 'entry' ? 'Entrada' : 'Salida'}</td>
                                    <td>{new Date(data.createDate).toLocaleString("en-US")} </td>
                                    <td>{data.concept}</td>
                                    <td>{dollarUSLocale.format(data.amount)}</td>
                                    <td className={''}>{dollarUSLocale.format(data.amount - data.parcialAmount)}</td>
                                    <td>{data.moveStatus}</td>
                                </tr>
                            );
                        })
                }
            </tbody>
        </table>
    )
}

export default LoansList