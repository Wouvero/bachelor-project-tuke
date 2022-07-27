import useAxiosPrivate from "../useAxiosPrivate";
import { useNotification } from "../../context/NotificationProvider";
import { v4 } from "uuid";

const useSolutionRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useNotification();

    async function createSolutionRequest(taskID, solutionData) {
        try {
            await axiosPrivate.post(`/tasks/${taskID}/solutions`, solutionData);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Solution was successfully created!",
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

    async function getSolutionRequest(solutionID) {
        const { data } = await axiosPrivate
            .get("/solutions/" + solutionID)
            .catch((e) => console.log(e));

        return data;
    }

    async function getAllSolutionsRequest(taskID) {
        const { data } = await axiosPrivate
            .get(`/tasks/${taskID}/solutions`)
            .catch((e) => console.log(e));

        return data;
    }

    async function updateSolutionRequest(solutionID, changedData) {
        try {
            await axiosPrivate.put(`/solutions/${solutionID}`, changedData);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Solution was successfully updated!",
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

    async function deleteSolutionRequest(solutionID) {
        try {
            await axiosPrivate.delete(`/solutions/${solutionID}`);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Solution was successfully deleted!",
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

    async function checkSolutionRequest(solutionData) {
        const { data } = await axiosPrivate
            .post("/solutions/checkSolution", solutionData)
            .catch((e) => console.log(e));

        return data;
    }

    return {
        createSolutionRequest,
        getSolutionRequest,
        getAllSolutionsRequest,
        updateSolutionRequest,
        deleteSolutionRequest,
        checkSolutionRequest,
    };
};

export default useSolutionRequest;
