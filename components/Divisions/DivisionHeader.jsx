import React, { useState, useEffect } from 'react'
import { DivisionForm } from './DivisionForm'
import ModalProp from '../shared/Modal'
import Paginator from '../shared/Paginator'
import { getDivisionsAction } from './../../store/actions/divisionActions';
import { useDispatch, useSelector } from 'react-redux';

const DivisionHeader = () => {
    const dispatch = useDispatch();
    const totalItems = useSelector(state => state.divisions.total)
    const [show, setShow] = useState(false)
    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getDivisionsAction(page, filter));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, page])

    const searchHandler = (e) => {
        setFilter(e.target.value)
    }

    const updateShow = (_show) => setShow(_show)

    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <div>
                        <h2><b>Fraccionamiento</b></h2>
                        <p>Registro y Consulta de fraccionamientos</p>
                    </div>
                    <div>
                        <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Agregar Fraccionamiento</button>
                    </div>
                </div>
                <div className='d-flex flex-between'>

                </div>
            </div>
            <div className="row m-3">
                <div className="col-md-4 col-xl-3 col-sm-12">
                    <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Buscar..." id="example-search-input" onChange={searchHandler} />
                </div>
                <div className='d-flex justify-content-end me-4'>
                    <Paginator totalItems={totalItems} page={page} setPage={setPage} />
                </div>
            </div>

            <ModalProp title="Nuevo Fraccionamiento" show={show} setShow={setShow}>
                <DivisionForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default DivisionHeader;
