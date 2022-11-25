import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginApi } from '../../api/login';
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
    const [loginFlag, setLoginFlag] = useState(true);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login } = useAuth();

    const processData = async (data, e) => {
        if (loginFlag) {
            const response = await loginApi(data);
            const { token, status } = response;
            if (token) {
                login(token);
                toast.success('Credenciales Correctas')
            } else {
                toast.error("Email o contrasena invalidos")
            }
        } else {

        }
        e.target.reset();
    }

    return (
        <div className='d-flex flex-column justify-content-center loginform px-2'>
            <div className='d-flex flex-column justify-content-center align-items-center loginform_header'>
                <h1 className='mt-5 text-center'>Bienvenido</h1>
            </div>
            <div className='loginform_form mt-4 px-1'>
                <form onSubmit={handleSubmit(processData)}>
                    <label>Email</label>
                    <input name='email' type="email" placeholder='Enter your user Email' 
                        className='form-control my-2' 
                        {...register("email", { required: { value: true, message: 'The email is required' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                    <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                    <label>Password</label>
                    <input name='password' type="password" placeholder='Enter your Password' className='form-control my-2' {...register("password", { required: { value: true, message: 'The password is required' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                    <span className='text-danger text-small d-block mb-2'>{errors?.password?.message}</span>
                    <button className='btn btn-primary w-100 my-4'>Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;


