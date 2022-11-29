import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getToken } from '../../../api/token';
import { toast } from "react-toastify";
import { getUserInfoListApi } from '../../../api/users'
import { useDispatch, useSelector } from 'react-redux';
import Required from '../../shared/Required';
import { addBankMovementAction } from '../../../store/actions/bankActions';
import { useRouter } from 'next/router';

const TransferForm = ({ setShow }) => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const bank = useSelector(state => state.banks.currentBank)
    const banksList = useSelector(state => state.banks.banks.filter(x => x._id !== id))
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [usersList, setUsersList] = useState([])
    const [balance, setBalance] = useState(bank.amount)
    const [type, setType] = useState('toBank')
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        getUserInfoListApi()
            .then(data => {
                setUsersList(data?.users)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            var movement = {
                ...data,
                bank: bank._id,
                type: 'transfer',
                toUser: type === 'toUser' ? data.toUser : null,
                toBank: type === 'toBank' ? data.toBank : null,
                amountBefore: bank.amount,
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
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <span className='text-amount'>{dollarUSLocale.format(bank.amount)}</span>
                <div>Saldo Actual</div>
            </div>
            <hr />
            <div className="mb-3">
                <Required />
            </div>
            <div className="w-100 row">
                <div className="mb-3 col-md col-sm-12">
                    <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Seleccionar Destino</label>
                    <select className="form-select" name='to' placeholder="Seleccionar..."
                        {...register('toBank', { required: { value: true, message: 'Destino es necesario' } })}
                    ><option value={''}>{`Seleccionar Banco...`}</option>
                        {
                            banksList?.map((bank, i) => (
                                <option value={bank?._id} key={i} >{`${bank?.title}`}</option>
                            ))
                        }
                        
                    </select>
                    <span className='text-danger text-small d-block my-2'>{errors?.toBank?.message}</span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 text-center">
                    <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Cantidad</label>
                    <input type="number" className="form-control col-md-3 col-sm-12" name='amount' defaultValue={0} min={0} {...register("amount", {
                        required: { value: true }, validate: (data) => {
                            if (parseFloat(data) < 0) {
                                return 'No se puede transferir cantidades menores a 0.'
                            }
                            return ((parseFloat(balance) - parseFloat(data)) > 0 && parseFloat(data) > 0) || ""
                        }
                    })}
                        onChangeCapture={(e) => setBalance(parseFloat(bank.amount) - parseFloat(e.target.value))} />
                    {balance >= 0.0 && parseFloat(getValues("amount")) >= 0
                        ? (<span className='text-primary text-small d-block my-2 fst-italic'>Saldo posterior: {dollarUSLocale.format(balance)}</span>)
                        : (<span className='text-danger text-small d-block my-2 fst-italic'>Saldo Insuficiente</span>)}
                    <span className='text-danger text-small d-block my-2 fst-italic'>{errors?.amount?.message}</span>
                </div>
            </div>
            <div className="mb-3 w-100">
                <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Concepto</label>
                <input type="text" className="form-control" name='concept' placeholder='Concepto...' {...register("concept", { required: { value: true, message: 'Concepto Obligatorio' } })} />
                <span className='text-danger text-small d-block my-2'>{errors?.concept?.message}</span>
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

export default TransferForm