//Each Reducer Have his own state
import {
    ADD_PROPERTIES_SUCCESS,
    ADD_PROPERTIES_ERROR,
    GET_PROPERTIES,
    GET_PROPERTIES_ERROR,
    GET_PROPERTIES_SUCCESS,
    DELETE_PROPERTY_SUCCESS,
    DELETE_PROPERTY_ERROR,
    UPDATE_PROPERTY_SUCCESS,
    UPDATE_PROPERTY_ERROR,
    SET_PROPERTY,
    SET_PROPERTY_SUCCESS,
    SET_PROPERTY_ERROR,
    ADD_FILES_SUCCESS,
    ADD_FILES_ERROR,
    GET_FILES,
    GET_FILES_ERROR,
    GET_FILES_SUCCESS,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_ERROR,
    UPDATE_FILE_SUCCESS,
    UPDATE_FILE_ERROR
} from '../types'

const initialState = {
    properties: [],
    total: null,
    error: null,
    loading: false,
    currentProperty: {}
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROPERTIES:
            return {
                ...state,
                loading: true
            }
        case GET_PROPERTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties,
                total: action.payload.total
            }
        case GET_PROPERTIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_PROPERTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case ADD_PROPERTIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROPERTY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case UPDATE_PROPERTY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PROPERTY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case DELETE_PROPERTY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_FILES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case SET_PROPERTY:
        case ADD_FILES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_PROPERTY_SUCCESS:
            return {
                ...state,
                currentProperty: action.payload
            }
        case UPDATE_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case SET_PROPERTY_ERROR:
        case UPDATE_FILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                properties: action.payload.properties
            }
        case DELETE_FILE_ERROR:
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