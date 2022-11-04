import Head from "next/head";
import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import NewTemplateHeader from '../../../components/Template/NewTemplate/NewTemplateHeader';
import NewTemplateStructure from "../../../components/Template/NewTemplate/NewTemplateStructure";

const NewTemplate = () => {
  return (
    <div>
        <Head>
            <title>Nueva Plantilla - VIVE Sistemas Inmobiliarios</title>
        </Head>
        <AdminLayout>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    <NewTemplateHeader/>
                </div>
                <div className='ms-1 mt-4'>
                    <NewTemplateStructure/>
                </div>
            </div>
        </AdminLayout>
    </div>
  )
}

export default NewTemplate