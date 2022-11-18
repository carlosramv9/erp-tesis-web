import React, { useState } from 'react'
import InvestorsList from './../investors/InvestorsList';
import InvestmentsList from './../investors/InvestmentsList';

const InverstorsModal = ({ setShow }) => {
    const [currentTab, setCurrentTab] = useState('list')
    return (
        <div>
            <div className='w-100 my-4 d-flex justify-content-center'>
                <button type='button' onClick={() => setCurrentTab('list')} className={currentTab == 'process' ? 'btn btn-primary rounded-0-right btn-active btn-tab-hover' : 'btn btn-primary rounded-0-right'}>Lista de Inversionistas</button>
                <button type='button' onClick={() => setCurrentTab('movements')} className={currentTab == 'files' ? 'btn btn-primary rounded-0 btn-active btn-tab-hover' : 'btn btn-primary rounded-0-left'}>Inversiones</button>
            </div>

            {currentTab === 'list' ? <InvestorsList show={setShow} /> : <InvestmentsList /> }

        </div>
    )
}

export default InverstorsModal