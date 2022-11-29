import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Required from '../shared/Required';
import { useForm } from 'react-hook-form';
import ToolTip from '../shared/ToolTip'
import { addInvestorsAction, updateInvestorsAction } from '../../store/actions/investorActions';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const InvestorForm = ({ investor, setShow }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const processData = async (data) => {
    if (investor) {
      data._id = investor._id;
      data.role === 'default' ? data.role = investor.role._id : data.role = data.role;
      data.birthDate ? data.birthDate : data.birthDate = investor.birthDate;
      data.entryDate ? data.entryDate : data.entryDate = investor.entryDate;
      dispatch(updateInvestorsAction(id, investor._id, { ...data, bank: id }))
    } else {
      dispatch(addInvestorsAction(id, { ...data, bank: id }))
    }
    setShow(false);
  }

  return (
    <div className='mx-2'>
      <form onSubmit={handleSubmit(processData)}>
        <div className="mb-3">
          <Required />
        </div>
        <div className='d-flex flex-between w-100'>
          <div className='d-flex flex-column w-100 me-2'>
            <label className='input-label me-2'><span className="color-primary h5" >*</span>  Nombre</label>
            <input name='firstName' type="text" placeholder='Nombre' defaultValue={investor ? investor.firstName : null} className='form-control my-2' {...register("firstName", { required: { value: true, message: 'El Nombre es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.firstName?.message}</span>
          </div>
          <div className='d-flex flex-column w-100 ms-2'>
            <label className='input-label'><span className="color-primary h5">*</span>  Apellido</label>
            <input name='lastName' type="text" placeholder='Apellido' defaultValue={investor ? investor.lastName : null} className='form-control my-2' {...register("lastName", { required: { value: true, message: 'El Apellido es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.lastName?.message}</span>
          </div>
        </div>
        <div className='d-flex flex-between w-100'>
          <div className='d-flex flex-column w-100 me-2'>
            <div className='d-flex align-items-center'>
              <label className='input-label me-2'>Email</label>
              <ToolTip placement="right" description="correo@dominio" />
            </div>
            <input name='email' type="email" defaultValue={investor ? investor.email : null} placeholder='Ingresa el email de el usuario'
              className='form-control my-2'
              {...register("email", { required: { value: false, message: 'El email es obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
          </div>
        </div>
        <div className='d-flex flex-between w-100'>
          <div className='d-flex flex-column w-100 me-2'>
            <div >
              <label className='input-label me-2'><span className="color-primary h5">*</span> RFC</label>
              <ToolTip placement="right" description="deben ser 13 caracteres" />
            </div>
            <input name='rfc' type="text" placeholder='Registro Federal de Contribuyentes' maxLength='13' defaultValue={investor ? investor.rfc : null} className='form-control my-2' {...register("rfc", { required: { value: true, message: 'El RFC es obligatorio' }, minLength: { value: 13, message: "Min lenght 13" }, maxLength: { value: 13, message: "Max lenght 13" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.rfc?.message}</span>
          </div>
          <div className='d-flex flex-column w-100 ms-2'>
            <div >
              <label className='input-label me-2'><span className="color-primary h5">*</span> CURP</label>
              <ToolTip placement="right" description="deben ser 11 caracteres" />
            </div>
            <input name='curp' type="text" placeholder='Numero del Seguro Social' maxLength='18' defaultValue={investor ? investor.curp : null} className='form-control my-2' {...register("curp", { required: { value: true, message: 'El CURP es obligatorio' }, minLength: { value: 18, message: "Min lenght 11" }, maxLength: { value: 18, message: "Max lenght 18" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.curp?.message}</span>
          </div>
        </div>
        <div className='d-flex flex-between w-100'>
          <div className='d-flex flex-column w-100 ms-2'>
            <label className='input-label'><span className="color-primary h5">*</span> Inversión Inicial</label>
            <input name='amount' type="number" step=".001" placeholder='Saldo Inicial' min='0' defaultValue={investor ? investor.amount : null} className='form-control my-2' {...register("amount", { required: { value: true, message: 'El saldo de inicio es obligatorio' } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.amount?.message}</span>
          </div>
          <div className='d-flex flex-column w-100 ms-2'>
            <label className='input-label'><span className="color-primary h5">*</span> Interés (%)</label>
            <input name='interest' type="number" step=".001" placeholder='Interés' min='0' defaultValue={investor ? investor.interest : null} className='form-control my-2' {...register("interest", { required: { value: true, message: 'El Interés es obligatorio' } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.interest?.message}</span>
          </div>
          <div className='d-flex flex-column w-100 ms-2'>
            <label className='input-label'><span className="color-primary h5">*</span>  Fecha de Finalización</label>
            <input name='finishedDate' type="date" placeholder='Fecha de Finalización' min={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("finishedDate", { required: { value: true, message: 'La direccion es obligatoria' } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.finishedDate?.message}</span>
          </div>
        </div>
        <div className='d-flex flex-column w-100'>
          <label className='input-label'><span className="color-primary h5">*</span>  Dirección</label>
          <textarea name='address' placeholder='Ingresa tu Direccion' defaultValue={investor ? investor.address : null} className='form-control my-2' {...register("address", { required: { value: true, message: 'La direccion es obligatoria' }, minLength: { value: 1, message: "Min lenght 1" } })} rows={2} />
          <span className='text-danger text-small d-block mb-2'>{errors?.address?.message}</span>
        </div>
        {
          investor
            ? <EditButtons />
            : <CreateButtons />
        }
      </form>
    </div>
  )
}

function EditButtons() {
  return (
    <div className='d-flex flex-between'>
      <button type="submit" className='btn btn-action-primary w-50 ms-auto me-auto'>Actualizar</button>
    </div>
  )
}
function CreateButtons(props) {
  return (
    <div className='d-flex justify-content-end'>
      <button type="submit" className='btn btn-action-primary w-auto my-4'>Nuevo Usuario</button>
    </div>
  )
}

export default InvestorForm