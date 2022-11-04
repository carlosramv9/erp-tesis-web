import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
//Redux
import ToolTip from '../shared/ToolTip'
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentUserAction } from '../../store/actions/usersAction';
import Required from '../shared/Required'
//form
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
//actions
import {updateUserAction, deleteUserAction, createUserAction} from '../../store/actions/usersAction'

const UserForm = (props) => {
    const dispatch = useDispatch();
    const {user, setShow} = props;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const rolesList = useSelector(state => state.roles.roles)
    const processData = async (data) => {
        if(user){
            data._id = user._id;
            data.role==='default' ?data.role=user.role._id :data.role=data.role;
            data.birthDate ?data.birthDate :data.birthDate=user.birthDate;
            data.entryDate ?data.entryDate :data.entryDate = user.entryDate; 
            await dispatch(updateUserAction(data))
            dispatch(setCurrentUserAction(user._id));
        }else{
            await dispatch(createUserAction(data))
        }
        setShow(false);
    }

    return (
        <div className='mx-2'>
            <form onSubmit={handleSubmit(processData)}>
                <div className="mb-3">
                    <Required/>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Nombre</label>
                        <input name='firstName' type="text" placeholder='Nombre' defaultValue={user?user.firstName:null} className='form-control my-2' {...register("firstName", { required: { value: true, message: 'El Nombre es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.firstName?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Apellido</label>
                        <input name='lastName' type="text" placeholder='Apellido' defaultValue={user?user.lastName:null} className='form-control my-2' {...register("lastName", { required: { value: true, message: 'El Apellido es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.lastName?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex align-items-center'>
                            <label className='input-label me-2'><span className="color-primary h5">*</span> Email</label>
                            <ToolTip placement="right" description="correo@dominio"/>
                        </div>
                        <input name='email' type="email"  defaultValue={user?user.email:null}  placeholder='Ingresa el email de el usuario' 
                            className='form-control my-2' 
                            {...register("email", { required: { value: true, message: 'El email es obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                    </div>
                    {
                        user?null:<Password register={register} errors={errors}/>
                    }
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <div >
                            <label className='input-label me-2'><span className="color-primary h5">*</span> RFC</label>
                            <ToolTip placement="right" description="deben ser 13 caracteres"/>
                        </div>
                        <input name='rfc' type="text" placeholder='Registro Federal de Contribuyentes' maxLength='13' defaultValue={user? user.rfc: null} className='form-control my-2' {...register("rfc", { required: { value: true, message: 'El RFC es obligatorio' },  minLength: { value: 13, message: "Min lenght 13" }, maxLength: { value: 13, message: "Max lenght 13" }})}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.rfc?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <div >
                            <label className='input-label me-2'><span className="color-primary h5">*</span> NSS</label>
                            <ToolTip placement="right" description="deben ser 11 caracteres"/>
                        </div>
                        <input name='nss' type="text" placeholder='Numero del Seguro Social' maxLength='11' defaultValue={user?user.nss:null} className='form-control my-2' {...register("nss", { required: { value: true, message: 'El NSS es obligatorio' }, minLength: { value: 11, message: "Min lenght 11" }, maxLength: { value: 11, message: "Max lenght 11" } })}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.nss?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-column w-100'>
                    <label className='input-label'><span className="color-primary h5">*</span>  Dirección</label>
                    <input name='address' type="text" placeholder='Ingresa tu Direccion' defaultValue={user?user.address:null} className='form-control my-2' {...register("address", { required: { value: true, message: 'La direccion es obligatoria' },  minLength: { value: 1, message: "Min lenght 1" }})}/>
                    <span className='text-danger text-small d-block mb-2'>{errors?.address?.message}</span>
                </div>
               {
                   user
                   ?<UpdateDates register={register} errors={errors}/>
                   :<CreateDates register={register} errors ={errors}/>
               }



                <div className='d-flex flex-between w-100 align-items-center'>
                    <div className='d-flex flex-column w-100 mb-1 me-2'>
                        <label className='input-label mb-2'><span className="color-primary h5">*</span>  Puesto</label>
                        <select name='role' defaultValue={user ? user?.role?._id : 'default'} className='form-select' {...register("role", { required: { value: true, message: 'El puesto es obligatorio' }})}>
                            <option value='default'>Selecciona el puesto del empleado</option>
                            {
                                rolesList?.map((data, index) =>(
                                    <option key={index} value={data?._id}> {data?.role} </option>
                                ))
                            }
                        </select>
                        <span className='text-danger text-small d-block mb-2'>{errors?.role?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label>Email Personal</label>
                        <input name='personalEmail' type="email"  defaultValue={user?user.personalEmail:null}  placeholder='Ingresa el email de el usuario' 
                            className='form-control my-2' 
                            {...register("personalEmail", { required: { value: false, message: 'El email es obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.personalEmail?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Salario</label>
                        <input name='salary' type="number" placeholder='Ingresa el Salario' defaultValue={user?user.salary:null} className='form-control my-2' {...register("salary", { required: { value: true, message: 'El salario es obligatorio' }})}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.salary?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Comision Base</label>
                        <input name='baseCommission' type="number" step=".001" placeholder='Comision Base' min='0' max='100' defaultValue={user?user.baseCommission:null} className='form-control my-2' {...register("baseCommission", { required: { value: true, message: 'La comision base es obligatoria' }})}/>
                        <span className='text-danger text-small d-block mb-2'>{errors?.baseCommission?.message}</span>
                    </div>
                </div>
                {
                    user
                    ?<EditButtons/>
                    :<CreateButtons/>
                }
            </form>
        </div>
    )
}
function EditButtons(){
    return(
        <div className='d-flex flex-between'>
            <button type="submit" className='btn btn-action-primary w-50 ms-auto me-auto'>Actualizar</button>
        </div>
    )
}
function CreateButtons(props){
    return(
        <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-action-primary w-auto my-4'>Nuevo Usuario</button>
        </div>
        )
}

function UpdateDates(props){
    const {register, errors} = props;
    return(
        <div className='d-flex flex-between w-100'>
            <div className='d-flex flex-column w-100 me-2'>
                <label className='input-label'><span className="color-primary h5">*</span>  Fecha de nacimiento</label>
                <input name='birthDate' type="date" placeholder='Fecha de nacimiento' max={dayjs().format('YYYY-MM-DD')} defaultValue={'11/12/2020'} className='form-control my-2' {...register("birthDate")}/>
                <span className='text-danger text-small d-block mb-2'>{errors?.birthDate?.message}</span>
            </div>
            <div className='d-flex flex-column w-100 ms-2'>
                <label className='input-label'><span className="color-primary h5">*</span>  Fecha de ingreso</label>
                <input name='entryDate' type="date" placeholder='Fecha de ingreso' max={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("entryDate")}/>
                <span className='text-danger text-small d-block mb-2'>{errors?.entryDate?.message}</span>
            </div>
        </div>
    )
}
function CreateDates(props){
    const {register, errors} = props;
    return(
        <div className='d-flex flex-between w-100'>
            <div className='d-flex flex-column w-100 me-2'>
                <label className='input-label'><span className="color-primary h5">*</span> Fecha de nacimiento</label>
                <input name='birthDate' type="date" placeholder='Fecha de nacimiento' max={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("birthDate", { required: { value: true, message: 'La fecha de cumpleaños es obligatoria' }})}/>
                <span className='text-danger text-small d-block mb-2'>{errors?.birthDate?.message}</span>
            </div>
            <div className='d-flex flex-column w-100 ms-2'>
                <label className='input-label'><span className="color-primary h5">*</span> Fecha de ingreso</label>
                <input name='entryDate' type="date" placeholder='Fecha de ingreso' max={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("entryDate", { required: { value: true, message: 'La fecha de ingreso es obligatoria' }})}/>
                <span className='text-danger text-small d-block mb-2'>{errors?.entryDate?.message}</span>
            </div>
        </div>
    )
}

function Password(props){
    const {register, errors} = props;
    return(
        <div className='d-flex flex-column w-100 ms-2'>
            <div >
                <label className='input-label me-2'><span className="color-primary h5">*</span> Contraseña</label>
                <ToolTip placement="right" description="Minimo 6 caracteres"/>
            </div>
            <input name='password' type="password" placeholder='Ingresa la Contraseña' className='form-control my-2' {...register("password", { required: { value: true, message: 'La contraseña es obligatoria' }, minLength: { value: 6, message: "Min lenght 6" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.password?.message}</span>
        </div>
    )
}

export default UserForm
