//Each Reducer Have his own state
import {
    ADD_BUILDERS_SUCCESS,
    ADD_BUILDERS_ERROR,
    GET_BUILDERS,
    GET_BUILDERS_ERROR,
    GET_BUILDERS_SUCCESS,
    DELETE_BUILDER_SUCCESS,
    DELETE_BUILDER_ERROR,
    UPDATE_BUILDER_SUCCESS,
    UPDATE_BUILDER_ERROR
} from '../types'

const initialState = {
    builders: [],
    total: null,
    error: null,
    loading: false,
    currentBuilder: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_BUILDERS:
            return {
                ...state,
                loading: true
            }
        case GET_BUILDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                builders: action.payload.builders,
                total: action.payload.total
            }
        case GET_BUILDERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_BUILDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                builders: action.payload.builders
            }
        case ADD_BUILDERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_BUILDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                builders: action.payload.builders
            }
        case UPDATE_BUILDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BUILDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                builders: action.payload.builders
            }
        case DELETE_BUILDER_ERROR:
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