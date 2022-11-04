import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addUserAttachmentAction } from '../../store/actions/usersAction'

const NewAttachmentForm = ({ id }) => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { currentUserTab } = useSelector(state => state.users)

  const uploadDocument = async formData => {
    const { name, category, file } = formData;
    const data = { name, category };
    await dispatch(addUserAttachmentAction(id, data, file[0], currentUserTab))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(uploadDocument)}>
        <div className='d-flex flex-between w-100'>
          <div className='d-flex flex-column w-100 me-2'>
            <label className='input-label'>Nombre</label>
            <input name='name' type="text" placeholder='Nombre del Archivo' className='form-control my-2' {...register("name", { required: { value: true, message: 'El Nombre del archivo es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
          </div>
          <div className='d-flex flex-column w-100 ms-2'>
            <label className='input-label'>Categoria</label>
            <input name='category' type="text" placeholder='Categoria del Archivo' className='form-control my-2' {...register("category", { required: { value: true, message: 'La Categoria es obligatoria' }, minLength: { value: 2, message: "Min lenght 2" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.category?.message}</span>
          </div>
        </div>
        <div className='d-flex flex-column flex-between w-100'>
          <input name='file' type='file' className='form-control' {...register("file", { required: { value: true, message: 'El archivo es obligatorio' } })}></input>
          <span className='text-danger text-small d-block mb-2'>{errors?.file?.message}</span>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className='btn btn-action-primary w-auto my-4'>Agregar Documento</button>
        </div>
      </form>
    </div>
  )
}

export default NewAttachmentForm