import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTaskRequest from "../../requests/useTaskRequest";

const useTasksTable = () => {
    const { semesterID } = useParams();
    const [tasks, setTasks] = useState(null);

    const { getAllTasksRequest, deleteTaskRequest } = useTaskRequest();

    useEffect(() => {
        getAllTasksRequest(semesterID).then((fetchedResponse) =>
            setTasks(fetchedResponse.tasks)
        );
    }, []);

    const handleDeleteTask = (taskID) => {
        const newTasks = tasks.filter((task) => task.task_id !== taskID);
        deleteTaskRequest(taskID);
        setTasks(newTasks);
    };

    return { semesterID, tasks, handleDeleteTask };
};

export default useTasksTable;
