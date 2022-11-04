import { UPDATE_ROLE_PRIORITY, UPDATE_ROLE_PRIORITY_ERROR, UPDATE_ROLE_PRIORITY_SUCCESS, ADD_ROLE, ADD_ROLE_SUCCESS, ADD_CUSTOMERS_ERROR, GET_ROLES, GET_ROLES_ERROR, GET_ROLES_SUCCESS, UPDATE_ROLE, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_ERROR, DELETE_ROLE, DELETE_ROLE_ERROR, DELETE_ROLE_SUCCESS } from '../types';

const initialState = {
    roles: [],
    completeRoles: [],
    currentRole: {},
    total: null,
    error: null,
    loading: false,
    loadingPriority: false
}


const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROLE:
        case DELETE_ROLE:
        case UPDATE_ROLE:
        case GET_ROLES:
            return {
                ...state,
                loadingPriority: action.payload,
                loading: action.payload
            }
        case ADD_ROLE_SUCCESS:
        case DELETE_ROLE_SUCCESS:
        case UPDATE_ROLE_SUCCESS:
        case GET_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload.roles,
                completeRoles: action.payload.complete,
                loading: false,
                error: null,
                total: action.payload.total,
                loadingPriority: false,
            }
        case DELETE_ROLE_ERROR:
        case ADD_CUSTOMERS_ERROR:
        case UPDATE_ROLE_ERROR:
        case GET_ROLES_ERROR:
            return {
                ...state,
                loadingPriority: false,
                loading: false,
                error: action.payload
            }
        case UPDATE_ROLE_PRIORITY:
            return {
                ...state,
                loadingPriority: action.payload
            }
        case UPDATE_ROLE_PRIORITY_ERROR:
            return {
                ...state,
                loadingPriority: false,
                error: action.payload
            }
        case UPDATE_ROLE_PRIORITY_SUCCESS:
            return {
                loadingPriority: false,
                error: null,
                completeRoles: action.payload.complete,
                roles: action.payload.roles,
                total: action.payload.total
            }
        default:
            return state;
    }
}

export default reducerSwitch;