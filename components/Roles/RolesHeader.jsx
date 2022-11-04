import React,{useState} from 'react';
import RoleForm from './RoleForm';
import Modal from '../../components/shared/Modal';
import Paginator from '../shared/Paginator';

function RolesHeader() {
    const [show, setShow] = useState(false)
    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-sm-between flex-column flex-sm-row'>
                    <h2><b></b>Administracion de Roles</h2>
                    <button className='btn btn-action-primary mt-4 mt-sm-0' onClick={() => {setShow(!show)}}>Nuevo Rol</button>
                </div>
                <div className='d-flex flex-between'>
                    
                </div>                
            </div>
            <Modal title={`Nuevo Rol`} show={show} setShow={setShow}>
                <RoleForm setShow={setShow}/>
            </Modal>
        </div>
    )
}

export default RolesHeader
