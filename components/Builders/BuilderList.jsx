import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import BuilderHeader from './BuilderHeader';
import Loading from '../shared/Loading';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { BuilderForm } from './BuilderForm';

export default function BuilderList() {
    const isLoading = useSelector(state => state.builders.loading)
    const buildersList = useSelector(state => state.builders.builders)
    
    const [show, setShow] = useState(false)
    const [builder, setbuilder] = useState({})
    const updateShow = (_show) => setShow(_show)

    return (
        <>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    {isLoading ? <Loading /> : <BuilderHeader />}
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Razon Social</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buildersList?.map((data, index) => (
                            <tr key={index} onClick={() => { setShow(!show); setbuilder(data) }}>
                                <td>{data?.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="Constructora" show={show} setShow={setShow}>
                <BuilderForm show={updateShow} builder={builder} />
            </Modal>
        </>
    )
}
