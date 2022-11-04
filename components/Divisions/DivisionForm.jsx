import { useForm } from "react-hook-form";
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addDivisionsAction, updateDivisionsAction, deleteDivisionsAction } from '../../store/actions/divisionActions';
import { useState, useEffect } from "react";
import Required from "../shared/Required";
import 'react-select-search/style.css'
import SelectSearch from 'react-select-search';
import { getUserInfoListApi } from "../../api/users";
import useAuth from './../../hooks/useAuth';

export const DivisionForm = ({ show, division }) => {
    const defaultFields = {
        phone: "",
        email: "",
    };
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const builderList = useSelector(state => state.builders.builders)
    const [contacts, setContacts] = useState([defaultFields])
    const [usersList, setUsersList] = useState([])
    const [closer, setCloser] = useState(division ? division.closer._id : auth.idUser)

    useEffect(() => {
        if (division && division.contacts) {
            var _contacts = division.contacts.map(d => { return { phone: d.phone, email: d.email } })
            setContacts([..._contacts])
        }

        getUserInfoListApi()
            .then(data => {
                setUsersList(data?.users)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            if (division) {
                const _data = {
                    ...data,
                    name: data.name != "" ? data.name : division.name,
                    builder: data.builder != "" ? data.builder : division.builder,
                    closer: data.closer != "" ? data.closer : division.closer,
                    contacts: contacts,
                }
                dispatch(updateDivisionsAction(division._id, _data))
                show(false)
                toast.success('Updated Successful')
            }
            else {
                dispatch(addDivisionsAction({
                    ...data,
                    contacts: contacts,
                    closer: closer,
                }))
                show(false)
                toast.success('Uploaded Successful')
            }
        } else {
            toast.error("Information Failed")
        }
        e.target.reset();
    }

    const onAdd = () => setContacts([...contacts, { ...defaultFields }])

    const onChange = (indexParent, event) => {
        const newData = contacts.map((d, index) => {
            if (index === indexParent) {
                d[event.target.name] = event.target.value;
            }
            return d;
        });
        setContacts([...newData]);
    };

    const onDelete = (indexToDelete) => {
        const newFields = contacts.filter((d, index) => index !== indexToDelete);
        setContacts([...newFields]);
    };

    const deleteHandler = async () => {
        const token = await getToken();
        if (token) {

            dispatch(deleteDivisionsAction(division._id))
            show(false)
            toast.success('Deleted Successful')

        } else {
            toast.error("Information not found")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(processData)} method="post" className=''>
                <div className="mb-3">
                    <Required />
                </div>
                <div className="row">
                    <div className="row m-auto">
                        <div className="mb-3 col-6 w-100">
                            <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Constructora</label>
                            <select className="form-select" name='builder' defaultValue={division ? division?.builder ? division?.builder._id : 0 : 0}
                                {...register("builder", { required: { value: true, message: 'La constructora es necesaria' }, minLength: { value: 3, message: "Min lenght 3" } })}>
                                <option value={0}>{`Seleccionar constructora...`}</option>
                                {
                                    builderList?.map((builder, i) => (
                                        <option key={i} value={builder._id}>{builder.name}</option>
                                    ))
                                }
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>

                        <div className="mb-3 col-6 w-100">
                            <label htmlFor="" className="form-label"><span className="color-primary h5">*</span> Nombre Fraccionamiento</label>
                            <input type="text" className="form-control" name='name'
                                placeholder={division ? division.name : 'Name'} defaultValue={division ? division.name : ''}
                                {...register("name", division ? { required: { value: false } } : { required: { value: true, message: 'The Name is required' }, minLength: { value: 3, message: "Min lenght 3" } })} />
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>
                        <div className="row col-sm-12">
                            <div className="mb-3 col-md-3 col-sm-12">
                                <label htmlFor="" className="form-label">Comisión</label>
                                <input type="number" min={0} className="form-control" name='commission' defaultValue={division ? division.commission : '0'}
                                    {...register("commission", division ? { required: { value: false } } : { required: { value: false, message: 'The Commission is required' } })} />
                                <span className='text-danger text-small d-block mb-2'>{errors?.commission?.message}</span>
                            </div>
                            <div className="mb-3 col-md-2 col-sm-12 mt-auto">
                                <select className="form-select" name='commissionType' defaultValue={division ? division.commissionType : ""}
                                    {...register("commissionType", division ? { required: { value: true } } : { required: { value: true, message: 'The exchange rate is required' }, minLength: { value: 3, message: "Min lenght 3" } })} >
                                    <option value={'percentage'} selected>%</option>
                                    <option value={'currency'}>$</option>
                                </select>
                                <span className='text-danger text-small d-block mb-2'>{errors?.exchangeRate?.message}</span>
                            </div>
                        </div>
                        <hr />
                        <h4 className="mt-2">Contacto</h4>
                        <div className="row">
                            <button type="button"
                                onClick={onAdd}
                                className="btn btn-primary ms-3 mb-3">Agregar +</button>
                        </div>
                        {
                            contacts?.map((contact, index) => (
                                <div className="row m-auto" key={index}>
                                    <div className="col-1 text-center my-auto" onClick={() => onDelete(index)}>
                                        <i className="bi bi-x text-danger" style={{ fontSize: '32px' }}></i>
                                    </div>
                                    <div className="mb-3 col-5">
                                        <label htmlFor="">Número de Teléfono</label>
                                        <input type="tel" className="form-control" maxLength='14' name='phone'
                                            placeholder={'Número de Teléfono'}
                                            value={contact.phone}
                                            onChange={e => onChange(index, e)}
                                        />
                                        <span className='text-danger text-small d-block mb-2'>{errors?.phone?.message}</span>
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="">Correo</label>
                                        <input type="email" className="form-control" name='email'
                                            placeholder={'Correo'}
                                            value={contact.email}
                                            onChange={e => onChange(index, e)}
                                        />
                                        <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                                    </div>
                                </div>))}

                        <hr />
                        <div className="mb-3 col-6 w-100">
                            <label htmlFor="" className="form-label">Seleccionar Coordinador</label>
                            <select className="form-select" name='closer' placeholder="Seleccionar..." value={closer}
                                {...register("closer", { required: { value: true, message: 'Coordinador es necesario' } })}
                                onChange={(e) => setCloser(e.target.value)}
                            >
                                <option value={''}>{`Seleccionar usuario...`}</option>
                                {
                                    usersList?.map((user, i) => (
                                        <option value={user?._id} key={i} >{`${user?.firstName} ${user?.lastName} (${user?.role[0]?.role})`}</option>
                                    ))
                                }
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                        </div>

                        {division ?
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
                </div>
            </form>
        </div>
    )
}
