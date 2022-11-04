import { GET_TIMELINE, GET_TIMELINE_ERROR, GET_TIMELINE_SUCCESS } from '../types';
import { getTimeLineListApi  } from '../../api/timeline';



export function getTimeLineListAction(page) {
    return async(dispatch) => {
        dispatch(getTimeLineList())
        try {
            const response = await getTimeLineListApi(page);
            dispatch(getTimeLineListSuccess(response))
        } catch (error) {
            dispatch(getTimeLineListError(true))
        }
    }
}

//Get TimeLine List
const getTimeLineList = () => ({
    type: GET_TIMELINE,
    payload: true
})

const getTimeLineListSuccess = roles => ({
    type: GET_TIMELINE_SUCCESS,
    payload: roles
})

const getTimeLineListError = error => ({
    type: GET_TIMELINE_ERROR,
    payload: error
})