import { UPDATE_ROLE_PRIORITY, UPDATE_ROLE_PRIORITY_ERROR, UPDATE_ROLE_PRIORITY_SUCCESS, ADD_ROLE, ADD_ROLE_ERROR, ADD_ROLE_SUCCESS, GET_ROLES, GET_ROLES_ERROR, GET_ROLES_SUCCESS, UPDATE_ROLE, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_ERROR, DELETE_ROLE, DELETE_ROLE_ERROR, DELETE_ROLE_SUCCESS } from '../types';
import { getRoleListApi, updateRoleApi, deleteRoleApi, createRoleApi } from '../../api/roles';


export function createRoleAction(data) {
    return async(dispatch) => {
        dispatch(addRole())
        try {
            await createRoleApi(data);
            const response = await getRoleListApi();
            dispatch(addRoleSuccess(response))
        } catch (error) {
            dispatch(addRoleError(true))
        }
    }
}

export function getRolesAction(page) {
    return async(dispatch) => {
        dispatch(getRoles())
        try {
            const response = await getRoleListApi(page);
            dispatch(getRolesSuccess(response))
        } catch (error) {
            dispatch(getRoleError(true))
        }
    }
}

export function updateRoleAction(data) {
    return async(dispatch) => {
        dispatch(updateRole())
        try {
            await updateRoleApi(data);
            const response = await getRoleListApi();
            dispatch(updateRoleSuccess(response))
        } catch (error) {
            dispatch(updateRoleError(true))
        }
    }
}

export function updateRolePriorityAction(data) {
    return async(dispatch) => {
        dispatch(updateRolePriority())
        try {
            await updateRoleApi(data);
            const response = await getRoleListApi();
            dispatch(updateRolePrioritySuccess(response))
        } catch (error) {
            dispatch(updateRolePriorityError(true))
        }
    }
}


export function deleteRoleAction(id) {
    return async(dispatch) => {
        dispatch(deleteRole())
        try {
            await deleteRoleApi(id);
            const response = await getRoleListApi();
            dispatch(deleteRoleSuccess(response))
        } catch (error) {
            dispatch(deleteRoleError(true))
        }
    }
}

//Create Role
const addRole = () => ({
    type: ADD_ROLE,
    payload: true
})

const addRoleSuccess = roles => ({
    type: ADD_ROLE_SUCCESS,
    payload: roles
})

const addRoleError = () => ({
    type: ADD_ROLE_ERROR,
    payload: true
})

//Get Roles
const getRoles = () => ({
    type: GET_ROLES,
    payload: true
})

const getRolesSuccess = roles => ({
    type: GET_ROLES_SUCCESS,
    payload: roles
})

const getRoleError = error => ({
    type: GET_ROLES_ERROR,
    payload: error
})

//Update Roles
const updateRole = () => ({
    type: UPDATE_ROLE,
    payload: true
})

const updateRoleSuccess = roles => ({
    type: UPDATE_ROLE_SUCCESS,
    payload: roles
})

const updateRoleError = () => ({
    type: UPDATE_ROLE_ERROR,
    payload: true
})

const updateRolePriority = () => ({
    type: UPDATE_ROLE_PRIORITY,
    payload: true
})

const updateRolePrioritySuccess = roles => ({
    type: UPDATE_ROLE_PRIORITY_SUCCESS,
    payload: roles
})

const updateRolePriorityError = () => ({
    type: UPDATE_ROLE_PRIORITY_ERROR,
    payload: true
})


//Delete Roles

const deleteRole = () => ({
    type: DELETE_ROLE,
    payload: true
})

const deleteRoleSuccess = roles => ({
    type: DELETE_ROLE_SUCCESS,
    payload: roles
})

const deleteRoleError = () => ({

    type: DELETE_ROLE_ERROR,
    payload: true
})