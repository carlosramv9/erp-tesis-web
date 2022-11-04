import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBankCreditsAction, updateBankCreditsAction, deleteBankCreditsAction } from '../../store/actions/bankCreditActions';
import { useEffect, useState } from "react";

export const BankCreditForm = ({ show, bankCredit }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ckNSS, setckNSS] = useState(bankCredit ? bankCredit.nss : false)    

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (bankCredit) {
                const _data = {
                    name: data.name != "" ? data.name : bankCredit.name,
                    nss: ckNSS
                }
                await dispatch(updateBankCreditsAction(bankCredit._id, _data))
                show(false)
                toast.success('Updated Successful')
            }
            else {
                const _data = {
                    name: data.name,
                    nss: ckNSS
                }
                dispatch(addBankCreditsAction(_data))
                show(false)
                toast.success('Uploaded Successful')
            }
        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            dispatch(deleteBankCreditsAction(bankCredit._id))
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }

    //handleSubmit(processData)

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className=''>
                <div className="row">
                    <div className="row m-auto">
                        <div className="mb-6 col-12">
                            <label htmlFor="" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name='name'
                                placeholder={bankCredit ? bankCredit.name : 'Nombre'} defaultValue={bankCredit ? bankCredit.name : ''}
                                {...register("name", bankCredit ? { required: { value: false } } : { required: { value: true, message: 'The Name is required' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>
                    </div>
                    <div className=" ms-3 col-md-12 col-sm-12 my-3">
                        <input type="checkbox" id="ckRestore" className="form-check-input" defaultChecked={ckNSS} onClick={() => setckNSS(!ckNSS)} />
                        <label htmlFor="ckRestore" className="ms-2" > NSS obligatorio</label>
                    </div>
                    {bankCredit ?
                        (
                            <>
                                <input type="submit" value="Actualizar" className='btn btn-block btn-action-primary p-5' />
                                <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 mt-3' >Eliminar</button>
                            </>
                        )
                        :
                        (
                            <input type="submit" value="Enviar" className='btn btn-block btn-action-primary p-5' />
                        )
                    }
                </div>
            </form>
        </div>
    )
}

