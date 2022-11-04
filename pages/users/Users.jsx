import Head from "next/head";
import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import UsersHeader from '../../components/Users/UsersHeader'
import UsersList from '../../components/Users/UsersList'
import Loading from '../../components/shared/Loading'
//Redux
import { useSelector } from 'react-redux';
const Users = () => {
    return (
        <div>
            <Head>
                <title>Usuarios - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <UsersHeader />
                    </div>
                    <div className='ms-1 mt-4'>
                        <UsersList />
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}

export default Users
