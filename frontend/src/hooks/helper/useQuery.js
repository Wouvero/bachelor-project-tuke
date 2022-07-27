import React, { useEffect, useState } from "react";

const useQuery = () => {
    /* const [response, setResponse] = useState(null);
    const [error, setError] = useState(null); */
    const [response, setResponse] = useState(null);

    const query = async (request) => {
        await request
            .then((fetchResponse) => {
                console.log(fetchResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return { query };
};

export default useQuery;
/*  useEffect(() => {
        request
            .then((fetchResponse) => {
                console.log(fetchResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); */
