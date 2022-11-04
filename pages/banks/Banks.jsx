import { useState } from "react";
import Head from "next/head";
import AdminLayout from '../../layouts/AdminLayout'
import BankList from '../../components/Banks/BankList.jsx'
import BankHeader from '../../components/Banks/BankHeader'
import Loading from '../../components/shared/Loading'
//Redux
import { useSelector } from 'react-redux';
const Banks = () => {
    const isLoading = useSelector(state => state.customers.loading)
    return (
        <div className="">
            <Head>
                <title>Clientes - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <BankHeader />
                    </div>
                    <div className='ms-1 mt-4'>
                        <BankList />
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}
export default Banks
