import React from "react";
import useSolutionForm from "../../hooks/api/solutions/useSolutionForm";
import dateTimeFormatter from "../../hooks/helper/dateTimeFormater";
import TaskStatus from "../TaskStatus";
import { IoCloudUploadOutline, IoPlanetOutline } from "react-icons/io5";
import Editor from "./Editor";
import Button from "../Button";

const SolutionEditor = () => {
    const { taskData, uploadDocumentFromDevice, uploadSolutionIntoServer } =
        useSolutionForm();
    if (taskData) {
        return (
            <section className="w-full">
                <div className="max-w-7xl h-full mx-auto py-20 px-12 ">
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
                                    {taskData.rating_number}
                                </span>
                            </div>

                            {taskData.active && (
                                <div className="">
                                    <span className="text-gray-500 text-xs tracking-wider font-medium">
                                        Začiatok{" "}
                                        {dateTimeFormatter(taskData.start)}{" "}
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

                    <Editor />
                    <div className="w-full flex justify-end mt-8">
                        <div className="mr-5">
                            <label
                                htmlFor="file-upload"
                                className="transition ease-in-out delay-75 flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-green-500 border border-green-500 hover:bg-green-500 hover:text-white hover:border-green-500"
                            >
                                <IoCloudUploadOutline
                                    size={24}
                                    className="mr-1"
                                />
                                Vložiť súbor
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => uploadDocumentFromDevice(e)}
                            />
                        </div>

                        <Button
                            type="button"
                            btnType="outline"
                            color="blue"
                            scale="medium"
                            onClick={(e) => uploadSolutionIntoServer(e)}
                        >
                            <IoPlanetOutline size={24} className="mr-1" />
                            Odovzdať
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return <></>;
};

export default SolutionEditor;
