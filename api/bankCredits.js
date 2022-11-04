import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getBankCreditsApi(page = 1, limit = 10) {
    const url = `${envUrl}/bank-credits?page=${page}&limit=${limit}`
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

export async function addBankCreditsApi(bankCredit) {
    const url = `${envUrl}/bank-credits`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, bankCredit, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteBankCreditsApi(id) {
    const url = `${envUrl}/bank-credits/${id}`
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

export async function updateBankCreditsApi(id, bankCredit) {
    const url = `${envUrl}/bank-credits/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, bankCredit, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}