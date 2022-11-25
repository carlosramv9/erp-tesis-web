//Each Reducer Have his own state
import {
    ADD_PROCESS_SUCCESS,
    ADD_PROCESS_ERROR,
    GET_PROCESSES,
    GET_PROCESSES_ERROR,
    GET_PROCESSES_SUCCESS,
    DELETE_PROCESS_SUCCESS,
    DELETE_PROCESS_ERROR,
    UPDATE_PROCESS_SUCCESS,
    UPDATE_PROCESS_ERROR,
    SET_PROCESS,
    SET_PROCESS_ERROR,
    SET_PROCESS_SUCCESS,
} from '../types'

const initialState = {
    processes: [],
    total: null,
    error: null,
    loading: false,
    loadingSetprocess: false,
    currentProcess: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROCESSES:
            return {
                ...state,
                loading: true
            }
        case GET_PROCESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                processes: action.payload.processes,
                total: action.payload.total
            }
        case GET_PROCESSES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_PROCESS:
            return {
                ...state,
                loadingSetprocess: action.payload
            }
        case SET_PROCESS_SUCCESS:
            return {
                ...state,
                loadingSetprocess: false,
                currentProcess: action.payload
            }
        case SET_PROCESS_ERROR:
            return {
                ...state,
                loadingSetprocess: false,
                error: action.payload
            }
        case ADD_PROCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                processes: action.payload.processes
            }
        case ADD_PROCESS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                processes: action.payload.processes
            }
        case UPDATE_PROCESS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PROCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                processes: action.payload.processes
            }
        case DELETE_PROCESS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
export default reducerSwitch;