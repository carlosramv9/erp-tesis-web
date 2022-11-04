import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getBuildModelsApi(page = 1, filter = '') {
    const url = `${envUrl}/models?page=${page}&filter=${filter}`
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

export async function addBuildModelsApi(buildModel) {
    const url = `${envUrl}/models`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, buildModel, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteBuildModelsApi(id) {
    const url = `${envUrl}/models/${id}`
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

export async function updateBuildModelsApi(id, buildModel) {
    const url = `${envUrl}/models/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, buildModel, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}