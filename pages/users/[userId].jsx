import Head from "next/head";
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../layouts/AdminLayout'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUserAction } from "../../store/actions/usersAction";
//Components
import Loading from '../../components/shared/Loading';
import UserInformationContent from "../../components/Users/UserInformationContent";

const CurrentUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userId } = router.query;
    const loading = useSelector(state => state.users.loadingSetUser)

    useEffect(() => {
        dispatch(setCurrentUserAction(userId));
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Head>
                <title>Informacion de usuario - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                {loading ? <Loading /> : <UserInformationContent />}
            </AdminLayout>
        </div>
    )
}

export default CurrentUser
