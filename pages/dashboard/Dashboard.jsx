import React from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link'
import DashboardsGeneralData from './../../components/shared/DashboardsGeneralData';
import LineChart from './../../components/DashBoard/LineChart';
import TableList from './../../components/DashBoard/TableList';
import { useEffect, useState } from 'react';
import { getLatestCustomers, getPastDueProperties } from '../../api/dashboard';

const Dashboard = () => {
    const totalCustomers = useSelector(state => state.customers.total);
    const totalUsers = useSelector(state => state.users.total);
    const totalProperties = useSelector(state => state.properties.total);
    const totalBuilders = useSelector(state => state.builders.total)

    const [customers, setCustomers] = useState([])
    const [properties, setProperties] = useState([])

    useEffect(() => {
        getLatestCustomers().then(data => setCustomers(data.customers))
        getPastDueProperties().then(data => setProperties(data.properties))
    }, [])


    return (
        <div className='mt-4'>
            <div className='row d-flex align-items-center'>
                <Link href="/customers" passHref>
                    <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                        <DashboardsGeneralData title={'Total de Clientes'} data={totalCustomers} icon={'bi bi-person-badge'} />
                    </div>
                </Link>
                <Link href='/users' passHref>
                    <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                        <DashboardsGeneralData title={'Total de Empleados'} data={totalUsers} icon={'bi bi-person'} color={'#8B90A0'} />
                    </div>
                </Link>
                <Link href='/properties?type=development' passHref>
                    <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                        <DashboardsGeneralData title={'Total de Inmuebles'} data={totalProperties} icon={'bi bi-house-door'} />
                    </div>
                </Link>
                <Link href='/catalogs/subdivisions' passHref>
                    <div className='col-xl-3 col-md-6 col-12 mb-3 mb-xl-0 pointer' >
                        <DashboardsGeneralData title={'Desarrollos'} data={totalBuilders} icon={'bi bi-bank'} color={'#8B90A0'} />
                    </div>
                </Link>


            </div>
            <div className='stadistics__card__box mt-4'>
                <TableList title={'Ultimos Clientes Registrados'} total={customers?.length}>
                    <div className='mt-3'>
                        <div className='flex-between my-2'>
                            <span><b>Nombre(s)</b></span>
                            <span><b>Fecha de Registro</b></span>
                        </div>
                        {
                            customers?.map((data, index) =>
                                <div key={index} className='flex-between px-4 my-2'>
                                    <span>{`${data.firstName} ${data.lastName}`}</span>
                                    <span>{`${new Date(data.registedDate).toLocaleDateString()}`}</span>
                                </div>)
                        }
                    </div>
                </TableList>
                <TableList title={'Propiedades Atrasadas'} total={properties?.length}>
                    <div className='mt-3'>
                        <div className='flex-between my-2'>
                            <span><b>Nombre(s)</b></span>
                            <span><b>Fecha de Registro</b></span>
                        </div>
                        {
                            properties?.map((data, index) =>
                                <div key={index} className='flex-between px-4 my-2'>
                                    <span>{`${data.title}`}</span>
                                    <span>{`${new Date(data.registerDate).toLocaleDateString()}`}</span>
                                </div>)
                        }
                    </div>
                </TableList>
            </div>
            {/* <div className='d-flex flex-column flex-md-row w-100'>
                <div className="card shadow mt-4 me-1 w-100 w-lg-50">
                    <div className="card-title border-bottom">
                        <LineChart title={'Grafico de Clientes'} dataValues={[12, 19, 6, 5, 9, 7]} />
                    </div>
                </div>
                <div className="card shadow mt-4 ms-1 w-100 w-lg-50">
                    <div className="card-title border-bottom">
                        <LineChart title={'Movimiento de Dinero'} dataValues={[16, 5, 6, 13, 9, 7]} />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Dashboard