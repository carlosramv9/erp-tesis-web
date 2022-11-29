import React from 'react';
import AdminLayout from '../layouts/AdminLayout'
import Head from 'next/head';
import DashboardScreen from './dashboard/Dashboard';
export default function Home() {
    return (
        <AdminLayout hidden={true}>
            <Head>
                <title>Dashboard - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <DashboardScreen />            
        </AdminLayout>
    )
}