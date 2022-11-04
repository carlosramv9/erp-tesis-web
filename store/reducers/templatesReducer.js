import {ADD_TEMPLATE, ADD_TEMPLATE_ERROR, ADD_TEMPLATE_SUCCESS, GET_TEMPLATES_ERROR, GET_TEMPLATES_SUCCESS, GET_TEMPLATES, UPDATE_TEMPLATE, UPDATE_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_ERROR, DELETE_TEMPLATE, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_ERROR, SET_CURRENT_TEMPLATE, SET_CURRENT_TEMPLATE_SUCCESS, SET_CURRENT_TEMPLATE_ERROR} from '../types'

const initialState = {
    templatesList: [],
    currentTemplate: {},
    total: null,
    error: null,
    isLoadingTemplates: false,
    isLoadingCurrentTemplate: false
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEMPLATE:
        case DELETE_TEMPLATE:
        case UPDATE_TEMPLATE:
        case GET_TEMPLATES:
            return {
                ...state,
                isLoadingTemplates: action.payload
            }
        case ADD_TEMPLATE_SUCCESS:
        case DELETE_TEMPLATE_SUCCESS:
        case UPDATE_TEMPLATE_SUCCESS:
        case GET_TEMPLATES_SUCCESS:
            return {
                ...state,
                isLoadingTemplates: false,
                error: null,
                templatesList: action.payload.processTemplates,
                total: action.payload.total
            }

        case ADD_TEMPLATE_ERROR:
        case DELETE_TEMPLATE_ERROR:
        case UPDATE_TEMPLATE_ERROR:
        case GET_TEMPLATES_ERROR:
            return {
                ...state,
                isLoadingTemplates: false,
                error: action.payload
            }
        case SET_CURRENT_TEMPLATE:
            return {
                ...state,
                isLoadingCurrentTemplate:true
            }
        case SET_CURRENT_TEMPLATE_SUCCESS:
            return{
                ...state,
                currentTemplate:action.payload,
                isLoadingCurrentTemplate:false
            }
        case SET_CURRENT_TEMPLATE_ERROR:
            return {
                ...state,
                isLoadingCurrentTemplate:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export default reducerSwitch;