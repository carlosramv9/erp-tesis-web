import { GET_TIMELINE, GET_TIMELINE_ERROR, GET_TIMELINE_SUCCESS } from '../types';

const initialState = {
    list: [],
    total: null,
    error: null,
    loading: false,
}


const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case  GET_TIMELINE:
            return {
                ...state,
                loading: action.payload,
            }
        case  GET_TIMELINE_SUCCESS:
            return {
                ...state,
                list: action.payload.timeLine,
                loading: false,
                error: null,
                total: action.payload.total,
            }
        case  GET_TIMELINE_ERROR:
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