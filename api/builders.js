import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getBuildersApi(page = 1, filter = '') {
    const url = `${envUrl}/builders?page=${page}&filter=${filter}`
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

export async function addBuildersApi(builder) {
    const url = `${envUrl}/builders`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, builder, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteBuildersApi(id) {
    const url = `${envUrl}/builders/${id}`
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

export async function updateBuildersApi(id, builder) {
    const url = `${envUrl}/builders/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, builder, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}