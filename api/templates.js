import axios from 'axios';
import { getToken } from './token';

const envUrl = process.env[process.env.NODE_ENV];

export async function getTemplateListApi(page = 1) {
    const url = `${envUrl}/template/process?page=${page}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.get(url, params)
        .then(response => response.data)
        .catch(err => err)
}

export async function createTemplateApi(data) {
    const url = `${envUrl}/template/process`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, data, params)
        .then(response => response.data)
        .catch(err => err)
}

export async function updateTemplateApi(templateData, id) {
    const url = `${envUrl}/template/process/${id}`
    const token = await getToken();
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, templateData, params)
        .then(response => response.data)
        .catch(err => err)
}

export async function deleteTemplateApi(id) {
    const url = `${envUrl}/template/process/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.delete(url, params)
        .then(response => response.data)
        .catch(err => err)
}

export async function getTemplateByIdApi(id) {
    const url = `${envUrl}/template/process/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    return axios.get(url, params)
        .then(response => response.data)
        .catch(err => err)
}