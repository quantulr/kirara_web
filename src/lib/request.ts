import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3000",
});

request.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log("request:", config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    function (response) {
        // Do something with response data
        console.log("response:", response);
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default request;
