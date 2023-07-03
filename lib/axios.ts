import axios, { AxiosError } from "axios";
import { toast } from "@/lib/toast";
import { signOut } from "next-auth/react";

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





// **********************
// axios with auth
const axiosAuth = axios.create(config)
axiosAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error)
    },
);
export { axiosAuth }




// **********************
// axios without auth
const axiosNoAuth = axios.create(config)
axiosNoAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error)
    },
);
export default axiosNoAuth







// ============> error handlers


const handleErrorHelper = (property: string, constraints: any, setError: any) => {
    const c = Object.keys(constraints);
    for (let j = 0; j < c.length; j++) {
        setError(property, {
            type: "manual",
            message: constraints[c[j]],
        });
    }
}

export const handleFieldsError = (error: unknown, setError: any) => {
    if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
            const { errors } = error?.response?.data;
            let _err = errors
            let _errKeys = Object.keys(errors)
            for (let i = 0; i < _errKeys.length; i++) {
                handleErrorHelper(_errKeys[i], _err[_errKeys[i]], setError)
            }
        }
    }
}



export const handleToastError = (error: any) => {
    const response = error.response
    const messages = [];
    if (!response) {
        messages.push("خطای شبکه");
    } else {
        messages.push(response?.data?.message || response?.data?.error || `خطای ناشتاخته: ${response.status}`);
    }
    // show messages
    messages.map(message => toast(message, "error"));
};




