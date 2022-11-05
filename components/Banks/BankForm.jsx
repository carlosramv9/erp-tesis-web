import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBanksAction, updateBanksAction, deleteBanksAction } from '../../store/actions/bankActions';
import { useState, useEffect } from "react";
import Router from "next/router";
import Required from '../shared/Required'
import ToolTip from "../shared/ToolTip";
import useAuth from './../../hooks/useAuth';
import { getUserInfoListApi } from "../../api/users";


export const BankForm = ({ show, bank }) => {
    const dispatch = useDispatch();
    const route = Router
    //const creditsList = useSelector(state => state.bankCredits.bankCredits)
    const [usersList, setUsersList] = useState([])
    const { auth } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [users, setUsers] = useState(bank ? [...bank.users?.map(({ _id }) => _id)] : [auth.idUser])

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
            if (bank) {
                const _data = {
                    title: data.title != "" ? data.title : bank.title,
                    amount: data.amount != "" ? data.amount : bank.amount,
                    users,
                }
                dispatch(updateBanksAction(bank._id, _data))
                toast.success('Updated Successful')
            }
            else {
                dispatch(addBanksAction({ ...data, users }))
                toast.success('Uploaded Successful')
            }
            show(false)
        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            dispatch(deleteBanksAction(bank._id))
            show(false)
            toast.success('Deleted Successful')
            route.back();

        } else {
            toast.error("Information not found")
        }
    }

    const onAddUser = () => setUsers([...users, ''])

    const onChangeUser = (indexParent, event) => {
        const newData = users.map((d, index) => index === indexParent ? event.target.value : d);
        setUsers([...newData]);
    };

    const onDeleteUser = (indexToDelete) => {
        const newFields = users.filter((d, index) => index !== indexToDelete);
        setUsers([...newFields]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className='w-100 mb-5'>
                <div className="mb-3">
                    <Required />
                </div>
                <div className='row'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Nombre</label>
                        <input type="text" className="form-control" name='title'
                            defaultValue={bank ? bank.title : null} placeholder='Ingresa el Nombre'
                            {...register("title", bank ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.title?.message}</span>
                    </div>
                </div>
                {bank
                    ? (<></>)
                    : (
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <div className='d-flex align-items-center'>
                                    <span className="color-primary h5">*</span>
                                    <label className='input-label me-2'>Saldo Inicial</label>
                                </div>
                                <input type="number" className="form-control" name='amount'
                                    defaultValue={bank ? bank.amount : 0} placeholder='Incial...'
                                    {...register("amount", bank ? { required: { value: false } } : { required: { value: false, message: 'Campo Obligatorio' } })} />
                                <span className='text-danger text-small d-block mb-2'>{errors?.amount?.message}</span>
                            </div>
                        </div>
                    )}

                <div>
                    <div className="mb-2" >
                        <label htmlFor=""><span className="color-primary h5">*</span>  Participantes</label>
                        <button type="button" className="text-button text-warning" onClick={onAddUser}><i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '1.2em' }}></i></button>
                    </div>
                    {
                        users?.map((data, index) => {
                            return (
                                <div className="row mb-3" key={index}>
                                    <div className="col-md-5 d-flex">
                                        <i className="fa-solid fa-circle-minus text-danger pointer mx-2 my-auto" style={{fontSize: '1.3rem'}} onClick={() => onDeleteUser(index)}></i>
                                        <select className="form-select" value={data} onChange={(e) => onChangeUser(index, e)} >
                                            <option value="">Selecciona Participante...</option>
                                            {usersList?.map((user, i) => {
                                                return (
                                                    <option key={i} value={user._id}>{user.firstName} {user.lastName}</option>
                                                );
                                            })}
                                        </select>
                                        <span className='text-danger text-small d-block mb-2'>{errors?.type?.message}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {bank ?
                    (
                        <>
                            <input type="submit" value="Actualizar" className='btn btn-block btn-action-primary p-5' />
                            <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 ms-2' >Eliminar</button>
                        </>
                    )
                    :
                    (
                        <input type="submit" value="Enviar" className='btn btn-block btn-action-primary p-5' />
                    )
                }
            </form>
        </div>
    )
}
