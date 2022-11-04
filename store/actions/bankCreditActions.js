import {
    ADD_BANK_CREDITS,
    ADD_BANK_CREDITS_SUCCESS,
    ADD_BANK_CREDITS_ERROR,
    GET_BANK_CREDITS,
    GET_BANK_CREDITS_SUCCESS,
    GET_BANK_CREDITS_ERROR,
    UPDATE_BANK_CREDIT,
    UPDATE_BANK_CREDIT_SUCCESS,
    UPDATE_BANK_CREDIT_ERROR,
    DELETE_BANK_CREDIT,
    DELETE_BANK_CREDIT_ERROR,
    DELETE_BANK_CREDIT_SUCCESS,
} from '../types'
import { getBankCreditsApi, addBankCreditsApi, updateBankCreditsApi, deleteBankCreditsApi } from '../../api/bankCredits';

export function getBankCreditsAction(page) {
    return async(dispatch) => {
        dispatch(getBankCredits())
        try {
            const response = await getBankCreditsApi(page);
            dispatch(getBankCreditSuccess(response))
        } catch (error) {
            dispatch(getBankCreditError(true))
        }
    }
}

export function addBankCreditsAction(bankCredit) {
    return async(dispatch) => {
        try {
            await addBankCreditsApi(bankCredit);
            const response = await getBankCreditsApi();
            dispatch(addBankCreditSuccess(response))
        } catch (error) {
            dispatch(addBankCreditError(error))
        }
    }
}


export function deleteBankCreditsAction(id) {
    return async(dispatch) => {
        try {
            await deleteBankCreditsApi(id);
            const response = await getBankCreditsApi();
            dispatch(deleteBankCreditSuccess(response))
        } catch (error) {
            dispatch(deleteBankCreditError(true))
        }
    }
}


export function updateBankCreditsAction(id, bankCredit) {
    return async(dispatch) => {
        try {
            await updateBankCreditsApi(id, bankCredit);
            const response = await getBankCreditsApi();
            dispatch(updateBankCreditSuccess(response))
        } catch (error) {
            dispatch(updateBankCreditError(true))
        }
    }
}

//Get BankCredits
const getBankCredits = () => ({
    type: GET_BANK_CREDITS,
    payload: true
})

const getBankCreditSuccess = bankCredits => ({
    type: GET_BANK_CREDITS_SUCCESS,
    payload: bankCredits
})

const getBankCreditError = () => ({
    type: GET_BANK_CREDITS_ERROR,
    payload: true
})

//Add BankCredits

const addBankCreditSuccess = bankCredits => ({
    type: ADD_BANK_CREDITS_SUCCESS,
    payload: bankCredits
})

const addBankCreditError = (err) => ({
    type: ADD_BANK_CREDITS_ERROR,
    payload: err
})

//Delete BankCredits

const deleteBankCreditSuccess = bankCredits => ({
    type: DELETE_BANK_CREDIT_SUCCESS,
    payload: bankCredits
})

const deleteBankCreditError = () => ({
    type: DELETE_BANK_CREDIT_ERROR,
    payload: true
})

//Update BankCredits

const updateBankCreditSuccess = bankCredits => ({
    type: UPDATE_BANK_CREDIT_SUCCESS,
    payload: bankCredits
})

const updateBankCreditError = (err) => ({
    type: UPDATE_BANK_CREDIT_ERROR,
    payload: err
})