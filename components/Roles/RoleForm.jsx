import React, { useState, useEffect } from 'react';
//Redux
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
//actions
import {updateRoleAction, deleteRoleAction, createRoleAction} from '../../store/actions/rolesAction'

const RoleForm = (props) => {
    const dispatch = useDispatch();
    const {role, setShow} = props
    const { register, formState: { errors }, handleSubmit } = useForm();

    const processData = async (data) => {
        if(role){
            role.role = data.role;
            await dispatch(updateRoleAction(role))
        }else{
            await dispatch(createRoleAction(data))
        }
        setShow(false)
    }

    const handleDelete = async () => {
        await dispatch(deleteRoleAction(role._id))
        setShow(false)
    }
    return (
        <div className='mx-2'>
            <form onSubmit={handleSubmit(processData)}> 
                <label className='input-label'>Nombre del Rol</label>
                
                {
                    role
                    ?<input name='role' type="text" placeholder='Registra el nombre del Rol' defaultValue={role.role} className='form-control my-2' {...register("role", { required: { value: false, message: 'El nombre del Rol es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })}/>
                    :<input name='role' type="text" placeholder='Registra el nombre del Rol' className='form-control my-2' {...register("role", { required: { value: true, message: 'El nombre del Rol es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })}/>
                }
                    <span className='text-danger text-small d-block mb-2'>{errors?.role?.message}</span>
                {
                    role
                    ?<EditButtons handleDelete={handleDelete}/>
                    :<CreateButtons/>
                }
            </form>
        </div>
    )
}

function EditButtons({handleDelete}){
    return(
        <div className='d-flex flex-between'>
            <button type='button' onClick={()=>handleDelete()}className='btn btn-block btn-action-warning w-100 me-2'>Eliminar</button>
            <button type="submit" className='btn btn-action-primary w-100 ms-2'>Actualizar</button>
        </div>
    )
}
function CreateButtons(){
    return(
        <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-action-primary w-25 my-4 w-auto'>Nuevo Rol</button>
        </div>
        )
}
export default RoleForm
