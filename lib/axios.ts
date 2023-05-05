import axios, { AxiosError } from "axios";
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
            default:
                messages.push(response?.data?.message || `Error ${response.status}`);
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
            const { detail, errors } = error?.response?.data;
            let _err = detail
            if (!detail) _err = errors
            for (let i = 0; i < _err.length; i++) {
                handleErrorHelper(_err[i].property, _err[i].constraints, setError)
                for (let s = 0; s < _err[i]?.children?.length; s++) {
                    handleErrorHelper(
                        _err[i].property + "." + _err[i].children[s].property,
                        _err[i].children[s].constraints,
                        setError
                    )
                }
            }
        }
    }
}