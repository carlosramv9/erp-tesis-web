import React from 'react'
import Avatar from './../shared/Avatar';
import { getUserImage } from '../../api/users';
import Link from 'next/link';
import useAuth from './../../hooks/useAuth';

const BankCard = ({ bank }) => {
    const { title, amount, debts, loans, users, _id } = bank
    const { auth } = useAuth();

    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex mb-3 ms-4">
                    {
                        users?.map((data, index) => (
                            <div className='my-auto' key={index} style={{ marginLeft: '-30px' }} data-toggle="tooltip" data-placement="top" title={`${data?.firstName} ${data?.lastName}`}>
                                <Avatar getImage={getUserImage} param={data ? data._id : null} status={data?.image ? true : false} width={'70px'} height={'70px'} alt={`${data?.firstName} ${data?.lastName}`} />
                            </div>
                        ))
                    }
                </div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Saldo: <span style={{ color: 'green' }} >{dollarUSLocale.format(amount)}</span></p>
            </div>
            {
                users?.filter(x => x._id === auth?.idUser).length > 0 || auth?.role?.role === "ADMIN_ROLE" ?
                    <Link href={`/banks/info/${_id}`} >
                        <div className="card-footer text-center pointer">
                            <span>Ingresar</span>
                        </div>
                    </Link> : null
            }
        </div>
    )
}

export default BankCard