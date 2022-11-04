import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import BuildModelHeader from './BuildModelHeader';
import Loading from '../shared/Loading';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { BuildModelForm } from './BuildModelForm';

export default function BuildModelList() {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.buildModels.loading)
    const buildModelsList = useSelector(state => state.buildModels.buildModels)
    
    const [show, setShow] = useState(false)
    const [buildModelsArray, setbuildModelsArray] = useState(buildModelsList)
    const [buildModel, setbuildModel] = useState({})

    const updateShow = (_show) => setShow(_show)

    return (
        <>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    {isLoading ? <Loading /> : <BuildModelHeader />}
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Nombre</th>
                        <th className='table-header'>Fraccionamiento</th>
                        <th className='table-header'>Descripción</th>
                        <th className='table-header'>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buildModelsList?.map((data, index) => (
                            
                            <tr key={index} onClick={() => { setShow(!show); setbuildModel(data) }}>
                                <td>{data?.name}</td>
                                <td>{data?.division?.name}</td>
                                <td>{data?.description}</td>
                                <td>{data?.type === 'house' ? 'Casa' : 'Terreno'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="Actualizar" show={show} setShow={setShow}>
                <BuildModelForm show={updateShow} buildModel={buildModel} />
            </Modal>
        </>
    )
}
