import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getInvestorsAction } from '../../store/actions/investorActions';
import { useRouter } from 'next/router';
import Modal from '../shared/Modal';
import InvestorForm from './InvestorForm';
import InvestorDocsModal from './InvestorDocsModal';
import { translateDate } from './../../utilities/translateLabel';

const InvestorsList = ({ show }) => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const investorsList = useSelector(state => state.investors.investors)
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });
    var optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [showForm, setShowForm] = useState(false)
    const [showDocs, setShowDocs] = useState(false)
    const [investor, setinvestor] = useState(null)

    useEffect(() => {
        dispatch(getInvestorsAction(id))
    }, [])


    return (
        <div>
            <div className='flex-between'>
                <button className='btn btn-action-primary' onClick={() => show(false)}><i className="fa-solid fa-angle-left"></i> Atras</button>
                <button className='btn btn-action-primary' onClick={() => { setShowForm(true); setinvestor(null) }}><i className="fa-solid fa-plus"></i> Agregar Inversionista</button>
            </div>
            <table className="table mt-4">
                <thead>
                    {
                        investorsList?.length == 0
                            ? (
                                <tr>
                                    <th></th>
                                </tr>
                            )
                            : (
                                <tr>
                                    <th className='table-header'>Nombre</th>
                                    <th className='table-header'>Saldo Invertido</th>
                                    <th className='table-header'>Tasa Interés</th>
                                    <th className='table-header w-25'>Fecha de Ingreso</th>
                                    <th className='table-header w-25'>Fecha de Finalización</th>
                                    <th className='table-header'></th>
                                </tr>
                            )
                    }
                </thead>
                <tbody>
                    {
                        investorsList?.length == 0
                            ? (
                                <tr className="d-flex justify-content-center p-4">
                                    <td className='w-100 text-center'><h4>Lista Vacia</h4></td>
                                </tr>
                            )
                            : investorsList?.map((data, index) => {
                                return (
                                    <tr key={index} className="" onClick={() => { }}>
                                        <td>{data.firstName} {data.lastName}</td>
                                        <td>{dollarUSLocale.format(data.amount)}</td>
                                        <td>{data.interest} %</td>
                                        <td>{translateDate(data.createDate)} </td>
                                        <td>{translateDate(data.finishedDate)} </td>
                                        <td>
                                            <div>
                                                {/* <button
                                                    className="fa-solid fa-dollar-sign p-2 icon-button me-1"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Agregar Inversión"
                                                    onClick={() => { setShowForm(true); setinvestor(data) }}></button> */}
                                                <button
                                                    className="fa-solid fa-pencil p-2 icon-button me-1"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Editar Inversionista"
                                                    onClick={() => { setShowForm(true); setinvestor(data) }}></button>
                                                <button
                                                    className="fa-solid fa-folder p-2 icon-button me-1"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Abrir Expediente"
                                                    onClick={() => { setShowDocs(true); setinvestor(data) }}></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </table>

            <Modal title="Actualizar Cliente" show={showForm} setShow={setShowForm} fullscreen={false} >
                <InvestorForm setShow={setShowForm} investor={investor} />
            </Modal>

            <Modal title="Documentos" show={showDocs} setShow={setShowDocs} fullscreen={false} >
                <InvestorDocsModal setShow={setShowDocs} investor={investor} ></InvestorDocsModal>
            </Modal>
        </div>
    )
}

export default InvestorsList