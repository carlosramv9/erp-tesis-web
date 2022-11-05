import { useState, useEffect } from "react";
import Head from "next/head";
import AdminLayout from '../../../layouts/AdminLayout'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setBankAction } from "../../../store/actions/bankActions";
import Loading from './../../../components/shared/Loading';
import CardInfo from '../../../components/Banks/Info/BankCardInfo';
import BankActions from './../../../components/Banks/Info/BankActions';
import BankMovements from './../../../components/Banks/Info/BankMovements';
import Modal from '../../../components/shared/Modal';
import { BankForm } from './../../../components/Banks/BankForm';
import useAuth from './../../../hooks/useAuth';
const BankInformation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.banks.loadingSetBank)
    const bank = useSelector(state => state.banks.currentBank)
    const {auth} = useAuth();

    const { id } = router.query;
    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(setBankAction(id))
        
    }, [])

    const updateShow = (_show) => setShow(_show)

    return (
        <div className="">
            <Head>
                <title>Clientes - VIVE Sistemas Inmobiliarios</title>
            </Head>
            <AdminLayout>
                <div className='mt-4 d-flex flex-column'>
                    <div className="row pb-3 border-bottom justify-content-between">
                        <span className="col-md-2 col-sm-12 pointer" onClick={() => router.back()}>
                            <i className={`bi bi-arrow-return-left mx-3`}></i> {"Regresar"}
                        </span>
                        {
                            bank.users?.filter(x => x._id === auth?.idUser).length > 0 || auth?.role?.role === "ADMIN_ROLE" ?
                                <span className="col d-flex justify-content-end me-2" style={{ fontSize: '1.9rem' }}>
                                    <i className="fa-solid fa-pen-to-square pointer" onClick={() => updateShow(true)}></i>
                                </span> : null
                        }
                    </div>
                    <div className='border-bottom'>
                        {
                            isLoading ? (<Loading />) : (<CardInfo />)
                        }
                    </div>
                    <BankActions></BankActions>
                    <div className='ms-1 mt-4'>
                        <BankMovements></BankMovements>
                    </div>
                </div>

                <Modal title="Actualizar Banco" show={show} setShow={setShow} fullscreen={false} >
                    <BankForm show={updateShow} bank={bank} />
                </Modal>
            </AdminLayout>
        </div>
    )
}
export default BankInformation
