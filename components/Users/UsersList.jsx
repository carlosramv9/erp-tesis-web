import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import Paginator from '../shared/Paginator'
import { useRouter } from 'next/router'
import Loading from '../shared/Loading'
import Avatar from '../shared/Avatar'
import { getUserImage } from '../../api/users';
import NoDataFound from '../shared/NoDataFound';

export default function CustomerList() {
    const router = useRouter();
    const usersList = useSelector(state => state.users.users)
    const isLoading = useSelector(state => state.users.loading)
    //dispatch(setCurrentUserAction())


    return (
        <div>
            {
                isLoading
                    ? <Loading />
                    : <UserTable usersList={usersList} router={router} />
            }

        </div>

    )
}

const UserTable = ({ usersList, router }) => {

    return (
        usersList?.length > 0
            ? (<table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className='table-header'>Nombre</th>
                        <th className='table-header'>Correo</th>
                        <th className='table-header'>Puesto</th>
                        <th className='table-header'>Cumpleaños</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList?.map((data, index) => (
                            <tr key={index} onClick={() => { router.push(`/users/${data._id}`) }}>
                                <td> <Avatar alt={data._id} getImage={getUserImage} param={data?._id} status={data?.image ? true : false} width={'50px'} height={'50px'} /></td>
                                <td>{data?.firstName + ' ' + data?.lastName}</td>
                                <td>{data?.email}</td>
                                <td className='text-left'>{data?.role?.role}</td>
                                <td className='text-left'>{dayjs(data?.birthDate).format("DD MMM YYYY")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>)
            : <NoDataFound />
    )
}