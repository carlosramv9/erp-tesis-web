import {
    ADD_PROPERTIES,
    ADD_PROPERTIES_SUCCESS,
    ADD_PROPERTIES_ERROR,
    GET_PROPERTIES,
    GET_PROPERTIES_SUCCESS,
    GET_PROPERTIES_ERROR,
    UPDATE_PROPERTY,
    UPDATE_PROPERTY_SUCCESS,
    UPDATE_PROPERTY_ERROR,
    DELETE_PROPERTY,
    DELETE_PROPERTY_ERROR,
    DELETE_PROPERTY_SUCCESS,
    SET_PROPERTY,
    SET_PROPERTY_SUCCESS,
    SET_PROPERTY_ERROR,
    ADD_FILES_SUCCESS,
    ADD_FILES_ERROR,
    GET_FILES,
    GET_FILES_ERROR,
    GET_FILES_SUCCESS,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_ERROR,
    UPDATE_FILE_SUCCESS,
    UPDATE_FILE_ERROR
} from '../types'
import { getPropertiesApi, addPropertiesApi, updatePropertiesApi, deletePropertiesApi, addFilesPropertiesApi, setDefaultImageApi, deleteFileApi, setPublicImageApi, setPublishPropertyApi, getProperty, uploadDefaultImageApi } from '../../api/properties';

export function getPropertiesAction(page = 1, builder = 'ALL', division = 'ALL', model = 'ALL') {
    return async(dispatch) => {
        dispatch(getProperties())
        try {
            const response = await getPropertiesApi(page, 'ALL', builder, division, model);
            dispatch(getPropertySuccess(response))
        } catch (error) {
            dispatch(getPropertyError(true))
        }
    }
}

export function setPropertyAction(id = '') {
    return async(dispatch) => {
        dispatch(setProperty())
        try {
            if (id) {
                const response = await getProperty(id);
                dispatch(setPropertySuccess(response));
            } else {
                dispatch(setPropertySuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setPropertyError(true))
        }
    }
}

export function addPropertiesAction(property) {
    return async(dispatch) => {
        try {
            await addPropertiesApi(property);
            const response = await getPropertiesApi();
            dispatch(addPropertySuccess(response))
        } catch (error) {
            dispatch(addPropertyError(error))
        }
    }
}

export function deletePropertiesAction(id) {
    return async(dispatch) => {
        try {
            await deletePropertiesApi(id);
            const response = await getPropertiesApi();
            dispatch(deletePropertySuccess(response))
        } catch (error) {
            dispatch(deletePropertyError(true))
        }
    }
}


export function updatePropertiesAction(id, property) {
    return async(dispatch) => {
        try {
            await updatePropertiesApi(id, property);
            const res = await getProperty(id);
            const response = await getPropertiesApi();
            dispatch(setPropertySuccess(res));
            dispatch(updatePropertySuccess(response))
        } catch (error) {
            dispatch(updatePropertyError(true))
        }
    }
}

//Files
export function addFilesPropertiesAction(id, file) {
    return async(dispatch) => {
        try {
            await addFilesPropertiesApi(id, file);
            const res = await getProperty(id);
            const response = await getPropertiesApi();
            dispatch(setPropertySuccess(res));
            dispatch(addFilePropertySuccess(response))
        } catch (error) {
            dispatch(addFilePropertyError(error))
        }
    }
}
export function uploadDefaultImageAction(id, file) {
    return async(dispatch) => {
        try {
            await uploadDefaultImageApi(id, file);
            const res = await getProperty(id);
            const response = await getPropertiesApi();
            dispatch(setPropertySuccess(res));
            dispatch(addFilePropertySuccess(response))
        } catch (error) {
            dispatch(addFilePropertyError(error))
        }
    }
}
export function setDefaultImageAction(id, file) {
    return async(dispatch) => {
        try {
            await setDefaultImageApi(id, file);
            const response = await getPropertiesApi();
            dispatch(setDefaultImageSuccess(response))
        } catch (error) {
            dispatch(setDefaultImageError(error))
        }
    }
}
export function setPublishPropertyAction(id) {
    return async(dispatch) => {
        try {
            await setPublishPropertyApi(id);
            const res = await getProperty(id);
            const response = await getPropertiesApi();
            dispatch(setPropertySuccess(res));
            dispatch(updatePropertySuccess(response))
        } catch (error) {
            dispatch(updatePropertyError(error))
        }
    }
}
export function setPublicImageAction(id, file) {
    return async(dispatch) => {
        try {
            await setPublicImageApi(id, file);
            const response = await getPropertiesApi();
            dispatch(setPublishPropertySuccess(response))
        } catch (error) {
            dispatch(setPublishPropertyeError(error))
        }
    }
}
export function deleteFileAction(id, file) {
    return async(dispatch) => {
        try {
            await deleteFileApi(id, file);
            const response = await getPropertiesApi();
            dispatch(deleteFileSuccess(response))
        } catch (error) {
            dispatch(deleteFileError(error))
        }
    }
}

//Get Properties
const getProperties = () => ({
    type: GET_PROPERTIES,
    payload: true
})

const getPropertySuccess = properties => ({
    type: GET_PROPERTIES_SUCCESS,
    payload: properties
})

const getPropertyError = () => ({
    type: GET_PROPERTIES_ERROR,
    payload: true
})

//Add Properties

const addPropertySuccess = properties => ({
    type: ADD_PROPERTIES_SUCCESS,
    payload: properties
})

const addPropertyError = (err) => ({
    type: ADD_PROPERTIES_ERROR,
    payload: err
})

//Delete Properties

const deletePropertySuccess = properties => ({
    type: DELETE_PROPERTY_SUCCESS,
    payload: properties
})

const deletePropertyError = () => ({
    type: DELETE_PROPERTY_ERROR,
    payload: true
})

//SET CurrentProperty

const setProperty = () => ({
    type: SET_PROPERTY,
    payload: true
})

const setPropertySuccess = currentProperty => ({
    type: SET_PROPERTY_SUCCESS,
    payload: currentProperty
})

const setPropertyError = () => ({
    type: SET_PROPERTY_ERROR,
    payload: true
})

//Update Properties

const updatePropertySuccess = properties => ({
    type: UPDATE_PROPERTY_SUCCESS,
    payload: properties
})

const updatePropertyError = (err) => ({
    type: UPDATE_PROPERTY_ERROR,
    payload: err
})

//Add Files

const addFilePropertySuccess = files => ({
    type: ADD_FILES_SUCCESS,
    payload: files
})

const addFilePropertyError = (err) => ({
    type: ADD_FILES_ERROR,
    payload: err
})

//Update Default Files

const setDefaultImageSuccess = files => ({
    type: ADD_FILES_SUCCESS,
    payload: files
})

const setDefaultImageError = (err) => ({
    type: ADD_FILES_ERROR,
    payload: err
})

//Publish Property

const setPublishPropertySuccess = files => ({
    type: UPDATE_PROPERTY_SUCCESS,
    payload: files
})

const setPublishPropertyeError = (err) => ({
    type: UPDATE_PROPERTY_ERROR,
    payload: err
})

//Update Public Files

const setPublicImageSuccess = files => ({
    type: ADD_FILES_SUCCESS,
    payload: files
})

const setPublicImageError = (err) => ({
    type: ADD_FILES_ERROR,
    payload: err
})

//Delete Files

const deleteFileSuccess = files => ({
    type: DELETE_FILE_SUCCESS,
    payload: files
})

const deleteFileError = (err) => ({
    type: DELETE_FILE_ERROR,
    payload: err
})