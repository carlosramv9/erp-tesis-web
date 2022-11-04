import React from 'react'
import { useSelector } from 'react-redux';
import { getUserImage } from '../../../api/users';
import Avatar from '../../shared/Avatar';

const BankCardInfo = () => {
    const bank = useSelector(state => state.banks.currentBank)
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });


    return (
        <div className='p-4'>
            <div className="d-flex justify-content-between">
                <div>
                    <h2>{bank.title}</h2>
                    <h5 className='mt-4'>Colaboradores</h5>
                    {
                        bank.users?.map((data, index) => (
                            <div className='d-flex align-items-center my-2' key={index}>
                                <Avatar getImage={getUserImage} param={data ? data._id : null} status={data?.image ? true : false} width={'30px'} height={'30px'} alt={`${data?.firstName} ${data?.lastName}`} />
                                <div className='ms-2'>
                                    {data.firstName} {data.lastName}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='d-flex flex-column justify-content-start align-items-end'>
                    <div>
                        <span className='text-amount'>{dollarUSLocale.format(bank.amount)}</span>
                        <div>Saldo Disponible</div>
                    </div>
                    <div>
                        <span className='text-debts'>{bank.debts == 0 ? dollarUSLocale.format(bank.debts) : '-' + dollarUSLocale.format(bank.debts)}</span>
                        <div>Adeudos</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankCardInfo