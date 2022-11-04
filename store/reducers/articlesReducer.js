import { GET_ARTICLES, GET_ARTICLES_ERROR, GET_ARTICLES_SUCCESS, ADD_ARTICLE, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_ERROR, UPDATE_ARTICLE, UPDATE_ARTICLE_ERROR, UPDATE_ARTICLE_SUCCESS, PUBLISH_ARTICLE, PUBLISH_ARTICLE_SUCCESS, PUBLISH_ARTICLE_ERROR, SET_CURRENT_ARTICLE, SET_CURRENT_ARTICLE_ERROR, SET_CURRENT_ARTICLE_SUCCESS, DELETE_ARTICLE, DELETE_ARTICLE_ERROR, DELETE_ARTICLE_SUCCESS } from '../types';

const initialState = {
    articlesList: [],
    isArticlesListLoading: false,
    articlesListError: null,
    total: null,
    currentArticle: {},
    isCurrentArticleLoading: false,
    currentArticleError: null
}

const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
        case GET_ARTICLES:
        case UPDATE_ARTICLE:
        case DELETE_ARTICLE:
        case PUBLISH_ARTICLE:
            return {
                ...state,
                isArticlesListLoading: true
            }
        case ADD_ARTICLE_SUCCESS:
        case GET_ARTICLES_SUCCESS:
        case UPDATE_ARTICLE_SUCCESS:
        case DELETE_ARTICLE_SUCCESS:
        case PUBLISH_ARTICLE_SUCCESS:
            return {
                ...state,
                isArticlesListLoading: false,
                articlesListError: null,
                articlesList: action.payload.articles,
                total: action.payload.total
            }

        case ADD_ARTICLE_ERROR:
        case GET_ARTICLES_ERROR:
        case UPDATE_ARTICLE_ERROR:
        case DELETE_ARTICLE_ERROR:
        case PUBLISH_ARTICLE_ERROR:
            return {
                ...state,
                isArticlesListLoading: false,
                articlesListError: action.payload
            }
        case SET_CURRENT_ARTICLE:
            return {
                ...state,
                isCurrentArticleLoading: true
            }
        case SET_CURRENT_ARTICLE_SUCCESS:
            return {
                ...state,
                isCurrentArticleLoading: false,
                currentArticle: action.payload
            }
        case SET_CURRENT_ARTICLE_ERROR:
            return {
                ...state,
                isCurrentArticleLoading: true,
                currentArticleError: action.payload
            }
        default:
            return state;
    }
}

export default reducerSwitch;