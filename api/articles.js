import axios from 'axios';
import { getToken } from './token';

const envUrl = process.env[process.env.NODE_ENV];


export async function getArticlesApi(page = 1) {
    const url = `${envUrl}/blog/articlesadmin?page=${page}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function createArticleApi(title, image, description, content) {
    const url = `${envUrl}/blog/newarticle/`;

    const token = await getToken();

    const formData = new FormData()

    image ? formData.append('image', image) : null
    title ? formData.append('title', title) : null
    description ? formData.append('description', description) : null
    content ? formData.append('content', content) : null

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };

    return axios.post(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateArticleApi(id, title, image, description, content) {
    const url = `${envUrl}/blog/updateArticle/${id}`;

    const token = await getToken();

    const formData = new FormData()
    console.log(image.length !== 0 && image);
    image.length !== 0 && image ? formData.append('image', image) : null
    title ? formData.append('title', title) : null
    description ? formData.append('description', description) : null
    content ? formData.append('content', content) : null

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };

    return axios.put(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function publishArticlesApi(articleId) {
    const url = `${envUrl}/blog/article/publish/${articleId}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    return axios.post(url, {}, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteArticlesApi(articleId) {
    const url = `${envUrl}/blog/deleteArticle/${articleId}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    return axios.delete(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function getArticleByIdApi(articleId) {
    const url = `${envUrl}/blog/article/${articleId}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}