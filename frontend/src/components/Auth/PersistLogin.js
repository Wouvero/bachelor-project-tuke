import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "../../hooks/useRefresh";
import { useAuth } from "../../context/AuthProvider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;


        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return <>{!persist ? <Outlet /> : isLoading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
