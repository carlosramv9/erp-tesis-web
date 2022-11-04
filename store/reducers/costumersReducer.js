//Each Reducer Have his own state
import {
    ADD_CUSTOMERS_SUCCESS,
    ADD_CUSTOMERS_ERROR,
    GET_CUSTOMERS,
    GET_CUSTOMERS_ERROR,
    GET_CUSTOMERS_SUCCESS,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR
} from '../types'

const initialState = {
    customers: [],
    total: null,
    error: null,
    loading: false,
    currentCustomer: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                loading: true
            }
        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                customers: action.payload.customers,
                total: action.payload.total
            }
        case GET_CUSTOMERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                customers: action.payload.customers
            }
        case ADD_CUSTOMERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                customers: action.payload.customers
            }
        case UPDATE_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                customers: action.payload.customers
            }
        case DELETE_CUSTOMER_ERROR:
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