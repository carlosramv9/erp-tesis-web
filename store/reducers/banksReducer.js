//Each Reducer Have his own state
import {
    ADD_BANKS_SUCCESS,
    ADD_BANKS_ERROR,
    GET_BANKS,
    GET_BANKS_ERROR,
    GET_BANKS_SUCCESS,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_ERROR,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_ERROR,
    SET_BANK,
    SET_BANK_ERROR,
    SET_BANK_SUCCESS,
} from '../types'

const initialState = {
    banks: [],
    total: null,
    error: null,
    loading: false,
    loadingSetbank: false,
    currentBank: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANKS:
            return {
                ...state,
                loading: true
            }
        case GET_BANKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                banks: action.payload.banks,
                total: action.payload.total
            }
        case GET_BANKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_BANK:
            return {
                ...state,
                loadingSetbank: action.payload
            }
        case SET_BANK_SUCCESS:
            return {
                ...state,
                loadingSetbank: false,
                currentBank: action.payload
            }
        case SET_BANK_ERROR:
            return {
                ...state,
                loadingSetbank: false,
                error: action.payload
            }
        case ADD_BANKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                banks: action.payload.banks
            }
        case ADD_BANKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                banks: action.payload.banks
            }
        case UPDATE_BANK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                banks: action.payload.banks
            }
        case DELETE_BANK_ERROR:
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