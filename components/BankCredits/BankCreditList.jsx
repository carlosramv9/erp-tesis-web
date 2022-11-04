import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import Paginator from '../shared/Paginator'
import BankCreditHeader from './BankCreditHeader';
import Loading from '../shared/Loading';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { BankCreditForm } from './BankCreditForm';
import { getBankCreditsAction } from '../../store/actions/bankCreditActions';

export default function BankCreditList() {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.bankCredits.loading)
    const bankCreditsList = useSelector(state => state.bankCredits.bankCredits)
    const totalItems = useSelector(state => state.bankCredits.total)
    
    const [show, setShow] = useState(false)
    const [bankCreditsArray, setbankCreditsArray] = useState(bankCreditsList)
    const [bankCredit, setbankCredit] = useState({})
    const [page, setPage] = useState(1)
    const updateShow = (_show) => setShow(_show)
    
    useEffect(() => {
        dispatch(getBankCreditsAction(page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const searchHandler = (e) => setbankCreditsArray(bankCreditsList.filter(x => (x.firstName + x.lastName).includes(e.target.value)))

    return (
        <>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    {isLoading ? <Loading /> : <BankCreditHeader />}
                </div>
            </div>
            <div className="row m-3">
                <div className="col-md-4 col-xl-3 col-sm-12">
                    <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Buscar..." id="example-search-input" onChange={e => searchHandler(e)} />
                </div>
            </div>
            <div className='d-flex justify-content-end me-4'>
                <Paginator totalItems={totalItems} page={page} setPage={setPage} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bankCreditsList?.map((data, index) => (
                            <tr key={index} onClick={() => { setShow(!show); setbankCredit(data) }}>
                                <td>{data?.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="Crédito" show={show} setShow={setShow}>
                <BankCreditForm show={updateShow} bankCredit={bankCredit} />
            </Modal>
        </>
    )
}
