import React from 'react'
import Required from './../../shared/Required';
import { useEffect } from 'react';
import { getUserInfoListApi } from '../../../api/users';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { getToken } from '../../../api/token';
import { addBankMovementAction } from '../../../store/actions/bankActions';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const RequestLoan = ({setShow}) => {
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
                type: 'reqLoan',
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
            <div className="mb-3">
                <Required />
            </div>
            <div className="w-100 row">
                <div className="mb-3 col-md col-sm-12">
                    <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Seleccionar a quien solcitar prestamo</label>
                    <select className="form-select" name='to' placeholder="Seleccionar..."
                        {...register(type, { required: { value: true, message: 'Destino es necesario' } })}
                    >
                        {
                            type === 'toBank'
                                ? (<>
                                    <option value={''}>{`Seleccionar Banco...`}</option>
                                    {
                                        banksList?.map((bank, i) => (
                                            <option value={bank?._id} key={i} >{`${bank?.title}`}</option>
                                        ))
                                    }
                                </>)
                                : (<>
                                    <option value={''}>{`Seleccionar Usuario...`}</option>
                                    {
                                        usersList?.map((user, i) => (
                                            <option value={user?._id} key={i} >{`${user?.firstName} ${user?.lastName}`}</option>
                                        ))
                                    }
                                </>)
                        }
                    </select>
                    <span className='text-danger text-small d-block my-2'>{errors[type]?.message}</span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 text-center">
                    <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>Cantidad</label>
                    <input type="number" className="form-control col-md-3 col-sm-12" name='amount' defaultValue={0} min={0} {...register("amount", {
                        required: { value: true }, validate: (data) => {
                            if (parseFloat(data) < 0) {
                                return 'No se puede solicitar cantidades menores a 0.'
                            }
                            return ((parseFloat(balance) + parseFloat(data)) > 0 && parseFloat(data) > 0) || ""
                        }
                    })}
                        onChangeCapture={(e) => setBalance(parseFloat(bank.amount) + parseFloat(e.target.value))} />
                    {balance >= 0.0 && parseFloat(getValues("amount")) >= 0
                        ? (<span className='text-primary text-small d-block my-2 fst-italic'>Saldo posterior: {dollarUSLocale.format(balance)}</span>)
                        : (<span className='text-danger text-small d-block my-2 fst-italic'>Saldo Insuficiente</span>)}
                    <span className='text-danger text-small d-block my-2 fst-italic'>{errors?.amount?.message}</span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 text-center">
                    <label className='input-label'><span className="color-primary h5">*</span>  Fecha de Vencimiento</label>
                    <input name='dueDate' type="date" defaultValue={dayjs()} min={dayjs().format('YYYY-MM-DD')} className='form-control col-md-3 col-sm-12 my-2' {...register("dueDate", { required: { value: true, message: 'Campo Obligatorio' } })} />
                    <span className='text-danger text-small d-block mb-2'>{errors?.dueDate?.message}</span>
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

export default RequestLoan