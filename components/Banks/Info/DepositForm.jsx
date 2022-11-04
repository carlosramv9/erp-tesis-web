import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getToken } from '../../../api/token';
import { toast } from "react-toastify";
import { getUserInfoListApi } from '../../../api/users'
import { useDispatch, useSelector } from 'react-redux';
import Required from '../../shared/Required';
import { addBankMovementAction } from '../../../store/actions/bankActions';

const DepositForm = ({ setShow }) => {
    const dispatch = useDispatch();
    const bank = useSelector(state => state.banks.currentBank)
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [balance, setBalance] = useState(bank.amount)
    const [type, setType] = useState('toBank')
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            var movement = {
                ...data,
                bank: bank._id,
                type: 'deposit',
                concept: 'Nuevo Deposito',
                moveStatus: 'complete',
                amountBefore: bank.amount
            }
            dispatch(addBankMovementAction(bank._id, movement))
            setShow(false)
            toast.success('Uploaded Successful')

        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit(processData)} method="post" className='w-100 mb-5'>
            <div className="d-flex justify-content-center">
                <div className="mb-3 text-center">
                    <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Cantidad</label>
                    <input type="number" className="form-control col-md-3 col-sm-12" name='amount' defaultValue={0} min={0} {...register("amount", {
                        required: { value: true }, validate: (data) => {
                            if (parseFloat(data) <= 0) {
                                return 'No se puede transferir cantidades menores a 0.'
                            }
                            return ((parseFloat(balance) + parseFloat(data)) > 0 && parseFloat(data) > 0) || ""
                        }
                    })}
                        onChangeCapture={(e) => setBalance(parseFloat(bank.amount) + parseFloat(e.target.value))} />
                    {parseFloat(getValues("amount")) >= 0
                        ? (<span className='text-primary text-small d-block my-2 fst-italic'>Saldo posterior: {dollarUSLocale.format(balance)}</span>)
                        : (<span className='text-primary text-small d-block my-2 fst-italic'>Saldo Actual: {dollarUSLocale.format(balance)}</span>)}
                    <span className='text-danger text-small d-block my-2 fst-italic'>{errors?.amount?.message}</span>
                </div>
            </div>
            <div className="mb-3 w-100">
                <label htmlFor="" className="form-label">Descripción</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" name="description" rows="3" {...register("description", { required: { value: false } })}></textarea>
                <span className='text-danger text-small d-block my-2'>{errors?.description?.message}</span>
            </div>
            <div className="d-flex justify-content-end">
                <input type="submit" value="Enviar" className='btn btn-action-primary' />
            </div>
        </form>
    )
}

export default DepositForm