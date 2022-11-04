import { GET_ARTICLES, GET_ARTICLES_ERROR, GET_ARTICLES_SUCCESS, ADD_ARTICLE, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_ERROR, PUBLISH_ARTICLE, PUBLISH_ARTICLE_SUCCESS, PUBLISH_ARTICLE_ERROR, UPDATE_ARTICLE, UPDATE_ARTICLE_ERROR, UPDATE_ARTICLE_SUCCESS, SET_CURRENT_ARTICLE, SET_CURRENT_ARTICLE_ERROR, SET_CURRENT_ARTICLE_SUCCESS, DELETE_ARTICLE, DELETE_ARTICLE_ERROR, DELETE_ARTICLE_SUCCESS } from '../types';
import { getArticlesApi, createArticleApi, publishArticlesApi, deleteArticlesApi, getArticleByIdApi, updateArticleApi } from '../../api/articles'


export function getArticlesAction(page) {
    return async(dispatch) => {
        dispatch(getArticles())
        try {
            const response = await getArticlesApi(page);
            dispatch(getArticlesSuccess(response))
        } catch (error) {
            console.log('error:', error)
            dispatch(getArticlesError(true))
        }
    }
}

export function createArticleAction(title, image, description, content) {
    return async(dispatch) => {
        dispatch(addArticle())
        try {
            await createArticleApi(title, image, description, content);
            const response = await getArticlesApi();
            dispatch(addArticleSuccess(response))
        } catch (error) {
            dispatch(addArticleError(true))
        }
    }
}

export function updateArticleAction(id, title, image, description, content) {
    return async(dispatch) => {
        dispatch(updateArticle())
        try {
            await updateArticleApi(id, title, image, description, content);
            const response = await getArticlesApi();
            dispatch(updateArticleSuccess(response))
        } catch (error) {
            dispatch(updateArticleError(true))
        }
    }
}

export function publishArticlesAction(articleId, page = 1) {
    return async(dispatch) => {
        dispatch(publishArticles())
        try {
            await publishArticlesApi(articleId)
            const response = await getArticlesApi(page);
            dispatch(publishArticlesSuccess(response))
        } catch (error) {
            console.log('error:', error)
            dispatch(publishArticlesError(true))
        }
    }
}

export function deleteArticlesAction(articleId) {
    return async(dispatch) => {
        dispatch(deleteArticles())
        try {
            await deleteArticlesApi(articleId)
            const response = await getArticlesApi();
            dispatch(deleteArticlesSuccess(response))
        } catch (error) {
            console.log('error:', error)
            dispatch(deleteArticlesError(true))
        }
    }
}

export function setCurrentArticlesAction(articleId) {
    return async(dispatch) => {
        dispatch(setCurrentArticle())
        try {
            const dataResponse = await getArticleByIdApi(articleId);
            dispatch(setCurrentArticleSuccess(dataResponse))
        } catch (error) {
            console.log('error:', error)
            dispatch(setCurrentArticleError(true))
        }
    }
}

//Get Users
const getArticles = () => ({
    type: GET_ARTICLES,
    payload: true
})

const getArticlesSuccess = data => ({
    type: GET_ARTICLES_SUCCESS,
    payload: data
})

const getArticlesError = () => ({
    type: GET_ARTICLES_ERROR,
    payload: true
})

//Get Users
const setCurrentArticle = () => ({
    type: SET_CURRENT_ARTICLE,
    payload: true
})

const setCurrentArticleSuccess = data => ({
    type: SET_CURRENT_ARTICLE_SUCCESS,
    payload: data
})

const setCurrentArticleError = () => ({
    type: SET_CURRENT_ARTICLE_ERROR,
    payload: true
})

//Publish Article
const publishArticles = () => ({
    type: PUBLISH_ARTICLE,
    payload: true
})

const publishArticlesSuccess = data => ({
    type: PUBLISH_ARTICLE_SUCCESS,
    payload: data
})

const publishArticlesError = () => ({
    type: PUBLISH_ARTICLE_ERROR,
    payload: true
})

//Delete Article
const deleteArticles = () => ({
    type: DELETE_ARTICLE,
    payload: true
})

const deleteArticlesSuccess = data => ({
    type: DELETE_ARTICLE_SUCCESS,
    payload: data
})

const deleteArticlesError = () => ({
    type: DELETE_ARTICLE_ERROR,
    payload: true
})

//Create Article
const addArticle = () => ({
    type: ADD_ARTICLE,
    payload: true
})

const addArticleSuccess = data => ({
    type: ADD_ARTICLE_SUCCESS,
    payload: data
})

const addArticleError = () => ({
    type: ADD_ARTICLE_ERROR,
    payload: true
})

//Update Article
const updateArticle = () => ({
    type: UPDATE_ARTICLE,
    payload: true
})

const updateArticleSuccess = data => ({
    type: UPDATE_ARTICLE_SUCCESS,
    payload: data
})

const updateArticleError = () => ({
    type: UPDATE_ARTICLE_ERROR,
    payload: true
})