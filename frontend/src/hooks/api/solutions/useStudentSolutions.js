import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useEditorContext } from "../../../context/EditorProvider";
import useSolutionRequest from "../../requests/useSolutionRequest";

const useStudentSolutions = () => {
    const { taskID } = useParams();
    const { auth } = useAuth();

    const { code, setCode } = useEditorContext();

    const {
        getAllSolutionsRequest,
        updateSolutionRequest,
        createSolutionRequest,
        checkSolutionRequest,
    } = useSolutionRequest();

    const [taskData, setTaskData] = useState();
    const [allSolutions, setAllSolutions] = useState();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const inputs = {
            task_id: taskID,
            user_id: auth.userID,
        };

        if (taskID) {
            checkSolutionRequest(inputs).then((fetchedResponse) => {
                const taskData = fetchedResponse.solution;
                //console.log(taskData);
                if (taskData.active && taskData.task_solutions[0]?.solution) {
                    setCode(taskData.task_solutions[0].solution);
                    console.log("ddd");
                } else {
                    console.log("aa");
                    getAllSolutionsRequest(taskID).then((fetchedResponse) => {
                        const allSolutions = fetchedResponse.taskSolutions;
                        if (allSolutions.length === 0)
                            setCode("#this task has no public solutions");

                        setAllSolutions(allSolutions);
                    });
                }
                setTaskData(taskData);
            });
        }
    }, [taskID]);

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

    const uploadSolutionIntoServer = async () => {
        console.log(code);
        if (taskData?.task_solutions[0]?.solution === undefined) {
            createSolutionRequest(taskID, {
                solution: code,
                user_id: auth.userID,
            });
        } else {
            const data = {
                solution: code,
                rating: taskData?.task_solutions[0].rating,
            };
            const solutionID = taskData?.task_solutions[0].task_solution_id;

            updateSolutionRequest(solutionID, data);
        }
    };

    return {
        taskData,
        allSolutions,
        current,
        setCurrent,
        uploadDocumentFromDevice,
        uploadSolutionIntoServer,
    };
};

export default useStudentSolutions;
