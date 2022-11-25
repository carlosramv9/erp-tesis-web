import Head from "next/head";
import React,{useState,useEffect} from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import RoleList from '../../components/Roles/RolesList';
import RolesHeader from '../../components/Roles/RolesHeader';
import Loading from '../../components/shared/Loading'
import RolesPriority from "../../components/Roles/RolesPriority";
//Redux
import { useSelector } from 'react-redux';
const Roles = () => {

    const isLoadingPriority = useSelector(state => state.roles.loadingPriority)
    return (
        <div>
            <Head>
                <title>Roles - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className='border-bottom'>
                        <RolesHeader/>
                    </div>
                    <div className='ms-1 mt-3'>
                        <div className='row'>
                            <div className='col-md-7 col-sm-12 overflow-auto'>
                                <RoleList className='overflow-auto'/>
                            </div>
                            <div className='col-md-5 cols-sm-12'>
                                <div className='mt-5'>
                                    {   !isLoadingPriority
                                        ?<RolesPriority />
                                        :(<div className="d-flex justify-content-center mt-3">
                                    </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </AdminLayout>
        </div>
    )
}

export default Roles
