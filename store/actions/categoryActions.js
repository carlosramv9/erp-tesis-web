import {
    ADD_CATEGORIES,
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_ERROR,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
} from '../types'
import { getCategoriesApi, addCategoriesApi, updateCategoriesApi, deleteCategoriesApi } from '../../api/categories';

export function getCategoriesAction(page) {
    return async(dispatch) => {
        dispatch(getCategories())
        try {
            const response = await getCategoriesApi(page);
            dispatch(getCategorySuccess(response))
        } catch (error) {
            dispatch(getCategoryError(true))
        }
    }
}

export function addCategoriesAction(category) {
    return async(dispatch) => {
        try {
            await addCategoriesApi(category);
            const response = await getCategoriesApi();
            dispatch(addCategorySuccess(response))
        } catch (error) {
            dispatch(addCategoryError(error))
        }
    }
}


export function deleteCategoriesAction(id) {
    return async(dispatch) => {
        try {
            await deleteCategoriesApi(id);
            const response = await getCategoriesApi();
            dispatch(deleteCategorySuccess(response))
        } catch (error) {
            dispatch(deleteCategoryError(true))
        }
    }
}


export function updateCategoriesAction(id, category) {
    return async(dispatch) => {
        try {
            await updateCategoriesApi(id, category);
            const response = await getCategoriesApi();
            dispatch(updateCategorySuccess(response))
        } catch (error) {
            dispatch(updateCategoryError(true))
        }
    }
}

//Get Categories
const getCategories = () => ({
    type: GET_CATEGORIES,
    payload: true
})

const getCategorySuccess = categories => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
})

const getCategoryError = () => ({
    type: GET_CATEGORIES_ERROR,
    payload: true
})

//Add Categories

const addCategorySuccess = categories => ({
    type: ADD_CATEGORIES_SUCCESS,
    payload: categories
})

const addCategoryError = (err) => ({
    type: ADD_CATEGORIES_ERROR,
    payload: err
})

//Delete Categories

const deleteCategorySuccess = categories => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: categories
})

const deleteCategoryError = () => ({
    type: DELETE_CATEGORY_ERROR,
    payload: true
})

//Update Categories

const updateCategorySuccess = categories => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: categories
})

const updateCategoryError = (err) => ({
    type: UPDATE_CATEGORY_ERROR,
    payload: err
})