import {
    ADD_INVESTORS,
    ADD_INVESTORS_SUCCESS,
    ADD_INVESTORS_ERROR,
    GET_INVESTORS,
    GET_INVESTORS_SUCCESS,
    GET_INVESTORS_ERROR,
    UPDATE_INVESTOR,
    UPDATE_INVESTOR_SUCCESS,
    UPDATE_INVESTOR_ERROR,
    DELETE_INVESTOR,
    DELETE_INVESTOR_ERROR,
    DELETE_INVESTOR_SUCCESS,
    SET_INVESTOR,
    SET_INVESTOR_ERROR,
    SET_INVESTOR_SUCCESS,
} from '../types'
import {
    getInvestorsApi,
    getInvestorApi,
    addInvestorsApi,
    updateInvestorsApi,
    deleteInvestorsApi,
    addInvestorMovesApi,
    updateInvestorMovementApi,
    uploadDocumentsInvestorApi,
    deleteDocumentInvestorApi
} from '../../api/investors';

export function getInvestorsAction(bank, page = 1, limit = 10) {
    return async(dispatch) => {
        dispatch(getInvestors())
        try {
            const response = await getInvestorsApi(bank, page, limit);
            dispatch(getInvestorSuccess(response))
        } catch (error) {
            dispatch(getInvestorError(true))
        }
    }
}

export function setInvestorAction(id = '') {
    return async(dispatch) => {
        dispatch(setInvestor())
        try {
            if (id) {
                const response = await getInvestorApi(id);
                dispatch(setInvestorSuccess(response));
            } else {
                dispatch(setInvestorSuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setInvestorError(true))
        }
    }
}

export function addInvestorsAction(bank, investor) {
    return async(dispatch) => {
        try {
            await addInvestorsApi(investor);
            const response = await getInvestorsApi(bank);
            dispatch(addInvestorSuccess(response))
        } catch (error) {
            dispatch(addInvestorError(error))
        }
    }
}

export function deleteInvestorsAction(bank, id) {
    return async(dispatch) => {
        try {
            await deleteInvestorsApi(id);
            const response = await getInvestorsApi(bank);
            dispatch(deleteInvestorSuccess(response))
        } catch (error) {
            dispatch(deleteInvestorError(true))
        }
    }
}

export function updateInvestorsAction(bank, id, investor) {
    return async(dispatch) => {
        dispatch(setInvestor())
        try {
            await updateInvestorsApi(id, investor);
            const response = await getInvestorsApi(bank);
            const _investor = await getInvestorApi(id);
            dispatch(updateInvestorSuccess(response))
            dispatch(setInvestorSuccess(_investor));
        } catch (error) {
            dispatch(updateInvestorError(true))
        }
    }
}

export function addInvestorMovementAction(bank, id, investor, status = 'pendient') {
    return async(dispatch) => {
        try {
            await addInvestorMovesApi(investor, status);
            const response = await getInvestorsApi(bank);
            const _investor = await getInvestorApi(id);
            dispatch(addInvestorSuccess(response))
            dispatch(setInvestorSuccess(_investor));
        } catch (error) {
            dispatch(addInvestorError(error))
        }
    }
}

export function updateInvestorMovementAction(bank, idInvestor, idMove, data) {
    return async(dispatch) => {
        dispatch(setInvestor())
        try {
            await updateInvestorMovementApi(idMove, data);
            const response = await getInvestorsApi(bank);
            const _investor = await getInvestorApi(idInvestor);
            dispatch(updateInvestorSuccess(response))
            dispatch(setInvestorSuccess(_investor));
        } catch (error) {
            dispatch(updateInvestorError(true))
        }
    }
}

export function updateInvestorDocumentsAction(idInvestor, data) {
    return async(dispatch) => {
        dispatch(setInvestor())
        try {
            await uploadDocumentsInvestorApi(idInvestor, data);
            //dispatch(updateInvestorSuccess(response))
            const _investor = await getInvestorApi(idInvestor);
            dispatch(setInvestorSuccess(_investor));
        } catch (error) {
            dispatch(updateInvestorError(true))
        }
    }
}

export function deleteInvestorDocumentAction(idInvestor, document) {
    return async(dispatch) => {
        dispatch(setInvestor())
        try {
            await deleteDocumentInvestorApi(idInvestor, document);
            //dispatch(updateInvestorSuccess(response))
            const _investor = await getInvestorApi(idInvestor);
            dispatch(setInvestorSuccess(_investor));
        } catch (error) {
            dispatch(updateInvestorError(true))
        }
    }
}

//Get Investors
const getInvestors = () => ({
    type: GET_INVESTORS,
    payload: true
})

const getInvestorSuccess = investors => ({
    type: GET_INVESTORS_SUCCESS,
    payload: investors
})

const getInvestorError = () => ({
    type: GET_INVESTORS_ERROR,
    payload: true
})

//Add Investors

const addInvestorSuccess = investors => ({
    type: ADD_INVESTORS_SUCCESS,
    payload: investors
})

const addInvestorError = (err) => ({
    type: ADD_INVESTORS_ERROR,
    payload: err
})

//Delete Investors

const deleteInvestorSuccess = investors => ({
    type: DELETE_INVESTOR_SUCCESS,
    payload: investors
})

const deleteInvestorError = () => ({
    type: DELETE_INVESTOR_ERROR,
    payload: true
})

//Update Investors

const updateInvestorSuccess = investors => ({
    type: UPDATE_INVESTOR_SUCCESS,
    payload: investors
})

const updateInvestorError = (err) => ({
    type: UPDATE_INVESTOR_ERROR,
    payload: err
})

//SET CurrentInvestor

const setInvestor = () => ({
    type: SET_INVESTOR,
    payload: true
})

const setInvestorSuccess = currentInvestor => ({
    type: SET_INVESTOR_SUCCESS,
    payload: currentInvestor
})

const setInvestorError = () => ({
    type: SET_INVESTOR_ERROR,
    payload: true
})