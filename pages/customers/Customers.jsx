import { useState } from "react";
import Head from "next/head";
import AdminLayout from '../../layouts/AdminLayout'
import CustomerList from '../../components/Customers/CustomerList.jsx'
import CustomerHeader from '../../components/Customers/CustomerHeader'
import Loading from '../../components/shared/Loading'
//Redux
import { useSelector } from 'react-redux';
const Customers = () => {
    const isLoading = useSelector(state => state.customers.loading)
    return (
        <div className="">
            <Head>
                <title>Clientes - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <CustomerHeader />
                    </div>
                    <div className='ms-1 mt-4'>
                        <CustomerList />
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}
export default Customers
