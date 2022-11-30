import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { v4 } from 'uuid';

const CreateTaskForm = ({steps, setSteps, selectedStep, setSelectedStep, setShow, setRefresh, refresh}) => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const createNewTask = formData =>{
        const taskData = {...formData, dndId:v4(), index:selectedStep?.tasks.length + 1}
        const { tasks:currentTasks } = selectedStep;
        currentTasks.push(taskData);
        setSelectedStep({...selectedStep, tasks:currentTasks});
        setShow(false);
        setRefresh(!refresh)
    }
  return (
      
    <div>
        <form onSubmit={handleSubmit(createNewTask)}>
            <div className='d-flex flex-between w-100 flex-row'>
                <div className='d-flex flex-column w-100 me-2'>
                    <label className='input-label'>Nombre de la tarea</label>
                    <input name='name' type="text" placeholder='Ingresa el Nombre de la tarea' className='form-control my-2' {...register("name", { required: { value: true, message: 'El Nombre del archivo es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })}/>
                    <span className='text-danger text-small d-block mb-2'>{errors?.name?.message}</span>
                </div>
                <div className='d-flex flex-column w-100 ms-2'>
                    <label className='input-label'>Tipo de Tarea</label>
                    <select className="form-select mt-2" aria-label="Default select example" name='type' {...register("type", { required: { value: true, message: 'El tipo de tarea es obligatoria' }, minLength: { value: 1, message: "Min lenght 2"}})}>
                            <option value=''>Selecciona el tipo de tarea</option>
                            <option value="Attachment">Documento</option>
                            <option value="Appointment">Cita</option>
                            <option value="Contract">Contrato</option>
                            {/* <option value="dataUpdate">Actualizacion de Informacion</option> */}
                    </select>
                    <span className='text-danger text-small d-block mb-2'>{errors?.type?.message}</span>
                </div>
            </div>
            <div>
                <label className='input-label'>Descripcion</label>
                <textarea name='description' placeholder='Describe la tarea' className='form-control my-2' {...register("description", { required: { value: true, message: 'La descripcion de la tarea es obligatoria' }, minLength: { value: 15, message: "Ingresa minimo 15 caracteres" } })}/>
                <span className='text-danger text-small d-block mb-2'>{errors?.description?.message}</span>
            </div>
            <div className='d-flex justify-content-center align-items-center flex-between'>
                <div className='d-flex'>
                    <input name='isRequired' className="form-check-input me-1" type="checkbox" value="" {...register("isRequired")}/>
                    <label className="form-check-label">Es obligatorio?</label>
                </div>
                <button type="submit" className='btn btn-action-primary w-auto my-4'>Agregar Documento</button>
            </div>
        </form>
    </div>
  )
}

export default CreateTaskForm