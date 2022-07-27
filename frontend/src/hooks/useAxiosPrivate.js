import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
    const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.response.use(
            (config) => {
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptors = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await refresh();
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptors);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
