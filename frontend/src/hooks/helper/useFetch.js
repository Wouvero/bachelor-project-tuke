import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useFetch = (url) => {
    const axiosPrivate = useAxiosPrivate();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axiosPrivate
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { data, error, loading };
};

export default useFetch;
