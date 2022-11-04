import {
    ADD_DIVISIONS,
    ADD_DIVISIONS_SUCCESS,
    ADD_DIVISIONS_ERROR,
    GET_DIVISIONS,
    GET_DIVISIONS_SUCCESS,
    GET_DIVISIONS_ERROR,
    UPDATE_DIVISION,
    UPDATE_DIVISION_SUCCESS,
    UPDATE_DIVISION_ERROR,
    DELETE_DIVISION,
    DELETE_DIVISION_ERROR,
    DELETE_DIVISION_SUCCESS,
} from '../types'
import { getDivisionsApi, addDivisionsApi, updateDivisionsApi, deleteDivisionsApi } from '../../api/divisions';

export function getDivisionsAction(page, filter = '') {
    return async(dispatch) => {
        dispatch(getDivisions())
        try {
            const response = await getDivisionsApi(page, filter);
            dispatch(getDivisionSuccess(response))
        } catch (error) {
            dispatch(getDivisionError(true))
        }
    }
}

export function addDivisionsAction(division) {
    return async(dispatch) => {
        try {
            await addDivisionsApi(division);
            const response = await getDivisionsApi();
            dispatch(addDivisionSuccess(response))
        } catch (error) {
            dispatch(addDivisionError(error))
        }
    }
}


export function deleteDivisionsAction(id) {
    return async(dispatch) => {
        try {
            await deleteDivisionsApi(id);
            const response = await getDivisionsApi();
            dispatch(deleteDivisionSuccess(response))
        } catch (error) {
            dispatch(deleteDivisionError(true))
        }
    }
}


export function updateDivisionsAction(id, division) {
    return async(dispatch) => {
        try {
            await updateDivisionsApi(id, division);
            const response = await getDivisionsApi();
            dispatch(updateDivisionSuccess(response))
        } catch (error) {
            dispatch(updateDivisionError(true))
        }
    }
}

//Get Divisions
const getDivisions = () => ({
    type: GET_DIVISIONS,
    payload: true
})

const getDivisionSuccess = divisions => ({
    type: GET_DIVISIONS_SUCCESS,
    payload: divisions
})

const getDivisionError = () => ({
    type: GET_DIVISIONS_ERROR,
    payload: true
})

//Add Divisions

const addDivisionSuccess = divisions => ({
    type: ADD_DIVISIONS_SUCCESS,
    payload: divisions
})

const addDivisionError = (err) => ({
    type: ADD_DIVISIONS_ERROR,
    payload: err
})

//Delete Divisions

const deleteDivisionSuccess = divisions => ({
    type: DELETE_DIVISION_SUCCESS,
    payload: divisions
})

const deleteDivisionError = () => ({
    type: DELETE_DIVISION_ERROR,
    payload: true
})

//Update Divisions

const updateDivisionSuccess = divisions => ({
    type: UPDATE_DIVISION_SUCCESS,
    payload: divisions
})

const updateDivisionError = (err) => ({
    type: UPDATE_DIVISION_ERROR,
    payload: err
})