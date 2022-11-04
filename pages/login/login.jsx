import React,{useEffect} from 'react';
import LoginForm from '../../components/LoginForm';
import Image from 'next/image';
import Head from "next/head";
export default function Login() {

    return (
        <div className='login'>
             <Head>
                <title>Login - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <div className='login_content'>
                <div className='row login_card'>
                    <div className='col-md-12  col-lg-6 col-xl-7 col-sm-12 p-0 login_logo'>
                        <div className='w-100'>
                            <Image 
                                quality={100} 
                                height='100' 
                                    className="p-5" 
                                    width='100' 
                                    layout="responsive" 
                                    objectFit="contain"  
                                    alt='logo-xl' 
                                    src="/app-logo-xl.png"/>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-6 col-xl-5 col-sm-12 mt-0'>
                            <LoginForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}
