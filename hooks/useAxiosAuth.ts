"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { axiosAuth, handleFieldsError, handleToastError } from "../lib/axios";

const useAxiosAuth = (formErrorHandler: any) => {
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${session?.accessToken}`
            }
            return config
        })
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    if (formErrorHandler) handleFieldsError(error, formErrorHandler)
                    handleToastError(error);
                    return Promise.reject(error)
                },
            );
        }
    }, [session])

    return axiosAuth
}


export default useAxiosAuth


