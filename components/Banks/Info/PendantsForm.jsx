import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankPendantsApi } from '../../../api/banks'
import { getToken } from '../../../api/token'
import { toast } from "react-toastify";
import { updateBankMovementAction } from '../../../store/actions/bankActions'

const PendantsForm = () => {
    const dispatch = useDispatch();
    const bank = useSelector(state => state.banks.currentBank)
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const [pendants, setPendants] = useState([])
    const [observations, setObservations] = useState('')
    const [show, setShow] = useState(false)

    useEffect(() => {
        getBankPendantsApi(bank._id).then(data => {
            setPendants(data.bankMovements)
        })
    }, [bank])

    const processData = (data, status) => {
        const token = getToken();
        const { type, _id } = data;

        if (token) {
            dispatch(updateBankMovementAction(bank._id, _id, {
                status,
                type,
                observations
            }))
            toast.success('Uploaded Successful')

        } else {
            toast.error("Information Failed")
        }
    }

    return (
        <div>
            {
                pendants?.map((data, index) => (
                    <div class="card my-2" key={index}>
                        <div class="card-header">
                            {getTitle(data.type)}
                        </div>
                        <div class="card-body my-2">
                            <div className="d-flex justify-content-between flex-wrap">
                                <div>
                                    <h5 class="card-title">{data.concept}</h5>
                                    <p class="card-text">{data.description}</p>
                                    <p class="card-text">De: {data.bank.title}</p>
                                </div>
                                <div>
                                    <h5 class="card-title">{dollarUSLocale.format(data.amount)}</h5>
                                </div>
                                <div className='d-flex flex-column'>
                                    <button className='btn btn-success mb-2' onClick={() => processData(data, 'accepted')} >Aceptar</button>
                                    <button className='btn btn-danger' onClick={() => setShow(true)} >Rechazar</button>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                {
                                    show
                                        ?
                                        <>
                                            <div className="mb-3 w-100">
                                                <label htmlFor="" className="form-label">Observaciones</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" name="observations" rows="3" value={observations} onChange={(e) => setObservations(e.target.value)} ></textarea>
                                            </div>
                                            <div className=''>
                                                <button className='btn btn-success' onClick={() => processData(data, 'refused')} >Enviar</button>
                                            </div>
                                        </>
                                        : null
                                }
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            {new Date(data.createDate).toLocaleString("en-US")}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PendantsForm

const getTitle = (type) => {
    switch (type) {
        case 'transfer':
            return 'Transferencia'
        case 'loan':
            return 'Prestamo'
        default:
            break;
    }
}