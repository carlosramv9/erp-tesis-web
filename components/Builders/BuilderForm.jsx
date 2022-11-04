import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBuildersAction, updateBuildersAction, deleteBuildersAction } from '../../store/actions/builderActions';
import { useEffect, useState } from "react";
import Required from './../shared/Required';

export const BuilderForm = ({ show, builder }) => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [contacts, setcontacts] = useState(builder ? builder.contacts : [{
        name: "",
        phone: "",
        email: ""
    }])

    const deleteBuilder = () => dispatch(deleteBuildersAction(builder._id));

    const submitDeleteBuilder = async () => await deleteBuilder();

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (builder) {
                const _data = {
                    name: data.name != "" ? data.name : builder.name,
                }
                await dispatch(updateBuildersAction(builder._id, _data))
                show(false)
                toast.success('Updated Successful')
            }
            else {
                const _data = {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    contacts: contacts,
                }
                await dispatch(addBuildersAction(_data))
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
            await submitDeleteBuilder()
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }

    const addContact = (index) => {
        setcontacts([...contacts, {
            _id: index,
            name: "",
            phone: "",
            email: ""
        }])
    }

    const removeContact = (index) => {
        setcontacts([...contacts.filter(x => x._id !== index)])
    }

    //handleSubmit(processData)

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className=''>
                <div className="mb-3">
                    <Required />
                </div>
                <div className="row">
                    <div className="row m-auto">
                        <div className="mb-6 col-12">
                            <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Nombre</label>
                            <input type="text" className="form-control" name='name'
                                placeholder={builder ? builder.name : 'Nombre'} defaultValue={builder ? builder.name : ''}
                                {...register("name", builder ? { required: { value: false } } : { required: { value: true, message: 'The Name is required' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>
                    </div>
                    {/* <h4 className="mt-2">Contacto</h4>
                    <div className="row m-auto">
                        <div className="mb-3 col-5">
                            <label htmlFor=""><span className="color-primary h5">*</span> Número de Teléfono</label>
                            <input type="tel" className="form-control" maxLength='14'
                                placeholder={builder ? builder.phone : 'Número de Teléfono'} defaultValue={builder ? builder.phone : ''} name='phone'
                                {...register("phone", builder ? { required: { value: false } } : { required: { value: false, message: 'The Phone is required' }, minLength: { value: 10, message: "Min lenght 10" } })}
                            />
                            <span className='text-danger text-small d-block mb-2'>{errors?.phone?.message}</span>
                        </div>
                        <div className="mb-3 col-7">
                            <label htmlFor="">Correo</label>
                            <input type="email" className="form-control" name='email'
                                placeholder={builder ? builder.email : 'Correo'} defaultValue={builder ? builder.email : ''}
                                {...register("email", builder ? { required: { value: false } } : { required: { value: false, message: 'The email is required' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                        </div>
                    </div> */}
                    <hr />
                    {/* {
                        contacts?.map((e, i) => (<ContactElements contact={e} key={i} removeContact={removeContact} />))
                    } */}
                    {/* <div className="row">
                        <button type="button" onClick={() => addContact(contacts[contacts.length - 1] ? contacts[contacts.length - 1].id + 1 : 0)} className="btn btn-primary ms-3 mb-3">Agregar +</button>
                    </div> */}

                    {builder ?
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

