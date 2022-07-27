import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Editor from "./Editor";
import useProfesorSolutions from "../../hooks/api/solutions/useProfesorSolutions";
import Button from "../Button";
import dateTimeFormatter from "../../hooks/helper/dateTimeFormater";

const EditorProfesorSection = () => {
    const {
        taskID,
        solutions,
        current,
        length,
        nextID,
        prevID,
        input,
        setInput,
        handleUpdateSolution,
    } = useProfesorSolutions();

    if (solutions) {
        return (
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <div>
                    {solutions &&
                        dateTimeFormatter(solutions[current].createdAt)}
                </div>
                <div>
                    {solutions[current].user === null
                        ? "Anonym"
                        : solutions[current].user.user_detail.full_name}
                </div>

                <section className="relative mb-8">
                    <>
                        {length > 1 && (
                            <>
                                <a
                                    href={`/tasks/${taskID}/solutionPage/${nextID}`}
                                    className="absolute top-1/2 cursor-pointer -left-10"
                                >
                                    <IoIosArrowBack size={32} />{" "}
                                </a>{" "}
                                <a
                                    href={`/tasks/${taskID}/solutionPage/${prevID}`}
                                    className="absolute top-1/2 cursor-pointer -right-10"
                                >
                                    <IoIosArrowForward size={32} />
                                </a>
                            </>
                        )}
                    </>

                    <Editor />
                </section>

                <form
                    onSubmit={(e) => handleUpdateSolution(e)}
                    className="flex"
                >
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        defaultValue={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                        min={0}
                        max={solutions[current].task.rating_number}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5"
                    />
                    <Button btnType="solid" color="blue" scale="medium">
                        Aktualizovať
                    </Button>
                </form>
            </section>
        );
    }
    return <>fff</>;
};

export default EditorProfesorSection;
