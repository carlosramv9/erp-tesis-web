import {
    ADD_PROCESS,
    ADD_PROCESS_SUCCESS,
    ADD_PROCESS_ERROR,
    GET_PROCESSES,
    GET_PROCESSES_SUCCESS,
    GET_PROCESSES_ERROR,
    GET_PROPERTIES,
    GET_PROPERTIES_SUCCESS,
    GET_PROPERTIES_ERROR,
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
    addTaskProcessApi,
    finishTaskProcessApi,
    verifyAppointmentProcessApi,
    updateTaskProcessApi,
    nextStepProcessApi,
    changeStepProcessApi,
    createCommentStepProcessApi,
    activeProcessApi,
    cancelProcessApi
} from '../../api/process';
import { getPropertiesApi } from '../../api/properties';

export function getProcessesAction(page = 1, limit = 10) {
    return async(dispatch) => {
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
    return async(dispatch) => {
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

export function addProcessAction(process) {
    return async(dispatch) => {
        try {
            await addProcessApi(process);
            const response = await getProcessListsApi();
            const properties = await getPropertiesApi(1, 'ALL', 'ALL', 'ALL', 'ALL');
            dispatch(getPropertySuccess(properties))
            dispatch(addProcessSuccess(response))
        } catch (error) {
            dispatch(addProcessError(error))
        }
    }
}

export function addTaskProcessAction(idProcess, idTask, process, step, data) {
    return async(dispatch) => {
        try {
            await addTaskProcessApi(idTask, process, step, data);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(idProcess);
            dispatch(addProcessSuccess(response))
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(addProcessError(error))
        }
    }
}

export function updateProcessAction(id, process) {
    return async(dispatch) => {
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

export function updateTaskProcessAction(processId, taskId, process) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await updateTaskProcessApi(taskId, process);
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function nextStepProcessAction(processId) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await nextStepProcessApi(processId);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
            dispatch(getProcessSuccess(response))
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function changeStepProcessAction(processId, index) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await changeStepProcessApi(processId, index);
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function activeProcessAction(processId) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await activeProcessApi(processId);
            const response = await getProcessListsApi();
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
            dispatch(getProcessSuccess(response))
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function cancelProcessAction(process) {
    return async(dispatch) => {
        try {
            await cancelProcessApi(process);
            const response = await getProcessListsApi();
            const properties = await getPropertiesApi(1, 'ALL', 'ALL', 'ALL', 'ALL');
            dispatch(getPropertySuccess(properties))
            dispatch(addProcessSuccess(response))
        } catch (error) {
            dispatch(addProcessError(error))
        }
    }
}

export function createCommentStepProcessAction(processId, stepId, comment) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await createCommentStepProcessApi(stepId, comment);
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function verifyAppointmentProcessAction(processId, id) {
    return async(dispatch) => {
        dispatch(setProcess())
        try {
            await verifyAppointmentProcessApi(id);
            const _process = await getProcessApi(processId);
            dispatch(setProcessSuccess(_process));
        } catch (error) {
            dispatch(updateProcessError(true))
        }
    }
}

export function deleteProcessesAction(id) {
    return async(dispatch) => {
        try {
            await deleteProcessApi(id);
            const response = await getProcessListsApi();
            dispatch(deleteProcessSuccess(response))
        } catch (error) {
            dispatch(deleteProcessError(true))
        }
    }
}

export function finishTaskProcessAction(processId, id) {
    return async(dispatch) => {
        try {
            await finishTaskProcessApi(id);
            const response = await getProcessListsApi();
            const proccess = await getProcessApi(processId);
            dispatch(setProcessSuccess(proccess));
            dispatch(deleteProcessSuccess(response))
        } catch (error) {
            dispatch(deleteProcessError(true))
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