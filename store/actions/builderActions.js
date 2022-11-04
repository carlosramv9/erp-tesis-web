import {
    ADD_BUILDERS,
    ADD_BUILDERS_SUCCESS,
    ADD_BUILDERS_ERROR,
    GET_BUILDERS,
    GET_BUILDERS_SUCCESS,
    GET_BUILDERS_ERROR,
    UPDATE_BUILDER,
    UPDATE_BUILDER_SUCCESS,
    UPDATE_BUILDER_ERROR,
    DELETE_BUILDER,
    DELETE_BUILDER_ERROR,
    DELETE_BUILDER_SUCCESS,
} from '../types'
import { getBuildersApi, addBuildersApi, updateBuildersApi, deleteBuildersApi } from '../../api/builders';

export function getBuildersAction(page, filter = '') {
    return async(dispatch) => {
        //dispatch(getBuilders())
        try {
            const response = await getBuildersApi(page, filter);
            dispatch(getBuilderSuccess(response))
        } catch (error) {
            dispatch(getBuilderError(true))
        }
    }
}

export function addBuildersAction(builder) {
    return async(dispatch) => {
        try {
            await addBuildersApi(builder);
            const response = await getBuildersApi();
            dispatch(addBuilderSuccess(response))
        } catch (error) {
            dispatch(addBuilderError(error))
        }
    }
}


export function deleteBuildersAction(id) {
    return async(dispatch) => {
        try {
            await deleteBuildersApi(id);
            const response = await getBuildersApi();
            dispatch(deleteBuilderSuccess(response))
        } catch (error) {
            dispatch(deleteBuilderError(true))
        }
    }
}


export function updateBuildersAction(id, builder) {
    return async(dispatch) => {
        try {
            await updateBuildersApi(id, builder);
            const response = await getBuildersApi();
            dispatch(updateBuilderSuccess(response))
        } catch (error) {
            dispatch(updateBuilderError(true))
        }
    }
}

//Get Builders
const getBuilders = () => ({
    type: GET_BUILDERS,
    payload: true
})

const getBuilderSuccess = builders => ({
    type: GET_BUILDERS_SUCCESS,
    payload: builders
})

const getBuilderError = () => ({
    type: GET_BUILDERS_ERROR,
    payload: true
})

//Add Builders

const addBuilderSuccess = builders => ({
    type: ADD_BUILDERS_SUCCESS,
    payload: builders
})

const addBuilderError = (err) => ({
    type: ADD_BUILDERS_ERROR,
    payload: err
})

//Delete Builders

const deleteBuilderSuccess = builders => ({
    type: DELETE_BUILDER_SUCCESS,
    payload: builders
})

const deleteBuilderError = () => ({
    type: DELETE_BUILDER_ERROR,
    payload: true
})

//Update Builders

const updateBuilderSuccess = builders => ({
    type: UPDATE_BUILDER_SUCCESS,
    payload: builders
})

const updateBuilderError = (err) => ({
    type: UPDATE_BUILDER_ERROR,
    payload: err
})