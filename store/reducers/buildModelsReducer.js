//Each Reducer Have his own state
import {
    ADD_BUILDMODELS_SUCCESS,
    ADD_BUILDMODELS_ERROR,
    GET_BUILDMODELS,
    GET_BUILDMODELS_ERROR,
    GET_BUILDMODELS_SUCCESS,
    DELETE_BUILDMODEL_SUCCESS,
    DELETE_BUILDMODEL_ERROR,
    UPDATE_BUILDMODEL_SUCCESS,
    UPDATE_BUILDMODEL_ERROR
} from '../types'

const initialState = {
    buildModels: [],
    total: null,
    error: null,
    loading: false,
    currentBuildModel: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_BUILDMODELS:
            return {
                ...state,
                loading: true
            }
        case GET_BUILDMODELS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                buildModels: action.payload.buildModels,
                total: action.payload.total
            }
        case GET_BUILDMODELS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_BUILDMODELS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                buildModels: action.payload.buildModels
            }
        case ADD_BUILDMODELS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_BUILDMODEL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                buildModels: action.payload.buildModels
            }
        case UPDATE_BUILDMODEL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BUILDMODEL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                buildModels: action.payload.buildModels
            }
        case DELETE_BUILDMODEL_ERROR:
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