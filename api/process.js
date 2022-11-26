import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getProcessListsApi(page = 1, limit = 10) {
    const url = `${envUrl}/process?page=${page}&limit=${limit}`
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

export async function getProcessApi(id) {
    const url = `${envUrl}/process/${id}`
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

export async function addProcessApi(process) {
    const url = `${envUrl}/process`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, process, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function addTaskProcessApi(taskIndex, processId, stepId, data) {
    const url = `${envUrl}/process/addtask/${stepId}/${processId}?index=${taskIndex}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    }
    return axios.put(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteProcessApi(id) {
    const url = `${envUrl}/process/${id}`
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

export async function updateProcessApi(id, process) {
    const url = `${envUrl}/process/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, process, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}