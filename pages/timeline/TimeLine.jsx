import React from 'react'
import Head from "next/head";
import AdminLayout from '../../layouts/AdminLayout';
import TimeLineHeader from '../../components/TimeLine/TimeLineHeader';
import TimeLineStructure from '../../components/TimeLine/TimeLineStructure';

const TimeLine = () => {
  return (
    <div>
        <Head>
            <title>Time Line- VIVE Sistemas Inmobiliarios</title>
        </Head>
        <AdminLayout>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    <TimeLineHeader/>
                </div>
                <div className='ms-1 mt-4'>
                    <TimeLineStructure/>
                </div>
            </div>
        </AdminLayout>
    </div>
  )
}

export default TimeLine