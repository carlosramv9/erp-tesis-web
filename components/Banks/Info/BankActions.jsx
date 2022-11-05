import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth'
import Modal from '../../../components/shared/Modal';
import { useForm } from 'react-hook-form';
import { getUserInfoListApi } from '../../../api/users';
import TransferForm from './TransferForm';
import PendantsForm from './PendantsForm';
import LoanForm from './LoanForm';
import PayForm from './PayForm';
import DepositForm from './DepositForm';

const BankActions = () => {
    const bank = useSelector(state => state.banks.currentBank)
    const { auth } = useAuth();
    const [showTransfer, setShowTransfer] = useState(false)
    const [showPay, setShowPay] = useState(false)
    const [showLoan, setShowLoan] = useState(false)
    const [showPendients, setShowPendients] = useState(false)
    const [showDeposit, setShowDeposit] = useState(false)

    return (
        <div className='row text-light bg-dark p-3'>
            {
                bank.users?.filter(x => x._id === auth?.idUser).length > 0
                    ? (
                        <div className='col-md-2 my-2 d-flex justify-content-center align-items-center pointer flex-column' onClick={() => setShowDeposit(true)}>
                            <i className="fa-solid fa-plus" style={{ fontSize: '1.4rem' }}></i>
                            <span>Depositar</span>
                        </div>
                    )
                    : null
            }
            <div className='col-md-2 my-2 d-flex justify-content-center align-items-center pointer flex-column' onClick={() => setShowTransfer(true)}>
                <i className="fa-solid fa-money-bill-transfer" style={{ fontSize: '1.4rem' }}></i>
                <span>Transferencia</span>
            </div>
            <div className='col-md-2 my-2 d-flex justify-content-center align-items-center pointer flex-column' onClick={() => setShowPay(true)}>
                <i className="fa-solid fa-dollar-sign" style={{ fontSize: '1.4rem' }}></i>
                <span>Pagar</span>
            </div>
            <div className='col-md-2 my-2 d-flex justify-content-center align-items-center pointer flex-column' onClick={() => setShowLoan(true)}>
                <i className="fa-solid fa-handshake" style={{ fontSize: '1.4rem' }}></i>
                <span>Préstamo</span>
            </div>
            {bank.users?.filter(x => x._id === auth?.idUser).length > -10 ?
                <div className='col-md-2 my-2 d-flex justify-content-center align-items-center pointer flex-column' onClick={() => setShowPendients(true)}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.4rem' }}></i>
                    <span>Operaciones Pendientes</span>
                </div> : null
            }

            <Modal title="Depositar" show={showDeposit} setShow={setShowDeposit} fullscreen={false} >
                <DepositForm setShow={setShowDeposit} />
            </Modal>
            <Modal title="Transferencia" show={showTransfer} setShow={setShowTransfer} fullscreen={false} >
                <TransferForm setShow={setShowTransfer} />
            </Modal>
            <Modal title="Prestamo" show={showLoan} setShow={setShowLoan} fullscreen={false} >
                <LoanForm setShow={setShowLoan} />
            </Modal>
            <Modal title="Pago" show={showPay} setShow={setShowPay} fullscreen={false} >
                <PayForm setShow={setShowPay} />
            </Modal>
            <Modal title="Pendientes" show={showPendients} setShow={setShowPendients} fullscreen={false} >
                <PendantsForm setShow={setShowPendients} />
            </Modal>
        </div>
    )
}

export default BankActions