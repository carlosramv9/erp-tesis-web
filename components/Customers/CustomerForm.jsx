import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addCustomersAction, updateCustomersAction, deleteCustomersAction } from '../../store/actions/customerActions';
import { useState, useEffect } from "react";
import Router from "next/router";
import Required from '../shared/Required'
import ToolTip from "../shared/ToolTip";
import { getBankCreditsApi } from "../../api/bankCredits";


export const CustomerForm = ({ show, customer }) => {
    const dispatch = useDispatch();
    const route = Router
    //const creditsList = useSelector(state => state.bankCredits.bankCredits)
    const [creditsList, setCreditsList] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [type, setType] = useState(customer ? customer.type : 'Seller');
    const [credit, setcredit] = useState(customer ? customer?.creditsType : {})

    useEffect(() => {
        if (customer) {
            setType(customer.type)
            console.log(credit)
            console.log(customer?.creditsType)
        }

        getBankCreditsApi(1, 50)
            .then(data => {
                setCreditsList(data["bankCredits"])
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCustomer = () => dispatch(deleteCustomersAction(customer._id));

    const submitDeleteCustomer = async () => await deleteCustomer();

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (customer) {
                const _data = {
                    firstName: data.firstName != "" ? data.firstName : customer.firstName,
                    lastName: data.lastName != "" ? data.lastName : customer.lastName,
                    type: type,
                    nss: data.nss,
                    rfc: data.rfc != "" ? data.rfc : customer.rfc,
                    phone: data.phone != "" ? data.phone : customer.phone,
                    email: data.email != "" ? data.email : customer.email,
                    creditsType: data.creditsType,
                    creditsAmount: data.creditsAmount != "" ? data.creditsAmount : customer.creditsAmount,
                    address: data.address != "" ? data.address : customer.address,
                }
                await dispatch(updateCustomersAction(customer._id, _data))
                toast.success('Updated Successful')
            }
            else {
                await dispatch(addCustomersAction({ ...data }))
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

            await submitDeleteCustomer()
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className='w-100 mb-5'>
                <div className="mb-3">
                    <Required />
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>  Nombre(s)</label>
                        <input type="text" className="form-control" name='firstName'
                            defaultValue={customer ? customer.firstName : null} placeholder='Ingresa tus nombres'
                            {...register("firstName", customer ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.firstName?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label htmlFor="" className="form-label"><span className="color-primary h5">*</span>  Apellidos</label>
                        <input type="text" className="form-control" name='lastName'
                            defaultValue={customer ? customer.lastName : null} placeholder='Apellidos'
                            {...register("lastName", customer ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' }, minLength: { value: 3, message: "Min lenght 3" } })}
                        />
                        <span className='text-danger text-small d-block mb-2'>{errors?.lastName?.message}</span>
                    </div>
                </div>
                <div className="mb-3">
                    <div className='d-flex align-items-center'>
                        <label className='input-label me-2'>Email</label>
                        <ToolTip placement="right" description="correo@dominio" />
                    </div>
                    <input type="email" className="form-control" name='email'
                        defaultValue={customer ? customer.email : null} placeholder='Email'
                        {...register("email", customer ? { required: { value: false } } : { required: { value: false, message: 'Campo Obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                    <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor=""><span className="color-primary h5">*</span>  Tipo de Cliente</label>
                    <select className="form-select" aria-label="Default select example" defaultValue={type} name='type'
                        onChangeCapture={({ target }) => setType(target.value)}
                        {...register("type", customer ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' } })}>
                        <option value="">Selecciona el tipo de cliente</option>
                        <option value="Buyer">Comprador</option>
                        <option value="Seller">Vendedor</option>
                    </select>
                    <span className='text-danger text-small d-block mb-2'>{errors?.type?.message}</span>
                </div>
                <div className='d-flex flex-between w-100 flex-column flex-sm-row'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <div >
                            <label className='input-label me-2'><span className="color-primary h5">*</span> CURP</label>
                            <ToolTip placement="right" description="Debe contener 18 caracteres" />
                        </div>
                        <input type="text" className="form-control" maxLength='19' name='curp'
                            defaultValue={customer ? customer.curp : null} placeholder='Ingresa el CURP' {...register("curp", customer ? { required: { value: true } } : { required: { value: true }, minLength: { value: 18, message: "Min lenght 18" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.curp?.message}</span>
                    </div>
                    {
                        type === 'Buyer' ?
                            (
                                <div className='d-flex flex-column w-100 ms-2'>
                                    <label htmlFor="">{credit?.nss ? (<span className="color-primary h5">*</span>) : (<></>)}NSS</label>
                                    <input type="text" className="form-control" maxLength='11' name='nss'
                                        defaultValue={customer ? customer?.nss : ''} placeholder='Ingresa tu NSS' {...register("nss", customer ? { required: { value: credit?.nss, message: 'Campo Obligatorio' } } : { required: { value: credit?.nss, message: 'Campo Obligatorio' }, minLength: { value: 11, message: "Min lenght 11" } })} />
                                    <span className='text-danger text-small d-block mb-2'>{errors?.nss?.message}</span>
                                </div>
                            ) : (<></>)
                    }
                </div>

                <div className='d-flex flex-between w-100 mt-4 mb-4 flex-column flex-sm-row'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <div >
                            <label className='input-label me-2'> Telefono/Celular</label>
                            <ToolTip placement="right" description="Ingrese los 10 numeros de celular iniciando con 656" />
                        </div>
                        <input type="tel" className="form-control" maxLength='14'
                            defaultValue={customer ? customer.phone : null} placeholder='Ingresa tu telefono' name='phone'
                            {...register("phone", customer ? { required: { value: false } } : { required: { value: true, message: 'Campo Obligatorio' }, minLength: { value: 10, message: "Min lenght 10" } })}
                        />
                        <span className='text-danger text-small d-block mb-2'>{errors?.phone?.message}</span>
                    </div>
                    {
                        type === 'Buyer' ?
                            (
                                <div className='d-flex flex-column w-100 ms-2'>
                                    <label htmlFor=""><span className="color-primary h5">*</span>Tipo de Crédito</label>
                                    <select className="form-select" value={credit ? credit._id : ''} name='creditsType' {...register("creditsType", { required: { value: false } })} onChange={(e) => {
                                        setcredit(creditsList.filter(x => x._id === e.target.value)[0])
                                    }} >
                                        <option value="">Selecciona el tipo de crédito</option>
                                        {
                                            creditsList?.map((e, i) => (
                                                <option value={e._id} key={i} >{e.name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className='text-danger text-small d-block mb-2'>{errors?.creditsType?.message}</span>
                                </div>
                            ) : (<></>)
                    }

                </div>
                {customer ?
                    (
                        <>
                            <input type="submit" value="Actualizar" className='btn btn-block btn-action-primary p-5 mt-3 me-2' />
                            <button type='button' onClick={() => deleteHandler()} className='btn btn-block btn-action-warning p-5 mt-3' >Eliminar</button>
                        </>
                    )
                    :
                    (
                        <input type="submit" value="Enviar" className='btn btn-block btn-action-primary p-5 ms-auto' />
                    )
                }
            </form>
        </div>
    )
}
