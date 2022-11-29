import React, { useState } from 'react'
import PDF from "../../public/img/pdf.png";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getToken } from '../../api/token';
import { toast } from "react-toastify";
import { addProcessAction } from '../../store/actions/processActions';

const CreateProcessForm = ({ show }) => {
    const dispatch = useDispatch();
    const properties = useSelector(x => x.properties.properties.filter(x => x.propertyState === 'available'))
    const templatesList = useSelector(x => x.templates.templatesList)
    const customersList = useSelector(x => x.customers.customers)
    const { register, formState: { errors }, handleSubmit } = useForm();


    const processData = async (data, e) => {
        const token = getToken();
        if (token) {
            dispatch(addProcessAction(data))
            show(false)
            toast.success('Uploaded Successful')
        }
        else {
            toast.error("Information Failed")
        }
    }

    return (

        <form onSubmit={handleSubmit(processData)} method="post" className='form-box'>
            <div className='d-flex flex-column'>
                <div className="my-2">
                    <label htmlFor="">Seleccionar Plantilla de Venta</label>
                    <select name="" id="" className='form-select' {...register('processTemplate', { required: { value: true, message: 'Campo Obligatorio' } })}>
                        <option value=''>Seleccionar...</option>
                        {
                            templatesList?.map((data, index) => <option key={index} value={data._id}>{data.name}</option>)
                        }
                    </select>
                    <span className='text-danger text-small d-block mb-2'>{errors?.processTemplate?.message}</span>
                </div>
                <div className="my-2">
                    <label htmlFor="">Seleccionar Propiedad</label>
                    <select name="" id="" className='form-select' {...register('property', { required: { value: true, message: 'Campo Obligatorio' } })}>
                        <option value=''>Seleccionar...</option>
                        {
                            properties?.map((data, index) => <option key={index} value={data._id}>{data.title}</option>)
                        }
                    </select>
                    <span className='text-danger text-small d-block mb-2'>{errors?.processTemplate?.message}</span>
                </div>
                <div className="my-2">
                    <label htmlFor="">Seleccionar Cliente</label>
                    <select name="" id="" className='form-select' {...register('customer', { required: { value: true, message: 'Campo Obligatorio' } })}>
                        <option value=''>Seleccionar...</option>
                        {
                            customersList?.map((data, index) => <option key={index} value={data._id}>{`${data.firstName} ${data.lastName}`}</option>)
                        }
                    </select>
                    <span className='text-danger text-small d-block mb-2'>{errors?.processTemplate?.message}</span>
                </div>
                <div className="flex-end">
                    <button type='submit' className='btn btn-action-primary'>Guardar</button>
                </div>
            </div>
        </form>
    )
}

export default CreateProcessForm