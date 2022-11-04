//Each Reducer Have his own state
import {
    ADD_BANK_CREDITS_SUCCESS,
    ADD_BANK_CREDITS_ERROR,
    GET_BANK_CREDITS,
    GET_BANK_CREDITS_ERROR,
    GET_BANK_CREDITS_SUCCESS,
    DELETE_BANK_CREDIT_SUCCESS,
    DELETE_BANK_CREDIT_ERROR,
    UPDATE_BANK_CREDIT_SUCCESS,
    UPDATE_BANK_CREDIT_ERROR
} from '../types'

const initialState = {
    bankCredits: [],
    total: null,
    error: null,
    loading: false,
    currentBankCredit: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANK_CREDITS:
            return {
                ...state,
                loading: true
            }
        case GET_BANK_CREDITS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bankCredits: action.payload.bankCredits,
                total: action.payload.total
            }
        case GET_BANK_CREDITS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_BANK_CREDITS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bankCredits: action.payload.bankCredits
            }
        case ADD_BANK_CREDITS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_BANK_CREDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bankCredits: action.payload.bankCredits
            }
        case UPDATE_BANK_CREDIT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BANK_CREDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bankCredits: action.payload.bankCredits
            }
        case DELETE_BANK_CREDIT_ERROR:
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