import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBankPendantsApi } from '../../../api/banks';
import { updateBankMovementAction } from './../../../store/actions/bankActions';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { getToken } from '../../../api/token';

const PayForm = ({ setShow }) => {
    const dispatch = useDispatch();
    const bank = useSelector(state => state.banks.currentBank)
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const [pendants, setPendants] = useState([])
    const [amount, setAmount] = useState(0)
    const [isPartial, setIsPartial] = useState(false)

    useEffect(() => {
        getBankPendantsApi(bank._id, 'accepted', 'reqLoan').then(data => setPendants([...pendants, ...data.bankMovements]))
        getBankPendantsApi(bank._id, 'complete', 'giveLoan').then(data => setPendants([...pendants, ...data.bankMovements]))
    }, [])

    const processData = async (data, _amount) => {
        const token = getToken();
        if (token && _amount > 0) {
            var body = {
                type: 'payment',
                amount: _amount ? _amount : (data.amount - data.parcialAmount)
            }

            dispatch(updateBankMovementAction(bank._id, data._id, body))
            toast.success('Uploaded Successful')
            setShow(false)

        } else {
            toast.error("Information Failed")
        }
    }

    return (
        <div>
            {
                pendants?.map((data, index) => (
                    <div className="card my-2" key={index}>
                        <div className="card-body my-2">
                            <div className="d-flex flex-column flex-wrap">
                                <div className='flex-between'>
                                    <div>
                                        <h5 className="card-title">{data.concept}</h5>
                                        <p className="card-text">{data.description}</p>
                                        <p className="card-text">Para: {data.toBank.title}</p>
                                    </div>
                                    <div>
                                        <h5 className="card-title">{dollarUSLocale.format(data.amount - data.parcialAmount)}</h5>
                                        <p className="card-text fst-italic">Vencimiento: {new Date(data.dueDate).toLocaleString("en-US")}</p>
                                    </div>
                                </div>
                                <div className='flex-between w-100 mt-4'>
                                    <button className='btn btn-success mb-2' onClick={() => processData(data, (data.amount - data.parcialAmount))} >Pagar Total</button>
                                    {
                                        !isPartial ?
                                            <button className='btn btn-success mb-2' onClick={() => setIsPartial(true)} >Pago Parcial</button> : null
                                    }
                                    {
                                        isPartial ?
                                            <div className='d-flex'>
                                                <div className=''>
                                                    <input type="number" className="form-control input-transparent transition" name='amount' value={amount} min={0} onChange={(e) => setAmount(e.target.value)} />
                                                </div>
                                                <button className='btn btn-transparent ms-2' onClick={() => processData(data, amount)}  ><i className="fa-solid fa-paper-plane text-primary" style={{ fontSize: '1.5rem' }}></i></button>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            {new Date(data.createDate).toLocaleString("en-US")}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PayForm