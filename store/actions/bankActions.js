import {
    ADD_BANKS,
    ADD_BANKS_SUCCESS,
    ADD_BANKS_ERROR,
    GET_BANKS,
    GET_BANKS_SUCCESS,
    GET_BANKS_ERROR,
    UPDATE_BANK,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_ERROR,
    DELETE_BANK,
    DELETE_BANK_ERROR,
    DELETE_BANK_SUCCESS,
    SET_BANK,
    SET_BANK_ERROR,
    SET_BANK_SUCCESS,
} from '../types'
import {
    getBanksApi,
    getBankApi,
    addBanksApi,
    updateBanksApi,
    deleteBanksApi,
    addBankMovesApi,
    updateBankMovementApi
} from '../../api/banks';

export function getBanksAction(page, limit = 10) {
    return async(dispatch) => {
        dispatch(getBanks())
        try {
            const response = await getBanksApi(page, limit);
            dispatch(getBankSuccess(response))
        } catch (error) {
            dispatch(getBankError(true))
        }
    }
}

export function setBankAction(id = '') {
    return async(dispatch) => {
        dispatch(setBank())
        try {
            if (id) {
                const response = await getBankApi(id);
                dispatch(setBankSuccess(response));
            } else {
                dispatch(setBankSuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setBankError(true))
        }
    }
}

export function addBanksAction(bank) {
    return async(dispatch) => {
        try {
            await addBanksApi(bank);
            const response = await getBanksApi();
            dispatch(addBankSuccess(response))
        } catch (error) {
            dispatch(addBankError(error))
        }
    }
}

export function deleteBanksAction(id) {
    return async(dispatch) => {
        try {
            await deleteBanksApi(id);
            const response = await getBanksApi();
            dispatch(deleteBankSuccess(response))
        } catch (error) {
            dispatch(deleteBankError(true))
        }
    }
}

export function updateBanksAction(id, bank) {
    return async(dispatch) => {
        dispatch(setBank())
        try {
            await updateBanksApi(id, bank);
            const response = await getBanksApi();
            const _bank = await getBankApi(id);
            dispatch(updateBankSuccess(response))
            dispatch(setBankSuccess(_bank));
        } catch (error) {
            dispatch(updateBankError(true))
        }
    }
}

export function addBankMovementAction(id, bank, status = 'pendient') {
    return async(dispatch) => {
        try {
            await addBankMovesApi(bank, status);
            const response = await getBanksApi();
            const _bank = await getBankApi(id);
            dispatch(addBankSuccess(response))
            dispatch(setBankSuccess(_bank));
        } catch (error) {
            dispatch(addBankError(error))
        }
    }
}

export function updateBankMovementAction(idBank, idMove, data) {
    return async(dispatch) => {
        dispatch(setBank())
        try {
            await updateBankMovementApi(idMove, data);
            const response = await getBanksApi();
            const _bank = await getBankApi(idBank);
            dispatch(updateBankSuccess(response))
            dispatch(setBankSuccess(_bank));
        } catch (error) {
            dispatch(updateBankError(true))
        }
    }
}

//Get Banks
const getBanks = () => ({
    type: GET_BANKS,
    payload: true
})

const getBankSuccess = banks => ({
    type: GET_BANKS_SUCCESS,
    payload: banks
})

const getBankError = () => ({
    type: GET_BANKS_ERROR,
    payload: true
})

//Add Banks

const addBankSuccess = banks => ({
    type: ADD_BANKS_SUCCESS,
    payload: banks
})

const addBankError = (err) => ({
    type: ADD_BANKS_ERROR,
    payload: err
})

//Delete Banks

const deleteBankSuccess = banks => ({
    type: DELETE_BANK_SUCCESS,
    payload: banks
})

const deleteBankError = () => ({
    type: DELETE_BANK_ERROR,
    payload: true
})

//Update Banks

const updateBankSuccess = banks => ({
    type: UPDATE_BANK_SUCCESS,
    payload: banks
})

const updateBankError = (err) => ({
    type: UPDATE_BANK_ERROR,
    payload: err
})

//SET CurrentBank

const setBank = () => ({
    type: SET_BANK,
    payload: true
})

const setBankSuccess = currentBank => ({
    type: SET_BANK_SUCCESS,
    payload: currentBank
})

const setBankError = () => ({
    type: SET_BANK_ERROR,
    payload: true
})