import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useEditorContext } from "../../../context/EditorProvider";
import useSolutionRequest from "../../requests/useSolutionRequest";
import useTaskRequest from "../../requests/useTaskRequest";

const useSolutionForm = () => {
    const { taskID } = useParams();
    const navigate = useNavigate();
    const { getTaskRequest } = useTaskRequest();
    const { code, setCode } = useEditorContext();
    const [taskData, setTaskData] = useState();
    const { createSolutionRequest } = useSolutionRequest();

    useEffect(() => {
        if (taskID) {
            getTaskRequest(taskID).then((fetchedResponse) => {
                const taskData = fetchedResponse.task;
                setCode("#You can write code here!");
                setTaskData(taskData);
            });
        }
    }, []);

    const uploadDocumentFromDevice = (e) => {
        let file = e.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (e) => {
                console.log(e.target.result);
                setCode(e.target.result);
            };
        }
    };

    const uploadSolutionIntoServer = async (e) => {
        e.preventDefault();

        createSolutionRequest(taskID, {
            solution: code,
        }).then(navigate(`/taskPage/${taskID}`));
    };

    return { taskData, uploadDocumentFromDevice, uploadSolutionIntoServer };
};

export default useSolutionForm;
