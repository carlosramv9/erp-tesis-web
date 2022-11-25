import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import Paginator from '../shared/Paginator'
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { CustomerForm } from './CustomerForm';
import { TabSelectorCustomer } from './TabSelectorCustomer';
import { getCustomersAction, getFilterCustomersAction } from '../../store/actions/customerActions';
import { getFilteredCustomersApi } from '../../api/customers';
import ModalProp from '../shared/Modal';
import { PropertySaleForm } from './../Property/PropertySaleForm';

export default function CustomerList() {
    const dispatch = useDispatch();

    const customersList = useSelector(state => state.customers.customers)

    const [show, setShow] = useState(false)
    const [showProp, setshowProp] = useState(false)
    const [customer, setcustomer] = useState({})

    const totalItems = useSelector(state => state.customers.total)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState("")
    const [typeFilter, settypeFilter] = useState("")

    const updateShow = (_show) => setShow(_show)
    const updateShowProp = (_show) => setshowProp(_show)
    
    useEffect(() => {
        dispatch(getCustomersAction(page, filter, typeFilter));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, typeFilter, page])

    const searchHandler = (e) => {
        setPage(1)
        setFilter(e.target.value)
    }

    return (
        <>
            <div className='d-flex justify-content-between mb-5 flex-column flex-md-row'>
                <div className="d-flex flex-column overflow-hidden flex-md-row">
                    <div className="input-group me-5 my-2">
                        <span className="input-group-text">Busqueda</span>
                        <input className="form-control search-input" type="text" placeholder="Buscar..." id="example-search-input" onChange={searchHandler} />
                    </div>

                    <div className="input-group me-5 my-2">
                        <span className="input-group-text">{`Tipo`}</span>
                        <select name='role' className='form-select search-input'
                            onChange={e => {
                                settypeFilter(e.target.value)
                                setPage(1)
                            }}>
                            <option value={''}>Ambos</option>
                            <option value="Buyer">Comprador</option>
                            <option value="Seller">Vendedor</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center my-2">
                    <Paginator totalItems={totalItems} page={page} setPage={setPage} />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Razon Social</th>
                        <th className='table-header'>Tipo Cliente</th>
                        <th className='table-header'>Telefono</th>
                        <th className='table-header'>Email</th>
                        <th className='table-header'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customersList?.map((data, index) => (
                            <tr key={index} onClick={() => { }}>
                                <td>{data?.firstName + ' ' + data?.lastName}</td>
                                <td>{data?.type == 'Buyer' ? 'Comprador' : 'Vendedor'}</td>
                                <td>{data?.phone}</td>
                                <td>{data?.email}</td>
                                <td>
                                    <div>
                                        <button
                                            className="bi bi-pencil-fill icon-button me-1"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Editar Cliente"
                                            onClick={() => { setShow(true); setcustomer(data) }}></button >
                                        {
                                            data?.type === 'Seller'
                                                ? (<button
                                                    className="bi bi-house-fill icon-button me-1"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Crear nueva propiedad"
                                                    onClick={() => { setshowProp(true); setcustomer(data) }}></button >)
                                                : (<></>)
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="Actualizar Cliente" show={show} setShow={setShow} fullscreen={true} >
                <CustomerForm show={updateShow} customer={customer} />
            </Modal>

            <ModalProp title="Nueva Propiedad" show={showProp} setShow={setshowProp} fullscreen={true} >
                <PropertySaleForm show={updateShowProp} type={'sale'} customer={customer} externalURL={'/properties?type=sale'} />
            </ModalProp>
        </>
    )
}
