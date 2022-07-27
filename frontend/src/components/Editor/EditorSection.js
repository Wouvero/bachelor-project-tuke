import React from "react";
import Editor from "./Editor";
import EditorTools from "./EditorTools";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import useStudentSolutions from "../../hooks/api/solutions/useStudentSolutions";
import TaskStatus from "../TaskStatus";
import dateTimeFormatter from "../../hooks/helper/dateTimeFormater";

const EditorSection = () => {
    const { taskData, current, setCurrent, allSolutions } =
        useStudentSolutions();

    const length = allSolutions && allSolutions.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    console.log(allSolutions);

    if (taskData) {
        return (
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <div className="max-w-4xl mx-auto py-20">
                    <header className="pb-14">
                        <div className="flex items-end justify-between mb-2">
                            <div className="flex items-start">
                                <h1 className=" text-4xl mr-5 font-medium text-blue-700">
                                    {taskData.task_title}
                                </h1>
                                <TaskStatus active={taskData.active} />
                            </div>

                            <span className="text-gray-700 text-base tracking-wide font-bold">
                                {taskData.task_solutions[0]?.rating
                                    ? taskData.task_solutions[0].rating
                                    : "0"}
                                /{taskData.rating_number}
                            </span>
                        </div>

                        {taskData.active && (
                            <div className="">
                                <span className="text-gray-500 text-xs tracking-wider font-medium">
                                    Záčiatok {dateTimeFormatter(taskData.start)}{" "}
                                    koniec
                                    {dateTimeFormatter(taskData.due)}
                                </span>
                            </div>
                        )}
                    </header>

                    <p className=" text-gray-700 tracking-wide text-base font-normal">
                        {taskData.description}
                    </p>
                </div>

                {taskData?.active ? (
                    <Editor />
                ) : (
                    <section>
                        {allSolutions && allSolutions.length === 0 ? (
                            <Editor />
                        ) : (
                            <div className="relative">
                                {length > 1 && (
                                    <>
                                        <IoIosArrowBack
                                            onClick={prevSlide}
                                            size={32}
                                            className="absolute top-1/2 cursor-pointer	 -left-10 "
                                        />
                                        <IoIosArrowForward
                                            onClick={nextSlide}
                                            size={32}
                                            className="absolute top-1/2 cursor-pointer	 -right-10"
                                        />
                                    </>
                                )}

                                <Editor
                                    solution={
                                        allSolutions &&
                                        allSolutions[current].solution
                                    }
                                />
                            </div>
                        )}
                    </section>
                )}
                {taskData?.active && <EditorTools />}
            </section>
        );
    }
    return <></>;
};

export default EditorSection;
