import useAxiosPrivate from "../useAxiosPrivate";
import { useNotification } from "../../context/NotificationProvider";
import { v4 } from "uuid";

const useSemesterRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useNotification();

    async function createSemesterRequest(semesterData) {
        try {
            await axiosPrivate.post("/semesters", semesterData);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Semester was successfully created!",
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

    async function getAllSemestersRequest() {
        const { data } = await axiosPrivate
            .get("/semesters")
            .catch((e) => console.log(e));

        return data;
    }

    async function getSemesterRequest(semesterID) {
        const { data } = await axiosPrivate
            .get("/semesters/" + semesterID)
            .catch((e) => console.log(e));

        return data;
    }

    async function updateSemesterRequest(semesterID, changedData) {
        try {
            await axiosPrivate.put(`/semesters/${semesterID}`, changedData);

            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "UPDATE",
                    message: "Semester was successfully updated!",
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

    async function deleteSemesterRequest(semesterID) {
        try {
            await axiosPrivate.delete(`/semesters/${semesterID}`);
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    type: "SUCCESS",
                    message: "Semester was successfully deleted!",
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
        createSemesterRequest,
        getAllSemestersRequest,
        getSemesterRequest,
        updateSemesterRequest,
        deleteSemesterRequest,
    };
};

export default useSemesterRequest;
