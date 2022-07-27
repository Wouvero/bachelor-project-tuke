import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const useRefresh = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        await axios
            .get("/refresh", { withCredentials: true })
            .then((response) => {
                const data = response?.data;

                const userID = data?.userID;
                const firstName = data?.firstName;
                const lastName = data?.lastName;
                const userStatus = data?.userStatus;
                const userRoles = data?.userRoles;
                const userEmail = data?.email;
                const accessToken = data?.accessToken;

                setAuth({
                    userID,
                    firstName,
                    lastName,
                    userEmail,
                    userStatus,
                    userRoles,
                    accessToken,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return refresh;
};

export default useRefresh;
