import axios from 'axios';
import { getToken } from './token'

const envUrl = process.env[process.env.NODE_ENV];

export async function getPropertiesApi(page = 1, type = 'ALL', builder = 'ALL', division = 'ALL', model = 'ALL', filter = '') {
    const url = `${envUrl}/properties?page=${page}&type=${type}&filter=${filter}`
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

export async function getProperty(id) {
    const url = `${envUrl}/properties/${id}`;
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    };

    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function addPropertiesApi(property) {
    const url = `${envUrl}/properties`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deletePropertiesApi(id) {
    const url = `${envUrl}/properties/${id}`
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

export async function updatePropertiesApi(id, property) {
    const url = `${envUrl}/properties/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function addFilesPropertiesApi(id, property) {
    const url = `${envUrl}/properties/files/upload/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function uploadDefaultImageApi(id, property) {
    const url = `${envUrl}/properties/files/upload/cover/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function setDefaultImageApi(id, property) {
    const url = `${envUrl}/properties/files/setimage/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}


export async function setPublishPropertyApi(id) {
    const url = `${envUrl}/properties/publish/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, {}, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function setPublicImageApi(id, property) {
    const url = `${envUrl}/properties/files/setimage/public/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteFileApi(id, property) {
    const url = `${envUrl}/properties/files/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, property, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function getCoverImageProperty(id) {
    const url = `${envUrl}/properties/image/${id}`;
    const token = await getToken();

    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token,
        },
        responseType: 'blob',
    };
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}