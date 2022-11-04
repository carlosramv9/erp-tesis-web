import React from 'react';
import AdminLayout from '../layouts/AdminLayout'
import {useSelector} from 'react-redux';
import Link from 'next/link'
import LineChart from '../components/DashBoard/LineChart'
import DashboardsGeneralData from '../components/shared/DashboardsGeneralData';
import Loading from '../components/shared/Loading'
import Head from 'next/head';
export default function Home() {
    const totalCustomers = useSelector(state => state.customers.total);
    const totalUsers = useSelector(state => state.users.total);
    const totalProperties = useSelector(state => state.properties.total);
    const totalBuilders = useSelector(state => state.builders.total)
    return (
        <AdminLayout hidden={true}>
            <Head>
                <title>Dashboard - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <div className='mt-4'>
                <div className='row d-flex align-items-center'>
                    <Link href="/customers" passHref>
                        <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                            <DashboardsGeneralData title={'Total de Clientes' } data={totalCustomers} icon={'bi bi-person-badge'}/>
                        </div>
                    </Link>
                    <Link href='/users' passHref>
                        <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                            <DashboardsGeneralData title={'Total de Empleados' } data={totalUsers} icon={'bi bi-person'} color={'#8B90A0'}/>
                        </div>
                    </Link>
                    <Link href='/properties?type=development' passHref>
                        <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                            <DashboardsGeneralData title={'Total de Inmuebles' } data={totalProperties} icon={'bi bi-house-door'}/>
                        </div>
                    </Link>
                    <Link href='/catalogs/subdivisions' passHref>
                        <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                            <DashboardsGeneralData title={'Desarrollos' } data={totalBuilders} icon={'bi bi-bank'} color={'#8B90A0'}/>
                        </div>
                    </Link>
                    
                          
                </div>
                <div className='d-flex flex-column flex-md-row w-100'>
                    <div className="card shadow mt-4 me-1 w-100 w-lg-50">
                        <div className="card-title border-bottom">
                            <LineChart title={'Grafico de Clientes'} dataValues = {[12, 19, 6, 5, 9, 7]}/>
                        </div>
                    </div>
                    <div className="card shadow mt-4 ms-1 w-100 w-lg-50">
                        <div className="card-title border-bottom">
                            <LineChart title={'Movimiento de Dinero'} dataValues ={[16, 5, 6, 13, 9, 7]}/>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}