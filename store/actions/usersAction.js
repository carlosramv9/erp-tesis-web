import { SET_USER, SET_USER_SUCCESS, ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR, GET_USERS, GET_USERS_ERROR, GET_USERS_SUCCESS, UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, DELETE_USER, DELETE_USER_ERROR, DELETE_USER_SUCCESS, SET_USER_ERROR, ADD_USER_ATTACHMENT, ADD_USER_ATTACHMENT_SUCCESS, ADD_USER_ATTACHMENT_ERROR, DELETE_USER_ATTACHMENT, DELETE_USER_ATTACHMENT_SUCCESS, DELETE_USER_ATTACHMENT_ERROR, SET_CURRENT_TAB, UPDATE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_ERROR } from '../types';
import { getUserListApi, createUserApi, deleteUserApi, updateUserApi, getCurrentUser, addUserAttachmentApi, deleteUserAttachmentApi, updateUserImageApi } from '../../api/users';

export function setCurrentUserAction(id = '') {
    return async(dispatch) => {
        dispatch(setUser())
        try {
            if (id) {
                const response = await getCurrentUser(id);
                dispatch(setUserSuccess(response));
            } else {
                dispatch(setUserSuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setUserError(true))
        }
    }
}

export function addUserAttachmentAction(id = '', data, file, tab) {
    return async(dispatch) => {
        dispatch(addUserAttachment())
        try {
            if (id) {
                await addUserAttachmentApi(id, file, data);
                const response = await getCurrentUser(id);
                dispatch(addUserAttachmentSuccess({ user: response, tab }))
            }
        } catch (error) {
            console.log(error);
            dispatch(addUserAttachmentError(true))
        }
    }
}

export function setCurrentTabAction(tab) {
    return async(dispatch) => {
        dispatch(setCurrentTab(tab))
    }
}

export function deleteUserAttachmentAction(userId, attachmentId, tab) {
    return async(dispatch) => {
        dispatch(deleteUserAttachment())
        try {
            if (userId) {
                await deleteUserAttachmentApi(userId, attachmentId);
                const response = await getCurrentUser(userId);
                dispatch(deleteUserAttachmentSuccess({ user: response, tab }))
            }
        } catch (error) {
            console.log(error);
            dispatch(deleteUserAttachmentError(true))
        }
    }
}


export function createUserAction(data) {
    return async(dispatch) => {
        dispatch(addUser())
        try {
            await createUserApi(data);
            const response = await getUserListApi();
            dispatch(addUserSuccess(response))
        } catch (error) {
            dispatch(addUserError(true))
        }
    }
}

export function updateUserAction(data) {
    return async(dispatch) => {
        dispatch(updateUser())
        try {
            console.log('llego')
            await updateUserApi(data);
            const response = await getUserListApi();
            dispatch(updateUserSuccess(response))
        } catch (error) {
            dispatch(updateUserError(true))
        }
    }
}

export function getUsersAction(page, search, role) {
    return async(dispatch) => {
        dispatch(getUsers())
        try {
            const response = await getUserListApi(page, search, role);
            dispatch(getUserSuccess(response))
        } catch (error) {
            dispatch(getUserError(true))
        }
    }
}

export function deleteUserAction(id) {
    return async(dispatch) => {
        dispatch(deleteUser())
        try {
            await deleteUserApi(id);
            const response = await getUserListApi();
            dispatch(deleteUserSuccess(response))
        } catch (error) {
            dispatch(deleteUserError(true))
        }
    }
}

export function updateUserImageAction(id, file) {
    return async(dispatch) => {
        dispatch(updateUserImage())
        try {
            if (id) {
                await updateUserImageApi(id, file);
                const response = await getCurrentUser(id);
                dispatch(updateUserImageSuccess({ user: response }))
            }
        } catch (error) {
            console.log(error);
            dispatch(updateUserImageError(true))
        }
    }
}

//Create User
const addUser = () => ({
    type: ADD_USER,
    payload: true
})

const addUserSuccess = users => ({
    type: ADD_USER_SUCCESS,
    payload: users
})

const addUserError = () => ({
    type: ADD_USER_ERROR,
    payload: true
})

//Get Users
const getUsers = () => ({
    type: GET_USERS,
    payload: true
})

const getUserSuccess = users => ({
    type: GET_USERS_SUCCESS,
    payload: users
})

const getUserError = () => ({
    type: GET_USERS_ERROR,
    payload: true
})

//Update Users
const updateUser = () => ({
    type: UPDATE_USER,
    payload: true
})

const updateUserSuccess = users => ({
    type: UPDATE_USER_SUCCESS,
    payload: users
})

const updateUserError = () => ({
    type: UPDATE_USER_ERROR,
    payload: true
})

//Delete Users

const deleteUser = () => ({
    type: DELETE_USER,
    payload: true
})

const deleteUserSuccess = users => ({
    type: DELETE_USER_SUCCESS,
    payload: users
})

const deleteUserError = () => ({
    type: DELETE_USER_ERROR,
    payload: true
})

//SET CurrentUser

const setUser = () => ({
    type: SET_USER,
    payload: true
})

const setUserSuccess = currentUser => ({
    type: SET_USER_SUCCESS,
    payload: currentUser
})

const setUserError = () => ({
    type: SET_USER_ERROR,
    payload: true
})

//Attachments
const addUserAttachment = () => ({
    type: ADD_USER_ATTACHMENT,
    payload: true
})

const addUserAttachmentSuccess = data => ({
    type: ADD_USER_ATTACHMENT_SUCCESS,
    payload: data
})

const addUserAttachmentError = () => ({
    type: ADD_USER_ATTACHMENT_ERROR,
    payload: true
})

const deleteUserAttachment = () => ({
    type: DELETE_USER_ATTACHMENT,
    payload: true
})

const deleteUserAttachmentSuccess = data => ({
    type: DELETE_USER_ATTACHMENT_SUCCESS,
    payload: data
})

const deleteUserAttachmentError = () => ({
    type: DELETE_USER_ATTACHMENT_ERROR,
    payload: true
})

const setCurrentTab = tab => ({
    type: SET_CURRENT_TAB,
    payload: tab
})

//USER IMAGE
const updateUserImage = () => ({
    type: UPDATE_USER_IMAGE,
    payload: true
})

const updateUserImageSuccess = data => ({
    type: UPDATE_USER_IMAGE_SUCCESS,
    payload: data
})

const updateUserImageError = () => ({
    type: UPDATE_USER_IMAGE_ERROR,
    payload: true
})