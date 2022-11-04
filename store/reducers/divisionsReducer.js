//Each Reducer Have his own state
import {
    ADD_DIVISIONS_SUCCESS,
    ADD_DIVISIONS_ERROR,
    GET_DIVISIONS,
    GET_DIVISIONS_ERROR,
    GET_DIVISIONS_SUCCESS,
    DELETE_DIVISION_SUCCESS,
    DELETE_DIVISION_ERROR,
    UPDATE_DIVISION_SUCCESS,
    UPDATE_DIVISION_ERROR
} from '../types'

const initialState = {
    divisions: [],
    total: null,
    error: null,
    loading: false,
    currentDivision: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_DIVISIONS:
            return {
                ...state,
                loading: true
            }
        case GET_DIVISIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                divisions: action.payload.divisions,
                total: action.payload.total
            }
        case GET_DIVISIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_DIVISIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                divisions: action.payload.divisions
            }
        case ADD_DIVISIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_DIVISION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                divisions: action.payload.divisions
            }
        case UPDATE_DIVISION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_DIVISION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                divisions: action.payload.divisions
            }
        case DELETE_DIVISION_ERROR:
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