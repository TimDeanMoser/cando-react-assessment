import axios from "axios";

const WOOKIE_URL = "https://wookie.codesubmit.io/";
const BEARER_TOKEN = "Wookie2019";

const client = (() => {
    return axios.create({
        baseURL: WOOKIE_URL,
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });
})();

const request = async function (options) {
    const onSuccess = function (response) {
        return response.data;
    };
    const onError = function (error) {
        return Promise.reject(error.response);
    };
    return client(options).then(onSuccess).catch(onError);
};

export const getMovies = (q) => {
    return request({
        url: "/movies",
        method: "GET",
        params: q ? {q} : {}
    });
}

export default request;