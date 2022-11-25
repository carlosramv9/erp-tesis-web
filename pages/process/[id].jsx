import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import ProcessInfo from '../../components/Process/ProcessInfo'
import AdminLayout from '../../layouts/AdminLayout'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setProcessAction } from '../../store/actions/processActions'

const ProcessInformation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const currentProcess = useSelector(state => state.processes.currentProcess)

    useEffect(() => {
        dispatch(setProcessAction(router.query.id))
    }, [])


    return (
        <div>
            <Head>
                <title>Propiedades - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <ProcessInfo></ProcessInfo>
            </AdminLayout>

        </div>
    )
}

export default ProcessInformation