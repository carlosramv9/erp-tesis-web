import React,{useState, useEffect} from 'react'
//Redux
import {useSelector,useDispatch} from 'react-redux';
import {Form} from 'react-bootstrap';
//actions
import {updateRoleAction, getRolesAction} from '../../store/actions/rolesAction'
//Components
import Modal from '../../components/shared/Modal'
import RoleForm from './RoleForm';
import Paginator from '../shared/Paginator';
//Constantes
const createPermissions = 'createPermissions';
const readPermissions = 'readPermissions';
const updatePermissions = 'updatePermissions';
const deletePermissions = 'deletePermissions';
const routesList = process.env.routes;

const RolesList = () => {
    const dispatch = useDispatch();
    const [route, setRoute] = useState('default');
    const [show, setShow] = useState(false)
    const [role, setRole] = useState({});
    const [page, setPage] = useState(1);

    const totalItems = useSelector(state => state.roles.total)
    const rolesList = useSelector(state => state.roles.roles)

    useEffect(() => {
        dispatch(getRolesAction(page));
        // eslint-disable-next-line 
    }, [page])

    const {Check, Select} = Form;

    const updateRole = async(event, route, permission, data) => {
        event.preventDefault();
        if(event.target.checked){
            data[permission].push(route);
            await dispatch(updateRoleAction(data))
        }else{
            const index = data[permission].indexOf(route);
            if(index>-1) data[permission].splice(index,1);
            await dispatch(updateRoleAction(data))
        }
    }
    return (
        <div>
            <div className='d-flex flex-column'>
                <div className='d-flex align-items-center flex-between w-100'>
                    <Select  className='w-50' onChange={ event=>setRoute(event.target.value)}>
                        <option value={'default'}>Selecciona la Ruta</option>
                        {
                            routesList.map((data, index) =>(
                                <option key={index} value={data.route} className='p-5' > {data.name} </option>
                            ))
                        }
                    </Select>
                    <Paginator totalItems={totalItems} page={page} setPage={setPage}/>
                </div>
        
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table-header'>Rol</th>
                                <th className='table-header text-center'>Ver</th>
                                <th className='table-header text-center'>Crear</th>
                                <th className='table-header text-center'>Actualizar</th>
                                <th className='table-header text-center'>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rolesList?.map((data, index) => (
                                    <tr key={index}>
                                        <td onClick={() => {setShow(!show); setRole(data)}}>{data.role}</td>
                                        <td className='text-center w-15'><Check disabled={route=='default'} type='checkbox' checked={data?.readPermissions.includes(route)} onChange={event=>updateRole(event, route, readPermissions, data)}/></td>
                                        <td className='text-center w-15'><Check disabled={route=='default'} type='checkbox' checked={data?.createPermissions.includes(route)} onChange={event=>updateRole(event, route, createPermissions, data)}/></td>
                                        <td className='text-center w-15'><Check disabled={route=='default'} type='checkbox' checked={data?.updatePermissions.includes(route)} onChange={event=>updateRole(event, route, updatePermissions, data)}/></td>
                                        <td className='text-center w-15'><Check disabled={route=='default'} type='checkbox' checked={data?.deletePermissions.includes(route)} onChange={event=>updateRole(event, route, deletePermissions, data)}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal title={`Update ${role.role}`} show={show} setShow={setShow}>
                <RoleForm role={role} setShow={setShow}/>
            </Modal>
        </div>
    )
}

export default RolesList
