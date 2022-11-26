import {
    ADD_PROCESS,
    ADD_PROCESS_SUCCESS,
    ADD_PROCESS_ERROR,
    GET_PROCESSES,
    GET_PROCESSES_SUCCESS,
    GET_PROCESSES_ERROR,
    UPDATE_PROCESS,
    UPDATE_PROCESS_SUCCESS,
    UPDATE_PROCESS_ERROR,
    DELETE_PROCESS,
    DELETE_PROCESS_ERROR,
    DELETE_PROCESS_SUCCESS,
    SET_PROCESS,
    SET_PROCESS_ERROR,
    SET_PROCESS_SUCCESS,
} from '../types'
import {
    getProcessListsApi,
    getProcessApi,
    addProcessMovesApi,
    updateProcessMovementApi,
    uploadDocumentsProcessApi,
    deleteDocumentProcessApi,
    addProcessApi,
    deleteProcessApi,
    updateProcessApi,
    addTaskProcessApi
} from '../../api/process';

export function getProcessesAction(page = 1, limit = 10) {
    return async (dispatch) => {
        dispatch(getProcesses())
        try {
            const response = await getProcessListsApi(page, limit);
            dispatch(getProcessSuccess(response))
        } catch (error) {
            dispatch(getProcessError(true))
        }
    }
}

export function setProcessAction(id = '') {
    return async (dispatch) => {
        dispatch(setProcess())
        try {
            if (id) {
                const response = await getProcessApi(id);
                dispatch(setProcessSuccess(response));
            } else {
                dispatch(setProcessSuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setProcessError(true))
        }
    }
}

export function addProcessesAction(process) {
    return async (dispatch) => {
        try {
            await addProcessApi(process);
            const response = await getProcessListsApi();
            dispatch(addProcessSuccess(response))
        } catch (error) {
            dispatch(addProcessError(error))
        }
    }
}

export function deleteProcessesAction(id) {
    return async (dispatch) => {
        try {
            await deleteProcessApi(id);
            const response = await getProcessListsApi();
            dispatch(deleteProcessSuccess(response))
        } catch (error) {
            dispatch(deleteProcessError(true))
        }
    }
}

export function updateProcessesAction(id, process) {
    return async (dispatch) => {
        dispatch(setProcess())
        try {
            await updateProcessApi(id, process);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(id);
            dispatch(updateProcessSuccess(response))
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function addTaskProcessAction(idTask, process, step, data) {
    return async (dispatch) => {
        try {
            await addTaskProcessApi(idTask, process, step, data);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(id);
            dispatch(addProcessSuccess(response))
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(addProcessError(error))
        }
    }
}

export function updateProcessMovementAction(idProcess, idMove, data) {
    return async (dispatch) => {
        dispatch(setProcess())
        try {
            await updateProcessMovementApi(idMove, data);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(idProcess);
            dispatch(updateProcessSuccess(response))
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function updateProcessDocumentsAction(idProcess, data) {
    return async (dispatch) => {
        dispatch(setProcess())
        try {
            await uploadDocumentsProcessApi(idProcess, data);
            //dispatch(updateProcessSuccess(response))
            const _process = await getProcessApi(idProcess);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function deleteProcessDocumentAction(idProcess, document) {
    return async (dispatch) => {
        dispatch(setProcess())
        try {
            await deleteDocumentProcessApi(idProcess, document);
            //dispatch(updateProcessSuccess(response))
            const _process = await getProcessApi(idProcess);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

//Get Processes
const getProcesses = () => ({
    type: GET_PROCESSES,
    payload: true
})

const getProcessSuccess = processes => ({
    type: GET_PROCESSES_SUCCESS,
    payload: processes
})

const getProcessError = () => ({
    type: GET_PROCESSES_ERROR,
    payload: true
})

//Add Processes

const addProcessSuccess = processes => ({
    type: ADD_PROCESS_SUCCESS,
    payload: processes
})

const addProcessError = (err) => ({
    type: ADD_PROCESS_ERROR,
    payload: err
})

//Delete Processes

const deleteProcessSuccess = processes => ({
    type: DELETE_PROCESS_SUCCESS,
    payload: processes
})

const deleteProcessError = () => ({
    type: DELETE_PROCESS_ERROR,
    payload: true
})

//Update Processes

const updateProcessSuccess = processes => ({
    type: UPDATE_PROCESS_SUCCESS,
    payload: processes
})

const updateProcessError = (err) => ({
    type: UPDATE_PROCESS_ERROR,
    payload: err
})

//SET CurrentProcess

const setProcess = () => ({
    type: SET_PROCESS,
    payload: true
})

const setProcessSuccess = currentProcess => ({
    type: SET_PROCESS_SUCCESS,
    payload: currentProcess
})

const setProcessError = () => ({
    type: SET_PROCESS_ERROR,
    payload: true
})