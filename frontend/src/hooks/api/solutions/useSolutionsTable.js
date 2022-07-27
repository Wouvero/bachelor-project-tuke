import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSolutionRequest from "../../requests/useSolutionRequest";

const useSolutionsTable = () => {
    const { taskID } = useParams();

    const { getAllSolutionsRequest, deleteSolutionRequest } =
        useSolutionRequest();

    const [solutions, setSolutions] = useState(null);

    useEffect(() => {
        if (taskID) {
            getAllSolutionsRequest(taskID).then((fetchedResponse) => {
                setSolutions(fetchedResponse.taskSolutions);
            });
        }
    }, []);

    const handleDeleteSolution = (deleteID) => {
        const newSolutions = solutions.filter(
            (solution) => solution.task_solution_id !== deleteID
        );
        deleteSolutionRequest(deleteID);
        setSolutions(newSolutions);
    };

    return { taskID, solutions, handleDeleteSolution };
};

export default useSolutionsTable;
