import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEditorContext } from "../../../context/EditorProvider";
import useSolutionRequest from "../../requests/useSolutionRequest";

const useProfesorSolutions = () => {
    const { taskID, solutionID } = useParams();

    const { getAllSolutionsRequest, updateSolutionRequest } =
        useSolutionRequest();

    const [solutions, setSolutions] = useState();

    const [current, setCurrent] = useState(null);
    const [length, setLength] = useState(null);
    const [nextID, setNextID] = useState(null);
    const [prevID, setPrevID] = useState(null);

    const [input, setInput] = useState(null);

    const { code, setCode } = useEditorContext();

    useEffect(() => {
        if (taskID) {
            getAllSolutionsRequest(taskID).then((fetchedResponse) => {
                console.log(fetchedResponse);
                const solutions = fetchedResponse.taskSolutions;
                const length = solutions.length;
                setLength(length);

                solutions.map((solution, index) => {
                    if (solution.task_solution_id === parseInt(solutionID)) {
                        const nextIndex = index === length - 1 ? 0 : index + 1;
                        const prevIndex = index === 0 ? length - 1 : index - 1;

                        setNextID(solutions[nextIndex].task_solution_id);
                        setPrevID(solutions[prevIndex].task_solution_id);

                        setInput(solution.rating);
                        setCurrent(index);
                        setCode(solution.solution);
                    }
                });

                setSolutions(solutions);
            });
        }
    }, []);

    const handleUpdateSolution = (e) => {
        e.preventDefault();

        const data = {
            rating: input,
            solution: code,
        };

        updateSolutionRequest(solutionID, data);
    };

    return {
        taskID,
        solutions,
        current,
        length,
        nextID,
        prevID,
        input,
        setInput,
        handleUpdateSolution,
    };
};

export default useProfesorSolutions;
