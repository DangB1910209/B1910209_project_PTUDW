import axios from 'axios'

const axiosClientSecret = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClientSecret.interceptors.request.use(
    async (config) => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) {
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClientSecret.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});



const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { axiosClient, axiosClientSecret } 