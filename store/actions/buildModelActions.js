import {
    ADD_BUILDMODELS,
    ADD_BUILDMODELS_SUCCESS,
    ADD_BUILDMODELS_ERROR,
    GET_BUILDMODELS,
    GET_BUILDMODELS_SUCCESS,
    GET_BUILDMODELS_ERROR,
    UPDATE_BUILDMODEL,
    UPDATE_BUILDMODEL_SUCCESS,
    UPDATE_BUILDMODEL_ERROR,
    DELETE_BUILDMODEL,
    DELETE_BUILDMODEL_ERROR,
    DELETE_BUILDMODEL_SUCCESS,
} from '../types'
import { getBuildModelsApi, addBuildModelsApi, updateBuildModelsApi, deleteBuildModelsApi } from '../../api/buildModels';

export function getBuildModelsAction(page, filter = '') {
    return async(dispatch) => {
        //dispatch(getBuildModels())
        try {
            const response = await getBuildModelsApi(page, filter);
            dispatch(getBuildModelSuccess(response))
        } catch (error) {
            dispatch(getBuildModelError(true))
        }
    }
}

export function addBuildModelsAction(buildModel) {
    return async(dispatch) => {
        try {
            await addBuildModelsApi(buildModel);
            const response = await getBuildModelsApi();
            dispatch(addBuildModelSuccess(response))
        } catch (error) {
            dispatch(addBuildModelError(error))
        }
    }
}


export function deleteBuildModelsAction(id) {
    return async(dispatch) => {
        try {
            await deleteBuildModelsApi(id);
            const response = await getBuildModelsApi();
            dispatch(deleteBuildModelSuccess(response))
        } catch (error) {
            dispatch(deleteBuildModelError(true))
        }
    }
}


export function updateBuildModelsAction(id, buildModel) {
    return async(dispatch) => {
        try {
            await updateBuildModelsApi(id, buildModel);
            const response = await getBuildModelsApi();
            dispatch(updateBuildModelSuccess(response))
        } catch (error) {
            dispatch(updateBuildModelError(true))
        }
    }
}

//Get BuildModels
const getBuildModels = () => ({
    type: GET_BUILDMODELS,
    payload: true
})

const getBuildModelSuccess = buildModels => ({
    type: GET_BUILDMODELS_SUCCESS,
    payload: buildModels
})

const getBuildModelError = () => ({
    type: GET_BUILDMODELS_ERROR,
    payload: true
})

//Add BuildModels

const addBuildModelSuccess = buildModels => ({
    type: ADD_BUILDMODELS_SUCCESS,
    payload: buildModels
})

const addBuildModelError = (err) => ({
    type: ADD_BUILDMODELS_ERROR,
    payload: err
})

//Delete BuildModels

const deleteBuildModelSuccess = buildModels => ({
    type: DELETE_BUILDMODEL_SUCCESS,
    payload: buildModels
})

const deleteBuildModelError = () => ({
    type: DELETE_BUILDMODEL_ERROR,
    payload: true
})

//Update BuildModels

const updateBuildModelSuccess = buildModels => ({
    type: UPDATE_BUILDMODEL_SUCCESS,
    payload: buildModels
})

const updateBuildModelError = (err) => ({
    type: UPDATE_BUILDMODEL_ERROR,
    payload: err
})