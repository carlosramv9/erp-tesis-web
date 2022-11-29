//Each Reducer Have his own state
import {
    ADD_INVESTORS_SUCCESS,
    ADD_INVESTORS_ERROR,
    GET_INVESTORS,
    GET_INVESTORS_ERROR,
    GET_INVESTORS_SUCCESS,
    DELETE_INVESTOR_SUCCESS,
    DELETE_INVESTOR_ERROR,
    UPDATE_INVESTOR_SUCCESS,
    UPDATE_INVESTOR_ERROR,
    SET_INVESTOR,
    SET_INVESTOR_ERROR,
    SET_INVESTOR_SUCCESS,
} from '../types'

const initialState = {
    investors: [],
    total: null,
    error: null,
    loading: false,
    loadingSetinvestor: false,
    currentInvestor: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVESTORS:
            return {
                ...state,
                loading: true
            }
        case GET_INVESTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                investors: action.payload.investors,
                total: action.payload.total
            }
        case GET_INVESTORS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_INVESTOR:
            return {
                ...state,
                loadingSetinvestor: action.payload
            }
        case SET_INVESTOR_SUCCESS:
            return {
                ...state,
                loadingSetinvestor: false,
                currentInvestor: action.payload
            }
        case SET_INVESTOR_ERROR:
            return {
                ...state,
                loadingSetinvestor: false,
                error: action.payload
            }
        case ADD_INVESTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                investors: action.payload.investors
            }
        case ADD_INVESTORS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_INVESTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                investors: action.payload.investors
            }
        case UPDATE_INVESTOR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_INVESTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                investors: action.payload.investors
            }
        case DELETE_INVESTOR_ERROR:
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