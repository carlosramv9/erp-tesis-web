import axios from 'axios';
import { getToken } from './token';

const envUrl = process.env[process.env.NODE_ENV];

export async function getCurrentUser(id) {
    const url = `${envUrl}/users/${id}`;
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

export async function addUserAttachmentApi(id, file, data) {
    const url = `${envUrl}/utils/attachment/${id}`;

    const token = await getToken();

    const formData = new FormData()

    formData.append('file', file);
    formData.append('name', data.name);
    formData.append('category', data.category);

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

export async function deleteUserAttachmentApi(userId, attachmentId) {
    const url = `${envUrl}/utils/attachment/${userId}/${attachmentId}`;

    const token = await getToken();

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };

    return axios.delete(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

//User Auth Data
export function getUserData(token) {
    const url = `${envUrl}/users/auth`;

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

//Get Users List
export async function getUserListApi(page = 1, search = '', role = '', limit = 10) {
    const url = `${envUrl}/users?page=${page}&search=${search}&role=${role}&limit=${limit}`
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

//Get Users List
export async function getUserInfoListApi() {
    const url = `${envUrl}/users/info`
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

export async function createUserApi(data) {
    const url = `${envUrl}/users/userbyadminpanel`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateUserApi(data) {
    const url = `${envUrl}/users/${data._id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    delete data._id;
    return axios.put(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteUserApi(id) {
    const url = `${envUrl}/users/${id}`
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

export async function updateUserImageApi(id, file) {
    const url = `${envUrl}/users/updateimage/${id}`;
    const token = await getToken();
    const formData = new FormData()
    formData.append('file', file);

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

export async function getUserImage(userId) {
    const url = `${envUrl}/users/image/${userId}`;
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