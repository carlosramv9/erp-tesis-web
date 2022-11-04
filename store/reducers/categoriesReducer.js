//Each Reducer Have his own state
import {
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_ERROR,
    GET_CATEGORIES,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR
} from '../types'

const initialState = {
    categories: [],
    total: null,
    error: null,
    loading: false,
    currentCategory: []
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: action.payload.categories,
                total: action.payload.total
            }
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: action.payload.categories
            }
        case ADD_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: action.payload.categories
            }
        case UPDATE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: action.payload.categories
            }
        case DELETE_CATEGORY_ERROR:
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