import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import Paginator from '../shared/Paginator'
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { BankForm } from './BankForm';
import { getBanksAction } from '../../store/actions/bankActions';
import BankCard from './BankCard';

export default function BankList() {
    const dispatch = useDispatch();
    const banksList = useSelector(state => state.banks.banks)
    const totalItems = useSelector(state => state.banks.total)

    const [show, setShow] = useState(false)
    const [page, setPage] = useState(1)

    const updateShow = (_show) => setShow(_show)

    useEffect(() => {
        dispatch(getBanksAction(page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    return (
        <>
            <div className="row justify-content-center">
                {
                    banksList?.map((data, index) => (
                        <div className="col-md-4 col-sm-12 col-xl-3 mb-4" key={index}>
                            <BankCard bank={data} ></BankCard>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
