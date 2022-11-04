import React, { useState, useEffect } from 'react'
import { BuildModelForm } from './BuildModelForm'
import ModalProp from '../shared/Modal'
import Paginator from '../shared/Paginator'
import { useDispatch, useSelector } from 'react-redux';
import { getBuildModelsAction } from '../../store/actions/buildModelActions';

const BuildModelHeader = () => {
    const dispatch = useDispatch();
    const totalItems = useSelector(state => state.buildModels.total)
    const [show, setShow] = useState(false)
    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getBuildModelsAction(page, filter));
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
                        <h2><b>Modelos de propiedades</b></h2>
                        <p>Registro y Consulta de modelos</p>
                    </div>
                    <div>
                        <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Agregar Modelo</button>
                    </div>
                </div>
                <div className='d-flex flex-between'>

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

            <ModalProp title="Nuevo Modelo" show={show} setShow={setShow}>
                <BuildModelForm show={updateShow} />
            </ModalProp>
        </div>
    )
}

export default BuildModelHeader;
