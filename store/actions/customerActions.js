import {
    ADD_CUSTOMERS,
    ADD_CUSTOMERS_SUCCESS,
    ADD_CUSTOMERS_ERROR,
    GET_CUSTOMERS,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_ERROR,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_ERROR,
    DELETE_CUSTOMER_SUCCESS,
} from '../types'
import {
    getCustomersApi,
    addCustomersApi,
    updateCustomersApi,
    deleteCustomersApi,
    getFilteredCustomersApi
} from '../../api/customers';

export function getCustomersAction(page, filter = '', type = '') {
    return async(dispatch) => {
        dispatch(getCustomers())
        try {
            const response = await getCustomersApi(page, filter, type);
            dispatch(getCustomerSuccess(response))
        } catch (error) {
            dispatch(getCustomerError(true))
        }
    }
}

export function addCustomersAction(customer) {
    return async(dispatch) => {
        try {
            await addCustomersApi(customer);
            const response = await getCustomersApi();
            dispatch(addCustomerSuccess(response))
        } catch (error) {
            dispatch(addCustomerError(error))
        }
    }
}


export function deleteCustomersAction(id) {
    return async(dispatch) => {
        try {
            await deleteCustomersApi(id);
            const response = await getCustomersApi();
            dispatch(deleteCustomerSuccess(response))
        } catch (error) {
            dispatch(deleteCustomerError(true))
        }
    }
}


export function updateCustomersAction(id, customer) {
    return async(dispatch) => {
        try {
            await updateCustomersApi(id, customer);
            const response = await getCustomersApi();
            dispatch(updateCustomerSuccess(response))
        } catch (error) {
            dispatch(updateCustomerError(true))
        }
    }
}

//Get Customers
const getCustomers = () => ({
    type: GET_CUSTOMERS,
    payload: true
})

const getCustomerSuccess = customers => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: customers
})

const getCustomerError = () => ({
    type: GET_CUSTOMERS_ERROR,
    payload: true
})

//Add Customers

const addCustomerSuccess = customers => ({
    type: ADD_CUSTOMERS_SUCCESS,
    payload: customers
})

const addCustomerError = (err) => ({
    type: ADD_CUSTOMERS_ERROR,
    payload: err
})

//Delete Customers

const deleteCustomerSuccess = customers => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: customers
})

const deleteCustomerError = () => ({
    type: DELETE_CUSTOMER_ERROR,
    payload: true
})

//Update Customers

const updateCustomerSuccess = customers => ({
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: customers
})

const updateCustomerError = (err) => ({
    type: UPDATE_CUSTOMER_ERROR,
    payload: err
})