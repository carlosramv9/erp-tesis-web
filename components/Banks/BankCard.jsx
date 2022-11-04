import React from 'react'
import Avatar from './../shared/Avatar';
import { getUserImage } from '../../api/users';
import Link from 'next/link';

const BankCard = ({ bank }) => {
    const { title, amount, debts, loans, users, _id } = bank

    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });

    return (
        <div class="card">
            <div class="card-body">
                <div className="d-flex mb-3 ms-4">
                    {
                        users?.map((data, index) => (
                            <div className='my-auto' key={index} style={{ marginLeft: '-30px' }} data-toggle="tooltip" data-placement="top" title={`${data?.firstName} ${data?.lastName}`}>
                                <Avatar getImage={getUserImage} param={data ? data._id : null} status={data?.image ? true : false} width={'70px'} height={'70px'} alt={`${data?.firstName} ${data?.lastName}`} />
                            </div>
                        ))
                    }
                </div>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">Saldo: <span style={{ color: 'green' }} >{dollarUSLocale.format(amount)}</span></p>
            </div>
            <Link href={`/banks/info/${_id}`} >
                <div className="card-footer text-center pointer">
                    <span>Ingresar</span>
                </div>
            </Link>
        </div>
    )
}

export default BankCard