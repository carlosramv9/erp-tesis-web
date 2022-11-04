import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import DivisionHeader from './DivisionHeader';
import Loading from '../shared/Loading';
import { DivisionForm } from './DivisionForm';
import { useSelector } from 'react-redux';

export default function DivisionList() {
    const isLoading = useSelector(state => state.builders.loading)
    const divisionsList = useSelector(state => state.divisions.divisions)
    
    const [show, setShow] = useState(false)
    const [division, setdivision] = useState({})
    const updateShow = (_show) => setShow(_show)

    return (
        <>
            <div className='mt-4 d-flex flex-column'>
                <div className='border-bottom'>
                    {isLoading ? <Loading /> : <DivisionHeader />}
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='table-header'>Nombre</th>
                        <th className='table-header'>Constructora</th>
                        <th className='table-header'>Cerrador</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        divisionsList?.map((data, index) => (
                            <tr key={index} onClick={() => { setShow(!show); setdivision(data) }}>
                                <td>{data?.name}</td>
                                <td>{data?.builder?.name}</td>
                                <td>{`${data?.closer?.firstName ?? ''} ${data?.closer?.lastName ?? ''}`}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal title="" show={show} setShow={setShow}>
                <DivisionForm show={updateShow} division={division} />
            </Modal>
        </>
    )
}
