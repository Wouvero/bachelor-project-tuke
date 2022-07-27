import useAxiosPrivate from "../useAxiosPrivate";
import { useNotification } from "../../context/NotificationProvider";
import { v4 } from "uuid";

const useUserRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useNotification();

    async function createUserRequest(userData) {
        try {
            await axiosPrivate.post("/users/create", userData);

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "User was successfully created!",
                },
            });
        } catch (error) {
            const { status, statusText } = error.response;
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "ERROR",
                    message: `${status} - ${statusText}`,
                },
            });
        }
    }

    async function createMultipleUserRequest(fileData) {
        try {
            await axiosPrivate.post("/users/createMany", {
                fileData,
            });

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Many User was successfully created!",
                },
            });
        } catch (error) {
            const { status, statusText } = error.response;
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "ERROR",
                    message: `${status} - ${statusText}`,
                },
            });
        }
    }

    async function getAllUserRequest() {
        const { data } = await axiosPrivate
            .get(`/users`)
            .catch((error) => console.log(error));

        return data;
    }

    async function getUserRequest(userID) {
        const { data } = await axiosPrivate
            .get("/users/" + userID)
            .catch((e) => console.log(e));

        return data;
    }

    async function updateUserRequest(userID, changedData) {
        try {
            await axiosPrivate.put(`/users/${userID}`, changedData);

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "User was successfully updated!",
                },
            });
        } catch (error) {
            const { status, statusText } = error.response;
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "ERROR",
                    message: `${status} - ${statusText}`,
                },
            });
        }
    }

    async function deleteUserRequest(userID) {
        try {
            await axiosPrivate.delete(`/users/${userID}`);

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "User was successfully deleted!",
                },
            });
        } catch (error) {
            const { status, statusText } = error.response;
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "ERROR",
                    message: `${status} - ${statusText}`,
                },
            });
        }
    }

    return {
        createUserRequest,
        createMultipleUserRequest,
        getUserRequest,
        getAllUserRequest,
        updateUserRequest,
        deleteUserRequest,
    };
};

export default useUserRequest;
