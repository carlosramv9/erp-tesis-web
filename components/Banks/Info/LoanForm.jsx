import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RequestLoan from './RequestLoan';
import GiveLoan from './GiveLoan';
import LoansList from './LoansList';

const LoanForm = ({ setShow }) => {
    const bank = useSelector(state => state.banks.currentBank)
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const [currentTab, setCurrentTab] = useState('request')

    const selectView = () => {
        switch (currentTab) {
            case 'request':
                return <RequestLoan setShow={setShow} />
            case 'give':
                return <GiveLoan setShow={setShow} />
            case 'statements':
                return <LoansList setShow={setShow} />
            default:
                break;
        }
    }

    return (
        <div className='w-100 mb-5'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <span className='text-amount'>{dollarUSLocale.format(bank.amount)}</span>
                <div>Saldo Actual</div>
            </div>
            <hr />
            <div className='w-100 my-4 d-flex justify-content-center'>
                <button type='button' onClick={() => setCurrentTab('request')} className={currentTab == 'process' ? 'btn btn-primary rounded-0-right btn-active btn-tab-hover' : 'btn btn-primary rounded-0-right'}>Solicitar Prestamo</button>
                <button type='button' onClick={() => setCurrentTab('give')} className={currentTab == 'files' ? 'btn btn-primary rounded-0 btn-active btn-tab-hover' : 'btn btn-primary rounded-0'}>Entregar Prestamo</button>
                <button type='button' onClick={() => setCurrentTab('statements')} className={currentTab == 'files' ? 'btn btn-primary rounded-0 btn-active btn-tab-hover' : 'btn btn-primary rounded-0-left'}>Estado de Prestamos</button>
            </div>
            {selectView()}
        </div>
    )
}

export default LoanForm