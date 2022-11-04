import { SET_USER, SET_USER_ERROR, SET_USER_SUCCESS, ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, DELETE_USER, DELETE_USER_ERROR, DELETE_USER_SUCCESS, GET_USERS, GET_USERS_ERROR, GET_USERS_SUCCESS, UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, ADD_USER_ATTACHMENT, ADD_USER_ATTACHMENT_SUCCESS, ADD_USER_ATTACHMENT_ERROR, SET_CURRENT_TAB, DELETE_USER_ATTACHMENT, DELETE_USER_ATTACHMENT_SUCCESS, DELETE_USER_ATTACHMENT_ERROR, UPDATE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_ERROR } from '../types';

const initialState = {
    users: [],
    currentUser: {},
    total: null,
    error: null,
    loading: false,
    loadingSetUser: false,
    loadingAttachment: false,
    currentUserTab: 'process'
}


const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
        case DELETE_USER:
        case UPDATE_USER:
        case GET_USERS:
            return {
                ...state,
                loading: true
            }
        case ADD_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload.users,
                total: action.payload.total
            }

        case ADD_USER_ERROR:
        case DELETE_USER_ERROR:
        case UPDATE_USER_ERROR:
        case GET_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_USER:
        case UPDATE_USER_IMAGE:
            return {
                ...state,
                loadingSetUser: action.payload
            }
        case SET_USER_SUCCESS:
        case UPDATE_USER_IMAGE_SUCCESS:
            return {
                ...state,
                loadingSetUser: false,
                currentUser: action.payload
            }
        case SET_USER_ERROR:
        case UPDATE_USER_IMAGE_ERROR:
            return {
                ...state,
                loadingSetUser: false,
                error: action.payload
            }
        case ADD_USER_ATTACHMENT:
        case DELETE_USER_ATTACHMENT:
            return {
                loadingSetUser: true,
                loadingAttachment: true
            }
        case ADD_USER_ATTACHMENT_SUCCESS:
        case DELETE_USER_ATTACHMENT_SUCCESS:
            return {
                ...state,
                loadingSetUser: false,
                loadingAttachment: false,
                currentUser: action.payload.user,
                currentUserTab: action.payload.tab
            }
        case ADD_USER_ATTACHMENT_ERROR:
        case DELETE_USER_ATTACHMENT_ERROR:
            return {
                ...state,
                loadingSetUser: false,
                loadingAttachment: false,
                error: action.payload
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentUserTab: action.payload
            }
        default:
            return state;
    }
}

export default reducerSwitch;