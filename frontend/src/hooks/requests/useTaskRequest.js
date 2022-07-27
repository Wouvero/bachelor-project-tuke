import useAxiosPrivate from "../useAxiosPrivate";
import { useNotification } from "../../context/NotificationProvider";
import { v4 } from "uuid";

const useTaskRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useNotification();

    async function createTaskRequest(semesterID, taskData) {
        try {
            await axiosPrivate.post(`/semesters/${semesterID}/tasks`, taskData);

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Task was successfully created!",
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

    async function getTaskRequest(taskID) {
        const { data } = await axiosPrivate
            .get("/tasks/" + taskID)
            .catch((e) => console.log(e));

        return data;
    }

    async function getAllTasksRequest(semesterID) {
        const { data } = await axiosPrivate
            .get(`/semesters/${semesterID}/tasks`)
            .catch((error) => console.log(error));

        return data;
    }

    async function updateTaskRequest(taskID, changedData) {
        try {
            await axiosPrivate.put(`/tasks/${taskID}`, changedData);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Task was successfully updated!",
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

    async function deleteTaskRequest(taskID) {
        try {
            await axiosPrivate.delete(`/tasks/${taskID}`);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Task was successfully deleted!",
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
        createTaskRequest,
        getTaskRequest,
        getAllTasksRequest,
        updateTaskRequest,
        deleteTaskRequest,
    };
};

export default useTaskRequest;
