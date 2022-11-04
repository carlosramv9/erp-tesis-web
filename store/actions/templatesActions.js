import {ADD_TEMPLATE, ADD_TEMPLATE_ERROR, ADD_TEMPLATE_SUCCESS, GET_TEMPLATES_ERROR, GET_TEMPLATES_SUCCESS, GET_TEMPLATES, UPDATE_TEMPLATE, UPDATE_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_ERROR, DELETE_TEMPLATE, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_ERROR, SET_CURRENT_TEMPLATE, SET_CURRENT_TEMPLATE_SUCCESS, SET_CURRENT_TEMPLATE_ERROR} from '../types'
import {getTemplateListApi, createTemplateApi, deleteTemplateApi, getTemplateByIdApi, updateTemplateApi } from '../../api/templates';

export function createTemplateAction(data) {
    return async(dispatch) => {
        dispatch(addTemplate())
        try {
            await createTemplateApi(data);
            const response = await getTemplateListApi();
            dispatch(addTemplateSuccess(response))
        } catch (error) {
            dispatch(addTemplateError(error))
        }
    }
}

export function getTemplatesAction(page) {
    return async(dispatch) => {
        dispatch(getTemplates())
        try {
            const response = await getTemplateListApi(page);
            dispatch(getTemplatesSuccess(response))
        } catch (error) {
            dispatch(getTemplatesError(error))
        }
    }
}

export function updateTemplateAction(data, id) {
    return async(dispatch) => {
        dispatch(updateTemplate())
        try {
            await updateTemplateApi(data, id);
            const response = await getTemplateListApi();
            dispatch(updateTemplateSuccess(response))
        } catch (error) {
            dispatch(updateTemplateError(true))
        }
    }
}

export function deleteTemplateAction(id) {
    return async(dispatch) => {
        dispatch(deleteTemplate())
        try {
            await deleteTemplateApi(id);
            const response = await getTemplateListApi();
            dispatch(deleteTemplateSuccess(response))
        } catch (error) {
            dispatch(deleteTemplateError(true))
        }
    }
}

export function setCurrentTemplateAction(id) {
    return async(dispatch) => {
        dispatch(setCurrentTemplate())
        try {
            const response = await getTemplateByIdApi(id);
            dispatch(setCurrentTemplateSuccess(response))
        } catch (error) {
            dispatch(setCurrentTemplateError(true))
        }
    }
}

export function emptyCurrentTemplateAction() {
    return async(dispatch) => {
        dispatch(setCurrentTemplate())
        try {
            dispatch(setCurrentTemplateSuccess({}))
        } catch (error) {
            dispatch(setCurrentTemplateError(true))
        }
    }
}

//Create Template
const addTemplate = () => ({
    type: ADD_TEMPLATE,
    payload: true
})

const addTemplateSuccess = data => ({
    type: ADD_TEMPLATE_SUCCESS,
    payload: data
})

const addTemplateError = () => ({
    type: ADD_TEMPLATE_ERROR,
    payload: true
})
//Update Template
const updateTemplate = () =>({
    type: UPDATE_TEMPLATE,
    payload: true
})

const updateTemplateSuccess = data =>({
    type: UPDATE_TEMPLATE_SUCCESS,
    payload: data
})

const updateTemplateError = () =>({
    type: UPDATE_TEMPLATE_ERROR,
    payload: true
})
//Delete Template
const deleteTemplate = () => ({
    type: DELETE_TEMPLATE,
    payload: true
})

const deleteTemplateSuccess = data => ({
    type: DELETE_TEMPLATE_SUCCESS,
    payload: data
})

const deleteTemplateError = () => ({
    type: DELETE_TEMPLATE_ERROR,
    payload: true
})
//Get Templates
const getTemplates = () => ({
    type: GET_TEMPLATES,
    payload: true
})

const getTemplatesSuccess = data => ({
    type: GET_TEMPLATES_SUCCESS,
    payload: data
})

const getTemplatesError = () => ({
    type: GET_TEMPLATES_ERROR,
    payload: true
})

//Set Current Template

const setCurrentTemplate = () =>({
    type:SET_CURRENT_TEMPLATE,
    payload:true
})

const setCurrentTemplateSuccess = data =>({
    type:SET_CURRENT_TEMPLATE_SUCCESS,
    payload:data
})

const setCurrentTemplateError = () =>({
    type:SET_CURRENT_TEMPLATE_ERROR,
    payload:true
})