import React, { useState } from 'react'
import Image from 'next/image';
import dayjs from 'dayjs';
import { es } from "dayjs/locale/es";


//Redux
import { useSelector } from 'react-redux';
//components
import UserForm from '../Users/UserForm';
import UpdateUserImageForm from './UpdateUserImageForm';
import Modal from '../shared/Modal';
import Avatar from '../shared/Avatar'
import { getUserImage } from '../../api/users';

const UserInformation = () => {
    const user = useSelector(state => state.users.currentUser)
    dayjs.locale("es");
    const [showEditUser, setShowEditUser] = useState(false);
    const [showUpdateImageUser, setShowUpdateImageUser] = useState(false);

    return (
        <div className='card shadow'>
            <div className='d-flex flex-column '>
                <div className='d-flex flex-between mb-3 align-items-center'>
                    <div className='d-flex flex-between'>
                        <h5 className='me-3'>Fecha de entrada: </h5>
                        <h5> {` ${dayjs(user.entryDate).format('DD-MMMM-YYYY')}`}</h5>
                    </div>
                    <div>
                        <i className="bi bi-pencil-square font-size-32 pointer" onClick={() => setShowEditUser(true)} />
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center mb-4' >
                    <div style={{ width: '200px', height: '200px' }} className='pointer' onClick={() => setShowUpdateImageUser(true)}>
                        <Avatar className='pointer' alt={user._id} getImage={getUserImage} param={user._id} status={user.image ? true : false} width={'200px'} height={'200px'} />
                    </div>
                </div>
                <h5 className='text-center'>Informacion de Usuario</h5>
                <h5 className='text-center'>{`${user.firstName} ${user.lastName}`}</h5>
                <h5 className='text-center'>{user?.role?.role}</h5>
                <div className='mt-4'>
                    <div className='d-flex flex-between flex-column flex-lg-row mb-3 border-top pt-3'>
                        <p><b>Cumpleanos:</b></p>
                        <p>{dayjs(user.birthDate).format('DD-MM-YYYY')}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row'>
                        <p><b>Direccion:</b></p>
                        <p>{user.address}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>Correo Electronico:</b></p>
                        <p>{user.email}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>Correo Personal:</b></p>
                        <p>{user.personalEmail}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>RFC:</b></p>
                        <p>{user.rfc}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>Seguro Social:</b></p>
                        <p>{user.nss}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>Salario:</b></p>
                        <p>{`$ ${user.salary}`}</p>
                    </div>
                    <div className='d-flex flex-between flex-column flex-xxl-row '>
                        <p><b>Comision Base:</b></p>
                        <p>{`${user.baseCommission} %`}</p>
                    </div>
                </div>
            </div>
            <Modal title={'Editar Informacion de Usuario'} show={showEditUser} setShow={setShowEditUser}>
                <UserForm user={user} setShow={setShowEditUser} />
            </Modal>
            <Modal title={'Actualizar Imagen'} show={showUpdateImageUser} setShow={setShowUpdateImageUser}>
                <UpdateUserImageForm />
            </Modal>
        </div>
    )
}

export default UserInformation