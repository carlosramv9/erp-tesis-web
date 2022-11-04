import Head from "next/head";
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import TemplateHeader from '../../components/Template/TemplateHeader';
import TemplatesList from "../../components/Template/TemplatesList";
//Redux

const Template = () => {
  return (
    <div>
        <Head>
            <title>Plantillas Activas - VIVE Sistemas Inmobiliarios</title>
        </Head>
        <AdminLayout>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    <TemplateHeader/>
                </div>
                <div className='ms-1 mt-4'>
                    <TemplatesList/>
                </div>
            </div>
        </AdminLayout>
    </div>
  )
}

export default Template