import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getCustomersApi(page = 1, filter = '', type = '') {
    const url = `${envUrl}/customers?page=${page}&filter=${filter}&type=${type}`
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

export async function getFilteredCustomersApi(id = '', page = 1) {
    const url = `${envUrl}/customers/filter/${id}?page=${page}`
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

export async function addCustomersApi(customer) {
    const url = `${envUrl}/customers`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, customer, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteCustomersApi(id) {
    const url = `${envUrl}/customers/${id}`
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

export async function updateCustomersApi(id, customer) {
    const url = `${envUrl}/customers/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, customer, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}