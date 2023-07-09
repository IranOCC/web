import axios from "axios";

const config = {
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: function (status: number) {
        return status >= 200 && status < 400;
    },
}

const axiosSSR = axios.create(config)

// axiosSSR.interceptors.response.use(
//     response => {
//         // if (response?.status === 401) {
//         // }
//         return response;
//     },
//     // error => {
//     //     return Promise.reject("Hi")
//     // },
// );


// **********************
// axios without auth
export default axiosSSR
