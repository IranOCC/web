import axios from "axios";
import { toast } from "@/lib/toast";

const config = {
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
    validateStatus: function (status: number) {
        return status >= 200 && status < 400;
    },
}





export const showError = ({ response }: { response: any }) => {
    const messages = [];
    if (!response) {
        messages.push("Network error");
    } else {
        switch (response?.status) {
            case 422:
                let text = Object.values(response.data.errors);
                messages.push(...text);
                break;
            case 404:
                messages.push("404 Not Found");
                break;
            case 500:
                messages.push(response?.data?.message || "500 Server Error");
                break;
            default:
                messages.push(`Error ${response.status}`);
                break;
        }
    }
    messages.map(message => toast(message, "error"));
};




// **********************
// axios with auth
const axiosAuth = axios.create(config)
axiosAuth.interceptors.response.use(
    response => {
        // if (response?.status === 401) {
        // }
        return response;
    },
    error => {
        showError(error);
        return Promise.reject(error)
    },
);
export { axiosAuth }




// **********************
// axios without auth
const axiosNoAuth = axios.create(config)
axiosNoAuth.interceptors.response.use(
    response => {
        // if (response?.status === 401) {
        // }
        return response;
    },
    error => {
        showError(error);
        return Promise.reject(error)
    },
);
export default axiosNoAuth
