import React from "react";
import { IoCloudUploadOutline, IoPlanetOutline } from "react-icons/io5";
import useStudentSolutions from "../../hooks/api/solutions/useStudentSolutions";
import Button from "../Button";

const EditorTools = () => {
    const { taskData, uploadDocumentFromDevice, uploadSolutionIntoServer } =
        useStudentSolutions();

    return (
        <div className="w-full flex justify-end mt-8">
            <div className="mr-5">
                <label
                    htmlFor="file-upload"
                    className="transition ease-in-out delay-75 flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-green-500 border border-green-500 hover:bg-green-500 hover:text-white hover:border-green-500"
                >
                    <IoCloudUploadOutline size={24} className="mr-1" />
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
                {taskData?.task_solutions[0] !== undefined
                    ? "Aktualizovať"
                    : "Odovzdať"}
            </Button>
        </div>
    );
};

export default EditorTools;
