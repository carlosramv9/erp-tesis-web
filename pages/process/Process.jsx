import Head from "next/head";
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ProcessHeader from '../../components/Process/ProcessHeader';
import UnderDevelopment from "../../components/shared/UnderDevelopment";
import ProcessList from "../../components/Process/ProcessList";

const process = () => {
    return (
        <div>
            <Head>
                <title>Procesos Activos - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <ProcessHeader />
                    </div>

                    <div className='ms-1 mt-4'>
                        {/* <UnderDevelopment/> */}
                        <ProcessList></ProcessList>                        
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}

export default process
