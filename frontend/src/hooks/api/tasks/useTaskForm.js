import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTaskRequest from "../../requests/useTaskRequest";

const defaultInputs = {
    taskID: null,
    semesterID: null,
    taskTitle: "",
    description: "",
    ratingNumber: "",
    active: false,
    publishSolutions: false,
    start: null,
    due: null,
};

const useTaskForm = () => {
    const { taskID, semesterID } = useParams();

    const navigate = useNavigate();

    const { createTaskRequest, getTaskRequest, updateTaskRequest } =
        useTaskRequest();

    const [inputs, setInputs] = useState(defaultInputs);

    useEffect(() => {
        if (taskID) {
            getTaskRequest(taskID).then((fetchedResponse) => {
                const task = fetchedResponse.task;

                setInputs({
                    taskID: task.task_id,
                    semesterID: task.semester_id_fk,
                    taskTitle: task.task_title,
                    description: task.description,
                    ratingNumber: task.rating_number,
                    active: task.active,
                    publishSolutions: task.publish_solutions,
                    start: task.start && task.start.split(":00.000Z")[0],
                    due: task.due && task.due.split(":00.000Z")[0],
                });
            });
        }
    }, [taskID]);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const switchButton = (e) => {
        const name = e.target.name;
        console.log(name);
        switch (name) {
            case "active":
                if (inputs.active === true) {
                    setInputs({
                        ...inputs,
                        active: !inputs.active,
                    });
                } else {
                    setInputs({
                        ...inputs,
                        active: !inputs.active,
                        start: "",
                        due: "",
                    });
                }
                return;
            case "publishSolutions":
                setInputs({
                    ...inputs,
                    publishSolutions: !inputs.publishSolutions,
                });
                return;
            default:
                return;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputsCopy = {
            ...inputs,
            start: inputs.start + ":00.000Z",
            due: inputs.due + ":00.000Z",
        };

        if (!taskID) {
            createTaskRequest(semesterID, inputsCopy).then(() =>
                navigate(`/semesterPage/${semesterID}`)
            );
        } else {
            updateTaskRequest(taskID, inputsCopy).then(() => {
                navigate(`/semesterPage/${inputs.semesterID}`);
            });
        }
    };

    return { taskID, inputs, handleChange, handleSubmit, switchButton };
};

export default useTaskForm;
