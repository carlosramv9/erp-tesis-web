import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBankPendantsApi } from '../../../api/banks';
import { updateBankMovementAction } from './../../../store/actions/bankActions';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { getToken } from '../../../api/token';

const PayForm = ({setShow}) => {
    const dispatch = useDispatch();
    const bank = useSelector(state => state.banks.currentBank)
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const [pendants, setPendants] = useState([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        getBankPendantsApi(bank._id, 'accepted', 'loan').then(data => {
            setPendants(data.bankMovements?.filter(x => x.type === 'loan'))
        })
    }, [bank])

    const processData = async (data, _amount) => {
        const token = getToken();
        if (token) {
            var body = {
                type: 'payment'
            }

            if(_amount){
                body.parcial = _amount
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
                    <div class="card my-2" key={index}>
                        <div class="card-body my-2">
                            <div className="d-flex justify-content-between flex-wrap">
                                <div>
                                    <h5 class="card-title">{data.concept}</h5>
                                    <p class="card-text">{data.description}</p>
                                    <p class="card-text">Para: {data.toBank.title}</p>
                                </div>
                                <div>
                                    <h5 class="card-title">{dollarUSLocale.format(data.amount - data.parcialAmount)}</h5>
                                    <p class="card-text fst-italic">Vencimiento: {new Date(data.dueDate).toLocaleString("en-US")}</p>
                                </div>
                                <div className='d-flex flex-column align-items-end'>
                                    <button className='btn btn-success mb-2' onClick={() => processData(data)} >Pagar Total</button>
                                    <input type="number" className="form-control col-md-3 col-sm-12" name='amount' value={amount} min={0} {...register("amount", {
                                        required: { value: true }, validate: (data) => {
                                            if (parseFloat(data) <= 0) {
                                                return 'No se puede transferir cantidades menores o iguales a 0.'
                                            }
                                            return ""
                                        }
                                    })}
                                        onChangeCapture={(e) => setAmount(e.target.value)} />
                                    <span className='text-danger text-small d-block my-2 fst-italic'>{errors?.amount?.message}</span>
                                    <button className='btn btn-success ' onClick={() => processData(data, amount)} >Pago Parcial</button>
                                </div>
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

export default PayForm