import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getCategoriesApi(page = 1) {
    const url = `${envUrl}/categories?page=${page}`
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

export async function addCategoriesApi(category) {
    const url = `${envUrl}/categories`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, category, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteCategoriesApi(id) {
    const url = `${envUrl}/categories/${id}`
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

export async function updateCategoriesApi(id, category) {
    const url = `${envUrl}/categories/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, category, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}